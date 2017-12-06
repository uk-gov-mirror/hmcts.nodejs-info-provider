import * as bb from 'bluebird'
import * as express from 'express'
import mapValues = require('lodash.mapvalues')

import { InfoConfig } from './infoConfig'
import { loadVersionFile } from './versionFile'

export function infoRequestHandler (config: InfoConfig): express.RequestHandler {
  return (req: express.Request, res: express.Response) => {
    const resolvedEntries = bb.props(mapValues(config.info,
      value => value.call()
    ))

    Promise.all([loadVersionFile(), resolvedEntries])
      .then(([versionFile, downstreams]) => {
          const json = {
            build: versionFile,
            ...downstreams,
            extraBuildInfo: config.extraBuildInfo
          }
          res.json(json)
        }
      )

  }
}
