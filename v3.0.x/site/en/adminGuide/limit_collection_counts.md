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
    maxGeneralCapacity: 65536

quotaAndLimits:
    limits:
        maxCollectionNum: 65536
        maxCollectionNumPerDB: 65536
```

To change the collection limit, you need to modify all three parameters together:

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| `rootCoord.maxGeneralCapacity` | Maximum number of collection units (shards × partitions) that the current instance can hold. | `65536` |
| `quotaAndLimits.limits.maxCollectionNum` | Maximum number of collections allowed across all databases in the current instance. | `65536` |
| `quotaAndLimits.limits.maxCollectionNumPerDB` | Maximum number of collections allowed in a single database. | `65536` |

For example, to increase the limit to 200,000 collections:

```yaml
rootCoord:
    maxGeneralCapacity: 200000

quotaAndLimits:
    limits:
        maxCollectionNum: 200000
        maxCollectionNumPerDB: 200000
```

<div class="alert note">

Setting only `maxGeneralCapacity` without also adjusting `maxCollectionNum` and `maxCollectionNumPerDB` will not take effect. All three parameters must be set to the same value or higher to increase the collection limit.

</div>

## Calculating the number of collections

In a collection, you can set up multiple shards and partitions. Shards are logical units used to distribute data write operations among multiple data nodes. Partitions are logical units used to improve data retrieval efficiency by loading only a subset of collection data. When calculating the number of collections in the current Milvus instance, you also need to count the shards and partitions.

For example, let's assume you have already created **100** collections, with **2** shards and **4** partitions in **60** of them and with **1** shard and **12** partitions in the rest **40** collections. The total number of collection units (calculated as `shards × partitions`) can be determined as follows:

```
60 (collections) x 2 (shards) x 4 (partitions) + 40 (collections) x 1 (shard) x 12 (partitions) = 960
```

In this example, the calculated total of 960 collection units represents the current usage. The `maxGeneralCapacity` defines the maximum number of collection units an instance can support, which is set to `65536` by default. This means the instance can accommodate up to 65,536 collection units. If the total number exceeds this limit, the system will display the following error message:

```shell
failed checking constraint: sum_collections(parition*shard) exceeding the max general capacity:
```

To avoid this error, you can either reduce the number of shards or partitions in existing or new collections, delete some collections, or increase the collection limit by modifying `maxGeneralCapacity`, `maxCollectionNum`, and `maxCollectionNumPerDB` together.
