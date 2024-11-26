---
id: binary-vector.md
title: 이진 벡터
summary: >-
  이진 벡터는 기존의 고차원 부동소수점 벡터를 0과 1만 포함하는 이진 벡터로 변환하는 특수한 형태의 데이터 표현입니다. 이러한 변환은 벡터의
  크기를 압축할 뿐만 아니라 의미 정보를 유지하면서 저장 및 계산 비용을 줄여줍니다. 중요하지 않은 특징에 대한 정밀도가 필수적이지 않은
  경우, 이진 벡터는 원래 부동소수점 벡터의 무결성과 유용성 대부분을 효과적으로 유지할 수 있습니다.
---
<h1 id="Binary-Vector​" class="common-anchor-header">이진 벡터<button data-href="#Binary-Vector​" class="anchor-icon" translate="no">
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
    </button></h1><p>이진 벡터는 기존의 고차원 부동소수점 벡터를 0과 1만 포함하는 이진 벡터로 변환하는 특수한 형태의 데이터 표현입니다. 이러한 변환은 벡터의 크기를 압축할 뿐만 아니라 의미 정보를 유지하면서 저장 및 계산 비용을 줄여줍니다. 중요하지 않은 특징에 대한 정밀도가 필수적이지 않은 경우, 이진 벡터는 원래 부동 소수점 벡터의 무결성과 유용성을 대부분 효과적으로 유지할 수 있습니다.</p>
<p>바이너리 벡터는 특히 계산 효율성과 스토리지 최적화가 중요한 상황에서 폭넓게 활용될 수 있습니다. 검색 엔진이나 추천 시스템과 같은 대규모 AI 시스템에서는 방대한 양의 데이터를 실시간으로 처리하는 것이 핵심입니다. 바이너리 벡터는 벡터의 크기를 줄임으로써 정확도를 크게 떨어뜨리지 않으면서 지연 시간과 계산 비용을 낮추는 데 도움이 됩니다. 또한 바이너리 벡터는 메모리와 처리 능력이 제한된 모바일 디바이스나 임베디드 시스템과 같은 리소스 제약이 있는 환경에서 유용합니다. 바이너리 벡터를 사용하면 이러한 제한된 환경에서도 고성능을 유지하면서 복잡한 AI 기능을 구현할 수 있습니다.</p>
<h2 id="Overview​" class="common-anchor-header">개요<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>바이너리 벡터는 이미지, 텍스트, 오디오 등 복잡한 객체를 고정 길이의 이진 값으로 인코딩하는 방법입니다. Milvus에서 바이너리 벡터는 일반적으로 비트 배열 또는 바이트 배열로 표현됩니다. 예를 들어 8차원 바이너리 벡터는 <code translate="no">[1, 0, 1, 1, 0, 0, 1, 0]</code> 로 표현할 수 있습니다.</p>
<p>아래 다이어그램은 이진 벡터가 텍스트 콘텐츠에서 키워드의 존재를 나타내는 방법을 보여줍니다. 이 예에서는 10차원 이진 벡터를 사용하여 두 개의 서로 다른 텍스트<strong>(텍스트 1과</strong> <strong>텍스트 2</strong>)를 표현하는데, 각 차원은 어휘의 한 단어에 해당하며, 1은 텍스트에 해당 단어가 있음을 나타내고 0은 해당 단어가 없음을 나타냅니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/binary-vector.png" alt="Binary vector representation of text content" class="doc-image" id="binary-vector-representation-of-text-content" />
   </span> <span class="img-wrapper"> <span>텍스트 콘텐츠의 이진 벡터 표현</span> </span></p>
<p>바이너리 벡터는 다음과 같은 특징이 있습니다.</p>
<ul>
<li><p><strong>효율적인 저장 공간:</strong> 각 차원에는 1비트만 저장 공간이 필요하므로 저장 공간을 크게 줄일 수 있습니다.</p></li>
<li><p><strong>빠른 계산:</strong> XOR과 같은 비트 연산을 사용하여 벡터 간의 유사도를 빠르게 계산할 수 있습니다.</p></li>
<li><p><strong>고정 길이:</strong> 원본 텍스트 길이에 관계없이 벡터의 길이가 일정하게 유지되므로 색인 및 검색이 더 쉬워집니다.</p></li>
<li><p><strong>간단하고 직관적입니다:</strong> 키워드의 존재 여부를 직접 반영하므로 특정 전문 검색 작업에 적합합니다.</p></li>
</ul>
<p>다양한 방법을 통해 바이너리 벡터를 생성할 수 있습니다. 텍스트 처리에서는 사전 정의된 어휘를 사용하여 단어의 존재 여부에 따라 해당 비트를 설정할 수 있습니다. 이미지 처리의 경우, 지각 해싱 알고리즘(예: <a href="https://en.wikipedia.org/wiki/Perceptual_hashing">pHash</a>)을 통해 이미지의 이진 특징을 생성할 수 있습니다. 머신 러닝 애플리케이션에서는 모델 출력을 2진법으로 변환하여 2진 벡터 표현을 얻을 수 있습니다.</p>
<p>이진 벡터화 후에는 데이터를 Milvus에 저장하여 관리 및 벡터 검색을 수행할 수 있습니다. 아래 다이어그램은 기본 프로세스를 보여줍니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/use-binary-vector.png" alt="Use binary vectors in Milvus" class="doc-image" id="use-binary-vectors-in-milvus" />
   </span> <span class="img-wrapper"> <span>Milvus에서 바이너리 벡터 사용</span> </span></p>
<div class="alert note">
<p>이진 벡터는 특정 시나리오에서는 탁월하지만, 표현 능력에 한계가 있어 복잡한 의미 관계를 포착하기 어렵습니다. 따라서 실제 시나리오에서는 효율성과 표현력의 균형을 맞추기 위해 이진 벡터를 다른 벡터 유형과 함께 사용하는 경우가 많습니다. 자세한 내용은 <a href="/docs/ko/dense-vector.md">고밀도 벡터</a> 및 <a href="/docs/ko/sparse_vector.md">스파스 벡터를</a> 참조하십시오.</p>
</div>
<h2 id="Use-binary-vectors-in-Milvus​" class="common-anchor-header">Milvus에서 바이너리 벡터 사용<button data-href="#Use-binary-vectors-in-Milvus​" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Add-vector-field​" class="common-anchor-header">벡터 필드 추가</h3><p>Milvus에서 바이너리 벡터를 사용하려면 먼저 컬렉션을 만들 때 바이너리 벡터를 저장할 벡터 필드를 정의합니다. 이 과정에는 다음이 포함됩니다.</p>
<ol>
<li><p><code translate="no">datatype</code> 을 지원되는 바이너리 벡터 데이터 유형(예: <code translate="no">BINARY_VECTOR</code>)으로 설정합니다.</p></li>
<li><p><code translate="no">dim</code> 매개변수를 사용하여 벡터의 차원을 지정합니다. 삽입할 때 바이너리 벡터를 바이트 배열로 변환해야 하므로 <code translate="no">dim</code> 은 8의 배수여야 한다는 점에 유의하세요. 8개의 부울 값(0 또는 1)은 모두 1바이트로 패킹됩니다. 예를 들어 <code translate="no">dim=128</code> 의 경우 삽입하려면 16바이트 배열이 필요합니다.</p></li>
</ol>
<div class="multipleCode">
 <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
​
schema = client.create_schema(​
    auto_id=<span class="hljs-literal">True</span>,​
    enable_dynamic_fields=<span class="hljs-literal">True</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.VARCHAR, is_primary=<span class="hljs-literal">True</span>, max_length=<span class="hljs-number">100</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>, datatype=DataType.BINARY_VECTOR, dim=<span class="hljs-number">128</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
​
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .build());​
        ​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)​
        .dataType(DataType.VarChar)​
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .autoID(<span class="hljs-literal">true</span>)​
        .maxLength(<span class="hljs-number">100</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;binary_vector&quot;</span>)​
        .dataType(DataType.BinaryVector)​
        .dimension(<span class="hljs-number">128</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
schema.<span class="hljs-title function_">push</span>({​
  <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;binary vector&quot;</span>,​
  <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">BinaryVector</span>,​
  <span class="hljs-attr">dim</span>: <span class="hljs-number">128</span>,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> primaryField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;pk&quot;,​
    &quot;dataType&quot;: &quot;VarChar&quot;,​
    &quot;isPrimary&quot;: true,​
    &quot;elementTypeParams&quot;: {​
        &quot;max_length&quot;: 100​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;binary_vector&quot;,​
    &quot;dataType&quot;: &quot;BinaryVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 128​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: true,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$primaryField</span>,​
        <span class="hljs-variable">$vectorField</span>​
    ],​
    \&quot;enableDynamicField\&quot;: true​
}&quot;</span>​
​

<button class="copy-code-btn"></button></code></pre>
<p>이 예에서는 바이너리 벡터를 저장하기 위해 <code translate="no">binary_vector</code> 이라는 이름의 벡터 필드가 추가되었습니다. 이 필드의 데이터 유형은 <code translate="no">BINARY_VECTOR</code> 이며, 차원은 128입니다.</p>
<h3 id="Set-index-params-for-vector-field​" class="common-anchor-header">벡터 필드에 대한 인덱스 매개변수 설정</h3><p>검색 속도를 높이려면 바이너리 벡터 필드에 대한 인덱스를 만들어야 합니다. 인덱싱은 대규모 벡터 데이터의 검색 효율성을 크게 향상시킬 수 있습니다.</p>
<div class="multipleCode">
 <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()​
​
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;binary_vector&quot;</span>,​
    index_name=<span class="hljs-string">&quot;binary_vector_index&quot;</span>,​
    index_type=<span class="hljs-string">&quot;BIN_IVF_FLAT&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;HAMMING&quot;</span>,​
    <span class="hljs-keyword">params</span>={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>}​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;​
<span class="hljs-keyword">import</span> java.<span class="hljs-property">util</span>.*;​
​
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
extraParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;nlist&quot;</span>,<span class="hljs-number">128</span>);​
indexParams.<span class="hljs-title function_">add</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;binary_vector&quot;</span>)​
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">BIN_IVF_FLAT</span>)​
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">HAMMING</span>)​
        .<span class="hljs-title function_">extraParams</span>(extraParams)​
        .<span class="hljs-title function_">build</span>());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MetricType</span>, <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> indexParams = {​
  <span class="hljs-attr">indexName</span>: <span class="hljs-string">&quot;binary_vector_index&quot;</span>,​
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;binary_vector&quot;</span>,​
  <span class="hljs-attr">metric_type</span>: <span class="hljs-title class_">MetricType</span>.<span class="hljs-property">HAMMING</span>,​
  <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">BIN_IVF_FLAT</span>,​
  <span class="hljs-attr">params</span>: {​
    <span class="hljs-attr">nlist</span>: <span class="hljs-number">128</span>,​
  },​
};​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;binary_vector&quot;,​
            &quot;metricType&quot;: &quot;HAMMING&quot;,​
            &quot;indexName&quot;: &quot;binary_vector_index&quot;,​
            &quot;indexType&quot;: &quot;BIN_IVF_FLAT&quot;,​
            &quot;params&quot;:{&quot;nlist&quot;: 128}​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>위의 예에서는 <code translate="no">BIN_IVF_FLAT</code> 인덱스 유형을 사용하여 <code translate="no">binary_vector</code> 필드에 대해 <code translate="no">binary_vector_index</code> 라는 이름의 인덱스가 생성됩니다. <code translate="no">metric_type</code> 은 <code translate="no">HAMMING</code> 으로 설정되어 유사도 측정에 해밍 거리가 사용됨을 나타냅니다.</p>
<p>Milvus는 <code translate="no">BIN_IVF_FLAT</code> 외에도 바이너리 벡터에 대한 다른 인덱스 유형을 지원합니다. 자세한 내용은 <a href="https://milvus.io/docs/index.md?tab=binary">바이너리 벡터 인덱스를</a> 참조하세요. 또한 Milvus는 이진 벡터에 대한 다른 유사성 메트릭도 지원합니다. 자세한 내용은 <a href="/docs/ko/metric.md">메트릭 유형을</a> 참조하세요.</p>
<h3 id="Create-collection​" class="common-anchor-header">컬렉션 만들기</h3><p>바이너리 벡터 및 인덱스 설정이 완료되면 바이너리 벡터를 포함하는 컬렉션을 만듭니다. 아래 예제에서는 <code translate="no">create_collection</code> 메서드를 사용하여 <code translate="no">my_binary_collection</code> 이라는 이름의 컬렉션을 만듭니다.</p>
<div class="multipleCode">
 <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&quot;my_binary_collection&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .build());​
​
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_binary_collection&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexParams)​
        .build();​
client.createCollection(requestCreate);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({​
    <span class="hljs-attr">address</span>: <span class="hljs-string">&#x27;http://localhost:19530&#x27;</span>​
});​
​
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;my_dense_collection&#x27;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-attr">index_params</span>: indexParams​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_binary_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data​" class="common-anchor-header">데이터 삽입</h3><p>컬렉션을 만든 후 <code translate="no">insert</code> 메서드를 사용하여 바이너리 벡터가 포함된 데이터를 추가합니다. 바이너리 벡터는 바이트 배열의 형태로 제공해야 하며, 각 바이트는 8개의 부울 값을 나타냅니다.</p>
<p>예를 들어 128차원 바이너리 벡터의 경우 16바이트 배열이 필요합니다(128비트 ÷ 8비트/바이트 = 16바이트이므로). 다음은 데이터를 삽입하는 예제 코드입니다.</p>
<div class="multipleCode">
 <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">convert_bool_list_to_bytes</span>(<span class="hljs-params">bool_list</span>):​
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(bool_list) % <span class="hljs-number">8</span> != <span class="hljs-number">0</span>:​
        <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;The length of a boolean list must be a multiple of 8&quot;</span>)​
​
    byte_array = <span class="hljs-built_in">bytearray</span>(<span class="hljs-built_in">len</span>(bool_list) // <span class="hljs-number">8</span>)​
    <span class="hljs-keyword">for</span> i, bit <span class="hljs-keyword">in</span> <span class="hljs-built_in">enumerate</span>(bool_list):​
        <span class="hljs-keyword">if</span> bit == <span class="hljs-number">1</span>:​
            index = i // <span class="hljs-number">8</span>​
            shift = i % <span class="hljs-number">8</span>​
            byte_array[index] |= (<span class="hljs-number">1</span> &lt;&lt; shift)​
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">bytes</span>(byte_array)​
​
​
bool_vectors = [​
    [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>] + [<span class="hljs-number">0</span>] * <span class="hljs-number">112</span>,​
    [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>] + [<span class="hljs-number">0</span>] * <span class="hljs-number">112</span>,​
]​
​
data = [{<span class="hljs-string">&quot;binary_vector&quot;</span>: convert_bool_list_to_bytes(bool_vector) <span class="hljs-keyword">for</span> bool_vector <span class="hljs-keyword">in</span> bool_vectors}]​
​
client.insert(​
    collection_name=<span class="hljs-string">&quot;my_binary_collection&quot;</span>,​
    data=data​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;​
​
<span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-type">byte</span>[] convertBoolArrayToBytes(<span class="hljs-type">boolean</span>[] booleanArray) {​
    <span class="hljs-type">byte</span>[] byteArray = <span class="hljs-keyword">new</span> <span class="hljs-title class_">byte</span>[booleanArray.length / Byte.SIZE];​
    <span class="hljs-keyword">for</span> (<span class="hljs-type">int</span> <span class="hljs-variable">i</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>; i &lt; booleanArray.length; i++) {​
        <span class="hljs-keyword">if</span> (booleanArray[i]) {​
            <span class="hljs-type">int</span> <span class="hljs-variable">index</span> <span class="hljs-operator">=</span> i / Byte.SIZE;​
            <span class="hljs-type">int</span> <span class="hljs-variable">shift</span> <span class="hljs-operator">=</span> i % Byte.SIZE;​
            byteArray[index] |= (<span class="hljs-type">byte</span>) (<span class="hljs-number">1</span> &lt;&lt; shift);​
        }​
    }​
​
    <span class="hljs-keyword">return</span> byteArray;​
}​
​
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
{​
    <span class="hljs-type">boolean</span>[] boolArray = {<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>};​
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();​
    row.add(<span class="hljs-string">&quot;binary_vector&quot;</span>, gson.toJsonTree(convertBoolArrayToBytes(boolArray)));​
    rows.add(row);​
}​
{​
    <span class="hljs-type">boolean</span>[] boolArray = {<span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>};​
    <span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();​
    row.add(<span class="hljs-string">&quot;binary_vector&quot;</span>, gson.toJsonTree(convertBoolArrayToBytes(boolArray)));​
    rows.add(row);​
}​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_binary_collection&quot;</span>)​
        .data(rows)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [​
  { <span class="hljs-attr">binary_vector</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>] },​
  { <span class="hljs-attr">binary_vector</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span>] },​
];​
​
client.<span class="hljs-title function_">insert</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_binary_collection&quot;</span>,​
  <span class="hljs-attr">data</span>: data,​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;data\&quot;: <span class="hljs-variable">$data</span>,​
    \&quot;collectionName\&quot;: \&quot;my_binary_collection\&quot;​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Perform-similarity-search​" class="common-anchor-header">유사도 검색 수행</h3><p>유사도 검색은 밀버스의 핵심 기능 중 하나로, 벡터 사이의 거리를 기준으로 쿼리 벡터와 가장 유사한 데이터를 빠르게 찾을 수 있습니다. 이진 벡터를 사용하여 유사도 검색을 수행하려면 쿼리 벡터와 검색 매개변수를 준비한 다음 <code translate="no">search</code> 메서드를 호출합니다.</p>
<p>검색 작업 중에는 바이너리 벡터도 바이트 배열 형태로 제공해야 합니다. 쿼리 벡터의 차원이 <code translate="no">dim</code> 을 정의할 때 지정한 차원과 일치하는지, 8개의 부울 값이 모두 1바이트로 변환되는지 확인하세요.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">search_params = {​
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: 10}​
}​
​
query_bool_list = [1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0] + [0] * 112​
query_vector = convert_bool_list_to_bytes(query_bool_list)​
​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_binary_collection&quot;</span>,​
    data=[query_vector],​
    anns_field=<span class="hljs-string">&quot;binary_vector&quot;</span>,​
    search_params=search_params,​
    <span class="hljs-built_in">limit</span>=5,​
    output_fields=[<span class="hljs-string">&quot;pk&quot;</span>]​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: &#x27;453718927992172268&#x27;, &#x27;distance&#x27;: 10.0, &#x27;entity&#x27;: {&#x27;pk&#x27;: &#x27;453718927992172268&#x27;}}]&quot;] ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">SearchReq</span>;​
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">request</span>.<span class="hljs-property">data</span>.<span class="hljs-property">BinaryVec</span>;​
<span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">vector</span>.<span class="hljs-property">response</span>.<span class="hljs-property">SearchResp</span>;​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>,<span class="hljs-title class_">Object</span>&gt; searchParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
searchParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;nprobe&quot;</span>,<span class="hljs-number">10</span>);​
​
boolean[] boolArray = {<span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, <span class="hljs-literal">true</span>};​
<span class="hljs-title class_">BinaryVec</span> queryVector = <span class="hljs-keyword">new</span> <span class="hljs-title class_">BinaryVec</span>(<span class="hljs-title function_">convertBoolArrayToBytes</span>(boolArray));​
​
<span class="hljs-title class_">SearchResp</span> searchR = client.<span class="hljs-title function_">search</span>(<span class="hljs-title class_">SearchReq</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;my_binary_collection&quot;</span>)​
        .<span class="hljs-title function_">data</span>(<span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(queryVector))​
        .<span class="hljs-title function_">annsField</span>(<span class="hljs-string">&quot;binary_vector&quot;</span>)​
        .<span class="hljs-title function_">searchParams</span>(searchParams)​
        .<span class="hljs-title function_">topK</span>(<span class="hljs-number">5</span>)​
        .<span class="hljs-title function_">outputFields</span>(<span class="hljs-title class_">Collections</span>.<span class="hljs-title function_">singletonList</span>(<span class="hljs-string">&quot;pk&quot;</span>))​
        .<span class="hljs-title function_">build</span>());​
        ​
 <span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(searchR.<span class="hljs-title function_">getSearchResults</span>());​
 ​
 <span class="hljs-comment">// Output​</span>
 <span class="hljs-comment">//​</span>
 <span class="hljs-comment">// [[SearchResp.SearchResult(entity={pk=453444327741536775}, score=0.0, id=453444327741536775), SearchResp.SearchResult(entity={pk=453444327741536776}, score=7.0, id=453444327741536776)]]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">query_vector = [1,0,1,0,1,1,1,1,1,1,1,1];​
​
client.search({​
    collection_name: <span class="hljs-string">&#x27;my_binary_collection&#x27;</span>,​
    data: query_vector,​
    <span class="hljs-built_in">limit</span>: 5,​
    output_fields: [<span class="hljs-string">&#x27;pk&#x27;</span>],​
    params: {​
        nprobe: 10​
    }​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> searchParams=<span class="hljs-string">&#x27;{​
        &quot;params&quot;:{&quot;nprobe&quot;:10}​
    }&#x27;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_binary_collection\&quot;,​
    \&quot;data\&quot;: <span class="hljs-variable">$data</span>,​
    \&quot;annsField\&quot;: \&quot;binary_vector\&quot;,​
    \&quot;limit\&quot;: 5,​
    \&quot;searchParams\&quot;:<span class="hljs-variable">$searchParams</span>,​
    \&quot;outputFields\&quot;: [\&quot;pk\&quot;]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>유사도 검색 매개변수에 대한 자세한 내용은 <a href="/docs/ko/single-vector-search.md">기본 ANN 검색을</a> 참조하세요.</p>
<p></p>
