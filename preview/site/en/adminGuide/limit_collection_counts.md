---
id: limit_collection_counts.md
title: Set Limits on Collection Number
---

# Limit Collection Counts

A Milvus instance allows up to 65,536 collections. However, too many collections may result in performance issues. Therefore, it is recommended to limit the number of collections created in a Milvus instance.

This guide provides instructions on how to set limits on the number of collections in a Milvus instance.

Configuration varies with the way you install the Milvus instance.

- For Milvus instances installed using Helm Charts

  Add the configuration to the `values.yaml` file under the `config` section. For details, refer to [Configure Milvus with Helm Charts](configure-helm.md).

- For Milvus instances installed using Docker Compose

  Add the configuration to the `milvus.yaml` file you have used to start the Milvus instance. For details, refer to [Configure Milvus with Docker Compose](configure-docker.md).

- For Milvus instances installed using Operator

  Add the configuration to the `spec.components` section of the `Milvus` custom resource. For details, refer to [Configure Milvus with Operator](configure_operator.md).

## Configuration options

```yaml
rootCoord:
    maxGeneralCapacity: 1024
```

The `maxGeneralCapacity` parameter sets the maximum number of collections that the current Milvus instance can hold. The default value is `1024`.

## Calculating the number of collections

In a collection, you can set up multiple shards and partitions. Shards are logical units used to distribute data write operations among multiple data nodes. Partitions are logical units used to improve data retrieval efficiency by loading only a subset of collection data. When calculating the number of collections in the current Milvus instance, you also need to count the shards and partitions.

For example, let's assume you have already created **100** collections, with **2** shards and **4** partitions in **60** of them and with **1** shard and **12** partitions in the rest **40** collections. The current number of collections can be calculated as:

```
60 (collections) x 2 (shards) x 4 (partitions) + 40 (collections) x 1 (shard) x 12 (partitions) = 960
```

In the above example, you have already used **960** out of the default limits. Now if you want to create a new collection with **4** shards and **20** partitions, you will receive the following error prompt because the total number of collections exceeds the maximum capacity:

```shell
failed checking constraint: sum_collections(parition*shard) exceeding the max general capacity:
```

To avoid this error, you can either reduce the number of shards or partitions in existing or new collections, delete some collections, or increase the `maxGeneralCapacity` value.
