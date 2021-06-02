import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { ArtifactService } from './api/artifact.service';
import { BranchService } from './api/branch.service';
import { BranchesService } from './api/branches.service';
import { BuildService } from './api/build.service';
import { HealthService } from './api/health.service';
import { MetaService } from './api/meta.service';
import { ProjectService } from './api/project.service';
import { ProviderService } from './api/provider.service';
import { TokenService } from './api/token.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    ArtifactService,
    BranchService,
    BranchesService,
    BuildService,
    HealthService,
    MetaService,
    ProjectService,
    ProviderService,
    TokenService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
