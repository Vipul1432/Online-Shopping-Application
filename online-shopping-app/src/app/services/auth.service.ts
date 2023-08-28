import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from '../models/Product';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private authenticatedSubject = new BehaviorSubject<boolean>(false);
  private usernameSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    this.checkAuthentication();
  }

  login(username: string, password: string): Observable<boolean> {
    const queryParams = `?username=${username}&password=${password}`;
    return this.http.get<any>(`${this.baseUrl}/users${queryParams}`).pipe(
      map((response) => {
        const isAuthenticated = response.length > 0;
        this.authenticatedSubject.next(isAuthenticated);
        if (isAuthenticated) {
          this.usernameSubject.next(username);
  
          // Set username and authenticated values in local storage
          localStorage.setItem('authenticated', 'true');
          localStorage.setItem('username', username);
        }
        return isAuthenticated;
      }),
      catchError(() => {
        this.handleLoginError();
        return of(false);
      })
    );
  }
  

  logout(): void {
    this.authenticatedSubject.next(false);
    this.usernameSubject.next(null);
    localStorage.removeItem('authenticated');
    localStorage.removeItem('username'); 
  }

  isAuthenticated(): Observable<boolean> {
    return this.authenticatedSubject.asObservable();
  }

  getUsername(): Observable<string | null> {
    return this.usernameSubject.asObservable();
  }

  getUsernameFromLocalStorage(): string | null {
    const username = localStorage.getItem('username');
    return username ? username : null;
  }

  updateUserCart(cartItems: Product[], name:string): Observable<void> {
    const username = localStorage.getItem('username');
    
    if (!username) {
      return throwError('No username found');
    }
    
    const user: User = {
      id: 1,
      username: username,
      password: '', 
      isAdmin: false,
      name: name 
    };
  
    user.cart = cartItems; 
  
    // Update the user's data in local storage
    const users: User[] = [user];
    localStorage.setItem('users', JSON.stringify(users));
  
    return of(undefined);
  }
  
  private checkAuthentication(): void {
    const isAuthenticated = localStorage.getItem('authenticated');
    const username = localStorage.getItem('username');
    if (isAuthenticated === 'true' && username) {
      this.authenticatedSubject.next(true);
      this.usernameSubject.next(username);
    }
  }

  private handleLoginError(): void {
    this.authenticatedSubject.next(false);
    this.usernameSubject.next(null);
  }
}
