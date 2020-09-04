# Jira Bridge

Jira Bridge is an additional layer between the end-user and JIRA, that acts as a buffer for user actions.\
It persists to JIRA in bulk, creating a smoother flow.

## Requirements

- node
- docker and docker-compose (optional)

## Starting the server

Two ways to run the project: as docker containers (recommended), or each service on its own manually.

### The docker way:

In the root folder, run:

```
$ yarn docker
```

This runs and exposes the `API` on port `5000`, the `webapp` on port `3000` and `storybook` on port `6006`.

### The manual way:

To run the API in watch mode, on port `5000`, navigate to `/api` and run:

```
$ yarn dev
```

To run the webapp in watch mode, on port `3000`, navigate to `/webapp` and run:

```
$ yarn dev
```

To run the storybook, on port `6006`, navigate to `/webapp` and run:

```
$ yarn storybook
```
