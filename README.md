# Template Instructions

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
  - [ ] Set project `publishConfig.registry`
    - Publishing to private GitHub registry? Set `https://npm.pkg.github.com/owner-or-organization`
    - Publishing to public NPM registry? Set `https://registry.npmjs.org`
  - [ ] Set project `publishConfig.access` to according to your needs.
        See [this](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#publishconfig),
        and [this](https://docs.npmjs.com/cli/v8/using-npm/config#access)
  - [ ] Set your preferred package.json "type", default is `module`. Which we recommend.

- **.github/workflows/publish.yml**

  - [ ] Set `jobs.steps.*.with.scope` to `@owner-or-organization`
  - [ ] Set `jobs.steps.Publish.env.NODE_AUTH_TOKEN`
    - Using GitHub registry? Set `NODE_AUTH_TOKEN: ${{secrets.GITHUB_TOKEN}}`
    - Using NPM registry? Set `NODE_AUTH_TOKEN: ${{secrets.NPM_AUTH_TOKEN}}`
      - You will need to create an Access Token on NPM and set it the Key Value on your repository GitHub Secrets
  - [ ] Disable `publish.yml` workflow on GitHub if you prefer releasing through the [CLI](#publishing)

- **readme.md**

  - [ ] Set project `repository-name` as main heading
  - [ ] Write a somewhat long description of the goals of the package
  - [ ] Add some basic usage on information to the `README.md` file that will replace this one
  - [ ] Add link to documentation page if package is too complex to doc on a `README.md` file

- **testpkg.sh**

  - [ ] Update contents of `testpkg.sh`
  - [ ] Update the imports on `app/index.ts` test file (tiny app to manually verify
        package before running `npm run release`)

- **miscellaneous**:
  - [ ] Add more project `devDependencies`, e.g.: `react` and `react-dom`
  - [ ] Add `peerDependencies` to ensure package consumers have required dependencies
  - [ ] Add additional `prettier` or `eslint` plugins as required.
  - [ ] Setup other testing and DX tools, e.g.: `cypress`, `playwright`, `react-testing-lib`, `storybook`
  - [ ] Update `.vscode/settings.json`, some libs you might be using may require or benefit additional configs (e.g.: `vue` or `i18n-ally`)
  - [ ] Update `.eslintrc.cjs` with rules specific to your tooks, e.g.: `react-hooks` or others.
  - [ ] Update `.lintstagedrc.json` to scan additional file types.
  - [ ] Update `tsconfig.json` at the root of the project with rules that make sense for your package.
  - [ ] Update `prettierrc.cjs` import order rules to add additional path alias overtime.

## Bumping dependencies and updating package.json

To update the project's dependencies and `package.json` use the script below. Please
review the package changes. If any major version upgrade was made, check on the package
repository if there were breaking changes and how to deal with them.

```bash
npm run up:install
```

## Configuration

Code quality is set up for you with `prettier`, `eslint`, `husky`, and
`lint-staged`. Depending on the package goals, you might need to add some
plugins. Adjust `package.json` accordingly.

### Bundle Analysis

[size limit](https://github.com/ai/size-limit) is set up to calculate
the real cost of your library with `npm run size` and visualize the bundle
with `npm run analyze`.

### Dependency Management

Take care when adding new dependencies to the project. When you add a new
production dependency (`dependencies` in `package.json`), these will also
be installed a `production` or `development` dependencies in the consumer
projects (depending on their usage of `--save-dev`). When you add a package to
`devDependencies` these are not propagated to consumers. Ideally, if you want
to ensure that consumers have a package installed on their project, that is
needed for your project to work, without risking conflicts with them, you should
declare such packages as `peerDependencies` which are installed in case the
consumer does not have them yet. Otherwise `peerDependencies` ensures version
the consumer has, is compatible with what is requested.

#### Dependency Management Short Summary

- `dependencies` indirectly forces consumers to have your dependencies.
- `devDependencies` do not affect consumers.
- `peerDependencies` ensures consumers install the correct version of a packages you
need to operate, but do not necessarely depend on.

### Jest

Jest tests are set up to run with `npm test` or `npm test:headless`. If you
are developing a package for `React.js` or `Next.js` further packages need to be
added.

### Path Aliases

We use TypeScript `path` alias and `ts-jest` to ensure the same aliases are available
during test runs. For bundling convinience, our tests are located on an isolated folder
called `test`. You should create your `unit` and `integration` tests here, but you
are free to modify the configuration to your preference.

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

#### What should I do before releasing?

You should run a healthy amount of automated tests and ideally, test your
library on a dummy-app, if it is somewhat complex to do so automatically; If it is a
simple utility library you can tweak `./app/index.ts` and use `testpkg.sh` to print some
`console.log` statements;

#### What scripts run when releasing?

When you run `npm run release -- args` a handful of precommand, command, and
postcommand scripts are executed. Below is the order in which they resolve!

```bash
2. prerelease # checkout to main, updates local codebase and runs static-analysis
3. prebuild # cleans current dist folder
4. build # runs microbundle commands to generate a new dist folder
5. release # executes at this point to generate standard-version and changelogs
6. postrelease # pushes the created tags to remote and starts publishing process
7. prepack # disables postinstall script to avoid conflict on consumers
8. prepare # executes default prepare script (gzip of package.json.files + package.json itself)
9. postpack # reenables postinstall script
10. publish # pushes gzip to remote registry.
```

#### How can consumers of our package use our utilities?

We export our configurations in multiple formats on `package.json`. We use `microbundle`
to make bundling a breeze. For a more refined configuration, please refer to their
documentation at [@microbundle](https://github.com/developit/microbundle)

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

CJS, MJS, ESModules, and UMD module formats are supported. The appropriate paths are
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
