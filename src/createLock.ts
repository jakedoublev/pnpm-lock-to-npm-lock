import * as fs from 'fs';
import { parse } from 'yaml';

import { NpmLockObject, NpmLockPackage, PnpmLockObject } from './types';

/** Generate an npm-flavor package-lock.json from a pnpm-lock.yaml filepath. */
export function createLock(pnpmLock: string): NpmLockObject {
  const pnpmLockObject = <PnpmLockObject>parse(pnpmLock);

  // Convert pnpm-lock object to npm package-lock object
  const npmLockObject: NpmLockObject = {
    name: 'Lockfile auto-generated with pnpm-lock-to-npm-lock tool',
    version: '1.0.0',
    lockfileVersion: 2,
    requires: true,
    packages: {},
    dependencies: {},
  };

  Object.entries(pnpmLockObject.packages).forEach(([packageName, lockObj]) => {
    let pkgName = packageName.startsWith('/') ? packageName.substring(1) : packageName;
    let version = pkgName.substring(pkgName.lastIndexOf('@') + 1);
    pkgName = pkgName.substring(0, pkgName.lastIndexOf('@'));
    let scopedPkgName = pkgName;

    if (pkgName.startsWith('@')) {
      scopedPkgName = pkgName;
      pkgName = pkgName.substring(pkgName.indexOf('/') + 1);
    }

    const resolved = `https://registry.npmjs.org/${scopedPkgName}/-/${pkgName}-${version}.tgz`;

    const dev = lockObj.dev || false;
    const integrity = lockObj.resolution?.integrity || '';
    const baseDepObj: NpmLockPackage = {
      version,
      resolved,
      integrity,
      dev,
    };

    const requires = { [scopedPkgName]: version };
    const dependencies = { [scopedPkgName]: baseDepObj };
    const pkgDepObj: NpmLockPackage = {
      ...baseDepObj,
      requires,
      dependencies,
    };
    npmLockObject.packages[`node_modules/${scopedPkgName}@${version}`] = pkgDepObj;
    npmLockObject.dependencies[scopedPkgName] = pkgDepObj;
  });

  return npmLockObject;
}
