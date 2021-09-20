
import { ResponseBuildParam, ResponseTestResultListSummary, ResponseTestResultSummary } from 'api-client';
import { BuildStatus } from './build-status';

export interface ResponseBuild {
    buildId?: number;
    environment?: string;
    finishedOn?: Date;
    gitBranch?: string;
    isInvalid?: boolean;
    params?: Array<ResponseBuildParam>;
    projectId?: number;
    scheduledOn?: Date;
    stage?: string;
    startedOn?: Date;
    status?: string;
    statusId?: BuildStatus;
    testResultListSummary?: ResponseTestResultListSummary;
    testResultSummaries?: Array<ResponseTestResultSummary>;
}
