---
id: use-woodpecker.md
title: 使用啄木鸟（Milvus v2.6.x）
related_key: Woodpecker
summary: 了解如何启用啄木鸟作为 Milvus 中的 WAL。
---
<h2 id="Use-Woodpecker-Milvus-v26x" class="common-anchor-header">使用啄木鸟（Milvus v2.6.x）<button data-href="#Use-Woodpecker-Milvus-v26x" class="anchor-icon" translate="no">
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
    </button></h2><p>本指南介绍如何在 Milvus 2.6.x 中启用和使用 Woodpecker 作为先写日志（WAL）。Woodpecker 是专为对象存储设计的云原生 WAL，具有高吞吐量、低操作符和无缝可扩展性。有关架构和基准的详细信息，请参阅<a href="/docs/zh/woodpecker_architecture.md">Woodpecker</a>。</p>
<h3 id="Overview" class="common-anchor-header">概述</h3><ul>
<li>从 Milvus 2.6 开始，Woodpecker 是一种可选的 WAL，作为日志服务提供有序写入和恢复。</li>
<li>作为一种消息队列选择，它的行为与 Pulsar/Kafka 类似，可通过配置启用。</li>
<li>支持两种存储后端：本地文件系统（<code translate="no">local</code> ）和对象存储（<code translate="no">minio</code>/S3-兼容）。</li>
</ul>
<h3 id="Quick-start" class="common-anchor-header">快速启动</h3><p>要启用 Woodpecker，请将 MQ 类型设为 Woodpecker：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<p>注意：为正在运行的群集切换<code translate="no">mq.type</code> 是一项升级操作。请仔细遵循升级步骤，并在新群集上进行验证，然后再切换到生产群集。</p>
<h3 id="Configuration" class="common-anchor-header">配置</h3><p>以下是完整的 Woodpecker 配置块（在<code translate="no">user.yaml</code> 中编辑<code translate="no">milvus.yaml</code> 或覆盖）：</p>
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
      <span class="hljs-attr">maxFlushRetries:</span> <span class="hljs-number">5</span> <span class="hljs-comment"># Maximum size of write buffer in bytes.</span>
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
<p>主要说明：</p>
<ul>
<li><code translate="no">woodpecker.meta</code>
<ul>
<li><strong>类型</strong>：目前仅支持<code translate="no">etcd</code> 。重复使用与 Milvus 相同的 etcd 来存储轻量级元数据。</li>
<li><strong>前缀</strong>：元数据的关键前缀。默认值：<code translate="no">woodpecker</code> 。</li>
</ul></li>
<li><code translate="no">woodpecker.client</code>
<ul>
<li>控制客户端的段附加/滚动/审核行为，以平衡吞吐量和端到端延迟。</li>
</ul></li>
<li><code translate="no">woodpecker.logstore</code>
<ul>
<li>控制日志段的同步/刷新/压缩/读取策略。这些是吞吐量/延迟调整的主要旋钮。</li>
</ul></li>
<li><code translate="no">woodpecker.storage</code>
<ul>
<li><strong>type</strong>：<code translate="no">minio</code> ，用于 MinIO/S3 兼容对象存储（MinIO/S3/GCS/OSS 等）；<code translate="no">local</code> ，用于本地/共享文件系统。</li>
<li><strong>rootPath</strong>：存储后端的根路径（对<code translate="no">local</code> 有效；对于<code translate="no">minio</code> ，路径由桶/前缀决定）。</li>
</ul></li>
</ul>
<h3 id="Deployment-modes" class="common-anchor-header">部署模式</h3><p>Milvus 支持独立模式和集群模式。啄木鸟存储后端支持矩阵：</p>
<table>
<thead>
<tr><th></th><th><code translate="no">storage.type=local</code></th><th><code translate="no">storage.type=minio</code></th></tr>
</thead>
<tbody>
<tr><td>Milvus 单机版</td><td>支持</td><td>支持</td></tr>
<tr><td>Milvus 集群</td><td>有限（需要共享 FS）</td><td>支持</td></tr>
</tbody>
</table>
<p>备注</p>
<ul>
<li>使用<code translate="no">minio</code> ，啄木鸟与 Milvus 共享相同的对象存储（MinIO/S3/GCS/OSS 等）。</li>
<li>通过<code translate="no">local</code> ，单节点本地磁盘仅适用于 Standalone。如果所有 pod 都能访问共享文件系统（如 NFS），集群模式也可以使用<code translate="no">local</code> 。</li>
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
    </button></h2><h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Milvus-Operator-storageminio" class="common-anchor-header">为 Kubernetes 上的 Milvus 群集启用啄木鸟（Milvus 操作符，存储=minio）</h3><p>安装<a href="/docs/zh/install_cluster-milvusoperator.md">Milvus 操作符</a>后，使用官方示例启动启用 Woodpecker 的 Milvus 群集：</p>
<pre><code translate="no" class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_woodpecker.yaml

<button class="copy-code-btn"></button></code></pre>
<p>该示例将 Woodpecker 配置为消息队列，并启用流节点。第一次启动可能需要一些时间来提取图像；请等待，直到所有 pod 都准备就绪：</p>
<pre><code translate="no" class="language-bash">kubectl get pods
kubectl get milvus my-release -o yaml | grep -A2 status
<button class="copy-code-btn"></button></code></pre>
<p>准备就绪后，你应该会看到类似于以下的 pod：</p>
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
<p>运行以下命令卸载 Milvus 集群。</p>
<pre><code translate="no" class="language-bash">kubectl delete milvus my-release
<button class="copy-code-btn"></button></code></pre>
<p>如果需要调整 Woodpecker 参数，请按照<a href="/docs/zh/deploy_pulsar.md">消息存储配置</a>中所述进行设置。</p>
<h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Helm-Chart-storageminio" class="common-anchor-header">为 Kubernetes 上的 Milvus 群集启用 Woodpecker（Helm 图表，存储=minio）</h3><p>首先按照在<a href="/docs/zh/install_cluster-helm.md">Kubernetes 中使用 Helm 运行 Milvus 中的</a>描述，添加并更新<a href="/docs/zh/install_cluster-helm.md">Milvus</a> Helm 图表。</p>
<p>然后使用以下示例之一进行部署：</p>
<p>- 集群部署（建议设置为启用 Woodpecker 和流节点）：</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v2.6.0 \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>- 独立部署（启用 Woodpecker）：</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v2.6.0 \
  --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> standalone.messageQueue=woodpecker \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>部署后，按照文档进行端口转发和连接。要调整 Woodpecker 参数，请按照<a href="/docs/zh/deploy_pulsar.md">消息存储配置</a>中所述的设置进行。</p>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-in-Docker-storagelocal" class="common-anchor-header">在 Docker 中为 Milvus Standalone 启用啄木鸟（存储=本地）</h3><p>按照<a href="/docs/zh/install_standalone-docker.md">在 Docker 中运行 Milvus 的</a>步骤操作。示例：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-wp &amp;&amp; <span class="hljs-built_in">cd</span> milvus-wp
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh

<span class="hljs-comment"># Create user.yaml to enable Woodpecker with local filesystem</span>
<span class="hljs-built_in">cat</span> &gt; user.yaml &lt;&lt;<span class="hljs-string">&#x27;EOF&#x27;</span>
mq:
  <span class="hljs-built_in">type</span>: woodpecker
woodpecker:
  storage:
    <span class="hljs-built_in">type</span>: <span class="hljs-built_in">local</span>
    rootPath: /var/lib/milvus/woodpecker
EOF

bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>要进一步更改 Woodpecker 设置，请更新<code translate="no">user.yaml</code> 并运行<code translate="no">bash standalone_embed.sh restart</code> 。</p>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-with-Docker-Compose-storageminio" class="common-anchor-header">使用 Docker Compose 为 Milvus Standalone 启用啄木鸟 (存储空间=minio)</h3><p><a href="/docs/zh/install_standalone-docker-compose.md">使用 Docker Compose 运行 Milvus</a>。示例：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-wp-compose &amp;&amp; <span class="hljs-built_in">cd</span> milvus-wp-compose
wget https://github.com/milvus-io/milvus/releases/download/v2.6.0/milvus-standalone-docker-compose.yml -O docker-compose.yml
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
<h2 id="Throughput-tuning-tips" class="common-anchor-header">吞吐量调整技巧<button data-href="#Throughput-tuning-tips" class="anchor-icon" translate="no">
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
    </button></h2><p>根据<a href="/docs/zh/woodpecker_architecture.md">Woodpecker</a> 中的基准和后端限制，从以下方面优化端到端写吞吐量：</p>
<ul>
<li>存储端<ul>
<li><strong>对象存储（兼容 minio/S3）</strong>：增加并发量和对象大小（避免微小对象）。注意网络和桶带宽限制。固态硬盘上的单个 MinIO 节点本地带宽上限通常在 100 MB/s 左右；单个 EC2 至 S3 的带宽上限可达 GB/s。</li>
<li><strong>本地/共享文件系统（本地）</strong>：首选 NVMe/高速磁盘。确保文件系统能很好地处理小规模写入和同步延迟。</li>
</ul></li>
<li>啄木鸟旋钮<ul>
<li>增加<code translate="no">logstore.segmentSyncPolicy.maxFlushSize</code> 和<code translate="no">maxFlushThreads</code> ，以实现更大的刷新和更高的并行性。</li>
<li>根据介质特性调整<code translate="no">maxInterval</code> （以延迟换取吞吐量，延长聚合时间）。</li>
<li>对于对象存储，可考虑增加<code translate="no">segmentRollingPolicy.maxSize</code> ，以减少段切换。</li>
</ul></li>
<li>客户端/应用端<ul>
<li>使用更大的批次规模和更多并发写入器/客户端。</li>
<li>控制刷新/索引建立时间（在触发前进行批处理），避免频繁的小规模写入。</li>
</ul></li>
</ul>
<p>批量插入演示</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">import</span> random

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://&lt;Proxy Pod IP&gt;:27017&quot;</span>,
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
    </button></h2><p>啄木鸟是一款云原生 WAL，设计用于对象存储，在吞吐量、成本和延迟之间进行权衡。目前支持的轻量级嵌入式模式优先考虑成本和吞吐量优化，因为大多数场景只要求在一定时间内写入数据，而不是要求单个写入请求的低延迟。因此，啄木鸟采用分批写入的方式，本地文件系统存储后端的默认写入间隔为 10 毫秒，类 MinIO 存储后端的默认写入间隔为 200 毫秒。在慢速写操作期间，最大延迟等于间隔时间加上刷新时间。</p>
<p>请注意，批量插入不仅由时间间隔触发，还由批量大小（默认为 2MB）触发。</p>
<p>有关架构、部署模式（MemoryBuffer / QuorumBuffer）和性能的详细信息，请参阅<a href="/docs/zh/woodpecker_architecture.md">啄木鸟架构</a>。</p>
<p>更多参数详情，请参阅 Woodpecker<a href="https://github.com/zilliztech/woodpecker">GitHub 代码库</a>。</p>
