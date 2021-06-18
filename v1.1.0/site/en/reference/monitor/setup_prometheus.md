---
id: setup_prometheus.md
---

# Configure and Start Prometheus

This page describes how to configure and start up [Prometheus](https://prometheus.io/), and how to connect [Alertmanager](https://prometheus.io/docs/alerting/alertmanager/) to Prometheus for metrics visualization and early warning purposes.


## Install Prometheus

1. Download the [Prometheus tarball](https://prometheus.io/download/) for your operating system.

2. Go to the directory holding the Prometheus file, and ensure that Prometheus is properly installed:

   ```shell
   $ ./prometheus --version
   ```

   <div class="alert note">
   You can add the path to Prometheus to <code>PATH</code>. This makes it easy to start Prometheus from any shell.
   </div>

## Configure and start Prometheus

1. Start Pushgateway:

    ```shell
    ./pushgateway
    ```

    <div class="alert warning">
    You <i>must</i> start Pushgateway before starting the Milvus Server.
    </div>
    
2. Start the Prometheus monitor in **server_config.yaml** and set the address and port number of Pushgateway:

    ```yaml
    metric:
      enable: true                 # Set the value to true to enable the Prometheus monitor.
      address: <your_IP_address>   # Set the IP address of Pushgateway.
      port: 9091                   # Set the port number of Pushgateway.
    ```

    <div class="alert note">
    In the Kubernetes cluster, you need to set the <b>server_config.yaml</b> for each node to monitor.
    </div>

3. Go to the Prometheus root directory, and download starter [Prometheus configuration file](https://github.com/milvus-io/docs/blob/master/v1.1.0/assets/monitoring/prometheus.yml) for Milvus:

   ```shell
   $ wget https://raw.githubusercontent.com/milvus-io/docs/master/v1.1.0/assets/monitoring/prometheus.yml \ -O prometheus.yml
   ```

4. Download starter [alerting rules](https://github.com/milvus-io/docs/blob/master/v1.1.0/assets/monitoring/alert_rules.yml) for Milvus to the Prometheus root directory:

   ```shell
   wget -P rules https://raw.githubusercontent.com/milvus-io/docs/master/v1.1.0/assets/monitoring/alert_rules.yml
   ```

5. Edit the Prometheus configuration file according to your needs:

   - `global`: Configures parameters such as `scrape_interval` and `evaluation_interval`.

   ```yaml
   global:
     scrape_interval:     2s # Set the crawl time interval to 2s.
     evaluation_interval: 2s # Set the evaluation interval to 2s.
   ```

   - `alerting`: Sets the address and port of Alertmanager.

   ```yaml
   alerting:
   alertmanagers:
   - static_configs:
      - targets: ['localhost:9093']
   ```

   - `rule_files`: Specifies the file that defines the alerting rules.

   ```yaml
   rule_files:
      - "alert_rules.yml"
   ```

   - `scrape_configs`: Sets `job_name` and `targets` for scraping data.

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
    See <a href="https://prometheus.io/docs/prometheus/latest/configuration/configuration/">Prometheus Configuration</a> for more information about the configuration file of Prometheus.
   </div>
   
6. Start Prometheus:

    ```shell
    ./prometheus --config.file=prometheus.yml
    ```

*After starting up Prometheus, you can display and render on its interface the metrics that Milvus provides. See [Milvus Metrics](milvus_metrics.md) for more information.*

## Configure Alertmanager


### Events to create alert rules

Proactively monitoring metrics contributes to identification of emerging issues. Creating alerting rules for events requiring immediate intervention is essential as well.

This section includes the most important events for which you must create alerting rules.

**Server is down**

- Rule: Send an alert when the Milvus server is down.
- How to detect: If the Milvus server is down, **No Data** is displayed for various metrics on the monitoring dashboard.

**CPU/GPU temperature is too high**

- Rule: Send an alert when the CPU/GPU temperature exceeds 80 degrees Celsius.
- How to detect: Check the metrics `CPU Temperature` and  `GPU Temperature` on the monitoring dashboard.


### Configuration steps

1. Download the [latest Alertmanager tarball](https://prometheus.io/download/#alertmanager) for your operating system.

2. Ensure that Alertmanager is properly installed:

   ```shell
   $ alertmanager --version
   ```

   <div class="alert note">
   You can add the path to Alertmanager to <code>PATH</code>. This makes it easy to start Alertmanager from any shell.
   </div>

3. Create the [Alertmanager configuration file](https://prometheus.io/docs/alerting/configuration/) to specify the desired receivers for notifications, and add it to Alertmanager root directory.

4. Start the Alertmanager server, with the `--config.file` flag pointing to the configuration file:

   ```shell
   alertmanager --config.file=alertmanager.yml
   ```

5. Use your browser to open http://&lt;hostname&nbsp;of&nbsp;machine&nbsp;running&nbsp;alertmanager&gt;:9093, and use the Alertmanager UI to define rules for [muting alerts](https://prometheus.io/docs/alerting/alertmanager/#silences).


## FAQ


<details>
<summary><font color="#4fc4f9">How can I differentiate if I have multiple Milvus nodes connected to Pushgateway?</font></summary>
You can add a Prometheus instance in <strong>prometheus.yaml</strong>. Then Prometheus or Granafa will show the monitoring data, as well as the source node.
</details>
