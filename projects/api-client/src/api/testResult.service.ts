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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { ProblemResponse } from '../model/problemResponse';
import { ResponseArtifactMetadata } from '../model/responseArtifactMetadata';
import { ResponsePaginatedTestResultDetails } from '../model/responsePaginatedTestResultDetails';
import { ResponsePaginatedTestResultSummaries } from '../model/responsePaginatedTestResultSummaries';
import { ResponseTestResultListSummary } from '../model/responseTestResultListSummary';
import { ResponseTestResultSummary } from '../model/responseTestResultSummary';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class TestResultService {

    protected basePath = 'https://localhost/api';
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
     * Post test result data
     * Added in v5.0.0.
     * @param buildId Build ID
     * @param files Test result file
     * @param pretty Pretty indented JSON output
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createBuildTestResult(buildId: number, files: Blob, pretty?: boolean, observe?: 'body', reportProgress?: boolean): Observable<Array<ResponseArtifactMetadata>>;
    public createBuildTestResult(buildId: number, files: Blob, pretty?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ResponseArtifactMetadata>>>;
    public createBuildTestResult(buildId: number, files: Blob, pretty?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ResponseArtifactMetadata>>>;
    public createBuildTestResult(buildId: number, files: Blob, pretty?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (buildId === null || buildId === undefined) {
            throw new Error('Required parameter buildId was null or undefined when calling createBuildTestResult.');
        }

        if (files === null || files === undefined) {
            throw new Error('Required parameter files was null or undefined when calling createBuildTestResult.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (pretty !== undefined && pretty !== null) {
            queryParameters = queryParameters.set('pretty', <any>pretty);
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
            'multipart/form-data'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): void | HttpParams; };
        let useForm = false;
        let convertFormParamsToString = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        }

        if (files !== undefined) {
            formParams = formParams.append('files', <any>files) || formParams;
        }

        return this.httpClient.post<Array<ResponseArtifactMetadata>>(`${this.basePath}/build/${encodeURIComponent(String(buildId))}/test-result`,
            convertFormParamsToString ? formParams.toString() : formParams,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get all test result details for specified build
     * Added in v5.0.0.
     * @param buildId Build ID
     * @param pretty Pretty indented JSON output
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getBuildAllTestResultDetailList(buildId: number, pretty?: boolean, observe?: 'body', reportProgress?: boolean): Observable<ResponsePaginatedTestResultDetails>;
    public getBuildAllTestResultDetailList(buildId: number, pretty?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponsePaginatedTestResultDetails>>;
    public getBuildAllTestResultDetailList(buildId: number, pretty?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponsePaginatedTestResultDetails>>;
    public getBuildAllTestResultDetailList(buildId: number, pretty?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (buildId === null || buildId === undefined) {
            throw new Error('Required parameter buildId was null or undefined when calling getBuildAllTestResultDetailList.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (pretty !== undefined && pretty !== null) {
            queryParameters = queryParameters.set('pretty', <any>pretty);
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
        ];

        return this.httpClient.get<ResponsePaginatedTestResultDetails>(`${this.basePath}/build/${encodeURIComponent(String(buildId))}/test-result/detail`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get test result list summary of all tests for specified build
     * Added in v5.0.0.
     * @param buildId Build ID
     * @param pretty Pretty indented JSON output
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getBuildAllTestResultListSummary(buildId: number, pretty?: boolean, observe?: 'body', reportProgress?: boolean): Observable<ResponseTestResultListSummary>;
    public getBuildAllTestResultListSummary(buildId: number, pretty?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseTestResultListSummary>>;
    public getBuildAllTestResultListSummary(buildId: number, pretty?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseTestResultListSummary>>;
    public getBuildAllTestResultListSummary(buildId: number, pretty?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (buildId === null || buildId === undefined) {
            throw new Error('Required parameter buildId was null or undefined when calling getBuildAllTestResultListSummary.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (pretty !== undefined && pretty !== null) {
            queryParameters = queryParameters.set('pretty', <any>pretty);
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
        ];

        return this.httpClient.get<ResponseTestResultListSummary>(`${this.basePath}/build/${encodeURIComponent(String(buildId))}/test-result/list-summary`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get all test result summaries for specified build
     * Added in v5.0.0.
     * @param buildId Build ID
     * @param pretty Pretty indented JSON output
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getBuildAllTestResultSummaryList(buildId: number, pretty?: boolean, observe?: 'body', reportProgress?: boolean): Observable<ResponsePaginatedTestResultSummaries>;
    public getBuildAllTestResultSummaryList(buildId: number, pretty?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponsePaginatedTestResultSummaries>>;
    public getBuildAllTestResultSummaryList(buildId: number, pretty?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponsePaginatedTestResultSummaries>>;
    public getBuildAllTestResultSummaryList(buildId: number, pretty?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (buildId === null || buildId === undefined) {
            throw new Error('Required parameter buildId was null or undefined when calling getBuildAllTestResultSummaryList.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (pretty !== undefined && pretty !== null) {
            queryParameters = queryParameters.set('pretty', <any>pretty);
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
        ];

        return this.httpClient.get<ResponsePaginatedTestResultSummaries>(`${this.basePath}/build/${encodeURIComponent(String(buildId))}/test-result/summary`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get all test result details for specified test
     * Added in v5.0.0.
     * @param buildId Build ID
     * @param artifactId Artifact ID
     * @param pretty Pretty indented JSON output
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getBuildTestResultDetailList(buildId: number, artifactId: number, pretty?: boolean, observe?: 'body', reportProgress?: boolean): Observable<ResponsePaginatedTestResultDetails>;
    public getBuildTestResultDetailList(buildId: number, artifactId: number, pretty?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponsePaginatedTestResultDetails>>;
    public getBuildTestResultDetailList(buildId: number, artifactId: number, pretty?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponsePaginatedTestResultDetails>>;
    public getBuildTestResultDetailList(buildId: number, artifactId: number, pretty?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (buildId === null || buildId === undefined) {
            throw new Error('Required parameter buildId was null or undefined when calling getBuildTestResultDetailList.');
        }

        if (artifactId === null || artifactId === undefined) {
            throw new Error('Required parameter artifactId was null or undefined when calling getBuildTestResultDetailList.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (pretty !== undefined && pretty !== null) {
            queryParameters = queryParameters.set('pretty', <any>pretty);
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
        ];

        return this.httpClient.get<ResponsePaginatedTestResultDetails>(`${this.basePath}/build/${encodeURIComponent(String(buildId))}/test-result/summary/${encodeURIComponent(String(artifactId))}/detail`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get test result summary for specified test
     * Added in v5.0.0.
     * @param buildId Build ID
     * @param artifactId Artifact ID
     * @param pretty Pretty indented JSON output
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getBuildTestResultSummary(buildId: number, artifactId: number, pretty?: boolean, observe?: 'body', reportProgress?: boolean): Observable<ResponseTestResultSummary>;
    public getBuildTestResultSummary(buildId: number, artifactId: number, pretty?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseTestResultSummary>>;
    public getBuildTestResultSummary(buildId: number, artifactId: number, pretty?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseTestResultSummary>>;
    public getBuildTestResultSummary(buildId: number, artifactId: number, pretty?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (buildId === null || buildId === undefined) {
            throw new Error('Required parameter buildId was null or undefined when calling getBuildTestResultSummary.');
        }

        if (artifactId === null || artifactId === undefined) {
            throw new Error('Required parameter artifactId was null or undefined when calling getBuildTestResultSummary.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (pretty !== undefined && pretty !== null) {
            queryParameters = queryParameters.set('pretty', <any>pretty);
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
        ];

        return this.httpClient.get<ResponseTestResultSummary>(`${this.basePath}/build/${encodeURIComponent(String(buildId))}/test-result/summary/${encodeURIComponent(String(artifactId))}`,
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
