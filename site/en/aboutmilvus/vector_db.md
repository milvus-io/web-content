---
id: vector_db.md
title: Other Feature Vector Search Tools
sidebar_label: Other Feature Vector Search Tools
---

# Other Feature Vector Search Tools

Currently, there are already some tools that can perform feature vector search:

## FAISS

Designed by Facebook AI, FAISS (Facebook AI Similarity Search) is a C++ library that performs similarity search for multimedia files.

FAISS provides multiple customization options about search speed, memory usage, and search accuracy. However, it is only an algorithm library and is designed for experienced developers.    

## SPTAG

SPTAG, open sourced in May, 2019 by Microsoft, is a distributed approximate nearest neighborhood search (ANN) library.

SPTAG can perform search in milliseconds for billion-scale vectors and has excellent performance in search accuracy and memory usage. However, it takes a long time for SPTAG to build graphs. Each time a new vector is added, the graph must be rebuilt.

In summary, no single algorithm can handle all scenarios in vector search in the current industry. Also, the current implementations of vector search are algorithm libraries rather than systems. As the application of AI becomes widespread, the market needs a database that can efficiently perform search for billion-scale vectors.
