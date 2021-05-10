import { ProvidersModule } from './providers/providers.module';
import { BuildsModule } from './builds/builds.module';
import { DropdownModule } from 'primeng/dropdown';
import { ProjectsModule } from './projects/projects.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ApiModule, Configuration } from 'api-client';
import { configServiceProvider } from './shared/config/config.service.provider';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './shared/config/config.service';
import { GlobalErrorHandler } from './shared/error/global-error-handler';
import { NotificationModule } from './shared/notification/notification.module';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { SyntaxHighlightService } from './shared/syntax-highlight/syntax-highlight.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SharedModule } from './shared/pipes/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProjectsModule,
    DropdownModule,
    BuildsModule,
    ProvidersModule,
    NotificationModule,
    OverlayPanelModule,
    MenuModule,
    TooltipModule,
    SharedModule,
    {
      ngModule: ApiModule,
      providers: [
        {
          provide: Configuration,
          useFactory: (configService: ConfigService) => configService.getApiConfig(),
          deps: [
            ConfigService
          ]
        },
        {
          provide: ErrorHandler,
          useClass: GlobalErrorHandler
        }
      ]
    }
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
