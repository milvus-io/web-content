---
id: overview.md
title: What is Milvus
related_key: Milvus Overview
---

# What is Milvus
Milvus is an open-source vector database built to power AI applications and vector similarity search. 

Milvus [Standalone](overview_standalone.md) and Milvus [Cluster](overview_cluster.md) are both available now.

## Key Concepts

### Unstructured data

Unstructured data, including images, video, audio, and natural language, is information that doesn't follow a predefined model or manner of organization. This data type accounts for ~80% of the world's data, and can be converted into vectors using various artificial intelligence (AI) and machine learning (ML) models.

### Vector embedding

A vector embedding is a feature abstraction of unstructured data, such as a video clip, a photo, or a sound clip. Mathematically speaking, a vector embedding is an array of floating-point numbers or binaries. Modern embedding techniques, such as artificial intelligence (AI) or machine learning (ML) models are used to convert unstructured data to vector embeddings. By projecting unstructured data to a coordinate point in an n-dimensional space, approximate nearest neighbor (ANN) algorithms can be used to calculate similarities between unstructured data. 

### Vector similarity search

Similarity search is the process of comparing a target to a database to find objects that are most similar to it. Vector similarity search returns vectors in a database most similar to the target search vector. Approximate nearest neighbor (ANN) search algorithms are used to calculate [similarity](metric.md) between vectors. Learn more about [vector similarity search](https://zilliz.com/blog/Vector-Similarity-Search-Hides-in-Plain-View).

## Join Our Community

Join the Milvus community on [Slack](https://join.slack.com/t/milvusio/shared_invite/zt-e0u4qu3k-bI2GDNys3ZqX1YCJ9OM~GQ) to share your suggestions, advice, and questions with our engineering team. 

[![Milvus Slack Channel](../../../assets/slack.png)](https://join.slack.com/t/milvusio/shared_invite/zt-e0u4qu3k-bI2GDNys3ZqX1YCJ9OM~GQ)

You can also check out our [FAQ page](https://milvus.io/docs/v1.0.0/performance_faq.md) to discover solutions or answers to your issues or questions.

Subscribe to Milvus mailing lists:

- [Technical Steering Committee](https://lists.lfai.foundation/g/milvus-tsc)
- [Technical Discussions](https://lists.lfai.foundation/g/milvus-technical-discuss)
- [Announcement](https://lists.lfai.foundation/g/milvus-announce)

Follow Milvus on social media:

- [Medium](https://medium.com/@milvusio)
- [Twitter](https://twitter.com/milvusio)

