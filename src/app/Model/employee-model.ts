export class EmployeeModel {
    DateOfBirth: Date | string = "";
    EmployeeId: number= 0;
    FirstName: string= "";
    LastName:string = "";
    Email: string = "";
    Gender:string="";
    ContactNumber: string = "";
    Addresses: string = "";
    SiteId: number = 0;
    EmployeeCode: string = "";
    City:string = "";
    DepartmentName: string = "";
    StartTime: Date | null | string= new Date();
    WorkingHours: number | string = "";
    OverTimeAllowed:number | string = "";
    Image: string = "";
    files: File[] = [];
}
