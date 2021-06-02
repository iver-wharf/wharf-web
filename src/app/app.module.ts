import { ProvidersModule } from './providers/providers.module';
import { BuildsModule } from './builds/builds.module';
import { DropdownModule } from 'primeng/dropdown';
import { ProjectsModule } from './projects/projects.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { configServiceProvider } from './shared/config/config.service.provider';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './shared/config/config.service';
import { NotificationModule } from './shared/notification/notification.module';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { SyntaxHighlightService } from './shared/syntax-highlight/syntax-highlight.service';
import { SharedModule } from './shared/pipes/shared.module';
import { NavModule } from './nav/nav.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProjectsModule,
    DropdownModule,
    BuildsModule,
    ProvidersModule,
    NotificationModule,
    NavModule,
    MenuModule,
    TooltipModule,
    SharedModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceProvider,
      deps: [
        HttpClient,
        ConfigService
      ],
      multi: true
    },
    SyntaxHighlightService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
