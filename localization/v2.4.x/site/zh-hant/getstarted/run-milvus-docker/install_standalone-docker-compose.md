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
<li>安裝前<a href="/docs/zh-hant/v2.4.x/prerequisite-docker.md">請檢查硬體和軟體的需求</a>。</li>
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
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Download the configuration file</span>
$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose.yml -O docker-compose.yml

<span class="hljs-comment"># Start Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose up -d

Creating milvus-etcd  ... <span class="hljs-keyword">done</span>
Creating milvus-minio ... <span class="hljs-keyword">done</span>
Creating milvus-standalone ... <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>如果您執行上述指令失敗，請檢查您的系統是否已安裝 Docker Compose V1。如果是這種情況，建議您根據<a href="https://docs.docker.com/compose/">本頁面</a>的注意事項，轉移到 Docker Compose V2。</p></li>
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
<p>您可以使用下列指令檢查容器是否已啟動並運作：</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker-compose ps

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>您可以按以下方式停止和刪除此容器</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Stop Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose down

<span class="hljs-comment"># Delete service data</span>
$ <span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes
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
<li><p>查看<a href="/docs/zh-hant/v2.4.x/quickstart.md">Quickstart</a>了解 Milvus 的功能。</p></li>
<li><p>學習 Milvus 的基本操作：</p>
<ul>
<li><a href="/docs/zh-hant/v2.4.x/manage_databases.md">管理資料庫</a></li>
<li><a href="/docs/zh-hant/v2.4.x/manage-collections.md">管理資料集</a></li>
<li><a href="/docs/zh-hant/v2.4.x/manage-partitions.md">管理分割區</a></li>
<li><a href="/docs/zh-hant/v2.4.x/insert-update-delete.md">插入、倒置及刪除</a></li>
<li><a href="/docs/zh-hant/v2.4.x/single-vector-search.md">單向量搜尋</a></li>
<li><a href="/docs/zh-hant/v2.4.x/multi-vector-search.md">混合搜尋</a></li>
</ul></li>
<li><p><a href="/docs/zh-hant/v2.4.x/upgrade_milvus_cluster-helm.md">使用 Helm Chart 升級 Milvus</a>。</p></li>
<li><p><a href="/docs/zh-hant/v2.4.x/scaleout.md">擴充您的 Milvus 集群</a>。</p></li>
<li><p>在雲端部署您的 Milvus 叢集：</p>
<ul>
<li><a href="/docs/zh-hant/v2.4.x/eks.md">亞馬遜 EKS</a></li>
<li><a href="/docs/zh-hant/v2.4.x/gcp.md">谷歌雲</a></li>
<li><a href="/docs/zh-hant/v2.4.x/azure.md">微軟 Azure</a></li>
</ul></li>
<li><p>探索<a href="/docs/zh-hant/v2.4.x/milvus_backup_overview.md">Milvus 備份</a>，Milvus 資料備份的開放原始碼工具。</p></li>
<li><p>探索<a href="/docs/zh-hant/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>，用於調試 Milvus 和動態配置更新的開放源碼工具。</p></li>
<li><p>探索<a href="https://github.com/zilliztech/attu">Attu</a>，用於直覺式 Milvus 管理的開放原始碼 GUI 工具。</p></li>
<li><p><a href="/docs/zh-hant/v2.4.x/monitor.md">使用 Prometheus 監控 Milvus</a>。</p></li>
</ul>
