import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  
  private count = 0;
  private spinner$ = new BehaviorSubject<string>('');

  constructor() { }

  getspinnerobserver(): Observable<string>
  {
   return this.spinner$.asObservable();
  }
   requeststarted(){
     if(++this.count != 0)
     {
       this.spinner$.next('start');
       this.count = 0;
     }
   }
   requestended(){
    if(this.count === 0 || --this.count === 0)
    {
      this.spinner$.next('stop');
    }
  }
  resetspinner()
  {
    this.count = 0;
    this.spinner$.next('stop');
  }

}
