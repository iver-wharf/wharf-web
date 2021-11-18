
import { ResponseBuildParam } from 'api-client';
import { BuildStatus } from './build-status';
import { TestsResults } from './tests-results.model';

export interface ResponseBuild {
    buildId?: number;
    finishedOn?: Date;
    params?: Array<ResponseBuildParam>;
    projectId?: number;
    scheduledOn?: Date;
    startedOn?: Date;
    statusId?: BuildStatus;
    testsResults?: TestsResults;
}
