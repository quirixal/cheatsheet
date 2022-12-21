# Cheat sheet | Readme
> A cheat sheet is a condensed reference guide that provides quick and easy access to key information on a specific subject or task. Cheat sheets can be particularly useful for learners or professionals who need to quickly refresh their knowledge or learn new skills, as they provide a quick and easy way to access key information in a condensed format.[^1]

## Table of contents
- [Cheat sheet | Readme](#cheat-sheet--readme)
  - [Table of contents](#table-of-contents)
  - [Development setup](#development-setup)
  - [Rules for developers](#rules-for-developers)
  - [How to's](#how-tos)
    - [Generate new index](#generate-new-index)
  - [Deployment](#deployment)
  - [Testing \& Linting](#testing--linting)
    - [Run Unit Tests with Vitest](#run-unit-tests-with-vitest)
    - [Lint with ESLint](#lint-with-eslint)
## Development setup
Steps for setting up the Project:
1. Clone [the repository](https://github.com/PatrickMaul/cheatsheet)
   - `git clone https://github.com/PatrickMaul/cheatsheet`
2. Change to project directory.
   - `cd cheatsheet`
3. Install dependencies.
   - `npm install`
4. Duplicate and rename `config-example.json` to `config.json`
5. Set your own config
   1. `development` => No impact at all
   2. `branch` => Current feature branch
6. Start development server.
   - `npm run dev`
## Rules for developers
To ensure that this repository is always **neat and tidy**, a few **simple but important rules** have been established.  
Changes **made without** following these rules **will not be merged**.
1. **Always** work on a feature branch, preferably related to an [issue on GitHub](https://github.com/PatrickMaul/cheatsheet/issues).
   1. Relating to an [issue on GitHub](https://github.com/PatrickMaul/cheatsheet/issues)
      - [ISSUE_ID]-[LOWERCASED_ISSUE_NAME_SPLIT_BY_HYPHENS]  
      e.g.: `36-update-locale-readme-for-developers`
      - Or use "Create a branch" function from GitHub
   2. Otherwise
      - Write an [issue on GitHub](https://github.com/PatrickMaul/cheatsheet/issues) and follow 1.
      - Branch patterns
        - IDEA-[LOWERCASED_SHORT_DESCRIPTION_SPLIT_BY_HYPHENS]
        - HOTFIX-[LOWERCASED_SHORT_DESCRIPTION_SPLIT_BY_HYPHENS]
        - DOC-[LOWERCASED_SHORT_DESCRIPTION_SPLIT_BY_HYPHENS]

**Please try following these rules.**
## How to's
Here you can find some how-to's you may need during develop.
### Generate new index
**The resulting file `indexed_docs_directory.json` should not be pushed.**  
Open terminal from project directory and use "`node ./src/assets/scripts/indexing_docs_directory.js`" to generate a new index from `src/docs/`.
## Deployment
**Only the repo owner and selected co-developers** are authorized to deploy new versions. A new feature can only be built into a new version via a feature branch that was previously merged into the `main`!  
New versions are built by **merging `main` into `production`**. If necessary, a last commit is pushed to `main`, which at most updates the changelog in `./src/docs/index.md`.

Steps to deploy new versions:
1. Check changelog, update if necessary.
     - Commit message => `update: changelog for version [`[SEMANTIC_VERSIONING](https://semver.org/)`]`
2. Request from `main` to `production`
     - Merge title => [SEMANTIC_VERSIONING](https://semver.org/)
3. Merge
4. Wait for GitHub actions
   - Automatically triggered when push to `production`

## Testing & Linting
### Run Unit Tests with [Vitest](https://vitest.dev/)
```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)
```sh
npm run lint
```



[^1]: [ChatGTP](https://chat.openai.com/chat), Request: "can you describe a cheat sheet for me?" (December 21th, 2022)