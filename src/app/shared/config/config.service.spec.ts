import { Config } from './config';
import { lowClone, upGet } from './config.service';

it('upGet reads camelCased key', () => {
  const config = { environment: { name: 'foo' } } as Config;
  const environment = upGet(config, 'environment');
  expect(environment).toBeDefined();
  expect(upGet(environment, 'name')).toBe('foo');
});

it('upGet reads PascalCased key', () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const config = { Environment: { Name: 'foo' } } as unknown as Config;
  const environment = upGet(config, 'environment');
  expect(environment).toBeDefined();
  expect(upGet(environment, 'name')).toBe('foo');
});

it('upGet prefers camelCased key', () => {
  /* eslint-disable @typescript-eslint/naming-convention */
  const config = {
    Environment: { Name: 'bar', name: 'boo' },
    environment: { Name: 'moo', name: 'foo' },
  } as unknown as Config;
  /* eslint-enable @typescript-eslint/naming-convention */
  const environment = upGet(config, 'environment');
  expect(environment).toBeDefined();
  expect(upGet(environment, 'name')).toBe('foo');
});

const sampleJson = `
{
  "Environment": {
    "Name": "dev",
    "IsProduction": false
  },
  "BackendUrls": {
      "Api": "http://localhost:5000/api",
      "GitlabImport": "http://localhost:5000/import",
      "GithubImport": "http://localhost:5000/import",
      "AzureDevopsImport": "http://localhost:5000/import"
  }
}
`;

it('lowClone fixes names', () => {
  const parsed = JSON.parse(sampleJson);
  const config = lowClone(parsed) as Config;
  expect(config.environment).toBeDefined();
  expect(config.backendUrls).toBeDefined();
});

it('lowClone fixes names recursively', () => {
  const parsed = JSON.parse(sampleJson);
  const config = lowClone(parsed) as Config;
  expect(config.backendUrls).toBeDefined();
  expect(config.backendUrls.api).toBe('http://localhost:5000/api');
});
