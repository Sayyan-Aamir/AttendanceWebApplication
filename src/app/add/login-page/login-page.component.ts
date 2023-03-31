import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Logincheck } from 'src/app/logincheck';
import { Sendemail} from 'src/app/sendemail';
import {MatDialog} from '@angular/material/dialog';
import { AddempComponent } from '../addemp/addemp.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  msg:number= 1;
  msgs:number= 1;
  Login:any="";
  Password:any="";
  employee = new Logincheck();
  detail = new Sendemail();
  
  constructor(private serve:EmployeeService,private router: Router,private toast:ToastrService,private dialog:MatDialog) {
    this.employee = new Logincheck();
    this.detail = new Sendemail();
   }

  ngOnInit(): void {
    this.opendialog();
}

opendialog(){
  this.dialog.open(AddempComponent);
}

valuechange(s:any){
  if(this.Login != null || this.Login != "")
  {
     this.msg = 1;
  }
  if(this.Login == "")
  {
        this.msg = 0;
  }
}

valuechanges(s:any){
  if(this.Password != null || this.Password != "")
  {
     this.msgs = 1;
  }
  if(this.Password == "")
  {
        this.msgs = 0;
  }
}

check(){
  this.employee.Login = this.Login;
  this.employee.password = this.Password;
  if(this.employee.Login != "" ||  this.employee.password != "")
  {
    if(this.employee.Login == "")
    {
      this.valuechange(1);
    }
    else if(this.employee.password == ""){
      this.valuechanges(1);
    }

    else{
      this.msg = 1
      this.msgs = 1;
      debugger;
      this.serve.LoginEmployee(this.employee).subscribe((data:any) =>{
        let message = data.Table[0];
        if(message == null || message == "" || message == undefined)
        {
          this.toast.error('Invalid Data');
        }
        else
        {
          debugger;
          localStorage.setItem('token',data.Table[0].CompanyName);
          localStorage.setItem('Id',data.Table[0].CompanyId);
          this.toast.success('Logged In Successfully','Success');
          this.serve.Authenticate(1);
          this.router.navigate(['/dashboard']);
        }
      })
    }
  }
}

email(){
   this.detail.To = "sayyankhawaja@gmail.com";
   this.detail.Subject = "It is Working";
   this.detail.Body = "Ausz Tech";
   this.serve.Sendmails(this.detail).subscribe((data:any) =>{
    let message = data.Table[0];
      this.toast.success('Logged In Successfully','Success');
      this.serve.Authenticate(1);
      this.router.navigate(['/dashboard']);
  })
} 
  
}