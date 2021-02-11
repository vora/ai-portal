# Documentation / Email

## Overview

We use the free tier of [SendGrid](https://sendgrid.com/) for sending emails (our API key is stored in the environment variable `SENDGRID_API_KEY`). A new email format can be added by creating a `newEmailName.email.js` file (see the existing ones for what should be in it) and calling:

```javascript
await email.send.newEmailName(userEmail, { foo: 'bar' });
```

## Limitations

- SendGrid restricts the max number of emails we can send to 100/day
- We can only send email (make sure this is clear when writing/formatting emails that we wont reply)
- If too many sent emails go unopened, our emails will start getting marked as spam
