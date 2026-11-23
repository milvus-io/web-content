---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Docker Compose
summary: 了解如何使用 Docker Compose 安装支持 GPU 的 Milvus Standalone。
title: 使用 Docker Compose 运行支持 GPU 的 Milvus
---
<h1 id="Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="common-anchor-header">使用 Docker Compose 运行支持 GPU 的 Milvus<button data-href="#Run-Milvus-with-GPU-Support-Using-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>本页面演示了如何使用 Docker Compose 启动一个支持 GPU 的 Milvus 实例。</p>
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
<li><a href="https://docs.docker.com/get-docker/">安装 Docker</a>。</li>
<li>安装前<a href="/docs/zh/prerequisite-gpu.md">请检查硬件和软件要求</a>。</li>
</ul>
<div class="alert note">
<p>若在拉取镜像时遇到任何问题，请将问题详情发送至<a href="mailto:community@zilliz.com">community@zilliz.com</a>联系我们，我们将为您提供必要的支持。</p>
</div>
<h2 id="Install-Milvus" class="common-anchor-header">安装 Milvus<button data-href="#Install-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>若要使用 Docker Compose 安装支持 GPU 的 Milvus，请按照以下步骤操作。</p>
<h3 id="1-Download-and-configure-the-YAML-file" class="common-anchor-header">1. 下载并配置 YAML 文件<button data-href="#1-Download-and-configure-the-YAML-file" class="anchor-icon" translate="no">
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
    </button></h3><p>下载 <a href="https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml"><code translate="no">milvus-standalone-docker-compose-gpu.yaml</code></a> 并将其手动保存为 docker-compose.yml，或使用以下命令进行操作。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v3.0.5/milvus-standalone-docker-compose-gpu.yaml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>要验证下载是否成功，请将以下命令的输出结果与<a href="https://github.com/milvus-io/milvus/releases/tag/v3.0.5">发布页面</a>上<code translate="no">milvus-standalone-docker-compose-gpu.yaml</code> 列出的<code translate="no">sha256</code> 摘要进行比对：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sha256sum</span> docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>您可以在 YAML 文件中<code translate="no">standalone</code> 服务的<code translate="no">deploy</code> 部分，按以下方式更改分配给 Milvus 的 GPU 设备：</p>
<ul>
<li>若要将特定的 GPU 设备分配给 Milvus，请在<code translate="no">standalone</code> 服务的定义中找到<code translate="no">deploy.resources.reservations.devices[0].device_ids</code> 字段，并将该字段的值替换为所需 GPU 的 ID。您可以使用 NVIDIA GPU 显示驱动程序中附带的<code translate="no">nvidia-smi</code> 工具来确定 GPU 设备的 ID。Milvus 支持多个 GPU 设备。</li>
</ul>
<p>将单个 GPU 设备分配给 Milvus：</p>
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
<p>将多个 GPU 设备分配给 Milvus：</p>
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
<h3 id="2-Start-Milvus" class="common-anchor-header">2. 启动 Milvus<button data-href="#2-Start-Milvus" class="anchor-icon" translate="no">
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
    </button></h3><p>在存放 docker-compose.yml 的目录中，运行以下命令启动 Milvus：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果无法运行上述命令，请检查您的系统是否安装了 Docker Compose V1。如果是这种情况，建议您根据<a href="https://docs.docker.com/compose/">本页</a>的说明迁移到 Docker Compose V2。</p>
</div>
<p>Milvus 启动后，</p>
<ul>
<li>名为<strong>Milvus Standalone</strong>、<strong>milvus-minio</strong> 和<strong>milvus-etcd</strong>的容器已启动。
<ul>
<li><strong>milvus-etcd</strong>容器未向主机暴露任何端口，并将数据映射到当前文件夹中的<strong>volumes/etcd</strong>。</li>
<li><strong>milvus-minio</strong>容器使用默认身份验证凭据提供<strong>9000</strong>和<strong>9001</strong>端口服务，并将数据映射到当前文件夹中的<strong>volumes/minio</strong>。</li>
<li><strong>Milvus Standalone</strong>容器使用默认设置提供<strong>19530</strong>和<strong>9091</strong>端口服务，并将数据映射到当前目录下的<strong>volumes/milvus</strong>卷中。</li>
</ul></li>
</ul>
<p><code translate="no">standalone</code> 服务将<code translate="no">security_opt: seccomp:unconfined</code> 设置为true，因此Milvus容器在运行时不使用默认的Docker seccomp配置文件。</p>
<div class="alert warning">
<blockquote>
<p>Compose 文件在发布这些端口时未指定主机 IP，因此 Docker 会将其绑定到主机的所有网络接口，而能够访问该主机的其他机器均可连接到 Milvus 和 MinIO。MinIO 使用在 Compose 文件中设置的访问密钥和密钥<code translate="no">minioadmin</code> 。 若仅需将端口发布到回环地址，请在<code translate="no">docker-compose.yml</code> 中的<code translate="no">minio</code> 和<code translate="no">standalone</code> 服务的<code translate="no">ports</code> 条目中添加<code translate="no">127.0.0.1:</code> （例如<code translate="no">&quot;127.0.0.1:19530:19530&quot;</code> ），然后再次运行<code translate="no">sudo docker compose up -d</code> 。 有关详细信息，请参阅<a href="https://docs.docker.com/engine/network/port-publishing/">“端口发布与映射”</a>。若要使用其他 MinIO 凭据，请修改<code translate="no">minio</code> 服务中的<code translate="no">MINIO_ACCESS_KEY</code> 和<code translate="no">MINIO_SECRET_KEY</code> ，并在 Milvus 配置的<code translate="no">minio.accessKeyID</code> 和<code translate="no">minio.secretAccessKey</code> 中设置相同的值。若要要求客户端连接 Milvus 时提供用户名和密码，请参阅<a href="/docs/zh/authenticate.md">“验证用户访问”</a>。</p>
</blockquote>
</div>
<p>您可以使用以下命令检查容器是否已启动并正在运行：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>
<button class="copy-code-btn"></button></code></pre>
<p>默认情况下，该命令仅列出正在运行的容器。请确认输出中列出了<strong>milvus-etcd</strong>、<strong>milvus-minio</strong> 和<strong>milvus-standalone</strong>容器，且每个容器的<code translate="no">STATUS</code> 列均以<code translate="no">Up</code> 开头。</p>
<p>您还可以访问<code translate="no">http://127.0.0.1:9091/webui/</code> 进入 Milvus WebUI，以了解有关您的 Milvus 实例的更多信息。有关详细信息，请参阅<a href="/docs/zh/milvus-webui.md">Milvus WebUI</a>。</p>
<p>若要在 Milvus 启动后更改其使用的 GPU 设备，请按照步骤 1 所示，编辑 docker-compose.yml 文件中<code translate="no">standalone</code> 服务下<code translate="no">deploy.resources.reservations.devices</code> 下的<code translate="no">device_ids</code> 字段，然后运行以下命令。由于服务配置已发生变化，<code translate="no">docker compose up</code> 将停止并重新创建<strong>milvus-standalone</strong>容器。 有关详细信息，请参阅《<a href="https://docs.docker.com/compose/how-tos/gpu-support/">运行具有 GPU 访问权限的 Docker Compose 服务</a>》。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre>
<p>您可以按以下方式停止并删除此容器。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Configure-memory-pool" class="common-anchor-header">配置内存池<button data-href="#Configure-memory-pool" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 启动并运行后，您可以通过修改 Milvus 配置中<code translate="no">gpu</code> 部分的<code translate="no">initMemSize</code> 和<code translate="no">maxMemSize</code> 设置来自定义内存池。</p>
<div class="alert note">
<p><code translate="no">milvus.yaml</code> 文件位于Milvus容器内的<code translate="no">/milvus/configs/</code> 目录中。同一目录下<code translate="no">user.yaml</code> 文件中的设置将覆盖<code translate="no">milvus.yaml</code> 中的值。</p>
</div>
<p>若要在重新创建容器时保留您的设置，请将它们存储在主机上的<code translate="no">user.yaml</code> 文件中，并按以下方式将该文件挂载到容器中。</p>
<ol>
<li><p>在存放 docker-compose.yml 的目录中，创建一个名为<code translate="no">user.yaml</code> 的文件，并写入您需要修改的设置。以下示例展示了<code translate="no">gpu</code> 部分及其默认值。请根据需要替换为相应的大小：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: 内存池的初始大小，单位为 MB。默认值为 2048。</li>
<li><code translate="no">maxMemSize</code>: 内存池的最大大小，单位为 MB。默认值为 4096。</li>
</ul></li>
<li><p>在 docker-compose.yml 中，将<code translate="no">user.yaml</code> 文件添加到<code translate="no">standalone</code> 服务的<code translate="no">volumes</code> 列表中：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-string">...</span>
  <span class="hljs-attr">volumes:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">./user.yaml:/milvus/configs/user.yaml</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>重新创建 Milvus 容器以应用更改：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<p>文件挂载完成后，重启<code translate="no">standalone</code> 服务以应用后续对<code translate="no">user.yaml</code> 的更改：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose restart standalone</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Storage V3 默认处于禁用状态。在使用依赖于它的功能之前，请先将其启用。有关要求和兼容性注意事项，请参阅<a href="/docs/zh/storage-v3.md">Storage V3</a>。</p>
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
    </button></h2><p>在 Docker 中安装 Milvus 后，您可以：</p>
<ul>
<li><p>查看<a href="/docs/zh/quickstart.md">《快速入门》</a>了解 Milvus 的功能。</p></li>
<li><p>查看<a href="/docs/zh/milvus-webui.md">Milvus WebUI</a>以进一步了解 Milvus 实例。</p></li>
<li><p>学习 Milvus 的基本操作：</p>
<ul>
<li><a href="/docs/zh/manage_databases.md">管理数据库</a></li>
<li><a href="/docs/zh/manage-collections.md">管理 Collections</a></li>
<li><a href="/docs/zh/manage-partitions.md">管理分区</a></li>
<li><a href="/docs/zh/insert-update-delete.md">插入、Upsert 和删除</a></li>
<li><a href="/docs/zh/single-vector-search.md">单向量搜索</a></li>
<li><a href="/docs/zh/multi-vector-search.md">混合搜索</a></li>
</ul></li>
<li><p><a href="/docs/zh/upgrade_milvus_standalone-docker.md">使用 Docker Compose 升级 Milvus Standalone</a>。该页面显示了 CPU 镜像标签。对于此 GPU 部署，请保留<code translate="no">-gpu</code> 后缀（<code translate="no">milvusdb/milvus:v3.0.5-gpu</code> ），并保持您的<code translate="no">deploy</code> 和<code translate="no">user.yaml</code> 设置不变。</p></li>
<li><p>在 Kubernetes 上<a href="/docs/zh/scaleout.md">扩展 Milvus 集群</a>。该流程使用 Helm，不适用于此 Docker 部署。</p></li>
<li><p>在云平台上部署您的 Milvus 集群：</p>
<ul>
<li><a href="/docs/zh/eks.md">Amazon EKS</a></li>
<li><a href="/docs/zh/gcp.md">Google Cloud</a></li>
<li><a href="/docs/zh/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>探索<a href="/docs/zh/milvus-webui.md">Milvus WebUI，</a>这是一个用于 Milvus 可观测性和管理的直观 Web 界面。</p></li>
<li><p>探索<a href="/docs/zh/milvus_backup_overview.md">Milvus Backup</a>，一款用于 Milvus 数据备份的开源工具。</p></li>
<li><p>了解<a href="/docs/zh/birdwatcher_overview.md">Birdwatcher</a>——一款用于调试 Milvus 并进行动态配置更新的开源工具。</p></li>
<li><p>探索<a href="https://github.com/zilliztech/attu">Attu</a>——一款用于直观管理 Milvus 的开源图形用户界面工具。</p></li>
<li><p><a href="/docs/zh/monitor.md">使用 Prometheus 监控 Milvus</a>。</p></li>
</ul>
