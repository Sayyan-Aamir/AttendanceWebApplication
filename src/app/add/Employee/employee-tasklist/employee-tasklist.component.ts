import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import{TaskModel} from 'src/app/add/Task/task-model';

@Component({
  selector: 'app-employee-tasklist',
  templateUrl: './employee-tasklist.component.html',
  styleUrls: ['./employee-tasklist.component.css']
})
export class EmployeeTasklistComponent implements OnInit {

  tasklist:any = null;
  TaskId:number = 0;
  isExpanded: boolean = false;
  model: TaskModel = new TaskModel();
  imageBlob: Blob | null = null;

  constructor(private com:HttpClient,private router: Router,private route: ActivatedRoute) { 
  }

  ngOnInit(): void {

    this.Tasklist();
  }

  download(task:any){
 
    if(task.extension == '.pdf')
    {
      this.loadPdf(task.name+task.extension);
    }
    else{
      this.loadImage(task.name+task.extension);
    }
  
    }
  
    loadImage(image:string): void {
      const Token = localStorage.getItem("Token");
      const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Token}`
      });
  
      const imageName = image;
      const apiUrl = `http://localhost:7182/api/Task/GetImages?imageName=${imageName}`;
    
      this.com.get(apiUrl, {headers: headers, responseType: 'blob' }).subscribe(
        (response: Blob) => {
          this.downloadImage(response, imageName);
        },
        (error) => {
          console.error('Error loading image:', error);
        }
      );
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
  
    loadPdf(pdf:string): void {
      const Token = localStorage.getItem("Token");
      const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Token}`
      });
  
      const pdfName = pdf;
      const apiUrl = `http://localhost:7182/api/Task/GetPdf?pdfName=${pdfName}`;
    
      this.com.get(apiUrl, {headers: headers, responseType: 'blob' }).subscribe(
        (response: Blob) => {
          this.downloadImage(response, pdfName);
        },
        (error) => {
          console.error('Error loading image:', error);
        }
      );
    }
    
    downloadPdf(blobData: Blob, pdfName: string): void {
      const url = window.URL.createObjectURL(blobData);
      const a = document.createElement('a');
      a.href = url;
      a.download = pdfName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }

  Tasklist()
  {
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
  });
                  
  this.com.post('http://localhost:7182/api/Task/UserTaskList',null, {headers}).subscribe((response:any) =>{
  this.tasklist = response.responseData;
  });
  }
  
  Status(task:any){

    if(task.status == 'Completed')
    {
      task.status = 'pending';
    }
    else{
      task.status = 'Completed';
    }

    this.model.TaskId = task.taskId;
    this.model.Status = task.status;

    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });
  
    this.com.post('http://localhost:7182/api/Task/UpdateUserStatus', this.model,{ headers }).subscribe((response: any) => {

    });
  }

  taskdetail(task:any){
    this.router.navigate(['/emptaskdetaillist/', task.taskId]);
  }

  filter(){
    
    if(this.model.Status == "")
    {
      this.model.Status = null;
    }

    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });
  
    this.com.post('http://localhost:7182/api/Task/TaskLists', this.model,{ headers }).subscribe((response: any) => {
      this.tasklist = response.responseData;
    });
  }

  clearfilter(){

    this.model.Status = null;
    this.model.FromDate = null;
    this.model.ToDate = null;
    
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
  });
                  
  this.com.post('http://localhost:7182/api/Task/UserTaskList',null, {headers}).subscribe((response:any) =>{
  this.tasklist = response.responseData;
  });
  }

  export(){
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });

    const apiUrl = `http://localhost:7182/api/Task/ExportPdf`;
  
    this.com.post(apiUrl, this.model,{headers: headers, responseType: 'blob' }).subscribe(
      (response: Blob) => {
        this.downloadImage(response, "Tasklist");
      },
      (error) => {
        console.error('Error loading image:', error);
      }
    );
  }
}
