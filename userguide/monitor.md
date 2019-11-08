---
id: monitor
title: Monitoring and Alerting
sidebar_label: Monitoring and Alerting
---

# Monitoring and Alerting

## Overview

Although Milvus is highly available, it is critical to actively monitor the overall performance of a system running in production, and to create alerting rules that promptly send notifications when there are events that require investigation or intervention.

### Monitoring solution

Milvus uses Prometheus, an open source time series database, to store and monitor its metrics, and it uses Grafana for flexible data visualizations.

- Prometheus

  Prometheus is a system monitoring and alerting toolkit with a multi-dimensional data model and a flexible query language.

  The Prometheus ecosystem consists of multiple components, of which the following are used in Milvus:

  - Prometheus server which scrapes and stores time series data.
  - Client libraries for instrumenting application metrics.
  - Alertmanager for alert handling.

The following graph shows how Prometheus works in Milvus:

![prometheus](https://raw.githubusercontent.com/milvus-io/docs/master/assets/monitoring/monitoring.png)

- Grafana

  Grafana is an open source platform for time-series analytics and used in Milvus to visualize various performance metrics:

  ![dashboard](https://raw.githubusercontent.com/milvus-io/docs/master/assets/prometheus.png)

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

   ```shell
   prometheus, version 2.11.1 (branch: HEAD, revision: e5b22494857deca4b806f74f6e3a6ee30c251763)
     build user:       root@d94406f2bb6f
     build date:       20190710-13:51:17
     go version:       go1.12.7
   ```

> Tip: You can extract the Prometheus binary and add it to your `PATH`. This makes it easy to start Prometheus from any Shell.

### Configure Prometheus

1. Go to the Prometheus root directory, and download starter [Prometheus configuration file](../assets/monitoring/prometheus.yml) for Milvus.

   ```shell
   $ wget https://raw.githubusercontent.com/milvus-io/docs/master/assets/monitoring/prometheus.yml \ -O prometheus.yml
   ```

   When you examine the configuration file, you'll see that it is set up to scrape the metrics of a single-server Milvus every 15 seconds:

   - `scrape_interval: 15s` defines the scrape interval.
   - `metrics_path: '/metrics'` defines the Milvus endpoint for scraping time series metrics.
   - `targets: ['localhost:9090']` specifies the hostname and port of the single-server Milvus to collect metrics on.

2. Configure the file to suit your deployment scenario:

   | Scenario            | Config Change                                                |
   | ------------------- | ------------------------------------------------------------ |
   | Distributed cluster | Expand the `targets` field to include `localhost: <http-port>` for each additional node in the cluster. |

3. Download starter [alerting rules](../assets/monitoring/alert.rules.yml) for Milvus to the Prometheus root directory.

   ```shell
   wget -P rules https://raw.githubusercontent.com/milvus-io/docs/master/assets/monitoring/alert.rules.yml
   ```

### Start Prometheus

1. Start the Prometheus server, with the `--config.file` flag pointing to the configuration file:

   ```shell
   $ ./prometheus --config.file=prometheus.yml
   ```

2. Point your browser to `http://<hostname of machine running prometheus>:9090`, where you can use the Prometheus UI to query, aggregate, and graph Milvus time series metrics.

### Visualize metrics in Grafana

1. Use the following command to install and start Grafana for your OS:

   ```shell
   $ docker run -i -p 3000:3000 grafana/grafana
   ```

2. Point your browser to `http://<hostname of machine running grafana>:3000` and log into the Grafana UI with the default username/password, `admin/admin`, or create your own account.

3. [Add Prometheus as a data source](http://docs.grafana.org/datasources/prometheus/).
   
4. Configure the data source as follows:

   | Field   | Definition                                             |
   | :------ | :----------------------------------------------------- |
   | Name    | Prometheus                                             |
   | Default | True                                                   |
   | URL     | `http://<hostname of machine running prometheus>:9090` |
   | Access  | Browser                                                |

5. Download the starter [Grafana dashboard](../assets/monitoring/dashboard.json) for Milvus:

   ```shell
   $ wget https://raw.githubusercontent.com/milvus-io/docs/master/assets/monitoring/dashboard.json
   ```

6. [Add the dashboard to Grafana](http://docs.grafana.org/reference/export_import/#importing-a-dashboard).

### Send notifications with Alertmanager

In Configure Prometheus, you have already downloaded the starter alerting rules for Milvus. Now, download, configure and start Alertmanager.

1. Download the [latest Alertmanager tarball](https://prometheus.io/download/#alertmanager) for your OS.

2. Make sure Alertmanager is installed successfully:

   ```shell
   $ alertmanager --version
   ```

   ```shell
   alertmanager, version 0.18.0 (branch: HEAD, revision: 1ace0f76b7101cccc149d7298022df36039858ca)
     build user:       root@868685ed3ed0
     build date:       20190708-14:31:49
     go version:       go1.12.6
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
