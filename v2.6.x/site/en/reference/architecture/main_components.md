---
id: main_components.md
summary: Learn about the main components in Milvus standalone and cluster.
title: Main Components
---

# Main Components

There are two modes for running Milvus: Standalone and Cluster. These two modes share the same features. You can choose a mode that best fits your dataset size, traffic data, and more. For now, Milvus standalone cannot be upgraded "online" to Milvus cluster. 

## Milvus standalone

 Milvus standalone includes three components:

- **Milvus:** The core functional component. 

- **Meta Store:** The metadata engine, which accesses and stores metadata of Milvus' internal components, including proxies, index nodes, and more. 

- **Object Storage:** The storage engine, which is responsible for data persistence for Milvus.

![Standalone_architecture](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/standalone_architecture.jpg)

## Milvus cluster

**Milvus cluster** includes seven microservice components and three third-party dependencies. All microservices can be deployed on Kubernetes, independently from each other. 

### Microservice components

- Root coord
- Proxy 
- Query coord 
- Query node 
- Data coord
- Index node 
- Data node

### Third-party dependencies

- **Meta Store:** Stores metadata for various components in the cluster, e.g. etcd.
- **Object Storage:**  Responsible for data persistence of large files in the cluster, such as index and binary log files, e.g. S3
- **Log Broker:** Manages logs of recent mutation operations, outputs streaming log, and provides log publish-subscribe services, e.g. Pulsar.

![Distributed_architecture](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/distributed_architecture.jpg)

## What's next

- Read [Computing/Storage Disaggregation](four_layers.md) to understand the mechanism and design principle of Milvus.
