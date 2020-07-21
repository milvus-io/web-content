---
id: monitor.md
title: Monitoring and Alerting
sidebar_label: Monitoring and Alerting
---

# Monitoring and Alerting

## Overview

Although Milvus is highly available, it is critical to actively monitor the overall performance of a system running in production, and to create alerting rules that promptly send notifications when there are events that require investigation or intervention.

### Monitoring solution

Milvus uses Prometheus to store and monitor its metrics, and it uses Grafana for flexible data visualizations.

- Prometheus

  Prometheus is a system monitoring and alerting toolkit with a multi-dimensional data model and a flexible query language.

  The Prometheus ecosystem consists of multiple components, of which the following are used in Milvus:

  - Prometheus server which scrapes and stores time series data.
  - Client libraries for instrumenting application metrics.
  - Alertmanager for alert handling.
  - Pushgateway to allow short-lived, batch metrics, which may not be scraped in time, to be exposed to Prometheus.

The following graph shows how Prometheus works in Milvus:

![prometheus](../../../assets/monitoring/monitoring.png)


- Grafana

  Grafana is an open source platform for time-series analytics and used in Milvus to visualize various performance metrics:

  ![dashboard](../../../assets/prometheus.png)


### Events to create alert rules

Active monitoring helps you identify problems early, but it is also essential to create alerting rules that promptly send notifications when there are events that require investigation or intervention.

This section includes the most important events for which you must create alerting rules.

**Server is down**

- Rule: Send an alert when the Milvus server is down.
- How to detect: If the Milvus server is down, **No Data** will be displayed on the monitoring dashboard.

**CPU/GPU temperature is too high**

- Rule: Send an alert when the CPU/GPU temperature exceeds 80 degrees Celsius.
- How to detect: Check the metrics `CPU Temperature` and  `GPU Temperature` on the monitoring dashboard.

## Use Prometheus and Alertmanager

Milvus generates detailed time series metrics. This page shows you how to pull these metrics into [Prometheus](https://prometheus.io/), and how to connect [Grafana](https://grafana.com/) and [Alertmanager](https://prometheus.io/docs/alerting/alertmanager/) to Prometheus for flexible data visualizations and notifications.

### Before you begin

- Make sure you have already started a Milvus server and enabled the monitoring function.

### Install Prometheus

1. Download the [Prometheus tarball](https://prometheus.io/download/) for your OS.

2. Go to the Prometheus file directory, and make sure Prometheus is installed successfully:

   ```shell
   $ ./prometheus --version
   ```
   > Tip: You can extract the Prometheus binary and add it to your `PATH`. This makes it easy to start Prometheus from any Shell.


### Configure Prometheus

1. Go to the Prometheus root directory, and download starter [Prometheus configuration file](https://github.com/milvus-io/docs/blob/v0.9.1/assets/monitoring/prometheus.yml) for Milvus.

   ```shell
   $ wget https://raw.githubusercontent.com/milvus-io/docs/v0.9.1/assets/monitoring/prometheus.yml \ -O prometheus.yml

   ```

2. Configure the file to suit your requirements. Refer to [https://prometheus.io/docs/prometheus/latest/configuration/configuration/](https://prometheus.io/docs/prometheus/latest/configuration/configuration/) to learn more about the configuration file for Prometheus.

   > Note: If you use distributed cluster, you must expand the `targets` field to include `localhost: <http-port>` for each additional node in the cluster.

3. Download starter [alerting rules](https://github.com/milvus-io/docs/blob/v0.9.1/assets/monitoring/alert_rules.yml) for Milvus to the Prometheus root directory.

   ```shell
   wget -P rules https://raw.githubusercontent.com/milvus-io/docs/v0.9.1/assets/monitoring/alert_rules.yml

   ```

### Start Prometheus

1. Start the Prometheus server, with the `--config.file` flag pointing to the configuration file:

   ```shell
   $ ./prometheus --config.file=prometheus.yml
   ```

2. Point your browser to `http://<hostname of machine running prometheus>:9090`, where you can use the Prometheus UI to query, aggregate, and graph Milvus time series metrics.

### Install and start Pushgateway

Refer to [https://github.com/prometheus/pushgateway](https://github.com/prometheus/pushgateway) to learn how to install and start Pushgateway.

### Visualize metrics in Grafana

1. Use the following command to install and start Grafana for your OS:

   ```shell
   $ docker run -i -p 3000:3000 grafana/grafana
   ```

2. Point your browser to `http://<hostname of machine running grafana>:3000` and log into the Grafana UI with the default username/password, `admin/admin`, or create your own account.

3. [Add Prometheus as a data source](https://grafana.com/docs/grafana/latest/features/datasources/prometheus/).
   
4. Configure the data source as follows:

   | Field   | Definition                                             |
   | :------ | :----------------------------------------------------- |
   | Name    | Prometheus                                             |
   | Default | True                                                   |
   | URL     | `http://<hostname of machine running prometheus>:9090` |
   | Access  | Browser                                                |

5. Download the starter [Grafana dashboard](https://github.com/milvus-io/docs/blob/v0.9.1/assets/monitoring/dashboard.json) for Milvus:

   ```shell
   $ wget https://raw.githubusercontent.com/milvus-io/docs/v0.9.1/assets/monitoring/dashboard.json

   ```

6. [Add the dashboard to Grafana](http://docs.grafana.org/reference/export_import/#importing-a-dashboard).

### Send notifications with Alertmanager

In Configure Prometheus, you have already downloaded the starter alerting rules for Milvus. Now, download, configure and start Alertmanager.

1. Download the [latest Alertmanager tarball](https://prometheus.io/download/#alertmanager) for your OS.

2. Make sure Alertmanager is installed successfully:

   ```shell
   $ alertmanager --version
   ```

   > Tip: You can extract the binary and add it to your `PATH`. This makes it easy to start Alertmanager from any shell.

3. Create the [Alertmanager configuration file](https://prometheus.io/docs/alerting/configuration/) to specify the desired receivers for notifications, and add it to Alertmanager root directory.

4. Start the Alertmanager server, with the `--config.file` flag pointing to the configuration file:

   ```shell
   alertmanager --config.file=simple.yml
   ```

5. Point your browser to `http://<hostname of machine running alertmanager>:9093`, where you can use the Alertmanager UI to define rules for [muting alerts](https://prometheus.io/docs/alerting/alertmanager/#silences).

## Related links

[Monitoring Metrics](../reference/monitoring_metrics.md)
