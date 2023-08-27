import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.initRegistrationForm();
  }

  private initRegistrationForm(): void {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  registerUser(): void {
    const password = this.registrationForm.get('password')?.value;

    if (password) {
      const username = this.registrationForm.get('username')?.value;
      this.userService.registerUser(username, password).subscribe(() => {
        console.log('User registered successfully');
        this.router.navigate(['/login']);
      });
    } else {
      console.error("Password control doesn't exist.");
    }
  }
}
