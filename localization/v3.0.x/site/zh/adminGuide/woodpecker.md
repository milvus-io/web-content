---
id: woodpecker.md
title: Woodpecker
related_key: Woodpecker
summary: 了解 Woodpecker 如何作为 Milvus 中的默认消息队列（WAL）运行，以及如何以嵌入式或服务模式运行它。
---
<h1 id="Woodpecker" class="common-anchor-header">Woodpecker<button data-href="#Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>Woodpecker 是 Milvus 3.x 中的<strong>默认消息队列（预写日志，WAL）</strong>。它是一款专为对象存储设计的云原生 WAL，具有高吞吐量、低操作开销和无缝可扩展性等特点。有关架构和基准测试的详细信息，请参阅<a href="/docs/zh/woodpecker_architecture.md">Woodpecker</a>。</p>
<h2 id="Overview" class="common-anchor-header">概述<button data-href="#Overview" class="anchor-icon" translate="no">
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
<li>在 Milvus 3.x 中，Woodpecker 是<strong>默认的</strong>WAL/消息队列，作为日志服务提供有序写入和恢复功能。无需外部消息队列服务（如 Pulsar 或 Kafka）。</li>
<li>Woodpecker 可以<strong>嵌入</strong>Milvus/流处理节点中运行（默认），也可以作为拥有独立 Pod 的<strong>专用服务</strong>运行（仅限分布式/集群环境）。</li>
<li>它支持三种<code translate="no">storage.type</code> 模式：对象存储（<code translate="no">minio</code> ，默认）、本地文件系统（<code translate="no">local</code> ）以及专用<code translate="no">service</code> 。请参阅<a href="#Deployment-modes">部署模式</a>。</li>
</ul>
<h2 id="Quick-start" class="common-anchor-header">快速入门<button data-href="#Quick-start" class="anchor-icon" translate="no">
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
    </button></h2><p>要启用 Woodpecker，请将 MQ 类型设置为 Woodpecker：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<p>注意：对于正在运行的集群，切换<code translate="no">mq.type</code> 属于升级操作。请仔细遵循升级流程，并在切换至生产环境前，先在全新集群上进行验证。</p>
<h2 id="Configuration" class="common-anchor-header">配置<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>以下是完整的 Woodpecker 配置块（编辑<code translate="no">milvus.yaml</code> 或在<code translate="no">user.yaml</code> 中进行覆盖）：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Related configuration of woodpecker, used to manage Milvus logs of recent mutation operations, output streaming log, and provide embedded log sequential read and write.</span>
<span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">meta:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">etcd</span> <span class="hljs-comment"># The Type of the metadata provider. currently only support etcd.</span>
    <span class="hljs-attr">prefix:</span> <span class="hljs-string">woodpecker</span> <span class="hljs-comment"># The Prefix of the metadata provider. default is woodpecker.</span>
  <span class="hljs-attr">client:</span>
    <span class="hljs-attr">segmentAppend:</span>
      <span class="hljs-attr">queueSize:</span> <span class="hljs-number">10000</span> <span class="hljs-comment"># The size of the queue for pending messages to be sent of each log.</span>
      <span class="hljs-attr">maxRetries:</span> <span class="hljs-number">3</span> <span class="hljs-comment"># Maximum number of retries for segment append operations.</span>
    <span class="hljs-attr">segmentRollingPolicy:</span>
      <span class="hljs-attr">maxSize:</span> <span class="hljs-string">256M</span> <span class="hljs-comment"># Maximum size of a segment.</span>
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-string">10m</span> <span class="hljs-comment"># Maximum interval between two segments, default is 10 minutes.</span>
      <span class="hljs-attr">maxBlocks:</span> <span class="hljs-number">1000</span> <span class="hljs-comment"># Maximum number of blocks in a segment</span>
    <span class="hljs-attr">auditor:</span>
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-string">10s</span> <span class="hljs-comment"># Maximum interval between two auditing operations, default is 10 seconds.</span>
  <span class="hljs-attr">logstore:</span>
    <span class="hljs-attr">segmentSyncPolicy:</span>
      <span class="hljs-attr">maxInterval:</span> <span class="hljs-string">200ms</span> <span class="hljs-comment"># Maximum interval between two sync operations, default is 200 milliseconds.</span>
      <span class="hljs-attr">maxIntervalForLocalStorage:</span> <span class="hljs-string">10ms</span> <span class="hljs-comment"># Maximum interval between two sync operations local storage backend, default is 10 milliseconds.</span>
      <span class="hljs-attr">maxBytes:</span> <span class="hljs-string">256M</span> <span class="hljs-comment"># Maximum size of write buffer in bytes.</span>
      <span class="hljs-attr">maxEntries:</span> <span class="hljs-number">10000</span> <span class="hljs-comment"># Maximum entries number of write buffer.</span>
      <span class="hljs-attr">maxFlushRetries:</span> <span class="hljs-number">5</span> <span class="hljs-comment"># Maximum number of flush retries.</span>
      <span class="hljs-attr">retryInterval:</span> <span class="hljs-string">1000ms</span> <span class="hljs-comment"># Maximum interval between two retries. default is 1000 milliseconds.</span>
      <span class="hljs-attr">maxFlushSize:</span> <span class="hljs-string">2M</span> <span class="hljs-comment"># Maximum size of a fragment in bytes to flush.</span>
      <span class="hljs-attr">maxFlushThreads:</span> <span class="hljs-number">32</span> <span class="hljs-comment"># Maximum number of threads to flush data</span>
    <span class="hljs-attr">segmentCompactionPolicy:</span>
      <span class="hljs-attr">maxSize:</span> <span class="hljs-string">2M</span> <span class="hljs-comment"># The maximum size of the merged files.</span>
      <span class="hljs-attr">maxParallelUploads:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># The maximum number of parallel upload threads for compaction.</span>
      <span class="hljs-attr">maxParallelReads:</span> <span class="hljs-number">8</span> <span class="hljs-comment"># The maximum number of parallel read threads for compaction.</span>
    <span class="hljs-attr">segmentReadPolicy:</span>
      <span class="hljs-attr">maxBatchSize:</span> <span class="hljs-string">16M</span> <span class="hljs-comment"># Maximum size of a batch in bytes.</span>
      <span class="hljs-attr">maxFetchThreads:</span> <span class="hljs-number">32</span> <span class="hljs-comment"># Maximum number of threads to fetch data.</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span> <span class="hljs-comment"># The Type of the storage provider. Valid values: [minio, local]</span>
    <span class="hljs-attr">rootPath:</span> <span class="hljs-string">/var/lib/milvus/woodpecker</span> <span class="hljs-comment"># The root path of the storage provider.</span>
<button class="copy-code-btn"></button></code></pre>
<p>关键注意事项：</p>
<ul>
<li><code translate="no">woodpecker.meta</code>
<ul>
<li><strong>type</strong>：目前仅支持<code translate="no">etcd</code> 。请复用与 Milvus 相同的 etcd 来存储轻量级元数据。</li>
<li><strong>prefix</strong>：元数据的键前缀。默认值：<code translate="no">woodpecker</code> 。</li>
</ul></li>
<li><code translate="no">woodpecker.client</code>
<ul>
<li>控制客户端侧的分段追加/滚动/审计行为，以平衡吞吐量和端到端延迟。</li>
</ul></li>
<li><code translate="no">woodpecker.logstore</code>
<ul>
<li>控制日志分段的同步/刷新/压缩/读取策略。这些是调整吞吐量和延迟的主要控制参数。</li>
</ul></li>
<li><code translate="no">woodpecker.storage</code>
<ul>
<li><strong>type</strong>：<code translate="no">minio</code> 用于 MinIO/S3 兼容的对象存储（MinIO/S3/GCS/OSS 等）；<code translate="no">local</code> 用于本地/共享文件系统。</li>
<li><strong>rootPath</strong>：存储后端的根路径（仅对<code translate="no">local</code> 有效；对于<code translate="no">minio</code> ，路径由存储桶/前缀决定）。</li>
</ul></li>
</ul>
<h2 id="Deployment-modes" class="common-anchor-header">部署模式<button data-href="#Deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker 支持三种<code translate="no">storage.type</code> 模式：</p>
<table>
<thead>
<tr><th><code translate="no">storage.type</code></th><th>Woodpecker 的运行方式</th><th>WAL 后端</th><th>Milvus Standalone</th><th>Milvus Distributed（集群）</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio</code> （默认）</td><td>嵌入 Milvus/流式处理节点中</td><td>对象存储（MinIO/S3兼容）</td><td>受支持</td><td>支持</td></tr>
<tr><td><code translate="no">local</code></td><td>嵌入在 Milvus/流式传输节点中</td><td>本地文件系统</td><td>支持</td><td>受限（所有节点都需要一个共享文件系统，例如 NFS）</td></tr>
<tr><td><code translate="no">service</code></td><td><strong>专用的 Woodpecker 服务</strong>（拥有独立的 Pod）</td><td>对象存储（MinIO/S3兼容）</td><td><strong>不支持</strong></td><td>支持</td></tr>
</tbody>
</table>
<p>注：</p>
<ul>
<li>在<code translate="no">minio</code> 模式下，Woodpecker与Milvus共享同一对象存储（MinIO/S3/GCS/OSS等）。</li>
<li>在<code translate="no">local</code> 下，单节点本地磁盘仅适用于独立模式。如果所有Pod都能访问共享文件系统（例如NFS），集群模式也可使用<code translate="no">local</code> 。</li>
<li><strong><code translate="no">service</code> 该模式将 Woodpecker 作为独立且可独立扩展的服务运行，仅适用于分布式/集群部署。</strong>独立部署则使用嵌入式模式（<code translate="no">minio</code> 或<code translate="no">local</code> ）。</li>
</ul>
<h2 id="Object-storage-compatibility-for-storagetypeminio" class="common-anchor-header">对象存储兼容性<code translate="no">storage.type=minio</code><button data-href="#Object-storage-compatibility-for-storagetypeminio" class="anchor-icon" translate="no">
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
    </button></h2><p>下表总结了当 Woodpecker 配置为<code translate="no">storage.type=minio</code> 时，目前已知的对象存储后端兼容性。此信息基于<a href="https://github.com/zilliztech/woodpecker/discussions/150">GitHub 讨论 #150</a>。</p>
<table>
<thead>
<tr><th>提供商/服务</th><th>状态</th><th>备注</th></tr>
</thead>
<tbody>
<tr><td>Azure Blob Storage</td><td>支持</td><td>使用原生 Azure SDK。</td></tr>
<tr><td>AWS S3</td><td>已支持</td><td>原生 S3，全面支持条件写入。</td></tr>
<tr><td>MinIO (<code translate="no">&gt;= 2024-12</code>)</td><td>已支持</td><td>完全支持 S3 条件写入。</td></tr>
<tr><td>阿里云 OSS</td><td>已支持</td><td>通过其兼容 S3 的接口支持。</td></tr>
<tr><td>腾讯COS</td><td>支持</td><td>通过其 S3 兼容接口支持。</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td>支持</td><td>通过 S3 互操作模式支持。</td></tr>
<tr><td>华为云 OBS</td><td>不支持</td><td>缺少所需的条件写入语义。</td></tr>
<tr><td>VAST Data</td><td>已支持</td><td>已由社区验证；仅支持非版本化存储桶。</td></tr>
<tr><td>其他兼容 S3 的存储</td><td>部分支持</td><td>取决于是否完全支持 S3 条件写入语义。</td></tr>
</tbody>
</table>
<p>注：</p>
<ul>
<li>兼容性取决于原生 SDK 的支持情况或对 S3 条件写入语义的支持情况。</li>
<li>若您为 Woodpecker 自建 MinIO 实例，请使用<code translate="no">RELEASE.2024-12-18T13-15-44Z</code> 或更高版本。</li>
<li>此对照表反映了<a href="https://github.com/zilliztech/woodpecker/discussions/150">当前的讨论情况</a>，随着后端支持的进一步验证，内容可能会有所调整。</li>
</ul>
<h2 id="Deployment-guides" class="common-anchor-header">部署指南<button data-href="#Deployment-guides" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Milvus-Operator-storageminio" class="common-anchor-header">在 Kubernetes 上的 Milvus 集群中启用 Woodpecker（Milvus Operator，storage=minio）<button data-href="#Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Milvus-Operator-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p>安装<a href="/docs/zh/install_cluster-milvusoperator.md">Milvus Operator</a> 后，请使用官方示例启动一个已启用 Woodpecker 的 Milvus 集群：</p>
<pre><code translate="no" class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_woodpecker.yaml

<button class="copy-code-btn"></button></code></pre>
<p>此示例将 Woodpecker 配置为消息队列，并启用了流式处理节点。首次启动时，拉取镜像可能需要一些时间；请等待直至所有 Pod 准备就绪：</p>
<pre><code translate="no" class="language-bash">kubectl get pods
kubectl get milvus my-release -o yaml | grep -A2 status
<button class="copy-code-btn"></button></code></pre>
<p>准备就绪后，您应看到类似以下的 Pod：</p>
<pre><code translate="no">NAME                                               READY   STATUS    RESTARTS   AGE
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-0</span>                                  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-1</span>                                  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>etcd<span class="hljs-number">-2</span>                                  <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>datanode<span class="hljs-number">-7</span>f8f88499d<span class="hljs-operator">-</span>kc66r        <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>mixcoord<span class="hljs-number">-7</span>cd7998d<span class="hljs-operator">-</span>x59kg          <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>proxy<span class="hljs-number">-5</span>b56cf8446<span class="hljs-operator">-</span>pbnjm           <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>querynode<span class="hljs-number">-0</span><span class="hljs-number">-558</span>d9cdd57<span class="hljs-operator">-</span>sgbfx     <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>milvus<span class="hljs-operator">-</span>streamingnode<span class="hljs-number">-58</span>fbfdfdd8<span class="hljs-operator">-</span>vtxfd   <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">16</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-0</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-1</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-2</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
my<span class="hljs-operator">-</span><span class="hljs-keyword">release</span><span class="hljs-operator">-</span>minio<span class="hljs-number">-3</span>                                 <span class="hljs-number">1</span><span class="hljs-operator">/</span><span class="hljs-number">1</span>     <span class="hljs-keyword">Running</span>   <span class="hljs-number">0</span>          <span class="hljs-number">17</span>m
<button class="copy-code-btn"></button></code></pre>
<p>运行以下命令以卸载 Milvus 集群。</p>
<pre><code translate="no" class="language-bash">kubectl delete milvus my-release
<button class="copy-code-btn"></button></code></pre>
<p>若需调整 Woodpecker 参数，请按照<a href="#Configuration">“配置”</a>部分中的说明进行设置。</p>
<h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Helm-Chart-storageminio" class="common-anchor-header">在 Kubernetes 上为 Milvus 集群启用 Woodpecker（Helm 图表，storage=minio）<button data-href="#Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Helm-Chart-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p>首先，请按照《<a href="/docs/zh/install_cluster-helm.md">使用 Helm 在 Kubernetes 上运行 Milvus</a>》中的说明添加并更新 Milvus Helm 图表。</p>
<p>然后使用以下示例之一进行部署：</p>
<p>– 集群部署（推荐设置：启用 Woodpecker 和流式处理节点）：</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>– 独立部署（已启用 Woodpecker）：</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> standalone.messageQueue=woodpecker \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>部署完成后，请按照文档说明进行端口转发并建立连接。若需调整 Woodpecker 参数，请参考<a href="#Configuration">“配置</a>”部分中的设置说明。</p>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-in-Docker-storagelocal" class="common-anchor-header">在 Docker 中的 Milvus Standalone 部署中启用 Woodpecker（storage=local）<button data-href="#Enable-Woodpecker-for-Milvus-Standalone-in-Docker-storagelocal" class="anchor-icon" translate="no">
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
    </button></h3><p>在 Milvus 3.x 中，Docker 独立部署<strong>默认</strong>使用 Woodpecker<strong>并将本地文件系统</strong>作为其 WAL 后端——无需额外配置。请按照《<a href="/docs/zh/install_standalone-docker.md">在 Docker 中运行 Milvus Stand</a>alone》中的说明操作：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-wp &amp;&amp; <span class="hljs-built_in">cd</span> milvus-wp
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>若需调整 Woodpecker 配置，请在首次启动后编辑生成的 `<code translate="no">user.yaml</code> ` 文件，并运行 `<code translate="no">bash standalone_embed.sh restart</code> ` 以应用更改（执行 `<code translate="no">start</code> ` 会重新生成 `<code translate="no">user.yaml</code>` 文件，因此请使用 `<code translate="no">restart</code>` 应用编辑内容）：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># user.yaml</span>
<span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">logstore:</span>
    <span class="hljs-attr">segmentSyncPolicy:</span>
      <span class="hljs-attr">maxFlushThreads:</span> <span class="hljs-number">16</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-with-Docker-Compose-storageminio" class="common-anchor-header">为使用 Docker Compose 的 Milvus Standalone 启用 Woodpecker（storage=minio）<button data-href="#Enable-Woodpecker-for-Milvus-Standalone-with-Docker-Compose-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p>请参考《<a href="/docs/zh/install_standalone-docker-compose.md">使用 Docker Compose 运行 Milvus</a>》。示例：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-wp-compose &amp;&amp; <span class="hljs-built_in">cd</span> milvus-wp-compose
wget https://github.com/milvus-io/milvus/releases/download/v3.0-beta/milvus-standalone-docker-compose.yml -O docker-compose.yml
<span class="hljs-comment"># By default, the Docker Compose standalone uses Woodpecker</span>
<span class="hljs-built_in">sudo</span> docker compose up -d
<span class="hljs-comment"># If you need to change Woodpecker parameters further, write an override:</span>
docker <span class="hljs-built_in">exec</span> -it milvus-standalone bash -lc <span class="hljs-string">&#x27;cat &gt; /milvus/configs/user.yaml &lt;&lt;EOF
mq:
  type: woodpecker
woodpecker:
  logstore:
    segmentSyncPolicy: 
      maxFlushThreads: 16
  storage:
    type: minio
EOF&#x27;</span>

<span class="hljs-comment"># Restart the container to apply the changes</span>
docker restart milvus-standalone
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-Woodpecker-service-mode-for-a-Milvus-Cluster-Helm" class="common-anchor-header">为 Milvus 集群（Helm）启用 Woodpecker 服务模式<button data-href="#Enable-Woodpecker-service-mode-for-a-Milvus-Cluster-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p>Woodpecker<strong>服务模式是</strong> <strong>Milvus 3.0</strong>的一项功能。对于分布式/集群部署，您可以通过设置 `<code translate="no">streaming.woodpecker.embedded=false</code>`，将 Woodpecker 作为<strong>专用服务</strong>（独立 Pod）运行，而非嵌入流式处理节点中：</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> woodpecker.image.tag=v0.1.33 \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.woodpecker.embedded=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>这将 Woodpecker 作为独立的 StatefulSet（<code translate="no">my-release-milvus-woodpecker</code> ，默认 4 个副本）进行部署，由无头服务作为前端，通过端口<code translate="no">18080</code> （服务）、<code translate="no">17946</code> （闲聊）和<code translate="no">9091</code> （指标）进行闲聊集群通信，并使用 MinIO 作为其存储后端。 该服务需要<strong>3</strong>个节点的法定人数；默认的<strong>4</strong>个副本既能保持法定人数，又能容忍单节点故障，因此请勿将<code translate="no">woodpecker.replicaCount</code> 设置为小于 3。该集群还包含一个独立的<code translate="no">woodpecker</code> Pod 集合：</p>
<pre><code translate="no"><span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">0</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">1</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">2</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Woodpecker 的<code translate="no">service</code> 模式仅适用于<strong>分布式/集群部署</strong>——独立部署将运行嵌入式 Woodpecker（<code translate="no">minio</code> 或<code translate="no">local</code> ）。Milvus Operator 目前尚不支持 Woodpecker 服务模式。</p>
</div>
<h2 id="Throughput-tuning-tips" class="common-anchor-header">吞吐量调优提示<button data-href="#Throughput-tuning-tips" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker<strong>在嵌入式</strong>模式<strong>和服务</strong>模式（Milvus 3.0 的新功能）下的吞吐量和延迟表现各不相同。以下指南按模式分类。</p>
<h3 id="Embedded-mode" class="common-anchor-header">嵌入式模式<button data-href="#Embedded-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>基于<a href="/docs/zh/woodpecker_architecture.md">Woodpecker</a> 中的基准测试和后端限制，请从以下方面优化端到端写入吞吐量：</p>
<ul>
<li>存储端
<ul>
<li><strong>对象存储（MinIO/S3兼容）</strong>：提高并发数并增大对象大小（避免使用微小对象）。注意网络和存储桶的带宽限制。单个基于SSD的MinIO节点本地吞吐量通常上限约为100 MB/s；单个EC2到S3的传输速率可达GB/s。</li>
<li><strong>本地/共享文件系统（本地）</strong>：优先使用 NVMe 或高速磁盘。确保文件系统能良好处理小文件写入及 fsync 延迟。</li>
</ul></li>
<li>Woodpecker 配置参数
<ul>
<li>增加<code translate="no">logstore.segmentSyncPolicy.maxFlushSize</code> 和<code translate="no">maxFlushThreads</code> 参数值，以实现更大的刷新量和更高的并行度。</li>
<li>根据存储介质特性调整<code translate="no">maxInterval</code> （通过延长聚合时间，在延迟与吞吐量之间进行权衡）。</li>
<li>对于对象存储，可考虑增加<code translate="no">segmentRollingPolicy.maxSize</code> 以减少分段切换。</li>
</ul></li>
<li>客户端/应用程序端
<ul>
<li>使用更大的批处理大小和更多的并发写入者/客户端。</li>
<li>控制刷新/索引构建的时机（在触发前进行批量处理），以避免频繁的小写入。</li>
</ul></li>
</ul>
<h3 id="Service-mode-Milvus-30+" class="common-anchor-header">服务模式（Milvus 3.0+）<button data-href="#Service-mode-Milvus-30+" class="anchor-icon" translate="no">
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
    </button></h3><p>服务模式在保持基于对象存储的 WAL 高写入吞吐量的同时，还增加了低延迟（参见<a href="#Latency">“延迟”</a>）。 上述存储端和客户端的调优方法仍然适用；此外，由于 Woodpecker 作为独立服务运行，您可以通过增加副本（<code translate="no">woodpecker.replicaCount</code> ，默认 4 个）来水平扩展写入容量，且写入操作可受益于单 RTT 定额复制以及避免经纪人转发的拓扑感知读取。</p>
<p><strong>批量插入演示</strong>——使用以下代码测量写入吞吐量：</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">import</span> time

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://&lt;Proxy Pod IP&gt;:19530&quot;</span>,
)

<span class="hljs-comment"># 2. Create a collection</span>
res = client.create_collection(
    collection_name=<span class="hljs-string">&quot;test_milvus_wp&quot;</span>,
    dimension=<span class="hljs-number">512</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
    shards_num=<span class="hljs-number">2</span>,
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># 3. Insert randomly generated vectors</span>
colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>]
data = []

batch_size = <span class="hljs-number">1000</span>
batch_count = <span class="hljs-number">2000</span>
<span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(batch_count):
    start_time = time.time()
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserting <span class="hljs-subst">{j}</span>th vectors <span class="hljs-subst">{j * batch_size}</span> startTime<span class="hljs-subst">{start_time}</span>&quot;</span>)
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(batch_size):
        current_color = random.choice(colors)
        data.append({
            <span class="hljs-string">&quot;id&quot;</span>: (j*batch_size + i),
            <span class="hljs-string">&quot;vector&quot;</span>: [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">512</span>) ],
            <span class="hljs-string">&quot;color&quot;</span>: current_color,
            <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">f&quot;<span class="hljs-subst">{current_color}</span>_<span class="hljs-subst">{<span class="hljs-built_in">str</span>(random.randint(<span class="hljs-number">1000</span>, <span class="hljs-number">9999</span>))}</span>&quot;</span>
        })
    res = client.insert(
        collection_name=<span class="hljs-string">&quot;test_milvus_wp&quot;</span>,
        data=data
    )
    data = []
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Inserted <span class="hljs-subst">{j}</span>th vectors endTime:<span class="hljs-subst">{time.time()}</span> costTime:<span class="hljs-subst">{time.time() - start_time}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Latency" class="common-anchor-header">延迟<button data-href="#Latency" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Embedded-mode" class="common-anchor-header">嵌入式模式<button data-href="#Embedded-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>Woodpecker 是一款专为对象存储设计的云原生 WAL，在吞吐量、成本和延迟之间实现了权衡。轻量级的嵌入式模式优先考虑成本和吞吐量的优化，因为大多数场景仅要求数据在一定时间内写入，而非对单个写入请求要求低延迟。 因此，Woodpecker 采用批量写入机制，其中本地文件系统存储后端的默认间隔为 10 毫秒，而 MinIO 类存储后端的默认间隔为 200 毫秒。在写入速度较慢的情况下，最大延迟等于间隔时间加上刷新时间之和。</p>
<p>请注意，批量插入不仅由时间间隔触发，还受批量大小影响，其默认值为 2MB。</p>
<h3 id="Service-mode-Milvus-30+" class="common-anchor-header">服务模式（Milvus 3.0+）<button data-href="#Service-mode-Milvus-30+" class="anchor-icon" translate="no">
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
    </button></h3><p>服务模式在保持低成本的同时，实现了<strong>毫秒级写入延迟</strong>——与传统的三副本本地磁盘 WAL 处于同一量级。在典型的三副本跨可用区部署中，写入延迟始终保持在毫秒范围内。其实现方式如下：</p>
<ul>
<li><strong>单 RTT 法定数写入</strong>——客户端驱动的复制可在单次往返内完成法定数写入，跨可用区流量固定为两个副本的数据量（相比之下，基于代理/领导者的复制通常会产生额外的约 1/3 跨可用区流量）。</li>
<li><strong>拓扑感知单跳读取</strong>——每次读取都直接发送到最近的副本，而不是通过代理转发，从而避免了基于代理系统中随机的跨可用区读取（约占跨可用区读取流量的 2/3）。</li>
<li><strong>分段滚动后立即上传至对象存储</strong>——每个分段都会追踪其完整生命周期，并在滚动后立即上传至对象存储，从而在不牺牲延迟性能的前提下，保持本地磁盘占用空间和存储成本处于较低水平。</li>
<li><strong>无持续的节点间复制</strong>——日志持久化到充当共享存储的对象存储中，因此故障转移时仅需重新上传幸存的副本（无需复制整个节点），扩展不再受限于节点间复制带宽，且大规模节点替换不会引发复制风暴。</li>
</ul>
<p>在跨可用区（AZ）部署中，与基于代理的日志系统相比，服务模式还可节省约<strong>1/3 的跨可用区写入</strong>网络流量和<strong>2/3 的</strong>跨可用区<strong>读取</strong>网络流量。有关完整的设计和成本分析，请参阅《<a href="/docs/zh/woodpecker_architecture.md">Woodpecker 架构</a>》。</p>
<p>有关架构、部署模式（MemoryBuffer / QuorumBuffer）和性能的详细信息，请参阅《<a href="/docs/zh/woodpecker_architecture.md">Woodpecker 架构</a>》。</p>
<p>有关更多参数详情，请参阅 Woodpecker<a href="https://github.com/zilliztech/woodpecker">GitHub 代码库</a>。</p>
