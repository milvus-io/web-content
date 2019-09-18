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
| `address`   | Milvus server监听的IP地址。                                  | string  | `0.0.0.0` |
| `port`      | Milvus server监听的端口号。                                  | integer | `19530`   |
| `mode`      | Milvus部署类型。选择 `single` 或 `cluster` 。                | boolean | `single`  |
| `time_zone` | 使用 UTC-x 或 UTC+x 来指定时区。比如，您可以使用 `UTC+8` 来代表中国标准时间。 | Timezone | `UTC+8`   |

### `db_config` 区域

| 参数                     | 说明                                                         | 类型    | 默认值          |
| ------------------------ | ------------------------------------------------------------ | ------- | --------------- |
| `db_path`                | 导入 Milvus 的数据文件存储的首选路径。                       | path    | `/opt/data`     |
| `db_slave_path`          | 导入 Milvus 的数据文件存储的二级路径，可以填多个，两个路径中间以分号隔开。当数据量很大，`db_path` 指定的磁盘空间不够用时，可以设置此参数。<br/>`db_path` 和 `db_slave_path` 平均分配导入的数据。每个路径下的数据大小 = 数据总大小 / 路径数量。请确保这些路径下文件可用的存量差不多且够用。 | path    | ` `             |
| `db_backend_url`         | 元数据存储的 URL 。使用 SQLite（单机部署） 或 MySQL（分布式集群部署）来存储元数据。 <br/>`db_backend_url` 的格式为：`dialect://username:password@host:port/database`。（ `dialect` 可以是 `mysql` 或 `sqlite`，取决于你是用了MySQL 还是SQLite数据库。） | path    | `sqlite://:@:/` |
| `archive_disk_threshold` | 归档触发阈值：存储大小。数据文件大小一旦超过存储大小，触发归档操作。 | integer | `512` (GB)      |
| `archive_days_threshold` | 归档触发阈值：存储天数。一旦超过存储天数，触发归档操作。     | integer | `30` (day)      |
| `insert_buffer_size`     | 用于buffer的最大内存量。`insert_buffer_size` 和`cpu_cache_capacity`（`cache_config` 区域）之和不能超过内存总量。 | integer | `4` (GB)        |
| `build_index_gpu`        | 在有多张 GPU 的情况下，您可以指定使用哪张 GPU 来创建索引。目前仅支持指定一张 GPU。 | integer | `0`             |

### `metric_config` 区域

| 参数                      | 说明                           | 类型    | 默认值       |
| ------------------------- | ------------------------------ | ------- | ------------ |
| `is_startup`              | 设置为 `true` 以启动监控功能。 | boolean | `true`       |
| `collector`               | 连接的监控系统。               | string  | `Prometheus` |
| `port`                    | 访问 Prometheus 的端口号。     | Integer | `8080`       |
| `push_gateway_ip_address` | push gateway的 IP 地址。       | string  | `127.0.0.1`  |
| `push_gateway_port`       | push gateway的端口号。         | integer | `9091`       |

### `cache_config` 区域

| 参数                       | 说明                                                         | 类型    | 默认值    |
| -------------------------- | ------------------------------------------------------------ | ------- | --------- |
| `cpu_cache_capacity`       | 用于缓存的内存量，最大值不能超过内存总量。                   | integer | `16` (GB) |
| `cache_free_percent`       | 当 CPU 缓存已满，会自动清除过往数据。通过这条参数您可以设置剩余在 CPU 缓存中的数据量。<br/>比如，该参数的默认值（0.85）表示 CPU 缓存中85%的数据不用被清除。取值范围为0 -1。 | float   | `0.85`    |
| `insert_cache_immediately` | 设置为 `true` ，则新插入的数据会自动加载到缓存以备搜索。<br/>如果想要实现数据即插即搜索，建议启用该功能。 | boolean | `false`   |

### `engine_config` 区域

| 参数                 | 说明                                                         | 类型    | 默认值 |
| -------------------- | ------------------------------------------------------------ | ------- | ------ |
| `use_blas_threshold` | Milvus 性能调优参数。此参数必须与 `nq` 比较以确定是否触发使用OpenBLAS或Intel MKL计算库的阈值。<br/>如果 `nq` > `use_blas_threshold` ，则 Milvus 性能稳定且搜索速度尚可。如果 `nq` < `use_blas_threshold` ，搜索速度明显提升但 Milvus 稳定性稍弱。取值范围为 >= 0. | integer | `20`   |

### `resource_config` 区域

请在该区域定义 Milvus 里用于搜索的 resource，支持的 resource 类型有 `cpu`、`gpu`。注意如果指定 `gpu`，需要指名其设备 id，设备 id 从0开始。`cpu` 和 `gpu` 不可以同时选择。

| 参数               | 说明                                                         | 类型    | 默认值     |
| ------------------ | ------------------------------------------------------------ | ------- | ---------- |
| `mode`             | Resource 配置的类型，目前只有 `simple` 类型。 |   ResourceMode      |     `simple`       |
| `resources`        | 定义 Milvus 里用于搜索的 resource 类型。如：`cpu`, `gpu0`等   | ResourceType        |     `gpu0`            |

