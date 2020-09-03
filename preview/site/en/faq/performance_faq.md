---
id: performance_faq.md
---

# Performance FAQ

<!-- TOC -->
- [Why does the first search take a long time after Milvus restarts?](#Why-does-the-first-search-take-a-long-time-after-Milvus-restarts)
- [Why the search is very slow?](#Why-the-search-is-very-slow)
- [How do I improve Milvus' performance?](#How-do-I-improve-Milvus'-performance)
- [How to set the value of `nlist` when I build indexes?](#How-to-set-the-value-of-`nlist`-when-I-build-indexes)
- [Why sometimes the query time for a small dataset is longer?](#Why-sometimes-the-query-time-for-a-small-dataset-is-longer)
- [Why is my GPU always idle?](#Why-is-my-GPU-always-idle)
- [Why my data cannot be searched immediately after insertion?](#Why-my-data-cannot-be-searched-immediately-after-insertion)
- [Why does my CPU usage stay low?](#Why-does-my-CPU-usage-stay-low)
- [How can I get the best performance from Milvus through setting `index_file_size`?](#How-can-I-get-the-best-performance-from-Milvus-through-setting-`index_file_size`)
- [What is the importing performance of Milvus in practical terms?](#What-is-the-importing-performance-of-Milvus-in-practical-terms)
- [Does searching while inserting affect the search speed?](#Does-searching-while-inserting-affect-the-search-speed)
- [Will a batch query benefit from multi-threading?](#Will-a-batch-query-benefit-from-multi-threading)
- [Why GPU-enabled query is sometimes slower than CPU-only query?](#Why-GPU-enabled-query-is-sometimes-slower-than-CPU-only-query)
- [Still have questions?](#Still-have-questions)

<!-- /TOC -->

#### Why does the first search take a long time after Milvus restarts?

This is because, after restarting, Milvus needs to load data from the disk to the memory for the first vector search. You can set `preload_collection` in **server_config.yaml** and load as many collections as the memory permits. Milvus loads collections to the memory each time it restarts. 

Otherwise, you can call `load_collection()` to load collections to the memory.

#### Why the search is very slow?

Check if the value of `cache.cache_size` in **server_config.yaml** is greater than the size of the collection.

#### How do I improve Milvus' performance?

- Ensure that the value of `cache.cache_size` in **server_config.yaml** is greater than the size of the collection.
- Adjust the value of `use_blas_threshold`, ensuring that `nq` < `use_blas_threshold`.
- Ensure that all segments are indexed. 
- Check if there are other processes on the server consuming CPU resources.
- Adjust the values of `index_file_size` and `nlist`.
- If the search performance is unstable, you can add `-e OMP_NUM_THREADS=NUM` when starting up Milvus, where `NUM` is 2/3 of the number of CPU cores. 

See [Performance tuning](tuning.md) for more information. 

#### How to set the value of `nlist` when I build indexes?

It depends on your scenario. See [Performance tuning > Index](tuning.md#Index).

#### Why sometimes the query time for a small dataset is longer?

If the size of the dataset is smaller than the value of `index_file_size` that you set when creating a collection, Milvus does not create an index for this dataset. Therefore, the time to query in a small dataset may be longer. You may as well call `create_index` to build the index.


#### Why is my GPU always idle?

It is very likely that Milvus is using CPU for query. If you want to use GPU for query, you need to set the value of `gpu_search_threshold` in **server_config.yaml** to be greater than `nq` (number of vectors per query).

You can use `gpu_search_threshold` to set the threshold: when `nq` is less than this value, Milvus uses CPU for queries; otherwise, Milvus uses GPU instead.

We do not recommend enabling GPU when the query number is small.

#### Why my data cannot be searched immediately after insertion?

This is because the data has not been flushed from memory to disk. To ensure that data can be searched immediately after insertion, you can call `flush`. However, calling this method too often creates too many small files and affects search speed.

#### Why does my CPU usage stay low?

Milvus processes queries in parallel. An `nq` less than 100 and data on a smaller scale do not require high level of parallelism, hence the CPU usage stays low.

#### How can I get the best performance from Milvus through setting `index_file_size`?

You need to set `index_file_size` when creating a collection from a client. This parameter specifies the size of each segment, and its default value is `1024` in MB. When the size of newly inserted vectors reaches the specified volume, Milvus packs these vectors into a new segment. In other words, newly inserted vectors do not go into a segment until they grow to the specified volume. When it comes to creating indexes, Milvus creates one index file for each segment. When conducting a vector search, Milvus searches all index files one by one.

As a rule of thumb, we would see a 30% ~ 50% increase in the search performance after changing the value of `index_file_size` from 1024 to 2048. Note that an overly large `index_file_size` value may cause failure to load a segment into the memory or graphics memory. Suppose the graphics memory is 2 GB and `index_file_size` 3 GB, each segment is obviously too large.

In situations where vectors are not frequently inserted, we recommend setting the value of `index_file_size` to 1024 MB or 2048 MB. Otherwise, we recommend setting the value to 256 MB or 512 MB to keep unindexed files from getting too large.

#### What is the importing performance of Milvus in practical terms?

When the client and the server are running on the same physical machine, it takes about 0.8 second to import 100,000 128-dimensional vectors (to an SSD disk). More specifically, the performance depends on the I/O speed of your disk.

#### Does searching while inserting affect the search speed?

- If the newly inserted vectors have not grown to the specified volume to trigger index creation, Milvus needs to load these data directly from disk to memory for a vector search.
- As of v0.9.0, if Milvus has started creating indexes for the newly inserted vectors, an incoming vector search interrupts the index creation process, causing a delay of about one second.

#### Will a batch query benefit from multi-threading?

If your batch query is on a small scale (`nq` < 64), Milvus combines the query requests, in which case multi-threading helps.

Otherwise, the resources are already exhausted, hence multi-threading does not help much.

#### Why GPU-enabled query is sometimes slower than CPU-only query?

Generally speaking, CPU-only query works for situations where `nq` (number of vectors per query) is small, whilst GPU-enabled query works best with a large `nq`, say 500.

Milvus needs to load data from the memory to the graphics memory for a GPU-enabled query. Only when the load time is negligible compared to the time to query, is GPU-enabled query faster.

#### Still have questions?

You can:

- Check out [Milvus](https://github.com/milvus-io/milvus/issues) on GitHub. You're welcome to raise questions, share ideas, and help others.
- Join our [Slack community](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk) to find more help and have fun!