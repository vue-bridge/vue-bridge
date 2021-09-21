# `app-vue2`

This is a demo app. It consumes `example-app`

## Running this demo app

First build runtime, if you made any changes: 

```bash
cd packages/runtime && yarn build
```
Then run the dev command:

```bash
yarn dev
```

## Tipps

* This demo app can consume the source of `example-vue` directly, or the built code, depending on wether you comment out/in the alias in `vite.config.js`