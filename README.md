# Piiquante Project

This is a backend project generated with NodeJS (v17.7.2) and ExpressJS (v4.18.1).
MongoDB Atlas is using for database service.
For running this project on a web interface, you have to use [this frontend](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6) simultaneously.

## How to start
  - Create a [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register) and follow this [setting up](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#setting_up_the_mongodb_database)
  - Run `npm install` command line on your terminal
  - Run `nodemon serve`
  - Rename `.env.example` file by `.env` and replace all 'xxxxxx' by your own MongoDB variables

## The server is listening on 
`http://localhost:3000`

## Routes
### Create an account (POST method)
http://localhost:3000/api/auth/signup

### Login to an account (POST method)
http://localhost:3000/api/auth/login

### Create a new sauce (POST method)
http://localhost:3000/api/sauces/

### Modify a sauce (PUT method)
http://localhost:3000/api/sauces/:id

### Delete a sauce (DELETE method)
http://localhost:3000/api/sauces/:id

### Get a selected sauce (GET method)
http://localhost:3000/api/sauces/:id

### Get all sauces (GET method)
http://localhost:3000/api/sauces/

### Like/Dislike a sauce (POST method)
http://localhost:3000/api/sauces/:id/like
