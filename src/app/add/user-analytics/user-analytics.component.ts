import { Component, OnInit } from '@angular/core';
import { Emp } from 'src/app/emp';
import { EmployeeService } from 'src/app/employee.service';
import { DatePipe } from '@angular/common';
import {HolidayDates} from 'src/app/holiday-dates';
import {Chartdata} from 'src/app/chartdata';
import { SpinnerService } from 'src/app/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { HostListener} from "@angular/core";
import {MatDialog} from '@angular/material/dialog';
import { OfficialHolidayComponent } from '../official-holiday/official-holiday.component';


@Component({
  selector: 'app-user-analytics',
  templateUrl: './user-analytics.component.html',
  styleUrls: ['./user-analytics.component.css']
})
export class UserAnalyticsComponent implements OnInit {
  side=false;
  //check:any[]=[];
  dataSource:object= [];
  employees:any[]=[];
  employeesName:any[]=[];
  row:any[]=[];
  itemdata:any[]=[];
 getScreenWidth: any;
 Company:any[]=[];
 CompanyId:any;
 getScreenHeight: any;
 width:any;
  emp:any=false;
  tablehidden:any=true;
  yeartable:any=true;
  tablehide:any=true;
  Startdate:any;
  Enddate:any;
  HolidayMode:any;
  EmployeeId:any;
  Employeeparam = new Emp; 
  employee_dates:object = [];
  empdate = new Chartdata();
  constructor(private data:EmployeeService,private datePipe: DatePipe,private service:SpinnerService,private toast:ToastrService,private dialog:MatDialog) { 
    this.empdate = new Chartdata();
  }

  ngOnInit(): void {
    // this.data.getemp().subscribe(response=>
    //   {
    //   this.employeesName=response.Table;
    // });
    this.CompanyId = localStorage.getItem('Id');
    this.data.getAllEmployees("",this.CompanyId).subscribe(response=>{
        this.employeesName=response.Table;
    });
    this.loadCompany();
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.emp = false;
    this.tablehidden = true;
    this.tablehide = true;
    this.yeartable = true;

    this.getScreenWidth = window.innerWidth;
    if(this.getScreenWidth <= 1500)
    {
      this.width = '15%';
    }
    else{
      this.width = '13%';
    }
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    if(this.getScreenWidth <= 1500)
    {
      this.width = '15%';
    }
   else if(this.getScreenWidth > 1500)
    {
      this.width = '13%';
    }
    
  }
   
  loadCompany(){
    const arr = [
       {CompanyName: localStorage.getItem('token'),Id: localStorage.getItem('Id')}
   ];
    this.Company = arr;
  }

  opendialog(){
    this.dialog.open(OfficialHolidayComponent);
  }
  
sidebartog()
  {
    if(this.getScreenHeight >= 503 && this.getScreenWidth >= 1068)
    {
      this.side = !this.side; 
    }
    if(this.getScreenHeight <= 503 && this.getScreenWidth <= 1068)
    {
      this.side = false;
    }
 }

 loadEmployees(){
    this.data.chartholidaylist(this.Employeeparam).subscribe(response=>{
    }); 

}
filter()
{
  this.Employeeparam.holiday = "";
  this.Employeeparam.EmployeeId = this.EmployeeId;
  this.Employeeparam.StartDate = this.Startdate;
  this.Employeeparam.EndDate = this.Enddate;
  this.emp = false;
  this.tablehidden = true;
  this.tablehide = true;
  this.yeartable = true;
if(this.EmployeeId == null)
{
  this.toast.error("Select an Employee");
}
else
{
  debugger;
  this.data.holidaylist(this.Employeeparam).subscribe(response=>{
    debugger;
    this.employees=response.Table;
    this.toast.success('Holiday List Displayed Successfully');
  });
}

}

loadPage(){
   this.opendialog();
}

Clearfilter(){
  this.Employeeparam.EmployeeId = '';
  this.Employeeparam.StartDate = '';
  this.Employeeparam.EndDate = '';
  this.employees = [];
}
day(employeess:any){
  debugger;
  this.Employeeparam.holiday = employeess;
  this.Employeeparam.EmployeeId = this.EmployeeId;
  this.Employeeparam.StartDate = this.Startdate;
  this.Employeeparam.EndDate = this.Enddate;
  console.log(this.Employeeparam);
   if( this.Employeeparam.EmployeeId == undefined || this.Employeeparam.EmployeeId == "")
   {
    this.toast.error("Please select an Employee");
   }
   else
   {
     this.data.holidaylist(this.Employeeparam).subscribe(response=>{
      debugger;
      if(employeess == "week")
      {
        this.tablehidden = false;
        this.emp = true;
        this.tablehide = true;
        this.yeartable = true;
        this.toast.success('Holiday List Displayed Successfully');
      }
      else if(employeess == "month")
      {
        this.tablehide = false;
        this.emp = true;
        this.tablehidden = true;
        this.yeartable = true;
        this.toast.success('Holiday List Displayed Successfully');
      }
      else if(employeess == "year")
      {
        this.tablehide = true;
        this.emp = true;
        this.tablehidden = true;
        this.yeartable = false;
        this.toast.success('Holiday List Displayed Successfully');
      }
      else
      {
        this.tablehidden = true;
        this.tablehide = true;
        this.yeartable = true;
        this.emp = false; 
        this.toast.success('Holiday List Displayed Successfully');
      }
      this.employees=response.Table;
    });
   }
 }
}
