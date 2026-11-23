---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Docker Compose
summary: 瞭解如何使用 Docker Compose 安裝支援 GPU 的 Milvus 獨立版本。
title: 使用 Docker Compose 執行具備 GPU 支援的 Milvus
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="common-anchor-header">使用 Docker Compose 執行具備 GPU 支援的 Milvus<button data-href="#Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>本頁面說明如何使用 Docker Compose 啟動具備 GPU 支援的 Milvus 實例。</p>
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
<li>安裝前<a href="/docs/zh-hant/prerequisite-gpu.md">請先確認硬體與軟體的系統需求</a>。</li>
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
    </button></h3><p>下載 <a href="https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml"><code translate="no">milvus-standalone-docker-compose-gpu.yaml</code></a> 並手動將其儲存為 docker-compose.yml，或使用以下指令執行。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>若要驗證下載是否成功，請將以下指令的輸出結果與<code translate="no">milvus-standalone-docker-compose-gpu.yaml</code> <a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">發行頁面</a>中列出的<code translate="no">sha256</code> 摘要進行比對：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sha256sum</span> docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>您可以在 YAML 檔案中，於<code translate="no">standalone</code> 服務的<code translate="no">deploy</code> 區段中，依下述方式變更指派給 Milvus 的 GPU 裝置：</p>
<ul>
<li>若要將特定的 GPU 裝置指派給 Milvus，請在<code translate="no">standalone</code> 服務的定義中找到<code translate="no">deploy.resources.reservations.devices[0].device_ids</code> 欄位，並將其值替換為所需 GPU 的 ID。您可以使用 NVIDIA GPU 顯示驅動程式中附帶的<code translate="no">nvidia-smi</code> 工具來確定 GPU 裝置的 ID。Milvus 支援多個 GPU 裝置。</li>
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
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>若無法執行上述指令，請檢查您的系統是否已安裝 Docker Compose V1。若已安裝，建議您根據<a href="https://docs.docker.com/compose/">此頁面中的</a>說明，遷移至 Docker Compose V2。</p>
</div>
<p>Milvus 啟動後，</p>
<ul>
<li>名為<strong>milvus-standalone</strong>、<strong>milvus-minio</strong> 及<strong>milvus-etcd</strong>的容器已啟動。
<ul>
<li><strong>milvus-etcd</strong>容器不會向主機公開任何埠號，並將其資料映射至當前資料夾中的<strong>volumes/etcd</strong>。</li>
<li><strong>milvus-minio</strong>容器使用預設的驗證憑證提供<strong>9000</strong>和<strong>9001</strong>埠，並將其資料映射至當前資料夾中的<strong>volumes/minio</strong>。</li>
<li><strong>milvus-standalone</strong>容器以預設設定提供<strong>19530</strong>和<strong>9091</strong>埠，並將其資料映射至當前資料夾中的<strong>volumes/milvus</strong>。</li>
</ul></li>
</ul>
<p><code translate="no">standalone</code> 服務設定了 `<code translate="no">security_opt: seccomp:unconfined</code>`，因此 Milvus 容器會在不使用預設 Docker seccomp 設定檔的情況下運行。</p>
<div class="alert warning">
<blockquote>
<p>Compose 檔案在發佈這些埠時未指定主機 IP，因此 Docker 會將其綁定至主機的所有網路介面，而能夠連線至此主機的其他機器皆可連線至 Milvus 和 MinIO。MinIO 使用 Compose 檔案中設定的存取金鑰與密鑰<code translate="no">minioadmin</code> 。 若要僅在迴路位址上公開這些埠，請在<code translate="no">docker-compose.yml</code> 中的<code translate="no">minio</code> 和<code translate="no">standalone</code> 服務的<code translate="no">ports</code> 項目中，新增<code translate="no">127.0.0.1:</code> （例如<code translate="no">&quot;127.0.0.1:19530:19530&quot;</code> ），然後再次執行<code translate="no">sudo docker compose up -d</code> 。 詳細資訊請參閱<a href="https://docs.docker.com/engine/network/port-publishing/">《端口發佈與映射》</a>。若要使用其他 MinIO 憑證，請變更<code translate="no">minio</code> 服務中的<code translate="no">MINIO_ACCESS_KEY</code> 和<code translate="no">MINIO_SECRET_KEY</code> ，並在 Milvus 配置的<code translate="no">minio.accessKeyID</code> 和<code translate="no">minio.secretAccessKey</code> 中設定相同的值。若要要求客戶端連線至 Milvus 時必須提供使用者名稱和密碼，請參閱<a href="/docs/zh-hant/authenticate.md">《驗證使用者存取權限</a>》。</p>
</blockquote>
</div>
<p>您可以使用以下命令檢查容器是否已啟動並正常運作：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>
<button class="copy-code-btn"></button></code></pre>
<p>預設情況下，此指令僅列出正在運行的容器。請確認輸出結果中包含<strong>milvus-etcd</strong>、<strong>milvus-minio</strong> 及<strong>milvus-standalone</strong>這三個容器，且每個容器的「<code translate="no">STATUS</code> 」欄位均以<code translate="no">Up</code> 開頭。</p>
<p>您亦可透過<code translate="no">http://127.0.0.1:9091/webui/</code> 存取 Milvus WebUI，以進一步了解您的 Milvus 執行個體。詳細資訊請參閱<a href="/docs/zh-hant/milvus-webui.md">Milvus WebUI</a>。</p>
<p>若要在 Milvus 啟動後變更其使用的 GPU 裝置，請依照步驟 1 所示，編輯 docker-compose.yml 檔案中<code translate="no">standalone</code> 服務的<code translate="no">deploy.resources.reservations.devices</code> 下的<code translate="no">device_ids</code> 欄位，然後執行以下指令。由於服務設定已變更，<code translate="no">docker compose up</code> 會停止並重新建立<strong>milvus-standalone</strong>容器。 詳細資訊請參閱《<a href="https://docs.docker.com/compose/how-tos/gpu-support/">執行具備 GPU 存取權限的 Docker Compose 服務</a>》。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
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
    </button></h2><p>在 Milvus 啟動並運行後，您可以透過修改 Milvus 配置中<code translate="no">gpu</code> 區段的<code translate="no">initMemSize</code> 和<code translate="no">maxMemSize</code> 設定，來自訂記憶體池。</p>
<div class="alert note">
<p><code translate="no">milvus.yaml</code> 檔案位於 Milvus 容器內的<code translate="no">/milvus/configs/</code> 目錄中。同一目錄下的<code translate="no">user.yaml</code> 檔案中的設定會覆寫<code translate="no">milvus.yaml</code> 中的值。</p>
</div>
<p>若要在重新建立容器時保留設定，請將設定儲存於主機上的<code translate="no">user.yaml</code> 檔案中，並依照以下方式將該檔案掛載至容器內。</p>
<ol>
<li><p>在存放 docker-compose.yml 的目錄中，建立一個名為<code translate="no">user.yaml</code> 的檔案，並填入您要變更的設定。以下範例顯示<code translate="no">gpu</code> 區段及其預設值。請將其替換為您所需的大小：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: 記憶體池的初始大小，單位為 MB。預設值為 2048。</li>
<li><code translate="no">maxMemSize</code>: 記憶體池的最大大小，單位為 MB。預設值為 4096。</li>
</ul></li>
<li><p>在 docker-compose.yml 中，將<code translate="no">user.yaml</code> 檔案新增至<code translate="no">standalone</code> 服務的<code translate="no">volumes</code> 清單中：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">./user.yaml:/milvus/configs/user.yaml</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>重新建立 Milvus 容器以套用變更：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>檔案掛載完成後，重新啟動<code translate="no">standalone</code> 服務以套用後續對<code translate="no">user.yaml</code> 所做的變更：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose restart standalone</span>
<button class="copy-code-btn"></button></code></pre>
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
<li><p>參閱<a href="/docs/zh-hant/quickstart.md">《快速入門》</a>以了解 Milvus 的功能。</p></li>
<li><p>查看<a href="/docs/zh-hant/milvus-webui.md">Milvus WebUI</a>以進一步了解 Milvus 執行個體。</p></li>
<li><p>學習 Milvus 的基本操作：</p>
<ul>
<li><a href="/docs/zh-hant/manage_databases.md">管理資料庫</a></li>
<li><a href="/docs/zh-hant/manage-collections.md">管理集合</a></li>
<li><a href="/docs/zh-hant/manage-partitions.md">管理分區</a></li>
<li><a href="/docs/zh-hant/insert-update-delete.md">插入、Upsert 與刪除</a></li>
<li><a href="/docs/zh-hant/single-vector-search.md">單向量搜尋</a></li>
<li><a href="/docs/zh-hant/multi-vector-search.md">混合搜尋</a></li>
</ul></li>
<li><p><a href="/docs/zh-hant/upgrade_milvus_standalone-docker.md">使用 Docker Compose 升級 Milvus 獨立執行版本</a>。該頁面會顯示 CPU 映像檔標籤。針對此 GPU 部署，請保留「<code translate="no">-gpu</code> 」後綴（<code translate="no">milvusdb/milvus:v3.0.5-gpu</code> ），並維持您的<code translate="no">deploy</code> 及<code translate="no">user.yaml</code> 設定。</p></li>
<li><p>在 Kubernetes<a href="/docs/zh-hant/scaleout.md">上擴展 Milvus 叢集</a>。該程序使用 Helm，不適用於此 Docker 部署。</p></li>
<li><p>在雲端平台上部署您的 Milvus 叢集：</p>
<ul>
<li><a href="/docs/zh-hant/eks.md">Amazon EKS</a></li>
<li><a href="/docs/zh-hant/gcp.md">Google Cloud</a></li>
<li><a href="/docs/zh-hant/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>探索<a href="/docs/zh-hant/milvus-webui.md">Milvus WebUI，</a>這是用於 Milvus 可觀察性與管理的直觀網頁介面。</p></li>
<li><p>探索<a href="/docs/zh-hant/milvus_backup_overview.md">Milvus Backup</a>，這是一款用於 Milvus 資料備份的開源工具。</p></li>
<li><p>探索<a href="/docs/zh-hant/birdwatcher_overview.md">Birdwatcher，這</a>是一款用於 Milvus 除錯與動態配置更新的開源工具。</p></li>
<li><p>探索<a href="https://github.com/zilliztech/attu">Attu，這</a>是一款用於直觀管理 Milvus 的開源圖形化介面工具。</p></li>
<li><p><a href="/docs/zh-hant/monitor.md">透過 Prometheus 監控 Milvus</a>。</p></li>
</ul>
