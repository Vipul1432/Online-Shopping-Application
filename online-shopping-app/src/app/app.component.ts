import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedIn = false;
  username: string | null = null;
  cartItemsCount = 0;

  constructor(private authService: AuthService, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((authenticated) => {
      this.loggedIn = authenticated;
      if (authenticated) {
        this.authService.getUsername().subscribe((username) => {
          this.username = username;
        });
      } else {
        this.username = null;
      }
    });

    this.cartService.cartItemsCount$.subscribe((count) => {
      this.cartItemsCount = count;
    });
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUsername(): string | null {
    return this.username;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
