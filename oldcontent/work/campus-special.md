---
title: Food Court
organization: Campus Special
featuredImg: /work/iced-coffee.svg
summary: |
  GrubHub for college campuses
---

A now-defunct application, playing middle-man for online food orders. In its prime, Food Court competed in the order relaying space with companies such as GrubHub, EatStreet, and Eat24, averaging over $100,000 in transactions every week.

![](/work/FoodCourt-campusspecial.png)

Campus Special's main business involved selling advertising space to businesses in collegiate areas, even expanding out to advertising for apartment complexes. Some of these advertisements were posted to the Food Court website in "Deals" and "Apartments" sections, respectively.

## Platform

- Bootstrap UI elements
- LAMP stack on AWS EC2 (classic)
- PHP 5.3.x
- Ubuntu (later shifting to Amazon Linux)
- Memcached via EC2 (later, via AWS Elasticache)
- HAProxy (later AWS Elastic Load Balancer) with TLS termination

## Features

- Custom, built-in search engine using Porter-Stemmer algorithm
- Higher availability data from SQL via Memcache query caching
- Facebook single sign-on for both customers and restauranteurs
- Separate administration panels and permissions for restauranteurs and system administrators
- Automatic translation of purchase, commission, and refund deltas into archived NACHA format for remittance
- Stored and displayed complex menu sizes and available customizations (pizza: left-half, right-half, whole)
- Stored and displayed complex combo specials (e.g., $10 off any appentizer when ordering entr&eacute;e after 10pm)
- Promo code system, with configurable discount coming from Campus Special or restauranteur, max number of uses, and expiration

![](/work/FoodCourt2-campusspecial.png)

## Obstacles

- No templating system, intermixing controller-type logic into the view
- No job queue system, only cron with a max-execution timeout. Often resulted in double-execution of jobs and problems with data consistency
- Over 2 million lines of undocumented PHP code
- Rampant and unpredictable use of super globals reaching from a deeply-nested function's scope into undocumented global variables
- No automated tests or manual testing runbook
- No reasonable way to emulate production on local development, requiring a git commit in order to test correctness of a fix
