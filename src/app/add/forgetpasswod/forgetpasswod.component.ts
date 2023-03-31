import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Logincheck } from 'src/app/logincheck';
import { Sendemail} from 'src/app/sendemail';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgetpasswod',
  templateUrl: './forgetpasswod.component.html',
  styleUrls: ['./forgetpasswod.component.css']
})
export class ForgetpasswodComponent implements OnInit {
  msg:number= 1;
  msgs:number= 1;
  imagename = "/src/assets/img/testing.webp";
  Login:any="";
  Email:any="";
  detail = new Sendemail();
  employee = new Logincheck();
  
  constructor(private serve:EmployeeService,private router: Router,private toast:ToastrService) {
    this.detail = new Sendemail();
    this.employee = new Logincheck();
   }

  ngOnInit(): void {
  
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
  if(this.Email != null || this.Email != "")
  {
     this.msgs = 1;
  }
  if(this.Email == "")
  {
  this.msgs = 0;
  }
}

public authsave(token: string)
{
  localStorage.setItem('token',token);
}

email(){
  this.employee.Login = this.Login;
  debugger;
   this.detail.To = this.Email;
   this.detail.Subject = "Attendance App Management";
   this.detail.Body = "This Email Is Sent to You So That the Email can be Reset.\n Click The Link to set New Password";
   if(this.Email == "")
    {
      this.valuechanges(1);
    }
    else if(this.Login == ""){
      this.valuechange(1);
    }
  else{
   this.serve.LoginEmployee(this.employee).subscribe((data:any)=>{
  if(data == null || data == undefined)
  {
   this.toast.warning('Invalid UserName');
  }

  else{
  debugger;
  this.authsave(this.Login);
  this.serve.Sendmails(this.detail).subscribe((data:any) =>{
      debugger;
      this.toast.info('Email Send Successfully');
  });
 }
  })
}

} 
  
}
