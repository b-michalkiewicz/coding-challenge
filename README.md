# Solution

## How to run the app
- `npm i`
- `docker-compose u`
- `docker-compose u`
- `npm run start worker`
- `npm run start`

The api is running on port 3000, to get the data: `GET data-stream`, to start data stream: `POST data-stream`, to stop data stream: `DELETE data-stream` .

## Chosen approach

I extracted the part with the core logic as a separate module `src/apps/worker/src/domain/data-pipeline.ts`. You can clearly see what is happening during data collection, also this is the only tested part of the application as the rest is just delegating some work or infrastructure details. The decoupling is ensured by using domain events. Data transformations are provided as dependencies in form of data middlewares.

## Chosen technologies

RabbitMQ is used as a message protocol and Redis as storage.

RabbitMQ is quite a popular, reliable, and production-ready tool for distributed messaging.

Redis was chosen for simplicity as we don't have any information on how the data is going to be used or how we need to scale our solution. If we don't know our queries at all some SQL solution should be chosen for better flexibility. If we know our queries in advance and we anticipate huge scale, NoSQL solutions could be considered. I designed the app in a way that would be easy to change storage solutions.

## Short-comings and possible improvements

- config is hardcoded - before going to prod it must be fixed to ensure the solution is working in different environments and it's to change to the config
- no Docker image
- no authentication and authorization
- more tests are needed - integration tests with data endpoints simulation tool ([example](https://netflix.github.io/pollyjs/#/)) to ensure we deal with external errors correctly
- DTOs for better separation
- RCP exceptions handling

I didn't include any pipeline middlewares but the solution is there (tested by unit tests) so it would be very to add any data transformation. Same for data pipeline event listeners - they could be added for notifications, better error handling, etc.


# Welcome to Welds coding-challenge

## Introduction
Here at Weld we use [NestJS](https://nestjs.com/) for our applications. So this project also reflects that. On our front-end we use NextJS and GraphQL. For simplicity we have used the monorepo structure from NestJS.

Fork this repository and create your own repository to get started.

## Challenge
One of our customers wants us to help them build a pipeline for an API (select whichever you want from [Public APIs](https://github.com/public-apis/public-apis)). And they want us to setup a new data-pipeline for them to get information out and into their current data-warehouse.

To accomplish this you will build two services:
- **Data-streams**: Our API that can receive calls and issue commands to **worker**. This service also stores any information that our customer wants to fetch.
- **Worker:** Fetches the data from external API. Makes any transformations you see fit. And sends it back to **data-streams** for storage.

### Steps in challenge
- Configure a message protocol between the two services. You can get inspiration from the [nestjs docs.](https://docs.nestjs.com/microservices/basics) Choose which ever you want but tell us why in your answer.
- Create an endpoint on **data-streams** that tells **worker** to start fetching data on an interval (every 5 minutes).
- Setup an [http module](https://docs.nestjs.com/techniques/http-module) that **worker** can use to communicate with the external API.
- Send the data and store the results on **data-streams** using internal communication protocol.
- Make an endpoint on **data-streams** that can fetch the data stored on **data-streams**. Use whatever storage you see fit but tell us why you chose it.
- Make an endpoint on **data-streams** that can stop the data fetching on **worker**.

## How we evaluate
The test is solely for you to show techniques and design patterns you normally use. Once the techniques and design patterns have been demonstrated then that is enough. No neeed for additional boilerplate. Just include a future work section in your answer and we will include questions in the technical interview.

- We understand that this can be **time consuming**. If you are short on time - then leave something out. But be sure to tell us your approach to the problem in the documentation.
- A documented answer that explains your approach, short-comings, how-to-run and future work.
- A working solution. Preferably with some tests to give us an idea of how you write tests (you don't need to put it all under test).
- Reliability is very important when dealing with data-pipelines. So any measures you can add to keep the data-flowing will be appreciated.
- We appreciate small commits with a trail of messages that shows us how you work.

## Project structure
```
├── README.md
├── apps
│   ├── data-streams
│   └── worker
├── package.json
```
### data-streams:
This is our API. We will be able to issue HTTP requests to this and have it talk to our microservice **worker**.
We also store any information that **worker** sends our way. This project has been setup as a hybrid app. It can both function as an API but also as a microservice with an internal communication layer.

You can start data-streams with:
```
yarn start
```

### worker:
This is the worker microservice that is in charge of talking to the external API. It will fetch data when issued a command from **data-streams** and then return the results. This project only functions as a microservice which means it can only receive commands from the internal communication layer.

You can start worker with:
```
yarn start worker
```
