import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginModuleService } from '../login-module.service';
import { CustomValidator } from '../../custom.validator';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {

  setPasswordForm: FormGroup;
  token: String="";

  constructor(fb: FormBuilder,private loginModuleService:LoginModuleService,private router : Router,private route: ActivatedRoute) {
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

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  submitForm(){
    const setPasswordData = {
      token : this.token,
      newPassword : this.setPasswordForm.get('newPassword')?.value,
    };

    this.loginModuleService.resetPassword(setPasswordData).subscribe((response) => {
      console.log(response)
    },
    (error: any) => {
      console.log(error)
    }
  );
  }

  cancelForm(){
    this.setPasswordForm.reset()
  }
}
