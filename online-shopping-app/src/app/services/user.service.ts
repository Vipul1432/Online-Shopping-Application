import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  registerUser(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, { username, password });
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`, { params: { username, password } });
  }
    logoutUser(): Observable<any> {
    
    localStorage.removeItem('authToken');
    return new Observable(observer => {
   
      observer.next({ success: true });
      observer.complete();
    });
  }
}
