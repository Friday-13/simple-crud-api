## Description

A simple CRUD app built with Node.js **without using any frameworks**.  
Completed as part of the [RS School: CRUD API](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md) course assignment.

## Usage

1. Install [Node.js](https://nodejs.org/en/download/)
2. Clone this repo locally
3.  Navigate to `simple-crud-api`
4. Install all dependencies using [`npm install`](https://docs.npmjs.com/cli/install)
5. Run the application (e.g., in dev-mode) `npm run start:dev`

## Work modes

1. `npm run start:dev` - Development mode
2. `npm run start:prod` - Production mode: starts the build process and then runs the bundled file
3. `npm run start:multi` - Development mode using the Node.js `Cluster` API to start multiple worker processes
4. `npm run start:prod:multi` - Production mode using clustering (builds and runs the bundled application with multiple worker processes)

## API Overview

The application uses a single **in-memory database** with user records.

User model:

```ts
interface IUser {
  id: string
  username: string
  age: number
  hobbies: string[]
}
```

By default app starts the server (or load-balancer in multi mode) at `http://localhost:4000`. 
Port number can be changed via the `.env`-file.

### Avalliable endpoints:

- **GET** `/api/users`  - Get all persons
- **GET** `/api/users/{userId}` - Get user by ID
- **POST** `/api/users`  - Create a new user
- **PUT** `/api/users/{userId}` - Update an existing user
- **DELETE** `/api/users/{userId}` - Delete a user by ID

### Example scenario

1. **POST** `/api/users` - Create user `lisa_taylor`
**Request body:**

```json
{
	username: "lisa_taylor",
	age: 22,
	hobbies: ["blogging", "shopping"],
}
```

**Response:**`201 Created`

```json
{
    id: "12940842-023d-49c5-b93a-c9e86d9c674f",
	username: "lisa_taylor",
	age: 22,
	hobbies: ["blogging", "shopping"],
}
```
---
2. **POST** `/api/users`- Create user `bob_jackson`
**Request body:**

```json
{
	username: "bob_jackson",
	age: 32,
	hobbies: ["gaming", "cooking", "traveling"],
}
```

**Response:** `201 Created`

```json
{
	id: "9121bb8e-6231-4905-b387-e77fe3f2e56c",
	username: "bob_jackson",
	age: 32,
	hobbies: ["gaming", "cooking", "traveling"],
}
```

---
3. **GET** `/api/users` - Get all users

**Response:** `200 OK`

```json
[
	{
		id: "12940842-023d-49c5-b93a-c9e86d9c674f",
		username: "lisa_taylor",
		age: 22,
		hobbies: ["blogging", "shopping"],
	},
	{
		id: "9121bb8e-6231-4905-b387-e77fe3f2e56c",
		username: "bob_jackson",
		age: 32,
		hobbies: ["gaming", "cooking", "traveling"],
	}
]
```

---
4. **PUT** `/api/users/9121bb8e-6231-4905-b387-e77fe3f2e56c` - Update `bob_jackson`
**Request body:**

```json
{
	username: "bob_jackson",
	age: 34,
	hobbies: ["gaming", "cooking", "traveling", "yoga"],
}
```

**Response:** `200 OK`

```json
{
	id: "9121bb8e-6231-4905-b387-e77fe3f2e56c",
	username: "bob_jackson",
	age: 34,
	hobbies: ["gaming", "cooking", "traveling", "yoga"],
}
```

---
5. **DELETE** `/api/users/12940842-023d-49c5-b93a-c9e86d9c674f` - Delete `lisa_taylor`

**Response**: `204 No Content`

---
## Testing

There are several tests for the available endpoints. You can run them using the following command:

```shell
npm run test
```

## Multi-mode

In multi-mode, a load-balancer distributes incoming requests among worker processes.  
You can see which worker handled a request by checking the console output:

```
Reply from worker on port:  4001
Reply from worker on port:  4002
Reply from worker on port:  4003
Reply from worker on port:  4004
Reply from worker on port:  4005
```

