---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: 了解如何使用 Windows 版 Docker Desktop 独立安装 Milvus。
title: 在 Docker（Linux）中运行 Milvus
---
<h1 id="Run-Milvus-in-Docker-Windows" class="common-anchor-header">在 Docker 中运行 Milvus（Windows）<button data-href="#Run-Milvus-in-Docker-Windows" class="anchor-icon" translate="no">
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
    </button></h1><p>本页演示如何使用 Docker Desktop for Windows 在 Windows 上运行 Milvus。</p>
<h2 id="Prerequisites​" class="common-anchor-header">前提条件<button data-href="#Prerequisites​" class="anchor-icon" translate="no">
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
<li><p><a href="https://docs.docker.com/desktop/setup/install/windows-install/">安装 Docker Desktop</a>。</p></li>
<li><p><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">安装 Windows Subsystem for Linux 2 (WSL 2)</a>。</p></li>
<li><p>安装 Python 3.8+。</p></li>
</ul>
<h2 id="Run-Milvus-in-Docker​" class="common-anchor-header">在 Docker 中运行 Milvus<button data-href="#Run-Milvus-in-Docker​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 提供了一个安装脚本，可将其安装为 Docker 容器。在 Microsoft Windows 上安装 Docker Desktop 后，就可以在<strong>管理员</strong>模式下通过 PowerShell 或 Windows Command Prompt 以及 WSL 2 访问 Docker CLI。</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">从 PowerShell 或 Windows 命令提示符</h3><p>如果你更熟悉 PowerShell 或 Windows Command Prompt，命令提示符如下。</p>
<ol>
<li><p>在管理员模式下右击并选择以<strong>管理员身份运行</strong>，打开 Docker Desktop。</p></li>
<li><p>下载安装脚本并将其保存为<code translate="no">standalone.bat</code> 。</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-attr">C</span>:\&gt;<span class="hljs-title class_">Invoke</span>-<span class="hljs-title class_">WebRequest</span> <span class="hljs-attr">https</span>:<span class="hljs-comment">//github.com/milvus-io/milvus/blob/master/scripts/standalone_embed.bat -OutFile standalone.bat​</span>

<button class="copy-code-btn"></button></code></pre></li>
<li><p>运行下载的脚本，将 Milvus 作为 Docker 容器启动。</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-attr">C</span>:\&gt;standalone.<span class="hljs-property">bat</span> start​
<span class="hljs-title class_">Wait</span> <span class="hljs-keyword">for</span> <span class="hljs-title class_">Milvus</span> starting...​
<span class="hljs-title class_">Start</span> successfully.​
<span class="hljs-title class_">To</span> change the <span class="hljs-keyword">default</span> <span class="hljs-title class_">Milvus</span> configuration, edit user.<span class="hljs-property">yaml</span> and restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>运行安装脚本后</p>
<ul>
<li><p>名为<strong>Milvus-standalone</strong>的 docker 容器已在<strong>19530</strong> 端口启动。</p></li>
<li><p>嵌入式 etcd 与 Milvus 安装在同一个容器中，服务端口为<strong>2379</strong>。其配置文件被映射到当前文件夹中的<strong>embedEtcd.yaml</strong>。</p></li>
<li><p>Milvus 数据卷被映射到当前文件夹中的<strong>volumes/milvus</strong>。</p></li>
</ul>
<p>可以使用以下命令管理 Milvus 容器和存储的数据。</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-comment"># Stop Milvus​</span>
C:\&gt;standalone.bat stop​
Stop successfully.​
​
<span class="hljs-comment"># Delete Milvus container​</span>
C:\&gt;standalone.bat delete​
Delete Milvus container successfully. <span class="hljs-comment"># Container has been removed.​</span>
Delete successfully. <span class="hljs-comment"># Data has been removed.​</span>

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="From-WSL-2​" class="common-anchor-header">从 WSL 2</h3><p>如果喜欢在 Windows 上使用 Linux 命令和 shell 脚本启动 Milvus，请确保已经安装了 WSL 2 命令。有关如何安装 WSL 2 命令的详细信息，请参阅这篇<a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">微软文章</a>。</p>
<ol>
<li><p>启动 WSL 2。</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>下载安装脚本</p>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Download the installation script​</span>
$ curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh​
​
<span class="hljs-comment"># Start the Docker container​</span>
$ bash standalone_embed.sh start​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>将 Milvus 作为 docker 容器启动。</p>
<pre><code translate="no" class="language-bash">$ bash standalone_embed.sh start​
Wait <span class="hljs-keyword">for</span> Milvus Starting...​
Start successfully.​
To change the <span class="hljs-literal">default</span> Milvus configuration, <span class="hljs-keyword">add</span> your settings to the user.yaml file <span class="hljs-keyword">and</span> then restart the service.​

<button class="copy-code-btn"></button></code></pre>
<p>你可以使用以下命令来管理 Milvus 容器和存储的数据。</p>
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
<h2 id="Run-Milvus-with-Docker-Compose​" class="common-anchor-header">使用 Docker Compose 运行 Milvus<button data-href="#Run-Milvus-with-Docker-Compose​" class="anchor-icon" translate="no">
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
    </button></h2><p>在 Microsoft Windows 上安装 Docker Desktop 后，就可以在<strong>管理员</strong>模式下通过 PowerShell 或 Windows 命令提示符访问 Docker CLI。你可以在 PowerShell、Windows Command Prompt 或 WSL 2 中运行 Docker Compose 来启动 Milvus。</p>
<h3 id="From-PowerShell-or-Windows-Command-Prompt​" class="common-anchor-header">从 PowerShell 或 Windows 命令提示符</h3><ol>
<li><p>在管理员模式下右击并选择<strong>以管理员身份运行</strong>，打开 Docker Desktop。</p></li>
<li><p>在 PowerShell 或 Windows Command Prompt 中运行以下命令，为 Milvus Standalone 下载 Docker Compose 配置文件并启动 Milvus。</p>
<pre><code translate="no" class="language-powershell"><span class="hljs-comment"># Download the configuration file and rename it as docker-compose.yml​</span>
C:\&gt;Invoke-WebRequest https://github.com/milvus-io/milvus/releases/download/v2.4.15/milvus-standalone-docker-compose.yml -OutFile docker-compose.yml​
​
<span class="hljs-comment"># Start Milvus​</span>
C:\&gt;docker compose up -d​
Creating milvus-etcd  ... <span class="hljs-keyword">done</span>​
Creating milvus-minio ... <span class="hljs-keyword">done</span>​
Creating milvus-standalone ... <span class="hljs-keyword">done</span>​

<button class="copy-code-btn"></button></code></pre>
<p>根据网络连接情况，下载用于安装 Milvus 的映像可能需要一段时间。名为<strong>milvus-</strong> <strong>standalone</strong>、<strong>milvus-minio</strong> 和<strong>milvus-etcd</strong>的容器启动后，你可以看到</p>
<ul>
<li><p><strong>milvus-etcd</strong>容器不向主机暴露任何端口，并将其数据映射到当前文件夹中的<strong>volumes/etcd</strong>。</p></li>
<li><p><strong>milvus-minio</strong>容器使用默认身份验证凭据在本地为端口<strong>9090</strong>和<strong>9091</strong>提供服务，并将其数据映射到当前文件夹中的<strong>volumes/minio</strong>。</p></li>
<li><p><strong>milvus-standalone</strong>容器使用默认设置为本地<strong>19530</strong>端口提供服务，并将其数据映射到当前文件夹中的<strong>volumes/milvus</strong>。</p></li>
</ul></li>
</ol>
<p>如果安装了 WSL 2，还可以调用 Linux 版本的 Docker Compose 命令。</p>
<h3 id="From-WSL-2​" class="common-anchor-header">从 WSL 2</h3><p>该步骤与在 Linux 系统中使用 Docker Compose 安装 Milvus 相似。</p>
<ol>
<li><p>启动 WSL 2。</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --install​
Ubuntu already installed.​
Starting Ubuntu...​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>下载 Milvus 配置文件。</p>
<pre><code translate="no" class="language-shell">$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.17/milvus-standalone-docker-compose.yml -O docker-compose.yml​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>启动 Milvus。</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker compose up -d​
​
Creating milvus-etcd  ... <span class="hljs-keyword">done</span>​
Creating milvus-minio ... <span class="hljs-keyword">done</span>​
Creating milvus-standalone ... <span class="hljs-keyword">done</span>​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="FAQs​" class="common-anchor-header">常见问题<button data-href="#FAQs​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error​" class="common-anchor-header">如何处理<code translate="no">Docker Engine stopped</code> 错误？</h3><p>在 Windows 中安装 Docker Desktop 后，如果计算机配置不当，可能会遇到<code translate="no">Docker Engine stopped</code> 错误。在这种情况下，你可能需要进行以下检查。</p>
<ol>
<li><p>检查是否启用了虚拟化。</p>
<p>你可以查看<strong>任务管理器</strong>中的 "<strong>性能</strong>"选项卡，检查是否启用了虚拟化。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/task-manager.png" alt="Virtualization in Task Manager" class="doc-image" id="virtualization-in-task-manager" />
   </span> <span class="img-wrapper"> <span>任务管理器中的虚拟化</span> </span></p>
<p>如果虚拟化被禁用，则可能需要检查主板固件的 BIOS 设置。在 BIOS 设置中启用虚拟化的方法因主板供应商而异。以华硕主板为例，你可以参考<a href="https://www.asus.com/support/faq/1043786/">这篇文章</a>来启用虚拟化。</p>
<p>然后，你需要重启电脑并启用 Hyper-V。有关详情，请参阅这篇<a href="https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v#enable-the-hyper-v-role-through-settings">微软文章</a>。</p></li>
<li><p>检查 Docker Desktop 服务是否已启动。</p>
<p>你可以运行以下命令来启动 Docker Desktop 服务。</p>
<pre><code translate="no" class="language-powershell">C:\&gt;net start com.docker.service​
The Docker <span class="hljs-keyword">for</span> Windows Service service <span class="hljs-keyword">is</span> starting.​
The Docker <span class="hljs-keyword">for</span> Windows Service service was started successfully.​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>检查 WSL 是否已正确安装。</p>
<p>你可以运行以下命令来安装或更新 WSL 2 命令。</p>
<pre><code translate="no" class="language-powershell">C:\&gt;wsl --update​
Checking <span class="hljs-keyword">for</span> updates.​
The most recent version of Windows Subsystem <span class="hljs-keyword">for</span> Linux <span class="hljs-keyword">is</span> already installed.​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>检查 Docker 守护进程是否已启动。</p>
<p>你需要进入 Docker Desktop 的安装目录并运行<code translate="no">.\DockerCli.exe -SwitchDaemon</code> 来启动 Docker 守护进程。</p>
<pre><code translate="no" class="language-powershell">C:\&gt;cd <span class="hljs-string">&quot;C:\Program Files\Docker\Docker&quot;</span>​
C:\Program Files\Docker\Docker&gt;.\DockerCli.exe -SwitchDaemon​
Switching to windows engine: Post <span class="hljs-string">&quot;http://ipc/engine/switch&quot;</span>: <span class="hljs-built_in">open</span> \\.\pipe\dockerBackendApiServer: The system cannot find the file specified.​

<button class="copy-code-btn"></button></code></pre></li>
<li><p>检查是否以<strong>管理员</strong>模式启动了 Docker Desktop。</p>
<p>确保已在管理员模式下启动 Docker Desktop。为此，右键单击<strong>Docker Desktop</strong>并选择<strong>以管理员身份运行</strong>。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/docker-desktop.png" alt="Start Docker Desktop as Administrator" class="doc-image" id="start-docker-desktop-as-administrator" />
   </span> <span class="img-wrapper"> <span>以管理员身份启动 Docker Desktop</span> </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus​" class="common-anchor-header">在部署 Milvus 时，如何处理与 WSL 相关的问题？</h3><p>如果你在从 WSL 2 运行 Milvus 时遇到 WSL 相关问题，你可能需要检查是否已将 Docker Desktop 配置为使用基于 WSL 2 的引擎，方法如下。</p>
<ol>
<li><p>确保在 "<strong>设置</strong>"&gt;"<strong>常规</strong>"中勾选了 "使用基于 WSL 2 的引擎"。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" />
   </span> <span class="img-wrapper"> <span>在 Docker Desktop 设置中使用基于 WSL 2 的引擎</span> </span></p></li>
<li><p>从已安装的 WSL 2 发行版中选择要启用 Docker 集成的发行版：<strong>设置</strong>&gt;<strong>资源</strong>&gt;<strong>WSL 集成</strong>。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" />
   </span> <span class="img-wrapper"> <span>在 Docker 桌面设置中选择 WSL 2 发行版</span> </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed​" class="common-anchor-header">如何处理 Milvus 启动过程中读取<code translate="no">Read config failed</code> 时提示的卷相关错误？</h3><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-read-config-fails-01.png" alt="Read config failed error prompt in Milvus startup" class="doc-image" id="read-config-failed-error-prompt-in-milvus-startup" />
   </span> <span class="img-wrapper"> <span>Milvus 启动过程中读取配置失败的错误提示</span> </span></p>
<p>要处理 Milvus 启动过程中提示 "读取配置失败 "的错误，你需要检查挂载到 Milvus 容器中的卷是否正确。如果卷已正确挂载到容器中，你可以使用<code translate="no">docker exec</code> 命令进入容器并列出<strong>/milvus/configs</strong>文件夹，如下所示。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" />
   </span> <span class="img-wrapper"> <span>列出 Milvus 配置文件</span> </span></p>
<p></p>
