import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'api-client';
import { SelectItem } from 'primeng/api/selectitem';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WharfProject } from 'src/app/models/main-project.model';
import { ProvidersService } from 'src/app/providers/providers.service';
import { ActionsModalStore } from '../actions-modal/actions-modal.service';
import { ProjectRefreshedEvent } from '../project-refresh';
import { LocalStorageProjectsService } from './../local-storage-projects.service';
import { Title } from '@angular/platform-browser';

const enum Tabs {
  All = 0,
  Favorites,
}

@Component({
  selector: 'wh-project-list',
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent implements OnInit {
  // Need ViewChildren instead of ViewChild because the ng-container actually
  // creates two data tables that it switches between.
  @ViewChildren(Table) dts: QueryList<Table>;

  projects: WharfProject[];
  favoriteProjects: WharfProject[];
  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;
  isActionsFormVisible = false;
  destroyed$ = new Subject<void>();
  activeTabIndex = 0;

  constructor(
    private projectService: ProjectService,
    public localStorageProjectsService: LocalStorageProjectsService,
    private providersService: ProvidersService,
    private actionsModalStore: ActionsModalStore,
    private router: Router,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.sortOptions = [{ label: 'Name', value: 'name' }];
    this.loadProjects();
    this.providersService.formClosed$.pipe(takeUntil(this.destroyed$)).subscribe(() => this.loadProjects());
    this.actionsModalStore.isVisible$.pipe(takeUntil(this.destroyed$)).subscribe(x => this.isActionsFormVisible = x);
    this.viewFavoritesTabIfAny();
    this.updateTitle();
  }

  onSearchKeyUp(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    this.dts.forEach(dt => {
      dt.filterGlobal(target.value, 'contains');
    });
  }

  onProjectRowClicked(event: MouseEvent, project: WharfProject) {
    this.router.navigate(['/project', project.projectId]);
  }

  onProjectRefreshed(event: ProjectRefreshedEvent) {
    this.replaceProject(event.projectId);
  }

  onTabChanged() {
    this.updateTitle();
  }

  viewFavoritesTabIfAny() {
    if (this.localStorageProjectsService.getFavoriteProjectsIds().length > 0) {
      this.activeTabIndex = 1;
    }
  }

  initFavoriteProjects() {
    const favoriteProjectsIds = this.localStorageProjectsService.getFavoriteProjectsIds();
    this.favoriteProjects = this.projects.filter(proj => favoriteProjectsIds.includes(proj.projectId));
    // in case there is a favorite stored in memory that has since been
    // removed, then we reset it so it's guaranteed to be fresh
    this.localStorageProjectsService.setFavoriteProjectIds(this.favoriteProjects.map(o => o.projectId));
  }

  private replaceProject(projectId: number) {
    const projectIndex = this.projects.findIndex(proj => proj.projectId === projectId);
    if (projectIndex !== -1) {
      this.projectService.projectProjectidGet(projectId).subscribe(proj => {
        this.projects[projectIndex] = proj;
      });
    }

    const favoriteProjectIndex = this.favoriteProjects.findIndex(proj => proj.projectId === projectId);
    if (favoriteProjectIndex !== -1) {
      this.projectService.projectProjectidGet(projectId).subscribe(proj => {
        this.favoriteProjects[favoriteProjectIndex] = proj;
      });
    }
  }

  private loadProjects() {
    this.projectService.projectsGet().subscribe(val => {
      this.projects = val;
      this.initFavoriteProjects();
    });
  }

  private updateTitle() {
    if (this.activeTabIndex === Tabs.All) {
      this.titleService.setTitle('All projects - Wharf');
    } else if (this.activeTabIndex === Tabs.Favorites) {
      this.titleService.setTitle('Favorite projects - Wharf');
    }
  }
}
