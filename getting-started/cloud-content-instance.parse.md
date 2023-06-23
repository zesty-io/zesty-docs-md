---
description: >-
  A Zesty.io Cloud Content Instance is a collection of schema, web views, and
  APIs to create, manage, and distribute content to browsers, applications,
  and/or IoT devices. 100% managed and automated.
---

# Cloud Content Instance

## What is a Cloud Content Instance?

Cloud Content Instances are the primary product of Zesty.io. Content Instances are implementations of Zesty.io used to create and manage text, image, or video based content that is distributed to digital presentations. Digital presentation can include, but are not limited to: websites, web and mobile applications, video game consoles, Alexa apps, Roku apps, digital signage, etc.. Content Instances are set to replace traditional content management systems.

### What type of Content Can be Stored?

Traditionally, Zesty.io has been used for brochure style, public marketing content, that is most commonly distributed through websites. This includes, but is not limited to, product content, blogging (content marketing) content, promotional content, business information content, educational content.

Alternate styles of content include internal intranet content (Learning Management), instructional content to control environments or interactive digital experiences, or content that is primarily interacted with by voice commands.

### Powering Multiple Digital Presentations

Websites are the most common vehicle for digital content consumption. That is why we have the [Site Engine](../services/web-engine/) to quickly get search engine friendly websites off the ground from a content instance. As we progress further into our digital world, websites are not the only place digital content lives or is consumed. A content instance really thrives when its content powers multiple presentations simultaneously. The most common example is article (content marketing) content loading both on a website and a mobile app. The value of that is two-fold: the content owner gain search engine rich website content while also leveraging a mobile app to use push notification to their user base.

### Cloud Content Instances vs. Open-Source Content Management Systems (CMS)

To launch content in most legacy systems, a developer would often set up open-source website software (CMS) or statically launch files onto a web server. This is a quick way to get a project off the ground, and if the CMS being used is open-source, the content can be edited right away. The primary issues with that setup revolves around business needs and transportation of content.

#### Disadvantages to self-managed Open-Source Software Installations

* **Content is Siloed:** Lives on a database installed on a remote server tied to a single application. This results in the same content living in multiple places that requires repeated updates to distribute the same content across multiple presentations.
* **Software Decay:** Updates may not be possible after customization of the CMS. Software may jump versions, leaving prior installations on decaying software.
* **Flailing Security:** Maintenance is a necessary evil of open-source servers and software. A developer must stay on top of monthly, event daily changes to protect the installation.
* **Growing Maintenance:** When multiple website are needed, multiple software and/or server installs are necessary. That increases the time it takes to stay on top of maintenance.&#x20;
* **Scalability & Reliability:**  If demand outweighs the resources allocated to a single software/server setup, performance will weaken and the website may not serve in a timely fashion, or even at all when under consumer demand.
* **Stacking Responsibilities:** As need for project expansion is demanding, the above issues compound and require dedicated full time developer maintain and continue iteration. This results in a heavy monetary and opportunity costs for the business due to expensive development resources and/or reduction of speed to implement new presentations.

> Some CMS software solutions are free to get started, but as time passes hidden costs of maintaining, securing, and upgrading start to add up.

#### Advantages to Cloud Content Instances

* **Content Anywhere:** Manage content in a single place and use it to update multiple presentations.&#x20;
* **Seamless Updates:** Zesty.io unique wrote their software to update behind the scenes without a need for developer maintenance.&#x20;
* **Constant Security:** Security is constantly monitored, tested, and maintained by a dedicated team.
* **Internet Scale & Reliability:** Ready for mass consumption, the system distributes content to cached edge points and uses anycast internet protocol routing to deliver sub-second page load.
* **No Maintenance:** Developers can focus on delivering experiences while trusting a dedicated to upkeep cloud infrastructure.
* **Content Repurposed:** Content can be shared between multiple instances, making large scale installs and wide-spread information projects easy to deliver and maintain.
* **Increased Team Performance:** Do more with less facilitation and coordination. Resources once spent on maintenance and up-time can be redirected on new presentations.

> The cost to run a Cloud Content Instance may be quickly justified when comparing it to developer labor costs required to maintain self-installed custom solutions.

## Anatomy of a Content Instance

Each Content Instance is comprised of three main components: **Content Schema**, a **Media Bin**, and optional **Website Engine** functionality. When an Instance is created, it is ready for any content configuration. Once configured, content items can be imported or entered, at which point content stored on the instance can be made available immediately through the Instant Content API (headless) or fully functional website (Site Engine).

### Content Schema

Content Schema is where the structure of how you store and access data is defined. There is no limit or rules in how simple or complicated the schema can be; what is important is that it matches your use case. Content Schema is comprised of **Content Models**, which are individual definitions of how to store content. One simple example of a content models is **Blog Articles**, which would have the fields title \[text], article\_content \[wysiwyg], and data\_created \[date].

In legacy systems and even most modern systems, developers have to build databases and model tables. This includes columns, IDs, relationships in order to capture data and edit data. A lot of times this is used to power websites. This is cumbersome and difficult. This is why CMS schemas exist- they are the UI abstraction over the database. As a user of Zesty.io, you simply provide a definition of your data model, and we handle all the underpinning to store your definitions and data efficiently.

### Micro DAM (Media Storage)

A Micro DAM (digital asset manager) is an abstract file system that stores files in the Zesty.io cloud. Every Content Instance is provisioned with a Micro DAM. Any type of file may be uploaded to a Micro DAM, examples include Images (PNG, JPG, GIF), PDFs, Video (MP4, OGG), Fonts (OTF, WOFF, TTF), SVGs, YAML, Javascript, CSS, etc.

[media-storage-micro-dam](../services/media-storage-micro-dam/)

### Web Engine

The [Web Engine](../services/web-engine/) is a fully managed and cloud hosted website serving platform. It includes a templating language to access the Content Schema on an instance between HTML markup. It enables developers to quick launch scalable websites without needing to optimize it for page load time or search engines.

[web-engine](../services/web-engine/)
