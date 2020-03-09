import React from "react";
import "./city.css";
import { Container, Image } from "react-bootstrap";
function dateConverter(milliseconds) {
  var date = new Date(milliseconds * 1000).toLocaleTimeString();
  return date;
}
export default class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      main: {
        temperature: 0,
        humidity: 0,
        clouds: 0,
        wind: 0
      },
      cityInfo: {
        name: "",
        country: "",
        sunrise: 0,
        sunset: 0
      },
      weather: {
        description: "",
        icon: "",
        id: 0,
        main: ""
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.weatherData !== prevProps.weatherData) {
      let data = this.props.weatherData;
      console.log(data);
      this.setState({
        main: {
          temperature: data.main.temp - 273.15,
          humidity: data.main.humidity,
          clouds: data.clouds.all,
          wind: data.wind.speed
        },
        cityInfo: {
          name: data.name,
          country: data.sys.country,
          sunrise: dateConverter(data.sys.sunrise),
          sunset: dateConverter(data.sys.sunset)
        },
        weather: {
          description: data.weather[0].description,
          icon:
            "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png",
          id: data.weather[0].id,
          main: data.weather[0].main
        }
      });
    }
  }
  render() {
    if (this.state.cityInfo.name !== "") {
      return (
        <Container className="city-container">
          <h3>
            Weather in {this.state.cityInfo.name}, {this.state.cityInfo.country}
          </h3>
          <h2>
            <Image src={this.state.weather.icon} />
            {this.state.main.temperature.toFixed(0)} °C
            <br />
          </h2>
          <h3> {this.state.weather.description}</h3>
          Wind {this.state.main.wind} m/s
          <br />
          Humidity {this.state.main.humidity} %
          <br />
          sunrise {this.state.cityInfo.sunrise}
          <br /> sunset {this.state.cityInfo.sunset}
        </Container>
      );
    } else return <div></div>;
  }
}
