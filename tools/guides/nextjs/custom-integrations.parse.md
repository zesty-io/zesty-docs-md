---
description: How to load dynamic zesty.io content into your next.js project
---

# Custom Integrations

To dynamically load your Zesty.io instance's content into your Next.js project, you will need three files and zesty env values in your next.config.js file. You can see a working example of this in our nextjs starter [https://github.com/zesty-io/nextjs-starter](https://github.com/zesty-io/nextjs-starter). The starter is a great place to launch your nextjs app with everything for Zesty.io already configured.

If you plan to integrate Zesty.io into your project, this document will break down how the integration works in the [https://github.com/zesty-io/nextjs-starter](https://github.com/zesty-io/nextjs-starter) starter project.

### Files Needed

1. [`[...slug].js`](https://github.com/zesty-io/nextjs-starter/blob/main/pages/\[...slug].js) in the root of your `pages/` directory.
2. [`fetchPage.js`](https://github.com/zesty-io/nextjs-starter/blob/main/lib/zesty/fetchPage.js) a function that resolves dynamic content into `[...slug].js`
3. [`ZestyView`](https://github.com/zesty-io/nextjs-starter/blob/main/components/zesty/ZestyView.js) a dynamic component that resolves `views/zesty/` content model components

### ENV Setup - next.config.js&#x20;

example [https://github.com/zesty-io/nextjs-starter/blob/main/next.config.js](https://github.com/zesty-io/nextjs-starter/blob/main/next.config.js)

```
// Some code
const { fetchZestyRedirects } = require('./lib/zesty/fetchRedirects');

// generated by lib/sync.js
module.exports = {
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  async redirects() {
    return await fetchZestyRedirects()
  },
  env: {
      zesty: {
          instance_zuid: "", // zesty unique id of content instance
          stage: "", // e.g. the preview url from zesty https://XYZ-dev.webengine.zesty.io
          production: "", // e.g. the live url https://www.acme.com
          stage_password: "",
          src_dir: "", // where the next project has pages, components, etc folders
          options: {
            skip_config_overwrite: false, // for setups with custom config files, after initial setup of the env.zesty object, set to true
            model_ignore_list: [
              '6-xyz-xyz',
              '6-xyz-xyz' // an array of models ZUIDS to ignore when creating component files in views/zesty
            ]
          }

      }
  }
}
```

### Working with Zesty View Components

The Zesty.io configuration for next.js will look for a component name after the content model in `views/zesty` directory in your next.js project. A content model named `articles` will look for a component `views/zesty/Article.js` Note the slight name change, as the naming convention is a `PascalCase` without pluralization, therefore `articles` becomes `Article`. We call this the alternate name, you can find the automated alternate name by look at the [`?toJSON`](../../../webengine/guides/json-endpoints/headless-and-hybrid-tojson.md#content-output) response of any content item through WebEngine.

> Content models that start with a number will need N prepended to the name, e.g. `3slides` will be named `N3slides.js.` The sync script will automatically do this..

Instead of manually creating component, Zesty.io provide a script from downloading and creating components for each content model in your zesty.io instance.&#x20;

#### Zesty.io Next.js Sync

The zesty sync is already built into the nextjs-starter, but if you would like to implement a custom sync file, you may download or reference this file [https://github.com/zesty-io/nextjs-starter/blob/main/lib/zesty/sync.js](https://github.com/zesty-io/nextjs-starter/blob/main/lib/zesty/sync.js)

Once sync is in your project, add this line to your package.json file `"sync": "node lib/zesty/sync.js",` under `"scripts"` once that is in place you can  run `npm run sync` from your terminal to automatically pull down files.

After a `npm run sync` a view component is created for each Zesty Content Model in the `views/zesty` directory. Zesty Content Items that have URL will automatically resolve to the component in that `views` directory that is associated with the content models name.

```
// Example Component

import React  from 'react';

function Article({ content }) {
    return (
        <>
            {/* Zesty.io Output Example and accessible JSON object for this component. Delete or comment out when needed.  */}
            <h1 dangerouslySetInnerHTML={{__html:content.meta.web.seo_meta_title}}></h1>
            <div>{content.meta.web.seo_meta_description}</div>
            {/* End of Zesty.io output example */}
        </>
    );
}

export default Article;
```

Each Component loads with a {content} object, this object is a direct feed of that URLs ?toJSON response. [Read about toJSON](https://zesty.org/services/web-engine/introduction-to-parsley/parsley-index#tojson)
