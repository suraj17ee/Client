import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent implements OnInit {
  userId: number | undefined;
  accounts: any = [];

  columnDefs = [
    { headerName: 'Account ID', field: 'accountId' },
    { headerName: 'Account Status', field: 'accountStatus'  },
    { headerName: 'Account Type', field: 'accountType'},
    { headerName: 'Balance', field: 'balance' },
    { headerName: 'Account Creation Date', field: 'dateCreated'  },
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
  };

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    var userId: number = Number(localStorage.getItem('userId'));

    this.accountService.getAccounts(userId).subscribe((res) => {
      this.accounts = res;
    });
  }
}
