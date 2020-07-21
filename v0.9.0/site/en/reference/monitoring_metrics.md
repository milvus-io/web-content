---

id: monitoring_metrics.md
title: Monitoring Metrics
sidebar_label: Monitoring Metrics

---

# Monitoring Metrics

## Metrics Overview

The Milvus dashboard provides details about your application and database configuration. It helps you optimize Milvus performance by monitoring the following areas: 

| Area             | Description                                                |
| ---------------- | ---------------------------------------------------------- |
| Performance Metrics | Important metrics about Milvus performance.                |
| Hardware Metrics | Metrics about CPU/GPU usage, network traffic.              |
| Storage Metrics  | Metrics about data size, storage capacity and total files. |

## Performance Metrics

| Metric                    | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| **Insert per Second**     | Number of vectors that are inserted in a second. (Real-time display) |
| **Queries per Minute**    | Number of queries that are run in a minute. (Real-time display) |
| **Query Time per Vector** | Average time to query one vector. Divide the query elapsed time by the number of queried vectors. |
| **Query Service Level**   | A system wide metric. Query service level (%) = n_queries_completed_within_threshold1 / n_queries <br/>Generally, it is recommended to set 3 time periods - threshold1, threshold2 and threshold3, to track the query service level. |
| **Uptime**                | How long Milvus has been running. (Minutes)                  |

## Hardware Metrics

| Metric                | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| **GPU Utilization**   | GPU utilization ratio (%).                                   |
| **GPU Memory Usage**  | GPU memory (GB) currently consumed by Milvus.                |
| **CPU Utilization**   | Divide the time that the server is busy by the total elapsed time. |
| **Memory Usage**      | Memory (GB) currently consumed by Milvus.                    |
| **Cache Utilization** | Cache utilization ratio (%).                                 |
| **Network IO**        | Network IO read/write speed (per second).                    |
| **Disk Read Speed**   | Disk read speed (GB/s).                                      |
| **Disk Write Speed**  | Disk write speed (GB/s).                                     |

## Storage Metrics

| Metric         | Description                                      |
| -------------- | ------------------------------------------------ |
| **Data Size**  | Total amount of data stored in Milvus.           |
| **Total File** | Number of data files currently stored in Milvus. |

## Related links
[Monitoring and Alerting](../guides/monitor.md)

