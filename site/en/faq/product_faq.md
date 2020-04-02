---
id: product_faq.md
title: Product FAQ
sidebar_label: Product FAQ
---

# Product FAQ

<!-- TOC -->

- [Does Milvus 0.7.0 support data files from previous versions of Milvus?](#Does-Milvus-070-support-data-files-from-previous-versions-of-Milvus)
- [Does Milvus 0.7.0 support server configuration files from previous versions of Milvus?](#Does-Milvus-070-support-server-configuration-files-from-previous-versions-of-Milvus)
- [Does Milvus 0.7.0 support applications built by clients from previous versions of Milvus?](#Does-Milvus-070-support-applications-built-by-clients-from-previous-versions-of-Milvus)
- [What is Milvus?](#What-is-Milvus)
- [When is Milvus a good choice?](#When-is-Milvus-a-good-choice)
- [How to use Milvus?](#How-to-use-Milvus)
- [How easy is it to use Milvus?](#How-easy-is-it-to-use-Milvus)
- [Is Milvus highly available?](#Is-Milvus-highly-available)
- [Can Milvus handle datasets with 10-billion or 100-billion scale?](#Can-Milvus-handle-datasets-with-10-billion-or-100-billion-scale)
- [How does Milvus work?](#How-does-Milvus-work)
- [Which index methods are supported?](#Which-index-methods-are-supported)
- [Does Milvus support simultaneous inserting and searching?](#Does-Milvus-support-simultaneous-inserting-and-searching)
- [Where are the data stored?](#Where-are-the-data-stored)
- [How does Milvus compare to other vector search tools?](#How-does-Milvus-compare-to-other-vector-search-tools)
- [Is Milvus an end-to-end product?](#Is-Milvus-an-end-to-end-product)
- [Have questions that were not answered?](#Have-questions-that-were-not-answered)

<!-- /TOC -->

#### Does Milvus 0.7.0 support data files from previous versions of Milvus?

No. Milvus 0.7.0 cannot directly use data files from previous versions of Milvus. You must import data again.

#### Does Milvus 0.7.0 support server configuration files from previous versions of Milvus?

No, Milvus 0.7.0 does not support server configuration files (`server_config.yaml`) from previous versions of Milvus.

#### Does Milvus 0.7.0 support applications built by clients from previous versions of Milvus?

No. The client interface in Milvus 0.7.0 have been updated. Applications based on previous versions of Milvus must also be updated before they can support Milvus 0.7.0.

#### What is Milvus?

Milvus is an open source similarity search engine for massive-scale feature vectors. It is built with heterogeneous computing architecture for the best performance and cost efficiency. Searches over billion-scale vectors take only milliseconds with minimum computing resources. It can be easily deployed on both bare metal and cloud platforms with Linux operating systems.

#### When is Milvus a good choice?

Milvus is best suited for applications that require reliable and efficient similarity search of large-scale vectors, and millisecond response times, regardless of scale. 

Milvus returns single-row reads in 0.6 ms or less and single-row writes in approximately 0.03 ms, and supports a variety of indexes for optimizing query performance. It can also be used in hybrid search for both structured and unstructured data.

#### How to use Milvus?

Milvus provides various [clients](../reference/sdk.md) and supports all gRPC communication types. 

#### How easy is it to use Milvus?

Milvus can be easily installed with docker images. You can use APIs for vector insertion, deletion, and search. For more details, see [Install Milvus](../guides/get_started/install_milvus/install_milvus.md).

To start your first vector search program, please go to [Milvus example code](../guides/get_started/example_code.md).

#### Is Milvus highly available?

Milvus supports write-ahead logging (WAL), which ensures the atomicity and durability of data operations. In distributed scenarios, Milvus ensures continuous service capability in case of any single point of failure.

#### Can Milvus handle datasets with 10-billion or 100-billion scale?

Milvus provides Mishards, a sharding middleware for Milvus, to establish an orchestrated cluster, which can process datasets with 10-billion or 100-billion scale. However, Mishards is still in the experimental phase and is not recommended for production. Refer to [Mishards Readme](https://github.com/milvus-io/milvus/blob/0.6.0/shards/README.md) for more information.

#### How does Milvus work?

When vectors are imported into Milvus, they will be stored and indexed. Each vector is assigned a unique ID. User-defined vector IDs are also supported. When vector are searched, IDs of the most similar vectors will be returned.

#### Which index methods are supported?

Please refer to [Index Types](../guides/index.md) for supported index methods.

#### Does Milvus support simultaneous inserting and searching?

Yes.

#### Where are the data stored?

Vectors that have been imported into Milvus are stored in your local disk. Metadata can be stored either in MySQL or SQLite 3.

#### How does Milvus compare to other vector search tools?

Milvus is the only one that is a high-performance and easy-to-use vector search engine and scales easily.

#### Is Milvus an end-to-end product?

Not yet. Milvus accepts vectors as input and returns vectors through queries. You cannot use Milvus to extract features from unstructured data.

#### Have questions that were not answered?
If you still have questions that are not covered in this list, you can take the following steps to find an answer:

- Visit our [Milvus](https://github.com/milvus-io/milvus/issues) on GitHub to ask questions, share ideas, and help other users.
- Check the list of [Operational FAQ](operational_faq.md) to get answers to frequently asked questions about operating Milvus.
- Join our [Slack community](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk) to discuss and communicate with other users.

