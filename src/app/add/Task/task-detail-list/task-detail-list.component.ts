import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import {TaskModel} from 'src/app/add/Task/task-model';

@Component({
  selector: 'app-task-detail-list',
  templateUrl: './task-detail-list.component.html',
  styleUrls: ['./task-detail-list.component.css']
})
export class TaskDetailListComponent implements OnInit {
  
  tasklist :any = [];
  taskId: any = 0;
  TaskId: number = 0;
  model = new TaskModel();

  constructor(private com:HttpClient,private toast:ToastrService,
  public route: ActivatedRoute) { 

    this.model = new TaskModel();

    this.route.params.subscribe(id => {this.taskId = id});

    }

  ngOnInit(): void {
  this.TaskDetailList();
  }

  TaskDetailList(){

  this.TaskId = Number(this.taskId.id);


  const Token = localStorage.getItem("Token");
  const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${Token}`
  });
  const url = `http://localhost:7182/api/Task/TaskDetailList?taskId=${this.TaskId}`;

  this.com.post(url, null,{ headers }).subscribe((response: any) => {
    this.tasklist = response.responseData;
    console.log(this.tasklist);
    this.toast.success('Task Detail Displayed Successfully');
  });

  }

  Status(task:any){

    if(task.status == 'completed')
    {
      task.status = 'pending';
    }
    else{
      task.status = 'completed';
    }

    debugger;
    this.model.EmpId = task.empId;
    this.model.TaskId = task.taskId;
    this.model.Status = task.status;

    const Token = localStorage.getItem("Token");
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`
    });
  
    this.com.post('http://localhost:7182/api/Task/taskStatus', this.model,{ headers }).subscribe((response: any) => {

    });
  }

  
}
