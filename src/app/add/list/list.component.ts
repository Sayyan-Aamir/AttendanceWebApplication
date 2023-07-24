import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import {MatDialog} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HostListener} from "@angular/core";
import { LeaveDetails } from 'src/app/leave-details';
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
  resultGridList:any;
  side=false;
  item:any="";
  Name:any;
  EmployeeId:number = 0;
  width:any;
  RoleId:any = 0;
  RoleList:any[] = [];
  Company:any[]=[];
  CompanyId:any;
  Names:string="";
  getScreenWidth: any;
  Details = new LeaveDetails();
  allemployees:any[]=[];
  Sitelist:any[]=[];
  model = new SearchCriteria();
  Sitemodel = new SiteSearchDto();

  constructor(private data:EmployeeService,private router: Router,private sanitizer: DomSanitizer,private toast:ToastrService,private dialog:MatDialog,
    private com:HttpClient) {
    this.Details = new LeaveDetails();
    this.model = new SearchCriteria();
    this.Sitemodel = new SiteSearchDto();
   }
  employeeIdupdate=null;

  ngOnInit(): void {

    this.model.FromDate = null;
    this.model.ToDate = null; 

    this.EmployeeList();
    this.SiteList()

    this.getScreenWidth = window.innerWidth;

    if(this.getScreenWidth <= 1500)
    {
      this.width = '18%';
    }
    else{
      this.width = '15%';
    }
  }
  
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    if(this.getScreenWidth <= 1500)
    {
      this.width = '15%';;
    }
   else if(this.getScreenWidth > 1500)
    {
      this.width = '13%';
    }
    
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

  opendialog(){
      this.dialog.open(SpinnerComponent, {data: {LeaveId: this.Details.LeaveId}});
  }
  transform(base64ImageNew: any) {

    base64ImageNew = "data:image/jpg/png/jpeg;base64," + base64ImageNew;

    return this.sanitizer.bypassSecurityTrustResourceUrl(base64ImageNew);
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
  sidebartog()
  {
    this.side = !this.side; 
  }
 updateeemp(employeeId: number){
  this.router.navigate(['/addemp/' + employeeId]);
  }

  filter(){
    this.EmployeeList();
    this.toast.success('Employee list displayed successfully');
  }
  clearfilter(){
  this.model.FromDate = null;
  this.model.ToDate = null;
  this.model.Employee_Name = null;
  this.model.SiteId = null;

  this.EmployeeList();
  }
  leave(){
 this.opendialog();
  }
 }


