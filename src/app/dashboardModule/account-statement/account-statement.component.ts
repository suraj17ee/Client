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
  columnDefs = [
    { headerName: 'Transaction ID', field: 'transactionId' },
    { headerName: 'Sender Account', field: 'fromAccount' },
    { headerName: 'Reciever Account', field: 'toAccount' },
    { headerName: 'Amount', field: 'amount' },
    { headerName: 'Transaction Status', field: 'transactionStatus' },
    { headerName: 'Transaction Date', field: 'transactionDate' },
    { headerName: 'Transaction Description', field: 'description' },
  ];

  constructor(
    fb: FormBuilder,
    private statementService: StatementService,
    private router: Router,
    private accountService: AccountService,
    private stmtService: StatementService
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

  downloadPDF() {
    this.accountService.getTransactionPDF(this.fromAccountId).subscribe(
      (data: Blob) => {
        var file = new Blob([data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);

        // if you want to open PDF in new tab
        window.open(fileURL);
        var a = document.createElement('a');
        a.href = fileURL;
        a.target = '_blank';
        a.download = 'transactions.pdf';
        document.body.appendChild(a);
        a.click();
      },
      (error) => {
        console.log('getPDF error: ', error);
      }
    );
  }
}
