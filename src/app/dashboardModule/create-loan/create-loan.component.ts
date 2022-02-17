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
  createLoanForm: FormGroup;
  //purpose: string | undefined;
  interestRate: number = 0;
  tenure: number = 0;
  amount: number = 0;
  monthlyEMI: number = 0;
  interestAmount: number = 0;
  totalAmount: number = 0;
  accounts: any = [];

  constructor(
    fb: FormBuilder,
    private loanService: LoanService,
    private router: Router,
    private accountService: AccountService,
    private notificationService: NotificationService,
    private SpinnerService: NgxSpinnerService
  ) {
    this.createLoanForm = new FormGroup({
      loanPurpose: new FormControl('', [Validators.required]),
      loanAmount: new FormControl('', [Validators.required]),
      tenureInMonths: new FormControl('', [Validators.required]),
      accountId: new FormControl('', [Validators.required]),
    });
  }

  get getaccountFormControls() {
    return this.createLoanForm.controls;
  }

  ngOnInit(): void {
    this.createLoanForm.controls['loanAmount'].setValue(1000000);
    this.createLoanForm.controls['loanPurpose'].setValue('Home');
    this.interestRate = 7;
    this.createLoanForm.controls['tenureInMonths'].setValue(24);
    this.calculateEMI();
    this.calculateInterestAmount();
    this.getData();
  }

  updateInterestRate() {
    if (this.createLoanForm.get('loanPurpose')?.value == 'Personal') {
      this.interestRate = 12;
    } else if (this.createLoanForm.get('loanPurpose')?.value == 'Home') {
      this.interestRate = 7;
    } else {
      this.interestRate = 9;
    }
  }
  calculateEMI() {
    this.amount = this.createLoanForm.get('loanAmount')?.value;
    this.tenure = this.createLoanForm.get('tenureInMonths')?.value;
    let intr = this.interestRate / 12 / 100;
    let n = Math.pow(intr + 1, this.tenure);
    if (this.amount >= 1000) {
      this.monthlyEMI = (this.amount * intr * n) / (n - 1);
      this.totalAmount = this.monthlyEMI * this.tenure;
      this.monthlyEMI =
        Math.round((this.monthlyEMI + Number.EPSILON) * 100) / 100;
      console.log(this.monthlyEMI);
    }
  }

  calculateInterestAmount() {
    this.amount = this.createLoanForm.get('loanAmount')?.value;
    if (this.amount >= 1000) {
      this.interestAmount = this.totalAmount - this.amount;
      this.interestAmount =
        Math.round((this.interestAmount + Number.EPSILON) * 100) / 100;
    }
  }

  createLoan() {
    var userId: number = Number(localStorage.getItem('userId'));

    const loanData = {
      userId: userId,
      accountId: this.createLoanForm.get('accountId')?.value,
      loanAmount: this.createLoanForm.get('loanAmount')?.value,
      remainingAmount:
        this.createLoanForm.get('loanAmount')?.value +
        this.interestRate * this.tenure,
      loanPurpose: this.createLoanForm.get('loanPurpose')?.value,
      interest: this.interestRate,
      tenureInMonths: this.tenure,
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
}
