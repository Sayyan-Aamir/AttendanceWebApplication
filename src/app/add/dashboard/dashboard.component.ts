import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {  SearchCriteria } from '../../Model';
import { Buffer } from 'buffer';
import { DatePipe } from '@angular/common';

const data = "";
const testSource = "";
const Guagedata = "";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tableDataYearly:any;
  styleObject = {
    color: 'red'
  };

  side=false;
  getScreenWidth: any;
  width:any;
  Present:number = 1;
  Absent:number = 1;
  Late:number = 1;
  Leave:number = 1;
  CompanyId : number = 0;
  Leavelist :any = [];
  loanlist :any = [];
  Requestsnumber : number = 0;
  loanRequests: number = 0;

  model = new SearchCriteria();
  imageUrl:string = "";
  Width = 600;
  height = 400;
  type = "pie2d";
  data:any = "";
  item:any="";
  Charttype = "angulargauge";
  Charttypes = "stackedcolumn2d";
  LineChartName = "msspline";
  dataFormat = "json";
  dataSource :any= data;
  GuagedataSource :any= Guagedata;
  StackedSource: any = testSource;
  LineSource: any;
  total: number;
  

  constructor(private com:HttpClient,private Services:EmployeeService,private router: Router,private toast:ToastrService,private datePipe: DatePipe) {
  this.model = new SearchCriteria();
  this.total = 11;
  }

  ngOnInit(): void {

    this.GetUserLeaveList();
    this.GetUserLoanList();

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

  GetUserLoanList(){
    const Token = localStorage.getItem("Token");
     const headers = new HttpHeaders({
           'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`
          });
       this.com.post('http://localhost:7182/api/Loan/EmployeeLoanList',null, {headers}).subscribe((response:any) =>{

       this.loanlist = response.responseData;
       this.loanRequests =  this.loanlist.length;
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


          const apiUrl = `http://localhost:7182/api/Dashboard/DashboardLineChart`
          this.com.get(apiUrl, {headers: headers, responseType: 'json' }).subscribe(
            (response: any) => {

              const categories = [];
              const dataset = [];

              const propertyNames = ["present", "absent", "late"];

              for (let i = 0; i < response.responseData.length; i++) {
                const dateLabel = this.datePipe.transform(response.responseData[i].date, 'yyyy-MM-dd');
                
                // Add category label
                categories.push({ "label": dateLabel });

                const propertyName = propertyNames[i];
                // Create dataset for present, absent, and late
                const data = [
                  { "value": response.responseData[0][propertyName] },
                  { "value": response.responseData[1][propertyName] },
                  { "value": response.responseData[2][propertyName] },
                  { "value": response.responseData[3][propertyName] },
                  { "value": response.responseData[4][propertyName] }
                ];
                
                // Add dataset series
                dataset.push({
                  "seriesname": dateLabel + " Status",
                  "data": data
                });
              }
              
              // Create the chart object
              const dd = {
                chart: {
                  "caption": "Revenue split by product category",
                  "subCaption": "Last 7 Days",
                  "xAxisname": "Days",
                  "yAxisName": "Number of Employees",
                  "showSum": "1",
                  "numberPrefix": "",
                  "theme": "fusion"
                },
                categories: [{
                  "category": categories
                }],
                dataset: dataset
              };                                        

  this.StackedSource = dd;
  });

  const api = `http://localhost:7182/api/Dashboard/DashboardChart`;
  this.com.get(api, { headers: headers, responseType: 'json' }).subscribe(
    (response: any) => {
      
      const category = [];
      const datasets = [];

      const propertyNames = ["leave", "absent", "present","present","present"];
      const datasetColors = ["#800080", "#FF0000", "#008000", "#008000", "#008000"];
      for (let i = 0; i < response.responseData.length; i++) {
        const dateLabel = this.datePipe.transform(response.responseData[i].date, 'yyyy-MM-dd');
        // Add category label
        category.push({ "label": dateLabel });
  
        const propertyName = propertyNames[i];
        const colors = datasetColors[i];
        // Create dataset for present, absent, and late
        const data = [
          { "value": response.responseData[0][propertyName] },
          { "value": response.responseData[1][propertyName] },
          { "value": response.responseData[2][propertyName] },
          { "value": response.responseData[3][propertyName]},
          { "value": response.responseData[4][propertyName] }
        ];

          // Add dataset series
          datasets.push({
          "seriesname": dateLabel,
          "data": data,
          "color": datasetColors[i]
          });
      }

      const lineChart = {
        chart: {
          "caption": "Last Week data of Employees",
          "subCaption": "Last week",
          "xAxisname": "Days",
          "yAxisName": "Number of Employees",
          "yAxisMinValue": "0",
          "setAdaptiveYMin":"0",
          "theme": "fusion"
        },
        categories: [{
          "category": category
        }],
        dataset: datasets
      };
  
      this.LineSource = lineChart;
    }
  );

       const TabledataApi = `http://localhost:7182/api/Dashboard/DashboardTableDataYearly`;
     this.com.get(TabledataApi, { headers: headers, responseType: 'json' }).subscribe(
    (response: any) => {
       this.tableDataYearly = response.responseData;
    }
  );
}

  Navigate(emp:any){
    this.router.navigate(['/empList/' + emp]);
  }

  List(emp:any){
    this.router.navigate(['/Ablist/' + emp]);
  }

}
