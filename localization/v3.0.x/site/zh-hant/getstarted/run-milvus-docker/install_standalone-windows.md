---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: 瞭解如何使用 Windows 版的 Docker Desktop 安裝 Milvus 獨立版本。
title: 在 Docker 中執行 Milvus（Windows）
---
<h1 id="Run-Milvus-in-Docker-Windows" class="common-anchor-header">在 Docker 中執行 Milvus（Windows）<button data-href="#Run-Milvus-in-Docker-Windows" class="anchor-icon" translate="no">
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
    </button></h1><blockquote>
<p>預設情況下，此部署會使用<strong>Woodpecker</strong>（本機檔案系統）作為訊息佇列，因此無需外部訊息佇列服務。請參閱<a href="/docs/zh-hant/woodpecker.md">Woodpecker</a>。</p>
</blockquote>
<p>本頁面將示範如何在 Windows 上使用 Docker Desktop（搭配 WSL 2 後端及 Linux 容器）來執行 Milvus。</p>
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
<li><a href="https://docs.docker.com/desktop/setup/install/windows-install/">安裝 Docker Desktop</a>並滿足其 Windows 及硬體需求。</li>
<li><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">安裝 Windows Subsystem for Linux 2 (WSL 2)</a>。</li>
<li>啟動 Docker Desktop，啟用<strong>「使用基於 WSL 2 的引擎</strong>」，並選擇 Linux 容器。若要在 WSL 發行版內執行指令，請在「<strong>設定</strong>&gt;<strong>資源</strong>&gt;<strong>WSL 整合</strong>」中啟用該發行版。請參閱<a href="https://docs.docker.com/desktop/features/wsl/">Docker Desktop WSL 2 後端</a>。</li>
</ul>
<p>在下載 Milvus 檔案之前，請於 PowerShell 或 Windows 命令提示字元中執行以下檢查：</p>
<pre><code translate="no" class="language-powershell">wsl --version
docker info --format &quot;{{.OSType}}&quot;
docker compose version
</code></pre>
<p>Docker 作業系統類型必須為「<code translate="no">linux</code> 」。Compose 範例使用<code translate="no">docker compose</code> 外掛程式（V2 或更新版本），而非舊版<code translate="no">docker-compose</code> V1 指令。</p>
<h2 id="Run-Milvus-in-Docker" class="common-anchor-header">在 Docker 中執行 Milvus<button data-href="#Run-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>請選擇以下其中一個終端機。請在可寫入的工作目錄中執行命令；該腳本會將配置檔案及<code translate="no">volumes</code> 目錄儲存於此處。</p>
<p>此腳本從 Milvus 的<code translate="no">master</code> 分支下載。其 Docker 映像標籤在腳本中已定義，可能與 v3.0.5 不同。若要部署該特定版本，請使用下方的帶有版本標記的 Docker Compose 配置。</p>
<h3 id="From-PowerShell" class="common-anchor-header">透過 PowerShell<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>下載腳本，然後啟動 Milvus：</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -OutFile standalone.bat
.\standalone.bat start
</code></pre>
<p>若要在工作目錄中執行腳本，PowerShell 需要使用<code translate="no">.\</code> 前綴。</p>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">透過 Windows 命令提示字元<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p>請使用 `<code translate="no">curl.exe</code> ` 指令下載腳本；`<code translate="no">Invoke-WebRequest</code> ` 為 PowerShell 指令，無法在命令提示字元中執行：</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -o standalone.bat
standalone.bat start
</code></pre>
<p>執行上述任一 Windows 命令序列後：</p>
<ul>
<li>一個名為<strong>milvus-standalone 的</strong>Docker 容器將開放<strong>19530</strong> 埠。</li>
<li>內嵌的 etcd 在同一容器中於<strong>2379</strong> 埠運行。其設定檔對應於工作目錄中的<strong>embedEtcd.yaml</strong>。</li>
<li>Milvus 將資料儲存於工作目錄中的<strong>volumes/milvus</strong>目錄內。</li>
<li>若需覆寫設定，請在工作目錄中的<strong>user.yaml</strong>檔案中進行修改。修改後請重新啟動容器。</li>
</ul>
<p><code translate="no">start</code> 指令會輸出「<code translate="no">Wait for Milvus Starting...</code> 」，隨後每秒檢查一次，直到<code translate="no">docker ps</code> 回報該容器狀態為正常為止。此檢查無時間限制。若指令未返回結果，請透過另一終端機使用<code translate="no">docker logs milvus-standalone</code> 檢查容器日誌。此腳本會以<code translate="no">--security-opt seccomp:unconfined</code> 啟動容器，因此容器將不採用預設的 Docker seccomp 設定檔運行。</p>
<div class="alert warning">
<blockquote>
<p>該腳本會不指定主機位址地公開<strong>19530</strong>、<strong>9091</strong> 和<strong>2379</strong>這三個埠，而<strong>`embedEtcd.yaml</strong>` 則將 etcd 設定為監聽<code translate="no">http://0.0.0.0:2379</code> 。 預設情況下，Docker Desktop 會將此類埠號發佈至所有網路介面，因此能夠連線至這台電腦的其他機器也能連線至 Milvus 和 etcd。若要限制對這台電腦的存取權限，請在<code translate="no">standalone.bat</code> 檔案中，於第一個<code translate="no">start</code> （例如<code translate="no">-p 127.0.0.1:19530:19530</code> ）之前編輯<code translate="no">-p</code> 選項，並在您無需從容器外部連線至 etcd 的情況下，移除<code translate="no">-p 2379:2379</code> 。 若已存在<code translate="no">milvus-standalone</code> 容器，執行<code translate="no">start</code> 將以原始參數重新啟動該容器。若要預設將已發佈的埠綁定至 localhost，請參閱<a href="https://docs.docker.com/desktop/features/networking/">《Docker Desktop 網路設定》</a>。</p>
</blockquote>
</div>
<p>請在任一終端機中檢查映像檔與容器的狀態：</p>
<pre><code translate="no" class="language-powershell">docker inspect --format &quot;{{.Config.Image}}&quot; milvus-standalone
docker ps --filter name=milvus-standalone
</code></pre>
<p>若要從 PowerShell 停止 Milvus，請執行<code translate="no">.\standalone.bat stop</code> ；若要從命令提示字元執行，請執行<code translate="no">standalone.bat stop</code> 。請在執行<code translate="no">delete</code> 之前先執行<code translate="no">stop</code> ：確認後，<code translate="no">delete</code> 指令會嘗試移除容器，並隨後刪除<strong>卷宗</strong>資料夾、<strong>embedEtcd.yaml</strong> 及<strong>user.yaml，</strong>即使容器仍在運行且尚未被移除亦然。使用前請先備份資料。</p>
<h3 id="From-WSL-2" class="common-anchor-header">從 WSL 2 執行<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>請從 Windows 終端機開啟已安裝的 WSL 發行版：</p>
<pre><code translate="no" class="language-powershell">wsl
</code></pre>
<p>在 WSL 終端機中，下載 Linux 腳本並執行一次 Milvus：</p>
<pre><code translate="no" class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>若要停止 Milvus，請執行<code translate="no">bash standalone_embed.sh stop</code> 。<code translate="no">bash standalone_embed.sh delete</code> 指令會移除容器、設定檔及資料；使用前請先備份資料。</p>
<p>此 Linux 腳本會透過 `<code translate="no">sudo</code>` 執行 Docker，在不指定主機位址的情況下公開其埠號，並透過 `<code translate="no">--security-opt seccomp:unconfined</code>` 啟動容器。關於這些設定的說明，請參閱《<a href="/docs/zh-hant/install_standalone-docker.md">在 Docker（Linux）中執行 Milvus</a>》，這些說明同樣適用於在 WSL 2 中執行 Milvus 的情況。</p>
<h2 id="Run-Milvus-with-Docker-Compose" class="common-anchor-header">使用 Docker Compose 執行 Milvus<button data-href="#Run-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><p>請使用 v3.0.5 版本隨附的配置。僅執行適用於您終端機的命令序列。</p>
<h3 id="From-PowerShell" class="common-anchor-header">透過 PowerShell<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>下載配置檔並輸出其 SHA-256 雜湊值：</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml&quot; -OutFile docker-compose.yaml
Get-FileHash docker-compose.yaml -Algorithm SHA256
</code></pre>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">透過 Windows 命令提示字元<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p>下載配置檔並輸出其 SHA-256 雜湊值：</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml&quot; -o docker-compose.yaml
certutil -hashfile docker-compose.yaml SHA256
</code></pre>
<h3 id="From-WSL-2" class="common-anchor-header">透過 WSL 2<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>開啟您的 WSL 發行版，然後下載設定檔並輸出其 SHA-256 雜湊值：</p>
<pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml -O docker-compose.yaml
<span class="hljs-built_in">sha256sum</span> docker-compose.yaml
<button class="copy-code-btn"></button></code></pre>
<h3 id="Start-Milvus" class="common-anchor-header">啟動 Milvus<button data-href="#Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>將該雜湊值與<a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">v3.0.5 發行頁面中</a> <code translate="no">milvus-standalone-docker-compose.yaml</code> 所列的<code translate="no">sha256</code> 摘要進行比對。<code translate="no">Get-FileHash</code> 會以大寫字母輸出雜湊值，而發行頁面則以小寫字母列出，因此比對時請忽略大小寫差異。接著在同一終端機中啟動 Milvus 並檢查容器：</p>
<pre><code translate="no" class="language-shell">docker compose up -d
docker compose ps
<button class="copy-code-btn"></button></code></pre>
<p>此配置會啟動三個長期運行的容器：<strong>milvus-standalone</strong>、<strong>milvus-minio</strong> 以及<strong>milvus-etcd</strong>。此外，還會執行一次性的<code translate="no">milvus-volume-init</code> 服務，以設定資料目錄的所有權。 這些資料對應至工作目錄中的<strong>volumes/milvus</strong>、<strong>volumes/minio</strong> 及<strong>volumes/etcd</strong>。MinIO 會公開<strong>9000</strong>和<strong>9001</strong> 埠；Milvus 則會公開<strong>19530</strong>和<strong>9091</strong> 埠。 此設定會將這些埠號發佈至所有網路介面；MinIO 使用預設的<code translate="no">minioadmin</code> 憑證，而<code translate="no">standalone</code> 服務則設定為<code translate="no">security_opt: seccomp:unconfined</code> 。若要限制存取權限、變更憑證，或執行設定與生命週期指令，請參閱《<a href="/docs/zh-hant/install_standalone-docker-compose.md">使用 Docker Compose 執行 Milvus</a>》。</p>
<h2 id="FAQs" class="common-anchor-header">常見問題<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error" class="common-anchor-header">如何處理「<code translate="no">Docker Engine stopped</code> 」錯誤？<button data-href="#How-can-I-deal-with-the-Docker-Engine-stopped-error" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 使用 Linux 容器。在重新嘗試安裝之前，請檢查 Docker Desktop 及其 WSL 2 後端：</p>
<ol>
<li><p>若<strong>「工作管理員</strong>」&gt;「<strong>效能</strong>」顯示硬體虛擬化已停用，請在 BIOS/UEFI 中啟用此功能。請參閱<a href="https://docs.docker.com/desktop/setup/install/windows-install/#system-requirements">Docker Desktop</a> 的<a href="https://docs.docker.com/desktop/setup/install/windows-install/#system-requirements">Windows 系統需求</a>。</p></li>
<li><p>從 Windows「開始」選單啟動 Docker Desktop，並等待其引擎運行。安裝或更新 WSL，或使用特定的 Docker Desktop 安裝模式時，可能需要系統管理員權限；但若僅是透過 WSL 2 後端執行 Linux 容器，則通常無需此權限。</p></li>
<li><p>請透過 Windows 終端機檢查 WSL。若需更新，請依照 Windows 要求的權限執行更新指令：</p>
<pre><code translate="no" class="language-powershell">wsl --version
wsl --update
</code></pre></li>
<li><p>在 Docker Desktop 中啟用<strong>「使用基於 WSL 2 的引擎</strong>」。若 Docker 選單提供「<strong>切換至 Linux 容器</strong>」選項，請點選該選項。請勿為排除 Milvus Linux 映像檔的疑難排解而切換至 Windows 容器。</p></li>
<li><p>在您用於安裝的終端機中執行以下檢查：</p>
<pre><code translate="no" class="language-powershell">docker info --format &quot;{{.OSType}}&quot;
</code></pre>
<p>執行結果必須為 `<code translate="no">linux</code>`。若無法連線至守護程式，請依照<a href="https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/">Docker Desktop 疑難排解指南操作，</a>再重新執行 Milvus 腳本。僅執行 `<code translate="no">com.docker.service</code> ` 並不能確保 WSL 2 Linux 引擎正在運行。</p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="common-anchor-header">部署 Milvus 時，如何處理與 WSL 相關的問題？<button data-href="#How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>若您在 WSL 2 上執行 Milvus 時遇到與 WSL 相關的問題，您可能需要檢查是否已將 Docker Desktop 設定為使用基於 WSL 2 的引擎，操作步驟如下：</p>
<ol>
<li><p>請確保在「<strong>設定</strong>&gt;<strong>一般</strong>」中已勾選「使用基於 WSL 2 的引擎」。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" /> 
   <span>在 Docker Desktop 設定中使用基於 WSL 2 的引擎</span>
  
 </span></p></li>
<li><p>請前往「<strong>設定</strong>&gt;<strong>資源</strong>&gt;<strong>WSL 整合</strong>」，從已安裝的 WSL 2 發行版中選擇您要啟用 Docker 整合的發行版。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" /> 
   <span>在 Docker Desktop 設定中選取 WSL 2 發行版</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="common-anchor-header">如何處理 Milvus 啟動時出現的與卷相關的錯誤提示，內容為「<code translate="no">Read config failed</code> 」？<button data-href="#How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="anchor-icon" translate="no">
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
    </button></h3><p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" /> 
   <span>Milvus 啟動時出現「讀取設定失敗」錯誤提示</span>
  
 </span></p>
<p>若要處理 Milvus 啟動時出現的「讀取設定檔失敗」錯誤，您需要檢查掛載至 Milvus 容器中的卷是否正確。若卷已正確掛載至容器中，您可以使用<code translate="no">docker exec</code> 指令進入容器，並如下所示列出<strong>/milvus/configs</strong>資料夾：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" /> 
   <span>列出 Milvus 設定檔</span>
  
 </span></p>
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
    </button></h2><p>在 Docker 中安裝 Milvus 後，請依照<a href="/docs/zh-hant/quickstart.md">《快速入門》</a>中的<strong>「使用現有 Milvus 伺服器路徑</strong>」步驟，並將 SDK 連線至<code translate="no">http://localhost:19530</code> 。此伺服器路徑無需 Milvus Lite；本地端的<code translate="no">.db</code> 連線區塊會啟動獨立的本地資料庫，而非使用此容器。</p>
<p>您也可以：</p>
<ul>
<li><p>查閱<a href="/docs/zh-hant/quickstart.md">《快速入門》</a>以了解 Milvus 的功能。</p></li>
<li><p>學習 Milvus 的基本操作：</p>
<ul>
<li><a href="/docs/zh-hant/manage_databases.md">管理資料庫</a></li>
<li><a href="/docs/zh-hant/manage-collections.md">管理集合</a></li>
<li><a href="/docs/zh-hant/manage-partitions.md">管理分區</a></li>
<li><a href="/docs/zh-hant/insert-update-delete.md">插入、Upsert 與刪除</a></li>
<li><a href="/docs/zh-hant/single-vector-search.md">單向量搜尋</a></li>
<li><a href="/docs/zh-hant/multi-vector-search.md">混合搜尋</a></li>
</ul></li>
<li><p>若採用 Compose 部署方式，請參閱《<a href="/docs/zh-hant/upgrade_milvus_standalone-docker.md">使用 Docker Compose 升級 Milvus 獨立執行版本</a>》；升級前請先在您的環境中驗證此程序是否適用。</p></li>
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
<li><p><a href="/docs/zh-hant/monitor.md">使用 Prometheus 監控 Milvus</a>。</p></li>
</ul>
