---
id: deploy_pulsar.md
title: 使用 Docker Compose 或 Helm 設定訊息儲存空間
related_key: 'Pulsar, storage'
summary: 瞭解如何使用 Docker Compose 或 Helm 設定訊息儲存。
---
<h1 id="Configure-Message-Storage-with-Docker-Compose-or-Helm" class="common-anchor-header">使用 Docker Compose 或 Helm 設定訊息儲存空間<button data-href="#Configure-Message-Storage-with-Docker-Compose-or-Helm" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 使用 Pulsar 或 Kafka 來管理最近變更的日誌、輸出串流日誌，以及提供日誌訂閱。Pulsar 是預設的訊息儲存系統。本主題介紹如何使用 Docker Compose 或 Helm 設定訊息儲存。</p>
<p>您可以使用<a href="https://docs.docker.com/get-started/overview/">Docker Compose</a>或在 K8s 上設定 Pulsar，並在 K8s 上設定 Kafka。</p>
<h2 id="Configure-Pulsar-with-Docker-Compose" class="common-anchor-header">使用 Docker Compose 設定 Pulsar<button data-href="#Configure-Pulsar-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="1-Configure-Pulsar" class="common-anchor-header">1.設定 Pulsar</h3><p>要使用 Docker Compose 設定 Pulsar，請在 milvus/configs 路徑上的<code translate="no">milvus.yaml</code> 檔案中提供<code translate="no">pulsar</code> 部分的值。</p>
<pre><code translate="no">pulsar:
  address: localhost <span class="hljs-comment"># Address of pulsar</span>
  port: <span class="hljs-number">6650</span> <span class="hljs-comment"># Port of pulsar</span>
  maxMessageSize: <span class="hljs-number">5242880</span> <span class="hljs-comment"># 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.</span>
<button class="copy-code-btn"></button></code></pre>
<p>更多資訊請參閱<a href="/docs/zh-hant/configure_pulsar.md">Pulsar 相關設定</a>。</p>
<h3 id="2-Run-Milvus" class="common-anchor-header">2.執行 Milvus</h3><p>執行下列指令啟動使用 Pulsar 設定的 Milvus。</p>
<pre><code translate="no">docker compose up
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">配置只在 Milvus 啟動後生效。更多資訊請參閱<a href="https://milvus.io/docs/install_standalone-docker.md#Start-Milvus">啟動 Milvus</a>。</div>
<h2 id="Configure-Pulsar-with-Helm" class="common-anchor-header">使用 Helm 設定 Pulsar<button data-href="#Configure-Pulsar-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>對於 K8s 上的 Milvus 集群，你可以在啟動 Milvus 的相同指令中設定 Pulsar。另外，你也可以在啟動 Milvus 之前，使用 /charts/milvus 路徑下<a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a>套件庫中的<code translate="no">values.yml</code> 檔來設定 Pulsar。</p>
<p>關於如何使用 Helm<a href="/docs/zh-hant/configure-helm.md">設定</a> Milvus 的詳細資訊，請參考 使用<a href="/docs/zh-hant/configure-helm.md">Helm Charts 設定 Milvus</a>。有關 Pulsar 相關組態項目的詳細資訊，請參閱<a href="/docs/zh-hant/configure_pulsar.md">Pulsar 相關組態</a>。</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">使用 YAML 檔案</h3><ol>
<li>配置<code translate="no">values.yaml</code> 檔案中的<code translate="no">externalConfigFiles</code> 部分。</li>
</ol>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    pulsar:
      address: localhost <span class="hljs-comment"># Address of pulsar</span>
      port: <span class="hljs-number">6650</span> <span class="hljs-comment"># Port of Pulsar</span>
      webport: <span class="hljs-number">80</span> <span class="hljs-comment"># Web port of pulsar, if you connect direcly without proxy, should use 8080</span>
      maxMessageSize: <span class="hljs-number">5242880</span> <span class="hljs-comment"># 5 * 1024 * 1024 Bytes, Maximum size of each message in pulsar.</span>
      tenant: public
      namespace: default    
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>配置前面的部分並儲存<code translate="no">values.yaml</code> 檔案後，執行下列指令安裝使用 Pulsar 配置的 Milvus。</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-Kafka-with-Helm" class="common-anchor-header">使用 Helm 配置 Kafka<button data-href="#Configure-Kafka-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>對於 K8s 上的 Milvus 集群，你可以在啟動 Milvus 的同一個命令中配置 Kafka。另外，你也可以在啟動 Milvus 之前，使用 /charts/milvus 路徑上<a href="https://github.com/milvus-io/milvus-helm">milvus-helm</a>套件庫中的<code translate="no">values.yml</code> 檔來設定 Kafka。</p>
<p>有關如何使用 Helm<a href="/docs/zh-hant/configure-helm.md">設定</a> Milvus 的詳細資訊，請參考<a href="/docs/zh-hant/configure-helm.md">Configure Milvus with Helm Charts</a>。有關 Pulsar 相關設定項的詳細資訊，請參閱<a href="/docs/zh-hant/configure_pulsar.md">Pulsar 相關設定</a>。</p>
<h3 id="Using-the-YAML-file" class="common-anchor-header">使用 YAML 檔案</h3><ol>
<li>如果要使用 Kafka 作為訊息儲存系統，請設定<code translate="no">values.yaml</code> 檔案中的<code translate="no">externalConfigFiles</code> 部分。</li>
</ol>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    kafka:
      brokerList:
        -  &lt;your_kafka_address&gt;:&lt;your_kafka_port&gt;
      saslUsername:
      saslPassword:
      saslMechanisms: PLAIN
      securityProtocol: SASL_SSL    
<button class="copy-code-btn"></button></code></pre>
<ol start="2">
<li>配置完前面的部分並儲存<code translate="no">values.yaml</code> 檔案後，執行以下指令來安裝使用 Kafka 配置的 Milvus。</li>
</ol>
<pre><code translate="no" class="language-shell">helm install &lt;your_release_name&gt; milvus/milvus -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-RocksMQ-with-Helm" class="common-anchor-header">使用 Helm 配置 RocksMQ<button data-href="#Configure-RocksMQ-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus standalone 使用 RocksMQ 作為預設的訊息儲存空間。有關如何使用 Helm 配置 Milvus 的詳細步驟，請參考<a href="/docs/zh-hant/configure-helm.md">Configure Milvus with Helm Charts</a>。關於 RocksMQ 相關配置項的詳細步驟，請參考<a href="/docs/zh-hant/configure_rocksmq.md">RocksMQ 相關配置</a>。</p>
<ul>
<li><p>如果你用 RocksMQ 啟動 Milvus 並想要改變它的設定，你可以用以下 YAML 檔案中改變的設定執行<code translate="no">helm upgrade -f</code> 。</p></li>
<li><p>如果你已經使用 Helm 獨立安裝了 Milvus，並使用了 RocksMQ 以外的訊息存放區，想要將它改回 RocksMQ，請在刷新所有集合並停止 Milvus 後，使用以下 YAML 檔案執行<code translate="no">helm upgrade -f</code> 。</p></li>
</ul>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    rocksmq:
      <span class="hljs-comment"># The path where the message is stored in rocksmq</span>
      <span class="hljs-comment"># please adjust in embedded Milvus: /tmp/milvus/rdb_data</span>
      path: /var/lib/milvus/rdb_data
      lrucacheratio: <span class="hljs-number">0.06</span> <span class="hljs-comment"># rocksdb cache memory ratio</span>
      rocksmqPageSize: <span class="hljs-number">67108864</span> <span class="hljs-comment"># 64 MB, 64 * 1024 * 1024 bytes, The size of each page of messages in rocksmq</span>
      retentionTimeInMinutes: <span class="hljs-number">4320</span> <span class="hljs-comment"># 3 days, 3 * 24 * 60 minutes, The retention time of the message in rocksmq.</span>
      retentionSizeInMB: <span class="hljs-number">8192</span> <span class="hljs-comment"># 8 GB, 8 * 1024 MB, The retention size of the message in rocksmq.</span>
      compactionInterval: <span class="hljs-number">86400</span> <span class="hljs-comment"># 1 day, trigger rocksdb compaction every day to remove deleted data</span>
      <span class="hljs-comment"># compaction compression type, only support use 0,7.</span>
      <span class="hljs-comment"># 0 means not compress, 7 will use zstd</span>
      <span class="hljs-comment"># len of types means num of rocksdb level.</span>
      compressionTypes: [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">7</span>, <span class="hljs-number">7</span>, <span class="hljs-number">7</span>]    
<button class="copy-code-btn"></button></code></pre>
<div class="alert warning">
<p>不建議改變訊息存放區。如果您想這麼做，請先停止所有的 DDL 作業，然後再呼叫 FlushAll API 來沖洗所有的集合，最後在您實際變更訊息存放區之前停止 Milvus。</p>
</div>
<h2 id="Configure-NATS-with-Helm" class="common-anchor-header">使用 Helm 配置 NATS<button data-href="#Configure-NATS-with-Helm" class="anchor-icon" translate="no">
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
    </button></h2><p>NATS 是一個實驗性的訊息存放區，可以替代 RocksMQ。關於如何使用 Helm 配置 Milvus 的詳細步驟，請參考<a href="/docs/zh-hant/configure-helm.md">Configure Milvus with Helm Charts</a>。關於 RocksMQ 相關設定項的詳細步驟，請參考<a href="/docs/zh-hant/configure_natsmq.md">NATS 相關設定</a>。</p>
<ul>
<li><p>如果你用 NATS 啟動 Milvus 並想要改變它的設定，你可以用以下 YAML 檔案中改變的設定執行<code translate="no">helm upgrade -f</code> 。</p></li>
<li><p>如果您用 NATS 以外的消息存储安装了 Milvus standalone，并想将其更改为 NATS，请在刷新所有集合并停止 Milvus 后，使用下面的 YAML 文件运行<code translate="no">helm upgrade -f</code> 。</p></li>
</ul>
<pre><code translate="no" class="language-yaml">extraConfigFiles:
  user.yaml: |+
    mq:
      <span class="hljs-built_in">type</span>: natsmq
    natsmq:
      <span class="hljs-comment"># server side configuration for natsmq.</span>
      server: 
        <span class="hljs-comment"># 4222 by default, Port for nats server listening.</span>
        port: <span class="hljs-number">4222</span> 
        <span class="hljs-comment"># /var/lib/milvus/nats by default, directory to use for JetStream storage of nats.</span>
        storeDir: /var/lib/milvus/nats 
        <span class="hljs-comment"># (B) 16GB by default, Maximum size of the &#x27;file&#x27; storage.</span>
        maxFileStore: <span class="hljs-number">17179869184</span> 
        <span class="hljs-comment"># (B) 8MB by default, Maximum number of bytes in a message payload.</span>
        maxPayload: <span class="hljs-number">8388608</span> 
        <span class="hljs-comment"># (B) 64MB by default, Maximum number of bytes buffered for a connection applies to client connections.</span>
        maxPending: <span class="hljs-number">67108864</span> 
        <span class="hljs-comment"># (√ms) 4s by default, waiting for initialization of natsmq finished.</span>
        initializeTimeout: <span class="hljs-number">4000</span> 
        monitor:
          <span class="hljs-comment"># false by default, If true enable debug log messages.</span>
          debug: false 
          <span class="hljs-comment"># true by default, If set to false, log without timestamps.</span>
          logTime: true 
          <span class="hljs-comment"># no log file by default, Log file path relative to.. .</span>
          logFile: 
          <span class="hljs-comment"># (B) 0, unlimited by default, Size in bytes after the log file rolls over to a new one.</span>
          logSizeLimit: <span class="hljs-number">0</span> 
        retention:
          <span class="hljs-comment"># (min) 3 days by default, Maximum age of any message in the P-channel.</span>
          maxAge: <span class="hljs-number">4320</span> 
          <span class="hljs-comment"># (B) None by default, How many bytes the single P-channel may contain. Removing oldest messages if the P-channel exceeds this size.</span>
          maxBytes:
          <span class="hljs-comment"># None by default, How many message the single P-channel may contain. Removing oldest messages if the P-channel exceeds this limit.    </span>
          maxMsgs: 
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>在 RocksMQ 和 NATS 之間做選擇？</strong></p>
<p>RockMQ 使用 CGO 與 RocksDB 互動，並自行管理記憶體，而 Milvus 安裝中內嵌的純 Go NATS 則將記憶體管理委託給 Go 的垃圾回收器 (GC)。</p>
<p>在資料封包小於 64 kb 的情況下，RocksDB 在記憶體使用量、CPU 使用量和回應時間上都比較優勝。另一方面，如果資料封包大於 64 kb，NATS 在有足夠記憶體和理想 GC 排程的情況下，在回應時間上表現優異。</p>
<p>目前，建議您僅在實驗中使用 NATS。</p>
</div>
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
    </button></h2><p>學習如何使用 Docker Compose 或 Helm 配置其他 Milvus 依賴項目：</p>
<ul>
<li><a href="/docs/zh-hant/deploy_s3.md">使用 Docker Compose 或 Helm 配置物件儲存空間</a></li>
<li><a href="/docs/zh-hant/deploy_etcd.md">使用 Docker Compose 或 Helm 設定 Meta 儲存空間</a></li>
</ul>
