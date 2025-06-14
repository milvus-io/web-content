---
id: architecture_overview.md
summary: Milvus provides a fast, reliable, and stable vector database built specifically for similarity search and artificial intelligence.
title: Milvus Architecture Overview
---

# Milvus Architecture Overview

Built on top of popular vector search libraries including Faiss, HNSW, DiskANN, SCANN and more, Milvus is an **open-source**, **cloud-native** vector database designed to provide high-performance similarity search for massive vector datasets. It aims to empower the scenarios such as AI applications, unstructured data retrieval and more. Before proceeding, familiarize yourself with the [basic principles](glossary.md) of embedding retrieval. 

Milvus also supports data sharding, streaming data ingestion, dynamic schema, search combine vector and scalar data, multi-vector and hybrid search, sparse vector and many other advanced functions. The platform offers performance on demand and can be optimized to suit any embedding retrieval scenario. We recommend deploying Milvus using Kubernetes for optimal availability and elasticity. 

Following the principle of data plane and control plane disaggregation, Milvus comprises [four layers](four_layers.md): access layer, coordinator, worker nodes (Streaming Node, Query Node, Data Node), and storage (WAL, Meta, Object Storage), each of which can be scaled out or recovered without impacting the others.

Milvus adopts a shared-storage architecture with fully disaggregated storage and compute layers, enabling horizontal scaling of compute nodes. By implementing Woodpecker as a zero-disk WAL layer, Milvus becomes increasingly elastic and cloud-native, while also reducing operational overhead. By separating stream processing into StreamingNode (SN), batch processing into QueryNode (QN) and DataNode (DN), Milvus achieves high performance while meeting real-time processing requirements simultaneously.

![Architecture_diagram](../../../../assets/milvus_architecture_2_6.png "Milvus architecture.")

According to the figure, interfaces can be classified into the following categories:

- **DDL / DCL:** createCollection / createPartition / dropCollection / dropPartition / hasCollection / hasPartition
- **DML:** insert / delete / upsert
- **DQL:** search / query

## What's next

- Learn more about [Computing/Storage Disaggregation](four_layers.md) in Milvus
- Learn about the [Main Components](main_components.md) in Milvus.
