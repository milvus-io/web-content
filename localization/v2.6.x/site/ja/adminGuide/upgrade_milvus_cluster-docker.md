---
id: upgrade_milvus_cluster-docker.md
summary: Docker Compose を使用して Milvus クラスターをアップグレードする方法について学びましょう。
title: Docker Compose を使用した Milvus クラスタのアップグレード
---
<div class="tab-wrapper"><a href="/docs/ja/v2.6.x/upgrade_milvus_standalone-operator.md" class=''>Milvus</a><a href="/docs/ja/v2.6.x/upgrade_milvus_cluster-operator.md" class=''>OperatorMilvus</a><a href="/docs/ja/v2.6.x/configure_operator.md" class=''>OperatorMilvus</a><a href="/docs/ja/v2.6.x/configure-docker.md" class=''>OperatorHelmDocker</a><a href="/docs/ja/v2.6.x/upgrade_milvus_standalone-docker.md" class=''>ComposeHelmDocker</a><a href="/docs/ja/v2.6.x/upgrade_milvus_cluster-helm.md" class=''>ComposeHelm</a></div>
<h1 id="Upgrade-Milvus-Cluster-with-Docker-Compose" class="common-anchor-header">Docker Compose を使用した Milvus クラスタのアップグレード<button data-href="#Upgrade-Milvus-Cluster-with-Docker-Compose" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、Docker Compose を使用して Milvus をアップグレードする方法について説明します。</p>
<p>通常、<a href="#Upgrade-Milvus-by-changing-its-image">Milvusはイメージを変更することでアップグレード</a>できます。ただし、v2.1.xからv2.6.17へのアップグレードを行う前には、<a href="#Migrate-the-metadata">メタデータの移行を行う</a>必要があります。</p>
<div class="alert note">
<p><strong>メッセージキューの制限事項</strong>：Milvus v2.6.17 へアップグレードする際は、現在のメッセージキューの設定を維持する必要があります。アップグレード中に異なるメッセージキューシステムへ切り替えることはサポートされていません。メッセージキューシステムの変更機能は、将来のバージョンでサポートされる予定です。</p>
</div>
<h2 id="Upgrade-Milvus-by-changing-its-image" class="common-anchor-header">イメージを変更してMilvusをアップグレードする<button data-href="#Upgrade-Milvus-by-changing-its-image" class="anchor-icon" translate="no">
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
    </button></h2><p>通常の場合、Milvusは次のようにアップグレードできます:</p>
<ol>
<li><p><code translate="no">docker-compose.yaml</code> 内の Milvus イメージタグを変更します。</p>
<p>プロキシ、すべてのコーディネーター、およびすべてのワーカーノードのイメージタグを変更する必要がある点に注意してください。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-string">...</span>
<span class="hljs-attr">rootcoord:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-rootcoord</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.17</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">proxy:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-proxy</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.17</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">querycoord:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-querycoord</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.17</span>  
<span class="hljs-string">...</span>
<span class="hljs-attr">querynode:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-querynode</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.17</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">indexcoord:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-indexcoord</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.17</span>
<span class="hljs-string">...</span>
<span class="hljs-attr">indexnode:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-indexnode</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.17</span> 
<span class="hljs-string">...</span>
<span class="hljs-attr">datacoord:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-datacoord</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.17</span>   
<span class="hljs-string">...</span>
<span class="hljs-attr">datanode:</span>
  <span class="hljs-attr">container_name:</span> <span class="hljs-string">milvus-datanode</span>
  <span class="hljs-attr">image:</span> <span class="hljs-string">milvusdb/milvus:v2.6.17</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>以下のコマンドを実行してアップグレードを行います。</p>
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
<li><p>すべての Milvus コンポーネントを停止します。</p>
<pre><code translate="no">docker stop <span class="hljs-tag">&lt;<span class="hljs-name">milvus-component-docker-container-name</span>&gt;</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p>メタデータの移行用に、設定ファイル<code translate="no">migrate.yaml</code> を準備します。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># migration.yaml</span>
<span class="hljs-attr">cmd:</span>
  <span class="hljs-comment"># Option: run/backup/rollback</span>
  <span class="hljs-attr">type:</span> <span class="hljs-string">run</span>
  <span class="hljs-attr">runWithBackup:</span> <span class="hljs-literal">true</span>
<span class="hljs-attr">config:</span>
  <span class="hljs-attr">sourceVersion:</span> <span class="hljs-number">2.1</span><span class="hljs-number">.4</span>   <span class="hljs-comment"># Specify your milvus version</span>
  <span class="hljs-attr">targetVersion:</span> <span class="hljs-number">2.6</span><span class="hljs-number">.17</span>
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
<li><p>移行コンテナを実行します。</p>
<pre><code translate="no"><span class="hljs-comment"># Suppose your docker-compose run with the default milvus network,</span>
<span class="hljs-comment"># and you put migration.yaml in the same directory with docker-compose.yaml.</span>
docker run --<span class="hljs-built_in">rm</span> -it --network milvus -v $(<span class="hljs-built_in">pwd</span>)/migration.yaml:/milvus/configs/migration.yaml milvus/meta-migration:v2.2.0 /milvus/bin/meta-migration -config=/milvus/configs/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
<li><p>新しい Milvus イメージを使用して、Milvus コンポーネントを再起動します。</p>
<pre><code translate="no">Update the milvus <span class="hljs-selector-tag">image</span> tag in the docker-compose<span class="hljs-selector-class">.yaml</span>
docker compose down
docker compose up -d
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Whats-next" class="common-anchor-header">次の手順<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>以下の操作方法についても確認することをお勧めします：
<ul>
<li><a href="/docs/ja/v2.6.x/scaleout.md">Milvus クラスタのスケーリング</a></li>
</ul></li>
<li>クラウド上にクラスターをデプロイする準備ができている場合は：
<ul>
<li><a href="/docs/ja/v2.6.x/eks.md">Terraform を使用して Amazon EKS に Milvus をデプロイ</a>する方法</li>
<li><a href="/docs/ja/v2.6.x/gcp.md">Kubernetes を使用して GCP に Milvus クラスターをデプロイ</a>する方法</li>
<li><a href="/docs/ja/v2.6.x/azure.md">Kubernetes を使用して Microsoft Azure に Milvus をデプロイ</a>する方法</li>
</ul></li>
</ul>
