import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import {LoanModel} from 'src/app/Model/loan-model';

@Component({
  selector: 'app-loandetaillist',
  templateUrl: './loandetaillist.component.html',
  styleUrls: ['./loandetaillist.component.css']
})
export class LoandetaillistComponent implements OnInit {

  loanlist :any = [];
  requestId: any = 0;
  model = new LoanModel();

  constructor(private com:HttpClient,private toast:ToastrService,
  public route: ActivatedRoute) { 

    this.model = new LoanModel();

    this.route.params.subscribe(id => {this.requestId = id});

    }

  ngOnInit(): void {
  this.LoanDetailList();
  }

  LoanDetailList(){

  this.model.RequestId = Number(this.requestId.id);

  const Token = localStorage.getItem("Token");
  const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${Token}`
  });


  this.com.post('http://localhost:7182/api/Loan/UserLoanDetailList',this.model, {headers}).subscribe((response:any) =>{
  this.loanlist = response.responseData;
  this.toast.success('Loan Detail Displayed Successfully');
  });

  }

}
