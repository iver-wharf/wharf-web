import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'wh-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'wharf';

  constructor(
    private oidcSecurityService: OidcSecurityService,
  ) {
  }

  ngOnInit() {
    // The method checkAuth() is needed to process the redirect from your Security Token Service and set the
    // correct states. This method must be used to ensure the correct functioning of the library.
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, idToken }) => {
      console.warn('Authenticated: ', isAuthenticated);
    });
  }
}
