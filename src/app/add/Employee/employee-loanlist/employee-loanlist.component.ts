import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {LoanModel} from 'src/app/Model/loan-model';

@Component({
  selector: 'app-employee-loanlist',
  templateUrl: './employee-loanlist.component.html',
  styleUrls: ['./employee-loanlist.component.css']
})
export class EmployeeLoanlistComponent implements OnInit {

 
  loanlist:any = null;
  model = new LoanModel();
  RequestId:number = 0;

  constructor(private com:HttpClient,private router: Router) { 
    this.model = new LoanModel();
  }

  ngOnInit(): void {

  this.model.LoanStatus = null;
  this.model.LoanDate = null;

  const Token = localStorage.getItem("Token");
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
  });
                  
  this.com.post('http://localhost:7182/api/Loan/UserLoanList',this.model, {headers}).subscribe((response:any) =>{
  this.loanlist = response.responseData;
  });
  this.model.LoanStatus = "1"
  }
  

  filter(){

  if(this.model.LoanStatus == "1")
  {
    this.model.LoanStatus = null;
  }

  if(this.model.LoanDate?.toString() == "")
  {
    this.model.LoanDate = null;
  }

    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });
                  
  this.com.post('http://localhost:7182/api/Loan/UserLoanList',this.model, {headers}).subscribe((response:any) =>{
  this.loanlist = response.responseData;
  });
  }

  clearfilter(){
 
    this.model.LoanDate = null;
    this.model.LoanStatus = null;

    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });
                  
  this.com.post('http://localhost:7182/api/Loan/UserLoanList',this.model, {headers}).subscribe((response:any) =>{
  this.loanlist = response.responseData;
  });
  this.model.LoanStatus = "1"
  }

  delete(loan:any){

    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });
    this.RequestId = loan.requestId;
    const url = `http://localhost:7182/api/Loan/DeleteLoanRequest?RequestId=${this.RequestId}`;

    this.com.post(url, null,{ headers }).subscribe((response: any) => {
    this.clearfilter();
  });
  }

  loandetail(loan:any){
    this.router.navigate(['/emploandetail/'+ loan.requestId]);
  }

  update(loan:any){
    this.router.navigate(['/loanrequest/'+ loan.requestId]);
  }

  export(){

    if(this.model.LoanStatus == "1")
    {
      this.model.LoanStatus = null;
    }
  
    if(this.model.LoanDate?.toString() == "")
    {
      this.model.LoanDate = null;
    }

    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });

    const apiUrl = `http://localhost:7182/api/Loan/ExportPdf`;
  
    this.com.post(apiUrl, this.model,{headers: headers, responseType: 'blob' }).subscribe(
      (response: Blob) => {
        this.downloadImage(response, "Loanlist");
      },
      (error) => {
        console.error('Error loading image:', error);
      }
    );
    this.model.LoanStatus == "1";
  }

  downloadImage(blobData: Blob, imageName: string): void {
    const url = window.URL.createObjectURL(blobData);
    const a = document.createElement('a');
    a.href = url;
    a.download = imageName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
