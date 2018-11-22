'use strict'

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const router = express.Router();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json(),cors())

const tasks = require('../route/search');
app.use('/api', tasks);

app.all('*', (request, response) => {
  console.log('Returning a 404 from the catch-all route');
  return response.sendStatus(404);
});

export const start = () => {
  app.listen(PORT, () =>{
    console.log(`Listening on port: ${PORT}`)
  })
}

export const stop = () => {
  app.close(PORT, () => {
    console.log(`Shut down on port: ${PORT}`)
  })
}