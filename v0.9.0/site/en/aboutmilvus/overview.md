---
id: overview.md
title: Milvus Overview
sidebar_label: Milvus Overview
---

# Milvus Overview

## What is Milvus

As an open source vector similarity search engine, Milvus is easy-to-use, highly reliable, scalable, robust, and blazing fast. Adopted by over 100 organizations and institutions worldwide, Milvus empowers applications in a variety of fields, including image processing, computer vision, natural language processing, voice recognition, recommender systems, drug discovery, and more.

## Key features

- Comprehensive Similarity Metrics

  Milvus offers frequently used similarity metrics, including Euclidean distance, inner product, Hamming distance, Jaccard distance, etc, allowing you to explore vector similarity in the most effective and efficient way possible.

- Leading-Edge Performance

  Milvus is built on top of multiple optimized Approximate Nearest Neighbor Search (ANNS) indexing libraries, such as faiss, annoy, and hnswlib, ensuring that you always get the best performance across various scenarios.

- Dynamic Data Management
  
  No longer troubled by static data, you can operate data with insertion, deletion, search and update whenever needed. 

- Near Real Time Search
  
  Data is available for search almost immediately after being inserted and updated. Milvus does the heavy lifting in your best interests in terms of both result accuracy and data consistency.

- Cost-Efficient
  
  Milvus harnesses the parallelism of modern processors and enables billion-scale similarity searches in milliseconds on a single off-the-shelf server. 

- Rich Data Type and Advanced Search (coming soon)
  
  Milvus supports various data types for fields in a record. You can also use advanced search methods, such as filtering, sorting and aggregation for one or multiple fields.

- Highly Scalable and Robust
  
  You can deploy Milvus in a distributed environment. To increase the capacity and reliability of a Milvus cluster, you can simply add more nodes.

- Cloud Native
  
  We make it easy for you to run Milvus on public cloud, private cloud, or anywhere in between.

- Ease of Use

  Milvus provides easy-to-use SDKs in Python, Java, Go and C++, as well as RESTful APIs.


## Overall architecture

![Milvus architecture](../../../assets/milvus_arch.png)

## What's next

- Explore more concepts of [vectors](vector.md), [vector search](index_method.md) and [vector database](vector_db.md)
- [Install Milvus](../guides/get_started/install_milvus/install_milvus.md) and start to explore around

