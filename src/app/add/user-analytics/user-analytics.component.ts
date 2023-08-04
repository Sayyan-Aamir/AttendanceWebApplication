import { Component, OnInit } from '@angular/core';
import { Emp } from 'src/app/emp';
import { EmployeeService } from 'src/app/employee.service';
import { ToastrService } from 'ngx-toastr';
import {  SearchCriteria } from '../../Model';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-user-analytics',
  templateUrl: './user-analytics.component.html',
  styleUrls: ['./user-analytics.component.css']
})
export class UserAnalyticsComponent implements OnInit {

  LeaveList:any[]=[];
  model = new SearchCriteria();

  constructor(
    private toast:ToastrService,private com:HttpClient) { 
    this.model = new SearchCriteria();
  }

  ngOnInit(): void {

  this.model.FromDate = null;
  this.model.ToDate = null;
  this.model.Status = null;

    this.UserList();
    this.model.Status = "1";
  }

  UserList(){
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${Token}`
         });
         this.com.post('http://localhost:7182/api/Employee/DuplicateLeaveList',this.model,{headers}).subscribe((response:any) =>{
           debugger;
          this.LeaveList = response.responseData;
         });

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
  
      if(this.model.Status == "1")
      {
        this.model.Status = null;
      }
      this.UserList();

  }


  clearfilter(){
    this.model.FromDate = null;
    this.model.ToDate = null;
    this.model.Status = null;

    this.UserList();
    this.model.Status = "1";
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
  
    const apiUrl = `http://localhost:7182/api/Employee/ExportLeave`;
  
    this.com.post(apiUrl, this.model,{headers: headers, responseType: 'blob' }).subscribe(
      (response: Blob) => {
        this.downloadImage(response, "Leavelist");
      },
      (error) => {
        console.error('Error loading image:', error);
      }
    );

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
