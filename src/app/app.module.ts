import { ProvidersModule } from './providers/providers.module';
import { BuildsModule } from './builds/builds.module';
import { DropdownModule } from 'primeng/dropdown';
import { ProjectsModule } from './projects/projects.module';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http';
import { NotificationModule } from './shared/notification/notification.module';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { SyntaxHighlightService } from './shared/syntax-highlight/syntax-highlight.service';
import { SharedModule } from './shared/pipes/shared.module';
import { NavModule } from './nav/nav.module';
import { LicensesModule } from './licenses/licenses.module';
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
  ],
  providers: [
    SyntaxHighlightService,
    Title,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
