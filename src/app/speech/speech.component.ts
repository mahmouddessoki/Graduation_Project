import { Component, OnInit,NgZone } from '@angular/core';
import {FormControl,FormGroup,Validator, Validators} from "@angular/forms"
import {VideoService} from "../video.service"
import {Router} from '@angular/router'
declare const annyang: any;
declare const $:any;
@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.scss']
})
export class SpeechComponent implements OnInit {
  voiceActiveSectionDisabled: boolean = true;
	voiceActiveSectionError: boolean = false;
	voiceActiveSectionSuccess: boolean = false;
	voiceActiveSectionListening: boolean = false;
	voiceText: any;
  	myForm:any;
	videoPath:any = null;
	newPath:any;
	isEntered:boolean = false;
  constructor(private ngZone: NgZone,private _VideoService:VideoService,private _Router:Router){
    this.myForm = new FormGroup({
      "text":new FormControl(null,[Validators.maxLength(10),Validators.minLength(2)])
    })
	this.resetPath();
  }

	initializeVoiceRecognitionCallback(): void {
		annyang.addCallback('error', (err) => {
      if(err.error === 'network'){
        this.voiceText = "Internet is require";
        annyang.abort();
        this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
      } else if (this.voiceText === undefined) {
				this.ngZone.run(() => this.voiceActiveSectionError = true);
				annyang.abort();
			}
		});

		annyang.addCallback('soundstart', (res) => {
      this.ngZone.run(() => this.voiceActiveSectionListening = true);
		});

		annyang.addCallback('end', () => {
      if (this.voiceText === undefined) {
        this.ngZone.run(() => this.voiceActiveSectionError = true);
				annyang.abort();
			}
		});

		annyang.addCallback('result', (userSaid) => {
			this.ngZone.run(() => this.voiceActiveSectionError = false);

			let queryText: any = userSaid[0];

			annyang.abort();

      this.voiceText = queryText;
	  this.myForm.value.text = queryText;

			this.ngZone.run(() => this.voiceActiveSectionListening = false);
      this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
		});
	}

	startVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = false;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
    this.voiceText = undefined;

		if (annyang) {
			let commands = {
				'demo-annyang': () => { }
			};

			annyang.addCommands(commands);

      this.initializeVoiceRecognitionCallback();

			annyang.start({ autoRestart: false });
		}
	}

	closeVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = true;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
		this.voiceActiveSectionListening = false;

		if(annyang){
      annyang.abort();
    }
	}

  ngOnInit():void{
	
  }

  resetPath()
  {
	if(localStorage.getItem("btnClicked") == null) {
		localStorage.setItem("newPath","")
	}else{

		localStorage.removeItem("btnClicked");
	}
	this.videoPath = localStorage.getItem("newPath");
  }
  getVideo(myForm:any)
  {
	  	
		this._VideoService.sendTokenWord(myForm.value.text).subscribe((data)=>{
			if(data.message == 'success') {
				this.newPath = "../../assets/Videos/" + data.url;
				localStorage.setItem("newPath",this.newPath)
				localStorage.setItem("btnClicked","ok");
				window.location.reload();
			}else {
				this.isEntered = true;
			}	
			
		})
	
  }

}
