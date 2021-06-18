---
id: vector_db.md
title: Other Feature Vector Search Tools
sidebar_label: Other Feature Vector Search Tools
---

# Other Feature Vector Search Tools

Currently, there are already some tools that can perform feature vector search:

## FAISS

Designed by Facebook AI, FAISS (Facebook AI Similarity Search) is a C++ library that performs similarity search for multimedia files.

FAISS provides multiple customization options about search speed, memory usage, and search accuracy. However, it is only an algorithm library and is designed for advanced developers.

## Hnswlib

Hnswlib uses graph-based ANNS algorithm, HNSW (Hierarchical Navigable Small World Graphs), to achieve high search speed and high precision. However, the high memory cost makes it difficult to handle billion-scale or larger datasets.

## ANNOY

ANNOY is an ANNS library released by Spotify and uses tree-based ANNS algorithm.

ANNOY has high search speed and supports reading data from multiple processes. However, because raw data is loaded to memory during search, the memory cost is high. Thus, ANNOY is also inappropriate for billion-scale or larger datasets.

## Conslusion

In summary, no single algorithm can handle all scenarios in vector search in the current industry. Also, the current implementations of vector search are algorithm libraries rather than systems. As the application of AI becomes widespread, the market needs a database that can efficiently perform search for billion-scale vectors.
