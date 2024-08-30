import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  template: `
    <div class="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <div class="dashboard-cards">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Total Users</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <h3>{{totalUsers}}</h3>
          </mat-card-content>
        </mat-card>
        <mat-card>
          <mat-card-header>
            <mat-card-title>Total Tasks</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <h3>{{totalTasks}}</h3>
          </mat-card-content>
        </mat-card>
      </div>
      <div class="charts-container">
        <canvas id="taskPriorityChart"></canvas>
        <canvas id="taskCategoryChart"></canvas>
      </div>
      <h3>User List</h3>
      <table mat-table [dataSource]="users" class="mat-elevation-z8">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef> ID </th>
          <td mat-cell *matCellDef="let user"> {{user.id}} </td>
        </ng-container>
        <ng-container matColumnDef="username">
          <th mat-header-cell *matHeaderCellDef> Username </th>
          <td mat-cell *matCellDef="let user"> {{user.username}} </td>
        </ng-container>
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef> Email </th>
          <td mat-cell *matCellDef="let user"> {{user.email}} </td>
        </ng-container>
        <ng-container matColumnDef="role">
          <th mat-header-cell *matHeaderCellDef> Role </th>
          <td mat-cell *matCellDef="let user"> {{user.role}} </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .admin-dashboard-container {
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
    }
    .dashboard-cards {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
    }
    mat-card {
      width: 45%;
    }
    .charts-container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
    }
    .charts-container canvas {
      width: 45%;
    }
    table {
      width: 100%;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  totalUsers: number = 0;
  totalTasks: number = 0;
  users: any[] = [];
  tasks: any[] = [];
  displayedColumns: string[] = ['id', 'username', 'email', 'role'];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.apiService.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.totalUsers = users.length;
      },
      (error) => {
        console.error('Error loading users', error);
      }
    );

    this.apiService.getTasks(0).subscribe(
      (tasks) => {
        this.tasks = tasks;
        this.totalTasks = tasks.length;
        this.createCharts();
      },
      (error) => {
        console.error('Error loading tasks', error);
      }
    );
  }

  createCharts() {
    this.createTaskPriorityChart();
    this.createTaskCategoryChart();
  }

  createTaskPriorityChart() {
    const priorityCounts = this.tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {});

    new Chart('taskPriorityChart', {
      type: 'pie',
      data: {
        labels: Object.keys(priorityCounts),
        datasets: [{
          data: Object.values(priorityCounts),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Task Priority Distribution'
          }
        }
      }
    });
  }

  createTaskCategoryChart() {
    const categoryCounts = this.tasks.reduce((acc, task) => {
      task.categories.forEach((category: string | number) => {
        acc[category] = (acc[category] || 0) + 1;
      });
      return acc;
    }, {});

    new Chart('taskCategoryChart', {
      type: 'bar',
      data: {
        labels: Object.keys(categoryCounts),
        datasets: [{
          label: 'Tasks per Category',
          data: Object.values(categoryCounts),
          backgroundColor: '#4BC0C0'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Tasks per Category'
          }
        }
      }
    });
  }
}