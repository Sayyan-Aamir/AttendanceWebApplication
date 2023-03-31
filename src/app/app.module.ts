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
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateCompanyComponent } from './add/create-company/create-company.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


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
    CreateCompanyComponent
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
    
  ],
  providers: [EmployeeService,ActguardGuard,DatePipe,{provide:LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
