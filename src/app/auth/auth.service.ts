import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProvider } from './auth-provider';

let returnUrl: string | null = null;

@Injectable()
export class AuthService {
  private provider: AuthProvider;

  constructor(
    private router: Router,
  ) { }

  setReturnUrl(url: string | null) {
    returnUrl = url;
  }

  navigateBackToReturnUrl() {
    if (!this.hasProvider()) {
      console.warn('Cannot navigate back: provider is not set');
      return;
    }
    if (!this.provider.isAuthenticated()) {
      console.warn('Cannot navigate back: user is not authenticated');
      return;
    }
    this.router.navigateByUrl(returnUrl ?? '/');
    returnUrl = null;
  }

  hasProvider() {
    return !!this.provider;
  }

  isAuthenticated() {
    return !!this.provider?.isAuthenticated();
  }

  register(provider: AuthProvider) {
    console.log('Registering auth provider:', provider.getName());
    this.provider = provider;
  }
}
