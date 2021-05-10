import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { map, catchError } from 'rxjs/operators';
import { Config } from './config';
import { of } from 'rxjs';

const configUrl = 'assets/config.json';

export const configServiceProvider = (http: HttpClient, configService: ConfigService) =>
  (): Promise<boolean> =>
    new Promise<boolean>((resolve: (a: boolean) => void): void => {
      http.get<Config>(configUrl)
        .pipe(
          map((x) => {
            configService.setConfig(x);
            resolve(true);
          }),
          catchError(() => {
            resolve(false);
            return of({});
          })
        )
        .subscribe();
    });
