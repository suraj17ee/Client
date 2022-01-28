import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetpassForm: FormGroup;
  


  constructor(fb: FormBuilder) {
    this.forgetpassForm = fb.group({
      email : new FormControl('',[Validators.required]),
    });
  }

  get getformControl(){
    return this.forgetpassForm.controls
  }

  ngOnInit(): void {
  }
  displayStyle = "none";
  submitForm(){
    const userLoginData = {
      email : this.forgetpassForm.get('email')?.value,
      
    };
  }
  cancelForm(){
    this.forgetpassForm.reset()
  }

 
}
