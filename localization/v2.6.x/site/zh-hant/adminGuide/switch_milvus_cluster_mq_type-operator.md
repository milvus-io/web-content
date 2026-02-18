---
id: switch_milvus_cluster_mq_type-operator.md
summary: 學習如何切換 Milvus 集群的訊息佇列類型。
title: 切換 Milvus 集群的 MQ 類型
---
<h1 id="Switch-MQ-Type-for-Milvus-Cluster" class="common-anchor-header">切換 Milvus 集群的 MQ 類型<button data-href="#Switch-MQ-Type-for-Milvus-Cluster" class="anchor-icon" translate="no">
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
    </button></h1><p>本主題描述如何切換現有 Milvus 集群部署的訊息佇列 (MQ) 類型。Milvus 支援在 Pulsar、Kafka 和 Woodpecker 之間進行線上 MQ 切換，無須停機。</p>
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
    </button></h2><ul>
<li>透過 Milvus<a href="/docs/zh-hant/v2.6.x/install_cluster-milvusoperator.md">Operator</a>或<a href="/docs/zh-hant/v2.6.x/install_cluster-helm.md">Helm</a> 安裝一個執行中的 Milvus 叢集實例。</li>
<li>Milvus 实例已升级到支持此切换 MQ 功能的最新版本。</li>
</ul>
<h2 id="Switch-from-PulsarKafka-to-Woodpecker-MinIO" class="common-anchor-header">從 Pulsar/Kafka 切換到 Woodpecker (MinIO)<button data-href="#Switch-from-PulsarKafka-to-Woodpecker-MinIO" class="anchor-icon" translate="no">
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
    </button></h2><p>按照以下步驟，將 MQ 類型從 Pulsar 或 Kafka 切換到使用 MinIO 儲存的 Woodpecker。</p>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">步驟 1: 確認 Milvus 實例正在運行<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>在切換之前，請確保您的 Milvus 集群實例運行正常。您可以透過建立測試集合、插入資料並執行查詢來驗證。</p>
<h3 id="Step-2-Optional-Verify-Woodpecker-configuration" class="common-anchor-header">步驟 2：（可選）驗證啄木鳥配置<button data-href="#Step-2-Optional-Verify-Woodpecker-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>預設的 Milvus 配置已經將 Woodpecker 儲存類型設定為 MinIO，因此在大多數情況下不需要額外的配置。</p>
<p>但是，如果您之前自訂了 Woodpecker 配置，則必須確保<code translate="no">woodpecker.storage.type</code> 設定為<code translate="no">minio</code> 。更新 Milvus 配置時，請<strong>勿</strong>變更<code translate="no">mqType</code> 值：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>對於<strong>Helm</strong>，請參閱<a href="/docs/zh-hant/v2.6.x/configure-helm.md">使用 Helm Charts 配置 Milvus</a>，以取得更新組態的指示。</li>
<li>對於<strong>Milvus Operator</strong>，請參閱<a href="/docs/zh-hant/v2.6.x/configure_operator.md">使用 Milvus Operator 配置 Milvus</a>，以獲得更新配置的指示。</li>
</ul>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">步驟 3：執行 MQ 切換<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>執行下列指令以觸發切換至 Woodpecker：</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>將<code translate="no">&lt;mixcoord_addr&gt;</code> 改為您 MixCoord 服務的實際位址。</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">步驟 4：驗證切換完成<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>切換過程自動完成。監控 Milvus 日誌中的下列關鍵訊息，以確認切換已完成：</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>在上面的日誌訊息中，<code translate="no">&lt;MQ1&gt;</code> 是來源 MQ 類型 (例如<code translate="no">pulsar</code> 或<code translate="no">kafka</code>)，而<code translate="no">&lt;MQ2&gt;</code> 是目標 MQ 類型 (<code translate="no">woodpecker</code>)。</p>
<ul>
<li>第一條訊息表示從原始碼到目標的 WAL 切換已經完成。</li>
<li>第二條訊息表示所有實體通道已切換完成。</li>
<li>第三條訊息表示<code translate="no">mq.type</code> 設定已在 etcd 中更新。</li>
</ul>
</div>
<h2 id="Switch-from-Woodpecker-MinIO-to-Pulsar-or-Kafka" class="common-anchor-header">從 Woodpecker (MinIO) 切換到 Pulsar 或 Kafka<button data-href="#Switch-from-Woodpecker-MinIO-to-Pulsar-or-Kafka" class="anchor-icon" translate="no">
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
    </button></h2><p>按照以下步驟將 MQ 類型從 Woodpecker 切換回 Pulsar 或 Kafka。</p>
<h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">步驟 1: 確認 Milvus 實例正在執行中<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>在切換之前，確保您的 Milvus 集群實例正常運行。</p>
<h3 id="Step-2-Configure-the-target-MQ" class="common-anchor-header">步驟 2：配置目標 MQ<button data-href="#Step-2-Configure-the-target-MQ" class="anchor-icon" translate="no">
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
    </button></h3><p>在觸發切換前，您需要確保目標 MQ 服務（Pulsar 或 Kafka）可用，且其存取配置已呈現於 Milvus 配置中。</p>
<div class="alert note">
<p>本節中的具體步驟取決於您使用的是內部（捆綁式）還是外部 MQ 服務。</p>
</div>
<h4 id="Option-A-Internal-PulsarKafka-bundled-with-Helm" class="common-anchor-header">選項 A：內部 Pulsar/Kafka（與 Helm 綁定）</h4><p>如果您使用的是 Helm 部署的捆绑 Pulsar 或 Kafka，请更新您的 Helm 版本以启用目标 MQ 服务并禁用 Woodpecker。<code translate="no">streaming.enabled=true</code> 標誌是啟用 Streaming Node 的必要條件，而 Streaming Node 是 Switch MQ 功能的先決條件。例如，要切換到 Pulsar：</p>
<pre><code translate="no" class="language-shell">helm upgrade -i my-release milvus/milvus \
  --set pulsarv3.enabled=true \
  --set woodpecker.enabled=false \
  --set streaming.enabled=true \
  -f values.yaml
<button class="copy-code-btn"></button></code></pre>
<p>升級後，驗證目標 MQ 存取組態是否已呈現成 Milvus 組態。例如，為 Pulsar</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">pulsar:</span>
  <span class="hljs-attr">address:</span> <span class="hljs-string">&lt;pulsar-proxy-address&gt;</span>
  <span class="hljs-attr">port:</span> <span class="hljs-number">6650</span>
<button class="copy-code-btn"></button></code></pre>
<h4 id="Option-B-Internal-PulsarKafka-managed-by-Milvus-Operator" class="common-anchor-header">選項 B：內部 Pulsar/Kafka（由 Milvus Operator 管理）</h4><p>如果您使用 Milvus Operator，請更新 Milvus 自訂資源以包含目標 MQ 存取配置。有關更新 Milvus 配置的詳細資訊，請參閱<a href="/docs/zh-hant/v2.6.x/configure_operator.md">使用</a>Milvus<a href="/docs/zh-hant/v2.6.x/configure_operator.md">Operator</a>配置 Milvus。</p>
<h4 id="Option-C-External-PulsarKafka" class="common-anchor-header">選項 C：外部 Pulsar/Kafka</h4><p>如果您使用外部 Pulsar 或 Kafka 服務，您不需要更改<code translate="no">mqType</code> 。只需將外部 MQ 存取配置添加到<code translate="no">values.yaml</code> ，並重新啟動 Milvus 實例以呈現配置。</p>
<h3 id="Step-3-Execute-the-MQ-switch" class="common-anchor-header">步驟 3：執行 MQ 切換<button data-href="#Step-3-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><p>執行以下指令來觸發切換到 Pulsar (如果切換到 Kafka，請將<code translate="no">pulsar</code> 改為<code translate="no">kafka</code> )：</p>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:9091/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;pulsar&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>將<code translate="no">&lt;mixcoord_addr&gt;</code> 改為您 MixCoord 服務的實際位址。</p>
</div>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">步驟 4：驗證切換完成<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><p>切換過程會自動完成。監控 Milvus 日誌中的下列關鍵訊息，以確認切換已完成：</p>
<pre><code translate="no">WAL <span class="hljs-keyword">switch</span> success: &lt;MQ1&gt; <span class="hljs-keyword">switch</span> to &lt;MQ2&gt; finish, re-opening required
AlterWAL broadcast message acknowledged <span class="hljs-keyword">by</span> all vchannels
successfully updated mq.type configuration <span class="hljs-keyword">in</span> etcd
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>在上面的日誌訊息中，<code translate="no">&lt;MQ1&gt;</code> 是來源 MQ 類型 (<code translate="no">woodpecker</code>)，而<code translate="no">&lt;MQ2&gt;</code> 是目標 MQ 類型 (例如<code translate="no">pulsar</code> 或<code translate="no">kafka</code>)。</p>
<ul>
<li>第一條訊息表示從原始碼到目標的 WAL 切換已經完成。</li>
<li>第二條訊息表示所有實體通道已切換完成。</li>
<li>第三條訊息表示<code translate="no">mq.type</code> 配置已在 etcd 中更新。</li>
</ul>
</div>
