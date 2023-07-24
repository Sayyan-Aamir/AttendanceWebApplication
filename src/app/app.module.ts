import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HashLocationStrategy,LocationStrategy} from '@angular/common';

import {NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { DatePipe } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AddempComponent } from './add/addemp/addemp.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './add/list/list.component';
import { AttendencelistComponent } from './add/attendencelist/attendencelist.component';
import { FirstpageComponent } from './add/firstpage/firstpage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{ MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import{ MatMenuModule} from '@angular/material/menu';
import{ MatDividerModule} from '@angular/material/divider';
import{ MatListModule} from '@angular/material/list';
import{ MatSidenavModule} from '@angular/material/sidenav';
import { SidenavComponent } from './add/sidenav/sidenav.component';
import { HeaderComponent } from './add/header/header.component';
import { ActguardGuard } from './add/actguard.guard';
import { NewemployeeComponent } from './add/newemployee/newemployee.component';
import { AddemployeeComponent } from './add/addemployee/addemployee.component';
import { UserAnalyticsComponent} from './add/user-analytics/user-analytics.component';
import { WeekdaysComponent } from './add/weekdays/weekdays.component';
import { SpinnerComponent } from './add/spinner/spinner.component';
import { OfficialHolidayComponent } from './add/official-holiday/official-holiday.component';
import {ToastrModule} from 'ngx-toastr';
import { DashboardComponent } from './add/dashboard/dashboard.component';
import { LoginPageComponent } from './add/login-page/login-page.component';
import { ForgetpasswodComponent } from './add/forgetpasswod/forgetpasswod.component';
import { NewpasswordComponent } from './add/newpassword/newpassword.component';
import { GoogleMapLocationComponent } from './add/google-map-location/google-map-location.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoanlistComponent } from './add/Loan/loanlist/loanlist.component';
import { AddloanComponent } from './add/Loan/addloan/addloan.component';
import { EmployeeDashboardComponent } from './add/Employee/employee-dashboard/employee-dashboard.component';
import { RequestleaveComponent } from './add/Employee/requestleave/requestleave.component';
import { UserLeavelistComponent } from './add/User/user-leavelist/user-leavelist.component';
import { UpdateLoanComponent } from './add/Loan/update-loan/update-loan.component';
import { LoanDetailListComponent } from './add/Loan/loan-detail-list/loan-detail-list.component';
import { EmployeeListComponent } from './add/Dashboard list/employee-list/employee-list.component';
import { EmployeeNavbarComponent } from './add/Employee/employee-navbar/employee-navbar.component';
import { EmployeeLeavelistComponent } from './add/Employee/employee-leavelist/employee-leavelist.component';
import { AbsentListComponent } from './add/Dashboard list/absent-list/absent-list.component';
import { OfficeHolidaylistComponent } from './add/officeHoliday/office-holidaylist/office-holidaylist.component';
import { OfficeHolidayaddComponent } from './add/officeHoliday/office-holidayadd/office-holidayadd.component';


import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';


FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);
@NgModule({
  declarations: [
    AppComponent,
    AddempComponent,
    ListComponent,
    AttendencelistComponent,
    FirstpageComponent,
    SidenavComponent,
    HeaderComponent,
    NewemployeeComponent,
    AddemployeeComponent,
    UserAnalyticsComponent,
    WeekdaysComponent,
    SpinnerComponent,
    OfficialHolidayComponent,
    DashboardComponent,
    LoginPageComponent,
    ForgetpasswodComponent,
    NewpasswordComponent,
    GoogleMapLocationComponent,
    LoanlistComponent,
    AddloanComponent,
    EmployeeDashboardComponent,
    RequestleaveComponent,
    UserLeavelistComponent,
    UpdateLoanComponent,
    LoanDetailListComponent,
    EmployeeListComponent,
    EmployeeNavbarComponent,
    EmployeeLeavelistComponent,
    AbsentListComponent,
    OfficeHolidaylistComponent,
    OfficeHolidayaddComponent
  ],
  imports: [
    BrowserModule,
  //  GoogleMapsModule,
   MatDialogModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,  
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    NgxDatatableModule,
    NgxChartsModule,
    FusionChartsModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      // positionClass:'toast-bottom-right',
      //progressBar:true
    }),
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule, 
    MatNativeDateModule
  ],
  providers: [EmployeeService,ActguardGuard,DatePipe,{provide:LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
