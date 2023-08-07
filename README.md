## JS Package Template 🚀

This project is a template for creating JavaScript packages with pure
JavaScript. It includes features for linting, type checking and documentation
using JSDoc annotations, and bundling the source as a package to be published to
the NPM registry.

## Linting and formatting features

This template is configured with ESLint and Prettier. It uses the [Airbnb base
config](https://www.npmjs.com/package/eslint-config-airbnb-base) and extends it
with tiny overrides which are in [`.eslintrc.js`](./.eslintrc.js), and can be
easily extended or removed if needed. You might also want to change other
settings in [`.eslintrc.js`](./.eslintrc.js) to fit your needs.

## Static typing and documentation features

This template is meant to be used to create packages with raw JavaScript, but
with type checking using JSDoc type annotations. When bundled, separate type
declaration files are emitted to provide nice autocomplete for users of the
package. As a result, you can use all [JSDOC tags supported by
Typescript](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html),
and even typescript specific syntax like function types directly inside JSDoc
comments and it'll work nicely.

You can also directly include documentations for any symbol in the package using
JSDoc. Comments are not removed from the builds.

Please note that type checking is enabled by default. If you would like to
disable it, please do the following:

- Set `checkJs` to `false` in `tsconfig.json`
- Remove the type checking configured in
  [`lint-staged.config.json`](./lint-staged.config.js). You can change the
  contents of the file to the following:

  ```js
  module.exports = {
    "*.js": ["eslint", "prettier --check"],
    "*.{json,md}": "prettier --check"
  }
  ```

For plain Typescript projects, where you actually want to write Typescript code,
please consider using
[`ts-package-template`](https://github.com/abdulramon-jemil/ts-package-template)
instead. It includes additional configuration for plain Typescript files.

## Environment settings

The environment is assummed to be node by default, meaning that some changes
have to be made if the package is meant to be used just in the browser, or both
the browser and node.

The first setting that needs to be altered is the `env` setting in
[`.eslintrc.js`](./.eslintrc.js). For a browser-only package:

```json
{
  "env": {
    "browser": true
  }
}
```

For both node and the browser:

```json
{
  "env": {
    "shared-node-browser": true
  }
}
```

The follow changes also have to be made if the package will run in the browser
(whether browser-only, or browser/node) to make sure you're only using the core
JavaScript APIs:

- Remove the `@types/node` dependency from `package.json`, before running `npm
install`.
- Change `compilerOptions.types` in `tsconfig.json` into an empty array, or
  remove it completely.

Additionally, if the package will only be running in the browser, you can add
`"DOM"` to the `compilerOptions.lib` array in `tsconfig.json`, to prevent
typescript from throwing an error when you use the DOM APIs, and also for
autocomplete features.

## Bundling features

This template includes three TSconfig files. There's a base `tsconfig.json` file
which is extended by two other TSconfig files, namely the `tsconfig.cjs.json`
and `tsconfig.mjs.json` files. These two files are passed to the Typescript
compiler at build time to create two different builds of the package to support
`import` and `require` statements on the package's exports. The builds created
are put in the `dist` folder at the project's root; the commonjs build in
`dist/cjs`, and the Ecmascript module build in `dist/mjs`.

## Incuded Scripts

There are a couple of script included in the `package.json`:

- `build`: builds the package, causing typescript to emit files in the
  `dist/cjs` and `dist/mjs` directories. This also runs the `fixup` script.

- `fixup`: Runs the [fixup.sh](./fixup.sh) shell script. This creates two
  separate `package.json` files for the two builds (`dist/cjs` and `dist/mjs`)
  configuring their types (`"commonjs"` and `"module"` respectively). You can
  learn more about this approach
  [here](https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html).

- `format`: Runs prettier on the whole project.

- `lint`: Runs eslint on the whole project.

- `type-check`: Run Typescript on the project without emitting files.

- `prepare`: Installs precommit hooks to automatically lint changed files on
  each commit.

- `prepublishOnly`: causes the package to be built automatically (populate the
  `dist` directory) when attempting to publish to the NPM registry.

## Other features

Another feature included in this template is automatic linting of changed files
on every commit using `husky` and `lint-staged`.

## Usage

To use this template, do the following:

- Clone the repository. Replace `<YOUR_PROJECT_NAME>` in the following command
  with your projct name or `./` if you're in your project folder.

  ```bash
  git clone https://github.com/abdulramon-jemil/js-package-template.git <YOUR_PROJECT_NAME>
  ```

- Remove the `LICENSE` file if needed (or modify it as needed):

  ```bash
  rm LICENSE
  ```

- Restart the git history:

  ```bash
  rm -rf .git
  git init
  git add .
  git commit -m "Initial commit"
  ```

- Modify `package.json` and `package-lock.json` to show your project's details:

  ```json
  {
    "name": "<YOUR_PROJECT_NAME>",
    "description": "<YOUR_PROJECT_DESCRIPTION>",
    "version": "<YOUR_PROJECT_VERSION>"
  }
  ```

- Modify the project's README as needed or remove it:

  ```bash
  rm README.md
  ```

- Follow the instructions in [Environment Settings](#environment-settings) above
  and make changes based on your needs.

- Install the packages:

  ```bash
  npm install
  ```

- Run the prepare script:

  ```bash
  npm run prepare
  ```

After these, you can start adding your own code in the `src` directory.

## Updating packages

Please update packages as needed if they're outdated at the time of using the
template. I might not have time to update them.

## Contributing

If you would like to contribute to this template, please create an issue about
it first, and let's talk about it. Thanks in advance.

## Other templates

- [TS Package Template](https://github.com/abdulramon-jemil/ts-package-template)
- [Next Chakra
  Template](https://github.com/abdulramon-jemil/next-chakra-template)
