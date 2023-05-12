import { VersionInfo } from './versionInfo';

export interface InfoResponse {
  build: VersionInfo;
  [key: string]: object | undefined;
}
