# Backend-Task
A backend API for a task manager application using Bun as the runtime environment and Elysia as the server framework. The API
will support creating, viewing, editing, and deleting tasks and will include basic state management.

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the API](#running-the-api)
- [API Structure](#api-structure)
- [API Documentation](#api-documentation)
- [Endpoints](#endpoints)
  - [Authentication](#authentication)
    - [Sign Up](#sign-up)
    - [Sign In](#sign-in)
  - [Tasks](#tasks)
    - [Create Task](#create-task)
    - [Read All Tasks](#read-task)
    - [Read One Task](#read-task)
    - [Update Task](#update-task)
    - [Delete Task](#delete-task)

## Prerequisites

Before you run the API, make sure you have the following prerequisites installed:

1. **Bun:** This API uses `bun` as a runtime environment. Download and install `bun` by following the instructions on the [Bun official website](https://bun.sh/docs/installation).

   ```bash
   curl -fsSL https://bun.sh/install | bash

2. **MongoDB Server:** Ensure you have MongoDB Server installed. You can download and install MongoDB from [MongoDB official website](https://www.mongodb.com/try/download/community).

## Installation

To install dependencies:

```bash
bun install
```
## Running the API

To run in production mode:

```bash
bun start
```

To run in dev mode:

```bash
bun run dev
```

## API Structure
Following Elysia Js recommended structure with a little change 
- Add service folder which contains the DB logic
- Make the model folder for DB Schema
- Add type folder for TS types
- Add config file for server configs like DB Connection, etc

```
  ├── src
  |   ├── config
  │   ├── controllers
  |   ├── libs
  |   ├── middlewares
  │   ├── models
  │   ├── services
  |   ├── types
  │   └── validations
  ├── index.ts
  ├── .env
  ├── README.md
  └── .gitignore 
```

## API Documentation
Explore and test the API using the built-in Swagger documentation. Open your browser and navigate to:

[http://your-server/swagger](http://localhos:3000/swagger)

This interactive documentation provides a user-friendly interface to understand the API endpoints, make requests, and view responses.

## Endpoints

### Authentication

| Method | URL                    | Description                 |
|--------|------------------------|-----------------------------|
| POST   | `/auth/signup`     | Create a new user account   |
| POST   | `/auth/signin`     | Authenticate and get access token |

### Tasks

| Method | URL                 | Description                  |
|--------|---------------------|------------------------------|
| POST   | `/tasks`        | Create a new task            |
| GET    | `/tasks/` | Retrieve all tasks   |
| GET    | `/tasks/:taskId` | Retrieve details of a task   |
| PUT    | `/tasks/:taskId` | Update details of a task     |
| DELETE | `/tasks/:taskId` | Delete a specific task       |
