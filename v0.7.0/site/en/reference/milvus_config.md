---
id: milvus_config.md
title: Milvus Configuration
sidebar_label: Milvus Configuration
---

# Milvus Server Configuration

## Configuration overview

The configurations apply to both single server Milvus and all nodes of a distributed Milvus cluster.

#### Milvus file structure

After you have successfully started Milvus server, you can see a Milvus file under the path `home/$USER/milvus`, which contains the following child files:

- `milvus/db` (database storage)
- `milvus/logs` (log storage)
- `milvus/conf` (configuration file folder)
  - `server_config.yaml` (server configuration)
  - `log_config.conf` (log configuration)

## Updating configurations

### Editing the configuration file

You can directly edit the configuration file. You must restart Milvus every time a configuration file is updated.

```shell
$ docker restart <container id>
```

### Updating configurations during runtime

You can use Milvus clients to update parameters in `server_config.yaml`. Refer to [Client Reference](sdk.md) for more information.

When you use Milvus clients to update the following parameters, the updates take effect immediately. 
 
 - section `cache_config`
    - `cpu_cache_capacity`
    - `cache_insert_data`
 - section `engine_config`
    - `use_blas_threshold`
    - `gpu_search_threshold`
 - section `gpu_resource_config`
    - `enable`
    - `cache_capacity`
    - `search_resources`
    - `build_index_resources`

For other parameters, you still need to restart Milvus for the changes to take effect.

## `server_config.yaml` parameters

Before changing these settings, welcome to consult Milvus team on [GitHub issues](https://github.com/milvus-io/milvus/issues/new/choose) or [our Slack channel](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk).

### Section `server_config`

<div class="table-wrapper" markdown="block">

| Parameter   | Description                                                  | Type    | Default    |
| ----------- | ------------------------------------------------------------ | ------- | ---------- |
| `address`   | IP address that Milvus server monitors.                      | String | `0.0.0.0`  |
| `port`      | Port that Milvus server monitors. Port range: (1024, 65535). | Integer | `19530`    |
| `deploy_mode` | Milvus deployment type. Options are `single`, `cluster_readonly` and `cluster_writable`. | DeployMode | `single`   |
| `time_zone` | Use the UTC-x or UTC+x to specify a time zone. For example, use `UTC+8` for China Standard Time. | Timezone | `UTC+8`  |
| `web_port` |  Port that Milvus web server monitors.  Port range: (1024, 65535). You can use the Milvus web server to communicate with the [Milvus RESTful API](sdk.md). | Integer |  `19121` |
</div>

### Section `db_config`

<div class="table-wrapper" markdown="block">

| Parameter                | Description                                                  | Type    | Default         |
| ------------------------ | ------------------------------------------------------------ | ------- | --------------- |
| `backend_url`         | URL for metadata storage. Use SQLite (for single server Milvus) or MySQL (for distributed cluster) to store the metadata. <br/>The format of `backend_url` is: `dialect://username:password@host:port/database`. (`dialect` can be either `mysql` or `sqlite`, depending on which database you use. | String   | `sqlite://:@:/`       |
| `preload_table` | Determines how to preload collections into memory after Milvus server restarts. Collections can be selected for fully or partially preloading.<br/>To preload all the existing collections, use `'*'` (quote included); To preload some collections, list the specific collection names, separated by comma. If you choose not to preload any collection, keep it empty ( ` ` ). | StringList | ` ` |
| `auto_flush_interval` | The interval, in seconds, at which Milvus automatically flushes inserted data in the cache to disk. If `auto_flush_interval` is 0, automatic flushing at a fixed interval is disabled. However, when the cache is full, Milvus always flushes data to disk, regardless of the value of `auto_flush_interval`.  | Integer |  1 (s)  |
</div>

### Section `storage_config`

<div class="table-wrapper" markdown="block">

| Parameter                | Description                                                  | Type    | Default         |
| ------------------------ | ------------------------------------------------------------ | ------- | --------------- |
| `primary_path`         | Primary directory used for the vector data files, index files, and the metadata. | Path   | `/var/lib/milvus`    |
| `secondary_path` | A semicolon-separated list of secondary directories used vector data files and index files. Set this parameter when the data size is too much to fit in the `primary_path`. <br/>Each file, whether in `primary_path` or `secondary_path`, is assigned an equal part of the imported data.  Data Size per Directory = Total Data Size / Number of Directories. So make sure the available storage space in these files are enough. | Path   |     ` `       |

</div>

### Section `metric_config`

<div class="table-wrapper" markdown="block">

| Parameter        | Description                                      | Type    | Default      |
| ---------------- | ------------------------------------------------ | ------- | ------------ |
| `enable_monitor` | Set to `true` to enable the monitoring function. | Boolean | `false`       |
| `address`        | IP address of the Pushgateway.      |   IP     |   `127.0.0.1`    |
| `port`           | Port of the Pushgateway.                        | Integer | `9091`       |
</div>

### Section `cache_config`

<div class="table-wrapper" markdown="block">

| Parameter            | Description                                                  | Type    | Default   |
| -------------------- | ------------------------------------------------------------ | ------- | --------- |
| `cpu_cache_capacity` | The size of the CPU memory for caching data for faster query. The sum of `cpu_cache_capacity` and `insert_buffer_size` must < the total CPU memory size. | Integer | `4` (GB) |
| `insert_buffer_size`     | Maximum memory size used by the buffer for data insertion. The sum of `insert_buffer_size` and `cpu_cache_capacity` must < the total memory. | Integer | `1` (GB)        |
| `cache_insert_data`  | If set to `true` , the inserted data will be loaded into the cache immediately for hot query. | Boolean | `false`   |

</div>

### Section `engine_config`

<div class="table-wrapper" markdown="block">

| Parameter            | Description                                                  | Type    | Default |
| -------------------- | ------------------------------------------------------------ | ------- | ------- |
| `use_blas_threshold` | A Milvus performance tuning parameter. The threshold value must be compared with `nq` to decide whether the usage of OpenBLAS library will be triggered. <br/>If `nq` >= `use_blas_threshold` , OpenBLAS will be used. The search response times do not fluctuate, but the search speed is relatively slow. <br/>If `nq` < `use_blas_threshold` , AVX or SSE will be used. The search speed will be enhanced, however with slight fluctuation of search response times. The value should be >= 0. | Integer | `1100`   |
| `gpu_search_threshold` | A Milvus performance tuning parameter. The threshold value must be compared with `nq` to decide if the search computation will be executed on GPUs only.<br/>If `nq` >= `gpu_search_threshold` , the search computation will be executed on GPUs only.<br/>If `nq` < `gpu_search_threshold` , the search computation will be executed on both CPUs and GPUs. | Integer | `1000` |
</div>

### Section `gpu_resource_config`

This section determines whether to enable GPU support/usage in Milvus. GPU support, which uses both CPU and GPUs for optimized resource utilization, can achieve accelerated search performance on very large datasets.

To switch to CPU-only mode, just set `enable` to `false`.

<div class="table-wrapper" markdown="block">

| Parameter            | Description                                                  | Type         | Default |
| -------------------- | ------------------------------------------------------------ | ------------ | ------- |
| `enable` | Whether to enable GPU usage in Milvus. | Boolean | `true` |
| `cache_capacity` | Size of the GPU memory for caching data for faster query. The size must be less than the total GPU memory size. | Integer | `1` (GB) |
| `search_resources` | GPU devices used for search computation in Milvus. Must be in format: `gpux`, where `x` is the GPU number, such as `gpu0`. You can use multiple GPUs for search computation. | DeviceList | `gpu0` |
| `build_index_resources` | GPU devices used for index building in Milvus. Must be in format: `gpux`, where `x` is the GPU number, such as `gpu0`. You can use multiple GPUs for search computation. | DeviceList | `gpu0` |
</div>

> Note: In Milvus, index building and search computation are separate processes, which can be executed on `cpu`, `gpu`, or both. You can assign multiple GPUs to index building and search computation by adding GPUs under `search_resources` or `build_index_resources`. The following YAML code shows an example:

  ```yaml
    search_resources:
      - gpu0
      - gpu1
    build_index_resources:
      - gpu0
      - gpu1
  ```

### Section `tracing_config`

<div class="table-wrapper" markdown="block">

| Parameter            | Description                                                  | Type         | Default |
| -------------------- | ------------------------------------------------------------ | ------------ | ------- |
| `json_config_path` | Absolute path for tracing config file. Milvus creates a no-op tracer if the value is empty. | Path | ` `  |
</div>

### Section `wal_config`

<div class="table-wrapper" markdown="block">

| Parameter            | Description                                                  | Type         | Default |
| -------------------- | ------------------------------------------------------------ | ------------ | ------- |
|  `enable`               |   Whether to enable write-ahead logging (WAL) in Milvus. If WAL is enabled, Milvus writes all data changes to log files in advance before implementing data changes. WAL ensures the atomicity and durability for Milvus operations.      |    Boolean          |   true      |
|  `recovery_error_ignore` |  Whether to ignore logs with errors that happens during WAL recovery. If true, when Milvus restarts for recovery and there are errors in WAL log files, log files with errors are ignored. If false, Milvus fails to restart when there are errors in WAL log files.   |   Boolean           |   true      |
|  `buffer_size`          |  Sum total of the read buffer and the write buffer in MBs. `buffer_size` must be in range `[64, 4096]` (MB) . If the value you specified is out of range, Milvus automatically uses the boundary value closest to the specified value. It is recommended you set `buffer_size` to a value greater than the inserted data size of a single insert operation for better performance.              |    Integer          |   `256` (MB)     |
|  `wal_path`             |  Location of WAL log files.                                                            |    String          |    ` `     |
</div>
