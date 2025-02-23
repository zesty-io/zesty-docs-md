---
description: >-
  The order in which specific types of behavior or views load, from 301
  redirects to 404s.
---

# Resource Resolution

When a request is served by WebEngine, it reads the url path and attempts to match the url path to a content item resources. URL are checked against resource in a specific order, and will resolve the resource first if a match is found. If two resources share a URL path, then the one that loads first will resolve and the other is ignored.

**Resource load order:**

1. Proxy (if configured). If url doesn't exist, it skips. _?toJSON urls ignore proxy_&#x20;
2. Media Proxy (if configured) for _/-/media/_ urls
3. Static files generated by Zesty.io: site.css and site.js
4. Instant JSON API _e.g. /-/instant/7-zyx-zyxzyc.json_
5. GQL API _e.g. /-/gql/\*_
6. Static files generated by Zesty.io: _sitemap.xml, feed.xml, robots.txt_
7. Legacy JSON endpoints _e.g. /-/custom/_
8. Well Known Files _e.g. /.well-known/\*_
9. Custom endpoints _e.g. /custom/endpoints.json_
10. Legacy HTML endpoints _e.g. /ajax/_&#x20;
11. Content Models Views if a content item's meta path matches the request page _e.g. /about/team/_
12. Wild Card Views e.g. _/store/\*/cool-shirt/_
13. 301 redirects
14. 404 Pages e.g. when no resources match the url pattern

### Base Directory Setting

**Overview**

Zesty.io will default all automated assets files to the root `/` directory unless the base directory setting has been added and set. \
\
there is a setting on the instance with category:`general` key:`base_directory` with a directory set as its value e.g. `/blog/`

**Base Directory and Zesty.io Auto-created Files**

Once the Base Directory settings has a value the Zesty.io auto-created files listed below will be immediately affected.

* site.js
* site.css
* sitemap.xml
* robots.txt
* feed.xml
* [Instant JSON API](../json-endpoints/instant-content-api.md)
* [GQL API](../graphql.md)

**Using the Base Directory setting** **with non-automated files**

Other files created in the code editor such as custom endpoints must be manually named to follow the path of your choice. If you want content items to follow the same path as the Base Directory setting value, then a content model must exist with that path. For example, if you're using Zesty.io WebEngine only for your website's  `/blog/` subdirectory then you need to setup a content item as a placeholder with `/blog/` as its URL _and_ create the Base Directory setting (as shown below)  with the value `/blog/`.&#x20;

#### Adding the Base Directory Setting

The Base Directory setting can be added via [API](https://instances-api.zesty.org/#d295e8c8-40a2-435c-85cd-23a043a7135f) with the following JSON body:

```
{
    "category": "general",
    "keyFriendly": "Base Directory",
    "key": "base_directory",
    "value": "",
    "admin": false,
    "parselyAccess": false,
    "dataType": "text",
    "options": "",
    "tips": ""
}
```

&#x20;If you know what value you want the base directory set to go ahead and add it to the JSON body under `value`.

### Reserved Paths

Some path parts are reserved for security reasons. Any content item url path that includes these words will 404.

* vendor
* composer
* package
* package-lock
* gulpfile
* README
