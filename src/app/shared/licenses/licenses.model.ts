
export interface License {
  /** Name of NPM/Yarn package */
  name: string;
  /** Version of NPM/Yarn package */
  version: string;
  /** Description of NPM/Yarn package */
  description?: string;
  /** SPDX license names. */
  licenses: string[];
  /** Full license text, taken from the NPM package or the package's source code repository. */
  licenseText: string;
  /** URL to the source code repository. */
  repository: string;
  /** Name of package publisher. Can be a company, person name, and sometimes `undefined`. */
  publisher?: string;
}
