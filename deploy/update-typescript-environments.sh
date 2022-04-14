#!/usr/bin/env sh

file="${1:?'Environments TS file must be provided'}"

: ${BUILD_VERSION:?'Version must be supplied'}
: ${BUILD_GIT_COMMIT:?'CI Git commit must be supplied'}
: ${BUILD_REF:?'CI build reference ID must be supplied'}
: ${BUILD_DATE:="$(date '+%FT%T%z')"}

if [ ! -f "$file" ]; then
    echo "$0: File not found: $file" >&2
    exit 1
fi

# Regex replace on the properties
# s%{FIND THIS}%{REPLACE WITH THIS}%{FLAGS}
# These regex patterns are written so it should be able to replace even if
# the values are set to something (sane)
sed -i "
    s%:.*//ci:version%: '${BUILD_VERSION}',%g
    s%:.*//ci:gitCommit%: '${BUILD_GIT_COMMIT}',%g
    s%:.*//ci:buildDate%: new Date('${BUILD_DATE}'),%g
    s%:.*//ci:buildRef%: ${BUILD_REF},%g
" "$file"

echo "$0: Updated values in: $file"
grep 'version:\|ciGitCommit:\|ciBuildDate:\|ciBuildRef:' "$file"
