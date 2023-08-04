export default class SearchCriteria {
    Status:string | null="";
    FromDate: Date | null = new Date();
    ToDate: Date | null = new Date();
    SiteId: number | null = null;
    Attendancestatus:string | null = null;
    Employee_Name: string | null = null;
    EmployeeId:number | null = 0;
    SiteName: string | null = null;
    LoanDate: Date | null = null;
    EmployeeName: string | null = null;
}
