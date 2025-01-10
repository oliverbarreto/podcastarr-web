<div align="center">
  <a href="https://oliverbarreto.com">
    <img src="https://www.oliverbarreto.com/images/site-logo.png" />
  </a>
</div>
</br>
</br>
<div align="center">
  <h1>🎧 Podcastarr | When Podcast killed the Youtube Video Start </h1>
  <strong>Self-hosted application that allows creating a personal podcast channel with episodes created extracting audio from Youtube videos</strong>
  </br>
  </br>
  <p>Created with ❤️ by Oliver Barreto</p>
</div>

</br>
</br>

## Introduction

There is a better way to enjoy interesting media content than watching videos.

Create your pesonal podcast channel made of youTube videos of your choice and start listening to your channel whenever you want, on-the-go, on the bus, at the gym, etc.

This is a personal project designed to be self-hosted and deployed on a server as open source project for personal use.

It is perfect for homelab enthusiasts and people who want to create a podcast channel with episodes created extracting audio from Youtube videos of different topics to listen to them whenever you want.

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)

  - Server components
  - Server actions

- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide React Icons](https://lucide.dev/icons)
- [Prisma](https://prisma.io/)
- [SQLite](https://www.sqlite.org/)
- [Recharts Graph Library](https://recharts.org/)
- [Zustand](https://zustand.docs.pmnd.rs/)
- [Docker](https://www.docker.com/)
- [nginx proxy manager](https://nginxproxymanager.com/) this is a pre-requisite for the project to work with iTunes Podcast / Apple Podcasts. The RSS Feed of the podcast channel is required by Apple Podcasts to be accessible via https.

Future:

- [Resend](https://resend.com/)
- [Redis](https://redis.io/) or [Upstash](https://upstash.com/)
- [Neon Postgres](https://neon.tech/)

## Features

- [x] Create a personal podcast channel with episodes created extracting audio from Youtube videos

## Local Development

### Prerequisites for local development

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Local development

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

1. Clone the gith repository

```bash
git clone https://github.com/oliverbarreto/podcastarr-web.git
cd podcastarr-web
```

2. Install the dependencies:

```bash
npm install
```

The package.json has the dependencies for the project, including `prisma` and `@prisma/client`.

- Must have installed first `npm install prisma --save-dev` and `npm install prisma/client`
- [Prima Getting Started docs with SQLite](https://www.prisma.io/docs/getting-started/quickstart-sqlite)

3. Setup Variables by adding `.env` in the root directory of the project using the template 'env.example' file with database connection string:

```yaml
# For local development
DATABASE_URL="file:./dev.db"
```

If you are goig to use docker make sure to change the file location in '.env' file and use `DATABASE_URL="file:/app/prisma/dev.db"`

4. Run `npx prisma migrate dev --name init` to create the database and make it available to the application. The Schema is already in the code. This command did three things:

5. Run `npx prisma migrate dev --name init` to create the database and make it available to the application. The Schema is already in the code. This command did three things:

- It creates a new SQL migration file for this migration in the `prisma/migrations` directory.
- It executes the SQL migration file against the database.
- It runs prisma generate under the hood (which installed the `@prisma/client` package and generates a tailored **Prisma Client API** based on your models).

5. First, run the development server locally:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Prisma Database setup in development

- https://www.prisma.io/docs/getting-started/quickstart-sqlite

1. Then, install the Prisma CLI as a development dependency in the project:

`npm install prisma --save-dev`

Finally, set up Prisma ORM with the init command of the Prisma CLI:

`npx prisma init --datasource-provider sqlite`

2. Add schema.prisma file to the project
   The Prisma schema provides an intuitive way to model data. Add the following models to your schema.prisma file:

This creates a new prisma directory with a schema.prisma file and configures SQLite as your database. You're now ready to model your data and create your database with some tables.

3. At this point, you have a Prisma schema but no database yet. Run the following command in your terminal to create the SQLite database and the User and Post tables represented by your models in the schema.

Run a migration to create your database tables with Prisma Migrate with:
`npx prisma migrate dev --name init` to create the database and make it available to the application

(Run: `npm run seed` to test and seed the database with a test podcast channel)

This command did three things:

- It created a new SQL migration file for this migration in the prisma/migrations directory.
- It executed the SQL migration file against the database.
- It ran prisma generate under the hood (which installed the @prisma/client package and generated a tailored Prisma Client API based on your models).

Because the SQLite database file didn't exist before, the command also created it inside the prisma directory with the name dev.db as defined via the environment variable in the .env file.

Congratulations, you now have your database and tables ready. Let's go and learn how you can send some queries to read and write data!

## Deploy with Docker

0. Copy the contents of the project to a folder in your server

1. Modify `.env` file with `DATABASE_URL` with DB location for prisma client for Docker location:

```bash
DATABASE_URL="file:/app/prisma/dev.db"
```

2. Add Dockerfile.dev, add `output: "standalone"` to `next.config.mjs` if not already added

3. Run Docker compose file to run the project:

```bash
docker compose up -d --build
```

> NOT USED:
> Maybe you want to seed the database: Seed the database using the script in `prisma/seed.ts` > `docker exec -it nextjs-app-dev npm run seed`

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More about Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
