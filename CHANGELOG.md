# Wharf Angular (web) frontend changelog

This project tries to follow [SemVer 2.0.0](https://semver.org/).

<!--
	When composing new changes to this list, try to follow convention.

	The WIP release shall be updated just before adding the Git tag.
	From (WIP) to (YYYY-MM-DD), ex: (2021-02-09) for 9th of February, 2021

	A good source on conventions can be found here:
	https://changelog.md/
-->

## v1.4.1 (WIP)

- Removed per-tab titles on project details page. Title is now either
  `Loading... - Wharf` or `{project name} - Wharf`, no matter which tab
  you're on. (#69)

- Removed per-tab titles on build details page. Title is now
  `Build {build ID} - Wharf`, no matter which tab you're on. (#69)

- Added Makefile to simplify building and developing the project locally. (#67)

- Fixed potential bugs caused by wrong use of `complete` callback in RxJS
  `subscribe` calls. (#77)

- Changed RxJS `subscribe` calls to use new signature in preparation for
  RxJS v8. (#77)

- Fixed issue where all non-root URL paths returned 404 from Nginx in
  Dockerfile even through they were valid paths, such as `/projects/1`. (#80)

- Changed side nav to have `position: fixed`, meaning it will no longer scroll
  with the rest of the page. (#82)

## v1.4.0 (2021-09-10)

- Added toast message support for IETF RFC-7807 formatted error responses.
  These toasts provide better help for resolving issues, and include a link to
  the error in question's documentation page. (#54)

- Added functionality for favoriting/unfavoriting a project in the project
  details view. (#58)

- Fixed page not scrolling down when new build logs arrive in bulk and the page
  is scrolled to the bottom. (#60)

- Changed tab title to be descriptive, changing based on what view you're in.
  Previously it was just `wharf` no matter the view. (#59)

- Changed version of Docker base images, relying on "latest" minor and patch
  version:

  - `nginx` from 1.21.0 to 1. (#66)
  - `node` from 14.17.1 to 14. (#66)

- Removed build dependencies `python` and `make` inside Dockerfile as they do
  not seem relevant any more. (#66)

- Security fix by changing version of `libgcrypt` from v1.9.3 to v1.9.4 in
  `nginx` Docker base image to resolve [CVE-2021-33560](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-33560),
  as that package has not yet been updated in the remote `nginx` Docker image.
  (#66)

## v1.3.3 (2021-07-13)

- Security fix by changing version of nginx base image in Dockerfile from
  1.21.0-alpine to 1.21.1-alpine. Update in v1.3.2 was meant to resolve this
  but didn't, and have now been confirmed to be fixed by using the
  1.21.1-alpine image tag:
  <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-3517> (#49)

## v1.3.2 (2021-07-12)

- Changed version of nginx base image in Dockerfile: (#43)

  - `nginx` from 1.19.10 to 1.21.0.
  - `node` from 14.17.0 to 14.17.1.

- Changed version of numerous packages: (#45)

  - Dependencies:

    - `@angular/...` from v12.0.2 to v12.1.1
    - `fortawesome/fontawesome-free` from v5.13.0 to v5.15.3
    - `prismjs` from v1.23.0 to v1.24.1
    - `rxjs` from v6.5.4 to v7.2.0
    - `tslib` from v2.0.0 to 2.3.0

  - Development dependencies:

    - `@angular/...` from v12.0.2 to v12.1.1
    - `@angular-devkit/...` from v12.0.2 to v12.1.1
    - `@angular-eslint/...` from v12.1.1 to v12.2.0
    - `eslint` from v7.27.0 to v7.30.0
    - `eslint-plugin-jsdoc` from v35.1.2 to v35.4.2
    - `jasmine-core` from v3.6.0 to v3.8.0
    - `jasmine-spec-reporter` from v5.0.0 to v7.0.0
    - `karma` from v6.3.3 to v6.3.4
    - `karma-jasmine-html-reporter` from v1.5.0 to v1.6.0
    - `ng-packagr` from v12.0.2 to v12.1.1
    - `ts-node` from 8.3.0 to 10.0.0
    - `typescript` from v4.2.4 to v4.3.5

## v1.3.1 (2021-07-02)

- Added missing file
  `src/app/shared/validator-functions/invalid-url-validator.directive.ts`
  this should have been included in PR #6. (#39)

- Added a URL validator to the add project/provider forms. (#6)

- Added newly generated code for each Swagger-based API clients inside
  `projects` directory inside repository: (#34)

  - `api-client`: v4.1.0
  - `import-github-client`: v2.0.0-rc
  - `import-gitlab-client`: v1.2.0-rc
  - `import-azuredevops-client`: v1.2.0-rc

  Cleaned up old files, where some collided on case-insensitive file systems,
  such as `mainAzureDevOpsPrResource.ts` vs `mainAzureDevOpsPRResource.ts`.

- Changed version of PrimeNG from v12.0.0-rc to v12.0.0. (#42)

- Fixed provider APIs getting main API's config, leading to all provider API
  requests pointing to wrong base URL. (#35)

## v1.3.0 (2021-06-10)

- Added logic to the empty GitHub post service. This will now post form
  contents to the github-provider. (#8)

- Added refresh logic for the GitHub configurations. (#8)

- Added stylelint as a dev dependency and handled all linting issues in all
  `.scss` files. (#26)

- Added newly generated code for each Swagger-based API clients inside
  `projects` directory inside repository: (#25)

  - `api-client`: v4.0.1
  - `import-github-client`: v1.2.0
  - `import-gitlab-client`: v1.2.0
  - `import-azuredevops-client`: v1.2.0

- Added versions of remote services to the version panel in the sidebar. (#24)

- Changed version of Angular from v9 to v12. Nothing major for end users.
  (#27, #32)

- Changed version of PrimeNG from v11 to v12-rc and PrimeIcons from v2 to v4.
  The interface looks the same, but the new icons might take time to getting
  used to. (#28)

- Changed styling of build logs to have different colors on timestamps and to
  use scrolling of the body instead of scrolling a smaller container. (#29)

## v1.2.0 (2021-05-28)

- Adds book icon with documentation link. (#4)

- Added Markdown linting via `remark-lint`. (!94)

- Added Wharf web version to the sidebar menu, together with other build info
  such as CI build ID and commit SHA. (!97)

- Changed internal type of the build models date fields from string to Date.
  Less error-prone this way. (!95)

- Changed from TSLint to ESLint. (!93)

- Fixed version panel background color to be dark instead of light. (#20)

## v1.1.0 (2021-04-21)

- Added overflow cutoff with ellipsis on project and build lists. (!91)

- Added automatic routing to new build you've just started. (!91)

- Changed to display provider hostname instead of an icon. Our usage of the
  company icons were not allowed because of their licensing terms. (!91)

- Changed full row to be clickable instead of only the project name or build
  status cells. (!91)

- Changed column widths in artifacts tab to give more room for the filename.
  (!91)

- Changed project name cells to have larger font size than the rest in the
  project list table. Makes it stand out more. (!91)

- Changed name of `wh-tabView-x` and `wh-tabPanel-x` to only be lowercase. (!91)

- Changed name of `app-root` and `app-nav` components to be prefixed with `wh-`.
  (!91)

- Changed version of nginx base image in Dockerfile from 1.17.9 to 1.19.10 and
  node build image from 15.5.1 to 15.14.0. (!88)

- Fixed project ID being wrapped to two lines on lengthier IDs. (!91)

- Fixed "Noto Sans" font not being used. Now it's properly applied everywhere.
  (!91)

## v1.0.0 (2021-04-08)

- Added progress spinning animation on the status for builds that are still
  scheduling or running. (!80)

- Added duration to build list with `setInterval` to have animated duration
  for unfinished builds. (!82)

- Added configuration tab on the project details page, showing the build
  definition (`.wharf-ci.yml` file content) with syntax highlighting
  courtesy of [Prism.js](https://prismjs.com/). (!79)

- Added code block and inline-code styling, mimicking the documentation code
  block style found at <https://iver-wharf.github.io/>. (!79)

- Added `wh-project-refresh-button` and `wh-project-refresh-icon` components
  to be reused in both the project list and inside the project details page.
  (!79)

- Added `wh-tabView-x` and `wh-tabPanel-x` as extended variants of PrimeNG's
  `p-tabView` and `p-tabPanel` to allow side headers to the right of the list
  of tabs. (!86)

- Added new styling for the actions modal ("Run all" dialog) together with some
  helpful tooltips on fields created by input variables. (!87)

- Added new styling of the entire frontend to give it a fresh and clean look.
  There are still some sections, menu items, and tabs grayed out as they have
  not yet been implemented as they are lacking backend support.
  List of restyled components:

  - Project list, the landing page. (!71, !81)
  - Project list item, each table row on the landing page. (!69)
  - Project details. (!69, !81)
  - Side nav component. (!68)

- Added new set of SASS variables in `variables.scss` to control the colors
  throughout the entire newly styled frontend. (!68, !69, !81)

- Added new components under project details to split up the logic into
  separate components. New components are `project-details-build` and
  `project-details-schedule`. (!71)

- Changed `project-list` component to use PrimeNG's `p-table` instead of
  `p-dataview`. (!69)

- Changed `project-list` component to hold the `wh-provider` component instead
  of the `nav` component. (!68)

- Changed PrimeNG from v9.0.0 to 11.3.1, and a lot of styling changes
  thereof as they renamed most CSS classes from `ui-` to `p-` prefix. (!81)

- Changed to require NPM 7.0.0 or later due to `package-lock.json` format
  changes since NPM 7.0.0, which comes with Node 15.0.0 or later. (!77)

- Fixed favorites tab flickering on load by abusing the cache of favorited
  projects. (!88)

- Removed misconfiguration warnings when starting a new build as their logic was
  invalid. We're planning on doing the validation in the backend instead, so
  this feature will return later once that's in place. (!87)

- Removed `extractCss` setting from `angular.json` as that gave some issues with
  the transpiled CSS when compiling with the `--prod` flag. (!76)

## v0.12.0 (2021-03-12)

- Added CHANGELOG.md to repository. (!66)

- Added animation to the "refresh project" button as visual feedback. Had to
  break out `project-list.component` into two additional components,
  `project-list-item.component` and `wharf-spinner-animation.component`, to keep
  the code clean. (!65)

- Added `/src/app/animations/` folder containing
  `wharf-spinner-animation.component` with tests. (!65)

- Fixed local Docker build via Dockerfile not succeeding when running via
  [Podman](https://podman.io) on a pristine repository. (!62, !64)

## v0.11.0 (2021-01-19)

- Fixed logs incorrectly displaying as `- [ ]` because the events from the
  Server-Side Events (SSE) stream was not getting parsed correctly. (!60, !61)

## v0.10.0 (2021-01-14)

- Added ability to start a build without a given environment. This new option
  is available on projects that has any environments configured in their
  `.wharf-ci.yml` file, and is shown as the dropdown option
  `*Only stages without environments filter*`. (!59)

- Added documentation on regenerating services and models on GNU/Linux. (!58)

- Added `pwsh` shebang to `generate-rest-client.ps1`. (!58)

- Added `.dockerignore` for increased stability in local builds. (!57)

## v0.9.0 (2020-12-04)

- Added pagination of a projects build history, using the new pagination
  endpoint from the Wharf API v1.0.1. (!48)

- Fixed group data handling as group metadata was merged into the project
  model in Wharf API v1.0.0. (!53)

- Fixed some NPM audit warnings through a basic `npm audit fix`. (!50)

- Fixed `README.md` to not assume developer has the `ng` CLI installed, and
  instead rely on `npm run` and `npm start`. (!49)

- Fixed misleading and unclear documentation found in the `README.md` on how to
  regenerate the models and services via PowerShell. (!51)

## v0.8.0 (2020-10-23)

- Changed all references to "TFS" to "AzureDevops" (including HTTP paths), as a
  reflection of the changes introduced in the Wharf API v0.8.0. (!46, !47)

## v0.7.13 (2020-10-12)

- Fixed environments selection not showing in rare cases when starting a new
  build. (!43)

- Changed internal naming of services from `tfs` to `azuredevops`. (!45)

- Deprecated favorites data scheme migration that was introduced in v0.7.11.
  (!44)

## v0.7.12 (2020-08-14)

- Added toast/popup messages on successful and unsuccessful project refresh.
  (!38)

- Added TypeScript linting to the development environment of the web-ng source
  code. (!40)

- Changed style of some pages, shrinking some unnecessary margins and unwanted
  whitespace. (!41)

- Changed color theme of Wharf to mimic the Spark dark theme. (!42)

## v0.7.11 (2020-06-18)

- Added automatic selection of default branch when you start a new build. (!36)

- Added project refresh button from the project list page. (!35)

- Fixed favorited projects stored as entire project objects, and now instead
  only stores the project ID in local storage, with added migrations to
  automatically convert to the new compacted format. (!37)

- Fixed log lines sometimes showing `[Object object]`. (!34)

## v0.7.10 (2020-05-12)

- Changed logs to fetch from configured source instead of hardcoded source.
  (!33)

## v0.7.9 (2020-05-11)

- Added automatic focus on favorites tab if user has any favorited projects.
  (!29)

## v0.7.8 (2020-05-06)

- Fixed outdated autogenerated libraries by regenerating them. (!28)

## v0.7.7 (2020-04-30)

- Fixed incorrect path in Dockerfile. (!27)

## v0.7.6 (2020-04-29)

- Fixed invalid syntax in Nginx config. (!26)

## v0.7.5 (2020-04-29)

- Added automatic refresh of the project list after importing new projects.
  (!16)

- Fixed visual glitch caused by long project descriptions. (!22)

- Fixed bug in branch and environment dropdowns getting confused after
  selecting. (!23)

- Changed themed color from slight violet to clear blue. (!24)

- Changed Docker image with Nginx to expose on port 8080 instead of port 80.
  (!25)

## v0.7.4 (2020-04-10)

- Fixed Wharf build where image was named `web` and thereby colliding with the
  old web image. Renamed to `web-ng`. (!21)

## v0.7.3 (2020-04-10)

- Added initial version of the Angular port of old Wharf web written in React.
  (1b91a5d, !1, !2, !3, !4, !5, !6, !7, !8, !5, !9, !10, !11, !12, !13, !14,
  !15, !17, !18, !20)
