const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const app = express()

app.use(morgan('dev'));
app.use(cors());

const apps = require('./apps-data.js');

app.get('/apps', (req, res) => {
  const { sort='' , genres='' } = req.query;
  
  if (sort) {
    if (!['Rating', 'App'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of title or rank');
    }
  }

  if (genres) {
    if (!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genres.toLowerCase())) {
      return res
        .status(400)
        .send('Genre error');
    }
  }

 let results = apps.filter(app => app.Genres.toLowerCase().includes(genres.toLowerCase()));

 if (sort === "Rating") {
  results
  .sort((a, b) => {
    return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
  });
 }

 if (sort === "App") {
  results
  .sort((a, b) => {
    return a[sort].toLowerCase() > b[sort].toLowerCase() ? 1 : a[sort].toLowerCase() < b[sort].toLowerCase() ? -1 : 0;
  });
 }


  res
    .json(results)

})

module.exports = app