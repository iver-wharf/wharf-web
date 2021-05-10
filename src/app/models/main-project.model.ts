import { MainProject, MainProvider } from 'api-client';
import { MainBuild } from './main-build.model';
import { MainBranch } from './main-branch.model';
import { ProjectBuild } from './project-build.model';
import { ProjectAction } from './project-action.model';

export class WharfProject implements MainProject {
    avatarUrl?: string;
    branches?: MainBranch[];
    buildDefinition?: string;
    buildHistory?: MainBuild[];
    description?: string;
    gitUrl?: string;
    groupName?: string;
    name?: string;
    projectId?: number;
    provider?: MainProvider;
    providerId?: number;
    tokenId?: number;
    build?: ProjectBuild;
    actions?: ProjectAction[];
}
