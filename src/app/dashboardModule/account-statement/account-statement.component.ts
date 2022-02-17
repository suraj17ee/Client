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
import { SortEvent } from 'primeng/api';
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
  loading: boolean = false;
  cols: any[] | undefined;
  exportColumns: any[] | undefined;
  products1: any[] | undefined;

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
    // this.cols = [
    //   {
    //     field: 'transactionId',
    //     header: 'TransactionId',
    //     customExportHeader: 'Transaction Details',
    //   },
    //   { field: 'fromAccount', header: 'Sender Account No.' },
    //   { field: 'toAccount', header: 'Receiver Account No.' },
    //   { field: 'amount', header: 'Amount' },
    //   { field: 'transactionStatus', header: 'Status' },
    //   { field: 'transactionDate', header: 'Date' },
    //   { field: 'transactionTime', header: 'TIme' },
    //   { field: 'description', header: 'Description' },
    // ];

    // this.exportColumns = this.cols.map((col) => ({
    //   title: col.header,
    //   dataKey: col.field,
    // }));
  }

 
  submitForm() {
    (this.fromAccountId = this.statementForm.get('fromAccount')?.value),
      this.statementService
        .getStatements(this.fromAccountId)
        .subscribe((response: any) => {
          this.statements = response;
          this.loading = false;
          this.isShown = true;
          this.statements.forEach( (i: { transactionDate: string | number | Date; })=> {i.transactionDate = new Date(i.transactionDate)});
          console.log('statement data', this.statements);
        });
  }
  customSort(event: { data: any[]; field: string | number; order: number; }) {
    event.data?.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

        return (event.order * result);
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
}
