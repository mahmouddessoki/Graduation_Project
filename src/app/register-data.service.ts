import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterDataService {
  baseUrl:string = "http://localhost/backend/";
  constructor(private  _HttpClient : HttpClient) { }

  sendRegisterData(registerData : any) : Observable<any>
  {
    return this._HttpClient.post<any>(this.baseUrl+"/signup.php",{first_name:registerData.first_name,last_name:registerData.last_name,age:registerData.age,email:registerData.email,password:registerData.password});
  }

}