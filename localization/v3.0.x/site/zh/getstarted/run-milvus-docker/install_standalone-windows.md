---
id: install_standalone-windows.md
label: Docker
related_key: Docker
summary: 了解如何使用 Docker Desktop for Windows 安装 Milvus Standalone。
title: 在 Docker 中运行 Milvus（Windows）
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
    </button></h1><blockquote>
<p>默认情况下，此部署将<strong>Woodpecker</strong>（本地文件系统）用作消息队列，因此无需外部消息队列服务。请参阅<a href="/docs/zh/woodpecker.md">Woodpecker</a>。</p>
</blockquote>
<p>本页面演示了如何在 Windows 上使用 Docker Desktop（基于 WSL 2 后端和 Linux 容器）运行 Milvus。</p>
<h2 id="Prerequisites" class="common-anchor-header">先决条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li><a href="https://docs.docker.com/desktop/setup/install/windows-install/">安装 Docker Desktop</a>并满足其 Windows 及硬件要求。</li>
<li><a href="https://learn.microsoft.com/en-us/windows/wsl/install#install-wsl-command">安装 Windows 子系统 for Linux 2（WSL 2）</a>。</li>
<li>启动 Docker Desktop，启用<strong>“使用基于 WSL 2 的引擎</strong>”，并选择“Linux 容器”。若要在 WSL 发行版内运行命令，还需在<strong>“设置”</strong>&gt;<strong>“资源</strong>”&gt;<strong>“WSL 集成</strong>”下启用该发行版。请参阅<a href="https://docs.docker.com/desktop/features/wsl/">Docker Desktop WSL 2 后端</a>。</li>
</ul>
<p>在下载 Milvus 文件之前，请在 PowerShell 或 Windows 命令提示符中运行以下检查：</p>
<pre><code translate="no" class="language-powershell">wsl --version
docker info --format &quot;{{.OSType}}&quot;
docker compose version
</code></pre>
<p>Docker 操作系统类型必须为“<code translate="no">linux</code> ”。Compose 示例使用<code translate="no">docker compose</code> 插件（V2 或更高版本），而非旧版<code translate="no">docker-compose</code> V1 命令。</p>
<h2 id="Run-Milvus-in-Docker" class="common-anchor-header">在 Docker 中运行 Milvus<button data-href="#Run-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>请选择以下任一终端。请在可写入的工作目录中运行命令；脚本会将配置文件和<code translate="no">volumes</code> 目录存储在此处。</p>
<p>该脚本从 Milvus 的<code translate="no">master</code> 分支下载而来。其 Docker 镜像标签在脚本中已定义，可能与 v3.0.5 不同。若要部署该确切版本，请使用下方的带版本号的 Docker Compose 配置。</p>
<h3 id="From-PowerShell" class="common-anchor-header">在 PowerShell 中<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>下载脚本，然后启动 Milvus：</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -OutFile standalone.bat
.\standalone.bat start
</code></pre>
<p>PowerShell 需要使用<code translate="no">.\</code> 前缀才能从工作目录运行脚本。</p>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">通过 Windows 命令提示符<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p>使用 `<code translate="no">curl.exe</code> ` 下载脚本；`<code translate="no">Invoke-WebRequest</code> ` 是 PowerShell 命令，无法在命令提示符中运行：</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.bat&quot; -o standalone.bat
standalone.bat start
</code></pre>
<p>执行上述任一 Windows 命令序列后：</p>
<ul>
<li>一个名为<strong>Milvus Standalone</strong>的 Docker 容器将监听<strong>19530</strong> 端口。</li>
<li>嵌入式 etcd 在同一容器中通过<strong>2379</strong> 端口运行。其配置文件对应于工作目录中的<strong>embedEtcd.yaml</strong>。</li>
<li>Milvus 将数据存储在工作目录下的<strong>volumes/milvus</strong>中。</li>
<li>配置覆盖项应写入工作目录中的<strong>user.yaml</strong>文件。修改后请重启容器。</li>
</ul>
<p>可在任意终端中检查镜像和容器状态：</p>
<pre><code translate="no" class="language-powershell">docker inspect --format &quot;{{.Config.Image}}&quot; milvus-standalone
docker ps --filter name=milvus-standalone
</code></pre>
<p>若要通过 PowerShell 停止 Milvus，请运行 `<code translate="no">.\standalone.bat stop</code>`；若要通过命令提示符停止，请运行 `<code translate="no">standalone.bat stop</code>`。`<code translate="no">delete</code> ` 命令将同时删除容器及其存储的数据。使用前请备份数据。</p>
<h3 id="From-WSL-2" class="common-anchor-header">通过 WSL 2<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>在 Windows 终端中打开已安装的 WSL 发行版：</p>
<pre><code translate="no" class="language-powershell">wsl
</code></pre>
<p>在 WSL 终端中，下载 Linux 脚本并启动一次 Milvus：</p>
<pre><code translate="no" class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh
bash standalone_embed.sh start
<button class="copy-code-btn"></button></code></pre>
<p>要停止 Milvus，请运行<code translate="no">bash standalone_embed.sh stop</code> 。<code translate="no">bash standalone_embed.sh delete</code> 命令将删除容器、配置和数据；使用前请备份数据。</p>
<h2 id="Run-Milvus-with-Docker-Compose" class="common-anchor-header">使用 Docker Compose 运行 Milvus<button data-href="#Run-Milvus-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h2><p>使用 v3.0.5 版本附带的配置。仅运行适用于您终端的命令序列。</p>
<h3 id="From-PowerShell" class="common-anchor-header">在 PowerShell 中<button data-href="#From-PowerShell" class="anchor-icon" translate="no">
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
    </button></h3><p>下载配置文件并启动 Milvus：</p>
<pre><code translate="no" class="language-powershell">Invoke-WebRequest -Uri &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml&quot; -OutFile docker-compose.yml
docker compose up -d
docker compose ps
</code></pre>
<h3 id="From-Windows-Command-Prompt" class="common-anchor-header">在 Windows 命令提示符下<button data-href="#From-Windows-Command-Prompt" class="anchor-icon" translate="no">
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
    </button></h3><p>下载配置文件并启动 Milvus：</p>
<pre><code translate="no" class="language-bat">curl.exe -fL &quot;https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml&quot; -o docker-compose.yml
docker compose up -d
docker compose ps
</code></pre>
<h3 id="From-WSL-2" class="common-anchor-header">在 WSL 2 中<button data-href="#From-WSL-2" class="anchor-icon" translate="no">
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
    </button></h3><p>打开您的 WSL 发行版，然后运行以下 Linux 命令：</p>
<pre><code translate="no" class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose.yaml -O docker-compose.yml
docker compose up -d
docker compose ps
<button class="copy-code-btn"></button></code></pre>
<p>该配置将启动三个长期运行的容器：<strong>milvus-standalone</strong>、<strong>milvus-minio</strong> 和<strong>milvus-etcd</strong>。它还会运行一次性的<code translate="no">milvus-volume-init</code> 服务，以准备数据目录的所有权。这些数据分别映射到工作目录中的<strong>volumes/milvus</strong>、<strong>volumes/minio</strong> 和<strong>volumes/etcd</strong>。 MinIO 公开端口<strong>9000</strong>和<strong>9001</strong>；Milvus 公开端口<strong>19530</strong>和<strong>9091</strong>。有关配置和生命周期命令，请参阅《<a href="/docs/zh/install_standalone-docker-compose.md">使用 Docker Compose 运行 Milvus</a>》。</p>
<h2 id="FAQs" class="common-anchor-header">常见问题<button data-href="#FAQs" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-can-I-deal-with-the-Docker-Engine-stopped-error" class="common-anchor-header">如何处理“<code translate="no">Docker Engine stopped</code> ”错误？<button data-href="#How-can-I-deal-with-the-Docker-Engine-stopped-error" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 使用 Linux 容器。在重试安装之前，请检查 Docker Desktop 及其 WSL 2 后端：</p>
<ol>
<li><p>如果<strong>“任务管理器”</strong>&gt;<strong>“性能”</strong>显示硬件虚拟化已禁用，请在 BIOS/UEFI 中启用该功能。请参阅<a href="https://docs.docker.com/desktop/setup/install/windows-install/#system-requirements">Docker Desktop</a> 的<a href="https://docs.docker.com/desktop/setup/install/windows-install/#system-requirements">Windows 系统要求</a>。</p></li>
<li><p>从 Windows “开始” 菜单启动 Docker Desktop，并等待其引擎运行。安装或更新 WSL，或使用特定的 Docker Desktop 安装模式时，可能需要管理员权限；但使用 WSL 2 后端运行 Linux 容器通常不需要管理员权限。</p></li>
<li><p>通过 Windows 终端检查 WSL。如果需要更新，请按照 Windows 要求的权限运行更新命令：</p>
<pre><code translate="no" class="language-powershell">wsl --version
wsl --update
</code></pre></li>
<li><p>在 Docker Desktop<strong>中启用“使用基于 WSL 2 的引擎”</strong>。如果 Docker 菜单中提供了<strong>“切换到 Linux 容器”选项</strong>，请选择该选项。请勿切换到 Windows 容器来排查 Milvus Linux 镜像的问题。</p></li>
<li><p>在用于安装的终端中运行以下检查命令：</p>
<pre><code translate="no" class="language-powershell">docker info --format &quot;{{.OSType}}&quot;
</code></pre>
<p>该命令必须返回<code translate="no">linux</code> 。如果无法连接到守护进程，请按照<a href="https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/">Docker Desktop 故障排除指南操作</a>，然后再重新运行 Milvus 脚本。仅启动<code translate="no">com.docker.service</code> 并不能证明 WSL 2 Linux 引擎正在运行。</p></li>
</ol>
<h3 id="How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="common-anchor-header">在部署 Milvus 时，如何处理与 WSL 相关的问题？<button data-href="#How-can-I-deal-with-WSL-related-issues-while-deploying-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>如果您在 WSL 2 上运行 Milvus 时遇到了与 WSL 相关的问题，可能需要检查是否已按以下步骤将 Docker Desktop 配置为使用基于 WSL 2 的引擎：</p>
<ol>
<li><p>请确保在<strong>“设置”</strong>&gt;<strong>“常规”中</strong>勾选了“使用基于 WSL 2 的引擎”。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-01.png" alt="Use the WSL 2 based engine in Docker Desktop Settings" class="doc-image" id="use-the-wsl-2-based-engine-in-docker-desktop-settings" /> 
   <span>在 Docker Desktop 设置中使用基于 WSL 2 的引擎</span>
  
 </span></p></li>
<li><p>前往<strong>“设置</strong>&gt;<strong>资源</strong>&gt;<strong>WSL 集成</strong>”，从已安装的 WSL 2 发行版中选择您希望启用 Docker 集成的发行版。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/docker-desktop-wsl-02.png" alt="Select WSL 2 distributions in Docker Desktop Settings" class="doc-image" id="select-wsl-2-distributions-in-docker-desktop-settings" /> 
   <span>在 Docker Desktop 设置中选择 WSL 2 发行版</span>
  
 </span></p></li>
</ol>
<h3 id="How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="common-anchor-header">如何处理 Milvus 启动时出现的与卷相关的错误提示“<code translate="no">Read config failed</code> ”？<button data-href="#How-can-I-deal-with-the-volume-related-errors-prompted-during-Milvus-startup-that-reads-Read-config-failed" class="anchor-icon" translate="no">
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
   <span>Milvus 启动时出现的“读取配置失败”错误提示</span>
  
 </span></p>
<p>要解决 Milvus 启动时出现的“读取配置失败”错误，您需要检查挂载到 Milvus 容器中的卷是否正确。如果卷已正确挂载到容器中，您可以使用<code translate="no">docker exec</code> 命令进入容器，并按以下方式列出<strong>/milvus/configs</strong>文件夹：</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus-read-config-fails-02.png" alt="List Milvus config files" class="doc-image" id="list-milvus-config-files" /> 
   <span>列出 Milvus 配置文件</span>
  
 </span></p>
<div class="alert note">
<p>Storage V3 默认处于禁用状态。在使用依赖于它的功能之前，请先启用它。有关要求和兼容性考虑，请参阅<a href="/docs/zh/storage-v3.md">Storage V3</a>。</p>
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
    </button></h2><p>在 Docker 中安装 Milvus 后，请按照<a href="/docs/zh/quickstart.md">《快速入门》</a> <strong>中的“使用现有 Milvus 服务器”路径</strong>操作，并将 SDK 连接到<code translate="no">http://localhost:19530</code> 。此服务器路径不需要 Milvus Lite；本地<code translate="no">.db</code> 连接块将启动一个独立的本地数据库，而不是使用此容器。</p>
<p>您还可以：</p>
<ul>
<li><p>查阅<a href="/docs/zh/quickstart.md">《快速入门》</a>了解 Milvus 的功能。</p></li>
<li><p>了解 Milvus 的基本操作：</p>
<ul>
<li><a href="/docs/zh/manage_databases.md">管理数据库</a></li>
<li><a href="/docs/zh/manage-collections.md">管理 Collections</a></li>
<li><a href="/docs/zh/manage-partitions.md">管理分区</a></li>
<li><a href="/docs/zh/insert-update-delete.md">插入、Upsert 和删除</a></li>
<li><a href="/docs/zh/single-vector-search.md">单向量搜索</a></li>
<li><a href="/docs/zh/multi-vector-search.md">混合搜索</a></li>
</ul></li>
<li><p>对于 Compose 部署，请参阅《<a href="/docs/zh/upgrade_milvus_standalone-docker.md">使用 Docker Compose 升级 Milvus Standalone</a>》；升级前请在您的环境中验证该操作流程。</p></li>
<li><p><a href="/docs/zh/scaleout.md">扩展您的 Milvus 集群</a>。</p></li>
<li><p>在云平台上部署您的 Milvus 集群：</p>
<ul>
<li><a href="/docs/zh/eks.md">Amazon EKS</a></li>
<li><a href="/docs/zh/gcp.md">Google Cloud</a></li>
<li><a href="/docs/zh/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>探索<a href="/docs/zh/milvus-webui.md">Milvus WebUI</a>——一个用于 Milvus 可观测性和管理的直观 Web 界面。</p></li>
<li><p>探索<a href="/docs/zh/milvus_backup_overview.md">Milvus Backup</a>，一款用于 Milvus 数据备份的开源工具。</p></li>
<li><p>了解<a href="/docs/zh/birdwatcher_overview.md">Birdwatcher</a>——一款用于调试 Milvus 并进行动态配置更新的开源工具。</p></li>
<li><p>探索<a href="https://github.com/zilliztech/attu">Attu</a>——一款用于直观管理 Milvus 的开源图形用户界面工具。</p></li>
<li><p><a href="/docs/zh/monitor.md">使用 Prometheus 监控 Milvus</a>。</p></li>
</ul>
