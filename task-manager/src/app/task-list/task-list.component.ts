import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  template: `
    <div class="task-list-container">
      <h2>My Tasks</h2>
      <button mat-raised-button color="primary" (click)="openTaskDialog()">Add New Task</button>
      <table mat-table [dataSource]="tasks" class="mat-elevation-z8">
        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef> Title </th>
          <td mat-cell *matCellDef="let task"> {{task.title}} </td>
        </ng-container>
        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef> Description </th>
          <td mat-cell *matCellDef="let task"> {{task.description}} </td>
        </ng-container>
        <ng-container matColumnDef="dueDate">
          <th mat-header-cell *matHeaderCellDef> Due Date </th>
          <td mat-cell *matCellDef="let task"> {{task.dueDate | date}} </td>
        </ng-container>
        <ng-container matColumnDef="priority">
          <th mat-header-cell *matHeaderCellDef> Priority </th>
          <td mat-cell *matCellDef="let task"> {{task.priority}} </td>
        </ng-container>
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef> Actions </th>
          <td mat-cell *matCellDef="let task">
            <button mat-icon-button color="primary" (click)="openTaskDialog(task)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteTask(task.id)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .task-list-container {
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
    }
    table {
      width: 100%;
      margin-top: 20px;
    }
  `]
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  displayedColumns: string[] = ['title', 'description', 'dueDate', 'priority', 'actions'];

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.apiService.getTasks(currentUser.id).subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error loading tasks', error);
      }
    );
  }

  openTaskDialog(task?: any) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: task || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.updateTask(result);
        } else {
          this.createTask(result);
        }
      }
    });
  }

  createTask(task: any) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    task.userId = currentUser.id;
    this.apiService.createTask(task).subscribe(
      () => {
        this.loadTasks();
      },
      (error) => {
        console.error('Error creating task', error);
      }
    );
  }

  updateTask(task: any) {
    this.apiService.updateTask(task.id, task).subscribe(
      () => {
        this.loadTasks();
      },
      (error) => {
        console.error('Error updating task', error);
      }
    );
  }

  deleteTask(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.apiService.deleteTask(taskId).subscribe(
        () => {
          this.loadTasks();
        },
        (error) => {
          console.error('Error deleting task', error);
        }
      );
    }
  }
}