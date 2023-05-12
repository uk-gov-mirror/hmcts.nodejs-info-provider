import { Info } from './info';

export class InfoConfig {
  constructor(
    public readonly info: Info,
    public readonly extraBuildInfo?: object
  ) {}
}
