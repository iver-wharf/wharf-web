import { ConfigService } from './../../shared/config/config.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuildService, MainLog } from 'api-client';
import { WharfProject } from 'src/app/models/main-project.model';
import { BuildStatus } from '../../models/build-status';

@Component({
  selector: 'wh-build-details',
  templateUrl: './build-details.component.html'
})
export class BuildDetailsComponent implements OnInit, OnDestroy {
  buildId: string;
  project: WharfProject;
  buildStatus?: BuildStatus;
  myData: any;
  source: EventSource;
  listener: any = null;
  logEvents: MainLog[] = [];
  container: HTMLElement;

  constructor(
    private route: ActivatedRoute,
    private buildService: BuildService,
    private configService: ConfigService) { }

  ngOnInit(): void {
    this.buildId = this.route.snapshot.paramMap.get('buildId');
    this.buildService.buildBuildidGet(Number(this.buildId)).subscribe(build => {
      this.buildStatus = build.statusId;
      this.connect();
    });
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
          this.container = document.querySelector('#console-log > div');
          this.container.scrollTop = this.container.scrollHeight;
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
}
