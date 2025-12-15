---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: 了解如何使用 Docker Desktop for Windows 獨立安裝 Milvus。
title: 在 Docker 中執行 Milvus (Linux)
---
<h1 id="Run-Milvus-in-Docker-Windows" class="common-anchor-header">在 Docker 中執行 Milvus (Windows)<button data-href="#Run-Milvus-in-Docker-Windows" class="anchor-icon" translate="no">
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
    </button></h1><p>本頁面示範如何使用 Docker Desktop for Windows 在 Windows 上執行 Milvus。</p>
<h2 id="Prerequisites​" class="common-anchor-header">先決條件<button data-href="#Prerequisites​" class="anchor-icon" translate="no">
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
<li><p><a href="https://docs.docker.com/desktop/setup/install/windows-install/">安裝 Docker Desktop</a>。</p></li>
<li><p><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">安裝 Windows Subsystem for Linux 2 (WSL 2)</a>。</p></li>
<li><p>安裝 Python 3.8+。</p></li>
</ul>
<h2 id="Run-Milvus-in-Docker​" class="common-anchor-header">在 Docker 中執行 Milvus<button data-href="#Run-Milvus-in-Docker​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 提供一個安裝腳本，可將其安裝為 Docker 容器。在 Microsoft Windows 上安裝 Docker Desktop 後，您可以從 PowerShell 或 Windows Command Prompt 以<strong>管理員</strong>模式以及 WSL 2 存取 Docker CLI。</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">從 PowerShell 或 Windows Command Prompt<button data-href="#From-PowerShell-or-Windows-Command-Prompt​" class="anchor-icon" translate="no">
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
    </button></h3><p>如果您比較熟悉 PowerShell 或 Windows Command Prompt，命令提示符如下。</p>
<ol>
<li><p>在管理員模式下開啟 Docker Desktop，方法是按滑鼠右鍵並選擇<strong>以管理員身分執行</strong>。</p></li>
<li><p>下載安裝指令碼並儲存為<code translate="no">standalone.bat</code> 。</p>
<pre><code translate="no" class="language-powershell">C:\&gt;Invoke-WebRequest https://raw.githubusercontent.com/milvus-io/milvus/refs/heads/master/scripts/standalone_embed.bat -OutFile standalone.bat​

</code></pre></li>
<li><p>執行下載的腳本，以 Docker 容器啟動 Milvus。</p>
<pre><code translate="no" class="language-powershell">C:\&gt;standalone.bat start​
Wait for Milvus starting...​
Start successfully.​
To change the default Milvus configuration, edit user.yaml and restart the service.​

</code></pre>
<p>執行安裝腳本後</p>
<ul>
<li><p>一個名為<strong>milvus-standalone</strong>的 docker 容器已經在<strong>19530</strong> 連接埠啟動。</p></li>
<li><p>嵌入式 etcd 與 Milvus 安裝在同一個容器中，並在<strong>2379</strong> 連接埠提供服務。它的設定檔對應到目前資料夾中的<strong>embedEtcd.yaml。</strong></p></li>
<li><p>Milvus 資料卷被對應到目前資料夾中的<strong>volumes/milvus</strong>。</p></li>
</ul>
<p>您可以使用下列命令管理 Milvus 容器和儲存的資料。</p>
<pre><code translate="no" class="language-powershell"># Stop Milvus​
C:\&gt;standalone.bat stop​
Stop successfully.​
​
# Delete Milvus container​
C:\&gt;standalone.bat delete​
Delete Milvus container successfully. # Container has been removed.​
Delete successfully. # Data has been removed.​

</code></pre></li>
</ol>
<h3 id="From-WSL-2​" class="common-anchor-header">從 WSL 2<button data-href="#From-WSL-2​" class="anchor-icon" translate="no">
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
    </button></h3><p>如果您喜歡在 Windows 上使用 Linux 指令和 shell 腳本啟動 Milvus，請確保已經安裝了 WSL 2 指令。有關如何安裝 WSL 2 指令的詳細資訊，您可以參考這篇<a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">微軟文章</a>。</p>
<ol>
<li><p>啟動 WSL 2。</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

</code></pre></li>
<li><p>下載安裝腳本</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Download the installation script​</span>
$ curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh​
​
<span class="hljs-comment"># Start the Docker container​</span>
$ bash standalone_embed.sh start​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>以 docker 容器的方式啟動 Milvus。</p>
<pre><code translate="no" class="language-bash">$ bash standalone_embed.sh start​
Wait <span class="hljs-keyword">for</span> Milvus Starting...​
Start successfully.​
To change the default Milvus configuration, add your settings to the user.yaml file and <span class="hljs-keyword">then</span> restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>您可以使用下列指令來管理 Milvus 容器和儲存的資料。</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Stop Milvus​</span>
$ bash standalone_embed.sh stop​
Stop successfully.​
​
<span class="hljs-comment"># Delete Milvus data​</span>
$ bash standalone_embed.sh stop​
Delete Milvus container successfully.​
Delete successfully.​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Run-Milvus-with-Docker-Compose​" class="common-anchor-header">使用 Docker Compose 執行 Milvus<button data-href="#Run-Milvus-with-Docker-Compose​" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Microsoft Windows 上安裝 Docker Desktop 之後，您就可以從 PowerShell 或 Windows Command Prompt 以<strong>管理員</strong>模式存取 Docker CLI。您可以在 PowerShell、Windows Command Prompt 或 WSL 2 中執行 Docker Compose 來啟動 Milvus。</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">從 PowerShell 或 Windows Command Prompt<button data-href="#From-PowerShell-or-Windows-Command-Prompt​" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p>在管理員模式中開啟 Docker Desktop，方法是按滑鼠右鍵並選擇<strong>以管理員身分執行</strong>。</p></li>
<li><p>在 PowerShell 或 Windows Command Prompt 執行下列指令，為 Milvus Standalone 下載 Docker Compose 配置檔案，並啟動 Milvus。</p>
<pre><code translate="no" class="language-powershell"># Download the configuration file and rename it as docker-compose.yml​
C:\&gt;Invoke-WebRequest https://github.com/milvus-io/milvus/releases/download/v2.6.7/milvus-standalone-docker-compose.yml -OutFile docker-compose.yml​
​
# Start Milvus​
C:\&gt;docker compose up -d​
Creating milvus-etcd  ... done​
Creating milvus-minio ... done​
Creating milvus-standalone ... done​

</code></pre>
<p>視您的網路連線而定，下載 Milvus 安裝的映像可能需要一段時間。命名為<strong>milvus-</strong> <strong>standalone</strong>、<strong>milvus-minio</strong> 和<strong>milvus-etcd</strong>的容器啟動後，您可以看到</p>
<ul>
<li><p><strong>milvus-etcd</strong>容器不向主機暴露任何連接埠，並將其資料映射到目前資料夾中的<strong>volumes/etcd</strong>。</p></li>
<li><p><strong>milvus-minio</strong>容器使用預設的驗證憑證在本機服務連接埠<strong>9090</strong>和<strong>9091</strong>，並將其資料對應到目前資料夾中的<strong>volumes/minio</strong>。</p></li>
<li><p><strong>milvus-standalone</strong>容器使用預設設定在本機服務連接埠<strong>19530</strong>，並將其資料對應到目前資料夾中的<strong>volumes/milvus</strong>。</p></li>
</ul></li>
</ol>
<p>如果您已安裝 WSL 2，也可以呼叫 Linux 版本的 Docker Compose 指令。</p>
<h3 id="From-WSL-2​" class="common-anchor-header">從 WSL 2<button data-href="#From-WSL-2​" class="anchor-icon" translate="no">
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
    </button></h3><p>步驟與在 Linux 系統中使用 Docker Compose 安裝 Milvus 相似。</p>
<ol>
<li><p>啟動 WSL 2。</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

</code></pre></li>
<li><p>下載 Milvus 配置檔案。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v2.6.7/milvus-standalone-docker-compose.yml -O docker-compose.yml​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>啟動 Milvus。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d​</span>
​
Creating milvus-etcd  ... done​
Creating milvus-minio ... done​
Creating milvus-standalone ... done​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="FAQs​" class="common-anchor-header">常見問題<button data-href="#FAQs​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="common-anchor-header">我該如何處理<code translate="no">Docker Engine stopped</code> 錯誤？<button data-href="#How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="anchor-icon" translate="no">
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
    </button></h3><p>當您在 Windows 安裝 Docker Desktop 後，如果您的電腦沒有正確設定，您可能會遇到<code translate="no">Docker Engine stopped</code> 錯誤。在這種情況下，您可能需要進行以下檢查。</p>
<ol>
<li><p>檢查是否已啟用虛擬化。</p>
<p>您可以查看「<strong>任務管理員</strong>」中的「<strong>效能</strong>」索引標籤，檢查虛擬化是否已啟用。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/task-manager.png" alt="Virtualization in Task Manager" class="doc-image" id="virtualization-in-task-manager" />
   </span> <span class="img-wrapper"> <span>工作管理器中的虛擬化</span> </span></p>
<p>如果虛擬化已停用，您可能需要檢查主機板韌體的 BIOS 設定。在 BIOS 設定中啟用虛擬化的方法因主機板廠商而異。以華碩主機板為例，您可以參考<a href="https://www.asus.com/support/faq/1043786/">這篇文章</a>來啟用虛擬化。</p>
<p>然後，您需要重新啟動電腦並啟用 Hyper-V。詳情請參閱這篇<a href="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v#enable-the-hyper-v-role-through-settings">微軟文章</a>。</p></li>
<li><p>檢查 Docker Desktop Service 是否已啟動。</p>
<p>您可以執行下列指令來啟動 Docker Desktop Service。</p>
<pre><code translate="no" class="language-powershell">C:\&gt;net start com.docker.service​
The Docker for Windows Service service is starting.​
The Docker for Windows Service service was started successfully.​

</code></pre></li>
<li><p>檢查是否已正確安裝 WSL。</p>
<p>您可以執行下列指令來安裝或更新 WSL 2 指令。</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --update​
Checking for updates.​
The most recent version of Windows Subsystem for Linux is already installed.​

</code></pre></li>
<li><p>檢查 Docker Daemon 是否已啟動。</p>
<p>您需要到 Docker Desktop 的安裝目錄，執行<code translate="no">.\DockerCli.exe -SwitchDaemon</code> 來啟動 Docker Daemon。</p>
<pre><code translate="no" class="language-powershell">C:\&gt;cd &quot;C:\Program Files\Docker\Docker&quot;​
C:\Program Files\Docker\Docker&gt;.\DockerCli.exe -SwitchDaemon​
Switching to windows engine: Post &quot;http://ipc/engine/switch&quot;: open \\.\pipe\dockerBackendApiServer: The system cannot find the file specified.​

</code></pre></li>
<li><p>檢查是否已以<strong>管理員</strong>模式啟動 Docker Desktop。</p>
<p>確保你已經以管理員模式啟動 Docker Desktop。要這樣做，在<strong>Docker Desktop</strong>上按一下<strong>滑鼠</strong>右鍵，然後選擇<strong>以管理員模式執行</strong>。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/docker-desktop.png" alt="Start Docker Desktop as Administrator" class="doc-image" id="start-docker-desktop-as-administrator" />
   </span> <span class="img-wrapper"> <span>以管理員模式啟動 Docker Desktop</span> </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="common-anchor-header">在部署 Milvus 時，我該如何處理 WSL 相關的問題？<button data-href="#How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="anchor-icon" translate="no">
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
    </button></h3><p>如果您在從 WSL 2 執行 Milvus 時遇到 WSL 相關的問題，您可能需要檢查是否已將 Docker Desktop 設定為使用基於 WSL 2 的引擎，如下所示。</p>
<ol>
<li><p>確保在<strong>設定</strong>&gt;<strong>一般</strong>中勾選「使用 WSL 2-based engine」。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" />
   </span> <span class="img-wrapper"> <span>在 Docker Desktop 設定中使用基於 WSL 2 的引擎</span> </span></p></li>
<li><p>從已安裝的 WSL 2 發行版本中選擇要啟用 Docker 整合的版本，前往<strong>設定</strong>&gt;<strong>資源</strong>&gt;<strong>WSL 整合</strong>。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" />
   </span> <span class="img-wrapper"> <span>在 Docker Desktop 設定中選擇 WSL 2 發行版本</span> </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="common-anchor-header">我該如何處理在 Milvus 啟動時，讀取<code translate="no">Read config failed</code> 時提示的磁碟區相關錯誤？<button data-href="#How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="anchor-icon" translate="no">
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
    </button></h3><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" />
   </span> <span class="img-wrapper"> <span>在 Milvus 啟動時出現讀取設定失敗的錯誤提示</span> </span></p>
<p>要處理 Milvus 啟動時提示「讀取設定失敗」的錯誤，您需要檢查掛載到 Milvus 容器的磁碟區是否正確。如果磁碟區正確掛載到容器中，您可以使用<code translate="no">docker exec</code> 指令進入容器，並列出<strong>/milvus/configs</strong>資料夾，如下所示。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" />
   </span> <span class="img-wrapper"> <span>列出 Milvus 配置文件</span> </span></p>
<p></p>
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
<li><p>查看<a href="/docs/zh-hant/quickstart.md">Quickstart</a>來了解 Milvus 的功能。</p></li>
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
<li><p><a href="/docs/zh-hant/scaleout.md">擴充你的 Milvus 集群</a>。</p></li>
<li><p>在雲上部署您的 Milvu 集群：</p>
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
