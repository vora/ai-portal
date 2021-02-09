# Documentation / General

## Index

- [General](https://github.com/AI-Global/ai-portal/blob/master/docs/general.md)
  - Index
  - Vocab
  - Tech Stack
  - File Structure
  - Request Flow
- [Development](https://github.com/AI-Global/ai-portal/blob/master/docs/development.md)
  - Setup
  - Commands
  - Helpful Docs
- [Deployment and CI](https://github.com/AI-Global/ai-portal/blob/master/docs/deploy.md)
  - GitHub Actions
  - Site Hosting
  - Data Hosting
- OAuth
- Email
- Database & Storage
- Scripts
- Front-end Patterns
- Back-end Patterns

## Vocab

> I thought it might help to include some vocab in case any devs are confused by our terminology.

**front-end** - the visual interface of the app, code that runs on the clients (think: React)

**back-end** - the web framework and API, code that runs in the cloud (think: ExpressJS)

**production** - the version of the app that everyone can see (think: not localhost)

**CI** - "continuous integration", automated builds and tests

## Tech Stack

> We use the fairly common and javascript-only [MERN](https://www.mongodb.com/mern-stack) stack.

#### Front-end

- [React](https://reactjs.org/)
  - [Ant Design](https://ant.design/)

#### Back-end

- [ExpressJS](https://expressjs.com/)
  - [JWT](https://jwt.io/)
  - [mongoose](https://mongoosejs.com/)
  - [REST](https://restfulapi.net/)

#### Database

- [MongoDB](https://www.mongodb.com/)
- [AWS s3](https://aws.amazon.com/s3/)

## File Structure

- `/src` - the react app
- `/src/views` - each UI page
- `/src/components` - reusable react components
- `/public` - static assets (images, compiled JS libraries, etc)
- `/api` - the express backend
- `/api/routes` - RESTful express URL routes
- `/api/models` - the database models and associated utilities
- `/api/lib` - misc backend features and utilities
- `/.vscode` - shared vscode settings for the project

## Request Flow

> An example flow through the stack. FE = frontend, BE = backend.

1. User visits https://portal.ai-global.org/settings in their browser.
2. FE: Calls `/api/context` to gather info about the portal and the current logged-in user.
3. BE: Queries user based on token provided in API call and returns result as JSON.
4. User clicks **Change Password**.
5. FE: Calls API endpoint for changing password.
6. BE: Uses firewall to verify request is valid.
7. BE: Queries user based on token, handles change password logic, return JSON.
8. FE: Shows notification UI.
