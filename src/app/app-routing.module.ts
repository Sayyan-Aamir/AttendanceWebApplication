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
import { LoanlistComponent} from './add/Loan/loanlist/loanlist.component';
import { UpdateLoanComponent} from './add/Loan/update-loan/update-loan.component';
import { LoanDetailListComponent} from './add/Loan/loan-detail-list/loan-detail-list.component';
import { AbsentListComponent} from './add/Dashboard list/absent-list/absent-list.component';
import { AddloanComponent} from './add/Loan/addloan/addloan.component';
import { EmployeeDashboardComponent} from './add/Employee/employee-dashboard/employee-dashboard.component';
import { RequestleaveComponent} from './add/Employee/requestleave/requestleave.component';
import { EmployeeLeavelistComponent} from './add/Employee/employee-leavelist/employee-leavelist.component';
import { UserLeavelistComponent } from './add/User/user-leavelist/user-leavelist.component';
import { EmployeeListComponent } from './add/Dashboard list/employee-list/employee-list.component';
import { OfficeHolidaylistComponent } from './add/officeHoliday/office-holidaylist/office-holidaylist.component';
import { OfficeHolidayaddComponent } from './add/officeHoliday/office-holidayadd/office-holidayadd.component';


const routes: Routes = [
  {
    path:'firstpage',component:FirstpageComponent
  },
  {
    path:'empList/:id',component:EmployeeListComponent
  },
  {
    path:'Ablist/:id',component:AbsentListComponent
  },
   {
     path:'addemp',component:AddempComponent 
      //,canActivate:[ActguardGuard]
   },
   {
    path:'Empdashboard',component:EmployeeDashboardComponent 
     //,canActivate:[ActguardGuard]
  },
  {
    path:'userlist',component:UserLeavelistComponent 
     //,canActivate:[ActguardGuard]
  },
  {
    path:'reqLeave',component:RequestleaveComponent 
     //,canActivate:[ActguardGuard]
  },
  {
    path:'empleavelist',component:EmployeeLeavelistComponent 
     //,canActivate:[ActguardGuard]
  },
   {
    path:'loanlist',component:LoanlistComponent 
     //,canActivate:[ActguardGuard]
  },
  {
    path:'updateloan/:id',component:UpdateLoanComponent 
     //,canActivate:[ActguardGuard]
  },
  {
    path:'loandetail/:id',component:LoanDetailListComponent 
     //,canActivate:[ActguardGuard]
  },
  {
    path:'addloan',component:AddloanComponent 
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
    path:'officeholiday' , component: OfficeHolidaylistComponent 
    // ,canActivate:[ActguardGuard]
  },
  {
    path:'officeholidayadd/:id' , component: OfficeHolidayaddComponent 
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
