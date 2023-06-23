---
description: >-
  Often at a project launch there is a desire to publish all content at once.
  This explains how you publish all content, or all content on a single model.
---

# Publishing All Content

To publish all the latest versions of content items on a content instance make an authenticated get request a described below. Please note, this is not reversible and it will publish all drafted versions.

Publish All endpoints runs against the default language, to publish alternative languages you must send the `lang` option with the language code you wish to publish.&#x20;

Note these endpoints queue individual publishing requests which process at 1,800 a minute.

> These endpoints must be made with an authentication token made from a user login. Developer tokens will not work.

#### Publish All Content

Will iterate through each model of an instance, and queue all items for publishing.
















#### Publish All Model Content

Will iterate through each item in a specific single content model and queue them for publishing.


















