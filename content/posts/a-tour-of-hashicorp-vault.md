---
draft: true
created: 2021-02-11T21:23:44-05:00
title: A Tour of Hashicorp Vault
modified: 2021-02-11T21:41:39-05:00
---

So you want to store your secrets in a way your applications can easily access, but still be super secure? Wanting a solution that doesn't limit you on any particular language, framework, or platform? You've come to the right place.

Hashicorp Vault is the best-in-class secrets manager that many companies use. Check out their [homepage](https://www.vaultproject.io/) for a non-exhaustive list. A common complaint with using it is the high learning curve, so here is an overview of the broad concepts.

> Vault is an identity translator

Vault is an identity translator, turning your existing shifting your existing authentication mechanisms (LDAP, OKTA, GitHub, AWS IAM) and facilitating access to other systems that may not natively support the same single-sign-on mechanisms (Postgres, SSH, encryption as a service)