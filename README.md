## Introduction
This boilerplate project is built with NestJS and includes Docker support, Prisma for database management, and integrated authentication and authorization mechanisms. It is designed to provide a solid foundation for developing scalable and maintainable server-side applications.

## Features
- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **Docker**: Containerization for consistent development and production environments.
- **Prisma**: Modern database toolkit to query, migrate, and model your data.
- **Authentication**: Built-in JWT authentication.
- **Authorization**: Role-based access control.

## Getting Started

### Prerequisites
- Node.js (>=18.x)
- Docker and Docker Compose
- MySQL (or any other Prisma-supported database)

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/GabrielSoares-Dev/Boilerplate-nestjs-docker.git
    cd Boilerplate-nestjs-docker
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

### Environment Setup
1. Create a `.env` file in the root directory and configure the necessary environment variables. Refer to the `.env.example` file for guidance.

## Commands
- **Build the project**: `npm run build`
- **Format the code**: `npm run format`
- **Type check the project**: `npm run typecheck`
- **Start the application**:
  - Development: `npm run start:dev`
  - Debug: `npm run start:debug`
  - Production: `npm run start:prod`
- **Start the Docker containers**: `npm run server:up`
- **Lint the code**:
  - Check: `npm run lint:test`
  - Fix: `npm run lint:fix`
- **Run tests**:
  - All tests: `npm run test`
  - Unit tests: `npm run test:unit`
  - Integration tests: `npm run test:integration`
  - Test coverage: `npm run test:coverage`
  - Watch tests: `npm run test:watch`
  - Debug tests: `npm run test:debug`
- **Database migrations**:
  - Local: `npm run migrate:local`
  - Test: `npm run migrate:test`
  - Production: `npm run migrate:prod`
- **Seed the database**: `npm run seed`
- **Prepare Husky for git hooks**: `npm run prepare`
- **Commit using Commitizen**: `npm run commit`

## Running the Application

### Development
1. Start the Docker containers:
    ```bash
    npm run server:up
    ```

2. Start the NestJS application:
    ```bash
    npm run start:dev
    ```

### Production
1. Build the project:
    ```bash
    npm run build
    ```

2. Start the application:
    ```bash
    npm run start:prod
    ```

## Database Migrations
To apply database migrations, use the following commands:
- **Local environment**:
    ```bash
    npm run migrate:local
    ```
- **Test environment**:
    ```bash
    npm run migrate:test
    ```
- **Production environment**:
    ```bash
    npm run migrate:prod
    ```

## Testing
To run the tests, use the following commands:
- **Run all tests**:
    ```bash
    npm run test
    ```
- **Run unit tests**:
    ```bash
    npm run test:unit
    ```
- **Run integration tests**:
    ```bash
    npm run test:integration
    ```
- **Check test coverage**:
    ```bash
    npm run test:coverage
    ```
- **Watch tests**:
    ```bash
    npm run test:watch
    ```
- **Debug tests**:
    ```bash
    npm run test:debug
    ```

## Linting
To check and fix linting issues, use the following commands:
- **Check linting**:
    ```bash
    npm run lint:test
    ```
- **Fix linting issues**:
    ```bash
    npm run lint:fix
    ```

## Seeding the Database
To seed the database with initial data, use the following command:
```bash
npm run seed
```


## Docs

You can find the complete API documentation at the following Postman link:

[![Running on postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/37022898/2sA3kRHi7u)

## By Gabriel Soares Maciel
