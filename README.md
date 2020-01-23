# SpeedCar
This is a test project of a specific javascript stack

## Stack

The goal is to test the following stack altogether :

- React : Front rendering
- NextJS : Server rendered app
- Apollo (both client and server) : Communication between client/server for graphql
- Prisma : Dealing with graphql server hosting
- Graphql : Query language
- Enzyme : Unit testing for react components
- Jest : Server side unit testing
- Material-ui : Some react components using material design style

The goal is to host this stack on AWS instances with a load balancer and dockerized apps.
Continuous integration to be implemented with service such as travis-ci. 

## How to run in production

### Install docker

`sudo apt-get install -y docker docker-compose`

### Run it

`sudo docker-compose up`

### Visit the website

In your favorite browser, open `http://frontend:3000`
