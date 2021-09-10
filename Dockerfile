FROM node:14.17.1-alpine3.11 AS build

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
RUN apk add --no-cache \
    python=~2.7.18 \
    make=~4.2.1

# node_modules to path
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV HOME /tmp

# add package.json just to cache packages
# also disable Angular Analytics warning as we don't have angular.json yet
# https://github.com/angular/angular-cli/blob/master/docs/design/analytics.md#ci
COPY package.json package-lock.json /usr/src/app/
RUN NG_CLI_ANALYTICS=ci npm ci

# add app
COPY . .
ARG BUILD_VERSION="local docker"
ARG BUILD_GIT_COMMIT="HEAD"
ARG BUILD_REF="0"
ARG BUILD_DATE=""
RUN deploy/update-typescript-environments.sh src/environments/environment.prod.ts \
    && npm run build-clients \
    && npm run build-prod

FROM nginx:1.21.1-alpine
COPY --from=build /usr/src/app/dist/wharf /usr/share/nginx/html
COPY ./deploy/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

ENTRYPOINT []
CMD ["nginx", "-g", "daemon off;"]

ARG BUILD_VERSION
ARG BUILD_GIT_COMMIT
ARG BUILD_REF
ARG BUILD_DATE
# The added labels are based on this: https://github.com/projectatomic/ContainerApplicationGenericLabels
LABEL name="iver-wharf/wharf-web" \
    url="https://github.com/iver-wharf/wharf-web" \
    release=${BUILD_REF} \
    build-date=${BUILD_DATE} \
    vendor="Iver" \
    version=${BUILD_VERSION} \
    vcs-type="git" \
    vcs-url="https://github.com/iver-wharf/wharf-web" \
    vcs-ref=${BUILD_GIT_COMMIT} \
    changelog-url="https://github.com/iver-wharf/wharf-web/blob/${BUILD_VERSION}/CHANGELOG.md" \
    authoritative-source-url="quay.io"
