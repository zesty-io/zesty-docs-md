---
description: >-
  A DAM (digital asset manager) is an abstract file system that stores and
  optimizes files in the Zesty.io cloud.
---

# DAM (Media Management)

## What is a DAM?

A DAM (digital asset manager) is a Zesty.io service for managing files that are served publicly. Designed as an abstract file system, the DAM allows file organization that mimics an operating system directory structure. Zesty.io's DAM differs from dedicated enterprise DAMs in two ways: it does not handle digital right management (DRM), and assumes that every file added to it will be accessed publicly.

## What type of Files can be Stored on the Micro DAM?

Many file types may be uploaded to a Micro DAM. Examples include images (PNG, JPG, GIF), PDFs, Video (MP4, OGG), Fonts (OTF, WOFF, TTF), SVGs, YAML, Markdown, Javascript, CSS, etc.

## File Life Cycle

Once files are uploaded to the DAM (through the content manager or directly through the API), they are copied to cloud storage on Google Cloud Platform. From there they are propagated to the multiple edge point-of-presence (POP) points across the world. Files live on the DAM until they are deleted from the DAM through the API or the media section of the content manager.

### File Delivery & Content Delivery Network (CDN) Details

Files load to the client device (mobile phone, desktop, game console etc.) from the closest POP server they are located on. If the file is not located on a POP server, the POP server makes a request to Zesty.io (the origin) for the file. At that point Zesty.io transfers the file from cloud storage to the POP server. Any request to that file will be loaded from the POP server thereafter. The file will remain "cached" on the POP server for a 24 hour period. This whole cycle ensures fast delivery while delivering fresh files.

> ### POPs are high-density servers with 24 TB of SSDs, 768 GB of RAM, and 4 x 25 Gigabit Ethernet. Delivery is sub-millisecond Time to First Byte (TTFB) on the 99th%.\*

### This map shows all the Point of Presence (POP) servers across the World.

![\* Files are propagated to Fastly's (our partner) POP servers for optimal and fast delivery. ](../../.gitbook/assets/pop-endpoints.png)
