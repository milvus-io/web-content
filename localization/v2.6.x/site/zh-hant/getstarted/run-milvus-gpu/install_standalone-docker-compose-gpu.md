---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Kubernetes
summary: 瞭解如何在 Kubernetes 上安裝 Milvus 叢集。
title: 使用 Docker Compose 執行支援 GPU 的 Milvus
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="common-anchor-header">使用 Docker Compose 執行支援 GPU 的 Milvus<button data-href="#Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>本頁面說明如何使用 Docker Compose 啟動具備 GPU 支援的 Milvus 執行個體。</p>
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
<li>安裝前<a href="/docs/zh-hant/v2.6.x/prerequisite-gpu.md">請先確認硬體與軟體的系統需求</a>。</li>
</ul>
<div class="alert note">
<p>若在拉取映像檔時遇到任何問題，請透過<a href="mailto:community@zilliz.com">community@zilliz.com</a>聯絡我們，並提供問題詳情，我們將為您提供必要的支援。</p>
</div>
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
    </button></h2><p>若要透過 Docker Compose 安裝支援 GPU 的 Milvus，請依照以下步驟操作。</p>
<h3 id="1-Download-and-configure-the-YAML-file" class="common-anchor-header">1. 下載並設定 YAML 檔案<button data-href="#1-Download-and-configure-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><p>下載 <a href="https://github.com/milvus-io/milvus/releases/download/v2.6.17/milvus-standalone-docker-compose-gpu.yml"><code translate="no">milvus-standalone-docker-compose-gpu.yml</code></a> 並手動將其儲存為 docker-compose.yml，或使用以下指令執行。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v2.6.17/milvus-standalone-docker-compose-gpu.yml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>您需要對 YAML 檔案中獨立服務的環境變數進行以下修改：</p>
<ul>
<li>若要將特定 GPU 裝置指派給 Milvus，請在<code translate="no">standalone</code> 服務的定義中找到 `<code translate="no">deploy.resources.reservations.devices[0].devices_ids</code> ` 欄位，並將其值替換為所需 GPU 的 ID。您可以使用 NVIDIA GPU 顯示驅動程式內附的 `<code translate="no">nvidia-smi</code> ` 工具來確定 GPU 裝置的 ID。Milvus 支援多個 GPU 裝置。</li>
</ul>
<p>將單一 GPU 裝置指派給 Milvus：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&quot;0&quot;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<p>將多個 GPU 裝置指派給 Milvus：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">deploy:</span>
    <span class="hljs-attr">resources:</span>
      <span class="hljs-attr">reservations:</span>
        <span class="hljs-attr">devices:</span>
          <span class="hljs-bullet">-</span> <span class="hljs-attr">driver:</span> <span class="hljs-string">nvidia</span>
            <span class="hljs-attr">capabilities:</span> [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids:</span> [<span class="hljs-string">&#x27;0&#x27;</span>, <span class="hljs-string">&#x27;1&#x27;</span>]
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus" class="common-anchor-header">2. 啟動 Milvus<button data-href="#2-Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>在存放 docker-compose.yml 的目錄中，執行以下指令以啟動 Milvus：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>

Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>若無法執行上述指令，請檢查您的系統是否已安裝 Docker Compose V1。若已安裝，建議您根據<a href="https://docs.docker.com/compose/">此頁面中的</a>說明，遷移至 Docker Compose V2。</p>
</div>
<p>啟動 Milvus 後，</p>
<ul>
<li>名為<strong>milvus-standalone</strong>、<strong>milvus-minio</strong> 及<strong>milvus-etcd</strong>的容器已啟動。
<ul>
<li><strong>milvus-etcd</strong>容器不會向主機公開任何埠，並將其資料映射至當前資料夾中的<strong>volumes/etcd</strong>。</li>
<li><strong>milvus-minio</strong>容器在本地端提供<strong>9090</strong>和<strong>9091</strong>埠，並使用預設的驗證憑證，其資料會映射至當前資料夾中的<strong>volumes/minio</strong>。</li>
<li><strong>milvus-standalone</strong>容器在本地端以預設設定提供<strong>19530</strong>埠的服務，並將其資料映射至當前資料夾中的<strong>volumes/milvus</strong>目錄。</li>
</ul></li>
</ul>
<p>您可以使用以下指令檢查容器是否已啟動並正常運作：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>您也可以透過<code translate="no">http://127.0.0.1:9091/webui/</code> 存取 Milvus WebUI，以進一步了解您的 Milvus 實例。詳細資訊請參閱<a href="/docs/zh-hant/v2.6.x/milvus-webui.md">Milvus WebUI</a>。</p>
<p>若您已在 docker-compose.yml 中為 Milvus 指派了多個 GPU 裝置，您可以指定哪些 GPU 裝置對 Milvus 可見或可供使用。</p>
<p>讓 GPU 裝置<code translate="no">0</code> 對 Milvus 可見：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">CUDA_VISIBLE_DEVICES=0 ./milvus run standalone</span>
<button class="copy-code-btn"></button></code></pre>
<p>讓 GPU 裝置<code translate="no">0</code> 和<code translate="no">1</code> 對 Milvus 可見：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">CUDA_VISIBLE_DEVICES=0,1 ./milvus run standalone</span>
<button class="copy-code-btn"></button></code></pre>
<p>您可以依照以下步驟停止並刪除此容器。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-memory-pool" class="common-anchor-header">設定記憶體池<button data-href="#Configure-memory-pool" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 啟動並運行後，您可以透過修改 `<code translate="no">milvus.yaml</code> ` 檔案中的 `<code translate="no">initMemSize</code> ` 和 `<code translate="no">maxMemSize</code> ` 設定，來自訂記憶體池。</p>
<div class="alert note">
<p><code translate="no">milvus.yaml</code> 檔案位於 Milvus 容器內的<code translate="no">/milvus/configs/</code> 目錄中。</p>
</div>
<p>若要設定記憶體池，請依照以下方式修改<code translate="no">milvus.yaml</code> 檔案中的<code translate="no">initMemSize</code> 和<code translate="no">maxMemSize</code> 設定。</p>
<ol>
<li><p>請使用以下指令，將 Milvus 容器中的<code translate="no">milvus.yaml</code> 檔案複製到您的本地端電腦。請將<code translate="no">&lt;milvus_container_id&gt;</code> 替換為您實際的 Milvus 容器 ID。</p>
<pre><code translate="no" class="language-shell">docker cp &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>使用您偏好的文字編輯器開啟複製的<code translate="no">milvus.yaml</code> 檔案。例如，使用 vim：</p>
<pre><code translate="no" class="language-shell">vim milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>根據需要編輯<code translate="no">initMemSize</code> 和<code translate="no">maxMemSize</code> 的設定，並儲存變更：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: 記憶體池的初始大小。預設值為 1024。</li>
<li><code translate="no">maxMemSize</code>: 記憶體池的最大大小。預設值為 2048。</li>
</ul></li>
<li><p>請使用以下指令，將修改後的<code translate="no">milvus.yaml</code> 檔案複製回 Milvus 容器中。請將<code translate="no">&lt;milvus_container_id&gt;</code> 替換為您實際的 Milvus 容器 ID。</p>
<pre><code translate="no" class="language-shell">docker cp milvus.yaml &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>重新啟動 Milvus 容器以套用變更：</p>
<pre><code translate="no" class="language-shell">docker stop &lt;milvus_container_id&gt;
docker start &lt;milvus_container_id&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
<li><p>瀏覽<a href="/docs/zh-hant/v2.6.x/milvus-webui.md">Milvus WebUI</a>以進一步了解 Milvus 執行個體。</p></li>
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
<li><p>探索<a href="/docs/zh-hant/v2.6.x/milvus-webui.md">Milvus WebUI</a>，這是專為 Milvus 可觀察性與管理而設計的直觀網頁介面。</p></li>
<li><p>探索<a href="/docs/zh-hant/v2.6.x/milvus_backup_overview.md">Milvus Backup</a>，這是一款用於 Milvus 資料備份的開源工具。</p></li>
<li><p>探索<a href="/docs/zh-hant/v2.6.x/birdwatcher_overview.md">Birdwatcher，這</a>是一款用於 Milvus 除錯與動態配置更新的開源工具。</p></li>
<li><p>探索<a href="https://github.com/zilliztech/attu">Attu，這</a>是一款用於直觀管理 Milvus 的開源圖形化介面工具。</p></li>
<li><p><a href="/docs/zh-hant/v2.6.x/monitor.md">使用 Prometheus 監控 Milvus</a>。</p></li>
</ul>
