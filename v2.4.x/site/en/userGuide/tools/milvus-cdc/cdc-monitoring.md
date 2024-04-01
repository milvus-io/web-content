---
id: cdc-monitoring.md
order: 4
summary: Milvus-CDC provides comprehensive monitoring capabilities through Grafana dashboards.
title: Monitoring
---

# Monitoring

Milvus-CDC provides comprehensive monitoring capabilities through Grafana dashboards, allowing you to visualize key metrics and ensure the smooth operation of your Change Data Capture (CDC) tasks and server health.

### Metrics for CDC tasks

To get started, import the [cdc-grafana.json](https://github.com/zilliztech/milvus-cdc/blob/main/server/configs/cdc-grafana.json) file into Grafana. This will add a dashboard specifically designed for monitoring the status of CDC tasks.

__CDC Grafana Dashboard Overview__:

![milvus-cdc-dashboard](../../../../../assets/milvus-cdc-dashboard.png)

__Key Metrics Explained:__

- __Task__: Number of CDC tasks in different states, including __Initial__, __Running__, and __Paused__.

- __Request Total__: Total number of requests received by Milvus-CDC.

- __Request Success__: Number of successful requests received by Milvus-CDC.

- __task num__: Number of tasks in __Initial__, __Paused__, and __Running__ states over time.

- __task state__: State of individual tasks.

- __request count__: Number of successful and total requests

- __request latency__: Latency of requests through p99, average and other statistics.

- __replicate data rate__: Replication data rate for read/write operations

- __replicate tt lag__: Replication time lag for read/write operations.

- __api execute count__: Number of times different Milvus-CDC APIs were executed.

- __center ts__: Timestamp for read/write tasks.

