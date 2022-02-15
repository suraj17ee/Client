import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    const userId: number = Number(localStorage.getItem('userId'));
    this.profileService.getUserProfile(userId).subscribe(
      (response) => {
        this.user = response;
        console.log(this.user);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  downloadFile(){
    //const userId: number = Number(localStorage.getItem('userId'));
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '_File_Saved_Path');
    link.setAttribute('download', 'Springboard Batch-2 Session Summary 21-09-2021.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
    // var userId: number = Number(localStorage.getItem('userId'));

    // this.profileService.getFile(userId).subscribe(
    //     (data: Blob) => {
    //       var file = new Blob([data], { type: 'application/pdf' });
    //       var fileURL = URL.createObjectURL(file);
  
    //       // if you want to open PDF in new tab
    //       window.open(fileURL);
    //       var a = document.createElement('a');
    //       a.href = fileURL;
    //       a.target = '_blank';
    //       a.download = 'accounts.pdf';
    //       document.body.appendChild(a);
    //       a.click();
    //     },
    //     (error) => {
    //       console.log('getPDF error: ', error.error);
    //     }
    //   );
  }
}
