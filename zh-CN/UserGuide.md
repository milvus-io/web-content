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
容灾
障碍排查



前言
   - 概述
   - 声明
   - 基本概念
   - 通用描述说明
快速入门
设置Milvus
   - Milvus目录介绍
   - 设置Milvus服务
创建数据库
导入数据
使用Milvus进行搜索
删除数据库
监控与报警
   - 监控概述
   - 监控指标
   - 监控安装设置
日志管理
   - 设置Milvus日志
应用场景
容灾
障碍排查



## 前言

### 概述
Milvus是一种稳定可靠、可弹性伸缩的特征向量数据库系统，支持大批量高维向量的秒级响应。关于Milvus的优势与价值，请参见[产品优势](https://github.com/milvus-io/docs/blob/dev/zh-CN/MilvusHighlights)。

本文档向您介绍如何对Milvus进行设置和管理，帮助您深入了解Milvus的特性和功能。

如果您需要获取人工帮助，可以拨打技术支持电话400...或者给我们发邮件support@zilliz.com。

若要了解更多Milvus背景信息，请查看[特征向量数据库简介](https://github.com/milvus-io/docs/blob/dev/zh-CN/MilvusIntro.md)。

### 声明
本文档内容仅作为指导使用，文档中的所有内容不构成任何明示或暗示的担保。

### 基本概念 
- 分布式数据库

- Milvus文件目录


### 通用描述说明

| 描述       |    说明                                 |
|-----------|-----------------------------------------|
| 粗体      | 粗体字代表标题，和需要特别强调的内容文字    |
| Consolas  | Consolas字体文字表示段落中出现的代码或命令 |
| 注意      | 注意是对某一个操作或解释的补充说明          |


## 快速入门
关于Milvus的安装和试运行，请访问：[Milvus快速入门](https://github.com/milvus-io/docs/blob/dev/zh-CN/QuickStart.md)


## Milvus数据库管理
### Milvus文件
成功启动Milvus server后，你可以在home/$USER/milvus的路径下看到Milvus的文件夹。其中包含以下文件：

- milvus/db（数据库存储）
- milvus/logs（日志存储）
- milvus/conf（设置文件）
    - server_config.yaml（服务设置文件）
    - log_config.conf（日志设置文件）
- milvus/test（测试脚本）


### 设置Milvus
Milvus设置文件包含服务设置和日志设置两方面。Milvus服务设置涉及服务，数据库和监控等方面，（为什么重要？）

#### 设置Milvus服务

请按照以下步骤设置Milvus服务：

1. 根据路径home/$USER/milvus/conf，打开Milvus服务设置文件server_config.yaml。

2. 对文件中的相关参数进行修改。

   1）点击server_config文件，设置服务参数。
   
     | 参数            | 参数描述                          | 参考值            |
     |----------------|-----------------------------------|-------------------|
     | address        | Milvus server监听的ip地址          | 0.0.0.0           |
     | port           | Milvus server监听的端口号，默认值为19530 | 1025 ~ 65534 |            
     | gpu_index      | 目前使用的GPU，默认值为0。          | 0 ~ GPU数量-1                |
     | mode           | Milvus部署类型                    | single（单机）/ cluster（多机）|            
                                                                                                                     
   2）点击db_config文件，设置数据库参数。
   
     | 参数               | 参数描述                            | 参考值    |
     |-------------------|-------------------------------------|----------|
     | db_path           | Milvus数据库文件存储的路径            |    ？    |
     | db_backend_url    | 元数据库uri                          | http://127.0.0.1  |
     | index_building_threshold | index building触发阈值        |  1024（MB）  |

   3）点击metric_config文件，设置监控参数。
   
     | 参数               | 参数描述                            | 参考值    |
     |-------------------|-------------------------------------|----------|
     | is_startup        | 选择是否启动监控             | on（启动）/ off（不启动) |
     | collector         | 连接的监控系统               | Prometheus             |
     | collect_type      | Prometheus的监控获取方式     |   pull / push          |
     | port              | 访问Prometheus的端口号       | 8080                   |
     | push_gateway_ip_address | push gateway的ip地址   | 127.0.0.1             |
     | push_gateway_port       | push gateway的端口号   |  9091                 |

   4）点击cache_config文件，设置相关参数。
     |  参数             | 参数描述                            | 参考值    |
     |-------------------|-------------------------------------|----------|
     | cpu_cache_capacity |用于cache的内存量，默认值为16GB       |  0 ~ 机器内存总量 |
    
   注意：license_config文件不需要修改。

3. 重启Milvus server。


#### 设置Milvus日志
 

### Milvus监控告警
#### 监控告警概述
如果你想跟踪数据库系统运行表现，你可以选择为Milvus创建监控中心。你可以自行搭建，也可以直接使用我们提供的基于开源监控框架Prometheus的Milvus监控中心。其主要工作流程如下：

Milvus server收集数据 > 利用pull模式把所有数据导入Prometheus > 通过Grafana展示各项监控指标。

一旦发生告警，Prometheus会将告警信息可以推送给AlertManager，并通过Email或者WeChat通知用户。告警系统架构如下：

![Monitoring](assets/Monitoring.png)



#### 监控安装设置

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

#### 监控指标
在Milvus监控系统的GUI控制板上，你可以查看监控数据库的各项指标，实时了解数据库运行表现。

以下是控制板上可以查看的监控项：

|    监控项      |      说明                          |
|---------------|------------------------------------|
| 查询密度       |  过去一分钟内查询的条数              |
| 并发连接数     |  连接到milvus服务器上的客户端数量    |
| 运行时间       |   milvus服务器健康运行的时间         |
| GPU_X_使用率   |   第X个GPU的使用百分比              |
| GPU_X_使用量   |    第X个GPU内存的使用量             |
| 缓存使用率     |    缓存的使用百分比                  |
| CPU使用率      |          CPU使用百分比              |
| 内存使用率     |        内存使用百分比                |
| 向量查询响应时间统计图  |    向量查询的返回时长统计图   |
| 向量插入吞吐量  |         每秒钟插入数据总量           |
| 插入向量所需时间统计图 |   向量插入到完成的时长统计图   |
| 向量查询吞吐量  |        每秒钟查询向量的数量          |
| 查询吞吐量      |         每秒查询的数量              |
| 不同索引查询时间 |  对于不用类型的索引，查询返回结果时长 |
| 查询响应时间     |      查询的返回时长                 |
| 数据文件总量     |       所有插入向量的总数据量         |
| 网络IO          |    每秒钟网络上传和下载的速度         |
|  磁盘写速度     |   每秒钟内存数据写入磁盘的总量         | 

磁盘读速度：每秒钟磁盘数据写入内存的总量

磁盘读数据大小统计图：从磁盘写入内存数据大小的统计图

磁盘读所需时间统计图：从磁盘写入内存时间的统计图

访问meta所需时间统计图：访问meta数据时长统计图

meta访问次数：访问meta数据的总次数zongliang

搜索index/raw数据所需时间统计图：对于有索引与无索引数据的搜索时间统计图

搜索raw/index数据总量：搜索有索引与无索引的文件总量

搜索raw/index数据大小：搜索有索引与无索引的文件大小

memory table合并所需时间统计图：内存表合并时间的统计图

建立索引所需时间统计图：生数据建立索引所需时间的统计图

cache访问次数：访问缓存的总次数

插入向量总数量：插入向量的总量

#### 设置监控频率


#### 设置告警规则


## 创建数据库
> 注意：以下操作都是在Python交互环境下进行的。对于其他类型的语言，Milvus支持通过RESTful和RPC的访问方法。

您可以通过Python命令在Milvus上创建数据库。

1. 创建数据库准备
   打开Python代码编辑器，输入您要创建的数据库的相关参数（param）。
   
2. 创建数据库

3. 检查确认已创建数据库的信息
   
                            

## 导入向量数据
成功创建数据库后，您可以批量导入向量数据。当然，进行此操作的前提是您已经有了多维的向量数据。


## 用Milvus进行搜索



## 删除数据库 （跟新Python SDK)@Jin Hai

Milvus提供基于C++/Python的客户端SDK。以Python为例，你可以参照[Milvus Python SDK](https://pypi.org/project/pymilvus)和[使用示例](https://github.com/milvus-io/pymilvus/blob/master/examples/example.py)导入特征向量数据，并进行特征向量搜索。

                               

## 应用场景
### 典型应用场景

在目前大部分的AI应用场景下，都可以使用Milvus来搭建智能应用系统：

- 图片识别
  以图搜图，通过图片检索图片。具体应用例如：人脸检索，人体检索，和车辆检索，以及商品图片检索，人脸支付等

- 视频处理
  针对视频信息的实时人脸检索和轨迹跟踪

- 自然语言处理
  基于语义的文本检索和推荐，通过文本检索近似文本。

- 声纹匹配，音频检索。

- 文件去重，通过文件指纹去除重复文件。

  

### 典型架构
Milvus做特征向量检索时典型应用架构如下：

![MilvusTypicalUsage](/Users/zilliz/Documents/MilvusTypicalUsage.png)

非结构化数据(图像/视频/文字/音频等）首先通过特征提取模型产生特征向量，然后存入Milvus数据库系统。查询的时候，待查询的非结构化数据，也需要通过特征提取模型，提取特征向量。然后用该向量到Milvus中已存入的向量集里，查询匹配度最高的向量集合。最后，使用返回的向量ID，找到对应非结构化数据，结合上层应用，实现对应功能。

### 案例 1 - 基于Milvus的人脸搜索

#### 需求

- 敏感人群告警

敏感人群库中保存的是敏感人群的人脸特征，摄像头提取的人脸都要与敏感人群库中的人脸进行对比。一旦通过对于发现了敏感人群库中的在逃人员，系统需要给出告警。

- 一人一档

摄像头提取的人脸都会与证照库中的人脸特征进行对比，通过人脸找到关联的证件ID，进而找到个人的所有信息。

- 人像检索

对于无法在证照库中找到的人脸，则会将其保存在历史人像库中，保存时长为3个月，以备后续案件侦破时查询轨迹使用。

#### 系统实现架构图：

![FacialSearch](/Users/zilliz/Documents/FacialSearch.png)

- **人脸获取设备**：摄像头拍到人脸图片后，把图片发到特征向量提取设备。

- **特征提取服务**：收到摄像头发过来的人脸图片后，利用深度学习系统训练的模型，转换为512维人脸特征向量。

- **应用层**：

  - 黑名单告警：收到人脸的特征向量后，会发往特征向量库比对，如果发现匹配度较高，则发出告警。
  - 以人脸查人员信息：可以通过人脸在人员信息库中，检索人员ID，找到后再去MySQL中把对应人员的所有信息展示出来。
  - 人员轨迹再现：用户可以使用人脸查找人员信息，然后把与他相关的历史轨迹展示出来。

- **数据层**：

  - 敏感人群库

    向量库，百万级，数据基本无更新。对于查询精度要求高，查询速度要求快，查询的QPS要求达到1000每秒，允许批量查询。

  - 人员库

    向量库，保存10亿条人脸特征数据，数据会有少量更新。每个摄像头拍到的人脸都需要与人员库中的人脸进行查询对比，查询率要求达到1000 QPS，允许批量查询。

  - 历史库

    向量库，每天产生2亿人脸数据，需要保存3个月（90天）的人脸向量数据即180亿向量数据。人脸检索时，到历史库中通过人脸特征检索人脸轨迹，允许批量查询。

  - 人员信息库

    结构化数据库，以MySQL存储，存储以个人ID号为主键的个人信息。

- **基础设施**：Milvus实现向量数据的存储，MySQL实现结构化数据存储，Minio实现非结构化数据(人脸图片)存储。

#### 示例




### 案例 2 - 基于Milvus的非标车搜索

#### 需求

- 非标车轨迹实时查询

摄像头拍到嫌疑非标车后，提取其特征到实时插入的非标车图片库中搜索，对于找到的所有相关车辆在地图上展示其轨迹。

#### 系统实现架构图

![VehicleSearch](/Users/zilliz/Documents/VehicleSearch.png)



- **非标车图片获取设备**：摄像头拍到非标车图片后，把图片发到特征向量提取设备。

- **特征提取服务**：收到摄像头发过来的非标车图片后，利用深度学习系统训练的模型，转换为256维车辆特征向量后送入实时非标车特征库存储。

- **应用层**：

  - 非标车轨迹再现：收到人脸的特征向量后，会发往特征向量库比对，如果发现匹配度较高，则发出告警。

- **数据层**：

  - 实时非标车特征库

    向量库，3亿级，每天插入1000W，存储30天。对于查询精度要求高，查询速度要求快，查询的QPS要求达到100每秒，不允许批量查询。

- **基础设施**：Milvus实现向量数据的存储，Minio实现非结构化数据(车辆图片)存储。



### 案例 3 - 基于Milvus的商品推荐系统

#### 需求：

- 基于用户画像推荐广告商品

#### 系统架构图

![Recommendation](/Users/zilliz/Documents/Recommendation.png)

- **用户画像提取**：根据过往用户浏览新闻的内容，提取其关键词，然后利用关键词产生用户画像。
- **商品特征提取**：根据商品信息，提取关键词，然后产生商品的特征向量。
- **应用层**：
  - 商品推荐：收到用户画像对应的特征向量后，会发到商品特征库对比，将匹配度最高的10个商品，返回。
- **数据层**：
  - 商品特征库： 向量库，1亿级，每天更新100W。对于查询精度要求不高，但是要求查询速度快，且QPS要求达到1000每秒，允许批量查询。
  - 用户信息库：结构化数据库，10亿级，记录用户画像关键词，用户画像改变就需要更新。
- **基础设施**：
  - Milvus 实现向量数据的存储和检索。
  - Minio 实现商品图片的存储。
  - MySQL 实现用户画像信息存储。
  
  
  
## 容灾


## 障碍排查
- 连接服务器失败怎么办？
  请通过docker logs显示的日志，确认连接的服务器是否启动，连接的服务器地址、端口是否正确。


