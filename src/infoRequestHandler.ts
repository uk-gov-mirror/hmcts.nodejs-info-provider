import * as express from 'express';
import { InfoResponse } from './infoResponse';

import { InfoConfig } from './infoConfig';
import { NameWithResult } from './nameWithResult';
import { loadVersionFile } from './versionFile';
import { VersionInfo } from './versionInfo';

export function infoRequestHandler(config: InfoConfig): express.RequestHandler {
  return (req: express.Request, res: express.Response) => {
    // keep a mapping to the name with the resolved promise
    const promises = Object.entries(config.info).map((result) => {
      return result[1].call().then((resolved) => {
        return {
          name: result[0],
          result: resolved,
        };
      });
    });

    Promise.all([loadVersionFile(), ...promises]).then((results) => {
      const build = results.reverse().pop() as VersionInfo;
      const json: InfoResponse = {
        build,
      };

      (results as NameWithResult[]).forEach((downstream: NameWithResult) => {
        json[downstream.name] = downstream.result;
      });

      json.extraBuildInfo = config.extraBuildInfo;
      res.json(json);
    });
  };
}
