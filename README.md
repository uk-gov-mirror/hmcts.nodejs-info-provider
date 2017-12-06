# nodejs-info-provider

[![Build Status](https://travis-ci.org/hmcts/nodejs-info-provider.svg?branch=master)](https://travis-ci.org/hmcts/nodejs-info-provider.svg?branch=master)  
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)  
[![Greenkeeper badge](https://badges.greenkeeper.io/hmcts/nodejs-info-provider.svg)](https://greenkeeper.io/)

```bash
$ yarn add @hmcts/info-provider
```

Typescript:
```ts
import { InfoContributor, infoRequestHandler  } from '@hmcts/info-provider'


express.Router()
  .get('/info', infoRequestHandler({
    info: {
      'fees-register': new InfoContributor('https://fees-register.com/info')
    },
    extraBuildInfo: {
      featureToggles: config.get('featureToggles'),
      hostname: hostname()
    }
  }))

```

- Javascript -

```js
const infoRequestHandler = require('@hmcts/info-provider').infoRequestHandler

express.Router()
  .get('/info', infoRequestHandler({
    info: {
      'fees-register': {url: 'https://fees-register.com/info'}
    },
    extraBuildInfo: {
      featureToggles: config.get('featureToggles'),
      hostname: hostname()
    }
  }))

```
