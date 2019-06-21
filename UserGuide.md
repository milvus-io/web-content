### 版本发布说明



版本 0.3.0

发布日期：2019-06-30

主要功能：

- 增加基于Celery的水平扩展方案
- 增加了基于MinIO的存储分离方案
- 增加了删除Table的功能
- 支持ARM64架构
- 新加入SPTAG索引查询

主要改进：

- 更新了C++和Python的SDK
- 增加了获得Table行数的接口
- 增加了查询匹配度作为返回结果
- 改善了查询的性能
- 新增了更多的监控指标



版本 0.2.1

发布日期：2019-06-14

主要功能：

- 增加了数据加载和计算的流水线

主要改进：

- 支持基于时间范围的查询



版本 0.2.0

发布日期：2019-05-31

主要功能：

- 添加基于C++和Python的SDK
- 增加基于Prometheus的监控指标
- 增加基于Inverted File Index的向量索引
- 实现单节点的Milvus



### 关于Milvus



#### 主要概念

##### 特征向量

现实世界的事物，复杂而多元，通常是很难使用少数几个简单数能精确描述的。因此，我们会使用特征向量来描述一个事物，特征向量就是现实事物的数学抽象。现在的人工智能技术核心能力，就是利用各种计算机算法对现实世界的原始数据进行特征提取，特征处理和特征选择，最终形成准确描述该事物的特征向量。



##### 特征向量检索数据库

随着机器学习或者深度学习技术越来越成熟，应用越来越广泛，随之而产生的特征向量数据也会越来越庞大。传统的数据库系统和大数据系统，由于其内建数据类型里并不包括特征向量类型。如果打算使用传统的数据库系统进行特征向量检索，要么自定义特征向量类型以及针对该类型数据的自定义函数；要么就只能按照一维一列的方式把高维向量存入数据库系统，由于大多数数据库系统对于表列数的支持都是有限的，因此使用这种方法通常无法支持高维特征向量。此外，传统的数据库和大数据系统里，除了没有针对该数据类型的存储方式、计算方法，也没有针对该类型的索引方式以及数据的管理方式，由此可见使用传统的数据库和大数据系统进行特征向量的存储和检索，都是不合适的。提供一个面向海量特征向量检索的数据库系统，已经是市场对于数据库厂商提出的新需求。



##### Milvus

Milvus 是Zilliz公司为应对AI应用大规模落地，且当前工业界并没有一款成熟向量检索系统，而研制的面向海量特征向量检索的数据库系统。Milvus 旨在帮助用户实现非结构化数据的近似检索和分析，其实现原理是通过AI算法提取非结构化数据的特征，然后利用特征向量唯一标识该非结构化数据，然后用向量间的距离衡量非结构化数据之间的相似度。



#### 系统架构



#### 主要特性

Milvus产品特性主要包含以下：

- 高维向量数据、高准确度和高性能

Milvus可以提供高准确度的百亿向量检索，检索结果的秒级响应。

- 提供水平线性弹性扩展

Milvus可随着业务增长而伸缩，只需要通过增加更多的机器来满足业务增长需要。

- 高可用

Milvus内部计算、存储和元数据集群，均允许部分实例失效，而不影响整个集群的可用性。　

- 支持实时插入

和很多面向向量检索的算法要求不同，Milvus支持对于特征向量的实时插入，支持边插入数据边查询数据。

- 高易用性

Milvus提供了基于C++/Python的客户端SDK。对于其他类型的语言，Milvus支持通过RESTful和RPC的访问方法。

- 易部署

Milvus是为云而设计的数据库，支持公有云、私有云和混合云，使部署、配置和维护变得十分简单。

- AI模型全支持

Milvus支持目前所有AI训练框架所训练的模型所产生的特征向量，涵盖图片、视频、文本、语音等等方面。

- 跨平台

Milvus可以运行在Linux和Windows平台上，支持x86/ARM/PowerPC等架构，为边缘计算应用提供基础支撑。

- 可视化监控

Milvus提供基于Prometheus的监控和Grafana的可视化展示。





### 操作手册

####部署

##### Milvus单机版的软硬件要求

Milvus是一款面向向量检索的数据库系统，可以很好的运行和部署在x86架构的服务器环境和主流的虚拟化环境下，也支持目前主流的网络硬件设备。操作系统方面，Milvus支持目前主流的Linux操作系统环境。

- Linux操作系统版本要求

| Linux 操作系统平台       | 版本        |
| :----------------------- | :---------- |
| Red Hat Enterprise Linux | 7.5及以上   |
| CentOS                   | 7.5及以上   |
| Ubuntu LTS               | 16.04及以上 |

- 典型硬件配置要求

| 硬件名称 | 硬件要求         |
| -------- | ---------------- |
| CPU      | 16核+            |
| GPU      | Pascal系列及以上 |
| 内存     | 256GB及以上      |
| 硬盘类型 | SSD或者NVMe      |
| 网络     | 万兆网卡         |

- 客户端浏览器要求

Milvus 提供了基于Prometheus监控和Grafana的展示平台，可以对数据库的各项指标进行可视化展示，兼容目前主流的Web浏览器如：微软IE、Google Chrome、Mozilla Firefox和Safari等。

##### Milvus单机版的部署

在安装Milvus之前，首先请确保您的机器上已经安装了：

- CUDA 9.0及以上
- Docker CE
- NVIDIA-Docker2

对于CUDA的安装方法和步骤，请移步：https://docs.nvidia.com/cuda/

对于Docker CE的安装方法和步骤，请移步：https://docs.docker.com/install/

对于NVIDIA-Docker2的安装方法和步骤，请移步：https://github.com/NVIDIA/nvidia-docker



首先请先通过Zilliz官方网站，申请使用Milvus，然后客服人员会向您提供Milvus的Docker Image，拿到Docker Image后，将其下载到安装机器内，然后运行下面的命令导入Milvus容器：

下载Milvus的Docker镜像后，您可以通过下面命令启动Milvus Server，并且在端口33001端口接受客户端请求：

```
# Startup Milvus
$ nvidia-docker run --runtime=nvidia -p 33001:33001 -v /home/$USER/milvus:/tmp milvus/ubuntu16.04:0.3.0
```

检查 Milvus 运行状态和运行日志：

```
# Show Milvus Log
docker logs <Milvus container id>
```



##### Milvus Python SDK的安装

##### 

```
# 安装 Milvus Python SDK
$ pip install pymilvus
```

Milvus Python SDK的使用手册，请访问：https://pypi.org/project/pymilvus/



#### 配置

目前Milvus的单机版配置共分成三部分。

##### Milvus服务配置

server_config: 

- address: 目前Milvus server监听的ip地址。
- port: 目前Milvus server监听的端口号。
- transfer_protocol：Milvus client与server通信的协议，可以是：binary, compact和json。
- server_mode: 目前支持simple：单线程和thread_pool：线程池，两种模式。
- gpu_index: 目前使用的GPU

##### Milvus数据库配置

db_config: 

- db_path: Milvus数据库文件存储的路径。
- db_backend_url: 使用RESTFul API接口访问数据库的ip地址。
- db_flush_interval: 插入数据持久化的时间间隔

##### Milvus监控参数配置

metric_config: 

- startup: 是否启动监控：on或off。
- collector: 连接的监控系统：目前支持prometheus。
- prometheus_config: promethus监控相关配置。
  - collect_type: prometheus的监控获取方式：支持pull或者push方式。
  - port: 访问prometheus的端口号。
  - push_gateway_ip_address: push gateway的ip地址，push方式有效。
  - push_gateway_port: push gateway的端口号，push方式有效。

#### 监控

##### 概述

Milvus的监控系统是基于开源监控框架Prometheus搭建的。目前，Milvus server收集数据后，利用的pull模式把所有数据导入Prometheus。然后，我们就通过Grafana展示所有监控指标了，同时一旦发生告警Prometheus会将告警信息可以推送给AlertManager，后通过E-Mail或者WeChat将通知用户用户。告警系统架构如下：

![Monitoring](./Pictures/Monitoring.png)

Grafana是一个开源的指标分析及可视化系统。我们使用 Grafana 来展示 Milvus 的各项系统指标，如下图：

![image-20190620134549612](./Pictures/prometheus.png)

##### 使用Prometheus和Grafana监控Milvus

监控系统的安装：

- Prometheus Server 参考：https://github.com/prometheus/prometheus#install
- Grafana 参考：[http://docs.grafana.org]



##### Prometheus配置

首先，需要更新prometheus根目录下的prometheus.yml配置文件。在alerting, rule_files和scrape_configs三部分需要更新，如下。

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

其中，serverdown.yml 文件需要在prometheus根目录下单独创建，内容如下

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


##### Alerting 配置

首先，需要在alertmanager根目录文件夹下创建 milvus.yml 文件，内容如下

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

启动alertmanager时，需要指定 --config.file=milvus.yml，如下

```
./alertmanager --config.file=milvus.yml
```



##### Grafana 配置

首先启动grafana服务器，登录grafana网页，选择prometheus作为我们的data source type，然后把HTTP下的URL设置成prometheus服务器的URL，默认情况下是：http://localhost:9090，将ACCESS设置成Browser。详细操作步骤如下：

首先我们先选择prometheus作为我们的data source type。

![image-20190620191640605](./Pictures/datasource.png)

然后将HTTP中的URL设置成prometheus的服务器地址，将ACCESS设置成Browser，点击Save & Test。

![image-20190620191702697](./Pictures/settings.png)



下一步我们需要设置面板，点击左上角的 New dashboard。

![image-20190620191721734](./Pictures/dashboard.png)



点击右侧的Import dashboard。

![image-20190620191747161](./Pictures/importdashboard.png)

最后一步，将json配置文件导入系统。json配置文件下载：

![image-20190620191802408](./Pictures/importjson.png)



成功之后，将会展示出我们提供的监控面板

![image-20190620191818161](./Pictures/result.png)





#### API手册

##### Python API Guide

请访问：https://pypi.org/project/pymilvus/



#### 常见问题

- Milvus是什么？

Milvus是一款面向向量检索的数据库系统，可以很好的运行和部署在x86架构的服务器环境和主流的虚拟化环境下，也支持目前主流的网络硬件设备。操作系统方面，Milvus支持目前主流的Linux操作系统环境。

- Milvus能够使用的接口有哪些？

目前Milvus提供Python和C++的SDK接口，同时还支持所有基于Thrift的通信方式。

- Milvus的易用性如何？

Milvus的使用相当简单。可以把Milvus当作普通的数据库系统，参考前文提供的样例程序和https://pypi.org/project/pymilvus/，就可以使用了。

- Milvus具备高可用特性吗？

Milvus集群具备高可用性，其存储和计算等集群均容许部分组件失效，而不影响整个集群的使用

- 向量存入Milvus后，如何检索？

向量存入Milvus后，Milvus会给对应向量一个ID，用户需要自己将该向量ID和其对应的其他属性存入另外一个数据库系统。查询的时候，用户提供需要查询的向量，Milvus会返回和用户提供向量最匹配的数个向量的ID以及匹配度。

* 如何选择向量索引的类型？

依据用户的需求，如果用户需求精确匹配，那么请选择L2Flat类型索引。精确匹配，可以为用户提供100%精确匹配的向量，但是由于计算量巨大，性能影响也很大。如果用户不追求100%精确匹配，可以选择IVFFlat类型索引，支持大数据量的高精度匹配。

- Milvus是否支持边插入边查询的能力？

支持



#### 技术支持

- 有任何问题和建议，请联系邮箱：support@zilliz.com

- 对于有企业合作的用户，请拨打客服电话：400 …..



#### 路线图

- 支持存储结构化数据和非结构化数据，也支持针对结构化和非结构化数据的混合查询。

- 提供基于Java的SDK
- 提供基于图形化和命令行管理工具
- 提供云端的PaaS部署
- 支持强一致性存储
- 提供对于事务的支持
- 提供给定向量ID的检索
- 提供更多种索引类型的支持
- 使用基于ETCD集群的元数据管理