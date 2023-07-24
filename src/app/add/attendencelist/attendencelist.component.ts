import { Component, OnInit } from '@angular/core';
import { Emp } from 'src/app/emp';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { ToastrService } from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import { HostListener} from "@angular/core";
import {Attendancelist} from '../../Model/attendancelist';
import {  SearchCriteria } from '../../Model';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-attendencelist',
  templateUrl: './attendencelist.component.html',
  styleUrls: ['./attendencelist.component.css']
})
export class AttendencelistComponent implements OnInit {
  side=false;
  employees:any;
  employeesName:any;
  attendanceList = new Attendancelist();
  row:any[]=[];
  Startdate:any;
  width:any;
  getScreenWidth: any;
  Enddate:any;
  value:any=0;
  EmployeeId:any;
  Employeeparam = new Emp;   
  BackgroundColor:any;

  model = new SearchCriteria();
  constructor(private data:EmployeeService,private router:Router,private toast:ToastrService,
    private com:HttpClient) { 
    this.Employeeparam = new Emp;  
    this.model = new SearchCriteria();
    this.attendanceList = new Attendancelist();
  }

  ngOnInit(): void {
    this.loadAttendance();
    this.model.Employee_Name = null;  
    this.model.FromDate = null;
    this.model.ToDate = null; 
    
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${Token}`
         });
         this.com.post('http://localhost:7182/api/Employee/EmployeeList',this.model, {headers}).subscribe((response:any) =>{

         this.employeesName = response.responseData;
         });

    if(this.getScreenWidth <= 1500)
    {
      this.width = '18%';
    }
    else{
      this.width = '18%';
    }
  }

  loadAttendance(){
    const Token = localStorage.getItem("Token");
     const headers = new HttpHeaders({
           'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`
          });
          this.com.post('http://localhost:7182/api/Attendance/AttendanceList',this.model, {headers}).subscribe((response:any) =>{
          this.employees = response.responseData;
            if(this.employees != null || this.employees != undefined)
            {
              this.toast.success('Employee List Displayed Successfully','Success');
            }
            else{
              this.toast.error('Employee List Cannot be Displayed','Failed');
            }
          });
  }

  sidebartog()
  {
    this.side = !this.side; 
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
      this.width = '16%';
    }
  }
  
  add()
  {
    this.router.navigate(['/addemp/' + 0]);
  }
  filter()
  {
    console.log(this.model.Employee_Name);
    this.loadAttendance();

}

  Clearfilter(){
    this.model.FromDate = new Date();
    this.model.ToDate = new Date();
    this.model.Employee_Name = null;
    this.loadAttendance();
  }
  signup(){
    debugger;
    this.router.navigate(['/user-analytics']);
  }
  Location(emp:any){
    debugger;
      let url = "http://www.google.com/maps/place/"+emp.latitude + "," + emp.longitude;
      window.open(url, "_blank");
  }
  
}
