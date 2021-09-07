import { CommonModule, TitleCasePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService, ArtifactService } from 'api-client';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { TabMenuModule } from 'primeng/tabmenu';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LocalStorageService } from './../shared/local-storage/local-storage.service';
import { ActionsModalComponent } from './actions-modal/actions-modal.component';
import { LocalStorageProjectsService } from './local-storage-projects.service';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProvidersModule } from '../providers/providers.module';
import { WharfSpinnerAnimationComponent } from '../animations/wharf-spinner-animation/wharf-spinner-animation.component';
import { ProjectListItemComponent } from './project-list/project-list-item.component';
import {
  ProjectDetailsBuildComponent,
  ProjectDetailsComponent,
  ProjectDetailsScheduleComponent,
  ProjectDetailsConfigurationComponent,
} from './project-details';
import { SyntaxHighlightComponent } from '../shared/syntax-highlight/syntax-highlight.component';
import {
  ProjectRefreshIconComponent,
  ProjectRefreshButtonComponent,
} from './project-refresh';
import {
  ProjectFavoriteButtonComponent,
} from './project-favorite/project-favorite-button.component';
import { TabViewExtendedModule } from '../shared/tabview-x/tabview-x.module';
import { TimerComponent } from '../shared/timer/timer.component';
import { SharedModule } from '../shared/pipes/shared.module';

@NgModule({
  declarations: [
    ActionsModalComponent,
    ProjectDetailsBuildComponent,
    ProjectDetailsComponent,
    ProjectDetailsConfigurationComponent,
    ProjectDetailsScheduleComponent,
    ProjectListComponent,
    ProjectListItemComponent,
    ProjectRefreshButtonComponent,
    ProjectRefreshIconComponent,
    ProjectFavoriteButtonComponent,
    SyntaxHighlightComponent,
    TimerComponent,
    WharfSpinnerAnimationComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    CommonModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    MenuModule,
    PasswordModule,
    ProgressSpinnerModule,
    ProvidersModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    SplitButtonModule,
    TableModule,
    TabMenuModule,
    TabViewExtendedModule,
    TooltipModule,
  ],
  providers: [
    ArtifactService,
    LocalStorageProjectsService,
    LocalStorageService,
    ProjectService,
    TitleCasePipe,
  ],
})
export class ProjectsModule { }
