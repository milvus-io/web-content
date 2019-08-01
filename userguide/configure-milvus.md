---
id: configure-milvus
title: Configure Milvus
sidebar_label: Configure Milvus
---

# Configure Milvus


## Milvus file structure
After you have successfully started Milvus server, you can see a Milvus file under the path *home/$USER/milvus*, which contains the following child files:

- *milvus/db* (database storage)
- *milvus/logs* (log storage)
- *milvus/conf* (configuration file)
    - *server_config.yaml* (service configuration file)
    - *log_config.conf* (log configuration file)

## Set up Milvus service

Follow these procedures to configure Milvus service:

1. In the directory *home/$USER/milvus/conf*, open Milvus service configuration file *server_config.yaml*.

2. Modify the parameters in the file.

   1）In section *server_config*, edit service parameters.

   | Parameter            | Description                          | Reference value           |
   |----------------|-----------------------------------|-------------------|
   | address        | The IP address that Milvus server monitors      | 0.0.0.0           |
   | port           | The port that Milvus server monitors, default is 19530 | 1025 ~ 65534 |
   | gpu_index      | Current GPU, default is 0          | 0 ~ GPU number ~1                |
   | mode           | Milvus deployment method                    | single / cluster |

   2）In section *db_config*, edit database parameters.

   | Parameter               | Description                            | Reference value    |
   |-------------------|-------------------------------------|----------|
   | db_path           | Directory of Milvus data storage           |    /opt/data   |
   | db_slave_path     | When the data size is huge and cannot fit in the single file in db_path, you can add multiple secondary data storage directories (split by semicolons). As the vector data shall be evenly distributed among the file in db_path and each file in db_slave_path, make sure the available memory in these files are almost the same. |               |
   | parallel_reduce   | Select if to use multi-threads to execute the vector search, which could significantly reduce the total query time. You are recommended to enable this function when there are large number of query vectors in one batch. | True / False |
   | db_backend_url    | Meta database URL                         |sqlite://:@:/ |
   | index_building_threshold | index building trigger value       |  1024 (MB)  |
   | archive_disk_threshold | Archive action triggered if storage size exceed this value. Default value is 512 (GB).| >0 |
   | archive_days_threshold | Files older than x days will be archived. Default value is 30 (Day).|  >0  |
   | insert_buffer_size    | Maximum insert buffer size allowed. Default value is 4 (GB). The sum of insert_buffer_size and cpu_cache_capacity (in *cache_config* file) should be less than total memory. | 1 ~ Total memory|

   > Note: db_backend_url format is: dialect://username:password@host:port/database. ('dialect' can be either 'mysql' or 'sqlite', depending on whether you use MySQL or SQLite for the metadata storage.)

   3）In section *metric_config*, edit monitor parameters.

   |Parameter               |  Description                             | Reference value     |
   |-------------------|-------------------------------------|----------|
   | is_startup        | Select if or not to turn on the monitoring system          | on / off |
   | collector         | Connected monitoring system               | Prometheus             |
   | collect_type      | Data collecting type of Prometheus     |   pull / push          |
   | port              | Port to visit Prometheus       | 8080                   |
   | push_gateway_ip_address | IP address of push gateway   | 127.0.0.1             |
   | push_gateway_port       | Port of push gateway   |  9091                 |

   4）In section *cache_config*, edit below parameter.

   |  Parameter                | Description                             | Reference value     |
   |-------------------|-------------------------------------|----------|
   | cpu_cache_capacity | Memory used for cache in CPU. Default value is 16 (GB)       |  0 ~ Total memory size |
   | cache_free_percent | As earliest data will be erased from cache when cache is full (when data size reaches cpu_cache_capacity), this value specifies how much memory should be kept. For example, the default value (0.85) indicates that 85% of data in cache doesn't need to be erased. | 0 ~ 1 |
   | insert_cache_immediately | Select if the inserted data will be loaded into cache immediately for hot query. If you want simultaneous inserting and searching of vector, you can enable this function. | True / False |

   5）In section *engine_config*, edit below parameter.

   |  Parameter            | Description                             | Reference value      |
   |-------------------|-------------------------------------|----------|
   | nlist | Number of vector buckets in a file. Default value is 16384. | 1 ~ 16384 |
   | nprobe            |Number of queried vector buckets. nprobe affects search precision. The greater the value, the more precise the result, yet the slower the search speed. |  1 ~ 16384 |
   | metric_type |The method vector distances are compared. You can compare vectors either by Euclidean distance (L2) or inner product (IP). | L2 / IP |
   | use_blas_threshold |Set the value that triggers the usage of OpenBLAS or Intel MKL libraries. Default value is 20. | >=0 |

3. Restart Milvus Docker.

   ```
   $ docker restart <container id>
   ```
