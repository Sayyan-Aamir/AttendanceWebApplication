import { Component, OnInit,Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() togglesidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
toggleSidebar(){
  this.togglesidebarForMe.emit();
}

out()
  {   
    this.router.navigate(['']);
    alert('You Logged Out Successfully');
}

ToCompany(){
  this.router.navigate(['/createcompany']);
}
}
