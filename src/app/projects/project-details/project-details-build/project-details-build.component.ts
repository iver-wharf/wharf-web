import { Component, Input } from '@angular/core';
import { ProjectService, ArtifactService, TestResultService, ResponseBuild, BuildService } from 'api-client';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, forkJoin, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WharfProject } from 'src/app/models/main-project.model';
import { TestsResults } from 'src/app/models/tests-results.model';
import { ActionsModalStore } from '../../actions-modal/actions-modal.service';
import { LocalStorageProjectsService } from '../../local-storage-projects.service';
import { ProjectUtilsService } from '../../project-utils.service';
import { BuildStatus } from 'src/app/models/build-status';
import { Router } from '@angular/router';

@Component({
  selector: 'wh-project-details-build',
  templateUrl: './project-details-build.component.html',
})
export class ProjectDetailsBuildComponent {
  @Input() project: WharfProject;
  rowsCount = 10;
  buildsTotalCount = 0;
  excludedElements = ['environments', 'inputs'];
  selectedAction: string;
  actionsModalVisible = false;
  isActionsFormVisible = false;
  destroyed$ = new Subject<void>();

  constructor(
    public projectUtilsService: ProjectUtilsService,
    private projectService: ProjectService,
    private artifactService: ArtifactService,
    private buildService: BuildService,
    private actionsModalStore: ActionsModalStore,
    public localStorageProjectsService: LocalStorageProjectsService,
    private router: Router,
  ) { }

  loadBuildsLazy(event: LazyLoadEvent) {
    console.log(event);
    this.buildService.getBuildList(this.rowsCount, event.first, null, this.project.projectId)
      .subscribe(paginatedBuilds => {
        this.buildsTotalCount = paginatedBuilds.totalCount;
        this.project.buildHistory = paginatedBuilds.list;
        this.fillProjectActions(this.project);
        this.fillProjectBuilds(this.project).subscribe();
      });
  }

  navigateToBuild(build: ResponseBuild) {
    this.router.navigate(['/build', build.projectId, build.buildId]);
  }


  openActions(label) {
    this.selectedAction = label;
    this.actionsModalStore.openModal(
      {
        project: this.project,
        isVisible: true,
        actionName: this.selectedAction,
      },
    );
  }

  isBuildRunning(build: ResponseBuild) {
    switch (build.statusId) {
      case BuildStatus.Scheduling:
      case BuildStatus.Running:
        return true;
      default:
        return false;
    }
  }

  getStatusCssClass(statusId) {
    switch (statusId) {
      case BuildStatus.Scheduling:
        return 'status-scheduling';
      case BuildStatus.Running:
        return 'status-running';
      case BuildStatus.Completed:
        return 'status-completed';
      case BuildStatus.Failed:
        return 'status-failed';
      default:
        return '';
    }
  }

  private fillProjectBuilds(proj: WharfProject): Observable<WharfProject> {
    return forkJoin(
      proj.buildHistory.map(x =>
        this.artifactService.getBuildTestResultList(x.buildId)
          .pipe(
            map(
              testResults =>
                new TestsResults(testResults.passed, testResults.failed),
            ),
          ),
      ),
    ).pipe(
      map(testResults => {
        testResults.forEach((element, index) => {
          this.project.buildHistory[index].testsResults = element;
        });
        return this.project;
      }),
    );
  }

  private fillProjectActions(proj: WharfProject): WharfProject {
    if (proj.build != null) {
      proj.actions = [];
      Object.keys(proj.build)
        .filter(x => !this.excludedElements.includes(x))
        .map((x) => {
          proj.actions.push({ label: x, value: x });
          return { label: x, command: () => this.openActions(x) };
        });
    }
    this.project = proj;
    return this.project;
  }
}
