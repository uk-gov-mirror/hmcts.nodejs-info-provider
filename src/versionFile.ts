import * as fs from 'fs-extra';
import * as yaml from 'js-yaml';

export function loadVersionFile(): Promise<object> {
  const versionFilePath = `${process.env.NODE_PATH || '.'}/version`;
  // @ts-ignore
  return fs
    .readFile(versionFilePath)
    .then((rawVersionFile: Buffer) => yaml.load(rawVersionFile.toString()))
    .catch(() => {
      return { version: 'unknown' };
    });
}
