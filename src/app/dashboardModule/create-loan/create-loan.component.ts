import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { LoanService } from 'src/app/services/loan.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.css'],
})
export class CreateLoanComponent implements OnInit {
  createLoanForm: FormGroup;
  purpose: string | undefined;
  interestRate: number = 0;
  tenure: number = 0;
  amount: number = 0;
  monthlyEMI: number = 0;

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
    private loanService: LoanService,
    private router: Router,
    private notificationService: NotificationService,
    private SpinnerService: NgxSpinnerService
  ) {
    this.createLoanForm = new FormGroup({
      loanAmount: new FormControl('', [Validators.required]),
      loanPurpose: new FormControl('', [Validators.required]),
      tenureInMonths: new FormControl('', [Validators.required]),
      accountId: new FormControl('', [Validators.required]),
    });
  }

  get getaccountFormControls() {
    return this.createLoanForm.controls;
  }

  ngOnInit(): void {}

  updateInterestRate() {
    if (this.createLoanForm.get('loanPurpose')?.value.id == 0) {
      this.interestRate = 7;
      this.purpose = 'Personal';
    } else if (this.createLoanForm.get('loanPurpose')?.value.id == 1) {
      this.interestRate = 9;
      this.purpose = 'Home';
    } else {
      this.interestRate = 12;
      this.purpose = 'Vehicle';
    }
    console.log(this.interestRate);
  }

  updateInterest() {
    if (this.createLoanForm.get('tenureInMonths')?.value.id == 0) {
      this.tenure = 3;
    } else if (this.createLoanForm.get('tenureInMonths')?.value.id == 1) {
      this.tenure = 6;
    } else {
      this.tenure = 12;
    }
    console.log(this.tenure);
  }

  calculateEMI() {
    this.amount = this.createLoanForm.get('loanAmount')?.value;
    if (this.amount >= 1000) {
      this.monthlyEMI =
        (this.amount + (this.amount * this.interestRate) / 100) / this.tenure;
      this.monthlyEMI =
        Math.round((this.monthlyEMI + Number.EPSILON) * 100) / 100;
    }
    console.log(this.monthlyEMI);
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
      loanPurpose: this.purpose,
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
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
