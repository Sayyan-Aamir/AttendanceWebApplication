export class Login {
    UserName:string="";
    Password:string="";

    constructor(UserName: string, Password: string)
    {
        this.UserName = UserName;
        this.Password = Password;
    }
    getemail():string{
        return this.UserName;
    }
    getpassword():string{
        return this.Password;
    }
}
