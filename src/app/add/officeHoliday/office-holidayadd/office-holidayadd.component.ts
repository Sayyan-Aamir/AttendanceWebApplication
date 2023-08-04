import { Component, OnInit } from '@angular/core';
import {HolidayModel} from 'src/app/Model/holiday-model';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-office-holidayadd',
  templateUrl: './office-holidayadd.component.html',
  styleUrls: ['./office-holidayadd.component.css']
})
export class OfficeHolidayaddComponent implements OnInit {
  model = new HolidayModel();
  holidayId : any = 0;
  buttonvalue : number = 0;

  constructor(private com:HttpClient,private router: Router,private toast:ToastrService,
    public route: ActivatedRoute,public datepipe: DatePipe) { 
    this.model = new HolidayModel();

    this.route.params.subscribe(id => {this.holidayId = id});
  }

  ngOnInit(): void {
    
  this.buttonvalue = this.convertStringToInt(this.holidayId.id);

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

  let yesterday = new Date(response.responseData[0].toDate);
  yesterday.setDate(yesterday.getDate()-1);
  this.model.ToDate = this.datepipe.transform(yesterday, 'yyyy-MM-dd');

  yesterday = new Date(response.responseData[0].fromDate);
  yesterday.setDate(yesterday.getDate()-1);
  this.model.FromDate = this.datepipe.transform(yesterday, 'yyyy-MM-dd');
  });
    }
   
  }


  convertStringToInt(inputString: string): number {
    // Remove the colon ":" from the inputString
    const numericString = inputString.replace(':', '');

    // Parse the numericString into an integer using parseInt
    const integerValue = parseInt(numericString, 10); // The second argument (10) is the radix/base, and it should always be 10 for decimal numbers.

    return integerValue;
  }

  add(){ 
    debugger;

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
