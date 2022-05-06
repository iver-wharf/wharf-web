import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

let returnUrl: string | null = null;

@Injectable()
export class AuthService {
  isAuthenticated: boolean;
  username: string;

  constructor(
    private router: Router,
  ) { }

  setReturnUrl(url: string | null) {
    if (returnUrl) {
      console.warn('Trying to set return URL when it has already been set.', {
        current: returnUrl,
        new: url,
      });
      return;
    }
    returnUrl = url;
  }

  navigateBackToReturnUrl() {
    if (!this.isAuthenticated) {
      console.warn('Cannot navigate back: user is not authenticated');
      return;
    }
    this.router.navigateByUrl(returnUrl ?? '/');
    returnUrl = null;
  }
}
