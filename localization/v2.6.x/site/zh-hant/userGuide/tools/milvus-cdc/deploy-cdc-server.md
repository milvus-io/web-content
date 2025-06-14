---
id: deploy-cdc-server.md
order: 2
summary: 本指南提供部署 Milvus-CDC 伺服器的逐步過程。
title: 部署 CDC 伺服器
---
<h1 id="Deploy-CDC-Server" class="common-anchor-header">部署 CDC 伺服器<button data-href="#Deploy-CDC-Server" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南提供部署 Milvus-CDC 伺服器的逐步過程。</p>
<h2 id="Prerequisites" class="common-anchor-header">先決條件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p>在部署 Milvus-CDC 伺服器之前，確保符合下列條件：</p>
<ul>
<li><p><strong>Milvus Instances</strong>：源 Milvus 和至少一個目標 Milvus 都應已部署並運作。</p>
<ul>
<li><p>源和目標 Milvus 版本都必須是 2.3.2 或更高，最好是 2.4.x。我們建議使用相同版本的源和目標 Milvus 以確保兼容性。</p></li>
<li><p>將目標 Milvus 的<code translate="no">common.ttMsgEnabled</code> 設定為<code translate="no">false</code> 。</p></li>
<li><p>使用不同的元和訊息儲存設定來設定來源和目標 Milvus，以防止衝突。例如，避免在多個 Milvus 實體中使用相同的 etcd 和 rootPath 設定，以及相同的 Pulsar 服務和<code translate="no">chanNamePrefix</code> 。</p></li>
</ul></li>
<li><p><strong>元端儲存</strong>：為 Milvus-CDC 元資料庫準備好 etcd 或 MySQL 資料庫。</p></li>
</ul>
<h2 id="Steps" class="common-anchor-header">步驟<button data-href="#Steps" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Obtain-the-Milvus-CDC-config-file" class="common-anchor-header">取得 Milvus-CDC 的設定檔</h3><p>克隆<a href="https://github.com/zilliztech/milvus-cdc">Milvus-CDC repo</a>並導航到<code translate="no">milvus-cdc/server/configs</code> 目錄，以存取<code translate="no">cdc.yaml</code> 配置檔案。</p>
<pre><code translate="no" class="language-bash">git <span class="hljs-built_in">clone</span> https://github.com/zilliztech/milvus-cdc.git

<span class="hljs-built_in">cd</span> milvus-cdc/server/configs
<button class="copy-code-btn"></button></code></pre>
<h3 id="Edit-the-config-file" class="common-anchor-header">編輯設定檔</h3><p>在<code translate="no">milvus-cdc/server/configs</code> 目錄中，修改<code translate="no">cdc.yaml</code> 檔案，以自訂與 Milvus-CDC 元端程式庫及來源 Milvus 連線細節相關的設定。</p>
<ul>
<li><p><strong>元端儲存配置</strong>：</p>
<ul>
<li><p><code translate="no">metaStoreConfig.storeType</code>:Milvus-CDC 的 metastore 類型。可能的值是<code translate="no">etcd</code> 或<code translate="no">mysql</code> 。</p></li>
<li><p><code translate="no">metaStoreConfig.etcdEndpoints</code>:連線至 Milvus-CDC 的 etcd 位址。如果<code translate="no">storeType</code> 設為<code translate="no">etcd</code> 則必須。</p></li>
<li><p><code translate="no">metaStoreConfig.mysqlSourceUrl</code>:Milvus-CDC 伺服器 MySQL 資料庫的連線位址。如果<code translate="no">storeType</code> 設為<code translate="no">mysql</code> 則需要。</p></li>
<li><p><code translate="no">metaStoreConfig.rootPath</code>:Milvus-CDC 元庫的根目錄。此設定可實現多租戶功能，允許多個 CDC 服務使用相同的 etcd 或 MySQL 實例，同時透過不同的根目錄實現隔離。</p></li>
</ul>
<p>配置範例：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># cdc meta data config</span>
<span class="hljs-attr">metaStoreConfig:</span>
  <span class="hljs-comment"># the metastore type, available value: etcd, mysql</span>
  <span class="hljs-attr">storeType:</span> <span class="hljs-string">etcd</span>
  <span class="hljs-comment"># etcd address</span>
  <span class="hljs-attr">etcdEndpoints:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">localhost:2379</span>
  <span class="hljs-comment"># mysql connection address</span>
  <span class="hljs-comment"># mysqlSourceUrl: root:root@tcp(127.0.0.1:3306)/milvus-cdc?charset=utf8</span>
  <span class="hljs-comment"># meta data prefix, if multiple cdc services use the same store service, you can set different rootPaths to achieve multi-tenancy</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">cdc</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>源 Milvus 配置：</strong></p>
<p>指定來源 Milvus 的連線細節，包括 etcd 和訊息儲存，以建立 Milvus-CDC 伺服器與來源 Milvus 的連線。</p>
<ul>
<li><p><code translate="no">sourceConfig.etcdAddress</code>:連接來源 Milvus 的 etcd 位址。如需詳細資訊，請參閱<a href="https://milvus.io/docs/configure_etcd.md#etcd-related-Configurations">etcd 相關的設定</a>。</p></li>
<li><p><code translate="no">sourceConfig.etcdRootPath</code>:來源 Milvus 在 etcd 中儲存資料的 key 的 Root 前綴。根據 Milvus 實例的部署方法，其值可能會有所不同：</p>
<ul>
<li><p><strong>Helm</strong>或<strong>Docker Compose</strong>：預設為<code translate="no">by-dev</code> 。</p></li>
<li><p><strong>操作員</strong>：Defaults to<code translate="no">&lt;release_name&gt;</code>.</p></li>
</ul></li>
<li><p><code translate="no">replicateChan</code>：milvus 複製通道名稱，在 milvus.yaml 檔案中為<code translate="no">{msgChannel.chanNamePrefix.cluster}/{msgChannel.chanNamePrefix.replicateMsg}</code> 。</p></li>
<li><p><code translate="no">sourceConfig.pulsar</code>:源 Milvus 的 Pulsar 配置。如果來源 Milvus 使用 Kafka 儲存訊息，請移除所有與 Pulsar 相關的設定。如需詳細資訊，請參閱<a href="https://milvus.io/docs/configure_pulsar.md">Pulsar 相關設定</a>。</p></li>
<li><p><code translate="no">sourceConfig.kafka.address</code>:來源 Milvus 的 Kafka 位址。如果來源 Milvus 使用 Kafka 儲存訊息，請取消註解此組態。</p></li>
</ul></li>
</ul>
<p>配置範例：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus-source config, these settings are basically the same as the corresponding configuration of milvus.yaml in milvus source.</span>
<span class="hljs-attr">sourceConfig:</span>
  <span class="hljs-comment"># etcd config</span>
  <span class="hljs-attr">etcdAddress:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">localhost:2379</span>
  <span class="hljs-attr">etcdRootPath:</span> <span class="hljs-string">by-dev</span>
  <span class="hljs-attr">etcdMetaSubPath:</span> <span class="hljs-string">meta</span>
  <span class="hljs-comment"># default partition name</span>
  <span class="hljs-attr">defaultPartitionName:</span> <span class="hljs-string">_default</span>
  <span class="hljs-comment"># read buffer length, mainly used for buffering if writing data to milvus-target is slow.</span>
  <span class="hljs-attr">readChanLen:</span> <span class="hljs-number">10</span>
  <span class="hljs-attr">replicateChan:</span> <span class="hljs-string">by-dev-replicate-msg</span>
  <span class="hljs-comment"># milvus-source mq config, which is pulsar or kafka</span>
  <span class="hljs-attr">pulsar:</span>
    <span class="hljs-attr">address:</span> <span class="hljs-string">pulsar://localhost:6650</span>
    <span class="hljs-attr">webAddress:</span> <span class="hljs-string">localhost:80</span>
    <span class="hljs-attr">maxMessageSize:</span> <span class="hljs-number">5242880</span>
    <span class="hljs-attr">tenant:</span> <span class="hljs-string">public</span>
    <span class="hljs-attr">namespace:</span> <span class="hljs-string">default</span>
<span class="hljs-comment">#    authPlugin: org.apache.pulsar.client.impl.auth.AuthenticationToken</span>
<span class="hljs-comment">#    authParams: token:xxx</span>
<span class="hljs-comment">#  kafka:</span>
<span class="hljs-comment">#    address: 127.0.0.1:9092</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Compile-the-Milvus-CDC-server" class="common-anchor-header">編譯 Milvus-CDC 伺服器</h3><p>儲存<code translate="no">cdc.yaml</code> 檔案後，導覽到<code translate="no">milvus-cdc</code> 目錄，並執行下列其中一個指令來編譯伺服器：</p>
<ul>
<li><p>對於二進位檔案</p>
<pre><code translate="no" class="language-bash">make build
<button class="copy-code-btn"></button></code></pre></li>
<li><p>對於 Docker 映像檔</p>
<pre><code translate="no" class="language-bash">bash build_image.sh
<button class="copy-code-btn"></button></code></pre>
<p>對於 Docker 映像檔，將已編譯的檔案掛載到容器內的<code translate="no">/app/server/configs/cdc.yaml</code> 。</p></li>
</ul>
<h3 id="Start-the-server" class="common-anchor-header">啟動伺服器</h3><ul>
<li><p>使用二進位檔案</p>
<p>導覽到包含<code translate="no">milvus-cdc</code> 二進位檔案的目錄，以及包含<code translate="no">cdc.yaml</code> 檔案的<code translate="no">configs</code> 目錄，然後啟動伺服器：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># dir tree</span>
.
├── milvus-cdc <span class="hljs-comment"># build from source code or download from release page</span>
├── configs
│   └── cdc.yaml <span class="hljs-comment"># config for cdc and source milvus</span>

<span class="hljs-comment"># start milvus cdc</span>
./milvus-cdc server
<button class="copy-code-btn"></button></code></pre></li>
<li><p>使用 Docker Compose：</p>
<pre><code translate="no" class="language-bash">docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ul>
