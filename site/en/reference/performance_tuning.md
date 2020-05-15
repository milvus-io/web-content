---
id: performance_tuning.md
title: Configure Milvus for Production
sidebar_label: Configure Milvus for Production
---

# Configure Milvus for Production

Before using Milvus for production, please check the following configurations to ensure data security and improve performance. 

## Data security

### Use MySQL as metadata management service

Refer to [Data Management](data_manage.md) for more information.

### Move data storage locations out of the `tmp` folder

Move data storage locations out of the `tmp` folder:

- `storage_config`
- `primary_path`
- `wal_config`
- `wal_path`
- `log_path`

## Performance improvement

Please check the following configurations to improve performance:

### Milvus server configuration

- `preload_table`: It is recommended that you load as many collections as the memory size permits. In this way, data will be loaded to Milvus first every time Milvus restarts. Otherwise, the first search operation will spend some time loading collections.
- `buffer_size`: Affects data insertion performance. It is recommended that you set the inserted data size half of `buffer_size`.
- `insert_buffer_size`:
  - **(If WAL is on)** It is recommended that you set `insert_buffer_size` greater than half of `wal_buffer_size` and the inserted data size less than half of `wal_buffer_size`.
  - **(If WAL is not on)** It is recommended that you set the inserted data size smaller than `insert_buffer_size`.
- `cpu_cache_capacity`: It is recommended that you set `cpu_cache_capacity` as large as possible to ensure that data is stored in memory, thus reducing data swapping between the memory and the disk and improving search performance.
- `use_blas_threhold`: Determines the distance metric functions used by different batches of search data. If nq < `use_blas_threshold`, Milvus uses CPU instruction sets to search. Otherwise, OpenBLAS is used. In most cases, it is recommended to use CPU instruction sets for distance computation.

### Milvus client parameters

- `index_file_size`:
  - **(Fixed data quantity, no incremental data)** The higher the parameter value, the larger the size of each index file. The valid range is 1 to 4 GB. The recommended value is 1 to 2 GB. If the value is too small, index files will be too scattered and search time will be much less than the load time. As a result, load and search cannot form a pipeline. If CPU/GPU memory permits, you can set a relatively large value to improve search performance. When you use GPU to search, it is recommended that you set this value less than 1/4 of available GPU memory.
  - **(Flexible data quantity, with continuous incoming data and simultaneous search operations)** Recommended values include 256 MB, 512 MB, or other values per different conditions. Do not set too high a value.