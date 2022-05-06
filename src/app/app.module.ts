import { ProvidersModule } from './providers/providers.module';
import { BuildsModule } from './builds/builds.module';
import { DropdownModule } from 'primeng/dropdown';
import { ProjectsModule } from './projects/projects.module';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationModule } from './shared/notification/notification.module';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { SyntaxHighlightService } from './shared/syntax-highlight/syntax-highlight.service';
import { SharedModule } from './shared/pipes/shared.module';
import { NavModule } from './nav/nav.module';
import { LicensesModule } from './licenses/licenses.module';
import { AuthModule as OidcAuthModule } from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
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
    AuthModule,

    OidcAuthModule.forRoot({
      config: environment.oidcConfig?.enabled
        ? environment.oidcConfig
        : {
          authority: '/assets/fake-auth/.well-known/openid-configuration.json',
          redirectUrl: '/',
          clientId: 'noop',
        },
    }),
  ],
  providers: [
    SyntaxHighlightService,
    Title,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
