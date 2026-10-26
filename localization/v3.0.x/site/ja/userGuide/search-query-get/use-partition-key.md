---
id: use-partition-key.md
title: パーティションキーの使用
summary: >-
  パーティションキーは、パーティションに基づく検索最適化の手法です。特定のスカラーフィールドをパーティションキーとして指定し、検索時にそのパーティションキーに基づいたフィルタリング条件を指定することで、検索範囲をいくつかのパーティションに絞り込み、検索効率を向上させることができます。本記事では、パーティションキーの使用方法と、それに伴う考慮事項について紹介します。
---
<h1 id="Use-Partition-Key" class="common-anchor-header">パーティションキーの使用<button data-href="#Use-Partition-Key" class="anchor-icon" translate="no">
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
    </button></h1><p>パーティションキーは、パーティションに基づく検索最適化ソリューションです。特定のスカラーフィールドをパーティションキーとして指定し、検索時にそのパーティションキーに基づくフィルタリング条件を指定することで、検索範囲をいくつかのパーティションに絞り込み、検索効率を向上させることができます。本記事では、パーティションキーの使用方法と関連する考慮事項について紹介します。</p>
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
    </button></h2><p>Milvusでは、パーティションを使用してデータの分離を実現し、検索範囲を特定のパーティションに限定することで、検索パフォーマンスを向上させることができます。 パーティションを手動で管理する場合、1つのコレクション内に最大1,024個のパーティションを作成でき、特定のルールに基づいてエンティティをこれらのパーティションに挿入することで、特定の数のパーティション内に検索を制限し、検索範囲を絞り込むことができます。</p>
<p>Milvusでは、コレクション内で作成できるパーティション数の制限を克服し、データ分離においてパーティションを再利用できるようにするために、パーティションキーを導入しています。コレクションを作成する際、スカラーフィールドをパーティションキーとして指定できます。コレクションの準備が整うと、Milvusはそのコレクション内に指定された数のパーティションを作成します。 エンティティの挿入を受け取ると、Milvusはそのエンティティのパーティションキー値を使用してハッシュ値を計算し、そのハッシュ値とコレクションの<code translate="no">partitions_num</code> プロパティに基づいて剰余演算を実行して対象のパーティションIDを取得し、そのエンティティを対象のパーティションに格納します。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/partition-vs-partition-key.png" alt="Partition Vs Partition Key" class="doc-image" id="partition-vs-partition-key" /> 
   <span>パーティションとパーティションキー</span>
  
 </span></p>
<p>次の図は、パーティションキー機能が有効な場合と無効な場合で、Milvusがコレクション内の検索リクエストをどのように処理するかを示しています。</p>
<ul>
<li><p>パーティションキーが無効になっている場合、Milvus はコレクション内でクエリベクトルに最も類似したエンティティを検索します。どのパーティションに最も関連性の高い結果が含まれているかを知っていれば、検索範囲を絞り込むことができます。</p></li>
<li><p>パーティションキーが有効になっている場合、Milvus は検索フィルターで指定されたパーティションキーの値に基づいて検索範囲を決定し、一致するパーティション内のエンティティのみをスキャンします。</p></li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/with-and-without-partition-key.png" alt="With And Without Partition Key" class="doc-image" id="with-and-without-partition-key" /> 
   <span>パーティションキーの有効／無効時</span>
  
 </span></p>
<h2 id="Use-Partition-Key" class="common-anchor-header">パーティションキーの使用<button data-href="#Use-Partition-Key" class="anchor-icon" translate="no">
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
    </button></h2><p>パーティションキーを使用するには、以下の操作が必要です。</p>
<ul>
<li><p><a href="/docs/ja/use-partition-key.md#Set-Partition-Key">パーティションキーを設定し</a>、</p></li>
<li><p><a href="/docs/ja/use-partition-key.md#Set-Partition-Numbers">作成するパーティション数を設定する</a>（オプション）、</p></li>
<li><p><a href="/docs/ja/use-partition-key.md#Create-Filtering-Condition">パーティションキーに基づくフィルタリング条件を作成し</a>、</p></li>
<li><p><a href="/docs/ja/use-partition-key.md#Index-Partition-Key">パーティションキーにインデックスを付与する</a>（推奨）。</p></li>
</ul>
<h3 id="Set-Partition-Key" class="common-anchor-header">パーティションキーの設定<button data-href="#Set-Partition-Key" class="anchor-icon" translate="no">
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
    </button></h3><p>スカラーフィールドをパーティションキーとして指定するには、そのスカラーフィールドを追加する際に、<code translate="no">is_partition_key</code> 属性を<code translate="no">true</code> に設定する必要があります。</p>
<div class="alert note">
<p>スカラーフィールドをパーティションキーとして設定する場合、そのフィールドの値は空またはnullであってはなりません。</p>
</div>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    MilvusClient, DataType
)

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

schema = client.create_schema()

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>)
    
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">5</span>)

<span class="hljs-comment"># Add the partition key</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>, 
    datatype=DataType.VARCHAR, 
    max_length=<span class="hljs-number">512</span>,
<span class="highlighted-wrapper-line">    is_partition_key=<span class="hljs-literal">True</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-comment">// Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());
        
<span class="hljs-comment">// Add the partition key</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)
        .dataType(DataType.VarChar)
        .maxLength(<span class="hljs-number">512</span>)
<span class="highlighted-wrapper-line">        .isPartitionKey(<span class="hljs-literal">true</span>)</span>
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v2/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

milvusAddr := <span class="hljs-string">&quot;localhost:19530&quot;</span>
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: milvusAddr,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">false</span>)
schema.WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;id&quot;</span>).
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(<span class="hljs-literal">true</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;my_varchar&quot;</span>).
    WithDataType(entity.FieldTypeVarChar).
    WithIsPartitionKey(<span class="hljs-literal">true</span>).
    WithMaxLength(<span class="hljs-number">512</span>),
).WithField(entity.NewField().
    WithName(<span class="hljs-string">&quot;vector&quot;</span>).
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(<span class="hljs-number">5</span>),
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-comment">// 3. Create a collection in customized setup mode</span>
<span class="hljs-comment">// 3.1 Define fields</span>
<span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-attr">is_partition_key</span>: <span class="hljs-literal">true</span></span>
    }
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{
        &quot;autoId&quot;: true,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            },
            {
                &quot;fieldName&quot;: &quot;my_varchar&quot;,
                &quot;dataType&quot;: &quot;VarChar&quot;,
                &quot;isPartitionKey&quot;: true,
                &quot;elementTypeParams&quot;: {
                    &quot;max_length&quot;: 512
                }
            }
        ]
    }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Partition-Numbers" class="common-anchor-header">パーティション数の設定<button data-href="#Set-Partition-Numbers" class="anchor-icon" translate="no">
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
    </button></h3><p>コレクション内のスカラーフィールドをパーティションキーとして指定すると、Milvus はそのコレクション内に自動的に 16 のパーティションを作成します。エンティティを受信すると、Milvus はそのエンティティのパーティションキー値に基づいてパーティションを選択し、そのパーティションにエンティティを格納します。その結果、一部のパーティションまたはすべてのパーティションに、異なるパーティションキー値を持つエンティティが格納されることになります。</p>
<p>また、コレクションの作成時に作成するパーティション数を指定することもできます。これは、スカラーフィールドがパーティションキーとして指定されている場合にのみ有効です。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
<span class="highlighted-wrapper-line">    num_partitions=<span class="hljs-number">128</span></span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
                .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
                .collectionSchema(schema)
                .numPartitions(<span class="hljs-number">128</span>)
                .build();
        client.createCollection(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithNumPartitions(<span class="hljs-number">128</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">create_collection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">num_partitions</span>: <span class="hljs-number">128</span>
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;partitionsNum&quot;: 128
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-Filtering-Condition" class="common-anchor-header">フィルタリング条件の作成<button data-href="#Create-Filtering-Condition" class="anchor-icon" translate="no">
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
    </button></h3><p>パーティションキー機能が有効になっているコレクションで ANN 検索を実行する場合、検索リクエストにパーティションキーを含むフィルタリング式を含める必要があります。フィルタリング式では、パーティションキーの値を特定の範囲に制限することで、Milvus が対応するパーティション内に検索範囲を限定するようにできます。</p>
<p>削除操作を実行する際は、より効率的な削除を実現するために、単一のパーティションキーを指定するフィルタ式を含めることをお勧めします。このアプローチにより、削除操作が特定のパーティションに限定されるため、コンパクション時の書き込み増幅が低減され、コンパクションおよびインデックス作成のためのリソースを節約できます。</p>
<p>以下の例は、特定のパーティションキー値およびパーティションキー値のセットに基づく、パーティションキーによるフィルタリングを示しています。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Filter based on a single partition key value, or</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>

<span class="hljs-comment"># Filter based on multiple partition key values</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Filter based on a single partition key value, or</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;partition_key == &#x27;x&#x27; &amp;&amp; &lt;other conditions&gt;&quot;</span>;

<span class="hljs-comment">// Filter based on multiple partition key values</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;partition_key in [&#x27;x&#x27;, &#x27;y&#x27;, &#x27;z&#x27;] &amp;&amp; &lt;other conditions&gt;&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Filter based on a single partition key value, or</span>
filter = <span class="hljs-string">&quot;partition_key == &#x27;x&#x27; &amp;&amp; &lt;other conditions&gt;&quot;</span>

<span class="hljs-comment">// Filter based on multiple partition key values</span>
filter = <span class="hljs-string">&quot;partition_key in [&#x27;x&#x27;, &#x27;y&#x27;, &#x27;z&#x27;] &amp;&amp; &lt;other conditions&gt;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Filter based on a single partition key value, or</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>

<span class="hljs-comment">// Filter based on multiple partition key values</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Filter based on a single partition key value, or</span>
<span class="hljs-built_in">export</span> filter=<span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>

<span class="hljs-comment"># Filter based on multiple partition key values</span>
<span class="hljs-built_in">export</span> filter=<span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">partition_key</code> を、パーティションキーとして指定されているフィールド名に置き換える必要があります。</p>
</div>
<h3 id="Index-Partition-Key" class="common-anchor-header">インデックス パーティションキー<button data-href="#Index-Partition-Key" class="anchor-icon" translate="no">
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
    </button></h3><p>パーティションキーフィールドに対してスカラーインデックスを作成することを推奨します。</p>
<p>パーティションキーは、一致するパーティションキー値を含む可能性のあるパーティションに検索範囲を絞り込みます。ただし、各パーティションには通常、多くの異なるパーティションキー値を持つエンティティが含まれているため、Milvusは検索対象のパーティション内のすべてのエンティティに対して、パーティションキーに基づくフィルタリングを評価し続けます。 そのフィールドにスカラーインデックスがない場合、その評価はフィールド値のフルスキャンとなり、大規模なコレクションでは検索レイテンシの大部分を占める可能性があります。スカラーインデックスがあれば、Milvusは代わりにインデックス内から一致するエンティティを検索します。</p>
<p>この評価は、ベクトルインデックスのタイプに関係なく行われます。Milvusは、パーティションキーの値をHNSW系ベクトルインデックスに埋め込むことができるため、パーティションキーでフィルタリングされた検索では関連するサブインデックスのみを走査しますが、この最適化はベクトルの走査範囲を狭めるだけであり、フィルタの評価そのものを排除するものではありません。 スカラーフィールドのみでフィルタリングを行う検索には、これと同等のショートカットは存在しません。いずれの場合も、パーティションキーフィールドに対するスカラーインデックスが存在することで、評価が高速に実行されます。</p>
<p>パーティションキーフィールドに基づいてインデックスタイプを選択してください：</p>
<ul>
<li><p><a href="/docs/ja/inverted.md">INVERTEDは</a>、パーティションキーに基づくフィルタが<code translate="no">==</code> および<code translate="no">in</code> 条件を使用するため、ほとんどのパーティションキーフィールドに適しています。</p></li>
<li><p><a href="/docs/ja/bitmap.md">BITMAPは</a>、固有値が少ないフィールドに適しています。一般的な指針として、フィールドの固有値が500未満の場合にのみ使用してください。</p></li>
<li><p><a href="/docs/ja/stl-sort.md">STL_SORTは</a>、数値型および<code translate="no">VARCHAR</code> 型のフィールドに対する代替手段となります。</p></li>
</ul>
<p>以下の例では、ベクトルフィールドのインデックスに加え、パーティションキーフィールドに<code translate="no">INVERTED</code> インデックスをコレクションのインデックスパラメータに追加しています。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)

<span class="hljs-comment"># Index the partition key</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span></span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.*;

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());

<span class="hljs-comment">// Index the partition key</span>
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)
<span class="highlighted-wrapper-line">        .indexType(IndexParam.IndexType.INVERTED)</span>
        .build());

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">indexOptions := []milvusclient.CreateIndexOption{
    milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;vector&quot;</span>,
        index.NewAutoIndex(entity.COSINE)),
    <span class="hljs-comment">// Index the partition key</span>
    milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-string">&quot;my_varchar&quot;</span>,
        index.NewInvertedIndex()),
}

<span class="hljs-keyword">for</span> _, opt := <span class="hljs-keyword">range</span> indexOptions {
    indexTask, err := client.CreateIndex(ctx, opt)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        fmt.Println(err.Error())
        <span class="hljs-comment">// handle error</span>
    }
    err = indexTask.Await(ctx)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [{
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>
},{
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-comment">// Index the partition key</span>
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,
<span class="highlighted-wrapper-line">    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;INVERTED&quot;</span></span>
}]

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>(index_params)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[
        {
            &quot;fieldName&quot;: &quot;vector&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;indexName&quot;: &quot;vector&quot;,
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;
        },
        {
            &quot;fieldName&quot;: &quot;my_varchar&quot;,
            &quot;indexName&quot;: &quot;my_varchar&quot;,
            &quot;indexType&quot;: &quot;INVERTED&quot;
        }
    ]&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>コレクションを作成する際にこれらのインデックスパラメータを渡すか、既存のコレクションに対してインデックスを作成してください。詳細については、「<a href="/docs/ja/create-collection.md">コレクションの作成</a>」を参照してください。</p>
<h2 id="Use-Partition-Key-Isolation" class="common-anchor-header">パーティションキーの分離の利用<button data-href="#Use-Partition-Key-Isolation" class="anchor-icon" translate="no">
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
    </button></h2><p>マルチテナント環境では、テナント ID に関連するスカラーフィールドをパーティションキーとして指定し、このスカラーフィールドの特定の値に基づいてフィルターを作成できます。同様のシナリオにおける検索パフォーマンスをさらに向上させるため、Milvus では「パーティションキーの分離」機能を導入しています。</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/partition-key-isolation.png" alt="Partition Key Isolation" class="doc-image" id="partition-key-isolation" /> 
   <span>パーティションキーの分離</span>
  
 </span></p>
<p>上の図に示すように、Milvus はパーティションキーの値に基づいてエンティティをグループ化し、これらのグループごとに個別のインデックスを作成します。 検索リクエストを受信すると、Milvusはフィルタリング条件で指定されたパーティションキーの値に基づいてインデックスを特定し、検索範囲をそのインデックスに含まれるエンティティ内に限定します。これにより、検索中に無関係なエンティティをスキャンすることを回避し、検索パフォーマンスを大幅に向上させます。</p>
<p>パーティションキー分離を有効にした場合は、Milvus が一致するインデックスに含まれるエンティティの範囲内に検索範囲を制限できるように、パーティションキーベースのフィルタには 1 つの特定の値のみを含める必要があります。</p>
<div class="alert note">
<p>現在、パーティションキー分離機能は、インデックスタイプが HNSW に設定されている検索にのみ適用されます。</p>
</div>
<p>パーティションキー分離は、パーティションキーフィールドのスカラーインデックスに取って代わるものではありません。フィルタ内のパーティションキー値は、一致するサブインデックスを特定しますが、Milvus は依然としてフィルタ自体を評価して一致するエンティティを特定するため、<a href="/docs/ja/use-partition-key.md#Index-Partition-Key">パーティションキーもインデックスに登録することを</a>お勧めします。</p>
<h3 id="Enable-Partition-Key-Isolation" class="common-anchor-header">パーティションキー分離の有効化<button data-href="#Enable-Partition-Key-Isolation" class="anchor-icon" translate="no">
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
    </button></h3><p>以下のコード例は、パーティションキー分離を有効にする方法を示しています。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_collection(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    schema=schema,
<span class="highlighted-wrapper-line">    properties={<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>: <span class="hljs-literal">True</span>}</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

Map&lt;String, String&gt; properties = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
properties.put(<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>, <span class="hljs-string">&quot;true&quot;</span>);

<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)
        .collectionSchema(schema)
        .properties(properties)
        .build();
client.createCollection(createCollectionReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;my_collection&quot;</span>, schema).
        WithProperty(<span class="hljs-string">&quot;partitionkey.isolation&quot;</span>, <span class="hljs-literal">true</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-attr">properties</span>: {
        <span class="hljs-string">&quot;partitionkey.isolation&quot;</span>: <span class="hljs-literal">true</span>
    }
})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{
    &quot;partitionKeyIsolation&quot;: true
}&#x27;</span>

<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;my_collection\&quot;,
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>
}&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>パーティションキー分離を有効にした後も、「<a href="/docs/ja/use-partition-key.md#Set-Partition-Numbers">パーティション番号の設定</a>」で説明されているように、パーティションキーやパーティション数を設定することは可能です。ただし、パーティションキーに基づくフィルターには、特定のパーティションキー値のみを含める必要がある点に注意してください。</p>
