import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {  SearchCriteria } from '../../Model';
import {MatDialog} from '@angular/material/dialog';
import { HostListener} from "@angular/core";
import { Buffer } from 'buffer';

const data = "";
const Guagedata = "";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  side=false;
  getScreenWidth: any;
  width:any;
  Present:number = 1;
  Absent:number = 1;
  Late:number = 1;
  Leave:number = 1;
  CompanyId : number = 0;
  Leavelist :any = [];
  Requestsnumber : number = 0;

  model = new SearchCriteria();
  imageUrl:string = "";
  Width = 600;
  height = 400;
  type = "pie2d";
  Charttype = "angulargauge";
  dataFormat = "json";
  dataSource :any= data;
  GuagedataSource :any= Guagedata;

  constructor(private com:HttpClient,private Services:EmployeeService,private router: Router,private toast:ToastrService,private dialog:MatDialog) { 
      this.model = new SearchCriteria();
  }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
    this.GetUserLeaveList();

    if(this.getScreenWidth <= 1500)
    {
      this.width = '18%';
    }
    else{
      this.width = '15%';
    }

    this.GetEmployeeTime();
    const token = localStorage.getItem('Token');
      if (token) {
    
        const parts = token.split('.');
        const header = parts[0];
        const payload = parts[1];
        const signature = parts[2];

        const base64String = payload;
        const decodedString = Buffer.from(base64String, 'base64').toString('utf-8');
        const decode = decodeURI(decodedString);
    
        const startingCharacter = '/';
        const stoppingString = '"';
        const startingIndex = decode.indexOf(startingCharacter);
        const stoppingIndex = decode.indexOf(stoppingString, startingIndex + 1);
        const substring = decode.substring(startingIndex + 1, stoppingIndex);      

        this.imageUrl = substring;
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

  GetUserLeaveList(){
    const Token = localStorage.getItem("Token");
     const headers = new HttpHeaders({
           'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`
          });
       this.com.post('http://localhost:7182/api/Employee/UserLeaveList',null, {headers}).subscribe((response:any) =>{

       this.Leavelist = response.responseData;
       this.Requestsnumber =  this.Leavelist.length;
        });
  }

  sidebartog()
  {
    this.side = !this.side; 
  }
  
  GetEmployeeTime(){

    const Token = localStorage.getItem("Token");
     const headers = new HttpHeaders({
           'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`
          });
       this.com.post('http://localhost:7182/api/Dashboard/Dashboard',this.model, {headers}).subscribe((response:any) =>{
            this.Present = response.responseData.present;
            this.Absent = response.responseData.absent;
            this.Late = response.responseData.late;
            this.Leave = response.responseData.leave;

           const chartdata = {
              chart: {
                caption: "Attendance Summary of Employees",
               // plottooltext: "Attendance Summary of Employees",
                showlegend: "1",
                showpercentvalues: "1",
                legendposition: "bottom",
                usedataplotcolorforlabels: "1",
                theme: "fusion"
              },
              data: [
                {
                  label: "Present",
                  value: response.responseData.presentPercent,
                  color:'#50C878',
                },
                {
                  label: "Absent",
                  value: response.responseData.absentPercent,
                  color: '#FF0000'
                },
                {
                  label: "Late",
                  value: response.responseData.latePercent,
                  color:'#FFEF00'

                },
                {
                  label: "Leave",
                  value: response.responseData.leavePercent,
                  color: '#91288d'
                }
              ]
            };
            this.dataSource = chartdata

            const Guage = {
              chart: {
                caption: "Overall Attendance Percantage of Office",
                lowerlimit: "0",
                upperlimit: "100",
                showvalue: "1",
                numbersuffix: "%",
                theme: "fusion",
                showtooltip: "0",
                gaugeOuterRadius: '40%', // Set the outer radius of the gauge
               gaugeInnerRadius: '70%'  // Set the inner radius of the gauge
              },
              colorrange: {
                color: [
                  {
                    minvalue: "0",
                    maxvalue: "100",
                    code: "#91288d"
                  }
                ]
              },
              dials: {
                dial: [
                  {
                    value: response.responseData.overallAttendance
                  }
                ]
              }
            };
            this.GuagedataSource = Guage;
          });

  }

  Navigate(emp:any){
    this.router.navigate(['/empList/' + emp]);
  }

  List(emp:any){
    this.router.navigate(['/Ablist/' + emp]);
  }

}
