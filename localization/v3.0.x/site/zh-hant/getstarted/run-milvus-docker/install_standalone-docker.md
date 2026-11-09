---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: 瞭解如何使用 Docker 安裝 Milvus 獨立版本。
title: 在 Docker 中執行 Milvus（Linux）
---
<h1 id="Run-Milvus-in-Docker-Linux" class="common-anchor-header">在 Docker 中執行 Milvus（Linux）<button data-href="#Run-Milvus-in-Docker-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>本頁面說明如何在 Docker 中啟動 Milvus 實例。</p>
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
<li><a href="https://docs.docker.com/get-docker/">安裝 Docker</a>。</li>
<li>安裝前<a href="/docs/zh-hant/prerequisite-docker.md">請先確認硬體與軟體的系統需求</a>。</li>
</ul>
<h2 id="Install-Milvus-in-Docker" class="common-anchor-header">在 Docker 中安裝 Milvus<button data-href="#Install-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 提供了一個安裝腳本，可將其安裝為 Docker 容器。該腳本可在<a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">Milvus 儲存庫中</a>取得。在開始新部署之前，請先下載並檢視該腳本：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the installation script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Inspect the Docker image selected by the script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">grep -n <span class="hljs-string">&quot;milvusdb/milvus:&quot;</span> standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start the Docker container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh start</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>此腳本可從 Milvus 的<code translate="no">master</code> 分支下載。其 Docker 映像標籤在腳本中已定義，可能與 v3.0.5 不同。若要安裝該特定版本，請參閱《<a href="/docs/zh-hant/install_standalone-docker-compose.md">使用 Docker Compose 執行 Milvus</a>》中的版本化設定。</p>
<p>此 Docker 部署會<strong>將本地檔案系統</strong>用作<strong>Woodpecker</strong>的 WAL 後端，因此無需外部訊息佇列服務。請參閱<a href="/docs/zh-hant/woodpecker.md">Woodpecker</a>。</p>
<p>若您希望在獨立部署模式下使用<a href="/docs/zh-hant/milvus_backup_overview.md">Backup，</a>建議採用<a href="/docs/zh-hant/install_standalone-docker-compose.md">Docker Compose</a>部署方式。</p>
<p>若在拉取映像檔時遇到任何問題，請透過<a href="mailto:community@zilliz.com">community@zilliz.com</a>聯絡我們，並提供問題詳情，我們將為您提供必要的支援。</p>
</div>
<p>執行安裝腳本後：</p>
<ul>
<li>一個名為 milvus-standalone 的 Docker 容器已於<strong>19530</strong> 埠啟動。</li>
<li>一個嵌入式 etcd 已隨 Milvus 一起安裝在同一容器中，並於<strong>2379</strong> 埠提供服務。其設定檔對應至當前資料夾中的<strong>embedEtcd.yaml</strong>檔案。</li>
<li>若要變更預設的 Milvus 設定，請將您的設定新增至當前資料夾中的<strong>user.yaml</strong>檔案，然後重新啟動服務。</li>
<li>Milvus 資料卷已映射至當前資料夾中的<strong>volumes/milvus</strong>。</li>
</ul>
<p>請驗證實際映像檔及運作狀態：</p>
<pre><code translate="no" class="language-bash">docker inspect --format <span class="hljs-string">&#x27;{{.Config.Image}}&#x27;</span> milvus-standalone
docker inspect --format <span class="hljs-string">&#x27;{{.State.Health.Status}}&#x27;</span> milvus-standalone
<button class="copy-code-btn"></button></code></pre>
<p>請等待<code translate="no">healthy</code> 狀態顯示為「 」後，再繼續進行<a href="/docs/zh-hant/quickstart.md">《快速入門》步驟</a>。使用此伺服器時，請將 SDK 連線至<code translate="no">http://localhost:19530</code> ；若使用本機的<code translate="no">.db</code> URI，則會啟動 Milvus Lite。</p>
<p>您可以透過<code translate="no">http://127.0.0.1:9091/webui/</code> 存取 Milvus WebUI，以進一步了解您的 Milvus 執行個體。詳細資訊請參閱<a href="/docs/zh-hant/milvus-webui.md">Milvus WebUI</a>。</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(可選) 更新 Milvus 設定<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以在當前資料夾中的<strong>user.yaml</strong>檔案中修改 Milvus 設定。例如，若要將<code translate="no">proxy.healthCheckTimeout</code> 變更為<code translate="no">1000</code> ms，您可以按照以下方式修改該檔案：</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre>
<p>接著請依照以下步驟重新啟動服務：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh restart</span>
<button class="copy-code-btn"></button></code></pre>
<p>有關適用的設定項目，請參閱《<a href="/docs/zh-hant/system_configuration.md">系統設定》</a>。</p>
<h2 id="Upgrade-Milvus" class="common-anchor-header">升級 Milvus<button data-href="#Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>該腳本中的<code translate="no">upgrade</code> 指令會從<code translate="no">master</code> 下載腳本，並使用該腳本選定的映像重新建立容器。此指令不會驗證來源至目標版本路徑是否受支援，且可能會重新建立已生成的設定檔。請勿將此視為保證任意舊版部署皆能安全升級至 v3.0.5。</p>
<p>升級前，請備份元資料、持久化資料、<code translate="no">embedEtcd.yaml</code> 以及<code translate="no">user.yaml</code> 。請檢查目標版本、訊息佇列及儲存空間的相容性，並在非生產環境中驗證恢復功能。對於使用 Docker Compose 管理的部署，請遵循<a href="/docs/zh-hant/upgrade_milvus_standalone-docker.md">《使用 Docker Compose 升級 Milvus 獨立執行版</a>》的指引；請勿將該程序直接套用至由腳本管理的容器。</p>
<h2 id="Stop-and-delete-Milvus" class="common-anchor-header">停止並刪除 Milvus<button data-href="#Stop-and-delete-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以依照以下步驟停止並刪除此容器</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh stop</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete Milvus data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh delete</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Optional-dependencies" class="common-anchor-header">可選依賴項<button data-href="#Optional-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>預設情況下，此部署會運行<strong>Woodpecker</strong>（本地檔案系統 WAL）作為訊息佇列，並<strong>使用內嵌的 etcd</strong>來管理元資料——無需安裝其他組件。若要使用不同的訊息佇列或連接外部物件儲存／元資料，請參閱：</p>
<ul>
<li>訊息佇列：<a href="/docs/zh-hant/woodpecker.md">Woodpecker</a>（預設）·<a href="/docs/zh-hant/mq_pulsar.md">Pulsar</a>·<a href="/docs/zh-hant/mq_kafka.md">Kafka</a>·<a href="/docs/zh-hant/mq_rocksmq.md">RocksMQ</a></li>
<li>物件儲存：<a href="/docs/zh-hant/deploy_s3.md">MinIO</a>（預設）·<a href="/docs/zh-hant/deploy_s3.md">AWS S3</a>·<a href="/docs/zh-hant/abs.md">Azure Blob</a>·<a href="/docs/zh-hant/gcs.md">GCP Cloud Storage</a>·<a href="/docs/zh-hant/deploy_s3.md">阿里雲 OSS</a>·<a href="/docs/zh-hant/deploy_s3.md">騰訊 COS</a>·<a href="/docs/zh-hant/deploy_s3.md">華為 OBS</a>·<a href="/docs/zh-hant/deploy_s3.md">S3 相容</a></li>
<li>元資料：<a href="/docs/zh-hant/deploy_etcd.md">etcd</a></li>
</ul>
<div class="alert note">
<p>Storage V3 預設為停用狀態。在使用依賴此功能的服務前，請先啟用它。有關需求與相容性考量，請參閱<a href="/docs/zh-hant/storage-v3.md">Storage V3</a>。</p>
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
    </button></h2><p>在 Docker 中安裝 Milvus 後，您可以：</p>
<ul>
<li><p>參閱<a href="/docs/zh-hant/quickstart.md">《快速入門》</a>了解 Milvus 的功能。</p></li>
<li><p>學習 Milvus 的基本操作：</p>
<ul>
<li><a href="/docs/zh-hant/manage_databases.md">管理資料庫</a></li>
<li><a href="/docs/zh-hant/manage-collections.md">管理集合</a></li>
<li><a href="/docs/zh-hant/manage-partitions.md">管理分區</a></li>
<li><a href="/docs/zh-hant/insert-update-delete.md">插入、Upsert 與刪除</a></li>
<li><a href="/docs/zh-hant/single-vector-search.md">單向量搜尋</a></li>
<li><a href="/docs/zh-hant/multi-vector-search.md">混合搜尋</a></li>
</ul></li>
<li><p>在變更 Milvus 版本之前，請先參閱本頁面的升級注意事項。</p></li>
<li><p><a href="/docs/zh-hant/scaleout.md">擴展您的 Milvus 叢集</a>。</p></li>
<li><p>在雲端部署您的 Milvus 叢集：</p>
<ul>
<li><a href="/docs/zh-hant/eks.md">Amazon EKS</a></li>
<li><a href="/docs/zh-hant/gcp.md">Google Cloud</a></li>
<li><a href="/docs/zh-hant/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>探索<a href="/docs/zh-hant/milvus-webui.md">Milvus WebUI</a>，這是專為 Milvus 可觀察性與管理而設計的直觀網頁介面。</p></li>
<li><p>探索<a href="/docs/zh-hant/milvus_backup_overview.md">Milvus Backup</a>，這是一款用於 Milvus 資料備份的開源工具。</p></li>
<li><p>探索<a href="/docs/zh-hant/birdwatcher_overview.md">Birdwatcher，這</a>是一款用於 Milvus 除錯與動態配置更新的開源工具。</p></li>
<li><p>探索<a href="https://github.com/zilliztech/attu">Attu，這</a>是一款用於直觀管理 Milvus 的開源圖形化介面工具。</p></li>
<li><p><a href="/docs/zh-hant/monitor.md">透過 Prometheus 監控 Milvus</a>。</p></li>
</ul>
