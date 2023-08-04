import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {  SearchCriteria } from 'src/app/Model';
import { Buffer } from 'buffer';
import {Ng4LoadingSpinnerService} from 'src/app/Services/ng4-loading-spinner-service.service';

const data = "";

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  Present:number = 1;
  Absent:number = 1;
  Late:number = 1;
  Leave:number = 1;
  OnTime: number = 0;
  UserId: number = 1;
  Monthlylist: any = null;

  model = new SearchCriteria();
  imageUrl:string = "";
  Width = 600;
  height = 400;
  type = "pie2d";
  Charttype = "angulargauge";
  dataFormat = "json";
  dataSource :any= data;
  DataSource:any= data;

  constructor(private com:HttpClient,
    private router: Router,private service:Ng4LoadingSpinnerService
    ) { 
      this.model = new SearchCriteria();
  }

  ngOnInit(): void {

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
  
  GetEmployeeTime(){

    const Token = localStorage.getItem("Token");
     const headers = new HttpHeaders({
           'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`
          });

               this.com.post('http://localhost:7182/api/Employee/GetUser',null, {headers}).subscribe((response:any) =>{
               this.UserId =  response.responseData;
               const url = `http://localhost:7182/api/Employee/EmployeeDashboard?UserId=${this.UserId}`;

              this.com.post(url, null,{ headers }).subscribe((response: any) => {
                debugger;
                 this.Monthlylist = response.responseData.item2;

             if(response.responseData.item2 == null)
             {
              this.Monthlylist = null;
             }

                this.Present = response.responseData.item1[0].presentPercent;
                this.Absent = response.responseData.item1[0].absentPercent;
                this.Late = response.responseData.item1[0].latePercent;
                this.Leave = response.responseData.item1[0].leavePercent;
                this.OnTime = response.responseData.item1[0].onTimePercent;
   
              const chartdata = {
                 chart: {
                   caption: "Attendance Summary of Employee",
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
                     value: this.Present,
                     color:'#50C878',
                   },
                   {
                     label: "Absent",
                     value: this.Absent,
                     color: '#FF0000'
                   },
                   {
                     label: "Leave",
                     value: this.Late,
                     color:'#91288d'
   
                   }
                 ]
               };
               this.dataSource = chartdata
   
               const Chartdata = {
                 chart: {
                   caption: "Time Summary of Employee",
                  // plottooltext: "Attendance Summary of Employees",
                   showlegend: "1",
                   showpercentvalues: "1",
                   legendposition: "bottom",
                   usedataplotcolorforlabels: "1",
                   theme: "fusion"
                 },
                 data: [
                   {
                     label: "OnTime",
                     value: this.OnTime,
                     color:'#50C878',
                   },
                   {
                     label: "Late",
                     value: this.Late,
                     color:'#FFEF00'
   
                   }
                 ]
               };
               this.DataSource = Chartdata
             });
               });

  }

  Nvaigate(){
    this.router.navigate(['/attendencelist']);
  }

}
