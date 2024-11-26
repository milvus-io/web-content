---
id: number.md
title: 숫자 필드
related_key: 'number, integer, float, double'
summary: >-
  숫자 필드는 밀버스에서 벡터가 아닌 숫자 데이터를 저장하는 데 사용됩니다. 이러한 필드는 일반적으로 연령, 가격 등과 같은 벡터 데이터와
  관련된 추가 정보를 설명하는 데 사용됩니다. 이 데이터를 사용하면 벡터를 더 잘 설명하고 데이터 필터링 및 조건부 쿼리의 효율성을 향상시킬
  수 있습니다.
---
<h1 id="Number-Field​" class="common-anchor-header">숫자 필드<button data-href="#Number-Field​" class="anchor-icon" translate="no">
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
    </button></h1><p>숫자 필드는 밀버스에서 벡터가 아닌 숫자 데이터를 저장하는 데 사용됩니다. 이러한 필드는 일반적으로 연령, 가격 등과 같은 벡터 데이터와 관련된 추가 정보를 설명하는 데 사용됩니다. 이 데이터를 사용하면 벡터를 더 잘 설명하고 데이터 필터링 및 조건부 쿼리의 효율성을 향상시킬 수 있습니다.</p>
<p>숫자 필드는 여러 시나리오에서 특히 유용합니다. 예를 들어, 전자상거래 추천에서는 가격 필드를 필터링에 사용할 수 있고, 사용자 프로필 분석에서는 연령 범위를 통해 결과를 구체화할 수 있습니다. 숫자 필드를 벡터 데이터와 결합하면 시스템에서 유사도 검색을 제공하는 동시에 개인화된 사용자 요구를 보다 정확하게 충족하는 데 도움이 될 수 있습니다.</p>
<h2 id="Supported-number-field-types​" class="common-anchor-header">지원되는 숫자 필드 유형<button data-href="#Supported-number-field-types​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 다양한 데이터 저장 및 쿼리 요구 사항을 충족하기 위해 다양한 숫자 필드 유형을 지원합니다.</p>
<table><thead><th data-block-token="AGYrd69etohgaUxzUyGcXFw8npI" colspan="1" rowspan="1"><p data-block-token="Qbx1dsbirortMixjxXJcukoLnjR">유형</p>
</th><th data-block-token="AGYrd69etohgaUxzUyGcXFw8npI" colspan="1" rowspan="1"><p data-block-token="Qbx1dsbirortMixjxXJcukoLnjR">설명</p>
</th></tr></thead><tbody><tr><td data-block-token="FQ0rdk7NKoAmtUxD5n7cHWBfnKd" colspan="1" rowspan="1"><p data-block-token="J4YBdReSPol6jvxIPyxcs7lRnGQ"><code translate="no">BOOL</code></p>
</td><td data-block-token="XfVYdowyvoY7iwxNCIBcRbE4nFf" colspan="1" rowspan="1"><p data-block-token="WYGTdKI4RoBTXbxR2YbcxC2InOb"><code translate="no">true</code> 또는 <code translate="no">false</code> 을 저장하기 위한 부울 타입으로 이진 상태를 설명하는 데 적합합니다.</p>
</td></tr><tr><td data-block-token="G6JBdjvguofEOnx6lmQcXkJdn6o" colspan="1" rowspan="1"><p data-block-token="PGcDd6i5Ao3jioxzrLkcV5lanUq"><code translate="no">INT8</code></p>
</td><td data-block-token="TEVDdqVe0ooqTbxqkW7cdu8OnMe" colspan="1" rowspan="1"><p data-block-token="G5AOdYaoEom6X0x3NUKc9YL1nRh">8비트 정수로, 작은 범위의 정수 데이터를 저장하는 데 적합합니다.</p>
</td></tr><tr><td data-block-token="Zc6cdGRmVoEOzdxaT8Pc4jdmnxg" colspan="1" rowspan="1"><p data-block-token="SaIUd6XDYoo2msxLCSXcNJk5nre"><code translate="no">INT16</code></p>
</td><td data-block-token="EamldyccGovIeKxaLQ4cxmjMng2" colspan="1" rowspan="1"><p data-block-token="Lx9FdawAgoIlZXxGomRcaglPnyc">16비트 정수, 중간 범위 정수 데이터에 적합합니다.</p>
</td></tr><tr><td data-block-token="SPeCdRoc4owdXXxWSDVcNXwVnVf" colspan="1" rowspan="1"><p data-block-token="AL4sd4HrJokAj2xwglOcxIAcnNc"><code translate="no">INT32</code></p>
</td><td data-block-token="PySwdD4CHot4YgxrOwycN2ngnAb" colspan="1" rowspan="1"><p data-block-token="FYgYdL9PPoNme4xOo62cud2Gnob">32비트 정수 - 제품 수량이나 사용자 ID와 같은 일반적인 정수 데이터 저장에 적합합니다.</p>
</td></tr><tr><td data-block-token="HZWpdo7SuoA04KxvZAxcflidn9c" colspan="1" rowspan="1"><p data-block-token="NbO6dTRRToj5YNxzjICcJe8YnPh"><code translate="no">INT64</code></p>
</td><td data-block-token="FberdUuiZoyA0mxK6T4cfYpqnUf" colspan="1" rowspan="1"><p data-block-token="ZuTHdAIJ5oT8G7xvkJdcGt70nGq">64비트 정수 - 타임스탬프나 식별자와 같은 대용량 데이터 저장에 적합합니다.</p>
</td></tr><tr><td data-block-token="XWCHd4raooSVtXxKE58cE3j0nwd" colspan="1" rowspan="1"><p data-block-token="NWOCdcYiYoMVZRxknoicMsk5nae"><code translate="no">FLOAT</code></p>
</td><td data-block-token="PqINdhj44oido7xzrTMcQA2OnDh" colspan="1" rowspan="1"><p data-block-token="BA2jdC2afoK4duxqG8lcJln8nLH">32비트 부동 소수점 숫자 - 등급이나 온도와 같이 일반적인 정밀도가 필요한 데이터에 적합합니다.</p>
</td></tr><tr><td data-block-token="I3YZdrlQcoGhPExUIq0cQUDDnFe" colspan="1" rowspan="1"><p data-block-token="MKqAdpPoPovAxWxjeAXcF6PmnfK"><code translate="no">DOUBLE</code></p>
</td><td data-block-token="Vb2Cdz3wVoBoizxAwswc9CvFnXf" colspan="1" rowspan="1"><p data-block-token="R501ddb8Uoir53xLFwecx1BenVe">64비트 배정밀도 부동 소수점 숫자 - 재무 정보나 과학적 계산과 같은 고정밀 데이터에 적합합니다.</p>
</td></tr></tbody></table>
<h2 id="Add-number-field​" class="common-anchor-header">숫자 필드 추가<button data-href="#Add-number-field​" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 숫자 필드를 사용하려면 컬렉션 스키마에서 관련 필드를 정의하고 <code translate="no">datatype</code> 을 <code translate="no">BOOL</code> 또는 <code translate="no">INT8</code> 과 같은 지원되는 유형으로 설정하세요. 지원되는 숫자 필드 유형의 전체 목록은 <a href="#Supported-number-field-types">지원되는 숫자 필드 유형을</a> 참조하세요.</p>
<p>다음 예는 숫자 필드 <code translate="no">age</code> 및 <code translate="no">price</code> 를 포함하는 스키마를 정의하는 방법을 보여줍니다.</p>
<div class="multipleCode">
 <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType​
​
client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
​
schema = client.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
    enable_dynamic_fields=<span class="hljs-literal">True</span>,​
)​
​
schema.add_field(field_name=<span class="hljs-string">&quot;age&quot;</span>, datatype=DataType.INT64)​
schema.add_field(field_name=<span class="hljs-string">&quot;price&quot;</span>, datatype=DataType.FLOAT)​
schema.add_field(field_name=<span class="hljs-string">&quot;pk&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;embedding&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">3</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
​
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .build());​
        ​
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
schema.setEnableDynamicField(<span class="hljs-literal">true</span>);​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;age&quot;</span>)​
        .dataType(DataType.Int64)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;price&quot;</span>)​
        .dataType(DataType.Float)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;pk&quot;</span>)​
        .dataType(DataType.Int64)​
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)​
        .dataType(DataType.FloatVector)​
        .dimension(<span class="hljs-number">3</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
<span class="hljs-keyword">const</span> schema = [​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;age&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;price&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Float</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
    <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
  },​
  {​
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,​
    <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
    <span class="hljs-attr">dim</span>: <span class="hljs-number">3</span>,​
  },​
];​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> int64Field=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;age&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> floatField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;price&quot;,​
    &quot;dataType&quot;: &quot;Float&quot;​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> pkField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;pk&quot;,​
    &quot;dataType&quot;: &quot;Int64&quot;,​
    &quot;isPrimary&quot;: true​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> vectorField=<span class="hljs-string">&#x27;{​
    &quot;fieldName&quot;: &quot;embedding&quot;,​
    &quot;dataType&quot;: &quot;FloatVector&quot;,​
    &quot;elementTypeParams&quot;: {​
        &quot;dim&quot;: 3​
    }​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> schema=<span class="hljs-string">&quot;{​
    \&quot;autoID\&quot;: false,​
    \&quot;fields\&quot;: [​
        <span class="hljs-variable">$int64Field</span>,​
        <span class="hljs-variable">$floatField</span>,​
        <span class="hljs-variable">$pkField</span>,​
        <span class="hljs-variable">$vectorField</span>​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>기본 필드와 벡터 필드는 컬렉션을 만들 때 필수입니다. 기본 필드는 각 엔티티를 고유하게 식별하며, 벡터 필드는 유사성 검색에 중요합니다. 자세한 내용은 <a href="/docs/ko/primary-field.md">기본 필드 및 자동 ID</a>, <a href="/docs/ko/dense-vector.md">고밀도 벡터</a>, <a href="/docs/ko/binary-vector.md">이진 벡터</a> 또는 <a href="/docs/ko/sparse_vector.md">스파스 벡터를</a> 참조하세요.</p>
</div>
<h2 id="Set-index-params​" class="common-anchor-header">인덱스 매개변수 설정<button data-href="#Set-index-params​" class="anchor-icon" translate="no">
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
    </button></h2><p>숫자 필드에 대한 인덱스 매개변수를 설정하는 것은 선택 사항이지만 검색 효율성을 크게 향상시킬 수 있습니다.</p>
<p>다음 예에서는 <code translate="no">age</code> 숫자 필드에 대해 <code translate="no">AUTOINDEX</code> 을 생성하여 Milvus가 데이터 유형에 따라 적절한 인덱스를 자동으로 생성할 수 있도록 합니다. 자세한 내용은 <a href="https://milvus.io/docs/glossary.md#Auto-Index">자동 인덱스를</a> 참조하세요.</p>
<div class="multipleCode">
 <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">index_params = client.<span class="hljs-title function_">prepare_index_params</span>()​
​
index_params.<span class="hljs-title function_">add_index</span>(​
    field_name=<span class="hljs-string">&quot;age&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,​
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;​
<span class="hljs-keyword">import</span> java.util.*;​
​
List&lt;IndexParam&gt; indexes = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
indexes.add(IndexParam.builder()​
        .fieldName(<span class="hljs-string">&quot;age&quot;</span>)​
        .indexType(IndexParam.IndexType.AUTOINDEX)​
        .build());​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = {​
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&#x27;inverted_index&#x27;</span>,​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&#x27;age&#x27;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,​
);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;age&quot;,​
            &quot;indexName&quot;: &quot;inverted_index&quot;,​
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">AUTOINDEX</code> 외에도 다른 숫자 필드 인덱스 유형을 지정할 수 있습니다. 지원되는 인덱스 유형은 <a href="/docs/ko/scalar_index.md">스칼라 인덱스를</a> 참조하세요.</p>
<p>또한 컬렉션을 만들기 전에 벡터 필드에 대한 인덱스를 만들어야 합니다. 이 예에서는 벡터 인덱스 설정을 단순화하기 위해 <code translate="no">AUTOINDEX</code> 을 사용합니다.</p>
<div class="multipleCode">
 <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Add vector index​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;embedding&quot;</span>,​
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,  <span class="hljs-comment"># Use automatic indexing to simplify complex index settings​</span>
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>  <span class="hljs-comment"># Specify similarity metric type, options include L2, COSINE, or IP​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">indexes.<span class="hljs-keyword">add</span>(IndexParam.builder()​
        .fieldName(<span class="hljs-string">&quot;embedding&quot;</span>)​
        .indexType(IndexParam.IndexType.AUTOINDEX)​
        .metricType(IndexParam.MetricType.COSINE)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">IndexType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
<span class="hljs-keyword">const</span> indexParams = [​
  {​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;age&quot;</span>,​
    <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;inverted_index&quot;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,​
  },​
  {​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;embedding&quot;</span>,​
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;COSINE&quot;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-title class_">IndexType</span>.<span class="hljs-property">AUTOINDEX</span>,​
  },​
];​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;age&quot;,​
            &quot;indexName&quot;: &quot;inverted_index&quot;,​
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;​
        },​
        {​
            &quot;fieldName&quot;: &quot;embedding&quot;,​
            &quot;metricType&quot;: &quot;COSINE&quot;,​
            &quot;indexType&quot;: &quot;AUTOINDEX&quot;​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Create-collection​" class="common-anchor-header">컬렉션 만들기<button data-href="#Create-collection​" class="anchor-icon" translate="no">
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
    </button></h2><p>스키마와 인덱스가 정의되면 숫자 필드를 포함하는 컬렉션을 만들 수 있습니다.</p>
<div class="multipleCode">
 <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create Collection​</span>
client.create_collection(​
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">requestCreate</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_scalar_collection&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexes)​
        .build();​
client.createCollection(requestCreate);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.<span class="hljs-title function_">create_collection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_scalar_collection&quot;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-attr">index_params</span>: indexParams​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;my_scalar_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data​" class="common-anchor-header">데이터 삽입<button data-href="#Insert-data​" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션을 만든 후 숫자 필드를 포함하는 데이터를 삽입할 수 있습니다.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">data = [​
    {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>, <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>]},​
    {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">149.50</span>, <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>]},​
    {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">35</span>, <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">199.99</span>, <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&quot;embedding&quot;</span>: [<span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.9</span>]},​
]​
​
client.<span class="hljs-title function_">insert</span>(​
    collection_name=<span class="hljs-string">&quot;my_scalar_collection&quot;</span>,​
    data=data​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.InsertResp;​
​
List&lt;JsonObject&gt; rows = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;age\&quot;: 25, \&quot;price\&quot;: 99.99, \&quot;pk\&quot;: 1, \&quot;embedding\&quot;: [0.1, 0.2, 0.3]}&quot;</span>, JsonObject.class));​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;age\&quot;: 30, \&quot;price\&quot;: 149.50, \&quot;pk\&quot;: 2, \&quot;embedding\&quot;: [0.4, 0.5, 0.6]}&quot;</span>, JsonObject.class));​
rows.add(gson.fromJson(<span class="hljs-string">&quot;{\&quot;age\&quot;: 35, \&quot;price\&quot;: 199.99, \&quot;pk\&quot;: 3, \&quot;embedding\&quot;: [0.7, 0.8, 0.9]}&quot;</span>, JsonObject.class));​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertR</span> <span class="hljs-operator">=</span> client.insert(InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_scalar_collection&quot;</span>)​
        .data(rows)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = [​
  { <span class="hljs-attr">age</span>: <span class="hljs-number">25</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">99.99</span>, <span class="hljs-attr">pk</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>] },​
  { <span class="hljs-attr">age</span>: <span class="hljs-number">30</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">149.5</span>, <span class="hljs-attr">pk</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>, <span class="hljs-number">0.6</span>] },​
  { <span class="hljs-attr">age</span>: <span class="hljs-number">35</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">199.99</span>, <span class="hljs-attr">pk</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">embedding</span>: [<span class="hljs-number">0.7</span>, <span class="hljs-number">0.8</span>, <span class="hljs-number">0.9</span>] },​
];​
​
client.<span class="hljs-title function_">insert</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_scalar_collection&quot;</span>,​
  <span class="hljs-attr">data</span>: data,​
});​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;data&quot;: [​
        {&quot;age&quot;: 25, &quot;price&quot;: 99.99, &quot;pk&quot;: 1, &quot;embedding&quot;: [0.1, 0.2, 0.3]},​
        {&quot;age&quot;: 30, &quot;price&quot;: 149.50, &quot;pk&quot;: 2, &quot;embedding&quot;: [0.4, 0.5, 0.6]},​
        {&quot;age&quot;: 35, &quot;price&quot;: 199.99, &quot;pk&quot;: 3, &quot;embedding&quot;: [0.7, 0.8, 0.9]}       ​
    ],​
    &quot;collectionName&quot;: &quot;my_scalar_collection&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>이 예에서는 <code translate="no">age</code>, <code translate="no">price</code>, <code translate="no">pk</code> (기본 필드) 및 벡터 표현(<code translate="no">embedding</code>)을 포함하는 데이터를 삽입합니다. 삽입된 데이터가 스키마에 정의된 필드와 일치하는지 확인하려면 오류를 방지하기 위해 데이터 유형을 미리 확인하는 것이 좋습니다.</p>
<p>스키마를 정의할 때 <code translate="no">enable_dynamic_fields=True</code> 을 설정하면 Milvus에서는 미리 정의되지 않은 숫자 필드를 삽입할 수 있습니다. 그러나 이렇게 하면 쿼리 및 관리의 복잡성이 증가하여 성능에 영향을 미칠 수 있습니다. 자세한 내용은 <a href="/docs/ko/enable_dynamic_field.md">동적 필드를</a> 참조하세요.</p>
<h2 id="Search-and-query​" class="common-anchor-header">검색 및 쿼리<button data-href="#Search-and-query​" class="anchor-icon" translate="no">
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
    </button></h2><p>숫자 필드를 추가한 후에는 검색 및 쿼리 작업에서 필터링에 사용하여 보다 정확한 검색 결과를 얻을 수 있습니다.</p>
<h3 id="Filter-queries​" class="common-anchor-header">쿼리 필터링</h3><p>숫자 필드를 추가한 후에는 쿼리에서 필터링에 사용할 수 있습니다. 예를 들어 <code translate="no">age</code> 가 30에서 40 사이인 모든 엔티티를 쿼리할 수 있습니다.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;30 &lt;= age &lt;= 40&quot;</span>​
​
res = client.query(​
    collection_name=<span class="hljs-string">&quot;my_scalar_collection&quot;</span>,​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>,​
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>,<span class="hljs-string">&quot;price&quot;</span>]​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;{&#x27;age&#x27;: 30, &#x27;price&#x27;: np.float32(149.5), &#x27;pk&#x27;: 2}&quot;, &quot;{&#x27;age&#x27;: 35, &#x27;price&#x27;: np.float32(199.99), &#x27;pk&#x27;: 3}&quot;] ​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.QueryReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.QueryResp;​
​
<span class="hljs-type">String</span> <span class="hljs-variable">filter</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;30 &lt;= age &lt;= 40&quot;</span>;​
​
<span class="hljs-type">QueryResp</span> <span class="hljs-variable">resp</span> <span class="hljs-operator">=</span> client.query(QueryReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_scalar_collection&quot;</span>)​
        .filter(filter)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>))​
        .build());​
System.out.println(resp.getQueryResults());​
​
<span class="hljs-comment">// Output​</span>
<span class="hljs-comment">//​</span>
<span class="hljs-comment">// [QueryResp.QueryResult(entity={price=149.5, pk=2, age=30}), QueryResp.QueryResult(entity={price=199.99, pk=3, age=35})]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.query({​
    collection_name: <span class="hljs-string">&#x27;my_scalar_collection&#x27;</span>,​
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;30 &lt;= age &lt;= 40&#x27;</span>,​
    output_fields: [<span class="hljs-string">&#x27;age&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>]​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/query&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_scalar_collection&quot;,​
    &quot;filter&quot;: &quot;30 &lt;= age &lt;= 40&quot;,​
    &quot;outputFields&quot;: [&quot;age&quot;,&quot;price&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;age&quot;:30,&quot;pk&quot;:2,&quot;price&quot;:149.5},{&quot;age&quot;:35,&quot;pk&quot;:3,&quot;price&quot;:199.99}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>이 쿼리 표현식은 일치하는 모든 엔티티를 반환하고 해당 엔티티의 <code translate="no">age</code> 및 <code translate="no">price</code> 필드를 출력합니다. 필터 쿼리에 대한 자세한 내용은 <a href="/docs/ko/boolean.md">메타데이터 필터링을</a> 참조하세요.</p>
<h3 id="Vector-search-with-number-filtering​" class="common-anchor-header">숫자 필터링을 사용한 벡터 검색</h3><p>기본 숫자 필드 필터링 외에도 벡터 유사도 검색을 숫자 필드 필터와 결합할 수 있습니다. 예를 들어, 다음 코드는 벡터 검색에 숫자 필드 필터를 추가하는 방법을 보여줍니다.</p>
<div class="multipleCode">
 <a href="#python">파이썬 </a> <a href="#java">자바</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;25 &lt;= age &lt;= 35&quot;</span>​
​
res = client.search(​
    collection_name=<span class="hljs-string">&quot;my_scalar_collection&quot;</span>,​
    data=[[<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>]],​
    limit=<span class="hljs-number">5</span>,​
    search_params={<span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},​
    output_fields=[<span class="hljs-string">&quot;age&quot;</span>,<span class="hljs-string">&quot;price&quot;</span>],​
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>​
)​
​
<span class="hljs-built_in">print</span>(res)​
​
<span class="hljs-comment"># Output​</span>
<span class="hljs-comment"># data: [&quot;[{&#x27;id&#x27;: 1, &#x27;distance&#x27;: -0.06000000238418579, &#x27;entity&#x27;: {&#x27;age&#x27;: 25, &#x27;price&#x27;: 99.98999786376953}}, {&#x27;id&#x27;: 2, &#x27;distance&#x27;: -0.12000000476837158, &#x27;entity&#x27;: {&#x27;age&#x27;: 30, &#x27;price&#x27;: 149.5}}, {&#x27;id&#x27;: 3, &#x27;distance&#x27;: -0.18000000715255737, &#x27;entity&#x27;: {&#x27;age&#x27;: 35, &#x27;price&#x27;: 199.99000549316406}}]&quot;]​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.SearchReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.data.FloatVec;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;​
​
String <span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;25 &lt;= age &lt;= 35&quot;</span>;​
​
SearchResp resp = client.search(SearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;my_scalar_collection&quot;</span>)​
        .annsField(<span class="hljs-string">&quot;embedding&quot;</span>)​
        .data(Collections.singletonList(new FloatVec(new <span class="hljs-built_in">float</span>[]{<span class="hljs-number">0.3</span>f, -<span class="hljs-number">0.6</span>f, <span class="hljs-number">0.1</span>f})))​
        .topK(<span class="hljs-number">5</span>)​
        .outputFields(Arrays.asList(<span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;price&quot;</span>))​
        .<span class="hljs-built_in">filter</span>(<span class="hljs-built_in">filter</span>)​
        .build());​
​
System.out.println(resp.getSearchResults());​
​
// Output​
//​
// [[SearchResp.SearchResult(entity={price=<span class="hljs-number">199.99</span>, age=<span class="hljs-number">35</span>}, score=-<span class="hljs-number">0.19054288</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">3</span>), SearchResp.SearchResult(entity={price=<span class="hljs-number">149.5</span>, age=<span class="hljs-number">30</span>}, score=-<span class="hljs-number">0.20163085</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">2</span>), SearchResp.SearchResult(entity={price=<span class="hljs-number">99.99</span>, age=<span class="hljs-number">25</span>}, score=-<span class="hljs-number">0.2364331</span>, <span class="hljs-built_in">id</span>=<span class="hljs-number">1</span>)]]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">client.search({​
    collection_name: <span class="hljs-string">&#x27;my_scalar_collection&#x27;</span>,​
    data: [<span class="hljs-number">0.3</span>, -<span class="hljs-number">0.6</span>, <span class="hljs-number">0.1</span>],​
    limit: <span class="hljs-number">5</span>,​
    output_fields: [<span class="hljs-string">&#x27;age&#x27;</span>, <span class="hljs-string">&#x27;price&#x27;</span>],​
    <span class="hljs-built_in">filter</span>: <span class="hljs-string">&#x27;25 &lt;= age &lt;= 35&#x27;</span>​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;collectionName&quot;: &quot;my_scalar_collection&quot;,​
    &quot;data&quot;: [​
        [0.3, -0.6, 0.1]​
    ],​
    &quot;annsField&quot;: &quot;embedding&quot;,​
    &quot;limit&quot;: 5,​
    &quot;outputFields&quot;: [&quot;age&quot;, &quot;price&quot;]​
}&#x27;</span>​
​
<span class="hljs-comment">## {&quot;code&quot;:0,&quot;cost&quot;:0,&quot;data&quot;:[{&quot;age&quot;:35,&quot;distance&quot;:-0.19054288,&quot;id&quot;:3,&quot;price&quot;:199.99},{&quot;age&quot;:30,&quot;distance&quot;:-0.20163085,&quot;id&quot;:2,&quot;price&quot;:149.5},{&quot;age&quot;:25,&quot;distance&quot;:-0.2364331,&quot;id&quot;:1,&quot;price&quot;:99.99}]}​</span>

<button class="copy-code-btn"></button></code></pre>
<p>이 예에서는 먼저 쿼리 벡터를 정의하고 검색 중에 필터 조건 <code translate="no">25 &lt;= age &lt;= 35</code> 을 추가합니다. 이렇게 하면 검색 결과가 쿼리 벡터와 유사할 뿐만 아니라 지정된 연령대에도 부합하는 결과를 얻을 수 있습니다. 자세한 내용은 <a href="/docs/ko/boolean.md">메타데이터 필터링을</a> 참조하세요.</p>
