---
id: configure_operator.md
label: Milvus Operator
related_key: Milvus Operator
summary: Learn how to configure Milvus with Milvus Operator.
title: Configure Milvus with Milvus Operator
---
<h1 id="Configure-Milvus-with-Milvus-Operator" class="common-anchor-header">Configure Milvus with Milvus Operator<button data-href="#Configure-Milvus-with-Milvus-Operator" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h1><p>In production environment, you need to allocate resources to the Milvus cluster based on machine type and workload. You can configure during deployment or update the configurations while the cluster is running.</p>
<p>This topic introduces how to configure a Milvus cluster when you install it with Milvus Operator.</p>
<p>This topic assumes that you have deployed Milvus Operator. See <a href="/docs/v2.4.x/install_cluster-milvusoperator.md">Deploy Milvus Operator</a> for more information.</p>
<p>Configuring a Milvus cluster with Milvus Operator includes:</p>
<ul>
<li>Global resource configurations</li>
<li>Private resource configurations</li>
</ul>
<div class="alert note">
Private resource configurations will overwrite global resource configurations. If you configure the resources globally and specify the private resource of a certain component at the same time, the component will prioritize and respond to the private configurations first.
</div>
<h2 id="Configure-global-resources" class="common-anchor-header">Configure global resources<button data-href="#Configure-global-resources" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>When using Milvus Operator to start a Milvus cluster, you need to specify a configuration file. The example here uses the default configuration file.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">kubectl</span> <span class="hljs-string">apply</span> <span class="hljs-string">-f</span> <span class="hljs-string">https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_default.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>The details of the configuration file is as follows:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">cluster</span>
  <span class="hljs-attr">dependencies:</span> {}
  <span class="hljs-attr">components:</span> {}
  <span class="hljs-attr">config:</span> {}
<button class="copy-code-btn"></button></code></pre>
<p>The field <code translate="no">spec.components</code> includes both the global and private resource configuration of all Milvus components. The following are four commonly used fields to configure global resource.</p>
<ul>
<li><code translate="no">image</code>: The Milvus docker image used.</li>
<li><code translate="no">resources</code>: The compute resources allocated to each component.</li>
<li><code translate="no">tolerations</code> and <code translate="no">nodeSelector</code>: The scheduling rules of each Milvus component in the K8s cluster. See <a href="https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/">tolerations</a> and <a href="https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/">nodeSelector</a> for more information.</li>
<li><code translate="no">env</code>: The environment variables.</li>
</ul>
<p>If you want to configure more fields, see documentation <a href="https://pkg.go.dev/github.com/zilliztech/milvus-operator/apis/milvus.io/v1beta1#ComponentSpec">here</a>.</p>
<p>To configure global resource for Milvus cluster, create a <code translate="no">milvuscluster_resource.yaml</code> file.</p>
<h3 id="Example" class="common-anchor-header">Example</h3><p>The following example configures global resource for a Milvus cluster.</p>
<pre><code translate="no"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">cluster</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">nodeSelector:</span> {}
    <span class="hljs-attr">tolerations:</span> {}
    <span class="hljs-attr">env:</span> {}
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">limits:</span>
        <span class="hljs-attr">cpu:</span> <span class="hljs-string">&#x27;4&#x27;</span>
        <span class="hljs-attr">memory:</span> <span class="hljs-string">8Gi</span>
      <span class="hljs-attr">requests:</span>
        <span class="hljs-attr">cpu:</span> <span class="hljs-string">200m</span>
        <span class="hljs-attr">memory:</span> <span class="hljs-string">512Mi</span>
<button class="copy-code-btn"></button></code></pre>
<p>Run the following command to apply new configurations:</p>
<pre><code translate="no"><span class="hljs-attribute">kubectl</span> apply -f milvuscluster_resource.yaml
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
Cluster resources will be updated according to the configuration file if there is a Milvus cluster named <code translate="no">my-release</code> in the K8s cluster. Otherwise, a new Milvus cluster will be created.
</div>
<h2 id="Configure-private-resources" class="common-anchor-header">Configure private resources<button data-href="#Configure-private-resources" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><p>Originally in Milvus 2.0, a Milvus cluster includes seven components: proxy, root coord, data coord, query coord, index node, data node, and query node. However, a new component, mix coord, is released along with Milvus 2.1.0. Mix coord includes all coordinator components. Therefore, starting a mix coord means that you do not need to install and start other coordinators including root coord, data coord, and query coord.</p>
<p>Common fields used to configure each component include:</p>
<ul>
<li><code translate="no">replica</code>: The number of replicas of each component.</li>
<li><code translate="no">port</code>: The listen port number of each component.</li>
<li>The four commonly used fields in global resource configuration: <code translate="no">image</code>, <code translate="no">env</code>, <code translate="no">nodeSelector</code>, <code translate="no">tolerations</code>, <code translate="no">resources</code> (see above). For more configurable fields, click on each component in <a href="https://pkg.go.dev/github.com/zilliztech/milvus-operator/apis/milvus.io/v1beta1#MilvusComponents">this documentation</a>.</li>
</ul>
<div class="alert note">
In addition, when configuring proxy, there is an extra field called `serviceType`. This field defines the type of service Milvus provides in the K8s cluster.
</div>
<p>To configure resources for a specific component, add the component name in the field under <code translate="no">spec.componets</code> first and then configure its private resources.</p>
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
            <li><a href="/docs/v2.4.x/configure_etcd.md">etcd</a></li>
            <li><a href="/docs/v2.4.x/configure_minio.md">MinIO or S3</a></li>
            <li><a href="/docs/v2.4.x/configure_pulsar.md">Pulsar</a></li>
            <li><a href="/docs/v2.4.x/configure_rocksmq.md">RocksMQ</a></li>
        </ul>
    </td>
    <td>
        <ul>
            <li><a href="/docs/v2.4.x/configure_rootcoord.md">Root coord</a></li>
            <li><a href="/docs/v2.4.x/configure_proxy.md">Proxy</a></li>
            <li><a href="/docs/v2.4.x/configure_querycoord.md">Query coord</a></li>
            <li><a href="/docs/v2.4.x/configure_querynode.md">Query node</a></li>
            <li><a href="/docs/v2.4.x/configure_indexnode.md">Index node</a></li>
            <li><a href="/docs/v2.4.x/configure_datacoord.md">Data coord</a></li>
            <li><a href="/docs/v2.4.x/configure_datanode.md">Data node</a></li>
            <li><a href="/docs/v2.4.x/configure_localstorage.md">Local storage</a></li>
            <li><a href="/docs/v2.4.x/configure_log.md">Log</a></li>
            <li><a href="/docs/v2.4.x/configure_msgchannel.md">Message channel</a></li>
            <li><a href="/docs/v2.4.x/configure_common.md">Common</a></li>
            <li><a href="/docs/v2.4.x/configure_gpu.md">GPU</a></li>
            <li><a href="/docs/v2.4.x/configure_grpc.md">GRPC</a></li>
            <li><a href="/docs/v2.4.x/configure_indexcoord.md">Index coord</a></li>
            <li><a href="/docs/v2.4.x/configure_metastore.md">Metastore</a></li>
            <li><a href="/docs/v2.4.x/configure_mq.md">Message Queue</a></li>
            <li><a href="/docs/v2.4.x/configure_natsmq.md">Natsmq</a></li>
            <li><a href="/docs/v2.4.x/configure_tikv.md">Tikv</a></li>
            <li><a href="/docs/v2.4.x/configure_trace.md">Trace</a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md">Quota and Limits</a></li>
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
            <li><a href="/docs/v2.4.x/configure_querynode.md#queryNodegracefulTime"><code translate="no">queryNode.gracefulTime</code></a></li>
            <li><a href="/docs/v2.4.x/configure_rootcoord.md#rootCoordminSegmentSizeToEnableIndex"><code translate="no">rootCoord.minSegmentSizeToEnableIndex</code></a></li>
            <li><a href="/docs/v2.4.x/configure_datacoord.md#dataCoordsegmentmaxSize"><code translate="no">dataCoord.segment.maxSize</code></a></li>
            <li><a href="/docs/v2.4.x/configure_datacoord.md#dataCoordsegmentsealProportion"><code translate="no">dataCoord.segment.sealProportion</code></a></li>
            <li><a href="/docs/v2.4.x/configure_datanode.md#dataNodeflushinsertBufSize"><code translate="no">dataNode.flush.insertBufSize</code></a></li>
            <li><a href="/docs/v2.4.x/configure_querycoord.md#queryCoordautoHandoff"><code translate="no">queryCoord.autoHandoff</code></a></li>
            <li><a href="/docs/v2.4.x/configure_querycoord.md#queryCoordautoBalance"><code translate="no">queryCoord.autoBalance</code></a></li>
            <li><a href="/docs/v2.4.x/configure_localstorage.md#localStorageenabled"><code translate="no">localStorage.enabled</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Data and meta</td>
    <td>
        <ul>
            <li><a href="/docs/v2.4.x/configure_common.md#commonretentionDuration"><code translate="no">common.retentionDuration</code></a></li>
            <li><a href="/docs/v2.4.x/configure_rocksmq.md#rocksmqretentionTimeInMinutes"><code translate="no">rocksmq.retentionTimeInMinutes</code></a></li>
            <li><a href="/docs/v2.4.x/configure_datacoord.md#dataCoordenableCompaction"><code translate="no">dataCoord.enableCompaction</code></a></li>
            <li><a href="/docs/v2.4.x/configure_datacoord.md#dataCoordenableGarbageCollection"><code translate="no">dataCoord.enableGarbageCollection</code></a></li>
            <li><a href="/docs/v2.4.x/configure_datacoord.md#dataCoordgcdropTolerance"><code translate="no">dataCoord.gc.dropTolerance</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Administration</td>
    <td>
        <ul>
            <li><a href="/docs/v2.4.x/configure_log.md#loglevel"><code translate="no">log.level</code></a></li>
            <li><a href="/docs/v2.4.x/configure_log.md#logfilerootPath"><code translate="no">log.file.rootPath</code></a></li>
            <li><a href="/docs/v2.4.x/configure_log.md#logfilemaxAge"><code translate="no">log.file.maxAge</code></a></li>
            <li><a href="/docs/v2.4.x/configure_minio.md#minioaccessKeyID"><code translate="no">minio.accessKeyID</code></a></li>
            <li><a href="/docs/v2.4.x/configure_minio.md#miniosecretAccessKey"><code translate="no">minio.secretAccessKey</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>Quota and Limits</td>
    <td>
        <ul>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitsmaxCollectionNumPerDB"><code translate="no">quotaAndLimits.limits.maxCollectionNumPerDB</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsddlenabled"><code translate="no">quotaAndLimits.ddl.enabled</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsddlcollectionRate"><code translate="no">quotaAndLimits.ddl.collectionRate</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsddlpartitionRate"><code translate="no">quotaAndLimits.ddl.partitionRate</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsindexRateenabled"><code translate="no">quotaAndLimits.indexRate.enabled</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsindexRatemax"><code translate="no">quotaAndLimits.indexRate.max</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsflushRateenabled"><code translate="no">quotaAndLimits.flushRate.enabled</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsflushmax"><code translate="no">quotaAndLimits.flush.max</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitscompationenabled"><code translate="no">quotaAndLimits.compation.enabled</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitscompactionmax"><code translate="no">quotaAndLimits.compaction.max</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmlenabled"><code translate="no">quotaAndLimits.dml.enabled</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatemax"><code translate="no">quotaAndLimits.dml.insertRate.max</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatecollectionmax"><code translate="no">quotaAndLimits.dml.insertRate.collection.max</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatemax"><code translate="no">quotaAndLimits.dml.deleteRate.max</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatecollectionmax"><code translate="no">quotaAndLimits.dml.deleteRate.collection.max</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlenabled"><code translate="no">quotaAndLimits.dql.enabled</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatemax"><code translate="no">quotaAndLimits.dql.searchRate.max</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatecollectionmax"><code translate="no">quotaAndLimits.dql.searchRate.collection.max</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatemax"><code translate="no">quotaAndLimits.dql.queryRate.max</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatecollectionmax"><code translate="no">quotaAndLimits.dql.queryRate.collection.max</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code translate="no">quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuotaPerCollection"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuotaPerCollection</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingforceDeny"><code translate="no">quotaAndLimits.limitWriting.forceDeny</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionenabled"><code translate="no">quotaAndLimits.limitReading.queueProtection.enabled</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionnqInQueueThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.nqInQueueThreshold</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionqueueLatencyThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingresultProtectionenabled"><code translate="no">quotaAndLimits.limitReading.resultProtection.enabled</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingresultProtectionmaxReadResultRate"><code translate="no">quotaAndLimits.limitReading.resultProtection.maxReadResultRate</code></a></li>
            <li><a href="/docs/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingforceDeny"><code translate="no">quotaAndLimits.limitReading.forceDeny</code></a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<h3 id="Example" class="common-anchor-header">Example</h3><p>The example below configures the replicas and compute resources of proxy and datanode in the <code translate="no">milvuscluster.yaml</code> file.</p>
<pre><code translate="no"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">milvus.io/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Milvus</span>
<span class="hljs-attr">metadata:</span>
  <span class="hljs-attr">name:</span> <span class="hljs-string">my-release</span>
  <span class="hljs-attr">labels:</span>
    <span class="hljs-attr">app:</span> <span class="hljs-string">milvus</span>
<span class="hljs-attr">spec:</span>
  <span class="hljs-attr">mode:</span> <span class="hljs-string">cluster</span>
  <span class="hljs-attr">components:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">limits:</span>
        <span class="hljs-attr">cpu:</span> <span class="hljs-string">&#x27;4&#x27;</span>
        <span class="hljs-attr">memory:</span> <span class="hljs-string">8Gi</span>
      <span class="hljs-attr">requests:</span>
        <span class="hljs-attr">cpu:</span> <span class="hljs-string">200m</span>
        <span class="hljs-attr">memory:</span> <span class="hljs-string">512Mi</span>
    <span class="hljs-attr">rootCoord:</span> 
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">1</span>
      <span class="hljs-attr">port:</span> <span class="hljs-number">8080</span>
      <span class="hljs-attr">resources:</span>
        <span class="hljs-attr">limits:</span>
          <span class="hljs-attr">cpu:</span> <span class="hljs-string">&#x27;6&#x27;</span>
          <span class="hljs-attr">memory:</span> <span class="hljs-string">&#x27;10Gi&#x27;</span>
    <span class="hljs-attr">dataCoord:</span> {}
    <span class="hljs-attr">queryCoord:</span> {}
    <span class="hljs-attr">indexCoord:</span> {}
    <span class="hljs-attr">dataNode:</span> {}
    <span class="hljs-attr">indexNode:</span> {}
    <span class="hljs-attr">queryNode:</span> {}
    <span class="hljs-attr">proxy:</span>
      <span class="hljs-attr">replicas:</span> <span class="hljs-number">1</span>
      <span class="hljs-attr">serviceType:</span> <span class="hljs-string">ClusterIP</span>
      <span class="hljs-attr">resources:</span>
        <span class="hljs-attr">limits:</span>
          <span class="hljs-attr">cpu:</span> <span class="hljs-string">&#x27;2&#x27;</span>
          <span class="hljs-attr">memory:</span> <span class="hljs-string">4Gi</span>
        <span class="hljs-attr">requests:</span>
          <span class="hljs-attr">cpu:</span> <span class="hljs-string">100m</span>
          <span class="hljs-attr">memory:</span> <span class="hljs-string">128Mi</span>
  <span class="hljs-attr">config:</span> {}
  <span class="hljs-attr">dependencies:</span> {}
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
This example configures not only global resources but also private compute resources for root coord and proxy. When using this configuration file to start a Milvus cluster, the private resources configurations will be applied to root coord and proxy, while the rest of the components will follow the global resource configuration.
</div>
<p>Run the following command to apply new configurations:</p>
<pre><code translate="no"><span class="hljs-attribute">kubectl</span> apply -f milvuscluster.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
      <svg translate="no"
        aria-hidden="true"
        focusable="false"
        height="20"
        version="1.1"
        viewBox="0 0 16 16"
        width="16"
      >
        <path
          fill="#0092E4"
          fill-rule="evenodd"
          d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
        ></path>
      </svg>
    </button></h2><ul>
<li>Learn how to manage the following Milvus dependencies with Milvus Operator:
<ul>
<li><a href="/docs/v2.4.x/object_storage_operator.md">Configure Object Storage with Milvus Operator</a></li>
<li><a href="/docs/v2.4.x/meta_storage_operator.md">Configure Meta Storage with Milvus Operator</a></li>
<li><a href="/docs/v2.4.x/message_storage_operator.md">Configure Message Storage with Milvus Operator</a></li>
</ul></li>
</ul>
