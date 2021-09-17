
export interface License {
  /** Name of NPM/Yarn package */
  name: string;
  /** SPDX license names. Separated by `, ` if there are multiple. */
  licenses: string;
  /** Full license text, taken from the NPM package or the package's source code repository. */
  licenseText: string;
  /** URL to the source code repository. */
  repository: string;
  /** Name of package publisher. Can be a company, person name, and sometimes `undefined`. */
  publisher?: string;
}
