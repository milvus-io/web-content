---
id: monitoring-and-alert
title: Monitoring and alert
sidebar_label: Monitoring and alert
---

# Monitoring and alert

## Monitoring introduction
A database monitoring system helps you track database performance and corresponds to unexpected emergency issues. With Milvus, you can use the monitoring system based on [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/). Here is how these monitors work for Milvus:

Milvus server collects data -> Collected data are imported to Prometheus -> Monitoring items are displayed in Grafana-supported dashboard

> Note: To enable monitoring and alert function in Milvus, make sure the parameter *is_startup* is *on* in section *metric_config* under the directory *home/$USER/milvus/conf/server_config.yaml*.


## Install and configure the monitor

1. [Install Prometheus](https://prometheus.io/download/#prometheus).

2. Make below configuration in Prometheus.

   1) Under Prometheus root directory, open configuration file *prometheus.yml*, and update section *alerting*, *rule_files* and *scrape_configs* as follows:

      ```yaml
      # my global config
      global:
        scrape_interval:     15s # Set the scrape interval to every 1 seconds. Default is every 1 minute.
        evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
        # scrape_timeout is set to the global default (10s).

      # Alertmanager configuration
      alerting:
        alertmanagers:
        - static_configs:
          - targets: ['localhost:9093']

      # Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
      rule_files:
         - "serverdown.yml" # add alerting rules

      # A scrape configuration containing exactly one endpoint to scrape:
      # Here it's Prometheus itself.
      scrape_configs:
        # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
        - job_name: 'prometheus'

          # metrics_path defaults to '/metrics'
          # scheme defaults to 'http'.

          static_configs:
          - targets: ['localhost:9090']

  	     # scrape metrics of server
        - job_name: 'milvus_server'
          scrape_interval: 1s
          static_configs:
          - targets: ['localhost:8080']

  	     # under development
        - job_name: 'pushgateway'
          static_configs:
          - targets: ['localhost:9091']
      ```

   2) Create file *serverdown.yml* under Prometheus root directory, with these rules:

      ```yaml
      groups:
      - name: milvus
        rules:
          - alert: MilvusServerDown
            expr: up{job="milvus_server"}
            for: 1s
            labels:
              serverity: page
      ```
      > Note: You can set various rules for Milvus alarm. The example in the above code is: when the server is down, an email will be sent instantly to a specified user.

   3) Start Prometheus service.
      ```
      $ ./prometheus --config.file=prometheus.yml
      ```

3. Install Grafana by running this command in a seperate terminal.

      ```
      $ docker run -i -p 3000:3000 grafana/grafana
      ```
4. Make below configuration in Grafana.

   1) Log in to Grafana web portal (localhost:3000), and click the Configuration button on the left menu, then choose *Data Sources*.

   > Note: If you are logging in to Grafana for the first time, please use default username (admin) and password (admin).

   2) On *Data Sources* tab, choose *Prometheus* as the data source type.

      ![image-20190620191640605](assets/datasource.png)

   3) On *Settings* tab, set *Prometheus* as default. In *URL* field, enter the Prometheus server address http://localhost:9090; and in *ACCESS*, choose *Browser*. Then click *Save & Test*.

      ![image-20190620191702697](assets/settings.png)

   4) On the left side bar, click the Create button and choose *Dashboard*. On the top left corner of the page, click *New dashboard*.

      ![image-20190620191721734](assets/newdashboard.png)

   5) Click *Import dashboard* in the right box.

      ![image-20190620191747161](assets/importdashboard.png)

   6) Download [json configuration file](assets/dashboard.json), and import it into the system.

      ![image-20190620191802408](assets/importjson.png)

   When it is done, the monitor dashboard should be displayed.

   ![image-20190620134549612](assets/prometheus.png)


## Monitor metrics
On the GUI dashboard of Milvus monitoring system, you can check these monitoring metrics to track real time performance of Milvus database.


|    Monitoring metric       |      Description                       |
|----------------|----------------------------------|
| **System metrics**    |                                  |
| GPU utilization     |  GPU utilization ratio (%)        |
| GPU temperature      |  Temperature of GPU. If multiple GPUs are in service, the temperature of each GPU is displyed.  |
| GPU memory usage      |   GPU memory (in GB) currently consumed by Milvus                  |
| CPU utilization      |     Divide the time that the server is busy by the total elapsed time                 |
| Memory usage      |     Memory (in GB) currently consumed by Milvus                   |
| CPU temperature    | Temperature of CPU |
| Network IO          |    Network IO read/write speed (per second)          |
| Disk read & write speed     |    Disk read & write speed (GB/s)                   |
| **Milvus metrics**  |                                  |
| Insert per Second     |     Number of vectors that are inserted in a second.    |
| Total file    |       Current number of files in Milvus      |
| Data size       | Total amount of data stored in Milvus                 |
| QPM (Query per minute)    |  Number of queries completed in every minute          |
| Query service level     | System wide metric. Query service level (%) = n_queries_completed_within_threshold1 / n_queries (Generally, you can set 3 time periods - threshold1, threshold2 and threshold3, to track the query service level.) |
| Query elapsed time per vector  |   It is the query elapsed time divided by number of vectors.       |
| Connections         |  Number of connections established with the database during the selected time period. (A connection is a session established between a database client and a server.)   |
| Uptime        |   The time (in minutes) Milvus server has been working and available   |
| Cache utilization  |    Cache utilization ratio (%)                  |

## Configure monitoring frequency
The default Milvus monitoring frequency is 1 time/second. If you want to change it, you may read [Monitoring configuration](https://prometheus.io/docs/prometheus/latest/configuration/configuration/).


## Enable alert function
The Milvus alert system works on Alertmanager, which receives alert messages from Prometheus once an exception occurs. The alert architecture looks like this:

![Monitoring](assets/Monitoring.png)

To enable alert in Milvus, proceed as follows:

   1) [Install Alertmanager](https://prometheus.io/download/#alertmanager).

   2) Create file *milvus.yml* under Alertmanager root directory, and add the following content to it.

      ```
      global:
        resolve_timeout: 1m
        smtp_smarthost: 'smtp.163.com:25' # smtp server config
        smtp_from: '×××@163.com'          # sender email account
        smtp_auth_username: '×××@163.com' # sender email account
        smtp_auth_password: '××××××××'    # smtp authorization password
        smtp_hello: '163.com'             # sender email suffix
        smtp_require_tls: false
      route:
        group_by: ['alertname']
        receiver: default

      receivers:
        - name: 'default'
          email_configs:
          - to: '××××@××.com'             # receiver email address
      ```

      > Note: To get *smtp_auth_password*, log in to your email and enable *SMTP* services in the *Settings* page. Then you can set the password in the SMTP auth password page.

   3) Start Alertmanager.

      ```
      $ ./alertmanager --config.file=milvus.yml
      ```
> Note: To learn more about configuration of alert rules, go to [Alert Configuration](https://prometheus.io/docs/alerting/configuration/#configuration-file).
