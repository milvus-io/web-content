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

设置Milvus
   - Milvus目录介绍
   - 设置Milvus服务
   
创建数据库

导入数据

使用Milvus进行搜索

删除数据库

监控与告警
   - 监控概述
   - 监控指标
   - 监控安装设置
   - 设置监控频率
   - 设置告警规则
   
日志管理
   
应用场景

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


## 设置Milvus

### Milvus文件介绍
成功启动Milvus server后，你可以在home/$USER/milvus的路径下看到Milvus的文件夹。其中包含以下文件：

- milvus/db（数据库存储）
- milvus/logs（日志存储）
- milvus/conf（设置文件）
    - server_config.yaml（服务设置文件）
    - log_config.conf（日志设置文件）
- milvus/test（测试脚本）

### 设置Milvus服务

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

3. 重启Milvus Docker。



## 创建数据库
> 注意：以下操作都是在Python交互环境下进行的。对于其他类型的语言，Milvus支持通过RESTful和RPC的访问方法。

### 前提条件
如果你已经完成了Milvus的安装和所有相关设置，你就可以在Milvus上创建属于自己的数据库了。在用Python创建数据库之前，请确保你已经完成了以下操作：

1. 你已经导入了pymilvus。

   ```python
   # Import pymilvus
   $ from milvus import Milvus, Prepare, IndexType, Status

   ```
2. 你已经将Milvus连接到了本地server。

   ```
   # Connect Milvus to server
   $ milvus = Milvus()
   $ status = milvus.connect(host='SERVER-HOST', port='SERVER-PORT')
   
   ```
### 创建数据表格结构
我们以创建Table test01为例，向您展示如何创建一张数据表。以下是数据表格相关参数，在创建表格时可以根据实际需求选择：

|  参数  |  描述  |  类型   |  参考值   |
| ------------| --------------| --------| ---------|
| table_name  | 要创建的table名| string | 'table名' |
| dimension   | 表格中向量的维度 | integer | 0 < dimension <= 10000, 通常设置为128、256或518维 
| index_type  |有3种类型的检索类型: 1. `FLAT` - 向量运行在CPU上运行；2. `INVALID` - 向量运行在GPU上，搜索速度更快；3. 'INVALID' - 默认的检索类型，需改成FLAT或INVALID。|IndexType|FLAT / IVFLAT / INVALIDE(default)|

> 注意：如果没有GPU，将index_type设置成`IVFLAT`，系统将报错。

1. 准备数据表格参数。
  
   ```
   # Prepare param
   $ param = {'table_name'='01', 'dimension'=256, 'index_type'=IndexType.FLAT, 'store_raw_vector'=False}
   ```
   
2. 创建表格01。

   ```
   # Create a table
   $ milvus.create_table(param)
   $ Status(message='Table 01 created!', code=0)
   ```
   
3. 检查确认已创建数据库的信息。
   ```
   # Confirm table info.
   $ status, table = milvus.describe_table('01')
   $ print(status)
   $ print(table)
   ```                        


## 导入向量数据
成功创建数据表格后，您可以向表格批量导入向量数据。当然，进行此操作的前提是您已经有了多维的向量数据。导入数据前，请先了解数据导入相关参数：

|参数|描述|类型|参考值|
|---------|-----------|----|-----|
|table_name| 要创建的table名| string| 'table名'|
|records| 需要导入table的一组向量，每条向量是一组浮点，其维度必须和所创建表格的维度一样大。|2-dimension list|[[0.1, 0.2, ...], ...]

紧接着上面的例子，以下展示如何向Table 01导入20条256维的向量数据：

```
# Import vectors
$ status, ids = milvus.add_vectors(table_name='01', records=vectors)
$ print(status)
$ Status(code=0, message='Success')
$ pprint(ids) 

# List of ids returned
23455321135511233
12245748929023489
...
```


## 用Milvus进行搜索
现在，您已经在创建好的表格里成功导入了向量数据，您可以用Milvus搜索你需要的数据了。在此，你不仅可以批量搜索多个数据，还可以指定搜索范围。具体请阅读执行数据搜索相关参数：

|参数|描述|类型|参考值|
|---------|-----------|----|-----|
|table_name|要创建的table名|string|'table名'|
|top_k| 与所搜索向量相似度最高的k个向量| integer | 0 < top_k <= 10000|
|query_records| 一组需要搜索的向量，每条向量是一组浮点，其维度必须和所创建表格的维度一样大。| 2-dimension list | [[0.1, 0.2, ...], ...] |
|query_ranges（可选）| 向量搜索的范围，比如你可以只搜索某一段日期内的向量。如果不设置，默认值是'None'（即'无范围'），表示全局搜索。|list[tuple]|[('2019-01-01', '2019-01-02'), ...]|

> 注意：目前搜索范围仅支持日期范围，格式为'yyyy-mm-dd'，为左闭右开模式。比如您将范围定为[2019.1.1, 2019.1.3)，则搜索日期包含2019.1.1，但不包含2019.1.3.

假设您需要搜索5条256维的向量，你可以：
1. 定义您要搜索的5条向量数据。

   ```
   # Create 5 vectors of 256-dimension
   $ q_records = [[random.random() for _ in range(dim)] for _ in range(5)]
   ```
   
2. 搜索这5条向量。

   ```
   # Search 5 vectors
   $ status, results = milvus.search_vectors(table_name='test01', query_records=q_records, top_k=10)
   $ print(status)
   $ pprint(results) # Searched top_k vectors
   ```
 

## 删除表格
你可以根据需要，删除数据库中已创建的表格。仍然以表格01为例，若要删除表格01，你可以：

```
# Delete table
$ milvus.delete_table(table_name='01')
```

Milvus提供基于C++/Python的客户端SDK。以Python为例，你可以参照[Milvus Python SDK](https://pypi.org/project/pymilvus)和[使用示例](https://github.com/milvus-io/pymilvus/blob/master/examples/example.py)导入特征向量数据，并进行特征向量搜索。



## 监控与告警
### 监控告警概述
如果你想跟踪数据库系统运行表现，你可以选择为Milvus创建监控中心。你可以自行搭建，也可以直接使用我们提供的基于开源监控框架Prometheus的Milvus监控中心。其主要工作流程如下：

Milvus server收集数据 > 利用pull模式把所有数据导入Prometheus > 通过Grafana展示各项监控指标。

一旦发生告警，Prometheus会将告警信息可以推送给AlertManager，并通过Email或者WeChat通知用户。告警系统架构如下：

![Monitoring](assets/Monitoring.png)



### 监控安装设置

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


### 监控指标
在Milvus监控系统的GUI控制板上，你可以查看监控数据库的各项指标，实时了解数据库运行表现。

以下是控制板上可以查看的监控项：

|    监控项       |      说明                        |
|----------------|----------------------------------|
| **系统指标**    |                                  |
| GPU利用率       |    实例GPU的利用率                |
| 显存使用量      |    实例显存的使用量                |
| CPU利用率       |    CPU使用百分率                  |
| 内存使用量      |     内存使用量                     |
| 网络IO          |    每秒钟网口的读写速度            |
| 磁盘读写速度     |    磁盘写入速度                   | 
| **Milvus指标**  |                                  |
| 数据插入速度     |         每秒钟插入数据总量        |
| 数据文件总量     |       Milvus所存数据文件总量      |
| 数据总量        |Milvus所存数据总量                 |
| 每分钟查询率    |  每分钟完成的查询数量              |
| 查询响应时间     |      查询的返回时长               |
| 向量检索时间统计  |    单条向量查询的时长统计         |
| 连接数          |  当前连接到Milvus服务器的客户端数量 |
| 运行时长        |   Milvus服务器正常运行的分钟数      |
| 缓存利用率       |    已用缓存占比                   |

### 设置监控频率


### 设置告警规则


## 日志管理
### 日志类型


### 设置日志



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



### 案例 2 - 基于Milvus的商品推荐系统

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
  


## 障碍排查
- 连接服务器失败怎么办？
  请通过docker logs显示的日志，确认连接的服务器是否启动，连接的服务器地址、端口是否正确。


