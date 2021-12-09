import { Injectable } from '@angular/core';
import { License } from './licenses.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const LICENSES_URL = '/assets/licenses.json';

@Injectable({
  providedIn: 'root',
})
export class LicensesService {

  public licenses$: BehaviorSubject<License[]> = new BehaviorSubject<License[]>(null);

  constructor(private http: HttpClient) {
      this.http.get<License[]>(LICENSES_URL).subscribe(
        licenses => this.licenses$.next(licenses),
      );
  }
}
