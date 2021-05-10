#!/bin/sh

file="${1:?'Environments TS file must be provided'}"

: ${WHARF_WEB_VERSION:?'Version must be supplied'}
: ${WHARF_WEB_CI_GIT_COMMIT:?'CI Git commit must be supplied'}
: ${WHARF_WEB_CI_BUILD_REF:?'CI build reference ID must be supplied'}
: ${WHARF_WEB_CI_BUILD_DATE:="$(date '+%FT%T%z')"}

if [ ! -f "$file" ]; then
    echo "$0: File not found: $file" >&2
    exit 1
fi

# Regex replace on the properties
# s/{FIND THIS}/{REPLACE WITH THIS}/{FLAGS}
# These regex patterns are written so it should be able to replace even if
# the values are set to something (sane)
sed -i "
    s/version: '[^']*'/version: '${WHARF_WEB_VERSION}'/g
    s/ciGitCommit: '[^']*'/ciGitCommit: '${WHARF_WEB_CI_GIT_COMMIT}'/g
    s/ciBuildDate: new Date('[^']*')/ciBuildDate: new Date('${WHARF_WEB_CI_BUILD_DATE}')/g
    s/ciBuildRef: [0-9-]*/ciBuildRef: ${WHARF_WEB_CI_BUILD_REF}/g
" "$file"

echo "$0: Updated values in: $file"
grep 'version:\|ciGitCommit:\|ciBuildDate:\|ciBuildRef:' "$file"
