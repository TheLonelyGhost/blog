---
title: Continuous Integrated Security Services
organization: Elevance Health
# featuredImg: ''
summary: |
  A web service to abstract security tooling, business-specific conventions
---

A web service, secured via mTLS, to abstract security tools. The service implements 2 main responsibilities:

1. Pipeline Integrations
2. Protected Actions

Pipeline integrations simplify changes in security tooling, allowing longer-term changes allow tools to be easily trialed against the full scale of enterprise applications, without impacting existing pipelines. Rapid changes allow overnight pivots with no impact to application build pipelines.

Protected actions make low-risk changes, requiring powerful credentials, accessible within safe operating parameters.

<figure style="background: #EEE; border-radius: 3px; padding: 0.5em;">
<img alt="Continuous Integration" src="/work/continuous-integration.png" />
<caption><em>Credit: <a href="https://about.gitlab.com/solutions/continuous-integration/" rel="nofollow">gitlab.com</a></em></caption>
</figure>

## Platform

- Kubernetes v1.26
- Tekton Pipelines v0.56.x (as underlying batch job framework)
- Go v1.22
- HashiCorp Vault

## Features

- Container image scanning, resulting in signed images
- Static code analysis (SAST), resulting in signed git tags
- SBOMs attesting to contents of build artifacts
- Mutual TLS authentication
- HashiCorp Vault (Enterprise) auth method onboarding, namespace creation

## Obstacles

- Early investment in Tekton Pipelines lead to many breaking changes (e.g., `ClusterTask` kind &rarr; Cluster Resolver for namespaced `Task`).
- Tekton Pipelines documentation seemed comprehensive, but the team often had to read Tekton Pipeline operator source code to troubleshoot problems.
- Running own k8s cluster led to more time spent on infrastructure concerns than the application.
- Mutual TLS is not often used as a source of identity, requiring iterations just to decide how to map X.509 attributes to RBAC/ABAC paradigm.
- Many load balancers require explicit overrides to support TCP Passthru behavior for mutual TLS identity.
- Security tools often require elevated privileges (e.g., `privileged: true` pods or access to Docker daemon). Support for running within secure CI/CD systems seemed an afterthought.
