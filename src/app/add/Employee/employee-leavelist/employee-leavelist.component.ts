import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {LeaveModel} from 'src/app/Model/leave-model';

@Component({
  selector: 'app-employee-leavelist',
  templateUrl: './employee-leavelist.component.html',
  styleUrls: ['./employee-leavelist.component.css']
})
export class EmployeeLeavelistComponent implements OnInit {

  leavelist:any = null;
  model= new LeaveModel();

  constructor(private com:HttpClient,private router: Router) { 
    this.model = new LeaveModel();
  }

  ngOnInit(): void {

  this.model.FromDate = null;
  this.model.ToDate = null;
  this.model.Status = null;

  this.employeeLeavelist();
  }

  employeeLeavelist(){
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });
                  
  this.com.post('http://localhost:7182/api/Employee/DuplicateEmployeeLeaveList',this.model, {headers}).subscribe((response:any) =>{
  this.leavelist = response.responseData;
  });
  }

  filter(){
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });
                  
  this.com.post('http://localhost:7182/api/Employee/DuplicateEmployeeLeaveList',this.model, {headers}).subscribe((response:any) =>{
  this.leavelist = response.responseData;
  });
  }

  clearfilter(){
 
    this.model.FromDate = null;
    this.model.ToDate = null;
    this.model.Status = null;

    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });
                  
  this.com.post('http://localhost:7182/api/Employee/DuplicateEmployeeLeaveList',this.model, {headers}).subscribe((response:any) =>{
  this.leavelist = response.responseData;
  });
}

export(){
  const Token = localStorage.getItem("Token");
  const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${Token}`
  });

  const apiUrl = `http://localhost:7182/api/Employee/ExportPdf`;

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
