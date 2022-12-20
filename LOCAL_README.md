# Cheat sheet | Local

## Project Setup
Setting up the project for development reasons is pretty simple. Simply [clone the repository](https://github.com/PatrickMaul/cheatsheet). And run the following command in your shell.
### Compile and Hot-Reload for Development
```sh
cd cheatsheet && npm install && npm run dev
```
## Development instructions
1. Work **always** on a feature branch, preferably related to an issue.
   - [ISSUE_ID]-[LOWERCASED_ISSUE_NAME_SPLIT_BY_HYPHENS]  
   e.g.: `36-update-locale-readme-for-developers`.
2. Duplicate and rename `config-example.json` to `config.json`.
3. Set your config.
### Generate new index (DO NOT PUSH)
Open terminal from project directory and use "`node ./src/assets/scripts/indexing_docs_directory.js`" to generate a new index from `src/docs/`.
## Deployment
To deploy a new version, a merge request must be made from `main` to `production` (possible only from the repository owner). GitHub does the rest.

## Testing
### Run Unit Tests with [Vitest](https://vitest.dev/)
```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)
```sh
npm run lint
```
