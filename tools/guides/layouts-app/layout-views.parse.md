---
description: Discover what views, models, and items can be edited in the Layouts App.
---

# Layout views

### Changing Visual Layout width

* You can change your visual layout width to adjust the viewport width of your editing experience to 100%, fixed width, or dynamic

<figure><img src="../../../.gitbook/assets/layouts - dynamic visual layout.gif" alt=""><figcaption></figcaption></figure>

### Views

* Visual Layout: This is where you can edit content models or items using the drag and drop interactive experience.
* ZHTML Output: This is the generated HTML that Webengine will parse if you are using Zesty Cloud with Parsley templating.&#x20;

<figure><img src="../../../.gitbook/assets/layouts - ZHTML Output.png" alt=""><figcaption></figcaption></figure>

* JSON Output : if you are not using Parsley templating, then a JSON endpoint is generated with each Layout content model or content item created. This object can then be used with your framework of choice including React.

<figure><img src="../../../.gitbook/assets/layouts - JSON Output.png" alt=""><figcaption></figcaption></figure>

* Layout Preview: this is a sneak peek of what the content model or item's page layout will look like. As you are dragging components into your layout, the Layout app will generate a preview of the generated content.&#x20;

> Note that the Layout Preview does not include your instance's head tags and does not execute your instance's JavaScript. Therefore, styling and interaction may differ from the Webengine parsed source code.

* Page Preview: this preview will include your instance's headtags and JavaScript interactions. It emulates what you will see from your Stage urls.

<figure><img src="../../../.gitbook/assets/layouts - page preview.png" alt=""><figcaption></figcaption></figure>
