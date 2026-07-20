---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: 了解如何使用 Docker Compose 安装 Milvus Standalone。
title: 使用 Docker Compose 运行 Milvus（Linux）
---
<h1 id="Run-Milvus-with-Docker-Compose-Linux" class="common-anchor-header">使用 Docker Compose 运行 Milvus（Linux）<button data-href="#Run-Milvus-with-Docker-Compose-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>本页面介绍了如何使用 Docker Compose 在 Docker 中启动一个 Milvus 实例。</p>
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
<li>安装前<a href="/docs/zh/v2.6.x/prerequisite-docker.md">请检查硬件和软件要求</a>。</li>
</ul>
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
    </button></h2><p>Milvus 在其代码库中提供了一个 Docker Compose 配置文件。要使用 Docker Compose 安装 Milvus，只需运行</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">Download the configuration file</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget https://github.com/milvus-io/milvus/releases/download/v2.6.20/milvus-standalone-docker-compose.yml -O docker-compose.yml</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Start Milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose up -d</span>

Creating milvus-etcd  ... done
Creating milvus-minio ... done
Creating milvus-standalone ... done
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><strong>v2.6.20 版本更新内容：</strong></p>
<ul>
<li><strong>架构增强</strong>：新增流式处理节点并优化了各项组件</li>
<li><strong>更新的依赖项</strong>：包含最新版本的 MinIO 和 etcd</li>
<li><strong>配置优化</strong>：优化了设置以提升性能</li>
</ul>
<p>请务必下载最新的 Docker Compose 配置文件，以确保与 v2.6.20 版本的功能兼容。</p>
<ul>
<li><p>若上述命令执行失败，请检查您的系统是否安装了 Docker Compose V1。如果是这种情况，根据<a href="https://docs.docker.com/compose/">本页</a>说明，建议您迁移至 Docker Compose V2。</p></li>
<li><p>若在拉取镜像时遇到任何问题，请将问题详情发送至<a href="mailto:community@zilliz.com">community@zilliz.com</a>联系我们，我们将为您提供必要的支持。</p></li>
</ul>
</div>
<p>启动 Milvus 后，</p>
<ul>
<li>名为<strong>Milvus Standalone</strong>、<strong>milvus-minio</strong> 和<strong>milvus-etcd</strong>的容器已启动。
<ul>
<li><strong>milvus-etcd</strong>容器未向主机暴露任何端口，并将数据映射到当前文件夹中的<strong>volumes/etcd</strong>。</li>
<li><strong>milvus-minio</strong>容器使用默认身份验证凭据在本地提供<strong>9090</strong>和<strong>9091</strong>端口服务，并将数据映射到当前文件夹中的<strong>volumes/minio</strong>。</li>
<li><strong>Milvus Standalone</strong>容器使用默认设置在本地提供<strong>19530</strong>端口服务，并将数据映射到当前目录下的<strong>volumes/milvus</strong>卷中。</li>
</ul></li>
</ul>
<p>您可以使用以下命令检查容器是否已启动并运行：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker-compose ps</span>

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>您还可以访问 Milvus WebUI（<code translate="no">http://127.0.0.1:9091/webui/</code> ）以了解有关您的 Milvus 实例的更多信息。有关详细信息，请参阅<a href="/docs/zh/v2.6.x/milvus-webui.md">Milvus WebUI</a>。</p>
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
    </button></h2><p>若要根据您的需求更新 Milvus 配置，您需要修改<code translate="no">milvus-standalone</code> 容器中的<code translate="no">/milvus/configs/user.yaml</code> 文件。</p>
<ol>
<li><p>访问<code translate="no">milvus-standalone</code> 容器。</p>
<pre><code translate="no" class="language-shell">docker exec -it milvus-standalone bash
<button class="copy-code-btn"></button></code></pre></li>
<li><p>添加额外配置以覆盖默认设置。
以下内容假设您需要覆盖默认的<code translate="no">proxy.healthCheckTimeout</code> 。有关适用的配置项，请参阅《<a href="/docs/zh/v2.6.x/system_configuration.md">系统配置》</a>。</p>
<pre><code translate="no" class="language-shell">cat &lt;&lt; EOF &gt; /milvus/configs/user.yaml
<span class="hljs-meta prompt_"># </span><span class="language-bash">Extra config to override default milvus.yaml</span>
proxy:
  healthCheckTimeout: 1000 # ms, the interval that to do component healthy check
EOF
<button class="copy-code-btn"></button></code></pre></li>
<li><p>重启<code translate="no">milvus-standalone</code> 容器以应用更改。</p>
<pre><code translate="no" class="language-shell">docker restart milvus-standalone
<button class="copy-code-btn"></button></code></pre></li>
</ol>
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
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> docker compose down</span>
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Delete service data</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes</span>
<button class="copy-code-btn"></button></code></pre>
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
<li><p>探索<a href="/docs/zh/v2.6.x/milvus_backup_overview.md">Milvus Backup</a>，一款用于 Milvus 数据备份的开源工具。</p></li>
<li><p>了解<a href="/docs/zh/v2.6.x/birdwatcher_overview.md">Birdwatcher</a>——一款用于调试 Milvus 并进行动态配置更新的开源工具。</p></li>
<li><p>探索<a href="https://github.com/zilliztech/attu">Attu</a>——一款用于直观管理 Milvus 的开源图形界面工具。</p></li>
<li><p><a href="/docs/zh/v2.6.x/monitor.md">使用 Prometheus 监控 Milvus</a>。</p></li>
</ul>
