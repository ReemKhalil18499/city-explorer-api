"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const axios = require('axios');

// const weather = require("./weather/data/weather.json");
const Weather = process.env.WEATHER_API;
const movieKey = process.env.MOVIE_API;

app.get("/", // our endpoint name
  function (req, res) {
    res.send("Hello World");
  }
);

class Forecast {
  constructor(item) {
    this.date = item.valid_date;
    this. description= `Low of ${item.low_temp}, high of ${item.max_temp} with broken clouds${item.weather.description}` ;
  }
}

class Movie {
  constructor(item){
    this.title = item.title;
    this. overview= item.overview;
    this. average_votes= item.vote_average;
    this. total_votes= item.vote_count;
    this. image_url= `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;
    this. popularity= item.popularity;
    this. released_on= item.release_date;
  }
}

app.get("/weather", (req, res) => {
  let search = req.query.city_name;
  let url = `http://api.weatherbit.io/v2.0/forecast/daily?city=${search}&key=${Weather}`;
  axios
  .get(url)
  .then( result => {
    let newWeath =  result.data.data.map(item => {
      return new Forecast(item);
    })
    res.send(newWeath)
  })
  .catch(err => console.log(err))
});

app.get("/movie", (req, res) => {
  let search = req.query.city_name;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${search}`;

  axios
  .get(url)
  .then( result => {
    let newMovie =  result.data.results.map(item => {
      return new Movie(item);
    })

    res.send(newMovie)
  })
  .catch(err => console.log(err))
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
