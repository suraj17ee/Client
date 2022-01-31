import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetpassForm: FormGroup;
  confirmOTPForm: FormGroup;
  displayStyle = "none";

  constructor(fb: FormBuilder) {
    this.forgetpassForm = fb.group({
      email : new FormControl('',[Validators.required]),
    });

    this.confirmOTPForm = fb.group({
      otp : new FormControl('',[Validators.required]),
    });
  }

  get getformControl(){
    return this.forgetpassForm.controls
  }

  get getOTPformControl(){
    return this.confirmOTPForm.controls
  }

  ngOnInit(): void {
  }

  openModal() {
    this.displayStyle = "block";
  }

  submitForm(){
    const email = this.forgetpassForm.get('email')?.value;
  }

  cancelForm(){
    this.forgetpassForm.reset()
  }
}
