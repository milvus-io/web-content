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

## Updating configurations

### Editing the configuration file

You can directly edit the configuration file. You must restart Milvus every time a configuration file is updated.

```shell
$ docker restart <container id>
```

### Updating configurations during runtime

You can update parameters in `server_config.yaml` from a Milvus client. See [Client Reference](sdk.md) for more information.

Updates to the following parameters take effect immediately.

 - section `cache`
    - `cache_size`
    - `insert_buffer_size`
 - section `gpu`
    - `enable`
    - `cache_size`
    - `gpu_search_threshold`
    - `search_devices`
    - `build_index_devices`

For other parameters, you still need to restart Milvus for the changes to take effect.

## `server_config.yaml` parameters

Before changing these settings, welcome to consult Milvus team on [GitHub issues](https://github.com/milvus-io/milvus/issues/new/choose) or [our Slack channel](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk).

### Section `cluster`

<div class="table-wrapper" markdown="block">

| Parameter                | Description                                                  | Type    | Default         |
| ------------------------ | ------------------------------------------------------------ | ------- | --------------- |
| `enable`               | If running with Mishards, set it as `true`, otherwise set it as `false`.   | Boolean   | `false`         |
| `role`                | Milvus deployment role: `rw` / `ro`       | Role    | `rw`         |
</div>

### Section `general`

<div class="table-wrapper" markdown="block">

| Parameter                | Description                                                  | Type    | Default         |
| ------------------------ | ------------------------------------------------------------ | ------- | --------------- |
| `timezone`               | Uses UTC-x or UTC+x to specify a time zone.    | Timezone   | `UTC+8`       |
| `meta_uri`                | URI for metadata storage, using SQLite (for single server Milvus) or MySQL (for distributed cluster Milvus). Format: `dialect://username:password@host:port/database`. Keep `dialect://:@:/`, `dialect` can be either `sqlite` or `mysql`. Replace the other fields with the real values.           | URI    | `sqlite://:@:/`         |

</div>

### Section `network`

<div class="table-wrapper" markdown="block">

| Parameter                | Description                                                  | Type    | Default         |
| ------------------------ | ------------------------------------------------------------ | ------- | --------------- |
| `bind.address`               | IP address that Milvus server monitors.   | IP   | `0.0.0.0`         |
| `bind.port`                | Port that Milvus server monitors. Port range (1024, 65535)            | Integer    | `19530`         |
| `http.enable`                | Whether to enable HTTP server.            | Boolean    | `true`         |
| `http.port`                | Port that Milvus HTTP server monitors. Port range (1024, 65535).            | Integer    | `19121`         |
</div>

### Section `storage`

<div class="table-wrapper" markdown="block">

| Parameter                | Description                                                  | Type    | Default         |
| ------------------------ | ------------------------------------------------------------ | ------- | --------------- |
| `path`         | Directory holding the vector data files, index files, and the metadata. | Path   | `/var/lib/milvus`    |
| `auto_flush_interval` | The interval, in seconds, at which Milvus automatically flushes data to disk.  0: Disables the regular flush.| Integer |    `1` (s)    |

</div>

### Section `wal`

<div class="table-wrapper" markdown="block">

| Parameter            | Description                                                  | Type         | Default |
| -------------------- | ------------------------------------------------------------ | ------------ | ------- |
|  `enable`               |   Whether to enable write-ahead logging (WAL) in Milvus. If WAL is enabled, Milvus writes all data changes to log files in advance before implementing data changes. WAL ensures the atomicity and durability for Milvus operations.      |    Boolean          |   true      |
|  `recovery_error_ignore` |  Whether to ignore logs with errors that happens during WAL recovery. If true, when Milvus restarts for recovery and there are errors in WAL log files, log files with errors are ignored. If false, Milvus fails to restart when there are errors in WAL log files.   |   Boolean           |   true      |
|  `buffer_size`          |  Sum total of the read buffer and the write buffer in Bytes. `buffer_size` must be in range `[64MB, 4096MB]`. If the value you specified is out of range, Milvus automatically uses the boundary value closest to the specified value. It is recommended you set `buffer_size` to a value greater than the inserted data size of a single insert operation for better performance.           |    String          |   `256MB`     |
|  `wal_path`             |  Location of WAL log files.                                                            |    String          |    `/var/lib/milvus/wal`     |
</div>

### Section `cache`

<div class="table-wrapper" markdown="block">

| Parameter            | Description                                                  | Type    | Default   |
| -------------------- | ------------------------------------------------------------ | ------- | --------- |
| `cache_size` | The size of the CPU memory for caching data for faster query. The sum of `cache_size` and `insert_buffer_size` must be less than the system memory size. | String | `4GB` |
| `insert_buffer_size` | Buffer size used for data insertion. The sum of `insert_buffer_size` and `cache_size` must be less than the system memory size. | String | `1GB`        |
| `preload_collection`  | A comma-separated list of collection names that need to be pre-loaded when Milvus server starts up. '*' means preload all existing tables (single-quote or double-quote required).  | StringList | N/A   |

</div>

### Section `gpu`

This section determines whether to enable GPU support/usage in Milvus. GPU support, which uses both CPU and GPUs for optimized resource utilization, can achieve accelerated search performance on very large datasets.


<div class="table-wrapper" markdown="block">

| Parameter            | Description                                                  | Type         | Default |
| -------------------- | ------------------------------------------------------------ | ------------ | ------- |
| `enable` | Whether to enable GPU usage in Milvus. | Boolean | `false` |
| `cache_size` | Size of the GPU memory for caching data.  | String | `1GB` |
| `gpu_search_threshold` | A Milvus performance tuning parameter. This value will be compared with 'nq' to decide if the search computation will  be executed on GPUs only. If nq >= `gpu_search_threshold`, the search computation will be executed on GPUs only; otherwise, the search computation will be executed on both CPUs and GPUs. | Integer | `1000` |
| `search_devices` | A list of GPU devices used for search computation. Must be in format: `gpux`, where `x` is the GPU number, such as `gpu0`.  | DeviceList | `gpu0` |
| `build_index_devices` | A list of GPU devices used for index building. Must be in format: `gpux`, where `x` is the GPU number, such as `gpu0`. | DeviceList | `gpu0` |
</div>

> Note: In Milvus, index building and search computation are separate processes, which can be executed on `cpu`, `gpu`, or both. You can assign multiple GPUs to index building and search computation by adding GPUs under `search_devices` or `build_index_devices`. The following YAML code shows an example:

```yaml
    search_devices:
      - gpu0
      - gpu1
    build_index_devices:
      - gpu0
      - gpu1
```

### Section `logs`

<div class="table-wrapper" markdown="block">

| Parameter            | Description                                                  | Type         | Default |
| -------------------- | ------------------------------------------------------------ | ------------ | ------- |
|  `level`      |   Log level in Milvus. Must be one of `debug`, `info`, `warning`, `error`, `fatal`.           |   String   |  `debug` |
|  `trace.enable`      |   Whether to enable trace level logging.           |    Boolean   |  `true` |
|  `path`              |  Absolute path to the folder holding the log files.  |    String    |  `/var/lib/milvus/logs`   |
|  `max_log_file_size` |  The maximum size of each log file. Range: [512MB, 4096MB]  |    String   | `1024MB` |
|  `log_rotate_num`         | The maximum number of log files that Milvus keeps for each logging level. Range: [0, 1024]. `0` means that the number does not have an upper limit. |    Integer   | `0` |
</div>

### Section `metric`

<div class="table-wrapper" markdown="block">

| Parameter        | Description                                      | Type    | Default      |
| ---------------- | ------------------------------------------------ | ------- | ------------ |
| `enable` | Whether to enable the monitoring function. | Boolean | `false`       |
| `address`        | IP address of the Pushgateway.      |   IP     |   `127.0.0.1`    |
| `port`           | Port of the Pushgateway. Port range (1024, 65535).                       | Integer | `9091`       |
</div>



