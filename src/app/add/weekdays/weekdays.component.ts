import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {product} from 'src/app/product';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { Login } from 'src/app/login';

import { Empclass } from 'src/app/empclass';
import { Token } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-weekdays',
  templateUrl: './weekdays.component.html',
  styleUrls: ['./weekdays.component.css']
})
export class WeekdaysComponent implements OnInit {
  data = "";
  currentdate = new Date();
  s=0;
  employeeId=null;
  signupform:any;
  EmployeeCode:string="";
  employee = new product();
  //Attendence= new product();
  constructor(private serve:EmployeeService,private router: Router,private toast:ToastrService) { }

  ngOnInit(): void {
  this.s = this.currentdate.getDay();
  this.toast.info('Attendence for Weekdays');
  }
  checkinemployees(){
  this.employee.AttendanceMode = "Check-In";
  this.employee.EmployeeCode = this.EmployeeCode;
  debugger;
   if( this.employee.EmployeeCode != "")
   {
     this.authsave(this.EmployeeCode);
     debugger;
    this.serve.checkemployeesweekday(this.employee).subscribe((data:any) =>{
      if(data == null)
      {
        this.toast.error('Invalid Code');
      }
      else
      {
        debugger;
       if(data.toString().length >= 29)
       {
        this.toast.success('You Got Checked-In Successfully','Success');
       }
       else(data.toString().length <= 26)
       {
        this.toast.success('You Are Already Checked-In','Success');
       }
        this.serve.Authenticate(1);
        this.router.navigate(['/list']);
      }
    })
   }
   else
   {
    this.toast.error('Enter Your Code');
   }
 }

 public authsave(token: string)
 {
   localStorage.setItem('token',token);
 }

 public clearAuthData() {  
  localStorage.removeItem("token");  
} 

public getAuthData() {  
  const token = localStorage.getItem("token");   
  if(token)
  {
    return;
  }
  return{
    token:token
  }
}

 checkoutemployees(){
  this.employee.AttendanceMode = "Check-Out";
  this.employee.EmployeeCode = this.EmployeeCode;
  if(this.employee.EmployeeCode != undefined || this.employee.EmployeeCode != "")
  {
   this.serve.checkemployeesweekday(this.employee).subscribe((data:any) =>{
     debugger;
     if(data == null)
     {
              this.toast.error('Invalid Code');
     }
     else
     {
      debugger;
      if(data.toString().length >= 30)
      {
        this.toast.success('You Got Checked-Out Successfully','Success');
      }
      else(data.toString().length <= 28)
      {
        this.toast.success('You Are Already Checked-Out','Success');
      }
     }
   })
  }
  else
  {
    this.toast.error('Enter Your Code');
  }
}
 signup(){
   this.serve.Authenticate(1);
   this.router.navigate(['/newemployee']);
 }
}
