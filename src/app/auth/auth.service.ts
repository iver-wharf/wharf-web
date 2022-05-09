import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

const SESSION_LOGIN_RETURN_KEY = 'login-return';

export interface Profile {
  isAuthenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private profileCurrent: Profile = {
    isAuthenticated: false,
    username: '',
  };
  private profileSubject: BehaviorSubject<Profile> = new BehaviorSubject<Profile>(this.profileCurrent);

  constructor(
    private router: Router,
  ) { }

  get isAuthenticated() {
    return this.profileCurrent.isAuthenticated;
  }

  get profile$() {
    return this.profileSubject.asObservable();
  }

  setLoggedIn(username: string | undefined) {
    if (this.profileCurrent.isAuthenticated) {
      console.warn('Tried to set logged in when already logged in.');
      return;
    }
    this.profileCurrent = {
      username: username ?? '<unknown username>',
      isAuthenticated: true,
    };
    this.profileSubject.next(this.profileCurrent);
  }

  setReturnUrl(url: string | null) {
    const returnUrl = sessionStorage.getItem(SESSION_LOGIN_RETURN_KEY);
    if (returnUrl) {
      return;
    }
    sessionStorage.setItem(SESSION_LOGIN_RETURN_KEY, url);
  }

  navigateBackToReturnUrl() {
    if (!this.isAuthenticated) {
      console.warn('Cannot navigate back: user is not authenticated');
      return;
    }
    const returnUrl = sessionStorage.getItem(SESSION_LOGIN_RETURN_KEY) ?? '/';
    console.log('Routing back to', returnUrl);
    this.router.navigateByUrl(returnUrl);
    sessionStorage.removeItem(SESSION_LOGIN_RETURN_KEY);
  }
}
