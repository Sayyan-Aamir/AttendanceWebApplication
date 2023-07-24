export class LoanModel {
    LoanId: number | null= null;
    EmployeeId: number  = 0;
    LoanTitleId: number = 0;
    PayAmount: number= 0;
    OutstandingAmount: number= 0;
    PaidAmount: number= 0;
    FirstName: string = "";
    LoanTitle: string = "";
    LoanAmount: number = 0;
    LoanReason:string = "";
    LoanStatus: string  = "";
    LoanDate: Date = new Date();
    RepayDate: Date = new Date();
}
