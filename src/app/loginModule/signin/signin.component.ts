import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginModuleService } from '../login-module.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor(fb: FormBuilder,private loginModuleService:LoginModuleService) {
    this.signinForm = fb.group({
      email : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required]),
    });
  }

  get getSigninFormControls(){
    return this.signinForm.controls
  }

  ngOnInit(): void {
  }

  submitForm(){
    const userLoginData = {
      email : this.signinForm.get('email')?.value,
      password : this.signinForm.get('password')?.value,
    };
    
    this.loginModuleService.loginUser(userLoginData).subscribe((response) => {
      console.log(response)
    },
    (error: any) => {
      console.log(error)
    }
  );
  }

  cancelForm(){
    this.signinForm.reset()
  }
}
