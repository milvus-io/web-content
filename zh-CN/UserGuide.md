---
id: UserGuide
title: Milvus用户指南
sidebar_label: Milvus用户指南
---

# Milvus用户指南

Copyright © 2016~2019 ZILLIZ™. All rights reserved.

Leagal Disclaimer


前言
   - 概述
   - 声明
   - 基本概念
   - 通用描述说明
快速入门
Milvus数据库管理
   - Milvus目录结构
   - 设置Milvus
     - 设置Milvus服务
     - 设置Milvus日志
   - Milvus监控
     - 监控概述
     - 监控指标
     - 监控安装设置
创建数据库
导入数据
使用Milvus进行搜索
删除数据库
应用场景
障碍排查

前言
   - 概述
   - 声明
   - 基本概念
   - 通用描述说明
快速入门
Milvus数据库管理
   - Milvus目录结构
   - 设置Milvus
     - 设置Milvus服务
     - 设置Milvus日志
   - Milvus监控
     - 监控概述
     - 监控指标
     - 监控安装设置
创建数据库
导入数据
使用Milvus进行搜索
删除数据库
应用场景
障碍排查

## 前言

### 概述
Milvus是一种稳定可靠、可弹性伸缩的特征向量数据库系统，支持大批量高维向量的秒级响应。基于分布式文件系统和高性能存储，RDS支持MySQL、SQL Server、PostgreSQL、PPAS（高度兼容 Oracle）和MariaDB引擎，并且提供了容灾、备份、恢复、监控、迁移等方面的全套解决方案，彻底解决数据库运维的烦恼。关于Milvus的优势与价值，请参见[产品优势](https://github.com/milvus-io/docs/blob/dev/zh-CN/MilvusHighlights)。

本文档向您介绍如何对Milvus进行设置，帮助您深入了解Milvus的特性和功能。

如果您需要获取人工帮助，可以拨打技术支持电话400...或者给我们发邮件support@zilliz.com。

若要了解更多Milvus背景信息，请查看[特征向量数据库简介](https://github.com/milvus-io/docs/blob/dev/zh-CN/MilvusIntro.md)。

### 声明
本文档内容仅作为指导使用，文档中的所有内容不构成任何明示或暗示的担保。

### 基本概念 @Jin Hai


### 通用描述说明

| 描述      |    说明      |
|-----------|----------------|
| 




## 快速入门
关于Milvus的安装和试运行，请访问：[Milvus快速入门](https://github.com/milvus-io/docs/blob/dev/zh-CN/QuickStart.md)


## Milvus数据库管理

### Milvus目录结构
### 设置Milvus
#### 设置Milvus服务
#### 设置Milvus日志

### Milvus监控
#### 监控概述
#### 监控指标
#### 监控安装设置


请按照以下步骤设置Milvus Docker版：

1. 下载Milvus设置文件模板。

Temp/Milvus数据结构 @老莫

2. 进入Milvus设置文件，并对相关参数进行修改。

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
  
  3. 将修改好的文件放到
  
  Note：以下操作都是在Python交互环境下进行的。
## 创建数据库



## 导入向量数据



## 用Milvus进行搜索



## 删除数据库 （跟新Python SDK)@Jin Hai

Milvus提供基于C++/Python的客户端SDK。以Python为例，你可以参照[Milvus Python SDK](https://pypi.org/project/pymilvus)和[使用示例](https://github.com/milvus-io/pymilvus/blob/master/examples/example.py)导入特征向量数据，并进行特征向量搜索。

> Note: 对于其他类型的语言，Milvus支持通过RESTful和RPC的访问方法。
 
 
                               
## Milvus监控

## 监控概述
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


### 如何使用Milvus监控


## 应用场景


## 障碍排查


## 技术支持

- 如果你有任何问题和建议，请联系邮箱：support@zilliz.com。

- 对于企业合作用户，请拨打客服电话：400 …。

