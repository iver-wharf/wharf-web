import { NotificationService } from './../notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProblemResponse } from 'src/app/models/problem-response.model';
import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  problemResponseKeys: Array<string>;

  constructor(private errorService: ErrorService, private notifier: NotificationService) {
    this.problemResponseKeys = Object.keys(new ProblemResponse(
      "detail",
      ["error1", "error2"],
      "instance",
      32,
      "title",
      "type"
    ));
  }

  handleError(errorResponse: Error | HttpErrorResponse) {
    let message: string;
    if (errorResponse instanceof HttpErrorResponse) {
      if (this.isProblemResponse(errorResponse.error)) {
        this.notifier.showProblem(ProblemResponse.make(errorResponse.error));
        return;
      } else {
        message = errorResponse.message;
      }
    } else {
      message = this.errorService.getClientMessage(errorResponse);
    }
    this.notifier.showError(message);
  }

  private isProblemResponse(error: any): boolean {
    const keys = Object.keys(error);
    for (const key of keys) {
      if (!this.problemResponseKeys.includes(key)) {
        return false;
      }
    }

    return true;
  }
}
