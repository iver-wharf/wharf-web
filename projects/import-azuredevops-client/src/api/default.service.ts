/**
 * Wharf provider API for Azure DevOps
 * Wharf backend API for integrating Azure DevOps repositories with the Wharf main API.
 *
 * OpenAPI spec version: local docker-compose
 * Contact: wharf@iver.se
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { AzureapiPullRequestEvent } from '../model/azureapiPullRequestEvent';
import { MainImportBody } from '../model/mainImportBody';
import { ProblemResponse } from '../model/problemResponse';
import { WharfapiProjectRunResponse } from '../model/wharfapiProjectRunResponse';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class DefaultService {

    protected basePath = 'https://localhost/import';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Import projects from Azure DevOps or refresh existing one
     * 
     * @param _import import object
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public azuredevopsPost(_import?: MainImportBody, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public azuredevopsPost(_import?: MainImportBody, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public azuredevopsPost(_import?: MainImportBody, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public azuredevopsPost(_import?: MainImportBody, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/azuredevops`,
            _import,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Triggers prcreated action on wharf-client
     * 
     * @param projectid wharf project ID
     * @param environment wharf build environment
     * @param azureDevOpsPR AzureDevOps PR
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public azuredevopsTriggersProjectidPrCreatedPost(projectid: number, environment: string, azureDevOpsPR?: AzureapiPullRequestEvent, observe?: 'body', reportProgress?: boolean): Observable<WharfapiProjectRunResponse>;
    public azuredevopsTriggersProjectidPrCreatedPost(projectid: number, environment: string, azureDevOpsPR?: AzureapiPullRequestEvent, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<WharfapiProjectRunResponse>>;
    public azuredevopsTriggersProjectidPrCreatedPost(projectid: number, environment: string, azureDevOpsPR?: AzureapiPullRequestEvent, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<WharfapiProjectRunResponse>>;
    public azuredevopsTriggersProjectidPrCreatedPost(projectid: number, environment: string, azureDevOpsPR?: AzureapiPullRequestEvent, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (projectid === null || projectid === undefined) {
            throw new Error('Required parameter projectid was null or undefined when calling azuredevopsTriggersProjectidPrCreatedPost.');
        }

        if (environment === null || environment === undefined) {
            throw new Error('Required parameter environment was null or undefined when calling azuredevopsTriggersProjectidPrCreatedPost.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (environment !== undefined && environment !== null) {
            queryParameters = queryParameters.set('environment', <any>environment);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<WharfapiProjectRunResponse>(`${this.basePath}/azuredevops/triggers/${encodeURIComponent(String(projectid))}/pr/created`,
            azureDevOpsPR,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
