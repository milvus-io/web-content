---
id: setup_grafana.md
---


# 使用 Grafana 展示 Milvus 监控指标

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

5. 下载 [Grafana 配置文件](https://github.com/milvus-io/docs/blob/master/v1.1.0/assets/monitoring/dashboard.json)。

6. [将配置文件导入 Grafana](http://docs.grafana.org/reference/export_import/#importing-a-dashboard)。

   ![prometheus.png](../../../../assets/prometheus.png)


## 配置监控指标

你可以通过 Milvus 提供的 [Grafana 配置文件](https://github.com/milvus-io/docs/blob/master/v1.1.0/assets/monitoring/dashboard.json) 配置 Milvus 提供的各项监控指标。详见：[Milvus 监控指标](milvus_metrics.md)。
