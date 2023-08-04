import { Component, OnInit } from '@angular/core';
import {TaskModel} from 'src/app/add/Task/task-model';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {SearchCriteria } from 'src/app/Model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  model = new TaskModel();
  employeeList:any = null;
  file: File[] = []; 
  EmployeeId:any[] = [];
  Employee = new SearchCriteria();

  constructor(private com:HttpClient,private toast:ToastrService,private router:Router) { 
    this.model = new TaskModel();
    this.Employee = new SearchCriteria();

  }

  ngOnInit(): void {

    this.Employee.FromDate = null;
    this.Employee.ToDate = null; 

    this.EmployeeList();
  }

  EmployeeList(){
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': `Bearer ${Token}`
     });
     this.com.post('http://localhost:7182/api/Employee/EmployeeList',this.Employee, {headers}).subscribe((response:any) =>{
     this.employeeList = response.responseData;
     });
  }

  add(){


    if(this.file.length > 0)
    {
      const formData = new FormData();
        
      formData.append('TaskName',this.model.TaskName);
      formData.append('EmployeeId',String(this.EmployeeId));
      formData.append('Description', this.model.Description);
      formData.append('FDate', String(this.model.FromDate));
      formData.append('Tdate', String(this.model.FromDate));
  
      this.file.forEach((file, index) => {
        formData.append('Documents', file, `${this.file[index].name}`);
      });
  
      const Token = localStorage.getItem("Token");
      const headers = new HttpHeaders({
      'Authorization': `Bearer ${Token}`
    });
          
    this.com.post('http://localhost:7182/api/Task/AddTask',formData, {headers}).subscribe((response:any) =>{
        this.router.navigate(['/tasklist']);
        this.toast.success('Task Added Successfully');
    });
    }

    else{
      this.toast.error('select at least one document');
    }

  }
  
  onFileSelected(event: any) {
    console.log(this.EmployeeId.toString());
    const files: FileList = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.file[i] = files[i];
        console.log(this.file[i]);
      }
    }
  }

}
