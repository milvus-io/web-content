---
id: configure_operator.md
label: Milvus Operator
related_key: Milvus Operator
summary: Learn how to configure Milvus with Milvus Operator.
title: Configure Milvus with Milvus Operator
---

# Configure Milvus with Milvus Operator

In production environment, you need to allocate resources to the Milvus cluster based on machine type and workload. You can configure during deployment or update the configurations while the cluster is running.

This topic introduces how to configure a Milvus cluster when you install it with Milvus Operator.

This topic assumes that you have deployed Milvus Operator. See [Deploy Milvus Operator](install_cluster-milvusoperator.md) for more information.

Configuring a Milvus cluster with Milvus Operator includes:
- Global resource configurations
- Private resource configurations

<div class="alert note">
Private resource configurations will overwrite global resource configurations. If you configure the resources globally and specify the private resource of a certain component at the same time, the component will prioritize and respond to the private configurations first.
</div>

## Configure global resources

When using Milvus Operator to start a Milvus cluster, you need to specify a configuration file. The example here uses the default configuration file.

```yaml
kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml
```

The details of the configuration file is as follows:

```yaml
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  mode: cluster
  dependencies: {}
  components: {}
  config: {}
```

The field `spec.components` includes both the global and private resource configuration of all Milvus components. The following are four commonly used fields to configure global resource. 
- `image`: The Milvus docker image used.
- `resources`: The compute resources allocated to each component.
- `tolerations` and `nodeSelector`: The scheduling rules of each Milvus component in the K8s cluster. See [tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/) and [nodeSelector](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/) for more information.
- `env`: The environment variables. 

If you want to configure more fields, see documentation [here](https://pkg.go.dev/github.com/zilliztech/milvus-operator/apis/milvus.io/v1beta1#ComponentSpec).

To configure global resource for Milvus cluster, create a `milvuscluster_resource.yaml` file. 

### Example

The following example configures global resource for a Milvus cluster.

```
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  mode: cluster
  components:
    image: milvusdb/milvus:v2.1.0
    nodeSelector: {}
    tolerations: {}
    env: {}
    resources:
      limits:
        cpu: '4'
        memory: 8Gi
      requests:
        cpu: 200m
        memory: 512Mi
```

Run the following command to apply new configurations:

```
kubectl apply -f milvuscluster_resource.yaml
```

<div class="alert note">
Cluster resources will be updated according to the configuration file if there is a Milvus cluster named <code>my-release</code> in the K8s cluster. Otherwise, a new Milvus cluster will be created.
</div>

## Configure private resources

Originally in Milvus 2.0, a Milvus cluster includes seven components: proxy, root coord, data coord, query coord, index node, data node, and query node. However, a new component, mix coord, is released along with Milvus 2.1.0. Mix coord includes all coordinator components. Therefore, starting a mix coord means that you do not need to install and start other coordinators including root coord, data coord, and query coord.

Common fields used to configure each component include:
- `replica`: The number of replicas of each component.
- `port`: The listen port number of each component.
- The four commonly used fields in global resource configuration: `image`, `env`, `nodeSelector`, `tolerations`, `resources` (see above). For more configurable fields, click on each component in [this documentation](https://pkg.go.dev/github.com/zilliztech/milvus-operator/apis/milvus.io/v1beta1#MilvusComponents).

<div class="alert note">
In addition, when configuring proxy, there is an extra field called `serviceType`. This field defines the type of service Milvus provides in the K8s cluster.
</div>

To configure resources for a specific component, add the component name in the field under `spec.componets` first and then configure its private resources.

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
            <li><a href="configure_indexnode.md">Index node</a></li>
            <li><a href="configure_datacoord.md">Data coord</a></li>
            <li><a href="configure_datanode.md">Data node</a></li>
            <li><a href="configure_localstorage.md">Local storage</a></li>
            <li><a href="configure_log.md">Log</a></li>
            <li><a href="configure_messagechannel.md">Message channel</a></li>
            <li><a href="configure_common.md">Common</a></li>
            <li><a href="configure_knowhere.md">Knowhere</a></li>
            <li><a href="configure_quota_limits.md">Quota and Limits</a></li>
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
            <li><a href="configure_querynode.md#queryNodegracefulTime"><code>queryNode.gracefulTime</code></a></li>
            <li><a href="configure_rootcoord.md#rootCoordminSegmentSizeToEnableIndex"><code>rootCoord.minSegmentSizeToEnableIndex</code></a></li>
            <li><a href="configure_datacoord.md#dataCoordsegmentmaxSize"><code>dataCoord.segment.maxSize</code></a></li>
            <li><a href="configure_datacoord.md#dataCoordsegmentsealProportion"><code>dataCoord.segment.sealProportion</code></a></li>
            <li><a href="configure_datanode.md#dataNodeflushinsertBufSize"><code>dataNode.flush.insertBufSize</code></a></li>
            <li><a href="configure_querycoord.md#queryCoordautoHandoff"><code>queryCoord.autoHandoff</code></a></li>
            <li><a href="configure_querycoord.md#queryCoordautoBalance"><code>queryCoord.autoBalance</code></a></li>
            <li><a href="configure_localstorage.md#localStorageenabled"><code>localStorage.enabled</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Data and meta</td>
    <td>
        <ul>
            <li><a href="configure_common.md#commonretentionDuration"><code>common.retentionDuration</code></a></li>
            <li><a href="configure_rocksmq.md#rocksmqretentionTimeInMinutes"><code>rocksmq.retentionTimeInMinutes</code></a></li>
            <li><a href="configure_datacoord.md#dataCoordenableCompaction"><code>dataCoord.enableCompaction</code></a></li>
            <li><a href="configure_datacoord.md#dataCoordenableGarbageCollection"><code>dataCoord.enableGarbageCollection</code></a></li>
            <li><a href="configure_datacoord.md#dataCoordgcdropTolerance"><code>dataCoord.gc.dropTolerance</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Administration</td>
    <td>
        <ul>
            <li><a href="configure_log.md#loglevel"><code>log.level</code></a></li>
            <li><a href="configure_log.md#logfilerootPath"><code>log.file.rootPath</code></a></li>
            <li><a href="configure_log.md#logfilemaxAge"><code>log.file.maxAge</code></a></li>
            <li><a href="configure_minio.md#minioaccessKeyID"><code>minio.accessKeyID</code></a></li>
            <li><a href="configure_minio.md#miniosecretAccessKey"><code>minio.secretAccessKey</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Quota and Limits</td>
    <td>
        <ul>
            <li><a href="configure_quota_limits.md#quotaAndLimitslimitsmaxCollectionNumPerDB"><code>quotaAndLimits.limits.maxCollectionNumPerDB</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitsddlenabled"><code>quotaAndLimits.ddl.enabled</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitsddlcollectionRate"><code>quotaAndLimits.ddl.collectionRate</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitsddlpartitionRate"><code>quotaAndLimits.ddl.partitionRate</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitsindexRateenabled"><code>quotaAndLimits.indexRate.enabled</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitsindexRatemax"><code>quotaAndLimits.indexRate.max</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitsflushRateenabled"><code>quotaAndLimits.flushRate.enabled</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitsflushmax"><code>quotaAndLimits.flush.max</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitscompationenabled"><code>quotaAndLimits.compation.enabled</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitscompactionmax"><code>quotaAndLimits.compaction.max</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitsdmlenabled"><code>quotaAndLimits.dml.enabled</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitsdmlinsertRatemax"><code>quotaAndLimits.dml.insertRate.max</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitsdmlinsertRatecollectionmax"><code>quotaAndLimits.dml.insertRate.collection.max</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitsdmldeleteRatemax"><code>quotaAndLimits.dml.deleteRate.max</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitsdmldeleteRatecollectionmax"><code>quotaAndLimits.dml.deleteRate.collection.max</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitsdqlenabled"><code>quotaAndLimits.dql.enabled</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitsdqlsearchRatemax"><code>quotaAndLimits.dql.searchRate.max</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitsdqlsearchRatecollectionmax"><code>quotaAndLimits.dql.searchRate.collection.max</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitsdqlqueryRatemax"><code>quotaAndLimits.dql.queryRate.max</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitsdqlqueryRatecollectionmax"><code>quotaAndLimits.dql.queryRate.collection.max</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitslimitWritingttProtectionenabled"><code>quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code>quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code>quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code>quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code>quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code>quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code>quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code>quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code>quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuotaPerCollection"><code>quotaAndLimits.limitWriting.diskProtection.diskQuotaPerCollection</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitslimitWritingforceDeny"><code>quotaAndLimits.limitWriting.forceDeny</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitslimitReadingqueueProtectionenabled"><code>quotaAndLimits.limitReading.queueProtection.enabled</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitslimitReadingqueueProtectionnqInQueueThreshold"><code>quotaAndLimits.limitReading.queueProtection.nqInQueueThreshold</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitslimitReadingqueueProtectionqueueLatencyThreshold"><code>quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitslimitReadingresultProtectionenabled"><code>quotaAndLimits.limitReading.resultProtection.enabled</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitslimitReadingresultProtectionmaxReadResultRate"><code>quotaAndLimits.limitReading.resultProtection.maxReadResultRate</code></a></li>
            <li><a href="configure_quota_limits.md#quotaAndLimitslimitReadingforceDeny"><code>quotaAndLimits.limitReading.forceDeny</code></a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>

</div>

### Example

The example below configures the replicas and compute resources of proxy and datanode in the `milvuscluster.yaml` file.

```
apiVersion: milvus.io/v1beta1
kind: Milvus
metadata:
  name: my-release
  labels:
    app: milvus
spec:
  mode: cluster
  components:
    image: milvusdb/milvus:v2.1.0
    resources:
      limits:
        cpu: '4'
        memory: 8Gi
      requests:
        cpu: 200m
        memory: 512Mi
    rootCoord: 
      replicas: 1
      port: 8080
      resources:
        limits:
          cpu: '6'
          memory: '10Gi'
    dataCoord: {}
    queryCoord: {}
    indexCoord: {}
    dataNode: {}
    indexNode: {}
    queryNode: {}
    proxy:
      replicas: 1
      serviceType: ClusterIP
      resources:
        limits:
          cpu: '2'
          memory: 4Gi
        requests:
          cpu: 100m
          memory: 128Mi
  config: {}
  dependencies: {}
```

<div class="alert note">
This example configures not only global resources but also private compute resources for root coord and proxy. When using this configuration file to start a Milvus cluster, the private resources configurations will be applied to root coord and proxy, while the rest of the components will follow the global resource configuration.
</div>

Run the following command to apply new configurations:

```
kubectl apply -f milvuscluster.yaml
```


## What's next

- Learn how to manage the following Milvus dependencies with Milvus Operator:
  - [Configure Object Storage with Milvus Operator](object_storage_operator.md)
  - [Configure Meta Storage with Milvus Operator](meta_storage_operator.md)
  - [Configure Message Storage with Milvus Operator](message_storage_operator.md)




