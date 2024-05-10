---
title: HashiCorp Vault Synchronizer
organization: Elevance Health
# featuredImg: ''
summary: |
  A CLI tool to dump all metadata and configurations for all data stored in HashiCorp Vault Enterprise
---

Due to many limitations in HashiCorp Vault for answering audit-related questions, a tool was built to pull down a local cache of data on the filesystem that can be more searched than numerous HTTP API calls. For cases where an in-depth analysis was needed, it became much easier to answer these questions when it is a matter of running `grep -R` instead of walking each HTTP endpoint directly.

Types of questions answered:

- Who has access to `$SecretX`?
- Where is the AWS secrets engine mounted which has access to `$AwsAccountNum`?
- What policies exist, but are unassigned and can safely be removed?
- In which namespace does an Entity with the id of `$id` exist?
- What secrets engines are used in each namespace?
- What versions of `$VaultPlugin` are expected to exist for all instances of `$SecretsEngine` mount to work?
- How many KV secrets are stored?
- Which settings on Vault are not reflected in the Terraform code of the workspace that manages the Vault service?

## Platform

- MacOS / Linux / Windows workstations
- Go v1.22
- HashiCorp Vault Enterprise (>= v1.11)

## Features

- Answering audit-related questions (e.g., "who has access to this set of secrets?") with small margin of error
- Providing a macroscopic view of Vault usage and settings
- Providing a point-in-time, microscopic view of Vault settings without exposing secrets
- Support for Vault Enterprise features

## Obstacles

- Network I/O makes each sync take a long time
- High load on the Vault service
- Knowing when each locally-cached response is still valid and does not need refreshed
