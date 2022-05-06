import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

const SESSION_LOGIN_RETURN_KEY = 'login-return';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  username = '<unknown username>';

  private isAuthCurrent: boolean;
  private isAuth$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
  ) { }

  get isAuthenticated() {
    return this.isAuthCurrent;
  }

  get isAuthenticated$() {
    return this.isAuth$.asObservable();
  }

  setLoggedIn(username: string | undefined) {
    if (this.isAuthCurrent) {
      console.warn('Tried to set logged in when already logged in.');
      return;
    }
    this.username = username ?? '<unknown username>';
    this.isAuthCurrent = true;
    this.isAuth$.next(true);
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
    this.router.navigateByUrl(returnUrl);
    sessionStorage.removeItem(SESSION_LOGIN_RETURN_KEY);
  }
}
