---
id: upgrade_milvus_standalone-docker.md
label: Docker Compose
order: 1
group: upgrade_milvus_standalone-operator.md
related_key: upgrade Milvus Standalone
summary: 學習如何使用 Docker Compose 升級 Milvus 單機版。
title: 使用 Docker Compose 升級 Milvus 單機版
---

<div class="tab-wrapper"><a href="/docs/zh-hant/v2.5.x/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/zh-hant/v2.5.x/upgrade_milvus_standalone-helm.md" class=''>OperatorHelmDocker</a><a href="/docs/zh-hant/v2.5.x/upgrade_milvus_standalone-docker.md" class='active '>Compose</a></div>
<h1 id="Upgrade-Milvus-Standalone-with-Docker-Compose" class="common-anchor-header">使用 Docker Compose 升級 Milvus 單機版<button data-href="#Upgrade-Milvus-Standalone-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>本主題描述如何使用 Docker Compose 升級您的 Milvus。</p>
<p>在一般情況下，您可以<a href="#Upgrade-Milvus-by-changing-its-image">透過變更映像檔來升級 Milvus</a>。然而，在從 v2.1.x 升級到 v2.5.13 之前，您需要<a href="#Migrate-the-metadata">先遷移元資料</a>。</p>
<div class="alter note">
<p>基於安全考量，Milvus 會隨著 v2.2.5 的發行，將 MinIO 升級至 RELEASE.2023-03-20T20-16-18Z。在使用 Docker Compose 從之前的 Milvus Standalone 版本安裝進行任何升級之前，您應該先建立一個 Single-Node Single-Drive MinIO 部署，並將現有的 MinIO 設定和內容遷移到新的部署。如需詳細資訊，請參閱<a href="https://min.io/docs/minio/linux/operations/install-deploy-manage/migrate-fs-gateway.html#id2">本指南</a>。</p>
</div>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">透過變更映像來升級 Milvus<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>在一般情況下，您可以如下方式升級 Milvus：</p>
<ol>
<li><p>在<code translate="no">docker-compose.yaml</code> 中變更 Milvus 映像檔標籤。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">standalone:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-standalone</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.5.13</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>執行下列指令來執行升級。</p>
<pre><code translate="no" class="language-shell">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Migrate-the-metadata" class="common-anchor-header">遷移元資料<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
<li><p>停止所有 Milvus 元件。</p>
<pre><code translate="no">docker stop <span class="hljs-tag">&lt;<span class="hljs-name">milvus-component-docker-container-name</span>&gt;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>為元資料遷移準備配置檔案<code translate="no">migration.yaml</code> 。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># migration.yaml</span>
<span class="hljs-attr">cmd:</span>
  <span class="hljs-comment"># Option: run/backup/rollback</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">run</span>
  <span class="hljs-attr">runWithBackup:</span> <span class="hljs-literal">true</span>
<span class="hljs-attr">config:</span>
  <span class="hljs-attr">sourceVersion:</span> <span class="hljs-number">2.1</span><span class="hljs-number">.4</span>   <span class="hljs-comment"># Specify your milvus version</span>
  <span class="hljs-attr">targetVersion:</span> <span class="hljs-number">2.5</span><span class="hljs-number">.13</span>
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
<li><p>執行遷移容器。</p>
<pre><code translate="no"><span class="hljs-comment"># Suppose your docker-compose run with the default milvus network,</span>
<span class="hljs-comment"># and you put migration.yaml in the same directory with docker-compose.yaml.</span>
docker run --<span class="hljs-built_in">rm</span> -it --network milvus -v $(<span class="hljs-built_in">pwd</span>)/migration.yaml:/milvus/configs/migration.yaml milvusdb/meta-migration:v2.2.0 /milvus/bin/meta-migration -config=/milvus/configs/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>使用新的 Milvus 映像重新啟動 Milvus 元件。</p>
<pre><code translate="no" class="language-shell">// Run the following only after update the milvus image tag in the docker-compose.yaml
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
<li>您可能還想學習如何<ul>
<li><a href="/docs/zh-hant/v2.5.x/scaleout.md">擴充 Milvus 叢集</a></li>
</ul></li>
<li>如果您已準備好在雲上部署您的叢集：<ul>
<li>學習如何<a href="/docs/zh-hant/v2.5.x/eks.md">使用 Terraform 在 Amazon EKS 上部署 Milvus</a></li>
<li>學習如何<a href="/docs/zh-hant/v2.5.x/gcp.md">使用 Kubernetes 在 GCP 上部署 Milvus 集群</a></li>
<li>學習如何<a href="/docs/zh-hant/v2.5.x/azure.md">使用 Kubernetes 在 Microsoft Azure 上部署 Milvus</a></li>
</ul></li>
</ul>
