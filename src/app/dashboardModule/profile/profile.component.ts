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
}
