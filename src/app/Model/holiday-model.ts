export class HolidayModel {
    HolidayId: number = 0;
    HolidayName: string | null = "";
    Description:string = "";
    FromDate: Date | null = new Date();
    ToDate: Date | null = new Date();
}
