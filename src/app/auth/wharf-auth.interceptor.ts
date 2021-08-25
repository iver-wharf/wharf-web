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
    if (req.url.includes(this.configService.getConfig().backendUrls.api)) {
      req.params.set('Authorization', 'Bearer ' + 'asd');//this.oidcSecurityService.getIdToken());
    }
    return next.handle(req);
  }
}
