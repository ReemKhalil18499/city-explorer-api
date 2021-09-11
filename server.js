"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const axios = require('axios');
const weatherFun=require('./weather/data/Weather')
const moviesFun=require('./weather/data/Movie')

// const weather = require("./weather/data/weather.json");
const Weather = process.env.WEATHER_API;


app.get("/", // our endpoint name
  function (req, res) {
    res.send("Hello World");
  }
);

app.get('/weather',weatherFun);
app.get('/movie',moviesFun);




app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
