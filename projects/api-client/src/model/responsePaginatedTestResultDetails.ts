/**
 * Wharf main API
 * Wharf backend API that manages data storage for projects, builds, providers, etc.
 *
 * OpenAPI spec version: v5.0.0-rc.1
 * Contact: wharf@iver.se
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { ResponseTestResultDetail } from './responseTestResultDetail';


export interface ResponsePaginatedTestResultDetails { 
    list?: Array<ResponseTestResultDetail>;
    totalCount?: number;
}
