import { Component, OnInit } from '@angular/core';
import {LoanModel} from 'src/app/Model/loan-model';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-loanrequest',
  templateUrl: './loanrequest.component.html',
  styleUrls: ['./loanrequest.component.css']
})
export class LoanrequestComponent implements OnInit {

  RequestId:any = 0;
  requestId: number = 0;
  model = new LoanModel();

  constructor(private com:HttpClient,private router: Router,
    private toast:ToastrService,public route: ActivatedRoute,
    public datepipe: DatePipe) { 
    this.model = new LoanModel();

    this.route.params.subscribe(id => {this.RequestId = id});
  }

  ngOnInit(): void {
    this.requestId = this.RequestId.id;

    if(parseInt(this.RequestId.id) > 0)
    {
  const Token = localStorage.getItem("Token");
  const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${Token}`
  });
  this.requestId = this.RequestId.id;
  const url = `http://localhost:7182/api/Loan/LoanDetails?RequestId=${this.requestId}`;

    this.com.post(url, null,{ headers }).subscribe((response: any) => {

    this.model.LoanAmount = response.responseData[0].loanAmount;
    this.model.LoanReason = response.responseData[0].loanReason;

    let yesterday = new Date(response.responseData[0].loanDate);
    yesterday.setDate(yesterday.getDate()-1);
    this.model.LoanDate = this.datepipe.transform(yesterday, 'yyyy-MM-dd');

  });
    }
  }

  add(){

    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
  });
                  
  this.com.post('http://localhost:7182/api/Loan/RequestLoan',this.model, {headers}).subscribe((response:any) =>{
  this.toast.success("loan Requested Successfully");
  this.router.navigate(['/empLoanlist']);
  });
  }

  Update(){
    this.model.RequestId = this.requestId;
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
  });
                  
  this.com.post('http://localhost:7182/api/Loan/UserUpdateloanrequest',this.model, {headers}).subscribe((response:any) =>{
  this.toast.success("loan Requested Successfully");
  this.router.navigate(['/empLoanlist']);
  });
  }

}
