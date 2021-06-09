import { SharedModule } from '../shared/pipes/shared.module';
import { ArtifactsModule } from './../artifacts/artifacts.module';
import { BuildService, ProjectService } from 'api-client';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuildDetailsComponent } from './build-details/build-details.component';
import { TabViewExtendedModule } from '../shared/tabview-x/tabview-x.module';

@NgModule({
  declarations: [
    BuildDetailsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TabMenuModule,
    TabViewExtendedModule,
    ArtifactsModule,
    SharedModule,
  ],
  providers: [
    ProjectService,
    BuildService,
  ],
})
export class BuildsModule { }
