[description]: <> (The git basic commands and how they work are briefly explained, not really deepened)
[preservedKeywords]: <> (git, basics, push, pull, merge, commit, init, repository, logging)

# Git - Basics

## What is Git?

Git is a free and open-source, distributed version control system designed to handle anything from small to very large projects quickly and efficiently.

## How Git works (Git workflow)

A repository consists of three "trees" managed by Git.

The first "tree" is the working directory, which contains the actual files. The second "tree" is the index, which acts as a staging area, and finally the HEAD, which points to the last commit you made.

## Basic usage

### Initialize repository

First of all crate a new directory for your Project. Open this directory on your terminal. To initialize a git repository, run

```sh
git init
```

### Checking out a repository

To create a working copy of a repository, run

```sh
git clone [GitHub-URL, Path to repository]
```

### See changes on your working directory

To see what changes you have made, run

```sh
git status
```

### Add changes to the Index "tree"

To propose changes (add to index), run

```sh
# Specific file(s)
git add <filename>
# All changes
git add *
```

This is the first step in the 'Git workflow'.

### Commit changes

To actually commit changes, run

```sh
git commit -m "commit message"
```

Thus, the changes have been committed to 'HEAD', but they have not yet been added to the repository, therefore you need to push your commits.

### Push your commits

Once you have committed your changes, you can (better should) push them into the repository.

```sh
# Change main to any branch name your have to commit changes int that branch
git push origin main
```

### Connect repository to remote server

When you want to push your commits you need a connection to a remote server (like GitHub, GitLab, etc.).

```sh
git remote add origin <server>
```

### Replace locale changes

Sometimes you want do replace your locale changes with the styrt state of an file

```sh
git checkout -- <filename>
```

## Branches

Please have a look into [Branching](?path=src/docs/version-control/branching.md) for deeper explanation.

### Merge one branch into another

To take all commits from one branch into another one, user the merge command.

```sh
# Merge <source branch> into current branch
git merge <source branch>
```

### Pull changes from branch

To take all commits from one branch into another one, user the merge command.

```sh
# Fetching changes without pulling them.
git fetch --all
# Fetching and pulling changes.
git pull
```

## Logging

Display the git logs into terminal.

### Simplest log

The simples type of git logs.

```sh
git log
```

### Pretty logs

Logs in pretty format.

```sh
git log --pretty=oneline
```

### Display git graph

Displaying git graph into terminal.

```sh
git log --graph --oneline --decorate --all
```

## Used resources

- [Git website](https://git-scm.com/) (November 27th, 2022)
- [git - the simple guide](https://rogerdudler.github.io/git-guide/) (November 27th, 2022)

## Other resources

### GUI's

- [GitKraken](https://www.gitkraken.com/) (November 28th, 2022)
- [Git Tower](https://www.git-tower.com/) (November 28th, 2022)
- [Sourcetree](https://www.sourcetreeapp.com/) (November 28th, 2022)
- [GitHub Desktop](https://desktop.github.com/) (November 28th, 2022)
- [Gitbox](https://apps.apple.com/gb/app/gitbox/id403388357?mt=12) (November 28th, 2022)

### Becoming a git master

- [Git documentation](https://book.git-scm.com/doc) (November 28th, 2022)
- [Think like a git](https://think-like-a-git.net/) (November 28th, 2022)
- [GitHub documentation](https://support.github.com/) (November 28th, 2022)
