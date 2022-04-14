/**
 * Wharf main API
 * Wharf backend API that manages data storage for projects, builds, providers, etc.
 *
 * OpenAPI spec version: v5.1.2
 * Contact: wharf@iver.se
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface RequestLogOrStatusUpdate { 
    message?: string;
    status?: RequestLogOrStatusUpdate.StatusEnum;
    timestamp?: Date;
}
export namespace RequestLogOrStatusUpdate {
    export type StatusEnum = '' | 'Scheduling' | 'Running' | 'Completed' | 'Failed';
    export const StatusEnum = {
        Empty: '' as StatusEnum,
        Scheduling: 'Scheduling' as StatusEnum,
        Running: 'Running' as StatusEnum,
        Completed: 'Completed' as StatusEnum,
        Failed: 'Failed' as StatusEnum
    };
}
