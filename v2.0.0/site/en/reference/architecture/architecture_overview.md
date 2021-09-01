---
id: architecture_overview.md
title: Architecture Overview
---

# Milvus Architecture Overview

Built on top of popular vector search libraries including Faiss, Annoy, HNSW, and more, Milvus was designed for similarity search on dense vector datasets containing millions, billions, or even trillions of vectors. Before proceeding, familiarize yourself with the [basic principles](glossary.md) of embedding retrieval. 

Milvus also supports data sharding, data persistence, streaming data ingestion, hybrid search between vector and scalar data, time travel, and many other advanced functions. The platform offers performance on demand and can be optimized to suit any embedding retrieval scenario. We recommend deploying Milvus using Kubernetes for optimal availability and elasticity. 

Milvus adopts a shared-storage architecture featuring storage and computing disaggregation and horizontal scalability for its computing nodes. Following the principle of data plane and control plane disaggregation, Milvus comprises [four layers](four_layers.md): access layer, coordinator service, worker node, and storage. These layers are mutually independent when it comes to scaling or disaster recovery.

![Architecture_diagram](../../../../assets/architecture_diagram.png)


For more details about Milvus' architecture, see [Computing/Storage Disaggregation](four_layers.md) and [Main Components](main_components.md).
