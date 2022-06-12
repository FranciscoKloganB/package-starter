# repository-name

<!-- TODO: Warning do not proceed without finishing this checklist  -->
<!-- TODO: Read some https://blog.logrocket.com/the-complete-guide-to-publishing-a-react-package-to-npm/ -->
<!-- TODO: Delete checklist when you are done -->

If this is the first time the package is being setup by any team member
ensure that all `todo-template-` annotations spread around the code have been
resolved and deleted.

- **package.json**

  - [ ] Set project `author` to `owner-or-organization`
  - [ ] Set project `name` to `@owner-or-organization/repository-name`
  - [ ] Set project `repository.url` to `git://github.com/owner-or-organization/repository-name.git`
  - [ ] Set project `publishConfig.registry` to `https://npm.pkg.github.com/owner-or-organization`
  - [ ] Set project `publishConfig.access` to according to your needs.
        See [this](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#publishconfig),
        and [this](https://docs.npmjs.com/cli/v8/using-npm/config#access)

- **.github/workflows/publish.yml**

  - [ ] Set `jobs.steps.*.with.scope` to `@owner-or-organization`
  - [ ] Disable `publish.yml` workflow on GitHub if you prefer releasing through the [CLI](#publishing)

- **readme.md**

  - [ ] Set project `repository-name` as main heading
  - [ ] Write a somewhat long description of the goals of the package
  - [ ] If the package is simple add some basic usage on the `markdown` itself
  - [ ] Otherwise setup a custom documentation page using any tool of your choice

- **miscellaneous**:
  - [ ] Add more project `devDependencies`, e.g.: `react` and `react-dom`
  - [ ] Add `peerDependencies` to ensure package consumers have required dependencies
  - [ ] Add additional `prettier` or `eslint` plugins as required.
  - [ ] Setup other testing and DX tools, e.g.: `cypress`, `react-testing-lib`, `storybook`

## Description

A tiny collection of utility functions is often required in frontend projects.

Utilities include date formatters, transforming objects to query strings,
and verifying that a given string is a URL. As well as a `callAll` function, which
invokes an arbitrary number of functions each with an arbitrary number of args;

## Configuration

Code quality is set up for you with `prettier`, `eslint`, `husky`, and
`lint-staged`. Depending on the package goals, you might need to add some
plugins. Adjust `package.json` accordingly.

### Bundle Analysis

[size limit](https://github.com/ai/size-limit) is set up to calculate
the real cost of your library with `npm run size` and visualize the bundle
with `npm run analyze`.

### Jest

Jest tests are set up to run with `npm test` or `npm test: headless`. If you
are developing a package for `React.js` or `Next.js` further packages need to be
added.

### Path Aliases

We use [alias-hq](https://github.com/davestewart/alias-hq) to simplify path
aliasing during development; Configure paths once in `tsconfig.json` and have
remaining tools like `jest` integrate automatically with the available
`tsconfig` by invoking a simple function provided by `alias-HQ;

### Publishing

Add all expected environment variables (see `.env.example`) to your `.zshrc` or
`.bashrc` profile. Alternatively, install `direnv`, then, add a `.env` file
in the root of the project containing those same environment variables.

Finally, execute the commands below

```bash
# Create a PAT (write package permissions) for your GitHub user on the website
# This should be somewhere under Profile > Settings > Developer Settings
# Export the following environment variables or use `direnv` / `dotenv`:
export NPM_USER=<your_lowercased_github_username>
export NPM_PASS=<your_github_pat_with_packages_write_permission>
export NPM_EMAIL=<your_github_email>
export NPM_REGISTRY=https://npm.pkg.github.com/
export NPM_SCOPE=<owner-or-organization>
# Source your profile and execute:
npm-cli-login -u $NPM_USER -p $NPM_PASS -e $NPM_EMAIL -r $NPM_REGISTRY -s $NPM_SCOPE

# Verify the previous process
# Check global .npmrc (ensure you see your auth token (PAT) and the org registry)
# Check also your `whoami` just in case
cat ~/.npmrc
npm whoami --scope=@owner-or-organization --registry=https://npm.pkg.github.com/

# Kickstart the actual publishing process
npm run release -- --first-release
npm run release -- --release-as patch
npm run release -- --release-as minor
npm run release -- --release-as major
```

#### What scripts run when releasing?

When you run `npm run release -- args` a handful of precommand, command, and
postcommand scripts are executed. Below is the order in which they resolve!

```bash
1. cop # alias for formatter, linters and test invocations
2. prerelease # calls cop
3. prebuild # cleans dist folder
4. build # runs microbundle commands
# --- RELEASE COMMAND RESOLVES AND TRIGGERS NPM PUBLISH ---
6. prepublishOnly # runs standard-version commands to create tags/changelog and pushes the created tags to remote
7. prepack # disables postinstall script to avoid conflict on consumers
8. prepare # executes default prepare method (creates a gzip) of `dist` generated by build
9. postpack # enables postinstall script to allow package maintainers to benefit from its properties
# --- NPM PUBLISH RESOLVES ---
```

## Continuous Integration

### GitHub Actions

Three actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds against
  a _Node vs. OS_ matrix
- `size` which comments cost comparison of your library on every pull
  request using [`size-limit`](https://github.com/ai/size-limit)
- `publish` a workflow that is currently under development, which would be
  responsible for automatically publishing the repository to GitHub packages
  when a new the non-draft release is created and published; Until this workflow
  is ready, prefer using the manual approach detailed below.

## Module Formats

CJS, ESModules, and UMD module formats are supported. The appropriate paths are
configured in `package.json`. Read more at [microbundle](https://github.com/developit/microbundle)

## Named Exports

Per Palmer Group guidelines, you should prefer [named exports.](https://github.com/palmerhq/typescript#exports).
This allows code-splitting inside a consumer application instead of the exported
library. E.g.: a react app using this lib will optimize this library better if
we export named modules rather than default modules.

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
