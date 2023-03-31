import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Empclass } from 'src/app/empclass';
import { ActivatedRoute, Router } from '@angular/router';
import { HolidayList } from 'src/app/holiday-list';
import { Mode } from 'src/app/mode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-official-holiday',
  templateUrl: './official-holiday.component.html',
  styleUrls: ['./official-holiday.component.css']
})
export class OfficialHolidayComponent implements OnInit {
  resultGridList :any;
  side=false;
  item:any;
  employee:any[]=[];
  datasaved =false;
  employeeId:any;
  employeeForm:any;
  userid: number = 0;
  mode = new Mode();
  list = new HolidayList();
  
  constructor(private data:EmployeeService, private serve:EmployeeService, private builder:FormBuilder, public route: ActivatedRoute,private router:Router,private sanitizer: DomSanitizer,
    private toast:ToastrService) { 
    this.mode = new Mode();
    this.list = new HolidayList();
  }
  ngOnInit(): void {
    debugger;
    this.employeeFormBuilder();
    this.mode.modes = "list";
    this.lists(this.mode);   
  }

   lists(e:Mode)
   {
    this.data.getholidaylist(this.mode).subscribe(response=>{
      this.employee = response.Table;
      this.userid = 0;
    })
   }

  sidebartog()
  {
    debugger;
    this.side = !this.side; 
  }
  
 employeeFormBuilder(){
    this.employeeForm=this.builder.group({
      holiday_name:['',],
      holiday_date:['',[Validators.required]],
      holiday_Id:[0],
    })
  }
 msg(){
 this.toast.info("Form has been Reseted","Reset");
 }
 onsubmit(Employee:any){
  debugger;
   this.datasaved = false;
   const employee=Employee;
   this.create(employee);
 }
 create(employee:HolidayList){
  debugger;
  this.item =localStorage.getItem("token");
  if(employee.holiday_date!="" && this.employeeId == undefined)
  {
    employee.created_by = this.item;
    this.serve.creates(employee).subscribe(response=>{
      this.toast.success("Entered Successfully");
     this.mode.modes = "list";
     this.lists(this.mode);
    });
  }
  else if(this.employeeId != null || this.employeeId != undefined)
  {
    employee.updated_by = this.item;
    employee.holiday_Id = this.employeeId;
    this.serve.creates(employee).subscribe(response=>{
      this.toast.success("Employee Updated Successfully");
      this.mode.modes = "list";
      this.lists(this.mode);
     });
  }
  else
  {
    this.toast.error("Fill the form");
  }

 }
 delete(e:any)
 {
    this.mode.holiday_Id=e.holiday_Id;
    this.mode.modes = "delete";
    debugger;
    this.data.getholidaylist(this.mode).subscribe(response=>{
      this.mode.modes = "list";
      this.lists(this.mode);
      this.toast.success("Holiday Deleted Successfully");
  })
 }

 update(e:any)
 {
    this.mode.holiday_Id = e.holiday_Id;
    this.mode.modes = "update";
    debugger;
    this.data.getholidaylist(this.mode).subscribe(response=>{
      debugger;
      this.userid = 1;
      this.resultGridList = [];
      this.resultGridList=response.Table;
      this.employeeForm.controls['holiday_name'].patchValue(this.resultGridList[0].holiday_name);
      this.employeeForm.controls['holiday_date'].patchValue(this.resultGridList[0].holiday_date);
      this.employeeId = this.resultGridList[0].holiday_Id;
      this.toast.success("Holiday Updated Successfully");
    })
 }
 
}

