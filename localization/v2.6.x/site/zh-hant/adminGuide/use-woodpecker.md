---
id: use-woodpecker.md
title: 使用啄木鳥 (Milvus v2.6.x)
related_key: Woodpecker
summary: 學習如何啟用啄木鳥作為 milvus 中的 WAL。
---
<h2 id="Use-Woodpecker-Milvus-v26x" class="common-anchor-header">使用 Woodpecker (Milvus v2.6.x)<button data-href="#Use-Woodpecker-Milvus-v26x" class="anchor-icon" translate="no">
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
    </button></h2><p>本指南說明如何在 Milvus 2.6.x 中啟用和使用 Woodpecker 作為 Write-Ahead Log (WAL)。Woodpecker 是專為物件儲存而設計的雲端原生 WAL，提供高吞吐量、低操作開銷和無縫擴充能力。有關架構和基準的詳細資訊，請參閱<a href="/docs/zh-hant/woodpecker_architecture.md">Woodpecker</a>。</p>
<h3 id="Overview" class="common-anchor-header">概述</h3><ul>
<li>從 Milvus 2.6 開始，Woodpecker 是一個可選的 WAL，提供有序寫入和恢復的日誌服務。</li>
<li>作為訊息佇列的選擇，它的行為與 Pulsar/Kafka 相似，並可透過設定啟用。</li>
<li>支援兩種儲存後端：本機檔案系統 (<code translate="no">local</code>) 和物件儲存 (<code translate="no">minio</code>/S3 相容)。</li>
</ul>
<h3 id="Quick-start" class="common-anchor-header">快速啟動</h3><p>要啟用 Woodpecker，請將 MQ 類型設定為 Woodpecker：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<p>注意：為運行中的群集切換<code translate="no">mq.type</code> 是一項升級作業。在切換生產之前，請仔細遵循升級步驟，並在新的群集上進行驗證。</p>
<h3 id="Configuration" class="common-anchor-header">配置</h3><p>以下是完整的 Woodpecker 配置區塊 (編輯<code translate="no">milvus.yaml</code> 或在<code translate="no">user.yaml</code> 中覆寫 )：</p>
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
<p>主要注意事項：</p>
<ul>
<li><code translate="no">woodpecker.meta</code>
<ul>
<li><strong>類型</strong>：目前僅支援<code translate="no">etcd</code> 。重複使用與 Milvus 相同的 etcd 來儲存輕量級的 metadata。</li>
<li><strong>prefix</strong>：元資料的關鍵前綴。預設：<code translate="no">woodpecker</code> 。</li>
</ul></li>
<li><code translate="no">woodpecker.client</code>
<ul>
<li>控制用戶端的段附加/滾動/稽核行為，以平衡吞吐量和端對端延遲。</li>
</ul></li>
<li><code translate="no">woodpecker.logstore</code>
<ul>
<li>控制日誌段的同步/刷新/壓縮/讀取政策。這些是吞吐量/延遲調整的主要旋鈕。</li>
</ul></li>
<li><code translate="no">woodpecker.storage</code>
<ul>
<li><strong>type</strong>:<code translate="no">minio</code> 適用於 MinIO/S3 相容的物件儲存 (MinIO/S3/GCS/OSS 等)；<code translate="no">local</code> 適用於本機/共用檔案系統。</li>
<li><strong>rootPath</strong>：儲存後端的根路徑 (對<code translate="no">local</code> 有效；使用<code translate="no">minio</code> 時，路徑由 bucket/prefix 決定)。</li>
</ul></li>
</ul>
<h3 id="Deployment-modes" class="common-anchor-header">部署模式</h3><p>Milvus 支援 Standalone 和 Cluster 兩種模式。Woodpecker 儲存後端支援矩陣：</p>
<table>
<thead>
<tr><th></th><th><code translate="no">storage.type=local</code></th><th><code translate="no">storage.type=minio</code></th></tr>
</thead>
<tbody>
<tr><td>Milvus 單機版</td><td>支援</td><td>支援</td></tr>
<tr><td>Milvus 集群</td><td>有限 (需要共享 FS)</td><td>支援</td></tr>
</tbody>
</table>
<p>備註：</p>
<ul>
<li>使用<code translate="no">minio</code> ，Woodpecker 與 Milvus 共用相同的物件儲存空間 (MinIO/S3/GCS/OSS 等)。</li>
<li>使用<code translate="no">local</code> ，單結點本機磁碟僅適用於 Standalone。如果所有 Pod 都可以存取共用檔案系統 (例如 NFS)，Cluster 模式也可以使用<code translate="no">local</code> 。</li>
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
    </button></h2><h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Milvus-Operator-storageminio" class="common-anchor-header">為 Kubernetes 上的 Milvus Cluster 啟用 Woodpecker (Milvus Operator, storage=minio)</h3><p>安裝<a href="/docs/zh-hant/install_cluster-milvusoperator.md">Milvus Operator</a> 之後，使用官方範例啟用 Woodpecker 來啟動 Milvus 叢集：</p>
<pre><code translate="no" class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_woodpecker.yaml

<button class="copy-code-btn"></button></code></pre>
<p>此範例會設定 Woodpecker 為訊息佇列，並啟用 Streaming Node。第一次啟動可能需要一些時間來拉取影像；請等待直到所有 Pod 都準備就緒：</p>
<pre><code translate="no" class="language-bash">kubectl get pods
kubectl get milvus my-release -o yaml | grep -A2 status
<button class="copy-code-btn"></button></code></pre>
<p>準備就緒後，您應該會看到類似以下的 Pod：</p>
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
<p>執行下列指令卸載 Milvus 叢集。</p>
<pre><code translate="no" class="language-bash">kubectl delete milvus my-release
<button class="copy-code-btn"></button></code></pre>
<p>如果您需要調整 Woodpecker 參數，請遵循<a href="/docs/zh-hant/deploy_pulsar.md">message storage config</a> 中所述的設定。</p>
<h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Helm-Chart-storageminio" class="common-anchor-header">為 Kubernetes 上的 Milvus 叢集啟用 Woodpecker (Helm Chart, storage=minio)</h3><p>首先按照在<a href="/docs/zh-hant/install_cluster-helm.md">Kubernetes 中使用 Helm 執行 Milvus 中</a>所述，新增並更新<a href="/docs/zh-hant/install_cluster-helm.md">Milvus</a> Helm 圖表。</p>
<p>然後使用下列其中一個範例進行部署：</p>
<p>- 群集部署（建議設定啟用 Woodpecker 和 Streaming Node）：</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v2.6.0 \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>- 獨立部署 (啟用 Woodpecker)：</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v2.6.0 \
  --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> standalone.messageQueue=woodpecker \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>部署完成後，按照說明文件進行連接埠轉接和連接。若要調整 Woodpecker 參數，請遵循<a href="/docs/zh-hant/deploy_pulsar.md">訊息儲存配置</a>中所述的設定。</p>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-in-Docker-storagelocal" class="common-anchor-header">在 Docker 中為 Milvus 單機啟用 Woodpecker (儲存=本地)</h3><p>遵循<a href="/docs/zh-hant/install_standalone-docker.md">在 Docker 中執行 Milvus</a>。範例：</p>
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
<p>若要進一步變更 Woodpecker 設定，請更新<code translate="no">user.yaml</code> 並執行<code translate="no">bash standalone_embed.sh restart</code> 。</p>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-with-Docker-Compose-storageminio" class="common-anchor-header">使用 Docker Compose 為 Milvus Standalone 啟用 Woodpecker (儲存空間=minio)</h3><p>遵循<a href="/docs/zh-hant/install_standalone-docker-compose.md">使用 Docker Compose 執行 Milvus</a>。範例：</p>
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
<h2 id="Throughput-tuning-tips" class="common-anchor-header">吞吐量調整技巧<button data-href="#Throughput-tuning-tips" class="anchor-icon" translate="no">
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
    </button></h2><p>根據<a href="/docs/zh-hant/woodpecker_architecture.md">Woodpecker</a> 中的基準和後端限制，從以下幾方面優化端到端的寫入吞吐量：</p>
<ul>
<li>儲存端<ul>
<li><strong>物件儲存 (minio/S3 相容)：</strong>增加並發量和物件大小 (避免極小的物件)。注意網路和儲存桶的頻寬限制。SSD 上的單一 MinIO 節點在本機的上限通常約為 100 MB/s；單一 EC2 至 S3 的上限可達 GB/s。</li>
<li><strong>本機/共用檔案系統 (本機)：</strong>偏好 NVMe/快速磁碟。確保 FS 能妥善處理小型寫入和 fsync 延遲。</li>
</ul></li>
<li>啄木鳥旋鈕<ul>
<li>增加<code translate="no">logstore.segmentSyncPolicy.maxFlushSize</code> 和<code translate="no">maxFlushThreads</code> ，以獲得更大的刷新和更高的並行性。</li>
<li>根據媒體特性調整<code translate="no">maxInterval</code> (以延遲換取較長聚合的吞吐量)。</li>
<li>對於物件儲存，可考慮增加<code translate="no">segmentRollingPolicy.maxSize</code> 以減少區段切換。</li>
</ul></li>
<li>用戶端/應用程式端<ul>
<li>使用更大的批次大小和更多的並發寫入程式/用戶端。</li>
<li>控制刷新/索引建立時間 (在觸發之前批次建立)，以避免頻繁的小寫入。</li>
</ul></li>
</ul>
<p>批次插入示範</p>
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
<h2 id="Latency" class="common-anchor-header">延遲<button data-href="#Latency" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker 是專為物件儲存而設計的雲原生 WAL，可在吞吐量、成本和延遲之間進行權衡。目前支援的輕量級嵌入式模式優先優化成本和吞吐量，因為大多數情況只要求在一定時間內寫入資料，而不是要求個別寫入請求的低延遲。因此，Woodpecker 採用分批寫入，本機檔案系統儲存後端預設間隔為 10 毫秒，類似 MinIO 的儲存後端預設間隔為 200 毫秒。在慢速寫入作業期間，最大延遲等於間隔時間加上刷新時間。</p>
<p>請注意，批次插入不僅會由時間間隔觸發，也會由預設為 2MB 的批次大小觸發。</p>
<p>有關架構、部署模式 (MemoryBuffer / QuorumBuffer) 和效能的詳細資訊，請參閱<a href="/docs/zh-hant/woodpecker_architecture.md">Woodpecker Architecture</a>。</p>
<p>如需瞭解更多參數詳情，請參閱 Woodpecker<a href="https://github.com/zilliztech/woodpecker">GitHub 套件庫</a>。</p>
