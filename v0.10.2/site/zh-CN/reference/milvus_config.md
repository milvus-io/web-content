---
id: milvus_config.md
---

# 服务端配置

## 配置概述

以下配置说明可同时应用于单机或者分布式场景。

#### Milvus 文件结构

成功启动 Milvus 服务后，你可以在 **home/$USER/milvus** 的路径下看到 Milvus 的文件夹。其中包含以下文件：

- **milvus/db**（数据库存储）
- **milvus/logs**（日志存储）
- **milvus/conf**（设置文件）
  - **server_config.yaml**（服务设置）

## 配置修改 

### 编辑配置文件

你可以直接编辑配置文件对配置进行修改。如果修改了配置文件，你必须重启 Milvus 服务来启用新的更改。

```shell
$ docker restart <container id>
```

下面以 Milvus 的系统配置文件 **server_config.yaml** 为例，演示如何修改日志级别和日志存储路径：

```YAML
logs:
  level: info
  path: /var/lib/milvus/logs
```

### 运行时修改

你可以使用 Milvus 客户端对 **server_config.yaml** 的配置进行运行时修改。详情请参考[客户端参考](sdk.md)。

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

## **server_config.yaml** 参数说明

若有任何疑问，欢迎在 GitHub 上给我们 [创建 issue](https://github.com/milvus-io/milvus/issues/new/choose) 或是 [加入 Slack 社区讨论](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk)。

### `cluster` 区域

<div class="table-wrapper" markdown="block">

| 参数           | 说明                                                         | 类型                                                       | 默认值                                                      |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------- |
| `enable` | 是否开启集群模式。<ul><li><code>true</code>：开启集群模式。</li><li><code>false</code>：不开启集群模式。</li></ul> | Boolean                                    | `false`                                    |
| `role`   | 节点的运行模式，可选配置：<ul><li><code>rw</code>：读写模式</li><li><code>ro</code>：只读模式</li></ul> | Role | `rw` |

</div>

### `general` 区域

<div class="table-wrapper" markdown="block">

| 参数             | 说明                                                         | 类型                                                       | 默认值                                                      |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------- |
| `timezone` | 使用 UTC-x 或 UTC+x 来指定时区。比如，可以使用 UTC+8 来代表中国标准时间。 | Timezone | `UTC+8` |
| `meta_uri` | 元数据存储的 URI。可以使用 SQLite（Milvus 单机版本）或者 MySQL（Milvus 分布式版本）来存储元数据。URI 格式为 `dialect://username:password@host:port/database`。其中，`dialect` 可以是 `sqlite` 或者 `mysql`，其他文字需要替换成实际值。| URI | `sqlite://:@:/` |

</div>

### `network` 区域

<div class="table-wrapper" markdown="block">

| 参数                 | 说明                                               | 类型                                             | 默认值                                            |
| ---------------------- | -------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| `bind.address` | Milvus 服务端监听的 IP 地址。                      | IP        | `0.0.0.0`             |
| `bind.port`    | Milvus 服务端监听的端口号，范围：[1025, 65534]。 | Integer | `19530` |
| `http.enable`  | 是否开启 HTTP 服务。<ul><li><code>true</code>：开启 HTTP 服务。</li><li><code>false</code>：不开启 HTTP 服务。</li></ul> | Boolean                        | `true`                         |
| `http.port`    | Milvus HTTP 服务监听的端口号，范围：[1025, 65534]。 | Integer | `19121` |

</div>

### `storage` 区域

<div class="table-wrapper" markdown="block">

| 参数                        | 说明                                                         | 类型                                                       | 默认值                                                      |
| ----------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------- |
| `path`                | Milvus 数据文件（向量文件、索引文件和元数据）的存储路径。                                  | Path                  | `/var/lib/milvus`                 |
| `auto_flush_interval` | Milvus 定期将缓冲区数据落盘的时间间隔（单位为秒），范围：[0, 3600]。如果该值为 0，则关闭定期落盘功能。 | Integer | `1` |

</div>

### `wal` 区域

<div class="table-wrapper" markdown="block">

| 参数                      | 说明                                                         | 类型                                                       | 默认值                                                      |
| --------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------- |
| `enable`                | 是否开启 WAL（Write-Ahead Logging，预写式日志）。如果启用 WAL，Milvus 会在更改数据之前将所有数据更改写入日志文件。WAL 确保 Milvus 操作的原子性和耐用性。<ul><li><code>true</code>：开启 WAL。</li><li><code>false</code>：不开启 WAL。</li></ul> | Boolean     | `true`      |
| `recovery_error_ignore` | 在通过 WAL 执行恢复操作时，是否忽略出现错误的日志。<ul><li><code>true</code>：Milvus 重启恢复时，忽略错误的日志。</li><li><code>false</code>：Milvus 重启恢复时，会因错误的日志启动失败。</li></ul> | Boolean | `false` |
| `buffer_size`           | WAL 缓冲区大小，范围：64MB ~ 4096MB。建议该值大于单次插入的数据量两倍，以获取更好的性能。格式请见 [空间大小的格式](#size)。 | String  | `256MB` |
| `path`                  | 预写式日志文件存储路径。                                     | String                               | `/var/lib/milvus/wal`                |

</div>

### `cache` 区域

<div class="table-wrapper" markdown="block">

| 参数                     | 说明                                                         | 类型                                                       | 默认值                                                      |
| -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------- |
| `cache_size`         | 内存中用于驻留搜索数据的缓存空间大小。`cache_size` 和 `insert_buffer_size` 之和不能超过内存总量。格式请见 [空间大小的格式](#size)。 | String | `4GB` |
| `insert_buffer_size` | 用于数据导入的缓冲区所使用的内存量。`cache_size` 和 `insert_buffer_size` 之和不能超过内存总量。格式请见 [空间大小的格式](#size)。 | String | `1GB` |
| `preload_collection` | 在 Milvus 开启时，需要加载的集合列表。<ul><li>若要加载所有集合，使用 `'*'` (包含引号)。</li><li>若要加载指定集合，列出需要加载的集合名（用引号包围每个集合名，并用逗号隔开相邻集合）。</li></ul>格式请见 [空间大小的格式](#size)。 | StringList | `1GB` |

</div>

### `gpu` 区域

在该区域选择是否在 Milvus 里启用 GPU 用于搜索和索引创建。同时使用 CPU 和 GPU 可以达到资源的最优利用，在特别大的数据集里做搜索时性能更佳。

若要切换到 CPU-only 模式，只要将 `enable` 设置为 `false`。

<div class="table-wrapper" markdown="block">

| 参数                   | 说明                                                         | 类型                                                       | 默认值                                                      |
| ------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------- |
| `enable`               | 是否开启 GPU 用于搜索和索引创建。<ul><li><code>true</code>：开启 GPU。</li><li><code>false</code>：不开启 GPU。</li></ul> | Boolean                                        | `false`                                        |
| `cache_size`           | 显存中用于驻留搜索数据的缓存空间大小。该值不能超过显存总量。格式请见 [空间大小的格式](#size)。 | String | `1GB` |
| `gpu_search_threshold` | 使用 GPU 查询的阈值。用 `nq` 表示单批次查询的向量数，则搜索计算方式如下： <ul><li>`nq` &ge; `gpu_search_threshold`：搜索计算只在 GPU 上进行。</li><li>`nq` &lt; `gpu_search_threshold`：搜索计算将在 CPU 和 GPU 上协同进行。</li></ul> | Integer | `1000` |
| `search_devices`       | 用于搜索的 GPU 设备，格式为“gpux”。其中“x”是 GPU 的序号，例如“gpu0”。 | DeviceList | `gpu0` |
| `build_index_devices`  | 用于创建索引的 GPU 设备，格式为“gpux”。其中“x”是 GPU 的序号，例如“gpu0”。 | DeviceList | `gpu0` |

</div>

<div class="alert note">
在 Milvus 里，创建索引和搜索是两个独立分开的过程，可以只在 CPU，或同时在 CPU 和 GPU 里进行。通过将 GPU 添加至 <code>search_devices</code> 或者 <code>build_index_devices</code> 下方，你可以指定多个 GPU 设备来进行创建索引或搜索。请参考下面的 YAML 示例代码：
</div>

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

| 参数                   | 说明                                                         | 类型                                                       | 默认值                                                      |
| ------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------- |
| `level`             | 日志打印的最低级别。日志级别：`debug` < `info` < `warning` < `error` < `fatal`。 | String | `debug` |
| `trace.enable`      | 是否开启 trace 级别日志打印。<ul><li><code>true</code>：开启 trace 级别日志打印。</li><li><code>false</code>：不开启 trace 级别日志打印。</li></ul> | Boolean                         | `true`                          |
| `path`              | 日志存储路径。                                    | String                                     | `/var/lib/milvus/logs`                     |
| `max_log_file_size` | 单个日志文件的大小限制，范围：1024MB ~ 4096MB。格式请见 [空间大小的格式](#size)。            | Integer     | `1024MB`    |
| `log_rotate_num`    | 每个日志级别最多保存的文件数量，范围：[0, 1024]。0 代表日志文件数无限制。 | Integer | `0` |

</div>

### `metric_config` 区域

<div class="table-wrapper" markdown="block">

| 参数           | 说明                                     | 类型                                   | 默认值                                |
| ---------------- | ---------------------------------------- | ----------------------------------------- | ---------------------------------------- |
| `enable`  | 是否开启 Prometheus 监控。<ul><li><code>true</code>：开启 Prometheus 监控。</li><li><code>false</code>：不开启 Prometheus 监控。</li></ul> | Boolean        | `false`        |
| `address` | 访问 Prometheus Pushgateway 的 IP 地址。 | IP | `127.0.0.1` |
| `port`    | 访问 Prometheus Pushgateway 的端口号。范围：[1025, 65534]。   | Integer | `9091` |

</div>

<div class="alert note" id="size">
在 Milvus 配置文件中，空间大小的格式为“数字+单位”，如“4GB”。
<ul>
<li>数字和单位之间没有空格。</li>
<li>数字必须是整数。</li>
<li>可选单位为 GB、MB、KB。</li>
</ul>
</div>