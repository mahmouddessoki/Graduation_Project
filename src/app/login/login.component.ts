import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from "@angular/forms"
import {LoginDataService} from '../login-data.service'
import {Router} from "@angular/router"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myLoginForm : any;
  
  constructor(private _LoginDataService : LoginDataService, private _Router:Router) { 
    this.myLoginForm = new FormGroup({
      "email" : new FormControl(null,[Validators.required , Validators.email]),
      "password" : new FormControl(null,[Validators.required ,Validators.pattern('^[A-Z][0-9]+$')])

    })
  }

  getLoginData(LoginData : FormGroup){
    this._LoginDataService.sendLoginData(LoginData.value).subscribe((data)=>{
          if(data.message == "success")
          {
            localStorage.setItem("userId",data.userId)
            this._LoginDataService.saveUserData(data.user,data.userId);
            console.log(data.user);
            this._Router.navigate(['/speech'])

          }
      })
  }

  
  ngOnInit(): void {
  }

}
