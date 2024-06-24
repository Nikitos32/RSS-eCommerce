# RSS-eCommerce

It's a online shopping portal that provides an interactive and seamless experience to users.

Implementation of the [RSSchool eCommerce Application task](https://github.com/rolling-scopes-school/tasks/tree/master/tasks/eCommerce-Application) by Random Twenty team: @Barvinko, @DmirtyUsov, @Nikitos32.

#### Team Collaboration Tools

- [Jira](https://usov.atlassian.net/jira/software/projects/R20/boards/9)
- [Github](https://github.com/Nikitos32/RSS-eCommerce)
- Discord Server

## Technologies

- TypeScript
- React
- Vite - bundler
- Vitest - testing framework powered by Vite
- Husky
- CommerceTools [link to project](https://mc.europe-west1.gcp.commercetools.com/r20/welcome)
- Tailwind CSS

## Installation

1. Clone/download [repo](https://github.com/Nikitos32/RSS-eCommerce)
2. `npm install`
3. Rename `.env.example` to `.env` and set environment variables for _commercetools_ API Client (`VITE_CTP_*`)

## Useful commands

- `npm run build` compile typescript and deploy app for production
- `npm run dev` start Vite dev server
- `npm run format` format code with prettier
- `npm run lint` find problems in code
- `npm run preview` locally preview the production build
- `npm run test` perform the Vitest unit tests

## How to contribute
1. Request access to our [Jira board](https://usov.atlassian.net/jira/software/projects/R20/boards/9)
2. Choose issue, and assign it to yourself
3. Make new branch from latest release `release/...` with self explanatory  name in format `(chore|docs|feat|fix|refactor)/R20-{issue #}_description`
4. Contribute and push what you've changed to the remote.
5. Create a pull request to the repository on GitHub.