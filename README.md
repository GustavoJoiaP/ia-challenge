# ia-challenge 📜

## Environment Setup ⚙️:
> [!IMPORTANT]

>
> This project was developed using [node v22.5.1](https://nodejs.org/pt/blog/release/v22.5.1)
>
> The package manager used is [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

## How to Set Up the Development Environment:

### Clone the repository:

```bash
 git clone https://github.com/GustavoJoiaP/ia-challange.git
```

### Install dependencies:

```bash
 npm install
```

### Configure the environment:
> [!WARNING]
>
> Before starting the application, ensure that your `.env` file is set up correctly.
>
>  You can create a `.env` file at the root of the project if it doesn't exist and set necessary environment variables such as [.env.example](./.env.example) file


## DB 🗄️
### Docker:

- Build the Docker
  ```bash
  docker-compose build
  ```
- Run the container
  ```bash
   docker-compose up
  ```

### ORM: Prisma ⚡
This project uses [Prisma](https://www.prisma.io/docs/orm) as a ORM for database interactions

#### Migrations 🔁
To manage database migrations, use the following commands:
- Generate prisma client:
  ```bash
   npx prisma generate
  ```

- Create a new migration:
  ```bash
   yarn prisma migrate dev
  ```

- Run the latest migrations:
  ```bash
   yarn prisma db push
  ```

 ### Start the application 🚀:

``` bash
 yarn start:dev
```