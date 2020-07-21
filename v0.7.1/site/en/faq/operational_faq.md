---
id: operational_faq.md
title: Operational FAQ
sidebar_label: Operational FAQ
---

# Operational FAQ

<!-- TOC -->

- [What if I failed to pull docker images from dockerhub when installing Milvus?](#What-if-I-failed-to-pull-docker-images-from-dockerhub-when-installing-Milvus)
- [Why do I fail to compile Milvus from source?](#Why-do-I-fail-to-compile-Milvus-from-source)
- [Is there a limitation for the number of collections and partitions in Milvus?](#Is-there-a-limitation-for-the-number-of-collections-and-partitions-in-Milvus)
- [Why does Milvus return config check error?](#Why-does-Milvus-return-config-check-error)
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
- [Why there are vectors with `-1` as IDs in my search result?](#Why-there-are-vectors-with--1-as-IDs-in-my-search-result)
- [Why does my Milvus return "Illegal instruction" during startup?](#Why-does-my-Milvus-return-Illegal-instruction-during-startup)
- [Why is `cpu_cache_capacity` always too large for MacOS or Windows?](#Why-is-cpu_cache_capacity-always-too-large-for-MacOS-or-Windows)
- [Why is the time in my log files different from the system time?](#Why-is-the-time-in-my-log-files-different-from-the-system-time)
- [Why does my multiprocessing program fail?](#Why-does-my-multiprocessing-program-fail)
- [Why are the search results fewer than K when I try to search the top K vectors?](#Why-are-the-search-results-fewer-than-K-when-I-try-to-search-the-top-K-vectors)
- [How to build Milvus from source in the Docker container?](#How-to-build-Milvus-from-source-in-the-Docker-container)
- [How often should I build indexes when inserting data?](#How-often-should-I-build-indexes-when-inserting-data)
- [How is data stored in Milvus?](#How-is-data-stored-in-Milvus)
- [How do I know whether my CPU is supported by Milvus?](#How-do-I-know-whether-my-CPU-is-supported-by-Milvus)
- [Related links](#Related-links)

<!-- /TOC -->

#### What if I failed to pull docker images from dockerhub when installing Milvus?

Users in some countries may have limited access to dockerhub. In this case, you can pull images from the local registry mirror. For example, the URL of the registry mirror for China is `registry.docker-cn.com`. You can add `"https://registry.docker-cn.com"` to the `registry-mirrors` array in `/etc.docker/daemon.json` to pull from the China registry mirror by default.

```json
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

#### Why do I fail to compile Milvus from source?

Although the reasons may vary, the most possible cause could be environmental issues, such as incompatible versions, missing dependencies, etc. Refer to [Install Milvus from Source Code](https://github.com/milvus-io/milvus/blob/master/INSTALL.md) for more information.

It is recommended that you use the docker images with the Milvus compilation environment. Refer to [How to build Milvus from source in the Docker container?](#How-to-build-Milvus-from-source-in-the-Docker-container) to learn how to compile Milvus with the docker images.

#### Is there a limitation for the number of collections and partitions in Milvus?

Yes. If you use SQLite as the metadata management service, the sum of collection number and partition number must not exceed 50000. To create more collections and partitions, please [use MySQL](../reference/data_manage.md).

#### Why does Milvus return config check error?

The version of your Milvus server configuration file is incorrect. Milvus 0.7.0 only supports the 0.2 version of the Milvus server configuration file (`server_config.yaml`).

#### Does Milvus support insert, delete, update, and query operations for vectors?

Yes. You can refer to [Milvus Operations](../guides/milvus_operation.md) for details.

> Note: Before 0.7.0, only insertion and search are supported.

#### Should I specify vector IDs or use auto-generated vector IDs?

Both ways work. However, you must either specify IDs for all vectors or use auto-generated IDs for all vectors in one collection.

#### Why do Euclidean distance and inner product have inconsistent results in computing vector similarity?

If Euclidean distance and inner product have inconsistent results, you need to check whether the data has been normalized. If not, please normalize your data before computing vector similarity.

It can be theoretically proved that Euclidean distance will not be consistent with inner product for data without normalization. For detailed analysis, please refer to [data normalization](https://github.com/milvus-io/bootcamp/blob/0.6.0/EN_getting_started/data_preparation/data_normalization.md).


#### Why does Milvus display "no space left on device" when I import data to Milvus?

You probably did not leave enough disk space for the data to import. For example, to build `FLAT` or `IVFLAT` index for 100 million single-precision vectors, the space needed for importing data is about 200 GB. For `IVF_SQ8` index, the space is about 50 GB.

#### Why does this error "Vectors should be 2-dim array" still occur in the Python SDK when the data is a 2-dimensional array?

Even if the data is a 2-dim array, this error can still occur if the data type is integer instead of float. Milvus only support the float data type.

#### Why sometimes it takes much longer for queries with smaller datasets?

If the size of a data file is smaller than the value of the `index_file_size` parameter when creating a collection, Milvus will not build indexes for the data file. Thus, it is possible that smaller datasets may need more time for queries. Refer to [Milvus Operation](../guides/milvus_operation.md) for more information.

> Note: `index_file_size` was named as `index_building_threshold` before the 0.4.0 release.

#### Why is my Milvus constantly having low accuracy?

Check the value of the `nprobe` parameter in the functions when you use an SDK to search vectors in a collection. The greater the value, the more precise the result, yet the slower the search speed. Refer to [Learn Milvus Operation](../guides/milvus_operation.md) for more information.

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

#### Why there are vectors with `-1` as IDs in my search result?

When the number of vectors in the dataset is less than `topk`, Milvus automatically adds vectors with `-1` as IDs to the search result to ensure that the search result contains `topk` elements.

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

#### Why are the search results fewer than K when I try to search the top K vectors?

In all the indexing types that Milvus supports, `IVFLAT` and `IVF_SQ8` are cell-probe methods that employ a partitioning technique called k-means. The feature space is partitioned into `nlist` cells, and vectors are assigned to one of these cells (to the centroid closest to the query), and stored in an inverted file structure formed of `nlist` inverted lists. When query occurs, only a set of `nprobe` inverted lists are selected.

If the `nlist` and K is relatively large, and `nprobe` is small enough, it happens that the vectors in `nprobe` lists are even fewer than K. Thus, when you search the top K vectors, the results would be fewer than K.

In order to avoid this situation, you can try increasing the value of `nprobe`, or smaller `nlist` and K.

#### How to build Milvus from source in the Docker container?

As Milvus is mainly developed under the Ubuntu environment, the recommended compilation environment is Ubuntu 18.04 or higher. If your developing environment is not Ubuntu 18.04, you can also build Milvus from source code in the docker container. We provide two docker images that provide the build environment needed for the Milvus CPU-only and GPU supported versions.

To build Milvus from source in the Docker container, please refer to [Compile Milvus on Docker](https://github.com/milvus-io/milvus/blob/0.6.0/install.md#compile-milvus-on-docker).

#### How often should I build indexes when inserting data?

You should always avoid building indexes too frequently when inserting data. Otherwise, a lot of small index files will be generated and performance will be negatively affected.

#### How is data stored in Milvus?

In Milvus, metadata is stored in the database, while search data is stored as files. For detailed information, refer to the following blogs:

- [Managing Data in Massive-Scale Vector Search Engine: How data management is done in Milvus](https://medium.com/@milvusio/managing-data-in-massive-scale-vector-search-engine-db2e8941ce2f)
- [Improvements of the Data File Cleanup Mechanism](https://github.com/milvus-io/community/blob/master/blog/en/2019-12-18-datafile-cleanup.md)
- [Milvus Metadata Management (1): How to View Metadata](https://medium.com/@milvusio/milvus-metadata-management-1-6b9e05c06fb0)
- [Milvus Metadata Management (2): Fields in the Metadata Table](https://medium.com/@milvusio/milvus-metadata-management-2-fields-in-the-metadata-table-3bf0d296ca6d)
- [Milvus Metadata Management (3): How to Manage Data Files with Metadata](https://medium.com/@milvusio/milvus-metadata-management-3-e65b14137f58)

#### How do I know whether my CPU is supported by Milvus?

Milvus currently supports the following instruction sets:

- SSE4
- AVX2
- AVX512

However, you need AVX2 for Milvus to function properly.


## Related links

[Product FAQ](product_faq.md)
