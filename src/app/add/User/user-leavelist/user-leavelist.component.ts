import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {LeaveModel} from 'src/app/Model/leave-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-leavelist',
  templateUrl: './user-leavelist.component.html',
  styleUrls: ['./user-leavelist.component.css']
})
export class UserLeavelistComponent implements OnInit {
  Leavelist :any = [];
  model = new LeaveModel();

  constructor(private com:HttpClient,private toast:ToastrService) { 
    this.model = new LeaveModel();
  }

  ngOnInit(): void {
    this.GetUserLeaveList();
  }

  GetUserLeaveList(){
    const Token = localStorage.getItem("Token");
     const headers = new HttpHeaders({
           'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`
          });
       this.com.post('http://localhost:7182/api/Employee/UserLeaveList',null, {headers}).subscribe((response:any) =>{
       this.Leavelist = response.responseData;
        });
  }

  updateLeave(list:any,request:any){
    debugger;
    this.model.RequestLeave = request;
    this.model.LeaveId = list.leaveId;
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${Token}`
         });
      this.com.post('http://localhost:7182/api/Employee/UpdateLeaveRequest',this.model, {headers}).subscribe((response:any) =>{
         this.GetUserLeaveList();
         this.toast.success('Leave ' + request + " Successfully");
       });
  
  }
}
