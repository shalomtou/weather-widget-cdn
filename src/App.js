import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
const { REACT_APP_PROXY_API_URL, REACT_APP_WEATHER_URL } = process.env;

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const WeatherWidget = ({ apiKey }) => {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [locationObjcet, setLocationObject] = useState(null);

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
      const cityName = data.location.name;

      setLocationObject({ ...data.location, ...data.current });
      const parsedWeatherData = parseWeatherData(data);

      setWeatherData(parsedWeatherData);
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
    const averageTemperatures = {};

    for (const day of data.forecast.forecastday) {
      const date = new Date(day.date);
      const dayOfWeek = daysOfWeek[date.getDay()];
      const temperature = day.day.avgtemp_c;

      if (!averageTemperatures[dayOfWeek]) {
        averageTemperatures[dayOfWeek] = {
          temperatures: [],
          condition: day.day.condition,
        };
      }

      averageTemperatures[dayOfWeek].temperatures.push(temperature);
    }

    for (const dayOfWeek in averageTemperatures) {
      const { temperatures, condition } = averageTemperatures[dayOfWeek];
      const averageTemperature =
        temperatures.reduce((acc, curr) => acc + curr, 0) / temperatures.length;

      weatherData.push({
        dayOfWeek,
        temperature: averageTemperature,
        condition,
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
          {locationObjcet && (
           
              <CardWeather
                location={{
                  name: locationObjcet.name,
                  region: locationObjcet.region,
                  country: locationObjcet.country,
                }}
                weather={{
                  ...locationObjcet,
                  date: locationObjcet.localtime,
                  temperature: locationObjcet.temp_c,
                  dayOfWeek: daysOfWeek[locationObjcet.is_day],
                }}
                index={1}
              />
          )}
        </Card.Body>
      </Card>
      {loading && (
        <Alert
          style={{
            fontSize: "1rem",
          }}
          variant='info'
        >
          Loading...
        </Alert>
      )}
      {error && (
        <Alert className='mt-4' variant='danger' dismissible>
          {error}
        </Alert>
      )}
      <div className='d-flex flex-column mt-4'>
        {weatherData.map((weather, index) => (
          <CardWeather weather={weather} index={index} />
        ))}
      </div>
    </Container>
  );
};

const CardWeather = ({ weather, index, location = null }) => {
  return (
    <Card key={index} className='shadow-lg mb-3' style={{ fontSize: "1rem" }}>
      <Card.Body className='d-flex justify-content-between align-items-center'>
        {location ? (
          <div>
            <Card.Text style={{ fontSize: "1.3rem" }} className='mb-1'>
              {location.name}
            </Card.Text>
            <Card.Text className='mb-1'>{location.region}</Card.Text>
            <Card.Text className='mb-1'>{location.country}</Card.Text>
          </div>
        ) : null}
        <div>
          <Card.Text className='fw-bold mb-1'>{weather.date}</Card.Text>
          <Card.Text>{weather.temperature.toFixed(1)}°C</Card.Text>
        </div>
        <div className='d-flex align-items-center'>
          <span className='text-muted text-bold me-2'>{weather.dayOfWeek}</span>
          <span className='text-muted me-2'>{weather.condition.text}</span>
          <img src={weather.condition.icon} alt={weather.condition.text} />
        </div>
      </Card.Body>
    </Card>
  );
};
