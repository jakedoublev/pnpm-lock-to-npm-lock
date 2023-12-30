# PNPM Lock to NPM Lock

This script is used to convert a `pnpm-lock.yaml` file to a `package-lock.json` file for audit scan purposes only.

Successful scanning is accomplished by preserving all dependency sha's for security scanning tools like
[Prisma, Twistlock](https://www.paloaltonetworks.com/blog/2019/11/cloud-prisma-cloud-compute-edition/),
[Checkov](https://www.checkov.io/), etc which support scanning npm's `package-lock.json` out of the box.
This is not intended to be used to convert a project from [pnpm](https://pnpm.io/) to [npm](https://www.npmjs.com/).

- [Overview](#overview)
- [Contributing](#contributing)

## Overview

To execute this tool script:

```bash
# with npx
npx pnpm-lock-to-npm-lock <path to pnpm-lock.yaml>

# otherwise
npm i -g pnpm-lock-to-npm-lock
pnpm-lock-to-npm-lock <path to pnpm-lock.yaml>
```

### Rush monorepos

If running in a [Rush monorepo](https://rushjs.io/), where the monorepo's pnpm lockfile
is held within a `config` directory, you can execute with a contextual environment variable.

```bash
RUNTIME_CONTEXT=RUSH_MONOREPO npx pnpm-lock-to-npm-lock
```

Support for other monorepos and out-of-the-box repo configurations is not yet implemented,
but provision of a proper path to any `pnpm-lock.yaml` will create a scannable
`package-lock.json` in that same directory.

## Contributing

Primarily maintained by [Ryan Schumacher (@jrschumacher)](https://github.com/jrschumacher) & [Jake Van Vorhis (@jakedoublev)](https://github.com/jakedoublev).

We'd love your help maintaining and extending `pnpm-lock-to-npm-lock`!

To test the tool within this repo: `npx . pnpm-lock.yaml`

Please update the `CHANGELOG.md` and follow [Semver](https://semver.org/) with any contributions.
