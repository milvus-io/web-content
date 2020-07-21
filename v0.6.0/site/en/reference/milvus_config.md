---
id: milvus_config.md
title: Milvus Configuration
sidebar_label: Milvus Configuration
---

# Milvus Configuration

## Configuration overview

The configurations apply to both single server Milvus and all nodes of a distributed Milvus cluster, for example, from whether or not to turn on the monitoring function to more advanced options for performance tuning.

### Milvus file structure

After you have successfully started Milvus server, you can see a Milvus file under the path `home/$USER/milvus`, which contains the following child files:

- `milvus/db` (database storage)
- `milvus/logs` (log storage)
- `milvus/conf` (configuration file)
  - `server_config.yaml` (service configuration)
  - `log_config.conf` (log configuration)

## Configurations

Many configurations below are intended for tuning Milvus internals. Before changing these settings, welcome to consult Milvus team on [GitHub issues](https://github.com/milvus-io/milvus/issues/new/choose) or [our Slack channel](https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk).

> Note: If you have edited these configurations, you must restart Milvus server to apply your changes.  
>
> ```shell
> $ docker restart <container id>
> ```

In the directory `home/$USER/milvus/conf`, open Milvus service configuration file `server_config.yaml`.

### Section `server_config`

<div class="table-wrapper" markdown="block">

| Parameter   | Description                                                  | Type    | Default    |
| ----------- | ------------------------------------------------------------ | ------- | ---------- |
| `address`   | IP address that Milvus server monitors.                      | String | `0.0.0.0`  |
| `port`      | Port that Milvus server monitors. Port range: 1025 - 65534. | Integer | `19530`    |
| `deploy_mode` | Milvus deployment type. Options are `single` , `cluster_readonly` and `cluster_writable`. | DeployMode | `single`   |
| `time_zone` | Use the UTC-x or UTC+x to specify a time zone. For example, use `UTC+8` for China Standard Time. | Timezone | `UTC+8`  |
</div>

### Section `db_config`

<div class="table-wrapper" markdown="block">

| Parameter                | Description                                                  | Type    | Default         |
| ------------------------ | ------------------------------------------------------------ | ------- | --------------- |
| `primary_path`         | Primary directory used for both the vector data files you want to import, and the metadata. | Path   | `/var/lib/milvus`    |
| `secondary_path` | A semicolon-separated list of secondary directories used only for the vector data files imported into Milvus. Set this parameter when the data size is too much to fit in the `primary_path`. <br/>Each file, whether in `primary_path` or `secondary_path`, is assigned an equal part of the imported data.  Data Size per Directory = Total Data Size / Number of Directories. So make sure the available storage space in these files are enough. | Path   |            |
| `backend_url`         | URL for metadata storage. Use SQLite (for single server Milvus) or MySQL (for distributed cluster) to store the metadata. <br/>The format of db_backend_url is: `dialect://username:password@host:port/database`. (`dialect` can be either `mysql` or `sqlite`, depending on which database you use. | Path   | `sqlite://:@:/`       |
| `insert_buffer_size`     | Maximum buffer size allowed for data insertion. The sum of `insert_buffer_size` and `cpu_cache_capacity` (in "Section `cache_config`" ) should be < total memory. | Integer | `1` (GB)        |
| `preload_table` | Define if to preload tables into memory after Milvus server restart. Tables can be selected for fully or partially preloading.<br/>To preload all the existing tables, use `*` ; To preload some tables, list the specific table names, separated by comma. If you choose not to preload any table, keep it empty ( ` ` ). | PreloadType | ` ` |
</div>

### Section `metric_config`

<div class="table-wrapper" markdown="block">

| Parameter        | Description                                      | Type    | Default      |
| ---------------- | ------------------------------------------------ | ------- | ------------ |
| `enable_monitor` | Set to `true` to enable the monitoring function. | Boolean | `true`       |
| `collector`      | Connected monitoring system to collect metrics.  | String  | `Prometheus` |
| `port`           | Port to visit Prometheus.                        | Integer | `8080`       |
</div>

### Section `cache_config`

<div class="table-wrapper" markdown="block">

| Parameter            | Description                                                  | Type    | Default   |
| -------------------- | ------------------------------------------------------------ | ------- | --------- |
| `cpu_cache_capacity` | The size of the CPU memory for caching data for faster query. The sum of `cpu_cache_capacity` and `insert_buffer_size` (in "Section `db_config`) must be less than total CPU memory size. | Integer | `4` (GB) |
| `cache_insert_data`  | If set to `true` , the inserted data will be loaded into the cache immediately for hot query. <br/>If you want simultaneous inserting and searching of vector, it is recommended to enable this function. | Boolean | `false`   |
</div>

### Section `engine_config`

<div class="table-wrapper" markdown="block">

| Parameter            | Description                                                  | Type    | Default |
| -------------------- | ------------------------------------------------------------ | ------- | ------- |
| `use_blas_threshold` | A Milvus performance tuning parameter. The threshold value must be compared with `nq` to decide if the usage of OpenBLAS library will be triggered. <br/>If `nq` >= `use_blas_threshold` , OpenBLAS will be used. The search response times do not fluctuate, but the search speed is relatively slow. <br/>If `nq` < `use_blas_threshold` , SSE will be used. The search speed will be enhanced, however with slight fluctuation of search response times. The value should be >= 0. | Integer | `20`   |
| `gpu_search_threshold` | A Milvus performance tuning parameter. The threshold value must be compared with `nq` to decide if the search computation will be executed on GPUs only.<br/>If `nq` >= `gpu_search_threshold` , the search computation will be executed on GPUs only.<br/>If `nq` < `gpu_search_threshold` , the search computation will be executed on both CPUs and GPUs. | Interger | `1000` |
</div>

### Section `gpu_resource_config`

Decide in this section whether to enable GPU support/usage in Milvus. GPU support, which uses both CPU and GPUs for optimized resource utilization, is by default enabled to achieve accelerated search performance on very large datasets. 

To switch to CPU-only mode, just set `enable` to `false`. 

> Note: In Milvus, the **index building** and **search computation** are separate processes, which can be executed on `cpu`, or `gpu` or both. You are allowed to assign multiple GPUs to run both processes.

<div class="table-wrapper" markdown="block">

| Parameter            | Description                                                  | Type         | Default |
| -------------------- | ------------------------------------------------------------ | ------------ | ------- |
| `enable` | Decide if to enable GPU usage in Milvus. | Boolean | `true` |
| `cache_capacity` | The size of the GPU memory for caching data for faster query. The size must be less than the total GPU memory size. | Integer | `1` (GB) |
| `search_resources` | Define the GPU devices used for search computation in Milvus. Must be in format: `gpux`. | ResourceType | `gpu0` |
| `build_index_resources` | Define the GPU devices used for index building in Milvus. Must be in format: `gpux`. | ResourceType | `gpu0`  |
</div>
