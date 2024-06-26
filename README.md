## Weather Widget - CDN Usage Guide

The Weather Widget is a customizable React component that allows you to display weather information for a specific location on your website. This guide explains how to use the Weather Widget as a content delivery network (CDN) and provides instructions for initializing an instance with an apiKey and divId.

### Installation

To use the Weather Widget via CDN, include the following script tags in your HTML header:

```html
<link
  href="https://cdn.jsdelivr.net/gh/shalomtou/weather-widget-cdn@main/build/static/css/weather-widget.css"
  rel="stylesheet"
/>
<script
  crossorigin
  defer
  src="https://cdn.jsdelivr.net/gh/shalomtou/weather-widget-cdn@main/build/static/js/weather-widget.js"
></script>
```

Script to initialize the Widget add it to the body:

```js
 <script>
    document.addEventListener("DOMContentLoaded", function () {
      const weatherDiv = new AppRenderer(
        "elementor-heading-title elementor-size-default"
      );
      weatherDiv.render();
    });
  </script>
```

HTML file Example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
    href="https://cdn.jsdelivr.net/gh/shalomtou/weather-widget-cdn@main/build/static/css/weather-widget.css"
    rel="stylesheet"
    />
    <script
      crossorigin
      defer
      src="https://cdn.jsdelivr.net/gh/shalomtou/weather-widget-cdn@main/build/static/js/weather-widget.js"
    ></script>
    <title>Weather Widget</title>
  </head>
  <body>
    <div id="weatherDiv"></div>
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        const weatherDiv = new AppRenderer(
          "elementor-heading-title elementor-size-default"
        );
        weatherDiv.render();
      });
    </script>
  </body>
</html>
```

Replace `weatherDiv` default will append in the body element, with the
id of the HTML element where you want the Weather Widget to be rendered.

### Initializing an Instance

To initialize an instance of the Weather Widget,create
a new `WeatherWidgetInstance` object with the id of
the HTML element where you want the widget to be rendered.

```js
const weatherWidget = new WeatherWidgetInstance( "divId");
```

### Parameters

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
const weatherDiv = new WeatherWidgetInstance( "weatherDiv");
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
