import { ResponseProject, ResponseProvider, ResponseBuild } from 'api-client';
import { WharfBranch } from './wharf-branch.model';
import { ProjectBuild } from './project-build.model';
import { ProjectAction } from './project-action.model';

export class WharfProject implements ResponseProject {
    avatarUrl?: string;
    branches?: WharfBranch[];
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
