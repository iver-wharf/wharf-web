import { Injectable } from '@angular/core';
import { License } from './licenses.model';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LicensesService {
  licenses$ = this.http.get<License[]>('/assets/licenses.json').pipe(
    shareReplay(),
  );

  constructor(private http: HttpClient) {
  }
}
