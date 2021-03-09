---
id: setup_grafana.md
---


# Visualize Metrics in Grafana

## Configure and start Grafana

1. Start Grafana:

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

5. Download the starter [Grafana dashboard](https://github.com/milvus-io/docs/blob/master/v1.0.0/assets/monitoring/dashboard.json) for Milvus:


6. [Add the dashboard to Grafana](http://docs.grafana.org/reference/export_import/#importing-a-dashboard).

   ![prometheus.png](../../../../assets/prometheus.png)


## Display and Render Milvus Metrics

You can use [Grafana dashboard](https://github.com/milvus-io/docs/blob/master/v1.0.0/assets/monitoring/dashboard.json) to determine how to display and render Milvus metrics. See [Milvus Metrics](milvus_metrics.md) for more information. 
