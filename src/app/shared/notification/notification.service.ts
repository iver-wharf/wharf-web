import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private messageService: MessageService) { }

  showSuccess(message: string = null): void {
    if (!message) {
      message = 'Success !';
    }

    this.showToast(message, 'success');
  }

  showInfo(message: string): void {
    this.showToast(message, 'info');
  }

  showWarning(message: string): void {
    this.showToast(message, 'warning');
  }

  showError(message: string): void {
    this.showToast(message, 'error', true);
  }

  clear() {
    this.messageService.clear();
  }

  private showToast(message: string, type: string, isSticky = false) {
    this.messageService.add({severity: type, summary: type.toUpperCase(), detail: message, sticky: isSticky});
  }
}
