---
id: default-values.md
title: デフォルト値
summary: スカラーフィールドのデフォルト値を設定し、エンティティの挿入時にMilvusが欠落値を補完するようにします。
---
<h1 id="Default-Values" class="common-anchor-header">デフォルト値<button data-href="#Default-Values" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus では、スカラーフィールド（プライマリフィールドを除く）に対してデフォルト値を設定できます。フィールドにデフォルト値が設定されている場合、挿入時にデータが指定されないときは、Milvus が自動的にこの値を適用します。</p>
<p>デフォルト値を設定することで、既存のデフォルト値の設定を維持できるため、他のデータベースシステムからMilvusへのデータ移行が簡素化されます。また、挿入時に値が不明確な可能性があるフィールドに対しても、デフォルト値を使用することができます。</p>
<h2 id="Limits" class="common-anchor-header">制限事項<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>デフォルト値がサポートされているのはスカラーフィールドのみです。プライマリフィールドおよびベクトルフィールドにはデフォルト値を設定できません。</p></li>
<li><p><code translate="no">JSON</code> および<code translate="no">ARRAY</code> フィールドは、デフォルト値をサポートしていません。</p></li>
<li><p>デフォルト値はコレクションの作成時にのみ設定でき、作成後の変更はできません。</p></li>
</ul>
<h2 id="Set-default-values" class="common-anchor-header">デフォルト値の設定<button data-href="#Set-default-values" class="anchor-icon" translate="no">
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
    </button></h2><p>コレクションを作成する際は、<code translate="no">add_field()</code> の `<code translate="no">default_value</code> ` パラメータを使用して、フィールドのデフォルト値を定義します。</p>
<p>次の例では、デフォルト値を持つ 2 つのスカラーフィールドを持つコレクションを作成しています。<code translate="no">age</code> のデフォルト値は<code translate="no">18</code> 、<code translate="no">status</code> のデフォルト値は<code translate="no">&quot;active&quot;</code> です。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(uri=<span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>, token=<span class="hljs-string">&#x27;root:Milvus&#x27;</span>)

<span class="hljs-comment"># Drop the collection if it already exists</span>
<span class="hljs-keyword">if</span> client.has_collection(<span class="hljs-string">&quot;my_collection&quot;</span>):
    client.drop_collection(<span class="hljs-string">&quot;my_collection&quot;</span>)

<span class="hljs-comment"># Define collection schema</span>
schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
<span class="highlighted-comment-line">schema.add_field(field_name=<span class="hljs-string">&quot;age&quot;</span>, datatype=DataType.INT64, default_value=<span class="hljs-number">18</span>)</span>
<span class="highlighted-comment-line">schema.add_field(field_name=<span class="hljs-string">&quot;status&quot;</span>, datatype=DataType.VARCHAR, default_value=<span class="hljs-string">&quot;active&quot;</span>, max_length=<span class="hljs-number">10</span>)</span>

<span class="hljs-comment"># Set index params</span>
index_params = client.prepare_index_params()
index_params.add_index(field_name=<span class="hljs-string">&quot;vector&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)

<span class="hljs-comment"># Create collection</span>
client.create_collection(collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, schema=schema, index_params=index_params)

<span class="hljs-comment"># Load the collection</span>
client.load_collection(<span class="hljs-string">&quot;my_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.HasCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;
<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build());

<span class="hljs-type">String</span> <span class="hljs-variable">collectionName</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;my_collection&quot;</span>;

<span class="hljs-comment">// Drop the collection if it already exists</span>
<span class="hljs-keyword">if</span> (client.hasCollection(HasCollectionReq.builder().collectionName(collectionName).build())) {
    client.dropCollection(DropCollectionReq.builder().collectionName(collectionName).build());
}

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(<span class="hljs-literal">true</span>)
        .build();

schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .autoID(<span class="hljs-literal">false</span>)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">5</span>)
        .build());
<span class="highlighted-comment-line">schema.addField(AddFieldReq.builder()</span>
<span class="highlighted-comment-line">        .fieldName(<span class="hljs-string">&quot;age&quot;</span>)</span>
<span class="highlighted-comment-line">        .dataType(DataType.Int64)</span>
<span class="highlighted-comment-line">        .defaultValue(<span class="hljs-number">18L</span>)</span>
<span class="highlighted-comment-line">        .build());</span>
<span class="highlighted-comment-line">schema.addField(AddFieldReq.builder()</span>
<span class="highlighted-comment-line">        .fieldName(<span class="hljs-string">&quot;status&quot;</span>)</span>
<span class="highlighted-comment-line">        .dataType(DataType.VarChar)</span>
<span class="highlighted-comment-line">        .defaultValue(<span class="hljs-string">&quot;active&quot;</span>)</span>
<span class="highlighted-comment-line">        .maxLength(<span class="hljs-number">10</span>)</span>
<span class="highlighted-comment-line">        .build());</span>

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.L2)
        .build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName(collectionName)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build());

<span class="hljs-comment">// Load the collection</span>
client.loadCollection(LoadCollectionReq.builder()
        .collectionName(collectionName)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    milvusclient <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

collectionName := <span class="hljs-string">&quot;my_collection&quot;</span>

<span class="hljs-comment">// Drop the collection if it already exists</span>
has, err := client.HasCollection(ctx, milvusclient.NewHasCollectionOption(collectionName))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<span class="hljs-keyword">if</span> has {
    err = client.DropCollection(ctx, milvusclient.NewDropCollectionOption(collectionName))
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(err)
    }
}

schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">true</span>).
    WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;id&quot;</span>).
        WithDataType(entity.FieldTypeInt64).
        WithIsPrimaryKey(<span class="hljs-literal">true</span>).
        WithIsAutoID(<span class="hljs-literal">false</span>)).
    WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;vector&quot;</span>).
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(<span class="hljs-number">5</span>)).
    WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;age&quot;</span>).
        WithDataType(entity.FieldTypeInt64).
        WithDefaultValueLong(<span class="hljs-number">18</span>)).
    WithField(entity.NewField().
        WithName(<span class="hljs-string">&quot;status&quot;</span>).
        WithDataType(entity.FieldTypeVarChar).
        WithDefaultValueString(<span class="hljs-string">&quot;active&quot;</span>).
        WithMaxLength(<span class="hljs-number">10</span>))

indexOption := milvusclient.NewCreateIndexOption(
    collectionName,
    <span class="hljs-string">&quot;vector&quot;</span>,
    index.NewAutoIndex(entity.L2),
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(collectionName, schema).
    WithIndexOptions(indexOption))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(collectionName))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<span class="hljs-keyword">if</span> err := loadTask.Await(ctx); err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::error::<span class="hljs-type">Result</span>;
<span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-keyword">const</span> COLLECTION_NAME: &amp;<span class="hljs-type">str</span> = <span class="hljs-string">&quot;my_collection&quot;</span>;

<span class="hljs-comment">// Drop the collection if it already exists</span>
<span class="hljs-keyword">if</span> client
    .<span class="hljs-title function_ invoke__">has_collection</span>(
        HasCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(COLLECTION_NAME)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?
    .<span class="hljs-title function_ invoke__">exists</span>()
{
    client
        .<span class="hljs-title function_ invoke__">drop_collection</span>(
            DropCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
                .<span class="hljs-title function_ invoke__">collection_name</span>(COLLECTION_NAME)
                .<span class="hljs-title function_ invoke__">build</span>()?,
        )
        .<span class="hljs-keyword">await</span>?;
}

<span class="hljs-comment">// Define the collection schema</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">schema</span> = CollectionSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">enable_dynamic_field</span>(<span class="hljs-literal">true</span>)
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;id&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64)
            .<span class="hljs-title function_ invoke__">primary_key</span>(<span class="hljs-literal">true</span>)
            .<span class="hljs-title function_ invoke__">auto_id</span>(<span class="hljs-literal">false</span>),
    )
    .<span class="hljs-title function_ invoke__">add_field</span>(
        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector)
            .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">5</span>),
    )
<span class="highlighted-comment-line">    .<span class="hljs-title function_ invoke__">add_field</span>(</span>
<span class="highlighted-comment-line">        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()</span>
<span class="highlighted-comment-line">            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;age&quot;</span>)</span>
<span class="highlighted-comment-line">            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64)</span>
<span class="highlighted-comment-line">            .<span class="hljs-title function_ invoke__">default_value</span>(DefaultValue::<span class="hljs-title function_ invoke__">Int64</span>(<span class="hljs-number">18</span>)),</span>
<span class="highlighted-comment-line">    )</span>
<span class="highlighted-comment-line">    .<span class="hljs-title function_ invoke__">add_field</span>(</span>
<span class="highlighted-comment-line">        FieldSchema::<span class="hljs-title function_ invoke__">new</span>()</span>
<span class="highlighted-comment-line">            .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;status&quot;</span>)</span>
<span class="highlighted-comment-line">            .<span class="hljs-title function_ invoke__">data_type</span>(DataType::VarChar)</span>
<span class="highlighted-comment-line">            .<span class="hljs-title function_ invoke__">default_value</span>(DefaultValue::<span class="hljs-title function_ invoke__">String</span>(<span class="hljs-string">&quot;active&quot;</span>.<span class="hljs-title function_ invoke__">into</span>()))</span>
<span class="highlighted-comment-line">            .<span class="hljs-title function_ invoke__">max_length</span>(<span class="hljs-number">10</span>),</span>
<span class="highlighted-comment-line">    );</span>

client
    .<span class="hljs-title function_ invoke__">create_collection</span>(
        CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(COLLECTION_NAME)
            .<span class="hljs-title function_ invoke__">schema</span>(schema)
            .<span class="hljs-title function_ invoke__">index_params</span>(<span class="hljs-built_in">vec!</span>[IndexParam::<span class="hljs-title function_ invoke__">new</span>()
                .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;vector&quot;</span>)
                .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
                .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::L2)])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

client
    .<span class="hljs-title function_ invoke__">load_collection</span>(
        LoadCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(COLLECTION_NAME)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;string&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();

milvus::ConnectParam connect_param{<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-string">&quot;root:Milvus&quot;</span>};
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(connect_param);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-type">const</span> std::string collection_name = <span class="hljs-string">&quot;my_collection&quot;</span>;

<span class="hljs-comment">// Drop the collection if it already exists</span>
milvus::HasCollectionResponse has_resp;
status = client-&gt;<span class="hljs-built_in">HasCollection</span>(milvus::<span class="hljs-built_in">HasCollectionRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(collection_name), has_resp);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<span class="hljs-keyword">if</span> (has_resp.<span class="hljs-built_in">Has</span>()) {
    status = client-&gt;<span class="hljs-built_in">DropCollection</span>(milvus::<span class="hljs-built_in">DropCollectionRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(collection_name));
    <span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
        std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    }
}

milvus::CollectionSchemaPtr schema = std::<span class="hljs-built_in">make_shared</span>&lt;milvus::CollectionSchema&gt;();
schema-&gt;<span class="hljs-built_in">AddField</span>({<span class="hljs-string">&quot;id&quot;</span>, milvus::DataType::INT64, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>});
schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;vector&quot;</span>, milvus::DataType::FLOAT_VECTOR).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">5</span>));
<span class="highlighted-comment-line">schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;age&quot;</span>, milvus::DataType::INT64).<span class="hljs-built_in">WithDefaultValue</span>(<span class="hljs-number">18</span>));</span>
<span class="highlighted-comment-line">schema-&gt;<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;status&quot;</span>, milvus::DataType::VARCHAR).<span class="hljs-built_in">WithDefaultValue</span>(<span class="hljs-string">&quot;active&quot;</span>).<span class="hljs-built_in">WithMaxLength</span>(<span class="hljs-number">10</span>));</span>

status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
                                        .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                                        .<span class="hljs-built_in">WithCollectionSchema</span>(schema)
                                        .<span class="hljs-built_in">AddIndex</span>(milvus::<span class="hljs-built_in">IndexDesc</span>(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-string">&quot;vector_index&quot;</span>, milvus::IndexType::AUTOINDEX, milvus::MetricType::L2)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">LoadCollection</span>(milvus::<span class="hljs-built_in">LoadCollectionRequest</span>().<span class="hljs-built_in">WithCollectionName</span>(collection_name));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span>, <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
  <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>,
  <span class="hljs-attr">token</span>: <span class="hljs-string">&#x27;root:Milvus&#x27;</span>,
});

<span class="hljs-keyword">const</span> collectionName = <span class="hljs-string">&#x27;my_collection&#x27;</span>;

<span class="hljs-comment">// Drop the collection if it already exists</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollection</span>({ <span class="hljs-attr">collection_name</span>: collectionName }).<span class="hljs-title function_">catch</span>(<span class="hljs-function">() =&gt;</span> {});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: collectionName,
  <span class="hljs-attr">enable_dynamic_field</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">fields</span>: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;id&#x27;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
      <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span>,
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
      <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>,
    },
<span class="highlighted-comment-line">    {</span>
<span class="highlighted-comment-line">      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;age&#x27;</span>,</span>
<span class="highlighted-comment-line">      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,</span>
<span class="highlighted-comment-line">      <span class="hljs-attr">default_value</span>: <span class="hljs-number">18</span>,</span>
<span class="highlighted-comment-line">    },</span>
<span class="highlighted-comment-line">    {</span>
<span class="highlighted-comment-line">      <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;status&#x27;</span>,</span>
<span class="highlighted-comment-line">      <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,</span>
<span class="highlighted-comment-line">      <span class="hljs-attr">default_value</span>: <span class="hljs-string">&#x27;active&#x27;</span>,</span>
<span class="highlighted-comment-line">      <span class="hljs-attr">max_length</span>: <span class="hljs-number">10</span>,</span>
<span class="highlighted-comment-line">    },</span>
  ],
});

<span class="hljs-comment">// Create an index on the vector field</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
  <span class="hljs-attr">collection_name</span>: collectionName,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&#x27;AUTOINDEX&#x27;</span>,
  <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&#x27;L2&#x27;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;vector_index&#x27;</span>,
});

<span class="hljs-comment">// Load the collection</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({ <span class="hljs-attr">collection_name</span>: collectionName });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> config = <span class="hljs-keyword">new</span> ConnectConfig
{
    Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span>
};
<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(config);
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Drop the collection if it already exists</span>
<span class="hljs-keyword">if</span> ((<span class="hljs-keyword">await</span> client.HasCollectionAsync(<span class="hljs-keyword">new</span> HasCollectionReq { CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span> })).Has)
{
    <span class="hljs-keyword">await</span> client.DropCollectionAsync(<span class="hljs-keyword">new</span> DropCollectionReq { CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span> });
}

<span class="hljs-comment">// Define collection schema</span>
<span class="hljs-keyword">var</span> ageField = <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;age&quot;</span>, DataType.Int64) { DefaultValue = <span class="hljs-number">18L</span> };
<span class="hljs-keyword">var</span> statusField = FieldSchema.CreateVarchar(<span class="hljs-string">&quot;status&quot;</span>, maxLength: <span class="hljs-number">10</span>);
statusField.DefaultValue = <span class="hljs-string">&quot;active&quot;</span>;

<span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> CollectionSchema
{
    EnableDynamicFields = <span class="hljs-literal">true</span>,
    Fields =
    {
        <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;id&quot;</span>, DataType.Int64, isPrimaryKey: <span class="hljs-literal">true</span>),
        FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;vector&quot;</span>, dimension: <span class="hljs-number">5</span>),
        ageField,
        statusField
    }
};

<span class="hljs-comment">// Set index params</span>
<span class="hljs-keyword">var</span> indexParam = <span class="hljs-keyword">new</span> IndexParam(
    fieldName: <span class="hljs-string">&quot;vector&quot;</span>,
    indexType: IndexType.AutoIndex,
    metricType: MetricType.L2);

<span class="hljs-comment">// Create collection</span>
<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Schema = schema,
    Indexes = [indexParam]
});

<span class="hljs-comment">// Load the collection</span>
<span class="hljs-keyword">await</span> client.LoadCollectionAsync(<span class="hljs-keyword">new</span> LoadCollectionReq { CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span> });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

<span class="hljs-comment"># Drop the collection if it already exists</span>
curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/drop&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{&quot;collectionName&quot;: &quot;my_collection&quot;}&#x27;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;schema&quot;: {
      &quot;enableDynamicField&quot;: true,
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
            &quot;dim&quot;: 5
          }
        },
        {
          &quot;fieldName&quot;: &quot;age&quot;,
          &quot;dataType&quot;: &quot;Int64&quot;,
          &quot;defaultValue&quot;: 18
        },
        {
          &quot;fieldName&quot;: &quot;status&quot;,
          &quot;dataType&quot;: &quot;VarChar&quot;,
          &quot;defaultValue&quot;: &quot;active&quot;,
          &quot;elementTypeParams&quot;: {
            &quot;max_length&quot;: 10
          }
        }
      ]
    },
    &quot;indexParams&quot;: [
      {
        &quot;fieldName&quot;: &quot;vector&quot;,
        &quot;indexName&quot;: &quot;vector_index&quot;,
        &quot;indexType&quot;: &quot;AUTOINDEX&quot;,
        &quot;metricType&quot;: &quot;L2&quot;
      }
    ]
  }&#x27;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-entities" class="common-anchor-header">エンティティの挿入<button data-href="#Insert-entities" class="anchor-icon" translate="no">
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
    </button></h2><p>データを挿入する際、デフォルト値を持つフィールドを省略するか、明示的にNULLに設定した場合、Milvusは設定されたデフォルト値を自動的に使用します。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">data = [
    <span class="hljs-comment"># All fields provided explicitly</span>
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-string">&quot;status&quot;</span>: <span class="hljs-string">&quot;premium&quot;</span>},
    <span class="hljs-comment"># age and status omitted → both use default values (18 and &quot;active&quot;)</span>
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>]},
    <span class="hljs-comment"># status set to None → uses default value &quot;active&quot;</span>
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>], <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;status&quot;</span>: <span class="hljs-literal">None</span>},
    <span class="hljs-comment"># age set to None → uses default value 18</span>
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>], <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-literal">None</span>, <span class="hljs-string">&quot;status&quot;</span>: <span class="hljs-string">&quot;inactive&quot;</span>}
]

client.insert(collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, data=data)

<span class="hljs-comment"># Flush so the inserted rows are immediately queryable</span>
client.flush(collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonNull;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.FlushReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">String</span> <span class="hljs-variable">collectionName</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;my_collection&quot;</span>;

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; data = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

<span class="hljs-comment">// All fields provided explicitly</span>
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1L</span>);
row1.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>}));
row1.addProperty(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">30L</span>);
row1.addProperty(<span class="hljs-string">&quot;status&quot;</span>, <span class="hljs-string">&quot;premium&quot;</span>);
data.add(row1);

<span class="hljs-comment">// age and status omitted: both use default values (18 and &quot;active&quot;)</span>
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2L</span>);
row2.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span>}));
data.add(row2);

<span class="hljs-comment">// status set to null: uses default value &quot;active&quot;</span>
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row3</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row3.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">3L</span>);
row3.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span>, <span class="hljs-number">0.7f</span>}));
row3.addProperty(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25L</span>);
row3.add(<span class="hljs-string">&quot;status&quot;</span>, JsonNull.INSTANCE);
data.add(row3);

<span class="hljs-comment">// age set to null: uses default value 18</span>
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row4</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row4.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">4L</span>);
row4.add(<span class="hljs-string">&quot;vector&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span>, <span class="hljs-number">0.7f</span>, <span class="hljs-number">0.8f</span>}));
row4.add(<span class="hljs-string">&quot;age&quot;</span>, JsonNull.INSTANCE);
row4.addProperty(<span class="hljs-string">&quot;status&quot;</span>, <span class="hljs-string">&quot;inactive&quot;</span>);
data.add(row4);

client.insert(InsertReq.builder()
        .collectionName(collectionName)
        .data(data)
        .build());

<span class="hljs-comment">// Flush so the inserted rows are immediately queryable</span>
client.flush(FlushReq.builder()
        .collectionNames(Collections.singletonList(collectionName))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>

    milvusclient <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

collectionName = <span class="hljs-string">&quot;my_collection&quot;</span>

ageColumn, err := column.NewNullableColumnInt64(
    <span class="hljs-string">&quot;age&quot;</span>,
    []<span class="hljs-type">int64</span>{<span class="hljs-number">30</span>, <span class="hljs-number">0</span>, <span class="hljs-number">25</span>, <span class="hljs-number">0</span>},
    []<span class="hljs-type">bool</span>{<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>},
    column.WithSparseNullableMode[<span class="hljs-type">int64</span>](<span class="hljs-literal">true</span>),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

statusColumn, err := column.NewNullableColumnVarChar(
    <span class="hljs-string">&quot;status&quot;</span>,
    []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;premium&quot;</span>, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-string">&quot;inactive&quot;</span>},
    []<span class="hljs-type">bool</span>{<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>},
    column.WithSparseNullableMode[<span class="hljs-type">string</span>](<span class="hljs-literal">true</span>),
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(collectionName,
    column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>}),
    column.NewColumnFloatVector(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-number">5</span>, [][]<span class="hljs-type">float32</span>{
        {<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>},
        {<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>},
        {<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>},
        {<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>},
    }),
    <span class="hljs-comment">// age: row 2 and row 4 use the default value 18</span>
    ageColumn,
    <span class="hljs-comment">// status: row 2 and row 3 use the default value &quot;active&quot;</span>
    statusColumn,
))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

<span class="hljs-comment">// Flush so the inserted rows are immediately queryable</span>
flushTask, err := client.Flush(ctx, milvusclient.NewFlushOption(collectionName))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<span class="hljs-keyword">if</span> err := flushTask.Await(ctx); err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">const</span> COLLECTION_NAME: &amp;<span class="hljs-type">str</span> = <span class="hljs-string">&quot;my_collection&quot;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">rows</span> = <span class="hljs-built_in">vec!</span>[
    json!({<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-string">&quot;status&quot;</span>: <span class="hljs-string">&quot;premium&quot;</span>}),
    json!({<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>]}),
    json!({<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>], <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;status&quot;</span>: null}),
    json!({<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&quot;vector&quot;</span>: [<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>], <span class="hljs-string">&quot;age&quot;</span>: null, <span class="hljs-string">&quot;status&quot;</span>: <span class="hljs-string">&quot;inactive&quot;</span>}),
];

client
    .<span class="hljs-title function_ invoke__">insert</span>(
        InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(COLLECTION_NAME)
            .<span class="hljs-title function_ invoke__">rows</span>(rows)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

client
    .<span class="hljs-title function_ invoke__">flush</span>(
        FlushRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_names</span>([COLLECTION_NAME])
            .<span class="hljs-title function_ invoke__">wait_flushed_ms</span>(<span class="hljs-number">60_000</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;string&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-type">const</span> std::string collection_name = <span class="hljs-string">&quot;my_collection&quot;</span>;

milvus::EntityRows rows;
rows.<span class="hljs-built_in">push_back</span>({{<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>}, {<span class="hljs-string">&quot;vector&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>}}, {<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">30</span>}, {<span class="hljs-string">&quot;status&quot;</span>, <span class="hljs-string">&quot;premium&quot;</span>}});
rows.<span class="hljs-built_in">push_back</span>({{<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>}, {<span class="hljs-string">&quot;vector&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span>}}});
rows.<span class="hljs-built_in">push_back</span>({{<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">3</span>}, {<span class="hljs-string">&quot;vector&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span>, <span class="hljs-number">0.7f</span>}}, {<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-number">25</span>}, {<span class="hljs-string">&quot;status&quot;</span>, <span class="hljs-literal">nullptr</span>}});
rows.<span class="hljs-built_in">push_back</span>({{<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">4</span>}, {<span class="hljs-string">&quot;vector&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span>, <span class="hljs-number">0.7f</span>, <span class="hljs-number">0.8f</span>}}, {<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-literal">nullptr</span>}, {<span class="hljs-string">&quot;status&quot;</span>, <span class="hljs-string">&quot;inactive&quot;</span>}});

milvus::InsertResponse resp_insert;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Insert</span>(milvus::<span class="hljs-built_in">InsertRequest</span>()
                                 .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                                 .<span class="hljs-built_in">WithRowsData</span>(std::<span class="hljs-built_in">move</span>(rows)),
                             resp_insert);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">Flush</span>(milvus::<span class="hljs-built_in">FlushRequest</span>()
                           .<span class="hljs-built_in">WithCollectionNames</span>({collection_name})
                           .<span class="hljs-built_in">WithWaitFlushedMs</span>(<span class="hljs-number">60000</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [
  <span class="hljs-comment">// All fields provided explicitly</span>
  { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>], <span class="hljs-attr">age</span>: <span class="hljs-number">30</span>, <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;premium&#x27;</span> },
  <span class="hljs-comment">// age and status omitted: both use default values (18 and &quot;active&quot;)</span>
  { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>] },
  <span class="hljs-comment">// status set to null: uses default value &quot;active&quot;</span>
  { <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>], <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>, <span class="hljs-attr">status</span>: <span class="hljs-literal">null</span> },
  <span class="hljs-comment">// age set to null: uses default value 18</span>
  { <span class="hljs-attr">id</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">vector</span>: [<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>], <span class="hljs-attr">age</span>: <span class="hljs-literal">null</span>, <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;inactive&#x27;</span> },
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: collectionName,
  <span class="hljs-attr">fields_data</span>: data,
});

<span class="hljs-comment">// Flush so the inserted rows are immediately queryable</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">flush</span>({ <span class="hljs-attr">collection_names</span>: [collectionName] });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;

<span class="hljs-keyword">var</span> data = <span class="hljs-keyword">new</span>[]
{
    <span class="hljs-comment">// All fields provided explicitly</span>
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
    {
        [<span class="hljs-string">&quot;id&quot;</span>] = <span class="hljs-number">1L</span>, [<span class="hljs-string">&quot;vector&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span> }, [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-number">30L</span>, [<span class="hljs-string">&quot;status&quot;</span>] = <span class="hljs-string">&quot;premium&quot;</span>
    },
    <span class="hljs-comment">// age and status omitted → both use default values (18 and &quot;active&quot;)</span>
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
    {
        [<span class="hljs-string">&quot;id&quot;</span>] = <span class="hljs-number">2L</span>, [<span class="hljs-string">&quot;vector&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span> }
    },
    <span class="hljs-comment">// status set to None → uses default value &quot;active&quot;</span>
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
    {
        [<span class="hljs-string">&quot;id&quot;</span>] = <span class="hljs-number">3L</span>, [<span class="hljs-string">&quot;vector&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span>, <span class="hljs-number">0.7f</span> }, [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-number">25L</span>, [<span class="hljs-string">&quot;status&quot;</span>] = <span class="hljs-literal">null</span>
    },
    <span class="hljs-comment">// age set to None → uses default value 18</span>
    <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
    {
        [<span class="hljs-string">&quot;id&quot;</span>] = <span class="hljs-number">4L</span>, [<span class="hljs-string">&quot;vector&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.5f</span>, <span class="hljs-number">0.6f</span>, <span class="hljs-number">0.7f</span>, <span class="hljs-number">0.8f</span> }, [<span class="hljs-string">&quot;age&quot;</span>] = <span class="hljs-literal">null</span>, [<span class="hljs-string">&quot;status&quot;</span>] = <span class="hljs-string">&quot;inactive&quot;</span>
    }
};

<span class="hljs-keyword">await</span> client.InsertAsync(<span class="hljs-keyword">new</span> InsertReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    RowsData = data
});

<span class="hljs-comment">// Flush so the inserted rows are immediately queryable</span>
<span class="hljs-keyword">await</span> client.FlushAsync(<span class="hljs-keyword">new</span> Milvus.Client.V2.Requests.Utility.FlushReq { CollectionNames = [<span class="hljs-string">&quot;my_collection&quot;</span>] });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [
      {
        &quot;id&quot;: 1,
        &quot;vector&quot;: [0.1, 0.2, 0.3, 0.4, 0.5],
        &quot;age&quot;: 30,
        &quot;status&quot;: &quot;premium&quot;
      },
      {
        &quot;id&quot;: 2,
        &quot;vector&quot;: [0.2, 0.3, 0.4, 0.5, 0.6]
      },
      {
        &quot;id&quot;: 3,
        &quot;vector&quot;: [0.3, 0.4, 0.5, 0.6, 0.7],
        &quot;age&quot;: 25,
        &quot;status&quot;: null
      },
      {
        &quot;id&quot;: 4,
        &quot;vector&quot;: [0.4, 0.5, 0.6, 0.7, 0.8],
        &quot;age&quot;: null,
        &quot;status&quot;: &quot;inactive&quot;
      }
    ]
  }&#x27;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/flush&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search-and-query-with-default-values" class="common-anchor-header">デフォルト値を用いた検索とクエリ<button data-href="#Search-and-query-with-default-values" class="anchor-icon" translate="no">
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
    </button></h2><p>デフォルト値を含むエンティティは、ベクトル検索やスカラーフィルタリングにおいて、他のエンティティと同様に動作します。<code translate="no">search</code> および<code translate="no">query</code> の両方の操作において、デフォルト値によるフィルタリングが可能です。</p>
<p>次の例は、<code translate="no">age</code> がデフォルト値<code translate="no">18</code> と等しいエンティティを検索するものです：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.5</span>]],
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">16</span>}},
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;age == 18&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search results (age == 18):&quot;</span>)
<span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> res[<span class="hljs-number">0</span>]:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  id: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, age: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;age&#x27;</span>]}</span>, status: <span class="hljs-subst">{hit[<span class="hljs-string">&#x27;entity&#x27;</span>][<span class="hljs-string">&#x27;status&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;
<span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-type">String</span> <span class="hljs-variable">collectionName</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;my_collection&quot;</span>;

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(collectionName)
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(Arrays.asList(<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.5f</span>))))
        .annsField(<span class="hljs-string">&quot;vector&quot;</span>)
        .searchParams(Collections.singletonMap(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">16</span>))
        .filter(<span class="hljs-string">&quot;age == 18&quot;</span>)
        .limit(<span class="hljs-number">10</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());

System.out.println(<span class="hljs-string">&quot;Search results (age == 18):&quot;</span>);
<span class="hljs-keyword">for</span> (SearchResp.SearchResult hit : searchResp.getSearchResults().get(<span class="hljs-number">0</span>)) {
    System.out.printf(<span class="hljs-string">&quot;  id: %s, age: %s, status: %s%n&quot;</span>,
            hit.getId(),
            hit.getEntity().get(<span class="hljs-string">&quot;age&quot;</span>),
            hit.getEntity().get(<span class="hljs-string">&quot;status&quot;</span>));
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

    milvusclient <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

collectionName = <span class="hljs-string">&quot;my_collection&quot;</span>

annParam := index.NewCustomAnnParam()
annParam.WithExtraParam(<span class="hljs-string">&quot;nprobe&quot;</span>, <span class="hljs-number">16</span>)

searchResults, err := client.Search(ctx, milvusclient.NewSearchOption(
    collectionName,
    <span class="hljs-number">10</span>,
    []entity.Vector{entity.FloatVector([]<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.5</span>})},
).
    WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithAnnParam(annParam).
    WithFilter(<span class="hljs-string">&quot;age == 18&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>).
    WithConsistencyLevel(entity.ClStrong))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

fmt.Println(<span class="hljs-string">&quot;Search results (age == 18):&quot;</span>)
<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> searchResults {
    fmt.Println(resultSet.Fields)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

<span class="hljs-keyword">const</span> COLLECTION_NAME: &amp;<span class="hljs-type">str</span> = <span class="hljs-string">&quot;my_collection&quot;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">search</span>(
        SearchRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(COLLECTION_NAME)
            .<span class="hljs-title function_ invoke__">vector_field</span>(<span class="hljs-string">&quot;vector&quot;</span>)
            .<span class="hljs-title function_ invoke__">vectors</span>(SearchVectors::<span class="hljs-title function_ invoke__">Float</span>(<span class="hljs-built_in">vec!</span>[<span class="hljs-built_in">vec!</span>[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.5</span>]]))
            .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;age == 18&quot;</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>])
            .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([(<span class="hljs-string">&quot;nprobe&quot;</span>.<span class="hljs-title function_ invoke__">into</span>(), <span class="hljs-string">&quot;16&quot;</span>.<span class="hljs-title function_ invoke__">into</span>())]))
            .<span class="hljs-title function_ invoke__">limit</span>(<span class="hljs-number">10</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;Search results (age == 18):&quot;</span>);
<span class="hljs-keyword">for</span> <span class="hljs-variable">result</span> <span class="hljs-keyword">in</span> response.<span class="hljs-title function_ invoke__">results</span>() {
    <span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> result.<span class="hljs-title function_ invoke__">rows</span>()? {
        <span class="hljs-keyword">let</span> <span class="hljs-variable">e</span> = row.<span class="hljs-title function_ invoke__">to_entity_row</span>()?;
        <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;  id: {}, age: {}, status: {}&quot;</span>, e[<span class="hljs-string">&quot;id&quot;</span>], e[<span class="hljs-string">&quot;age&quot;</span>], e[<span class="hljs-string">&quot;status&quot;</span>]);
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;string&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;vector&gt;</span></span>

<span class="hljs-type">const</span> std::string collection_name = <span class="hljs-string">&quot;my_collection&quot;</span>;

std::string filter = <span class="hljs-string">&quot;age == 18&quot;</span>;
std::vector&lt;<span class="hljs-type">float</span>&gt; query_vector = {<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.5f</span>};
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">SearchRequest</span>()
                   .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                   .<span class="hljs-built_in">WithFilter</span>(filter)
                   .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">10</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;id&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;age&quot;</span>)
                   .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;status&quot;</span>)
                   .<span class="hljs-built_in">AddFloatVector</span>(query_vector);

milvus::SearchResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

std::cout &lt;&lt; <span class="hljs-string">&quot;Search results (age == 18):&quot;</span> &lt;&lt; std::endl;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">auto</span>&amp; result : response.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    milvus::EntityRows output_rows;
    status = result.<span class="hljs-built_in">OutputRows</span>(output_rows);
    <span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; row : output_rows) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;  id: &quot;</span> &lt;&lt; row[<span class="hljs-string">&quot;id&quot;</span>] &lt;&lt; <span class="hljs-string">&quot;, age: &quot;</span> &lt;&lt; row[<span class="hljs-string">&quot;age&quot;</span>] &lt;&lt; <span class="hljs-string">&quot;, status: &quot;</span> &lt;&lt; row[<span class="hljs-string">&quot;status&quot;</span>] &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> searchResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
  <span class="hljs-attr">collection_name</span>: collectionName,
  <span class="hljs-attr">data</span>: [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.5</span>]],
  <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&#x27;vector&#x27;</span>,
  <span class="hljs-attr">params</span>: { <span class="hljs-attr">nprobe</span>: <span class="hljs-number">16</span> },
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;age == 18&#x27;</span>,
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;id&#x27;</span>, <span class="hljs-string">&#x27;age&#x27;</span>, <span class="hljs-string">&#x27;status&#x27;</span>],
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&#x27;Strong&#x27;</span>,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Search results (age == 18):&#x27;</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> hit <span class="hljs-keyword">of</span> searchResults.<span class="hljs-property">results</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`  id: <span class="hljs-subst">${hit.id}</span>, age: <span class="hljs-subst">${hit.age}</span>, status: <span class="hljs-subst">${hit.status}</span>`</span>);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Responses.Dql;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

SearchResp res = <span class="hljs-keyword">await</span> client.SearchAsync(<span class="hljs-keyword">new</span> SearchReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Vectors = [<span class="hljs-keyword">new</span> ReadOnlyMemory&lt;<span class="hljs-built_in">float</span>&gt;(<span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.4f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.5f</span> })],
    VectorFieldName = <span class="hljs-string">&quot;vector&quot;</span>,
    MetricType = MetricType.L2,
    Limit = <span class="hljs-number">10</span>,
    Parameters = <span class="hljs-keyword">new</span> SearchParameters
    {
        Nprobe = <span class="hljs-number">16</span>,
        Expression = <span class="hljs-string">&quot;age == 18&quot;</span>,
        OutputFields = { <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span> }
    }
});
Console.WriteLine(<span class="hljs-string">&quot;Search results (age == 18):&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;data&quot;: [[0.1, 0.2, 0.4, 0.3, 0.5]],
    &quot;annsField&quot;: &quot;vector&quot;,
    &quot;searchParams&quot;: {
      &quot;params&quot;: {
        &quot;nprobe&quot;: 16
      }
    },
    &quot;filter&quot;: &quot;age == 18&quot;,
    &quot;limit&quot;: 10,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;age&quot;, &quot;status&quot;],
    &quot;consistencyLevel&quot;: &quot;Strong&quot;
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>期待される出力</summary></p>
<pre><code translate="no" class="language-plaintext">Output:
Search results (age == 18):
  id: 2, age: 18, status: active
  id: 4, age: 18, status: inactive
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>デフォルト値と直接照合してエンティティをクエリすることもできます：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   C#</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Query entities where age equals the default value (18)</span>
default_age_results = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;age == 18&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nQuery results (age == 18):&quot;</span>)
<span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> default_age_results:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  id: <span class="hljs-subst">{r[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, age: <span class="hljs-subst">{r[<span class="hljs-string">&#x27;age&#x27;</span>]}</span>, status: <span class="hljs-subst">{r[<span class="hljs-string">&#x27;status&#x27;</span>]}</span>&quot;</span>)

<span class="hljs-comment"># Query entities where status equals the default value (&quot;active&quot;)</span>
default_status_results = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\nQuery results (status == &#x27;active&#x27;):&quot;</span>)
<span class="hljs-keyword">for</span> r <span class="hljs-keyword">in</span> default_status_results:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;  id: <span class="hljs-subst">{r[<span class="hljs-string">&#x27;id&#x27;</span>]}</span>, age: <span class="hljs-subst">{r[<span class="hljs-string">&#x27;age&#x27;</span>]}</span>, status: <span class="hljs-subst">{r[<span class="hljs-string">&#x27;status&#x27;</span>]}</span>&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;
<span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-type">String</span> <span class="hljs-variable">collectionName</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;my_collection&quot;</span>;

<span class="hljs-comment">// Query entities where age equals the default value (18)</span>
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">defaultAgeResults</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(collectionName)
        .filter(<span class="hljs-string">&quot;age == 18&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());

System.out.println(<span class="hljs-string">&quot;\nQuery results (age == 18):&quot;</span>);
<span class="hljs-keyword">for</span> (QueryResp.QueryResult row : defaultAgeResults.getQueryResults()) {
    System.out.printf(<span class="hljs-string">&quot;  id: %s, age: %s, status: %s%n&quot;</span>,
            row.getEntity().get(<span class="hljs-string">&quot;id&quot;</span>),
            row.getEntity().get(<span class="hljs-string">&quot;age&quot;</span>),
            row.getEntity().get(<span class="hljs-string">&quot;status&quot;</span>));
}

<span class="hljs-comment">// Query entities where status equals the default value (&quot;active&quot;)</span>
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">defaultStatusResults</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(collectionName)
        .filter(<span class="hljs-string">&quot;status == \&quot;active\&quot;&quot;</span>)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());

System.out.println(<span class="hljs-string">&quot;\nQuery results (status == &#x27;active&#x27;):&quot;</span>);
<span class="hljs-keyword">for</span> (QueryResp.QueryResult row : defaultStatusResults.getQueryResults()) {
    System.out.printf(<span class="hljs-string">&quot;  id: %s, age: %s, status: %s%n&quot;</span>,
            row.getEntity().get(<span class="hljs-string">&quot;id&quot;</span>),
            row.getEntity().get(<span class="hljs-string">&quot;age&quot;</span>),
            row.getEntity().get(<span class="hljs-string">&quot;status&quot;</span>));
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;fmt&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>

    milvusclient <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

collectionName = <span class="hljs-string">&quot;my_collection&quot;</span>

<span class="hljs-comment">// Query entities where age equals the default value (18)</span>
defaultAgeResults, err := client.Query(ctx, milvusclient.NewQueryOption(collectionName).
    WithFilter(<span class="hljs-string">&quot;age == 18&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>).
    WithConsistencyLevel(entity.ClStrong))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

fmt.Println(<span class="hljs-string">&quot;\nQuery results (age == 18):&quot;</span>)
fmt.Println(defaultAgeResults.Fields)

<span class="hljs-comment">// Query entities where status equals the default value (&quot;active&quot;)</span>
defaultStatusResults, err := client.Query(ctx, milvusclient.NewQueryOption(collectionName).
    WithFilter(<span class="hljs-string">`status == &quot;active&quot;`</span>).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>).
    WithConsistencyLevel(entity.ClStrong))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

fmt.Println(<span class="hljs-string">&quot;\nQuery results (status == &#x27;active&#x27;):&quot;</span>)
fmt.Println(defaultStatusResults.Fields)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">const</span> COLLECTION_NAME: &amp;<span class="hljs-type">str</span> = <span class="hljs-string">&quot;my_collection&quot;</span>;

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">query</span>(
        QueryRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(COLLECTION_NAME)
            .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;age == 18&quot;</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;\nQuery results (age == 18):&quot;</span>);
<span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> response.<span class="hljs-title function_ invoke__">results</span>().<span class="hljs-title function_ invoke__">rows</span>()? {
    <span class="hljs-keyword">let</span> <span class="hljs-variable">e</span> = row.<span class="hljs-title function_ invoke__">to_entity_row</span>()?;
    <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;  id: {}, age: {}, status: {}&quot;</span>, e[<span class="hljs-string">&quot;id&quot;</span>], e[<span class="hljs-string">&quot;age&quot;</span>], e[<span class="hljs-string">&quot;status&quot;</span>]);
}

<span class="hljs-keyword">let</span> <span class="hljs-variable">response</span> = client
    .<span class="hljs-title function_ invoke__">query</span>(
        QueryRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(COLLECTION_NAME)
            .<span class="hljs-title function_ invoke__">filter</span>(<span class="hljs-string">&quot;status == \&quot;active\&quot;&quot;</span>)
            .<span class="hljs-title function_ invoke__">output_fields</span>([<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>])
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;

<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;\nQuery results (status == &#x27;active&#x27;):&quot;</span>);
<span class="hljs-keyword">for</span> <span class="hljs-variable">row</span> <span class="hljs-keyword">in</span> response.<span class="hljs-title function_ invoke__">results</span>().<span class="hljs-title function_ invoke__">rows</span>()? {
    <span class="hljs-keyword">let</span> <span class="hljs-variable">e</span> = row.<span class="hljs-title function_ invoke__">to_entity_row</span>()?;
    <span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;  id: {}, age: {}, status: {}&quot;</span>, e[<span class="hljs-string">&quot;id&quot;</span>], e[<span class="hljs-string">&quot;age&quot;</span>], e[<span class="hljs-string">&quot;status&quot;</span>]);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;string&gt;</span></span>

<span class="hljs-type">const</span> std::string collection_name = <span class="hljs-string">&quot;my_collection&quot;</span>;

<span class="hljs-comment">// Query entities where age equals the default value (18)</span>
std::string filter = <span class="hljs-string">&quot;age == 18&quot;</span>;
<span class="hljs-keyword">auto</span> request = milvus::<span class="hljs-built_in">QueryRequest</span>()
                       .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                       .<span class="hljs-built_in">WithFilter</span>(filter)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;id&quot;</span>)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;age&quot;</span>)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;status&quot;</span>);

milvus::QueryResponse response;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Query</span>(request, response);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

std::cout &lt;&lt; <span class="hljs-string">&quot;\nQuery results (age == 18):&quot;</span> &lt;&lt; std::endl;
milvus::EntityRows output_rows;
status = response.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">OutputRows</span>(output_rows);
<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; row : output_rows) {
    std::cout &lt;&lt; <span class="hljs-string">&quot;  id: &quot;</span> &lt;&lt; row[<span class="hljs-string">&quot;id&quot;</span>] &lt;&lt; <span class="hljs-string">&quot;, age: &quot;</span> &lt;&lt; row[<span class="hljs-string">&quot;age&quot;</span>] &lt;&lt; <span class="hljs-string">&quot;, status: &quot;</span> &lt;&lt; row[<span class="hljs-string">&quot;status&quot;</span>] &lt;&lt; std::endl;
}

<span class="hljs-comment">// Query entities where status equals the default value (&quot;active&quot;)</span>
std::string filter2 = <span class="hljs-string">&quot;status == \&quot;active\&quot;&quot;</span>;
<span class="hljs-keyword">auto</span> request2 = milvus::<span class="hljs-built_in">QueryRequest</span>()
                       .<span class="hljs-built_in">WithCollectionName</span>(collection_name)
                       .<span class="hljs-built_in">WithFilter</span>(filter2)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;id&quot;</span>)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;age&quot;</span>)
                       .<span class="hljs-built_in">AddOutputField</span>(<span class="hljs-string">&quot;status&quot;</span>);

milvus::QueryResponse response2;
status = client-&gt;<span class="hljs-built_in">Query</span>(request2, response2);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

std::cout &lt;&lt; <span class="hljs-string">&quot;\nQuery results (status == &#x27;active&#x27;):&quot;</span> &lt;&lt; std::endl;
milvus::EntityRows output_rows2;
status = response<span class="hljs-number">2.</span><span class="hljs-built_in">Results</span>().<span class="hljs-built_in">OutputRows</span>(output_rows2);
<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; row : output_rows2) {
    std::cout &lt;&lt; <span class="hljs-string">&quot;  id: &quot;</span> &lt;&lt; row[<span class="hljs-string">&quot;id&quot;</span>] &lt;&lt; <span class="hljs-string">&quot;, age: &quot;</span> &lt;&lt; row[<span class="hljs-string">&quot;age&quot;</span>] &lt;&lt; <span class="hljs-string">&quot;, status: &quot;</span> &lt;&lt; row[<span class="hljs-string">&quot;status&quot;</span>] &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Query entities where age equals the default value (18)</span>
<span class="hljs-keyword">const</span> defaultAgeResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
  <span class="hljs-attr">collection_name</span>: collectionName,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;age == 18&#x27;</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;id&#x27;</span>, <span class="hljs-string">&#x27;age&#x27;</span>, <span class="hljs-string">&#x27;status&#x27;</span>],
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&#x27;Strong&#x27;</span>,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;\nQuery results (age == 18):&#x27;</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> row <span class="hljs-keyword">of</span> defaultAgeResults.<span class="hljs-property">data</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`  id: <span class="hljs-subst">${row.id}</span>, age: <span class="hljs-subst">${row.age}</span>, status: <span class="hljs-subst">${row.status}</span>`</span>);
}

<span class="hljs-comment">// Query entities where status equals the default value (&quot;active&quot;)</span>
<span class="hljs-keyword">const</span> defaultStatusResults = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
  <span class="hljs-attr">collection_name</span>: collectionName,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;status == &quot;active&quot;&#x27;</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&#x27;id&#x27;</span>, <span class="hljs-string">&#x27;age&#x27;</span>, <span class="hljs-string">&#x27;status&#x27;</span>],
  <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&#x27;Strong&#x27;</span>,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;\nQuery results (status == &#x27;active&#x27;):&quot;</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> row <span class="hljs-keyword">of</span> defaultStatusResults.<span class="hljs-property">data</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`  id: <span class="hljs-subst">${row.id}</span>, age: <span class="hljs-subst">${row.age}</span>, status: <span class="hljs-subst">${row.status}</span>`</span>);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dql;

QueryResp defaultAgeResults = <span class="hljs-keyword">await</span> client.QueryAsync(<span class="hljs-keyword">new</span> QueryReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Expression = <span class="hljs-string">&quot;age == 18&quot;</span>,
    Parameters = <span class="hljs-keyword">new</span> QueryParameters
    {
        OutputFields = { <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span> }
    }
});

Console.WriteLine(<span class="hljs-string">&quot;Query results (age == 18):&quot;</span>);

QueryResp defaultStatusResults = <span class="hljs-keyword">await</span> client.QueryAsync(<span class="hljs-keyword">new</span> QueryReq
{
    CollectionName = <span class="hljs-string">&quot;my_collection&quot;</span>,
    Expression = <span class="hljs-string">&quot;status == \&quot;active\&quot;&quot;</span>,
    Parameters = <span class="hljs-keyword">new</span> QueryParameters
    {
        OutputFields = { <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;status&quot;</span> }
    }
});

Console.WriteLine(<span class="hljs-string">&quot;Query results (status == &#x27;active&#x27;):&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;filter&quot;: &quot;age == 18&quot;,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;age&quot;, &quot;status&quot;],
    &quot;consistencyLevel&quot;: &quot;Strong&quot;
  }&#x27;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;my_collection&quot;,
    &quot;filter&quot;: &quot;status == \&quot;active\&quot;&quot;,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;age&quot;, &quot;status&quot;],
    &quot;consistencyLevel&quot;: &quot;Strong&quot;
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><details></p>
<p><summary>期待される出力</summary></p>
<pre><code translate="no" class="language-plaintext">Query results (age == 18):
  id: 2, age: 18, status: active
  id: 4, age: 18, status: inactive

Query results (status == &#x27;active&#x27;):
  id: 2, age: 18, status: active
  id: 3, age: 25, status: active
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h2 id="Applicable-rules" class="common-anchor-header">適用されるルール<button data-href="#Applicable-rules" class="anchor-icon" translate="no">
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
    </button></h2><p>あるフィールドに対して<code translate="no">nullable</code> と<code translate="no">default_value</code> の両方が設定されている場合、挿入時にMilvusがNULL入力やフィールド値の欠落をどのように処理するかは、以下のルールによって決定されます。</p>
<table>
   <tr>
     <th><p>Null可能</p></th>
     <th><p>デフォルト値</p></th>
     <th><p>ユーザー入力</p></th>
     <th><p>結果</p></th>
   </tr>
   <tr>
     <td><p>✅</p></td>
     <td><p>✅ (NULL以外)</p></td>
     <td><p>NULL または省略</p></td>
     <td><p>デフォルト値を使用</p></td>
   </tr>
   <tr>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>NULL または省略</p></td>
     <td><p>NULLとして格納される</p></td>
   </tr>
   <tr>
     <td><p>❌</p></td>
     <td><p>✅ (NULL以外)</p></td>
     <td><p>NULL または省略</p></td>
     <td><p>デフォルト値を使用</p></td>
   </tr>
   <tr>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>NULL または省略</p></td>
     <td><p>エラーを発生させる</p></td>
   </tr>
   <tr>
     <td><p>❌</p></td>
     <td><p>✅ (NULL)</p></td>
     <td><p>NULL または省略</p></td>
     <td><p>エラーが発生します</p></td>
   </tr>
</table>
<p><strong>重要なポイント：</strong></p>
<ul>
<li><p>フィールドにNULL以外のデフォルト値が設定されている場合、<code translate="no">nullable</code> が有効かどうかにかかわらず、その値が使用されます。</p></li>
<li><p><code translate="no">nullable=True</code> が有効で、デフォルト値が設定されていない場合、そのフィールドにはNULLが格納されます。</p></li>
<li><p><code translate="no">nullable=False</code> が有効で、かつデフォルト値が設定されていない場合、挿入はエラーで失敗します。</p></li>
<li><p>NULLを許可しないフィールドにNULLのデフォルト値を設定することは無効であり、エラーが発生します。</p></li>
</ul>
