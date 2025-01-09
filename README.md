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

## Installation

### Local development

1. Clone the gith repository `git clone https://github.com/oliverbarreto/podcastarr-web.git`
2. Run `npm install`
3. Add `.env` file with database connection string:

```yaml
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

# For local development
DATABASE_URL="file:./dev.db"
```

4. Run `npx prisma migrate dev --name init` to create the database and make it available to the application. The Schema is already in the code. This command did three things:

- It creates a new SQL migration file for this migration in the `prisma/migrations` directory.
- It executes the SQL migration file against the database.
- It runs prisma generate under the hood (which installed the `@prisma/client` package and generates a tailored **Prisma Client API** based on your models).

5. Run `npm run dev` to test locally

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

## Deploy

### Deploy on Docker

0. Add `.env` file with `DATABASE_URL` with DB location for prisma client

1. Add Dockerfile.dev, add `output: "standalone"` to `next.config.mjs`

2. Build the Docker image
   `docker build -t nextjs-app-dev -f Dockerfile.dev .`

3. Run the container
   `docker run -p 3000:3000 nextjs-app-dev`

4. Maybe you want to seed the database: Seed the database using the script in `prisma/seed.ts`
   `docker exec -it nextjs-app-dev npm run seed`

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Getting Started with Next.js

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
