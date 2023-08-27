import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticated = false;
  private currentUsername = '';
  private baseUrl = 'http://localhost:3000/users'; // Adjust URL based on your server configuration

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.baseUrl, {
      params: {
        username,
        password,
      },
    }).pipe(
      map(users => {
        const matchedUser = users.find(user => user.username === username && user.password === password);
        if (matchedUser) {
          this.authenticated = true;
          this.currentUsername = username;
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    this.authenticated = false;
    this.currentUsername = '';
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getUsername(): string {
    return this.currentUsername;
  }
}
