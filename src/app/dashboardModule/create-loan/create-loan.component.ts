import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { LoanService } from 'src/app/services/loan.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.css'],
})
export class CreateLoanComponent implements OnInit {
  createLoanForm!: FormGroup;
  loanPurpose!: string;
  interestRate!: number;
  purpose: string | undefined;
  tenure!: number;
  monthlyEMI: number = 0;
  amount: number = 0;
  interestAmount: number = 0;
  totalAmount: number = 0;
  accounts: any = [];

  purposes: Array<any> = [
    { id: 0, name: 'Personal' },
    { id: 1, name: 'Home' },
    { id: 2, name: 'Vehicle' },
  ];
  tenures: Array<any> = [
    { id: 0, name: '3 Months' },
    { id: 1, name: '6 Months' },
    { id: 2, name: '12 Months' },
  ];

  constructor(
    fb: FormBuilder,
    private loanService: LoanService,
    private router: Router,
    private accountService: AccountService,
    private notificationService: NotificationService,
    private SpinnerService: NgxSpinnerService
  ) {
    this.createLoanForm = new FormGroup({
      purpose: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required]),
      tenure: new FormControl('', [Validators.required]),
      account: new FormControl('', [Validators.required]),
    });
  }

  get getaccountFormControls() {
    return this.createLoanForm.controls;
  }

  ngOnInit(): void {
    this.createLoanForm.controls['loanAmount'].setValue(1000000);
    this.createLoanForm.controls['purpose'].setValue(1);
    this.interestRate = 9;
    this.createLoanForm.controls['tenureInMonths'].setValue(24);
    this.updateInterest();
    this.calculateEMI();
    this.calculateInterestAmount();
    this.getData();
  }

  updateInterestRate() {
    let purpose = this.createLoanForm.get('purpose')?.value;
    if (purpose.id == 0) {
      this.interestRate = 7;
      this.loanPurpose = 'Personal';
    } else if (purpose.id == 1) {
      this.interestRate = 9;
      this.loanPurpose = 'Home';
    } else {
      this.interestRate = 12;
      this.loanPurpose = 'Vehicle';
    }
    console.log(this.interestRate);
  }
  updateInterest() {
    this.tenure = this.createLoanForm.get('tenureInMonths')?.value;
  }
  calculateEMI() {
    var amount = this.createLoanForm.get('amount')?.value;
    if (amount >= 1000) {
      this.monthlyEMI =
        (amount + (amount * this.interestRate) / 100) / this.tenure;
      this.monthlyEMI =
        Math.round((this.monthlyEMI + Number.EPSILON) * 100) / 100;
      console.log(this.monthlyEMI);
    }
    console.log(this.monthlyEMI);
  }
  createLoan() {
    var userId: number = Number(localStorage.getItem('userId'));

    const loanData = {
      userId: userId,
      accountId: this.createLoanForm.get('account')?.value,
      balance: this.createLoanForm.get('amount')?.value,
      loanType: this.loanPurpose,
      tenure: this.tenure,
      monthlyEMI: this.monthlyEMI,
    };
    this.SpinnerService.show();
    this.loanService.createLoan(loanData).subscribe(
      (response: any) => {
        if (response.statusCode == 201) {
          this.SpinnerService.hide();
          this.notificationService.createNotification(
            'success',
            'Success',
            response.message
          );
          this.router.navigate(['/dashboard/loan-details']);
        } else if (response.statusCode == 400) {
          this.notificationService.createNotification(
            'error',
            'Error',
            response.message
          );
          this.router.navigate(['/create-loan']);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getData() {
    var userID: number = Number(localStorage.getItem('userId'));

    this.accountService.getAccounts(userID).subscribe((res) => {
      this.accounts = res;
    });
  }

  calculateInterestAmount() {
    this.amount = this.createLoanForm.get('loanAmount')?.value;
    if (this.amount >= 1000) {
      this.interestAmount = this.totalAmount - this.amount;
      this.interestAmount =
        Math.round((this.interestAmount + Number.EPSILON) * 100) / 100;
    }
    console.log(this.interestAmount);
  }
}
