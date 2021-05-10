
import { MainBuildParam } from 'api-client';
import { BuildStatus } from './build-status';
import { TestsResults } from './tests-results.model';

export interface MainBuild {
    buildId?: number;
    finishedOn?: Date;
    params?: Array<MainBuildParam>;
    projectId?: number;
    scheduledOn?: Date;
    startedOn?: Date;
    statusId?: BuildStatus;
    testsResults?: TestsResults;
}
