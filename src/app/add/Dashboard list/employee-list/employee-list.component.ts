import { Component, OnInit } from '@angular/core';
import {  SearchCriteria } from 'src/app/Model';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  allemployees:any=null;
  status:any = null;
  styleObject = {
    color: 'red'
  };
  model = new SearchCriteria();

  constructor(private com:HttpClient, public route: ActivatedRoute) { 
    this.model = new SearchCriteria();

    this.route.params.subscribe(id => {this.status = id});

  }

  ngOnInit(): void {

    this.model.FromDate = null;
    this.model.ToDate = null;
    this.model.Attendancestatus = this.status.id;

     if(this.model.Attendancestatus == 'Present')
     {
      this.styleObject.color = 'green';
      this.status = 'On Time';
     }
     else
     {
      this.styleObject.color = 'red';
      this.status = 'Late';
     }

    this.loadAttendance();
  }

  loadAttendance(){
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });
    this.com.post('http://localhost:7182/api/Dashboard/DashboardStatus',this.model, {headers}).subscribe((response:any) =>{
    this.allemployees = response.responseData; });
  }

}
