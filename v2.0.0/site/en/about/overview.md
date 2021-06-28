---
id: overview.md
title: What is Milvus
related_key: Milvus Overview
---

# What is Milvus
Milvus is an open-source vector database built to power AI applications and vector similarity search. 

It is available in:
- [Milvus standalone](install_standalone-docker.md)
- [Milvus cluster](install_cluster-docker.md)

Compatibility: 
| Milvus version | Python SDK version | Java SDK version | Go SDK version |
| ----------- | ----------- | -----------  | ----------- |
| 2.0.0-RC1   | 2.0.0-RC1   | Coming soon  | Coming soon |

Milvus 2.0.0-RC1 is the preview version of 2.0.0. It introduces Golang as the distributed layer development language and a new cloud-native distributed design. The latter brings significant improvements to scalability, elasticity, and functionality. 

## Overall Architecture
Milvus 2.0 is a cloud-native vector database with storage and computation separated by design. All components in this refactored version of Milvus are stateless to enhance elasticity and flexibility.

 The system breaks down into four levels: 
- Access layer
- Coordinator service
- Worker nodes 
- Storage 

**Access layer:** The front layer of the system and endpoint to users.  It comprises peer proxies for forwarding requests and gathering results.

**Coordinator service:** The coordinator service assigns tasks to the worker nodes and functions as the system's brain. It has four coordinator types: root coord, data coord, query coord, and index coord.

**Worker nodes:** Worker nodes are dumb executors that follow the instructions from the coordinator service. There are three types of worker nodes, each responsible for a different job: data nodes, query nodes, and index nodes.

**Storage:** The cornerstone of the system that all other functions depend on. It has three storage types: meta storage, log broker, and object storage. Kudos to the open-source communities of etcd, Pulsar, MinIO, and RocksDB for building this fast, reliable storage.

![Architecture](../../../assets/architecture_02.jpg)

For more information, see [Architecture Overview](architecture_overview.md).

## Main Components

A Milvus standalone includes three components: 
- Milvus
- etcd
- MinIO

A Milvus cluster includes eight microservice components and three third-party infrastructure service components.
Microservice components:

- Root coord
- Proxy
- Query coord
- Query node
- Index coord 
- Index node
- Data coord
- Data node

Third-party infrastructure components:

- etcd
- MinIO
- Pulsar

## Key features

#### Millisecond search on trillion vector datasets

Average latency measured in milliseconds on trillion vector datasets.

#### Simplified unstructured data management

- Rich APIs designed for data science workflows.
- Consistent user experience across laptop, local cluster, and cloud.
- Embed real-time search and analytics into virtually any application.

#### Reliable, always on vector database

Milvus’ built-in replication and failover/failback features ensure data and applications can maintain business continuity in the event of a disruption.

#### Highly scalable and elastic

Component-level scalability makes it possible to scale up and down on demand. Milvus can autoscale at a component level according to the load type, making resource scheduling much more efficient.

#### Hybrid search

In addition to vectors, Milvus supports data types such as boolean, integers, floating-point numbers, and more. A collection in Milvus can hold multiple fields for accommodating different data features or properties. Milvus pairs scalar filtering with powerful vector similarity search to offer a modern, flexible platform for analyzing unstructured data.

#### Unified Lambda structure

Milvus combines stream and batch processing for data storage to balance timeliness and efficiency. Its unified interface makes vector similarity search a breeze.

#### Community supported, industry recognized

With over 1,000 enterprise users, 6,000+ stars on GitHub, and an active open-source community, you’re not alone when you use Milvus. As a graduate project under the LF AI & Data Foundation, Milvus has institutional support.

## Scenarios
Milvus can be used in a wide variety of scenarios spanning artificial intelligence, deep learning, traditional vector calculations, and more. See [Milvus Adopters](milvus_adopters.md) for a list of specific use cases.

#### Biopharmaceutical/Healthcare

Virtual drug screening, virus structure analysis, protein property prediction, drug polymorph prediction, intelligent medical diagnosis, pathological analysis, and high-precision image retrieval.

#### E-commerce

Image search, intelligent customer service, product search, product matching, product de-duplicate, personalised recommendation, content recommendation, intelligent QA bots.

#### Internet Services and More

Personalized music recommendation, real estate listing search and recommendation, intelligent customer service, web search, app store search, text similarity search/news recommendation, removing duplicate video content, video search, and searching commodities by image.

#### Computer Software and Hardware
Corpus/image analysis and recommendation, intelligent product design.

#### Advertising, Industrial Design, and Manufacturing

Intelligent poster design, targeted advertising, and product inventory management.

## Key Concepts

#### Unstructured data

Unstructured data, including images, video, audio, and natural language, is information that doesn't follow a predefined model or manner of organization. This data type accounts for ~80% of the world's data, and can be converted into vectors using various artificial intelligence (AI) and machine learning (ML) models.

#### Vector embedding

A vector embedding is a feature abstraction of unstructured data, such as a video clip, a photo, or a sound clip. Mathematically speaking, a vector embedding is an array of floating-point numbers or binaries. Modern embedding techniques, such as artificial intelligence (AI) or machine learning (ML) models are used to convert unstructured data to vector embeddings. By projecting unstructured data to a coordinate point in an n-dimensional space, approximate nearest neighbor (ANN) algorithms can be used to calculate similarities between unstructured data. 

#### Vector similarity search

Similarity search is the process of comparing a target to a database to find objects that are most similar to it. Vector similarity search returns vectors in a database most similar to the target search vector. Approximate nearest neighbor (ANN) search algorithms are used to calculate [similarity](metric.md) between vectors. Learn more about [vector similarity search](https://zilliz.com/blog/Vector-Similarity-Search-Hides-in-Plain-View).

## Tools

#### Milvus Insight
[Milvus Insight](https://github.com/milvus-io/milvus-insight) is a graphical management system for Milvus. It features visualization of cluster states, meta management, data queries and more. Milvus Insight will eventually be open sourced.

#### Milvus DM
Data migration tool for Milvus 2.0 will be made available as soon as possible.


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

