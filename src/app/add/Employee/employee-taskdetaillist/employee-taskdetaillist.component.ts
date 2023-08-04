import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-taskdetaillist',
  templateUrl: './employee-taskdetaillist.component.html',
  styleUrls: ['./employee-taskdetaillist.component.css']
})
export class EmployeeTaskdetaillistComponent implements OnInit {

  taskId:any = 0;
  TaskId:number= 0
  documents: any[] = [];
  tasklist: any[] = [];

  constructor(private com:HttpClient,private router: Router,private toast:ToastrService,public route: ActivatedRoute,
    public datepipe: DatePipe) { 
      this.route.params.subscribe(id => {this.taskId = id});
    }

  ngOnInit(): void {
    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });
  
    this.TaskId = this.taskId.id;
    const url = `http://localhost:7182/api/Task/Attachements?taskId=${this.TaskId}`;

    this.com.post(url, null,{ headers }).subscribe((response: any) => {
      this.tasklist = response.responseData;
  });
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

}
