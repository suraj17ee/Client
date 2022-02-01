import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  createAccount: FormGroup;
  iscreated:Boolean=false;
  message : String = "";


  constructor(fb: FormBuilder, private accountService: AccountService,private router: Router) {
    this.createAccount = fb.group({
      
      accountType : new FormControl('',[Validators.required]),
      balance:new FormControl('',[Validators.required]),
      
    });
  }

  get getaccountFormControls(){
    return this.createAccount.controls
  }

  ngOnInit(): void {
  }

  submitForm(){
    const accountData = {
      accountType : this.createAccount.get('accountType')?.value,
      balance:this.createAccount.get('balance')?.value,
      dateCreated:"10/10/2022",
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
    this.createAccount.reset()
  }
}
