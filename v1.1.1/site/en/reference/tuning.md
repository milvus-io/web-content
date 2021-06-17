---
id: tuning.md
---

# Performance tuning

## Tune insertion performance

<div class="alert note">
See <a href="storage_operation.md">Storage Operations</a> for the basic procedure from inserting data to writing data to disk.
</div>


If the amount of data is less than the upper limit of a single insertion (256 MB), batch insertion is much more efficient than a single insertion.

The following parameters in the system configuration file have an impact on the insertion performance:

- `wal.enable`

This parameter is used to enable or disable the [Write Ahead Log (WAL)](write_ahead_log.md) function (enabled by default). The processes of inserting data when write ahead log is enabled or disabled are as follows:

* When write ahead log is enabled, the write ahead log module writes data to the disk, and then turns to the insert operation.
* When write ahead log is disabled, the data insertion speed is faster. The system directly writes the data to the mutable buffer in the memory and immediately turns to the insert operation.

`delete` operations are faster when write ahead log is enabled. We recommend that you enable write ahead log to ensure reliability of your data. 

- `storage.auto_flush_interval`

This parameter (1 second by default) refers to the interval time of the data flushing task in the background. Increasing this value can reduce the number of segment merges, reduce disk I/O, and increase the throughput rate of insert operations.

<div class="alert note">
Milvus cannot search for data that has not been flushed within this time interval.
</div>

Besides, the parameter `index_file_size`, which is used when creating collections, has an impact on the insertion performance. The value of this parameter is 1024 MB by default and 128 GB at most. The larger the `index_file_size`, the more time it takes to merge data to the size set by this parameter, which affects the throughput rate of the insert operation. The smaller the parameter, the more data segments are generated. This may worsen query performance.

Besides software-level elements, network bandwidth and storage media also play a role in the insertion performance.

## Tune query performance

Factors that affect query performance include hardware environment, system parameters, indexes, and query scale.

### Hardware environment

- When CPU is used for calculations, query performance depends on the CPU's frequency, number of cores, and supported instruction set.

<div class="alert note">
Milvus has better query performance on CPUs that support the AVX instruction set.
</div>


- When GPU is used for calculations, query performance depends on the GPU's parallel computing capabilities and transmission bandwidth.

### System parameters

<div class="alert note">
See <a href="milvus_config.md">Milvus server configuration</a> for information about how to configure system parameters.
</div>


- `cache.cache_size`

This parameter (4 GB by default) refers to the size of the cache space used for resident query data. If the cache space is insufficient to hold the required data, the data will be temporarily loaded from the disk during the query, which seriously affects query performance. Therefore, `cache_size` should be greater than the amount of data required by the query.

- The data size of the floating-point original vector can be estimated by "total number of vectors × dimension × 4". 
- The data size of the binary type original vector can be estimated by "total number of vectors × dimension ÷ 8".

After the indexes are created (FLAT is not included), the index files require additional disk space and the query only needs to load the index files.

* The data volume of the IVF_FLAT index is basically equal to the total data volume of its original vectors.
* The data volume of the IVF\_SQ8 / IVF\_SQ8H index is equivalent to 25% to 30% of the total data volume of the original vectors.
* The data volume of the IVF_PQ index changes according to its parameters, which is generally lower than 10% of the total data volume of the original vectors.
* The data volume of HNSW/RNSG/Annoy index is greater than the total data volume of the original vectors.

<div class="alert note">
By calling <code>get_collection_stats</code>, you can get the total amount of data required to query a collection.
</div>


- `gpu.gpu_search_threshold`

In the GPU version, GPU is enabled for query when the number of target vectors is greater than or equals to the `gpu_search_threshold` (1000 by default).

The performance of GPU queries depends on GPU and the speed at which the CPU loads data to the graphic memory. The advantages of parallel computing with GPUs cannot be fully utilized when processing a small number of target vectors. Only when the number of target vectors reaches a certain threshold, the query performance on GPUs will be better than on CPUs. In practice, the ideal value of this parameter can be obtained based on experimental comparison.

- `gpu.resource_resources`

Specifies the GPU devices used for querying. For scenarios with a large number of query target vectors, using multiple GPUs can significantly improve query efficiency.

- `gpu.build_index_resources`

Specifies the GPU devices used for indexing. For scenarios where data insertion and querying are concurrent, you can use GPUs to build indexes to avoid the index building task competing for CPU resources with the query task. 

### Index

<div class="alert note">
See <a href="index.md">Index Overview</a> for the basic concepts of vector index.
</div>

To choose the right index, you need to trade off between multiple indicators such as storage space, query performance, and query recall rate.

- FLAT index

FLAT is a brute-force search for vectors. It has the slowest search speed, but has the highest recall rate (100%) and takes up the smallest amount of disk space.

As the number of target vectors increases, the time spent on using CPUs to perform FLAT queries increases linearly. On the other hand, using GPU to perform FLAT queries guarantees the high efficiency of batch queries and little effect on the query time from the increasing number of target vectors.

- IVF Indexes

IVF indexes include IVF\_FLAT, IVF\_SQ8 / IVF\_SQ8H, and IVF\_PQ. The IVF\_SQ8 / IVF\_SQ8H and IVF\_PQ indexes perform lossy compression on vector data to reduce the disk space occupied by index files.

All IVF indexes have two parameters: `nlist` and `nprobe`. `nlist` is the indexing parameter, `nprobe` the searching parameter. For more information about the recommended values, see [Performance FAQ > How to set `nlist` and `nprobe` for IVF indexes?](performance_faq.md).

The following section provides formulae for estimating the calculation amount for queries on IVF indexes:

* The amount of calculation of a single segment = the number of target vectors × (`nlist` + (the number of vectors in a segment ÷ `nlist`) × `nprobe`)
* The number of segments = the total amount of aggregate data ÷ `index_file_size`
* The total amount of calculation of a collection = the amount of calculation of a single segment × the segment number

The larger the estimated total amount of calculation, the longer the query takes. In practice, you can get reasonable parameters through the above formulas, which provides high query performance under the premise of an acceptable recall rate.

<div class="alert note">
In scenario with continuous data insertion, because Milvus does not index segments with a size less than <code>index_file_size</code>, it uses brute-force search as the query method. The amount of calculation can be estimated by multiplying the number of target vectors by the total number of segment vectors.
</div>


- HNSW / RNSG / Annoy index

The index parameters of HNSW, RNSG, and Annoy have a more complex impact on query performance. For more information, see [Index Introduction](index.md).

### Other

- Result set

The size of the result set depends on the number of target vectors and `topk`. The size of `topk` has little effect on the calculation. However, when the number of target vectors and `topk` are large, the time spent on serializing the result set and network transmission will increase accordingly.

- MySQL

Milvus uses MySQL as a Metadata backend service. When querying data, Milvus accesses MySQL multiple times to obtain Metadata information. Therefore, the response speed of the MySQL service greatly influences the query performance of Milvus.

- Preload

When querying data for the first time, the system needs to read the data from the disk and write the data to the cache. This is time-consuming. To avoid loading data during the first query, you can call the `load_collection` API in advance, or use the system parameter `preload_collection` to specify the segment to preload when starting Milvus.

- Compact segments

To filter deleted entities, Milvus reads **delete_docs** into memory when querying data. You call `compact` to clean up deleted entities and reduce filtering operations, thereby improving query performance.

## Optimize storage

- Compact segments

Deleted entities do not participate in the calculation and takes up disk space. If a large number of entities have been deleted, you can call `compact` to free up disk space.


## FAQ

<details>
<summary><font color="#4fc4f9">Why is my GPU always idle?</font></summary>
<p>It is very likely that Milvus is using CPU for query. If you want to use GPU for query, you need to set the value of <code>gpu_search_threshold</code> in <strong>server_config.yaml</strong> to be less than <code>nq</code> (number of vectors per query).
</p>
<p>
You can use <code>gpu_search_threshold</code> to set the threshold: when <code>nq</code> is less than this value, Milvus uses CPU for queries; otherwise, Milvus uses GPU instead.
</p>
<p>
We do not recommend enabling GPU when the query number is small.
</p>
</details>
<details>
<summary><font color="#4fc4f9">Why the search is very slow?</font></summary>
Check if the value of <code>cache.cache_size</code> in <strong>server_config.yaml</strong> is greater than the size of the collection.
</details>
<details>
<summary><font color="#4fc4f9">How can I get the best performance from Milvus through setting <code>index_file_size</code>?</font></summary>
<p>You need to set <code>index_file_size</code> when creating a collection from a client. This parameter specifies the size of each segment, and its default value is 1024 in MB. When the size of newly inserted vectors reaches the specified volume, Milvus packs these vectors into a new segment. In other words, newly inserted vectors do not go into a segment until they grow to the specified volume. When it comes to creating indexes, Milvus creates one index file for each segment. When conducting a vector search, Milvus searches all index files one by one.
</p>
<p>
As a rule of thumb, we would see a 30% ~ 50% increase in the search performance after changing the value of <code>index_file_size</code> from 1024 to 2048. Note that an overly large <code>index_file_size</code> value may cause failure to load a segment into the memory or graphics memory. Suppose the graphics memory is 2 GB and <code>index_file_size</code> 3 GB, each segment is obviously too large.
</p>
<p>
In situations where vectors are not frequently inserted, we recommend setting the value of <code>index_file_size</code> to 1024 MB or 2048 MB. Otherwise, we recommend setting the value to 256 MB or 512 MB to keep unindexed files from getting too large.
</p>
See <a href="tuning.md#Index">Performance Tuning > Index</a> for more information.

</details>
<details>
<summary><font color="#4fc4f9">Why GPU-enabled query is sometimes slower than CPU-only query?</font></summary>
<p>Generally speaking, CPU-only query works for situations where <code>nq</code> (number of vectors per query) is small, whilst GPU-enabled query works best with a large <code>nq</code>, say 500.
</p>
<p>
Milvus needs to load data from the memory to the graphics memory for a GPU-enabled query. Only when the load time is negligible compared to the time to query, is GPU-enabled query faster.
</p>
</details>
<details>
<summary><font color="#4fc4f9">Why sometimes the query time for a small dataset is longer?</font></summary>
If the size of the dataset is smaller than the value of <code>index_file_size</code> that you set when creating a collection, Milvus does not create an index for this dataset. Therefore, the time to query in a small dataset may be longer. You may as well call <code>create_index</code> to build the index.
</details>
