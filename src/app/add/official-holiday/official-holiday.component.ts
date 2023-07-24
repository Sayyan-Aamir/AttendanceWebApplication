import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import {HttpHeaders} from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HolidayList } from 'src/app/holiday-list';
import {HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SearchCriteria} from '../../Model/';

@Component({
  selector: 'app-official-holiday',
  templateUrl: './official-holiday.component.html',
  styleUrls: ['./official-holiday.component.css']
})
export class OfficialHolidayComponent implements OnInit {
  resultGridList :any;
  employeeName:any;
  side=false;
  item:any;
  employee:any[]=[];
  datasaved =false;
  employeeId:any;
  employeeForm:any;
  userid: number = 0;
  model = new SearchCriteria();
  list = new HolidayList();
  
  constructor(private data:EmployeeService, private serve:EmployeeService
    , public route: ActivatedRoute,private router:Router,
    private toast:ToastrService,private com:HttpClient) { 

      this.model = new SearchCriteria();
    this.list = new HolidayList();
  }
  ngOnInit(): void {
    this.model.FromDate = null;
    this.model.ToDate = null;
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${Token}`
         });
         this.com.post('http://localhost:7182/api/Employee/EmployeeList',this.model, {headers}).subscribe((response:any) =>{
         this.employeeName = response.responseData;
         });
  }

  sidebartog()
  {
    debugger;
    this.side = !this.side; 
  }
  
 msg(){
 this.toast.info("Form has been Reseted","Reset");
 }
 onsubmit(){
   this.datasaved = false;
    this.create();
 }
 create(){
  console.log(this.model);
  const Token = localStorage.getItem("Token");
  const headers = new HttpHeaders({
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${Token}`
       });
       debugger;
       this.com.post('http://localhost:7182/api/Employee/EmployeeLeave',this.model,{headers}).subscribe((response:any) =>{
       if(response.responseData == 'Leave Marked UnSuccessfully')
       {
        this.toast.error("Employee Leave already exists");
       }
       else
       {
        this.toast.success(response.responseData);
       }
       this.router.navigate(['/user-analytics']);
       });
  
 }
 }

