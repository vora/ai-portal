# Documentation / OAuth

## Overview

Since the portal uses a MEAN stack, we essentially are already building a nice API that not only our front-end can use but also other apps (e.g. Design Assistent). The question becomes how should other apps use the portal API and how can they authenticate themselves (the portal front-end uses [JWTs](https://jwt.io/) for authentication). For the portal, we let other apps interact with the API using HTTPS (think: GET, POST, etc) and require that those requests contain an `Authorization` header that includes a token (aka short-term password) that tells the API who they are. If the Design Assistent wants to create a resource on behalf of a user, it will need to include a token that tells the API that it has that user's permission to do things as them.

[OAuth 2.0](https://oauth.net/2/) is an internet standard for sending a token from an API to app while also asking a user's permission. Roughly this is how it works:

1. User visits `designassistent.com` and clicks login.
2. FE (on designassistent): The user is then redirected to `portal.com/auth?code=random-secret-that-code-generated&scope=*&client_id=offical-id-of-designassistent`
3. FE and BE (on portal): The portal verifies that that a portal user is already logged in and that the `client_id` is provided valid.
4. User clicks allow.
5. FE and BE (on portal): The portal then generates a user specific `secret-temp-password-for-getting-long-term-password` token and redirect the user back to `designassistent.com` with that token in the URL.
6. FE (on designassistent): detects this token in the URL and calls `POST portal.com/api/oauth/token` with it. The portal verifies the token and returns a access token which `designassistent.com` can use in the `Authorization` header when calling the portal API.
7. FE and BE (on designassistent): The front-end now calls `POST designassistent.com/login` with this access token and the back-end uses it to create a copy of a user's portal account and log them in.

## Future Work

- The existing OAuth flow is currently implemented from scratch (just cause, probably not a great idea). If future devs run in to issues, it may be good to switch out our implementation with an official library.
- Scope is currently ignored and defaults to `*` (allow all). If non-offical/untrusted apps are added in the future, this should be fixed.
- For adding support for new OAuth apps one needs to update `SUPPORTED_CLIENTS` in `oauth.routes.js`. Apps that run on different domains are considered different and should have their own entries (e.g. `designassistant-dev` and `designassistant`).
