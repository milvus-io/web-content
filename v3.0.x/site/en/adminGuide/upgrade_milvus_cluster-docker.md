---
id: upgrade_milvus_cluster-docker.md
summary: Learn which deployment methods support upgrading a Milvus cluster.
title: Upgrade Milvus Cluster with Docker Compose
deprecate: true
---

# Upgrade Milvus Cluster with Docker Compose

The Milvus 2.6.20 and Milvus v3.0-beta release assets do not include a Docker Compose configuration for cluster deployments. The release assets provide Docker Compose configurations for standalone deployments only.

Do not use the legacy component-by-component Docker Compose procedure for a 2.6.x to v3.0-beta upgrade. That procedure references coordinator and IndexNode containers that do not represent the target architecture.

To upgrade a Milvus cluster, use one of the documented Kubernetes deployment methods:

- [Upgrade Milvus Cluster with Milvus Operator](upgrade_milvus_cluster-operator.md)
- [Upgrade Milvus Cluster with Helm Chart](upgrade_milvus_cluster-helm.md)

If you maintain a custom container-based cluster deployment, reproduce the deployment in a non-production environment and validate the complete upgrade with the engineering team before changing the production system.
