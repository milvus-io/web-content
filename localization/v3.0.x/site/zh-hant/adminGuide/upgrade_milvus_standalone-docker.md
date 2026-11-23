---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 2
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: 瞭解如何使用 Docker Compose 升級 Milvus 獨立執行版本。
title: 使用 Docker Compose 升級 Milvus 獨立部署
---
<div class="tab-wrapper"><a href="/docs/zh-hant/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/zh-hant/upgrade_milvus_standalone-docker.md" class='active '>Operator</a>、Helm、Docker<a href="/docs/zh-hant/upgrade_milvus_standalone-docker.md" class='active '>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Docker-Compose" class="common-anchor-header">使用 Docker Compose 升級 Milvus 獨立部署<button data-href="#Upgrade-Milvus-Standalone-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南說明如何使用 Docker Compose 將 Milvus 2.6.x 獨立部署版本升級至 v3.0.5。</p>
<div class="alert note">
<p>此程序已針對官方 Milvus 2.6.20 獨立部署版 Docker Compose 配置進行驗證，當時僅變更了映像檔。步驟 2 此外還新增了 v3.0.5 Compose 配置中的資料目錄所有權服務，而該驗證並未涵蓋此部分。</p>
</div>
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
<li>Docker Engine 及 Docker Compose V2</li>
<li>由 Docker Compose 管理的現有 Milvus 2.6.x 獨立部署</li>
<li>現有部署所使用的 Docker Compose 檔案與設定</li>
<li>Milvus 元資料與持久化資料的最新備份</li>
</ul>
<p><strong>訊息佇列限制</strong>：升級至 Milvus v3.0.5 時，您必須維持當前的訊息佇列選擇。升級過程中不支援在不同的訊息佇列系統之間切換。未來版本將支援變更訊息佇列系統。</p>
<div class="alert warning">
<p>請勿在此程序中替換您目前的 Compose 檔案或變更依賴項版本。請保留現有的 etcd、物件儲存、訊息佇列、卷宗及設定。更新 Milvus 映像標籤，並新增步驟 2 中所述的資料目錄所有權服務。</p>
<p>若您的 Compose 檔案使用<code translate="no">minio/minio:RELEASE.2024-12-18T13-15-44Z</code> 且 Docker 無法拉取此映像檔，請將其變更為<code translate="no">milvusdb/minio:RELEASE.2024-12-18T13-15-44Z</code> —— 這是 v3.0.5 Compose 配置所使用的映像檔。請保留相同的發行標籤。</p>
<p>此程序不會驗證將 Milvus 映像降級回 2.6.x 的操作。 在 v3.0.5 寫入資料後，若僅還原映像檔，可能無法讀取已更新的狀態。若升級失敗，請停止寫入操作，並採用能還原升級前元資料及持久資料備份的復原方案。請先在非生產環境中驗證該復原方案。</p>
</div>
<h2 id="Upgrade-process" class="common-anchor-header">升級流程<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Back-up-the-current-configuration" class="common-anchor-header">步驟 1：備份當前配置<button data-href="#Step-1-Back-up-the-current-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>儲存當前 Compose 檔案的副本，以及所有已掛載的 Milvus 配置檔案：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cp</span> docker-compose.yml docker-compose-before-upgrade.yml
<button class="copy-code-btn"></button></code></pre>
<p>在開始升級前，請確認當前容器狀態正常：</p>
<pre><code translate="no" class="language-bash">docker compose ps
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Update-the-Milvus-image" class="common-anchor-header">步驟 2：更新 Milvus 映像<button data-href="#Step-2-Update-the-Milvus-image" class="anchor-icon" translate="no">
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
    </button></h3><p>在現有的 Compose 檔案中，更新<code translate="no">standalone</code> 服務的映像檔，將其<code translate="no">depends_on</code> 項目替換為以下內容，並新增<code translate="no">milvus-volume-init</code> 服務。兩項服務應使用相同的映像檔，並掛載與<code translate="no">standalone</code> 服務在<code translate="no">/var/lib/milvus</code> 處所掛載的相同主機目錄。<code translate="no">standalone</code> 服務的其他設定請維持不變：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">milvus-volume-init:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;0:0&quot;</span>
    <span class="hljs-attr">network_mode:</span> <span class="hljs-string">none</span>
    <span class="hljs-attr">read_only:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">restart:</span> <span class="hljs-string">&quot;no&quot;</span>
    <span class="hljs-attr">entrypoint:</span> [<span class="hljs-string">&quot;/bin/sh&quot;</span>, <span class="hljs-string">&quot;-c&quot;</span>]
    <span class="hljs-attr">command:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">|
        set -eu
        uid=&quot;$$(id -u milvus)&quot;
        gid=&quot;$$(id -g milvus)&quot;
        marker=&quot;/var/lib/milvus/.milvus-volume-owner-$${uid}-$${gid}&quot;
        if [ ! -e &quot;$${marker}&quot; ]; then
          echo &quot;Preparing /var/lib/milvus for $${uid}:$${gid}&quot;
          chown -R &quot;$${uid}:$${gid}&quot; /var/lib/milvus
          touch &quot;$${marker}&quot;
          chown &quot;$${uid}:$${gid}&quot; &quot;$${marker}&quot;
        fi
</span>    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>

  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">depends_on:</span>
      <span class="hljs-attr">milvus-volume-init:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_completed_successfully</span>
      <span class="hljs-attr">etcd:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
      <span class="hljs-attr">minio:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus v3.0.5 映像會以非 root 使用者<code translate="no">milvus</code> 執行 Milvus，而 Milvus 2.6.x 映像則未設定使用者，並以<code translate="no">root</code> 執行 Milvus。<code translate="no">milvus-volume-init</code> 服務源自 v3.0.5 的 Compose 配置。 該服務會在 Milvus 啟動前以<code translate="no">root</code> 身分執行一次，並將<code translate="no">/var/lib/milvus</code> 及其內容的所有權變更為<code translate="no">milvus</code> 使用者與群組，以便 Milvus 能寫入 2.6.x 部署所建立的檔案。接著，它會將<code translate="no">.milvus-volume-owner-&lt;uid&gt;-&lt;gid&gt;</code> 標記檔案寫入<code translate="no">/var/lib/milvus</code> ，只要該標記檔案存在，後續執行時便不會進行任何變更。 若您日後將由其他使用者擁有的檔案還原至資料目錄中，請移除該標記檔案，以便服務能再次運行。</p>
<p>拉取目標映像並重新建立 Milvus 容器。由於<code translate="no">standalone</code> 服務依賴於<code translate="no">milvus-volume-init</code> ，Docker Compose 會在啟動新的 Milvus 容器之前，先執行<code translate="no">milvus-volume-init</code> 並等待其完成：</p>
<pre><code translate="no" class="language-bash">docker compose pull standalone
docker compose up --detach standalone
<button class="copy-code-btn"></button></code></pre>
<p>Docker Compose 會讓現有的 etcd 和 object-storage 容器持續運行，並重複使用已設定的資料目錄。若您變更了某個依賴項的設定（例如 MinIO 映像檔），Compose 會重新建立該容器，並保留其已掛載的卷。</p>
<h2 id="Verify-the-upgrade" class="common-anchor-header">驗證升級<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>檢查 Milvus 容器的狀態及其使用的映像檔：</p>
<pre><code translate="no" class="language-bash">docker compose ps

docker compose images standalone

docker compose logs --<span class="hljs-built_in">tail</span> 100 standalone
<button class="copy-code-btn"></button></code></pre>
<p>確認<code translate="no">standalone</code> 服務狀態正常，其映像為<code translate="no">milvusdb/milvus:v3.0.5</code> ，且現有集合仍可進行查詢與搜尋。在啟用任何 v3.0.5 專屬功能之前，請先完成這些檢查。</p>
<div class="alert note">
<p>升級至 Milvus 3.0 並不會啟用 Storage V3。在驗證升級完成後，請先詳閱<a href="/docs/zh-hant/storage-v3.md">Storage V3</a>相關說明，再啟用依賴該功能的服務。一旦 Milvus 寫入 Storage V3 資料，便不支援降級至無法讀取 Storage V3 的舊版 Milvus。</p>
</div>
