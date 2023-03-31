import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActguardGuard implements CanActivate {
  constructor(private user:EmployeeService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.user.isAuthenticated)
    {
      return true;
    }
    else
    {
      this.router.navigate(['']);
      return false;
    }
   
    }
  }
  

