/**
 * Wharf provider API for GitLab
 * Wharf backend API for integrating GitLab repositories with the Wharf main API.
 *
 * OpenAPI spec version: v1.2.0
 * Contact: wharf@iver.se
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface AppVersion { 
    /**
     * BuildDate is the date on which this version of the API was built.
     */
    buildDate?: Date;
    /**
     * BuildGitCommit is the Git commit that this version of the API was built from.
     */
    buildGitCommit?: string;
    /**
     * BuildRef is the Wharf build ID/reference from which this version of the API was build in.
     */
    buildRef?: number;
    /**
     * Version is the version of this API build. A SemVer2.0.0 formatted version prefixed with a single \"v\" is expected, but not enforced.  For local development versions a value of \"local dev\", \"local docker\", or something alike is recommended.
     */
    version?: string;
}
