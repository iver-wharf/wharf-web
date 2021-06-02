import { NgModule } from '@angular/core';
import { NavComponent } from './nav.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/pipes/shared.module';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {
  ConfiguredApiModule,
  ConfiguredAzureDevOpsModule,
  ConfiguredGitHubApiModule,
  ConfiguredGitLabApiModule
} from 'projects/projects.module';

@NgModule({
  declarations: [
    NavComponent,
  ],
  imports: [
    CommonModule,
    MenuModule,
    OverlayPanelModule,
    ProgressSpinnerModule,
    SharedModule,
    TooltipModule,
    ConfiguredApiModule,
    ConfiguredAzureDevOpsModule,
    ConfiguredGitHubApiModule,
    ConfiguredGitLabApiModule,
  ],
  providers: [],
  exports: [
    NavComponent,
  ]
})
export class NavModule { }
