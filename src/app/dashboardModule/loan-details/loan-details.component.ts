import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css'],
})
export class LoanDetailsComponent implements OnInit {
  loans: any = [];

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    var userId: number = Number(localStorage.getItem('userId'));

    this.loanService.getAllLoans(userId).subscribe((res) => {
      this.loans = res;
      console.log(this.loans);
    });
  }
}
