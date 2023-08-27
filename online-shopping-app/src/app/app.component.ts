import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private loggedIn = false;
  private username = '';

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    this.loggedIn = this.authService.isAuthenticated();
    if (this.loggedIn) {
      this.username = this.authService.getUsername();
    }
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUsername(): string {
    return this.username;
  }

  login(username: string, password: string): void {
    // Call the login method from AuthService and handle the result
    this.authService.login(username, password).subscribe((loggedIn) => {
      if (loggedIn) {
        this.checkAuthentication();
      } else {
        console.log('Login failed'); // Handle failed login
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.userService.logoutUser().subscribe(() => {
      this.loggedIn = false;
      this.username = '';
    });
  }
}
