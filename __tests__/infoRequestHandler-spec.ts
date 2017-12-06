import * as express from 'express'
import * as nock from 'nock'
import * as request from 'supertest'

import { InfoConfig, InfoContributor, infoRequestHandler } from '../src'
import { mockVersionFile } from '../src/__mocks__/versionFile'

jest.mock('../src/versionFile')

const app = express()

describe('infoRequestHandler', () => {
  test('should output just build if no checks', () => {

    app.get('/info', infoRequestHandler(new InfoConfig({})))

    return request(app)
      .get('/info')
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.body).toEqual({ build: mockVersionFile })
      })
  })
  test('should output checks with error if non existent url', () => {

    app.get('/info-with-check-and-error', infoRequestHandler({
      info: {
        aDownstream: new InfoContributor('/I-do-not-exist')
      }
    }))

    return request(app)
      .get('/info-with-check-and-error')
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.body.aDownstream.error).toEqual('Error calling /I-do-not-exist')
        expect(response.body.aDownstream.errorStackTrace).toBeDefined()
      })
  })
  test('should output checks', () => {

    const mockInfoResponse = { build: { version: '1.0.1' } }
    nock('http://localhost:4551')
      .get('/downstream-info')
      .reply(200, mockInfoResponse)

    app.get('/info-with-check', infoRequestHandler({
      info: {
        aDownstream: new InfoContributor('http://localhost:4551/downstream-info')
      }
    }))

    return request(app)
      .get('/info-with-check')
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.body.aDownstream).toEqual(mockInfoResponse)
      })
  })
  test('should output extra build info', () => {

    const extraBuildInfo = { featureToggle: { info: true } }
    app.get('/info-with-extra-build-info', infoRequestHandler({
      extraBuildInfo,
      info: {}
    }))

    return request(app)
      .get('/info-with-extra-build-info')
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.body.extraBuildInfo).toEqual(extraBuildInfo)
      })
  })
})
