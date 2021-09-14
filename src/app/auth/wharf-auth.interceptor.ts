import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
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
        // TODO This still needs work after token validation is in place. Should be verified base 64 encoded.
        req.params.set('Authorization', 'Bearer ' + this.oidcSecurityService.getAccessToken());
      }
    }

    return next.handle(req);
  }
}
