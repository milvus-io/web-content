---
id: overview
title: Milvus Overview
sidebar_label: Milvus Overview
---

# Milvus Overview

## What is Milvus

Milvus is a distributed feature vector search engine which provides state-of-the-art similarity search and analysis of feature vectors. 

## Key features

- GPU-accelerated search engine

Milvus uses CPU/GPU heterogeneous computing architecture to process feature vectors and are orders of magnitudes faster than traditional databases.

- Intelligent index

Milvus is based on quantization indexing, tree-based indexing, and graph indexing algorithms. You can easily deploy machine learning algorithms to Milvus without migrating data across systems. 

- Strong scalability

Milvus separates computation from storage, which enables you to scale the data size without redesigning the system.

- High robustness

The distributed architecture allows Milvus to keep functioning when part of the components fails.

- High compatibility

Milvus is compatible with mainstream machine learning models and programming languages.

- Ease of use

Milvus is easy to install and enables you to exclusively focus on feature vectors. You can directly use Milvus to process feature vectors without any extra pre-processing.

- Visualized Performance Monitoring

You can track system performance on Prometheus-based GUI monitor dashboard.

## Overall architecture
![Milvus architecture](assets/milvus_arch.png)

## What's next

- Explore more concepts of [vectors](vector.md), [vector search](index_method.md) and [vector database](vector_db.md)
- Get a quick glimpse of [Milvus Quick Start](../QuickStart.md)
- [Install Milvus](../userguide/install_milvus.md) and start to explore around
