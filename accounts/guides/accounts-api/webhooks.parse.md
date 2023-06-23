---
description: A description on Zesty Webhooks and how to use them in production.
---

# Webhooks

> **Open Perpetual Beta:** Webhooks are available to all instances. We plan on expanding the payload of the webhook to include the data an meta data of affected resource.

## Introduction

Webhooks allow for actions performed within the Zesty.io platform to trigger external actions via RESTful HTTP API calls. An example of such a use case would be to send out email or text message alerts to customers when a new blog article being published.

[REST API Documentation and Examples](https://accounts-api.zesty.org/?version=latest#f929ad7b-4bff-4f78-9376-ead64d158b9b)

## What Resources Listen for Webhooks

### Instances API

* Content Models
* Content Model Items
* Content Model Fields
* Views
* Stylesheets&#x20;
* Scripts
* Redirects
* Languages
* Instance Setting

### Accounts API

* Role
* Instance Roles
* Instance Domains
* Invites

> Webhook for Publish Actions do not trigger for any publish event greater than 30 days out.
































































## Webhook Conditions

Webhooks are executed by calling API endpoints. In order to create webhooks that will be triggered and executed by API calls, create webhooks with the following parameters. When an action occurs, such as content item creation, a search for the corresponding webhook will occur.

### Example:

An item 7-ABCD-1234 corresponding to content model 6-ABCD-1234 has been updated in instance 8-ABCD-1234. Webhooks will be triggered based on the following action conditions.

* Update on an item with ZUID 7-ABCD-1234 on an instance with ZUID 8-ABCD-1234
* Update on any item belonging to content model 6-ABCD-1234 in instance 8-ABCD-1234
* Update on any item in instance 8-ABCD-1234

## Instances API Webhook

### Create, Update, Delete and Publish Item**s**

| Condition                                     | Scoped Resource | Parent Resource | Resource   | Action  | Request URL                                                  |
| --------------------------------------------- | --------------- | --------------- | ---------- | ------- | ------------------------------------------------------------ |
| Creating a new item                           | INSTANCE\_ZUID  |                 | items      | CREATE  | POST /content/model/MODEL\_ZUID/items                        |
| Creating a new item for a given content model | INSTANCE\_ZUID  | MODEL\_ZUID     | items      | CREATE  | POST /content/model/MODEL\_ZUID/items                        |
| Updating a specific item                      | INSTANCE\_ZUID  |                 | ITEM\_ZUID | UPDATE  | PUT /content/model/MODEL\_ZUID/items/ITEM\_ZUID              |
| Updating any item for a given content model   | INSTANCE\_ZUID  | MODEL\_ZUID     | items      | UPDATE  | PUT /content/model/MODEL\_ZUID/items/ITEM\_ZUID              |
| Updating any item                             | INSTANCE\_ZUID  |                 | items      | UPDATE  | PUT /content/model/MODEL\_ZUID/items/ITEM\_ZUID              |
| Deleting a specific item                      | INSTANCE\_ZUID  |                 | ITEM\_ZUID | DELETE  | DELETE /content/model/MODEL\_ZUID/items/ITEM\_ZUID           |
| Deleting any item for a given content model   | INSTANCE\_ZUID  | MODEL\_ZUID     | items      | DELETE  | DELETE /content/model/MODEL\_ZUID/items/ITEM\_ZUID           |
| Deleting any item                             | INSTANCE\_ZUID  |                 | items      | DELETE  | DELETE /content/model/MODEL\_ZUID/items/ITEM\_ZUID           |
| Publishing any item for a given content model | INSTANCE\_ZUID  | MODEL\_ZUID     | items      | PUBLISH | POST /content/model/MODEL\_ZUID/items/ITEM\_ZUID/publishings |
| Publishing a specific item                    | INSTANCE\_ZUID  |                 | ITEM\_ZUID | PUBLISH | POST /content/model/MODEL\_ZUID/items/ITEM\_ZUID/publishings |
| Publishing any item                           | INSTANCE\_ZUID  |                 | items      | PUBLISH | POST /content/model/MODEL\_ZUID/items/ITEM\_ZUID/publishings |

### Creating, Updating and Deleting Content Models

| Condition                         | Scoped Resource | Parent Resource | Resource    | Action | Request URL                       |
| --------------------------------- | --------------- | --------------- | ----------- | ------ | --------------------------------- |
| Creating a new content model      | INSTANCE\_ZUID  |                 | models      | CREATE | POST /content/model               |
| Update a specific content model   | INSTANCE\_ZUID  |                 | MODEL\_ZUID | UPDATE | PUT /content/model/MODEL\_ZUID    |
| Updating any content model        | INSTANCE\_ZUID  |                 | models      | UPDATE | PUT /content/model/MODEL\_ZUID    |
| Deleting a specific content model | INSTANCE\_ZUID  |                 | MODEL\_ZUID | DELETE | DELETE /content/model/MODEL\_ZUID |
| Deleting any content model        | INSTANCE\_ZUID  |                 | models      | DELETE | DELETE /content/model/MODEL\_ZUID |

### Creating, Updating and Deleting Fields

| Condition                                      | Scoped Resource | Parent Resource | Resource    | Action | Request URL                                          |
| ---------------------------------------------- | --------------- | --------------- | ----------- | ------ | ---------------------------------------------------- |
| Creating a new field                           | INSTANCE\_ZUID  |                 | fields      | CREATE | POST /content/model/MODEL\_ZUID/fields               |
| Creating a new field for a given content model | INSTANCE\_ZUID  | MODEL\_ZUID     | fields      | CREATE | POST /content/model/MODEL\_ZUID/fields               |
| Updating a specific field                      | INSTANCE\_ZUID  |                 | FIELD\_ZUID | UPDATE | PUT /content/model/MODEL\_ZUID/fields/FIELD\_ZUID    |
| Updating any field for a given content model   | INSTANCE\_ZUID  | MODEL\_ZUID     | fields      | UPDATE | PUT /content/model/MODEL\_ZUID/fields/FIELD\_ZUID    |
| Updating any field                             | INSTANCE\_ZUID  |                 | fields      | UPDATE | PUT /content/model/MODEL\_ZUID/fields/FIELD\_ZUID    |
| Deleting a specific field                      | INSTANCE\_ZUID  | FIELD\_ZUID     | DELETE      | DELETE | DELETE /content/model/MODEL\_ZUID/fields/FIELD\_ZUID |
| Deleting any field for a given content model   | INSTANCE\_ZUID  | MODEL\_ZUID     | fields      | DELETE | DELETE /content/model/MODEL\_ZUID/fields/FIELD\_ZUID |
| Deleting any field                             | INSTANCE\_ZUID  |                 | fields      | DELETE | DELETE /content/model/MODEL\_ZUID/fields/FIELD\_ZUID |

### Creating, Updating and Deleting Views

| Condition                | Scoped Resource | Parent Resource | Resource   | Action | Request URL                  |
| ------------------------ | --------------- | --------------- | ---------- | ------ | ---------------------------- |
| Creating a new view      | INSTANCE\_ZUID  |                 | views      | CREATE | POST /web/views              |
| Update a specific view   | INSTANCE\_ZUID  |                 | VIEW\_ZUID | UPDATE | PUT /web/views/VIEW\_ZUID    |
| Updating any view        | INSTANCE\_ZUID  |                 | views      | UPDATE | PUT /web/views/VIEW\_ZUID    |
| Deleting a specific view | INSTANCE\_ZUID  |                 | VIEW\_ZUID | DELETE | DELETE /web/views/VIEW\_ZUID |
| Deleting any view        | INSTANCE\_ZUID  |                 | views      | DELETE | DELETE /web/views/VIEW\_ZUID |

### Creating, Updating and Deleting Stylesheets

| Condition                      | Scoped Resource | Parent Resource | Resource         | Action | Request URL                      |
| ------------------------------ | --------------- | --------------- | ---------------- | ------ | -------------------------------- |
| Creating a new stylesheet      | INSTANCE\_ZUID  |                 | stylesheets      | CREATE | POST /web/scripts                |
| Update a specific stylesheet   | INSTANCE\_ZUID  |                 | STYLESHEET\_ZUID | UPDATE | PUT /web/scripts/SCRIPT\_ZUID    |
| Updating any stylesheet        | INSTANCE\_ZUID  |                 | scripts          | UPDATE | PUT /web/scripts/SCRIPT\_ZUID    |
| Deleting a specific stylesheet | INSTANCE\_ZUID  |                 | SCRIPT\_ZUID     | DELETE | DELETE /web/scripts/SCRIPT\_ZUID |
| Deleting any stylesheet        | INSTANCE\_ZUID  |                 | scripts          | DELETE | DELETE /web/scripts/SCRIPT\_ZUID |

### Creating, Updating and Deleting Scripts

| Condition                  | Scoped Resource | Parent Resource | Resource     | Action | Request URL                      |
| -------------------------- | --------------- | --------------- | ------------ | ------ | -------------------------------- |
| Creating a new script      | INSTANCE\_ZUID  |                 | scripts      | CREATE | POST /web/scripts                |
| Update a specific script   | INSTANCE\_ZUID  |                 | SCRIPT\_ZUID | UPDATE | PUT /web/scripts/SCRIPT\_ZUID    |
| Updating any script        | INSTANCE\_ZUID  |                 | scripts      | UPDATE | PUT /web/scripts/SCRIPT\_ZUID    |
| Deleting a specific script | INSTANCE\_ZUID  |                 | SCRIPT\_ZUID | DELETE | DELETE /web/scripts/SCRIPT\_ZUID |
| Deleting any script        | INSTANCE\_ZUID  |                 | scripts      | DELETE | DELETE /web/scripts/SCRIPT\_ZUID |

### Creating, Updating and Deleting Redirects

| Condition                    | Scoped Resource | Parent Resource | Resource       | Action | Request URL                          |
| ---------------------------- | --------------- | --------------- | -------------- | ------ | ------------------------------------ |
| Creating a new redirect      | INSTANCE\_ZUID  |                 | redirects      | CREATE | POST /web/redirects                  |
| Update a specific redirect   | INSTANCE\_ZUID  |                 | REDIRECT\_ZUID | UPDATE | PUT /web/redirects/REDIRECT\_ZUID    |
| Updating any redirect        | INSTANCE\_ZUID  |                 | redirects      | UPDATE | PUT /web/redirects/REDIRECT\_ZUID    |
| Deleting a specific redirect | INSTANCE\_ZUID  |                 | REDIRECT\_ZUID | DELETE | DELETE /web/redirects/REDIRECT\_ZUID |
| Deleting any redirect        | INSTANCE\_ZUID  |                 | redirects      | DELETE | DELETE /web/redirects/REDIRECT\_ZUID |

### Creating, Updating and Deleting Langs

| Condition                    | Scoped Resource | Parent Resource | Resource | Action | Request URL                |
| ---------------------------- | --------------- | --------------- | -------- | ------ | -------------------------- |
| Creating a new language      | INSTANCE\_ZUID  |                 | langs    | CREATE | POST /env/langs            |
| Update a specific language   | INSTANCE\_ZUID  |                 | LANG\_ID | UPDATE | PUT /env/langs/LANG\_ID    |
| Updating any language        | INSTANCE\_ZUID  |                 | langs    | UPDATE | PUT /env/langs/LANG\_ID    |
| Deleting a specific language | INSTANCE\_ZUID  |                 | LANG\_ID | DELETE | DELETE /env/langs/LANG\_ID |
| Deleting any language        | INSTANCE\_ZUID  |                 | langs    | DELETE | DELETE /env/langs/LANG\_ID |

### Creating, Updating and Deleting Settings

| Condition                   | Scoped Resource | Parent Resource | Resource       | Action | Request URL                         |
| --------------------------- | --------------- | --------------- | -------------- | ------ | ----------------------------------- |
| Creating a new setting      | INSTANCE\_ZUID  |                 | settings       | CREATE | POST /env/settings                  |
| Update a specific setting   | INSTANCE\_ZUID  |                 | SETTINGS\_ZUID | UPDATE | PUT /env/settings/SETTINGS\_ZUID    |
| Updating any setting        | INSTANCE\_ZUID  |                 | settings       | UPDATE | PUT /env/settings/SETTINGS\_ZUID    |
| Deleting a specific setting | INSTANCE\_ZUID  |                 | SETTINGS\_ZUID | DELETE | DELETE /env/settings/SETTINGS\_ZUID |
| Deleting any setting        | INSTANCE\_ZUID  |                 | settings       | DELETE | DELETE /env/settings/SETTINGS\_ZUID |

### Creating, Updating and Deleting Leads

## Accounts API Webhook

### Roles

| Condition           | Scoped Resource | Parent Resource | Resource | Action | Request URL |
| ------------------- | --------------- | --------------- | -------- | ------ | ----------- |
| Creating a new role | INSTANCE\_ZUID  |                 | roles    | CREATE | POST /roles |

### Instance Roles

| Condition                      | Scoped Resource | Parent Resource | Resource | Action | Request URL                          |
| ------------------------------ | --------------- | --------------- | -------- | ------ | ------------------------------------ |
| Generating a new Instance Role | INSTANCE\_ZUID  | INSTANCE\_ZUID  | roles    | CREATE | POST /instances/INSTANCE\_ZUID/roles |

### Instance Domains

| Condition | Scoped Resource | Parent Resource | Resource | Action | Request URL |
| --------- | --------------- | --------------- | -------- | ------ | ----------- |

| Create domain for a given instance | INSTANCE\_ZUID |   | domains | CREATE | POST /instances/INSTANCE\_ZUID/domains |
| ---------------------------------- | -------------- | - | ------- | ------ | -------------------------------------- |

| Update a specific domain for a given instance | INSTANCE\_ZUID |   | DOMAIN\_ZUID | UPDATE | PUT /instances/INSTANCE\_ZUID/domains/DOMAIN\_ZUID |
| --------------------------------------------- | -------------- | - | ------------ | ------ | -------------------------------------------------- |

| Update any domain for a given instance | INSTANCE\_ZUID |   | domains | UPDATE | PUT /instances/INSTANCE\_ZUID/domains/DOMAIN\_ZUID |
| -------------------------------------- | -------------- | - | ------- | ------ | -------------------------------------------------- |

| <p>Delete</p><p>a specific domain for a given instance</p> | INSTANCE\_ZUID |   | DOMAIN\_ZUID | DELETE | DELETE /instances/INSTANCE\_ZUID/domains/DOMAIN\_ZUID |
| ---------------------------------------------------------- | -------------- | - | ------------ | ------ | ----------------------------------------------------- |

| <p>Delete</p><p>any domain for a given instance</p> | INSTANCE\_ZUID |   | domains | DELETE | DELETE /instances/INSTANCE\_ZUID/domains/DOMAIN\_ZUID |
| --------------------------------------------------- | -------------- | - | ------- | ------ | ----------------------------------------------------- |

| Condition         | Scoped Resource | Parent Resource | Resource     | Action | Request URL                  |
| ----------------- | --------------- | --------------- | ------------ | ------ | ---------------------------- |
| Create Invite     | INSTANCE\_ZUID  |                 | invites      | CREATE | POST /invites                |
| Respond to Invite | INSTANCE\_ZUID  |                 | INVITE\_ZUID | UPDATE | PUT /invites/INVITE\_ZUID    |
| Delete Invite     | INSTANCE\_ZUID  |                 | INVITE\_ZUID | DELETE | DELETE /invites/INVITE\_ZUID |
