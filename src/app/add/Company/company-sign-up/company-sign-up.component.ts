import { Component, OnInit } from '@angular/core';
import {CompanyModel} from 'src/app/add/Company/company-model';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {CompanyServiceService} from 'src/app/add/Company/company-service.service';

@Component({
  selector: 'app-company-sign-up',
  templateUrl: './company-sign-up.component.html',
  styleUrls: ['./company-sign-up.component.css']
})
export class CompanySignUpComponent implements OnInit {

  model = new CompanyModel();

  constructor(private com:HttpClient,private toast:ToastrService,
    private Companyservice:CompanyServiceService) { 
    this.model = new CompanyModel();
  }

  ngOnInit(): void {}

  CompanySignUp(){  

    if(this.model.Password != this.model.ConfirmPassword)
    {
      debugger;
      this.toast.error('Match The Password');
    }
    else{
      debugger;
      this.Companyservice.CompanySigUp(this.model).subscribe(response =>{
        this.toast.success('Company Created Successfully');
      });
    }
   
  }

}
