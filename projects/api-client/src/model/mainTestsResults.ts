/**
 * Wharf main API
 * Wharf backend API that manages data storage for projects, builds, providers, etc.
 *
 * OpenAPI spec version: local docker-compose
 * Contact: wharf@iver.se
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface MainTestsResults { 
    failed?: number;
    passed?: number;
    status?: MainTestsResults.StatusEnum;
}
export namespace MainTestsResults {
    export type StatusEnum = 'Success' | 'Failed' | 'No tests';
    export const StatusEnum = {
        Success: 'Success' as StatusEnum,
        Failed: 'Failed' as StatusEnum,
        NoTests: 'No tests' as StatusEnum
    };
}
