
#!/bin/bash

# check if doc files changes for netlify
# needed because we cannot use && in netlify.toml

! git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF -- ./docs/ 
# not sure what this last thing did.
# && ! git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF ./pnpm-lock.yaml  | grep --quiet vite