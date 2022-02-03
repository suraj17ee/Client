import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  
   
   rowData:any=[];
  constructor(private accountService: AccountService) {
  }
 
  ngOnInit(): void {
    
  }
  getData(){
    var userid: number = Number(localStorage.getItem("userId"));
    
    // const data={
    //   userid:userID,
    // }
    this.accountService.getAccounts(userid).subscribe((res)=>{
      this.rowData = res;
     console.log(this.rowData);
      console.log(res);
    }  );

    console.log("caling");
  }
 
 
}
