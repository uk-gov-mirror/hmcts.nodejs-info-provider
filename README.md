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

### Making updates

Clone the repo and make the updates locally e.g. upgrading yarn packages.

If you're upgrading packages, ensure you run `yarn install` before committing.

This repo uses classic Yarn i.e. versions 1.x.

Once your changes have been merged into master, push a new tag to the repo and create a new release.

The release will initiate a github action run to publish the new version to npmjs.com.
