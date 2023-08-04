export class LoanModel {
    LoanId: number | null= null;
    EmployeeId: number  = 0;
    EmployeeName: string | null  = null;
    LoanTitleId: number = 0;
    PayAmount: number= 0;
    OutstandingAmount: number= 0;
    RequestId: number= 0;
    PaidAmount: number= 0;
    FirstName: string = "";
    LoanTitle: string = "";
    LoanAmount: number = 0;
    LoanReason:string = "";
    LoanStatus: string | null = null;
    LoanDate: Date | null  | string = null;
    RepayDate: Date = new Date();
}
