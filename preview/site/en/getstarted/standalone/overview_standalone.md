---
id: overview_standalone.md
title: Milvus Standalone Overview
---

# What’s Inside Milvus Standalone?

![Milvus Standalone]((../../../assets//single_host.jpg)


Milvus Standalone installs three components: Milvus, Etcd, and MinIO.

- Milvus provides the core functions of the system.

- Etcd is a metadata engine used for managing metadata access and storage for the internal components under Milvus, such as proxy node, index node, and more.

- MinIO is a storage engine that maintains data persistence for internal components under Milvus, such as proxy node, index node, and more