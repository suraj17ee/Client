import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  
    userid:number=8;
   rowData:any=[];
  constructor(private accountService: AccountService) {
  }
  columnDefs:any = [
		{headerName: 'Account Number', field: 'account_Id' },
		{headerName: 'Account Type', field: 'accountType'},
    {headerName: 'Date Created', field: 'dateCreated'},
    {headerName: 'Account Balance', field: 'balance'},
    {headerName: 'Account Status', field: 'accountStatus'}
	];
  

  ngOnInit(): void {
    
  }
  getData(){
    const data={
      userId:this.userid
    }
    this.accountService.getAccounts(data).subscribe((res)=>{
      //this.rowData = res;
     console.log(this.rowData);
      console.log(res[0]);
    }  );

    console.log("caling");
  }
 
 
}
