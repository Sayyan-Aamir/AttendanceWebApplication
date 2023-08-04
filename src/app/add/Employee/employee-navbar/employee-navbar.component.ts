import { Component, OnInit } from '@angular/core';
import { HostListener} from "@angular/core";

@Component({
  selector: 'app-employee-navbar',
  templateUrl: './employee-navbar.component.html',
  styleUrls: ['./employee-navbar.component.css']
})
export class EmployeeNavbarComponent implements OnInit {
  width:any;
  getScreenWidth: any;
  imagesrc = 'assets/img/logoaud.png';
  constructor() { }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;

    if(this.getScreenWidth <= 1600)
    {
      this.width = '150px';
    }
    else{
      this.width = '175px';
    }
  }

}
