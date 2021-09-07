"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const weather = require("./weather/data/weather.json");

app.get(
  "/", // our endpoint name
  function (req, res) {
    res.send("Hello World");
  }
);

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

app.get("/weather", (req, res) => {
  // console.log(req, query.city_name);
  // res.send("hello weather");
  let city_name = req.query.city_name;
  // let lat = req.query.lat;
  // let lon = req.query.lon;

  const ArrReturn = weather.find(
    (item) => item.city_name.toLowerCase() === city_name.toLocaleLowerCase()
  );
  console.log(ArrReturn.data);

  if (ArrReturn) {
    let newArr = ArrReturn.data.map(
      item => new Forecast(item)
    );

    res.send(newArr);
  } else {
    res.send("data not found");
  }
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
