[description]: <> (Just some useful scripts you can use to interact with the git CLI.)
[preservedKeywords]: <> (git, useful scripts, scripts, script collection)

# Git - Useful scripts

## Delete all local branches

This script will delete all local git branches.

**Use carful this script won't check anything!**

```sh
for branch in $(git branch | grep "[^* ]+" -Eo); do git branch -D "$branch"; done
```
