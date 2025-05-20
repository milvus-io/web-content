---
id: m2m.md
summary: >-
  このガイドでは、Milvus 1.x（0.9.x以上を含む）からMilvus
  2.xへデータを移行するための包括的なステップバイステップのプロセスを提供します。
title: Milvus 1.xより
---
<h1 id="From-Milvus-1x" class="common-anchor-header">Milvus 1.x から<button data-href="#From-Milvus-1x" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、Milvus 1.x（0.9.x以降を含む）からMilvus 2.xへデータを移行するための包括的なステップバイステップのプロセスを提供します。このガイドに従うことで、Milvus 2.xの高度な機能と改善されたパフォーマンスを活用しながら、効率的にデータを移行することができます。</p>
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
<li><strong>ソフトウェアのバージョン</strong><ul>
<li>ソースMilvus: 0.9.x から 1.x</li>
<li>ターゲットMilvus: 2.x</li>
</ul></li>
<li><strong>必要なツール</strong><ul>
<li><a href="https://github.com/zilliztech/milvus-migration">Milvusマイグレーションツール</a>。インストールの詳細については、<a href="/docs/ja/v2.4.x/milvusdm_install.md">マイグレーションツールのインストールを</a>参照してください。</li>
</ul></li>
</ul>
<h2 id="Export-metadata-of-the-source-Milvus-installation" class="common-anchor-header">移行元Milvusのメタデータのエクスポート<button data-href="#Export-metadata-of-the-source-Milvus-installation" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 0.9.xから1.xへの移行データを準備するため、移行元のMilvusを停止するか、少なくともDML操作を停止してください。</p>
<ol>
<li><p>移行元Milvusのメタデータを<code translate="no">meta.json</code> にエクスポートします。</p>
<ul>
<li>バックエンドにMySQLを使用している場合、以下のコマンドを実行してください。</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -m <span class="hljs-string">&quot;user:password@tcp(adderss)/milvus?charset=utf8mb4&amp;parseTime=True&amp;loc=Local&quot;</span> -o outputDir
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>SQLiteをバックエンドとして使用している場合は、以下を実行してください。</li>
</ul>
<pre><code translate="no" class="language-bash">./milvus-migration <span class="hljs-built_in">export</span> -s /milvus/db/meta.sqlite -o outputDir
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Milvusの<code translate="no">tables</code> フォルダをコピーし、<code translate="no">meta.json</code> と<code translate="no">tables</code> フォルダの両方を空のフォルダに移動します。</p>
<p>この手順が完了すると、空のフォルダの構造は以下のようになります：</p>
<pre><code translate="no">migration_data
├── meta.json
└── tables
<button class="copy-code-btn"></button></code></pre></li>
<li><p>前のステップで準備したフォルダをS3ブロックストレージバケットにアップロードするか、次のセクションでこのローカルフォルダを直接使用します。</p></li>
</ol>
<h2 id="Configure-the-migration-file" class="common-anchor-header">マイグレーションファイルの設定<button data-href="#Configure-the-migration-file" class="anchor-icon" translate="no">
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
    </button></h2><p>マイグレーション設定ファイルの例を<code translate="no">migration.yaml</code> として保存し、実際の条件に基づいて設定を変更します。コンフィグファイルは任意のローカルディレクトリに自由に置くことができます。</p>
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: milvus1x
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 16
meta:
  mode: <span class="hljs-built_in">local</span>
  localFile: /outputDir/test/meta.json
<span class="hljs-built_in">source</span>:
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    tablesDir: /db/tables/
target:
  mode: remote
  remote:
    outputDir: <span class="hljs-string">&quot;migration/test/xx&quot;</span>
    ak: xxxx
    sk: xxxx
    cloud: aws
    region: us-west-2
    bucket: xxxxx
    useIAM: <span class="hljs-literal">true</span>
    checkBucket: <span class="hljs-literal">false</span>
  milvus2x:
    endpoint: <span class="hljs-string">&quot;{yourMilvus2_xServerAddress}:{port}&quot;</span>
    username: xxxx
    password: xxxx
<button class="copy-code-btn"></button></code></pre>
<p>次の表は、コンフィグファイル例のパラメータを説明したものです。コンフィグファイルの全リストは<a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#migrationyaml-reference">Milvus Migration</a> を参照してください<a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#migrationyaml-reference">：Milvus1.xからMilvus2.xへの移行を</a>ご参照ください。</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>ダンパースレッドの同時実行数。</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>移行ジョブの動作モード。Milvus 1.x からマイグレーションする場合は<code translate="no">milvus1x</code> に設定します。</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>各バッチでMilvus 1.xから読み込むバッファサイズ。単位：KB。</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>各バッチでMilvus 2.xに書き込むバッファサイズ。単位: KBKB。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">loader</code></p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">loader.worker.limit</code></td><td>ローダースレッドの同時実行数。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>メタ・ファイルmeta.jsonの読み込み元を指定する。有効な値：<code translate="no">local</code> <code translate="no">remote</code>,<code translate="no">mysql</code>,<code translate="no">sqlite</code>.</td></tr>
<tr><td><code translate="no">meta.localFile</code></td><td><code translate="no">meta.json</code> ファイルが存在するローカル・ディレクトリ・パス。このコンフィグは、<code translate="no">meta.mode</code> が<code translate="no">local</code> に設定されている場合にのみ使用されます。その他のmetaコンフィグについては、<a href="https://github.com/zilliztech/milvus-migration/blob/main/README_1X.md#meta">README_1Xを</a>参照してください。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>ソース・ファイルの読み込み元を指定します。有効な値：<br/>-<code translate="no">local</code>: ローカル・ディスクからファイルを読み込む。<br/>-<code translate="no">remote</code>: リモート・ストレージからファイルを読み込む。</td></tr>
<tr><td><code translate="no">source.local.tablesDir</code></td><td>ソース・ファイルが置かれているディレクトリ・パス。例えば、<code translate="no">/db/tables/</code> 。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.mode</code></td><td>ダンプ・ファイルの格納場所。有効な値：<br/>-<code translate="no">local</code>: ダンプされたファイルをローカルディスクに保存します。<br/>-<code translate="no">remote</code>: ダンプされたファイルをオブジェクトストレージに保存します。</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>クラウドストレージバケット内の出力ディレクトリパス.</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>Milvus 2.x ストレージのアクセスキー.</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>Milvus 2.xストレージのシークレットキー</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>クラウドストレージサービスプロバイダ.値の例：<code translate="no">aws</code> <code translate="no">gcp</code>,<code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>クラウドストレージのリージョン。ローカルのMinIOを使用する場合は任意の値を指定できます。</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>データを保存するバケット名。値はMilvus 2.xの設定と同じでなければなりません。詳細は<a href="https://milvus.io/docs/configure_minio.md#miniobucketName">システム設定を</a>参照してください。</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>接続にIAM Roleを使用するかどうか。</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>指定したバケットがオブジェクトストレージに存在するかチェックするかどうか。</td></tr>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>接続先Milvusサーバのアドレス</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Milvus2.xサーバのユーザ名。このパラメータは、Milvus サーバでユーザ認証が有効になっている場合に必要です。詳細については、「<a href="https://milvus.io/docs/authenticate.md">認証の有効化</a>」を参照してください。</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>Milvus 2.xサーバのパスワード。このパラメータは、Milvus サーバでユーザ認証が有効になっている場合に必要です。詳細については、「<a href="https://milvus.io/docs/authenticate.md">認証の有効化</a>」を参照してください。</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="Start-the-migration-task" class="common-anchor-header">移行タスクの開始<button data-href="#Start-the-migration-task" class="anchor-icon" translate="no">
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
<li><p>以下のコマンドで移行タスクを開始します。<code translate="no">{YourConfigFilePath}</code> は設定ファイル<code translate="no">migration.yaml</code> が存在するローカルディレクトリに置き換えてください。</p>
<pre><code translate="no" class="language-bash">./milvus-migration  dump  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>上記のコマンドはMilvus 1.xのソースデータをNumPyファイルに変換し、<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">bulkInsert</a>オペレーションを使ってターゲットバケットにデータを書き込む。</p></li>
<li><p>NumPyファイルが生成されたら、以下のコマンドでこれらのファイルをMilvus 2.xにインポートする。<code translate="no">{YourConfigFilePath}</code> は設定ファイル<code translate="no">migration.yaml</code> が存在するローカルディレクトリに置き換えてください。</p>
<pre><code translate="no" class="language-bash">./milvus-migration  load  --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Verify-the-result" class="common-anchor-header">結果の確認<button data-href="#Verify-the-result" class="anchor-icon" translate="no">
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
    </button></h2><p>マイグレーションタスクが実行されると、APIコールやAttuを使用してマイグレーションされたエンティティ数を確認することができます。詳細については、<a href="https://github.com/zilliztech/attu">Attu</a>および<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a> を参照してください。</p>
