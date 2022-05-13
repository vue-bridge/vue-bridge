# Contributing

Thanks for being interested in contributing to this project!

## Development 

### Setup

Clone this repo to your local machine and install the dependencies. We use `pnpm`, and you should too, as its uniquely strict dependency isolation is a requirement for the packages managed in this repo.

```bash
pnpm install
```

Then run the tests to see if everything passes on your machine:

```bash
pnpm test
```

## Project Structure

### Monorepo

We use pnpm workspaces to maintain multiple packages of the `@vue-bridge` organization as well as our documentation.

```
/docs                   - Documentation/Website, using Vitepress
/packages
  /eslint-config        - eslint rules to support users
  /runtime              - The runtime library
  /switch               - WIP, can be ignored for now
  /vite-plugin          - the build-time plugin
/examples
  /app-vue2             - Vue 2 App consuming example-library-vue2
  /app-vue3             - Vue 3 App consuming example-library
  /example-library      - Vue 3 App consuming example-library
  /example-library-vue2 - Vue 3 App consuming example-library
```


## Contributing

### Existing functionality

Feel free to enhance the existing functionality. Please try not to introduce breaking changes.

### New Features

There are some notes for adding new features

- Before you start working, it's better to open an issue to discuss first. If you only have a rough idea or question, maybe start a Github discussion.
- 
- Don'T forget to add documentation for your feature, see the next section for more information.

> Please note you don't need to update packages' `index.ts`. They are auto-generated.

### Documentation changes/additions

We particularly welcome contributions to our documentation, as one of the core aspects of this project is in teaching Vue developers how to build better cross-compatible Libraries. Please refer to the separate contribution guidelines found [here](./docs/CONTRIBUTING.MD) in the /docs package.

### Pull Request requirements

## Code Style

Don't worry about the code style as long as you install the dev dependencies. Git hooks will format and fix them for you on committing.

## Thanks

Thank you again for being interested in this project! You are awesome!