---
title: Lessons in EKS
date: 2024-05-10T01:13:31-04:00
---

I took for granted that managed Kubernetes offerings, like Amazon's Elastic Kubernetes Service (EKS), would continue to Just Work (tm). What happens when they break down? Here are some lessons I've learned:

- Sometimes, with high-churn workloads (e.g., knative), the de facto CNI of `vpc-cni` breaks down and refuses to assign more IP addresses. When that happens, you're SOL.
- Despite some clever Terraform code lining up the EKS cluster version and grabbing the latest version of the `vpc-cni` EKS add-on, do not trust that it is stable enough for production use until verified directly.
- The EKS control plane (kube api) not permitting custom CNI plugins use definitely limits its utility and makes the entire deployment and verification more complex.
- Setting `hostNetwork: true` or otherwise setting `hostPort:` on all of the operators' pod templates is both less secure and very difficult for some helm-based workloads that are missing a parameter that would control that feature.
- The `hostNetwork: true` workaround will almost certainly violate any decent [Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-admission/) for the given namespace.
- The Kubernetes scheduler will still try to put a pod, which needs to expose a specific port on the host network, on a node where that same port is already in use.
- Karpenter or Cluster Autoscaler is a _must_ when using a custom CNI for IPAM. So many more nodes...
- Calico talks about eBPF and other higher-order features, but none of them seem to work reliably in EKS. Overlay VXLAN networking barely works.
- Just because a `Deployment`/`Daemonset`/`Statefulset` says its pods are healthy does not mean they are. Check the logs. All of the logs.
- Just because you've run `helm upgrade` without `--reuse-values` does not mean any out-of-band, manual changes to the resources that helm chart manages have been reverted


