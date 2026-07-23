---
id: woodpecker.md
title: Woodpecker
related_key: Woodpecker
summary: 了解 Woodpecker 如何在 Milvus 中作為預設訊息佇列（WAL）運作，以及如何以嵌入式或服務模式執行它。
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
    </button></h1><p>Woodpecker 是 Milvus 3.x 中的<strong>預設訊息佇列（預寫日誌，WAL）</strong>。它是一款專為物件儲存設計的雲原生 WAL，具備高吞吐量、低運作開銷及無縫擴展性。有關架構與效能測試的詳細資訊，請參閱<a href="/docs/zh-hant/woodpecker_architecture.md">Woodpecker</a>。</p>
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
<li>在 Milvus 3.x 中，Woodpecker<strong>作為預設的</strong>WAL／訊息佇列，以日誌服務的身分提供有序寫入與復原功能。無需額外使用外部訊息佇列服務（例如 Pulsar 或 Kafka）。</li>
<li>Woodpecker 可以<strong>內嵌於</strong>Milvus/streaming 節點中運行（預設），或作為擁有獨立 Pod<strong>的專用服務</strong>運行（僅限分散式／叢集環境）。</li>
<li>它支援三種<code translate="no">storage.type</code> 模式：物件儲存（<code translate="no">minio</code> ，預設）、本地檔案系統（<code translate="no">local</code> ）以及專用的<code translate="no">service</code> 。請參閱「<a href="#Deployment-modes">部署模式</a>」。</li>
</ul>
<h2 id="Quick-start" class="common-anchor-header">快速入門<button data-href="#Quick-start" class="anchor-icon" translate="no">
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
    </button></h2><p>若要啟用 Woodpecker，請將 MQ 類型設定為 Woodpecker：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">mq:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">woodpecker</span>
<button class="copy-code-btn"></button></code></pre>
<p>注意：針對正在運行的叢集切換<code translate="no">mq.type</code> 屬於升級操作。請仔細遵循升級程序，並在切換至生產環境前，先於全新叢集進行驗證。</p>
<h2 id="Configuration" class="common-anchor-header">設定<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>以下是完整的 Woodpecker 配置區塊（編輯<code translate="no">milvus.yaml</code> 或在<code translate="no">user.yaml</code> 中覆寫）：</p>
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
<p>重點說明：</p>
<ul>
<li><code translate="no">woodpecker.meta</code>
<ul>
<li><strong>type</strong>：目前僅支援<code translate="no">etcd</code> 。請與 Milvus 共用同一個 etcd 來儲存輕量級元資料。</li>
<li><strong>prefix</strong>：元資料的鍵前綴。預設值：<code translate="no">woodpecker</code> 。</li>
</ul></li>
<li><code translate="no">woodpecker.client</code>
<ul>
<li>控制客戶端端的區段追加／滾動／稽核行為，以平衡吞吐量與端到端延遲。</li>
</ul></li>
<li><code translate="no">woodpecker.logstore</code>
<ul>
<li>控制日誌區段的同步／排空／壓縮／讀取政策。這些是調整吞吐量與延遲的主要控制項。</li>
</ul></li>
<li><code translate="no">woodpecker.storage</code>
<ul>
<li><strong>類型</strong>：<code translate="no">minio</code> 適用於 MinIO/S3 相容的物件儲存（MinIO/S3/GCS/OSS 等）；<code translate="no">local</code> 適用於本機/共用檔案系統。</li>
<li><strong>rootPath</strong>：儲存後端的根路徑（僅適用於<code translate="no">local</code> ；若使用<code translate="no">minio</code> ，路徑則由儲存桶／前綴決定）。</li>
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
    </button></h2><p>Woodpecker 支援三種<code translate="no">storage.type</code> 模式：</p>
<table>
<thead>
<tr><th><code translate="no">storage.type</code></th><th>Woodpecker 的運作方式</th><th>WAL 後端</th><th>Milvus 獨立模式</th><th>Milvus 分散式（叢集）</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">minio</code> （預設）</td><td>嵌入於 Milvus/串流節點中</td><td>物件儲存（MinIO／S3 相容）</td><td>受支援</td><td>支援</td></tr>
<tr><td><code translate="no">local</code></td><td>內建於 Milvus/串流節點中</td><td>本機檔案系統</td><td>支援</td><td>有限（所有節點都需要共用檔案系統，例如 NFS）</td></tr>
<tr><td><code translate="no">service</code></td><td><strong>專用的 Woodpecker 服務</strong>（擁有專屬的 Pod）</td><td>物件儲存（MinIO／S3 相容）</td><td><strong>不支援</strong></td><td>受支援</td></tr>
</tbody>
</table>
<p>備註：</p>
<ul>
<li>在<code translate="no">minio</code> 模式下，Woodpecker與Milvus共用相同的物件儲存（MinIO/S3/GCS/OSS等）。</li>
<li>在「<code translate="no">local</code> 」模式下，單節點本機磁碟僅適用於「獨立模式」。若所有 Pod 皆可存取共用檔案系統（例如 NFS），則「叢集模式」亦可使用「<code translate="no">local</code> 」。</li>
<li><strong><code translate="no">service</code> 此模式將 Woodpecker 作為獨立且可自主擴展的服務運行，僅適用於分散式／叢集部署。</strong>獨立部署則使用內嵌模式（<code translate="no">minio</code> 或<code translate="no">local</code> ）。</li>
</ul>
<h2 id="Object-storage-compatibility-for-storagetypeminio" class="common-anchor-header">物件儲存相容性<code translate="no">storage.type=minio</code><button data-href="#Object-storage-compatibility-for-storagetypeminio" class="anchor-icon" translate="no">
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
    </button></h2><p>下表彙整了當 Woodpecker 配置為<code translate="no">storage.type=minio</code> 時，目前已知的物件儲存後端相容性。此資訊基於<a href="https://github.com/zilliztech/woodpecker/discussions/150">GitHub 討論 #150</a>。</p>
<table>
<thead>
<tr><th>供應商／服務</th><th>狀態</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td>Azure Blob Storage</td><td>受支援</td><td>使用原生 Azure SDK。</td></tr>
<tr><td>AWS S3</td><td>已支援</td><td>原生 S3，並完全支援條件寫入。</td></tr>
<tr><td>MinIO (<code translate="no">&gt;= 2024-12</code>)</td><td>已支援</td><td>完整支援 S3 條件寫入功能。</td></tr>
<tr><td>阿里雲 OSS</td><td>已支援</td><td>透過其 S3 相容介面提供支援。</td></tr>
<tr><td>騰訊 COS</td><td>支援</td><td>透過其 S3 相容介面提供支援。</td></tr>
<tr><td>Google Cloud Storage (GCS)</td><td>受支援</td><td>透過 S3 互通模式支援。</td></tr>
<tr><td>華為雲 OBS</td><td>不支援</td><td>缺乏所需的「條件寫入」語義。</td></tr>
<tr><td>VAST Data</td><td>受支援</td><td>經社群驗證；僅適用於非版本化儲存桶。</td></tr>
<tr><td>其他 S3 相容儲存服務</td><td>部分</td><td>取決於是否完全支援 S3 條件寫入語義。</td></tr>
</tbody>
</table>
<p>備註：</p>
<ul>
<li>相容性取決於原生 SDK 的支援，或對 S3 條件寫入語義的支援。</li>
<li>若您為 Woodpecker 自行架設 MinIO，請使用<code translate="no">RELEASE.2024-12-18T13-15-44Z</code> 或更新版本。</li>
<li>此對照表反映<a href="https://github.com/zilliztech/woodpecker/discussions/150">當前的討論內容</a>，並可能隨著後端支援的進一步驗證而有所變動。</li>
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
    </button></h2><h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Milvus-Operator-storageminio" class="common-anchor-header">在 Kubernetes 上的 Milvus 叢集中啟用 Woodpecker（Milvus Operator，storage=minio）<button data-href="#Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Milvus-Operator-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p>安裝<a href="/docs/zh-hant/install_cluster-milvusoperator.md">Milvus Operator</a> 後，請參照官方範例啟動已啟用 Woodpecker 的 Milvus 叢集：</p>
<pre><code translate="no" class="language-bash">kubectl apply -f https://raw.githubusercontent.com/zilliztech/milvus-operator/main/config/samples/milvus_cluster_woodpecker.yaml

<button class="copy-code-btn"></button></code></pre>
<p>此範例將 Woodpecker 設定為訊息佇列，並啟用串流節點。首次啟動時，拉取映像檔可能需要一些時間；請等待直到所有 Pod 都準備就緒：</p>
<pre><code translate="no" class="language-bash">kubectl get pods
kubectl get milvus my-release -o yaml | grep -A2 status
<button class="copy-code-btn"></button></code></pre>
<p>準備就緒後，您應會看到類似以下的 Pod：</p>
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
<p>執行以下指令以解除安裝 Milvus 叢集。</p>
<pre><code translate="no" class="language-bash">kubectl delete milvus my-release
<button class="copy-code-btn"></button></code></pre>
<p>若需調整 Woodpecker 參數，請參照「<a href="#Configuration">設定</a>」章節中的說明進行設定。</p>
<h3 id="Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Helm-Chart-storageminio" class="common-anchor-header">在 Kubernetes 上為 Milvus 叢集啟用 Woodpecker（Helm 圖表，storage=minio）<button data-href="#Enable-Woodpecker-for-a-Milvus-Cluster-on-Kubernetes-Helm-Chart-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p>首先，請依照《<a href="/docs/zh-hant/install_cluster-helm.md">使用 Helm 在 Kubernetes 上執行 Milvus</a>》中的說明，新增並更新 Milvus Helm 圖表。</p>
<p>接著，請參照以下範例之一進行部署：</p>
<p>– 叢集部署（建議設定：啟用 Woodpecker 與串流節點）：</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> indexNode.enabled=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>– 獨立部署（已啟用 Woodpecker）：</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> cluster.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> pulsarv3.enabled=<span class="hljs-literal">false</span> \
  --<span class="hljs-built_in">set</span> standalone.messageQueue=woodpecker \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p>部署完成後，請依照文件說明進行端口轉發並建立連線。若要調整 Woodpecker 參數，請參照「<a href="#Configuration">設定</a>」章節中的說明進行設定。</p>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-in-Docker-storagelocal" class="common-anchor-header">在 Docker 中的 Milvus 獨立模式（storage=local）啟用 Woodpecker<button data-href="#Enable-Woodpecker-for-Milvus-Standalone-in-Docker-storagelocal" class="anchor-icon" translate="no">
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
    </button></h3><p>在 Milvus 3.x 中，Docker 獨立部署<strong>預設會使用</strong>Woodpecker<strong>，並以本地檔案系統</strong>作為其 WAL 後端 — 無需額外配置。請參照《<a href="/docs/zh-hant/install_standalone-docker.md">在 Docker 中執行 Milvus</a>》：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">mkdir</span> milvus-wp &amp;&amp; <span class="hljs-built_in">cd</span> milvus-wp
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>若要調整 Woodpecker，請在首次啟動後編輯生成的 `<code translate="no">user.yaml</code> ` 檔案，並執行 `<code translate="no">bash standalone_embed.sh restart</code> ` 以套用變更（執行 `<code translate="no">start</code> ` 會重新生成 `<code translate="no">user.yaml</code>`，因此請使用 `<code translate="no">restart</code>` 來套用編輯內容）：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># user.yaml</span>
<span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">logstore:</span>
    <span class="hljs-attr">segmentSyncPolicy:</span>
      <span class="hljs-attr">maxFlushThreads:</span> <span class="hljs-number">16</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Enable-Woodpecker-for-Milvus-Standalone-with-Docker-Compose-storageminio" class="common-anchor-header">透過 Docker Compose 為 Milvus 獨立執行環境啟用 Woodpecker（storage=minio）<button data-href="#Enable-Woodpecker-for-Milvus-Standalone-with-Docker-Compose-storageminio" class="anchor-icon" translate="no">
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
    </button></h3><p>請參照《<a href="/docs/zh-hant/install_standalone-docker-compose.md">使用 Docker Compose 執行 Milvus</a>》。範例：</p>
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
<h3 id="Enable-Woodpecker-service-mode-for-a-Milvus-Cluster-Helm" class="common-anchor-header">為 Milvus 叢集（Helm）啟用 Woodpecker 服務模式<button data-href="#Enable-Woodpecker-service-mode-for-a-Milvus-Cluster-Helm" class="anchor-icon" translate="no">
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
    </button></h3><p>Woodpecker<strong>服務模式是</strong> <strong>Milvus 3.0</strong>的一項功能。對於分散式／叢集部署，您可以透過設定 `<code translate="no">streaming.woodpecker.embedded=false</code>`，將 Woodpecker<strong>作為專用服務</strong>（獨立 Pod）運行，而非嵌入串流節點中：</p>
<pre><code translate="no" class="language-bash">helm install my-release zilliztech/milvus \
  --<span class="hljs-built_in">set</span> image.all.tag=v3.0-beta \
  --<span class="hljs-built_in">set</span> woodpecker.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> woodpecker.image.tag=v0.1.34 \
  --<span class="hljs-built_in">set</span> streaming.enabled=<span class="hljs-literal">true</span> \
  --<span class="hljs-built_in">set</span> streaming.woodpecker.embedded=<span class="hljs-literal">false</span>
<button class="copy-code-btn"></button></code></pre>
<p>此設定將 Woodpecker 部署為專用的 StatefulSet（<code translate="no">my-release-milvus-woodpecker</code> ，預設 4 個複本），由無頭服務作為前端，透過<code translate="no">18080</code> （服務）、<code translate="no">17946</code> （閒聊）及<code translate="no">9091</code> （指標）這三個埠進行閒聊式叢集協調，並以 MinIO 作為其儲存後端。 該服務需要<strong>3</strong>個節點的法定人數；預設的<strong>4 個</strong>複本既能維持法定人數，又能容忍單一節點故障，因此請勿將<code translate="no">woodpecker.replicaCount</code> 設定為低於 3。該叢集還包含一個獨立的<code translate="no">woodpecker</code> Pod 集合：</p>
<pre><code translate="no"><span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">0</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">1</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">2</span>
<span class="hljs-keyword">my</span>-release-milvus-woodpecker-<span class="hljs-number">3</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Woodpecker 的<code translate="no">service</code> 模式僅適用於<strong>分散式／叢集部署</strong>— 獨立部署則會執行內嵌式 Woodpecker（<code translate="no">minio</code> 或<code translate="no">local</code> ）。Milvus Operator 目前尚不支援 Woodpecker 服務模式。</p>
</div>
<h2 id="Throughput-tuning-tips" class="common-anchor-header">吞吐量調校要訣<button data-href="#Throughput-tuning-tips" class="anchor-icon" translate="no">
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
    </button></h2><p>Woodpecker<strong>在嵌入式</strong>模式與<strong>服務</strong>模式（Milvus 3.0 的新功能）下的吞吐量與延遲表現各不相同。以下指引將依模式分別說明。</p>
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
    </button></h3><p>根據<a href="/docs/zh-hant/woodpecker_architecture.md">Woodpecker</a> 中的基準測試結果與後端限制，請從以下方面優化端到端的寫入吞吐量：</p>
<ul>
<li>儲存端
<ul>
<li><strong>物件儲存（MinIO／S3 相容）</strong>：提高並發數並增大物件大小（避免使用微小物件）。注意網路與儲存桶的頻寬限制。單一搭載 SSD 的 MinIO 節點，本地頻寬通常上限約為 100 MB/s；單一從 EC2 傳輸至 S3 的頻寬則可達 GB/s。</li>
<li><strong>本機／共用檔案系統（本機）</strong>：優先選用 NVMe／高速硬碟。確保檔案系統能妥善處理小量寫入及 fsync 延遲。</li>
</ul></li>
<li>Woodpecker 調整參數
<ul>
<li>增加 `<code translate="no">logstore.segmentSyncPolicy.maxFlushSize</code> ` 和 `<code translate="no">maxFlushThreads</code> ` 參數值，以實現更大的寫入批次及更高的並行度。</li>
<li>根據儲存媒體特性調整<code translate="no">maxInterval</code> （透過延長聚合時間，在延遲與吞吐量之間取得平衡）。</li>
<li>對於物件儲存，可考慮增加<code translate="no">segmentRollingPolicy.maxSize</code> 以減少區段切換。</li>
</ul></li>
<li>客戶端／應用程式端
<ul>
<li>使用較大的批次大小，並增加並行寫入者／客戶端數量。</li>
<li>控制刷新／索引建置的時機（在觸發前先進行批次彙總），以避免頻繁的小量寫入。</li>
</ul></li>
</ul>
<h3 id="Service-mode-Milvus-30+" class="common-anchor-header">服務模式（Milvus 3.0+）<button data-href="#Service-mode-Milvus-30+" class="anchor-icon" translate="no">
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
    </button></h3><p>服務模式在維持以物件儲存為後端的 WAL 高寫入吞吐量的同時，還增加了低延遲（請參閱「<a href="#Latency">延遲」</a>）。 上述儲存端與客戶端側的調校方法依然適用；此外，由於 Woodpecker 以獨立服務形式運行，您可以透過增加複本（<code translate="no">woodpecker.replicaCount</code> ，預設為 4）來水平擴展寫入容量，且寫入操作可受益於單 RTT 法定人數複製，以及能避免經由中介伺服器轉發的拓撲感知讀取機制。</p>
<p><strong>批次插入示範</strong>— 請使用以下指令測量寫入吞吐量：</p>
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
    </button></h3><p>Woodpecker 是一款專為物件儲存設計的雲原生 WAL，在吞吐量、成本與延遲之間取得權衡。輕量級的嵌入式模式優先考量成本與吞吐量的優化，因為多數情境僅需在特定時間內完成資料寫入，而非要求個別寫入請求具備低延遲。 因此，Woodpecker 採用批次寫入機制，針對本地檔案系統儲存後端，預設間隔為 10 毫秒；針對 MinIO 類型的儲存後端，預設間隔則為 200 毫秒。在寫入速度較慢的情況下，最大延遲等於間隔時間加上沖洗時間。</p>
<p>請注意，批次插入不僅由時間間隔觸發，亦受批次大小影響，其預設值為 2MB。</p>
<h3 id="Service-mode-Milvus-30+" class="common-anchor-header">服務模式（Milvus 3.0+）<button data-href="#Service-mode-Milvus-30+" class="anchor-icon" translate="no">
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
    </button></h3><p>服務模式在維持低成本的同時，可實現<strong>毫秒級的寫入延遲</strong>——與傳統的三副本本地磁碟 WAL 處於同一量級。在典型的三副本跨可用區域（AZ）部署中，寫入延遲維持在毫秒範圍內。其實現方式如下：</p>
<ul>
<li><strong>單 RTT 法定數寫入</strong>— 由客戶端驅動的複製可在單次往返內完成法定數寫入，且跨可用區域（AZ）的流量固定為兩個副本的資料量（相較於基於中介/領導節點的複製通常會產生額外約 1/3 的跨可用區域流量）。</li>
<li><strong>拓撲感知單跳讀取</strong>— 每次讀取皆直接連線至最近的副本，而非透過中介節點轉發，從而避免了基於中介節點系統中隨機的跨可用區域讀取（約佔跨可用區域讀取流量的 2/3）。</li>
<li><strong>區段滾動後立即上傳至物件儲存</strong>— 每個區段皆追蹤其完整生命週期，並在滾動後立即上傳至物件儲存，在維持低延遲的同時，將本地磁碟佔用空間與儲存成本控制在低水平。</li>
<li><strong>無需持續的節點間複製</strong>— 日誌持久化至充當共享儲存的物件儲存中，因此故障轉移時僅需重新上傳存活的副本（無需複製整個節點），擴展能力不受節點間複製頻寬限制，且大規模節點更換也不會引發複製風暴。</li>
</ul>
<p>在跨可用區域（AZ）部署中，相較於基於中介服務器的日誌系統，此服務模式還能節省約<strong>1/3 的寫入流量</strong>及<strong>2/3 的讀取</strong>流量。完整的設計與成本分析，請參閱《<a href="/docs/zh-hant/woodpecker_architecture.md">Woodpecker 架構</a>》。</p>
<p>有關架構、部署模式（MemoryBuffer / QuorumBuffer）及效能的詳細資訊，請參閱《<a href="/docs/zh-hant/woodpecker_architecture.md">Woodpecker 架構</a>》。</p>
<p>如需更多參數詳情，請參閱 Woodpecker<a href="https://github.com/zilliztech/woodpecker">GitHub 儲存庫</a>。</p>
