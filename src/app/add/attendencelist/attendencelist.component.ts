import { Component, OnInit } from '@angular/core';
import { Emp } from 'src/app/emp';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { ToastrService } from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {Attendancelist} from '../../Model/attendancelist';
import {  SearchCriteria } from '../../Model';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-attendencelist',
  templateUrl: './attendencelist.component.html',
  styleUrls: ['./attendencelist.component.css']
})
export class AttendencelistComponent implements OnInit {

  employees:any;
  employeesName:any;
  attendanceList = new Attendancelist();
  value:any=0;
  EmployeeId:any;
  Employeeparam = new Emp;   

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
         this.model.Employee_Name = "1"
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
            }
            else{
              this.toast.error('Attendance List Cannot be Displayed','Failed');
            }
          });
  }
  
  add()
  {
    this.router.navigate(['/addemp/' + 0]);
  }
  filter()
  {
    if(this.model.FromDate?.toString() == "")
    {
      this.model.FromDate = null;
    }

    if(this.model.ToDate?.toString() == "")
    {
      this.model.ToDate = null;
    }

    if(this.model.Employee_Name == "1")
    {
      this.model.Employee_Name = null;
    }

    this.loadAttendance();
    this.toast.success('Attendance list Displayed Successfully');
  }

  clearfilter(){
    this.model.FromDate = null;
    this.model.ToDate = null;
    this.model.Employee_Name = null;
    this.loadAttendance();

    this.model.Employee_Name = "1"
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

  export(){

    if(this.model.FromDate?.toString() == "")
    {
      this.model.FromDate = null;
    }

    if(this.model.ToDate?.toString() == "")
    {
      this.model.ToDate = null;
    }

    if(this.model.Employee_Name == "1")
    {
      this.model.Employee_Name = null;
    }

    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });
  
    const apiUrl = `http://localhost:7182/api/Attendance/ExportPdf`;
  
    this.com.post(apiUrl, this.model,{headers: headers, responseType: 'blob' }).subscribe(
      (response: Blob) => {
        this.downloadImage(response, "Attendancelist");
      },
      (error) => {
        console.error('Error loading image:', error);
      }
    );

    this.model.Employee_Name = "1";
  }
  
  downloadImage(blobData: Blob, imageName: string): void {
    const url = window.URL.createObjectURL(blobData);
    const a = document.createElement('a');
    a.href = url;
    a.download = imageName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
  
}
