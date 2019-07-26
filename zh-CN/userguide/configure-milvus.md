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

请按照以下步骤设置Milvus服务：

1. 根据路径*home/$USER/milvus/conf*，打开Milvus服务设置文件*server_config.yaml*。

2. 对文件中的相关参数进行修改。

   1）在*server_config*区域，设置服务参数。
   
     | 参数            | 参数描述                          | 参考值            |
     |----------------|-----------------------------------|-------------------|
     | address        | Milvus server监听的ip地址          | 0.0.0.0           |
     | port           | Milvus server监听的端口号，默认值为19530 | 1025 ~ 65534 |            
     | gpu_index      | 目前使用的GPU，默认值为0          | 0 ~ GPU数量-1                |
     | mode           | Milvus部署类型                    | single（单机）/ cluster（多机）|            
                                                                                                                     
   2）在*db_config*区域，设置数据库参数。
   
     | 参数               | 参数描述                            | 参考值    |
     |-------------------|-------------------------------------|----------|
     | db_path           | Milvus数据库文件存储的路径            |    /opt/data     |
     | db_backend_url    | 元数据库URL                          | sqlite://:@:/  |
     | index_building_threshold | index building触发阈值        |  1024（MB）  |
     | archive_disk_threshold | 归档触发阈值：存储大小，默认值为512（GB）。一旦超过存储大小，触发归档操作| >0 |
     | archive_days_threshold | 归档触发阈值：存储天数，默认值为30（天）。一旦超过存储天数，触发归档操作|  >0 |
     | maximum_memory    | 用于buffer的内存量，默认值为4（GB）。maximum_memory和cpu_cache_capacity（*cache_config*文件中）之和不能超过内存总量| 1 ~ 内存总量|
     
   > 提示：db_backend_url格式为：dialect://username:password@host:port/database。(其中'dialect'可以是'mysql'或'sqlite'，取决于你是用了MySQL 还是SQLite作为元数据库)
   
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
     
   5）在*engine_config*区域，设置下列参数。

     |  参数             | 参数描述                            | 参考值    |
     |-------------------|-------------------------------------|----------|
     | nprobe            |查询所涉及的向量类的个数。nprobe影响查询精度。数值越大，精度越高，但查询速度更慢    |  1 ~ 16384 |

3. 重启Milvus Docker。

   ```
   $ docker restart <container id>
   ```
