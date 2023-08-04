import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { ToastrService } from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {  SearchCriteria } from '../../Model';
import {  SiteSearchDto } from '../../Model/site-search-dto';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  EmployeeId:number = 0;
  allemployees:any[]=[];
  Sitelist:any[]=[];
  model = new SearchCriteria();
  Sitemodel = new SiteSearchDto();

  constructor(private data:EmployeeService,private router: Router,
    private toast:ToastrService,
    private com:HttpClient) {

    this.model = new SearchCriteria();
    this.Sitemodel = new SiteSearchDto();
   }
  employeeIdupdate=null;

  ngOnInit(): void {

    this.model.FromDate = null;
    this.model.ToDate = null;

    this.SiteList();
    this.EmployeeList();

    this.model.SiteId = 1;
  }

  EmployeeList(){
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': `Bearer ${Token}`
     });
     this.com.post('http://localhost:7182/api/Employee/EmployeeList',this.model, {headers}).subscribe((response:any) =>{
     this.allemployees = response.responseData;
     });
  }

  SiteList(){
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${Token}`
         });

         this.com.post('http://localhost:7182/api/Site/SiteList',this.Sitemodel, {headers}).subscribe((response:any) =>{
         this.Sitelist = response.responseData;
     });
  }

  delete(emp:any)
  {
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });

    this.EmployeeId = emp.employeeId;
    const url = `http://localhost:7182/api/Employee/DeleteEmployee?EmployeeId=${this.EmployeeId}`;

    this.com.post(url, null,{ headers }).subscribe((response: any) => {
    this.toast.success('Employee Deleted Successfully');
    this.EmployeeList();
  });
  }
  update(emp:any)
  {
    this.router.navigate(['/addemployee/' + emp.employeeId]);
  }


 updateeemp(employeeId: number){
  this.router.navigate(['/addemp/' + employeeId]);
  }

  filter(){

  if(this.model.SiteId == 1)
  {
    this.model.SiteId = null;
  }

  if(this.model.FromDate?.toString() == "")
  {
    this.model.FromDate = null;
  }

  if(this.model.ToDate?.toString() == "")
  {
    this.model.ToDate = null;
  }

    this.EmployeeList();

    this.toast.success('Employee list Displayed Successfully');
    this.model.SiteId = 1;
  }
  clearfilter(){
  this.model.FromDate = null;
  this.model.ToDate = null;
  this.model.Employee_Name = null;
  this.model.SiteId = null;

  this.EmployeeList();
  this.model.SiteId = 1;
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

    if(this.model.SiteId == 1)
    {
      this.model.SiteId = null;
    }

    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });
  
    const apiUrl = `http://localhost:7182/api/Employee/ExportEmployee`;
  
    this.com.post(apiUrl, this.model,{headers: headers, responseType: 'blob' }).subscribe(
      (response: Blob) => {
        this.downloadImage(response, "Employeelist");
      },
      (error) => {
        console.error('Error loading image:', error);
      }
    );
    this.model.SiteId = 1;
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


