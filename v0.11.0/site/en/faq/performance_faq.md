---
id: performance_faq.md
---

# Performance FAQ

## Why does the first search take a long time after Milvus restarts? {#1}

This is because, after restarting, Milvus needs to load data from the disk to the memory for the first vector search. You can set `preload_collection` in **milvus.yaml** and load as many collections as the memory permits. Milvus loads collections to the memory each time it restarts. 

Otherwise, you can call `load_collection()` to load collections to the memory.

## Why the search is very slow? {#2}

Check if the value of `cache.cache_size` in **milvus.yaml** is greater than the size of the collection.

## How do I improve Milvus' performance?{#3}

- Ensure that the value of `cache.cache_size` in **milvus.yaml** is greater than the size of the collection.
- Ensure that all segments are indexed. 
- Check if there are other processes on the server consuming CPU resources.
- Adjust the values of `segment_row_limit` and `nlist`.
- If the search performance is unstable, you can add `-e OMP_NUM_THREADS=NUM` when starting up Milvus, where `NUM` is 2/3 of the number of CPU cores. 

See [Performance tuning](tuning.md) for more information. 

## How to set the value of <code>nlist</code> when I build indexes? {#4}

It depends on your scenario. See [Performance tuning > Index](tuning.md#Index).

## Why sometimes the query time for a small dataset is longer? {#5}

If the size of the dataset is smaller than the value of `segment_row_limit` that you set when creating a collection, Milvus does not create an index for this dataset. Therefore, the time to query in a small dataset may be longer. You may as well call `create_index` to build the index.


## Why is my GPU always idle? {#6}

<p>It is very likely that Milvus is using CPU for query. If you want to use GPU for query, you need to set the value of <code>gpu_search_threshold</code> in <strong>milvus.yaml</strong> to be less than <code>nq</code> (number of vectors per query).
</p>
<p>
You can use <code>gpu_search_threshold</code> to set the threshold: when <code>nq</code> is less than this value, Milvus uses CPU for queries; otherwise, Milvus uses GPU instead.
</p>
<p>
We do not recommend enabling GPU when the query number is small.
</p>

## Why my data cannot be searched immediately after insertion? {#7}

This is because the data has not been flushed from memory to disk. To ensure that data can be searched immediately after insertion, you can call `flush`. However, calling this method too often creates too many small files and affects search speed.

## Why does my CPU usage stay low? {#8}

Milvus processes queries in parallel. An `nq` less than 100 and data on a smaller scale do not require high level of parallelism, hence the CPU usage stays low.


See [Performance Tuning > Index](tuning.md#Index) for more information.

## What is the importing performance of Milvus in practical terms? {#9}

When the client and the server are running on the same physical machine, it takes about 0.8 second to import 100,000 128-dimensional vectors (to an SSD disk). More specifically, the performance depends on the I/O speed of your disk.

## Does searching while inserting affect the search speed? {#10}

- If the newly inserted vectors have not grown to the specified volume to trigger index creation, Milvus needs to load these data directly from disk to memory for a vector search.
- As of v0.9.0, if Milvus has started creating indexes for the newly inserted vectors, an incoming vector search interrupts the index creation process, causing a delay of about one second.

## Why GPU-enabled query is sometimes slower than CPU-only query? {#11}

Generally speaking, CPU-only query works for situations where `nq` (number of vectors per query) is small, whilst GPU-enabled query works best with a large `nq`, say 500.

Milvus needs to load data from the memory to the graphics memory for a GPU-enabled query. Only when the load time is negligible compared to the time to query, is GPU-enabled query faster.

## Still have questions? {#12}

You can:

- Check out [Milvus](https://github.com/milvus-io/milvus/issues) on GitHub. You're welcome to raise questions, share ideas, and help others.
- Join our [Slack community](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk) to find more help and have fun!