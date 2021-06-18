---
id: overview.md
related_key: Milvus Overview
---

# What is Milvus 

## Overview

Milvus is an open-source vector database that is highly flexible, reliable, and blazing fast. It supports adding, deleting, updating, and near real-time search of vectors on a trillion-byte scale. A comprehensive set of intuitive APIs, and support for multiple widely adopted index libraries (e.g., Faiss, NMSLIB, and Annoy), simplifies the process of choosing the right index type for a given scenario. Additionally, support for scalar data filtering ensures Milvus maintains a high recall rate and remains adaptable.


Milvus runs on a client-server model. At a high-level, it operates as follows:

- The Milvus server includes the Milvus Core and Meta Store.

    * Milvus Core stores and manages vectors and scalar data.

    * Meta Store stores and manages metadata in SQLite for testing or MySQL for production.

- On the client side, Milvus provides SDKs in Python, Java, Go, and C++, as well as RESTful APIs.

Milvus was released under the open-source Apache License 2.0 in October 2019. It is currently an incubation-stage project under [LF AI & Data Foundation](https://lfaidata.foundation/). Milvus' source code is hosted on [GitHub](https://github.com/milvus-io/milvus).


<div class="alert note">
The Milvus server runs on a standalone node. For scenarios involving large datasets or requiring high concurrency consider Mishards, our cluster sharding middleware.
</div>

## Overall architecture

![Milvus architecture](../../../assets/milvus_arch.png)


## Scenarios

Milvus has been used in hundreds of organizations and institutions worldwide including the following scenarios:

- Image, video, and audio search.
- Recommender systems, chatbots, and other text search fields.
- New drug discovery, genetic screening, and other biomedical fields.

See [Scenarios](https://www.milvus.io/scenarios/) for more information. 

## Key features


#### Heterogeneous computing

- Optimizes search and indexing performance on GPU.
- Searches trillion-byte scale datasets in milliseconds.
- Manages inserting, deleting, updating, and querying vector data in a dynamic environment.

#### Compatible with mainstream libraries, metrics, and tooling

- Offers support for Faiss, NMSLIB, and Annoy libraries.
- Supports graph- and tree-based indexes as well as quantization.
- Measures similarity using Euclidean distance (L2), inner product, Hamming distance, Jaccard distance, and more.
- Monitors and visualizes runtime metrics using Prometheus and Grafana.

#### Near-real-time (NRT) search

- Newly inserted datasets are available for search in one second or less.

#### Scalar field filtering (coming soon)

- Makes search more flexible by allowing data to be filtered more granularly.

## Milvus distributions
<a name='distributions'></a>

Milvus is available in CPU-only and GPU-enabled distributions:

<ul>
<li>The CPU-only Milvus distribution relies on CPU exclusively to search and build indexes. 
</li> 
<li>The GPU-enabled Milvus distribution supports GPU acceleration for search and index building. For example, CPU can be used for search while GPU is used for index building, improving query efficiency.</li>
</ul>

For GPUs that support CUDA, the GPU-enabled Milvus distribution can be used to achieve much better search performance when working with large-scale datasets.

See [Milvus Distributions](milvus_distributions-cpu.md) for more information..

## Join our community

Before joining our developer community, please take some time to read [our code contribution guidelines](https://github.com/milvus-io/milvus/blob/master/CONTRIBUTING.md#contributing-to-milvus).

For questions about Milvus' functionality or SDKs, join our [GitHub Discussions](https://github.com/milvus-io/milvus/discussions) or [Slack channel](https://join.slack.com/t/milvusio/shared_invite/zt-e0u4qu3k-bI2GDNys3ZqX1YCJ9OM~GQ).
