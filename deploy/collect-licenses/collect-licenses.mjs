import { collectLicenses } from '@iver-wharf/wharf-collect-licenses';

collectLicenses({
  outputFilePath: 'src/assets/licenses.json',
  licenseOverridesPath: 'deploy/collect-licenses/licenses_override',

  excludedSPDXLicenses: [
    '0BSD', // The 0BSD license requires no attribution.
  ],

  excludedPackages: [
    '@fortawesome/fontawesome-free@5.15.3', // already contains license notice in stylesheets
  ],

  errorOnPackageNames: [
    { name: '@fortawesome/fontawesome-free', error: 'not sure version also embeds license in stylesheets' },
  ],
});
