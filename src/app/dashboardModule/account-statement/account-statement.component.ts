import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {StatementService} from 'src/app/services/statement.service';
import { Router } from "@angular/router";
import { AccountService } from "src/app/services/account.service";
@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})

export class AccountStatementComponent implements OnInit {
  statementForm: FormGroup;
  iscreated: Boolean = false;
  message: String = "";
  accounts: any = [];
  statements: any = [];
  fromAccountId:number=0;
  constructor(
    fb: FormBuilder,private statementService: StatementService, private router: Router,private accountService: AccountService) 
    {
    this.statementForm = fb.group({
      fromAccount: new FormControl("", [Validators.required]),
    });
  }

  get getaccountFormControls() {
    return this.statementForm.controls;
  }




  ngOnInit(): void {
    this.getData();
  }

  submitForm() {
    var userID: number = Number(localStorage.getItem("userId"));
    userId: userID
    // const statementData = {
    //   fromAccount: this.statementForm.get("fromAccount")?.value,
      
    // };
    this.fromAccountId=this.statementForm.get("fromAccount")?.value,

    this.statementService.getStatements( this.fromAccountId).subscribe(
      (response: any) => {
          this.statements=response;
          console.log("statement data",this.statements);
      },
     
    );
  }
  getData() {
    var userID: number = Number(localStorage.getItem("userId"));

    this.accountService.getAccounts(userID).subscribe((res) => {
      this.accounts = res;
      console.log("statement page",this.accounts);
    });


}
cancelForm() {
  this.statementForm.reset();
}
}
