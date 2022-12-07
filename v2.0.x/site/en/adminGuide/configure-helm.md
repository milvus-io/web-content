---
id: configure-helm.md
label: Helm
related_key: configure
summary: Learn how to configure your Milvus with Helm.
---

# Configure Milvus with Helm Charts

This topic describes how to configure your Milvus with Helm charts.

<div class="alert note">
In current release, all parameters take effect only after Milvus restarts.
</div>

## Configure Milvus via configuration file

You can configure Milvus with a configuration file `values.yaml`.

### Download a configuration file

[Download](https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml) `values.yaml` directly or with the following command.

```
$ wget https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml
```

### Modify the configuration file

Configure your Milvus instance to suit your application scenarios by adjusting corresponding parameters in `values.yaml`.

Check the following links for more information about each parameter.

Sorted by:

<div class="filter">
<a href="#component">Components or dependencies</a> <a href="#purpose">Configuration purposes</a> 

</div>

<div class="filter-component table-wrapper">

<table id="component">
<thead>
  <tr>
    <th>Dependencies</th>
    <th>Components</th>
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
    <th>Purpose</th>
    <th>Parameters</th>
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

### Start Milvus

Having finished modifying the configuration file, you can then start Milvus with the file.

```
$ helm upgrade my-release milvus/milvus -f values.yaml
```

## Configure Milvus via command line

Alternatively, you can upgrade Milvus configurations directly with the Helm command.

### Check the configurable parameters

Before upgrade, you can check the configurable parameters with Helm charts.

```
$ helm show values milvus/milvus
```

### Start Milvus

Configure and start Milvus by adding `--values` or `--set` in the command for upgrade.

```
# For instance, upgrade the Milvus cluster with compaction disabled
$ helm upgrade my-release milvus/milvus --set dataCoord.enableCompaction=false
```

## What's next

- If you want to learn how to monitor the Milvus services and create alerts:
  - Learn [Monitor Milvus 2.0 with Prometheus Operator on Kubernetes](monitor.md)
  - Learn [Visualize Milvus Metrics in Grafana](visualize.md).

- If you are looking for instructions on how to allocate resources:
  - [Allocate Resources on Kubernetes](allocate.md#standalone)
