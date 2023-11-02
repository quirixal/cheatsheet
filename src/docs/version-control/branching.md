[description]: <> (Git branching basics, like how to create a new branch, switching branches, etc.)
[preservedKeywords]: <> (git, branching, branch, create, delete, checkout, rebase, reset)

# Git - Branching

## Git Basics

Please have a look into [Git Basics](?path=src/docs/version-control/basics.md) section.

## Branches

Git uses branches to isolate your working code from new feature development. Thanks to branching in git you can work an different feature isolated, each in its own branch.

The `main` branch is set to default by git when initializing a repository. Use other branches to develop new features and merge them back into `main`.

## Create and Checkout new branches

You can just create a new branch or you can create a new branch and directly check it out.

```sh
# Just create a new branch (from current branch)
git branch <branch name>

# Create new branch (from current branch) also switch to it
git checkout -b <branch name>
```

## Checkout existing branch

Switching your working branch.

```sh
# Checkout existing branch
git checkout main
```

## Delete branches

Sometimes branches are outdated or brocken and you want to delete them.

```sh
# Delete branches only local (be carful)
git branch <-d or -D> <branch name>

# Delete branches also on remote (be very carful)
git branch <-d or -D> -r <branch name>
```

## Rebase branches

Sometimes branches are outdated or brocken and you want to delete them.

```sh
# Push commits onto branch
git rebase <target branch> <source branch>
```

## Reset branches

Sometimes branches are brocken and you want to reset them to a working state.

```sh
# Push commits onto branch
git reset <branch name> <target commit hash>
```

## Resources

- [git - the simple guide](https://rogerdudler.github.io/git-guide/) (November 28th, 2022)
- [Git documentation](https://git-scm.com/docs/git-branch) (November 28th, 2022)
