+++
title = "Browser extension"
summary = "Browser extensions for matching inventory between 2 management systems"
date = "2001-09-11T00:00:00Z"

[extra]
# organization = "[redacted]"
+++

{% figure(url="./tests-well.svg", width="40em", height="10em") %}
(Credit: [Lukasz Adam](https://lukaszadam.com/illustrations))
{% end %}

A browser extension commissioned to scrape data from Hardware Inventory System _A_, query Hardware Inventory System _B_ with that data, and inject the content from _B_ back into the web interface for _A_.

## Platform

- Chrome (v45+)
- Internet Explorer 10

## Features

- Modular JavaScript with swappable adapters for platform-specific implementations
- Polyfills for backporting ES6 features, such as Promises
- Build system in GulpJS in order to streamline the following:
  - Minify and concatenate CSS
  - Minify and concatenate JavaScript
  - Swap in platform-specific implementations for use with shared code
  - Collect and structure Chrome extension artifacts into a ZIP archive, for easy upload to the Chrome Webstore
  - Collect and structure IE artifacts for deployment to internal CDN

## Obstacles

- A necessary CORS header was missing from the HTTP API response, making in-browser communication impossible without using a browser extension.
