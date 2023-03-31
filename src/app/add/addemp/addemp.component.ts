import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/employee.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-addemp',
  templateUrl: './addemp.component.html',
  styleUrls: ['./addemp.component.css'],
  providers:[EmployeeService]
})
export class AddempComponent implements OnInit {
  constructor(private serve:EmployeeService,private router: Router) { 
  }
  ngOnInit(): void {
  }

 directtoPage(){
  this.serve.Authenticate(1);
  this.router.navigate(['/firstpage']);
 }
}
