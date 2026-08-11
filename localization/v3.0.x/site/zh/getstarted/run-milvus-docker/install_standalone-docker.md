---
id: install_standalone-docker.md
label: Docker
related_key: Docker
summary: 了解如何使用 Docker 安装 Milvus Standalone。
title: 在 Docker 中运行 Milvus（Linux）
---
<h1 id="Run-Milvus-in-Docker-Linux" class="common-anchor-header">在 Docker 中运行 Milvus（Linux）<button data-href="#Run-Milvus-in-Docker-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>本页面介绍了如何在 Docker 中启动一个 Milvus 实例。</p>
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
<li>安装前<a href="/docs/zh/prerequisite-docker.md">请检查硬件和软件要求</a>。</li>
</ul>
<h2 id="Install-Milvus-in-Docker" class="common-anchor-header">在 Docker 中安装 Milvus<button data-href="#Install-Milvus-in-Docker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 提供了一个安装脚本，用于将其作为 Docker 容器进行安装。该脚本可在<a href="https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh">Milvus 代码库中</a>获取。要在 Docker 中安装 Milvus，只需运行</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the installation script</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start the Docker container</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh start</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>v3.0-beta 版本的新功能：</strong></p>
<ul>
<li><strong>流式处理节点</strong>：增强了数据处理能力</li>
<li><strong>Woodpecker MQ（默认）</strong>：此 Docker 部署将 Woodpecker 用作消息队列，并使用<strong>本地文件系统</strong>作为其 WAL 后端，因此无需外部消息队列服务。请参阅<a href="/docs/zh/woodpecker.md">Woodpecker</a>。</li>
<li><strong>优化架构</strong>：整合组件以提升性能</li>
</ul>
<p>请务必下载最新脚本，以确保获得最新的配置和架构改进。</p>
<p>如果您希望在独立部署模式下使用<a href="https://milvus.io/docs/milvus_backup_overview.md">Backup，</a>建议采用<a href="https://milvus.io/docs/install_standalone-docker-compose.md">Docker Compose</a>部署方式。</p>
<p>若在拉取镜像时遇到任何问题，请将问题详情发送至<a href="mailto:community@zilliz.com">community@zilliz.com</a>联系我们，我们将为您提供必要的支持。</p>
</div>
<p>运行安装脚本后：</p>
<ul>
<li>一个名为 Milvus Standalone 的 Docker 容器已在端口<strong>19530</strong> 上启动。</li>
<li>一个嵌入式 etcd 已随 Milvus 一起安装在同一容器中，并通过端口<strong>2379</strong> 提供服务。其配置文件映射到当前文件夹中的<strong>embedEtcd.yaml</strong>。</li>
<li>若要修改 Milvus 的默认配置，请在当前文件夹中的<strong>user.yaml</strong>文件中添加您的设置，然后重启服务。</li>
<li>Milvus 数据卷已映射到当前目录下的<strong>volumes/milvus</strong>目录中。</li>
</ul>
<p>您可以通过<code translate="no">http://127.0.0.1:9091/webui/</code> 访问 Milvus WebUI，以了解有关您的 Milvus 实例的更多信息。有关详细信息，请参阅<a href="/docs/zh/milvus-webui.md">Milvus WebUI</a>。</p>
<h2 id="Optional-Update-Milvus-configurations" class="common-anchor-header">（可选）更新 Milvus 配置<button data-href="#Optional-Update-Milvus-configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以在当前文件夹中的<strong>user.yaml</strong>文件中修改 Milvus 配置。例如，若要将<code translate="no">proxy.healthCheckTimeout</code> 更改为<code translate="no">1000</code> ms，可按以下方式修改该文件：</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre>
<p>然后按以下方式重启服务：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh restart</span>
<button class="copy-code-btn"></button></code></pre>
<p>有关适用的配置项，请参阅《<a href="/docs/zh/system_configuration.md">系统配置》</a>。</p>
<h2 id="Upgrade-Milvus" class="common-anchor-header">升级 Milvus<button data-href="#Upgrade-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以使用内置的升级命令将 Milvus 升级到最新版本。这将自动下载最新的配置和 Milvus 镜像：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Upgrade Milvus to the latest version</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh upgrade</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>该升级命令会自动：</p>
<ul>
<li>下载包含更新配置的最新安装脚本</li>
<li>拉取最新的 Milvus Docker 镜像</li>
<li>使用新版本重启容器</li>
<li>保留您的现有数据和配置</li>
</ul>
<p>这是升级您的 Milvus Standalone 部署的推荐方法。</p>
</div>
<h2 id="Stop-and-delete-Milvus" class="common-anchor-header">停止并删除 Milvus<button data-href="#Stop-and-delete-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>您可以按以下步骤停止并删除此容器</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Stop Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh stop</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete Milvus data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">bash standalone_embed.sh delete</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Optional-dependencies" class="common-anchor-header">可选依赖项<button data-href="#Optional-dependencies" class="anchor-icon" translate="no">
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
    </button></h2><p>默认情况下，此部署使用<strong>Woodpecker</strong>（本地文件系统 WAL）作为消息队列，并使用<strong>嵌入式 etcd</strong>管理元数据——无需安装其他组件。若要使用其他消息队列或连接外部对象存储/元数据，请参阅：</p>
<ul>
<li>消息队列：<a href="/docs/zh/woodpecker.md">Woodpecker</a>（默认）·<a href="/docs/zh/mq_pulsar.md">Pulsar</a>·<a href="/docs/zh/mq_kafka.md">Kafka</a>·<a href="/docs/zh/mq_rocksmq.md">RocksMQ</a></li>
<li>对象存储：<a href="/docs/zh/deploy_s3.md">MinIO</a>（默认）·<a href="/docs/zh/deploy_s3.md">AWS S3</a>·<a href="/docs/zh/abs.md">Azure Blob</a>·<a href="/docs/zh/gcs.md">GCP Cloud Storage</a>·<a href="/docs/zh/deploy_s3.md">阿里云 OSS</a>·<a href="/docs/zh/deploy_s3.md">腾讯 COS</a>·<a href="/docs/zh/deploy_s3.md">华为 OBS</a>·<a href="/docs/zh/deploy_s3.md">S3 兼容</a></li>
<li>元数据：<a href="/docs/zh/deploy_etcd.md">etcd</a></li>
</ul>
<div class="alert note">
<p>Storage V3 默认处于禁用状态。在使用依赖于它的功能之前，请先启用它。有关要求和兼容性注意事项，请参阅<a href="/docs/zh/storage-v3.md">Storage V3</a>。</p>
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
<li><p>学习 Milvus 的基本操作：</p>
<ul>
<li><a href="/docs/zh/manage_databases.md">管理数据库</a></li>
<li><a href="/docs/zh/manage-collections.md">管理 Collections</a></li>
<li><a href="/docs/zh/manage-partitions.md">管理分区</a></li>
<li><a href="/docs/zh/insert-update-delete.md">插入、Upsert 和删除</a></li>
<li><a href="/docs/zh/single-vector-search.md">单向量搜索</a></li>
<li><a href="/docs/zh/multi-vector-search.md">混合搜索</a></li>
</ul></li>
<li><p><a href="/docs/zh/upgrade_milvus_cluster-helm.md">使用 Helm 图表升级 Milvus</a>。</p></li>
<li><p><a href="/docs/zh/scaleout.md">扩展您的 Milvus 集群</a>。</p></li>
<li><p>在云端部署您的 Milvus 集群：</p>
<ul>
<li><a href="/docs/zh/eks.md">Amazon EKS</a></li>
<li><a href="/docs/zh/gcp.md">Google Cloud</a></li>
<li><a href="/docs/zh/azure.md">Microsoft Azure</a></li>
</ul></li>
<li><p>探索<a href="/docs/zh/milvus-webui.md">Milvus WebUI</a>——一个用于 Milvus 可观测性和管理的直观 Web 界面。</p></li>
<li><p>探索<a href="/docs/zh/milvus_backup_overview.md">Milvus Backup</a>——一款用于 Milvus 数据备份的开源工具。</p></li>
<li><p>了解<a href="/docs/zh/birdwatcher_overview.md">Birdwatcher</a>——一款用于调试 Milvus 并更新动态配置的开源工具。</p></li>
<li><p>探索<a href="https://github.com/zilliztech/attu">Attu</a>——一款用于直观管理 Milvus 的开源图形用户界面工具。</p></li>
<li><p><a href="/docs/zh/monitor.md">使用 Prometheus 监控 Milvus</a>。</p></li>
</ul>
