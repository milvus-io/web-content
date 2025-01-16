---
id: shared-bucket-backup-and-restore.md
summary: >-
  このトピックでは、オブジェクトストレージに共有バケットを使用しながら、Milvusインスタンスからコレクションをバックアップし、別のインスタンスにリストアするプロセスについて詳しく説明します。
title: つのバケット内のインスタンス間の移行（異なるルートパス）
---
<h1 id="Migrate-Between-Instances-in-One-Bucket-Different-Root-Paths" class="common-anchor-header">つのバケット内のインスタンス間の移行（異なるルートパス）<button data-href="#Migrate-Between-Instances-in-One-Bucket-Different-Root-Paths" class="anchor-icon" translate="no">
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
    </button></h1><p>このトピックでは、あるMilvusインスタンスからコレクションをバックアップし、別のMilvusインスタンスにリストアするプロセスについて詳しく説明します。</p>
<h2 id="Overview" class="common-anchor-header">概要<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>以下の図は、共有バケットを使用したバックアップとリストアのプロセスを示しています。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/shared-bucket-backup-and-restore.png" alt="shared-bucket-backup-and-restore.png" class="doc-image" id="shared-bucket-backup-and-restore.png" />
   </span> <span class="img-wrapper"> <span>共有バケットバックアップ・リストア.png</span> </span></p>
<p>Milvusインスタンス、<code translate="no">milvus_A</code> と<code translate="no">milvus_B</code> があり、どちらもオブジェクトストレージにデフォルトのMinIOストレージエンジンを使用しているとします。これらのインスタンスは、<code translate="no">bucket_A</code> という同じバケットを共有していますが、<code translate="no">milvus_A</code> は<code translate="no">files_A</code> 、<code translate="no">milvus_B</code> は files_B という異なるルートパスにデータを保存しています。この例では、以下のタスクを完了することが目標です：</p>
<ol>
<li><p>コレクション coll のバックアップ(my_backup)を作成し、<code translate="no">milvus_A</code> の<code translate="no">files_A</code> パスに保存します。</p></li>
<li><p>バックアップからリストアして、<code translate="no">milvus_B</code> の files_B に格納します。</p></li>
</ol>
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
<li><p><strong>milvus-backup</strong>ツールがインストールされていることを確認してください。</p></li>
<li><p>Milvusオブジェクトストレージの設定に慣れていること。 詳細については、<a href="https://milvus.io/docs/deploy_s3.md">オブジェクトストレージを</a>参照してください。</p></li>
</ul>
<h2 id="Back-up-a-collection-from-milvusA" class="common-anchor-header">からのコレクションのバックアップ<code translate="no">milvus_A</code><button data-href="#Back-up-a-collection-from-milvusA" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Prepare-configuration" class="common-anchor-header">ステップ1: 設定の準備</h3><p>milvus-backupプロジェクトのディレクトリに移動し、configsというディレクトリを作成します：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-built_in">mkdir</span> configs
<span class="hljs-built_in">cd</span> configs
<button class="copy-code-btn"></button></code></pre>
<p>バックアップ設定ファイルbackup.yamlをダウンロードします：</p>
<pre><code translate="no" class="language-shell">wget <span class="hljs-attr">https</span>:<span class="hljs-comment">//raw.githubusercontent.com/zilliztech/milvus-backup/main/configs/backup.yaml</span>
<button class="copy-code-btn"></button></code></pre>
<p>ファイル構造は以下のようになります：</p>
<pre><code translate="no">├── configs
│   └── backup.yaml
├── milvus-backup
└── README.md
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Edit-configuration-file" class="common-anchor-header">ステップ2：設定ファイルの編集</h3><p>backup.yamlファイルを修正して、<code translate="no">milvus_A</code> に適切なコンフィギュレーションを設定します：</p>
<ul>
<li><p>接続設定</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
milvus:
  address: milvus_A
  port: <span class="hljs-number">19530</span>
  authorizationEnabled: false
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  tlsMode: <span class="hljs-number">0</span>
  user: <span class="hljs-string">&quot;root&quot;</span>
  password: <span class="hljs-string">&quot;Milvus&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">milvus.address</code>:<code translate="no">milvus_A</code> サーバーの IP アドレスまたはホスト名。</p></li>
<li><p><code translate="no">milvus.port</code>:MilvusサーバがリッスンしているTCPポート（デフォルト19530）。</p></li>
</ul></li>
<li><p>ストレージ設定（MinIO/S3設定）</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
minio:
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  storageType: <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  address: milvus_A <span class="hljs-comment"># Address of MinIO/S3</span>
  port: <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  accessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  secretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  useSSL: false <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  useIAM: false
  iamEndpoint: <span class="hljs-string">&quot;&quot;</span>
  
  bucketName: <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  rootPath: <span class="hljs-string">&quot;files_A&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>

  <span class="hljs-comment"># only for azure</span>
  backupAccessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  backupSecretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  
  backupBucketName: <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Bucket name to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
  backupRootPath: <span class="hljs-string">&quot;backup&quot;</span> <span class="hljs-comment"># Rootpath to store backup data. Backup data will store to backupBucketName/backupRootPath</span>
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><p><code translate="no">minio.bucketName</code>:<code translate="no">milvus_A</code> ストレージに使用するバケット名。この例では<code translate="no">bucket_A</code> とする。</p></li>
<li><p><code translate="no">minio.rootPath</code>:<code translate="no">milvus_A</code> のデータが保存されるバケット内のルートパス。この例では<code translate="no">files_A</code> とします。</p></li>
<li><p><code translate="no">minio.backupBucketName</code>:保存に使うバケツの名前。この例では、<code translate="no">milvus_A</code> と<code translate="no">milvus_B</code> がバケツを共有している。したがって、<code translate="no">bucket_A</code>.</p></li>
<li><p><code translate="no">minio.backupRootPath</code>:<code translate="no">milvus_B</code>この例では、<code translate="no">milvus_A</code> と異なるパスを使用するため、<code translate="no">backup</code> に設定します。</p></li>
</ul></li>
</ul>
<h3 id="Step-3-Create-backup" class="common-anchor-header">ステップ 3: バックアップの作成</h3><p><code translate="no">backup.yaml</code> が保存されたら、my_backup という名前のバックアップを作成する：</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -c coll -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>このコマンドは、コレクション<code translate="no">coll</code> のオブジェクトストレージにバックアップ<code translate="no">bucket_A/backup/my_backup</code> を作成します。</p>
<h2 id="Restore-the-backup-to-milvusB" class="common-anchor-header">バックアップを以下にリストアします。<code translate="no">milvus_B</code><button data-href="#Restore-the-backup-to-milvusB" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Step-1-Configure-restoration-settings" class="common-anchor-header">ステップ 1: リストア設定の構成</h3><p><code translate="no">milvus_B</code> <code translate="no">minio.bucketName</code> が に設定され、 が に設定され、2つのインスタンス間でストレージの場所が区別されるようにします。<code translate="no">bucket_A</code> <code translate="no">minio.rootPath</code> <code translate="no">files_B</code> </p>
<p>以下は設定例です：</p>
<pre><code translate="no" class="language-yaml">...
<span class="hljs-comment"># milvus proxy address, compatible to milvus.yaml</span>
milvus:
  address: milvus_B
  port: <span class="hljs-number">19530</span>
  authorizationEnabled: false
  <span class="hljs-comment"># tls mode values [0, 1, 2]</span>
  <span class="hljs-comment"># 0 is close, 1 is one-way authentication, 2 is two-way authentication.</span>
  tlsMode: <span class="hljs-number">0</span>
  user: <span class="hljs-string">&quot;root&quot;</span>
  password: <span class="hljs-string">&quot;Milvus&quot;</span>
  
<span class="hljs-comment"># Related configuration of minio, which is responsible for data persistence for Milvus.</span>
minio:
  <span class="hljs-comment"># cloudProvider: &quot;minio&quot; # deprecated use storageType instead</span>
  storageType: <span class="hljs-string">&quot;minio&quot;</span> <span class="hljs-comment"># support storage type: local, minio, s3, aws, gcp, ali(aliyun), azure, tc(tencent)</span>
  
  address: milvus_B <span class="hljs-comment"># Address of MinIO/S3</span>
  port: <span class="hljs-number">9000</span>   <span class="hljs-comment"># Port of MinIO/S3</span>
  accessKeyID: minioadmin  <span class="hljs-comment"># accessKeyID of MinIO/S3</span>
  secretAccessKey: minioadmin <span class="hljs-comment"># MinIO/S3 encryption string</span>
  useSSL: false <span class="hljs-comment"># Access to MinIO/S3 with SSL</span>
  useIAM: false
  iamEndpoint: <span class="hljs-string">&quot;&quot;</span>
  
  bucketName: <span class="hljs-string">&quot;bucket_A&quot;</span> <span class="hljs-comment"># Milvus Bucket name in MinIO/S3, make it the same as your milvus instance</span>
  rootPath: <span class="hljs-string">&quot;files_B&quot;</span> <span class="hljs-comment"># Milvus storage root path in MinIO/S3, make it the same as your milvus instance</span>
  ...
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Restore-backup" class="common-anchor-header">ステップ2：バックアップのリストア</h3><p>バックアップを<code translate="no">milvus_B</code> にリストアします：</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -c coll -n my_backup -s _bak
<button class="copy-code-btn"></button></code></pre>
<p>このコマンドは、<code translate="no">milvus_B</code> の<code translate="no">coll_bak</code> という名前の新しいコレクションにバックアップをリストアし、データは<code translate="no">bucket_A/files_B/insert_log/[ID of new collection]</code> に保存されます。</p>