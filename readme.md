# TypeScript Express Skeleton (base / project starter)

This is a repository intended to serve as a starting point if you want to bootstrap a express API project in TypeScript with examples.

## Prepare application

Create a .env file

```
# REQUIRED
PORT=3000
# OPTIONALS
DB_HOST=localhost
DB_USER=root
DB_PASS=123456
DB_DATABASE=kuria
SALT=kuriafilosofea
```

## Running the app

```
# install dependencies
npm install

# run in dev mode
npm run dev

# generate production build
npm run build

# run generated content in dist folder
npm run start
```

## Testing

### Jest with supertest

```
npm run test
```

## Rest Client (Visual Studio)

```
Open folder /testrestclient
```


## Features

- [TypeScript](https://www.typescriptlang.org/) (v4)
- [ts-node-dev](https://github.com/wclr/ts-node-dev)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/) with:
  - [Simple Import Sort](https://github.com/lydell/eslint-plugin-simple-import-sort/)
  - [Import plugin](https://github.com/benmosher/eslint-plugin-import/)
- [Jest](https://jestjs.io) with [DOM Testing Library](https://testing-library.com/docs/dom-testing-library/intro)
- [GitHub Action workflows](https://github.com/features/actions) set up to run tests and linting on push
