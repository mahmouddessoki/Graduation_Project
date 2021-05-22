import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from "./login/login.component";
import { NotfoundComponent } from './notfound/notfound.component';
import {RegisterComponent} from "./register/register.component";
import { RoutingGuardGuard } from './routing-guard.guard';
import { SpeechComponent } from './speech/speech.component';
const routes: Routes = [
  {path : '' , redirectTo : "register"  , pathMatch : 'full'},
  {path : 'login' , component : LoginComponent },
  {path : 'register' , component : RegisterComponent },
  {path : 'speech' ,canActivate:[RoutingGuardGuard], component : SpeechComponent },
  {path : 'home' ,canActivate:[RoutingGuardGuard], component : HomeComponent },
  {path : 'about' ,canActivate:[RoutingGuardGuard], component : AboutComponent },
  {path : 'dictionary' ,canActivate:[RoutingGuardGuard], component : DictionaryComponent },
  {path : '**' , component :  NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
