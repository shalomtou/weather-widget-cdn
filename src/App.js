import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
const { REACT_APP_PROXY_API_URL, REACT_APP_WEATHER_URL } = process.env;

export const WeatherWidget = ({ apiKey }) => {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const fetchWeather = async (_location = null) => {
    const local = location || _location;

    setLoading(true);
    setError("");

    try {
      const days = 14;

      const encodedUrl = encodeURIComponent(
        `${REACT_APP_WEATHER_URL}?key=${apiKey}&q=${local}&days=${days}`
      );

      const response = await fetch(
        `${REACT_APP_PROXY_API_URL}?url=${encodedUrl}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      const countryName = data.location.country;
      const cityName = data.location.name;
      const parsedWeatherData = parseWeatherData(data);

      setWeatherData(parsedWeatherData);
      setCountry(countryName);
      setCity(cityName);
      setLocation(cityName);
    } catch (err) {
      setError("Error fetching weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(`${latitude}, ${longitude}`);
      },
      (error) => {
        console.error("Error getting current location:", error);
        setError("Error getting current location");
      }
    );
  }, []);

  const parseWeatherData = (data) => {
    const weatherData = [];
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const averageTemperatures = {};

    for (const day of data.forecast.forecastday) {
      const date = new Date(day.date);
      const dayOfWeek = daysOfWeek[date.getDay()];
      const temperature = day.day.avgtemp_c;

      if (!averageTemperatures[dayOfWeek]) {
        averageTemperatures[dayOfWeek] = [];
      }

      averageTemperatures[dayOfWeek].push(temperature);
    }

    for (const dayOfWeek in averageTemperatures) {
      const temperatures = averageTemperatures[dayOfWeek];
      const averageTemperature =
        temperatures.reduce((acc, curr) => acc + curr, 0) / temperatures.length;

      weatherData.push({
        dayOfWeek,
        temperature: averageTemperature,
      });
    }

    return weatherData;
  };

  const handleKeyPress = (e) => {
    setError("");
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      fetchWeather();
    }
  };

  const handleSetLocation = (value) => {
    setLocation(value);
  };

  return (
    <Container className='py-5 flex'>
      <Card className='shadow-lg'>
        <Card.Body>
          <Form>
            <Form.Group controlId='locationInput' className='mb-3'>
              <Form.Label className='fw-bold'>
                Enter city or coordinates
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter city or coordinates'
                value={location}
                onChange={(e) => handleSetLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                readOnly={loading}
              />
            </Form.Group>
            <Button
              variant='primary'
              onClick={fetchWeather}
              disabled={loading}
              className='w-100'
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {loading && <Alert variant='info'>Loading...</Alert>}
      {error && (
        <Alert className='mt-4' variant='danger' dismissible>
          {error}
        </Alert>
      )}
      <div className='d-flex flex-column mt-4'>
        {weatherData.map((weather, index) => (
          <Card key={index} className='shadow-lg mb-3'>
            <Card.Body className='d-flex justify-content-between align-items-center'>
              <div>
                <Card.Text className='fw-bold mb-1'>{weather.date}</Card.Text>
                <Card.Text>{weather.temperature.toFixed(1)}°C</Card.Text>
              </div>
              <div>
                <span className='text-muted me-2'>{weather.dayOfWeek}</span>
                <span className='text-muted me-2'>{country}</span>
                <span className='text-primary'>{city}</span>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};
