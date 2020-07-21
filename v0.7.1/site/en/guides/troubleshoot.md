---
id: troubleshoot.md
title: Troubleshoot
sidebar_label: Troubleshoot
---

# Troubleshoot

## Overview

This page describes the common issues you may run into with Milvus. The issues fall into the following categories:

- Startup issue

  Issues that occur at the startup of Milvus server, and that generally lead to server startup failures. You can check the corresponding error messages by below command:

  ```shell
  $ docker logs <milvus container id>
  ```

- Operational issue

  Issues that occur during the server operation, which may cause server down. If you encounter issues during operation, first confirm that whether the issue is caused by the incompatibility of Milvus and SDK versions. Then check the error messages that are recorded in `/home/$USER/milvus/logs`.

- API issue

  Issues that occur during the operation with Milvus through APIs. Corresponding error messages will be returned real time to the client side.

If you cannot resolve the issue easily yourself, you can:

- [Join our Slack channel](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk) and reach out for support from Milvus team.
- [File an Issue](https://github.com/milvus-io/milvus/issues/new/choose) on GitHub and describe the problem in detail.

## Troubleshoot search operations

Multiple Milvus operations can affect search operations. If you encounter problems in search operations such as blocked operations or low performance, please check whether your problem is caused by one or multiple operations described below:

### Insert operations

- For one client, the insert operation is a blocking operation. The search operation cannot be performed before the insert operation is completed.
- For multiple clients, assume client A frequently performs insert operations and client B performs search operations at the same time. Because part of CPU resources is consumed by insert operations, the search performance of client B is also affected.
- After inserting data, to ensure that data is written to disk, you need to invoke the `flush` operation. The `flush` operation is a blocking operation and consumes minor CPU and disk I/O resources. Thus, the effect on the performance of other clients is limited.
- Index building operations caused by insert operations can also affect search operations.

### Index building operations

#### Index building methods

Milvus includes the following index building methods:

- Automatic index building in the backend:

  1. Invoke `create_collection` to create an empty collection.
  2. Invoke `create_index` to assign an index type for the collection (any index type other than IDMAP).
  3. Invoke `insert` multiple times to insert data. When the size of accumulated inserted data reaches the value of `index_file_size`, the backend automatically builds index for new data files that reach the size of `index_file_size`.

- Manually invoke `create_index` to build index:

  1. Invoke `create_collection` to create an empty collection.
  2. Invoke `insert` multiple times to insert data. Because no index is assigned to the collection, Milvus does not automatically build indexes in the backend.
  3. Manually invoke `create_index` to build index for all data files in the collection. Even though the data size does not reach the value of `index_file_size`, Milvus still builds indexes. `create_index` is a blocking operation.

#### Automatic index building

- **(CPU-only Milvus)** Index building and search need to consume all CPU resources. Thus, when building indexes in the backend, the search operation starts running when index building is complete.
- **(GPU-supported Milvus)** If you use GPU for index building, other GPU or CPU resources can still perform search operations.

#### Manual index building

- **(CPU-only Milvus)** Because `create_index` is an blocking operation, the search operation can start only after `create_index` is complete. If there are multiple clients available, you can use another client for search operations. Because both index building and search need to consume all CPU resources, search operations wait until index building is complete.
- **(GPU-supported Milvus)** Because `create_index` is an blocking operation, the search operation can start only after `create_index` is complete. Index building only uses one GPU. If there are multiple clients available, you can use another client for search operations with other GPU or CPU resources. Thus, index building can run asynchronously with search.

### `compact` operation

`delete_by_id` only records a list of ids of vectors to delete and the vectors are not actually deleted from data files. `compact` is required to remove the deleted vectors from data files. The `compact` operation consumes a lot of resources. First, vector data that is not deleted is retrieved from raw data files and generated to a new data file. If index is built for the data file, the index file is deleted and a new index file is created. The `compact` operation is a blocking operation because it contains a lot of disk I/O and possibly index building operations. Therefore, search performance of other clients can be severely affected.

### `preload_collection` operation

`preload_collection` loads data from a collection to cache and is equivalent to `preload_table` in `server_config.yaml`. If data in a collection is not preloaded, a search operation needs to load data from disk to cache and the search operation can be very slow for large amounts of data. Although the total time cost is the same, the performance of the first search operation after Milvus starts is improved.

### `delete_by_id` operation

`delete_by_id` is often accompanied by `flush` to ensure that delete operations take effect. The `flush` operation consumes minor CPU and disk I/O resources and has relatively small effect on the search performance of other clients.

### Operations to acquire information

Interfaces to acquire information include `describe_collection`, `describe_index`, `get_vector_ids`, `get_vector_by_id`, `collection_info`, and so on. These interfaces acquire information from meta and return to the client, or read from some small files that record vector information. So, these operations are light-weight and has minimum effect on search operations from other clients.

## Related links

[Milvus Operations](milvus_operation.md)
