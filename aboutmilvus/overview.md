---
id: overview
title: Milvus Overview
sidebar_label: Milvus Overview
---

# Milvus Overview

## What is Milvus

Milvus is the state-of-the-art similarity search engine for massive unstructured data AKA feature vectors. 

## Key features

- Heterogeneous architecture

  Designed with heterogeneous computing architecture for best performance and cost efficiency.

- indexes

  Milvus supports quantization indexing, tree-based indexing, and graph indexing algorithms.

- Intelligent scheduling

  Milvus optimizes the search computation and index building according to your data size and available resources.

- Horizontal scalability

  Milvus expands computation and storage by adding nodes during runtime, which allows you to scale the data size without redesigning the system.

- High availibility

  The distributed cluster architecture provides continued service when some of the system components fail.

- High compatibility

  Milvus is compatible with mainstream machine learning models and programming languages.

- Ease of use

  Milvus is easy to install and enables you to exclusively focus on feature vectors. You can directly use Milvus to process feature vectors without pre-processing.

- Visualized performance monitoring

  You can track system performance on Prometheus-based GUI monitor dashboard.

## Overall architecture
![Milvus architecture](assets/milvus_arch.png)

## What's next

- Explore more concepts of [vectors](vector.md), [vector search](index_method.md) and [vector database](vector_db.md)
- [Install Milvus](../userguide/install_milvus.md) and start to explore around
