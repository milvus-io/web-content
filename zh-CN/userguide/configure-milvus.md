---
id: configure-milvus
title: Configure Milvus
sidebar_label: Configure Milvus
---

# 设置Milvus

## Milvus文件结构
成功启动Milvus server后，你可以在*home/$USER/milvus*的路径下看到Milvus的文件夹。其中包含以下文件：

- *milvus/db*（数据库存储）
- *milvus/logs*（日志存储）
- *milvus/conf*（设置文件）
    - *server_config.yaml*（服务设置文件）
    - *log_config.conf*（日志设置文件）

## 设置Milvus服务

> 注意：如果修改了配置文件，您必须重启 Milvus 服务来启用新的更改。
>
> ```
> $ docker restart <container id>
> ```

请按照以下步骤设置Milvus服务：

1. 根据路径*home/$USER/milvus/conf*，打开Milvus服务设置文件*server_config.yaml*。

2. 对文件中的相关参数进行修改。

   1）在*server_config*区域，设置服务参数。

   | 参数            | 参数描述                          | 参考值            |
   |----------------|-----------------------------------|-------------------|
   | address        | Milvus server监听的ip地址          | 0.0.0.0           |
   | port           | Milvus server监听的端口号，默认值为19530 | 1025 ~ 65534 |
   | gpu_index      | 在有多张GPU的情况下，您可以指定使用哪张GPU来运行Milvus。目前仅支持指定一张GPU。默认值为0。 | 0 ~ GPU数量-1                |
   | mode           | Milvus部署类型                    | single（单机）/ cluster（多机）|

   2）在*db_config*区域，设置数据库参数。

   | 参数               | 参数描述                            | 参考值    |
   |-------------------|-------------------------------------|----------|
   | db_path           | Milvus数据库文件存储的路径            |    /opt/data     |
   | db_slave_path | 当数据量很大，db_path中的磁盘空间无法容下时，您可以添加多个二级数据存储文件路径（以分号隔开）。由于向量数据将在db_path和db_slave_path路径下的文件中均匀分布，请确保这些文件可用的存量差不多。 |  |
   | parallel_reduce | 选择是否使用多线程来运行向量查询。如果使用，将大大减少总的查询时间。如果批量被查询的向量数量很大，建议开启该功能。 | True / False |
   | db_backend_url    | 元数据库URL。Milvus支持2种数据库用于存储元数据：SQLite（适合单机部署）和MySQL（适合分布式部署）。 | sqlite://:@:/  |
   | index_building_threshold | index building触发阈值        |  1024（MB）  |
   | archive_disk_threshold | 归档触发阈值：存储大小，默认值为512（GB）。一旦超过存储大小，触发归档操作。 | >0 |
   | archive_days_threshold | 归档触发阈值：存储天数，默认值为30（天）。一旦超过存储天数，触发归档操作。 |  >0 |
   | insert_buffer_size | 用于buffer的最大内存量，默认值为4（GB）。insert_buffer_size 和cpu_cache_capacity（*cache_config*文件中）之和不能超过内存总量。 | 1 ~ 内存总量|

   > 提示：db_backend_url的格式为：dialect://username:password@host:port/database。(其中'dialect'可以是'mysql'或'sqlite'，取决于你是用了MySQL 还是SQLite作为元数据库)

   3）在*metric_config*区域，设置监控参数。

   | 参数               | 参数描述                            | 参考值    |
   |-------------------|-------------------------------------|----------|
   | is_startup        | 选择是否启动监控             | on（启动）/ off（不启动) |
   | collector         | 连接的监控系统               | Prometheus             |
   | collect_type      | Prometheus的监控获取方式     |   pull / push          |
   | port              | 访问Prometheus的端口号       | 8080                   |
   | push_gateway_ip_address | push gateway的ip地址   | 127.0.0.1             |
   | push_gateway_port       | push gateway的端口号   |  9091                 |

   4）在*cache_config*区域，设置下列参数。

   |  参数             | 参数描述                            | 参考值    |
   |-------------------|-------------------------------------|----------|
   | cpu_cache_capacity |用于缓存的内存量，默认值为16（GB）     |  0 ~ 内存总量 |
   | cache_free_percent |当缓存已满，会自动清除过往数据。通过这条参数您可以设置剩余在缓存中的数据量。比如，该参数的默认值（0.85）表示缓存中85%的数据不用被清除。 | 0 ~ 1 |
   | insert_cache_immediately |选择是否需要将新插入的数据加载到缓存以备搜索。如果您想要即插即搜索，建议启用该功能。 | True / False |

   5）在*engine_config*区域，设置下列参数。

   |  参数             | 参数描述                            | 参考值    |
   |-------------------|-------------------------------------|----------|
   | nlist | 每个文件中的向量类的个数，默认值为16384 | 1 ~ 16384 |
   | nprobe            |查询所涉及的向量类的个数。nprobe影响查询精度。数值越大，精度越高，但查询速度更慢。    |  1 ~ 16384 |
   | metric_type |计算向量距离的方式。你可以选择用欧式距离（L2）或是内积（IP）的方法来计算。 | L2 / IP |
   | use_blas_threshold |设置触发使用OpenBLAS或Intel MKL计算库的阈值，默认值为20 | >=0 |


