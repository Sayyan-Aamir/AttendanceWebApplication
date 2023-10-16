import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import {environment} from 'src/environments/environment';;
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {CompanyModel} from 'src/app/add/Company/company-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {
  url=environment.baseurl;
  Token: any = localStorage.getItem("Token");
  headers: any = new HttpHeaders({
    'Content-Type': 'application/json',
         'Authorization': `Bearer ${this.Token}`
    });  

  constructor(private com:HttpClient) { 
  }

  CompanySigUp(company: CompanyModel): Observable<CompanyModel>
  {
   return this.com.post<CompanyModel>(this.url +'/api/Company/CreateCompany', company,this.headers).pipe(
       map((response: any) => {
      return response; // Assuming the response is of type CompanyModel
  })
  );

}

}
