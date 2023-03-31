import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import {MatDialog} from '@angular/material/dialog';
import { Empclass } from 'src/app/empclass';
import { ToastrService } from 'ngx-toastr';
import { HostListener} from "@angular/core";
import { LeaveDetails } from 'src/app/leave-details';
import { Token } from '@angular/compiler/public_api';

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
  width:any;
  RoleId:any = 0;
  RoleList:any[] = [];
  Company:any[]=[];
  CompanyId:any;
  Names:string="";
  getScreenWidth: any;
  Details = new LeaveDetails();
  allemployees:any[]=[];
  constructor(private data:EmployeeService,private router: Router,private sanitizer: DomSanitizer,private toast:ToastrService,private dialog:MatDialog) {
    this.Details = new LeaveDetails();
   }
  employeeIdupdate=null;

  ngOnInit(): void {
    this.loadEmployees();
    this.loadCompany();
    this.loadRoles();
    this.getScreenWidth = window.innerWidth;

    if(this.getScreenWidth <= 1500)
    {
      this.width = '15%';
    }
    else{
      this.width = '13%';
    }
  }
  
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    if(this.getScreenWidth <= 1500)
    {
      this.width = '15%';
    }
   else if(this.getScreenWidth > 1500)
    {
      this.width = '13%';
    }
    
  }
  opendialog(){
      this.dialog.open(SpinnerComponent, {data: {LeaveId: this.Details.LeaveId}});
  }
  loadEmployees(){
    this.CompanyId = localStorage.getItem('Id');
    this.data.getAllEmployees(this.Names,this.CompanyId).subscribe(response=>{
        // response.Base64Image = this.sanitizer.bypassSecurityTrustResourceUrl('Base64Image;base64,' 
        // + response.Table);
        this.allemployees=response.Table;
    });
  }
  transform(base64ImageNew: any) {

    base64ImageNew = "data:image/jpg/png/jpeg;base64," + base64ImageNew;

    return this.sanitizer.bypassSecurityTrustResourceUrl(base64ImageNew);
}

 loadCompany(){
  const arr = [
     {CompanyName: localStorage.getItem('token'),Id: localStorage.getItem('Id')}
 ];
  this.Company = arr;
}

 loadRoles(){
  this.data.RoleList().subscribe(response=>{
    debugger;
      this.RoleList = response.Table;
  });
}

  delete(emp:any)
  {
    {
      this.data.deleteemps(emp).subscribe(res=>{
        this.toast.success('Employee Deleted Successfully');
        this.loadEmployees();
      })
    }
  }
  update(emp:Empclass)
  {
    this.router.navigate(['/addemployee/' + emp.EmployeeId]);
  }
  sidebartog()
  {
    this.side = !this.side; 
  }
 updateeemp(employeeId: number){
  this.router.navigate(['/addemp/' + employeeId]);
  }

  filter(){
    debugger;
    if(this.Name == undefined || this.Name == null)
    {
      this.Name = "";
    }
   this.data.getAllEmployees(this.Name,this.CompanyId).subscribe(result =>{
    this.allemployees=result.Table;
    if(result.Table[0] != null)
    {
      this.toast.success('Employee Displayed Successfully');
    }
   })
  }
  clearfilter(){
    this.loadEmployees();
    this.toast.success('Employees Displayed Successfully');
    this.Name = "";
    this.CompanyId = "";
  }
  leave(){
 this.opendialog();
  }
 }


