import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  createAccountForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.createAccountForm = fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      accountType : new FormControl('',[Validators.required]),
      balance:new FormControl('',[Validators.required]),
      
    });
  }

  get getaccountFormControls(){
    return this.createAccountForm.controls
  }

  ngOnInit(): void {
  }

  submitForm(){
    const userLoginData = {
      email : this.createAccountForm.get('email')?.value,
      accountType : this.createAccountForm.get('accountType')?.value,
      balance:this.createAccountForm.get('balance')?.value,
    };
    
  }

  cancelForm(){
    this.createAccountForm.reset()
  }
}