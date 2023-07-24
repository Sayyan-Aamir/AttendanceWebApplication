import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { ToastrService } from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {SearchCriteria} from 'src/app/Model';
import {LoanModel} from 'src/app/Model/loan-model';

@Component({
  selector: 'app-loanlist',
  templateUrl: './loanlist.component.html',
  styleUrls: ['./loanlist.component.css']
})
export class LoanlistComponent implements OnInit {

  LoanId:number = 0
  allemployees:any;
  loanList:any;
  model = new SearchCriteria();
  loanModel = new LoanModel();

  constructor(private data:EmployeeService,private router: Router,private toast:ToastrService,
    private com:HttpClient) {
   
      this.model = new SearchCriteria();
      this.loanModel = new LoanModel();
    }
  employeeIdupdate=null;

  ngOnInit(): void {
    this.model.FromDate = null;
    this.model.ToDate = null; 

    this.EmployeeList();
    this.LoanList();
  }

  EmployeeList(){
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': `Bearer ${Token}`
     });
     this.com.post('http://localhost:7182/api/Employee/EmployeeList',this.model, {headers}).subscribe((response:any) =>{
      debugger;
     this.allemployees = response.responseData;
     });
  }

  LoanList(){
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': `Bearer ${Token}`
     });
     this.com.post('http://localhost:7182/api/Loan/LoanList',this.loanModel, {headers}).subscribe((response:any) =>{
     this.loanList = response.responseData;
     });
  }

  delete(loanId:any)
  {

    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${Token}`
         });

         this.LoanId = loanId;
         const url = `http://localhost:7182/api/Loan/DeleteLoan?LoanId=${loanId}`;

     this.com.post(url, null,{ headers }).subscribe((response: any) => {
    this.toast.success('Loan Deleted Successfully');
    this.LoanList();
  });
  }

 updateeemp(employeeId: number){
  this.router.navigate(['/addemp/' + employeeId]);
  }

  filter(){

    debugger;
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': `Bearer ${Token}`
     });
     this.com.post('http://localhost:7182/api/Loan/LoanList',this.loanModel, {headers}).subscribe((response:any) =>{
     this.loanList = response.responseData;
     });

    this.toast.success('Loan list displayed successfully');
  }
  clearfilter(){

  this.EmployeeList();
  }

  update(loan:any){
    this.router.navigate(['/updateloan/' + loan.loanId]);
  }

  listPage(id:any){
    this.router.navigate(['/loandetail/' + id]);
  }
}
