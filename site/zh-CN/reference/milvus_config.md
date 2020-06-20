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

 - `cache` 区域
    - `cache_size`
    - `insert_buffer_size`
 - `gpu` 区域
    - `enable`
    - `cache_size`
    - `gpu_search_threshold`
    - `search_devices`
    - `build_index_devices`

对于其它参数，你必须重新启动 Milvus 才能使改动生效。

## `server_config.yaml` 参数说明

若有任何疑问，欢迎在 GitHub 上给我们 [创建 issue](https://github.com/milvus-io/milvus/issues/new/choose) 或是 [加入 Slack 社区讨论](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk)。

### `cluster` 区域

<div class="table-wrapper" markdown="block">

| 参数        | 说明                                                         | 类型    | 默认值    |
| --------- | ------------------------------------------------------------ | ------- | ------- |
| `enable`  | 如需与 Mishards 配合使用，请将其设为 `true`，不然就设为 `false`。 | Boolean | `false` |
| `role`    | Milvus 部署角色: `rw` / `ro`                          | Role    | `rw`    |

</div>

### `general` 区域

<div class="table-wrapper" markdown="block">

| 参数        | 说明                                                         | 类型    | 默认值    |
| ---------- | ------------------------------------------------------------ | -------- | --------------- |
| `timezone` | 通过 `UTC-x` 或 `UTC+x` 设定时区。                  | Timezone | `UTF+8`         |
| `meta_uri` | 用于存储元数据的 URI。单机版 Milvus 请使用 SQLite，分布式集群版 Milvus 请使用 MySQL。 格式： `dialect://username:password@host:port/database`。请保持 `dialect://:@:/` 的格式。 `dialect` 可以是 `sqlite` 也可以是 `mysql`。至于其他区域请填入对应的真实值。 | URI      | `sqlite://:@:/` |

</div>

### `network` 区域

<div class="table-wrapper" markdown="block">

| 参数        | 说明                                                         | 类型    | 默认值    |
| -------------- | ------------------------------------------------------------ | ------- | --------- |
| `bind.address` | Milvus 服务器监听的 IP 地址。                      | IP      | `0.0.0.0` |
| `bind.port`    | Milvus 监听的端口号. 范围： (1024, 65535)   | Integer | `19530`   |
| `http.enable`  | 是否启用 HTTP 服务器。                              | Boolean | `true`    |
| `http.port`    | Milvus HTTP 服务器监听的端口号。 范围： (1024, 65535)。 | Integer | `19121`   |

</div>

### `storage` 区域

<div class="table-wrapper" markdown="block">

| 参数                 | 说明                                                         | 类型        | 默认值          |
| -------------------- | ------------------------------------------------------------ | ----------- | --------------- |
| `path`       | 导入 Milvus 的向量文件、索引文件和元数据存储的路径。               | Path        | `/var/lib/milvus`     |
| `auto_flush_interval` | Milvus 自动将数据 flush 到硬盘的时间间隔。单位为秒。0: 不启用定期 flush。 | Integer |    `1` (s)    |
</div>

### `wal` 区域

<div class="table-wrapper" markdown="block">

| 参数               | 说明                                                         | 类型    | 默认值     |
| -------------------- | ------------------------------------------------------------ | ------------ | ------- |
|  `enable`               |   是否开启预写式日志（write-ahead logging，WAL）。如果开启，Milvus 会将所有数据变化预先写入日志文件，之后才会执行数据操作。WAL 可以保证 Milvus 操作的原子性和持久性。  |    Boolean          |   true      |
|  `recovery_error_ignore` |  在通过 WAL 执行恢复操作时，是否忽略出现错误的日志。如果设为 true，当 Milvus 重启恢复时，如果有日志出现错误，则 Milvus 会忽略出现错误的日志。如果设为 false，如果 WAL 日志中存在错误，则 Milvus 会启动失败。 |   Boolean           |   true      |
|  `buffer_size`          |   读取缓冲区和写入缓冲区的总大小，单位为字节。`buffer_size` 的值必须在 `[64MB, 4096MB]` 范围内。如果你设的值超出范围，Milvus 自动使用与所设的值最接近的边界值。建议 `buffer_size` 的值要大于单次插入的数据量，以获取更好的性能。     |    String          |   `256MB`      |
|  `wal_path`             |  预写式日志文件路径。                                                           |    String          |    `/var/lib/milvus/wal `     |
</div>

### `cache` 区域

<div class="table-wrapper" markdown="block">

| 参数                       | 说明                                                         | 类型    | 默认值    |
| -------------------------- | ------------------------------------------------------------ | ------- | --------- |
| `cache_size`       | 内存中用于驻留搜索数据的缓存空间，`cache_size` 和 `insert_buffer_size` 之和不能超过内存总量。 | String | `4GB` |
| `insert_buffer_size` | 用于数据导入的 buffer 所使用的最大内存量。`insert_buffer_size` 和 `cache_size` 之和不能超过内存总量。 | String     | `1GB`        |
| `preload_collection` | Milvus 服务器启动时需要预加载的集合。集合名以逗号分隔。'*' 表示预加载全部现有表格。必须用单引号或者双引号。 | StringList | N/A  |
</div>



### `gpu` 区域

在该区域选择是否在 Milvus 里启用 GPU 用于搜索和索引创建。同时使用 CPU 和 GPU 可以达到资源的最优利用，在特别大的数据集里做搜索时性能更佳。

若要切换到 CPU-only 模式，只要将 `enable` 设置为 `false`。

<div class="table-wrapper" markdown="block">

| 参数               | 说明                                                         | 类型    | 默认值     |
| ------------------ | ------------------------------------------------------------ | ------- | ---------- |
| `enable` | 选择是否在 Milvus 里启用 GPU 用于搜索和索引创建。 | Boolean | `false` |
| `cache_size` | 显存中用于驻留搜索数据的缓存空间。 | String | `1GB` |
| `gpu_search_threshold` | Milvus 性能调优参数。此参数必须与 `nq` 比较以确定搜索计算是否只在 GPU 上进行。<br/>如果 `nq` >= `gpu_search_threshold` ，则搜索计算只在 GPU 上进行。如果 `nq` 小于 `gpu_search_threshold` ，则搜索计算将在 CPU 和 GPU 上协同进行。| Integer | `1000` |
| `search_devices` | 定义 Milvus 里用于搜索的 GPU 资源。格式为：`gpux`，其中 `x` 是 GPU 的序号，例如 `gpu0`。 | DeviceList        | `gpu0` |
| `build_index_devices` | 定义 Milvus 里用户创建索引的 GPU 资源。格式为：`gpux`，其中 `x` 是 GPU 的序号，例如 `gpu0`。 | DeviceList | `gpu0` |
</div>

> 注意：在 Milvus 里，创建索引和搜索是两个独立分开的过程，可以只在 `cpu`，或同时在 `cpu` 和 `gpu` 里进行。通过将 GPU 添加至 `search_devices` 或者 `build_index_devices` 下方，你可以指定多张 GPU 来进行创建索引或搜索。 请参考下面的 YAML 示例代码：

```yaml
    search_devices:
      - gpu0
      - gpu1
    build_index_devices:
      - gpu0
      - gpu1
```

###  `logs` 区域

<div class="table-wrapper" markdown="block">

| 参数           | 说明                                                 | 类型         | 默认值 |
| -------------------- | ------------------------------------------------------------ | ------------ | ------- |
|  `level`      |   Milvus 日志等级。必须为 `debug`、 `info`、 `warning`、 `error` 和 `fatal` 其中之一。          |   String   |  `debug` |
|  `trace.enable`      |   是否开启 trace 级别日志打印。           |    Boolean   |  `true` |
|  `path`              |  日志文件绝对路径。  |    String    |   `/var/lib/milvus/logs`   |
|  `max_log_file_size` |  每份日志文件的最大值。范围： [512MB, 4096MB]。  |    Integer   | `1024MB` |
|  `log_rotate_num`         | Milvus 为每个日志打印级别保存的最多文件数。范围： [0, 1024]。 `0` 代表日志文件数无上限。|    Integer   | `0` |
</div>




### `metric_config` 区域

<div class="table-wrapper" markdown="block">

| 参数                      | 说明                           | 类型    | 默认值       |
| ------------------------- | ------------------------------ | ------- | ------------ |
| `enable` | 是否启用监听功能。 | Boolean | `false`       |
| `address`                | 访问 Prometheus Pushgateway 的 IP 地址。       |   IP     |   `127.0.0.1`    |
| `port`                    | 访问 Prometheus Pushgateway 的端口号。 范围 (1024, 65535)。      | Integer | `9091`       |
</div>





### `tracing_config` 区域

<div class="table-wrapper" markdown="block">

| 参数               | 说明                                                         | 类型    | 默认值     |
| -------------------- | ------------------------------------------------------------ | ------------ | ------- |
| `json_config_path` | 追踪系统配置文件的绝对路径。如果该值为空，则 Milvus 会创建一个空的追踪系统。  | Path | ` `  |
</div>



