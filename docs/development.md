# Documentation / Development

## Setup

#### Requirements

- You will need to use [vscode](https://code.visualstudio.com/) in order to use our auto-formatting tools and linting.
- You'll need [yarn](https://classic.yarnpkg.com/en/docs/install/) to install packages. If you ever see a `package-lock.json` file, you've done something wrong (delete it and run `yarn install`).

#### Environment Variables

> Do not use the same `MONGODB_URL` that is used in production. If you want a database for development, you can just create a free one with [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

```bash
MONGODB_URL=mongodb+srv...secret...
REACT_APP_API_BASE_URL=http://localhost:5000

// Optional
SENDGRID_API_KEY=SG....secret...
FEEDBACK_EMAIL=name@responsible.ai
DISABLE_FIREWALL=true
```

### Commands

```
$ git clone https://github.com/AI-Global/ai-portal && cd ai-portal
$ yarn install
$ yarn watch:api
```

see `/package.json` (next to `"scripts"`) for more handy yarn commands like `yarn build`.

## Helpful Docs

- [ExpressJS](https://expressjs.com/en/5x/api.html)
- [Mongoose](https://mongoosejs.com/docs/guide.html)
- [Ant Design Components](https://ant.design/components/overview/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [General Docs](https://github.com/AI-Global/ai-portal/blob/master/docs/general.md)
- [Front-end Patterns](https://github.com/AI-Global/ai-portal/blob/master/docs/fe-patterns.md) and [Back-end Patterns](https://github.com/AI-Global/ai-portal/blob/master/docs/be-patterns.md)
