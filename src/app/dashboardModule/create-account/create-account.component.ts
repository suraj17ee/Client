import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  createAccountForm: FormGroup;
  iscreated:Boolean=false;
  message : String = "";

  constructor(fb: FormBuilder,private accountService: AccountService,private router: Router) {
    this.createAccountForm = fb.group({
     
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
    const accountData = {
     
      accountType : this.createAccountForm.get('accountType')?.value,
      balance:this.createAccountForm.get('balance')?.value,
      userId:8,
    };
    this.accountService.saveAccount(accountData).subscribe((response:any) => {
      if(response==201){
        this.message=response;
        this.router.navigate(['/dashboard'])
      }
      else{
        this.message=response;
      }
    },
      (error: any) => {
        console.log(error)
      }
    );
    
  }

  cancelForm(){
    this.createAccountForm.reset()
  }
}