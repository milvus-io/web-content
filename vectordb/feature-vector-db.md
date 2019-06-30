---
id: feature-vector-db
title: Feature vector database
sidebar_label: Feature vector database
---

# Feature vector database

## Feature vector database
We have agreed that feature vectors are the basic elements to precisely represent multimedia objects. But are there any ideal database that allows the efficient storing and indexing of feature vectors? Let's start by looking at some competent tools of feature vector indexing available in the market:

### FAISS

Designed by Facebook AI, and written in C++, FAISS (Facebook AI Similarity Search) is a library that allows developers to quickly search for embeddings of multimedia documents that are similar to each other. 

|  Pros                     |      Cons                           |
|---------------------------| ------------------------------------|
| Distributed, multi-GPU computing    | Only a algorithm library            |
| Customization supported in indexing speed, search speed, CPU usage and search precision | Users need much expertise knowledge to be able to add customizations of algorithms and parameters  |                       



### SPTAG

SPTAG, open sourced in May, 2019 by Microsoft, is a distributed approximate nearest neighborhood search (ANN) library which provides a high quality vector index build, search and distributed online serving toolkits for large scale vector search scenario.

| Pros                        |    Cons                   |
|-----------------------------| --------------------------|
| High search speed & search precision  |  Subject to limitaions of graph-based search (graph construction takes a long time, especially when new vectors are to be added| 

Although FAISS and SPTAG allow developers to build vector index and search, they are still libraries, not full-winged, ready-to-use vector indexing database system. 

So is there such an ideal vector indexing database system available for use? Yes.

