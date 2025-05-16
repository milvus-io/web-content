---
id: from-m2x.md
summary: このガイドでは、Milvus 2.3.xからMilvus 2.3.xまたはそれ以上へのデータ移行のための包括的なステップバイステップのプロセスを提供します。
title: Milvus 2.3.xより
---
<h1 id="From-Milvus-23x" class="common-anchor-header">Milvus 2.3.x から<button data-href="#From-Milvus-23x" class="anchor-icon" translate="no">
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
    </button></h1><p>このガイドでは、Milvus 2.3.xからMilvus 2.3.x以上へデータを移行するための包括的なステップバイステップのプロセスを提供します。</p>
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
<li>ソースMilvus: 2.3.0+ (本ツールはイテレータを使用してソースコレクションデータを取得するため、ソースMilvusのバージョンは2.3.0以上である必要があります)</li>
<li>ターゲットMilvus: 2.3.0+.</li>
</ul></li>
<li><strong>必要なツール</strong><ul>
<li><a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>ツール。インストールの詳細については、<a href="/docs/ja/v2.4.x/milvusdm_install.md">マイグレーションツールのインストールを</a>参照してください。</li>
</ul></li>
<li><strong>データの準備</strong><ul>
<li>移行元のMilvusコレクションがロードされ、データエクスポートの準備ができていることを確認する。</li>
<li>ターゲットMilvusにソースコレクションに対応するコレクションがない場合、<a href="https://github.com/zilliztech/milvus-migration">milvus-migration</a>toolが自動的に作成します。マイグレーション後、ターゲットコレクションにはインデックスが作成されないので、その後手動でインデックスを作成する必要があることに注意してください。</li>
</ul></li>
</ul>
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
    </button></h2><p>マイグレーション設定ファイルの例を<code translate="no">migration.yaml</code> として保存し、実際の条件に基づいて設定を変更します。設定ファイルを任意のローカルディレクトリに置くことは自由です。</p>
<pre><code translate="no" class="language-yaml">dumper:
  worker:
    workMode: milvus2x
    reader:
      bufferSize: 500

meta:
  mode: config
  version: 2.3.0
  collection: src_table_name

<span class="hljs-built_in">source</span>:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx

target:
  milvus2x:
    endpoint: {milvus2x_domain}:{milvus2x_port}
    username: xxxx
    password: xxxxx
<button class="copy-code-btn"></button></code></pre>
<p>次の表は、例のconfigファイルのパラメータを説明したものです。詳細は<a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Milvus Migrationを</a>参照してください<a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">：Milvus2.xからMilvus2.xへの移行</a>」を参照してください。</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>移行ジョブの動作モード。Milvus 2.x からマイグレーションする場合は milvus2x に設定します。</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>各バッチでMilvus 2.xから読み込むバッファサイズ。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>メタ・ファイルの読み込み元を指定します。configに設定すると、このmigration.yamlファイルからメタ設定を取得できることを示します。</td></tr>
<tr><td><code translate="no">meta.version</code></td><td>ソースMilvusバージョン。2.3.0以上に設定します。</td></tr>
<tr><td><code translate="no">meta.collection</code></td><td>ソース コレクション名。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.milvus2x.endpoint</code></td><td>ソースMilvusサーバのアドレス。</td></tr>
<tr><td><code translate="no">source.milvus2x.username</code></td><td>ソースMilvusサーバのユーザ名。このパラメータは、Milvusサーバでユーザ認証が有効になっている場合に必要です。詳細については、<a href="/docs/ja/v2.4.x/authenticate.md">認証の有効</a>化を参照してください。</td></tr>
<tr><td><code translate="no">source.milvus2x.password</code></td><td>ソース Milvus サーバのパスワード。このパラメータはMilvusサーバでユーザ認証が有効になっている場合に必要です。詳細については、「<a href="/docs/ja/v2.4.x/authenticate.md">認証の有効化</a>」を参照してください。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>ターゲットMilvusサーバのアドレス.</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>ターゲット Milvus サーバのユーザ名。このパラメータはMilvusサーバでユーザ認証が有効になっている場合に必要です。詳細については、<a href="/docs/ja/v2.4.x/authenticate.md">認証の有効</a>化を参照してください。</td></tr>
<tr><td><code translate="no">target.milvus2x.password</code></td><td>ターゲットMilvusサーバのパスワード。このパラメータはMilvusサーバでユーザ認証が有効になっている場合に必要です。詳細については、「<a href="/docs/ja/v2.4.x/authenticate.md">認証の有効化</a>」を参照してください。</td></tr>
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
    </button></h2><p>移行タスクを開始するには、CLIを使用するか、APIリクエストを行うかの2つのオプションがあります。ニーズに合わせて選択してください。</p>
<h3 id="Option-1-Using-CLI" class="common-anchor-header">オプション1: CLIを使用する</h3><p>次のコマンドで移行タスクを開始します。<code translate="no">{YourConfigFilePath}</code> を、設定ファイル<code translate="no">migration.yaml</code> が存在するローカルディレクトリに置き換えます。</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>ログを監視して進行状況を確認します。移行に成功したログには、次のようなエントリが含まれているはずです：</p>
<pre><code translate="no" class="language-bash">[INFO] [migration/milvus2x_starter.go:79] [<span class="hljs-string">&quot;=================&gt;JobProcess!&quot;</span>] [Percent=100]
[INFO] [migration/milvus2x_starter.go:27] [<span class="hljs-string">&quot;[Starter] migration Milvus2x to Milvus2x finish!!!&quot;</span>] [Cost=94.877717375]
[INFO] [starter/starter.go:109] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=94.878243583]
<button class="copy-code-btn"></button></code></pre>
<h3 id="Option-2-Making-API-requests" class="common-anchor-header">オプション2：APIリクエストを行う</h3><p>Restful APIを使ってマイグレーションを実行することもできる。でAPIサーバーを起動する：</p>
<pre><code translate="no" class="language-bash">./milvus-migration server run -p 8080
<button class="copy-code-btn"></button></code></pre>
<p>サーバーが正常に起動したら、<code translate="no">migration.yaml</code> ファイルをプロジェクトの<code translate="no">configs/</code> ディレクトリに配置し、マイグレーションを開始します：</p>
<pre><code translate="no" class="language-bash">curl -XPOST http://localhost:8080/api/v1/start
<button class="copy-code-btn"></button></code></pre>
<h2 id="Verify-the-result" class="common-anchor-header">結果を検証する<button data-href="#Verify-the-result" class="anchor-icon" translate="no">
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
    </button></h2><p>移行タスクが完了したら、Attu を使用して移行したエンティティの数を表示します。さらに、Attuでインデックスを作成し、コレクションをロードすることができます。詳細については、<a href="https://github.com/zilliztech/attu">Attu</a>および<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a> を参照してください。</p>
<h2 id="Additional-configuration-options" class="common-anchor-header">追加設定オプション<button data-href="#Additional-configuration-options" class="anchor-icon" translate="no">
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
    </button></h2><p>上記の基本設定に加えて、特定の要件に基づいて追加設定を追加することもできます。</p>
<ul>
<li><p><strong>選択的フィールド移行</strong>：コレクション内のすべてのフィールドではなく、特定のフィールドのみを移行する必要がある場合は、<code translate="no">migration.yaml</code> ファイルの<code translate="no">meta</code> セクションで移行するフィールドを指定します。</p>
<pre><code translate="no" class="language-yaml">meta:
  fields:
    - name: <span class="hljs-built_in">id</span>
    - name: title_vector
    - name: reading_time
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>カスタム・ターゲット・コレクション</strong>：ターゲットコレクションのプロパティをカスタマイズするには、<code translate="no">migration.yaml</code> ファイルの<code translate="no">meta</code> セクションに関連する構成を追加します。</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">meta</span>:
  <span class="hljs-attr">milvus</span>:
    <span class="hljs-attr">collection</span>: target_collection_name
    <span class="hljs-attr">shardNum</span>: <span class="hljs-number">2</span>
    <span class="hljs-attr">closeDynamicField</span>: <span class="hljs-literal">false</span>
    <span class="hljs-attr">consistencyLevel</span>: <span class="hljs-title class_">Customized</span>
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>詳細については、<a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">Milvus Migrationを</a>参照してください<a href="https://github.com/zilliztech/milvus-migration/blob/main/README_2X.md#milvus-migration-milvus2x-to-milvus2x">：Milvus2.xからMilvus2.xへの移行を</a>参照してください。</p>
