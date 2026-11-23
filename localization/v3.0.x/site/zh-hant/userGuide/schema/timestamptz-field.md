---
id: timestamptz-field.md
title: TIMESTAMPTZ 欄位Compatible with Milvus 2.6.6+
summary: >-
  跨區域進行時間追蹤的應用程式（例如電子商務系統、協作工具或分散式日誌系統）需要精確處理包含時區的時戳。Milvus 中的 TIMESTAMPTZ
  資料型別透過將時戳與其對應的時區一併儲存，來提供此項功能。
beta: Milvus 2.6.6+
---
<h1 id="TIMESTAMPTZ-Field" class="common-anchor-header">TIMESTAMPTZ 欄位<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.6+</span><button data-href="#TIMESTAMPTZ-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>跨區域追蹤時間的應用程式（例如電子商務系統、協作工具或分散式日誌系統）需要精確處理包含時區的時間戳記。Milvus 中的<code translate="no">TIMESTAMPTZ</code> 資料型別可透過儲存附帶相關時區的時間戳記來提供此功能。</p>
<h2 id="What-is-a-TIMESTAMPTZ-field" class="common-anchor-header">什麼是 TIMESTAMPTZ 欄位？<button data-href="#What-is-a-TIMESTAMPTZ-field" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">TIMESTAMPTZ</code> 欄位是 Milvus 中一種由模式定義的資料型別（<code translate="no">DataType.TIMESTAMPTZ</code> ），用於處理具備時區資訊的輸入，並在內部將所有時間點儲存為 UTC 絕對時間：</p>
<ul>
<li><p><strong>可接受的輸入格式</strong>：包含時區偏移量的<a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>字串（例如，<code translate="no">&quot;2025-05-01T23:59:59+08:00&quot;</code> 表示 2025 年 5 月 1 日晚上 11:59:59（UTC+08:00））。</p></li>
<li><p><strong>內部儲存</strong>：所有<code translate="no">TIMESTAMPTZ</code> 值均經標準化處理，並以<a href="https://en.wikipedia.org/wiki/Coordinated_Universal_Time">協調世界時</a>（UTC）儲存。</p></li>
<li><p><strong>比較與篩選</strong>：所有篩選與排序操作均以 UTC 為基準進行，確保在不同時區間能獲得一致且可預測的結果。</p></li>
</ul>
<div class="alert note">
<ul>
<li><p>您可以為「<code translate="no">TIMESTAMPTZ</code> 」欄位設定「<code translate="no">nullable=True</code> 」，以允許缺失值。</p></li>
<li><p>您可以使用<code translate="no">default_value</code> 屬性，以<a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>格式指定預設時間戳記值。</p></li>
</ul>
<p>詳情請參閱「<a href="/docs/zh-hant/nullable-and-default.md">可為空與預設值</a>」。</p>
</div>
<h2 id="Basic-operations" class="common-anchor-header">基本操作<button data-href="#Basic-operations" class="anchor-icon" translate="no">
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
    </button></h2><p>使用<code translate="no">TIMESTAMPTZ</code> 欄位的基礎工作流程與 Milvus 中的其他標量欄位相同：定義欄位 → 插入資料 → 查詢／篩選。</p>
<h3 id="Step-1-Define-a-TIMESTAMPTZ-field" class="common-anchor-header">步驟 1：定義 TIMESTAMPTZ 欄位<button data-href="#Step-1-Define-a-TIMESTAMPTZ-field" class="anchor-icon" translate="no">
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
    </button></h3><p>若要使用<code translate="no">TIMESTAMPTZ</code> 欄位，請在建立集合時，於集合架構中明確定義該欄位。以下範例示範如何建立一個包含<code translate="no">tsz</code> 欄位（類型為<code translate="no">DataType.TIMESTAMPTZ</code> ）的集合。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> time
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType
<span class="hljs-keyword">import</span> datetime
<span class="hljs-keyword">import</span> pytz

server_address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
collection_name = <span class="hljs-string">&quot;timestamptz_test123&quot;</span>

client = MilvusClient(uri=server_address)

<span class="hljs-keyword">if</span> client.has_collection(collection_name):
    client.drop_collection(collection_name)

schema = client.create_schema()
<span class="hljs-comment"># Add a primary key field</span>
schema.add_field(<span class="hljs-string">&quot;id&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
<span class="hljs-comment"># Add a TIMESTAMPTZ field that allows null values</span>
<span class="highlighted-wrapper-line">schema.add_field(<span class="hljs-string">&quot;tsz&quot;</span>, DataType.TIMESTAMPTZ, nullable=<span class="hljs-literal">True</span>)</span>
<span class="hljs-comment"># Add a vector field</span>
schema.add_field(<span class="hljs-string">&quot;vec&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)

client.create_collection(collection_name, schema=schema, consistency_level=<span class="hljs-string">&quot;Session&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; with a TimestampTz field created successfully.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.HasCollectionReq;

<span class="hljs-type">String</span> <span class="hljs-variable">serverAddress</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-type">String</span> <span class="hljs-variable">collectionName</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;timestamptz_test123&quot;</span>;

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()
        .uri(serverAddress)
        .build());

<span class="hljs-keyword">if</span> (client.hasCollection(HasCollectionReq.builder()
        .collectionName(collectionName)
        .build())) {
    client.dropCollection(DropCollectionReq.builder()
            .collectionName(collectionName)
            .build());
}

CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
<span class="hljs-comment">// Add a primary key field</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
        .dataType(DataType.Int64)
        .isPrimaryKey(<span class="hljs-literal">true</span>)
        .build());
<span class="hljs-comment">// Add a TIMESTAMPTZ field that allows null values</span>
<span class="highlighted-wrapper-line">schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;tsz&quot;</span>).dataType(DataType.Timestamptz).isNullable(<span class="hljs-literal">true</span>).build());</span>
<span class="hljs-comment">// Add a vector field</span>
schema.addField(AddFieldReq.builder()
        .fieldName(<span class="hljs-string">&quot;vec&quot;</span>)
        .dataType(DataType.FloatVector)
        .dimension(<span class="hljs-number">4</span>)
        .build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName(collectionName)
        .collectionSchema(schema)
        .consistencyLevel(ConsistencyLevel.SESSION)
        .build());
System.out.printf(<span class="hljs-string">&quot;Collection &#x27;%s&#x27; with a TimestampTz field created successfully.%n&quot;</span>, collectionName);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> server_address = <span class="hljs-string">&quot;localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> collection_name = <span class="hljs-string">&quot;timestamptz_test123&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: server_address });

<span class="hljs-keyword">const</span> has = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">hasCollection</span>({ <span class="hljs-attr">collection_name</span>: collection_name });
<span class="hljs-keyword">if</span> (has.<span class="hljs-property">value</span>) {
    <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollection</span>({ <span class="hljs-attr">collection_name</span>: collection_name });
}

<span class="hljs-keyword">const</span> schema = [
    <span class="hljs-comment">// Add a primary key field</span>
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span> },
    <span class="hljs-comment">// Add a TIMESTAMPTZ field that allows null values</span>
<span class="highlighted-wrapper-line">    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;tsz&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Timestamptz</span>, <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span> },</span>
    <span class="hljs-comment">// Add a vector field</span>
    { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vec&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">dim</span>: <span class="hljs-number">4</span> },
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: collection_name,
    <span class="hljs-attr">schema</span>: schema,
    <span class="hljs-attr">consistency_level</span>: <span class="hljs-string">&quot;Session&quot;</span>,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Collection &#x27;<span class="hljs-subst">${collection_name}</span>&#x27; with a TimestampTz field created successfully.`</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx, cancel := context.WithCancel(context.Background())
<span class="hljs-keyword">defer</span> cancel()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

collectionName := <span class="hljs-string">&quot;timestamptz_test123&quot;</span>
has, err := cli.HasCollection(ctx, milvusclient.NewHasCollectionOption(collectionName))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
<span class="hljs-keyword">if</span> has {
    err = cli.DropCollection(ctx, milvusclient.NewDropCollectionOption(collectionName))
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        fmt.Println(err.Error())
        <span class="hljs-keyword">return</span>
    }
}

schema := entity.NewSchema().
    WithName(collectionName).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;id&quot;</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;tsz&quot;</span>).WithDataType(entity.FieldTypeTimestamptz).WithNullable(<span class="hljs-literal">true</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;vec&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">4</span>))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(collectionName, schema).
    WithConsistencyLevel(entity.ClSession))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Printf(<span class="hljs-string">&quot;Collection &#x27;%s&#x27; with a TimestampTz field created successfully.\n&quot;</span>, collectionName)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;timestamptz_test123&quot;,
    &quot;schema&quot;: {
        &quot;autoID&quot;: false,
        &quot;enableDynamicField&quot;: false,
        &quot;fields&quot;: [
            {&quot;fieldName&quot;: &quot;id&quot;, &quot;dataType&quot;: &quot;Int64&quot;, &quot;isPrimary&quot;: true},
            {&quot;fieldName&quot;: &quot;tsz&quot;, &quot;dataType&quot;: &quot;Timestamptz&quot;, &quot;nullable&quot;: true},
            {&quot;fieldName&quot;: &quot;vec&quot;, &quot;dataType&quot;: &quot;FloatVector&quot;, &quot;elementTypeParams&quot;: {&quot;dim&quot;: 4}}
        ]
    },
    &quot;consistencyLevel&quot;: &quot;Session&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-2-Insert-data" class="common-anchor-header">步驟 2：插入資料<button data-href="#Step-2-Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>插入包含 ISO 8601 字串及時區偏移量的實體。</p>
<p>以下範例將 8,193 筆範例資料插入至集合中。每筆資料包含：</p>
<ul>
<li><p>一個唯一 ID</p></li>
<li><p>一個支援時區的時戳（上海時間）</p></li>
<li><p>一個簡單的 4 維向量</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python">data_size = <span class="hljs-number">8193</span>

<span class="hljs-comment"># Get the Asia/Shanghai time zone using the pytz library</span>
<span class="hljs-comment"># You can use any valid IANA time zone identifier such as:</span>
<span class="hljs-comment">#   &quot;Asia/Tokyo&quot;, &quot;America/New_York&quot;, &quot;Europe/London&quot;, &quot;UTC&quot;, etc.</span>
<span class="hljs-comment"># To view all available values:</span>
<span class="hljs-comment">#   import pytz; print(pytz.all_timezones)</span>
<span class="hljs-comment"># Reference:</span>
<span class="hljs-comment">#   IANA database – https://www.iana.org/time-zones</span>
<span class="hljs-comment">#   Wikipedia – https://en.wikipedia.org/wiki/List_of_tz_database_time_zones</span>
shanghai_tz = pytz.timezone(<span class="hljs-string">&quot;Asia/Shanghai&quot;</span>)

data = [
    {
        <span class="hljs-string">&quot;id&quot;</span>: i + <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;tsz&quot;</span>: shanghai_tz.localize(
            datetime.datetime(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>) + datetime.timedelta(days=i)
        ).isoformat(),
        <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-built_in">float</span>(i) / <span class="hljs-number">10</span> <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">4</span>)],
    }
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(data_size)
]

client.insert(collection_name, data)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Data inserted successfully.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;

<span class="hljs-keyword">import</span> java.time.ZoneId;
<span class="hljs-keyword">import</span> java.time.ZonedDateTime;
<span class="hljs-keyword">import</span> java.time.format.DateTimeFormatter;
<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-type">int</span> <span class="hljs-variable">dataSize</span> <span class="hljs-operator">=</span> <span class="hljs-number">8193</span>;

<span class="hljs-comment">// Get the Asia/Shanghai time zone</span>
<span class="hljs-comment">// You can use any valid IANA time zone identifier such as:</span>
<span class="hljs-comment">//   &quot;Asia/Tokyo&quot;, &quot;America/New_York&quot;, &quot;Europe/London&quot;, &quot;UTC&quot;, etc.</span>
<span class="hljs-comment">// To view all available values:</span>
<span class="hljs-comment">//   System.out.println(ZoneId.getAvailableZoneIds());</span>
<span class="hljs-comment">// Reference:</span>
<span class="hljs-comment">//   IANA database – https://www.iana.org/time-zones</span>
<span class="hljs-comment">//   Wikipedia – https://en.wikipedia.org/wiki/List_of_tz_database_time_zones</span>
<span class="hljs-type">ZoneId</span> <span class="hljs-variable">shanghaiTz</span> <span class="hljs-operator">=</span> ZoneId.of(<span class="hljs-string">&quot;Asia/Shanghai&quot;</span>);
<span class="hljs-type">ZonedDateTime</span> <span class="hljs-variable">start</span> <span class="hljs-operator">=</span> ZonedDateTime.of(<span class="hljs-number">2025</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, shanghaiTz);

<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
List&lt;JsonObject&gt; data = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; dataSize; i++) {
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
    row.addProperty(<span class="hljs-string">&quot;id&quot;</span>, i + <span class="hljs-number">1</span>);
    <span class="hljs-comment">// ISO 8601 string with a time-zone offset, such as &quot;2025-01-01T00:00:00+08:00&quot;</span>
    row.addProperty(<span class="hljs-string">&quot;tsz&quot;</span>, start.plusDays(i).format(DateTimeFormatter.ISO_OFFSET_DATE_TIME));
    row.add(<span class="hljs-string">&quot;vec&quot;</span>, gson.toJsonTree(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.0f</span>, <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>}));
    data.add(row);
}

client.insert(InsertReq.builder()
        .collectionName(collectionName)
        .data(data)
        .build());
System.out.println(<span class="hljs-string">&quot;Data inserted successfully.&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data_size = <span class="hljs-number">8193</span>;

<span class="hljs-comment">// Build ISO 8601 strings with the Asia/Shanghai time-zone offset (+08:00).</span>
<span class="hljs-comment">// Any ISO 8601 string with a time-zone offset is accepted, such as</span>
<span class="hljs-comment">// &quot;2025-01-01T00:00:00Z&quot; or &quot;2025-01-01T00:00:00-05:00&quot;.</span>
<span class="hljs-keyword">const</span> data = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; data_size; i++) {
    <span class="hljs-keyword">const</span> day = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">UTC</span>(<span class="hljs-number">2025</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span> + i));
    data.<span class="hljs-title function_">push</span>({
        <span class="hljs-attr">id</span>: i + <span class="hljs-number">1</span>,
        <span class="hljs-attr">tsz</span>: <span class="hljs-string">`<span class="hljs-subst">${day.toISOString().slice(<span class="hljs-number">0</span>, <span class="hljs-number">10</span>)}</span>T00:00:00+08:00`</span>,
        <span class="hljs-attr">vec</span>: [<span class="hljs-number">0.0</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>],
    });
}

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: collection_name,
    <span class="hljs-attr">data</span>: data,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Data inserted successfully.&quot;</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>

<span class="hljs-comment">// Timestamps are written as ISO 8601 strings with a time-zone offset</span>
tszValues := []<span class="hljs-type">string</span>{
    <span class="hljs-string">&quot;2025-01-01T00:00:00+08:00&quot;</span>,
    <span class="hljs-string">&quot;2025-01-02T00:00:00+08:00&quot;</span>,
    <span class="hljs-string">&quot;2025-01-03T00:00:00+08:00&quot;</span>,
    <span class="hljs-string">&quot;2025-01-04T00:00:00+08:00&quot;</span>,
    <span class="hljs-string">&quot;2025-01-05T00:00:00+08:00&quot;</span>,
}

_, err = cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption(collectionName).
    WithColumns(
        column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>}),
        column.NewColumnTimestamptzIsoString(<span class="hljs-string">&quot;tsz&quot;</span>, tszValues),
        column.NewColumnFloatVector(<span class="hljs-string">&quot;vec&quot;</span>, <span class="hljs-number">4</span>, [][]<span class="hljs-type">float32</span>{
            {<span class="hljs-number">0.0</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>},
            {<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>},
            {<span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>},
            {<span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>},
            {<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>, <span class="hljs-number">0.7</span>},
        }),
    ))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Println(<span class="hljs-string">&quot;Data inserted successfully.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;timestamptz_test123&quot;,
    &quot;data&quot;: [
        {&quot;id&quot;: 1, &quot;tsz&quot;: &quot;2025-01-01T00:00:00+08:00&quot;, &quot;vec&quot;: [0.0, 0.1, 0.2, 0.3]},
        {&quot;id&quot;: 2, &quot;tsz&quot;: &quot;2025-01-02T00:00:00+08:00&quot;, &quot;vec&quot;: [0.1, 0.2, 0.3, 0.4]},
        {&quot;id&quot;: 3, &quot;tsz&quot;: &quot;2025-01-03T00:00:00+08:00&quot;, &quot;vec&quot;: [0.2, 0.3, 0.4, 0.5]},
        {&quot;id&quot;: 4, &quot;tsz&quot;: &quot;2025-01-04T00:00:00+08:00&quot;, &quot;vec&quot;: [0.3, 0.4, 0.5, 0.6]},
        {&quot;id&quot;: 5, &quot;tsz&quot;: &quot;2025-01-05T00:00:00+08:00&quot;, &quot;vec&quot;: [0.4, 0.5, 0.6, 0.7]}
    ]
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Step-3-Filtering-operations" class="common-anchor-header">步驟 3：篩選操作<button data-href="#Step-3-Filtering-operations" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">TIMESTAMPTZ</code> 支援標量比較、區間運算以及時間組件的萃取。</p>
<p>在對<code translate="no">TIMESTAMPTZ</code> 欄位執行篩選操作之前，請確保：</p>
<ul>
<li><p>您已針對每個向量欄位建立索引。</p></li>
<li><p>該集合已載入至記憶體中。</p></li>
</ul>
<p><details></p>
<p><summary>顯示範例程式碼</summary></p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create index on vector field</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;vec&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;vec_index&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>
)
client.create_index(collection_name, index_params)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Index created successfully.&quot;</span>)

<span class="hljs-comment"># Load the collection</span>
client.load_collection(collection_name)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Collection &#x27;<span class="hljs-subst">{collection_name}</span>&#x27; loaded successfully.&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

<span class="hljs-comment">// Create index on vector field</span>
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;vec&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .indexName(<span class="hljs-string">&quot;vec_index&quot;</span>)
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createIndex(CreateIndexReq.builder()
        .collectionName(collectionName)
        .indexParams(Collections.singletonList(indexParam))
        .build());
System.out.println(<span class="hljs-string">&quot;Index created successfully.&quot;</span>);

<span class="hljs-comment">// Load the collection</span>
client.loadCollection(LoadCollectionReq.builder()
        .collectionName(collectionName)
        .build());
System.out.printf(<span class="hljs-string">&quot;Collection &#x27;%s&#x27; loaded successfully.%n&quot;</span>, collectionName);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Create index on vector field</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: collection_name,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vec&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vec_index&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,
});
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Index created successfully.&quot;</span>);

<span class="hljs-comment">// Load the collection</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({ <span class="hljs-attr">collection_name</span>: collection_name });
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Collection &#x27;<span class="hljs-subst">${collection_name}</span>&#x27; loaded successfully.`</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

idxOpt := milvusclient.NewCreateIndexOption(collectionName, <span class="hljs-string">&quot;vec&quot;</span>, index.NewAutoIndex(entity.COSINE))
indexTask, err := cli.CreateIndex(ctx, idxOpt)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">if</span> err = indexTask.Await(ctx); err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
fmt.Println(<span class="hljs-string">&quot;Index created successfully.&quot;</span>)

loadTask, err := cli.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(collectionName))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
<span class="hljs-keyword">if</span> err = loadTask.Await(ctx); err != <span class="hljs-literal">nil</span> {
    <span class="hljs-built_in">panic</span>(err)
}
fmt.Printf(<span class="hljs-string">&quot;Collection &#x27;%s&#x27; loaded successfully.\n&quot;</span>, collectionName)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;timestamptz_test123&quot;,
    &quot;indexParams&quot;: [{&quot;fieldName&quot;: &quot;vec&quot;, &quot;indexName&quot;: &quot;vec_index&quot;, &quot;metricType&quot;: &quot;COSINE&quot;, &quot;indexType&quot;: &quot;AUTOINDEX&quot;}]
}&#x27;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/load&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;timestamptz_test123&quot;
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<h4 id="Query-with-timestamp-filtering" class="common-anchor-header">使用時間戳記篩選進行查詢</h4><p>請使用算術運算子，例如<code translate="no">==</code> 、<code translate="no">!=</code> 、<code translate="no">&lt;</code> 、<code translate="no">&gt;</code> 、<code translate="no">&lt;=</code> 、<code translate="no">&gt;=</code> 。有關 Milvus 中可用的算術運算子完整清單，請參閱《<a href="/docs/zh-hant/basic-operators.md#Arithmetic-operators">算術運算子》</a>。</p>
<p>以下範例會篩選時間戳記（<code translate="no">tsz</code> ）不等於<strong>2025-01-03T00:00:00+08:00</strong> 的實體：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Query for entities where tsz is not equal to &#x27;2025-01-03T00:00:00+08:00&#x27;</span>
<span class="highlighted-wrapper-line">expr = <span class="hljs-string">&quot;tsz != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span></span>

results = client.query(
    collection_name=collection_name,
    <span class="hljs-built_in">filter</span>=expr,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query result: &quot;</span>, results)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Query result:  data: [&quot;{&#x27;id&#x27;: 1, &#x27;tsz&#x27;: &#x27;2024-12-31T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 2, &#x27;tsz&#x27;: &#x27;2025-01-01T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 4, &#x27;tsz&#x27;: &#x27;2025-01-03T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 5, &#x27;tsz&#x27;: &#x27;2025-01-04T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 6, &#x27;tsz&#x27;: &#x27;2025-01-05T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 7, &#x27;tsz&#x27;: &#x27;2025-01-06T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 8, &#x27;tsz&#x27;: &#x27;2025-01-07T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 9, &#x27;tsz&#x27;: &#x27;2025-01-08T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 10, &#x27;tsz&#x27;: &#x27;2025-01-09T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 11, &#x27;tsz&#x27;: &#x27;2025-01-10T16:00:00Z&#x27;}&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;

<span class="hljs-comment">// Query for entities where tsz is not equal to &#x27;2025-01-03T00:00:00+08:00&#x27;</span>
<span class="highlighted-wrapper-line"><span class="hljs-type">String</span> <span class="hljs-variable">expr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;tsz != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span>;</span>

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(collectionName)
        .filter(expr)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>))
        .limit(<span class="hljs-number">10</span>)
        .build());

System.out.println(<span class="hljs-string">&quot;Query result: &quot;</span> + results.getQueryResults());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Query for entities where tsz is not equal to &#x27;2025-01-03T00:00:00+08:00&#x27;</span>
<span class="highlighted-wrapper-line"><span class="hljs-keyword">const</span> expr = <span class="hljs-string">&quot;tsz != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span>;</span>

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: collection_name,
    <span class="hljs-attr">filter</span>: expr,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Query result: &quot;</span>, results.<span class="hljs-property">data</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">expr := <span class="hljs-string">&quot;tsz != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span>

resultSet, err := cli.Query(ctx, milvusclient.NewQueryOption(collectionName).
    WithFilter(expr).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>).
    WithLimit(<span class="hljs-number">10</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Println(<span class="hljs-string">&quot;Query result: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;tsz&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;timestamptz_test123&quot;,
    &quot;filter&quot;: &quot;tsz != ISO &#x27;</span>\&#x27;<span class="hljs-string">&#x27;2025-01-03T00:00:00+08:00&#x27;</span>\&#x27;<span class="hljs-string">&#x27;&quot;,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;tsz&quot;],
    &quot;limit&quot;: 10
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>在上述範例中，</p>
<ul>
<li><p><code translate="no">tsz</code> 是資料結構中定義的<code translate="no">TIMESTAMPTZ</code> 欄位名稱。</p></li>
<li><p><code translate="no">ISO '2025-01-03T00:00:00+08:00'</code> 是一個採用<a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>格式的時間戳字面值，其中包含時區偏移量。</p></li>
<li><p><code translate="no">!=</code> 會將欄位值與該字面值進行比對。其他受支援的運算子包括<code translate="no">==</code> 、<code translate="no">&lt;</code> 、<code translate="no">&lt;=</code> 、<code translate="no">&gt;</code> 以及<code translate="no">&gt;=</code> 。</p></li>
</ul>
<h4 id="Interval-operations" class="common-anchor-header">間隔運算</h4><p>您可以使用符合<a href="https://en.wikipedia.org/wiki/ISO_8601#Durations">ISO 8601 時間長度格式的</a> <strong>INTERVAL</strong>值，對<code translate="no">TIMESTAMPTZ</code> 欄位進行算術運算。這讓您在篩選資料時，能夠對時間戳記進行時間長度（例如天、小時或分鐘）的加法或減法運算。</p>
<p>例如，以下查詢會篩選那些時間戳記（<code translate="no">tsz</code> ）加上零天<strong>後不等於</strong> <strong>2025-01-03T00:00:00+08:00</strong> 的實體：</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="highlighted-wrapper-line">expr = <span class="hljs-string">&quot;tsz + INTERVAL &#x27;P0D&#x27; != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span></span>

results = client.query(
    collection_name, 
    <span class="hljs-built_in">filter</span>=expr, 
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>], 
    limit=<span class="hljs-number">10</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Query result: &quot;</span>, results)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Query result:  data: [&quot;{&#x27;id&#x27;: 1, &#x27;tsz&#x27;: &#x27;2024-12-31T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 2, &#x27;tsz&#x27;: &#x27;2025-01-01T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 4, &#x27;tsz&#x27;: &#x27;2025-01-03T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 5, &#x27;tsz&#x27;: &#x27;2025-01-04T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 6, &#x27;tsz&#x27;: &#x27;2025-01-05T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 7, &#x27;tsz&#x27;: &#x27;2025-01-06T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 8, &#x27;tsz&#x27;: &#x27;2025-01-07T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 9, &#x27;tsz&#x27;: &#x27;2025-01-08T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 10, &#x27;tsz&#x27;: &#x27;2025-01-09T16:00:00Z&#x27;}&quot;, &quot;{&#x27;id&#x27;: 11, &#x27;tsz&#x27;: &#x27;2025-01-10T16:00:00Z&#x27;}&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;

<span class="highlighted-wrapper-line"><span class="hljs-type">String</span> <span class="hljs-variable">expr</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;tsz + INTERVAL &#x27;P0D&#x27; != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span>;</span>

<span class="hljs-type">QueryResp</span> <span class="hljs-variable">results</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()
        .collectionName(collectionName)
        .filter(expr)
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>))
        .limit(<span class="hljs-number">10</span>)
        .build());

System.out.println(<span class="hljs-string">&quot;Query result: &quot;</span> + results.getQueryResults());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="highlighted-wrapper-line"><span class="hljs-keyword">const</span> expr = <span class="hljs-string">&quot;tsz + INTERVAL &#x27;P0D&#x27; != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span>;</span>

<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({
    <span class="hljs-attr">collection_name</span>: collection_name,
    <span class="hljs-attr">filter</span>: expr,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Query result: &quot;</span>, results.<span class="hljs-property">data</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">expr := <span class="hljs-string">&quot;tsz + INTERVAL &#x27;P0D&#x27; != ISO &#x27;2025-01-03T00:00:00+08:00&#x27;&quot;</span>

resultSet, err := cli.Query(ctx, milvusclient.NewQueryOption(collectionName).
    WithFilter(expr).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>).
    WithLimit(<span class="hljs-number">10</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}
fmt.Println(<span class="hljs-string">&quot;Query result: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;tsz&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;timestamptz_test123&quot;,
    &quot;filter&quot;: &quot;tsz + INTERVAL &#x27;</span>\&#x27;<span class="hljs-string">&#x27;P0D&#x27;</span>\&#x27;<span class="hljs-string">&#x27; != ISO &#x27;</span>\&#x27;<span class="hljs-string">&#x27;2025-01-03T00:00:00+08:00&#x27;</span>\&#x27;<span class="hljs-string">&#x27;&quot;,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;tsz&quot;],
    &quot;limit&quot;: 10
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p><code translate="no">INTERVAL</code> 數值須遵循<a href="https://www.w3.org/TR/xmlschema-2/#duration">ISO 8601 時間長度語法</a>。例如：</p>
<ul>
<li><p><code translate="no">P1D</code> → 1 天</p></li>
<li><p><code translate="no">PT3H</code> → 3 小時</p></li>
<li><p><code translate="no">P2DT6H</code> → 2 天又 6 小時</p></li>
</ul>
<p>您可以在篩選表達式中直接使用<code translate="no">INTERVAL</code> 進行運算，例如：</p>
<ul>
<li><p><code translate="no">tsz + INTERVAL 'P3D'</code> → 加 3 天</p></li>
<li><p><code translate="no">tsz - INTERVAL 'PT2H'</code> → 減去 2 小時</p></li>
</ul>
</div>
<h4 id="Search-with-timestamp-filtering" class="common-anchor-header">使用時間戳記篩選進行搜尋</h4><p>您可以將<code translate="no">TIMESTAMPTZ</code> 篩選與向量相似度搜尋結合使用，藉此同時依據時間與相似度來縮小搜尋結果範圍。</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#go">   Go</a>
 <a href="#bash">   cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Define a time-based filter expression</span>
<span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;tsz &gt; ISO &#x27;2025-01-05T00:00:00+08:00&#x27;&quot;</span>

res = client.search(
    collection_name=collection_name,             <span class="hljs-comment"># Collection name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>]],                  <span class="hljs-comment"># Query vector (must match collection&#x27;s vector dim)</span>
    limit=<span class="hljs-number">5</span>,                                      <span class="hljs-comment"># Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,                                <span class="hljs-comment"># Filter expression using TIMESTAMPTZ</span></span>
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],  <span class="hljs-comment"># Fields to include in the search results</span>
)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Search result: &quot;</span>, res)

<span class="hljs-comment"># Expected output:</span>
<span class="hljs-comment"># Search result:  data: [[{&#x27;id&#x27;: 10, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-09T16:00:00Z&#x27;, &#x27;id&#x27;: 10}}, {&#x27;id&#x27;: 9, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-08T16:00:00Z&#x27;, &#x27;id&#x27;: 9}}, {&#x27;id&#x27;: 8, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-07T16:00:00Z&#x27;, &#x27;id&#x27;: 8}}, {&#x27;id&#x27;: 7, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-06T16:00:00Z&#x27;, &#x27;id&#x27;: 7}}, {&#x27;id&#x27;: 6, &#x27;distance&#x27;: 0.9759000539779663, &#x27;entity&#x27;: {&#x27;tsz&#x27;: &#x27;2025-01-05T16:00:00Z&#x27;, &#x27;id&#x27;: 6}}]]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> java.util.Arrays;
<span class="hljs-keyword">import</span> java.util.Collections;

<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;

<span class="hljs-comment">// Define a time-based filter expression</span>
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;tsz &gt; ISO &#x27;2025-01-05T00:00:00+08:00&#x27;&quot;</span>;

<span class="hljs-type">SearchResp</span> <span class="hljs-variable">res</span> <span class="hljs-operator">=</span> client.search(SearchReq.builder()
        .collectionName(collectionName)                                                      <span class="hljs-comment">// Collection name</span>
        .data(Collections.singletonList(<span class="hljs-keyword">new</span> <span class="hljs-title class_">FloatVec</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">float</span>[]{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>}))) <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
        .limit(<span class="hljs-number">5</span>)                                                                            <span class="hljs-comment">// Max. number of results to return</span>
<span class="highlighted-wrapper-line">        .filter(filter)                                                                      <span class="hljs-comment">// Filter expression using TIMESTAMPTZ</span></span>
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>))                                            <span class="hljs-comment">// Fields to include in the search results</span>
        .build());

System.out.println(<span class="hljs-string">&quot;Search result: &quot;</span> + res.getSearchResults());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Define a time-based filter expression</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&quot;tsz &gt; ISO &#x27;2025-01-05T00:00:00+08:00&#x27;&quot;</span>;

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: collection_name,  <span class="hljs-comment">// Collection name</span>
    <span class="hljs-attr">data</span>: [[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>]],      <span class="hljs-comment">// Query vector (must match collection&#x27;s vector dim)</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,                          <span class="hljs-comment">// Max. number of results to return</span>
<span class="highlighted-wrapper-line">    <span class="hljs-attr">filter</span>: filter,                    <span class="hljs-comment">// Filter expression using TIMESTAMPTZ</span></span>
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>],      <span class="hljs-comment">// Fields to include in the search results</span>
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Search result: &quot;</span>, res.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">filter := <span class="hljs-string">&quot;tsz &gt; ISO &#x27;2025-01-05T00:00:00+08:00&#x27;&quot;</span>
queryVector := []<span class="hljs-type">float32</span>{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>}
annParam := index.NewCustomAnnParam()
annParam.WithExtraParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;COSINE&quot;</span>)

resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    collectionName,
    <span class="hljs-number">5</span>,
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField(<span class="hljs-string">&quot;vec&quot;</span>).
    WithFilter(filter).
    WithAnnParam(annParam).
    WithOutputFields(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;tsz&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-keyword">return</span>
}

<span class="hljs-keyword">for</span> _, rs := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, rs.IDs)
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, rs.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
--header <span class="hljs-string">&quot;Request-Timeout: 10&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;timestamptz_test123&quot;,
    &quot;data&quot;: [[0.1, 0.2, 0.3, 0.4]],
    &quot;limit&quot;: 5,
    &quot;filter&quot;: &quot;tsz &gt; ISO &#x27;</span>\&#x27;<span class="hljs-string">&#x27;2025-01-05T00:00:00+08:00&#x27;</span>\&#x27;<span class="hljs-string">&#x27;&quot;,
    &quot;outputFields&quot;: [&quot;id&quot;, &quot;tsz&quot;],
    &quot;searchParams&quot;: {&quot;metricType&quot;: &quot;COSINE&quot;}
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>若您的資料集包含兩個或更多向量欄位，即可執行結合時間戳記篩選的混合搜尋操作。詳細資訊請參閱《<a href="/docs/zh-hant/multi-vector-search.md">多向量混合搜尋</a>》。</p>
</div>
<h2 id="Advanced-usage" class="common-anchor-header">進階用法<button data-href="#Advanced-usage" class="anchor-icon" translate="no">
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
    </button></h2><p>若要進行進階操作，您可以於不同層級（例如：資料庫、集合或查詢）管理時區，或透過索引來加速針對<code translate="no">TIMESTAMPTZ</code> 欄位的查詢。</p>
<h3 id="Manage-time-zones-at-different-levels" class="common-anchor-header">在不同層級管理時區<button data-href="#Manage-time-zones-at-different-levels" class="anchor-icon" translate="no">
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
    </button></h3><p>您可以在<strong>資料庫</strong>、<strong>集合</strong>或<strong>查詢／搜尋</strong>層級控制 `<code translate="no">TIMESTAMPTZ</code> ` 欄位的時區。</p>
<table>
   <tr>
     <th><p>層級</p></th>
     <th><p>參數</p></th>
     <th><p>範圍</p></th>
     <th><p>優先級</p></th>
   </tr>
   <tr>
     <td><p>資料庫</p></td>
     <td><p><code translate="no">timezone</code></p></td>
     <td><p>適用於資料庫中所有集合的預設值</p></td>
     <td><p>最低</p></td>
   </tr>
   <tr>
     <td><p>集合</p></td>
     <td><p><code translate="no">timezone</code></p></td>
     <td><p>覆寫該集合的資料庫預設時區設定</p></td>
     <td><p>中等</p></td>
   </tr>
   <tr>
     <td><p>查詢／搜尋／混合搜尋</p></td>
     <td><p><code translate="no">timezone</code></p></td>
     <td><p>針對單一特定操作的臨時覆寫設定</p></td>
     <td><p>最高</p></td>
   </tr>
</table>
<p>如需逐步操作說明與程式碼範例，請參閱專屬頁面：</p>
<ul>
<li><p><a href="/docs/zh-hant/modify-collection.md#Example-6-Set-collection-time-zone">修改集合</a></p></li>
<li><p><a href="/docs/zh-hant/manage_databases.md#Manage-database-properties">資料庫</a></p></li>
<li><p><a href="/docs/zh-hant/get-and-scalar-query.md#Temporarily-set-a-timezone-for-a-query">查詢</a></p></li>
<li><p><a href="/docs/zh-hant/single-vector-search.md#Temporarily-set-a-timezone-for-a-search">基本向量搜尋</a></p></li>
<li><p><a href="/docs/zh-hant/multi-vector-search.md">多向量混合搜尋</a></p></li>
</ul>
<h3 id="Accelerate-queries" class="common-anchor-header">加速查詢<button data-href="#Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>預設情況下，針對未建立索引的 `<code translate="no">TIMESTAMPTZ</code> ` 欄位進行查詢時，系統會對所有資料列進行全表掃描，這在大型資料集上可能會導致查詢速度變慢。若要加速時間戳記查詢，請在您的 `<code translate="no">TIMESTAMPTZ</code> ` 欄位上建立 `<code translate="no">STL_SORT</code> ` 索引。</p>
<p>詳細資訊請參閱<a href="/docs/zh-hant/stl-sort.md">STL_SORT</a>。</p>
