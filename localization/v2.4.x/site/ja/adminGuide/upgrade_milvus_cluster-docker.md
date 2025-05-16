---
id: upgrade_milvus_cluster-docker.md
summary: Docker ComposeでMilvusクラスタをアップグレードする方法をご紹介します。
title: Docker Composeを使用したMilvusクラスタのアップグレード
---
<div class="tab-wrapper"><a href="/docs/ja/v2.4.x/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/ja/v2.4.x/upgrade_milvus_cluster-operator.md" class=''>OperatorMilvus</a><a href="/docs/ja/v2.4.x/configure-helm.md" class=''>OperatorHelmDocker</a><a href="/docs/ja/v2.4.x/upgrade_milvus_standalone-helm.md" class=''>ComposeHelmDocker</a><a href="/docs/ja/v2.4.x/upgrade_milvus_cluster-helm.md" class=''>ComposeHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Docker-Compose" class="common-anchor-header">Docker Composeを使用したMilvusクラスタのアップグレード<button data-href="#Upgrade-Milvus-Cluster-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、Docker Composeを使用してMilvusをアップグレードする方法について説明します。</p>
<p>通常の場合、<a href="#Upgrade-Milvus-by-changing-its-image">Milvusのイメージを変更することでアップグレードが</a>可能です。ただし、v2.1.xからv2.4.23にアップグレードする場合は、事前に<a href="#Migrate-the-metadata">メタデータを移行する</a>必要があります。</p>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">Milvusのイメージ変更によるアップグレード<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>通常の場合、以下の手順でMilvusをアップグレードすることができます：</p>
<ol>
<li><p>Milvus のイメージタグを<code translate="no">docker-compose.yaml</code> で変更する。</p>
<p>プロキシ、すべてのコーディネータ、すべてのワーカーノードのイメージタグを変更する必要があることに注意してください。</p>
<pre><code translate="no" class="language-yaml">...
rootcoord:
  container_name: milvus-rootcoord
  image: milvusdb/milvus:v2.4.23
...
proxy:
  container_name: milvus-proxy
  image: milvusdb/milvus:v2.4.23
...
querycoord:
  container_name: milvus-querycoord
  image: milvusdb/milvus:v2.4.23  
...
querynode:
  container_name: milvus-querynode
  image: milvusdb/milvus:v2.4.23
...
indexcoord:
  container_name: milvus-indexcoord
  image: milvusdb/milvus:v2.4.23
...
indexnode:
  container_name: milvus-indexnode
  image: milvusdb/milvus:v2.4.23 
...
datacoord:
  container_name: milvus-datacoord
  image: milvusdb/milvus:v2.4.23   
...
datanode:
  container_name: milvus-datanode
  image: milvusdb/milvus:v2.4.23
<button class="copy-code-btn"></button></code></pre></li>
<li><p>以下のコマンドを実行してアップグレードを実行します。</p>
<pre><code translate="no" class="language-shell">docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Migrate-the-metadata" class="common-anchor-header">メタデータの移行<button data-href="#Migrate-the-metadata" class="anchor-icon" translate="no">
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
<li><p>すべてのMilvusコンポーネントを停止します。</p>
<pre><code translate="no">docker stop &lt;milvus-component-docker-container-name&gt;
<button class="copy-code-btn"></button></code></pre></li>
<li><p>メタマイグレーション用の設定ファイル<code translate="no">migrate.yaml</code> を準備します。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># migration.yaml</span>
cmd:
  <span class="hljs-comment"># Option: run/backup/rollback</span>
  <span class="hljs-built_in">type</span>: run
  runWithBackup: true
config:
  sourceVersion: <span class="hljs-number">2.1</span><span class="hljs-number">.4</span>   <span class="hljs-comment"># Specify your milvus version</span>
  targetVersion: <span class="hljs-number">2.4</span><span class="hljs-number">.23</span>
  backupFilePath: /tmp/migration.bak
metastore:
  <span class="hljs-built_in">type</span>: etcd
etcd:
  endpoints:
    - milvus-etcd:<span class="hljs-number">2379</span>  <span class="hljs-comment"># Use the etcd container name</span>
  rootPath: by-dev <span class="hljs-comment"># The root path where data is stored in etcd</span>
  metaSubPath: meta
  kvSubPath: kv
<button class="copy-code-btn"></button></code></pre></li>
<li><p>マイグレーションコンテナを実行します。</p>
<pre><code translate="no"><span class="hljs-comment"># Suppose your docker-compose run with the default milvus network,</span>
<span class="hljs-comment"># and you put migration.yaml in the same directory with docker-compose.yaml.</span>
docker run --<span class="hljs-built_in">rm</span> -it --network milvus -v $(<span class="hljs-built_in">pwd</span>)/migration.yaml:/milvus/configs/migration.yaml milvus/meta-migration:v2.2.0 /milvus/bin/meta-migration -config=/milvus/configs/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>新しいMilvusイメージでMilvusコンポーネントを再度起動する。</p>
<pre><code translate="no">Update the milvus image tag in the docker-compose.yaml
docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">次のステップ<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>次の方法もご覧ください：<ul>
<li><a href="/docs/ja/v2.4.x/scaleout.md">Milvusクラスタのスケール</a></li>
</ul></li>
<li>クラウド上にクラスターをデプロイする準備ができている場合は、次の方法を参照してください：<ul>
<li><a href="/docs/ja/v2.4.x/eks.md">Terraformを使ってAmazon EKSにMilvusをデプロイ</a>する方法を学ぶ</li>
<li><a href="/docs/ja/v2.4.x/gcp.md">Kubernetesを使用してGCPにMilvusクラスタをデプロイ</a>する方法を学ぶ</li>
<li><a href="/docs/ja/v2.4.x/azure.md">Kubernetesを使ってMicrosoft AzureにMilvusをデプロイ</a>する方法を学ぶ</li>
</ul></li>
</ul>
