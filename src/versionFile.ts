import * as fs from 'fs-extra'
import * as yaml from 'js-yaml'

export function loadVersionFile (): Promise<object> {
  const versionFilePath = `${process.env.NODE_PATH || '.'}/version`
  return fs.readFile(versionFilePath)
    .then((rawVersionFile: Buffer) => yaml.safeLoad(rawVersionFile.toString()))
    .catch(() => {
      return { version: 'unknown' }
    })
}
