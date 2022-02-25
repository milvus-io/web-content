---
id: monitor_overview.md
title: Overview
related_key: monitor, alert
summary: Learn how Prometheus and Grafana are used in Milvus for montoring and alerting services.
---

# Milvus monitoring framework overview

This topic explains how Milvus uses Prometheus to monitor metrics and Grafana to visualize metrics and create alerts.

## Prometheus in Milvus
[Prometheus](https://prometheus.io/docs/introduction/overview/) is an open-source monitoring and alerting toolkit for Kubernetes implementations. It collects and stores metrics as time-series data. This means that metrics are stored with timestamps when recorded, alongside with optional key-value pairs called labels. 
Currently Milvus uses the following components of Prometheus:
- Prometheus endpoint to  pull data from endpoints set by exporters.
- Prometheus operator to effectively manage Prometheus monitoring instances.
- Kube-prometheus to provide easy to operate end-to-end Kubernetes cluster monitoring.

## Grafana in Milvus
[Grafana](https://grafana.com/docs/grafana/latest/introduction/) is a visualizing stack. It features a dashboard that can help you visualize all the data and metrics you need. With the Grafana dashboard, you can query, understand, and analyze your data.



## What's next
After learning about the basic workflow of monitoring and alerting, learn:
- [Deploy monitoring services](monitor.md)
- [Visualize Milvus metrics](visualize.md)
- [Create an alert](alert.md)
