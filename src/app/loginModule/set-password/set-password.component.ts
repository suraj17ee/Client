import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModuleService } from '../login-module.service';
import { CustomValidator } from '../../custom.validator';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {

  setPasswordForm: FormGroup;

  constructor(fb: FormBuilder,private loginModuleService:LoginModuleService,private router : Router) {
    this.setPasswordForm = fb.group({
      newPassword : new FormControl('',[Validators.required]),
      confirmPassword : new FormControl('',[Validators.required]),
    }, { 
      validator: CustomValidator('newPassword', 'confirmPassword')
    });
  }

  get getsetPasswordFormControls(){
    return this.setPasswordForm.controls
  }

  ngOnInit(): void {
  }

  submitForm(){
    const setPasswordData = {
      //email : this.setPasswordForm.get('email')?.value,
      newPassword : this.setPasswordForm.get('newPassword')?.value,
    };
  }

  cancelForm(){
    this.setPasswordForm.reset()
  }
}
