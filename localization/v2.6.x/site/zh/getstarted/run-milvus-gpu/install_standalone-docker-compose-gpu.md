---
id: install_standalone-docker-compose-gpu.md
label: Standalone (Docker Compose)
related_key: Kubernetes
summary: 了解如何在 Kubernetes 上安装 Milvus 集群。
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
<li>安装前<a href="/docs/zh/v2.6.x/prerequisite-gpu.md">请检查硬件和软件要求</a>。</li>
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
    </button></h3><p>下载 <a href="https://github.com/milvus-io/milvus/releases/download/v2.6.17/milvus-standalone-docker-compose-gpu.yml"><code translate="no">milvus-standalone-docker-compose-gpu.yml</code></a> 并手动将其保存为 docker-compose.yml，或使用以下命令进行操作。</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v2.6.17/milvus-standalone-docker-compose-gpu.yml -O docker-compose.yml</span>
<button class="copy-code-btn"></button></code></pre>
<p>您需要对 YAML 文件中独立服务的环境变量进行如下修改：</p>
<ul>
<li>若要为 Milvus 分配特定的 GPU 设备，请在<code translate="no">standalone</code> 服务的定义中找到 `<code translate="no">deploy.resources.reservations.devices[0].devices_ids</code> ` 字段，并将该字段的值替换为所需 GPU 的 ID。您可以使用 NVIDIA GPU 显示驱动程序中附带的<code translate="no">nvidia-smi</code> 工具来确定 GPU 设备的 ID。Milvus 支持多个 GPU 设备。</li>
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

Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>如果无法执行上述命令，请检查您的系统是否安装了 Docker Compose V1。如果是这种情况，建议您根据<a href="https://docs.docker.com/compose/">本页</a>的说明迁移到 Docker Compose V2。</p>
</div>
<p>Milvus 启动后，</p>
<ul>
<li>名为<strong>Milvus Standalone</strong>、<strong>milvus-minio</strong> 和<strong>milvus-etcd</strong>的容器已启动。
<ul>
<li><strong>milvus-etcd</strong>容器未向主机暴露任何端口，并将数据映射到当前文件夹中的<strong>volumes/etcd</strong>。</li>
<li><strong>milvus-minio</strong>容器在本地监听<strong>9090</strong>和<strong>9091</strong>端口，使用默认身份验证凭据，并将数据映射到当前文件夹中的<strong>volumes/minio</strong>。</li>
<li><strong>Milvus Standalone</strong>容器使用默认设置在本地监听<strong>19530</strong>端口，并将数据映射到当前目录下的<strong>volumes/milvus</strong>卷中。</li>
</ul></li>
</ul>
<p>您可以使用以下命令检查容器是否已启动并运行：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose ps</span>

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>您还可以访问<code translate="no">http://127.0.0.1:9091/webui/</code> 上的 Milvus WebUI，以了解有关您的 Milvus 实例的更多信息。有关详细信息，请参阅<a href="/docs/zh/v2.6.x/milvus-webui.md">Milvus WebUI</a>。</p>
<p>如果您在 docker-compose.yml 中为 Milvus 分配了多个 GPU 设备，可以指定哪个 GPU 设备对 Milvus 可见或可用。</p>
<p>使 GPU 设备<code translate="no">0</code> 对 Milvus 可见：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">CUDA_VISIBLE_DEVICES=0 ./milvus run standalone</span>
<button class="copy-code-btn"></button></code></pre>
<p>使 GPU 设备<code translate="no">0</code> 和<code translate="no">1</code> 对 Milvus 可见：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">CUDA_VISIBLE_DEVICES=0,1 ./milvus run standalone</span>
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
    </button></h2><p>Milvus 启动并运行后，您可以通过修改 `<code translate="no">milvus.yaml</code> ` 文件中的 `<code translate="no">initMemSize</code> ` 和 `<code translate="no">maxMemSize</code> ` 设置来自定义内存池。</p>
<div class="alert note">
<p><code translate="no">milvus.yaml</code> 文件位于Milvus容器内的<code translate="no">/milvus/configs/</code> 目录中。</p>
</div>
<p>要配置内存池，请按以下方式修改<code translate="no">milvus.yaml</code> 文件中的<code translate="no">initMemSize</code> 和<code translate="no">maxMemSize</code> 设置。</p>
<ol>
<li><p>使用以下命令将 Milvus 容器中的<code translate="no">milvus.yaml</code> 文件复制到本地机器。请将<code translate="no">&lt;milvus_container_id&gt;</code> 替换为您的实际 Milvus 容器 ID。</p>
<pre><code translate="no" class="language-shell">docker cp &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>使用您喜欢的文本编辑器打开复制的<code translate="no">milvus.yaml</code> 文件。例如，使用 vim：</p>
<pre><code translate="no" class="language-shell">vim milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>根据需要编辑<code translate="no">initMemSize</code> 和<code translate="no">maxMemSize</code> 设置，并保存更改：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span>
<span class="hljs-string">...</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">initMemSize</code>: 内存池的初始大小。默认值为 1024。</li>
<li><code translate="no">maxMemSize</code>: 内存池的最大大小。默认值为 2048。</li>
</ul></li>
<li><p>使用以下命令将修改后的<code translate="no">milvus.yaml</code> 文件复制回 Milvus 容器。请将<code translate="no">&lt;milvus_container_id&gt;</code> 替换为您实际的 Milvus 容器 ID。</p>
<pre><code translate="no" class="language-shell">docker cp milvus.yaml &lt;milvus_container_id&gt;:/milvus/configs/milvus.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>重启 Milvus 容器以应用更改：</p>
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
    </button></h2><p>在 Docker 中安装 Milvus 后，您可以：</p>
<ul>
<li><p>查看<a href="/docs/zh/v2.6.x/quickstart.md">《快速入门》</a>了解 Milvus 的功能。</p></li>
<li><p>查看<a href="/docs/zh/v2.6.x/milvus-webui.md">Milvus WebUI</a>以进一步了解该 Milvus 实例。</p></li>
<li><p>学习 Milvus 的基本操作：</p>
<ul>
<li><a href="/docs/zh/v2.6.x/manage_databases.md">管理数据库</a></li>
<li><a href="/docs/zh/v2.6.x/manage-collections.md">管理 Collections</a></li>
<li><a href="/docs/zh/v2.6.x/manage-partitions.md">管理分区</a></li>
<li><a href="/docs/zh/v2.6.x/insert-update-delete.md">插入、Upsert 和删除</a></li>
<li><a href="/docs/zh/v2.6.x/single-vector-search.md">单向量搜索</a></li>
<li><a href="/docs/zh/v2.6.x/multi-vector-search.md">混合搜索</a></li>
</ul></li>
<li><p><a href="/docs/zh/v2.6.x/upgrade_milvus_cluster-helm.md">使用 Helm 图表升级 Milvus</a>。</p></li>
<li><p><a href="/docs/zh/v2.6.x/scaleout.md">扩展您的 Milvus 集群</a>。</p></li>
<li><p>在云端部署您的 Milvus 集群：</p>
<ul>
<li><a href="/docs/zh/v2.6.x/eks.md">Amazon EKS</a></li>
<li><a href="/docs/zh/v2.6.x/gcp.md">Google Cloud</a></li>
<li><a href="/docs/zh/v2.6.x/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>探索<a href="/docs/zh/v2.6.x/milvus-webui.md">Milvus WebUI</a>——一个用于 Milvus 可观测性和管理的直观 Web 界面。</p></li>
<li><p>探索<a href="/docs/zh/v2.6.x/milvus_backup_overview.md">Milvus Backup</a>——一款用于 Milvus 数据备份的开源工具。</p></li>
<li><p>了解<a href="/docs/zh/v2.6.x/birdwatcher_overview.md">Birdwatcher</a>——一款用于调试 Milvus 并更新动态配置的开源工具。</p></li>
<li><p>探索<a href="https://github.com/zilliztech/attu">Attu</a>——一款用于直观管理 Milvus 的开源图形界面工具。</p></li>
<li><p><a href="/docs/zh/v2.6.x/monitor.md">使用 Prometheus 监控 Milvus</a>。</p></li>
</ul>
