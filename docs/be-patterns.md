# Documentation / Back-end Patterns

## Overview

Here you can find misc info about the back-end code. Related files: `server.js`, `/api/lib`, `/api/models`, and `/api/routes`.

## Patterns

### `nodemon`

[Nodemon](https://nodemon.io/) is a tool used for auto-restarting the server when files are changed and is automatically called when you use `yarn watch`. It's important that all back-end run-on-startup code (mainly everything in `server.js`) is [idempotent](https://stackoverflow.com/questions/1077412/what-is-an-idempotent-operation) such that restarting doesn't change parts of the database or app. Nodemon can be configured with `nodemon.json`.

### `server.js`

This is the main script for the backend and is called directly by Heroku when the server is deployed. The script is comprised of 3 parts:

1. Setting up [middleware](https://expressjs.com/en/guide/using-middleware.html). For forcing HTTPS, redirect to front-end files, extracting header tokens, and enabling CORS.
2. Connecting to MongoDB (this is only done once).
3. Starting the HTTP server that serves API routes.

### `api/lib/firewall.js`

To secure endpoints from hackers we use a very simple firewall system that acts as an [allow-list](https://en.wikipedia.org/wiki/Whitelisting) on all of our endpoints. To use it, just define an endpoint normally along with a permissions object and optionally an owner-test function (if not provided, the firewall assumes no owner). Permissions objects are in the format `{name of role: [fields role can send]}` where fields come from query and url params as well as json request body. Owners is a generic role that can be defined differently for different routes (for resources, an owner is the person who created the resource).

```javascript
ACCESS_LEVELS = {
  public: { betterThan: [] },
  user: { betterThan: ['public'] },
  owner: { betterThan: ['public', 'user'] },
  mod: { betterThan: ['public', 'user'] },
  admin: { betterThan: ['public', 'user', 'owner', 'mod'] },
};
```

Fields can also be inherited to make permissions easier to write and consistent, for example `{user:['x']}` is the same as `{user:['x'], mod:['x'], owner:['x'], admin:['x']}`. Notice `mod` is not better than `owner`. This means a mod by default can not edit things that only an owner (and admin) can.

```javascript
// Normal insecure code
app.get('/secret/admin/endpoint', (req, res) => {...})

// With firewall (allowing only admin with no fields)
firewall.get('/secret/admin/endpoint', (req, res) => {...}, {admin: []})

// With firewall (allowing only admins and "owners" with 'abc' field)
//  isOwner is a function defined elsewhere that returns a Promise<Boolean>
firewall.get('/secret/endpoint', (req, res) => {...}, {owner: ['abc']}, isOwner)
```

The firewall can be disabled in development by setting the environment variable `DISABLE_FIREWALL` to `true`.

### `api/lib/queries.js`

This file is a utilities class for doing MongoDB queries. Hopefully these don't have to be edited in the future and I would recommend looking at how they are used rather than the code itself to figure out how they work. Likely any search or multi-model update functions added in the future will make use of these.

Note: Many-To-Many fields on MongoDB (at least the way we use it) are stored on both models (e.g. the organization model has a list of resources and the resources model has a list of organizations). This makes updates tricky as one needs to make sure both get updated at the same time. This is where `queries.js` is useful.

### `api/lib/email.js`

See [email](https://github.com/AI-Global/ai-portal/blob/master/docs/email.md) docs.

### `api/lib/aws.js`

There's not much here, but it's important to understand how file uploads work.

- **Traditional form uploads** - When a user submits a form they include a large binary blob of the file they are uploading. The form data and the file blob are uploaded to the server. The server then uploads the blob to it's file storage service (e.g. AWS s3).
- **Ours** - When a user adds a file in the UI the frontend requests from the API a "Signed PUT URL" which is essentially a one-time URL for uploading a single file no-questions-asked to AWS s3. The upload then takes place completely between the front-end and the file storage service and before the user clicks submit. When the user submits all that's sent to the server is the location the file was uploaded. This saves a lot of back-end bandwidth and is much faster.

### `api/models/enums.js`

Anything that has a constant discrete type should be defines as an enum. These are read directly by the database models so be careful when editing (look at all references to the enum before any modifications). While MongoDB is very flexable, it's best to change these at little as possible (adding an enum class is fine, just editing or removing them can be highly error-prone).

### `api/models/*.model.js`

These files contain the ground-truth schemas for all of our models. As above, be very cautious when editing these files. If you are running the server using `watch`, your changes will affect the database as soon as you save the file so be careful. Use [built-in types](https://mongoosejs.com/docs/schematypes.html) whenever possible. Mongoose supports a lot of fancy scheme features (e.g. hooks and virtuals), but we use model utils (described below) to accomplish the same things. Any edits to a scheme should be accompanied by changes to the models associated routes (also firewall rules) and util files. If sensitive fields are added ensure they they are not exposed by the API.

### `api/models/*.util.js`

Model util files store every possible operation that one might want to do on a model from search to serialization (think: toJSON) to updates. Any logic related to a model should be ideally placed here rather than in a model or route file. All util functions assume the correct permissions are already met so ensure calls from API routes are secure.

### `api/routes/*.routes.js`

Route files are the translate between HTTP calls from the front-end to the actually operations they entail. Routes should be short and simple since most logic should be handled by utils. Every route takes the form of:

1. Check that the request is ok with firewall rules
2. Extract parameters from the request
3. If required, reformat parameters
4. Call appropriate util functions
5. If returning a model object, run it through the correct `toJSON` function
6. `res.json(...)`

### `api/*/index.js`

You'll notice `index.js` files around the codebase. All these do is automatically import files in the same directory. This makes it so that adding e.g. a route file doesn't require patching imports everywhere to include its addition.
