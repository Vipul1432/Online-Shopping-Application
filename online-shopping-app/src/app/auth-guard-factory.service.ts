import { Injectable } from '@angular/core';
import { AuthGuard } from './auth.guard';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardFactoryService {

  constructor(private authGuard: AuthGuard) {}

  canActivateGuard(): () => boolean {
    return this.authGuard.canActivate.bind(this.authGuard);
  }
}
