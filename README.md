# boilerplate-nodejs-fastify 📜

## Environment Setup ⚙️:
> [!IMPORTANT]
> **Make sure you have [nvm](https://github.com/nvm-sh/nvm) installed on your machine.**
>
> This project was developed using [node v22.13.1 (LTS)](https://nodejs.org/en/download)
>
> The package manager used is [npm](https://www.npmjs.com/)

## How to Set Up the Development Environment:

### Clone the repository:

```bash
$ git clone https://github.com/joaomacedx/boilerplate-nodejs-fastify
```

### Install dependencies:

```bash
$ npm install
```

### Configure the environment:
> [!WARNING]
>
> Before starting the application, ensure that your `.env` file is set up correctly.
>
>  You can create a `.env` file at the root of the project if it doesn't exist and set necessary environment variables such as [.env.example](./.env.example) file

### Start the application 🚀:

``` bash
$ npm run start
```

## DB 🗄️
### Query Builder: Knex ⚡
This project uses [Knex.js](https://knexjs.org/) as a query builder for database interactions

#### Migrations 🔁
To manage database migrations, use the following commands:

- Create a new migration:
  ```bash
  $ npm run migrate:make migration_name
  ```

- Run the latest migrations:
  ```bash
  $ npm run migrate:latest
  ```

- Rollback the latest migration:
  ```bash
  $ npm run migrate:rollback
  ```