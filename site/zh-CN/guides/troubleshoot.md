---
id: troubleshoot.md
title: Troubleshoot
sidebar_label: Troubleshoot
---

# 故障诊断

## 概述

该页面主要描述使用 Milvus 时会遇到的常见问题。这些问题主要分为以下几类：

- 服务启动问题

  服务启动时发生的故障，通常会导致服务无法正常启动。你可以通过以下命令来查看相关错误信息：

  ```shell
  $ docker logs <milvus container id>
  ```

- 服务运行问题

  服务运行期间发生的故障有可能导致服务瘫痪。遇到此类故障时，请先检查系统版本和所使用的客户端版本是否兼容，然后再查询相关错误信息。服务运行的错误信息将被记录在 `/home/$USER/milvus/logs` 文件中。

- API 问题

  通过 API 使用 Milvus 时发生的故障。这类错误信息将实时返回给客户端。

对于你无法自己解决的问题，你可以：

- [加入我们的 Slack 社区](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk)，提问并与 Milvus 团队及其它社区成员交流讨论。

- 在 GitHub 上 [创建 issue](https://github.com/milvus-io/milvus/issues/new/choose)，详细描述你的问题。

## 向量搜索故障诊断

有多种 Milvus 操作都会对向量搜索造成影响。如果你在向量搜索操作中遇到运行阻塞或性能下降等问题，请检查是不是下面的一种或多种操作对搜索操作造成了影响：

### `Insert` 操作

- 对于同一客户端，插入操作是阻塞操作，只有当插入操作完成后才能调用搜索接口。
- 对于多客户端，假设客户端 A 频繁进行插入操作，客户端 B 同时执行搜索操作，Milvus 服务处理这些插入数据时会消耗部分 CPU 资源，因此会影响客户端 B 的搜索性能。
- 插入数据后为了保证数据落盘，有时会调用 `flush` 操作，该操作是阻塞操作，会产生少量的 CPU 消耗以及磁盘 IO，对其他客户端搜索的性能影响较小。
- 对于插入操作引起的后台建索引行为也会严重影响搜索操作。

### 索引建立操作

#### 索引建立方式

Milvus 包括两种索引建立方式：

- 后台自动建索引：

  1. 调用 `create_collection` 建立一个空 collection；
  2. 调用 `create_index` 给该 collection 指定一种索引（除 IDMAP 之外的任意一种索引）；
  3. 多次调用 `insert` 插入数据，每当累计插入数据量达到 `index_file_size` 设定的大小，后台就会自动给新增的 `index_file_size` 大小的数据块建立索引。

- 手动调用 `create_index` 建索引：

  1. 调用 `create_collection` 建立一个空 collection；
  2. 多次调用 `insert` 插入数据，这时由于没有给 collection 指定索引，所以不会在后台自动建立索引；
  3. 手动调用 `create_index` 对整个 collection 的全部数据块建立索引，就算数据块的大小没有达到 `index_file_size` 设定的值，也会强制建索引。

#### 自动建立索引

- **（仅支持 CPU 的 Milvus）** 建索引和搜索都需要全部占用 CPU 资源，因此在后台建索引的时候，搜索任务会等待索引完成后才能执行。
- **（支持 GPU 的 Milvus）** 如果你使用 GPU 建索引，其他的 GPU 或者 CPU 仍能执行搜索任务，因此建立索引和搜索可以异步进行。

#### 手动建立索引

- **（仅支持 CPU 的 Milvus）** 由于 `create_index` 是阻塞操作，同一个客户端上要等该操作完成后才能搜索。如果使用多客户端，另一个客户端可以执行搜索，但由于建索引和搜索都需要全部占用 CPU 资源，因此在 Milvus 在运行建索引的时候，搜索任务会等待索引完成后才能执行。
- **（支持 GPU 的 Milvus）** 由于 `create_index` 是阻塞操作，同一个客户端上要等该操作完成后才能搜索，建索引任务只使用一个 GPU。如果使用多客户端，另一个客户端可以使用其他的 GPU 或者 CPU 执行搜索任务，因此建立索引和搜索可以异步进行。

### `compact` 操作

`delete_by_id` 操作只是记录了一个被删向量的 id 列表，并没有真正从数据文件里把向量数据删除，为了清理掉被删向量，需要调用 `compact` 操作。`compact` 操作是很消耗资源的操作。`compact` 操作从原数据文件中提取出未被删除的向量数据，重新生成一份数据文件，如果该数据文件已经建好了索引，则把该索引文件删除，并重建一个新的索引文件。`compact` 是阻塞操作，由于既有大量磁盘 I/O 也可能连带有建索引的操作，因此会严重影响其他客户端的搜索性能。

### `preload_collection` 操作

`preload_collection` 是把 collection 的数据预加载到缓存里，其功能相当于 `server_config.yaml` 里的 `preload_table` 参数。Milvus 启动时，如果没有预加载 collection 的数据，那么对这个 collection 进行搜索之前，必须先将数据从磁盘读入缓存。对于大数据量的 collection 来说会非常慢。因此在搜索之前调用 `preload_table` 可以把数据先加载进磁盘，虽然总的耗时不变，但在第一次搜索时会有较好的性能。

### `delete_by_id` 操作

该操作一般要连带调用 `flush` 以使得删除向量的操作生效，会产生少量的 CPU 消耗和磁盘 I/O，对其他客户端搜索的性能影响较小。

### 获取信息的操作

获取信息的接口包括：`describe_collection`, `describe_index`, `get_vector_ids`, `get_vector_by_id`，`collection_info` 等等。这些接口都是从 meta 里获取信息返回客户端，或者读取某些记录向量信息的小文件，因此比较轻量，对其他客户端搜索性能的影响很小。

## 相关阅读

[了解 Milvus 操作](milvus_operation.md)
