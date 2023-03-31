import { Component, OnInit } from '@angular/core';
import { HostListener} from "@angular/core";
import {NewCompany} from 'src/app/new-company';
import { EmployeeService } from 'src/app/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {
  getScreenWidth: any;
  side=false;
  width:any;
  Name:any;
  NewCompany = new NewCompany();
  constructor(private Service:EmployeeService,private toast:ToastrService) {
    this.NewCompany = new NewCompany();
   }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;

    if(this.getScreenWidth <= 1500)
    {
      this.width = '15%';
    }
    else{
      this.width = '13%';
    }
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    if(this.getScreenWidth <= 1500)
    {
      this.width = '15%';
    }
   else if(this.getScreenWidth > 1500)
    {
      this.width = '13%';
    }
    
  }

  sidebartog()
  {
    this.side = !this.side; 
  }


  newComapny(){
    this.NewCompany.Login = this.NewCompany.CompanyName;
    this.NewCompany.Password = this.NewCompany.CompanyCode;
    this.NewCompany.UserFirstName = this.NewCompany.CompanyName;
    this.NewCompany.UserEmail = this.NewCompany.CompanyEmail;
     this.Service.createnewCompany(this.NewCompany).subscribe(result => {
     debugger;
      this.toast.success('Employee Deleted Successfully');
     });
  }
}
