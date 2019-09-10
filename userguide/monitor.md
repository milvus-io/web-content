---
id: monitor
title: Monitoring and Alerting
sidebar_label: Monitoring and Alerting
---

# Monitoring and Alerting

## Overview

Despite Milvus's high availability, it is critical to actively monitor the overall performance of a system running in production, and to create alerting rules that promptly send notifications when there are events that require investigation or intervention. 

This page explains available monitoring solution and critical events and metrics to alert on.

### Monitoring solution

Milvus uses Prometheus, an open-source time series database, to store and monitor its metrics, and it uses Grafana for flexible data visualizations.

- Prometheus

  Prometheus is system monitoring and alerting toolkit with a multi-dimensional data model and a flexible query language. 

  The Prometheus ecosystem consists of multiple components, of which the following are used in Milvus:

  - Prometheus Server which scrapes and stores time series data.
  - Client libraries for instrumenting application metrics.
  - Alertmanager for alert handling.

Below graph shows how Prometheus works in Milvus:

![1566787732972](C:\Users\jieli\AppData\Roaming\Typora\typora-user-images\1566787732972.png)

- Grafana

  Grafana is an open-source platform for time series analytics. It is used in Milvus to visualize various performance metrics:

  ![prometheus.png](https://github.com/jielinxu/docs/blob/branch-0.3.1/assets/prometheus.png?raw=true)

### Events to alert on

Active monitoring helps you identify problems early, but it is also essential to create alerting rules that promptly send notifications when there are events that require investigation or intervention. 

This section includes the most important events to create alerting rules for.

**Server is down**

- Rule: Send an alert when the Milvus server is down. 
- How to detect: If the Milvus server is down, there will be **No Data** displayed on the monitoring dashboard.

**CPU/GPU temperature is too high**

- Rule: Send an alert when the CPU/GPU temperature exceeds 80 degrees Celsius.
- How to detect: Check the metrics `CPU Temperature` and  `GPU Temperature` on the monitoring dashboard.

## Use Prometheus and Alertmanager

Milvus generates detailed time series metrics. This page shows you how to pull these metrics into [Prometheus](https://prometheus.io/), and how to connect [Grafana](https://grafana.com/) and [Alertmanager](https://prometheus.io/docs/alerting/alertmanager/) to Prometheus for flexible data visualizations and notifications.

### Before you begin

- Make sure you have already started a Milvus server.

- Make sure you have enabled the monitoring function in your [deployment](monitoring in Single Server Deployment). 

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

1. Go to the Prometheus root directory, and download starter [Prometheus configuration file] for Milvus.

   ```shell
   $ wget https://raw.githubusercontent.com/milvus-io/docs/branch-0.4.0/monitoring/prometheus.yml \ -O prometheus.yml
   ```

   When you examine the configuration file, you'll see that it is set up to scrape the metrics of a single-server Milvus every 15 seconds:

   - `scrape_interval: 15s` defines the scrape interval.
   - `metrics_path: '/metrics'` defines the Milvus endpoint for scraping time series metrics.
   - `targets: ['localhost:9090']` specifies the hostname and port of the single-server Milvus to collect metrics on.

2. Configure the file to suit your deployment scenario:

   | Scenario            | Config Change                                                |
   | ------------------- | ------------------------------------------------------------ |
   | Distributed cluster | Expand the `targets` field to include `localhost: <http-port>` for each additional node in the cluster. |

3. Download starter [alerting rules] for Milvus to the Prometheus root directory.

   ```shell
   cd prometheus
   ```

   ```shell
   wget -P rules https://raw.githubusercontent.com/milvus-io/docs/branch-0.4.0/monitoring/alerts.rules.yml
   ```

### Start Prometheus

1. Start the Prometheus server, with the `--config.file` flag pointing to the configuration file:

   ``` shell
   $ ./prometheus --config.file=prometheus.yml
   ```

2. Point your browser to `http://<hostname of machine running prometheus>:9090`, where you can use the Prometheus UI to query, aggregate, and graph Milvus time series metrics.

### Visualize metrics in Grafana

1. [Install and start Grafana for your OS](https://grafana.com/grafana/download).

2. Point your browser to `http://<hostname of machine running grafana>:3000` and log into the Grafana UI with the default username/password, `admin/admin`, or create your own account.

3. [Add Prometheus as a datasource](http://docs.grafana.org/datasources/prometheus/).

   ![image-20190620191640605](https://www.milvus.io/docs/assets/datasource.png)
   
4. Configure the datasource as follows:

   | Field   | Definition                                             |
   | :------ | :----------------------------------------------------- |
   | Name    | Prometheus                                             |
   | Default | True                                                   |
   | URL     | `http://<hostname of machine running prometheus>:9090` |
   | Access  | Browser                                                |

5. Download the starter [Grafana dashboard] for Milvus:

   ```
   $ wget https://raw.githubusercontent.com/milvus-io/docs/branch-0.4.0/monitoring/dashboard.json
   ```

6. [Add the dashboard to Grafana](http://docs.grafana.org/reference/export_import/#importing-a-dashboard). 

   ![image-20190620191802408](https://www.milvus.io/docs/assets/importjson.png)

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

[Monitoring Metrics]

