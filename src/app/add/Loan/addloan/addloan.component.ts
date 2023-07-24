import { Component, OnInit } from '@angular/core';
import {LoanModel} from 'src/app/Model/loan-model';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {  SearchCriteria } from 'src/app/Model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addloan',
  templateUrl: './addloan.component.html',
  styleUrls: ['./addloan.component.css']
})
export class AddloanComponent implements OnInit {
  model = new LoanModel();
  LoanTitle:any = null;
  employeeList:any = null;
  Employee = new SearchCriteria();

  constructor(private com:HttpClient,private toast:ToastrService,private router: Router) { 
    this.model = new LoanModel();
    this.Employee = new SearchCriteria();
  }

  ngOnInit(): void {

    this.Employee.FromDate = null;
    this.Employee.ToDate = null; 

    this.EmployeeList();

    const Token = localStorage.getItem("Token");
     const headers = new HttpHeaders({
           'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`
          });

               this.com.post('http://localhost:7182/api/Loan/LoanTitleList',null, {headers}).subscribe((response:any) =>{
             
               this.LoanTitle = response.responseData
              });
  }

  EmployeeList(){
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': `Bearer ${Token}`
     });
     this.com.post('http://localhost:7182/api/Employee/EmployeeList',this.Employee, {headers}).subscribe((response:any) =>{
     this.employeeList = response.responseData;
     });
  }

  add(){
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
           'Authorization': `Bearer ${Token}`
         });
                  
              this.com.post('http://localhost:7182/api/Loan/AddLoan',this.model, {headers}).subscribe((response:any) =>{
             this.toast.success('Loan Added Successfully');
             this.router.navigate(['/loanlist']);
             });
  }

}
