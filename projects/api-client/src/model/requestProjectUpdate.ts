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


export interface RequestProjectUpdate { 
    avatarUrl?: string;
    buildDefinition?: string;
    description?: string;
    gitUrl?: string;
    groupName?: string;
    name: string;
    providerId?: number;
    tokenId?: number;
}
