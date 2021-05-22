import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from "@angular/forms"
import {RegisterDataService} from "../register-data.service"
import {Router} from "@angular/router"
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  myRegisterForm : any;
  constructor(private _RegisterDataService : RegisterDataService,private _Router:Router) { 

    this.myRegisterForm = new FormGroup({
      'first_name' :new FormControl(null,[Validators.required,Validators.maxLength(10),Validators.minLength(3)]),
      'last_name' :new FormControl(null,[Validators.required,Validators.maxLength(10),Validators.minLength(3)]),
      'age' :new FormControl(null,[Validators.required,Validators.max(80),Validators.min(20)]),
      'email' :new FormControl(null,[Validators.required , Validators.email]),
      'password' :new FormControl(null,[Validators.required ,Validators.pattern('^[A-Z][0-9]+$')  ])
    })



  }

  ngOnInit(): void {
  }

  getRegisterForm(registerData : FormGroup)
  {
    
    this._RegisterDataService.sendRegisterData(registerData.value).subscribe((Data)=>{
      if(Data.message == "success")
      {
        this._Router.navigate(['/login'])
      }
    });
  }

}
