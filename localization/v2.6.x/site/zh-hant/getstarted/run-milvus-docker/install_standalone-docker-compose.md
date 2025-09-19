---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: 學習如何使用 Docker Compose 獨立安裝 Milvus。
title: 使用 Docker Compose 執行 Milvus (Linux)
---
<h1 id="Run-Milvus-with-Docker-Compose-Linux" class="common-anchor-header">使用 Docker Compose 執行 Milvus (Linux)<button data-href="#Run-Milvus-with-Docker-Compose-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>本頁說明如何使用 Docker Compose 在 Docker 中啟動 Milvus 實例。</p>
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
<li>安裝前<a href="/docs/zh-hant/prerequisite-docker.md">請檢查硬體和軟體的需求</a>。</li>
</ul>
<h2 id="Install-Milvus" class="common-anchor-header">安裝 Milvus<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 在 Milvus 套件庫中提供 Docker Compose 配置檔案。要使用 Docker Compose 安裝 Milvus，只要執行</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the configuration file</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v2.6.2/milvus-standalone-docker-compose.yml -O docker-compose.yml</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>

Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>v2.6.2 的新功能：</strong></p>
<ul>
<li><strong>增強的架構</strong>：具有新的 Streaming 節點和最佳化的元件。</li>
<li><strong>更新的相依性</strong>：包含最新的 MinIO 和 etcd 版本</li>
<li><strong>改進的組態</strong>：最佳化設定以獲得更佳效能</li>
</ul>
<p>請務必下載最新的 Docker Compose 配置，以確保與 v2.6.2 功能相容。</p>
<ul>
<li><p>如果您執行上述指令失敗，請檢查您的系統是否已安裝 Docker Compose V1。如果是這種情況，建議您根據<a href="https://docs.docker.com/compose/">本頁面</a>的注意事項遷移至 Docker Compose V2。</p></li>
<li><p>如果您在拉取映像時遇到任何問題，請與我們聯絡<a href="mailto:community@zilliz.com">community@zilliz.com</a>，並提供問題的詳細資訊，我們會為您提供必要的支援。</p></li>
</ul>
</div>
<p>啟動 Milvus 之後</p>
<ul>
<li>命名為<strong>milvus-</strong> <strong>standalone</strong>、<strong>milvus-minio</strong> 和<strong>milvus-etcd</strong>的容器已啟動。<ul>
<li><strong>milvus-etcd</strong>容器不向主機暴露任何連接埠，並將其資料映射到目前資料夾中的<strong>volumes/etcd</strong>。</li>
<li><strong>milvus-minio</strong>容器使用預設的驗證憑證在本機服務連接埠<strong>9090</strong>和<strong>9091</strong>，並將其資料對應到目前資料夾中的<strong>volumes/minio</strong>。</li>
<li><strong>milvus-standalone</strong>容器使用預設設定本機服務連接埠<strong>19530</strong>，並將其資料對應到目前資料夾中的<strong>volumes/milvus</strong>。</li>
</ul></li>
</ul>
<p>您可以使用以下命令檢查容器是否已啟動和運行：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker-compose ps</span>

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>您也可以存取 Milvus WebUI，網址是<code translate="no">http://127.0.0.1:9091/webui/</code> ，以瞭解更多關於您的 Milvus 實例的資訊。如需詳細資訊，請參閱<a href="/docs/zh-hant/milvus-webui.md">Milvus WebUI</a>。</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">(可選）更新 Milvus 配置<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>要更新 Milvus 配置以滿足您的需求，您需要修改<code translate="no">milvus-standalone</code> 容器內的<code translate="no">/milvus/configs/user.yaml</code> 檔案。</p>
<ol>
<li><p>存取<code translate="no">milvus-standalone</code> 容器。</p>
<pre><code translate="no" class="language-shell">docker exec -it milvus-standalone bash
<button class="copy-code-btn"></button></code></pre></li>
<li><p>新增額外的配置以覆寫預設配置。以下假設您需要覆寫預設的<code translate="no">proxy.healthCheckTimeout</code> 。有關適用的組態項目，請參閱<a href="/docs/zh-hant/system_configuration.md">系統組態</a>。</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; /milvus/configs/user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre></li>
<li><p>重新啟動<code translate="no">milvus-standalone</code> 容器以套用變更。</p>
<pre><code translate="no" class="language-shell">docker restart milvus-standalone
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Stop-and-delete-Milvus" class="common-anchor-header">停止和刪除 Milvus<button data-href="#Stop-and-delete-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以按以下方式停止和刪除此容器</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>在 Docker 中安裝 Milvus 後，您可以</p>
<ul>
<li><p>查看<a href="/docs/zh-hant/quickstart.md">Quickstart</a>，了解 Milvus 的功能。</p></li>
<li><p>學習 Milvus 的基本操作：</p>
<ul>
<li><a href="/docs/zh-hant/manage_databases.md">管理資料庫</a></li>
<li><a href="/docs/zh-hant/manage-collections.md">管理資料集</a></li>
<li><a href="/docs/zh-hant/manage-partitions.md">管理分割區</a></li>
<li><a href="/docs/zh-hant/insert-update-delete.md">插入、倒置及刪除</a></li>
<li><a href="/docs/zh-hant/single-vector-search.md">單向量搜尋</a></li>
<li><a href="/docs/zh-hant/multi-vector-search.md">混合搜尋</a></li>
</ul></li>
<li><p><a href="/docs/zh-hant/upgrade_milvus_cluster-helm.md">使用 Helm Chart 升級 Milvus</a>。</p></li>
<li><p><a href="/docs/zh-hant/scaleout.md">擴充您的 Milvus 集群</a>。</p></li>
<li><p>在雲端部署您的 Milvus 叢集：</p>
<ul>
<li><a href="/docs/zh-hant/eks.md">亞馬遜 EKS</a></li>
<li><a href="/docs/zh-hant/gcp.md">谷歌雲</a></li>
<li><a href="/docs/zh-hant/azure.md">微軟 Azure</a></li>
</ul></li>
<li><p>探索<a href="/docs/zh-hant/milvus-webui.md">Milvus WebUI</a>，Milvus 可觀察與管理的直覺式網頁介面。</p></li>
<li><p>探索<a href="/docs/zh-hant/milvus_backup_overview.md">Milvus 備份</a>，Milvus 資料備份的開放原始碼工具。</p></li>
<li><p>探索<a href="/docs/zh-hant/birdwatcher_overview.md">Birdwatcher</a>，用於調試 Milvus 和動態組態更新的開放原始碼工具。</p></li>
<li><p>探索<a href="https://github.com/zilliztech/attu">Attu</a>，一個開放源碼 GUI 工具，用於直觀的 Milvus 管理。</p></li>
<li><p><a href="/docs/zh-hant/monitor.md">使用 Prometheus 監控 Milvus</a>。</p></li>
</ul>
