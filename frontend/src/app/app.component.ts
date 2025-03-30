import { Component } from '@angular/core';
import { AuthService } from './services/auth.service'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>D4T - Task Manager</span>
      <span class="spacer"></span>
      <ng-container *ngIf="!(isAuthenticated$ | async)">
        <button mat-button routerLink="/login">Login</button>
        <button mat-button routerLink="/register">Register</button>
      </ng-container>
      <ng-container *ngIf="isAuthenticated$ | async">
        <button mat-button (click)="logout()" routerLink="/login">Logout</button>
      </ng-container>
    </mat-toolbar>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class AppComponent {
  title = 'D4T - Task Manager';
  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated(); 
  }

  logout(): void {
    this.authService.logout(); 
  }
}
