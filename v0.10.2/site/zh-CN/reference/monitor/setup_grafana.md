---
id: setup_grafana.md
---


# 使用 Grafana 展示监控指标

## 启动并配置 Grafana


1. 运行 Grafana：

```shell
docker run -i -p 3000:3000 grafana/grafana
```

2. 在浏览器中打开 *http://<提供 Grafana 服务的主机 IP>:3000* 网址，并登录 Grafana 用户交互页面。

  <div class="alert note">
  Grafana 的默认用户名和密码都是 <code>admin</code>。你也可以在此创建新的 Grafana 账号。
  </div>

3. [将 Prometheus 添加为数据源](https://grafana.com/docs/grafana/latest/features/datasources/add-a-data-source/)。

4. 在 Grafana 用户交互页面中，点击 **Configuration > Data Sources > Prometheus**，然后设置以下数据源属性：

   | 名称    | 值                                          |
   | :------ | :------------------------------------------ |
   | Name    | Prometheus                                  |
   | Default | `True`                                        |
   | URL     | *http://<提供 Prometheus 服务的主机 IP>:9090* |
   | Access  | Browser                                     |

5. 下载 [Grafana 配置文件](../../../../assets/monitoring/dashboard.json)。

6. [将配置文件导入 Grafana](http://docs.grafana.org/reference/export_import/#importing-a-dashboard)。

   ![prometheus.png](../../../../assets/prometheus.png)


## 监控指标概述

你可以通过 Milvus 提供的 [Grafana 配置文件](../../../../assets/monitoring/dashboard.json) 配置展示在 Grafana Dashboard 的以下各种指标：


| 指标类型 | 说明                                     |
| -------- | ---------------------------------------- |
| Milvus 性能指标 | 关于 Milvus 性能状况的指标。        |
| 系统运行指标 | CPU/GPU 使用状况，网络、磁盘读取等指标。 |
| 硬件存储指标 | 数据大小，数据文件及存储情况等指标。     |

### Milvus 性能指标

| 指标                      | 说明                                                         |
| ------------------------- | ------------------------------------------------------------ |
| **Insert per Second**     | 每秒钟插入的向量数量（实时显示）。                           |
| **Queries per Minute**    | 每分钟运行的查询数量（实时显示）。                           |
| **Query Time per Vector** | 单条向量查询时间 = 查询使用时间 / 向量数量                   |
| **Query Service Level**   | 查询服务级别 = 一定时间阈值内的查询数量/总查询数量 <br/>一般建议设置 3 个时间阈值来跟踪查询服务级别。 |
| **Uptime**                | Milvus 服务器正常运行的时长（分钟）。                        |

### 系统运行指标

| 指标                  | 说明                                                   |
| --------------------- | ------------------------------------------------------ |
| **GPU Utilization**   | GPU 利用率（%）。                                      |
| **GPU Memory Usage**  | Milvus 当前使用的显存量 （GB）。                       |
| **CPU Utilization**   | CPU 利用率（%）= 服务器任务执行时间 / 服务器总运行时间 |
| **Memory Usage**      | Milvus 当前使用的内存量（GB）。                        |
| **Cache Utilization** | 缓存利用率（%）。                                      |
| **Network IO**        | 网口的读写速度（GB/s）。                               |
| **Disk Read Speed**   | 磁盘读取速度（GB/s）。                                 |
| **Disk Write Speed**  | 磁盘写入速度（GB/s）。                                 |

### 硬件存储指标

| 指标           | 说明                        |
| -------------- | --------------------------- |
| **Data Size**  | Milvus 所存数据总量（GB）。 |
| **Total File** | Milvus 所存数据文件总个数。 |

