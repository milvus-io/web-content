---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 2
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: 了解如何使用 Docker Compose 升级 Milvus Standalone。
title: 使用 Docker Compose 升级 Milvus Standalone
---
<div class="tab-wrapper"><a href="/docs/zh/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/zh/upgrade_milvus_standalone-docker.md" class='active '>Operator</a>、Helm、Docker<a href="/docs/zh/upgrade_milvus_standalone-docker.md" class='active '>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Docker-Compose" class="common-anchor-header">使用 Docker Compose 升级 Milvus Standalone<button data-href="#Upgrade-Milvus-Standalone-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>本指南介绍了如何使用 Docker Compose 将 Milvus 2.6.x Standalone 部署升级至 v3.0.5。</p>
<div class="alert note">
<p>此流程已针对官方 Milvus 2.6.20 独立部署的 Docker Compose 配置进行了验证，当时仅更改了镜像。步骤 2 还额外添加了 v3.0.5 Compose 配置中的数据目录所有权服务，而该验证并未涵盖此内容。</p>
</div>
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
<li>Docker Engine 和 Docker Compose V2</li>
<li>由 Docker Compose 管理的现有 Milvus 2.6.x Standalone 部署</li>
<li>用于现有部署的 Docker Compose 文件和配置</li>
<li>Milvus 元数据和持久化数据的最新备份</li>
</ul>
<p><strong>消息队列限制</strong>：升级至 Milvus v3.0.5 时，必须保留当前的消息队列选择。升级过程中不支持在不同的消息队列系统之间切换。未来版本将支持更改消息队列系统。</p>
<div class="alert warning">
<p>请勿在此过程中替换当前的 Compose 文件或更改依赖项版本。请保留现有的 etcd、对象存储、消息队列、卷和配置。更新 Milvus 镜像标签，并添加步骤 2 中描述的数据目录所有权服务。</p>
<p>如果您的 Compose 文件使用<code translate="no">minio/minio:RELEASE.2024-12-18T13-15-44Z</code> 且 Docker 无法拉取该镜像，请将其更改为<code translate="no">milvusdb/minio:RELEASE.2024-12-18T13-15-44Z</code> ，这是 v3.0.5 Compose 配置所使用的镜像。请保留相同的发布标签。</p>
<p>此流程未验证通过将 Milvus 镜像降级回 2.6.x 版本所进行的降级或回滚操作。 在 v3.0.5 写入数据后，仅回滚镜像的操作可能无法读取更新后的状态。如果升级失败，请停止写入操作，并采用恢复方案来还原升级前的元数据和持久化数据备份。请先在非生产环境中验证该恢复方案。</p>
</div>
<h2 id="Upgrade-process" class="common-anchor-header">升级流程<button data-href="#Upgrade-process" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Back-up-the-current-configuration" class="common-anchor-header">步骤 1：备份当前配置<button data-href="#Step-1-Back-up-the-current-configuration" class="anchor-icon" translate="no">
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
    </button></h3><p>保存当前 Compose 文件以及任何已挂载的 Milvus 配置文件的副本：</p>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">cp</span> docker-compose.yml docker-compose-before-upgrade.yml
<button class="copy-code-btn"></button></code></pre>
<p>在开始升级前，请确认当前容器状态正常：</p>
<pre><code translate="no" class="language-bash">docker compose ps
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Update-the-Milvus-image" class="common-anchor-header">步骤 2：更新 Milvus 镜像<button data-href="#Step-2-Update-the-Milvus-image" class="anchor-icon" translate="no">
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
    </button></h3><p>在现有的 Compose 文件中，更新<code translate="no">standalone</code> 服务的镜像，将其<code translate="no">depends_on</code> 条目替换为以下内容，并添加<code translate="no">milvus-volume-init</code> 服务。两项服务均使用相同的镜像，并挂载与<code translate="no">standalone</code> 服务在<code translate="no">/var/lib/milvus</code> 处挂载的相同主机目录。保留<code translate="no">standalone</code> 服务的其他设置：</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">services:</span>
  <span class="hljs-attr">milvus-volume-init:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">user:</span> <span class="hljs-string">&quot;0:0&quot;</span>
    <span class="hljs-attr">network_mode:</span> <span class="hljs-string">none</span>
    <span class="hljs-attr">read_only:</span> <span class="hljs-literal">true</span>
    <span class="hljs-attr">restart:</span> <span class="hljs-string">&quot;no&quot;</span>
    <span class="hljs-attr">entrypoint:</span> [<span class="hljs-string">&quot;/bin/sh&quot;</span>, <span class="hljs-string">&quot;-c&quot;</span>]
    <span class="hljs-attr">command:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">|
        set -eu
        uid=&quot;$$(id -u milvus)&quot;
        gid=&quot;$$(id -g milvus)&quot;
        marker=&quot;/var/lib/milvus/.milvus-volume-owner-$${uid}-$${gid}&quot;
        if [ ! -e &quot;$${marker}&quot; ]; then
          echo &quot;Preparing /var/lib/milvus for $${uid}:$${gid}&quot;
          chown -R &quot;$${uid}:$${gid}&quot; /var/lib/milvus
          touch &quot;$${marker}&quot;
          chown &quot;$${uid}:$${gid}&quot; &quot;$${marker}&quot;
        fi
</span>    <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">${DOCKER_VOLUME_DIRECTORY:-.}/volumes/milvus:/var/lib/milvus</span>

  <span class="hljs-attr">standalone:</span>
    <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v3.0.5</span>
    <span class="hljs-attr">depends_on:</span>
      <span class="hljs-attr">milvus-volume-init:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_completed_successfully</span>
      <span class="hljs-attr">etcd:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
      <span class="hljs-attr">minio:</span>
        <span class="hljs-attr">condition:</span> <span class="hljs-string">service_started</span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus v3.0.5 镜像以非 root 用户<code translate="no">milvus</code> 运行 Milvus，而 Milvus 2.6.x 镜像未设置用户，而是以<code translate="no">root</code> 运行 Milvus。<code translate="no">milvus-volume-init</code> 服务源自 v3.0.5 的 Compose 配置。 该服务会在 Milvus 启动前以<code translate="no">root</code> 身份运行一次，并将<code translate="no">/var/lib/milvus</code> 及其内容的所有者更改为<code translate="no">milvus</code> 用户和组，以便 Milvus 能够向 2.6.x 部署生成的文件中写入数据。随后，它会在<code translate="no">/var/lib/milvus</code> 中写入一个<code translate="no">.milvus-volume-owner-&lt;uid&gt;-&lt;gid&gt;</code> 标记文件，并在后续运行中（只要该标记文件存在）不再进行任何更改。 如果您后续将归属于其他用户的文件恢复到数据目录中，请删除该标记文件，以便服务能够再次运行。</p>
<p>拉取目标镜像并重新创建 Milvus 容器。由于<code translate="no">standalone</code> 服务依赖于<code translate="no">milvus-volume-init</code> ，Docker Compose 会在启动新的 Milvus 容器之前，先运行<code translate="no">milvus-volume-init</code> 并等待其完成：</p>
<pre><code translate="no" class="language-bash">docker compose pull standalone
docker compose up --detach standalone
<button class="copy-code-btn"></button></code></pre>
<p>Docker Compose 会保持现有的 etcd 和 object-storage 容器继续运行，并复用已配置的数据目录。如果您更改了某个依赖项（例如 MinIO 镜像）的配置，Compose 会重新创建该容器，并保留其已挂载的卷。</p>
<h2 id="Verify-the-upgrade" class="common-anchor-header">验证升级<button data-href="#Verify-the-upgrade" class="anchor-icon" translate="no">
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
    </button></h2><p>检查容器状态以及 Milvus 容器所使用的镜像：</p>
<pre><code translate="no" class="language-bash">docker compose ps

docker compose images standalone

docker compose logs --<span class="hljs-built_in">tail</span> 100 standalone
<button class="copy-code-btn"></button></code></pre>
<p>确认<code translate="no">standalone</code> 服务状态正常，其镜像为<code translate="no">milvusdb/milvus:v3.0.5</code> ，且现有Collection仍可进行查询和搜索。在启用任何 v3.0.5 专属功能之前，请完成这些检查。</p>
<div class="alert note">
<p>升级到 Milvus 3.0 不会启用 Storage V3。在验证升级成功后，请先了解<a href="/docs/zh/storage-v3.md">Storage V3，</a>然后再启用依赖于它的功能。一旦 Milvus 写入了 Storage V3 数据，就不支持降级到无法读取 Storage V3 的旧版 Milvus。</p>
</div>
