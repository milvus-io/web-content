---
id: disk_index.md
related_key: disk_index
summary: Disk index mechanism in Milvus.
title: On-disk Index
---

# On-disk Index

This article introduces an on-disk indexing algorithm named DiskANN. Based on Vamana graphs, DiskANN powers efficient searches within large datasets.

To improve query performance, you can [specify an index type](index-vector-fields.md) for each vector field. 

<div class="alert note"> 
Currently, a vector field only supports one index type. Milvus automatically deletes the old index when switching the index type.
</div>

## Prerequisites

To use DiskANN, note that
- DiskANN is enabled by default. If you prefer in-memory index over on-disk index, you are advised to disable this feature for a better performance.
  - To disable it, you can change `queryNode.enableDisk` to `false` in your milvus configuration file.
  - To enable it again, you can set `queryNode.enableDisk` to `true`.
- The Milvus instance runs on Ubuntu 18.04.6 or a later release.
- The Milvus data path should be mounted to an NVMe SSD for full performance:
  - For a Milvus Standalone instance, the data path should be **/var/lib/milvus/data** in the container where the instance runs.
  - For a Milvus Cluster instance, the data path should be **/var/lib/milvus/data** in the containers where the QueryNodes and IndexNodes run.

## Limits

To use DiskANN, ensure that you
- Use only float vectors with at least 1 dimensions in your data.
- Use only Euclidean Distance (L2) or Inner Product (IP) to measure the distance between vectors.

## Index and search settings

 - Index building parameters

   When building a DiskANN index, use `DISKANN` as the index type. No index parameters are necessary.

- Search parameters

  | Parameter     | Description                         | Range                                           |
  | ------------- | ----------------------------------- | ----------------------------------------------- |
  | `search_list` | Size of the candidate list, a larger size offers a higher recall rate with degraded performance. | [topk, int32_max] |

## DiskANN-related Milvus configurations

DiskANN is tunable. You can modify DiskANN-related parameters in `${MILVUS_ROOT_PATH}/configs/milvus.yaml` to improve its performance.

```YAML
...
DiskIndex:
  MaxDegree: 56
  SearchListSize: 100
  PQCodeBugetGBRatio: 0.125
  SearchCacheBudgetGBRatio: 0.125
  BeamWidthRatio: 4.0
...
```

| Parameter | Description | Value Range | Default Value |
| --- | --- | --- | --- |
| `MaxDegree` | Maximum degree of the Vamana graph. <br> A larger value offers a higher recall rate but increases the size of and time to build the index. | [1, 512] | 56 | 
| `SearchListSize` | Size of the candidate list. <br> A larger value increases the time spent on building the index but offers a higher recall rate. <br> Set it to a value smaller than `MaxDegree` unless you need to reduce the index-building time. | [1, int32_max] | 100 |
| `PQCodeBugetGBRatio` | Size limit on the PQ code. <br> A larger value offers a higher recall rate but increases memory usage. | (0.0, 0.25] | 0.125 |
| `SearchCacheBudgetGBRatio` | Ratio of cached node numbers to raw data. <br> A larger value improves index-building performance with increased memory usage. | [0.0, 0.3) | 0.10 |
| `BeamWidthRatio` | Ratio between the maximum number of IO requests per search iteration and CPU number. | [1, max(128 / CPU number, 16)] | 4.0 |

## Troubleshooting

- How to deal with the `io_setup() failed; returned -11, errno=11:Resource temporarily unavailable` error?

  The Linux kernel provides the Asynchronous non-blocking I/O (AIO) feature that allows a process to initiate multiple I/O operations simultaneously without having to wait for any of them to complete. This helps boost performance for applications that can overlap processing and I/O.

  The performance can be tuned using the `/proc/sys/fs/aio-max-nr` virtual file in the proc file system. The `aio-max-nr` parameter determines the maximum number of allowable concurrent requests.

  The `aio-max-nr` defaults to `65535`, you can set it up to `10485760`.
