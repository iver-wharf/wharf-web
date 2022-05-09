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
    if (!environment.oidcConfig?.enabled) {
      return next.handle(req);
    }
    const urls = environment.backendUrls;
    if (!req.url.startsWith(urls.api) &&
      !req.url.startsWith(urls.azureDevopsImport) &&
      !req.url.startsWith(urls.githubImport) &&
      !req.url.startsWith(urls.gitlabImport)) {
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
