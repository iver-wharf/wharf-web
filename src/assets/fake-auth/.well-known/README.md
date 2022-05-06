# Fake auth .well-known/openid-configuration

This silences the [angular-auth-oidc-client](https://www.npmjs.com/package/angular-auth-oidc-client)
package that is both required to load in root app module, and **requires** an
Security Token Service (STS) authority URL that it fetches data from and parses.

The values doesn't matter, because that's only used later. Only the initial
JSON parsing is required to succeed.
