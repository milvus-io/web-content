---
id: operational_faq.md
title: Operational FAQ
sidebar_label: Operational FAQ
---

# Operational FAQ

<!-- TOC -->

- [What if I failed to pull docker images from dockerhub when installing Milvus?](#What-if-I-failed-to-pull-docker-images-from-dockerhub-when-installing-Milvus)
- [Why do I fail to compile Milvus from source?](#Why-do-I-fail-to-compile-Milvus-from-source)
- [Does Milvus support insert, delete, update, and query operations for vectors?](#Does-Milvus-support-insert-delete-update-and-query-operations-for-vectors)
- [Should I specify vector IDs or use auto-generated vector IDs?](#Should-I-specify-vector-IDs-or-use-auto-generated-vector-IDs)
- [Why do Euclidean distance and inner product have inconsistent results in computing vector similarity?](#Why-do-Euclidean-distance-and-inner-product-have-inconsistent-results-in-computing-vector-similarity)
- [Why does Milvus display "no space left on device" when I import data to Milvus?](#why-does-Milvus-display-no-space-left-on-device-when-I-import-data-to-Milvus)
- [Why does this error "Vectors should be 2-dim array" still occur in the Python SDK when the data is a 2-dimensional array?](#Why-does-this-error-Vectors-should-be-2-dim-array-still-occur-in-the-Python-SDK-when-the-data-is-a-2-dimensional-array)
- [Why sometimes it takes much longer for queries with smaller datasets?](#Why-sometimes-it-takes-much-longer-for-queries-with-smaller-datasets)
- [Why is my Milvus constantly having bad performance?](#Why-is-my-Milvus-constantly-having-bad-performance)
- [Why is my Milvus constantly having low accuracy?](#Why-is-my-Milvus-constantly-having-low-accuracy)
- [Why are my new configurations not working?](#Why-are-my-new-configurations-not-working)
- [Why is my Python SDK constantly having errors?](#Why-is-my-Python-SDK-constantly-having-errors)
- [How do I know whether Milvus is successfully started?](#How-do-I-know-whether-Milvus-is-successfully-started)
- [Why there are a lot of `-1`s in my search result?](#Why-there-are-a-lot-of--1s-in-my-search-result)
- [Why does my Milvus return "Illegal instruction" during startup?](#Why-does-my-Milvus-return-Illegal-instruction-during-startup)
- [Why is `cpu_cache_capacity` always too large for MacOS or Windows?](#Why-is-cpu_cache_capacity-always-too-large-for-MacOS-or-Windows)
- [Why is the time in my log files different from the system time?](#Why-is-the-time-in-my-log-files-different-from-the-system-time)
- [Why does my multiprocessing program fail?](#Why-does-my-multiprocessing-program-fail)
- [Why are the search results fewer than K when I try to search the top K vectors?](#Why-are-the-search-results-fewer-than-K-when-I-try-to-search-the-top-K-vectors)
- [How to build Milvus from source in the Docker container?](#How-to-build-Milvus-from-source-in-the-Docker-container)
- [Related links](#Related-links)

<!-- /TOC -->

#### What if I failed to pull docker images from dockerhub when installing Milvus?

Users in some countries may have limited access to dockerhub. In this case, you can pull images from the local registry mirror. For example, the URL of the registry mirror for China is `registry.docker-cn.com`. You can add `"https://registry.docker-cn.com"` to the `registry-mirrors` array in `/etc/docker/daemon.json` to pull from the China registry mirror by default.

```
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

#### Why do I fail to compile Milvus from source?

Although the reasons may vary, the most possible cause could be environmental issues, such as incompatible versions, missing dependencies, etc. Refer to [Install Milvus from Source Code](https://github.com/milvus-io/milvus/blob/0.6.0/install.md) for more information.

It is recommended that you use the docker images with the Milvus compilation environment. Refer to [How to build Milvus from source in the Docker container?](#how-to-build-milvus-from-source-in-the-docker-container) to learn how to compile Milvus with the docker images.

#### Does Milvus support insert, delete, update, and query operations for vectors?

Milvus supports only the following operations for vectors:

- Insert
- Query

> Note: Although Milvus does not support directly deleting vectors, you can drop a table for vector deletion.

#### Should I specify vector IDs or use auto-generated vector IDs?

Both ways work. However, you must either specify IDs for all vectors or use auto-generated IDs for all vectors in one table.


#### Why do Euclidean distance and inner product have inconsistent results in computing vector similarity?

If Euclidean distance and inner product have inconsistent results, you need to check whether the data has been normalized. If not, please normalize your data before computing vector similarity.

It can be theoretically proved that Euclidean distance will not be consistent with inner product for data without normalization. For detailed analysis, please refer to [data normalization](https://github.com/milvus-io/bootcamp/blob/0.6.0/EN_getting_started/data_preparation/data_normalization.md).


#### Why does Milvus display "no space left on device" when I import data to Milvus?

You probably did not leave enough disk space for the data to import. For example, to build `FLAT` or `IVFLAT` index for 100 million single-precision vectors, the space needed for importing data is about 200 GB. For `IVF_SQ8` index, the space is about 50 GB.

#### Why does this error "Vectors should be 2-dim array" still occur in the Python SDK when the data is a 2-dimensional array?

Even if the data is a 2-dim array, this error can still occur if the data type is integer instead of float. Milvus only support the float data type.

#### Why sometimes it takes much longer for queries with smaller datasets?

If the size of a data file is smaller than the value of the `index_file_size` parameter in the config file, Milvus will not build indexes for the data file. Thus, it is possible that smaller datasets may need more time for queries. Refer to [Milvus Configuration](https://milvus.io/docs/v0.6.0/reference/milvus_config.md) for more information.

> Note: `index_file_size` was named as `index_building_threshold` before the 0.4.0 release.

#### Why is my Milvus constantly having bad performance?

The reasons may vary, but it is recommended that you check the `cpu_cache_capacity` parameter in the config file to see if all data can be successfully loaded to the memory. Milvus cannot have the best performance before all data is loaded to the memory. Refer to [Milvus Configuration](https://milvus.io/docs/v0.6.0/reference/milvus_config.md) for more information.

If your parameter settings look correct, check whether other running applications have high memory usage.

#### Why is my Milvus constantly having low accuracy?

Check the value of the `nprobe` parameter in the functions when you use an SDK to search vectors in a table. The greater the value, the more precise the result, yet the slower the search speed. Refer to [Learn Milvus Operation](https://milvus.io/docs/v0.6.0/guides/milvus_operation.md) for more information.

#### Why are my new configurations not working?

You need to restart Milvus docker every time you change the configuration file.

```bash
$ docker restart <container id>
```

#### Why is my Python SDK constantly having errors?

Check whether your pymilvus is supported by the installed Milvus. Refer to [https://pypi.org/project/pymilvus](https://pypi.org/project/pymilvus) for a detailed list of supported pymilvus versions.

#### How do I know whether Milvus is successfully started?

Use the following command to check the running status of Milvus:

```bash
$ docker logs <container ID>
```

#### Why there are a lot of `-1`s in my search result?

When the number of vectors in the dataset is less than `topk`, Milvus automatically adds `-1`s to the search result to ensure that the search result contains `topk` elements.

#### Why does my Milvus return "Illegal instruction" during startup? 

If your CPU does not support the avx2 instruction set, Milvus cannot run properly. You can use `cat /proc/cpuinfo` to check supported instruction sets.

#### Why is `cpu_cache_capacity` always too large for MacOS or Windows?

You need to check the memory allocated to the docker engine in MacOS or Windows. If the allocated memory is not greater than `cpu_cache_capacity`, Milvus cannot start even if the memory of your host is sufficient.

#### Why is the time in my log files different from the system time?

The log files in the docker container use UTC timezone by default. If the timezone of your host is not UTC, the time might be different between the docker container and the host. It is recommended that you check the log files mapped to your host so that the timezone is consistent.

#### Why does my multiprocessing program fail? 

In order to successfully run multiprocessing in Milvus, make sure the following conditions are met:

- No client is created in the main process
- Clients are created in each child process

The following example shows a correct way to implement multiprocessing. When there is a table named `TABLE_NAME` which already includes `vector_1`, you can invoke this function in the main process to run two insert processes and one search process concurrently to get the correct result. It should be noted that the search result is irrelevant to the vectors that are being inserted.

```python
def test_add_vector_search_multiprocessing():
    '''
	target: test add vectors, and search it with multiprocessing
	method: set vectors_1[0] as query vectors
	expected: status ok and result length is 1
 	'''
    nq = 1000
    vectors_1 = gen_vec_list(nq)
    vectors_2 = gen_vec_list(nq)

 	def add_vectors_search(idx):
        if idx == 0:
            MILVUS = Milvus()
            connect_server(MILVUS)
            status = add_vec_to_milvus(MILVUS, vectors_1)
            print("add", i, "finished")
            assert status.OK()
        elif idx == 1:
            MILVUS = Milvus()
            connect_server(MILVUS)
            status, result = MILVUS.search_vectors(TABLE_NAME, 1, NPROBE, [vectors_1[0]])
            print(result)
            assert status.OK()
            assert len(result) == 1
  		else:
            MILVUS = Milvus()
            connect_server(MILVUS)
            status = add_vec_to_milvus(MILVUS, vectors_2)
            print("add", i, "finished")
            assert status.OK()

    process_num = 3
 	processes = []
    for i in range(process_num):
        p = mp.Process(target=add_vectors_search, args=(i,))
        processes.append(p)
        p.start()
        print("process", i)
    for p in processes:
        p.join()
```

If a client already exists in the main process, enabling multiprocessing will cause the client to hang, which will eventually lead to timeout. The following function is a bad example, in which the `connect` is the client built in the main process.

```python
def test_add_vector_search_multiprocessing(self, connect, table):
    '''
	target: test add vectors, and search it with multiprocessing
	method: set vectors_1[0] as query vectors
	expected: status ok and result length is 1
	'''
    nq = 5
    vectors_1 = gen_vectors(nq, dim)
    vectors_2 = gen_vectors(nq, dim)

    status, ids = connect.add_vectors(table, vectors_1)
    time.sleep(3)

    status, count = connect.get_table_row_count(table)
    assert count == 5

  	def add_vectors_search(connect, idx):
        if (idx % 2) == 0:
            status, ids = connect.add_vectors(table, vectors_2)
            assert status.OK()
        else:
            status, result = connect.search_vectors(table, 1, [vectors_1[0]])
            assert status.OK()
            assert len(result) == 1

    process_num = 3
    processes = []
    for i in range(process_num):
        p = Process(target=add_vectors_search, args=(connect, i))
        processes.append(p)
        p.start()
    for p in processes:
        p.join()
```

#### Why are the search results fewer than K when I try to search the top K vectors?

In all the indexing types that Milvus supports, `IVFLAT` and `IVF_SQ8` are cell-probe methods that employ a partitioning technique called k-means. The feature space is partitioned into `nlist` cells, and vectors are assigned to one of these cells (to the centroid closest to the query), and stored in an inverted file structure formed of `nlist` inverted lists. When query occurs, only a set of `nprobe` inverted lists are selected.

If the `nlist` and K is relatively large, and `nprobe` is small enough, it happens that the vectors in `nprobe` lists are even fewer than K. Thus, when you search the top K vectors, the results would be fewer than K.

In order to avoid this situation, you can try increasing the value of `nprobe`, or smaller `nlist` and K.

#### How to build Milvus from source in the Docker container?

As Milvus is mainly developed under the Ubuntu environment, the recommended compilation environment is Ubuntu 18.04 or higher. If your developing environment is not Ubuntu 18.04, you can also build Milvus from source code in the docker container. We provide two docker images that provide the build environment needed for the Milvus CPU-only and GPU supported versions.

To build Milvus from source in the Docker container, please refer to [Compile Milvus on Docker](https://github.com/milvus-io/milvus/blob/0.6.0/install.md#compile-milvus-on-docker).



## Related links

[Product FAQ](product_faq.md)
