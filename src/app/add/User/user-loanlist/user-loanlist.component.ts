import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {LoanModel} from 'src/app/Model/loan-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-loanlist',
  templateUrl: './user-loanlist.component.html',
  styleUrls: ['./user-loanlist.component.css']
})
export class UserLoanlistComponent implements OnInit {
  loanlist :any = [];
  model = new LoanModel();

  constructor(private com:HttpClient,private toast:ToastrService) { 
    this.model = new LoanModel();
  }

  ngOnInit(): void {
    this.GetUserLoanList();
  }

  GetUserLoanList(){
    const Token = localStorage.getItem("Token");
     const headers = new HttpHeaders({
           'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`
          });
       this.com.post('http://localhost:7182/api/Loan/EmployeeLoanList',null, {headers}).subscribe((response:any) =>{
       this.loanlist = response.responseData;
        });
  }

  updateLeave(list:any,request:any){

    this.model.LoanStatus = request;
    this.model.RequestId = list.requestId;

    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${Token}`
         });
      this.com.post('http://localhost:7182/api/Loan/UpdateLoanRequest',this.model, {headers}).subscribe((response:any) =>{
         this.GetUserLoanList();
         this.toast.success('Leave ' + request + " Successfully");
       });
  
  }

}
