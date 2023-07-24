import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-employee-leavelist',
  templateUrl: './employee-leavelist.component.html',
  styleUrls: ['./employee-leavelist.component.css']
})
export class EmployeeLeavelistComponent implements OnInit {

  leavelist:any = null;

  constructor(private com:HttpClient,private router: Router) { 

  }

  ngOnInit(): void {
  this.employeeLeavelist();
  }

  employeeLeavelist(){
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });
                  
  this.com.post('http://localhost:7182/api/Employee/EmployeeLeaveList',null, {headers}).subscribe((response:any) =>{
  this.leavelist = response.responseData;
  });
  }

}
