---
id: milvus_config.md
---

# Milvus Server Configuration

## Configuration overview

The configurations apply to both single server Milvus and all nodes of a distributed Milvus cluster.

#### Milvus file structure

After successfully starting Milvus server, you can see a Milvus folder at `home/$USER/milvus`, which contains the following files:

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

Here we use Milvus' system configuration file **server_config.yaml** as an example to demonstrate how to modify the log level and log path:

```YAML
logs:
  level: info
  path: /var/lib/milvus/logs
```

### Updating configurations during runtime

You can update parameters in `server_config.yaml` from a Milvus client. See [Client Reference](sdk.md) for more information.

Changes to the following parameters take effect immediately without the need to restart Milvus.

 - Section `cache`
    - `cache_size`
    - `insert_buffer_size`
 - Section `gpu`
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
| `enable`               | Whether to enable cluster mode. <ul><li><code>true</code>: Enable cluster mode.</li><li><code>false</code>: Disable cluster mode.</li></ul>  | Boolean   | `false`         |
| `role`                | Milvus deployment role: <ul><li><code>rw</code>: Read and write.</li><li><code>ro</code>: Read only.</li></ul>       | Role    | `rw`         |
</div>

### Section `general`

<div class="table-wrapper" markdown="block">

| Parameter                | Description                                                  | Type    | Default         |
| ------------------------ | ------------------------------------------------------------ | ------- | --------------- |
| `timezone`               | Uses UTC-x or UTC+x to specify a time zone. For example, use UTC+8 to represent China Standard Time.    | Timezone   | `UTC+8`       |
| `meta_uri`                | URI for metadata storage, using SQLite (for single server Milvus) or MySQL (for distributed cluster Milvus). Format: `dialect://username:password@host:port/database`. `dialect` can be either `sqlite` or `mysql`. Replace the other fields with real values.           | URI    | `sqlite://:@:/`         |

</div>

### Section `network`

<div class="table-wrapper" markdown="block">

| Parameter                | Description                                                  | Type    | Default         |
| ------------------------ | ------------------------------------------------------------ | ------- | --------------- |
| `bind.address`               | IP address that Milvus server monitors.   | IP   | `0.0.0.0`         |
| `bind.port`                | Port that Milvus server monitors. Range: [1025, 65534].            | Integer    | `19530`         |
| `http.enable`                | Whether to enable HTTP server. <ul><li><code>true</code>: Enable HTTP server.</li><li><code>false</code>: Disable HTTP server.</li></ul>           | Boolean    | `true`         |
| `http.port`                | Port that Milvus HTTP server monitors. Range: [1025, 65534].            | Integer    | `19121`         |
</div>

### Section `storage`

<div class="table-wrapper" markdown="block">

| Parameter                | Description                                                  | Type    | Default         |
| ------------------------ | ------------------------------------------------------------ | ------- | --------------- |
| `path`         | path to Milvus data files, including vector data files, index files, and the metadata. | Path   | `/var/lib/milvus`    |
| `auto_flush_interval` | The interval, in seconds, at which Milvus automatically flushes data to disk. Range: [0, 3600].  `0` means disabling the regular flush.| Integer |    `1`    |

</div>

### Section `wal`

<div class="table-wrapper" markdown="block">

| Parameter            | Description                                                  | Type         | Default |
| -------------------- | ------------------------------------------------------------ | ------------ | ------- |
|  `enable`               |   Whether to enable write-ahead logging (WAL) in Milvus. If enabled, Milvus writes all data changes to log files in advance before implementing data changes. WAL ensures the atomicity and durability for Milvus operations.<ul><li><code>true</code>: Enable WAL.</li><li><code>false</code>: Disable WAL.</li></ul>      |    Boolean          |   true      |
|  `recovery_error_ignore` |  Whether to ignore logs with errors that happens during WAL recovery. <ul><li><code>true</code>: Ignore errors in log files during WAL recovery.</li><li><code>false</code>: Milvus fails to restart if log files have any error.</li></ul>    |   Boolean           |   true      |
|  `buffer_size`          |  Total size of the read and write WAL buffer in Bytes. Range: 64MB ~ 4096MB. If the value you specified is out of range, Milvus automatically uses the boundary value closest to the specified value. It is recommended you set `buffer_size` to a value greater than the inserted data size of a single insert operation for better performance.           |    String          |   `256MB`     |
|  `wal_path`             |  path to WAL log files.                                                            |    String          |    `/var/lib/milvus/wal`     |
</div>

### Section `cache`

<div class="table-wrapper" markdown="block">

| Parameter            | Description                                                  | Type    | Default   |
| -------------------- | ------------------------------------------------------------ | ------- | --------- |
| `cache_size` | The size of the CPU memory for caching data for faster query. The sum of `cache_size` and `insert_buffer_size` must be less than the system memory size. | String | `4GB` |
| `insert_buffer_size` | Buffer size used for data insertion. The sum of `insert_buffer_size` and `cache_size` must be less than the system memory size. | String | `1GB`        |
| `preload_collection`  | A comma-separated list of collection names that need to be pre-loaded when Milvus server starts up. <ul><li>'*' means preload all existing tables (single-quote or double-quote required).</li><li>To load a specified collection, list the collection names that need to be loaded (enclose each collection name with single-quote or double-quote, and separate adjacent collections with commas).</li></ul>  | StringList | N/A   |

</div>

### Section `gpu`

This section determines whether to enable GPU support/usage in Milvus. GPU support, which uses both CPU and GPUs for optimized resource utilization, can achieve accelerated search performance on very large datasets.


<div class="table-wrapper" markdown="block">

| Parameter            | Description                                                  | Type         | Default |
| -------------------- | ------------------------------------------------------------ | ------------ | ------- |
| `enable` | Whether to enable GPU usage in Milvus. <ul><li><code>true</code>: Enable GPU usage.</li><li><code>false</code>: Disable GPU usage.</li></ul> | Boolean | `false` |
| `cache_size` | Size of the GPU memory for caching data. It must be less than the total memory size of the graphics card. | String | `1GB` |
| `gpu_search_threshold` | The threshold of GPU search. If `nq` represents the number of vectors to be searched for a single batch of queries, the search stragety is as follows: <ul><li>`nq` &ge; `gpu_search_threshold`: The search will be executed on GPUs only.</li><li>`nq` &lt; `gpu_search_threshold`: The search will be executed on both CPUs and GPUs.</li></ul> | Integer | `1000` |
| `search_devices` | A list of GPU devices used for search computation. Must be in format: `gpux`, where `x` is the GPU number, such as `gpu0`.  | DeviceList | `gpu0` |
| `build_index_devices` | A list of GPU devices used for index building. Must be in format: `gpux`, where `x` is the GPU number, such as `gpu0`. | DeviceList | `gpu0` |
</div>

<div class="alert note">
In Milvus, index building and search computation are separate processes, which can be executed on CPU, GPU, or both. You can assign index building and search computation to multiple GPUs by adding GPUs under <code>search_devices</code> or <code>build_index_devices</code>. Please refer to the following YAML sample code:
</div>

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
|  `level`      |   Log level in Milvus. Log Levels: `debug` < `info` < `warning` < `error` < `fatal`.           |   String   |  `debug` |
|  `trace.enable`      |   Whether to enable trace level logging. <ul><li><code>true</code>: Enable trace level logging.</li><li><code>false</code>: Disable trace level logging.</li></ul>          |    Boolean   |  `true` |
|  `path`              |  Absolute path to the folder holding the log files.  |    String    |  `/var/lib/milvus/logs`   |
|  `max_log_file_size` |  The maximum size of each log file. Range: 512MB ~ 4096MB.  |    String   | `1024MB` |
|  `log_rotate_num`         | The maximum number of log files that Milvus keeps for each logging level. Range: [0, 1024]. `0` means that the number of stored log files does not have an upper limit. |    Integer   | `0` |
</div>

### Section `metric`

<div class="table-wrapper" markdown="block">

| Parameter        | Description                                      | Type    | Default      |
| ---------------- | ------------------------------------------------ | ------- | ------------ |
| `enable` | Whether to enable the monitoring function of Prometheus. <ul><li><code>true</code>: Enable monitoring function.</li><li><code>false</code>: Disable monitoring function.</li></ul> | Boolean | `false`       |
| `address`        | IP address of Prometheus Pushgateway.      |   IP     |   `127.0.0.1`    |
| `port`           | Port of Prometheus Pushgateway. Range: [1025, 65534].                       | Integer | `9091`       |
</div>

<div class="alert info" id="size">
In the Milvus configuration file, space size should be written in the format of "number+unit", such as "4GB".
<ul>
<li>Do not add a space between the number and its unit.</li>
<li>The number must be an integer.</li>
<li>Available units include GB, MB, and KB.</li>
</ul>
</div>