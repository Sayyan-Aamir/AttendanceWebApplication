import { Component, OnInit } from '@angular/core';
import {LeaveModel} from 'src/app/Model/leave-model';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requestleave',
  templateUrl: './requestleave.component.html',
  styleUrls: ['./requestleave.component.css']
})
export class RequestleaveComponent implements OnInit {

  model = new LeaveModel();
  LoanTitle:any = null;

  constructor(private com:HttpClient,private router: Router,private toast:ToastrService) { 
    this.model = new LeaveModel();
  }

  ngOnInit(): void {
    
    this.model.Status = "Full Day Leave";

    const Token = localStorage.getItem("Token");
     const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });

  this.com.post('http://localhost:7182/api/Loan/LoanTitleList',null, {headers}).subscribe((response:any) =>{          
  this.LoanTitle = response.responseData
  });
  }


  add(){
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });
                  
    this.com.post('http://localhost:7182/api/Employee/LeaveRequest',this.model, {headers}).subscribe((response:any) =>{
   this.toast.success("Leave Requested Successfully");
  this.router.navigate(['/empleavelist']);
  });
  }

}
