import { ConfigService } from './../../shared/config/config.service';
import { Component, Input, OnInit } from '@angular/core';
import { ResponseArtifact, ArtifactService } from 'api-client';

@Component({
  selector: 'wh-artifacts-list',
  templateUrl: './artifacts-list.component.html',
})
export class ArtifactsListComponent implements OnInit {
  @Input() buildId: number;
  artifacts: ResponseArtifact[];

  constructor(
    private artifactService: ArtifactService,
    private configService: ConfigService) { }

  ngOnInit(): void {
    this.artifactService.getBuildArtifactList(this.buildId)
      .subscribe(paginatedArtifacts => {
        this.artifacts = paginatedArtifacts.list;
      });
  }

  getArtifactUrl(artifact): string {
    const apiUrl = this.configService.getConfig().backendUrls.api;
    const buildId = encodeURIComponent(String(this.buildId));
    const artifactId = encodeURIComponent(String(artifact.artifactId));

    return `${apiUrl}/build/${buildId}/artifact/${artifactId}`;
  }
}
