/**
 * Wharf main API
 * Wharf backend API that manages data storage for projects, builds, providers, etc.
 *
 * OpenAPI spec version: v5.1.1
 * Contact: wharf@iver.se
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface RequestProviderUpdate { 
    name: RequestProviderUpdate.NameEnum;
    tokenId?: number;
    url: string;
}
export namespace RequestProviderUpdate {
    export type NameEnum = 'azuredevops' | 'gitlab' | 'github';
    export const NameEnum = {
        Azuredevops: 'azuredevops' as NameEnum,
        Gitlab: 'gitlab' as NameEnum,
        Github: 'github' as NameEnum
    };
}
