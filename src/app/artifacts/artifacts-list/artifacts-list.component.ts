import { Component, Input, OnInit } from '@angular/core';
import { ResponseArtifact, ArtifactService } from 'api-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'wh-artifacts-list',
  templateUrl: './artifacts-list.component.html',
})
export class ArtifactsListComponent implements OnInit {
  @Input() buildId: number;
  artifacts: ResponseArtifact[];

  constructor(
    private artifactService: ArtifactService,
  ) { }

  ngOnInit(): void {
    this.artifactService.getBuildArtifactList(this.buildId, 0)
      .subscribe(paginatedArtifacts => {
        this.artifacts = paginatedArtifacts.list;
      });
  }

  getArtifactUrl(artifact): string {
    const apiUrl = environment.backendUrls.api;
    const buildId = encodeURIComponent(String(this.buildId));
    const artifactId = encodeURIComponent(String(artifact.artifactId));

    return `${apiUrl}/build/${buildId}/artifact/${artifactId}`;
  }
}
