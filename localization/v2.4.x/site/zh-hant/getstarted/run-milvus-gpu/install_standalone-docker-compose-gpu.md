---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Kubernetes
summary: 學習如何在 Kubernetes 上安裝 Milvus 叢集。
title: 使用 Docker Compose 運行支援 GPU 的 Milvus
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="common-anchor-header">使用 Docker Compose 運行支援 GPU 的 Milvus<button data-href="#Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>本頁說明如何使用 Docker Compose 啟動支援 GPU 的 Milvus 實例。</p>
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
<li>安裝前<a href="/docs/zh-hant/v2.4.x/prerequisite-gpu.md">請檢查硬體與軟體需求</a>。</li>
</ul>
<div class="alert note">
<p>如果您在拉動映像時遇到任何問題，請透過<a href="mailto:community@zilliz.com">community@zilliz.com</a>與我們聯絡，並提供問題的詳細資訊，我們將為您提供必要的支援。</p>
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
    </button></h2><p>若要使用 Docker Compose 安裝支援 GPU 的 Milvus，請遵循下列步驟。</p>
<h3 id="1-Download-and-configure-the-YAML-file" class="common-anchor-header">1.下載並設定 YAML 檔案</h3><p>下載 <a href="https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose-gpu.yml"><code translate="no">milvus-standalone-docker-compose-gpu.yml</code></a>並手動儲存為 docker-compose.yml，或使用下列指令。</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose-gpu.yml -O docker-compose.yml
<button class="copy-code-btn"></button></code></pre>
<p>您需要對 YAML 檔案中獨立服務的環境變數做一些變更，如下所示：</p>
<ul>
<li>若要指定特定的 GPU 裝置給 Milvus，請找到<code translate="no">standalone</code> 服務定義中的<code translate="no">deploy.resources.reservations.devices[0].devices_ids</code> 欄位，並將其值換成所需 GPU 的 ID。您可以使用 NVIDIA GPU 顯示驅動程式隨附的<code translate="no">nvidia-smi</code> 工具來確定 GPU 裝置的 ID。Milvus 支援多個 GPU 裝置。</li>
</ul>
<p>指定單一 GPU 裝置至 Milvus：</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-attr">standalone</span>:
  ...
  <span class="hljs-attr">deploy</span>:
    <span class="hljs-attr">resources</span>:
      <span class="hljs-attr">reservations</span>:
        <span class="hljs-attr">devices</span>:
          - <span class="hljs-attr">driver</span>: nvidia
            <span class="hljs-attr">capabilities</span>: [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids</span>: [<span class="hljs-string">&quot;0&quot;</span>]
...
<button class="copy-code-btn"></button></code></pre>
<p>指定多個 GPU 裝置至 Milvus：</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-attr">standalone</span>:
  ...
  <span class="hljs-attr">deploy</span>:
    <span class="hljs-attr">resources</span>:
      <span class="hljs-attr">reservations</span>:
        <span class="hljs-attr">devices</span>:
          - <span class="hljs-attr">driver</span>: nvidia
            <span class="hljs-attr">capabilities</span>: [<span class="hljs-string">&quot;gpu&quot;</span>]
            <span class="hljs-attr">device_ids</span>: [<span class="hljs-string">&#x27;0&#x27;</span>, <span class="hljs-string">&#x27;1&#x27;</span>]
...
<button class="copy-code-btn"></button></code></pre>
<h3 id="2-Start-Milvus" class="common-anchor-header">2.啟動 Milvus</h3><p>在存放 docker-compose.yml 的目錄中，執行啟動 Milvus：</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker compose up -d

Creating milvus-etcd  ... <span class="hljs-keyword">done</span>
Creating milvus-minio ... <span class="hljs-keyword">done</span>
Creating milvus-standalone ... <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果您無法執行上述指令，請檢查您的系統是否已安裝 Docker Compose V1。如果是這樣的話，建議您根據<a href="https://docs.docker.com/compose/">本頁面</a>的說明，轉換到 Docker Compose V2。</p>
</div>
<p>啟動 Milvus 之後、</p>
<ul>
<li>命名為<strong>milvus-</strong> <strong>standalone</strong>、<strong>milvus-minio</strong> 和<strong>milvus-etcd</strong>的容器已啟動。<ul>
<li><strong>milvus-etcd</strong>容器不向主機暴露任何連接埠，並將其資料映射到目前資料夾中的<strong>volumes/etcd</strong>。</li>
<li><strong>milvus-minio</strong>容器使用預設的驗證憑證在本機服務連接埠<strong>9090</strong>和<strong>9091</strong>，並將其資料對應到目前資料夾中的<strong>volumes/minio</strong>。</li>
<li><strong>milvus-standalone</strong>容器使用預設設定本機服務連接埠<strong>19530</strong>，並將其資料對應到目前資料夾中的<strong>volumes/milvus</strong>。</li>
</ul></li>
</ul>
<p>您可以使用下列指令檢查容器是否正常運作：</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker compose ps

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>如果您在 docker-compose.yml 中指定了多個 GPU 裝置給 Milvus，您可以指定哪個 GPU 裝置是可見或可用的。</p>
<p>讓 GPU 裝置<code translate="no">0</code> 對 Milvus 是可見的：</p>
<pre><code translate="no" class="language-shell">$ CUDA_VISIBLE_DEVICES=0 ./milvus run standalone
<button class="copy-code-btn"></button></code></pre>
<p>讓 GPU 裝置<code translate="no">0</code> 和<code translate="no">1</code> 對 Milvus 是可見的：</p>
<pre><code translate="no" class="language-shell">$ CUDA_VISIBLE_DEVICES=0,1 ./milvus run standalone
<button class="copy-code-btn"></button></code></pre>
<p>您可以如下方式停止和刪除此容器。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Stop Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose down

<span class="hljs-comment"># Delete service data</span>
$ <span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes
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
    </button></h2><p>Milvus 開啟並運行後，您可以透過修改<code translate="no">milvus.yaml</code> 檔案中的<code translate="no">initMemSize</code> 和<code translate="no">maxMemSize</code> 設定，自訂記憶體池中的記憶體。</p>
<div class="alert note">
<p><code translate="no">milvus.yaml</code> 檔案位於 Milvus 容器內的<code translate="no">/milvus/configs/</code> 目錄。</p>
</div>
<p>要自訂記憶體池時，請修改<code translate="no">milvus.yaml</code> 檔案中的<code translate="no">initMemSize</code> 和<code translate="no">maxMemSize</code> 設定，如下所示。</p>
<ol>
<li><p>使用以下命令將<code translate="no">milvus.yaml</code> 從 Milvus 容器複製到您的本機。用您實際的 Milvus 容器 ID 取代<code translate="no">&lt;milvus_container_id&gt;</code> 。</p>
<pre><code translate="no" class="language-shell">docker <span class="hljs-built_in">cp</span> &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>使用您喜歡的文字編輯器開啟複製的<code translate="no">milvus.yaml</code> 檔案。例如，使用 vim：</p>
<pre><code translate="no" class="language-shell">vim milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>根據需要編輯<code translate="no">initMemSize</code> 和<code translate="no">maxMemSize</code> 設定，並儲存您的變更：</p>
<pre><code translate="no" class="language-yaml">...
gpu:
  initMemSize: 0
  maxMemSize: 0
...
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>:記憶體池的初始大小。預設為 1024。</li>
<li><code translate="no">maxMemSize</code>:記憶體池的最大大小。預設為 2048。</li>
</ul></li>
<li><p>使用以下命令將修改過的<code translate="no">milvus.yaml</code> 檔案複製回 Milvus 容器。用您實際的 Milvus 容器 ID 取代<code translate="no">&lt;milvus_container_id&gt;</code> 。</p>
<pre><code translate="no" class="language-shell">docker <span class="hljs-built_in">cp</span> milvus.yaml &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>重新啟動 Milvus 容器以套用變更：</p>
<pre><code translate="no" class="language-shell">docker stop &lt;milvus_container_id&gt;
docker start &lt;milvus_container_id&gt;
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
<li><p><a href="/docs/zh-hant/v2.4.x/scaleout.md">擴充你的 Milvus 集群</a>。</p></li>
<li><p>在雲上部署您的 Milvu 集群：</p>
<ul>
<li><a href="/docs/zh-hant/v2.4.x/eks.md">亞馬遜 EKS</a></li>
<li><a href="/docs/zh-hant/v2.4.x/gcp.md">谷歌雲</a></li>
<li><a href="/docs/zh-hant/v2.4.x/azure.md">微軟 Azure</a></li>
</ul></li>
<li><p>探索<a href="/docs/zh-hant/v2.4.x/milvus_backup_overview.md">Milvus 備份</a>，Milvus 資料備份的開放原始碼工具。</p></li>
<li><p>探索<a href="/docs/zh-hant/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>，用於調試 Milvus 和動態配置更新的開放源碼工具。</p></li>
<li><p>探索<a href="https://milvus.io/docs/attu.md">Attu</a>，用於直覺式 Milvus 管理的開放原始碼 GUI 工具。</p></li>
<li><p><a href="/docs/zh-hant/v2.4.x/monitor.md">使用 Prometheus 監控 Milvus</a>。</p></li>
</ul>
