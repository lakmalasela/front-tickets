import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { LoginDetail } from './login-details.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { MyResponse } from '../myresponse';
import { LoginResponse } from './login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string = environment.apiLogin+'/Auth/Login'

  list: LoginDetail[] = [];
  loginData : LoginDetail = new LoginDetail()
  constructor(private http:HttpClient) { }


 
  loginUser(username: string, password: string): Observable<LoginResponse> {
    const body = JSON.stringify({ Username: username, Password: password });
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(this.url, body, { headers: headers });
    
}

  resetFrom(form:NgForm){
    form.form.reset();
      
      this.loginData = new LoginDetail();
     }

     private _username: string;
     private _usernameKey = 'user_username';

     public _loggedIn = false;

     get username(): string {

      return localStorage.getItem(this._usernameKey);
      //  return this._username;
     }


     logout() {
      this._loggedIn = false;
      // Other logout logic
    }
   
     set username(value: string) {
      localStorage.setItem(this._usernameKey, value);
      this._loggedIn = true;
      //  this._username = value;
     }

}
