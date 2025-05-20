---
id: f2m.md
title: ファイスより
related_key: 'Faiss, migrate, import'
summary: FaissのデータをMilvusに移行する方法をご紹介します。
---
<h1 id="From-Faiss" class="common-anchor-header">Faissから<button data-href="#From-Faiss" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、FaissからMilvus 2.xへデータを移行するための包括的なステップバイステップのプロセスを提供します。このガイドに従うことで、Milvus 2.xの高度な機能と改善されたパフォーマンスを活用しながら、効率的にデータを移行することができます。</p>
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
<li>ソースFaiss</li>
<li>ターゲットMilvus: 2.x</li>
<li>インストールの詳細については、<a href="https://github.com/facebookresearch/faiss/blob/main/INSTALL.md">Faissのインストール</a>および<a href="https://milvus.io/docs/install_standalone-docker.md">Milvusのインストールを</a>参照してください。</li>
</ul></li>
<li><strong>必要なツール</strong><ul>
<li><a href="https://github.com/zilliztech/milvus-migration">Milvusマイグレーションツール</a>。インストールの詳細については、<a href="/docs/ja/v2.4.x/milvusdm_install.md">移行ツールのインストールを</a>参照してください。</li>
</ul></li>
</ul>
<h2 id="Configure-the-migration" class="common-anchor-header">マイグレーションの設定<button data-href="#Configure-the-migration" class="anchor-icon" translate="no">
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
    </button></h2><p>マイグレーション設定例ファイルを<code translate="no">migration.yaml</code> として保存し、実際の状況に応じて設定を変更してください。コンフィグファイルは任意のローカルディレクトリに自由に置くことができます。</p>
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    <span class="hljs-built_in">limit</span>: 2
    workMode: faiss    <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: 1024
    writer:
      bufferSize: 1024
loader:
  worker:
    <span class="hljs-built_in">limit</span>: 2
<span class="hljs-built_in">source</span>: <span class="hljs-comment"># configs for the source Faiss index.</span>
  mode: <span class="hljs-built_in">local</span>
  <span class="hljs-built_in">local</span>:
    faissFile: ./testfiles/faiss/faiss_ivf_flat.index

target: <span class="hljs-comment"># configs for the target Milvus collection.</span>
  create:
    collection:
      name: test1w
      shardsNums: 2
      dim: 256
      metricType: L2

  mode: remote
  remote:
    outputDir: testfiles/output/
    cloud: aws
    endpoint: 0.0.0.0:9000
    region: ap-southeast-1
    bucket: a-bucket
    ak: minioadmin
    sk: minioadmin
    useIAM: <span class="hljs-literal">false</span>
    useSSL: <span class="hljs-literal">false</span>
    checkBucket: <span class="hljs-literal">true</span>
  milvus2x:
    endpoint: localhost:19530
    username: xxxxx
    password: xxxxx

<button class="copy-code-btn"></button></code></pre>
<p>次の表は、コンフィグファイル例のパラメータを説明したものです。コンフィグファイルの全リストは<a href="https://github.com/zilliztech/milvus-migration/blob/main/README_FAISS.md#migrationyaml-reference">Milvus Migrationを</a>参照してください<a href="https://github.com/zilliztech/milvus-migration/blob/main/README_FAISS.md#migrationyaml-reference">：FaissからMilvus 2.xへの移行を</a>ご参照ください。</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.limit</code></td><td>ダンパースレッドの同時実行数。</td></tr>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>移行ジョブの動作モード。Faissインデックスから移行する場合はfaissに設定する。</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>各バッチでFaissから読み込むバッファサイズ。単位：KB。</td></tr>
<tr><td><code translate="no">dumper.worker.writer.bufferSize</code></td><td>各バッチでMilvusに書き込むバッファサイズ。単位はKB：KB。</td></tr>
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
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.mode</code></td><td>ソース・ファイルの読み取り元を指定します。有効な値：<br/>-<code translate="no">local</code>: ローカル・ディスクからファイルを読み込む。<br/>-<code translate="no">remote</code>: リモート・ストレージからファイルを読み込む。</td></tr>
<tr><td><code translate="no">source.local.faissFile</code></td><td>ソース・ファイルが置かれているディレクトリ・パス。例えば、<code translate="no">/db/faiss.index</code> 。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.create.collection.name</code></td><td>Milvus コレクションの名前。</td></tr>
<tr><td><code translate="no">target.create.collection.shardsNums</code></td><td>コレクションに作成されるシャードの数。シャードの詳細については、<a href="https://milvus.io/docs/glossary.md#Shard">用語を</a>参照してください。</td></tr>
<tr><td><code translate="no">target.create.collection.dim</code></td><td>ベクトルフィールドの次元。</td></tr>
<tr><td><code translate="no">target.create.collection.metricType</code></td><td>ベクトル間の類似性を測定するために使用されるメトリックタイプ。詳細は「<a href="https://milvus.io/docs/glossary.md#Metric-type">用語</a>」を参照。</td></tr>
<tr><td><code translate="no">target.mode</code></td><td>ダンプされたファイルの保存場所。有効な値：<br/>-<code translate="no">local</code>: ダンプされたファイルをローカルディスクに保存します。<br/>-<code translate="no">remote</code>: ダンプされたファイルをオブジェクトストレージに保存します。</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>クラウドストレージバケット内の出力ディレクトリパス。</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>クラウドストレージサービスプロバイダ。値の例：<code translate="no">aws</code> <code translate="no">gcp</code>,<code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.endpoint</code></td><td>Milvus 2.x ストレージのエンドポイント。</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>クラウドストレージのリージョン。ローカルのMinIOを使用する場合は任意の値を指定できます。</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>データを保存するバケット名。この値はMilvus 2.xの設定と同じでなければなりません。詳細は<a href="https://milvus.io/docs/configure_minio.md#miniobucketName">システム設定を</a>参照してください。</td></tr>
<tr><td><code translate="no">target.remote.ak</code></td><td>Milvus 2.xストレージのアクセスキー。</td></tr>
<tr><td><code translate="no">target.remote.sk</code></td><td>Milvus 2.x ストレージのシークレットキー。</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>接続にIAM Roleを使用するかどうか。</td></tr>
<tr><td><code translate="no">target.remote.useSSL</code></td><td>Milvus2.xへの接続時にSSLを有効にするかどうか。</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>指定したバケットがオブジェクトストレージに存在するかどうかを確認するかどうか。</td></tr>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>接続先Milvusサーバのアドレス</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Milvus 2.xサーバのユーザ名。このパラメータはMilvusサーバでユーザ認証が有効になっている場合に必要です。詳細については、「<a href="https://milvus.io/docs/authenticate.md">認証の有効化</a>」を参照してください。</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>Milvus 2.xサーバのパスワード。このパラメータは、Milvus サーバでユーザ認証が有効になっている場合に必要です。詳細については、「<a href="https://milvus.io/docs/authenticate.md">認証を有効にする</a>」を参照してください。</td></tr>
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
<p>上記のコマンドは、FaissインデックスデータをNumPyファイルに変換し、<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/utility/do_bulk_insert.md">bulkInsert</a>オペレーションを使ってターゲットバケットにデータを書き込む。</p></li>
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
