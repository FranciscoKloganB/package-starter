<!-- todo-template- Add package name above and -->

# PACKAGE_NAME

<!-- todo-template- Add long package description here -->

## Bootstrap Checklist

<!-- TODO: Warning do not proceed without finishing this checklist  -->
If this is the first time the package is being setup by any team member
ensure that all `todo-template-` annotations spread around the code have been
resolved and deleted.

<!-- @@todo_tempalte:delete_this_section -->

- `readme.md`
  - [ ] Set project name as main heading
  - [ ] Write a somewhat long description of the goals of the package
  - [ ] If the package is simple add some basic usage on the `markdown` itself
  - [ ] Otherwise setup a custom documentation page using any tool of your choice
- `package.json`
  - [ ] set project name
  - [ ] set project repository
  - [ ] project name and repository match each other
- `miscellaneous`:
  - [ ] Add more project `devDependencies`, e.g.: `react` and `react-dom`
  - [ ] Add `peerDependencies` to ensure package consumers have required dependencies
  - [ ] Add additional `prettier` or `eslint` plugins as required.
  - [ ] Setup other testing and DX tools, e.g.: `cypress`, `react-testing-lib`, `storybook`

## Description

Lorem ipsum...

## Configuration

Code quality is set up for you with `prettier`, `eslint`, `husky` and
`lint-staged`. Depending on the package goals, you might need to add some
plugins. Adjust `package.json` accordingly.

### Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) is set up to calculate
the real cost of your library with `npm run size` and visualize the bundle
with `npm run analyze`.

### Jest

Jest tests are set up to run with `npm test` or `npm test:headless`. If you
are developing a package for `React.js` or `Next.js` further packages need to be
added.

### Path Aliases

We use [alias-hq](https://github.com/davestewart/alias-hq) to simplify path
aliasing during development; Configure paths once in `tsconfig.json` and have
remaining tools like `jest` integrate automatically with the the available
`tsconfig` by invoking a simple function provided by `alias-hq`;

### Publishing

Add all expected environment variables (see `.env.example`) to your `.zshrc` or
`.bashrc` profile. Alternatively, install `direnv`, then, add a `.env` file
in the root of the project containing those same environment variables.

Finally execute the commands below

```bash
# Only required once per clone
chmod +x publish.sh
# Run the actual publish script
./publish.sh
```

## Continuous Integration

### GitHub Actions

Three actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all
  pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull
  request using [`size-limit`](https://github.com/ai/size-limit)
- `publish` a workflow that is currently under development, which would be
  responsible for automatically publishing the repository to GitHub packages;
  Until this workflow is ready, prefer to use `./publish.sh` which integrates
  with [np](https://github.com/sindresorhus/np) for easier and safer publishing
  experiences.

## Module Formats

CJS, ESModules, and UMD module formats are supported. The appropriate paths are
configured in `package.json`. Read more at [microbundle](https://github.com/developit/microbundle)

## Named Exports

Per Palmer Group guidelines, you should prefer [named exports.](https://github.com/palmerhq/typescript#exports). This allows code splitting inside a consumer application
instead of the exported library. E.g.: a react app using this lib will optimize
this library better if we export named modules rather than default modules.

## More information

### GitHub NPM registry (packages)

- [Setup CI Node](https://github.com/actions/setup-node#usage)
- [Authenticating](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages)
- [Publishing](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#publishing-a-package)
- [Installing](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package)

### Bumping dependencies and updating package.json

To update the project's dependencies and `package.json` at the same time
run the commands below.

```bash
npm install -g npm-check-updates
ncu -u
npm install
```
