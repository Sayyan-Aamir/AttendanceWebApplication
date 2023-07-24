import { Component, OnInit } from '@angular/core';
import {LoanModel} from 'src/app/Model/loan-model';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-loan',
  templateUrl: './update-loan.component.html',
  styleUrls: ['./update-loan.component.css']
})
export class UpdateLoanComponent implements OnInit {

  model = new LoanModel();
  loanId: any = 0;

  constructor(private com:HttpClient,private toast:ToastrService,private router: Router,
    public route: ActivatedRoute) { 
    this.model = new LoanModel();

    this.route.params.subscribe(id => {this.loanId = id});

  }

  ngOnInit(): void {
     this.model.LoanId = Number(this.loanId.id);
  }

  add(){
    debugger;
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
           'Authorization': `Bearer ${Token}`
         });
                  
              this.com.post('http://localhost:7182/api/Loan/LoanDetail',this.model, {headers}).subscribe((response:any) =>{
             this.toast.success('Loan Updated Successfully');
             this.router.navigate(['/loanlist']);
             });
  }

}
