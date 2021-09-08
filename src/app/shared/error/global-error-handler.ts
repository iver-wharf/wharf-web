import { NotificationService } from './../notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { ProblemResponse } from 'api-client';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private errorService: ErrorService, private notifier: NotificationService) { }

  handleError(errorResponse: Error | HttpErrorResponse) {
    let message: string;
    if (errorResponse instanceof HttpErrorResponse) {
      if (this.isProblemResponse(errorResponse)) {
        this.notifier.showProblem(this.createProblemFromError(errorResponse.error));
        return;
      } else {
        message = errorResponse.message;
      }
    } else {
      message = this.errorService.getClientMessage(errorResponse);
    }
    this.notifier.showError(message);
  }

  private isProblemResponse(errorResponse: HttpErrorResponse): boolean {
    return errorResponse.headers.get('Content-Type') === 'application/problem+json';
  }

  private createProblemFromError(error: any): ProblemResponse {
    const { detail, errors, instance, status, title, type } = error;
    return {
      detail,
      errors,
      instance,
      status,
      title,
      type,
    };
  }
}
