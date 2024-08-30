import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, CommonModule],
  template: `
    <mat-toolbar color="primary">
      <span>Task Manager</span>
      <span class="spacer"></span>
      <ng-container *ngIf="isLoggedIn; else loginButtons">
        <button mat-button routerLink="/tasks">Tasks</button>
        <button mat-button routerLink="/profile">Profile</button>
        <button mat-button *ngIf="isAdmin" routerLink="/admin">Admin Dashboard</button>
        <button mat-button (click)="logout()">Logout</button>
      </ng-container>
      <ng-template #loginButtons>
        <button mat-button routerLink="/login">Login</button>
        <button mat-button routerLink="/register">Register</button>
      </ng-template>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.isLoggedIn = !!currentUser.id;
    this.isAdmin = currentUser.role === 'admin';
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.checkLoginStatus();
    // Optionally, redirect to login page
  }
}