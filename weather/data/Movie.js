'use strict';

const axios = require('axios');
const movieKey = process.env.MOVIE_API;

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
  
  function moviesFun (req, res) {
    let search = req.query.city_name;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${search}`;
    let result = axios.get(url);
    axios
    .get(url)
    .then( result => {
      // console.log(result.data)
      let movieres =  result.data.results.map(item => {
        return new Movie(item);
      })
  
      res.send(movieres)
    })
    .catch(err => console.log(err))
}
  



  module.exports = moviesFun;