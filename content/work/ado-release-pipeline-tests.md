---
title: Azure Pipelines Automation
organization: KAR Global
featuredImg: /work/woman-computer-doodle.svg
summary: |
  Testing and mutation framework for working with Azure DevOps' release pipelines en masse
---

Manage 10s or 100s of release pipelines uniformly using a data pipeline approach ("mutators"). Testing for uniformity of release pipelines in the areas which matter, as defined by the user in the tests, by using [PyTest].

Used during a migration of 93 discrete applications and libraries from Jenkins + (on-prem) VM deployment approach to use Azure Pipelines + (on-prem) Kubernetes. This ensured uniformity among all 93 applications while still allowing for unique patterns among a subset of applications.

<figure>
<img alt="Azure Pipelines" src="/work/azure-pipelines.png" />
<caption><em>Credit: <a href="https://devblogs.microsoft.com/devops/automating-releases-in-github-through-azure-pipelines/" rel="nofollow">devblogs.microsoft.com</a></em></caption>
</figure>

<small></small>

[PyTest]: https://docs.pytest.org/en/latest/

## Platform

- Azure DevOps Release Pipelines
- Python 3.8
- PyTest

## Features

- Mutators make surgical changes to each pipeline passed, getting latest copy at start and uploading changed copy at the end
- Tests include business-specific requirements including, but not limited to:
  - Who is permitted to approve deployment to a given environment
  - Order in which to promote the build artifact to each environment
  - Details of each task in deploying to each environment (for uniformity)
- Library of helper functions to make tests more readable (e.g., `is_bash_task()` compares GUID of task object with known GUID for Bash task)

## Obstacles

- Opaque or incomplete API documentatation, relying on the official Python SDK to fill in the gaps
- Reverse engineering undocumented (public) APIs for Secure Files interactivity
