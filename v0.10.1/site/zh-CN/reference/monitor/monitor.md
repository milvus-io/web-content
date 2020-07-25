---
id: monitor.md
---

# 监控与报警

## 方案概述

在生产环境下，我们需要对数据库系统进行积极全面的性能监控，以及给需要调查干预的突发情况创建报警规则以触发用户通知。

Milvus 使用 Prometheus 作为监控和性能指标存储方案，使用 Grafana 作为可视化组件进行数据展示。

## Prometheus 监控系统

Prometheus 是一个拥有多维度数据模型和灵活查询语句的监控报警系统。

### 工作流程

目前，Milvus 使用了以下 Prometheus 组件：

- Prometheus Server：收集和存储时序数据。
- Client 代码库：定制监控指标。
- Alertmanager：实现报警机制。
- Pushgateway：推送指标数据，确保生命周期短且难以被及时提取的监控指标能够被 Prometheus 获取。

Milvus 会收集监控数据并将其推送到 Pushgateway。同时，Prometheus 服务器会定期从 Pushgateway 中拉取数据并将其保存到它的时序数据库。具体工作流程如下：

![proxy](https://milvus.io/static/3d68d75d595d1af1c1f3acd780cb7044/8c557/monitoring.png)

###

#### Grafana

Grafana 是一个开源的时序数据分析及可视化平台。Milvus 使用 Grafana 来展示各项性能指标。

### 需要报警的事件

积极的监控帮助及早发现问题，但创建报警规则以便在出现突发事件时触发用户通知也非常有必要。

以下主要介绍需要创建报警规则的事件。

**服务器宕机**

- 报警规则：当 Milvus 服务器宕机时发送报警信息。
- 如何判断：当 Milvus 服务器宕机时，监控仪表盘上各个指标会显示 **No Data**。

**CPU/GPU 温度过高**

- 报警规则：当 CPU/GPU 温度超过 80 摄氏度时发送报警信息。
- 如何判断：查看监控仪表盘上的 **CPU Temperature** 和  **GPU Temperature** 两个指标。

