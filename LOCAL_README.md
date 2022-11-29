# Cheat sheet | Local

## Project Setup
Setting up the project for development reasons is pretty simple. Simply [clone the repository](https://github.com/PatrickMaul/cheatsheet). And run the following command in your shell.
### Compile and Hot-Reload for Development
```sh
cd cheatsheet && npm install && npm run dev
```

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
