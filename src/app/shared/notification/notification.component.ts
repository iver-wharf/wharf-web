import { NotificationService } from 'src/app/shared/notification/notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wh-notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit {

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

  clear() {
    this.notificationService.clear();
  }
}
