---
id: operational_faq.md
title: Operational FAQ
sidebar_label: Operational FAQ
---

# 操作常见问题

<!-- TOC -->

- [如果在安装 Milvus 时，从 dockerhub 拉取镜像总是失败怎么办？](#如果在安装-Milvus-时，从-dockerhub-拉取镜像总是失败怎么办)
- [为什么我从源码编译 Milvus 失败了？](#为什么我从源码编译-Milvus-失败了)
- [Milvus 支持对向量的插入、删除、更改和查询操作吗？](#Milvus-支持对向量的插入、删除、更改和查询操作吗)
- [我应该自己指定向量 ID 还是由 Milvus 自动生成向量 ID？](#我应该自己指定向量-ID-还是由-Milvus-自动生成向量-ID)
- [为什么欧氏距离和内积在计算向量相似度时的结果不一致？](#为什么欧氏距离和内积在计算向量相似度时的结果不一致)
- [为什么在导入数据时 Milvus 显示 "no space left on device" 的错误？](#为什么在导入数据时-Milvus-显示-no-space-left-on-device-的错误)
- [为什么数据是二维数组时， Milvus Python SDK 依然返回 "Vectors should be 2-dim array" 的错误？](#为什么数据是二维数组时，-Milvus-Python-SDK-依然返回-Vectors-should-be-2-dim-array-的错误)
- [为什么有时候小的数据集查询时间反而更长？](#为什么有时候小的数据集查询时间反而更长)
- [为什么我的 Milvus 的性能一直不理想？](#为什么我的-Milvus-的性能一直不理想)
- [为什么我的 Milvus 查询准确率一直不理想？](#为什么我的-Milvus-查询准确率一直不理想)
- [为什么我更新过的设置没有生效？](#为什么我更新过的设置没有生效)
- [为什么我的 Python SDK 一直报错？](#为什么我的-Python-SDK-一直报错)
- [如何得知我的 Milvus 已经成功启动？](#如何得知我的-Milvus-已经成功启动)
- [为什么我的检索结果中出现大量 `-1`？](#为什么我的检索结果中出现大量--1)
- [为什么我的 Milvus 在启动时返回 “Illegal instruction”？](#为什么我的-Milvus-在启动时返回-Illegal-instruction)
- [为什么在 Mac OS 或者 Windows 上运行 Milvus 时显示 `cpu_cache_capacity` 太大？](#为什么在-Mac-OS-或者-Windows-上运行-Milvus-时显示-cpu_cache_capacity-太大)
- [为什么我的日志文件时间与系统时间不一致？](#为什么我的日志文件时间与系统时间不一致)
- [为什么我启用多进程程序失败了？](#为什么我启用多进程程序失败了)
- [为什么搜索 top K 的向量，结果不到 K 条向量？](#为什么搜索-top-K-的向量，结果不到-K-条向量)
- [相关阅读](#相关阅读)

<!-- /TOC -->

#### 如果在安装 Milvus 时，从 dockerhub 拉取镜像总是失败怎么办？

某些地区的用户可能无法快速访问 dockerhub。如果拉取镜像失败，您可以从本地的镜像源拉取镜像。比如中国镜像源的网址为 `registry.docker-cn.com`。您可以在 `/etc/docker/daemon.json` 文件的 `registry-mirrors` 组添加 `"https://registry.docker-cn.com"`命令，这样就可以默认从中国镜像源拉取镜像了。 

```
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

#### 为什么我从源码编译 Milvus 失败了？

原因可能有多种，但最可能的是环境因素，比如版本不匹配或者依赖关系缺失等。请参考 [从源码安装 Milvus](https://github.com/milvus-io/milvus/blob/0.6.0/install.md) 获取详细信息。

建议您使用带有 Milvus 编译环境的 docker 镜像进行源码编译。关于详细流程请参考 [在 Docker 容器中编译运行 Milvus](https://www.milvus.io/cn/blogs/2019-11-25-docker-compilation.md)。

#### Milvus 支持对向量的插入、删除、更改和查询操作吗？

目前，Milvus 仅支持以下针对向量的操作：

- 插入向量
- 查询向量

> 注意：虽然 Milvus 不支持直接删除向量，您可以通过删除表的方式对向量进行删除。

#### 我应该自己指定向量 ID 还是由 Milvus 自动生成向量 ID？

两种方法均可。但是，在一个表内的向量必须全部使用用户指定的向量 ID 或者全部使用自动生成的向量 ID。


#### 为什么欧氏距离和内积在计算向量相似度时的结果不一致？

如果欧氏距离和内积返回不一致的结果，您可能需要检查数据是否已经归一化。如果没有，请先对数据进行归一化。

理论上可以证明，对于未归一化的数据，欧氏距离和内积的结果是不一致的。关于详细推导过程可参考 [数据归一化](https://github.com/milvus-io/bootcamp/blob/0.6.0/getting_started/data_preparation/data_normalization.md)。

#### 为什么在导入数据时 Milvus 显示 "no space left on device" 的错误？

您可能没有为导入数据预留足够的磁盘空间。例如，为1亿单精度向量构建 `FLAT` 或 `IVFLAT` 索引，需要预留约 200 GB 空间。对于 `IVF_SQ8` 索引，需要预留约 50 GB。

#### 为什么数据是二维数组时， Milvus Python SDK 依然返回 "Vectors should be 2-dim array" 的错误？

尽管数据是二维数组，如果数据类型是整形而非浮点型时，这个错误仍然会出现。原因是 Milvus 仅支持浮点数据类型。

#### 为什么有时候小的数据集查询时间反而更长？

如果数据文件的大小小于配置文件里 `index_file_size` 参数的值，Milvus 则不会为此数据文件构建索引。因此，小的数据集有可能查询时间会更长。关于更多信息，请参考 [Milvus 配置](https://milvus.io/cn/docs/v0.6.0/reference/milvus_config.md)。

> 注意：在 0.4.0 版本之前，`index_file_size` 被命名为 `index_building_threshold`。

#### 为什么我的 Milvus 的性能一直不理想？

原因可能有多种，但建议您检查配置文件中的 `cpu_cache_capacity` 参数以确认是否所有的数据都加载到了内存中。如果没有，Milvus 就达不到最好的性能。关于更多信息，请参考 [Milvus 配置](https://milvus.io/cn/docs/v0.6.0/reference/milvus_config.md)。

如果您的参数设置没有问题，请检查有没有其他应用在大量占用内存。

#### 为什么我的 Milvus 查询准确率一直不理想？

在调用 SDK 进行向量搜索时，请检查调用函数中 `nprobe` 参数的值。值越大，结果越精确，但耗时也越久。关于更多信息，请参考 [了解 Milvus 操作
](https://milvus.io/cn/docs/v0.6.0/guides/milvus_operation.md)。

#### 为什么我更新过的设置没有生效？

每次更新配置文件之后必须重启 Milvus docker 才能让改动生效。

```bash
$ docker restart <container id>
```

#### 为什么我的 Python SDK 一直报错？

检查 Milvus 是否支持已安装的 pymilvus 版本。要获取详细的 Milvus 和 pymilvus 的版本对应信息，参考[https://pypi.org/project/pymilvus](https://pypi.org/project/pymilvus)。

#### 如何得知我的 Milvus 已经成功启动？

使用以下命令检查 Milvus 的运行状态：

```bash
$ docker logs <container ID>
```

#### 为什么我的检索结果中出现大量 `-1`？

当数据集中的向量数目少于 `topk` 时，Milvus 会自动向结果中添加 `-1` 以保证检索结果的数量等于 `topk`。

#### 为什么我的 Milvus 在启动时返回 “Illegal instruction”？

如果您的 CPU 不支持 avx2 指令集，则 Milvus 无法正常启动。您可以通过 `cat /proc/cpuinfo` 查看 CPU 支持的指令集。

#### 为什么在 Mac OS 或者 Windows 上运行 Milvus 时显示 `cpu_cache_capacity` 太大？

您需要检查 MacOS 或者 Windows 为 docker engine 分配的内存值。如果分配的内存值小于或等于 `cpu_cache_capacity`，尽管您的主机内存可能足够，但 Milvus 仍然无法正常运行。

#### 为什么我的日志文件时间与系统时间不一致？

Docker 镜像内部的日志文件默认使用 UTC 时区。如果您宿主机的时区不是 UTC 时区，就会出现日志文件时间与系统时间不一致的情况。建议您查看宿主机上挂载的日志文件，这样可以保证宿主机上的日志文件和系统时间是一致的。

#### 为什么我启用多进程程序失败了？

Milvus 在运行过程中，能够实现多进程操作，但在实现时需满足一定条件：

- 程序执行时主进程中没有创建 client
- 每个子进程分别创建 client 进行操作

以下为正确实现多进程的示例。当表名为 `TABLE_NAME`，且已插入 `vector_1` 的表存在时，直接在主程序中直接调用该函数，两个 insert 进程和一个 search 进程同时执行，且能获得正确结果。其中需注意的是，search 的结果与当前正在 insert 的向量无关。

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

而若主进程中已存在 client（如利用 client 进行建表及插入），再进行多进程的操作，则会造成 client 假死机，最终导致超时。产生该结果的错误程序示例如下所示。

其中 `connect` 即为主进程所起 client，程序将会持续执行，直至 timeout。

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

#### 为什么搜索 top K 的向量，结果不到 K 条向量？

在 Milvus 支持的索引类型中，`IVFLAT` 和 `IVF_SQ8` 是基于 k-means 空间划分的分桶搜索算法。空间被分为 `nlist` 个桶，导入的向量被分配存储在基于 `nlist` 划分的文件结构中。搜索发生时，只搜索最近似的 `nprobe` 个文件。

如果 `nlist` 和 K 比较大，而 `nprobe` 又足够小时，有可能出现 `nprobe` 文件中的所有向量总数小于 K。当你搜索 top K 向量时，就会出现搜索结果小于 K 条向量的情况。

想要避免这种情况，您可以尝试将 `nprobe` 设置为更大值，或是把 `nlist` 和 K 设置小一点。


#### 相关阅读

[产品常见问题](product_faq.md)
