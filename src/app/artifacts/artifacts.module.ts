import { AppUtilsService } from './../app-utils.service';

import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtifactsListComponent } from './artifacts-list/artifacts-list.component';
import { ArtifactService, ProjectService } from 'projects/api-client/src';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ArtifactsListComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule
  ],
  providers: [ArtifactService, ProjectService, AppUtilsService],
  exports: [ArtifactsListComponent]
})
export class ArtifactsModule { }
