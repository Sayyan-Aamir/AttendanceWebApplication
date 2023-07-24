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
      this.width = '170px';
    }
    else{
      this.width = '175px';
    }
  }

@HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    if(this.getScreenWidth <= 1600)
    {
      this.width = '170px';
    }
    else{
      this.width = '175px';
    }
    
  }
  menuLinks = [
    {
      label: "DashBoard",
      routerLink: "dashboard",
      iconType: "",
      iconName: "",
      thumbNailClass: "bg-link"
    },   
    {
      label: "Admin",
      iconType: "fa",
      iconName: "cogs",
      toggle: "close",
      thumbNailClass: "bg-link",
      submenu: [
        {
          label: "Group",
          routerLink: "/audit/group",
          iconType: "letter",
          iconName: "",
        },
        {
          label: "Site",
          routerLink: "/audit/site",
          iconType: "letter",
          iconName: "",
        },
        {
          label: "Assign Notifications",
          routerLink: "/admn/notification-assignment",
          iconType: "letter",
          iconName: "",
        },
          ]
        }
      ]

}
