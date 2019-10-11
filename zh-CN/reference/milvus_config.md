---
id: milvus_config
title: Milvus Configuration
sidebar_label: Milvus Configuration
---

# Milvus 配置

## 配置概述

以下配置说明主要包括是否需要启用监控功能，以及启用一些高级功能以进行性能调优。

### Milvus 文件结构

成功启动 Milvus 服务后，你可以在 `home/$USER/milvus` 的路径下看到 Milvus 的文件夹。其中包含以下文件：

- `milvus/db`（数据库存储）
- `milvus/logs`（日志存储）
- `milvus/conf`（设置文件）
  - `server_config.yaml`（服务设置）
  - `log_config.conf`（日志设置）

## 配置

下文提到的许多配置都是给 Milvus 内部性能调优设计的，在编辑设置之前，请仔细考虑。若有任何疑问，欢迎邮件联系 Milvus 团队，邮箱地址：[support@zilliz.com](mailto:support@zilliz.com)。

> 注意：如果修改了配置文件，您必须重启 Milvus 服务来启用新的更改。
>
> ```
> $ docker restart <container id>
> ```

进入路径 `home/$USER/milvus/conf`，打开Milvus服务设置文件 `server_config.yaml` 。

### `server_config` 区域

| 参数        | 说明                                                         | 类型    | 默认值    |
| ----------- | ------------------------------------------------------------ | ------- | --------- |
| `address`   | Milvus server监听的IP地址。                                  | String | `0.0.0.0`  |
| `port`      | Milvus server监听的端口号，范围：1025 - 65534。               | Integer | `19530`   |
| `deploy_mode` | Milvus部署类型。选择 `single` ，`cluster_readonly` 或 `cluster_writable`。 | Boolean | `single`  |
| `time_zone` | 使用 UTC-x 或 UTC+x 来指定时区。比如，您可以使用 `UTC+8` 来代表中国标准时间。 | Timezone | `UTC+8`   |

### `db_config` 区域

| 参数                 | 说明                                                         | 类型        | 默认值          |
| -------------------- | ------------------------------------------------------------ | ----------- | --------------- |
| `primary_path`       | 导入 Milvus 的数据文件和元数据存储的首选路径。               | Path        | `/opt/data`     |
| `secondary_path`     | 导入 Milvus 的数据文件存储的二级路径，可以填多个，两个路径中间以分号隔开。当数据量很大，`primary_path` 指定的磁盘空间不够用时，可以设置此参数。<br/>`primary_path` 和 `secondary_path` 平均分配导入的数据。每个路径下的数据大小 = 数据总大小 / 路径数量。请确保这些路径下文件可用的存量差不多且够用。 | Path        | ` `             |
| `backend_url`        | 元数据存储的 URL 。使用 SQLite（单机部署） 或 MySQL（分布式集群部署）来存储元数据。 <br/>`db_backend_url` 的格式为：`dialect://username:password@host:port/database`。（ `dialect` 可以是 `mysql` 或 `sqlite`，取决于你是用了MySQL 还是SQLite数据库。） | Path        | `sqlite://:@:/` |
| `insert_buffer_size` | 用于buffer的最大内存量。`insert_buffer_size` 和`cpu_cache_capacity`（`cache_config` 区域）之和不能超过内存总量。 | Integer     | `4` (GB)        |
| `build_index_gpu`    | 用于创建索引的 GPU 的设备号。<br/>在有多张 GPU 的情况下，您可以指定使用哪张 GPU 来创建索引。目前仅支持指定一张 GPU。 | Integer     | `0`             |
| `preload_table`      | 定义在 Milvus 服务再次启动后，是否将之前已经导入并保存在磁盘的表预加载到内存。支持全部表格或者部分表格的预加载。 <br/>若要加载所有表格，使用 `*` ；若要加载部分表格，列出所有需要加载的表名，以逗号隔开。如果无需加载表格，请将该值留空 （ ` ` ）。 | PreloadType | ` `             |

### `metric_config` 区域

| 参数                      | 说明                           | 类型    | 默认值       |
| ------------------------- | ------------------------------ | ------- | ------------ |
| `enable_monitor` | 设置为 `true` 以启动监控功能。 | Boolean | `true`       |
| `collector`               | 连接的监控系统。               | String | `Prometheus`  |
| `port`                    | 访问 Prometheus 的端口号。     | Integer | `8080`       |

### `cache_config` 区域

| 参数                       | 说明                                                         | 类型    | 默认值    |
| -------------------------- | ------------------------------------------------------------ | ------- | --------- |
| `cpu_cache_capacity`       | 用于缓存的内存量，最大值不能超过内存总量。                   | Integer | `16` (GB) |
| `cpu_cache_threshold` | 当 CPU 缓存已满，会自动清除过往数据。通过这条参数您可以设置剩余在 CPU 缓存中的数据量。<br/>比如，该参数的默认值（0.85）表示 CPU 缓存中85%的数据不用被清除。取值范围为0 -1。 | Float  | `0.85`    |
| `cache_insert_data` | 设置为 `true` ，则新插入的数据会自动加载到缓存以备搜索。<br/>如果想要实现数据即插即搜索，建议启用该功能。 | Boolean | `false`  |

### `engine_config` 区域

| 参数                 | 说明                                                         | 类型    | 默认值 |
| -------------------- | ------------------------------------------------------------ | ------- | ------ |
| `use_blas_threshold` | Milvus 性能调优参数。此参数必须与 `nq` 比较以确定是否触发使用 OpenBLAS 计算库的阈值。<br/>如果 `nq` >= `use_blas_threshold` ，则使用 OpenBLAS，搜索响应时间无波动，且搜索速度尚可。如果 `nq` < `use_blas_threshold` ，搜索速度明显提升，但搜索响应时间有波动。取值范围为 >= 0. | Integer | `20`  |

### `resource_config` 区域

在 Milvus 里，由于**创建索引**和**搜索**是两个独立分开的过程，resource 的利用遵循以下基本原则：

- 创建索引过程只能在 `gpu` 里进行。请使用区域 `db_config` 里的 `build_index_gpu` 参数来指定用于该过程的 `gpu` 。
- 搜索计算过程可以在 `cpu` 或 `gpu` 里进行，两种类型不能同时选择。如果选择用 `gpu` 来进行搜索，您可以指定多张 GPU 来进行该过程。
- 用于创建索引的 `gpu` 同时也能指定用于搜索过程。

| 参数               | 说明                                                         | 类型    | 默认值     |
| ------------------ | ------------------------------------------------------------ | ------- | ---------- |
| `resources_pool | 定义 Milvus 里用于搜索的 resource 类型。如：`cpu`, `gpu0`等   | ResourceType        |     `gpu0`            |

请在该区域定义 Milvus 里用于搜索的 resource，支持的 resource 类型有 `cpu`、`gpu`， 不可以同时选择。注意如果指定 `gpu`，请列出所有您想指定的 GPU，并指名它们的设备 id 号，设备 id 从0开始。比如：

```
- gpu0
- gpu1
- gpu2
```


