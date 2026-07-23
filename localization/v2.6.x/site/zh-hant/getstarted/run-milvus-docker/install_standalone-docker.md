---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: 了解如何使用 Docker 安裝 Milvus 獨立版本。
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
<li>安裝前<a href="/docs/zh-hant/v2.6.x/prerequisite-docker.md">請先確認硬體與軟體的系統需求</a>。</li>
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
    </button></h2><p>Milvus 提供了一個安裝腳本，可將其安裝為 Docker 容器。該腳本可在<a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">Milvus 儲存庫中</a>取得。若要在 Docker 中安裝 Milvus，只需執行</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the installation script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start the Docker container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh start</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>v2.6.17 的新功能：</strong></p>
<ul>
<li><strong>串流節點</strong>：增強資料處理能力</li>
<li><strong>Woodpecker MQ</strong>：改進訊息佇列並降低維護負擔，詳情請參閱《<a href="/docs/zh-hant/v2.6.x/use-woodpecker.md">使用 Woodpecker</a>》</li>
<li><strong>架構優化</strong>：整合組件以提升效能</li>
</ul>
<p>請務必下載最新版本的腳本，以確保您能獲得最新的配置與架構改進。</p>
<p>若您希望在獨立部署模式下使用<a href="https://milvus.io/docs/milvus_backup_overview.md">Backup，</a>建議採用<a href="https://milvus.io/docs/install_standalone-docker-compose.md">Docker Compose</a>部署方式。</p>
<p>若在拉取映像檔時遇到任何問題，請透過<a href="mailto:community@zilliz.com">community@zilliz.com</a>聯絡我們，並提供問題詳情，我們將為您提供必要的支援。</p>
</div>
<p>執行安裝腳本後：</p>
<ul>
<li>一個名為 milvus 的 Docker 容器已於<strong>19530</strong> 埠啟動。</li>
<li>嵌入式 etcd 已與 Milvus 一同安裝在同一容器中，並於<strong>2379</strong> 埠提供服務。其設定檔對應至當前資料夾中的<strong>embedEtcd.yaml</strong>檔案。</li>
<li>若要變更預設的 Milvus 設定，請將您的設定新增至當前資料夾中的<strong>user.yaml</strong>檔案，然後重新啟動服務。</li>
<li>Milvus 資料卷已映射至當前資料夾中的<strong>volumes/milvus</strong>。</li>
</ul>
<p>您可以透過<code translate="no">http://127.0.0.1:9091/webui/</code> 存取 Milvus WebUI，以進一步了解您的 Milvus 實例。詳細資訊請參閱<a href="/docs/zh-hant/v2.6.x/milvus-webui.md">Milvus WebUI</a>。</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">（可選）更新 Milvus 設定<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
<p>有關適用的設定項目，請參閱《<a href="/docs/zh-hant/v2.6.x/system_configuration.md">系統設定》</a>。</p>
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
    </button></h2><p>您可以使用內建的升級指令將 Milvus 升級至最新版本。此操作會自動下載最新的設定檔和 Milvus 映像檔：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Upgrade Milvus to the latest version</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh upgrade</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>此升級指令會自動：</p>
<ul>
<li>下載包含更新設定的最新安裝腳本</li>
<li>拉取最新的 Milvus Docker 映像檔</li>
<li>使用新版本重新啟動容器</li>
<li>保留您現有的資料與設定</li>
</ul>
<p>這是升級您的 Milvus 獨立部署的建議方法。</p>
</div>
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
<h2 id="Whats-next" class="common-anchor-header">接下來該做什麼<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li><p>參閱<a href="/docs/zh-hant/v2.6.x/quickstart.md">《快速入門》</a>以了解 Milvus 的功能。</p></li>
<li><p>學習 Milvus 的基本操作：</p>
<ul>
<li><a href="/docs/zh-hant/v2.6.x/manage_databases.md">管理資料庫</a></li>
<li><a href="/docs/zh-hant/v2.6.x/manage-collections.md">管理集合</a></li>
<li><a href="/docs/zh-hant/v2.6.x/manage-partitions.md">管理分區</a></li>
<li><a href="/docs/zh-hant/v2.6.x/insert-update-delete.md">插入、Upsert 與刪除</a></li>
<li><a href="/docs/zh-hant/v2.6.x/single-vector-search.md">單向量搜尋</a></li>
<li><a href="/docs/zh-hant/v2.6.x/multi-vector-search.md">混合搜尋</a></li>
</ul></li>
<li><p><a href="/docs/zh-hant/v2.6.x/upgrade_milvus_cluster-helm.md">使用 Helm Chart 升級 Milvus</a>。</p></li>
<li><p><a href="/docs/zh-hant/v2.6.x/scaleout.md">擴展您的 Milvus 叢集</a>。</p></li>
<li><p>在雲端部署您的 Milvus 叢集：</p>
<ul>
<li><a href="/docs/zh-hant/v2.6.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/zh-hant/v2.6.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/zh-hant/v2.6.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>探索<a href="/docs/zh-hant/v2.6.x/milvus-webui.md">Milvus WebUI</a>，這是專為 Milvus 可觀察性與管理設計的直覺式網頁介面。</p></li>
<li><p>探索<a href="/docs/zh-hant/v2.6.x/milvus_backup_overview.md">Milvus Backup</a>，這是一款用於 Milvus 資料備份的開源工具。</p></li>
<li><p>探索<a href="/docs/zh-hant/v2.6.x/birdwatcher_overview.md">Birdwatcher，這</a>是一款用於 Milvus 除錯與動態配置更新的開源工具。</p></li>
<li><p>探索<a href="https://github.com/zilliztech/attu">Attu，這</a>是一款用於直觀管理 Milvus 的開源圖形化介面工具。</p></li>
<li><p><a href="/docs/zh-hant/v2.6.x/monitor.md">透過 Prometheus 監控 Milvus</a>。</p></li>
</ul>
