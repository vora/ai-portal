# Documentation / Deployment and CI

## GitHub Actions

For our CI, we use GitHub's built-in [GitHub Actions](https://docs.github.com/en/actions) as defined by this [config file](https://github.com/AI-Global/ai-portal/tree/master/.github/workflows). All this does it check for front-end build errors. In the future this is where things like unit and integration tests should be added. In an ideal world, master should always have a check (meaning no build errors) and PRs should not be merged until there are passing.

## Site Hosting

### Site

Both the front-end and back-end are run on the same [Heroku](https://www.heroku.com/dynos) dyno (think: very small and cheap server) which runs `$ node server.js`. Heroku settings can be viewed at [dashboard.heroku.com/apps/ai-global-portal](https://dashboard.heroku.com/apps/ai-global-portal). Here one can also find production's environment variables, DNS settings, server logs, and error metrics. HTTP**S** is handled completely by Heroku.

### DNS

A single `CNAME` record in namesilo directs `portal.ai-global.org` to Heroku.

### Auto-Deploy

Heroku is current set to automatically deploy anything that's pushed to master. This means it's very important to verify PRs work before merging into master. In the event that a bad PR breaks production, one can easily (and only temporarily) roll back to an old version of the code in the Heroku settings.

##### Cost: ~$5/month

## Data Hosting

### Users, Resources, etc.

Our MongoDB database is hosted on [Atlas](https://www.mongodb.com/cloud/atlas) for free (up to 512MB). Atlas settings can be view at [cloud.mongodb.com/v2/5f9f71470cc0b741eab50a50](https://cloud.mongodb.com/v2/5f9f71470cc0b741eab50a50#clusters). The "collections" tab can be very useful for editing database objects manually. Note: `MONGODB_URL` is effectively the password for this, **NEVER** commit or share it.

##### Cost MongoDB: free

### Files

File storage is handled by [AWS s3](https://aws.amazon.com/s3/). The storage bucket can be accessed and edited at [s3.console.aws.amazon.com/s3/buckets/ai-portal-files](https://s3.console.aws.amazon.com/s3/buckets/ai-portal-files?region=us-east-2&tab=objects). Note 1: Everything in the `ai-portal-files` bucket is public, **NEVER** store confidential information there. Note 2: The current [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) settings only allow access from the portal (although this is easily updatable).

##### Cost s3: ~$0-10/month
