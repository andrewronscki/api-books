## Installation

```bash
$ docker-compose up
```

## Url Swagger

http://localhost:3000/api

## If you want to run without docker-compose

. Change the DB_HOST in .env to localhost
```
DB_HOST=localhost
```
. Create a postgres container
```
$ docker run --name postgres -e POSTGRES_PASSWORD=docker POSTGRES_DB=api-books -p 5432:5432 -d postgres
```
. Install application
```
$ yarn or npm install
```
. Run application
```
yarn start:dev or npm run start:dev
```
. Open Swagger url:
  http://localhost:3000/api