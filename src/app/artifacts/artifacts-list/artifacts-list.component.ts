import { ConfigService } from './../../shared/config/config.service';
import { Component, Input, OnInit } from '@angular/core';
import { MainArtifact, ArtifactService } from 'api-client';

@Component({
  selector: 'wh-artifacts-list',
  templateUrl: './artifacts-list.component.html',
})
export class ArtifactsListComponent implements OnInit {
  @Input() buildId: number;
  artifacts: MainArtifact[];

  constructor(
    private artifactService: ArtifactService,
    private configService: ConfigService) { }

  ngOnInit(): void {
    this.artifactService.buildBuildidArtifactsGet(this.buildId)
      .subscribe(data => {
        this.artifacts = data;
      });
  }

  getArtifactUrl(artifact): string {
    const apiUrl = this.configService.getConfig().backendUrls.api;
    const buildId = encodeURIComponent(String(this.buildId));
    const artifactId = encodeURIComponent(String(artifact.artifactId));

    return `${apiUrl}/build/${buildId}/artifact/${artifactId}`;
  }
}
