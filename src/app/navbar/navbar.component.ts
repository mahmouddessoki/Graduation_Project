import { Component, OnInit } from '@angular/core';
import {LoginDataService} from "../login-data.service"
import {Router} from "@angular/router"
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loginFlag : boolean = false;
  constructor(private _LoginDataService : LoginDataService , private _Router : Router) { 
    this._LoginDataService.id.subscribe((data)=>{
      if(data == null)
      {
        this.loginFlag = false
      }
      else
      {
        this.loginFlag = true;
      }
    })
  }

  logout()
  {
    localStorage.removeItem("userId");
    this._LoginDataService.id.next(null)
    this._Router.navigate(['/login'])
  }

  ngOnInit(): void {
  }

}
