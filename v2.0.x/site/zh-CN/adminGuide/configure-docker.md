---
id: configure-docker.md
label: Docker Compose
related_key: configure
group: configure-docker.md
order: 0
summary: Learn how to configure your Milvus.
---

# 配置 Milvus



当前主题介绍如何配置 Milvus。

<div class="alert note">
在当前版本中，所有参数只有在 Milvus 启动时配置后才会生效。
</div>

<div class="tab-wrapper"><a href="configure-docker.md" class='active '>Docker Compose</a><a href="configure-helm.md" class=''>Helm</a></div>

## 下载配置文件

直接[下载](https://raw.githubusercontent.com/milvus-io/milvus/v2.0.1/configs/milvus.yaml) `milvus.yaml` 或者使用以下命令。

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus/v2.0.1/configs/milvus.yaml
```

## 修改配置文件

通过修改 `milvus.yaml` 中的相应参数，配置 Milvus 实例以适应你的应用场景。

有关每个参数的更多信息，请查看以下链接。

排序：

<div class="filter">
<a href="#component">组件或依赖</a> <a href="#purpose">配置目的</a> 

</div>

<div class="filter-component table-wrapper">

<table id="component">
<thead>
  <tr>
    <th>依赖</th>
    <th>组件</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
        <ul>
            <li><a href="configure_etcd.md">etcd</a></li>
            <li><a href="configure_minio.md">MinIO or S3</a></li>
            <li><a href="configure_pulsar.md">Pulsar</a></li>
            <li><a href="configure_rocksmq.md">RocksMQ</a></li>
        </ul>
    </td>
    <td>
        <ul>
            <li><a href="configure_rootcoord.md">Root coord</a></li>
            <li><a href="configure_proxy.md">Proxy</a></li>
            <li><a href="configure_querycoord.md">Query coord</a></li>
            <li><a href="configure_querynode.md">Query node</a></li>
            <li><a href="configure_indexcoord.md">Index coord</a></li>
            <li><a href="configure_indexnode.md">Index node</a></li>
            <li><a href="configure_datacoord.md">Data coord</a></li>
            <li><a href="configure_datanode.md">Data node</a></li>
            <li><a href="configure_localstorage.md">Local storage</a></li>
            <li><a href="configure_log.md">Log</a></li>
            <li><a href="configure_messagechannel.md">Message channel</a></li>
            <li><a href="configure_common.md">Common</a></li>
            <li><a href="configure_knowhere.md">Knowhere</a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>

</div>

<div class="filter-purpose table-wrapper">

<table id="purpose">
<thead>
  <tr>
    <th>目的</th>
    <th>参数</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>性能调优</td>
    <td>
        <ul>
            <li><a href="configure_querynode.md#queryNode.gracefulTime"><code>queryNode.gracefulTime</code></a></li>
            <li><a href="configure_rootcoord.md#rootCoord.minSegmentSizeToEnableIndex"><code>rootCoord.minSegmentSizeToEnableIndex</code></a></li>
            <li><a href="configure_datacoord.md#dataCoord.segment.maxSize"><code>dataCoord.segment.maxSize</code></a></li>
            <li><a href="configure_datacoord.md#dataCoord.segment.sealProportion"><code>dataCoord.segment.sealProportion</code></a></li>
            <li><a href="configure_datanode.md#dataNode.flush.insertBufSize"><code>dataNode.flush.insertBufSize</code></a></li>
            <li><a href="configure_querycoord.md#queryCoord.autoHandoff"><code>queryCoord.autoHandoff</code></a></li>
            <li><a href="configure_querycoord.md#queryCoord.autoBalance"><code>queryCoord.autoBalance</code></a></li>
            <li><a href="configure_localstorage.md#localStorage.enabled"><code>localStorage.enabled</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>数据和元数据</td>
    <td>
        <ul>
            <li><a href="configure_common.md#common.retentionDuration"><code>common.retentionDuration</code></a></li>
            <li><a href="configure_rocksmq.md#rocksmq.retentionTimeInMinutes"><code>rocksmq.retentionTimeInMinutes</code></a></li>
            <li><a href="configure_datacoord.md#dataCoord.enableCompaction"><code>dataCoord.enableCompaction</code></a></li>
            <li><a href="configure_datacoord.md#dataCoord.enableGarbageCollection"><code>dataCoord.enableGarbageCollection</code></a></li>
            <li><a href="configure_datacoord.md#dataCoord.gc.dropTolerance"><code>dataCoord.gc.dropTolerance</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>集群管理</td>
    <td>
        <ul>
            <li><a href="configure_log.md#log.level"><code>log.level</code></a></li>
            <li><a href="configure_log.md#log.file.rootPath"><code>log.file.rootPath</code></a></li>
            <li><a href="configure_log.md#log.file.maxAge"><code>log.file.maxAge</code></a></li>
            <li><a href="configure_minio.md#minio.accessKeyID"><code>minio.accessKeyID</code></a></li>
            <li><a href="configure_minio.md#minio.secretAccessKey"><code>minio.secretAccessKey</code></a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>

</div>

## 下载安装文件

下载 Milvus [单机版](https://github.com/milvus-io/milvus/releases/download/v2.0.1/milvus-standalone-docker-compose.yml) 或[分布式版](https://github.com/milvus-io/milvus/releases/download/v2.0.1/milvus-cluster-docker-compose.yml) 的安装文件，并保存为 `docker-compose.yml`。

你也可以简单地运行以下命令。

```
# For Milvus standalone
$ wget https://github.com/milvus-io/milvus/releases/download/v2.0.1/milvus-standalone-docker-compose.yml -O docker-compose.yml
```

```
# For Milvus cluster
$ wget https://github.com/milvus-io/milvus/releases/download/v2.0.1/milvus-cluster-docker-compose.yml -O docker-compose.yml
```

## 修改安装文件

在 `docker-compose.yml` 中，在每个 Milvus 组件下添加 `volumes` 部分，即 root coord, data coord, data node, query coord, query node, index coord, index node 和 proxy。

将你的 `milvus.yaml` 文件的本地路径映射到所有 `volumes` 部分下的配置文件 `/milvus/configs/milvus.yaml` 的相应 docker 容器路径。

```yaml
...
proxy:
    container_name: milvus-proxy
    image: milvusdb/milvus:v2.0.0-rc7-20211011-d567b21
    command: ["milvus", "run", "proxy"]
    volumes:       # Add a volumes section.
      - /local/path/to/your/milvus.yaml:/milvus/configs/milvus.yaml   # Map the local path to the container path
    environment:
      ETCD_ENDPOINTS: etcd:2379
      MINIO_ADDRESS: minio:9000
      PULSAR_ADDRESS: pulsar://pulsar:6650
    ports:
      - "19530:19530"
...
```

<div class="alert note">
根据 <code>docker-compose.yml</code> 中的默认配置，数据存储在 <code>/volumes</code> 目录中。要更改目录以存储数据，请编辑 <code>docker-compose.yml</code> 或者运行 <code>$ export DOCKER_VOLUME_DIRECTORY=</code>。
</div>

## 启动 Milvus

修改完配置文件和安装文件后，即可启动 Milvus。

```
$ sudo docker-compose up -d
```

## 更多内容

- 如果你想了解如何监控 Milvus 服务并创建警报：
  - Learn [Monitor Milvus 2.0 with Prometheus Operator on Kubernetes](monitor.md)
  - Learn [Visualize Milvus Metrics in Grafana](visualize.md).

