---
id: install_standalone-docker-compose.md
label: Docker Compose
related_key: Docker Compose
summary: 了解如何使用 Docker Compose 独立安装 Milvus。
title: 使用 Docker Compose 运行 Milvus (Linux)
---
<h1 id="Run-Milvus-with-Docker-Compose-Linux" class="common-anchor-header">使用 Docker Compose 运行 Milvus (Linux)<button data-href="#Run-Milvus-with-Docker-Compose-Linux" class="anchor-icon" translate="no">
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
    </button></h1><p>本页说明如何使用 Docker Compose 在 Docker 中启动 Milvus 实例。</p>
<h2 id="Prerequisites" class="common-anchor-header">前提条件<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
<li>安装前<a href="/docs/zh/v2.4.x/prerequisite-docker.md">请检查硬件和软件要求</a>。</li>
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
    </button></h2><p>Milvus 在 Milvus 资源库中提供了 Docker Compose 配置文件。要使用 Docker Compose 安装 Milvus，只需运行</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Download the configuration file</span>
$ wget https://github.com/milvus-io/milvus/releases/download/v2.4.23/milvus-standalone-docker-compose.yml -O docker-compose.yml

<span class="hljs-comment"># Start Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose up -d

Creating milvus-etcd  ... <span class="hljs-keyword">done</span>
Creating milvus-minio ... <span class="hljs-keyword">done</span>
Creating milvus-standalone ... <span class="hljs-keyword">done</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li><p>如果运行上述命令失败，请检查系统是否安装了 Docker Compose V1。如果是这种情况，建议你根据<a href="https://docs.docker.com/compose/">本页</a>的说明迁移到 Docker Compose V2。</p></li>
<li><p>如果您在拉取镜像时遇到任何问题，请通过<a href="mailto:community@zilliz.com">community@zilliz.com</a>联系我们，并提供有关问题的详细信息，我们将为您提供必要的支持。</p></li>
</ul>
</div>
<p>启动 Milvus 后、</p>
<ul>
<li>名为<strong>milvus-</strong> <strong>standalone</strong>、<strong>milvus-minio</strong> 和<strong>milvus-etcd</strong>的容器启动。<ul>
<li><strong>milvus-etcd</strong>容器不向主机暴露任何端口，并将其数据映射到当前文件夹中的<strong>volumes/etcd</strong>。</li>
<li><strong>milvus-minio</strong>容器使用默认身份验证凭据在本地为端口<strong>9090</strong>和<strong>9091</strong>提供服务，并将其数据映射到当前文件夹中的<strong>volumes/minio</strong>。</li>
<li><strong>Milvus-standalone</strong>容器使用默认设置为本地<strong>19530</strong>端口提供服务，并将其数据映射到当前文件夹中的<strong>volumes/milvus</strong>。</li>
</ul></li>
</ul>
<p>您可以使用以下命令检查容器是否启动并运行：</p>
<pre><code translate="no" class="language-shell">$ <span class="hljs-built_in">sudo</span> docker-compose ps

      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530-&gt;19530/tcp, 0.0.0.0:9091-&gt;9091/tcp
<button class="copy-code-btn"></button></code></pre>
<p>您可以按以下步骤停止和删除该容器</p>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Stop Milvus</span>
$ <span class="hljs-built_in">sudo</span> docker compose down

<span class="hljs-comment"># Delete service data</span>
$ <span class="hljs-built_in">sudo</span> <span class="hljs-built_in">rm</span> -rf volumes
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
    </button></h2><p>在 Docker 中安装 Milvus 后，你可以</p>
<ul>
<li><p>查看<a href="/docs/zh/v2.4.x/quickstart.md">快速入门</a>，了解 Milvus 的功能。</p></li>
<li><p>了解 Milvus 的基本操作：</p>
<ul>
<li><a href="/docs/zh/v2.4.x/manage_databases.md">管理数据库</a></li>
<li><a href="/docs/zh/v2.4.x/manage-collections.md">管理 Collections</a></li>
<li><a href="/docs/zh/v2.4.x/manage-partitions.md">管理分区</a></li>
<li><a href="/docs/zh/v2.4.x/insert-update-delete.md">插入、倒置和删除</a></li>
<li><a href="/docs/zh/v2.4.x/single-vector-search.md">单向量搜索</a></li>
<li><a href="/docs/zh/v2.4.x/multi-vector-search.md">混合搜索</a></li>
</ul></li>
<li><p><a href="/docs/zh/v2.4.x/upgrade_milvus_cluster-helm.md">使用 Helm 图表升级 Milvus</a>。</p></li>
<li><p><a href="/docs/zh/v2.4.x/scaleout.md">扩展你的 Milvus 集群</a>。</p></li>
<li><p>在云上部署你的 Milvus 集群：</p>
<ul>
<li><a href="/docs/zh/v2.4.x/eks.md">亚马逊 EKS</a></li>
<li><a href="/docs/zh/v2.4.x/gcp.md">谷歌云</a></li>
<li><a href="/docs/zh/v2.4.x/azure.md">微软 Azure</a></li>
</ul></li>
<li><p>探索<a href="/docs/zh/v2.4.x/milvus_backup_overview.md">Milvus 备份</a>，一个用于 Milvus 数据备份的开源工具。</p></li>
<li><p>探索<a href="/docs/zh/v2.4.x/birdwatcher_overview.md">Birdwatcher</a>，用于调试 Milvus 和动态配置更新的开源工具。</p></li>
<li><p>探索<a href="https://github.com/zilliztech/attu">Attu</a>，一款用于直观管理 Milvus 的开源图形用户界面工具。</p></li>
<li><p><a href="/docs/zh/v2.4.x/monitor.md">使用 Prometheus 监控 Milvus</a>。</p></li>
</ul>
