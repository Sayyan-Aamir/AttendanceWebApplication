import { Component, OnInit } from '@angular/core';
import {HolidayModel} from 'src/app/Model/holiday-model';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';


@Component({
  selector: 'app-office-holidayadd',
  templateUrl: './office-holidayadd.component.html',
  styleUrls: ['./office-holidayadd.component.css']
})
export class OfficeHolidayaddComponent implements OnInit {
  model = new HolidayModel();
  holidayId : any = 0;

  constructor(private com:HttpClient,private router: Router,private toast:ToastrService,
    public route: ActivatedRoute) { 
    this.model = new HolidayModel();

    this.route.params.subscribe(id => {this.holidayId = id});
  }

  ngOnInit(): void {

    if(this.holidayId.id > 0)
    {  
     this.model.FromDate 

    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
  });
                  
  const url = `http://localhost:7182/api/Holiday/GetHoliday?HolidayId=${parseInt(this.holidayId.id)}`;
  this.com.post(url, null,{ headers }).subscribe((response: any) => {

  this.model.HolidayName = response.responseData[0].holidayName;
  this.model.Description = response.responseData[0].description;
  this.model.FromDate = response.responseData[0].fromDate;
  this.model.ToDate = response.responseData[0].toDate;
  });
    }
   
  }

  add(){ 

    if(parseInt(this.holidayId.id) > 0)
    {
      this.model.HolidayId = parseInt(this.holidayId.id);

      const Token = localStorage.getItem("Token");
      const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Token}`
    });
    debugger;
                    
    this.com.post('http://localhost:7182/api/Holiday/UpdateHoliday',this.model, {headers}).subscribe((response:any) =>{
    this.toast.success("holiday updated successfully");
    this.router.navigate(['/officeholiday']);
    });
    }

    else{
      const Token = localStorage.getItem("Token");
      const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Token}`
    });
                    
    this.com.post('http://localhost:7182/api/Holiday/AddHoliday',this.model, {headers}).subscribe((response:any) =>{
    this.toast.success("office holiday added successfully");
    this.router.navigate(['/officeholiday']);
    });
    }

   
  }

}
