---
id: configure-docker.md
label: Docker Compose
related_key: configure
summary: 使用 Docker Compose 配置 Milvus。
title: 使用 Docker Compose 配置 Milvus
---
<h1 id="Configure-Milvus-with-Docker-Compose" class="common-anchor-header">使用 Docker Compose 配置 Milvus<button data-href="#Configure-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>本节介绍如何使用 Docker Compose 配置 Milvus 组件及其第三方依赖项。</p>
<div class="alert note">
某些参数可在 Milvus 运行时进行修改。详情请参阅《<a href="/docs/zh/dynamic_config.md">动态配置 Milvus</a>》。若要应用其他参数的更改，请重启 Milvus。
</div>
<h2 id="Download-a-configuration-file" class="common-anchor-header">下载配置文件<button data-href="#Download-a-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>可直接<a href="https://raw.githubusercontent.com/milvus-io/milvus/v3.0.5/configs/milvus.yaml">下载</a> <code translate="no">milvus.yaml</code> ，或使用以下命令<a href="https://raw.githubusercontent.com/milvus-io/milvus/v3.0.5/configs/milvus.yaml">进行下载</a>。</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://raw.githubusercontent.com/milvus-io/milvus/v3.0.5/configs/milvus.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Modify-the-configuration-file" class="common-anchor-header">修改配置文件<button data-href="#Modify-the-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>在<code translate="no">user.yaml</code> 文件中配置您的Milvus实例，以适应您的应用场景。仅添加您需要更改的参数，并参考下载的<code translate="no">milvus.yaml</code> 文件中的参数名称和默认值。Milvus会先读取<code translate="no">milvus.yaml</code> ，再读取<code translate="no">user.yaml</code> ，因此<code translate="no">user.yaml</code> 中的值将覆盖默认值。以下示例演示了如何更改日志级别：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">log:</span>
  <span class="hljs-attr">level:</span> <span class="hljs-string">warn</span>
<button class="copy-code-btn"></button></code></pre>
<p>有关各参数的更多信息，请参阅以下链接。</p>
<p>按以下标准排序：</p>
<div class="filter">
<a href="#component">组件或依赖项</a> <a href="#purpose">配置目的</a>
</div>
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
            <li><a href="/docs/zh/configure_etcd.md">etcd</a></li>
            <li><a href="/docs/zh/configure_minio.md">MinIO 或 S3</a></li>
            <li><a href="/docs/zh/configure_pulsar.md">Pulsar</a></li>
            <li><a href="/docs/zh/configure_rocksmq.md">RocksMQ</a></li>
        </ul>
    </td>
    <td>
        <ul>
            <li><a href="/docs/zh/configure_rootcoord.md">Root coord</a></li>
            <li><a href="/docs/zh/configure_proxy.md">代理</a></li>
            <li><a href="/docs/zh/configure_querycoord.md">Query coord</a></li>
            <li><a href="/docs/zh/configure_querynode.md">查询节点</a></li>
            <li><a href="/docs/zh/configure_indexnode.md">索引节点（旧版）</a></li>
            <li><a href="/docs/zh/configure_datacoord.md">Data coord</a></li>
            <li><a href="/docs/zh/configure_datanode.md">数据节点</a></li>
            <li><a href="/docs/zh/configure_localstorage.md">本地存储</a></li>
            <li><a href="/docs/zh/configure_log.md">日志</a></li>
            <li><a href="/docs/zh/configure_msgchannel.md">消息通道</a></li>
            <li><a href="/docs/zh/configure_common.md">通用</a></li>
            <li><a href="/docs/zh/configure_gpu.md">GPU</a></li>
            <li><a href="/docs/zh/configure_grpc.md">GRPC</a></li>
            <li><a href="/docs/zh/configure_indexcoord.md">索引坐标（旧版）</a></li>
            <li><a href="/docs/zh/configure_metastore.md">元数据存储库</a></li>
            <li><a href="/docs/zh/configure_mq.md">消息队列</a></li>
            <li><a href="/docs/zh/configure_tikv.md">Tikv</a></li>
            <li><a href="/docs/zh/configure_trace.md">Trace</a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md">配额与限制</a></li>
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
            <li><a href="/docs/zh/configure_common.md#commongracefulTime"><code translate="no">common.gracefulTime</code></a></li>
            <li><a href="/docs/zh/configure_rootcoord.md#rootCoordminSegmentSizeToEnableIndex"><code translate="no">rootCoord.minSegmentSizeToEnableIndex</code></a></li>
            <li><a href="/docs/zh/configure_datacoord.md#dataCoordsegmentmaxSize"><code translate="no">dataCoord.segment.maxSize</code></a></li>
            <li><a href="/docs/zh/configure_datacoord.md#dataCoordsegmentsealProportion"><code translate="no">dataCoord.segment.sealProportion</code></a></li>
            <li><a href="/docs/zh/configure_datanode.md#dataNodesegmentinsertBufSize"><code translate="no">dataNode.segment.insertBufSize</code></a></li>
            <li><a href="/docs/zh/configure_querycoord.md#queryCoordautoHandoff"><code translate="no">queryCoord.autoHandoff</code></a></li>
            <li><a href="/docs/zh/configure_querycoord.md#queryCoordautoBalance"><code translate="no">queryCoord.autoBalance</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>数据和元数据</td>
    <td>
        <ul>
            <li><a href="/docs/zh/configure_rocksmq.md#rocksmqretentionTimeInMinutes"><code translate="no">rocksmq.retentionTimeInMinutes</code></a></li>
            <li><a href="/docs/zh/configure_datacoord.md#dataCoordenableCompaction"><code translate="no">dataCoord.enableCompaction</code></a></li>
            <li><a href="/docs/zh/configure_datacoord.md#dataCoordenableGarbageCollection"><code translate="no">dataCoord.enableGarbageCollection</code></a></li>
            <li><a href="/docs/zh/configure_datacoord.md#dataCoordgcdropTolerance"><code translate="no">dataCoord.gc.dropTolerance</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>管理</td>
    <td>
        <ul>
            <li><a href="/docs/zh/configure_log.md#loglevel"><code translate="no">log.level</code></a></li>
            <li><a href="/docs/zh/configure_log.md#logfilerootPath"><code translate="no">log.file.rootPath</code></a></li>
            <li><a href="/docs/zh/configure_log.md#logfilemaxAge"><code translate="no">log.file.maxAge</code></a></li>
            <li><a href="/docs/zh/configure_minio.md#minioaccessKeyID"><code translate="no">minio.accessKeyID</code></a></li>
            <li><a href="/docs/zh/configure_minio.md#miniosecretAccessKey"><code translate="no">minio.secretAccessKey</code></a></li>
        </ul>
    </td>
  </tr>
  <tr>
    <td>配额与限制</td>
    <td>
        <ul>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitsddlenabled"><code translate="no">quotaAndLimits.ddl.enabled</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitsddlcollectionRate"><code translate="no">quotaAndLimits.ddl.collectionRate</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitsddlpartitionRate"><code translate="no">quotaAndLimits.ddl.partitionRate</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitsindexRateenabled"><code translate="no">quotaAndLimits.indexRate.enabled</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitsindexRatemax"><code translate="no">quotaAndLimits.indexRate.max</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitsflushRateenabled"><code translate="no">quotaAndLimits.flushRate.enabled</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitsflushRatemax"><code translate="no">quotaAndLimits.flushRate.max</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitscompactionRateenabled"><code translate="no">quotaAndLimits.compactionRate.enabled</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitscompactionRatemax"><code translate="no">quotaAndLimits.compactionRate.max</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitsdmlenabled"><code translate="no">quotaAndLimits.dml.enabled</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitsdmlinsertRatemax"><code translate="no">quotaAndLimits.dml.insertRate.max</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitsdmldeleteRatemax"><code translate="no">quotaAndLimits.dml.deleteRate.max</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitsdqlenabled"><code translate="no">quotaAndLimits.dql.enabled</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitsdqlsearchRatemax"><code translate="no">quotaAndLimits.dql.searchRate.max</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitsdqlqueryRatemax"><code translate="no">quotaAndLimits.dql.queryRate.max</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md"><code translate="no">quotaAndLimits.limitWriting.ttProtection.enabled</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitslimitWritingttProtectionmaxTimeTickDelay"><code translate="no">quotaAndLimits.limitWriting.ttProtection.maxTimeTickDelay</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.memProtection.enabled</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryLowWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryLowWaterLevel</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectiondataNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.dataNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitslimitWritingmemProtectionqueryNodeMemoryHighWaterLevel"><code translate="no">quotaAndLimits.limitWriting.memProtection.queryNodeMemoryHighWaterLevel</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectionenabled"><code translate="no">quotaAndLimits.limitWriting.diskProtection.enabled</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitslimitWritingdiskProtectiondiskQuota"><code translate="no">quotaAndLimits.limitWriting.diskProtection.diskQuota</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitslimitWritingforceDeny"><code translate="no">quotaAndLimits.limitWriting.forceDeny</code></a></li>
            <li><a href="/docs/zh/configure_quotaandlimits.md#quotaAndLimitslimitReadingforceDeny"><code translate="no">quotaAndLimits.limitReading.forceDeny</code></a></li>
        </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<h2 id="Download-an-installation-file" class="common-anchor-header">下载安装文件<button data-href="#Download-an-installation-file" class="anchor-icon" translate="no">
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
    </button></h2><p>下载 Milvus<a href="https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml">Standalone</a> 安装文件，并将其保存为<code translate="no">docker-compose.yml</code> 。</p>
<p>您也可以直接运行以下命令。</p>
<pre><code translate="no"><span class="hljs-meta prompt_"># </span><span class="language-bash">For Milvus standalone</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Modify-the-installation-file" class="common-anchor-header">修改安装文件<button data-href="#Modify-the-installation-file" class="anchor-icon" translate="no">
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
    </button></h2><p>在<code translate="no">docker-compose.yml</code> 中，将本地路径映射到您的<code translate="no">user.yaml</code> 文件，并将其映射到<code translate="no">standalone</code> 服务中<code translate="no">volumes</code> 部分的<code translate="no">/milvus/configs/user.yaml</code> 。保留现有的卷条目以及该服务的其他设置，例如镜像、环境变量、健康检查和依赖项：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/local/path/to/your/user.yaml:/milvus/configs/user.yaml</span>   <span class="hljs-comment"># Map the local path to the container path</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
数据将根据<code translate="no">docker-compose.yml</code> 中的默认配置存储在<code translate="no">./volumes</code> 文件夹中。若要更改数据存储文件夹，请编辑<code translate="no">docker-compose.yml</code> 或运行<code translate="no">$ export DOCKER_VOLUME_DIRECTORY=</code> 。
</div>
<h2 id="Start-Milvus" class="common-anchor-header">启动 Milvus<button data-href="#Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>完成对配置文件和安装文件的修改后，即可启动 Milvus。</p>
<pre><code translate="no"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
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
<li>了解如何使用 Docker Compose 或 Helm 管理以下 Milvus 依赖项：
<ul>
<li><a href="/docs/zh/deploy_s3.md">使用 Docker Compose 或 Helm 配置对象存储</a></li>
<li><a href="/docs/zh/deploy_etcd.md">使用 Docker Compose 或 Helm 配置元数据存储</a></li>
<li><a href="/docs/zh/deploy_pulsar.md">使用 Docker Compose 或 Helm 配置消息存储</a></li>
</ul></li>
</ul>
