import { Stats } from 'fs';
import { runtimeContext } from './utils/constants';

export type PnpmLockObject = {
  lockfileVersion: number;
  packages: {
    [packageName: string]: {
      resolution: {
        integrity: string;
      };
      dev?: boolean;
    };
  };
};

export type NpmLockPackage = {
  version: string;
  integrity: string;
  resolved: string;
  requires?: {
    [packageName: string]: string;
  };
  dependencies?: {
    [packageName: string]: NpmLockPackage;
  };
  dev?: boolean;
};

export type NpmLockObject = {
  name: string;
  version: string;
  lockfileVersion: number;
  requires: boolean;
  packages: {
    [packageName: string]: NpmLockPackage;
  };
  dependencies: {
    [packageName: string]: NpmLockPackage;
  };
};

export type HandleConversionOpts = {
  ctx?: keyof typeof runtimeContext;
  pnpmPath?: string;
};

export type FileStats = {
  pnpmStat: Stats;
  npmStat: Stats;
};
