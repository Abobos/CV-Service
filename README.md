### CV Service

A service that gives users the ability to generate PDFs by providing user data.
Please note that this service currently uses a specific template for generating PDFs.
The ability to create user-defined templates is not supported at this time.

### Development

#### Tools

- Node js
- Express js
- Puppetter
- TypeScript
- ejs template engine

#### Running the Service

##### Docker

- Install [Docker](https://www.docker.com/)
- Run `yarn run docker:dev`
- Open postman to test the api request to POST route and visit `http://localhost:4000/cv` and rock it

##### Without Docker

- Run `yarn install` to install project dependencies
- Run `yarn dev` to run the services and you are good
- Open browser and visit `http://localhost:4000/cv` and rock it

#### Test

There is one major integration test located in `src/test/cv.test.ts` that tests the POST `/cv` endpoint. Run the command below to run the tests

```
yarn test
```

#### API Docs

[CV Service](https://cvservice.docs.apiary.io/#reference/0/cv-service-collection/generate-a-new-cv)
