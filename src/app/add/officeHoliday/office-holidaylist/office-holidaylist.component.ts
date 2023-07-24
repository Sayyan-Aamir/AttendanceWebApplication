import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {HolidayModel} from 'src/app/Model/holiday-model';

@Component({
  selector: 'app-office-holidaylist',
  templateUrl: './office-holidaylist.component.html',
  styleUrls: ['./office-holidaylist.component.css']
})
export class OfficeHolidaylistComponent implements OnInit {
  holidaylist:any = null;
  model = new HolidayModel();

  constructor(private com:HttpClient,private router: Router) { 
    this.model = new HolidayModel();
  }

  ngOnInit(): void {

  this.model.FromDate = null;
  this.model.ToDate = null;
  this.model.HolidayName = null;

  this.officeHolidaylist();
  }

  officeHolidaylist(){
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });
                  
  this.com.post('http://localhost:7182/api/Holiday/HolidayList',this.model, {headers}).subscribe((response:any) =>{
  this.holidaylist = response.responseData;
  });
  }

  delete(row:any){
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${Token}`
         });
         debugger;

         const url = `http://localhost:7182/api/Holiday/DeleteHoliday?HolidayId=${row.holidayId}`;

     this.com.post(url, null,{ headers }).subscribe((response: any) => {
    this.officeHolidaylist();
  });
  }

  update(row:any){
    this.router.navigate(['/officeholidayadd/' + row.holidayId]);
  }

}
