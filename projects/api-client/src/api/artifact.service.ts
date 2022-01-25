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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { ProblemResponse } from '../model/problemResponse';
import { ResponseArtifact } from '../model/responseArtifact';
import { ResponsePaginatedArtifacts } from '../model/responsePaginatedArtifacts';
import { ResponseTestsResults } from '../model/responseTestsResults';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class ArtifactService {

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
     * Post build artifact
     * Added in v0.4.9.
     * @param buildId Build ID
     * @param files Build artifact file
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createBuildArtifact(buildId: number, files: Blob, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createBuildArtifact(buildId: number, files: Blob, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createBuildArtifact(buildId: number, files: Blob, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createBuildArtifact(buildId: number, files: Blob, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (buildId === null || buildId === undefined) {
            throw new Error('Required parameter buildId was null or undefined when calling createBuildArtifact.');
        }

        if (files === null || files === undefined) {
            throw new Error('Required parameter files was null or undefined when calling createBuildArtifact.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
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

        return this.httpClient.post<any>(`${this.basePath}/build/${encodeURIComponent(String(buildId))}/artifact`,
            convertFormParamsToString ? formParams.toString() : formParams,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get build artifact
     * Added in v0.7.1.
     * @param buildId Build ID
     * @param artifactId Artifact ID
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getBuildArtifact(buildId: number, artifactId: number, observe?: 'body', reportProgress?: boolean): Observable<Blob>;
    public getBuildArtifact(buildId: number, artifactId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Blob>>;
    public getBuildArtifact(buildId: number, artifactId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Blob>>;
    public getBuildArtifact(buildId: number, artifactId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (buildId === null || buildId === undefined) {
            throw new Error('Required parameter buildId was null or undefined when calling getBuildArtifact.');
        }

        if (artifactId === null || artifactId === undefined) {
            throw new Error('Required parameter artifactId was null or undefined when calling getBuildArtifact.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get(`${this.basePath}/build/${encodeURIComponent(String(buildId))}/artifact/${encodeURIComponent(String(artifactId))}`,
            {
                responseType: "blob",
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get list of build artifacts
     * List all build artifacts, or a window of build artifacts using the &#x60;limit&#x60; and &#x60;offset&#x60; query parameters. Allows optional filtering parameters. Verbatim filters will match on the entire string used to find exact matches, while the matching filters are meant for searches by humans where it tries to find soft matches and is therefore inaccurate by nature. Added in v5.0.0.
     * @param buildId Build ID
     * @param limit Number of results to return. No limiting is applied if empty (&#x60;?limit&#x3D;&#x60;) or non-positive (&#x60;?limit&#x3D;0&#x60;). Required if &#x60;offset&#x60; is used.
     * @param offset Skipped results, where 0 means from the start.
     * @param orderby Sorting orders. Takes the property name followed by either &#39;asc&#39; or &#39;desc&#39;. Can be specified multiple times for more granular sorting. Defaults to &#x60;?orderby&#x3D;artifactId desc&#x60;
     * @param name Filter by verbatim artifact name.
     * @param fileName Filter by verbatim artifact file name.
     * @param nameMatch Filter by matching artifact name. Cannot be used with &#x60;name&#x60;.
     * @param fileNameMatch Filter by matching artifact file name. Cannot be used with &#x60;fileName&#x60;.
     * @param match Filter by matching on any supported fields.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getBuildArtifactList(buildId: number, limit?: number, offset?: number, orderby?: Array<string>, name?: string, fileName?: string, nameMatch?: string, fileNameMatch?: string, match?: string, observe?: 'body', reportProgress?: boolean): Observable<ResponsePaginatedArtifacts>;
    public getBuildArtifactList(buildId: number, limit?: number, offset?: number, orderby?: Array<string>, name?: string, fileName?: string, nameMatch?: string, fileNameMatch?: string, match?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponsePaginatedArtifacts>>;
    public getBuildArtifactList(buildId: number, limit?: number, offset?: number, orderby?: Array<string>, name?: string, fileName?: string, nameMatch?: string, fileNameMatch?: string, match?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponsePaginatedArtifacts>>;
    public getBuildArtifactList(buildId: number, limit?: number, offset?: number, orderby?: Array<string>, name?: string, fileName?: string, nameMatch?: string, fileNameMatch?: string, match?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (buildId === null || buildId === undefined) {
            throw new Error('Required parameter buildId was null or undefined when calling getBuildArtifactList.');
        }









        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', <any>limit);
        }
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', <any>offset);
        }
        if (orderby) {
            orderby.forEach((element) => {
                queryParameters = queryParameters.append('orderby', <any>element);
            })
        }
        if (name !== undefined && name !== null) {
            queryParameters = queryParameters.set('name', <any>name);
        }
        if (fileName !== undefined && fileName !== null) {
            queryParameters = queryParameters.set('fileName', <any>fileName);
        }
        if (nameMatch !== undefined && nameMatch !== null) {
            queryParameters = queryParameters.set('nameMatch', <any>nameMatch);
        }
        if (fileNameMatch !== undefined && fileNameMatch !== null) {
            queryParameters = queryParameters.set('fileNameMatch', <any>fileNameMatch);
        }
        if (match !== undefined && match !== null) {
            queryParameters = queryParameters.set('match', <any>match);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<ResponsePaginatedArtifacts>(`${this.basePath}/build/${encodeURIComponent(String(buildId))}/artifact`,
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
     * Get build tests results from .trx files.
     * Deprecated, /build/{buildid}/test-result/list-summary should be used instead. Added in v0.7.0.
     * @param buildId Build ID
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getBuildTestResultList(buildId: number, observe?: 'body', reportProgress?: boolean): Observable<ResponseTestsResults>;
    public getBuildTestResultList(buildId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseTestsResults>>;
    public getBuildTestResultList(buildId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseTestsResults>>;
    public getBuildTestResultList(buildId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (buildId === null || buildId === undefined) {
            throw new Error('Required parameter buildId was null or undefined when calling getBuildTestResultList.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<ResponseTestsResults>(`${this.basePath}/build/${encodeURIComponent(String(buildId))}/tests-results`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get list of build artifacts
     * Deprecated since v5.0.0. Planned for removal in v6.0.0. Use &#x60;GET /build/{buildId}/artifact&#x60; instead. Added in v0.4.9.
     * @param buildId Build ID
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public oldGetBuildArtifactList(buildId: number, observe?: 'body', reportProgress?: boolean): Observable<Array<ResponseArtifact>>;
    public oldGetBuildArtifactList(buildId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ResponseArtifact>>>;
    public oldGetBuildArtifactList(buildId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ResponseArtifact>>>;
    public oldGetBuildArtifactList(buildId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (buildId === null || buildId === undefined) {
            throw new Error('Required parameter buildId was null or undefined when calling oldGetBuildArtifactList.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<ResponseArtifact>>(`${this.basePath}/build/${encodeURIComponent(String(buildId))}/artifacts`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
