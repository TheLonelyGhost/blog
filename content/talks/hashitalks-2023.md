---
title: IRSA Evolved
location: HashiTalks 2023
---

{{< youtube id="FdCJVvYr5BI" title="IRSA Evolved: Transparent AWS Access by Any Kubernetes Workload" >}}

([slides](https://github.com/TheLonelyGhost/presentations))

## Summary

AWS provides a transparent way of using a Kubernetes service account and tying it to a specific IAM role running in that same AWS account. Amazon has dubbed this functionality "IAM Roles for Service Accounts" (IRSA) and, while relatively simple to setup, it has some notable shortcomings. What if the Kubernetes cluster isn't EKS? What if it isn't in the same AWS account? Or what if you need access to multiple AWS accounts at the same time?

The box before you contains an OpenShift cluster (or k3s, or another non-AWS Kubernetes distribution) configured with the Vault Injector, a Vault cluster configured with AWS secrets engines, and a workload that runs on this OpenShift cluster that is just starting the "crawl" phase of its integration with Vault.

Together we will discuss how these components can merge together to form a more powerful alternative to Amazon's IRSA. Our Kubernetes workload will have AWS authentication handled transparently and refreshed automatically such that any program using official AWS SDKs may use it out-of-box.
