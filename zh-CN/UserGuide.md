---
id: UserGuide
title: Milvus用户指南
sidebar_label: Milvus用户指南
---

# Milvus用户指南

## 前言

Milvus是一款智能向量检索数据库系统，支持大批量高维向量的秒级响应。该指南主要介绍了Milvus的安装配置和使用，以及Milvus监控系统的创建。

Milvus指南主要针对Milvus Docker版管理员和普通用户，读者一般需要有Python/C++等基本编程知识。

## 快速入门

### 确定系统要求

Milvus能很好的运行和部署在x86架构的服务器环境和通用虚拟化环境下，也支持主流的网络硬件设备。操作系统方面，Milvus目前支持Linux操作系统环境。

在安装并运行Milvus前，你需要先确定系统及软硬件环境是否符合以下要求：

- Linux操作系统版本要求

  | Linux 操作系统平台       | 支持版本        |
  | :----------------------- | :---------- |
  | Red Hat Enterprise Linux | 7.5及以上   |
  | CentOS                   | 7.5及以上   |
  | Ubuntu LTS               | 16.04及以上 |

- 硬件配置要求

  | 硬件名称 |   要求         |
  | -------- | ---------------- |
  | CPU      | 16核+            |
  | GPU      | Pascal系列及以上 |
  | 内存     | 256GB及以上      |
  | 硬盘类型 | SSD或者NVMe      |
  | 网络     | 万兆网卡         |

- 客户端浏览器要求

  Milvus提供了基于Prometheus监控和Grafana的展示平台，可以对数据库的各项指标进行可视化展示，兼容目前主流的Web浏览器如：微软IE、Google Chrome、Mozilla Firefox和Safari等。

- 软件包安装要求

  请确保你已经安装以下软件包，以便Milvus Docker版能正常运行：

  - [CUDA 9.0及以上](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html)
  - [Docker CE](https://docs.docker.com/install/)
  - [NVIDIA-Docker2](https://github.com/NVIDIA/nvidia-docker)


## 设置Milvus

请按照以下步骤安装Milvus Docker版：

1. 下载Milvus Docker镜像文件。

   ```shell
   # Download Milvus Docker image
   $ docker pull milvusdb/milvus:latest
   ```

2. 下载Milvus设置文件模板。

3. 进入Milvus设置文件，并对相关参数进行修改。

   1）点击server_config文件，设置Milvus服务参数。
   
     | 参数            | 参数描述                          | 参数值      |
     |----------------|-----------------------------------|------------|
     | address        | Milvus server监听的ip地址          |            |
     | port           | Milvus server监听的端口号          |            |
     | transfer_protocol | Milvus client与server通信的协议 | binary/compact/json |
     | server_mode    | server支持的模式                   | simple（单线程）/thread_pool（线程池）|
     | gpu_index      | 目前使用的GPU                      |               |
                                                                                                                     
   2）点击db_config文件，设置Milvus数据库参数。
   
     | 参数               | 参数描述                            | 参数值    |
     |-------------------|-------------------------------------|----------|
     | db_path           | Milvus数据库文件存储的路径            |    ？    |
     | db_backend_url    | 使用RESTFul API接口访问数据库的ip地址 |    ？    |
     | db_flush_interval | 插入数据持久化的时间间隔              |    ？    |

   3）点击metric_config文件，设置Milvus监控参数。
   
     | 参数               | 参数描述                            | 参数值    |
     |-------------------|-------------------------------------|----------|
     | startup           | 选择是否启动监控             | on（启动）/ off（不启动) |
     | collector         | 连接的监控系统               | Prometheus             |
     | collect_type      | Prometheus的监控获取方式     |   pull / push          |
     | port              | 访问Prometheus的端口号       | on（启动）/ off（不启动）|
     | push_gateway_ip_address | push gateway的ip地址   | push                   |
     | push_gateway_port       | push gateway的端口号   |   push                 |
  
  
## 创建数据库



## 导入向量数据



## 用Milvus进行搜索



## 删除数据库

Milvus提供基于C++/Python的客户端SDK。以Python为例，你可以参照[Milvus Python SDK](https://pypi.org/project/pymilvus)和[使用示例](https://github.com/milvus-io/pymilvus/blob/master/examples/example.py)导入特征向量数据，并进行特征向量搜索。

> Note: 对于其他类型的语言，Milvus支持通过RESTful和RPC的访问方法。
 
 
                               
## Milvus监控

如果你想跟踪数据库系统运行表现，你可以选择为Milvus创建监控中心。你可以自行搭建，也可以直接使用我们提供的基于开源监控框架Prometheus的Milvus监控中心。其主要工作流程如下：

Milvus server收集数据 > 利用pull模式把所有数据导入Prometheus > 通过Grafana展示各项监控指标。

一旦发生告警，Prometheus会将告警信息可以推送给AlertManager，并通过Email或者WeChat通知用户。告警系统架构如下：

![Monitoring](assets/Monitoring.png)


### 安装设置Milvus监控

1. 安装Prometheus和Grafana。

   - [安装Prometheus Server](https://github.com/prometheus/prometheus#install)

   - [安装Grafana](http://docs.grafana.org)

2. 设置Prometheus。

   1）打开prometheus根目录下的prometheus.yml设置文件，并对alerting, rule_files和scrape_configs文件做如下跟新：
   
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
   
   2）在prometheus根目录下创建serverdown.yml文件，内容如下：

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

3. 设置alertmanager

   1）在alertmanager根目录下创建milvus.yml文件，内容如下：

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
   
   2）指定--config.file=milvus.yml以启动alertmanager，如下：

      ```
      ./alertmanager --config.file=milvus.yml
      ```

4. 设置Grafana

   1）打开terminal，执行以下命令
   
      ```
      $ docker run -i -p 3000:3000 grafana/grafana
      ```
   
   2）登录Grafana网页(localhost:3000)，在data source type选项框选择Prometheus。
   
      ![image-20190620191640605](assets/datasource.png)
   
   3）在HTTP区域，将URL设置成Prometheus的服务器地址http://localhost:9090, 将ACCESS设置成Browser，点击Save & Test。
   
      ![image-20190620191702697](assets/settings.png)
   
   4）点击页面左上角的New dashboard。
   
      ![image-20190620191721734](assets/dashboard.png)
   
   5）点击右侧的Import dashboard。
   
      ![image-20190620191747161](assets/importdashboard.png)
   
   6）下载json配置文件，并将其导入系统。
   
      ![image-20190620191802408](assets/importjson.png)

   成功之后，将会出现我们提供的监控面板：
   
   ![image-20190620134549612](assets/prometheus.png)


## 如何使用Milvus监控


## 障碍排查


## 技术支持

- 如果你有任何问题和建议，请联系邮箱：support@zilliz.com。

- 对于企业合作用户，请拨打客服电话：400 …。

