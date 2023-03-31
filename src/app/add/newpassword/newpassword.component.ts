import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Logincheck } from 'src/app/logincheck';
import { Sendemail} from 'src/app/sendemail';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {
  msg:number= 1;
  msgs:number= 1;
  new:any="";
  confirm:any="";
  employee = new Logincheck();
  item:any="";
  
  constructor(private serve:EmployeeService,private router: Router,private toast:ToastrService) {
    this.employee = new Logincheck();
   }

  ngOnInit(): void {
  
}
valuechange(s:any){
  if(this.new != null || this.new != "")
  {
     this.msg = 1;
  }
  if(this.new == "")
  {
        this.msg = 0;
  }
}

valuechanges(s:any){
  if(this.confirm != null || this.confirm != "")
  {
     this.msgs = 1;
  }
  if(this.confirm == "")
  {
  this.msgs = 0;
  }
}

email(){
  debugger;
    if(this.new == this.confirm)
    { 
    this.item = localStorage.getItem("token"); 
    this.employee.Login = this.item;
    this.employee.password = this.new;
    this.serve.Set_NewPassword(this.employee).subscribe((data:any) =>{
      this.toast.info('New Password Set Successfully');
      this.router.navigate(['/login']);
    })  
    }
    else{
      this.toast.warning('Enter Correct Password');
    }
} 
  
}
