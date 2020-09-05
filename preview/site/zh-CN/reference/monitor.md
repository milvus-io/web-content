---
id: monitor.md
---

# 监控与报警

## 概述

尽管 Milvus 可用性高，我们仍然需要对生产系统进行积极全面的性能监控，以及给需要调查干预的突发情况创建报警规则以触发用户通知。

### 监控系统

Milvus 使用 Prometheus 作为监控和性能指标存储方案，使用 Grafana 作为可视化组建进行数据展示。

#### Prometheus

Prometheus 是一个拥有多维度数据模型和灵活查询语句的监控报警系统。目前，Milvus 使用了以下 Prometheus 组件：

- Prometheus Server：收集和存储时序数据。
- Client 代码库：定制监控指标。
- Alertmanager：实现报警机制。
- Pushgateway：推送指标数据，确保生命周期短且难以被及时提取的监控指标能够被 Prometheus 获取。

Milvus 会收集监控数据并将其推送到 Pushgateway。同时，Prometheus 服务器会定期从 Pushgateway 中拉取数据并将其保存到它的时序数据库。具体工作流程如下：

![proxy](https://milvus.io/static/3d68d75d595d1af1c1f3acd780cb7044/8c557/monitoring.png)

#### Grafana

Grafana 是一个开源的时序数据分析及可视化平台。Milvus 使用 Grafana 来展示各项性能指标：

![prometheus.png](../../../assets/prometheus.png)

### 需要报警的事件

积极的监控帮助及早发现问题，但创建报警规则以便在出现突发事件时触发用户通知也非常有必要。

以下主要介绍需要创建报警规则的事件。

**服务器宕机**

- 报警规则：当 Milvus 服务器宕机时发送报警信息。
- 如何判断：当 Milvus 服务器宕机时，监控仪表盘上各个指标会显示 **No Data**。

**CPU/GPU 温度过高**

- 报警规则：当 CPU/GPU 温度超过 80 摄氏度时发送报警信息。
- 如何判断：查看监控仪表盘上的 `CPU Temperature` 和  `GPU Temperature` 两个指标。

## 使用 Prometheus 和 Alertmanager

Milvus 会生成详细的关于系统运行状态的时序 metrics。该页面向你展示如何利用 [Prometheus](https://prometheus.io/) 提取收集这些 metrics，如何将 [Grafana](https://grafana.com/) 和 [Alertmanager](https://prometheus.io/docs/alerting/alertmanager/) 连接到 Prometheus 实现数据可视化的展示和报警机制。

### 前提条件

- 请确保你已经启动了 Milvus 服务。
- 请确保你已经启用了 Milvus 的监控功能。

### 安装 Prometheus

1. 下载 [Prometheus 二进制文件的压缩包](https://prometheus.io/download/) 。

2. 确保 Prometheus 已经成功安装：

   ```shell
   $ prometheus --version
   ```

   <div class="alert note">
   你可以将 Prometheus 的路径添加到 <code>PATH</code>，以便在任意 Shell 上都能快速启动 Prometheus。
   </div>

### 配置和启动 Prometheus

1. 启动 Pushgateway：

    ```shell
    ./pushgateway
    ```

    <div class="alert note">
    必须在启动 Milvus Server 之前启动 Pushgateway 进程。
    </div>
    
2. 在 **server_config.yaml** 中开启 Prometheus 监控，并设置 Pushgateway 的地址和端口号。

    ```yaml
    metric:
      enable: true       # 将值设为 true 以开启 Prometheus 监控。
      address: 127.0.0.1 # 设置 Pushgateway 的 IP 地址。
      port: 9091         # 设置 Pushgateway 的端口号。
    ```

3. 下载 Milvus [Prometheus 配置文件](https://github.com/milvus-io/docs/blob/v0.10.0/assets/monitoring/prometheus.yml)：

   ```shell
   $ wget https://raw.githubusercontent.com/milvus-io/docs/v0.10.0/assets/monitoring/prometheus.yml \ -O prometheus.yml
   ```

4. 下载 Milvus [报警规则文件](https://github.com/milvus-io/docs/blob/v0.10.0/assets/monitoring/alert_rules.yml) 到  Prometheus 根目录：

   ```shell
   wget -P rules https://raw.githubusercontent.com/milvus-io/docs/v0.10.0/assets/monitoring/alert_rules.yml
   ```

5. 根据你的需求编辑 Prometheus 配置文件：

   - global：配置 `scrape_interval` 和 `evaluation_interval` 等参数。

   ```yaml
   global:
     scrape_interval:     2s # 设置抓取时间间隔为2s。
     evaluation_interval: 2s # 设置评估时间间隔为2s。
   ```

   - alerting：设置 Alertmanager 的地址和端口。

   ```yaml
   alerting:
   alertmanagers:
   - static_configs:
      - targets: ['localhost:9093']
   ```

   - rule_files：设置报警规则文件。

   ```yaml
   rule_files:
      - "alert_rules.yml"
   ```

   - scrape_configs：设置抓取数据的 `job_name` 以及 `targets` 等信息。

   ```yaml
   scrape_configs:
   - job_name: 'prometheus'
      static_configs:
      - targets: ['localhost:9090']

   - job_name: 'pushgateway'
      honor_labels: true
      static_configs:
      - targets: ['localhost:9091']
   ```

   <div class="alert note">
    关于 Prometheus 的高级配置和功能的详细信息请见 <a href="https://prometheus.io/docs/prometheus/latest/configuration/configuration/">配置 Prometheus</a>。
   </div>
   
6. 启动 Prometheus：

    ```shell
    ./prometheus --config.file=prometheus.yml
    ```

### 在 Kubernetes 中配置 Prometheus

1. 启动 Pushgateway 和 Prometheus。
2. 在 Kubernetes 集群中需要监控的节点的配置文件 **server_config.yaml** 中，设置以下参数：

```yaml
metric:
  enable: true       # 将值设为 true 以开启 Prometheus 监控。
  address: 127.0.0.1 # 设置 Pushgateway 的 IP 地址。
  port: 9091         # 设置 Pushgateway 的端口号。
```

### 使用 Grafana 实现监控指标可视化展示

Grafana 是一个开源的时序数据分析及可视化平台。Milvus 使用 Grafana 来展示各项监控指标。

1. 运行 Grafana：

```shell
docker run -i -p 3000:3000 grafana/grafana
```

2. 在浏览器中打开 `http://<提供 Grafana 服务的主机 IP>:3000` 网址，并登录 Grafana 用户交互页面。

  <div class="alert note">
  Grafana 的默认用户名和密码都是“admin”。你也可以在此创建新的 Grafana 账号。
  </div>

3. [将 Prometheus 添加为数据源](https://grafana.com/docs/grafana/latest/features/datasources/add-a-data-source/)。

4. 在 Grafana 用户交互页面中，点击 **Configuration > Data Sources > Prometheus**，然后设置以下数据源属性：

   | 名称    | 值                                          |
   | :------ | :------------------------------------------ |
   | Name    | Prometheus                                  |
   | Default | True                                        |
   | URL     | http://<提供 Prometheus 服务的主机 IP>:9090 |
   | Access  | Browser                                     |

5. 下载 [Grafana 配置文件](https://github.com/milvus-io/docs/blob/v0.9.1/assets/monitoring/dashboard.json)。

6. [将配置文件导入 Grafana](http://docs.grafana.org/reference/export_import/#importing-a-dashboard)。

### 配置 Alertmanager

1. 下载 [Alertmanager 二进制文件的压缩包](https://prometheus.io/download/#alertmanager)。

2. 确保 Alertmanager 已经成功安装：

   ```shell
   $ alertmanager --version
   ```

   <div class="alert note">
   你可以将 Alertmanager 的路径并添加到 <code>PATH</code>，以便在任意 Shell 上都能快速启动 Alertmanager。
   </div>

3. 根据 [配置 Alertmanager](https://prometheus.io/docs/alerting/configuration/) 创建配置文件 **alertmanager.yml**，指定接受报警通知的邮箱或微信账号，并将配置文件添加到 Alertmanager 根目录下。

4. 启动 Alertmanager 服务并指定配置文件：

    ```shell
    ./alertmanager --config.file=alertmanager.yml
    ```

5. 通过浏览器登录 `http://<提供 Alertmanager 服务的主机>:9093`，进入 Alertmanager 用户交互页面。你可以在此定义[报警的条件](https://prometheus.io/docs/alerting/alertmanager/#silences)。

## 相关阅读

[监控指标](monitoring_metrics.md)
