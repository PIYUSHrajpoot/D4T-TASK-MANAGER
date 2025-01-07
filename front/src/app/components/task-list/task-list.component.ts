import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-list',
  template: `
    <div class="container">
      <h2>My Tasks</h2>

      <div class="task-filters mb-20">
        <mat-button-toggle-group [(ngModel)]="filterStatus">
          <mat-button-toggle value="all">All</mat-button-toggle>
          <mat-button-toggle value="pending">Pending</mat-button-toggle>
          <mat-button-toggle value="completed">Completed</mat-button-toggle>
        </mat-button-toggle-group>
      </div>

      <button mat-raised-button color="primary" (click)="openAddTaskDialog()">Add Task</button>

      <div *ngIf="loading" class="flex-center">
        <mat-spinner></mat-spinner>
      </div>

      <div *ngIf="!loading">
        <mat-card *ngFor="let task of filteredTasks" class="task-card">
          <mat-card-content>
            <div class="task-header">
              <mat-checkbox
                [checked]="task.completed"
                (change)="completeTask(task)"
                color="primary">
                {{ task.title }}
              </mat-checkbox>
            </div>
            <p [class.completed]="task.completed">{{ task.description }}</p>
            <div class="task-actions">
              <button mat-icon-button color="accent" (click)="openEditTaskDialog(task)">
                <span style="font-size: 10px; position: absolute; top:18px; left:18px;">
                ✏️
                </span>
              </button>
              <button mat-icon-button color="warn" (click)="deleteTask(task)">
                <span style="font-size: 10px;position: absolute;top:18px;left:18px;">
                ❌
                </span>
              </button>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-paginator
          [length]="totalTasks"
          [pageSize]="pageSize"
          [pageIndex]="currentPage - 1"
          [pageSizeOptions]="[5, 10, 25]"
          (page)="onPageChange($event)">
        </mat-paginator>
      </div>
    </div>
  `,
  styles: [`
    .task-filters {
      margin-bottom: 20px;
    }
    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .completed {
      text-decoration: line-through;
      color: #888;
    }
  `]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = true;
  currentPage = 1;
  pageSize = 10;
  totalTasks = 0;
  filterStatus: 'all' | 'pending' | 'completed' = 'all';

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  get filteredTasks() {
    if (this.filterStatus === 'all') return this.tasks;
    return this.tasks.filter(task => 
      this.filterStatus === 'completed' ? task.completed : !task.completed
    );
  }

  loadTasks() {
    this.loading = true;
    this.taskService.getTasks(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.tasks = response.tasks;
        this.totalTasks = response.meta.total;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Failed to load tasks', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadTasks();
  }

  completeTask(task: Task) {
    this.taskService.completeTask(task.id).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
        this.snackBar.open('Task completed', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Failed to complete task', 'Close', { duration: 3000 });
      }
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
        this.snackBar.open('Task deleted', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Failed to delete task', 'Close', { duration: 3000 });
      }
    });
  }

  openEditTaskDialog(task: Task) {
    Swal.fire({
      title: 'Edit Task',
      html: 
        `<input id="task-title" class="swal2-input" placeholder="Title" value="${task.title}">` +
        `<input id="task-description" class="swal2-input" placeholder="Description" value="${task.description}">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Save',
      preConfirm: () => {
        const title = (document.getElementById('task-title') as HTMLInputElement).value;
        const description = (document.getElementById('task-description') as HTMLInputElement).value;
        if (!title || !description) {
          Swal.showValidationMessage('Please enter both title and description');
          return false;
        }
        return { title, description };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { title, description } = result.value;
        this.taskService.updateTask(task.id, { title, description, completed: task.completed }).subscribe({
          next: (updatedTask) => {
            const index = this.tasks.findIndex(t => t.id === task.id);
            if (index !== -1) {
              this.tasks[index] = updatedTask;
            }
            this.snackBar.open('Task updated', 'Close', { duration: 3000 });
          },
          error: () => {
            this.snackBar.open('Failed to update task', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
  

  openAddTaskDialog() {
    Swal.fire({
      title: 'Add New Task',
      html:
        '<input id="task-title" class="swal2-input" placeholder="Title">' +
        '<input id="task-description" class="swal2-input" placeholder="Description">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Add',
      preConfirm: () => {
        const title = (document.getElementById('task-title') as HTMLInputElement).value;
        const description = (document.getElementById('task-description') as HTMLInputElement).value;
        if (!title || !description) {
          Swal.showValidationMessage('Please enter both title and description');
          return false;
        }
        return { title, description };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { title, description } = result.value;
        this.taskService.createTask({ title, description }).subscribe({
          next: (newTask) => {
            this.tasks.push(newTask);
            this.snackBar.open('Task added', 'Close', { duration: 3000 });
          },
          error: () => {
            this.snackBar.open('Failed to add task', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}
