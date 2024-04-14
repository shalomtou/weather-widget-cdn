## Weather Widget - CDN Usage Guide

The Weather Widget is a customizable React component that allows you to display weather information for a specific location on your website. This guide explains how to use the Weather Widget as a content delivery network (CDN) and provides instructions for initializing an instance with an apiKey and divId.

### Installation

To use the Weather Widget via CDN, include the following script tags in your HTML file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://cdn.jsdelivr.net/gh/your-username/weather-widget-cdn@main/build/static/css/main.d5289b2f.css"
      rel="stylesheet"
    />
    <title>Weather Widget</title>
  </head>
  <body>
    <div id="weatherDiv"></div>

    <script
      crossorigin
      src="https://cdn.jsdelivr.net/gh/your-username/weather-widget-cdn@main/build/static/js/main.c3a408dd.js"
    ></script>
    <script>
      // Initialize Weather Widget instance
      const weatherDiv = new WeatherWidgetInstance(
        "YOUR_API_KEY",
        "weatherDiv"
      );
      weatherDiv.render();
    </script>
  </body>
</html>
```

Replace `YOUR_API_KEY` with your OpenWeather API key and `weatherDiv` default will append in the body element, with the
id of the HTML element where you want the Weather Widget to be rendered.

### Initializing an Instance

To initialize an instance of the Weather Widget, create
a new `WeatherWidgetInstance` object with your OpenWeather API key and the id of
the HTML element where you want the widget to be rendered.

```js
const weatherWidget = new WeatherWidgetInstance("YOUR_API_KEY", "divId");
```

### Parameters

`apiKey`: Your OpenWeather API key.
`divId`: The id of the HTML element where you
want the Weather Widget to be rendered.

### Methods

`render()`: The render() method is
used to render the Weather Widget inside the specified HTML element.

```js
weatherWidget.render();
```

### Usage

After initializing an instance of the Weather
Widget, call the `render()` method to display the widget on your website.

```js
const weatherDiv = new WeatherWidgetInstance("YOUR_API_KEY", "weatherDiv");
weatherDiv.render();
```

### Customization

You can customize the
appearance and behavior of the Weather Widget by modifying the React component
source code or by passing additional props to the WeatherWidgetInstance
constructor.

### Support

For support and inquiries, please contact
shalotou@gmail.com.

### License

This project is licensed under the MIT License.
See the LICENSE file for details.
