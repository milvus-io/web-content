---
id: architecture.md
title: Architecture
deprecate: true
---

# Architecture

As a cloud-native vector database, Milvus separates storage and computation by design. To enhance elasticity and flexibility, all components in Milvus are stateless.

- [Milvus Architecture Overview](architecture_overview.md): Milvus adopts a shared-storage architecture featuring storage/computing disaggregation and scalability for its computing nodes.

- [Storage/Computing Disaggregation](four_layers.md): Milvus comprises four layers that are mutually independent in terms of scalability and disaster recovery.

- [Main Components](main_components.md): Milvus standalone includes three components while Milvus cluster includes eight microservice components and three third-party dependencies. 

- [Data Processsing](data_processing.md): A detailed description of the implementation of data insertion, index building, and data query in Milvus.
 
