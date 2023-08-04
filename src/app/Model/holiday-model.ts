export class HolidayModel {
    HolidayId: number = 0;
    HolidayName: string | null = "";
    Description:string = "";
    FromDate: Date | null | string = new Date();
    ToDate: Date | null | string = new Date();
}
