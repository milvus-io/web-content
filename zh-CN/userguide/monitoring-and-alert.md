---
id: monitoring-and-alert
title: Monitoring and alert
sidebar_label: Monitoring and alert
---

# 监控与报警

## 监控报警概述
如果你想跟踪数据库系统运行表现，你可以选择为Milvus创建监控中心。你可以自行搭建，也可以直接使用我们提供的基于开源监控框架Prometheus的Milvus监控中心。其主要工作流程如下：

Milvus server收集数据 -> 利用pull模式把所有数据导入Prometheus -> 通过Grafana仪表盘展示各项监控指标。

> 注意：若要启用监控与报警功能，请确保*home/$USER/milvus/conf/server_config.yaml*路径下*metric_config*文件中的参数*is_startup*设置为*on*。

## 启用监控功能

1. [安装Prometheus](https://prometheus.io/download/#prometheus)。

2. 设置Prometheus。

   1）打开Prometheus根目录下的*prometheus.yml*设置文件，并对alerting, rule_files和scrape_configs做如下更新：
   
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

   2）在Prometheus根目录下创建*serverdown.yml*文件，内容如下：

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
      > 提示：你可以为Milvus设置各种告警规则，以上示例代码中例子为：当服务器无法正常工作时，会立即发邮件通知相关用户。

   3）启动Prometheus。
      ```
      $ ./prometheus
      ```

3. 安装Grafana，另开一个terminal并运行以下命令：
   
      ```
      $ docker run -i -p 3000:3000 grafana/grafana
      ```
4. 设置Grafana
   
   1）登录Grafana网页(localhost:3000)，在左侧导航栏，点击Configuration图标，并选择*Data Sources*。
   
   > 提示：若您是首次登录Grafana，请使用默认用户名（admin）和密码（admin）登录。
   
   2）在*Data Sources*页面，选项框内选择*Prometheus*。
   
      ![image-20190620191640605](assets/datasource.png)
   
   3）在*Settings*页面，将*Prometheus*设置为默认。在HTTP区域，将*URL*设置成Prometheus的服务器地址*http://localhost:9090*, 将*ACCESS*设置成*Browser*，点击*Save & Test*。
   
      ![image-20190620191702697](assets/settings.png)
   
   4）在左侧导航栏，点击Create图标并选择*Dashboard*。然后点击页面左上角的*New dashboard*。
   
      ![image-20190620191721734](assets/newdashboard.png)
   
   5）点击页面右侧的*Import dashboard*。
   
      ![image-20190620191747161](assets/importdashboard.png)
   
   6）下载[json配置文件](assets/dashboard.json)，并将其导入系统。
   
      ![image-20190620191802408](assets/importjson.png)

   成功之后，将会出现我们提供的监控仪表盘：
   
   ![image-20190620134549612](assets/prometheus.png)


## 监控指标
在Milvus监控系统的GUI仪表盘上，你可以查看监控数据库的各项指标，实时了解数据库运行表现。

以下是仪表盘上可以查看的监控项：

|    监控项       |      说明                        |
|----------------|----------------------------------|
| **系统指标**    |                                  |
| GPU utilization |    实例的GPU利用率                |
| GPU temperature         |   GPU的温度，如果使用多张GPU，则每张GPU的温度会分别显示 |
| GPU memory usage    |    实例显存的使用量                |
| CPU utilization      |    实例的CPU利用率=服务器任务执行时间/服务器总运行时间  |
| CPU temperature        |  CPU的温度                        |
| Memory usage      |     内存使用量                     |
| Network IO          |    每秒钟网口的读写速度            |
| Disk read speed    |    磁盘读取速度（GB/s）                   |
| Disk write speed   |    磁盘写入速度（GB/s）
| **Milvus指标**  |                                  |
| Insert per Second     |         每秒钟插入数据总量        |
| Total file     |       Milvus所存数据文件总量      |
| Data size       |   Milvus所存数据总量               |
| QPM (Query per minute)    |  每分钟完成的查询数量              |
| Query service level     |      查询服务级别 = 一定时间阈值内的查询数量/总查询数量              |
| Query elapsed time per vector  |    单条向量查询时间 = 查询使用时间/向量数量         |
| Connections          |  当前连接到Milvus服务器的客户端数量 |
| Uptime        |   Milvus服务器正常运行的时长（分钟）      |
| Cache utilization      |    已用缓存占比                   |

## 设置监控频率
目前，Milvus监控默认的监控频率为：1次/秒，你也可以[更改监控设置](https://prometheus.io/docs/prometheus/latest/configuration/configuration/)。


## 启用报警功能
Milvus报警系统基于Alertmanager创建。异常发生时，Prometheus会向Alertmanager发送报警消息，Alertmanager再通过邮件给客户发送通知。报警系统架构如下：

![Monitoring](assets/Monitoring.png)

若要启动报警功能，请按照以下操作进行：

1. [安装Alertmanager](https://prometheus.io/download/#alertmanager)。

2. 在Alertmanager根目录下创建*milvus.yml*文件，内容如下：
   
   ```yaml
   global:
     resolve_timeout: 1m
     smtp_smarthost: 'smtp.163.com:25' # smtp server config
     smtp_from: '×××@163.com'          # sender email account
     smtp_auth_username: '×××@163.com' # sender email account
     smtp_auth_password: '××××××××'    # sender email password
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
      
   > 提示：若要获取*smtp_auth_password*，请登录您的邮箱，并在*设置*页面启用*SMTP*服务。然后，您可以在*客户端授权密码*页面设置相应密码。

3. 启动Alertmanager。
   
   ```
   ./alertmanager --config.file=milvus.yml
   ```
      
> 提示：如果你想自定义报警设置，请参考[报警设置](https://prometheus.io/docs/alerting/configuration/#configuration-file)

