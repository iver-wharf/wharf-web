import { NotificationService } from './../notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private errorService: ErrorService, private notifier: NotificationService) { }

    handleError(errorResponse: Error | HttpErrorResponse) {
        let message: string;

        if (errorResponse instanceof HttpErrorResponse) {
          message = errorResponse.message;
        } else {
          message = this.errorService.getClientMessage(errorResponse);
        }

        this.notifier.showError(message);
    }
}
