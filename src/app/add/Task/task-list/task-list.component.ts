import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import{TaskModel} from 'src/app/add/Task/task-model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasklist:any = null;
  model = new TaskModel();
  TaskId:number = 0;

  constructor(private com:HttpClient,private router: Router) { 
    this.model = new TaskModel();
  }

  ngOnInit(): void {

  this.model.FromDate = null;
  this.model.ToDate = null;
  this.model.Status = null;

  this.Tasklist();
  this.model.Status = "1";
  }

  Tasklist()
  {
  const Token = localStorage.getItem("Token");
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
  });
                  
  this.com.post('http://localhost:7182/api/Task/DuplicateTaskList',this.model, {headers}).subscribe((response:any) =>{
  this.tasklist = response.responseData;
  });

  }

  filter(){
   
    if(this.model.Status == "1")
    {
      this.model.Status = null;
    }

    if(this.model.FromDate?.toString() == "")
    {
      this.model.FromDate = null;
    }

    if(this.model.ToDate?.toString() == "")
    {
      this.model.ToDate = null;
    }

    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });
  
    this.com.post('http://localhost:7182/api/Task/DuplicateTaskList', this.model,{ headers }).subscribe((response: any) => {
      this.tasklist = response.responseData;
    });
  }

  clearfilter(){

    this.model.Status = null;    
    this.model.FromDate = null;
    this.model.ToDate = null;

    this.Tasklist();
    this.model.Status = "1";
  }

  delete(task:any){

    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });
    this.TaskId = task.taskId;
    const url = `http://localhost:7182/api/Task/DeleteTask?taskId=${this.TaskId}`;

    this.com.post(url, null,{ headers }).subscribe((response: any) => {
      this.Tasklist();
  });
  }

  loandetail(task:any){
    this.router.navigate(['/taskdetaillist/'+ task.taskId]);
  }

  update(loan:any){
   // this.router.navigate(['/loanrequest/'+ loan.requestId]);
  }

  export(){

    if(this.model.Status == "1")
    {
      this.model.Status = null;
    }

    if(this.model.FromDate?.toString() == "")
    {
      this.model.FromDate = null;
    }

    if(this.model.ToDate?.toString() == "")
    {
      this.model.ToDate = null;
    }

    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });

    const apiUrl = `http://localhost:7182/api/Task/ExportAdminPdf`;
  
    this.com.post(apiUrl, this.model,{headers: headers, responseType: 'blob' }).subscribe(
      (response: Blob) => {
        this.downloadImage(response, "Tasklist");
      },
      (error) => {
        console.error('Error loading image:', error);
      }
    );
    this.model.Status = "1";
  }

  downloadImage(blobData: Blob, imageName: string): void {
    const url = window.URL.createObjectURL(blobData);
    const a = document.createElement('a');
    a.href = url;
    a.download = imageName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

}
