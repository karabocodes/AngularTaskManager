import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="profile-container">
      <h2>My Profile</h2>
      <form (ngSubmit)="onSubmit()">
        <mat-form-field>
          <input matInput placeholder="Username" [(ngModel)]="user.username" name="username" required>
        </mat-form-field>
        <mat-form-field>
          <input matInput type="email" placeholder="Email" [(ngModel)]="user.email" name="email" required>
        </mat-form-field>
        <mat-form-field>
          <input matInput type="password" placeholder="New Password" [(ngModel)]="newPassword" name="newPassword">
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit">Update Profile</button>
      </form>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 20px;
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: any = {};
  newPassword: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser.id) {
      this.apiService.getUser(currentUser.id).subscribe(
        (user) => {
          this.user = user;
        },
        (error) => {
          console.error('Error loading user profile', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.newPassword) {
      this.user.password = this.newPassword;
    }
    this.apiService.updateUser(this.user.id, this.user).subscribe(
      (updatedUser) => {
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        alert('Profile updated successfully');
      },
      (error) => {
        console.error('Error updating profile', error);
        alert('An error occurred while updating the profile');
      }
    );
  }
}