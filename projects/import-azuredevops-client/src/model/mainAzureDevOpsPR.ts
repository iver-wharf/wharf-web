/**
 * Wharf provider API for Azure DevOps
 * Wharf backend API for integrating Azure DevOps repositories with the Wharf main API.
 *
 * OpenAPI spec version: v1.2.0-rc
 * Contact: wharf@iver.se
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { MainAzureDevOpsPRResource } from './mainAzureDevOpsPRResource';


export interface MainAzureDevOpsPR { 
    eventType?: string;
    resource?: MainAzureDevOpsPRResource;
}
