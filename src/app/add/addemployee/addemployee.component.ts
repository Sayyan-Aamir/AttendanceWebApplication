import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { Empclass } from 'src/app/empclass';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  resultGridList :any;
  side=false;
  datasaved =false;
  employeeId=null;
  employeeForm:any;
  userid: any = 0;
  tablehidden=false;
  url:any='';
  en:any='';
  file:any="";
  updatedImage:any="";
  
  constructor(private data:EmployeeService, private serve:EmployeeService, private builder:FormBuilder, public route: ActivatedRoute,private router:Router,private sanitizer: DomSanitizer
    ,private toast:ToastrService) { 

    this.route.params.subscribe(id => {this.userid = id});
  }
  ngOnInit(): void {
    console.log(this.userid.id);
    this.employeeFormBuilder();

  if(this.userid.id > 0)
  {
    this.tablehidden = true;
    this.getUser();
  }
  }

  onSelectedFile(event:any)
   {
     if(event.target.files.length > 0)
     {
       debugger;
       this.updatedImage="";
       var reader = new FileReader();
       reader.readAsDataURL(event.target.files[0]);
       reader.onload=(events:any)=>{
       debugger;
       this.url =events.target.result;
       }
        this.file = event.target.files[0];
      } 
     
    }
  sidebartog()
  {
    debugger;
    this.side = !this.side; 
    console.log(this.side);
  }
  getUser()
  {
    this.data.updateemployee(this.userid.id).subscribe(response=>{
      debugger;
      console.log(response.Table);
      this.resultGridList = [];
      this.en=1;
     this.resultGridList=response.Table;
     this.employeeForm.controls['UserName'].patchValue(this.resultGridList[0].UserName);
     this.employeeForm.controls['FirstName'].patchValue(this.resultGridList[0].FirstName);
     this.employeeForm.controls['LastName'].patchValue(this.resultGridList[0].LastName);
     this.employeeForm.controls['Password'].patchValue(this.resultGridList[0].Password);
     this.employeeForm.controls['Email'].patchValue(this.resultGridList[0].Email);
     this.employeeForm.controls['Gender'].patchValue(this.resultGridList[0].Gender);
     this.employeeForm.controls['ContactNumber'].patchValue(this.resultGridList[0].ContactNumber);
     this.employeeForm.controls['Addresses'].patchValue(this.resultGridList[0].Addresses);
     this.employeeForm.controls['EmployeeCode'].patchValue(this.resultGridList[0].EmployeeCode);
     this.employeeForm.controls['DateOfBirth'].patchValue(this.resultGridList[0].DateOfBirth);
     this.employeeForm.controls['City'].patchValue(this.resultGridList[0].City);
     this.employeeForm.controls['DepartmentName'].patchValue(this.resultGridList[0].DepartmentName);
     this.employeeForm.controls['StartTime'].patchValue(this.resultGridList[0].StartTime);
     this.employeeForm.controls['WorkingHours'].patchValue(this.resultGridList[0].WorkingHours);
     //this.employeeForm.controls['Image'].patchValue(this.resultGridList[0].Image);
     this.employeeForm.controls['EmployeeId'].patchValue(this.resultGridList[0].EmployeeId);
     this.updatedImage = this.resultGridList[0].Base64Image;
     this.onSelectedFile(this.resultGridList[0].Imagename);
     
     debugger;
     
      //this.employeeIdupdate==null;
    })
  }
  onSelect(emp:any)
  {
      debugger;
      // this.updatedImage="";
      var reader = new FileReader();
      reader.readAsDataURL(emp);
      reader.onload=(events:any)=>{
      debugger;
      this.url =events.target.result;
      }
       this.file = emp;
  }
 employeeFormBuilder(){
    this.employeeForm=this.builder.group({
      UserName:['',[Validators.required]],
      FirstName:['',[Validators.required]],
      LastName:[''],
      Password:['',[Validators.required]],
      Email:[''],
      Gender:[''],
      ContactNumber:[''],
      Addresses:[''],
      EmployeeCode:['',[Validators.required]],
      DateOfBirth:[''],
      City:[''],
      DepartmentName:['',[Validators.required]],
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
   debugger;
  this.create(employee);
 }
 create(employee:Empclass){
   debugger;
   if(employee.UserName!="" ||employee.FirstName != "" || employee.Password !="" || employee.DepartmentName != "" || employee.EmployeeCode != "" || this.file !="" || employee.StartTime !="" || employee.WorkingHours !="")
   {
     debugger;
     if(employee.UserName == "")
     {
       this.toast.info('Enter your UserName');
     }
     if(employee.FirstName == "")
     {
      this.toast.info('Enter your Name');
     }
     if(employee.Password =="")
     {
      this.toast.info('Enter a Password');
     }
     if(employee.DepartmentName == "")
     {
      this.toast.info('Enter your Department');
     }
     if(employee.EmployeeCode == "")
     {
      this.toast.info('Enter EmployeeCode');
     }
     if(employee.StartTime == "")
     {
      this.toast.info('Enter Start Time For Employee');
     }
     if(employee.WorkingHours == "")
     {
      this.toast.info('Enter Working Hours For Employee');
     }
     if(employee.UserName!="" && employee.FirstName != "" && employee.Password !="" && employee.EmployeeCode != "" && employee.DepartmentName != "" && employee.StartTime !="" && employee.WorkingHours !=""){  
       this.serve.Email_Check(employee.Email).subscribe(Response =>{
        debugger;
        if(Response != null)
        {
          this.serve.create(employee,this.file).subscribe((data:any) =>{
            debugger;
            this.datasaved=true;
            if(this.userid.id > 0)
            {
              this.toast.success('Employee Updated Successfully');
              this.router.navigate(['/list']);
            }
            else
            {
              this.toast.success('Employee Added Successfully');
              this.router.navigate(['/list']);
            }
            this.employeeForm.reset();
          })
        }
        else{
          this.toast.error('The Email you entered already exists');
        }
       })
     }

   }
   else
   {
     this.toast.warning('Fill The Form');
   }

  }
   
  transform(base64ImageNew: any) {

  base64ImageNew = "data:image/jpg/png/jpeg;base64," + base64ImageNew;
    // var reader = new FileReader();
    // reader.readAsDataURL(base64ImageNew);
  return this.sanitizer.bypassSecurityTrustResourceUrl(base64ImageNew);
    
}

}

