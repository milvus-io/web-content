---
id: integrate_with_spark.md
summary: このページでは、Spark-Milvus コネクターについて説明します。
title: Spark-Milvus コネクタ ユーザーガイド
---

<h1 id="Spark-Milvus-Connector-User-Guide" class="common-anchor-header">Spark-Milvus コネクタ ユーザーガイド<button data-href="#Spark-Milvus-Connector-User-Guide" class="anchor-icon" translate="no">
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
    </button></h1><p>Spark-Milvus Connector (https://github.com/zilliztech/spark-milvus)はApache SparkとMilvus間のシームレスな統合を提供し、Apache Sparkのデータ処理とML機能とMilvusのベクトルデータストレージおよび検索機能を組み合わせます。この統合により、以下のような様々な興味深いアプリケーションが可能になります：</p>
<ul>
<li>ベクトルデータを効率的にMilvusに大量にロードする、</li>
<li>Milvusと他のストレージシステムやデータベース間でデータを移動する、</li>
<li>Spark MLlibやその他のAIツールを活用したMilvusでのデータ分析。</li>
</ul>
<h2 id="Quick-start" class="common-anchor-header">クイックスタート<button data-href="#Quick-start" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Preparation" class="common-anchor-header">準備</h3><p>Spark-Milvus ConnectorはScalaとPythonプログラミング言語をサポートしています。<strong>Pyspark</strong>または<strong>Spark-shellで</strong>使用できます。このデモを実行するには、以下の手順でSpark-Milvus Connectorの依存関係を含むSpark環境をセットアップする：</p>
<ol>
<li><p>Apache Spark（バージョン3.3.0）をインストールする。</p>
<p><a href="https://spark.apache.org/docs/latest/">公式ドキュメントを</a>参照してApache Sparkをインストールできる。</p></li>
<li><p><strong>spark-milvus</strong>jarファイルをダウンロードする。</p>
<pre><code translate="no">wget https://github.com/zilliztech/spark-milvus/raw/1.0.0-SNAPSHOT/output/spark-milvus-1.0.0-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>spark-milvus</strong>jarを依存関係の1つとしてSparkランタイムを起動する。</p>
<p>Spark-Milvus ConnectorでSparkランタイムを起動するには、ダウンロードした<strong>spark-milvusを</strong>依存関係の1つとしてコマンドに追加します。</p>
<ul>
<li><p><strong>pyspark</strong></p>
<pre><code translate="no">./<span class="hljs-built_in">bin</span>/pyspark --jars spark-milvus-<span class="hljs-number">1.0</span><span class="hljs-number">.0</span>-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>スパークシェル</strong></p>
<pre><code translate="no">./<span class="hljs-built_in">bin</span>/spark-shell --jars spark-milvus-<span class="hljs-number">1.0</span><span class="hljs-number">.0</span>-SNAPSHOT.jar
<button class="copy-code-btn"></button></code></pre></li>
</ul></li>
</ol>
<h3 id="Demo" class="common-anchor-header">デモ</h3><p>このデモでは、ベクトルデータでサンプルのSpark DataFrameを作成し、Spark-Milvus Connectorを通してMilvusに書き込みます。スキーマと指定したオプションに基づいて、Milvusにコレクションが自動的に作成されます。</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#scala">Scala</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pyspark.sql <span class="hljs-keyword">import</span> SparkSession

columns = [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;vec&quot;</span>]
data = [(<span class="hljs-number">1</span>, <span class="hljs-string">&quot;a&quot;</span>, [<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>,<span class="hljs-number">6.0</span>,<span class="hljs-number">7.0</span>,<span class="hljs-number">8.0</span>]),
(<span class="hljs-number">2</span>, <span class="hljs-string">&quot;b&quot;</span>, [<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>,<span class="hljs-number">6.0</span>,<span class="hljs-number">7.0</span>,<span class="hljs-number">8.0</span>]),
(<span class="hljs-number">3</span>, <span class="hljs-string">&quot;c&quot;</span>, [<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>,<span class="hljs-number">6.0</span>,<span class="hljs-number">7.0</span>,<span class="hljs-number">8.0</span>]),
(<span class="hljs-number">4</span>, <span class="hljs-string">&quot;d&quot;</span>, [<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>,<span class="hljs-number">6.0</span>,<span class="hljs-number">7.0</span>,<span class="hljs-number">8.0</span>])]
sample_df = spark.sparkContext.parallelize(data).toDF(columns)
sample_df.write \
 .mode(<span class="hljs-string">&quot;append&quot;</span>) \
 .option(<span class="hljs-string">&quot;milvus.host&quot;</span>, <span class="hljs-string">&quot;localhost&quot;</span>) \
 .option(<span class="hljs-string">&quot;milvus.port&quot;</span>, <span class="hljs-string">&quot;19530&quot;</span>) \
 .option(<span class="hljs-string">&quot;milvus.collection.name&quot;</span>, <span class="hljs-string">&quot;hello_spark_milvus&quot;</span>) \
 .option(<span class="hljs-string">&quot;milvus.collection.vectorField&quot;</span>, <span class="hljs-string">&quot;vec&quot;</span>) \
 .option(<span class="hljs-string">&quot;milvus.collection.vectorDim&quot;</span>, <span class="hljs-string">&quot;8&quot;</span>) \
 .option(<span class="hljs-string">&quot;milvus.collection.primaryKeyField&quot;</span>, <span class="hljs-string">&quot;id&quot;</span>) \
 .<span class="hljs-built_in">format</span>(<span class="hljs-string">&quot;milvus&quot;</span>) \
 .save()
<button class="copy-code-btn"></button></code></pre>

<pre><code translate="no" class="language-scala"><span class="hljs-keyword">import</span> org.apache.spark.sql.{SaveMode, SparkSession}

object Hello <span class="hljs-keyword">extends</span> <span class="hljs-title class_">App</span> {

  <span class="hljs-type">val</span> <span class="hljs-variable">spark</span> <span class="hljs-operator">=</span> SparkSession.builder().master(<span class="hljs-string">&quot;local[*]&quot;</span>)
    .appName(<span class="hljs-string">&quot;HelloSparkMilvus&quot;</span>)
    .getOrCreate()

  <span class="hljs-keyword">import</span> spark.implicits._

  <span class="hljs-comment">// Create DataFrame</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">sampleDF</span> <span class="hljs-operator">=</span> Seq(
    (<span class="hljs-number">1</span>, <span class="hljs-string">&quot;a&quot;</span>, Seq(<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>)),
    (<span class="hljs-number">2</span>, <span class="hljs-string">&quot;b&quot;</span>, Seq(<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>)),
    (<span class="hljs-number">3</span>, <span class="hljs-string">&quot;c&quot;</span>, Seq(<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>)),
    (<span class="hljs-number">4</span>, <span class="hljs-string">&quot;d&quot;</span>, Seq(<span class="hljs-number">1.0</span>,<span class="hljs-number">2.0</span>,<span class="hljs-number">3.0</span>,<span class="hljs-number">4.0</span>,<span class="hljs-number">5.0</span>))
  ).toDF(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;vec&quot;</span>)

  <span class="hljs-comment">// set milvus options</span>
  <span class="hljs-type">val</span> <span class="hljs-variable">milvusOptions</span> <span class="hljs-operator">=</span> Map(
      <span class="hljs-string">&quot;milvus.host&quot;</span> -&gt; <span class="hljs-string">&quot;localhost&quot;</span> -&gt; uri,
      <span class="hljs-string">&quot;milvus.port&quot;</span> -&gt; <span class="hljs-string">&quot;19530&quot;</span>,
      <span class="hljs-string">&quot;milvus.collection.name&quot;</span> -&gt; <span class="hljs-string">&quot;hello_spark_milvus&quot;</span>,
      <span class="hljs-string">&quot;milvus.collection.vectorField&quot;</span> -&gt; <span class="hljs-string">&quot;vec&quot;</span>,
      <span class="hljs-string">&quot;milvus.collection.vectorDim&quot;</span> -&gt; <span class="hljs-string">&quot;5&quot;</span>,
      <span class="hljs-string">&quot;milvus.collection.primaryKeyField&quot;</span>, <span class="hljs-string">&quot;id&quot;</span>
    )
    
  sampleDF.write.format(<span class="hljs-string">&quot;milvus&quot;</span>)
    .options(milvusOptions)
    .mode(SaveMode.Append)
    .save()
}
<button class="copy-code-btn"></button></code></pre>
<p>上記のコードを実行した後、SDKまたはAttu (A Milvus Dashboard)を使ってMilvusに挿入されたデータを見ることができます。既に4つのエンティティが挿入された<code translate="no">hello_spark_milvus</code> というコレクションが作成されていることがわかります。</p>
<h2 id="Features--concepts" class="common-anchor-header">機能とコンセプト<button data-href="#Features--concepts" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Milvus-options" class="common-anchor-header">Milvusオプション</h3><p><a href="#Quick-start">クイックスタートでは</a>、Milvusを使用する際のオプション設定について説明しました。これらのオプションはMilvusオプションとして抽象化されています。これらのオプションはMilvusへの接続を作成したり、他のMilvusの動作を制御するために使用されます。すべてのオプションが必須というわけではありません。</p>
<table>
<thead>
<tr><th>オプション キー</th><th>デフォルト値</th><th>説明</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">milvus.host</code></td><td><code translate="no">localhost</code></td><td>Milvusサーバホスト。詳細は<a href="https://milvus.io/docs/manage_connection.md">Milvus接続の</a>管理を参照してください。</td></tr>
<tr><td><code translate="no">milvus.port</code></td><td><code translate="no">19530</code></td><td>Milvusサーバポート。詳細は<a href="https://milvus.io/docs/manage_connection.md">Milvus接続の管理を</a>参照してください。</td></tr>
<tr><td><code translate="no">milvus.username</code></td><td><code translate="no">root</code></td><td>Milvusサーバのユーザ名.詳細は<a href="https://milvus.io/docs/manage_connection.md">Milvus接続の管理を</a>参照してください。</td></tr>
<tr><td><code translate="no">milvus.password</code></td><td><code translate="no">Milvus</code></td><td>Milvusサーバのパスワード詳細は<a href="https://milvus.io/docs/manage_connection.md">Milvus接続の管理を</a>参照してください。</td></tr>
<tr><td><code translate="no">milvus.uri</code></td><td><code translate="no">--</code></td><td>MilvusサーバのURI。詳細は<a href="https://milvus.io/docs/manage_connection.md">Milvus 接続の管理</a>を参照してください。</td></tr>
<tr><td><code translate="no">milvus.token</code></td><td><code translate="no">--</code></td><td>Milvusサーバトークン。詳細は<a href="https://milvus.io/docs/manage_connection.md">Milvus接続の管理を</a>参照してください。</td></tr>
<tr><td><code translate="no">milvus.database.name</code></td><td><code translate="no">default</code></td><td>読み書きするMilvusデータベースの名前。</td></tr>
<tr><td><code translate="no">milvus.collection.name</code></td><td><code translate="no">hello_milvus</code></td><td>読み書きするMilvusコレクションの名前。</td></tr>
<tr><td><code translate="no">milvus.collection.primaryKeyField</code></td><td><code translate="no">None</code></td><td>コレクション内の主キーフィールドの名前。コレクションが存在しない場合は必須。</td></tr>
<tr><td><code translate="no">milvus.collection.vectorField</code></td><td><code translate="no">None</code></td><td>コレクション内のベクトル・フィールドの名前。コレクションが存在しない場合は必須。</td></tr>
<tr><td><code translate="no">milvus.collection.vectorDim</code></td><td><code translate="no">None</code></td><td>コレクション内のベクトルフィールドの次元。コレクションが存在しない場合は必須。</td></tr>
<tr><td><code translate="no">milvus.collection.autoID</code></td><td><code translate="no">false</code></td><td>コレクションが存在しない場合、このオプションはエンティティの ID を自動的に生成するかどうかを指定する。詳細は<a href="https://milvus.io/docs/create_collection.md">create_collection</a>を参照。</td></tr>
<tr><td><code translate="no">milvus.bucket</code></td><td><code translate="no">a-bucket</code></td><td>Milvusストレージのバケット名。<a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a> の<code translate="no">minio.bucketName</code> と同じでなければなりません。</td></tr>
<tr><td><code translate="no">milvus.rootpath</code></td><td><code translate="no">files</code></td><td>Milvusストレージのルートパス。<a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yamlの</a> <code translate="no">minio.rootpath</code> 。</td></tr>
<tr><td><code translate="no">milvus.fs</code></td><td><code translate="no">s3a://</code></td><td>Milvusストレージのファイルシステム。<code translate="no">s3a://</code> はオープンソースの Spark に適用されます。Databricks の場合は<code translate="no">s3://</code> を使用してください。</td></tr>
<tr><td><code translate="no">milvus.storage.endpoint</code></td><td><code translate="no">localhost:9000</code></td><td>Milvusストレージのエンドポイント。<a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yaml</a> の<code translate="no">minio.address</code>:<code translate="no">minio.port</code> と同じにします。</td></tr>
<tr><td><code translate="no">milvus.storage.user</code></td><td><code translate="no">minioadmin</code></td><td>Milvusストレージのユーザー。<a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yamlの</a> <code translate="no">minio.accessKeyID</code> 。</td></tr>
<tr><td><code translate="no">milvus.storage.password</code></td><td><code translate="no">minioadmin</code></td><td>Milvusストレージのパスワード。<a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yamlの</a> <code translate="no">minio.secretAccessKey</code> 。</td></tr>
<tr><td><code translate="no">milvus.storage.useSSL</code></td><td><code translate="no">false</code></td><td>MilvusストレージにSSLを使用するかどうか。<a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml">milvus.yamlの</a> <code translate="no">minio.useSSL</code> 。</td></tr>
</tbody>
</table>
<h2 id="Milvus-data-format" class="common-anchor-header">Milvusデータフォーマット<button data-href="#Milvus-data-format" class="anchor-icon" translate="no">
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
    </button></h2><p>Spark-Milvus Connectorは以下のMilvusデータフォーマットでのデータの読み書きをサポートしています：</p>
<ul>
<li><code translate="no">milvus</code>:Spark DataFrameからMilvusエンティティへのシームレスな変換のためのMilvusデータフォーマット。</li>
<li><code translate="no">milvusbinlog</code>:Milvus組み込みのbinlogデータを読み込むためのMilvusデータフォーマット。</li>
<li><code translate="no">mjson</code>:Milvusにデータを一括挿入するためのMilvus JSONフォーマット。</li>
</ul>
<h3 id="milvus" class="common-anchor-header">Milvus</h3><p><a href="#Quick-start">クイックスタートでは</a>、<strong>milvus</strong>フォーマットを使用してサンプルデータをMilvusクラスタに書き込みます。<strong>milvus</strong>フォーマットは新しいデータフォーマットで、Spark DataFrameデータをMilvus Collectionsにシームレスに書き込むことができます。これはMilvus SDKのInsert APIをバッチコールすることで実現されます。コレクションがMilvusに存在しない場合、Dataframeのスキーマに基づいて新しいコレクションが作成されます。しかし、自動的に作成されたコレクションは、コレクションスキーマのすべての機能をサポートしているとは限りません。そのため、まずSDK経由でコレクションを作成し、その後spark-milvusを使用して書き込みを行うことを推奨します。詳細は<a href="https://github.com/zilliztech/spark-milvus/blob/main/examples/src/main/scala/InsertDemo.scala">デモを</a>参照してください。</p>
<h3 id="milvusbinlog" class="common-anchor-header">milvusbinlog</h3><p>新しいデータフォーマット<strong>milvusbinlogは</strong>Milvus組み込みのbinlogデータを読み込むためのものです。BinlogはパーケットベースのMilvus内部データ保存フォーマットです。残念ながら、通常のパーケットライブラリでは読み込むことができないため、Sparkジョブが読み込めるようにこの新しいデータフォーマットを実装しました。 milvusの内部ストレージの詳細に精通していない限り、<strong>milvusbinlogを</strong>直接使用することはお勧めしません。次のセクションで紹介する<a href="#MilvusUtils">MilvusUtils</a>関数を使うことをお勧めします。</p>
<pre><code translate="no" class="language-scalar">val df = spark.read
  .<span class="hljs-built_in">format</span>(<span class="hljs-string">&quot;milvusbinlog&quot;</span>)
  .load(path)
  .withColumnRenamed(<span class="hljs-string">&quot;val&quot;</span>, <span class="hljs-string">&quot;embedding&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h3 id="mjson" class="common-anchor-header">mjson</h3><p>Milvusは大規模なデータセットを扱う際に、書き込みのパフォーマンスを向上させるために<a href="https://milvus.io/docs/bulk_insert.md">Bulkinsert</a>機能を提供しています。しかし、Milvusが使用するJSONフォーマットはSparkのデフォルトJSON出力フォーマットとは若干異なる。 これを解決するために、<strong>Milvusの</strong>要件を満たすデータを生成するために<strong>mjson</strong>データフォーマットを導入する。以下にJSON-linesと<strong>mjsonの</strong>違いを示す例を示します：</p>
<ul>
<li><p>JSON-lines：</p>
<pre><code translate="no" class="language-json">{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">101</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">13</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">1.1</span>, <span class="hljs-number">1.2</span>]}
{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">102</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">2.1</span>, <span class="hljs-number">2.2</span>]}
{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">103</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">3.1</span>, <span class="hljs-number">3.2</span>]}
{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">104</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">12</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">4.1</span>, <span class="hljs-number">4.2</span>]}
{<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">105</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">34</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">5.1</span>, <span class="hljs-number">5.2</span>]}
<button class="copy-code-btn"></button></code></pre></li>
<li><p>mjson (Milvus Bulkinsertでは必須)：</p>
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;rows&quot;</span>:[
        {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">101</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">13</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">1.1</span>, <span class="hljs-number">1.2</span>]},
        {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">102</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">2.1</span>, <span class="hljs-number">2.2</span>]},
        {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">103</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">7</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">3.1</span>, <span class="hljs-number">3.2</span>]},
        {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">104</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">12</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">4.1</span>, <span class="hljs-number">4.2</span>]},
        {<span class="hljs-string">&quot;book_id&quot;</span>: <span class="hljs-number">105</span>, <span class="hljs-string">&quot;word_count&quot;</span>: <span class="hljs-number">34</span>, <span class="hljs-string">&quot;book_intro&quot;</span>: [<span class="hljs-number">5.1</span>, <span class="hljs-number">5.2</span>]}
    ]
}
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<p>これは将来的に改善される予定です。Milvusのバージョンがv2.3.7以上であり、Parquetフォーマットでのbulkinsertをサポートしている場合は、spark-milvusの統合でparquetフォーマットを使用することをお勧めします。Githubの<a href="https://github.com/zilliztech/spark-milvus/blob/main/examples/src/main/scala/BulkInsertDemo.scala">デモを</a>参照してください。</p>
<h2 id="MilvusUtils" class="common-anchor-header">MilvusUtils<button data-href="#MilvusUtils" class="anchor-icon" translate="no">
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
    </button></h2><p>MilvusUtilsにはいくつかの便利なutil関数が含まれています。現在はScalaでのみサポートされています。詳しい使用例は<a href="#Advanced-Usage">高度な使用法の</a>セクションにあります。</p>
<h3 id="MilvusUtilsreadMilvusCollection" class="common-anchor-header">MilvusUtils.readMilvusCollection</h3><p><strong>MilvusUtils.readMilvusCollectionは</strong>Milvusコレクション全体をSpark Dataframeにロードするためのシンプルなインターフェースです。Milvus SDKの呼び出し、<strong>milvusbinlogの</strong>読み込み、一般的なunion/joinオペレーションなど様々なオペレーションをラップしています。</p>
<pre><code translate="no" class="language-scala"><span class="hljs-type">val</span> <span class="hljs-variable">collectionDF</span> <span class="hljs-operator">=</span> MilvusUtils.readMilvusCollection(spark, milvusOptions)
<button class="copy-code-btn"></button></code></pre>
<h3 id="MilvusUtilsbulkInsertFromSpark" class="common-anchor-header">MilvusUtils.bulkInsertFromSpark</h3><p><strong>MilvusUtils.bulkInsertFromSparkは</strong>Sparkの出力ファイルを一括してMilvusにインポートする便利な方法を提供します。Milvus SDKの<strong>Bullkinsert</strong>APIをラップしています。</p>
<pre><code translate="no" class="language-scala">df.write.<span class="hljs-built_in">format</span>(<span class="hljs-string">&quot;parquet&quot;</span>).save(outputPath)
MilvusUtils.bulkInsertFromSpark(spark, milvusOptions, outputPath, <span class="hljs-string">&quot;parquet&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Advanced-Usage" class="common-anchor-header">高度な使い方<button data-href="#Advanced-Usage" class="anchor-icon" translate="no">
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
    </button></h2><p>このセクションでは、Spark-Milvus Connectorの高度な使用例として、データ分析やマイグレーションをご紹介します。より多くのデモについては、<a href="https://github.com/zilliztech/spark-milvus/tree/main/examples/src/main/scala">例を</a>参照してください。</p>
<h3 id="MySQL---embedding---Milvus" class="common-anchor-header">MySQL -&gt; エンベッディング -&gt; Milvus</h3><p>このデモでは</p>
<ol>
<li>Spark-MySQL Connectorを通してMySQLからデータを読み込む、</li>
<li>エンベッディングを生成し（例としてWord2Vecを使用）、そして</li>
<li>埋め込みデータをMilvusに書き込む。</li>
</ol>
<p>Spark-MySQL Connectorを有効にするには、以下の依存関係をSpark環境に追加する必要があります：</p>
<pre><code translate="no">spark-shell --jars spark-milvus-1.0.0-SNAPSHOT.jar,mysql-connector-j-x.x.x.jar
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-scala"><span class="hljs-keyword">import</span> org.apache.spark.ml.feature.{Tokenizer, Word2Vec}
<span class="hljs-keyword">import</span> org.apache.spark.sql.functions.udf
<span class="hljs-keyword">import</span> org.apache.spark.sql.{SaveMode, SparkSession}
<span class="hljs-keyword">import</span> zilliztech.spark.milvus.MilvusOptions._

<span class="hljs-keyword">import</span> org.apache.spark.ml.linalg.Vector

object Mysql2MilvusDemo <span class="hljs-keyword">extends</span> <span class="hljs-title class_">App</span> {

<span class="hljs-type">val</span> <span class="hljs-variable">spark</span> <span class="hljs-operator">=</span> SparkSession.builder().master(<span class="hljs-string">&quot;local[*]&quot;</span>)
.appName(<span class="hljs-string">&quot;Mysql2MilvusDemo&quot;</span>)
.getOrCreate()

<span class="hljs-keyword">import</span> spark.implicits.\_

<span class="hljs-comment">// Create DataFrame</span>
<span class="hljs-type">val</span> <span class="hljs-variable">sampleDF</span> <span class="hljs-operator">=</span> Seq(
(<span class="hljs-number">1</span>, <span class="hljs-string">&quot;Milvus was created in 2019 with a singular goal: store, index, and manage massive embedding vectors generated by deep neural networks and other machine learning (ML) models.&quot;</span>),
(<span class="hljs-number">2</span>, <span class="hljs-string">&quot;As a database specifically designed to handle queries over input vectors, it is capable of indexing vectors on a trillion scale. &quot;</span>),
(<span class="hljs-number">3</span>, <span class="hljs-string">&quot;Unlike existing relational databases which mainly deal with structured data following a pre-defined pattern, Milvus is designed from the bottom-up to handle embedding vectors converted from unstructured data.&quot;</span>),
(<span class="hljs-number">4</span>, <span class="hljs-string">&quot;As the Internet grew and evolved, unstructured data became more and more common, including emails, papers, IoT sensor data, Facebook photos, protein structures, and much more.&quot;</span>)
).toDF(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;text&quot;</span>)

<span class="hljs-comment">// Write to MySQL Table</span>
sampleDF.write
.mode(SaveMode.Append)
.format(<span class="hljs-string">&quot;jdbc&quot;</span>)
.option(<span class="hljs-string">&quot;driver&quot;</span>,<span class="hljs-string">&quot;com.mysql.cj.jdbc.Driver&quot;</span>)
.option(<span class="hljs-string">&quot;url&quot;</span>, <span class="hljs-string">&quot;jdbc:mysql://localhost:3306/test&quot;</span>)
.option(<span class="hljs-string">&quot;dbtable&quot;</span>, <span class="hljs-string">&quot;demo&quot;</span>)
.option(<span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;root&quot;</span>)
.option(<span class="hljs-string">&quot;password&quot;</span>, <span class="hljs-string">&quot;123456&quot;</span>)
.save()

<span class="hljs-comment">// Read from MySQL Table</span>
<span class="hljs-type">val</span> <span class="hljs-variable">dfMysql</span> <span class="hljs-operator">=</span> spark.read
.format(<span class="hljs-string">&quot;jdbc&quot;</span>)
.option(<span class="hljs-string">&quot;driver&quot;</span>,<span class="hljs-string">&quot;com.mysql.cj.jdbc.Driver&quot;</span>)
.option(<span class="hljs-string">&quot;url&quot;</span>, <span class="hljs-string">&quot;jdbc:mysql://localhost:3306/test&quot;</span>)
.option(<span class="hljs-string">&quot;dbtable&quot;</span>, <span class="hljs-string">&quot;demo&quot;</span>)
.option(<span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;root&quot;</span>)
.option(<span class="hljs-string">&quot;password&quot;</span>, <span class="hljs-string">&quot;123456&quot;</span>)
.load()

<span class="hljs-type">val</span> <span class="hljs-variable">tokenizer</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Tokenizer</span>().setInputCol(<span class="hljs-string">&quot;text&quot;</span>).setOutputCol(<span class="hljs-string">&quot;tokens&quot;</span>)
<span class="hljs-type">val</span> <span class="hljs-variable">tokenizedDf</span> <span class="hljs-operator">=</span> tokenizer.transform(dfMysql)

<span class="hljs-comment">// Learn a mapping from words to Vectors.</span>
<span class="hljs-type">val</span> <span class="hljs-variable">word2Vec</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Word2Vec</span>()
.setInputCol(<span class="hljs-string">&quot;tokens&quot;</span>)
.setOutputCol(<span class="hljs-string">&quot;vectors&quot;</span>)
.setVectorSize(<span class="hljs-number">128</span>)
.setMinCount(<span class="hljs-number">0</span>)
<span class="hljs-type">val</span> <span class="hljs-variable">model</span> <span class="hljs-operator">=</span> word2Vec.fit(tokenizedDf)

<span class="hljs-type">val</span> <span class="hljs-variable">result</span> <span class="hljs-operator">=</span> model.transform(tokenizedDf)

<span class="hljs-type">val</span> <span class="hljs-variable">vectorToArrayUDF</span> <span class="hljs-operator">=</span> udf((v: Vector) =&gt; v.toArray)
<span class="hljs-comment">// Apply the UDF to the DataFrame</span>
<span class="hljs-type">val</span> <span class="hljs-variable">resultDF</span> <span class="hljs-operator">=</span> result.withColumn(<span class="hljs-string">&quot;embedding&quot;</span>, vectorToArrayUDF($<span class="hljs-string">&quot;vectors&quot;</span>))
<span class="hljs-type">val</span> <span class="hljs-variable">milvusDf</span> <span class="hljs-operator">=</span> resultDF.drop(<span class="hljs-string">&quot;tokens&quot;</span>).drop(<span class="hljs-string">&quot;vectors&quot;</span>)

milvusDf.write.format(<span class="hljs-string">&quot;milvus&quot;</span>)
.option(MILVUS_HOST, <span class="hljs-string">&quot;localhost&quot;</span>)
.option(MILVUS_PORT, <span class="hljs-string">&quot;19530&quot;</span>)
.option(MILVUS_COLLECTION_NAME, <span class="hljs-string">&quot;text_embedding&quot;</span>)
.option(MILVUS_COLLECTION_VECTOR_FIELD, <span class="hljs-string">&quot;embedding&quot;</span>)
.option(MILVUS_COLLECTION_VECTOR_DIM, <span class="hljs-string">&quot;128&quot;</span>)
.option(MILVUS_COLLECTION_PRIMARY_KEY, <span class="hljs-string">&quot;id&quot;</span>)
.mode(SaveMode.Append)
.save()
}
<button class="copy-code-btn"></button></code></pre>

<h3 id="Milvus---Transform---Milvus" class="common-anchor-header">Milvus -&gt; Transform -&gt; Milvus</h3><p>このデモでは</p>
<ol>
<li>Milvusコレクションからデータを読み込む、</li>
<li>変換を適用し（例としてPCAを使用）、そして</li>
<li>変換されたデータをBulkinsert API経由で別のMilvusに書き込む。</li>
</ol>
<div class="alert notes">
<p>PCAモデルは、機械学習で一般的な操作である埋め込みベクトルの次元を削減する変換モデルです。 変換ステップには、フィルタリング、結合、正規化などの他の処理操作を追加することができます。</p>
</div>
<pre><code translate="no" class="language-scala"><span class="hljs-keyword">import</span> org.apache.spark.ml.feature.PCA
<span class="hljs-keyword">import</span> org.apache.spark.ml.linalg.{Vector, Vectors}
<span class="hljs-keyword">import</span> org.apache.spark.SparkConf
<span class="hljs-keyword">import</span> org.apache.spark.sql.SparkSession
<span class="hljs-keyword">import</span> org.apache.spark.sql.functions.udf
<span class="hljs-keyword">import</span> org.apache.spark.sql.util.CaseInsensitiveStringMap
<span class="hljs-keyword">import</span> zilliztech.spark.milvus.{MilvusOptions, MilvusUtils}

<span class="hljs-keyword">import</span> scala.collection.JavaConverters.\_

object TransformDemo <span class="hljs-keyword">extends</span> <span class="hljs-title class_">App</span> {
<span class="hljs-type">val</span> <span class="hljs-variable">sparkConf</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">SparkConf</span>().setMaster(<span class="hljs-string">&quot;local&quot;</span>)
<span class="hljs-type">val</span> <span class="hljs-variable">spark</span> <span class="hljs-operator">=</span> SparkSession.builder().config(sparkConf).getOrCreate()

<span class="hljs-keyword">import</span> spark.implicits.\_

<span class="hljs-type">val</span> <span class="hljs-variable">host</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;localhost&quot;</span>
<span class="hljs-type">val</span> <span class="hljs-variable">port</span> <span class="hljs-operator">=</span> <span class="hljs-number">19530</span>
<span class="hljs-type">val</span> <span class="hljs-variable">user</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;root&quot;</span>
<span class="hljs-type">val</span> <span class="hljs-variable">password</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;Milvus&quot;</span>
<span class="hljs-type">val</span> <span class="hljs-variable">fs</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;s3a://&quot;</span>
<span class="hljs-type">val</span> <span class="hljs-variable">bucketName</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;a-bucket&quot;</span>
<span class="hljs-type">val</span> <span class="hljs-variable">rootPath</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;files&quot;</span>
<span class="hljs-type">val</span> <span class="hljs-variable">minioAK</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;minioadmin&quot;</span>
<span class="hljs-type">val</span> <span class="hljs-variable">minioSK</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;minioadmin&quot;</span>
<span class="hljs-type">val</span> <span class="hljs-variable">minioEndpoint</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;localhost:9000&quot;</span>
<span class="hljs-type">val</span> <span class="hljs-variable">collectionName</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;hello_spark_milvus1&quot;</span>
<span class="hljs-type">val</span> <span class="hljs-variable">targetCollectionName</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;hello_spark_milvus2&quot;</span>

<span class="hljs-type">val</span> <span class="hljs-variable">properties</span> <span class="hljs-operator">=</span> Map(
MilvusOptions.MILVUS_HOST -&gt; host,
MilvusOptions.MILVUS_PORT -&gt; port.toString,
MilvusOptions.MILVUS_COLLECTION_NAME -&gt; collectionName,
MilvusOptions.MILVUS_BUCKET -&gt; bucketName,
MilvusOptions.MILVUS_ROOTPATH -&gt; rootPath,
MilvusOptions.MILVUS_FS -&gt; fs,
MilvusOptions.MILVUS_STORAGE_ENDPOINT -&gt; minioEndpoint,
MilvusOptions.MILVUS_STORAGE_USER -&gt; minioAK,
MilvusOptions.MILVUS_STORAGE_PASSWORD -&gt; minioSK,
)

<span class="hljs-comment">// 1, configurations</span>
<span class="hljs-type">val</span> <span class="hljs-variable">milvusOptions</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusOptions</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">CaseInsensitiveStringMap</span>(properties.asJava))

<span class="hljs-comment">// 2, batch read milvus collection data to dataframe</span>
<span class="hljs-comment">// Schema: dim of `embeddings` is 8</span>
<span class="hljs-comment">// +-+------------+------------+------------------+</span>
<span class="hljs-comment">// | | field name | field type | other attributes |</span>
<span class="hljs-comment">// +-+------------+------------+------------------+</span>
<span class="hljs-comment">// |1| &quot;pk&quot; | Int64 | is_primary=True |</span>
<span class="hljs-comment">// | | | | auto_id=False |</span>
<span class="hljs-comment">// +-+------------+------------+------------------+</span>
<span class="hljs-comment">// |2| &quot;random&quot; | Double | |</span>
<span class="hljs-comment">// +-+------------+------------+------------------+</span>
<span class="hljs-comment">// |3|&quot;embeddings&quot;| FloatVector| dim=8 |</span>
<span class="hljs-comment">// +-+------------+------------+------------------+</span>
<span class="hljs-type">val</span> <span class="hljs-variable">arrayToVectorUDF</span> <span class="hljs-operator">=</span> udf((arr: Seq[Double]) =&gt; Vectors.dense(arr.toArray[Double]))
<span class="hljs-type">val</span> <span class="hljs-variable">collectionDF</span> <span class="hljs-operator">=</span> MilvusUtils.readMilvusCollection(spark, milvusOptions)
.withColumn(<span class="hljs-string">&quot;embeddings_vec&quot;</span>, arrayToVectorUDF($<span class="hljs-string">&quot;embeddings&quot;</span>))
.drop(<span class="hljs-string">&quot;embeddings&quot;</span>)

<span class="hljs-comment">// 3. Use PCA to reduce dim of vector</span>
<span class="hljs-type">val</span> <span class="hljs-variable">dim</span> <span class="hljs-operator">=</span> <span class="hljs-number">4</span>
<span class="hljs-type">val</span> <span class="hljs-variable">pca</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">PCA</span>()
.setInputCol(<span class="hljs-string">&quot;embeddings_vec&quot;</span>)
.setOutputCol(<span class="hljs-string">&quot;pca_vec&quot;</span>)
.setK(dim)
.fit(collectionDF)
<span class="hljs-type">val</span> <span class="hljs-variable">vectorToArrayUDF</span> <span class="hljs-operator">=</span> udf((v: Vector) =&gt; v.toArray)
<span class="hljs-comment">// embeddings dim number reduce to 4</span>
<span class="hljs-comment">// +-+------------+------------+------------------+</span>
<span class="hljs-comment">// | | field name | field type | other attributes |</span>
<span class="hljs-comment">// +-+------------+------------+------------------+</span>
<span class="hljs-comment">// |1| &quot;pk&quot; | Int64 | is_primary=True |</span>
<span class="hljs-comment">// | | | | auto_id=False |</span>
<span class="hljs-comment">// +-+------------+------------+------------------+</span>
<span class="hljs-comment">// |2| &quot;random&quot; | Double | |</span>
<span class="hljs-comment">// +-+------------+------------+------------------+</span>
<span class="hljs-comment">// |3|&quot;embeddings&quot;| FloatVector| dim=4 |</span>
<span class="hljs-comment">// +-+------------+------------+------------------+</span>
<span class="hljs-type">val</span> <span class="hljs-variable">pcaDf</span> <span class="hljs-operator">=</span> pca.transform(collectionDF)
.withColumn(<span class="hljs-string">&quot;embeddings&quot;</span>, vectorToArrayUDF($<span class="hljs-string">&quot;pca_vec&quot;</span>))
.select(<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-string">&quot;random&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>)

<span class="hljs-comment">// 4. Write PCAed data to S3</span>
<span class="hljs-type">val</span> <span class="hljs-variable">outputPath</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;s3a://a-bucket/result&quot;</span>
pcaDf.write
.mode(<span class="hljs-string">&quot;overwrite&quot;</span>)
.format(<span class="hljs-string">&quot;parquet&quot;</span>)
.save(outputPath)

<span class="hljs-comment">// 5. Config MilvusOptions of target table </span>
<span class="hljs-type">val</span> <span class="hljs-variable">targetProperties</span> <span class="hljs-operator">=</span> Map(
MilvusOptions.MILVUS*HOST -&gt; host,
MilvusOptions.MILVUS_PORT -&gt; port.toString,
MilvusOptions.MILVUS_COLLECTION_NAME -&gt; targetCollectionName,
MilvusOptions.MILVUS_BUCKET -&gt; bucketName,
MilvusOptions.MILVUS_ROOTPATH -&gt; rootPath,
MilvusOptions.MILVUS_FS -&gt; fs,
MilvusOptions.MILVUS_STORAGE_ENDPOINT -&gt; minioEndpoint,
MilvusOptions.MILVUS_STORAGE_USER -&gt; minioAK,
MilvusOptions.MILVUS_STORAGE_PASSWORD -&gt; minioSK,
)
<span class="hljs-type">val</span> <span class="hljs-variable">targetMilvusOptions</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class*">MilvusOptions</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">CaseInsensitiveStringMap</span>(targetProperties.asJava))

<span class="hljs-comment">// 6. Bulkinsert Spark output files into milvus</span>
MilvusUtils.bulkInsertFromSpark(spark, targetMilvusOptions, outputPath, <span class="hljs-string">&quot;parquet&quot;</span>)
}
<button class="copy-code-btn"></button></code></pre>

<h3 id="Databricks---Zilliz-Cloud" class="common-anchor-header">Databricks -&gt; Zilliz Cloud</h3><p>Zilliz Cloud（マネージドMilvusサービス）を使用している場合、便利なData Import APIを活用することができます。Zilliz Cloudは、SparkやDatabricksを含む様々なデータソースからデータを効率的に移動するための包括的なツールとドキュメントを提供しています。S3バケットを仲介として設定し、Zilliz Cloudアカウントへのアクセスを開くだけです。Zilliz CloudのData Import APIが自動的にS3バケットからZilliz Cloudクラスタにデータをフルバッチでロードします。</p>
<p><strong>準備</strong></p>
<ol>
<li><p>Databricks Clusterにjarファイルを追加してSparkランタイムをロードします。</p>
<p>ライブラリのインストール方法は様々です。このスクリーンショットは、ローカルからクラスタにjarをアップロードしています。詳細については、Databricksドキュメントの<a href="https://docs.databricks.com/en/libraries/cluster-libraries.html">Cluster Librariesを</a>参照してください。</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/install-databricks-library.png" alt="Install Databricks Library" class="doc-image" id="install-databricks-library" />
   </span> <span class="img-wrapper"> <span>Databricksライブラリのインストール</span> </span></p></li>
<li><p>S3バケットを作成し、Databricksクラスタの外部ストレージとして設定します。</p>
<p>Bulkinsertは、Zilliz Cloudが一括でデータをインポートできるように、一時的なバケットにデータを保存する必要があります。S3バケットを作成し、Databricksの外部ロケーションとして設定することができます。詳細は<a href="https://docs.databricks.com/en/sql/language-manual/sql-ref-external-locations.html">外部ロケーションを</a>参照してください。</p></li>
<li><p>Databricks の認証情報を保護します。</p>
<p>詳細は、ブログ「<a href="https://www.databricks.com/blog/2018/06/04/securely-managing-credentials-in-databricks.html">Databricksで認証情報を安全に管理する</a>」の説明を参照してください。</p></li>
</ol>
<p><strong>デモ</strong></p>
<p>バッチデータ移行プロセスを紹介するコードスニペットです。上記のMilvusの例と同様に、クレデンシャルとS3バケットアドレスを置き換えるだけです。</p>
<pre><code translate="no" class="language-scala"><span class="hljs-comment">// Write the data in batch into the Milvus bucket storage.</span>
<span class="hljs-type">val</span> <span class="hljs-variable">outputPath</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;s3://my-temp-bucket/result&quot;</span>
df.write
  .mode(<span class="hljs-string">&quot;overwrite&quot;</span>)
  .format(<span class="hljs-string">&quot;mjson&quot;</span>)
  .save(outputPath)
<span class="hljs-comment">// Specify Milvus options.</span>
<span class="hljs-type">val</span> <span class="hljs-variable">targetProperties</span> <span class="hljs-operator">=</span> Map(
  MilvusOptions.MILVUS_URI -&gt; zilliz_uri,
  MilvusOptions.MILVUS_TOKEN -&gt; zilliz_token,
  MilvusOptions.MILVUS_COLLECTION_NAME -&gt; targetCollectionName,
  MilvusOptions.MILVUS_BUCKET -&gt; bucketName,
  MilvusOptions.MILVUS_ROOTPATH -&gt; rootPath,
  MilvusOptions.MILVUS_FS -&gt; fs,
  MilvusOptions.MILVUS_STORAGE_ENDPOINT -&gt; minioEndpoint,
  MilvusOptions.MILVUS_STORAGE_USER -&gt; minioAK,
  MilvusOptions.MILVUS_STORAGE_PASSWORD -&gt; minioSK,
)
<span class="hljs-type">val</span> <span class="hljs-variable">targetMilvusOptions</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusOptions</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">CaseInsensitiveStringMap</span>(targetProperties.asJava))
  
<span class="hljs-comment">// Bulk insert Spark output files into Milvus</span>
MilvusUtils.bulkInsertFromSpark(spark, targetMilvusOptions, outputPath, <span class="hljs-string">&quot;mjson&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Hands-on" class="common-anchor-header">ハンズオン<button data-href="#Hands-on" class="anchor-icon" translate="no">
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
    </button></h2><p>Spark-Milvus Connectorをすぐに使い始められるように、MilvusとZilliz Cloudを使ったストリーミングとバッチのデータ転送プロセスを説明したノートブックを用意しました。</p>
<ul>
<li><a href="https://zilliz.com/databricks_zilliz_demos">Spark-Milvus Connectorハンズオン</a></li>
</ul>
