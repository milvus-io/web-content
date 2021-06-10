---
id: setup_prometheus.md
---


# 配置、启动 Prometheus

本页面介绍如何配置、启用 [Prometheus](https://prometheus.io/) 搜集 Milvus 监控指标，以及如何将 [Alertmanager](https://prometheus.io/docs/alerting/alertmanager/) 连接到 Prometheus 实现数据可视化的展示和报警机制。


## 安装 Prometheus

1. 下载 [Prometheus 二进制文件的压缩包](https://prometheus.io/download/)。

2. 确保 Prometheus 已经成功安装：

   ```shell
   $ prometheus --version
   ```

   <div class="alert note">
   你可以将 Prometheus 的路径添加到 <code>PATH</code>，以便在任意 Shell 上都能快速启动 Prometheus。
   </div>

## 配置、启动 Prometheus

1. 启动 Pushgateway：

    ```shell
    ./pushgateway
    ```

    <div class="alert warning">
    必须在启动 Milvus Server 之前启动 Pushgateway 进程。
    </div>
    
2. 在 **server_config.yaml** 中开启 Prometheus 监控，并设置 Pushgateway 的地址和端口号。

    ```yaml
    metric:
      enable: true                 # 将值设为 true 以开启 Prometheus 监控。
      address: <your_IP_address>   # 设置 Pushgateway 的 IP 地址。
      port: 9091                   # 设置 Pushgateway 的端口号。
    ```

    <div class="alert note">
    如果是在 Kubernetes 集群中，你需要为每个需要监控的 Milvus 节点配置 <b>server_config.yaml</b>。
    </div>

3. 下载 Milvus [Prometheus 配置文件](https://github.com/milvus-io/docs/blob/master/v1.0.0/assets/monitoring/prometheus.yml)：

   ```shell
   $ wget https://raw.githubusercontent.com/milvus-io/docs/master/v1.0.0/assets/monitoring/prometheus.yml \ -O prometheus.yml
   ```

4. 下载 Milvus [报警规则文件](https://github.com/milvus-io/docs/blob/master/v1.0.0/assets/monitoring/alert_rules.yml) 到  Prometheus 根目录：

   ```shell
   wget -P rules https://raw.githubusercontent.com/milvus-io/docs/master/v1.0.0/assets/monitoring/alert_rules.yml
   ```

5. 根据实际需求编辑 Prometheus 配置文件：

   - `global`：配置 `scrape_interval` 和 `evaluation_interval` 等参数。

   ```yaml
   global:
     scrape_interval:     2s # 设置抓取时间间隔为 2s。
     evaluation_interval: 2s # 设置评估时间间隔为 2s。
   ```

   - `alerting`：设置 Alertmanager 的地址和端口。

   ```yaml
   alerting:
   alertmanagers:
   - static_configs:
      - targets: ['localhost:9093']
   ```

   - `rule_files`：设置报警规则文件。

   ```yaml
   rule_files:
      - "alert_rules.yml"
   ```

   - `scrape_configs`：设置抓取数据的 `job_name` 及 `targets` 等信息。

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

*启动 Prometheus 后，你可以在 Prometheus 界面上配置 Milvus 提供的监控指标。详见：[Milvus 监控指标](milvus_metrics.md)。*

## 配置 Alertmanager

### 需要报警的事件

积极的监控帮助及早发现问题，但创建报警规则以便在出现突发事件时触发用户通知也非常有必要。

以下主要介绍需要创建报警规则的事件。

**服务器宕机**

- 报警规则：当 Milvus 服务器宕机时发送报警信息。
- 如何判断：当 Milvus 服务器宕机时，监控仪表盘上各个指标会显示 **No Data**。

**CPU/GPU 温度过高**

- 报警规则：当 CPU/GPU 温度超过 80 摄氏度时发送报警信息。
- 如何判断：查看监控仪表盘上的 **CPU Temperature** 和  **GPU Temperature** 两个指标。

### 配置步骤

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

5. 通过浏览器登录 *http://<提供 Alertmanager 服务的主机>:9093*，进入 Alertmanager 用户交互页面。你可以在此定义 [报警的条件](https://prometheus.io/docs/alerting/alertmanager/#silences)。


## 常见问题

<details>
<summary><font color="#4fc4f9">在多个 Milvus 节点接入 Pushgateway 的情况下如何进行区分数据来源？</font></summary>
在 <strong>prometheus.yaml</strong> 里面加一个 Prometheus 的实例就可以。最后在 Prometheus 或者 Grafana 里面显示监控的时候，会指明数据是来自哪个 Milvus 实例。
</details>
