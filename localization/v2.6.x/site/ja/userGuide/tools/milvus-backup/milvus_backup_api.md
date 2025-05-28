---
id: milvus_backup_api.md
summary: APIを利用したMilvus Backupの利用方法をご紹介します。
title: APIを利用したデータのバックアップとリストア
---
<h1 id="Back-up-and-Restore-Data-Using-APIs" class="common-anchor-header">APIを利用したデータのバックアップとリストア<button data-href="#Back-up-and-Restore-Data-Using-APIs" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvusバックアップは、Milvusデータのセキュリティを確保するために、データのバックアップとリストア機能を提供します。</p>
<h2 id="Obtain-Milvus-Backup" class="common-anchor-header">Milvus Backupの入手方法<button data-href="#Obtain-Milvus-Backup" class="anchor-icon" translate="no">
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
<p>コンパイル済みのバイナリをダウンロードするには、<a href="https://github.com/zilliztech/milvus-backup/releases">リリース</a>ページにアクセスしてください。常に<strong>最新版と</strong>マークされたリリースのバイナリを使用することを忘れないでください。</p>
<p>ソースからコンパイルするには、以下のようにします：</p>
<pre><code translate="no" class="language-shell">git clone git@github.com:zilliztech/milvus-backup.git
go get
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
    </button></h2><p><a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/master/configs/backup.yaml">サンプルの設定ファイルを</a>ダウンロードし、あなたのニーズに合うように調整してください。</p>
<p>次に、ダウンロードまたはビルドしたMilvus Backupバイナリと一緒にフォルダを作成し、フォルダ名を<code translate="no">configs</code> とし、設定ファイルを<code translate="no">configs</code> フォルダの中に置きます。</p>
<p>フォルダ構造は以下のようになっているはずです：</p>
<pre>
  <code translate="no">
  workspace
  ├── milvus-backup
  └── configs
      └── backup.yaml
  </code>
</pre>
<p>Milvus Backup はローカルパスにデータをバックアップできないため、設定ファイルを作成する際は Minio の設定が正しいことを確認してください。</p>
<div class="alert note">
<p>デフォルトのMinioバケットの名前は、Milvusのインストール方法によって異なります。Minioの設定を変更する場合は、以下の表を参照してください。</p>
<table>
<thead>
<tr><th>フィールド</th><th>Docker Compose</th><th>Helm / Milvus オペレータ</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">bucketName</code></td><td>バケット</td><td>milvus-bucket</td></tr>
<tr><td><code translate="no">rootPath</code></td><td>ファイル</td><td>ファイル</td></tr>
</tbody>
</table>
</div>
<h2 id="Start-up-the-API-server" class="common-anchor-header">APIサーバの起動<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>次に、APIサーバーを以下のように起動する：</p>
<pre><code translate="no" class="language-shell">./milvus-backup server
<button class="copy-code-btn"></button></code></pre>
<p>APIサーバーはデフォルトで8080番ポートをリッスンします。これを変更するには、<code translate="no">-p</code> フラグを指定して実行する。ポート443をリッスンするAPIサーバを起動するには、以下のようにする：</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 443
<button class="copy-code-btn"></button></code></pre>
<p>Swagger UIにはhttp://localhost。<port>/api/v1/docs/index.html。</p>
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
    </button></h2><p>空のローカルMilvusインスタンスをデフォルトのポート19530でリッスンしている場合、サンプルのPythonスクリプトを使用して、インスタンスにいくつかのデータを生成してください。スクリプトは必要に応じて自由に変更してください。</p>
<p><a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/main/example/prepare_data.py">スクリプトを</a>入手する。スクリプトを実行してデータを生成します。Milvusの公式Python SDKである<a href="https://pypi.org/project/pymilvus/">PyMilvusが</a>インストールされていることを確認してください。</p>
<pre><code translate="no" class="language-shell">python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>このステップはオプションです。省略する場合は、Milvusインスタンスに既にデータがあることを確認してください。</p>
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
    </button></h2><div class="tab-wrapper"></div>
<p>通常、Milvusインスタンスに対してMilvus Backupを実行しても、インスタンスの動作に影響はありません。バックアップまたはリストア中もMilvusインスタンスは完全に機能します。</p>
<p>以下のコマンドを実行してバックアップを作成します。必要に応じて<code translate="no">collection_names</code> と<code translate="no">backup_name</code> を変更してください。</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/create&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
  &quot;async&quot;: true,
  &quot;backup_name&quot;: &quot;my_backup&quot;,
  &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ]
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>コマンドを実行すると、以下のようにMinioの設定で指定したバケット内のバックアップを一覧することができます：</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/list&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>また、バックアップファイルは以下のようにダウンロードします：</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_backup?backup_id=&lt;test_backup_id&gt;&amp;backup_name=my_backup&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>上記のコマンドを実行しながら、<code translate="no">backup_id</code> と<code translate="no">backup_name</code> を list API が返すものに変更します。</p>
<p>これで、バックアップファイルを安全な場所に保存して、将来復元することもできますし、<a href="https://cloud.zilliz.com">Zilliz Cloudに</a>アップロードして、データ入りのマネージドベクターデータベースを作成することもできます。詳しくは<a href="https://zilliz.com/doc/migrate_from_milvus-2x">MilvusからZilliz Cloudへの移行を</a>ご参照ください。</p>
<h2 id="Restore-data" class="common-anchor-header">データのリストア<button data-href="#Restore-data" class="anchor-icon" translate="no">
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
<p>リストアAPIコマンドに<code translate="no">collection_suffix</code> オプションを付けて呼び出すと、バックアップからデータをリストアして新しいコレクションを作成できます。必要に応じて<code translate="no">collection_names</code> と<code translate="no">backup_name</code> を変更します。</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;_recover&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">collection_suffix</code> オプションで、作成する新しいコレクションのサフィックスを設定できます。上記のコマンドを実行すると、Milvusインスタンスに<strong>hello_milvus_recoverという</strong>新しいコレクションが作成されます。</p>
<p>バックアップしたコレクションを名前を変更せずにリストアする場合は、バックアップからリストアする前にコレクションを削除してください。以下のコマンドを実行することで、<a href="#Prepare-data">Prepare dataで</a>生成されたデータをクリーンアップできます。</p>
<pre><code translate="no" class="language-shell">python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>次に、以下のコマンドを実行して、バックアップからデータをリストアします。</p>
<pre><code translate="no" class="language-shell">curl --location --request POST &#x27;http://localhost:8080/api/v1/restore&#x27; \
--header &#x27;Content-Type: application/json&#x27; \
--data-raw &#x27;{
    &quot;async&quot;: true,
    &quot;collection_names&quot;: [
    &quot;hello_milvus&quot;
  ],
    &quot;collection_suffix&quot;: &quot;&quot;,
    &quot;backup_name&quot;:&quot;my_backup&quot;
}&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>リストアするデータのサイズによっては、リストア処理に時間がかかることがあります。そのため、すべてのリストアタスクは非同期で実行されます。実行することでリストアタスクのステータスを確認できます：</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_restore?id=&lt;test_restore_id&gt;&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">test_restore_id</code> をリストアAPIによってリストアされたものに変更することを忘れないでください。</p>
<h2 id="Verify-restored-data" class="common-anchor-header">リストアされたデータの検証<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>リストアが完了したら、以下のようにリストアされたコレクションにインデックスを付けることで、リストアされたデータを検証できます：</p>
<pre><code translate="no" class="language-shell">python example/verify_data.py
<button class="copy-code-btn"></button></code></pre>
<p>上記のスクリプトは、<code translate="no">-s</code> フラグを付けて<code translate="no">restore</code> コマンドを実行し、サフィックスが<code translate="no">-recover</code> に設定されていることを前提としています。必要に応じて、スクリプトに必要な変更を加えてください。</p>
