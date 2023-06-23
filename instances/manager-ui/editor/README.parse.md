---
description: The Web IDE is where HTML, CSS, Javascript and Parsley templates are authored.
---

# Web IDE (Code Editor)

## Overview

The Web IDE serves as the in-app editor of your instances code. Powered by the [Microsoft Monaco Editor](https://microsoft.github.io/monaco-editor/) it provides an experience similiar to [VS Code](https://github.com/Microsoft/vscode). It allows for instant development of instance code. The code which can be managed is comprised of the following types.

* [Parsley](https://zesty.org/services/web-engine/introduction-to-parsley) & HTML Views
* [Style Sheets](https://zesty.org/services/manager-ui/editor/stylesheets)&#x20;
* [JavaScript](https://zesty.org/services/manager-ui/editor/javascript)&#x20;
* Snippets
  * _Chunks of code which can be reused and included into other files_
* Custom Endpoints
  * _Allow for generating a variety of file types accessible via an instance URL_&#x20;

Access the Web IDE by selecting Web IDE from the main navigation.

![Select Web IDE from the main nav to access it.](../../../.gitbook/assets/01-ide-navigate-to-ide.png)

> In addition to the Web IDE code can be authored locally using the [Atom IDE package](https://zesty.org/tools/atom-package).

## Keyboard Shortcuts

### Standard

**Saving:** CTRL/CMD+s\
**Copy:** CTRL/CMD+c\
**Paste:** CTRL/CMD+v\
**Search:** CTRL/CMD+f

### Movement

**Skip word right:** CTRL/CMD+right arrow\
**Skip word left:** CTRL/CMD+left arrow\
**Highlight word right:** CTRL/CMD+shift+right arrow\
**Highlight word left:** CTRL/CMD+shift+left arrow\
**Highlight lines up:** CTRL/CMD+shift+up arrow\
**Highlight lines below:** CTRL/CMD+shift+down arrow\
**Hightlight multiple selections:** CTRL/CMD+d

## HTML Views

For every [Schema](https://zesty.org/services/manager-ui/schema) model created there is an associated model view created with the same model reference name. These model views allow for author HTML documents. e.g. Markup, Inline style sheets and JavaScript. HTML Views are located at the top of the left-hand sidebar which is shown outlined in purple below.

![HTML Views are are located in the left-hand sidebar of the Web IDE.](../../../.gitbook/assets/02-ide-views.png)

### Templating With Parsley

Along with HTML you can use the [Parsley templating language](https://zesty.org/services/web-engine/introduction-to-parsley) to dynamically reference your models and their fields. By using Parsley to reference model fields you are making the content rendered dynamic. In addition the Web IDE has the ability to auto-suggest the properties of your schema. For example, if you wanted to loop through a set of items, after typing `each` a list of content model names is shown for you to choose from and the completed statement would be similar to the each loop declaration below.

`{{each products as product sort by product.id asc}}`

Therefore you can build your schema and develop against it instantly which allows your content editors and developers to work concurrently.

[Give Parsley a try,](https://parsley.zesty.io/) we are confident you will enjoy it.

## Style Sheets

Zesty.io is equipped to compile LESS, SCSS, and CSS files for styling. There is no need to download any preprocessors. Simply add your code and the style sheets will integrate seamlessly. Learn more about style sheets [here](https://zesty.org/services/manager-ui/editor/stylesheets). Style sheets are located in the left-hand sidebar in a section called Site.CSS which is outlined in purple below.

![Style sheets are located in the left-hand sidebar of the Web IDE.](../../../.gitbook/assets/03-ide-styles.png)

## JavaScript

Similarly JavaScript files are ready to to be added and edited. These are rendered and linked in the head of the instance following the style sheets. Learn more about JavaScript [here](https://zesty.org/services/manager-ui/editor/javascript). JavaScript files are located in the left-hand sidebar in a section called Site.JS which is outlined in purple below.

![JavaScript files are located in the left-hand sidebar of the Web IDE.](../../../.gitbook/assets/04-ide-javascript.png)

## Snippets

Snippets allow for resuable pieces of code which can be included into other views. They work well for dynmaic sections of content which do not require URLs. e.g. A contact form. Building this as a snippet allows for it's reuse across a website. Learn more about creating and using snippets [here](https://zesty.org/guides/using-snippets).

## Custom Endpoints

Every instance is able to serve custom endpoints, all of which have access to your instances models. These are files created in the Web IDE which get their URL and file extension determined by the provided file name. Their URLs follow the pattern of `example.org/-/custom/MY-ENDPOINT-FILE-NAME.EXT`. Zesty.io hosted domains must allow for the root level directory of `/-/` being reserved for routing by Zesty.io. This the platforms signal for routing to specific internal services.

**Supported Custom Endpoint Extensions:**

* `.csv`
* `.tsv`
* `.js`
* `.rss`
* `.xml`
* `.otf`
* `.png`
* `.svg`
* `.ics`
* `.json`
* `.css`
* `.html`
* `.markdown`
* `.md`
* `.vcf`
* `.txt`

> Do not see a file extension you need? The platform is designed to allow for additional file formats. [Get in touch with us](https://www.zesty.io/).

## Multitenancy

Zesty.io is a multi-tenant platform. This means there are multiple independent users operating against a shared environment. In other words, team members and yourself can work on the same files. While this provides powerful collaborative workflows it introduces some complex questions for the application to answer. One of those being, when two or more users are working on the same file and introduce different changes which is the correct one?

The Web IDE is powered by the [instances API](https://zesty.org/apis/instances-api) which takes a simple approach of the last request made is the current state of the data. Meaning if you are working on `file A` and save the following code `var foo = "bar"` but then afterwards a team member is working on the same `file A` and saves the code `var foo = "baz"` then that will be the current state of the code when it is next requested.

What to do then when you have multiple changes being built at the same time? E.G. A developer is working on the new homepage redesign while another developer is updating the current homepage title. This is where the external concept of version control comes in handy. Version control provides workflows which allow you to "branch" and "merge" code in these complex situtations. It is a very well solved problem and as such isn't something we look to reimplement. How can you combine version control on your computer with the remotely hosted code on Zesty.io? By using our [Atom IDE package](https://zesty.org/tools/atom-package) you can integrate development workflows on your computer with your remote Zesty.io instance.

### Local Storage

In a multitenant application you can have changes locally which differ from the remote state as well as your fellow team members local state. When developing locally using the Atom IDE package you get the benefit of your operating systems file storage which can contain changes even if they have not been synced to the remote instance. Providing you with confidence your in development work will not be lost if a remote file changes. In the Web IDE we use the [localStorage browser API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to achieve the same affect. This means if working on a file and you change views or close your browser your work will not be lost. _One caveat to this is when a view is deleted. When this happens the next time you load the Web IDE or that file it will be removed from your browsers localStorage_.

### Syncing

If your, in development, work is stored in your browsers localStorage what to do then when the remote file has changed? This is handled by syncing. Whenever you edit a file the Web IDE marks it as `dirty`. This means it has changes which need to be saved in order to presist them on the instance making the changes available to other team members. Sometimes the file is changed by another team member before you are able to save your Web IDE changes. Whenever a file change is saved we make a new version and when you load a file we fetch the latest from your instance. If your Web IDE file is behind the latest remote file version and has unsaved changes (a.k.a is `dirty`) we mark it as being out-of-sync.

When a file is marked as out-of-sync the Web IDE will load the [file diffing view](https://zesty.org/services/manager-ui/editor/versions#diffing-versions) and you will need to make a choice. You will have to choose between saving your changes and overwriting the current remote file or choosing the remote file and losing your local changes. This choice allows you to think critically about which code should be the current state shared across your team.

### Renaming Files

When renaming an HTML View, navigate to the [Schema section](https://zesty.org/services/manager-ui/schema) and change the HTML View's [reference name](https://zesty.org/guides/the-connection-between-schema-content-and-code#schema).&#x20;

For Snippets, endpoints, style sheet, and JavaScript files, you'll need to create a new file with the new name, transfer your new code, and delete your old file.&#x20;
