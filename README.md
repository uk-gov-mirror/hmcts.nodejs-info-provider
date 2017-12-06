[![Build Status](https://travis-ci.org/{{github-user-name}}/{{github-app-name}}.svg?branch=master)](https://travis-ci.org/{{github-user-name}}/{{github-app-name}}.svg?branch=master)  
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# Using this module in other modules

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
