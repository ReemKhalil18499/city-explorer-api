'use strict';

const axios = require('axios');
const Weather = process.env.WEATHER_API;

class Forecast {
    constructor(item) {
      this.date = item.valid_date;
      this. description= `Low of ${item.low_temp}, high of ${item.max_temp} with broken clouds${item.weather.description}` ;
    }

  }

  function weatherfun(req, res) {
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
  };




  module.exports = weatherfun;