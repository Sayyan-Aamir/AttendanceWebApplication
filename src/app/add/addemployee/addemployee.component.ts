import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {  SiteSearchDto } from '../../Model/site-search-dto';
import {  EmployeeModel } from '../../Model/employee-model';
import { DatePipe, Time } from '@angular/common';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {




  SiteName:any = null;
  StartTime: Date | null | Time  = null;
  Gender:any = null;
  Sitelist:any[]=[];
  Sitemodel = new SiteSearchDto();
  Employeemodel = new EmployeeModel();
  datasaved =false;
  GenderList:any[] = [];
  employeeId=null;
  employeeForm:any;
  userid: any = 0;
  empId:number = 0;
  tablehidden=false;
  url:any='';
  en:any='';
  file:any="";
  updatedImage:any="";
  buttonvalue: number = 0;
  
  constructor(private data:EmployeeService, private serve:EmployeeService,
     private builder:FormBuilder, public route: ActivatedRoute,private router:Router
    ,private com:HttpClient,public datepipe: DatePipe,
    private toast:ToastrService) { 

    this.Sitemodel = new SiteSearchDto();
    this.Employeemodel = new EmployeeModel();

    this.route.params.subscribe(id => {this.userid = id});
  }
  ngOnInit(): void {

    if(this.userid.id > 0)
    {
      this.tablehidden = true;
      this.getUser();
    }

    this.buttonvalue = this.convertStringToInt(this.userid.id);

    this.SiteList();
    this.employeeFormBuilder();
    this.GenderList = [
      {
        value: 'Male'
      },
      {
        value: 'Female'
      },
      {
        value: 'Other'
      }
    ];


  }

  convertStringToInt(inputString: string): number {
    // Remove the colon ":" from the inputString
    const numericString = inputString.replace(':', '');

    // Parse the numericString into an integer using parseInt
    const integerValue = parseInt(numericString, 10); // The second argument (10) is the radix/base, and it should always be 10 for decimal numbers.

    return integerValue;
  }


  onSelectedFile(event:any)
   {
     if(event.target.files.length > 0)
     {
       this.updatedImage="";
       var reader = new FileReader();
       reader.readAsDataURL(event.target.files[0]);
       reader.onload=(events:any)=>{
       this.url =events.target.result;
       }
        this.file = event.target.files[0];
      } 
     
    }

  getUser()
  {
    this.empId = parseInt(this.userid.id, 10);
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': `Bearer ${Token}`
     });
     this.com.post('http://localhost:7182/api/Employee/GetEmployee',this.empId, {headers}).subscribe((response:any) =>{
      this.employeeForm.controls['FirstName'].patchValue(response.responseData.firstName);
      this.employeeForm.controls['LastName'].patchValue(response.responseData.lastName);
      this.employeeForm.controls['Email'].patchValue(response.responseData.email);
      // this.employeeForm.controls['SiteId'].patchValue(response.responseData.siteName);
      this.SiteName = response.responseData.siteName;
      this.employeeForm.controls['DepartmentName'].patchValue(response.responseData.gender);
      this.Gender = response.responseData.gender;
      this.Employeemodel.Gender = this.Gender;
      console.log(this.Employeemodel.Gender);
      this.employeeForm.controls['ContactNumber'].patchValue(response.responseData.contactNumber);
      this.employeeForm.controls['Addresses'].patchValue(response.responseData.addresses);
      this.employeeForm.controls['EmployeeCode'].patchValue(response.responseData.employeeCode);
      this.employeeForm.controls['DateOfBirth'].patchValue(response.responseData.DateOfBirth);
      this.employeeForm.controls['City'].patchValue(response.responseData.city);
      this.Employeemodel.StartTime = response.responseData.startTime != null ? this.datepipe.transform(response.responseData.startTime,'HH:MM') : new Date('2000-01-01');
      this.employeeForm.controls['DepartmentName'].patchValue(response.responseData.DepartmentName);
      this.employeeForm.controls['WorkingHours'].patchValue(response.responseData.workingHours);
      this.employeeForm.controls['EmployeeId'].patchValue(response.responseData.employeeId);
      // this.updatedImage = response.responseData.Base64Image;
      // this.onSelectedFile(response.responseData.Imagename);

     });

     
  }

  SiteList(){
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${Token}`
         });

         this.com.post('http://localhost:7182/api/Site/SiteList',this.Sitemodel, {headers}).subscribe((response:any) =>{
         this.Sitelist = response.responseData;

         for(const item of this.Sitelist)
         {
           if(item.siteName == this.SiteName)
           this.Employeemodel.SiteId = item.siteId;
           break;
         }
     });
  }

 employeeFormBuilder(){
    this.employeeForm=this.builder.group({
      SiteId:['',[Validators.required]],
      FirstName:['',[Validators.required]],
      LastName:[''],
      Email:[''],
      DepartmentName:[''],
      ContactNumber:[''],
      Addresses:[''],
      EmployeeCode:['',[Validators.required]],
      DateOfBirth:[''],
      City:[''],
      StartTime:['',[Validators.required]],
      WorkingHours:['',[Validators.required]],
     // Image:[''],
      EmployeeId:[0],
    })
  }
 resetForm(){
 this.employeeForm.reset();
 this.datasaved= false;
 }
 reset(){
  this.toast.error('Form Reseted Successfully','Reset');
 }
 onsubmit(Employee:any){
   this.datasaved = false;
   const employee=Employee;
  this.create(employee);
 }
 create(employee:any){
  
  if(this.empId > 0)
  {
  this.Employeemodel.EmployeeId = this.empId;
  }

  if(this.Employeemodel.Gender == undefined || this.Employeemodel.Gender == "undefined" || this.Employeemodel.Gender == null)
  this.Employeemodel.Gender = this.Gender;

  const formData = new FormData();
  formData.append('file', this.Employeemodel.files[0]); // Assuming you only want to send the first file in the array
  
  formData.append('Birth',String(this.Employeemodel.DateOfBirth));
  formData.append('EmployeeIds',String(this.Employeemodel.EmployeeId));
  formData.append('FirstName', this.Employeemodel.FirstName);
  formData.append('LastName', this.Employeemodel.LastName);
  formData.append('Email', this.Employeemodel.Email);
  formData.append('Gender', this.Employeemodel.Gender);
  formData.append('ContactNumber', this.Employeemodel.ContactNumber);
  formData.append('Addresses', this.Employeemodel.Addresses);
  formData.append('Site', String(this.Employeemodel.SiteId));
  formData.append('EmployeeCode', this.Employeemodel.EmployeeCode);
  formData.append('City', this.Employeemodel.City);
  formData.append('StartTimes', String(this.Employeemodel.StartTime));
  formData.append('WorkingHour',String(this.Employeemodel.WorkingHours));
  formData.append('OverTime',String(this.Employeemodel.OverTimeAllowed));


  if(this.empId > 0)
  {
    debugger;
  this.Employeemodel.EmployeeId = this.empId;

  const Token = localStorage.getItem("Token");
  const headers = new HttpHeaders({
  'Authorization': `Bearer ${Token}`
  });

  this.com.post('http://localhost:7182/api/Employee/UpdateEmployee',formData, {headers}).subscribe((response:any) =>{
  this.toast.success("Employee Updated Successfully");
  this.router.navigate(['/list']);
   });
  }
  else
  {
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Authorization': `Bearer ${Token}`
    });
  
    this.com.post('http://localhost:7182/api/Employee/AddEmployee',formData, {headers}).subscribe((response:any) =>{
    this.toast.success("Employee Added Successfully");
    this.router.navigate(['/list']);
     });
  }

}

}

