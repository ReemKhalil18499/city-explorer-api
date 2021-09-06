import React, { Component } from "react";
import axios from "axios";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      City: "",
      data: {},
      showLocationData: false,
      weather: [],
    };
  }

  handelLocationNameChange = (e) => {
    this.setState({ City: e.target.value });
  };

  handelSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.City);

    const url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_IQ_KEY}&q=${this.state.City}&format=json`;

    const Link1 = `${process.env.REACT_APP_SERVER_URL}/get-weather?`;

    console.log(Link);

    const response = await axios.get(Link);
    const serverResponse = await axios.get(Link1);

    console.log(response.data[0]);
    console.log(serverResponse.data);
    this.setState({
      data: response.data[0],
      showLocationData: true,
      weather: serverResponse.data,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handelSubmit}>
          <input
            type="text"
            onChange={this.handelLocationNameChange}
            placeholder="City"
          />
          <input type="submit" value="Explorer!" />
        </form>
        {this.state.showLocationData && (
          <div>
            <div>
              <h2>City</h2>
              <p>{this.state.data.display_name}</p>
              <p>lat: {this.state.data.lat}</p>
              <p>lon: {this.state.data.lon}</p>
            </div>

            <div>
              {this.state.weather.map((item) => {
                return (
                  <div>
                    <p>{item.lat}</p>
                    <p>{item.lon}</p>
                    <p>{item.searchQuery}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
