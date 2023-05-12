# nodejs-info-provider

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
const { InfoContributor, infoRequestHandler } = require('@hmcts/info-provider')

express.Router()
  .get('/info', infoRequestHandler({
    info: {
      'fees-register': new InfoContributor('http://fees-register.com/info')
    },
    extraBuildInfo: {
      featureToggles: config.get('featureToggles'),
      hostname: hostname()
    }
  }))

```
