export class LeaveModel {
    // LoanId: number | null= null;
    // EmployeeId: number | null= null;
    // LoanTitleId: number | null= 0;
    // PayAmount: number= 0;
    // OutstandingAmount: number= 0;
    // PaidAmount: number= 0;
    LeaveId: number = 0;
    RequestLeave: string = "request";
    LeaveStatus: number = 0;
    LeaveReason:string = "";
    Status: string = "";
    FromDate: Date = new Date();
    ToDate: Date = new Date();
}
