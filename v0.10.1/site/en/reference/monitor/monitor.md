---
id: monitor.md
---

# Monitoring and Alerting

## Overview

It is critical to actively monitor the overall performance of a system running in production, and to create alerting rules that promptly send notifications when there are events that require investigation or intervention.

Milvus uses the following monitoring and alerting solutions:

- Prometheus to store and monitor its metrics:
  - Prometheus server which scrapes and stores time series data.
  - Client libraries for instrumenting monitoring metrics.
  - Pushgateway to push metric data and ensure short-lived monitoring metrics, which may not be scraped in time, to be exposed to Prometheus.
  - Alertmanager for alert handling.

- Grafana, an open source platform for time-series analytics, to visualize various performance metrics.

## Workflow

Milvus collects monitoring data and pushes it to Pushgateway. At the same time, the Prometheus server periodically pulls data from Pushgateway and saves it to its time-series database. The following graph shows how Prometheus works in Milvus:

![proxy](https://milvus.io/static/3d68d75d595d1af1c1f3acd780cb7044/8c557/monitoring.png)


