import React from "react";
import City from "./component/city";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

export default class WeatherInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: {},
      cityName: ""
    };
  }

  searchWeather = () => {
    axios
      .get("/data/2.5/weather", {
        params: { q: this.state.cityName }
      })
      .then(result => {
        this.setState({ weatherData: result.data }, () => {
          console.log(this.state.weatherData);
        });
      })
      .catch(error => {
        if (error.response === undefined) {
          alert("City not found");
        } else if (error.response.status === 400) {
          alert("Enter city name");
        }
      });
  };

  render() {
    return (
      <Container >
        <Form>
          <Form.Group>
            <h2>City name</h2>
            <Form.Control
              placeholder="Your city name"
              onChange={v => {
                let cityName = v.target.value;
                this.setState({ cityName: cityName });
              }}
            />
          </Form.Group>
          <Button
            onClick={() => {
              this.searchWeather();
            }}
          >
            Search
          </Button>{" "}
        </Form>

        <City weatherData={this.state.weatherData} />
      </Container>
    );
  }
}
