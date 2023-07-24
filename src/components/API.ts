import {HttpClient, HttpHeaders} from '@angular/common/http';

export default class API {

    constructor(private http:HttpClient, private headers:HttpHeaders) {}

    

    // APIFunction (method: string, url: any = 'http://192.168.18.156', body: object, requireAuth = false) {
    //     // const Token = localStorage.getItem("Token");
    //     // const headers = new HttpHeaders({
    //     //     'Content-Type': 'application/json',
    //     //     'Authorization': `Bearer ${Token}`
    //     //   });
    //     // if (method === 'GET') {
           
    //     // } else if (method === 'POST') {
    //     //     debugger;
    //     //     this.http.post(url, body, {headers}).subscribe((response) =>{
    //     //         debugger;
    //     //         return response;
    //     //     })
    //     // }
    // }
}