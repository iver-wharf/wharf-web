/**
 * Wharf provider API for Azure DevOps
 * Wharf backend API for integrating Azure DevOps repositories with the Wharf main API.
 *
 * OpenAPI spec version: v2.0.1
 * Contact: wharf@iver.se
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface MainImportBody { 
    group?: string;
    project?: string;
    /**
     * used in refresh only
     */
    projectId?: number;
    /**
     * used in refresh only
     */
    providerId?: number;
    token?: string;
    /**
     * used in refresh only
     */
    tokenId?: number;
    uploadUrl?: string;
    url?: string;
    user?: string;
}
