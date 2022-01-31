import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  createaccountForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.createaccountForm = fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      accountType : new FormControl('',[Validators.required]),
      balance:new FormControl('',[Validators.required]),
      
    });
  }

  get getaccountFormControls(){
    return this.createaccountForm.controls
  }

  ngOnInit(): void {
  }

  submitForm(){
    const userLoginData = {
      email : this.createaccountForm.get('email')?.value,
      accountType : this.createaccountForm.get('accountType')?.value,
      balance:this.createaccountForm.get('balance')?.value,
    };
    
  }

  cancelForm(){
    this.createaccountForm.reset()
  }
}