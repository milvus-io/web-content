---
id: troubleshoot
title: Troubleshoot
sidebar_label: Troubleshoot
---

# 故障诊断

## 概述

如果您在使用 Milvus 时遇到问题，您可以通过以下步骤排查障碍：

1. 如果是 Milvus 操作方面的问题，请查看 **故障诊断 API 行为**。
2. 如果是启动 Milvus 服务时遇到问题，请参考 **服务器启动故障**。
3. 对于您无法自己解决的问题，请直接发邮件至 support@zilliz.com，Milvus 团队将会第一时间回复您。

## 故障诊断 API 行为

| 故障类型 | 报错信息                                                     |
| -------- | ------------------------------------------------------------ |
| 通用     | `Invalid table name: xxx`                                    |
| 通用     | `Table xxx not exist`                                        |
| 创建表   | `Invalid table dimension: xxx`                               |
| 创建表   | `Invalid index file size: xxx`                               |
| 创建表   | `Invalid index metric type: xxx`                             |
| 创建索引 | `Invalid index type: xxx`                                    |
| 创建索引 | `Invalid index nlist: xxx`                                   |
| 插入向量 | `Row record array is empty`                                  |
| 插入向量 | `Size of vector ids is not equal to row record array size`   |
| 插入向量 | `Table vector ids are user defined, please provide id for this batch` |
| 插入向量 | `Table vector ids are auto generated, no need to provide id for this batch` |
| 插入向量 | `Row record float array is empty`                            |
| 插入向量 | `Invalid row record dimension: xxx  vs. table dimension: xxx` |
| 查询向量 | `Invalid topk: xxx`                                          |
| 查询向量 | `Invalid nprobe: xxx`                                        |
| 查询向量 | `Query record float array is empty`                          |
| 查询向量 | `Invalid query record dimension: xxx vs. table dimension: xxx` |

### 通用

`Invalid table name: xxx`

该报错信息表示表的名字无效。

若要解决该问题，请编辑表名，并确保它符合以下要求：

- 首个字符必须是字母或下划线（_），不能为数字。
- 由字母，下划线（_）和数字（0-9）组成。
- 总长度不可以超过255个字符。

`Table xxx not exist`

该报错信息表示表不存在。

若要解决该问题，请使用 `milvus.has_table` 来确认该表是否存在，后面跟表名。或者您也可以检查输入的表名是否正确。

### 创建表

`Invalid table dimension: xxx`

该报错信息表示表的维度无效。

若要解决该问题，请检查创建的表的维度在 1 ~ 16384 之间。

`Invalid index file size: xxx`

该报错信息表示 index file size 无效。Index file size 指触发 index 创建的文件的最大阈值。

若要解决该问题，请检查 index file size 设置在 1 ~ 4096 之间。

`Invalid index metric type: xxx`

该报错信息表示 metric type 无效。Metric type 指计算向量距离的方式。您可以选择用欧式距离（L2）或是内积（IP）的方法来计算。

若要解决该问题，请检查 metric type 设置为 `MetricType.L2` 或 `MetricType.IP` 。

### 创建索引

`Invalid index type: xxx`

该报错信息表示 index type 无效。Index type 指查询表的索引方式。

若要解决该问题，请检查 index type 设置为以下任一项：

- `FLAT` - 提供100%的精确检索。但由于计算量巨大，搜索速度可能受影响。
- `IVFLAT` - 基于 K-means 的检索方式，搜索精度和速度都不错。
- `IVF_SQ8` - 运用scalar quantization的向量索引，能大幅缩小向量体积（大概缩减到原来的1/4），从而能有效提高向量吞吐量。

`Invalid index nlist: xxx`

该报错信息表示索引 nlist 无效。

若要解决该问题，请检查索引 nlist 必须大于0。

### 插入向量

`Row record array is empty`

该报错信息表示向 Milvus 插入了空的向量，也就是插入向量时没有输入向量数据。

若要解决该问题，请确保您在插入向量时，输入了相关向量数据。

`Row record array data is empty`

该报错信息表示插入的向量值为空。

若要解决该问题，请确保您插入的向量的值不为空。

`Size of vector ids is not equal to row record array size`

该报错信息表示插入的向量 id 的个数和向量的个数不一致。

若要使用用户自定义的向量 id，请确保您提供了和向量个数一样多的向量 id 个数。否则，请不要提供用户自定义  向量 id，Milvus 将为每条插入的向量自动生成 id。

`Table vector ids are user defined, please provide id for this batch`

该报错信息表示在插入向量时，如果部分向量有用户自定义 id，则该批次所有其它向量都必须有用户自定义 id。

若要解决该问题，请为所有插入的向量提供用户自定义 id。

`Table vector ids are auto generated, no need to provide id for this batch`

该报错信息表示插入向量时，如果部分向量使用了 Milvus 自动生成的 id，则该批次所有其它向量也必须使用 Milvus 自动生成的向量 id。 

若要解决该问题，您可以：

- 不为该批次任何向量提供用户自定义 id，而使用 Milvus 自动生成的向量 id。
- 为该批次所有向量提供用户自定义 id。

`Invalid row record dimension: xxx  vs. table dimension: xxx`

该报错信息表示插入的向量的维度和表的维度不一致。

若要解决该问题，请确保插入向量的维度和表的维度一致。

### 查询向量

`Invalid topk: xxx`

该报错信息表示搜索参数 topk 无效。

若要解决该问题，请检查 topk 设置在 1 ~ 2048 之间。

`Invalid nprobe: xxx`

该报错信息表示搜索参数 nprobe 无效。 

若要解决该问题，请检查  nprobe 设置在  1 ~ nlist 之间。

`Row record array data is empty`

该报错信息表示要搜索的向量值为空。 

若要解决该问题，请确保您要搜索的向量的值不为空。

`Invalid query record dimension: xxx vs. table dimension: xxx`

该报错信息表示要搜索的向量的维度和表的维度不一致。

若要解决该问题，请确保输入的要搜索的向量维度和表的维度一致。

## 服务器启动故障

| 报错信息                                                     | 原因                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `ERROR: mode specified in server_config is not one of ['single', 'cluster', 'read_only']` | `server_config.yaml ` 或 `server_config.mode` 里参数设置有问题。 |
| `ERROR! Failed to create database root path: xxx             | `server_config.yaml ` 或 `db_config.db_path` 里参数设置有问题。或者 path 不存在。 |
| `ERROR! Failed to create database slave path: xxx`           | `server_config.yaml ` 或 `db_config.slave_path` 里参数设置有问题。或者 path 不存在。 |
| `ERROR! Failed to open database: xxx`                        | 元数据系统故障。                                             |
| `ERROR: invalid server IP address: xxx`                      | `server_config.yaml` 或 `server_config.address` 里的服务器地址设置无效。 |
| `ERROR: port xxx is not a number                             | `server_config.yaml ` 或 `server_config.port` 里的服务器端口不是一个数。 |
| `ERROR: port xxx out of range [1025, 65534]`                 | `server_config.yaml`  或 `server_config.port` 里的服务器端口设置无效，范围为1025~65534。 |
| `ERROR: db_path is empty`                                    | `server_config.yaml` 或 `db_config.db_path` 里存在空的字段。 |
| `ERROR: invalid db_backend_url: xxx`                         | `server_config.yaml` 或 `db_config.db_backend_url` 里URL设置无效。URL 的格式为**sqlite://:@:/**  或 **mysql://root:123456@127.0.0.1:3306/milvus**。 |

## 相关阅读
[了解 Milvus 操作](milvus_operation.md)
