---
id: milvus_backup_api.md
summary: API を使用した Milvus Backup の利用方法について
title: API を使用したデータのバックアップと復元Compatible with Milvus Backup 0.5.x
beta: Milvus Backup 0.5.x
---
<h1 id="Back-up-and-Restore-Data-Using-APIs" class="common-anchor-header">API を使用したデータのバックアップと復元<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus Backup 0.5.x</span><button data-href="#Back-up-and-Restore-Data-Using-APIs" class="anchor-icon" translate="no">
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
    </button></h1><p>現在のワークフローについては、<a href="/docs/ja/milvus_backup_0_6_api.md">HTTP API ガイドを</a>参照するか、<a href="/docs/ja/milvus_backup_upgrade.md">0.5.x からアップグレードしてください</a>。サポートされている Milvus サーバーのバージョンについては、<a href="/docs/ja/milvus_backup_overview.md#Compatibility-matrix">互換性マトリックス</a>を確認してください。</p>
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
<h2 id="Start-up-the-API-server" class="common-anchor-header">APIサーバーを起動する<button data-href="#Start-up-the-API-server" class="anchor-icon" translate="no">
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
    </button></h2><p>その後、次のようにしてAPIサーバーを起動できます:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server
<button class="copy-code-btn"></button></code></pre>
<p>APIサーバーはデフォルトでポート8080をリスニングします。<code translate="no">-p</code> フラグを指定して実行することで、これを変更できます。APIサーバーをポート443でリスニングさせるには、次のようにします:</p>
<pre><code translate="no" class="language-shell">./milvus-backup server -p 443
<button class="copy-code-btn"></button></code></pre>
<p>http://localhost を使用して Swagger UI にアクセスできます:<port>/api/v1/docs/index.html。</p>
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
    </button></h2><p>デフォルトのポート 19530 でリスニングしている空のローカル Milvus インスタンスを実行している場合は、サンプル Python スクリプトを使用して、インスタンス内にデータを生成してください。必要に応じて、スクリプトを自由に変更して、ご自身のニーズに合わせて調整してください。</p>
<p><a href="https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py">スクリプト</a>を入手してください。その後、スクリプトを実行してデータを生成します。Milvusの公式Python<a href="https://pypi.org/project/pymilvus/">SDKであるPyMilvusが</a>インストールされていることを確認してください。</p>
<pre><code translate="no" class="language-shell">mkdir -p example
curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/prepare_data.py -o example/prepare_data.py
python example/prepare_data.py
<button class="copy-code-btn"></button></code></pre>
<p>この手順は任意です。スキップする場合は、Milvusインスタンスにすでにデータが存在していることを確認してください。</p>
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
<p>なお、Milvusインスタンスに対してMilvus Backupを実行しても、通常、インスタンスの稼働には影響しません。バックアップや復元中も、Milvusインスタンスは完全に機能します。</p>
<p>以下のコマンドを実行してバックアップを作成してください。必要に応じて、<code translate="no">collection_names</code> および<code translate="no">backup_name</code> を変更してください。</p>
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
<p>作成リクエストは非同期です。返された<code translate="no">requestId</code> を<code translate="no">backup_id</code> として<code translate="no">get_backup</code> をポーリングし、<code translate="no">data.state_code</code> が<code translate="no">2</code> になるのを待ってから復元を行ってください。</p>
<p>Minioの設定で指定されたバケット内のバックアップは、次のように一覧表示できます：</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/list&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p>バックアップのメタデータを次のように取得します：</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_backup?backup_id=&lt;test_backup_id&gt;&amp;backup_name=my_backup&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">backup_id</code> および<code translate="no">backup_name</code> を、ご自身のバックアップの値に置き換えてください。このエンドポイントは、バックアップファイルではなく、JSON形式のメタデータを返します。アーカイブする際は、オブジェクトストレージからバックアップディレクトリ全体をコピーしてください。</p>
<p>これで、バックアップファイルを安全な場所に保存して将来復元できるようにするか、<a href="https://cloud.zilliz.com">Zilliz Cloudに</a>アップロードして、データを含む管理型ベクトルデータベースを作成できます。詳細については、「<a href="https://zilliz.com/doc/migrate_from_milvus-2x">MilvusからZilliz Cloudへの移行</a>」を参照してください。</p>
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
<p><code translate="no">collection_suffix</code> オプションを指定して復元APIコマンドを呼び出すことで、バックアップからデータを復元し、新しいコレクションを作成できます。必要に応じて、<code translate="no">collection_names</code> および<code translate="no">backup_name</code> を変更してください。</p>
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
<p><code translate="no">collection_suffix</code> オプションを使用すると、作成する新しいコレクションのサフィックスを設定できます。上記のコマンドを実行すると、Milvusインスタンス内に「<strong>hello_milvus_recover</strong>」という名前の新しいコレクションが作成されます。</p>
<p>バックアップしたコレクションの名前を変更せずに復元したい場合は、バックアップから復元する前にそのコレクションを削除してください。次のコマンドを実行して、「<a href="#Prepare-data">データの準備</a>」で生成されたデータをクリーンアップできます。</p>
<pre><code translate="no" class="language-shell">curl -fL https://raw.githubusercontent.com/zilliztech/milvus-backup/v0.5.16/example/clean_data.py -o example/clean_data.py
python example/clean_data.py
<button class="copy-code-btn"></button></code></pre>
<p>その後、次のコマンドを実行して、バックアップからデータを復元します。</p>
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
<p>復元処理は、復元するデータのサイズによっては時間がかかる場合があります。そのため、上記の例では `<code translate="no">&quot;async&quot;: true</code>` を使用して非同期実行を指定しています。復元タスクのステータスは、次のコマンドを実行して確認できます。</p>
<pre><code translate="no" class="language-shell">curl --location --request GET &#x27;http://localhost:8080/api/v1/get_restore?id=&lt;test_restore_id&gt;&#x27; \
--header &#x27;Content-Type: application/json&#x27;
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">test_restore_id</code> を、復元 API から返された<code translate="no">data.id</code> に変更することを忘れないでください。データの検証を行う前に、<code translate="no">data.state_code</code> が<code translate="no">2</code> になるまで待機してください。<code translate="no">3</code> は失敗を、<code translate="no">4</code> はタイムアウトを示します。</p>
<h2 id="Verify-restored-data" class="common-anchor-header">復元されたデータの検証<button data-href="#Verify-restored-data" class="anchor-icon" translate="no">
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
    </button></h2><p>タスクが成功したら、<code translate="no">hello_milvus_recover</code> が存在することを確認してください。適切なインデックスを作成し、コレクションを読み込み、エンティティ数、スカラー値およびベクトル値、検索結果を、バックアップ前に取得したソースデータと比較してください。元の名前での復元を行う場合は、代わりに<code translate="no">hello_milvus</code> を使用してください。</p>
<p>CLI ガイドでリンクされているサンプル `<code translate="no">verify_data.py</code> ` は、2 つの復元済みコレクションを想定しており、最後にそれらを削除します。これは、`<code translate="no">hello_milvus</code>` のみを選択するこの API の例には適していません。</p>
