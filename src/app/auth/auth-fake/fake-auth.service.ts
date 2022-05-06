import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth-provider';

@Injectable()
export class FakeAuthService implements AuthProvider {
  getName(): string {
    return 'fake auth';
  }

  isAuthenticated(): boolean {
    console.log('checking if fake is authenticated');
    return true;
  }
}
