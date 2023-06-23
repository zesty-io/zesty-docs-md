---
description: >-
  A Read Only JSON API to access any content created and managed on the Zesty.io
  Content Platform
---

# Instant API (Read Only)

## What is the Zesty.io Instant Content API?

The Instant Content API (ICA) is a Read Only interface that returns JSON data via HTTP GET requests. It uses Zesty Unique Identifiers (ZUID)s to return information. ICA is primarily used for headless applications, but is not limited to that use. Dynamic Website data or middleware interpreters are also common uses.

This API is intended to be used to retrieve basic information about content in your instance. If you want to receive different file types (e.g. SVG, XML, RSS, etc), or submit parameters, we recommend using the Custom JSON API Instead.

## Introduction

### Getting Started

#### Enabling Instant Content API

ICA is an optional feature on every Zesty.io Instance. It can be turned on from the developers settings in the Instances Manager Interface.

#### Accessing Instant Content API Endpoints

To access ICA, you make a call to your preview URL or live domain, for example: [http://burger.zesty.site/-/instant/6-4b5c74-fg83s2.json](http://burger.zesty.site/-/instant/6-4b5c74-fg83s2.json). Swap out the domain for your preview URL or your live domain. Switch out the HASH for a resource you wish to access on your Zesty.io instance.

The hash you see is a ZUID. ZUIDs are used to represent every type of resource in Zesty.io. You can find the ZUID of a resource in a few ways through the Zesty.io Content Manager. When editing content, you will see the ZUID (items start with 7-) of that content in the URL of the page you are editing. You can access model ZUIDS (models start with 6-) by looking in the schema (previously config) tab.

When you visit the ICA URL you see a JSON object of the data associated with the resource you are requesting along with meta data, version information, image objects, and related resources objects.

## Security

ICA is optional and has to be turned on to gain access to it. Options to control Cross Origin Resource Sharing can be used to lock the API down to specific websites. A header request with a private token can be set to secure external programmatic application calls. That key is set by the user by editing the developer setting.

Example Header (Optional if setting is set)

```
Authorization: Bearer XXXXX
```

## JSON Format






























## Datatypes Returned

### Images

Images are returned as objects, containing data regarding how many images were returned, as well as the media url and the image zuid

```
"imageRef" : {
    "type": "images",
    "totalItems": 2,
    "data": [
        {
            "type": "image",
            "zuid": "3-image-zuid",
            "url": "https:\/\/instance.media.zestyio.com\/path\/to\/.jpg"
        },
        {
            "type": "image",
            "zuid": "3-image-zuid",
            "url": "https:\/\/instance.media.zestyio.com\/path\/to\/.jpg"
        }
    ]
}
```

### Relationships

Relationships (such as `one-to-one` and `one-to-many`) are returned as objects, containing data regarding how many items are related (`one-to-one` relationships will always return 1) , as well as a resource URI to retrieve more data on the related item

```
"relationshipRef": {
    "type": "relationship",
    "totalItems": 2,
    "data": [
        {
            "type": "item",
            "zuid": "7-zuid",
            "resourceURI": "\/-\/instant\/7-zuid.json"
        },
        {
            "type": "item",
            "zuid": "7-zuid",
            "resourceURI": "\/-\/instant\/7-zuid.json"
        }
    ]
},
```
