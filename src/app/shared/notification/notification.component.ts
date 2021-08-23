import { NotificationService } from 'src/app/shared/notification/notification.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'wh-notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit {
  @ViewChild('toastContent') private normalToastTemplate: TemplateRef<object>;
  @ViewChild('errorToastContent') private errorToastTemplate: TemplateRef<object>;
  @ViewChild('problemToastContent') private problemToastTemplate: TemplateRef<object>;

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
    if (message.data !== undefined) {
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
