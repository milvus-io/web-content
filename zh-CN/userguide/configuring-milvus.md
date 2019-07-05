---
id: configuring-milvus
title: Configuring Milvus
sidebar_label: Configuring Milvus
---

# 设置Milvus

## Milvus文件介绍
成功启动Milvus server后，你可以在*home/$USER/milvus*的路径下看到Milvus的文件夹。其中包含以下文件：

- milvus/db（数据库存储）
- milvus/logs（日志存储）
- milvus/conf（设置文件）
    - server_config.yaml（服务设置文件）
    - log_config.conf（日志设置文件）
- milvus/test（测试脚本）

## 设置Milvus服务

请按照以下步骤设置Milvus服务：

1. 根据路径*home/$USER/milvus/conf*，打开Milvus服务设置文件*server_config.yaml*。

2. 对文件中的相关参数进行修改。

   1）点击*server_config*文件，设置服务参数。
   
     | 参数            | 参数描述                          | 参考值            |
     |----------------|-----------------------------------|-------------------|
     | address        | Milvus server监听的ip地址          | 0.0.0.0           |
     | port           | Milvus server监听的端口号，默认值为19530 | 1025 ~ 65534 |            
     | gpu_index      | 目前使用的GPU，默认值为0。          | 0 ~ GPU数量-1                |
     | mode           | Milvus部署类型                    | single（单机）/ cluster（多机）|            
                                                                                                                     
   2）点击*db_config*文件，设置数据库参数。
   
     | 参数               | 参数描述                            | 参考值    |
     |-------------------|-------------------------------------|----------|
     | db_path           | Milvus数据库文件存储的路径            |     ~/milvus/data     |
     | db_backend_url    | 元数据库URI                          | http://127.0.0.1  |
     | index_building_threshold | index building触发阈值        |  1024（MB）  |
     | archive_disk_threshold: 512 | 归档触发条件：存储大小。一旦超过存储大小（单位：GB），触发归档操作| >0 |
     | archive_days_threshold: 30 | 归档触发条件：存储大小。一旦超过存储大小（单位：天），触发归档操作|  >0 |

   3）点击*metric_config*文件，设置监控参数。
   
     | 参数               | 参数描述                            | 参考值    |
     |-------------------|-------------------------------------|----------|
     | is_startup        | 选择是否启动监控             | on（启动）/ off（不启动) |
     | collector         | 连接的监控系统               | Prometheus             |
     | collect_type      | Prometheus的监控获取方式     |   pull / push          |
     | port              | 访问Prometheus的端口号       | 8080                   |
     | push_gateway_ip_address | push gateway的ip地址   | 127.0.0.1             |
     | push_gateway_port       | push gateway的端口号   |  9091                 |

   4）点击*cache_config*文件，设置相关参数。
   
     |  参数             | 参数描述                            | 参考值    |
     |-------------------|-------------------------------------|----------|
     | cpu_cache_capacity |用于cache的内存量，默认值为16GB       |  0 ~ 机器内存总量 |

3. 重启Milvus Docker。

   ```
   $ docker restart <container id>
   ```
