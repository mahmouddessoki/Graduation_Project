import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable,BehaviorSubject } from 'rxjs';
import {ActivatedRoute} from "@angular/router"
import {Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class LoginDataService {
  userData : any;
  id = new BehaviorSubject<any>(null);
  url :string = "";
  baseUrl:string = "http://localhost/backend/";
  constructor(private _HttpClient : HttpClient , private _Router : Router, private _ActivatedRoute : ActivatedRoute) {

    if(localStorage.getItem("userId") != null)
    {
      this.id.next(localStorage.getItem("userId"))
      this.url = window.location.pathname;
      if(this.url == "/")
      {
        this._Router.navigate(['/speech'])
      }
      else{
      this._Router.navigate([this.url])
      }
      
    }
    else
    {
      this._Router.navigate(['/login'])
    }

   }

   sendLoginData(loginData : any):Observable<any>
   {
     return this._HttpClient.post(this.baseUrl + "login.php",{email:loginData.email,password:loginData.password})
   }

  saveUserData(userData : object , userId : any)
  {
    this.userData = userData;
    this.id.next(userId)
  }
   
}
