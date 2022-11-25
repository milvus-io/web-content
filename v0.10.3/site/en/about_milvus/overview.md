---
id: overview.md
---

# What is Milvus 

## Overview

Milvus is an embeddings similarity search engine that is highly flexible, reliable, and blazing fast. It supports adding, deleting, updating, and near-real-time search of embeddings on a scale of trillion bytes. By encapsulating multiple widely adopted index libraries, such as Faiss, NMSLIB, and Annoy, it provides a comprehensive set of intuitive APIs, allowing you to choose index types based on your scenario. By supporting filtering of scalar data, Milvus takes the recall rate even higher and adds more flexibility to your search. 


Milvus runs on the client-server model.

- The Milvus server comprises two parts: Milvus Core and Meta Store.

    * Milvus Core stores and manages embeddings and scalar data.
    * Meta Store stores and manages metadata in SQLite for testing or MySQL for production. 

- On the client side, Milvus provides SDKs in Python, Java, Go, and C++, as well as RESTful APIs. 

Milvus was released under the Apache 2.0 License and officially open sourced in October 2019. It is an incubation project under [LF AI Foundation](https://lfai.foundation/). The source code of Milvus is hosted on [GitHub](https://github.com/milvus-io/milvus).


<div class="alert note">
The Milvus server runs on a standalone node. For scenarios involving large datasets or requiring high concurrency, check out Mishards, our cluster sharding middleware that is currently under development.
</div>

## Overall architecture

![Milvus architecture](../../../assets/milvus_arch.png)


## Scenarios

Milvus has been used in hundreds of organizations and institutions worldwide mainly in the following scenarios:

- Image, video, and audio search.
- Text search, recommender system, interactive question answering system, and other text search fields.
- Drug discovery, genetic screening, and other biomedical fields.

See [Scenarios](https://milvus.io/bootcamp) for more information. 

## Key features


#### Heterogeneous computing

- Optimizes search and indexing performance for GPU.
- Completes a search in milliseconds for datasets on a scale of trillion Bytes.
- Manages datasets in a dynamic environment.

#### Compatible with mainstream libraries, metrics, and tooling

- Encapsulates Faiss, NMSLIB, and Annoy libraries.
- Supports Quantization, Graph-based, and Tree-based indexes.
- Similarity metrics including Euclidean distance (L2), Inner Product, Hamming distance, Jaccard distance, and more.
- Prometheus and Grafana for monitoring and visualization of runtime metrics.

#### Near-real-time (NRT) search

- Inserted datasets are searchable in one second.

#### Scalar field filtering (coming soon)

- Supports embeddings and scalar data. 
- Adds more flexibility to your search by supporting filtering of scalar data.

## Milvus distributions
<a name='distributions'></a>

Milvus comes in two distributions: CPU-only Milvus and GPU-enabled Milvus.

<ul>
<li>CPU-only Milvus only supports using CPU to search or build index. 
</li> 
<li>GPU-enabled Milvus supports GPU acceleration for searching and index building: You can use CPU for searching and GPU for index building at the same time to improve query efficiency.</li>
</ul>

If your GPU supports CUDA, then you can install GPU-enabled Milvus to achieve much higher search performance in large-scale datasets.

For more information, see [Milvus Distributions](milvus_distributions-cpu.md).

## Join our community

Before joining our developer community, please take some time reading [our code contribution guidelines](https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md#contributing-to-milvus).

If you have questions about functions or SDKs of Milvus, you can join our [GitHub Discussions](https://github.com/milvus-io/milvus/discussions) or [our Slack channel](https://join.slack.com/t/milvusio/shared_invite/zt-e0u4qu3k-bI2GDNys3ZqX1YCJ9OM~GQ).