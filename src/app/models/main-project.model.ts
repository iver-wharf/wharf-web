import { ResponseProject, ResponseBuild, ResponseProvider, ResponseBranch } from 'api-client';
import { ProjectBuild } from './project-build.model';
import { ProjectAction } from './project-action.model';

export class WharfProject implements ResponseProject {
    avatarUrl?: string;
    branches?: ResponseBranch[];
    buildDefinition?: string;
    buildHistory?: ResponseBuild[];
    description?: string;
    gitUrl?: string;
    groupName?: string;
    name?: string;
    projectId?: number;
    provider?: ResponseProvider;
    providerId?: number;
    tokenId?: number;
    build?: ProjectBuild;
    actions?: ProjectAction[];
}
