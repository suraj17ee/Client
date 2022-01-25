import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm : FormGroup =new FormGroup({
    email : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required]),
  });

  get getSigninFormControls(){
    return this.signinForm.controls
  }
  
  constructor() { }

  ngOnInit(): void {
  }

  submitForm(){
    const data = {
      email : this.signinForm.get('email')?.value,
      password : this.signinForm.get('password')?.value,
    };
    alert(data);
  }

  cancelForm(){
    this.signinForm.reset
  }


}
