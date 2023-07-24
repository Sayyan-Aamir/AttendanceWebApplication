import { Component, OnInit } from '@angular/core';
import { Emp } from 'src/app/emp';
import { EmployeeService } from 'src/app/employee.service';
import { DatePipe } from '@angular/common';
import { SpinnerService } from 'src/app/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { HostListener} from "@angular/core";
import {MatDialog} from '@angular/material/dialog';
import {  SearchCriteria } from '../../Model';
import { OfficialHolidayComponent } from '../official-holiday/official-holiday.component';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-user-analytics',
  templateUrl: './user-analytics.component.html',
  styleUrls: ['./user-analytics.component.css']
})
export class UserAnalyticsComponent implements OnInit {
  side=false;
  employees:any[]=[];
  LeaveList:any[]=[];
  getScreenWidth: any;
   width:any;
   model = new SearchCriteria();
  EmployeeId:any;
  Employeeparam = new Emp; 
  employee_dates:object = [];

  constructor(private data:EmployeeService,private datePipe: DatePipe,private service:SpinnerService
    ,private toast:ToastrService,private dialog:MatDialog,private com:HttpClient) { 
       this.model = new SearchCriteria();
  }

  ngOnInit(): void {

    this.UserList();
    this.getScreenWidth = window.innerWidth;

    this.getScreenWidth = window.innerWidth;
    if(this.getScreenWidth <= 1500)
    {
      this.width = '18%';
    }
    else{
      this.width = '15%';
    }
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    if(this.getScreenWidth <= 1500)
    {
      this.width = '18%';
    }
   else if(this.getScreenWidth > 1500)
    {
      this.width = '15%';
    }
    
  }
sidebartog()
  {
    if( this.getScreenWidth >= 1068)
    {
      this.side = !this.side; 
    }
    if( this.getScreenWidth <= 1068)
    {
      this.side = false;
    }
 }

  UserList(){
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${Token}`
         });
         this.com.post('http://localhost:7182/api/Employee/LeaveList',null,{headers}).subscribe((response:any) =>{
           debugger;
          this.LeaveList = response.responseData;
         });
  }
filter()
{
  this.Employeeparam.holiday = "";
  this.Employeeparam.EmployeeId = this.EmployeeId;
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


  Clearfilter(){
  this.Employeeparam.EmployeeId = '';
  this.Employeeparam.StartDate = '';
  this.Employeeparam.EndDate = '';
  this.employees = [];
  }
}
