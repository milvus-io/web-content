---
id: configure-helm.md
label: Helm
related_key: configure
summary: 用舵手图配置 Milvus。
title: 使用舵手图配置 Milvus
---
<h1 id="Configure-Milvus-with-Helm-Charts" class="common-anchor-header">使用 Helm 图表配置 Milvus<button data-href="#Configure-Milvus-with-Helm-Charts" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题介绍如何使用 Helm Charts 配置 Milvus 组件及其第三方依赖项。</p>
<div class="alert note">
在当前版本中，所有参数仅在 Milvus 重新启动后生效。</div>
<h2 id="Configure-Milvus-via-configuration-file" class="common-anchor-header">通过配置文件配置 Milvus<button data-href="#Configure-Milvus-via-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以通过配置文件<code translate="no">values.yaml</code> 配置 Milvus。</p>
<h3 id="Download-a-configuration-file" class="common-anchor-header">下载配置文件</h3><p>直接或使用以下命令<a href="https://raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml">下载</a> <code translate="no">values.yaml</code> 。</p>
<pre><code translate="no">$ wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/milvus-io/milvus-helm/master/charts/milvus/values.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Modify-the-configuration-file" class="common-anchor-header">修改配置文件</h3><p>通过调整<code translate="no">values.yaml</code> 中的相应参数，配置 Milvus 实例，以适应应用场景。</p>
<p>具体来说，在<code translate="no">values.yaml</code> 中搜索<code translate="no">extraConfigFiles</code> ，然后将配置文件放入该部分，如下所示：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Extra configs for milvus.yaml</span>
<span class="hljs-comment"># If set, this config will merge into milvus.yaml</span>
<span class="hljs-comment"># Please follow the config structure in the milvus.yaml</span>
<span class="hljs-comment"># at https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml</span>
<span class="hljs-comment"># Note: this config will be the top priority which will override the config</span>
<span class="hljs-comment"># in the image and helm chart.</span>
extraConfigFiles:
  user.yaml: |+
    <span class="hljs-comment">#    For example to set the graceful time for query nodes</span>
    <span class="hljs-comment">#    queryNodes:</span>
    <span class="hljs-comment">#      gracefulTime: 10</span>
<button class="copy-code-btn"></button></code></pre>
<p>查看以下链接，了解有关各参数的更多信息。</p>
<p>排序方式</p>
<div class="filter">
<a href="#component">组件或依赖项</a> <a href="#purpose">配置目的</a></div>
<div class="filter-component table-wrapper">
<table id="component">
<thead>
  <tr>
    <th>依赖项</th>
    <th>组件</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
        <ul>
            <li><a href="/docs/zh/v2.4.x/configure_etcd.md">etcd</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_minio.md">MinIO 或 S3</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_pulsar.md">脉冲星</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_rocksmq.md">RocksMQ</a></li>
        </ul>
    </td>
    <td>
        <ul>
            <li><a href="/docs/zh/v2.4.x/configure_rootcoord.md">根协调</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_proxy.md">代理</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_querycoord.md">查询坐标</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_querynode.md">查询节点</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_indexnode.md">索引节点</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_datacoord.md">数据坐标</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_datanode.md">数据节点</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_localstorage.md">本地存储</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_log.md">日志</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_msgchannel.md">信息通道</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_common.md">通用</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_gpu.md">图形处理器</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_grpc.md">GRPC</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_indexcoord.md">索引坐标</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_metastore.md">元存储</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_mq.md">消息队列</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_natsmq.md">Natsmq</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_tikv.md">Tikv</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_trace.md">跟踪</a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md">配额和限制</a></li>
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
    <th>用途</th>
    <th>参数</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>性能调整</td>
    <td>
        <ul>
            <li><a href="/docs/zh/v2.4.x/configure_querynode.md#queryNodegracefulTime"><code translate="no">queryNode.gracefulTime</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_rootcoord.md#rootCoordminSegmentSizeToEnableIndex"><code translate="no">rootCoord.minSegmentSizeToEnableIndex</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_datacoord.md#dataCoordsegmentmaxSize"><code translate="no">dataCoord.segment.maxSize</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_datacoord.md#dataCoordsegmentsealProportion"><code translate="no">dataCoord.segment.sealProportion</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_datanode.md#dataNodeflushinsertBufSize"><code translate="no">dataNode.flush.insertBufSize</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_querycoord.md#queryCoordautoHandoff"><code translate="no">queryCoord.autoHandoff</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_querycoord.md#queryCoordautoBalance"><code translate="no">queryCoord.autoBalance</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_localstorage.md#localStorageenabled"><code translate="no">localStorage.enabled</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>数据和元</td>
    <td>
        <ul>
            <li><a href="/docs/zh/v2.4.x/configure_common.md#commonretentionDuration"><code translate="no">common.retentionDuration</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_rocksmq.md#rocksmqretentionTimeInMinutes"><code translate="no">rocksmq.retentionTimeInMinutes</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_datacoord.md#dataCoordenableCompaction"><code translate="no">dataCoord.enableCompaction</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_datacoord.md#dataCoordenableGarbageCollection"><code translate="no">dataCoord.enableGarbageCollection</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_datacoord.md#dataCoordgcdropTolerance"><code translate="no">dataCoord.gc.dropTolerance</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>管理</td>
    <td>
        <ul>
            <li><a href="/docs/zh/v2.4.x/configure_log.md#loglevel"><code translate="no">log.level</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_log.md#logfilerootPath"><code translate="no">log.file.rootPath</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_log.md#logfilemaxAge"><code translate="no">log.file.maxAge</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_minio.md#minioaccessKeyID"><code translate="no">minio.accessKeyID</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_minio.md#miniosecretAccessKey"><code translate="no">minio.secretAccessKey</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>配额和限制</td>
    <td>
        <ul>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsddlenabled"><code translate="no">quotaAndLimits.ddl.enabled</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsddlcollectionRate"><code translate="no">quotaAndLimits.ddl.collectionRate</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsddlpartitionRate"><code translate="no">quotaAndLimits.ddl.partitionRate</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsindexRateenabled"><code translate="no">quotaAndLimits.indexRate.enabled</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsindexRatemax"><code translate="no">quotaAndLimits.indexRate.max</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsflushRateenabled"><code translate="no">quotaAndLimits.flushRate.enabled</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsflushmax"><code translate="no">quotaAndLimits.flush.max</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitscompationenabled"><code translate="no">quotaAndLimits.compation.enabled</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitscompactionmax"><code translate="no">quotaAndLimits.compaction.max</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmlenabled"><code translate="no">quotaAndLimits.dml.enabled</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatemax"><code translate="no">quotaAndLimits.dml.insertRate.max</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatemax"><code translate="no">quotaAndLimits.dml.deleteRate.max</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlenabled"><code translate="no">quotaAndLimits.dql.enabled</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatemax"><code translate="no">quotaAndLimits.dql.searchRate.max</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatemax"><code translate="no">quotaAndLimits.dql.queryRate.max</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code translate="no">quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitWritingforceDeny"><code translate="no">quotaAndLimits.limitWriting.forceDeny</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionenabled"><code translate="no">quotaAndLimits.limitReading.queueProtection.enabled</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionnqInQueueThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.nqInQueueThreshold</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingqueueProtectionqueueLatencyThreshold"><code translate="no">quotaAndLimits.limitReading.queueProtection.queueLatencyThreshold</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingresultProtectionenabled"><code translate="no">quotaAndLimits.limitReading.resultProtection.enabled</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingresultProtectionmaxReadResultRate"><code translate="no">quotaAndLimits.limitReading.resultProtection.maxReadResultRate</code></a></li>
            <li><a href="/docs/zh/v2.4.x/configure_quotaandlimits.md#quotaAndLimitslimitReadingforceDeny"><code translate="no">quotaAndLimits.limitReading.forceDeny</code></a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<p>有关专门针对 Kubernetes 安装的其他参数，请参阅<a href="https://github.com/milvus-io/milvus-helm/tree/master/charts/milvus#configuration">Milvus Helm 图表配置</a>。</p>
<h3 id="Start-Milvus" class="common-anchor-header">启动 Milvus</h3><p>修改完配置文件后，就可以用该文件启动 Milvus。</p>
<pre><code translate="no">$ helm upgrade my-release milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Milvus-via-command-line" class="common-anchor-header">通过命令行配置 Milvus<button data-href="#Configure-Milvus-via-command-line" class="anchor-icon" translate="no">
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
    </button></h2><p>或者，你也可以使用 Helm 命令直接升级 Milvus 配置。</p>
<h3 id="Check-the-configurable-parameters" class="common-anchor-header">检查可配置参数</h3><p>升级前，可以使用 Helm 图表检查可配置参数。</p>
<pre><code translate="no">$ helm show values milvus/milvus
<button class="copy-code-btn"></button></code></pre>
<h3 id="Start-Milvus" class="common-anchor-header">启动 Milvus</h3><p>在升级命令中添加<code translate="no">--values</code> 或<code translate="no">--set</code> ，配置并启动 Milvus。</p>
<pre><code translate="no"><span class="hljs-comment"># For instance, upgrade the Milvus cluster with compaction disabled</span>
$ helm upgrade my-release milvus/milvus --<span class="hljs-built_in">set</span> dataCoord.enableCompaction=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Whats-next" class="common-anchor-header">下一步<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>如果你想了解如何监控 Milvus 服务并创建警报：</p>
<ul>
<li>学习<a href="/docs/zh/v2.4.x/monitor.md">在 Kubernetes 上使用 Prometheus Operator 监控 Milvus</a></li>
<li>学习<a href="/docs/zh/v2.4.x/visualize.md">在 Grafana 中可视化 Milvus 指标</a>。</li>
</ul></li>
<li><p>如果您正在寻找如何分配资源的说明：</p>
<ul>
<li><a href="/docs/zh/v2.4.x/allocate.md#standalone">在 Kubernetes 上分配资源</a></li>
</ul></li>
</ul>
