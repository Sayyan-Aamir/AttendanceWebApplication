import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Mode } from 'src/app/mode';
import { LeaveDetails } from 'src/app/leave-details';
import { DatePipe } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import {MatDialog} from '@angular/material/dialog';
import { HostListener} from "@angular/core";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  side=false;
  employees:any;
  employee:any;
  employes:any;
  employeesName:any[]=[];
  EmployeeId:any;
  datas:any;
  emp:any=false;
  Overtime:any;
  num:number = 0;
  pipe = new DatePipe('en-US');
  ChartData:any = [];
  test:any=[];
  rel:any=[];
  dat:any=[];
  chartpie:any=[];
  CompanyId:any;
  count:number=0;
  Checking:any=[];
  dataSource:object= [];
  getScreenWidth: any;
  width:any;
  meterscale:object= [];
  Details = new LeaveDetails();
  dataSource1:object= [];
  Doneit:object= [];
  dataSource2:object= [];
  dataSource3:object=[];
  chartdata = new Mode();
  constructor(private Services:EmployeeService,private router: Router,private toast:ToastrService,private dialog:MatDialog) { 
    this.chartdata = new Mode();
    this.Details = new LeaveDetails();
  }

  ngOnInit(): void {
    this.CompanyId = localStorage.getItem('Id');
    this.getScreenWidth = window.innerWidth;

    if(this.getScreenWidth <= 1500)
    {
      this.width = '15%';
    }
    else{
      this.width = '13%';
    }

    this.GetEmployeeTime();

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
  sidebartog()
  {
    this.side = !this.side; 
  }
  
  GetEmployeeTime(){
    this.Services.TimeDetail_Employee(this.CompanyId).subscribe(Result =>{
       debugger;
    });
  }

}
