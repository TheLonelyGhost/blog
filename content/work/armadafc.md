---
title: ETL
organization: Armada Football Club
featuredImg: /work/computer-tool.svg
summary: |
  ETL for ticket sales analysis
---

Pipe data from [Veritix ticketing system](#) (via their XML API) into Salesforce for Business Intelligence analysis. Includes custom mapping of data across multiple Salesforce objects, atomic updates, and logging of successes and failures for later review.

![Veritix Logo](/work/veritix_logo.png)

## Platform

- Heroku / Dokku (docs written for both)
- Ruby
- OAuth2.0
- SOQL (Salesforce)

## Features

- Instructions for hosting on Heroku or Dokku
- Real-time streaming of errors to Heroku / Dokku logging framework
- Log entries summarizing successes and failures on each poll
- Adapter pattern for pairing Salesforce with Veritix environments, using the exact same data transformations

## Obstacles

- OAuth2.0 refresh token workflow requires a separate web application for capturing an initial token
- OAuth token eventually expires, so for long-running programs it needs to be refreshed periodically
