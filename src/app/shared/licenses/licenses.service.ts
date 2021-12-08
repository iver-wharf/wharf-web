import { Injectable } from '@angular/core';
import { License } from './licenses.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LicensesService {

  public licenses$: BehaviorSubject<License[]> = new BehaviorSubject<License[]>(null);

  private readonly LICENSCE_URL = '/assets/licenses.json';

  constructor(private http: HttpClient) {
      this.http.get<License[]>(this.LICENSCE_URL).subscribe(
        license => this.licenses$.next(license),
      );
  }
}
