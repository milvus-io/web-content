---
id: milvus_config
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

Many configurations below are intended for tuning Milvus internals. Before changing these settings, think twice or discuss with Milvus team via [support@zilliz.com](mailto:support@zilliz.com).

> Note: If you have edited these configurations, you must restart Milvus server to apply your changes.  
>
> ```shell
> $ docker restart <container id>
> ```

In the directory `home/$USER/milvus/conf`, open Milvus service configuration file `server_config.yaml`.

### Section `server_config`

| Parameter   | Description                                                  | Type    | Default    |
| ----------- | ------------------------------------------------------------ | ------- | ---------- |
| `address`   | IP address that Milvus server monitors.                      | String | `0.0.0.0`  |
| `port`      | Port that Milvus server monitors. Port range: 1025 - 65534. | Integer | `19530`    |
| `deploy_mode` | Milvus deployment type. Options are `single` , `cluster_readonly` and `cluster_writable`. | DeployMode | `single`   |
| `time_zone` | Use the UTC-x or UTC+x to specify a time zone. For example, use `UTC+8` for China Standard Time. | Timezone | `UTC+8`  |
### Section `db_config`

| Parameter                | Description                                                  | Type    | Default         |
| ------------------------ | ------------------------------------------------------------ | ------- | --------------- |
| `primary_path`         | Primary directory used for both the vector data files you want to import, and the metadata. | Path   | `/opt/data`    |
| `secondary_path` | A semicolon-separated list of secondary directories used only for the vector data files imported into Milvus. Set this parameter when the data size is too much to fit in the `primary_path`. <br/>Each file, whether in `primary_path` or `secondary_path`, is assigned an equal part of the imported data.  Data Size per Directory = Total Data Size / Number of Directories. So make sure the available storage space in these files are enough. | Path   |            |
| `backend_url`         | URL for metadata storage. Use SQLite (for single server Milvus) or MySQL (for distributed cluster) to store the metadata. <br/>The format of db_backend_url is: `dialect://username:password@host:port/database`. (`dialect` can be either `mysql` or `sqlite`, depending on which database you use. | Path   | `sqlite://:@:/`       |
| `insert_buffer_size`     | Maximum buffer size allowed for data insertion. The sum of `insert_buffer_size` and `cpu_cache_capacity` (in "Section `cache_config`" ) should be < total memory. | Integer | `4` (GB)        |
| `preload_table` | Define if to preload tables into memory after Milvus server restart. Tables can be selected for fully or partially preloading.<br/>To preload all the existing tables, use `*` ; To preload some tables, list the specific table names, separated by comma. If you choose not to preload any table, keep it empty ( ` ` ). | PreloadType | ` ` |

### Section `metric_config`

| Parameter        | Description                                      | Type    | Default      |
| ---------------- | ------------------------------------------------ | ------- | ------------ |
| `enable_monitor` | Set to `true` to enable the monitoring function. | Boolean | `true`       |
| `collector`      | Connected monitoring system to collect metrics.  | String  | `Prometheus` |
| `port`           | Port to visit Prometheus.                        | Integer | `8080`       |

### Section `cache_config`

| Parameter             | Description                                                  | Type    | Default   |
| --------------------- | ------------------------------------------------------------ | ------- | --------- |
| `cpu_cache_capacity`  | Memory used for cache in CPU. The maximum value should not exceed total memory. | Integer | `16` (GB) |
| `cpu_cache_threshold` | The percentage of data that can be kept in the CPU memory when the cache usage exceeds `cpu_cache_capacity`. <br/>For example, the default value indicates that 85% of data stored in the CPU cache doesn't need to be erased. The value should be 0 - 1. | Float   | `0.85`    |
| `gpu_cache_capacity`  | Memory used for cache in GPU. The maximum value should not exceed total memory. | Integer | `4` (GB)  |
| `gpu_cache_threshold` | The percentage of data that can be kept in the GPU memory when the cache usage exceeds `gpu_cache_capacity`. <br/>For example, the default value indicates that 85% of data stored in the GPU cache doesn't need to be erased. The value should be 0 - 1. | Float   | `0.85`    |
| `cache_insert_data`   | If set to `true` , the inserted data will be loaded into the cache immediately for hot query. <br/>If you want simultaneous inserting and searching of vector, it is recommended to enable this function. | Boolean | `false`   |


### Section `engine_config`

| Parameter            | Description                                                  | Type    | Default |
| -------------------- | ------------------------------------------------------------ | ------- | ------- |
| `use_blas_threshold` | A Milvus performance tuning parameter. The threshold value must be compared with `nq` to decide if the usage of OpenBLAS library will be triggered. <br/>If `nq` >= `use_blas_threshold` , OpenBLAS will be used. The search response times do not fluctuate, but the search speed is relatively slow. <br/>If `nq` < `use_blas_threshold` , SSE will be used. The search speed will be enhanced, however with slight fluctuation of search response times. The value should be >= 0. | Integer | `20`   |

### Section `resource_config`

In Milvus, as the **index building** and **search computation** are separate processes, the resource usage conforms to the following general rules:

- Index building process can only be done in `gpu`. Use `build_index_gpu` to define the `gpu` used for this process.
- Search computation can be executed in both `cpu` and `gpu` . You are allowed to assign multiple GPUs. 
- The `gpu` used for index building can also be used for search computation. 

| Parameter            | Description                                                  | Type         | Default |
| -------------------- | ------------------------------------------------------------ | ------------ | ------- |
| `search_resources`   | Define the `gpu` resource used for search in Milvus. You can assign multiple GPUs. | ResourceType | `gpu0`  |
| `index_build_device` | Define the resource type used for index building in Milvus. You can only assign `gpu`. | ResourceType | `gpu0`  |

Define in this section the resources used for search computation and index building in Milvus. 

For `gpu` resource type, list all the GPUs you want to be used, and specify their corresponding device ids. For example:

```
- gpu0
- gpu1
- gpu2
```


