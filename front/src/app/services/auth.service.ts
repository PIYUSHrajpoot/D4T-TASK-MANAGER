import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://d4t-task-manager.onrender.com/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.isAuthenticatedSubject.next(!!this.getToken());
  }

  login(email: string, password: string): Observable<{accessToken: string}> {
    return this.http.post<{accessToken: string}>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.accessToken);
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}