---
id: alter-external-collection-schema.md
title: 외부 컬렉션 스키마 변경Compatible with Milvus 3.0.x
summary: 기존 외부 컬렉션에서 외부 데이터 소스의 추가 필드를 노출하는 방법을 알아보세요.
beta: Milvus 3.0.x
---
<h1 id="Alter-External-Collection-Schema" class="common-anchor-header">외부 컬렉션 스키마 변경<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Alter-External-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>외부 컬렉션을 생성한 후에도 외부 데이터 소스는 종종 변화합니다. 예를 들어, 이미 임베딩을 저장하고 있는 레이크하우스 테이블에 나중에 점수, 카테고리 또는 타임스탬프와 같은 새로운 스칼라 필드가 추가될 수 있으며, 이러한 필드는 쿼리 결과에 반환하거나 필터에 사용하고자 할 수 있습니다.</p>
<p>외부 컬렉션을 다시 생성하거나 소스 데이터를 Milvus로 복사하는 대신, 외부 데이터 소스의 기존 필드에 매핑되는 Milvus 필드를 추가하십시오. 필드를 추가한 후 외부 컬렉션을 새로 고침하면 쿼리 및 검색에서 새 필드를 사용할 수 있습니다.</p>
<h2 id="Limits" class="common-anchor-header">제한 사항<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li>현재 외부 컬렉션은 생성 후 필드 추가를 지원합니다. 필드 삭제, 필드 이름 변경, 필드 데이터 유형 변경, 벡터 차원 변경 또는 <code translate="no">external_field</code> 재매핑과 같은 기타 스키마 변경은 지원되지 않습니다.</li>
<li>외부 데이터 소스에 이미 존재하는 필드만 추가할 수 있습니다. 이 작업은 기존 외부 필드를 Milvus 필드에 매핑합니다. 외부 데이터 소스에 새 필드를 생성하거나 소스 데이터를 역방향으로 채우는 작업은 수행하지 않습니다.</li>
<li>기존 외부 컬렉션에 <code translate="no">SPARSE_FLOAT_VECTOR</code> 필드를 추가하는 기능은 지원되지 않습니다.</li>
<li>기존 외부 컬렉션에 StructArray 필드를 추가하는 기능은 지원되지 않습니다. 외부 컬렉션에 StructArray 필드가 필요한 경우, 컬렉션을 생성할 때 컬렉션 스키마에서 해당 필드를 정의해야 합니다.</li>
</ul>
<h2 id="Add-a-field" class="common-anchor-header">필드 추가<button data-href="#Add-a-field" class="anchor-icon" translate="no">
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
    </button></h2><p>외부 컬렉션에 필드를 추가하기 전에, 해당 필드가 외부 데이터 소스에 이미 존재하는지 확인하십시오. 그런 다음 ` <code translate="no">add_collection_field()</code> `를 호출하여 ` <code translate="no">external_field</code> `을 외부 데이터 소스의 필드 이름으로 설정함으로써 Milvus에서 해당 필드를 노출시키십시오. ` <code translate="no">data_type</code> `을 외부 데이터 소스의 필드와 일치하는 Milvus 데이터 유형으로 설정하십시오. 예를 들어, 매핑된 필드가 배정밀도 값을 저장하는 경우 ` <code translate="no">DataType.DOUBLE</code>`을 사용하십시오.</p>
<p>관리되는 컬렉션과 달리, 추가된 필드의 값은 외부 컬렉션을 새로 고친 후에 외부 데이터 소스에서 읽혀집니다.</p>
<h3 id="Add-a-scalar-field" class="common-anchor-header">스칼라 필드 추가<button data-href="#Add-a-scalar-field" class="anchor-icon" translate="no">
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
    </button></h3><p>쿼리 결과에 필드를 반환하거나 필터에서 사용하려면 <code translate="no">add_collection_field()</code> 을 사용하여 스칼라 필드를 추가하십시오. 다음 예제는 외부 데이터 소스의 <code translate="no">score</code> 필드에 매핑되는 <code translate="no">score</code> 필드를 추가합니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   CSharp</a>
 <a href="#bash">   cURL</a>
</div>
```python
from pymilvus import DataType, MilvusClient
<p>client = MilvusClient(
uri="http://localhost:19530",
token="root:Milvus",
)</p>
<p>client.add_collection_field(
collection_name="product_embeddings",
field_name="score",
data_type=DataType.DOUBLE,
nullable=True,
# 다음 줄 강조 표시
external_field="score",
)</p>
<pre><code translate="no">
```java
<span class="hljs-comment">// Note: milvus-sdk-java does not support adding a field to an</span>
<span class="hljs-comment">// external collection as of v3.0.10 (addCollectionField() routes through</span>
<span class="hljs-comment">// AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Note: The Go SDK does not support adding a field to an external</span>
<span class="hljs-comment">// collection as of client/v3.0.0 (AddCollectionField() routes through</span>
<span class="hljs-comment">// AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2 <span class="hljs-keyword">as</span> sdk;
<span class="hljs-keyword">use</span> milvus::v2::error::<span class="hljs-type">Result</span>;
<span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(
    &amp;ConnectConfig::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>),
).<span class="hljs-keyword">await</span>?;

client.<span class="hljs-title function_ invoke__">add_collection_field</span>(
    sdk::request::collection::AddCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_embeddings&quot;</span>)
        .<span class="hljs-title function_ invoke__">field</span>(
            sdk::FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;score&quot;</span>)
                .<span class="hljs-title function_ invoke__">data_type</span>(sdk::DataType::Double)
                .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>)
                .<span class="hljs-title function_ invoke__">external_field</span>(<span class="hljs-string">&quot;score&quot;</span>),
        )
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Note: milvus-sdk-cpp does not support adding a field to an external</span>
<span class="hljs-comment">// collection as of v3.0.3 (AddCollectionField() routes through</span>
<span class="hljs-comment">// AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>);

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
   <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;product_embeddings&#x27;</span>,
   <span class="hljs-attr">field</span>: {
     <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;score&#x27;</span>,
     <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Double</span>,
     <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
     <span class="hljs-attr">external_field</span>: <span class="hljs-string">&#x27;score&#x27;</span>,
   },
 });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// Note: milvus-sdk-csharp does not support adding a field to an external</span>
<span class="hljs-comment">// collection as of v3.0.0 (AddCollectionFieldAsync cannot set the</span>
<span class="hljs-comment">// external_field mapping).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Note: The RESTful API does not support adding a field to an external</span>
<span class="hljs-comment"># collection (POST /v2/vectordb/collections/fields/add routes through</span>
<span class="hljs-comment"># AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<p>이 예시에서 ‘ <code translate="no">score</code> ’는 Milvus 필드 이름이며, ‘ <code translate="no">external_field=&quot;score&quot;</code> ’는 이를 외부 데이터 소스의 ‘ <code translate="no">score</code> ’ 필드에 매핑합니다. 컬렉션이 이미 생성된 후에 필드가 추가되었으므로 ‘ <code translate="no">nullable=True</code> ’를 설정해야 합니다.</p>
<h3 id="Add-a-vector-field" class="common-anchor-header">벡터 필드 추가<button data-href="#Add-a-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>외부 데이터 소스에 벡터 값이 이미 포함되어 있는 경우 벡터 필드를 추가할 수도 있습니다. 외부 데이터 소스의 벡터 필드와 일치하도록 벡터 <code translate="no">data_type</code> 및 <code translate="no">dim</code> 을 설정하십시오.</p>
<p>다음 예제에서는 <code translate="no">image_embedding_v2</code> 라는 이름의 밀집 벡터 필드를 추가합니다.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   CSharp</a>
 <a href="#bash">   cURL</a>
</div>
```python
client.add_collection_field(
    collection_name="product_embeddings",
    field_name="image_embedding_v2",
    data_type=DataType.FLOAT_VECTOR,
    dim=768,
    nullable=True,
    # 다음 줄 강조 표시
    external_field="image_embedding_v2",
)
```
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Note: milvus-sdk-java does not support adding a field to an</span>
<span class="hljs-comment">// external collection as of v3.0.10 (addCollectionField() routes through</span>
<span class="hljs-comment">// AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// Note: The Go SDK does not support adding a field to an external</span>
<span class="hljs-comment">// collection as of client/v3.0.0 (AddCollectionField() routes through</span>
<span class="hljs-comment">// AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client.<span class="hljs-title function_ invoke__">add_collection_field</span>(
    sdk::request::collection::AddCollectionFieldRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_embeddings&quot;</span>)
        .<span class="hljs-title function_ invoke__">field</span>(
            sdk::FieldSchema::<span class="hljs-title function_ invoke__">new</span>()
                .<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;image_embedding_v2&quot;</span>)
                .<span class="hljs-title function_ invoke__">data_type</span>(sdk::DataType::FloatVector)
                .<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">768</span>)
                .<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>)
                .<span class="hljs-title function_ invoke__">external_field</span>(<span class="hljs-string">&quot;image_embedding_v2&quot;</span>),
        )
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-comment">// Note: milvus-sdk-cpp does not support adding a field to an external</span>
<span class="hljs-comment">// collection as of v3.0.3 (AddCollectionField() routes through</span>
<span class="hljs-comment">// AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">addCollectionField</span>({
   <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;product_embeddings&#x27;</span>,
   <span class="hljs-attr">field</span>: {
     <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;image_embedding_v2&#x27;</span>,
     <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
     <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>,
     <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span>,
     <span class="hljs-attr">external_field</span>: <span class="hljs-string">&#x27;image_embedding_v2&#x27;</span>,
   },
 });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-comment">// Note: milvus-sdk-csharp does not support adding a field to an external</span>
<span class="hljs-comment">// collection as of v3.0.0 (AddCollectionFieldAsync cannot set the</span>
<span class="hljs-comment">// external_field mapping).</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># Note: The RESTful API does not support adding a field to an external</span>
<span class="hljs-comment"># collection (POST /v2/vectordb/collections/fields/add routes through</span>
<span class="hljs-comment"># AlterCollectionSchema, which rejects external collections).</span>
<button class="copy-code-btn"></button></code></pre>
<p>추가된 벡터 필드에 대해 벡터 검색을 실행할 계획이라면, 외부 컬렉션을 새로 고치기 전에 해당 필드에 대한 인덱스를 생성하십시오.</p>
<div class="multipleCode">
   <a href="#python">Python</a>
 <a href="#java">   Java</a>
 <a href="#go">   Go</a>
 <a href="#rust">   Rust</a>
 <a href="#cpp">   C++</a>
 <a href="#javascript">   NodeJS</a>
 <a href="#csharp">   CSharp</a>
 <a href="#bash">   cURL</a>
</div>
```python
index_params = client.prepare_index_params()
<p>index_params.add_index(
field_name="image_embedding_v2",
index_type="AUTOINDEX",
metric_type="COSINE",
)</p>
<p>client.create_index(
collection_name="product_embeddings",
index_params=index_params,
)</p>
<pre><code translate="no">
```java
<span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.RefreshExternalCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.RefreshExternalCollectionResp;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParam</span> <span class="hljs-operator">=</span> IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;image_embedding_v2&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;product_embeddings&quot;</span>)
        .indexParams(Collections.singletonList(indexParam))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()
client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

_, err = client.CreateIndex(ctx, milvusclient.NewCreateIndexOption(
    <span class="hljs-string">&quot;product_embeddings&quot;</span>, <span class="hljs-string">&quot;image_embedding_v2&quot;</span>,
    index.NewAutoIndex(index.MetricType(entity.COSINE))))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust">client.<span class="hljs-title function_ invoke__">create_index</span>(
    sdk::request::index::CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;product_embeddings&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_param</span>(
            sdk::IndexParam::<span class="hljs-title function_ invoke__">new</span>()
                .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;image_embedding_v2&quot;</span>)
                .<span class="hljs-title function_ invoke__">index_type</span>(sdk::IndexType::AutoIndex)
                .<span class="hljs-title function_ invoke__">metric_type</span>(sdk::MetricType::Cosine),
        )
        .<span class="hljs-title function_ invoke__">build</span>()?,
).<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> </span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-built_in">WithToken</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-function">std::cout <span class="hljs-title">CreateIndex</span><span class="hljs-params">(milvus::CreateIndexRequest()
                                 .WithCollectionName(<span class="hljs-string">&quot;product_embeddings&quot;</span>)
                                 .AddIndex(std::move(index_desc)))</span></span>;
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    <span class="hljs-function">std::cout <span class="hljs-title">RefreshExternalCollection</span><span class="hljs-params">(request, response)</span></span>;
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">refreshExternalCollection</span>({
   <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;product_embeddings&#x27;</span>,
 });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp">RefreshExternalCollectionResp resp = <span class="hljs-keyword">await</span> client.RefreshExternalCollectionAsync(
    <span class="hljs-keyword">new</span> RefreshExternalCollectionReq
    {
        CollectionName = <span class="hljs-string">&quot;product_embeddings&quot;</span>
    });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/jobs/external_collection/refresh&quot;</span> \
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;product_embeddings&quot;
}&#x27;</span> 
<button class="copy-code-btn"></button></code></pre>
