/**
 * Wharf main API
 * Wharf backend API that manages data storage for projects, builds, providers, etc.
 *
 * OpenAPI spec version: local docker-compose
 * Contact: wharf@iver.se
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface ProblemResponse { 
    /**
     * Detail is a human-readable explanation specific to this occurrence of the problem.  Recommended to have proper punctuation, and be capitalized, like a sentence. Compared to Title this field may stretch on and be longer.
     */
    detail?: string;
    /**
     * Error is an extended field for the regular Problem model defined in RFC-7807. It contains the string message of the error (if any).
     */
    errors?: Array<string>;
    /**
     * Instance is a URI reference that identifies the specific occurrence of the problem. It may or may not yield further information if dereferenced.
     */
    instance?: string;
    /**
     * Status is the HTTP status code generated by the origin server for this occurrence of the problem.
     */
    status?: number;
    /**
     * Title is a short, human-readable summary of the problem type. It SHOULD NOT change from occurrence to ocurrence of the problem, except for purposes of localization.  Recommended to be kept brief, have proper punctuation, and be capitalized, like a short sentence.
     */
    title?: string;
    /**
     * Type is a URI reference that identifies the problem type. The IETF RFC-7807 specification encourages that, when dereferenced, it provide human-readable documentation for the problem type (e.g., using HTML). When this member is not present, its value is assumed to be \"about:blank\".
     */
    type?: string;
}
