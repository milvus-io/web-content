---
id: tuning.md
---

# 性能调优

## 插入性能调优

<div class="alert note">
“数据插入”到“数据写入磁盘”的基本流程请参考 <a href="storage_operation.md">存储操作</a>。
</div>


如果数据量小于单次插入上限（256 MB），批量插入比单条插入要高效得多。

系统配置中的两个参数对插入性能有影响：

- `wal.enable`

该参数用于开启或关闭 [预写日志（WAL, Write Ahead Log）](write_ahead_log.md) 功能（默认开启）。开启和关闭预写日志功能时，插入数据的流程分别如下：

* 开启预写日志功能时，预写日志模块先将数据写入磁盘，然后返回插入操作。
* 关闭预写日志功能时，数据插入速度更快。系统直接将数据写入内存中的可写缓冲区，并立即返回插入操作。

但是对于 [删除操作](storage_operation.md#删除) 来说，打开预写日志功能时速度更快。为了保证数据的可靠性，我们建议打开预写日志。

- `storage.auto_flush_interval`

该参数是指后台落盘任务的间隔时间，默认值为 1 秒。根据 Milvus [数据段合并策略](storage_operation.md#数据合并)，增大该值可减少段合并的次数，减少磁盘 I/O，提高插入操作的吞吐量。

<div class="alert note">
Milvus 无法搜索到在该时间间隔内未落盘的数据。
</div>

另外，建立集合时的参数 `index_file_size` 也对插入性能有影响。该参数的默认值为 1024 MB，最大值为 128 GB。该参数越大，将文件合并到该值设定的大小所需的次数就越多，影响插入操作的吞吐量。该参数越小，则产生的数据段越多，查询性能可能会变差。

除了软件层面的因素外，网络带宽和存储介质对插入操作性能也有影响。

## 查询性能调优

影响查询性能的因素包括硬件环境、系统参数、索引、查询规模等。

### 硬件环境

- 使用 CPU 计算时，查询性能取决于 CPU 的主频、核心数和支持的指令集。

<div class="alert note">
Milvus 在支持 AVX 指令集的 CPU 上的查询性能较好。
</div>

- 使用 GPU 计算时，查询性能取决于 GPU 的并行计算能力以及传输带宽。

### 系统参数

<div class="alert note">
系统参数配置请参考 <a href="milvus_config.md">Milvus 服务端配置</a>。
</div>

- `cache.cache_size`

该参数是指用于驻留查询数据的缓存空间大小，默认值为 4 GB。如果该缓存空间不足以容纳所需的数据，查询时会从磁盘临时加载数据，严重影响查询性能。因此，`cache_size` 应当大于查询所需的数据量。

- 浮点型原始向量的数据量可根据“向量总条数 × 维度 × 4”来估算。

- 二进制型原始向量的数据量可根据“向量总条数 × 维度 ÷ 8”来估算。

索引建立完成后（不包括 FLAT），索引文件需要额外占用磁盘空间，查询只需加载索引文件。

* IVF_FLAT 索引的数据量和其原始向量总数据量基本相等。
* IVF\_SQ8 / IVF\_SQ8H 索引的数据量相当于其原始向量总数据量的 25% ～ 30%。
* IVF_PQ 索引的数据量根据其参数变化，一般低于其原始向量总数据量的 10%。
* HNSW／RNSG／Annoy 索引的数据量都大于其原始向量总数据量。

<div class="alert note">
通过调用 <code>get_collection_stats</code> 接口，可准确获知查询一个集合所需的数据总量。
</div>

- `gpu.gpu_search_threshold`

在 GPU 版本中，当目标向量数量大于等于该参数设定的值，将会启用 GPU 查询。该参数的默认值为 1000。

GPU 查询的性能取决于 CPU 将数据加载进显存的速度以及 GPU 的计算能力。在目标向量数量较少时，无法充分发挥出 GPU 并行计算的优势。只有当目标向量数量达到某个阈值后，GPU 的查询性能才会优于 CPU。在实际使用中，可根据实验对比得出该参数的理想值。

- `gpu.search_resources`

指定用于查询的 GPU 设备。对于数据插入和查询并发的场景，使用 GPU 建索引可避免后台建索引任务和查询任务争抢 CPU 资源。

- `gpu.build_index_resources`

指定用于建索引的 GPU 设备。对于查询目标向量数量较大的场景，使用多 GPU 可显著提高查询效率。

### 索引

<div class="alert note">
向量索引的基本概念请参考 <a href="index.md">向量索引概述</a>。
</div>

选择合适的索引需要在存储空间、查询性能、查询召回率等多个指标中权衡。

- FLAT 索引

FLAT 是对向量的暴力搜索（brute-force search），速度最慢，但召回率最高（100%），磁盘空间占用最小。

随着目标向量数量增多，使用 CPU 做 FLAT 查询的耗时呈线形上升关系；而使用 GPU 查询时，批量查询的效率高，目标向量数量增加对查询耗时影响不大。

- IVF 系列索引

IVF 系列索引包括 IVF\_FLAT、IVF\_SQ8／IVF\_SQ8H 和 IVF\_PQ。IVF\_SQ8／IVF\_SQ8H 和 IVF_PQ 索引对向量数据做了有损压缩，磁盘占用量较少。

IVF 索引都有两个相同的参数：`nlist` 和 `nprobe`。`nlist` 是建索引参数，`nprobe` 是搜索参数。选取 `nlist` 和 `nprobe` 的推荐值，详见 [性能优化问题 > 应如何设置 IVF 索引的 <code>nlist</code> 和 <code>nprobe</code> 参数？](performance_faq.md#应如何设置-ivf-索引的-nlist-和-nprobe-参数)

根据相关原理，估算使用 IVF 索引进行查询时的计算量：

* 单个数据段计算量可估算为：目标向量数量 × (`nlist` + （段内向量数 ÷ `nlist`）× `nprobe`)
* 数据段的数量可估算为：集合数据总量 ÷ `index_file_size`
* 对集合查询所需的计算总量则为：单个数据段计算量 × 数据段数量 

通过估算得出的计算总量越大，查询耗时越长。实际使用中可根据以上公式确定合理的参数，在满足召回率的前提下获得较高的查询性能。

<div class="alert note">
在持续插入数据的场景下，由于对大小未达到 <code>index_file_size</code> 的数据段未建立索引，对其使用的查询方式是暴力搜索。计算量为：目标向量数量 x 该数据段向量总数。
</div>

- HNSW / RNSG / Annoy 索引

HNSW、RNSG、Annoy 的索引参数对查询性能的影响较为复杂，建议参考 [索引概览](index.md#索引概览)。

### 其他

- 结果集

结果集的规模取决于目标向量数量和 `topk`。`topk` 的大小对计算的影响不大。但在目标向量数量和 `topk` 都较大的情况下，结果集序列化和网络传输的耗时会相应增加。

- MySQL

Milvus 使用 MySQL 作为元数据后端服务。Milvus 在查询数据时会多次访问 MySQL 以获取元数据信息，因此 MySQL 服务的响应速度对 Milvus 的查询性能有较大影响。

- 预加载

首次查询需要先将数据从磁盘读入缓存，因此耗时较长。为避免首次查询加载数据，可预先调用 `load_collection` 接口，或使用系统参数  `preload_collection` 指定启动 Milvus 时要预先加载的集合。

- 段数据整理

在 [数据段整理](storage_operation.md#数据段整理) 中提到，Milvus 在查询数据时将 **delete_docs** 读入内存以过滤被删除的实体。调用 `compact` 接口可清理被删除的实体，减少过滤操作，从而提高查询性能。

## 存储优化

- 数据段整理

在 [数据段整理](storage_operation.md#数据段整理) 中提到，被删除的实体不参与计算，并且占用磁盘空间。如果有大量的实体已被删除，你可以调用 `compact` 接口来释放磁盘空间。


## 常见问题

<details>
<summary><font color="#4fc4f9">为什么查询时 GPU 一直空闲？</font></summary>
<p>此时应该是在用 CPU 进行查询。如果要用 GPU 进行查询，需要在配置文件中将 <code>gpu_search_threshold</code> 的值设置为小于 <code>nq</code> (每次查询的向量条数) 。可以将 <code>gpu_search_threshold</code> 的值调整为期望开启 GPU 搜索的 <code>nq</code> 数。若 <code>nq</code> 小于该值，则用 CPU 查询，否则将使用 GPU 查询。不建议在查询批量较小时使用 GPU 搜索。</p>
</details>
<details>
<summary><font color="#4fc4f9">为什么搜索的速度非常慢？</font></summary>
请首先检查 <strong>server_config.yaml</strong> 的 <code>cache.cache_size</code> 参数是否大于集合中的数据量。
</details>
<details>
<summary><font color="#4fc4f9">创建集合时 <code>index_file_size</code> 如何设置能达到性能最优？</font></summary>
<p>使用客户端创建集合时有一个 <code>index_file_size</code> 参数，用来指定数据存储时单个文件的大小，其单位为 MB，默认值为 1024。当向量数据不断导入时，Milvus 会把数据增量式地合并成文件。当某个文件达到 <code>index_file_size</code> 所设置的值之后，这个文件就不再接受新的数据，Milvus 会把新的数据存成另外一个文件。这些都是原始向量数据文件，如果建立了索引，则每个原始文件会对应生成一个索引文件。Milvus 在进行搜索时，是依次对每个索引文件进行搜索。
</p>
<p>
根据我们的经验，当 <code>index_file_size</code> 从 1024 改为 2048 时，搜索性能会有 30% ~ 50% 左右的提升。但要注意如果该值设得过大，有可能导致大文件无法加载进显存（甚至内存）。比如显存只有 2 GB，该参数设为 3 GB，显存明显放不下。
</p>
<p>
如果向集合中导入数据的频率不高，建议将 <code>index_file_size</code> 的值设为 1024 MB 或者 2048 MB。如果后续会持续地向集合中导入增量数据，为了避免查询时未建立索引的数据文件过大，建议这种情况下将该值设置为 256 MB 或者 512 MB。
</p>
可参阅 <a href="https://www.milvus.io/cn/blog/2020-2-16-api-setting.md">如何设置 Milvus 客户端参数</a>。
</details>
<details>
<summary><font color="#4fc4f9">为什么同样的数据量，用 GPU 查询比 CPU 查询慢？</font></summary>
<p>一般来说，当 <code>nq</code>（每次查询的向量条数）较小时，用 CPU 查询比较快。只有当 <code>nq</code> 较大（约大于 500）时，用 GPU 查询才会更有优势。
</p>
<p>
因为在 Milvus 中，每次用 GPU 查询都需要将数据从内存加载到显存。只有当 GPU 查询节省的计算时间能抵消掉数据加载的时间，才能体现出 GPU 查询的优势。
</p>
</details>
<details>
<summary><font color="#4fc4f9">为什么有时候小的数据集查询时间反而更长？</font></summary>
如果数据文件的大小小于创建集合时 <code>index_file_size</code> 参数的值，Milvus 则不会为此数据文件构建索引。因此，小的数据集有可能查询时间会更长。你还可以调用 <code>create_index</code> 建立索引。
</details>
