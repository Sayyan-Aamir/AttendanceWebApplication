import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import {LoanModel} from 'src/app/Model/loan-model';

@Component({
  selector: 'app-loan-detail-list',
  templateUrl: './loan-detail-list.component.html',
  styleUrls: ['./loan-detail-list.component.css']
})
export class LoanDetailListComponent implements OnInit {
  Leavelist :any = [];
    loanId: any = 0;
    model = new LoanModel();

  constructor(private com:HttpClient,private toast:ToastrService,
    public route: ActivatedRoute) { 

      this.model = new LoanModel();

      this.route.params.subscribe(id => {this.loanId = id});

  }

  ngOnInit(): void {
    this.LoanDetailList();
  }

  LoanDetailList(){

    this.model.LoanId = Number(this.loanId.id);

    debugger;
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${Token}`
         });
      this.com.post('http://localhost:7182/api/Loan/LoanDetailList',this.model, {headers}).subscribe((response:any) =>{
         debugger;
         this.Leavelist = response.responseData;
         this.toast.success('Loan Detail Displayed Successfully');
       });
  
  }

}
