import { EmployeeService } from 'src/app/employee.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/spinner.service';
import { Output, EventEmitter, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Emp } from 'src/app/emp';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveDetails } from 'src/app/leave-details';
import { DatePipe } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  side=false;
  item:any;
  Name:any="";
  employees:any[]=[];
  employeesName:any[]=[];
  Details = new LeaveDetails();
  Startdate:any;
  Enddate:any;
  EmployeeId:any="";
  empId:number=0;
  LeaveId: any = 0;
  Employeeparam = new Emp;  
  @Output() submitClicked = new EventEmitter<any>();

  constructor(private service:SpinnerService,private router: Router,private EmpService:EmployeeService,private dialog:MatDialog,private toast:ToastrService,
     public route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: LeaveDetails,public datepipe: DatePipe) {
      this.Details = new LeaveDetails();
   }

  ngOnInit(): void {
    this.LeaveId = this.data.LeaveId;
    this.item = localStorage.getItem('Id');
    this.Details.LeaveId = this.LeaveId;  
    this.Details.EmployeeId = this.data.EmployeeId;  
    if(this.LeaveId != 0)
    {
      this.EmpService.Leaves_Employee(this.Details).subscribe(response=>{
        debugger;
        this.employees=response.Table[0];
        this.Details=response.Table[0];
        this.Startdate  =this.datepipe.transform(this.Details.FromDate, 'yyyy-MM-dd');
        this.Enddate  =this.datepipe.transform(this.Details.ToDate, 'yyyy-MM-dd');
        this.Name = response.Table[0].UserName;
        this.empId = response.Table[0].EmployeeId;
    });
    }
    // this.EmpService.getemp().subscribe(response=>
    //   {
    //   this.employeesName=response.Table;
    // });
    
    this.EmpService.getAllEmployees("",this.item).subscribe(response=>
      {
      this.employeesName=response.Table;
    });
  }

  close(){
    this.dialog.closeAll();
  }
  markleave()
{
  debugger;
  this.Details.EmployeeId = this.EmployeeId;
  this.Details.FromDate = this.Startdate;
  this.Details.ToDate = this.Enddate;


 if(this.Details.EmployeeId == null)
 {
  this.toast.error("Select an Employee");
 }
 if(this.Details.LeaveId != 0)
 {
   this.Details.EmployeeId = this.empId;
   this.UpdateLeave();
 }
else
{
  debugger;
  this.EmpService.Employee_Leave(this.Details).subscribe(response=>{
    debugger;
    if(response == null)
    {
      this.toast.success('Employee Leave Added SuccessFully');
      this.dialog.closeAll();
    }

  });
}

}

UpdateLeave(){
  debugger;
  this.EmpService.Employee_Leave(this.Details).subscribe(response=>{
    debugger;
    if(response == null)
    {
      this.toast.success('Employee Leave Updated SuccessFully');
      this.dialog.closeAll();
    }
  });
}
}
