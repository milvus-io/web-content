---
id: es2m.md
summary: このガイドでは、ElasticsearchからMilvus 2.xへデータを移行するための包括的なステップバイステップのプロセスを提供します。
title: Elasticsearchから
---
<h1 id="From-Elasticsearch" class="common-anchor-header">Elasticsearch から<button data-href="#From-Elasticsearch" class="anchor-icon" translate="no">
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
    </button></h1><p>本ガイドでは、ElasticsearchからMilvus 2.xへデータを移行するための包括的なステップバイステップのプロセスを提供します。本ガイドに従うことで、Milvus 2.xの高度な機能と改善されたパフォーマンスを活用しながら、効率的にデータを移行することができます。</p>
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
<li>ソース Elasticsearch：7.xまたは8.x</li>
<li>ターゲットMilvus: 2.x</li>
<li>インストールの詳細については、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html">Elasticsearchのインストールと</a> <a href="https://milvus.io/docs/install_standalone-docker.md">Milvusのインストールを</a>ご参照ください。</li>
</ul></li>
<li><strong>必要なツール</strong><ul>
<li><a href="https://github.com/zilliztech/milvus-migration">Milvus-migration</a>ツール。インストールの詳細については、<a href="/docs/ja/v2.4.x/milvusdm_install.md">マイグレーションツールのインストールを</a>参照してください。</li>
</ul></li>
<li><strong>マイグレーションでサポートされるデータタイプ</strong>移行元の Elasticsearch インデックスから移行するフィールドのデータ型は以下の通りです -<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">keyword</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">text</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">long</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">integer</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">double</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">float</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">boolean</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">object</a>。ここに記載されていないデータ型は、現在移行をサポートしていません。MilvusコレクションとElasticsearchインデックス間のデータマッピングの詳細については<a href="#field-mapping-reference">フィールドマッピングリファレンスを</a>参照してください。</li>
<li><strong>Elasticsearch インデックスの要件</strong><ul>
<li>移行元の Elasticsearch インデックスには<code translate="no">dense_vector</code> 型のベクトルフィールドが含まれている必要があります。ベクトルフィールドがないとマイグレーションを開始できません。</li>
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
    </button></h2><p>サンプルのマイグレーション設定ファイルを<code translate="no">migration.yaml</code> として保存し、実際の条件に基づいて設定を変更します。コンフィグファイルは任意のローカルディレクトリに自由に置くことができます。</p>
<pre><code translate="no" class="language-yaml">dumper: <span class="hljs-comment"># configs for the migration job.</span>
  worker:
    workMode: <span class="hljs-string">&quot;elasticsearch&quot;</span> <span class="hljs-comment"># operational mode of the migration job.</span>
    reader:
      bufferSize: <span class="hljs-number">2500</span> <span class="hljs-comment"># buffer size to read from Elasticsearch in each batch. A value ranging from 2000 to 4000 is recommended.</span>
meta: <span class="hljs-comment"># meta configs for the source Elasticsearch index and target Milvus 2.x collection.</span>
  mode: <span class="hljs-string">&quot;config&quot;</span> <span class="hljs-comment"># specifies the source for meta configs. currently, onlly `config` is supported.</span>
  version: <span class="hljs-string">&quot;8.9.1&quot;</span>
  index: <span class="hljs-string">&quot;qatest_index&quot;</span> <span class="hljs-comment"># identifies the Elasticsearch index to migrate data from.</span>
  fields: <span class="hljs-comment"># fields within the Elasticsearch index to be migrated.</span>
  - name: <span class="hljs-string">&quot;my_vector&quot;</span> <span class="hljs-comment"># name of the Elasticsearch field.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;dense_vector&quot;</span> <span class="hljs-comment"># data type of the Elasticsearch field.</span>
    dims: <span class="hljs-number">128</span> <span class="hljs-comment"># dimension of the vector field. required only when `type` is `dense_vector`.</span>
  - name: <span class="hljs-string">&quot;id&quot;</span>
    pk: true <span class="hljs-comment"># specifies if the field serves as a primary key.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;long&quot;</span>
  - name: <span class="hljs-string">&quot;num&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;integer&quot;</span>
  - name: <span class="hljs-string">&quot;double1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;double&quot;</span>
  - name: <span class="hljs-string">&quot;text1&quot;</span>
    maxLen: <span class="hljs-number">1000</span> <span class="hljs-comment"># max. length of data fields. required only for `keyword` and `text` data types.</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;text&quot;</span>
  - name: <span class="hljs-string">&quot;bl1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;boolean&quot;</span>
  - name: <span class="hljs-string">&quot;float1&quot;</span>
    <span class="hljs-built_in">type</span>: <span class="hljs-string">&quot;float&quot;</span>
  milvus: <span class="hljs-comment"># configs specific to creating the collection in Milvus 2.x</span>
    collection: <span class="hljs-string">&quot;Collection_01&quot;</span> <span class="hljs-comment"># name of the Milvus collection. defaults to the Elasticsearch index name if not specified.</span>
    closeDynamicField: false <span class="hljs-comment"># specifies whether to disable the dynamic field in the collection. defaults to `false`.</span>
    shardNum: <span class="hljs-number">2</span> <span class="hljs-comment"># number of shards to be created in the collection.</span>
    consistencyLevel: Strong <span class="hljs-comment"># consistency level for Milvus collection.</span>
source: <span class="hljs-comment"># connection configs for the source Elasticsearch server</span>
  es:
    urls:
    - <span class="hljs-string">&quot;http://10.15.1.***:9200&quot;</span> <span class="hljs-comment"># address of the source Elasticsearch server.</span>
    username: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># username for the Elasticsearch server.</span>
    password: <span class="hljs-string">&quot;&quot;</span> <span class="hljs-comment"># password for the Elasticsearch server.</span>
target:
  mode: <span class="hljs-string">&quot;remote&quot;</span> <span class="hljs-comment"># storage location for dumped files. valid values: `remote` and `local`.</span>
  remote: <span class="hljs-comment"># configs for remote storage</span>
    outputDir: <span class="hljs-string">&quot;migration/milvus/test&quot;</span> <span class="hljs-comment"># output directory path in the cloud storage bucket.</span>
    cloud: <span class="hljs-string">&quot;aws&quot;</span> <span class="hljs-comment"># cloud storage service provider. Examples: `aws`, `gcp`, `azure`, etc.</span>
    region: <span class="hljs-string">&quot;us-west-2&quot;</span> <span class="hljs-comment"># region of the cloud storage; can be any value if using local Minio.</span>
    bucket: <span class="hljs-string">&quot;zilliz-aws-us-****-*-********&quot;</span> <span class="hljs-comment"># bucket name for storing data; must align with configs in milvus.yaml for Milvus 2.x.</span>
    useIAM: true <span class="hljs-comment"># whether to use an IAM Role for connection.</span>
    checkBucket: false <span class="hljs-comment"># checks if the specified bucket exists in the storage.</span>
  milvus2x: <span class="hljs-comment"># connection configs for the target Milvus 2.x server</span>
    endpoint: <span class="hljs-string">&quot;http://10.102.*.**:19530&quot;</span> <span class="hljs-comment"># address of the target Milvus server.</span>
    username: <span class="hljs-string">&quot;****&quot;</span> <span class="hljs-comment"># username for the Milvus 2.x server.</span>
    password: <span class="hljs-string">&quot;******&quot;</span> <span class="hljs-comment"># password for the Milvus 2.x server.</span>
<button class="copy-code-btn"></button></code></pre>
<p>次の表は、コンフィグファイル例のパラメータを説明したものです。コンフィグファイルの全リストは<a href="https://github.com/zilliztech/milvus-migration/blob/main/README_ES.md#migrationyaml-reference">Milvus Migration</a> を参照してください<a href="https://github.com/zilliztech/milvus-migration/blob/main/README_ES.md#migrationyaml-reference">：Elasticsearch から Milvus 2.x への移行を</a>ご参照ください。</p>
<ul>
<li><p><code translate="no">dumper</code></p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">dumper.worker.workMode</code></td><td>移行ジョブの動作モード。Elasticsearch のインデックスから移行する場合は<code translate="no">elasticsearch</code> に設定します。</td></tr>
<tr><td><code translate="no">dumper.worker.reader.bufferSize</code></td><td>各バッチでElasticsearchから読み込むバッファサイズ。単位：KB。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">meta</code></p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">meta.mode</code></td><td>meta configs のソースを指定します。現在のところ、<code translate="no">config</code> のみがサポートされています。</td></tr>
<tr><td><code translate="no">meta.index</code></td><td>データを移行する Elasticsearch インデックスを指定します。</td></tr>
<tr><td><code translate="no">meta.fields</code></td><td>移行する Elasticsearch インデックス内のフィールド。</td></tr>
<tr><td><code translate="no">meta.fields.name</code></td><td>Elasticsearch フィールドの名前。</td></tr>
<tr><td><code translate="no">meta.fields.maxLen</code></td><td>フィールドの最大長。このパラメータは<code translate="no">meta.fields.type</code> が<code translate="no">keyword</code> または<code translate="no">text</code> の場合のみ必要です。</td></tr>
<tr><td><code translate="no">meta.fields.pk</code></td><td>フィールドが主キーの役割を果たすかどうかを指定します。</td></tr>
<tr><td><code translate="no">meta.fields.type</code></td><td>Elasticsearch フィールドのデータ型。現在 Elasticsearch でサポートされているデータ型は以下の通りです:<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/dense-vector.html#dense-vector">dense_vector</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/keyword.html#keyword-field-type">keyword</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/text.html#text-field-type">text</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">long</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">integer</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">double</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/number.html">float</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/boolean.html">boolean</a>、<a href="https://www.elastic.co/guide/en/elasticsearch/reference/8.13/object.html">object</a>。</td></tr>
<tr><td><code translate="no">meta.fields.dims</code></td><td>ベクトルフィールドの次元。このパラメータは<code translate="no">meta.fields.type</code> が<code translate="no">dense_vector</code> の場合のみ必要です。</td></tr>
<tr><td><code translate="no">meta.milvus</code></td><td>Milvus 2.x でのコレクション作成に固有の設定。</td></tr>
<tr><td><code translate="no">meta.milvus.collection</code></td><td>Milvusコレクションの名前。指定しない場合、Elasticsearchインデックス名がデフォルトです。</td></tr>
<tr><td><code translate="no">meta.milvus.closeDynamicField</code></td><td>コレクションのダイナミックフィールドを無効にするかどうかを指定します。デフォルトは<code translate="no">false</code> です。動的フィールドの詳細については、<a href="https://milvus.io/docs/enable-dynamic-field.md#Enable-Dynamic-Field">動的フィールドの有効</a>化を参照してください。</td></tr>
<tr><td><code translate="no">meta.milvus.shardNum</code></td><td>コレクションに作成するシャードの数。シャードの詳細は、"<a href="https://milvus.io/docs/glossary.md#Shard">用語</a>" を参照してください。</td></tr>
<tr><td><code translate="no">meta.milvus.consistencyLevel</code></td><td>Milvus におけるコレクションの整合性レベル。詳細は、"<a href="https://milvus.io/docs/consistency.md">一貫性</a>" を参照してください。</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">source</code></p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">source.es</code></td><td>接続元 Elasticsearch サーバの接続設定。</td></tr>
<tr><td><code translate="no">source.es.urls</code></td><td>接続元 Elasticsearch サーバのアドレス。</td></tr>
<tr><td><code translate="no">source.es.username</code></td><td>Elasticsearch サーバのユーザ名。</td></tr>
<tr><td><code translate="no">source.es.password</code></td><td>Elasticsearch サーバのパスワード</td></tr>
</tbody>
</table>
</li>
<li><p><code translate="no">target</code></p>
<table>
<thead>
<tr><th>パラメータ</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">target.mode</code></td><td>ダンプされたファイルの保存場所。有効な値:<br/>-<code translate="no">local</code>: ダンプしたファイルをローカルディスクに保存します。<br/>-<code translate="no">remote</code>: ダンプしたファイルをオブジェクトストレージに保存します。</td></tr>
<tr><td><code translate="no">target.remote.outputDir</code></td><td>クラウドストレージバケット内の出力ディレクトリパス。</td></tr>
<tr><td><code translate="no">target.remote.cloud</code></td><td>クラウドストレージサービスプロバイダ。値の例：<code translate="no">aws</code> <code translate="no">gcp</code>,<code translate="no">azure</code>.</td></tr>
<tr><td><code translate="no">target.remote.region</code></td><td>クラウドストレージのリージョン。ローカルのMinIOを使用する場合は、任意の値を指定できます。</td></tr>
<tr><td><code translate="no">target.remote.bucket</code></td><td>データを保存するバケット名。値はMilvus 2.xの設定と同じでなければなりません。詳細は<a href="https://milvus.io/docs/configure_minio.md#miniobucketName">システム設定を</a>参照してください。</td></tr>
<tr><td><code translate="no">target.remote.useIAM</code></td><td>接続にIAM Roleを使用するかどうか。</td></tr>
<tr><td><code translate="no">target.remote.checkBucket</code></td><td>指定したバケットがオブジェクトストレージに存在するかどうかを確認するかどうか。</td></tr>
<tr><td><code translate="no">target.milvus2x</code></td><td>接続先Milvus 2.xサーバの接続設定</td></tr>
<tr><td><code translate="no">target.milvus2x.endpoint</code></td><td>接続先Milvusサーバのアドレス</td></tr>
<tr><td><code translate="no">target.milvus2x.username</code></td><td>Milvus 2.xサーバのユーザ名。このパラメータはMilvusサーバでユーザ認証が有効になっている場合に必要です。詳細については、<a href="https://milvus.io/docs/authenticate.md">認証の有効</a>化を参照してください。</td></tr>
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
    </button></h2><p>以下のコマンドで移行タスクを開始します。<code translate="no">{YourConfigFilePath}</code> は設定ファイル<code translate="no">migration.yaml</code> が存在するローカルディレクトリに置き換えてください。</p>
<pre><code translate="no" class="language-bash">./milvus-migration start --config=/{YourConfigFilePath}/migration.yaml
<button class="copy-code-btn"></button></code></pre>
<p>以下はマイグレーションが成功した場合のログ出力例です：</p>
<pre><code translate="no" class="language-bash">[task/load_base_task.go:94] [<span class="hljs-string">&quot;[LoadTasker] Dec Task Processing--------------&gt;&quot;</span>] [Count=0] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[task/load_base_task.go:76] [<span class="hljs-string">&quot;[LoadTasker] Progress Task ---------------&gt;&quot;</span>] [fileName=testfiles/output/zwh/migration/test_mul_field4/data_1_1.json] [taskId=442665677354739304]
[dbclient/cus_field_milvus2x.go:86] [<span class="hljs-string">&quot;[Milvus2x] begin to ShowCollectionRows&quot;</span>]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static: &quot;</span>] [collection=test_mul_field4_rename1] [beforeCount=50000] [afterCount=100000] [increase=50000]
[loader/cus_milvus2x_loader.go:66] [<span class="hljs-string">&quot;[Loader] Static Total&quot;</span>] [<span class="hljs-string">&quot;Total Collections&quot;</span>=1] [beforeTotalCount=50000] [afterTotalCount=100000] [totalIncrease=50000]
[migration/es_starter.go:25] [<span class="hljs-string">&quot;[Starter] migration ES to Milvus finish!!!&quot;</span>] [Cost=80.009174459]
[starter/starter.go:106] [<span class="hljs-string">&quot;[Starter] Migration Success!&quot;</span>] [Cost=80.00928425]
[cleaner/remote_cleaner.go:27] [<span class="hljs-string">&quot;[Remote Cleaner] Begin to clean files&quot;</span>] [bucket=a-bucket] [rootPath=testfiles/output/zwh/migration]
[cmd/start.go:32] [<span class="hljs-string">&quot;[Cleaner] clean file success!&quot;</span>]
<button class="copy-code-btn"></button></code></pre>
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
    </button></h2><p>移行タスクが実行されると、APIコールを実行したり、Attuを使用して移行されたエンティティの数を表示できます。詳細については、<a href="https://github.com/zilliztech/attu">Attu</a>および<a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/get_collection_stats.md">get_collection_stats()</a> を参照してください。</p>
<h2 id="Field-mapping-reference" class="common-anchor-header">フィールドマッピングの参照<button data-href="#Field-mapping-reference" class="anchor-icon" translate="no">
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
    </button></h2><p>Elasticsearch インデックスのフィールド型が Milvus コレクションのフィールド型にどのようにマッピングされているかを理解するために以下の表を確認してください。</p>
<p>Milvus でサポートされているデータ型の詳細については、<a href="https://milvus.io/docs/schema.md#Supported-data-types">サポートされているデータ</a>型を参照してください。</p>
<table>
<thead>
<tr><th>Elasticsearch フィールドタイプ</th><th>Milvus フィールドタイプ</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td>dense_vector</td><td>FloatVector</td><td>ベクタの次元はマイグレーション中も変更されません。</td></tr>
<tr><td>キーワード</td><td>VarChar</td><td>最大長を設定します (1 から 65,535)。制限を超える文字列はマイグレーションエラーを引き起こす可能性があります。</td></tr>
<tr><td>テキスト</td><td>VarChar</td><td>最大長（1～65,535）を設定します。制限を超える文字列はマイグレーションエラーを引き起こす可能性があります。</td></tr>
<tr><td>long</td><td>Int64</td><td>-</td></tr>
<tr><td>整数</td><td>Int32</td><td>-</td></tr>
<tr><td>double</td><td>Double</td><td>-</td></tr>
<tr><td>float</td><td>フロート</td><td>-</td></tr>
<tr><td>boolean</td><td>ブール</td><td>-</td></tr>
<tr><td>オブジェクト</td><td>JSON</td><td>-</td></tr>
</tbody>
</table>
