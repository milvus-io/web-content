---
id: monitoring-and-alarm
title: Monitoring and alarm
sidebar_label: Monitoring and alarm
---

# Monitoring and alarm

## Monitoring introduction
A database monitoring system helps you track database performance and corresponds to unexpected emergency issues. With Milvus, you can use the monitoring system build on [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/). Here is how the Milvus monitor works:

Milvus server collects data > Collected data is imported to Prometheus > Monitoring items are displayed in Grafana-supported dashboard


## Installing and configuring monitor

1. Install Prometheus and Grafana.

   - [Installing Prometheus Server](https://github.com/prometheus/prometheus#install)

   - [Installing Grafana](http://docs.grafana.org)

2. Make certain configurations in Prometheus.

   1) Open configuration file *prometheus.yml* under Prometheus root path, and update file *alerting*, *rule_files* and *scrape_configs* as follows:
   
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
   
   2) Create a file *serverdown.yml* under Prometheus root path, with these rules: 

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

3. Configuring Grafana

   1) Open the terminal and run this command: 
   
      ```
      $ docker run -i -p 3000:3000 grafana/grafana
      ```
   
   2) Log in to Grafana website (localhost:3000), and in *data source type*, choose *Prometheus*.
   
      ![image-20190620191640605](assets/datasource.png)
   
   3) Change URL to Prometheus server address http://localhost:9090, and in *ACCESS*, choose *Browser*. Then click *Save & Test*.
   
      ![image-20190620191702697](assets/settings.png)
   
   4) On the top left corner of the page, click *New dashboard*.

      ![image-20190620191721734](assets/dashboard.png)
   
   5) Click *Import dashboard* in the right box.
   
      ![image-20190620191747161](assets/importdashboard.png)
   
   6) Download [json configuration file](attachment/dashboard.json), and import it into the system.
   
      ![image-20190620191802408](assets/importjson.png)

   When it succeeded, the monitor dashboard will be displayed.
   
   ![image-20190620134549612](assets/prometheus.png)


## Monitoring items
On the GUI dashboard of Milvus monitoring system, you can check these monitoring items to track real time performance of your database.


|    Monitoring item       |      Description                       |
|----------------|----------------------------------|
| **System parameters**    |                                  |
| GPU utilization ratio      |    Ratio of used GPU to total GPU             |
| GPU usage      |    real-time used GPU                  |
| CPU utilization ratio       |     Ratio of used CPU to total CPU                   |
| CPU usage      |     real-time used CPU                    |
| Internet IO          |    Internet IO read/write speed (per second)          |
| Disk read & write speed     |    Disk read & write speed                   | 
| **Milvus parameters**  |                                  |
| Data inserting speed     |         Total amount of data inserted per seconds     |
| Data file total number     |       Total number of files in Milvus      |
| Data size       | Total amount of data stored in Milvus                 |
| QPM (Query per minute)    |  Number of queries completed in every minute          |
| Search response time     |      Response time of a search               |
| Vector indexing time  |    Indexing time of a single vector         |
| Connected client number          |  Number of clients currently connected to Milvus  |
| Running time        |   Normal running time of Milvus server (in minutes)    |
| Cache utilization ratio  |    Ratio of used cache to total cache                   |

## Configuring monitoring frequency
The default Milvus monitoring frequency is 1 time/second. If you want to change it, you may read [Monitoring configuration](https://prometheus.io/docs/prometheus/latest/configuration/configuration/).


## Configuring alarm rules
The Milvus alarm system works on Alertmanager, which receives alarm messages from Prometheus once abnormalities occur. The alarm architecture looks like this: 

![Monitoring](assets/Monitoring.png)

You can set various rules for Milvus alarm. An example might be when the server is down, an email will be sent instantly to a specified user. You may proceed as follows:

   1) Create a file *milvus.yml* under Alertmanager root path.

      ```
      global:
        resolve_timeout: 1m
        smtp_smarthost: 'smtp.163.com:25' # smtp server config
        smtp_from: '×××@163.com'          # sender mail account
        smtp_auth_username: '×××@163.com' # sender mail account
        smtp_auth_password: '××××××××'    # sender mail password
        smtp_hello: '163.com'             # sender mail suffix
        smtp_require_tls: false
      route:
        group_by: ['alertname']
        receiver: default

      receivers:
        - name: 'default'
          email_configs:
          - to: '××××@××.com'             # receiver mail address
      ```
   
   2) Start Alertmanager by setting --config.file to *milvus.yml*.

      ```
      ./alertmanager --config.file=milvus.yml
      ```
> Note: To learn more about configuration of alarm rules, go to [Alarm Configration](https://prometheus.io/docs/alerting/configuration/#configuration-file).

