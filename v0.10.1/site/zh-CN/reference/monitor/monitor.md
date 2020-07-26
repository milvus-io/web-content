---
id: monitor.md
---

# 监控与报警

## 方案概述

在生产环境下，我们需要对数据库系统进行积极全面的性能监控，以及给需要调查干预的突发情况创建报警规则以触发用户通知。

Milvus 使用的监控与报警方案如下：

- 使用 Prometheus 监控和存储性能指标存储：

    - Prometheus Server：收集和存储时序数据。
    - Client 代码库：定制监控指标。
    - Pushgateway：推送指标数据，确保生命周期短且难以被及时提取的监控指标能够被 Prometheus 获取。
    - Alertmanager：实现报警机制。

- 使用开源的时序数据分析及可视化平台 Grafana 展示各项性能指标。

## 工作流程

Milvus 会收集监控数据并将其推送到 Pushgateway。同时，Prometheus 服务器会定期从 Pushgateway 中拉取数据并将其保存到它的时序数据库。具体工作流程如下：

![proxy](https://milvus.io/static/3d68d75d595d1af1c1f3acd780cb7044/8c557/monitoring.png)



