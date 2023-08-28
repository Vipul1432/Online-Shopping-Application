import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loggedIn = false;
  username = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
    this.checkAuthentication();
  }

  private initLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginUser(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.login(username, password).subscribe(
        (loggedIn) => {
          if (loggedIn) {
            console.log('User logged in successfully');
            this.router.navigate(['/products']);
          } else {
            console.log('Login failed');
          }
        },
        (error) => {
          console.error('Login error:', error);
        }
      );
    }
  }

  checkAuthentication(): void {
    this.authService.isAuthenticated().subscribe((authenticated) => {
      this.loggedIn = authenticated;
      if (authenticated) {
        this.authService.getUsername().subscribe((username) => {
          this.username = username || '';
        });
      }
    });
  }
}
