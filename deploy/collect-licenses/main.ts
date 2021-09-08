import checker from 'license-checker';
import { exit } from 'process';
import fs from 'fs';
import path from 'path';
import { CachedFetch } from './cached-fetch';

const licensesOverrideBasePath = path.resolve(__dirname + '/../licenses_override');
const packageToCheckPath = fs.realpathSync(__dirname + '/../../..');
const resultingFilePath = path.resolve(__dirname + '/../../../src/assets/licenses.json');

console.log('Using license overrides from:', licensesOverrideBasePath);
console.log('Checking packages in package:', packageToCheckPath);
console.log('Resulting JSON will be written to:', resultingFilePath);
console.log();

const cachedFetch = new CachedFetch();

checker.init({
  start: packageToCheckPath,
  production: true,
  customFormat: {
    name: '',
    version: '',
  },
  excludePrivatePackages: true,
  exclude: [
    '0BSD', // no attribution requested from 0BSD
  ].join(',') as any, // the @types/license-checker is wrong, it should be a string
  excludePackages: [
    '@fortawesome/fontawesome-free@5.15.3', // already contains license notice in stylesheets
  ].join(';'),
}, async (err, packages): Promise<void> => {
  if (err) {
    console.error('Failed to find licenses:', err);
    exit(1);
  }

  const errorOnPackage = new Map([
    ['@fortawesome/fontawesome-free', 'not sure version also embeds license in stylesheets'],
  ]);

  const packageErrors = Object.values(packages)
    .filter(p => errorOnPackage.has(p.name))
    .map(p => `${p.name}@${p.version}: ${errorOnPackage.get(p.name)}`);
  if (packageErrors.length > 0) {
    console.error('Errors on some packages:', packageErrors);
    exit(1);
  }

  const pkgArr = await Promise.all(Object.values(packages)
    .map(overrideLicense)
    .map(replaceReadmeLicenseWithRemoteLicense));

  const unlicensed = pkgArr.filter(p => p.licenses === 'UNLICENSED');
  if (unlicensed.length > 0) {
    console.error(
      'Cannot use unlicensed packages:',
      unlicensed.map(printablePackage));
    exit(1);
  }

  const licensesFromReadme = pkgArr.filter(p => isReadmeFile(p.licenseFile));
  if (licensesFromReadme.length > 0) {
    console.error(
      'Cannot use license texts from README files, as their content is error-prone:',
      licensesFromReadme.map(printablePackage));
    exit(1);
  }

  console.log();
  console.log('Found licenses:', pkgArr.map(printablePackage));

  const jsonContent = JSON.stringify(pkgArr.map(p => ({
    name: p.name,
    licenses: typeof p.licenses === 'string' ? p.licenses : p.licenses.join(', '),
    licenseText: p.licenseText,
  })), null, 2);

  fs.writeFileSync(resultingFilePath, jsonContent);
  console.log('Written to:', resultingFilePath);
});

const printablePackage = (p: checker.ModuleInfo): Record<string, any> => ({
  package: `${p.name}@${p.version}`,
  repo: p.repository,
  licenses: typeof p.licenses === 'string' ? p.licenses : p.licenses.join(', '),
});

const overrideLicense = (p: checker.ModuleInfo): checker.ModuleInfo => {
  let licensePath: string;
  try {
    licensePath = fs.realpathSync(`${licensesOverrideBasePath}/${p.name}@${p.version}.txt`);
    fs.accessSync(licensePath, fs.constants.R_OK);
  } catch {
    // No file found, or not readable
    return p;
  }
  const file = fs.readFileSync(licensePath);
  return {
    ...p,
    licenseFile: licensePath,
    licenseText: file.toString(),
  };
};

const readmeRegex = /^README(|\.md|\.markdown)$/i;
const isReadmeFile = (filePath: string): boolean => readmeRegex.test(path.basename(filePath));
const licensePossibleFileNames = [
  'LICENSE',
  'LICENSE.md',
  'LICENSE.txt',
];

const replaceReadmeLicenseWithRemoteLicense = async (p: checker.ModuleInfo): Promise<checker.ModuleInfo> => {
  if (!isReadmeFile(p.licenseFile)) {
    return p;
  }
  if (p.repository.startsWith('https://github.com/')) {
    try {
      const urls = licensePossibleFileNames.map(n => `${p.repository}/raw/${p.version}/${n}`);
      const res = await cachedFetch.fetchFirstFiltered(urls, r => r.ok);
      if (!res) {
        console.warn(
          `Failed to fetch remote LICENSE file for ${p.name}@${p.version} due to none of the files gave OK response:`,
          licensePossibleFileNames);
        return p;
      }
      console.log(`Found remote license for ${p.name}@${p.version}:`, res.url);
      return {
        ...p,
        licenseFile: res.url,
        licenseText: res.text,
      };
    } catch (err) {
      console.warn(`Failed to fetch remote LICENSE file for ${p.name}@${p.version} due to error:`, err);
    }
  } else {
    console.warn(`Cannot find remote license for ${p.name}@${p.version} due to unknown repository host:`, p.repository);
  }
  return p;
};
