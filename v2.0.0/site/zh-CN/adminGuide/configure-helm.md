---
id: configure-helm.md
label: Helm
related_key: configure
group: configure-docker.md
order: 1
summary: Learn how to configure your Milvus.
---

# Configure Milvus

<div class="alert note">
<h3>Milvus Docs 需要你的帮助</h3>
本文档暂时没有中文版本，欢迎你成为社区贡献者，协助中文技术文档的翻译。<br>
你可以通过页面右边的 <b>编辑</b> 按钮直接贡献你的翻译。更多详情，参考 <a href="https://github.com/milvus-io/milvus-docs/blob/v2.0.0/CONTRIBUTING.md">贡献指南</a>。如需帮助，你可以 <a href="https://github.com/milvus-io/milvus-docs/issues/new/choose">提交 GitHub Issue</a>。
</div>


This topic describes how to configure your Milvus.

<div class="alert note">
In current release, all parameters take effect only after being configured at the startup of Milvus.
</div>

<div class="tab-wrapper"><a href="configure-docker.md" class=''>Docker Compose</a><a href="configure-helm.md" class='active '>Helm</a></div>

## Install Helm Chart for Milvus

Add Milvus Helm repository and update charts locally.

```
$ helm repo add milvus https://milvus-io.github.io/milvus-helm/
$ helm repo update
```

## Check the configurable parameters

You can modify Milvus configurations directly with the Helm installation command. Before installation, you can check the configurable parameters with Helm charts.

```
$ helm show values milvus/milvus
```

Check the following links for more information about each parameter.

Sorted by:

<div class="filter">
<a href="#component">Components or dependencies</a> <a href="#purpose">Configuration purposes</a> 

</div>

<div class="filter-component table-wrapper">

<table id="component">
<thead>
  <tr>
    <th">Dependencies</th>
    <th">Components</th>
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
    <th">Purpose</th>
    <th">Parameters</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Performance tuning</td>
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
    <td>Data and meta</td>
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
    <td>Administration</td>
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

For other parameters specifically to Kubernetes installation, See [Milvus Helm Chart Configuration](https://github.com/milvus-io/milvus-helm/tree/master/charts/milvus#configuration).

## Start Milvus

Configure and start Milvus by adding `--values` or `--set` in the command for installation.

```
# For instance, start a Milvus cluster with compaction disabled
$ helm install my-release milvus/milvus --set dataCoord.enableCompaction=false
```

## What's next

- If you want to learn how to monitor the Milvus services and create alerts:
  - Learn [Monitor Milvus 2.0 with Prometheus Operator on Kubernetes](monitor.md)
  - Learn [Visualize Milvus Metrics in Grafana](visualize.md).

- If you are looking for instructions on how to allocate resources:
  - [Allocate Resources on Kubernetes](allocate.md#standalone)
