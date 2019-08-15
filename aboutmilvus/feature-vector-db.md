---
id: feature-vector-db
title: Feature Vector Database
sidebar_label: Feature Vector Database
---

# Feature Vector Database

We have agreed that feature vectors are the basic elements to precisely represent multimedia objects. But are there any ideal database that allows the efficient storing and indexing of feature vectors? Let's start by looking at some competent tools of feature vector indexing available in the market:

## FAISS

Designed by Facebook AI, and written in C++, FAISS (Facebook AI Similarity Search) is a library for efficient similarity search and clustering of dense vectors.

FAISS provides various customization options about indexing speed, search speed, CPU usage and search precision. However, it is only but an algorithm library. In addition, users need much expertise knowledge to be able to add customizations of algorithms and parameters.       


## SPTAG

SPTAG, open sourced in May, 2019 by Microsoft, is a distributed approximate nearest neighborhood search (ANN) library which provides a high quality vector index build, search and distributed online serving toolkits for large scale vector search scenario.

SPTAG has excellent performance in search speed and search precision. However, it is subject to common limitations of graph-based search: graph construction takes a long time, especially when new vectors are added.

Although FAISS and SPTAG allow developers to build vector index and search, they are still just libraries. They are not mature, ready-to-use vector indexing database system. 

So is there such an ideal vector indexing database system available for use? Yes.

