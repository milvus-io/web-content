---
id: upgrade_milvus_cluster-docker.md
summary: 了解如何使用 Docker Compose 升级 Milvus 集群。
title: 使用 Docker Compose 升级 Milvus 群集
---
<div class="tab-wrapper"><a href="/docs/zh/v2.5.x/upgrade_milvus_standalone-operator.md" class=''>Milvus OperatorMilvus</a><a href="/docs/zh/v2.5.x/upgrade_milvus_cluster-operator.md" class=''>OperatorMilvus</a><a href="/docs/zh/v2.5.x/configure-helm.md" class=''>OperatorHelmDocker</a><a href="/docs/zh/v2.5.x/upgrade_milvus_standalone-helm.md" class=''>ComposeHelmDocker</a><a href="/docs/zh/v2.5.x/upgrade_milvus_cluster-helm.md" class=''>ComposeHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Docker-Compose" class="common-anchor-header">使用 Docker Compose 升级 Milvus 群集<button data-href="#Upgrade-Milvus-Cluster-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>本主题介绍如何使用 Docker Compose 升级 Milvus。</p>
<p>在正常情况下，你可以<a href="#Upgrade-Milvus-by-changing-its-image">通过更改映像来升级 Milvus</a>。不过，在从 v2.1.x 升级到 v2.5.14 之前，需要<a href="#Migrate-the-metadata">迁移元数据</a>。</p>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">通过更改映像升级 Milvus<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>在正常情况下，你可以按以下方法升级 Milvus：</p>
<ol>
<li><p>在<code translate="no">docker-compose.yaml</code> 中更改 Milvus 图像标签。</p>
<p>请注意，您需要更改代理、所有协调器和所有工作节点的映像标签。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">rootcoord:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-rootcoord</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.14</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-proxy</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.14</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">querycoord:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-querycoord</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.14</span>  
<span class="hljs-string">...</span>
<span class="hljs-attr">querynode:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-querynode</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.14</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">indexcoord:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-indexcoord</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.14</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">indexnode:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-indexnode</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.14</span> 
<span class="hljs-string">...</span>
<span class="hljs-attr">datacoord:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-datacoord</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.14</span>   
<span class="hljs-string">...</span>
<span class="hljs-attr">datanode:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-datanode</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.14</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>运行以下命令执行升级。</p>
<pre><code translate="no" class="language-shell">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Migrate-the-metadata" class="common-anchor-header">迁移元数据<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>停止所有 Milvus 组件。</p>
<pre><code translate="no">docker stop <span class="hljs-tag">&lt;<span class="hljs-name">milvus-component-docker-container-name</span>&gt;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>为元迁移准备配置文件<code translate="no">migrate.yaml</code> 。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># migration.yaml</span>
<span class="hljs-attr">cmd:</span>
  <span class="hljs-comment"># Option: run/backup/rollback</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">run</span>
  <span class="hljs-attr">runWithBackup:</span> <span class="hljs-literal">true</span>
<span class="hljs-attr">config:</span>
  <span class="hljs-attr">sourceVersion:</span> <span class="hljs-number">2.1</span><span class="hljs-number">.4</span>   <span class="hljs-comment"># Specify your milvus version</span>
  <span class="hljs-attr">targetVersion:</span> <span class="hljs-number">2.5</span><span class="hljs-number">.14</span>
  <span class="hljs-attr">backupFilePath:</span> <span class="hljs-string">/tmp/migration.bak</span>
<span class="hljs-attr">metastore:</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">etcd</span>
<span class="hljs-attr">etcd:</span>
  <span class="hljs-attr">endpoints:</span>
    <span class="hljs-bullet">-</span> <span class="hljs-string">milvus-etcd:2379</span>  <span class="hljs-comment"># Use the etcd container name</span>
  <span class="hljs-attr">rootPath:</span> <span class="hljs-string">by-dev</span> <span class="hljs-comment"># The root path where data is stored in etcd</span>
  <span class="hljs-attr">metaSubPath:</span> <span class="hljs-string">meta</span>
  <span class="hljs-attr">kvSubPath:</span> <span class="hljs-string">kv</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>运行迁移容器。</p>
<pre><code translate="no"><span class="hljs-comment"># Suppose your docker-compose run with the default milvus network,</span>
<span class="hljs-comment"># and you put migration.yaml in the same directory with docker-compose.yaml.</span>
docker run --<span class="hljs-built_in">rm</span> -it --network milvus -v $(<span class="hljs-built_in">pwd</span>)/migration.yaml:/milvus/configs/migration.yaml milvus/meta-migration:v2.2.0 /milvus/bin/meta-migration -config=/milvus/configs/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>使用新的 Milvus 映像重新启动 Milvus 组件。</p>
<pre><code translate="no">Update the milvus <span class="hljs-selector-tag">image</span> tag in the docker-compose<span class="hljs-selector-class">.yaml</span>
docker compose down
docker compose up -d
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
    </button></h2><ul>
<li>你可能还想了解如何<ul>
<li><a href="/docs/zh/v2.5.x/scaleout.md">扩展 Milvus 集群</a></li>
</ul></li>
<li>如果你准备在云上部署集群，请学习如何在亚马逊 Eclipse 上部署 Milvus：<ul>
<li>了解如何<a href="/docs/zh/v2.5.x/eks.md">使用 Terraform 在亚马逊 EKS 上部署 Milvus</a></li>
<li>学习如何<a href="/docs/zh/v2.5.x/gcp.md">使用 Kubernetes 在 GCP 上部署 Milvus 集群</a></li>
<li>了解如何<a href="/docs/zh/v2.5.x/azure.md">使用 Kubernetes 在 Microsoft Azure 上部署 Milvus</a></li>
</ul></li>
</ul>
