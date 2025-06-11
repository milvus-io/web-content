---
id: system_configuration.md
related_key: configure
group: system_configuration.md
summary: 了解 Milvus 的系統設定。
---

<h1 id="Milvus-System-Configurations-Checklist" class="common-anchor-header">Milvus 系統配置清單<button data-href="#Milvus-System-Configurations-Checklist" class="anchor-icon" translate="no">
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
    </button></h1><p>本主題介紹 Milvus 系統配置的一般部分。</p>
<p>Milvus 維護相當多的參數來設定系統。每個組態都有預設值，可以直接使用。您可以靈活地修改這些參數，使 Milvus 能更好地為您的應用程式服務。更多資訊請參閱<a href="/docs/zh-hant/v2.5.x/configure-docker.md">配置 Milvus</a>。</p>
<div class="alert note">
在目前的版本中，所有參數只有在啟動 Milvus 時設定後才會生效。</div>
<h2 id="Sections" class="common-anchor-header">章節<button data-href="#Sections" class="anchor-icon" translate="no">
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
    </button></h2><p>為了方便維護，Milvus 根據其元件、相依性和一般用法，將其配置分類為 %s 區段。</p>
<h3 id="etcd" class="common-anchor-header"><code translate="no">etcd</code></h3><p>etcd 相關設定，用來儲存 Milvus 元資料 &amp; 服務發現。</p>
<p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_etcd.md">etcd 相關組態</a>，以取得本節下各參數的詳細說明。</p>
<h3 id="metastore" class="common-anchor-header"><code translate="no">metastore</code></h3><p>本節下各參數的詳細說明，請參閱<a href="/docs/zh-hant/v2.5.x/configure_metastore.md">metastore 相關組態</a>。</p>
<h3 id="tikv" class="common-anchor-header"><code translate="no">tikv</code></h3><p>tikv 的相關設定，用於儲存 Milvus 元資料。</p>
<p>請注意，當為 metastore 啟用 TiKV 時，您仍需要使用 etcd 來發現服務。</p>
<p>當元資料大小需要更好的水平擴充性時，TiKV 是一個不錯的選擇。</p>
<p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_tikv.md">tikv 相關組態</a>，以取得本節下各參數的詳細說明。</p>
<h3 id="localStorage" class="common-anchor-header"><code translate="no">localStorage</code></h3><p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_localstorage.md">localStorage 相關組態</a>，以取得本節下各參數的詳細說明。</p>
<h3 id="minio" class="common-anchor-header"><code translate="no">minio</code></h3><p>MinIO/S3/GCS 或任何其他服務的相關設定支援 S3 API，S3 API 負責 Milvus 的資料持久化。</p>
<p>為了簡單起見，我們在以下說明中將儲存服務稱為「MinIO/S3」。</p>
<p>本節下各參數的詳細說明，請參閱<a href="/docs/zh-hant/v2.5.x/configure_minio.md">minio 相關組態</a>。</p>
<h3 id="mq" class="common-anchor-header"><code translate="no">mq</code></h3><p>Milvus 支援四種 MQ：rocksmq（基於 RockDB）、natsmq（內嵌 nats-server）、Pulsar 和 Kafka。</p>
<p>您可以透過設定 mq.type 欄位來變更您的 MQ。</p>
<p>如果您不將 mq.type 欄位設定為預設值，如果我們在此檔案中設定多個 mq，則會有啟用優先順序的注意事項。</p>
<ol>
<li><p>獨立（本機）模式：rocksmq（預設） &gt; natsmq &gt; Pulsar &gt; Kafka</p></li>
<li><p>群集模式：  Pulsar(default) &gt; Kafka (群集模式不支援 rocksmq 和 natsmq)</p></li>
</ol>
<p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_mq.md">mq 相關組態</a>，以取得本節下各參數的詳細說明。</p>
<h3 id="pulsar" class="common-anchor-header"><code translate="no">pulsar</code></h3><p>pulsar 相關設定，用來管理 Milvus 最近突變作業的日誌、輸出串流日誌，並提供日誌發佈-訂閱服務。</p>
<p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_pulsar.md">pulsar 相關設定</a>，以瞭解本節下每個參數的詳細說明。</p>
<h3 id="rocksmq" class="common-anchor-header"><code translate="no">rocksmq</code></h3><p>如果你想啟用 kafka，需要註解 pulsar configs</p>
<p>kafka：</p>
<p>brokerList: localhost:9092</p>
<p>saslUsername：</p>
<p>saslPassword：</p>
<p>saslMechanisms：</p>
<p>securityProtocol：</p>
<p>ssl：</p>
<pre><code translate="no">enabled: false # whether to enable ssl mode

tlsCert: # path to client's public key (PEM) used for authentication

tlsKey: # path to client's private key (PEM) used for authentication

tlsCaCert: # file or directory path to CA certificate(s) for verifying the broker's key

tlsKeyPassword: # private key passphrase for use with ssl.key.location and set_ssl_cert(), if any
</code></pre>

<p>readTimeout：10</p>
<p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_rocksmq.md">rocksmq 相關組態</a>，以取得本節下各參數的詳細說明。</p>
<h3 id="natsmq" class="common-anchor-header"><code translate="no">natsmq</code></h3><p>natsmq 配置。</p>
<p>更多詳細資訊：https://docs.nats.io/running-a-nats-service/configuration</p>
<p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_natsmq.md">natsmq 相關組態</a>，以取得本節下各參數的詳細說明。</p>
<h3 id="rootCoord" class="common-anchor-header"><code translate="no">rootCoord</code></h3><p>rootCoord 相關組態，用來處理資料定義語言 (DDL) 和資料控制語言 (DCL) 請求</p>
<p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_rootcoord.md">rootCoord 相關組態</a>，以取得本節下各參數的詳細說明。</p>
<h3 id="proxy" class="common-anchor-header"><code translate="no">proxy</code></h3><p>proxy 的相關組態，用於驗證用戶端請求並減少傳回的結果。</p>
<p>本節下各參數的詳細說明，請參閱<a href="/docs/zh-hant/v2.5.x/configure_proxy.md">proxy 相關組態</a>。</p>
<h3 id="queryCoord" class="common-anchor-header"><code translate="no">queryCoord</code></h3><p>queryCoord 相關組態用於管理查詢節點的拓樸和負載平衡，以及從成長中的網段移交到封閉的網段。</p>
<p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_querycoord.md">queryCoord 相關組態</a>，以取得本節下各參數的詳細說明。</p>
<h3 id="queryNode" class="common-anchor-header"><code translate="no">queryNode</code></h3><p>queryNode 的相關組態，用於執行向量與標量資料之間的混合搜尋。</p>
<p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_querynode.md">queryNode 相關組態</a>，以取得本節下各參數的詳細說明。</p>
<h3 id="indexCoord" class="common-anchor-header"><code translate="no">indexCoord</code></h3><p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_indexcoord.md">indexCoord 相關組態</a>，以取得本節下各參數的詳細說明。</p>
<h3 id="indexNode" class="common-anchor-header"><code translate="no">indexNode</code></h3><p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_indexnode.md">indexNode 相關組態</a>，以取得本節下各參數的詳細說明。</p>
<h3 id="dataCoord" class="common-anchor-header"><code translate="no">dataCoord</code></h3><p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_datacoord.md">dataCoord-related Configurations</a>，取得本節下各參數的詳細說明。</p>
<h3 id="dataNode" class="common-anchor-header"><code translate="no">dataNode</code></h3><p>本節下各參數的詳細說明，請參閱<a href="/docs/zh-hant/v2.5.x/configure_datanode.md">dataNode 相關</a>的<a href="/docs/zh-hant/v2.5.x/configure_datanode.md">Configurations</a>。</p>
<h3 id="msgChannel" class="common-anchor-header"><code translate="no">msgChannel</code></h3><p>本主題介紹 Milvus 的訊息通道相關設定。</p>
<p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_msgchannel.md">msgChannel 相關組態</a>，以取得本節下各參數的詳細說明。</p>
<h3 id="log" class="common-anchor-header"><code translate="no">log</code></h3><p>設定系統日誌輸出。</p>
<p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_log.md">log-related Configurations</a>以取得本節下各參數的詳細說明。</p>
<h3 id="grpc" class="common-anchor-header"><code translate="no">grpc</code></h3><p>本節下各參數的詳細說明，請參閱<a href="/docs/zh-hant/v2.5.x/configure_grpc.md">grpc 相關組態</a>。</p>
<h3 id="tls" class="common-anchor-header"><code translate="no">tls</code></h3><p>設定外部 tls。</p>
<p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_tls.md">tls 相關設定</a>，以取得本節下各參數的詳細說明。</p>
<h3 id="internaltls" class="common-anchor-header"><code translate="no">internaltls</code></h3><p>設定內部 tls。</p>
<p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_internaltls.md">internaltls 相關組態</a>，以取得本節下各參數的詳細說明。</p>
<h3 id="common" class="common-anchor-header"><code translate="no">common</code></h3><p>本節下各參數的詳細說明，請參閱<a href="/docs/zh-hant/v2.5.x/configure_common.md">共用相關組態</a>。</p>
<h3 id="quotaAndLimits" class="common-anchor-header"><code translate="no">quotaAndLimits</code></h3><p>QuotaConfig, Milvus 配額和限制的設定。</p>
<p>預設啟用：</p>
<ol>
<li><p>TT 保護；</p></li>
<li><p>記憶體保護。</p></li>
<li><p>磁碟配額保護。</p></li>
</ol>
<p>您可以啟用</p>
<ol>
<li><p>DML 吞吐量限制；</p></li>
<li><p>DDL, DQL qps/rps 限制；</p></li>
<li><p>DQL 佇列長度/延遲保護；</p></li>
<li><p>DQL 結果率保護；</p></li>
</ol>
<p>必要時，您也可以手動強制拒絕 RW 請求。</p>
<p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_quotaandlimits.md">quotaAndLimits 相關組態</a>，以取得本節下各參數的詳細說明。</p>
<h3 id="trace" class="common-anchor-header"><code translate="no">trace</code></h3><p>本節下各參數的詳細說明，請參閱「<a href="/docs/zh-hant/v2.5.x/configure_trace.md">追蹤相關設定</a>」。</p>
<h3 id="gpu" class="common-anchor-header"><code translate="no">gpu</code></h3><p>#當使用 GPU 索引時，Milvus 會使用記憶體池來避免頻繁的記憶體分配和取消分配。</p>
<p>#在這裡，您可以設定記憶體池所佔用的記憶體大小，單位為 MB。</p>
<p>#注意，當實際的記憶體需求超過 maxMemSize 設定的值時，Milvus 有可能會當機。</p>
<p>#if initMemSize 和 MaxMemSize 都設定為零、</p>
<p>#milvus 將自動初始化一半可用的 GPU 記憶體、</p>
<p>#maxMemSize 將會是整個可用的 GPU 記憶體。</p>
<p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_gpu.md">gpu 相關組態</a>，以取得本節下各參數的詳細說明。</p>
<h3 id="streamingNode" class="common-anchor-header"><code translate="no">streamingNode</code></h3><p>任何與串流節點伺服器相關的設定。</p>
<p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_streamingnode.md">streamingNode-related Configurations</a>，以瞭解本節下每個參數的詳細說明。</p>
<h3 id="streaming" class="common-anchor-header"><code translate="no">streaming</code></h3><p>任何與串流服務相關的設定。</p>
<p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_streaming.md">串流相關設定</a>，以取得本節下各參數的詳細說明。</p>
<h3 id="knowhere" class="common-anchor-header"><code translate="no">knowhere</code></h3><p>任何與 knowhere 向量搜尋引擎相關的設定</p>
<p>請參閱<a href="/docs/zh-hant/v2.5.x/configure_knowhere.md">knowhere 相關設定</a>，以取得本節下各參數的詳細說明。</p>
