import { ConfigService } from './../../shared/config/config.service';
import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuildService, MainLog } from 'api-client';
import { WharfProject } from 'src/app/models/main-project.model';
import { BuildStatus } from '../../models/build-status';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'wh-build-details',
  templateUrl: './build-details.component.html',
})
export class BuildDetailsComponent implements OnInit, OnDestroy, AfterViewChecked {
  buildId: string;
  project: WharfProject;
  buildStatus?: BuildStatus;
  myData: any;
  source: EventSource;
  listener: any = null;
  logEvents: MainLog[] = [];
  container: HTMLElement;
  activeTabIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private buildService: BuildService,
    private configService: ConfigService,
    private titleService: Title) { }

  ngOnInit(): void {
    this.buildId = this.route.snapshot.paramMap.get('buildId');
    this.buildService.buildBuildidGet(Number(this.buildId)).subscribe(build => {
      this.buildStatus = build.statusId;
      this.connect();
    });

    this.updateTitle();
  }

  ngAfterViewChecked(): void {
    this.stayScrolledToBottom();
  }

  connect(): void {
    if (this.buildStatus === BuildStatus.Scheduling || this.buildStatus === BuildStatus.Running) {
      if (!this.source) {
        const apiUrl = this.configService.getConfig().backendUrls.api;
        this.source = new EventSource(`${apiUrl}/build/${this.buildId}/stream`);
      }
      if (!!window.EventSource && !this.listener) {
        this.source.addEventListener('message', (message: MessageEvent) => {
          // When it comes to SSE, the MessageEvent.data is always a string
          const data = JSON.parse(message.data);
          this.logEvents.push(data);
        });
      }
    } else {
      if (this.source) {
        this.source.close();
      }

      if (!(this.buildStatus in BuildStatus)) {
        console.warn(`Unknown build status ID '${this.buildStatus}' on build ID '${this.buildId}'.`);
      }
    }
    this.buildService.buildBuildidLogGet(Number(this.buildId)).subscribe(log => {
      this.logEvents = log;
      this.logEvents.sort((a, b) => a.logId - b.logId);
    });
  }

  ngOnDestroy() {
    this.source?.removeEventListener('message', this.listener);
  }

  onTabChanged() {
    this.updateTitle();
  }

  private stayScrolledToBottom(): void {
    if (this.isScrolledToBottom()) {
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    window.scrollTo(0, document.body.scrollHeight);
  }

  private isScrolledToBottom(): boolean {
    // The -2 is to have some margin for error
    return (window.innerHeight + window.pageYOffset) >= document.body.scrollHeight - 2;
  }

  private updateTitle() {
    switch (this.activeTabIndex) {
      case 0:
        return this.titleService.setTitle('Logs - Wharf');
      case 1:
        return this.titleService.setTitle('Artifacts - Wharf');
      default:
        return this.titleService.setTitle('Wharf');
    }
  }
}
