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
    this.model.LoanDate = null;
    this.model.FromDate = null;
    this.model.ToDate = null; 

    this.EmployeeList();
    this.LoanList();

    this.loanModel.EmployeeName = "1";  
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

   if(this.loanModel.EmployeeName == "1")
   {
    this.loanModel.EmployeeName = null;
   }

    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': `Bearer ${Token}`
     });
     this.com.post('http://localhost:7182/api/Loan/LoanList',this.loanModel, {headers}).subscribe((response:any) =>{
     this.loanList = response.responseData;
     });

     this.loanModel.EmployeeName = "1";  
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

    if(this.loanModel.LoanDate?.toString() == "")
    {
      this.loanModel.LoanDate = null;
    }

    if(this.loanModel.EmployeeName == "1")
    {
      this.loanModel.EmployeeName = null;
    }

    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': `Bearer ${Token}`
     });
     this.com.post('http://localhost:7182/api/Loan/LoanList',this.loanModel, {headers}).subscribe((response:any) =>{
     this.loanList = response.responseData;
     });
     this.loanModel.EmployeeName = "1";
     this.toast.success('Loan list displayed successfully');
  }
  clearfilter(){
    
  this.model.LoanDate = null;
  this.model.EmployeeName = null;

  this.loanModel.LoanDate = null;
  this.loanModel.EmployeeName = null;

  this.LoanList();
  }

  update(loan:any){
    this.router.navigate(['/updateloan/' + loan.loanId]);
  }

  listPage(id:any){
    this.router.navigate(['/loandetail/' + id]);
  }

  export(){

    if(this.loanModel.LoanDate?.toString() == "")
    {
      this.loanModel.LoanDate = null;
    }

    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });
  
    const apiUrl = `http://localhost:7182/api/Loan/ExportLoan`;
  
    this.com.post(apiUrl, this.loanModel,{headers: headers, responseType: 'blob' }).subscribe(
      (response: Blob) => {
        this.downloadImage(response, "Loanlist");
      },
      (error) => {
        console.error('Error loading image:', error);
      }
    );

    this.model.Employee_Name = "1";
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
