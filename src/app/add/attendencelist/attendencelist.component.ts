import { Component, OnInit } from '@angular/core';
import { Emp } from 'src/app/emp';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from 'src/app/employee.service';
import { ToastrService } from 'ngx-toastr';
import { HostListener} from "@angular/core";

@Component({
  selector: 'app-attendencelist',
  templateUrl: './attendencelist.component.html',
  styleUrls: ['./attendencelist.component.css']
})
export class AttendencelistComponent implements OnInit {
  side=false;
  employees:any[]=[];
  employeesName:any[]=[];
  row:any[]=[];
  Startdate:any;
  width:any;
  getScreenWidth: any;
  Enddate:any;
  value:any=0;
  EmployeeId:any;
  Employeeparam = new Emp;   
  BackgroundColor:any;
  constructor(private data:EmployeeService,private router:Router,private toast:ToastrService) { 
    this.Employeeparam = new Emp;  
  }

  ngOnInit(): void {
    this.loadEmployees();
    this.data.getemp().subscribe(response=>{
      debugger;
      this.employeesName=response.Table;
      this.toast.success("List Displayed Successfully","Successfully");
    });
    if(this.getScreenWidth <= 1500)
    {
      this.width = '13%';
    }
    else{
      this.width = '13%';
    }
  }

  loadEmployees(){
    debugger;
    this.data.getlist(this.Employeeparam).subscribe(response=>{
      debugger;
      this.employees=response.Table;
      this.row=response.Table;
    });
    
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    if(this.getScreenWidth <= 1500)
    {
      this.width = '13%';
    }
   else if(this.getScreenWidth > 1500)
    {
      this.width = '13%';
    }
  }
  
  add()
  {
    this.router.navigate(['/addemp/' + 0]);
  }
  sidebartog()
  {
    this.side = !this.side; 
  }
  filter()
  {
    debugger;
    this.Employeeparam.EmployeeId =this.EmployeeId;
    this.Employeeparam.StartDate = this.Startdate;
    this.Employeeparam.EndDate = this.Enddate;
    debugger;
    this.data.getlist(this.Employeeparam).subscribe(response=>{
      debugger;
      this.toast.success('Employee List Displayed Successfully','Success');
      this.employees=response.Table;
  })
}

  Clearfilter(){
    debugger;
    this.Employeeparam.EmployeeId = '';
    this.Employeeparam.StartDate = '';
    this.Employeeparam.EndDate = '';
    this.data.getlist(this.Employeeparam).subscribe(response=>{
      this.employees=response.Table;
    });
  }
  signup(){
    debugger;
    this.router.navigate(['/user-analytics']);
  }
  Location(emp:any){
    debugger;
      let url = "http://www.google.com/maps/place/"+emp.latitude + "," + emp.longitude;
      window.open(url, "_blank");
  }
  
}
