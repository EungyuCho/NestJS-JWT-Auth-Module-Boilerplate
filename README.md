# NESTJS JWT Auth Module Boilerplate

## Description
[NestJS](https://github.com/nestjs/nest) JWT Auth Module Boilerplate made with by [Jay](https://github.com/EungyuCho)

## Start Guide
### Outside Docker containers
- Setting .env.dev file in backend (Database config)
  - if you change database config appModule
- Start the app <code>npm run start:dev</code> (app will be exposed through the port 8000)
- graphql background will be run on http://localhost:8000/graphql

### Inside Docker containers
```bash
$ docker-compose up
```
- graphql background will be run on http://localhost:4000/graphql

### [backend auth config guide](https://github.com/EungyuCho/api-gateway-boilerplate/tree/master/backend)