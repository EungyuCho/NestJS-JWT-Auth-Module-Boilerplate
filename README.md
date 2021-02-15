# Auth API GATEWAY

## Start Guide
### Outside Docker containers
- Setting .env.dev file in gateway (Database config)
  - if you change database config appModule
- Start the app <code>npm run start:dev</code> (app will be exposed through the port 8000)
- graphql background will be run on http://localhost:8000/graphql

### Inside Docker containers
```bash
$ docker-compose up
```
- graphql background will be run on http://localhost:4000/graphql
