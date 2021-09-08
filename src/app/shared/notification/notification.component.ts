import { NotificationService } from 'src/app/shared/notification/notification.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'wh-notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit {
  @ViewChild('toastContent') private normalToastTemplate: TemplateRef<any>;
  @ViewChild('errorToastContent') private errorToastTemplate: TemplateRef<any>;
  @ViewChild('problemToastContent') private problemToastTemplate: TemplateRef<any>;

  constructor(private notificationService: NotificationService) { }
  ngOnInit(): void {
  }

  copyToClipboard(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }

  getToastTemplate(message: Message) {
    if (message.data?.messageType === 'problem') {
      return this.problemToastTemplate;
    } else if (message.severity === 'error') {
      return this.errorToastTemplate;
    }
    return this.normalToastTemplate;
  }

  clear() {
    this.notificationService.clear();
  }
}
