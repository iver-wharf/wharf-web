import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { ConfigService } from '../shared/config/config.service';

@Injectable()
export class WharfAuthInterceptor implements HttpInterceptor {

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private configService: ConfigService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.configService.hasConfig()){
      const apiUrl = this.configService.getApiConfig().basePath;
      if (req.url.includes(apiUrl)) {
        const token = this.oidcSecurityService.getAccessToken();
        const authHeaderValue = `Bearer ${token}`;
        req = req.clone({
          setHeaders: {
            /* eslint-disable @typescript-eslint/naming-convention */
            Authorization: authHeaderValue,
            /*eslint-enable @typescript-eslint/naming-convention */
          },
          withCredentials: true,
        });

        return next.handle(req);
      }
    }
    return next.handle(req);
  }
}
