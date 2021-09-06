"use strict";

const express = require("express"); // require the express package
const app = express(); // initialize your express app instance
const cors = require("cors");
app.use(cors());

const weather = require("./weather/data/weather.json");

app.get(
  "/", // our endpoint name
  function (req, res) {
    // callback function of what we should do with our request
    res.send("Hello World"); // our endpoint function response
  }
);

app.get("/get-weather", (request, response) => {
  console.log(request, query.data);
  const data = request.query.data;

  if (data) {
    const ArrReturn = weather.filter((item) => {
      return item.data === data;
    });
    if (ArrReturn.length) {
      response.json(ArrReturn);
    } else {
      response.send("Not Found");
    }
  } else {
    response.json(weather);
  }
});

app.listen(3001, () => {
  console.log(`Server started on port`);
});
