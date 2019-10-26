## Prerequisites
- node
- yarn
- docker

## First time
Install `ts-node` to your system:
```
yarn global add ts-node
```

Create database settings file by copying example file:
```
cp .env.development .env
```

## Database
It is possible to start local Docker instance with MySQL database:

```
docker-compose -f database.yml up
```

Visit [http://localhost:8080](http://localhost:8080) to manage database.

## Main Script

In the project directory, you can run:

```
yarn install
yarn start
```

This will start the web app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Backend (API) service will start on [http://localhost:4000](http://localhost:4000)
