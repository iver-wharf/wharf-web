import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { License } from '../shared/licenses/licenses.model';
import { LicensesService } from '../shared/licenses/licenses.service';

@Component({
  selector: 'wh-licenses',
  templateUrl: './licenses.component.html',
})
export class LicensesComponent implements OnInit {
  licenses?: License[];
  loadError?: Error;
  loadHttpError: HttpErrorResponse;

  constructor(
    private titleService: Title,
    licenseService: LicensesService,
  ) {
    licenseService.licenses$.subscribe({
      next: licenses => this.licenses = licenses,
      error: err => {
        console.error(err);
        if (err instanceof HttpErrorResponse) {
          this.loadError = err;
          this.loadHttpError = err;
        } else if (err instanceof Error) {
          this.loadError = err;
        } else {
          this.loadError = new Error(err.toString());
        }
      },
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle('Third-party licenses - Wharf');
  }
}
