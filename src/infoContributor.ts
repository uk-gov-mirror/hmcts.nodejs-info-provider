import * as request from 'request-promise-native'
import { InfoContributorConfig } from './infoContributorConfig'

export class InfoContributor {
  constructor (public readonly url: string,
               public readonly options: InfoContributorConfig = new InfoContributorConfig()) {
  }

  public call (): Promise<object> {
    const requestConfig: request.RequestPromiseOptions | request.OptionsWithUri = { uri: this.url, json: true }
    Object.assign(requestConfig, this.options.requestOptions)

    return request
      .get(requestConfig)
      .catch((err: Error) => {
        return {
          error: `Error calling ${this.url}`,
          errorStackTrace: err
        }
      })
  }
}
