import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuildService, ResponseLog } from 'api-client';
import { BuildStatus } from '../../models/build-status';
import { Title } from '@angular/platform-browser';
import { ResponseBuild } from 'api-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'wh-build-details',
  templateUrl: './build-details.component.html',
})
export class BuildDetailsComponent implements OnInit, OnDestroy, AfterViewChecked {
  buildId: number;
  buildStatus?: BuildStatus;
  build: ResponseBuild;
  myData: any;
  source: EventSource;
  listener: any = null;
  logEvents: ResponseLog[] = [];
  container: HTMLElement;
  wasScrolledToBottom: boolean;

  constructor(
    private route: ActivatedRoute,
    private buildService: BuildService,
    private titleService: Title) { }

  ngOnInit(): void {
    this.buildId = Number(this.route.snapshot.paramMap.get('buildId'));
    this.buildService.getBuild(this.buildId).subscribe(build => {
      this.build = build;
      this.buildStatus = build.statusId;
      this.connect();
    });
  }

  ngAfterViewChecked(): void {
    this.stayScrolledToBottom();
  }

  connect(): void {
    if (this.buildStatus === BuildStatus.Scheduling || this.buildStatus === BuildStatus.Running) {
      if (!this.source) {
        const apiUrl = environment.backendUrls.api;
        this.source = new EventSource(`${apiUrl}/build/${this.buildId}/stream`);
      }
      if (!!window.EventSource && !this.listener) {
        this.source.addEventListener('message', (message: MessageEvent) => {
          this.wasScrolledToBottom = this.isScrolledToBottom();
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
    this.buildService.getBuildLogList(this.buildId).subscribe(log => {
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
    if (this.wasScrolledToBottom) {
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
    this.titleService.setTitle(`Build ${this.buildId} - Wharf`);
  }
}
