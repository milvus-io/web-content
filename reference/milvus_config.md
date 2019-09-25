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
| `address`   | IP address that Milvus server monitors.                      | string  | `0.0.0.0`  |
| `port`      | Port that Milvus server monitors.                            | integer | `19530`    |
| `mode`      | Milvus deployment type. Select either `single` or `cluster`. | boolean | `single`   |
| `time_zone` | Use the UTC-x or UTC+x to specify a time zone. For example, use `UTC+8` for China Standard Time. | Timezone | `UTC+8`  |
### Section `db_config`

| Parameter                | Description                                                  | Type    | Default         |
| ------------------------ | ------------------------------------------------------------ | ------- | --------------- |
| `db_path`                | Primary directory for the data files you want to import.     | path    | `/opt/data`    |
| `db_slave_path`          | A semicolon-separated list of secondary directories for the data files imported into Milvus.  Set this parameter when the data size is too much to fit in the primary directory set in `db_path`. <br/>Each file, whether in `db_path` or `db_slave_path`, is assigned an equal part of the imported data.  Data Size per Directory = Total Data Size / Number of Directories. So make sure the available storage space in these files are enough. | path    |            |
| `db_backend_url`         | URL for metadata storage. Use SQLite (for single server Milvus) or MySQL (for distributed cluster) to store the metadata. <br/>The format of db_backend_url is: `dialect://username:password@host:port/database`. (`dialect` can be either `mysql` or `sqlite`, depending on which database you use. | path    | `sqlite://:@:/`       |
| `archive_disk_threshold` | Minimum data storage size beyond which archive action is triggered. | integer | `0` (GB)        |
| `archive_days_threshold` | Maximum number of days files are kept. Files older than the specified days will be archived. | integer | `0` (day)       |
| `insert_buffer_size`     | Maximum buffer size allowed for data insertion. The sum of `insert_buffer_size` and `cpu_cache_capacity` (in "Section `cache_config`" ) should be < total memory. | integer | `4` (GB)        |
| `build_index_gpu`        | If multiple GPU are used in Milvus, define which GPU is used for index building. Currently, you can only assign one GPU card for this function. | integer | `0 `            |

### Section `metric_config`

| Parameter                 | Description                                      | Type    | Default      |
| ------------------------- | ------------------------------------------------ | ------- | ------------ |
| `is_startup`              | Set to `true` to enable the monitoring function. | boolean | `true`       |
| `collector`               | Connected monitoring system to collect metrics.  | string  | `Prometheus` |
| `port`                    | Port to visit Prometheus.                        | integer | `8080`       |
| `push_gateway_ip_address` | IP address of Prometheus push gateway.           | string  | `127.0.0.1`  |
| `push_gateway_port`       | Port of Prometheus push gateway.                 | integer | `9091`       |

### Section `cache_config`

| Parameter                  | Description                                                  | Type    | Default   |
| -------------------------- | ------------------------------------------------------------ | ------- | --------- |
| `cpu_cache_capacity`       | Memory used for cache in CPU. The maximum value should not exceed total memory. | integer | `16` (GB) |
| `cache_free_percent`       | The percentage of data that can be kept in the CPU memory when the cache is full (when data size reaches `cpu_cache_capacity`). <br/>For example, the default value indicates that 85% of data stored in the CPU cache doesn't need to be erased. The value should be 0 -1. | float   | `0.85`    |
| `insert_cache_immediately` | If set to `true` , the inserted data will be loaded into the cache immediately for hot query. <br/>If you want simultaneous inserting and searching of vector, it is recommended to enable this function. | boolean | `false`   |


### Section `engine_config`

| Parameter            | Description                                                  | Type    | Default |
| -------------------- | ------------------------------------------------------------ | ------- | ------- |
| `use_blas_threshold` | A Milvus performance tuning parameter. The threshold value must be compared with `nq` to decide if the usage of OpenBLAS or Intel MKL libraries will be triggered. <br/>If `nq` > `use_blas_threshold` , the search response times do not fluctuate, but the search speed is relatively slow. If `nq` < `use_blas_threshold` , the search speed will be enhanced, however with slight fluctuation of search response times. The value should be >= 0. | integer | `20`   |

### Section `resource_config`

<<<<<<< HEAD
| Parameter   | Description                                                  | Type         | Default  |
| ----------- | ------------------------------------------------------------ | ------------ | -------- |
| `mode`      | Resource configuration type. Currently, there is only a `simple` type. | ResourceMode | `simple` |
| `resources` | Define the resource type used for search in Milvus, e.g. `cpu` or `gpu0` | ResourceType | `gpu0`   |

In Milvus, as the **index building** and **search computation** are separate processes, the resource usage conforms to the following general rules:

- Index building process can only be done in `gpu`. Use `build_index_gpu` to define the `gpu` used for this process.
- Search computation can be executed in either `cpu` or `gpu`. If you choose `gpu` for this process, you can assign multiple GPUs. 
- The `gpu` used for index building can also be used for search computation. 

Define in this section the resources **used for search** in Milvus. 

You can assign either `cpu` or `gpu` as the resource. They are mutually exclusive. If you choose `gpu` resource type, list all the GPUs you want to be used, and specify their corresponding device ids. For example:
=======
In Milvus, as the **index building** and **search computation** are separate processes, the resource usage conforms to the following general rules:

- Index building process can only be done in `gpu`. Use `build_index_gpu` in Section `db_config` to define the `gpu` used for this process.
- Search computation can be executed in either `cpu` or `gpu`. If you choose `gpu` for this process, you can assign multiple GPUs. 
- The `gpu` used for index building can also be used for search computation. 
>>>>>>> bc4eeae5792049576ed9335c8266bd6a7edf841c

```
- gpu0
- gpu1
- gpu2
```

Define in this section the resources **used for search** in Milvus. 

You can assign either `cpu` or `gpu` as the resource. They are mutually exclusive. If you choose `gpu` resource type, list all the GPUs you want to be used, and specify their corresponding device ids. For example:

```
- gpu0
- gpu1
- gpu2
```


