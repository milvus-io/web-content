---
id: overview
title: Milvus Overview
sidebar_label: Milvus Overview
---

# Milvus Overview

## What is Milvus

Milvus, designed by ZILLIZ, is a distributed feature vector indexing database management system which provides state-of-the-art similarity search and analysis of feature vectors and unstructured data. 

## Key features

- GPU-accelerated search engine

  Milvus is designed for the largest scale of vector index. CPU/GPU heterogeneous computing architecture allows you to process data at a speed 1000 times faster.

- Intelligent index

  With a “Decide Your Own Algorithm” approach, you can embed machine learning and advanced algorithms into Milvus without the headache of complex data engineering or migrating data between disparate systems. Milvus is built on optimized indexing algorithm based on quantization indexing, tree-based and graph indexing methods.

- Strong scalability

  The data is stored and computed on a distributed architecture. This lets you scale data sizes up and down without redesigning the system.

- High availability

  The distributed cluster architecture provides continued service when some of the system components fail.

- High compatibility

  Milvus is compatible with major AI/ML models and programming languages.

- Exceptional ease of use

  With Milvus, you can focus on your feature vectors, rather than managing the systems. Data is ready for indexing immediately, with superior ad-hoc performance.

  Installation is a breeze, and can be performed in a few minutes. The performance of system can be tracked real-time on Prometheus-based GUI monitor dashboard.

## Deployment types

Milvus supports single-server deployment and distributed deployment. You can choose the suitable deployment type according to your business scenarios and needs.

- Use Docker for single-server deployment
- Use Kubernetes for cluster deployment

## What's next

- Explore more concepts of [vectors](vector.md), [vector search](index_method.md) and [vector database](vector_db.md)
- Get a quick glimpse of [Milvus Quick Start](../QuickStart.md)
- [Install Milvus](../userguide/install_milvus.md) and start to explore around
