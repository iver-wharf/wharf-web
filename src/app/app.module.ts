import { ProvidersModule } from './providers/providers.module';
import { BuildsModule } from './builds/builds.module';
import { DropdownModule } from 'primeng/dropdown';
import { ProjectsModule } from './projects/projects.module';
import { BrowserModule, Title } from '@angular/platform-browser';
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
import { LicensesModule } from './licenses/licenses.module';
import { AuthConfigModule } from './auth/auth-config.module';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login-modal/login.component';
import { EventTypes, PublicEventsService } from 'angular-auth-oidc-client';
import { filter } from 'rxjs/operators';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LicensesModule,
    ProjectsModule,
    DropdownModule,
    BuildsModule,
    ProvidersModule,
    NotificationModule,
    NavModule,
    MenuModule,
    TooltipModule,
    SharedModule,
    AuthConfigModule,
    DialogModule,
    RouterModule,
    ButtonModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceProvider,
      deps: [
        HttpClient,
        ConfigService,
      ],
      multi: true,
    },
    SyntaxHighlightService,
    Title,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
