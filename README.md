## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone the repository:

    ```sh
    git clone https://github.com/ybenlafk/1337-test.git
    cd 1337-test
    ```

2. Build and run the application using Docker Compose:

    ```sh
    docker compose up --build
    ```

This command will build the Docker images and start the Next.js application.

## Accessing the Application

Once the containers are up and running, you can access the application at `http://localhost:3000`.

## Stopping the Application

To stop the application, you can use the following command:

```sh
docker compose down
```