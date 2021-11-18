import { Input, Component, Output, EventEmitter, Directive } from '@angular/core';
import { ProjectRefreshedEvent } from './project-refresh.event';
import { ProvidersService } from 'src/app/providers/providers.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { WharfProject } from 'src/app/models/wharf-project.model';
import { tap, finalize } from 'rxjs/operators';
import { Messages } from 'src/app/shared/messages.enum';

@Directive()
export abstract class ProjectRefreshBaseComponent {
  @Output() refreshed = new EventEmitter<ProjectRefreshedEvent>();

  @Input() project: WharfProject;

  isRefreshing = false;

  constructor(
    private providersService: ProvidersService,
    private notificationService: NotificationService,
  ) { }

  onClick(event: MouseEvent) {
    event.stopPropagation();
    if (!this.project) {
      console.warn('The project refresh component does not have "project" field set.');
      return;
    }
    if (this.isRefreshing) {
      return;
    }
    this.isRefreshing = true;
    this.providersService.refreshProject(this.project).pipe(
      tap(() => this.refreshed.emit({ projectId: this.project.projectId })),
      finalize(() => this.isRefreshing = false),
    ).subscribe({
      next: () => this.notificationService.showSuccess(Messages.SuccessProjectRefresh),
      error: (error) => this.notificationService.showError(error.message),
    });
  }
}
