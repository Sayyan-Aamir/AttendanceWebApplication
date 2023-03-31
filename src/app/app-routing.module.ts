import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivate } from '@angular/router';
import { UserAnalyticsComponent } from './add/user-analytics/user-analytics.component';
import {WeekdaysComponent} from './add/weekdays/weekdays.component'
import { AddempComponent } from './add/addemp/addemp.component';
import { ListComponent } from './add/list/list.component';
import { SpinnerComponent } from './add/spinner/spinner.component';
import { AddemployeeComponent } from './add/addemployee/addemployee.component';
import { NewemployeeComponent } from './add/newemployee/newemployee.component';
import { AttendencelistComponent } from './add/attendencelist/attendencelist.component';
import { FirstpageComponent } from './add/firstpage/firstpage.component';
import { OfficialHolidayComponent } from './add/official-holiday/official-holiday.component';
import {DashboardComponent} from './add/dashboard/dashboard.component';
import { LoginPageComponent } from './add/login-page/login-page.component';
import {ForgetpasswodComponent} from './add/forgetpasswod/forgetpasswod.component';
import { NewpasswordComponent} from './add/newpassword/newpassword.component';
import { CreateCompanyComponent} from './add/create-company/create-company.component';

const routes: Routes = [
  {
    path:'firstpage',component:FirstpageComponent
  },
  {
    path:'createcompany',component:CreateCompanyComponent
  },
   {
     path:'addemp',component:AddempComponent 
      //,canActivate:[ActguardGuard]
   },
   {
    path:'spinner',component:SpinnerComponent 
     //,canActivate:[ActguardGuard]
  },
   {
    path:'addemployee/:id',component:AddemployeeComponent 
    //  ,canActivate:[ActguardGuard]
  },
  {
    path:'forgetpassword',component:ForgetpasswodComponent
     //,canActivate:[ActguardGuard]
  },
  {
    path:'newpassword',component:NewpasswordComponent
    // ,canActivate:[ActguardGuard]
  },
   {
    path:'newemployee',component:NewemployeeComponent 
    // ,canActivate:[ActguardGuard]
  },
   {
    path:'list' , component: ListComponent 
    //  ,canActivate:[ActguardGuard]
   },
   {
    path:'user-analytics' , component: UserAnalyticsComponent 
    // ,canActivate:[ActguardGuard]
   },
   {
    path:'firstpage' , component: FirstpageComponent 
   },
   {
    path:'' , component: LoginPageComponent 
   },
   {
    path:'weekdays' , component: WeekdaysComponent
   },
   {
     path:'attendencelist' , component: AttendencelistComponent 
    //  ,canActivate:[ActguardGuard]
   },
   {
    path:'official_holiday' , component: OfficialHolidayComponent 
    // ,canActivate:[ActguardGuard]
  },
  {
    path:'dashboard' , component: DashboardComponent  
    //  ,canActivate:[ActguardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
