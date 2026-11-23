---
id: timestamptz-field.md
title: TIMESTAMPTZ 필드Compatible with Milvus 2.6.6+
summary: >-
  전자상거래 시스템, 협업 도구, 분산 로깅 등 여러 지역에 걸쳐 시간을 추적하는 애플리케이션은 시간대를 고려한 타임스탬프를 정밀하게 처리해야
  합니다. Milvus의 TIMESTAMPTZ 데이터 유형은 타임스탬프를 해당 시간대와 함께 저장함으로써 이러한 기능을 제공합니다.
beta: Milvus 2.6.6+
---
<h1 id="TIMESTAMPTZ-Field" class="common-anchor-header">TIMESTAMPTZ 필드<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.6+</span><button data-href="#TIMESTAMPTZ-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>전자상거래 시스템, 협업 도구 또는 분산 로깅과 같이 여러 지역에 걸쳐 시간을 추적하는 애플리케이션은 시간대를 고려한 타임스탬프를 정밀하게 처리해야 합니다. Milvus의 <code translate="no">TIMESTAMPTZ</code> 데이터 유형은 타임스탬프를 해당 시간대와 함께 저장함으로써 이러한 기능을 제공합니다.</p>
<h2 id="What-is-a-TIMESTAMPTZ-field" class="common-anchor-header">TIMESTAMPTZ 필드란 무엇인가요?<button data-href="#What-is-a-TIMESTAMPTZ-field" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">TIMESTAMPTZ</code> 필드는 Milvus의 스키마 정의 데이터 유형(<code translate="no">DataType.TIMESTAMPTZ</code>)으로, 시간대를 고려한 입력을 처리하고 모든 시간 지점을 내부적으로 UTC 절대 시간으로 저장합니다.</p>
<ul>
<li><p><strong>허용되는 입력 형식</strong>: 시간대 오프셋이 포함된 <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> 문자열(예: <code translate="no">&quot;2025-05-01T23:59:59+08:00&quot;</code> 는 2025년 5월 1일 오후 11시 59분 59초(UTC+08:00)를 나타냅니다).</p></li>
<li><p><strong>내부 저장</strong>: 모든 <code translate="no">TIMESTAMPTZ</code> 값은 정규화되어 <a href="https://en.wikipedia.org/wiki/Coordinated_Universal_Time">협정 세계시</a> (UTC)로 저장됩니다.</p></li>
<li><p><strong>비교 및 필터링</strong>: 모든 필터링 및 정렬 작업은 UTC 기준으로 수행되므로, 서로 다른 시간대에서도 일관되고 예측 가능한 결과를 보장합니다.</p></li>
</ul>
<div class="alert note">
<ul>
<li><p><code translate="no">TIMESTAMPTZ</code> 필드에 대해 <code translate="no">nullable=True</code> 을 설정하여 누락된 값을 허용할 수 있습니다.</p></li>
<li><p><code translate="no">default_value</code> 을 사용하여 <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> 형식의 기본 타임스탬프 값을 지정할 수 있습니다.</p></li>
</ul>
<p>자세한 내용은 <a href="/docs/ko/nullable-and-default.md">‘Nullable 및 기본값’을</a> 참조하십시오.</p>
</div>
<h2 id="Basic-operations" class="common-anchor-header">기본 작업<button data-href="#Basic-operations" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">TIMESTAMPTZ</code> 필드를 사용하는 기본 워크플로는 Milvus의 다른 스칼라 필드와 동일합니다. 필드 정의 → 데이터 삽입 → 쿼리/필터링.</p>
<h3 id="Step-1-Define-a-TIMESTAMPTZ-field" class="common-anchor-header">1단계: TIMESTAMPTZ 필드 정의<button data-href="#Step-1-Define-a-TIMESTAMPTZ-field" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">TIMESTAMPTZ</code> 필드를 사용하려면 컬렉션을 생성할 때 컬렉션 스키마에 해당 필드를 명시적으로 정의해야 합니다. 다음 예제는 ` <code translate="no">DataType.TIMESTAMPTZ</code>` 유형의 ` <code translate="no">tsz</code> ` 필드가 포함된 컬렉션을 생성하는 방법을 보여줍니다.</p>
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
<h3 id="Step-2-Insert-data" class="common-anchor-header">2단계: 데이터 삽입<button data-href="#Step-2-Insert-data" class="anchor-icon" translate="no">
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
    </button></h3><p>시간대 오프셋이 포함된 ISO 8601 문자열을 가진 엔티티를 삽입합니다.</p>
<p>아래 예제는 8,193행의 샘플 데이터를 컬렉션에 삽입합니다. 각 행에는 다음이 포함됩니다:</p>
<ul>
<li><p>고유 ID</p></li>
<li><p>시간대를 고려한 타임스탬프(상하이 시간)</p></li>
<li><p>간단한 4차원 벡터</p></li>
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
<h3 id="Step-3-Filtering-operations" class="common-anchor-header">3단계: 필터링 연산<button data-href="#Step-3-Filtering-operations" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">TIMESTAMPTZ</code> 스칼라 비교, 구간 연산 및 시간 구성 요소 추출을 지원합니다.</p>
<p><code translate="no">TIMESTAMPTZ</code> 필드에 대해 필터링 연산을 수행하기 전에 다음 사항을 확인하십시오:</p>
<ul>
<li><p>각 벡터 필드에 인덱스를 생성했는지 확인하십시오.</p></li>
<li><p>컬렉션이 메모리에 로드되어 있어야 합니다.</p></li>
</ul>
<p><details></p>
<p><summary>예제 코드 보기</summary></p>
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
<h4 id="Query-with-timestamp-filtering" class="common-anchor-header">타임스탬프 필터링이 포함된 쿼리</h4><p><code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;=</code>, <code translate="no">&gt;=</code> 와 같은 산술 연산자를 사용하십시오. Milvus에서 사용할 수 있는 산술 연산자의 전체 목록은 <a href="/docs/ko/basic-operators.md#Arithmetic-operators">산술 연산자를</a> 참조하십시오.</p>
<p>아래 예제는 타임스탬프(<code translate="no">tsz</code>)가 <strong>2025-01-03T00:00:00+08:00과</strong> 다른 엔티티를 필터링합니다:</p>
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
<p>위의 예제에서,</p>
<ul>
<li><p><code translate="no">tsz</code> 는 스키마에 정의된 <code translate="no">TIMESTAMPTZ</code> 필드 이름입니다.</p></li>
<li><p><code translate="no">ISO '2025-01-03T00:00:00+08:00'</code> 는 시간대 오프셋을 포함한 <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a> 형식의 타임스탬프 리터럴입니다.</p></li>
<li><p><code translate="no">!=</code> 는 필드 값을 해당 리터럴과 비교합니다. 지원되는 다른 연산자로는 <code translate="no">==</code>, <code translate="no">&lt;</code>, <code translate="no">&lt;=</code>, <code translate="no">&gt;</code> 및 <code translate="no">&gt;=</code> 가 있습니다.</p></li>
</ul>
<h4 id="Interval-operations" class="common-anchor-header">간격 연산</h4><p><a href="https://en.wikipedia.org/wiki/ISO_8601#Durations">ISO 8601 기간 형식의</a> <strong>INTERVAL</strong> 값을 사용하여 <code translate="no">TIMESTAMPTZ</code> 필드에 대한 산술 연산을 수행할 수 있습니다. 이를 통해 데이터를 필터링할 때 타임스탬프에서 일, 시간 또는 분과 같은 기간을 더하거나 뺄 수 있습니다.</p>
<p>예를 들어, 다음 쿼리는 타임스탬프(<code translate="no">tsz</code>)에 0일을 더한 값이 <strong>2025-01-03T00:00:00+08:00과</strong> <strong>같지 않은</strong> 엔티티를 필터링합니다:</p>
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
<p><code translate="no">INTERVAL</code> 값은 <a href="https://www.w3.org/TR/xmlschema-2/#duration">ISO 8601 기간 구문</a> 형식을 따릅니다. 예:</p>
<ul>
<li><p><code translate="no">P1D</code> → 1일</p></li>
<li><p><code translate="no">PT3H</code> → 3시간</p></li>
<li><p><code translate="no">P2DT6H</code> → 2일 6시간</p></li>
</ul>
<p><code translate="no">INTERVAL</code> 의 산술 연산을 필터 표현식에서 직접 사용할 수 있습니다. 예를 들면 다음과 같습니다:</p>
<ul>
<li><p><code translate="no">tsz + INTERVAL 'P3D'</code> → 3일을 더합니다</p></li>
<li><p><code translate="no">tsz - INTERVAL 'PT2H'</code> → 2시간을 뺍니다</p></li>
</ul>
</div>
<h4 id="Search-with-timestamp-filtering" class="common-anchor-header">타임스탬프 필터링을 사용한 검색</h4><p><code translate="no">TIMESTAMPTZ</code> 필터링과 벡터 유사도 검색을 결합하여 시간과 유사도 두 가지 기준에 따라 결과를 좁힐 수 있습니다.</p>
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
<p>컬렉션에 두 개 이상의 벡터 필드가 있는 경우, 타임스탬프 필터링을 활용한 하이브리드 검색 작업을 수행할 수 있습니다. 자세한 내용은 <a href="/docs/ko/multi-vector-search.md">다중 벡터 하이브리드 검색을</a> 참조하십시오.</p>
</div>
<h2 id="Advanced-usage" class="common-anchor-header">고급 사용법<button data-href="#Advanced-usage" class="anchor-icon" translate="no">
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
    </button></h2><p>고급 사용법으로는 다양한 수준(예: 데이터베이스, 컬렉션, 쿼리)에서 시간대를 관리하거나, 인덱스를 사용하여 <code translate="no">TIMESTAMPTZ</code> 필드에 대한 쿼리 속도를 높일 수 있습니다.</p>
<h3 id="Manage-time-zones-at-different-levels" class="common-anchor-header">다양한 수준에서 시간대 관리<button data-href="#Manage-time-zones-at-different-levels" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">TIMESTAMPTZ</code> 필드의 시간대를 <strong>데이터베이스</strong>, <strong>컬렉션</strong> 또는 <strong>쿼리/검색</strong> 수준에서 제어할 수 있습니다.</p>
<table>
   <tr>
     <th><p>수준</p></th>
     <th><p>매개변수</p></th>
     <th><p>범위</p></th>
     <th><p>우선순위</p></th>
   </tr>
   <tr>
     <td><p>데이터베이스</p></td>
     <td><p><code translate="no">timezone</code></p></td>
     <td><p>데이터베이스 내 모든 컬렉션에 대한 기본값</p></td>
     <td><p>가장 낮음</p></td>
   </tr>
   <tr>
     <td><p>컬렉션</p></td>
     <td><p><code translate="no">timezone</code></p></td>
     <td><p>해당 컬렉션에 대해 데이터베이스의 기본 시간대 설정을 재정의합니다.</p></td>
     <td><p>중간</p></td>
   </tr>
   <tr>
     <td><p>쿼리/검색/하이브리드 검색</p></td>
     <td><p><code translate="no">timezone</code></p></td>
     <td><p>특정 작업 하나에 대한 일시적인 재정의</p></td>
     <td><p>가장 높음</p></td>
   </tr>
</table>
<p>단계별 지침 및 코드 예제는 다음 전용 페이지를 참조하십시오:</p>
<ul>
<li><p><a href="/docs/ko/modify-collection.md#Example-6-Set-collection-time-zone">컬렉션 수정</a></p></li>
<li><p><a href="/docs/ko/manage_databases.md#Manage-database-properties">데이터베이스</a></p></li>
<li><p><a href="/docs/ko/get-and-scalar-query.md#Temporarily-set-a-timezone-for-a-query">쿼리</a></p></li>
<li><p><a href="/docs/ko/single-vector-search.md#Temporarily-set-a-timezone-for-a-search">기본 벡터 검색</a></p></li>
<li><p><a href="/docs/ko/multi-vector-search.md">다중 벡터 하이브리드 검색</a></p></li>
</ul>
<h3 id="Accelerate-queries" class="common-anchor-header">쿼리 가속화<button data-href="#Accelerate-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>기본적으로 인덱스가 없는 ` <code translate="no">TIMESTAMPTZ</code> ` 필드에 대한 쿼리는 모든 행을 전체 스캔하므로, 대규모 데이터 세트에서는 처리 속도가 느려질 수 있습니다. 타임스탬프 쿼리 속도를 높이려면 ` <code translate="no">TIMESTAMPTZ</code> ` 필드에 ` <code translate="no">STL_SORT</code> ` 인덱스를 생성하십시오.</p>
<p>자세한 내용은 <a href="/docs/ko/stl-sort.md">STL_SORT</a>를 참조하십시오.</p>
