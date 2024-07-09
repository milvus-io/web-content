---
id: chunk_cache.md
title: Configure Chunk Cache
---

# Configure Chunk Cache

The chunk cache mechanism enables Milvus to pre-load data into cache on the local hard disk of the query nodes before it is needed. This mechanism significantly improves vector retrieval performance by reducing the time it takes to load data from disk to memory.

## Background

Before conducting queries to retrieve vectors, Milvus needs to load the data from object storage to the memory cache on the local hard disk of the query nodes. This is a time-consuming process. Before all data is loaded, Milvus may respond to some vector retrieval requests with a delay.

To improve the query performance, Milvus provides a chunk cache mechanism to pre-load data from object storage into the cache on the local hard disk before it is needed. When a query request is received, the Segcore first checks if the data is in the cache, instead of the object storage. If the data is in the cache, Segcore can quickly retrieve it from the cache and return the result to the client.

## Configure Chunk Cache

This guide provides instructions on how to configure the chunk cache mechanism for a Milvus instance. Configuration varies with the way you install the Milvus instance.

- For Milvus instances installed using Helm Charts

  Add the configuration to the `values.yaml` file under the `config` section. For details, refer to [Configure Milvus with Helm Charts](configure-helm.md).

- For Milvus instances installed using Docker Compose

  Add the configuration to the `milvus.yaml` file you have used to start the Milvus instance. For details, refer to [Configure Milvus with Docker Compose](configure-docker.md).

- For Milvus instances installed using Operator

  Add the configuration to the `spec.components` section of the `Milvus` custom resource. For details, refer to [Configure Milvus with Operator](configure_operator.md).

### Configuration options

```yaml
queryNode:
    cache:
        warmup: async
```

The `warmup` parameter determines whether Milvus pre-loads data from the object storage into the cache on the local hard disk of the query nodes before it is needed. This parameter defaults to `disable`. Possible options are as follows:

- `async`: Milvus pre-loads data asynchronously in the background, which does not affect the time it takes to load a collection. However, users may experience a delay when retrieving vectors for a short period of time after the load process is complete.  This is the default option.
- `sync`: Milvus pre-loads data synchronously, which may affect the time it takes to load a collection. However, users can perform queries immediately after the load process is complete without any delay. 
- `disable`: Milvus does not pre-load data into the memory cache.

Note that the chunk cache settings also apply when new data is inserted into collections or the collection indexes are rebuilt.

### FAQ

- **How can I determine whether the chunk cache mechanism is working correctly?**

    You are advised to check the latency of a search or query request after loading a collection. If the latency is significantly higher than expected (e.g., several seconds), it may indicate that the chunk cache mechanism is still working.

    If the query latency stays high for a long time. You can check the throughput of the object storage to ensure that the chunk cache is still working. In normal cases, the working chunk cache will generate high throughput on the object storage. Alternatively, you can simply try chunk cache in the `sync` mode.

