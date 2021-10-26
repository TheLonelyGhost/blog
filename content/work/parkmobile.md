---
project: Reservations
organization: Parkmobile
featuredImg: /work/event-tickets.svg
summary: |
  A service for reserving paid parking spots for short-term, long-term, and event parking.
---

A service for reserving paid parking spots for short-term, long-term, and event parking. It once housed a full application, including white-lable UI, REST API for third party integration, and payment processor. Later it downsized the responsibilities to just managing inventory (parking spot availability for given duration) and became the inventory management system for a global SOA.

Prior to joining the global SOA, partners included such notable as the National Football League for Super Bowl XLIX.

![Parkmobile Click-N-Park homepage](/work/CNP-parkmobile.png)

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

