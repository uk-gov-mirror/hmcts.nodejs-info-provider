import { RequestPromiseOptions } from 'request-promise-native'

export class InfoContributorConfig {
  constructor(public readonly requestOptions?: RequestPromiseOptions) {}
}
