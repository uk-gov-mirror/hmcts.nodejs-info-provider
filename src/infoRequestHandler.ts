import * as express from 'express';
import { InfoResponse } from './infoResponse';
import mapValues = require('lodash.mapvalues');

import { InfoConfig } from './infoConfig';
import { loadVersionFile } from './versionFile';

export function infoRequestHandler(config: InfoConfig): express.RequestHandler {
  return (req: express.Request, res: express.Response) => {
    const resolvedEntries = mapValues(config.info, (value) => value.call());

    // keep a mapping to the name with the resolved promise
    const promises = Object.entries(resolvedEntries).map((result) => {
      return result[1].then((resolved) => {
        return {
          name: result[0],
          result: resolved,
        };
      });
    });

    Promise.all([loadVersionFile(), ...promises]).then((results) => {
      const build = results.reverse().pop();
      const json: InfoResponse = {
        build,
      };
      // @ts-ignore
      results.forEach((downstream: { name: string; result: object }) => {
        json[downstream.name] = downstream.result;
      });

      json.extraBuildInfo = config.extraBuildInfo;
      res.json(json);
    });
  };
}
