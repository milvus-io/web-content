---
id: clustering-compaction.md
title: Clustering Compaction
related_key: clustering, compaction
summary: Clustering compaction is designed to improve search performance and reduce costs in large collections. This guide will help you understand clustering compaction and how this feature can improve search performance.
---

# Clustering Compaction

Clustering compaction is designed to improve search performance and reduce costs in large collections. This guide will help you understand clustering compaction and how this feature can improve search performance.

## Overview

Milvus stores incoming entities in segments within a collection and seals a segment when it is full. If this happens, a new segment is created to accommodate additional entities. As a result, entities are arbitrarily distributed across segments. This distribution requires Milvus to search multiple segments to find the nearest neighbors to a given query vector.

![Without clustering Compaction](../../../assets/clustering-compaction.png)

If Milvus can distribute entities among segments based on the values in a specific field, the search scope can be restricted within one segment, thus improving search performance.

**Clustering Compaction** is a feature in Milvus that redistributes entities among segments in a collection based on the values in a scalar field. To enable this feature, you first need to select a scalar field as the **clustering key**. This allows Milvus to redistribute entities into a segment when their clustering key values fall within a specific range. When you trigger a clustering compaction, Milvus generates/updates a global index called **PartitionStats**, which records the mapping relationship between segments and clustering key values.

![With Clustering Compaction](../../../assets/clustering-compaction-2.png)

Using **PartitionStats** as a reference, Milvus can prune irrelevant data upon receiving a search/query request that carries a clustering key value and restricting the search scope within the segments mapping to the value, thus improving search performance. For details on performance improvement, refer to Benchmark tests.

## Use Clustering Compaction

The Clustering Compaction feature in Milvus is highly configurable. You can choose to trigger it manually or set it to be triggered automatically at intervals by Milvus. To enable clustering compaction, do as follows: 

### Global Configuration

You need to modify your Milvus configuration file as shown below.

```yaml
dataCoord:
  compaction:
    clustering:
      enable: true 
      autoEnable: false 
      triggerInterval: 600 
      minInterval: 3600 
      maxInterval: 259200 
      newDataSizeThreshold: 512m 
      timeout: 7200
     
queryNode:
  enableSegmentPrune: true 

datanode:
  clusteringCompaction:
    memoryBufferRatio: 0.1 
    workPoolSize: 8  
common:
  usePartitionKeyAsClusteringKey: true 
```

- `dataCoord.compaction.clustering` 

    | Configuration Item | Description | Default Value |
    | ------------------ | ----------- | - |
    | `enable` | Specifies whether to enable clustering compaction.<br>Setting this to `true` if you need to enable this feature for every collection having a clustering key. | `false` |
    | `autoEnable` | Specifies whether to enable automatically triggered compaction.<br>Setting this to `true` indicates that Milvus compacts the collections having a clustering key at the specified intervals. | `false` |
    | `triggerInterval` | Specifies the interval in milliseconds at which Milvus starts clustering compaction.<br>This parameter is valid only when `autoEnable` is set to `true`. | - |
    | `minInterval` | Specifies the minimum interval in milliseconds.<br>This parameter is valid only when `autoEnable` is set to `true`.<br>Setting this to an integer greater than triggerInterval helps avoid repeated compactions within a short period. | - |
    | `maxInterval` | Specifies the maximum interval in milliseconds.<br>This parameter is valid only when `autoEnable` is set to `true`.<br>Once Milvus detects that a collection has not been clustering-compacted for a duration longer than this value, it forces a clustering compaction. | - |
    | `newDataSizeThreshold` | Specifies the upper threshold to trigger a clustering compaction.<br>This parameter is valid only when `autoEnable` is set to `true`.<br>Once Milvus detects that the data volume in a collection exceeds this value, it initiates a clustering compaction process. | - |    
    | `timeout` | Specifies the timeout duration for a clustering compaction.<br>A clustering compaction fails if its execution time exceeds this value. | - |

- `queryNode`

    | Configuration Item | Description | Default Value |
    | ------------------ | ----------- | - |
    | `enableSegmentPrune` | Specifies whether Milvus prunes data by referring to PartitionStats upon receiving search/query requests.<br>Setting this to `true` enables Milvus to prune irrelevant data from segments during a search/query request. | `false` |

- `dataNode.clusteringCompaction`

    | Configuration Item | Description | Default Value |
    | ------------------ | ----------- | - |
    | `memoryBufferRatio` | Specifies the memory buffer ratio for clustering compaction tasks. <br>Milvus flushes data when the data size exceeds the allocated buffer size calculated using this ratio. | - |
    | `workPoolSize` | Specifies the worker pool size for a clustering compaction task. | - |

- `common`

    | Configuration Item | Description | Default Value |
    | ------------------ | ----------- | - |
    | `usePartitionKeyAsClusteringKey` | Specifies whether to use the partition key in collections as the clustering key.<br>Setting this to `true` indicates that the partition key is used as the clustering key.<br>You can always override this setting in a collection by explicitly setting a clustering key. | `false` |

To apply the above changes to your Milvus cluster, please follow the steps in [Configure Milvus with Helm](configure-helm.md) and [Configure Milvus with Milvus Operators](configure_operator.md).

## Collection Configuration

For clustering compacting in a specific collection, you should select a scalar field from the collection as the clustering key.

```python
default_fields = [
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True),
    FieldSchema(name="key", dtype=DataType.INT64, is_clustering_key=True),
    FieldSchema(name="var", dtype=DataType.VARCHAR, max_length=1000, is_primary=False),
    FieldSchema(name="embeddings", dtype=DataType.FLOAT_VECTOR, dim=dim)
]

default_schema = CollectionSchema(
    fields=default_fields, 
    description="test clustering-key collection"
)

coll1 = Collection(name="clustering_test", schema=default_schema)
```

<div class="alert note">

You can use the scalar fields of the following data types as the clustering key: `Int8`, `Int16`, `Int32`, `Int64`, `Float`, `Double`, and `VarChar`.

</div>

## Trigger Clustering Compaction

If you have enabled automatic clustering compaction, Milvus automatically triggers the compaction at the specified interval. Alternatively, you can manually trigger the compaction as follows:

```python
coll1.compact(is_clustering=True)
coll1.get_compaction_state(is_clustering=True)
coll1.wait_for_compaction_completed(is_clustering=True)
```

### Benchmark Test

Data volume and query patterns combined determine the performance improvement clustering compaction can bring. An internal benchmark test demonstrates that clustering compaction yields up to a 25-fold improvement in queries per second (QPS).

The benchmark test is on a collection containing entities from a 20-million, 768-dimensional LAION dataset with the key field designated as the clustering key. After clustering compaction is triggered in the collection, concurrent searches are sent until the CPU usage reaches a high water level. 

<table>
  <thead>
    <tr>
      <th rowspan="2">Search Filter</th>
      <th rowspan="2">Prune Ratio</th>
      <th colspan="5">Latency (ms)</th>
      <th rowspan="2">QPS (reqs/s)</th>
    </tr>
    <tr>
      <th>Avg</th>
      <th>Min</th>
      <th>Max</th>
      <th>Median</th>
      <th>TP99</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>None</td>
      <td>0%</td>
      <td>1685</td>
      <td>672</td>
      <td>2294</td>
      <td>1710</td>
      <td>2291</td>
      <td>17.75</td>
    </tr>
    <tr>
      <td>key > 200 and key < 800</td>
      <td>40.2%</td>
      <td>1045</td>
      <td>47</td>
      <td>1828</td>
      <td>1085</td>
      <td>1617</td>
      <td>28.38</td>
    </tr>
    <tr>
      <td>key > 200 and key < 600</td>
      <td>59.8%</td>
      <td>829</td>
      <td>45</td>
      <td>1483</td>
      <td>882</td>
      <td>1303</td>
      <td>35.78</td>
    </tr>
    <tr>
      <td>key > 200 and key < 400</td>
      <td>79.5%</td>
      <td>550</td>
      <td>100</td>
      <td>985</td>
      <td>584</td>
      <td>898</td>
      <td>54.00</td>
    </tr>
    <tr>
      <td>key == 1000</td>
      <td>99%</td>
      <td>68</td>
      <td>24</td>
      <td>1273</td>
      <td>70</td>
      <td>246</td>
      <td>431.41</td>
    </tr>
  </tbody>
</table>

As the search range narrows in the search filters, the prune ratio increases. This means that more entities are skipped during the search process. When comparing the statistics in the first and last rows, you can see that searches without clustering compaction require scanning the entire collection. On the other hand, searches with clustering compaction using a specific key can achieve up to a 25-fold improvement.

## Best practices

Here are some tips for you to use clustering compaction efficiently:

- Enable this for collections with large data volumes.
  Search performance improves with larger data volumes in a collection. It is a good choice to enable this feature for collections with over 1 million entities.

- Choose a proper clustering key.
  You can use scalar fields commonly employed as filtering conditions as the clustering key. For a collection that holds data from multiple tenants, you can utilize the field that distinguishes one tenant from another as the clustering key.

- Use the partition key as the clustering key.
  You can set `common.usePartitionKeyAsClusteringKey` to true if you want to enable this feature for all collections in your Milvus instance or if you still face performance issues in a large collection with a partition key. By doing so, you will have a clustering key and a partition key when you choose a scalar field in a collection as the partition key. 

  Note that this setting does not prevent you from choosing another scalar field as the clustering key. The explicitly designated clustering key always takes precedence.