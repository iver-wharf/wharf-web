# Fake auth .well-known/openid-configuration

This silences the [angular-auth-oidc-client](https://www.npmjs.com/package/angular-auth-oidc-client)
package that both needs to be loaded in the root app module, and **requires** a
Security Token Service (STS) authority URL that it fetches and parses data from.

The values doesn't matter, because that's only used later. Only the initial
JSON parsing is required to succeed.
