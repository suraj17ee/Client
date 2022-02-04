import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AccountService } from "src/app/services/account.service";
import { FundtransferService } from 'src/app/services/fundtransfer.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css']
})
export class FundTransferComponent implements OnInit {
  fundTransferForm: FormGroup;
  iscreated: Boolean = false;
  accounts: any = [];
 
  constructor(fb: FormBuilder, private fundtransferService: FundtransferService,
    private router: Router,private accountService: AccountService,) {
    this.fundTransferForm = fb.group({
      toAccount:new FormControl("",Validators.required),
      description: new FormControl("", [Validators.required]),
      balance: new FormControl("", [Validators.required]),
      password:new FormControl("",[Validators.required]),
    });
  }
  get getaccountFormControls() {
    return this.fundTransferForm.controls;
  }

  ngOnInit(): void {
    this.getData();
  }


  submitForm() {
    var userID: number = Number(localStorage.getItem("userId"));
    userId: userID
    const accountData = {
      toAccount: this.fundTransferForm.get("toAccount")?.value,
      amount: this.fundTransferForm.get("balance")?.value,
      description:this.fundTransferForm.get("description")?.value,
      fromAccount:16,
    };
    this.fundtransferService.transfer(accountData).subscribe(
      (response: any) => {
        if (response != null) {
        
          this.router.navigate(["/dashboard/account-details"]);
        } 
      },
      (error: any) => {
        console.log(error);
      }
    );
    console.log(accountData);
    
  }

  cancelForm() {
    this.fundTransferForm.reset();
  }


  getData() {
    var userID: number = Number(localStorage.getItem("userId"));

    this.accountService.getAccounts(userID).subscribe((res) => {
      this.accounts = res;
      console.log("fund page",this.accounts);
    });

 
  }
   

}
