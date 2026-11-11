---
id: milvus_backup_cli.md
summary: CLI を使用した Milvus Backup の使い方を学ぶ
title: コマンドを使用したデータのバックアップと復元Compatible with Milvus Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-Commands" class="common-anchor-header">コマンドを使用したデータのバックアップと復元<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-Commands" class="anchor-icon" translate="no">
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
    </button></h1><p>現在のワークフローについては、<a href="/docs/ja/milvus_backup_0_6_cli.md">CLIガイド</a>を参照するか、<a href="/docs/ja/milvus_backup_upgrade.md">0.5.xからアップグレードしてください</a>。サポートされているMilvusサーバーのバージョンについては、<a href="/docs/ja/milvus_backup_overview.md#Compatibility-matrix">互換性マトリックス</a>を確認してください。</p>
<p>Milvus Backupは、Milvusデータのセキュリティを確保するためのデータバックアップおよび復元機能を提供します。</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">Milvus Backup の入手<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
    </button></h2><p>コンパイル済みのバイナリをダウンロードするか、ソースからビルドすることができます。</p>
<p><a href="https://github.com/zilliztech/milvus-backup/releases/tag/v0.5.16">0.5.16リリース</a>から、お使いのオペレーティングシステムおよびアーキテクチャに対応したバイナリをダウンロードしてください。このページにある、対応する0.5.16の設定とサンプルを使用してください。</p>
<p>ソースから 0.5.16 をビルドするには、Go 1.25 以降をインストールし、以下のコマンドを実行してください:</p>
<pre><code translate="no" class="language-shell">git clone --branch v0.5.16 --depth 1 https://github.com/zilliztech/milvus-backup.git
cd milvus-backup
go build
<button class="copy-code-btn"></button></code></pre>
<h2 id="Prepare-configuration-file" class="common-anchor-header">設定ファイルの準備<button data-href="#Prepare-configuration-file" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/configs/backup.yaml">サンプル設定ファイルを</a>ダウンロードし、必要に応じて調整してください。</p>
<p>次に、ダウンロードまたはビルドした Milvus Backup バイナリと同じ場所にフォルダを作成し、そのフォルダ名を「<code translate="no">configs</code> 」とし、設定ファイルを「<code translate="no">configs</code> 」フォルダ内に配置してください。</p>
<p>フォルダ構造は、以下のようになります：</p>
<pre>
  <code translate="no">
  workspace
  ├── milvus-backup
  └── configs
      └── backup.yaml
  </code>
</pre>
<p>この例では、バックアップストレージとして MinIO を使用しています。<code translate="no">minio.*</code> を、アドレス、認証情報、バケット名、ルートパスを含め、お使いの Milvus ストレージおよびバックアップ先に合わせて設定してください。</p>
<div class="alert note">
<p>デフォルトの MinIO バケット名は、Milvus のインストール方法によって異なります。MinIO の設定を変更する際は、以下の表を参照してください。</p>
<table>
<thead>
<tr><th>フィールド</th><th>Docker Compose</th><th>Helm / Milvus Operator</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">bucketName</code></td><td>a-bucket</td><td>milvus-bucket</td></tr>
<tr><td><code translate="no">rootPath</code></td><td>ファイル</td><td>ファイル</td></tr>
</tbody>
</table>
</div>
<h2 id="Prepare-data" class="common-anchor-header">データの準備<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>デフォルトのポートで空のローカル Milvus インスタンスを実行している場合は、サンプル Python スクリプトを使用して、インスタンス内にデータを生成してください。必要に応じて、スクリプトを自由に変更して、ご自身のニーズに合わせて調整してください。</p>
<p><a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py">スクリプト</a>を入手してください。その後、スクリプトを実行してデータを生成します。Milvusの公式Python<a href="https://pypi.org/project/pymilvus/">SDKであるPyMilvusが</a>インストールされていることを確認してください。</p>
<pre><code translate="no" class="language-shell">mkdir -p example
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py -o example/prepare_data.py
python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>この手順は任意です。この手順をスキップする場合は、Milvusインスタンスにすでにデータが存在していることを確認してください。</p>
<h2 id="Back-up-data" class="common-anchor-header">データのバックアップ<button data-href="#Back-up-data" class="anchor-icon" translate="no">
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
    </button></h2><p>なお、Milvusインスタンスに対してMilvus Backupを実行しても、通常、インスタンスの稼働には影響しません。バックアップや復元中も、Milvusインスタンスは完全に機能します。</p>
<div class="tab-wrapper"></div>
<p>以下のコマンドを実行してバックアップを作成してください。</p>
<pre><code translate="no" class="language-shell">./milvus-backup create -n my_backup
<button class="copy-code-btn"></button></code></pre>
<p>コマンドの実行後、Minioの設定で指定されたバケット内でバックアップファイルを確認できます。具体的には、<strong>Minioコンソールまたはmcクライアント</strong>を使用してダウンロードできます。</p>
<p><a href="https://min.io/docs/minio/kubernetes/upstream/administration/minio-console.html">Minioコンソールから</a>ダウンロードするには、Minioコンソールにログインし、<code translate="no">minio.backupBucketName</code> で指定されたバケットを見つけ、そのバケット内のファイルを選択して、<strong>「ダウンロード」</strong>をクリックします。</p>
<p><a href="https://min.io/docs/minio/linux/reference/minio-mc.html#mc-install">mc クライアント</a>を使用する場合は、次のように操作してください：</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_"># </span><span class="language-bash">configure a Minio host</span>
mc alias set my_minio https://&lt;minio_endpoint&gt; &lt;accessKey&gt; &lt;secretKey&gt;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">List the available buckets</span>
mc ls my_minio
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Download a bucket recursively</span>
mc cp --recursive my_minio/&lt;your-bucket-path&gt; &lt;local_dir_path&gt;
<button class="copy-code-btn"></button></code></pre>
<p>これで、バックアップファイルを安全な場所に保存して将来の復元に備えるか、<a href="https://cloud.zilliz.com">Zilliz</a>Cloudにアップロードして、データを含む管理型ベクトルデータベースを作成できます。詳細については、「<a href="https://zilliz.com/doc/migrate_from_milvus-2x">MilvusからZilliz Cloudへの移行</a>」を参照してください。</p>
<h2 id="Restore-data" class="common-anchor-header">データの復元<button data-href="#Restore-data" class="anchor-icon" translate="no">
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
    </button></h2><div class="tab-wrapper"></div>
<p>`<code translate="no">restore</code> ` コマンドに `<code translate="no">-s</code> ` フラグを指定して実行すると、バックアップからデータを復元して新しいコレクションを作成できます:</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup -s _recover
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">-s</code> フラグを使用すると、作成する新しいコレクションのサフィックスを設定できます。上記のコマンドを実行すると、Milvusインスタンス内に「<strong>hello_milvus_recover</strong>」という名前の新しいコレクションが作成されます。</p>
<p>バックアップしたコレクションの名前を変更せずに復元したい場合は、バックアップから復元する前にそのコレクションを削除してください。これで、次のコマンドを実行して、「<a href="#Prepare-data">データの準備</a>」で生成されたデータをクリーンアップできます。</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>その後、次のコマンドを実行して、バックアップからデータを復元します。</p>
<pre><code translate="no" class="language-shell">./milvus-backup restore -n my_backup
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-restored-data" class="common-anchor-header">復元されたデータの確認<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>上記で作成された一時的なサンプルデータについては、アップストリームスクリプトが `<code translate="no">hello_milvus_recover</code> ` および `<code translate="no">hello_milvus2_recover</code>` をインデックス登録およびクエリ実行した後、<strong>復元された両方のコレクションを削除します</strong>。このスクリプトは、`<code translate="no">_recover</code>` コマンドで両方のサンプルコレクションを復元した後にのみ実行してください。ご自身のデータについては、このクリーンアップスクリプトを使用せずに、バックアップ時点のベースラインと比較してください。</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/verify_data.py -o example/verify_data.py
python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>なお、上記のスクリプトは、<code translate="no">restore</code> コマンドを<code translate="no">-s</code> フラグ付きで実行し、サフィックスが<code translate="no">_recover</code> に設定されていることを前提としています。必要に応じて、スクリプトを自由に変更してご自身の環境に合わせてください。</p>
