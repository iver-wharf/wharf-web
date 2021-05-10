import { ToastModule } from 'primeng/toast';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import {MessageService} from 'primeng/api';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    ToastModule,
    ButtonModule,
  ],
  providers: [MessageService],
  exports: [NotificationComponent]
})
export class NotificationModule { }
