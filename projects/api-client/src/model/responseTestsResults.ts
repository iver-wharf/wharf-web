/**
 * Wharf main API
 * Wharf backend API that manages data storage for projects, builds, providers, etc.
 *
 * OpenAPI spec version: v5.1.1
 * Contact: wharf@iver.se
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface ResponseTestsResults { 
    failed?: number;
    passed?: number;
    status?: ResponseTestsResults.StatusEnum;
}
export namespace ResponseTestsResults {
    export type StatusEnum = 'Success' | 'Failed' | 'No tests';
    export const StatusEnum = {
        Success: 'Success' as StatusEnum,
        Failed: 'Failed' as StatusEnum,
        NoTests: 'No tests' as StatusEnum
    };
}
