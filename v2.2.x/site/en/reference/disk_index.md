---
id: disk_index.md
related_key: disk_index
summary: Disk index mechanism in Milvus.
---

# On-disk Index

This article introduces an on-disk indexing algorithm named DiskANN. Based on Vamana graphs, DiskANN powers efficient searches within large datasets.

To improve query performance, you can [specify an index type](build_index.md) for each vector field. 

<div class="alert note"> 
Currently, a vector field only supports one index type. Milvus automatically deletes the old index when switching the index type.
</div>

## Prerequisites

To use DiskANN, note that
- You have run `make disk_index=ON` when you compile Milvus from the source.
- Your Milvus instance runs on Ubuntu 18.04.6 or a later release.
- The path **${MILVUS_ROOT_PATH}/milvus/data** has been mounted to an NVMe SSD for full performance.

## Limits

To use DiskANN, ensure that you
- Use only float vectors with at least 32 dimensions in your data.
- Use only Euclidean Distance (L2) or Inner Product (IP) to measure the distance between vectors.

## Index and search settings

 - Index building parameters

   When building a DiskANN index, use `DISKANN` as the index type. No index parameters are necessary.

- Search parameters

  | Parameter     | Description                         | Range                                           |
  | ------------- | ----------------------------------- | ----------------------------------------------- |
  | `k`           | Number of closest vectors to return | [1, 12768]                                      |
  | `search_list` | Size of the candidate list, a larger size offers a higher recall rate with degraded performance. | [k, min( 10 * k, 65535)] for k > 20 <br> [k, 200] for k <= 20 |

## DiskANN-related Milvus configurations

DiskANN is tunable. You can modify DiskANN-related parameters in `${MILVUS_ROOT_PATH}/configs/milvus.yaml` to improve its performance.

```YAML
...
DiskIndex:
  MaxDegree: 56
  SearchListSize: 100
  PQCodeBugetGBRatio: 0.125
  BuildNumThreadsRatio: 1.0
  SearchCacheBudgetGBRatio: 0.125
  LoadNumThreadRatio: 8.0
  BeamWidthRatio: 4.0
...
```

| Parameter | Description | Value Range | Default Value |
| --- | --- | --- | --- |
| `MaxDegree` | Maximum degree of the Vamana graph. <br> A larger value offers a higher recall rate but increases the size of and time to build the index. | [1, 512] | 56 | 
| `SearchListSize` | Size of the candidate list. <br> A larger value increases the time spent on building the index but offers a higher recall rate. <br> Set it to a value smaller than `MaxDegree` unless you need to reduce the index-building time. | [1, ∞] | 100 |
| `PQCodeBugetGBRatio` | Size limit on the PQ code. <br> A larger value offers a higher recall rate but increases memory usage. | (0.0, 0.25] | 0.125 |
| `BuildNumThreadsRatio` | Ratio between the number of threads used to build the index and the number of CPUs. | [1.0, 128.0 / CPU number] | 1.0 |
| `SearchCacheBudgetGBRatio` | Ratio of cached node numbers to raw data. <br> A larger value improves index-building performance with increased memory usage. | [0.0, 0.3) | 0.10 |
| `LoadNumThreadRatio` | Ratio between the number of threads used to load index/search and the number of CPUs. For details, refer to the first item in [References and Facts](disk_index#references-and-facts). | [1, 65536 / 32 / CPU number] | 8.0 |
| `BeamWidthRatio` | Ratio between the maximum number of IO requests per search iteration and CPU number. | [1, max(128 / CPU number, 16)] | 4.0 |


## References and Facts

- On the maximum number of DiskANN threads

  DiskANN uses Linux AIO to read and write the disk. The maximum number of concurrent I/O requests for each DiskANN thread is 32, and that limit on Linux is 65536. Therefore, the maximum number of DiskANN threads should be no greater than 65532 / 32 ≈ 2047.

  Note that other processes may also involve concurrent I/O operations on Linux, which is usually less than 10000. Therefore, when setting `LoadNumThreadRatio`, use a value smaller than the maximum number of DiskANN threads to calculate its upper bound.

  For your reference,

  - To check the limit on the Linux system, run

    ```Shell
    sudo sysctl -a | grep fs.aio-max-nr
    ``` 

  - To raise the limit, run 

    ```Shell
    sudo sysctl -w fs.aio-max-nr=X
    ```

- On the time spent on building and loading the DiskANN index

  Building the DiskANN index is time-consuming. For a SIFT dataset comprising 25,000,000 entries of 128-dimensional vectors, the size of the dataset is about 12.5 GB. The time spent on building an index for the dataset is about 40 minutes and that spent on loading the built index is about 13.2 minutes.