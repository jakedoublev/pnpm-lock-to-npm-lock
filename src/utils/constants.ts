/**
 * While this lockfile conversion tool is primarily designed for use in a CI pipeline, there are cases
 * where we want to support runtime contexts for various repo configurations out of the box. This list
 * is utilized as an enum for the environment variable `RUNTIME_CONTEXT` in lieu of a filepath to the
 * pnpm-lock.yaml file.
 */
export const runtimeContext = { RUSH: 'RUSH_MONOREPO' };
