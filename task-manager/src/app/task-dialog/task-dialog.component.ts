
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>{{data.id ? 'Edit Task' : 'Add New Task'}}</h2>
    <mat-dialog-content>
      <mat-form-field>
        <input matInput placeholder="Title" [(ngModel)]="data.title" required>
      </mat-form-field>
      <mat-form-field>
        <textarea matInput placeholder="Description" [(ngModel)]="data.description"></textarea>
      </mat-form-field>
      <mat-form-field>
        <input matInput [matDatepicker]="picker" placeholder="Due Date" [(ngModel)]="data.dueDate">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-select placeholder="Priority" [(ngModel)]="data.priority">
          <mat-option value="low">Low</mat-option>
          <mat-option value="medium">Medium</mat-option>
          <mat-option value="high">High</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="New category..." [(ngModel)]="newCategory" (keydown.enter)="addCategory()">
      </mat-form-field>
      <div class="categories-list">
        <span *ngFor="let category of data.categories" class="category-item">
          {{category}}
          <button mat-icon-button (click)="removeCategory(category)">
            <mat-icon>cancel</mat-icon>
          </button>
        </span>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSave()">Save</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
      margin-bottom: 15px;
    }
    .categories-list {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }
    .category-item {
      display: inline-flex;
      align-items: center;
      padding: 5px 10px;
      background-color: #e0e0e0;
      border-radius: 16px;
    }
    .category-item mat-icon {
      font-size: 16px;
      cursor: pointer;
      margin-left: 8px;
    }
  `]
})
export class TaskDialogComponent {
  newCategory: string = '';

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (!this.data.categories) {
      this.data.categories = [];
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }

  addCategory(): void {
    if (this.newCategory.trim()) {
      this.data.categories.push(this.newCategory.trim());
      this.newCategory = '';
    }
  }

  removeCategory(category: string): void {
    const index = this.data.categories.indexOf(category);
    if (index >= 0) {
      this.data.categories.splice(index, 1);
    }
  }
}
