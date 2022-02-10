import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-filecmp',
  templateUrl: './filecmp.component.html',
  styleUrls: ['./filecmp.component.css']
})
export class FilecmpComponent implements OnInit {

  fileForm :FormGroup;
  userId :number | undefined ;
  filePresent:boolean =false;
  file!: File;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.userId = Number(localStorage.getItem('userId'));
    this.fileForm = this.fb.group({
      file: new FormControl('', [Validators.required]),
    });
  }
  getFileFormControls() {
    return this.fileForm.controls;
  }
  enableUpload(){
    this.filePresent =true;
    this.file = this.fileForm.controls.file.value;
    console.log(this.file);
  }
  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
  }
  uploadFile(fileForm:any){
    var userId: number = Number(localStorage.getItem('userId'));
    const formData = new FormData();
    formData.append('userId', JSON.stringify( this.userId) );
    formData.append('file', this.file );

    
    const fileData = {
      file : this.fileForm.get('file')?.value
    }

    console.log(fileData);
    this.profileService.postFile(userId,formData).subscribe(
      (response) => {
        console.log(response);
        // if (response != null) {
        //   this.notificationService.createNotification(
        //     'success',
        //     'Success',
        //     'Profile Updated Successfully'
        //   );
        //  this.router.navigate(['/dashboard/profile']);
        // } else if (response == null) {
        //   this.notificationService.createNotification(
        //     'error',
        //     'Error',
        //     'Profile Update Unsuccessful'
        //   );
        //  this.router.navigate(['/dashboard/update-profile']);
        // }
      },
      (error: any) => {
        console.log(error);
      }
    );
    alert(this.file );
  }

}
