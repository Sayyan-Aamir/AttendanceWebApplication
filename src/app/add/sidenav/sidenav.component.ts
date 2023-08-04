import { Component, OnInit } from '@angular/core';
import { HostListener} from "@angular/core";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
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
}
