---
id: milvus_config.md
title: Milvus Configuration
sidebar_label: Milvus Configuration
---

# Milvus 服务端配置

## 配置概述

以下配置说明可同时应用于单机或者分布式场景。

#### Milvus 文件结构

成功启动 Milvus 服务后，你可以在 `home/$USER/milvus` 的路径下看到 Milvus 的文件夹。其中包含以下文件：

- `milvus/db`（数据库存储）
- `milvus/logs`（日志存储）
- `milvus/conf`（设置文件）
  - `server_config.yaml`（服务设置）
  - `log_config.conf`（日志设置）

## 配置修改 

### 编辑配置文件

你可以直接编辑配置文件对配置进行修改。如果修改了配置文件，你必须重启 Milvus 服务来启用新的更改。

```shell
$ docker restart <container id>
```

### 运行时修改

你可以使用 Milvus 客户端 对 `server_config.yaml` 的配置进行运行时修改。修改后无需重启 Milvus 即可启用新的更改。详情请参考[客户端参考](sdk.md)。

对以下参数的运行时修改是立即生效的：

 - `cache_config` 区域
    - `cpu_cache_capacity`
    - `insert_buffer_size`
    - `cache_insert_data`
 - `engine_config` 区域
    - `use_blas_threshold`
    - `gpu_search_threshold`
 - `gpu_resource_config` 区域
    - `enable`
    - `cache_capacity`
    - `search_resources`
    - `build_index_resources`

对于其它参数，你必须重新启动 Milvus 才能使改动生效。

## `server_config.yaml` 参数说明

若有任何疑问，欢迎在 GitHub 上给我们 [创建 issue](https://github.com/milvus-io/milvus/issues/new/choose) 或是 [加入 Slack 社区讨论](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk)。

### `server_config` 区域

<div class="table-wrapper" markdown="block">

| 参数        | 说明                                                         | 类型    | 默认值    |
| ----------- | ------------------------------------------------------------ | ------- | --------- |
| `address`   | Milvus 服务端监听的 IP 地址。                                  | String | `0.0.0.0`  |
| `port`      | Milvus 服务端监听的端口号，范围：(1024, 65535)。           | Integer | `19530`   |
| `deploy_mode` | Milvus 部署类型。选择 `single` ，`cluster_readonly` 或 `cluster_writable`。 | DeployMode | `single`  |
| `time_zone` | 使用 UTC-x 或 UTC+x 来指定时区。比如，你可以使用 `UTC+8` 来代表中国标准时间。 | Timezone | `UTC+8`   |
| `web_enable` | 选择是否启用 Web 服务器。 | Boolean | `true` |
| `web_port` | Milvus 网络服务端监听的端口号，范围：(1024, 65535)。你可以使用 Milvus 网络服务端与 [Milvus RESTful API](sdk.md) 通信。 | Integer | `19121`  |

</div>

### `db_config` 区域

<div class="table-wrapper" markdown="block">

| 参数                 | 说明                                                         | 类型        | 默认值          |
| -------------------- | ------------------------------------------------------------ | ----------- | --------------- |
| `backend_url`        | 元数据存储的 URL 。使用 SQLite（单机部署） 或 MySQL（分布式集群部署）来存储元数据。 <br/>`backend_url` 的格式为：`dialect://username:password@host:port/database`。（ `dialect` 可以是 `mysql` 或 `sqlite`，取决于你是用了 MySQL 还是 SQLite 数据库。） | String        | `sqlite://:@:/` |
| `preload_collection`      | 定义在 Milvus 服务再次启动后，是否将之前已经导入并保存在磁盘的 collection 预加载到内存。支持全部 collection 或者部分 collection 的预加载。 <br/>若要加载所有 collection，使用 `'*'` (包含引号)；若要加载部分 collection，列出所有需要加载的 collection 名，以逗号隔开。如果无需加载 collection，请将该值留空 （ ` ` ）。 | StringList | ` `             |
| `auto_flush_interval` | Milvus 每次自动将缓存中的插入数据 flush 的时间间隔，单位为秒。如果 `auto_flush_interval` 值为0，则 Milvus 不会定时自动将数据 flush。如果缓存空间已满，Milvus 总是会自动将数据 flush，这和 `auto_flush_interval` 的值无关。  | Integer |  1 (s)  |
</div>

### `storage_config` 区域

<div class="table-wrapper" markdown="block">

| 参数                 | 说明                                                         | 类型        | 默认值          |
| -------------------- | ------------------------------------------------------------ | ----------- | --------------- |
| `primary_path`       | 导入 Milvus 的向量文件、索引文件和元数据存储的首选路径。               | Path        | `/var/lib/milvus`     |
| `secondary_path`     | 导入 Milvus 的向量文件和索引文件存储的二级路径，可以填多个，两个路径中间以分号隔开。当数据量很大，`primary_path` 指定的磁盘空间不够用时，可以设置此参数。<br/>`primary_path` 和 `secondary_path` 平均分配导入的数据。每个路径下的数据大小 = 数据总大小 / 路径数量。请确保这些路径下文件可用的存量差不多且够用。 | Path        | ` `             |
| `file_cleanup_timeout` | 从标记一个文件为 `deleted` 到该文件在磁盘被物理删除的时间差。单位为秒。范围：[0, 3600]。 | Integer | `10` (s) |
</div>


### `metric_config` 区域

<div class="table-wrapper" markdown="block">

| 参数                      | 说明                           | 类型    | 默认值       |
| ------------------------- | ------------------------------ | ------- | ------------ |
| `enable_monitor` | 设置为 `true` 以启动监控功能。 | Boolean | `false`       |
| `address`                | 访问 Prometheus Pushgateway 的 IP 地址。       |   IP     |   127.0.0.1    |
| `port`                    | 访问 Prometheus Pushgateway 的端口号。     | Integer | `9091`       |
</div>

### `cache_config` 区域

<div class="table-wrapper" markdown="block">

| 参数                       | 说明                                                         | 类型    | 默认值    |
| -------------------------- | ------------------------------------------------------------ | ------- | --------- |
| `cpu_cache_capacity`       | 内存中用于驻留搜索数据的缓存空间，`cpu_cache_capacity` 和 `insert_buffer_size` 之和不能超过内存总量。 | Integer | `4` (GB) |
| `insert_buffer_size` | 用于数据导入的 buffer 所使用的最大内存量。`insert_buffer_size` 和 `cpu_cache_capacity` 之和不能超过内存总量。 | Integer     | `1` (GB)        |
| `cache_insert_data` | 设置为 `true` ，则新插入的数据会自动加载到缓存以备搜索。| Boolean | `false`  |
</div>

### `engine_config` 区域

<div class="table-wrapper" markdown="block">

| 参数                 | 说明                                                         | 类型    | 默认值 |
| -------------------- | ------------------------------------------------------------ | ------- | ------ |
| `use_blas_threshold` | Milvus 性能调优参数。此参数必须与 `nq` 比较以确定是否触发使用 OpenBLAS 计算库的阈值。<br/>如果 `nq` >= `use_blas_threshold` ，则使用 OpenBLAS，搜索响应时间波动较小，但搜索速度较慢。如果 `nq` < `use_blas_threshold` ，则使用 AVX 或 SSE 指令集，搜索速度明显提升，但搜索响应时间波动较大。取值范围为 >= 0. | Integer | `1100`  |
| `gpu_search_threshold` | Milvus 性能调优参数。此参数必须与 `nq` 比较以确定搜索计算是否只在 GPU 上进行。<br/>如果 `nq` >= `gpu_search_threshold` ，则搜索计算只在 GPU 上进行。如果 `nq` < `gpu_search_threshold` ，则搜索计算将在 CPU 和 GPU 上协同进行。| Integer | `1000` |
</div>

### `gpu_resource_config` 区域

在该区域选择是否在 Milvus 里启用 GPU 用于搜索和索引创建。同时使用 CPU 和 GPU 可以达到资源的最优利用，在特别大的数据集里做搜索时性能更佳。

若要切换到 CPU-only 模式，只要将 `enable` 设置为 `false`。

<div class="table-wrapper" markdown="block">

| 参数               | 说明                                                         | 类型    | 默认值     |
| ------------------ | ------------------------------------------------------------ | ------- | ---------- |
| `enable` | 选择是否在 Milvus 里启用 GPU 用于搜索和索引创建。 | Boolean | `true` |
| `cache_capacity` | 显存中用于驻留搜索数据的缓存空间，该值不能超过显存总量。 | Integer | `1` (GB) |
| `search_resources` | 定义 Milvus 里用于搜索的 GPU 资源。格式为：`gpux`，其中 `x` 是 GPU 的序号，例如 `gpu0`。 | DeviceList        | `gpu0` |
| `build_index_resources` | 定义 Milvus 里用户创建索引的 GPU 资源。格式为：`gpux`，其中 `x` 是 GPU 的序号，例如 `gpu0`。 | DeviceList | `gpu0` |
</div>

> 注意：在 Milvus 里，创建索引和搜索是两个独立分开的过程，可以只在 `cpu`，或同时在 `cpu` 和 `gpu` 里进行。通过将 GPU 添加至 `search_resources` 或者 `build_index_resources` 下方，你可以指定多张 GPU 来进行创建索引或搜索。 请参考下面的 YAML 示例代码：

  ```yaml
    search_resources:
      - gpu0
      - gpu1
    build_index_resources:
      - gpu0
      - gpu1
  ```

### `tracing_config` 区域

<div class="table-wrapper" markdown="block">

| 参数               | 说明                                                         | 类型    | 默认值     |
| -------------------- | ------------------------------------------------------------ | ------------ | ------- |
| `json_config_path` | 追踪系统配置文件的绝对路径。如果该值为空，则 Milvus 会创建一个空的追踪系统。  | Path | ` `  |
</div>

### `wal_config` 区域

<div class="table-wrapper" markdown="block">

| 参数               | 说明                                                         | 类型    | 默认值     |
| -------------------- | ------------------------------------------------------------ | ------------ | ------- |
|  `enable`               |   是否开启预写式日志（write-ahead logging，WAL）。如果开启，Milvus 会将所有数据变化预先写入日志文件，之后才会执行数据操作。WAL 可以保证 Milvus 操作的原子性和持久性。  |    Boolean          |   true      |
|  `recovery_error_ignore` |  在通过 WAL 执行恢复操作时，是否忽略出现错误的日志。如果设为 true，当 Milvus 重启恢复时，如果有日志出现错误，则 Milvus 会忽略出现错误的日志。如果设为 false，如果 WAL 日志中存在错误，则 Milvus 会启动失败。 |   Boolean           |   true      |
|  `buffer_size`          |   读取缓冲区和写入缓冲区的总大小，单位为 MB。`buffer_size` 的值必须在 `[64, 4096]` 范围内。如果你设的值超出范围，Milvus 自动使用与所设的值最接近的边界值。建议 `buffer_size` 的值要大于单次插入的数据量，以获取更好的性能。         |    Integer          |   `256` (MB)      |
|  `wal_path`             |  预写式日志文件路径。                                                           |    String          |    ` `     |
</div>

###  `logs` 区域

<div class="table-wrapper" markdown="block">

| 参数           | 说明                                                 | 类型         | 默认值 |
| -------------------- | ------------------------------------------------------------ | ------------ | ------- |
|  `trace.enable`      |   是否开启 trace 级别日志打印。           |    Boolean   |  `true` |
|  `debug.enable`      |   是否开启 debug 级别日志打印。          |    Boolean   |  `true` |
|  `info.enable`       |   是否开启 info 级别日志打印。         |    Boolean   |  `true` |
|  `warning.enable`    |   是否开启 warning 级别日志打印。        |    Boolean   |  `true` |
|  `error.enable`      |   是否开启 error 级别日志打印。         |    Boolean   |  `true` |
|  `fatal.enable`      |   是否开启 fatal 级别日志打印。         |    Boolean   |  `true` |
|  `path`              |  日志文件绝对路径。  |    String    |   ` `   |
|  `max_log_file_size` |  每份日志文件的最大值。范围： [1024, 4096]。  |    Integer   | `1024` (MB) |
|  `logrotate`         | Milvus 为每个日志打印级别保存的最多文件数。范围： [0, 1024]。 `0` 代表日志文件数无上限。|    Integer   | `0` |
</div>