import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {Observable} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  baseUrl:string = "http://localhost/backend/";
  constructor(private _HttpClient: HttpClient) { }
  sendTokenWord(text : any):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl + "video.php",{word:text})
  }

}
