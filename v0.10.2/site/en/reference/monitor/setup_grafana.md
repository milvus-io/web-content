---
id: setup_grafana.md
---


# Visualize Metrics in Grafana

## Configure and start Grafana

1. Start Grafana for your OS:

   ```shell
   $ docker run -i -p 3000:3000 grafana/grafana
   ```

2. Use your browser to open http://&lt;hostname&nbsp;of&nbsp;machine&nbsp;running&nbsp;grafana&gt;:3000 and log into the Grafana UI.

<div class="alert note">
Grafana's default username and password are both <code>admin</code>. You can create a Grafana account of your own.
</div>

3. [Add Prometheus as a data source](https://grafana.com/docs/grafana/latest/features/datasources/add-a-data-source/).
   
4. In Grafana UI, click **Configuration > Data Sources > Prometheus**, and configure the data source as follows:

   | Field   | Definition                                             |
   | :------ | :----------------------------------------------------- |
   | Name    | Prometheus                                             |
   | Default | `True`                                                   |
   | URL     | http://&lt;hostname&nbsp;of&nbsp;machine&nbsp;running&nbsp;prometheus&gt;:9090 |
   | Access  | Browser                                                |

5. Download the starter [Grafana dashboard](../../../../assets/monitoring/dashboard.json) for Milvus:


6. [Add the dashboard to Grafana](http://docs.grafana.org/reference/export_import/#importing-a-dashboard).

   ![prometheus.png](../../../../assets/prometheus.png)


## Metrics overview

You can use the [Grafana dashboard](../../../../assets/monitoring/dashboard.json) for Milvus to configure the following metrics areas displayed on the dashboard:


| Area             | Description                                                |
| ---------------- | ---------------------------------------------------------- |
| Milvus Performance Metrics | Important metrics about Milvus performance.                |
| System Performance Metrics | Metrics about CPU/GPU usage, network traffic, and disk read speed.          |
| Hardware Storage Metrics  | Metrics about data size, data files, and storage capacity. |

### Milvus performance metrics

| Metric                    | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| **Insert per Second**     | Number of vectors that are inserted in a second. (Real-time display) |
| **Queries per Minute**    | Number of queries that are run in a minute. (Real-time display) |
| **Query Time per Vector** | Average time to query one vector. Divide the query elapsed time by the number of queried vectors. |
| **Query Service Level**   | Query service level = n_queries_completed_within_threshold1 / n_queries <br/>Generally, it is recommended to set 3 time periods - threshold1, threshold2, and threshold3, to track the query service level. |
| **Uptime**                | How long Milvus has been running. (Minutes)                  |

### System performance metrics

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

### Hardware storage metrics

| Metric         | Description                                      |
| -------------- | ------------------------------------------------ |
| **Data Size**  | Total amount (GB) of data stored in Milvus.      |
| **Total File** | Number of data files currently stored in Milvus. |

