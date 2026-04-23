+++
title = "Reservations"
summary = "A service for reserving paid parking spots for short-term, long-term, and event parking."
date = "2001-09-11T00:00:00Z"

[extra]
organization = "Parkmobile"
+++

{% figure(url="./event-tickets.svg", width="30em", height="10em") %}
(Credit: [Lukasz Adam](https://lukaszadam.com/illustrations))
{% end %}

A service for reserving paid parking spots for short-term, long-term, and event parking. It once housed a full application, including white-lable UI, REST API for third party integration, and payment processor. Later it downsized the responsibilities to just managing inventory (parking spot availability for given duration) and became the inventory management system for a global SOA.

Prior to joining the global SOA, partners included such notable as the National Football League for Super Bowl XLIX.

{{ figure(url="./CNP-parkmobile.png", alt="Parkmboile Click-N-Park homepage", width="40em") }}

## Platform

- Ruby 2.2
- Rails 3.x
- Phusion Passenger
- [Percona DB](https://www.percona.com/) (MySQL-compliant store with improved distributed properties)
- 6+ Ubuntu servers on AWS EC2, sitting behind AWS Elastic Load Balancer with TLS termination

## Features

- Repeatable deployment system via Capistrano, Git, and Passenger with instant rollback
- Over 70% automated test coverage
- High availability spread over 6+ servers
- Minimal level of PCI accreditation due to tokenization strategy with payment processor

## Obstacles

- Automated tests largely data-driven, resulting in edge-cases being discovered regularly
- Full automated test suite took as few as 45 minutes
- Memory leaks with unknown source, requiring restarting web server and application on each server as often as every hour, in a rolling fashion

