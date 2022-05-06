import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class OidcAuthInterceptor implements HttpInterceptor {

  constructor(
    private oidcSecurityService: OidcSecurityService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercept!');
    const apiUrl = environment.backendUrls.api;
    if (!req.url.includes(apiUrl)) {
      return next.handle(req);
    }
    const token = this.oidcSecurityService.getAccessToken();
    if (!token) {
      return next.handle(req);
    }
    const bearerToken = `Bearer ${token}`;
    req = req.clone({
      setHeaders: {
        /* eslint-disable @typescript-eslint/naming-convention */
        Authorization: bearerToken,
        /* eslint-enable @typescript-eslint/naming-convention */
      },
      withCredentials: true,
    });
    return next.handle(req);
  }
}
