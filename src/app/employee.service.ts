import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Empclass } from './empclass';
import { Emp } from './emp';
import { Login } from './login';
import {product} from 'src/app/product';
import {environment} from 'src/environments/environment';
import { SpinnerService } from './spinner.service';
import { HolidayList } from './holiday-list';
import { Mode } from './mode';
import { Logincheck } from './logincheck';
import {Sendemail} from './sendemail';
import { LeaveDetails } from './leave-details';
import { SearchCriteria } from '../../src/app/Model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  //url='http://localhost:59123/Employee/';
  url=environment.baseurl;
  isAuthenticated = false;

constructor(private com:HttpClient, private router:Router,private service:SpinnerService) { }
   Authenticate(employee:number):boolean{
        if(employee==1)
        {
          debugger;
          this.isAuthenticated=true;
          return true;
        }
        else
        {
          this.isAuthenticated=false;
          return false;
        }
   }
  create(employee: Empclass,fileupload:any): Observable<Empclass>
  {
    const formData: FormData = new FormData();
    formData.append('EmployeeId',employee.EmployeeId);
    formData.append('UserName',employee.UserName);
    formData.append('FirstName',employee.FirstName);
    formData.append('LastName',employee.LastName);
    formData.append('Password',employee.Password);
    formData.append('Email',employee.Email);
    formData.append('Gender',employee.Gender);
    formData.append('ContactNumber',employee.ContactNumber);
    formData.append('Addresses',employee.Addresses);
    formData.append('DateOfBirth',employee.DateOfBirth);
    formData.append('EmployeeCode',employee.EmployeeCode);
    formData.append('City',employee.City);
    formData.append('DepartmentName',employee.DepartmentName);
    formData.append('StartTime',employee.StartTime);
    formData.append('WorkingHours',employee.WorkingHours);
    formData.append('Image',fileupload);
    formData.append('Imagename',"");
    formData.append("file", fileupload);

    debugger;
    return this.com.post<Empclass>(this.url +'/Employee/Addemployee',formData);

  }

  // createnewCompany(employee: NewCompany): Observable<NewCompany>
  // {
  //   const formData: FormData = new FormData();
  //   formData.append('CompanyName',employee.CompanyName);
  //   formData.append('CompanyCode',employee.CompanyCode);
  //   formData.append('CompanyNote',employee.CompanyNote);
  //   formData.append('CompanyEmail',employee.CompanyEmail);
  //   formData.append('CompanyNotificationEmail',employee.CompanyNotificationEmail);
  //   formData.append('CompanyContactName',employee.CompanyContactName);
  //   formData.append('CompanyAddress1',employee.CompanyAddress1);
  //   formData.append('CompanyCity',employee.CompanyCity);
  //   formData.append('CompanyStateProvince',employee.CompanyStateProvince);
  //   formData.append('CompanyCountry',employee.CompanyCountry);
  //   formData.append('CompanyPostCode',employee.CompanyPostCode);
  //   formData.append('CompanyMobile',employee.CompanyMobile);
  //   formData.append('Login',employee.Login);
  //   formData.append('Password',employee.Password);
  //   formData.append('UserFirstName',employee.UserFirstName);
  //   formData.append('UserMiddleName',employee.UserMiddleName);
  //   formData.append('UserLastName',employee.UserLastName);
  //   formData.append('UserEmail',employee.UserEmail);
  //   formData.append('Phone',employee.Phone);

  //   debugger;
  //   return this.com.post<NewCompany>(this.url +'/Employee/CreateNewCompany',formData);

  // }

  Employee_Leave(employee: LeaveDetails): Observable<any>
  {
    const formData: FormData = new FormData();
    formData.append('LeaveId',employee.LeaveId.toString());
    formData.append('EmployeeId',employee.EmployeeId.toString());
    formData.append('FromDate',employee.FromDate);
    formData.append('ToDate',employee.ToDate);

    debugger;
    return this.com.post<any>(this.url +'/Employee/AddEmployee_Leave',formData);

  }

  creates(employee: HolidayList): Observable<HolidayList>
  {
    const formData: FormData = new FormData();
    formData.append('holiday_Id',employee.holiday_Id);
    formData.append('holiday_name',employee.holiday_name);
    formData.append('holiday_date',employee.holiday_date);
    formData.append('updated_by',employee.updated_by);
    formData.append('updated_by_name',employee.updated_by_name);
    formData.append('created_by',employee.created_by);

    debugger;
    return this.com.post<HolidayList>(this.url +'/Employee/Addholiday',formData);

  }
 
  getholidaylist(emp:Mode): Observable<any>
  {
    debugger;
    return this.com.post<any>(this.url +'/Employee/Holiday_List',emp);
  }

  Email_Check(employee: String): Observable<any>
  {
    debugger;
    return this.com.get<any>(this.url +'/Employee/Valid_email?email='+employee);
  }

  updateemp(employee: HolidayList): Observable<any>
  {
    return this.com.post<any>(this.url +'/Employee/Addholiday',employee);
  }

  updateemployee(employee: number): Observable<any>
  {
    return this.com.post<any>(this.url +'/Employee/Updateemployee?employee='+employee, null);
  }

  Employee_detail(employee: String): Observable<any>
  {
    return this.com.get<any>(this.url +'/Employee/Employee_Details?Emp_Name='+employee);
  }

  getAllEmployees(name:String,Company:number):Observable<any>{
    return this.com.get<any>(this.url +'/Employee/ShowData?Emp_Name='+name + "&Comapny_id=" +Company);
  } 

  getEmployeesbyID(employeeid:string):Observable<Empclass>{
    return this.com.get<Empclass>(this.url +'/Employee/ShowDataid'+employeeid);
  } 
  getlist(EmployeeParam:Emp):Observable<any>{

    return this.com.post<any>(this.url +'/Employee/Show_Data',EmployeeParam);
  } 
  holidaylist(EmployeeParam:Emp):Observable<any>{

    return this.com.post<any>(this.url +'/Employee/Holiday_Data',EmployeeParam);
  } 
  chartholidaylist(EmployeeParam:Emp):Observable<any>{
    return this.com.post<any>(this.url +'/Employee/Employee_Holiday',EmployeeParam);
}
  getemp():Observable<any>{
    return this.com.get<any>(this.url +'/Employee/Show_Employee');
  } 
  StatusEmp(companyid:number):Observable<any>{
    return this.com.get<any>(this.url +'/Employee/Show_Status?comp_id='+companyid);
  }  
  OvertimeEmp():Observable<any>{
    return this.com.get<any>(this.url +'/Employee/Show_Overtime');
  } 

  Graph_detail(emp:Mode, companyid:number):Observable<any>{
    return this.com.post<any>(this.url +'/Employee/Graph_Data',emp);
  } 

  OverTime_detail(detail:Mode):Observable<any>{
    return this.com.post<any>(this.url +'/Employee/OverTime_Data',detail);
  } 

  Leaves_Employee(leavedetail: LeaveDetails):Observable<any>{
    debugger;
    return this.com.post<any>(this.url +'/Employee/Employee_Leaves',leavedetail);
  } 
  checkemployees(employees: Login): Observable<Login>
  {
    return this.com.post<Login>(this.url +'/Employee/CheckData',employees);
  }
  checkemployeesweekday(employees: product): Observable<product>
  {
    return this.com.post<product>(this.url +'/Employee/weekend_login',employees);
  }
  deleteemp(employee: any): Observable<any>
  {
    return this.com.post<any>(this.url +'/Employee/delete_emp?employee='+employee, null);
  }
  deleteemps(employee: any): Observable<any>
  {
    debugger;
    return this.com.post<any>(this.url +'/Employee/delete_emp',employee);
  }

  LoginEmployee(employee: Logincheck): Observable<any>
  {
    console.log("old");
    return this.com.post<any>(this.url +'/Employee/Login_Check',employee);
  }

  Sendmails(detail: Sendemail): Observable<any>
  {
    return this.com.post<any>(this.url +'/Employee/Sendmail',detail);
  }

   Set_NewPassword(password_detail: Logincheck): Observable<any>
  {
    return this.com.post<any>(this.url +'/Employee/Set_NewPassword',password_detail);
  }
 
  GetEmployeeCompany():Observable<any>{
    return this.com.get<any>(this.url +'/Employee/GetCompany');
  } 
  updateFilter(id:number): Observable<any>
  {
    return this.com.post<any>(this.url +'/Employee/GetCompany',id);
  }
  
  RoleList(): Observable<any>
  {
    return this.com.get<any>(this.url +'/Employee/Employee_Roles');
  }

  TimeDetail_Employee(company_id: number): Observable<any>
  {
    return this.com.get<any>(this.url +'/Employee/WorkingTime_Employees?comp_id='+company_id);
  }

  Dashboard(model: SearchCriteria): Observable<any>
  {
    debugger;
    const Token = localStorage.getItem("Token");
  //   const header = new Headers({'Authorization': `Bearer ${Token}` });
  //   const options = {
  //     headers: header,
  //  };

  //     const header = new Headers({'Authorization': `Bearer ${Token}` });
  //   const options = {
  //     headers: header,
  //  };

    return this.com.post<any>('http://192.168.1.4:7182/api/Dashboard/Dashboard',model);
  }

  Login(Username: string, Password: string): Observable<any>
  {
  return this.com.post<any>(`http://localhost:7182/api/Auth/Login?username=${Username}&password=${Password}`,{});
  }

  AttendaceList(Username: string, Password: string): Observable<any>
  {
  return this.com.post<any>(`http://localhost:7182/api/Auth/Login?username=${Username}&password=${Password}`,{});
  }

}