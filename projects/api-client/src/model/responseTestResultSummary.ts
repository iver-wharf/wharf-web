/**
 * Wharf main API
 * Wharf backend API that manages data storage for projects, builds, providers, etc.
 *
 * OpenAPI spec version: v5.0.0
 * Contact: wharf@iver.se
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface ResponseTestResultSummary { 
    artifactId?: number;
    buildId?: number;
    createdAt?: Date;
    failed?: number;
    fileName?: string;
    passed?: number;
    skipped?: number;
    testResultSummaryId?: number;
    total?: number;
    updatedAt?: Date;
}
