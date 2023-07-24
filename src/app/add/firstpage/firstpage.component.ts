import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Login } from 'src/app/login';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Empclass } from 'src/app/empclass';
import {product} from 'src/app/product';
import { ToastrService } from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.css']
})
export class FirstpageComponent implements OnInit {
  data = "";
  currentdate = new Date();
  s=0;
  emp:any=true;
  employeeId=null;
  signupform:any;
  EmployeeCode:string="";
  employee = new product();
  longitude:any;
  latitude:any;
  constructor(private serve:EmployeeService,private router: Router,private toast:ToastrService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
  this.s = this.currentdate.getDay();
  this.dialog.closeAll();
  const token = localStorage.getItem('Token');
debugger;
  if (token) {

    const parts = token.split('.');
    const header = parts[0];
    const payload = parts[1];
    const signature = parts[2];
    const decodedPayload = atob(payload);

    const payloadObj = JSON.parse(decodedPayload);
    const subject = payloadObj.sub;
    console.log(payloadObj);
    console.log(subject);
  }

  }
  public authsave(token: string)
  {
    localStorage.setItem('token',token);
  }
  checkinemployees(){
  this.employee.AttendanceMode = "Check-In";
  this.employee.EmployeeCode = this.EmployeeCode;
  this.authsave(this.EmployeeCode);
    
  console.log(this.employee.AttendanceMode);
  this.getCurrentLocation();
   if( this.employee.EmployeeCode != "")
   {
    this.serve.checkemployeesweekday(this.employee).subscribe((data:any) =>{
      let msg = data.Table[0].Message;
      debugger;
      if(msg == null)
      {
        this.toast.error('Invalid Code');
      }
      else
      {
        debugger;
        console.log(data.toString().length);
       if(msg == "You Got Checked-In Successfully")
       {
        this.toast.success('You Got Checked-In Successfully','Success');
       }
       else if(msg == "You Are Already Checked-In")
       {
        this.toast.success('You Are Already Checked-In','Success');
       }
      }
    })
   }
  //  else
  //  {
  //    this.toast.error('Enter Your Code');
  //  }


 }

 checkoutemployees(){
  debugger;
  this.employee.AttendanceMode = "Check-Out";
  this.employee.EmployeeCode = this.EmployeeCode;
  this.authsave(this.EmployeeCode);
  console.log(this.employee.AttendanceMode);
  if(this.employee.EmployeeCode != undefined || this.employee.EmployeeCode != "")
  {
   this.serve.checkemployeesweekday(this.employee).subscribe((data:any) =>{
     debugger;
     if(data == null)
     {
      this.toast.error('Invalid Code');
     }
     else
     {
      debugger;
      if(data.toString().length >= 30)
      {
        this.toast.success('You Got Checked-Out Successfully','Success');
      }
      else(data.toString().length <= 28)
      {
        this.toast.warning('You Are Already Checked-Out','Success');
      }
     }
   })
  }
  else
  {
    this.toast.error('Enter Your Code');
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        debugger;
        if (position) {
          console.log(
            'Latitude: ' +
              position.coords.latitude +
              'Longitude: ' +
              position.coords.longitude
          );
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          
        }
      },
      (error) => console.log(error)
    );
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}
 
 signup(){
   this.serve.Authenticate(1);
   this.router.navigate(['/newemployee']);
 }

 weekdays(){
  this.router.navigate(['/weekdays']);
 }


 getCurrentLocation() {
    
  debugger;
  navigator.geolocation.getCurrentPosition(
    (position: GeolocationPosition) => {
      
debugger;
      const point: google.maps.LatLngLiteral = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.employee.latitude = point.lat.toString();
      this.employee.longitude= point.lng.toString();

      // this.mapCenter = new google.maps.LatLng(point);
      // this.map.panTo(point);

      // this.markerInfoContent = "I'm here!";

      // this.markerOptions = {
      //   draggable: false,
      //   animation: google.maps.Animation.DROP,
      // };
    },
    (error) => {
      alert("Error location")
    },
    { enableHighAccuracy: true }
  );
}
}

