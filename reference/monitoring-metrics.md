---

id: monitoring-metrics
title: Monitoring Metrics
sidebar_label: Monitoring Metrics

---

# Monitoring Metrics

## Metrics Overview

The Milvus dashboard provides details about your application and database configuration. It helps you optimize Milvus performance by monitoring the following areas: 

| Area             | Description                                                |
| ---------------- | ---------------------------------------------------------- |
| Overview Metrics | Important metrics about Milvus performance.                |
| Hardware Metrics | Metrics about CPU/GPU usage, network traffic.              |
| Storage Metrics  | Metrics about data size, storage capacity and total files. |

## Overview Metrics

| Metric                        | Description                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| Insert per Second             | Number of vectors that are inserted in a second.             |
| QPM (Query per minute)        | Number of queries completed in every minute.                 |
| Query Elapsed Time per Vector | It is the query elapsed time divided by number of vectors.   |
| Query Service Level           | System wide metric. Query service level (%) = n_queries_completed_within_threshold1 / n_queries (Generally, you can set 3 time periods - threshold1, threshold2 and threshold3, to track the query service level). |
| Uptime                        | The time (in minutes) Milvus server has been working and available. |

## Hardware Metrics

| Metric            | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| GPU Utilization   | GPU utilization ratio (%).                                   |
| GPU Memory Usage  | GPU memory (in GB) currently consumed by Milvus.             |
| CPU Utilization   | Divide the time that the server is busy by the total elapsed time. |
| Memory Usage      | Memory (in GB) currently consumed by Milvus.                 |
| Cache Utilization | Cache utilization ratio (%).                                 |
| Network IO        | Network IO read/write speed (per second).                    |
| Disk Read Speed   | Disk read speed (GB/s)                                       |
| Disk Write Speed  | Disk write speed (GB/s)                                      |
| Connections       | Number of connections established with the database during the selected time period. (A connection is a session established between a database client and a server.) |

## Storage Metrics

| Metric     | Description                            |
| ---------- | -------------------------------------- |
| Data Size  | Total amount of data stored in Milvus. |
| Total File | Current number of files in Milvus.     |

