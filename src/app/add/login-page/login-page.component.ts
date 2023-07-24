import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Logincheck } from 'src/app/logincheck';
import { Sendemail} from 'src/app/sendemail';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  msg:number= 1;
  RoleId: number = 0;
  msgs:number= 1;
  Login:any="";
  Password:any="";
  employee = new Logincheck();
  detail = new Sendemail();
  
  constructor(private serve:EmployeeService,private router: Router,
    private toast:ToastrService,private dialog:MatDialog,private com:HttpClient) {
    this.employee = new Logincheck();
    this.detail = new Sendemail();
   }

  ngOnInit(): void {
    // this.opendialog();
}

// opendialog(){
//   this.dialog.open(AddempComponent);
// }

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
      
      this.serve.Login(this.Login,this.Password).subscribe(result =>{
        let message = result.responseData;
         if(message == null || message == "" || message == undefined)
         {
           this.toast.error('Invalid Data');
         }
         else
         {
           localStorage.setItem('Token',result.responseData);
           this.toast.success('Logged In Successfully','Success');
           this.serve.Authenticate(1);

           const Token = localStorage.getItem("Token");
           const headers = new HttpHeaders({
                 'Content-Type': 'application/json',
                  'Authorization': `Bearer ${Token}`
                });
       
                this.com.post('http://localhost:7182/api/Employee/GetRole',null, {headers}).subscribe((response:any) =>{
                 debugger; 
                this.RoleId =  response.responseData;

                 if(this.RoleId == 1)
                {
                  this.router.navigate(['/dashboard']);
                }
                else{
                  this.router.navigate(['/Empdashboard']);
                }

                });

         }
      })


      // this.serve.LoginEmployee(this.employee).subscribe((data:any) =>{
      //   let message = data.Table[0];
      //   if(message == null || message == "" || message == undefined)
      //   {
      //     this.toast.error('Invalid Data');
      //   }
      //   else
      //   {
      //     debugger;
      //     localStorage.setItem('token',data.Table[0].CompanyName);
      //     localStorage.setItem('Id',data.Table[0].CompanyId);
      //     this.toast.success('Logged In Successfully','Success');
      //     this.serve.Authenticate(1);
      //     this.router.navigate(['/dashboard']);
      //   }
      // })
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