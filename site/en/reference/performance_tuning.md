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

## Improve performance

Please check the following configurations to improve performance:

### Milvus 服务端配置文件参数设置

- `preload_table`: 建议在内存允许的情况下尽可能多地加载 collection。这样在每次重启服务端之后，数据都会先载入到 Milvus 中，可以解决第一次搜索耗时很长的问题。
- `buffer_size`: 影响插入性能。建议插入数据量为 `buffer_size` 的一半。
- `insert_buffer_size`：
  - （如果 WAL 开启了）建议 `insert_buffer_size` 大于 `wal_buffer_size` 的一半 且插入数据量小于 `wal_buffer_size`的一半。
  - （如果 WAL 没有开启）建议插入的数据量小于 `insert_buffer_size`。
- `cpu_cache_capacity`：建议在内存允许的情况下尽可能调大。这样有助于确保数据全部在内存中，减少内存和磁盘的数据交换，从而提高查询性能。
- `use_blas_threhold`: 影响的不同查询批量使用的距离计算函数。nq < `use_blas_threshold` 时使用 CPU 指令集进行查询，否则使用的是 OpenBLAS 来计算距离。大多数场景下，使用 CPU 指令集进行查询的性能会更好。

### Milvus 客户端参数设置

- `index_file_size`:
  - （数据量固定，无增量数据的场景）提高此参数使得每个索引文件变大。推荐大小为 1 ～ 2 GB。设置太小会导致索引过于分散。搜索时间远小于加载时间。达不到加载和搜索形成 pipeline 的效果。内存或显存允许的情况，该值设置的更大可以提高查询性能。使用 GPU 进行查询时，建议该值不要超过可用显存的 1/4。
  - （数据量不固定，连续有增量数据进入，并且伴随查询的场景）不宜设得太大，最好 256 MB 或者 512 MB，看具体情况而定。
