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

@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.css'],
})
export class CreateLoanComponent implements OnInit {
  createLoanForm!: FormGroup;
  loanPurpose!:string;
  interestRate!:number;
  tenure!:number;
  monthlyEMI:number=0;
  purposes:Array<any> = [
    {id: 0, name: "Personal"},
    {id: 1, name: "Home"},
    {id: 2, name: "Vehicle"}
];
tenures:Array<any> = [
  {id: 0, name: "3 Months"},
  {id: 1, name: "6 Months"},
  {id: 2, name: "12 Months"}
];

  constructor(
    fb: FormBuilder,
    private loanService: LoanService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.createLoanForm = new FormGroup({
      purpose:new FormControl('', [Validators.required]),
      amount:new FormControl('', [Validators.required]),
      tenure: new FormControl('', [Validators.required]),
      account: new FormControl('', [Validators.required]),
    });
  }

  get getaccountFormControls() {
    return this.createLoanForm.controls;
  }

  ngOnInit(): void {}
  updateInterestRate(){
      let purpose = this.createLoanForm.get('purpose')?.value;
      if(purpose.id ==0 ){
        this.interestRate=7;
        this.loanPurpose="Personal";
      }else if(purpose.id ==1){
        this.interestRate=9;
        this.loanPurpose="Home";
      }else{
        this.interestRate=12;
        this.loanPurpose="Vehicle";
      }
      console.log(this.interestRate);
  }
  updateInterest(){
    let tenure = this.createLoanForm.get('tenure')?.value;
      if(tenure.id ==0 ){
        this.tenure=3;
      }else if(tenure.id ==1){
        this.tenure=9;
      }else{
        this.tenure=12;
      }
      console.log(this.tenure);
  }
  calculateEMI(){
    var amount= this.createLoanForm.get('amount')?.value;
    if(amount>=1000){
      this.monthlyEMI = (amount+(amount *this.interestRate/100 ))/this.tenure;
      this.monthlyEMI = Math.round((this.monthlyEMI + Number.EPSILON) * 100) / 100
      console.log(this.monthlyEMI);
    }
    console.log(this.monthlyEMI)
  }
  createLoan(){
    var userId: number = Number(localStorage.getItem('userId'));

    const loanData = {
      userId:userId,
      accountId: this.createLoanForm.get('account')?.value,
      balance:this.createLoanForm.get('amount')?.value,
      loanType:this.loanPurpose,
      tenure: this.tenure,
      monthlyEMI :this.monthlyEMI
    };

   
    this.loanService.createLoan(loanData).subscribe(
      (response: any) => {
        if (response.statusCode == 201) {
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
}
