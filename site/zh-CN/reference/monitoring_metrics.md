---
id: monitoring_metrics.md
title: Monitoring Metrics
sidebar_label: Monitoring Metrics
---

# 监控指标

## 指标概述

Milvus 面板提供系统和数据库设置的具体信息。通过监控以下方面帮助优化系统行性能：

| 指标类型 | 说明                                     |
| -------- | ---------------------------------------- |
| 性能指标 | 关于 Milvus 性能状况的指标。             |
| 硬件指标 | CPU/GPU 使用状况，网络、磁盘读取等指标。 |
| 存储指标 | 数据大小，数据文件及存储情况等指标。     |

## 性能指标

| 指标                      | 说明                                                         |
| ------------------------- | ------------------------------------------------------------ |
| **Insert per Second**     | 每秒钟插入的向量数量（实时显示）。                           |
| **Queries per Minute**    | 每分钟运行的查询数量（实时显示）。                           |
| **Query Time per Vector** | 单条向量查询时间 = 查询使用时间 / 向量数量                   |
| **Query Service Level**   | 查询服务级别 = 一定时间阈值内的查询数量/总查询数量 <br/>一般建议设置3个时间阈值来跟踪查询服务基本。 |
| **Uptime**                | Milvus服务器正常运行的时长（分钟）。                         |

## 硬件指标

| 指标                  | 说明                                                   |
| --------------------- | ------------------------------------------------------ |
| **GPU Utilization**   | GPU 利用率（%）。                                      |
| **GPU Memory Usage**  | Milvus 当前使用的显存量 （GB）。                       |
| **CPU Utilization**   | CPU 利用率（%）= 服务器任务执行时间 / 服务器总运行时间 |
| **Memory Usage**      | Milvus 当前使用的内存量（GB）。                        |
| **Cache Utilization** | 缓存利用率（%）。                                      |
| **Network IO**        | 网口的读写速度（GB/s）。                               |
| **Disk Read Speed**   | 磁盘读取速度（GB/s）。                                 |
| **Disk Write Speed**  | 磁盘写入速度（GB/s）。                                 |

## 存储指标

| 指标           | 说明                       |
| -------------- | -------------------------- |
| **Data Size**  | Milvus所存数据总量（GB）。 |
| **Total File** | Milvus所存数据文件总个数。 |

## 相关阅读
[监控与报警](../guides/monitor.md)

