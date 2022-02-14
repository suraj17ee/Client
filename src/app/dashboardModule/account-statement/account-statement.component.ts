import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StatementService } from 'src/app/services/statement.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css'],
})
export class AccountStatementComponent implements OnInit {
  statementForm: FormGroup;
  iscreated: Boolean = false;
  message: String = '';
  accounts: any = [];
  statements: any = [];
  fromAccountId: number = 0;
  isShown: boolean = false;

  constructor(
    fb: FormBuilder,
    private statementService: StatementService,
    private router: Router,
    private accountService: AccountService
  ) {
    this.statementForm = fb.group({
      fromAccount: new FormControl('', [Validators.required]),
    });
  }

  get getaccountFormControls() {
    return this.statementForm.controls;
  }

  ngOnInit(): void {
    this.getData();
  }

  submitForm() {
    (this.fromAccountId = this.statementForm.get('fromAccount')?.value),
      this.statementService
        .getStatements(this.fromAccountId)
        .subscribe((response: any) => {
          this.statements = response;
          this.isShown = true;
          console.log('statement data', this.statements);
        });
  }
  getData() {
    var userId: number = Number(localStorage.getItem('userId'));

    this.accountService.getAccounts(userId).subscribe((res) => {
      this.accounts = res;
    });
  }
  cancelForm() {
    this.statementForm.reset();
  }

  // downloadPDF() {
  //   this.accountService.getTransactionPDF(this.fromAccountId).subscribe(
  //     (data: Blob) => {
  //       var file = new Blob([data], { type: 'application/pdf' });
  //       var fileURL = URL.createObjectURL(file);

  //       window.open(fileURL);
  //       var a = document.createElement('a');
  //       a.href = fileURL;
  //       a.target = '_blank';
  //       a.download = 'transactions.pdf';
  //       document.body.appendChild(a);
  //       a.click();
  //     },
  //     (error) => {
  //       console.log('getPDF error: ', error);
  //     }
  //   );
  // }
}
