---
id: switch-rocksmq-woodpecker.md
title: 在 RocksMQ 與 Woodpecker 之間切換
summary: 將 Milvus 獨立部署（Docker Compose）的訊息佇列在 RocksMQ 與 Woodpecker 之間切換。
---
<h1 id="Switch-between-RocksMQ-and-Woodpecker" class="common-anchor-header">在 RocksMQ 與 Woodpecker 之間切換<button data-href="#Switch-between-RocksMQ-and-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>本頁面說明如何將<strong>Milvus 獨立部署（Docker Compose）</strong>中的訊息佇列（MQ）在<strong>RocksMQ</strong>與<strong>Woodpecker</strong>（本地端或 MinIO 後端）之間進行雙向切換。有關一般工作流程與先決條件，請參閱《<a href="/docs/zh-hant/switch-mq-type.md">切換 MQ 類型</a>》。</p>
<div class="alert note">
<ul>
<li><strong>先決條件：</strong>MQ 切換功能僅適用於<strong>Milvus 3.0 及後續版本</strong>。開始操作前，請將您的 Milvus 實例升級至 Milvus 3.0 或後續版本——此功能在較早版本中不可用。</li>
<li>MQ 切換需採用 Docker<strong>Compose</strong>部署方式（此方式啟用 etcd 配置來源）。單容器 Docker 部署不支援此切換功能。</li>
</ul>
</div>
<h2 id="Switch-from-RocksMQ-to-Woodpecker" class="common-anchor-header">從 RocksMQ 切換至 Woodpecker<button data-href="#Switch-from-RocksMQ-to-Woodpecker" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">步驟 1：確認 Milvus 實例正在運行<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>請確認您的 Milvus 獨立 Docker Compose 實例是否正常運作 — 例如，建立測試集合、插入資料並執行查詢。</p>
<h3 id="Step-2-Configure-Woodpecker-storage" class="common-anchor-header">步驟 2：設定 Woodpecker 儲存空間<button data-href="#Step-2-Configure-Woodpecker-storage" class="anchor-icon" translate="no">
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
    </button></h3><p><strong>在不</strong>變更 `<code translate="no">mqType</code> ` 值<strong>的情況下，</strong>將 Woodpecker 設定新增至 Milvus 配置中。執行 `<code translate="no">docker exec -it milvus-standalone bash</code> ` 進入容器，然後編輯 `<code translate="no">/milvus/configs/user.yaml</code>`：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">woodpecker:</span>
  <span class="hljs-attr">storage:</span>
    <span class="hljs-attr">type:</span> <span class="hljs-string">minio</span>   <span class="hljs-comment"># minio or local</span>
<button class="copy-code-btn"></button></code></pre>
<p>重新啟動 Milvus 實例以套用設定：</p>
<pre><code translate="no" class="language-shell">docker compose restart
<button class="copy-code-btn"></button></code></pre>
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
    </button></h3><div class="alert note">
<p>若這是您首次切換至 Woodpecker，請跳過此說明。否則，請在再次切換前清理殘留的 Woodpecker 元資料與資料 — 殘留資料可能會導致預期之外的行為。</p>
</div>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:&lt;mixcoord_port&gt;/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;woodpecker&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>MixCoord 埠號通常為<code translate="no">9091</code> 。</p>
<h3 id="Step-4-Verify-the-switch-is-complete" class="common-anchor-header">步驟 4：驗證切換是否完成<button data-href="#Step-4-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell">docker logs milvus-standalone | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>若切換成功，系統會記錄<code translate="no">[mqTypeValue=woodpecker]</code> 。</p>
<h3 id="Step-5-Optional-Clean-up-RocksMQ-data" class="common-anchor-header">步驟 5：(可選) 清理 RocksMQ 資料<button data-href="#Step-5-Optional-Clean-up-RocksMQ-data" class="anchor-icon" translate="no">
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
    </button></h3><p>RocksMQ 資料位於<code translate="no">docker-compose.yaml</code> 中定義的<code translate="no">volumes/milvus/rdb_data</code> 和<code translate="no">volumes/milvus/rdb_data_meta_kv</code> 目錄內。若您計劃日後切換回 RocksMQ，請先清理這些檔案以避免衝突。</p>
<h2 id="Switch-from-Woodpecker-to-RocksMQ" class="common-anchor-header">從 Woodpecker 切換至 RocksMQ<button data-href="#Switch-from-Woodpecker-to-RocksMQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Verify-the-Milvus-instance-is-running" class="common-anchor-header">步驟 1：確認 Milvus 實例正在運行<button data-href="#Step-1-Verify-the-Milvus-instance-is-running" class="anchor-icon" translate="no">
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
    </button></h3><p>請確保您的 Milvus 獨立 Docker Compose 實例正在正常運行。</p>
<h3 id="Step-2-Execute-the-MQ-switch" class="common-anchor-header">步驟 2：執行 MQ 切換<button data-href="#Step-2-Execute-the-MQ-switch" class="anchor-icon" translate="no">
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
    </button></h3><div class="alert note">
<p>請確認該實例中沒有先前執行時殘留的 RocksMQ 資料。若這是您首次切換至 RocksMQ，請跳過此說明；否則請先清理相關的 RocksMQ 元資料與資料。</p>
</div>
<pre><code translate="no" class="language-shell">curl -X POST http://&lt;mixcoord_addr&gt;:&lt;mixcoord_port&gt;/management/wal/alter \
  -H &quot;Content-Type: application/json&quot; \
  -d &#x27;{&quot;target_wal_name&quot;: &quot;rocksmq&quot;}&#x27;
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Verify-the-switch-is-complete" class="common-anchor-header">步驟 3：確認切換已完成<button data-href="#Step-3-Verify-the-switch-is-complete" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-shell">docker logs milvus-standalone | grep &quot;successfully updated mq.type configuration in etcd&quot;
<button class="copy-code-btn"></button></code></pre>
<p>若切換成功，系統會記錄<code translate="no">[mqTypeValue=rocksmq]</code> 。</p>
<h3 id="Step-4-Optional-Clean-up-Woodpecker-data" class="common-anchor-header">步驟 4：（可選）清理 Woodpecker 資料<button data-href="#Step-4-Optional-Clean-up-Woodpecker-data" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><strong>元資料 (etcd)：</strong>Woodpecker 的金鑰前綴通常為<code translate="no">woodpecker/...</code> 。請透過<code translate="no">etcdctl get woodpecker --prefix</code> 檢視該金鑰，然後將其刪除。</li>
<li><strong>儲存資料：</strong>在<strong>MinIO 模式下</strong>，請刪除儲存桶中<code translate="no">&lt;rootPath&gt;/wp/...</code> 下的日誌資料（通常位於<code translate="no">files/wp/...</code> ）；在<strong>本地模式下</strong>，資料位於本機磁碟的<code translate="no">volumes/milvus/data/wp/...</code> 路徑下。</li>
</ul>
<p>若您計劃日後切換回 Woodpecker，請先清理這些檔案以避免衝突。</p>
<h2 id="Supported-scenarios" class="common-anchor-header">支援的情境<button data-href="#Supported-scenarios" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>來源 MQ</th><th>目標 MQ</th><th>狀態</th><th>備註</th></tr>
</thead>
<tbody>
<tr><td>RocksMQ</td><td>Woodpecker (MinIO/本地)</td><td><strong>已支援</strong></td><td></td></tr>
<tr><td>Woodpecker (MinIO/本地)</td><td>RocksMQ</td><td><strong>已支援</strong></td><td></td></tr>
<tr><td>Woodpecker MinIO</td><td>Woodpecker 本地</td><td><strong>不支援</strong></td><td>在 Woodpecker 儲存模式之間切換需要額外的元資料處理，此功能目前尚未支援。</td></tr>
<tr><td>Woodpecker 本地</td><td>Woodpecker MinIO</td><td><strong>不支援</strong></td><td>同上。</td></tr>
<tr><td>RocksMQ / Woodpecker</td><td>外部 Pulsar / Kafka</td><td><strong>受支援但不建議使用</strong></td><td>請盡可能簡化獨立執行個體的架構。</td></tr>
</tbody>
</table>
