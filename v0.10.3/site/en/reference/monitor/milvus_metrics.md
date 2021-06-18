---
id: milvus_metrics.md
---


# Visualize Metrics in Grafana

Milvus outputs detailed time-series metrics during runtime. You can use [Prometheus](https://prometheus.io/), [Grafana](https://grafana.com/), or any visualization tool that you think appropriate to display and render the following metrics:

- Milvus Performance Metrics
- System Performance Metrics: Metrics relating to CPU/GPU usage, network traffic, and disk read speed.
- Hardware Storage Metrics: Metrics relating to data size, data files, and storage capacity.

## Milvus performance metrics

| Metric                    | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| **Insert per Second**     | Number of vectors that are inserted in a second. (Real-time display) |
| **Queries per Minute**    | Number of queries that are run in a minute. (Real-time display) |
| **Query Time per Vector** | Average time to query one vector. Divide the query elapsed time by the number of queried vectors. |
| **Query Service Level**   | Query service level = n_queries_completed_within_threshold1 / n_queries <br/>Generally, it is recommended to set 3 time periods - threshold1, threshold2, and threshold3, to track the query service level. |
| **Uptime**                | How long Milvus has been running. (Minutes)                  |

## System performance metrics

| Metric                | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| **GPU Utilization**   | GPU utilization ratio (%).                                   |
| **GPU Memory Usage**  | GPU memory (GB) currently consumed by Milvus.                |
| **CPU Utilization**   | CPU utilization ratio (%). Divide the time that the server is busy by the total elapsed time. |
| **Memory Usage**      | Memory (GB) currently consumed by Milvus.                    |
| **Cache Utilization** | Cache utilization ratio (%).                                 |
| **Network IO**        | Network IO read/write speed (GB/s).                          |
| **Disk Read Speed**   | Disk read speed (GB/s).                                      |
| **Disk Write Speed**  | Disk write speed (GB/s).                                     |

## Hardware storage metrics

| Metric         | Description                                      |
| -------------- | ------------------------------------------------ |
| **Data Size**  | Total amount (GB) of data stored in Milvus.      |
| **Total File** | Number of data files currently stored in Milvus. |

