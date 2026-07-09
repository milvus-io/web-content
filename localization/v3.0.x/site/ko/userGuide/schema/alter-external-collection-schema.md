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
    </button></h1><p>외부 컬렉션을 생성한 후에도 외부 데이터 소스는 종종 변경됩니다. 예를 들어, 이미 임베딩을 저장하고 있는 레이크하우스 테이블에 나중에 쿼리 결과에 반환하거나 필터에 사용하고자 하는 점수, 카테고리, 타임스탬프와 같은 새로운 스칼라 필드가 추가될 수 있습니다.</p>
<p>외부 컬렉션을 다시 생성하거나 소스 데이터를 Milvus로 복사하는 대신, 외부 데이터 소스의 기존 필드에 매핑되는 Milvus 필드를 추가하십시오. 필드를 추가한 후 외부 컬렉션을 새로 고침하여 쿼리 및 검색에서 새 필드를 사용할 수 있도록 하십시오.</p>
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
<li><p>현재 외부 컬렉션은 생성 후 필드 추가를 지원합니다. 필드 삭제, 필드 이름 변경, 필드 데이터 유형 변경, 벡터 차원 변경 또는 <code translate="no">external_field</code> 재매핑과 같은 기타 스키마 변경은 지원되지 않습니다.</p></li>
<li><p>외부 데이터 소스에 이미 존재하는 필드만 추가할 수 있습니다. 이 작업은 기존 외부 필드를 Milvus 필드에 매핑합니다. 외부 데이터 소스에 새 필드를 생성하거나 소스 데이터를 역방향으로 채우는 작업은 수행하지 않습니다.</p></li>
<li><p>기존 외부 컬렉션에 <code translate="no">SPARSE_FLOAT_VECTOR</code> 필드를 추가하는 기능은 지원되지 않습니다.</p></li>
<li><p>기존 외부 컬렉션에 StructArray 필드를 추가하는 기능은 지원되지 않습니다. 외부 컬렉션에 StructArray 필드가 필요한 경우, 컬렉션을 생성할 때 컬렉션 스키마에서 해당 필드를 정의해야 합니다.</p></li>
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
    </button></h2><p>외부 컬렉션에 필드를 추가하기 전에, 해당 필드가 외부 데이터 소스에 이미 존재하는지 확인하십시오. 그런 다음 ` <code translate="no">add_collection_field()</code> `를 호출하여 ` <code translate="no">external_field</code> `를 외부 데이터 소스의 필드 이름으로 설정함으로써 Milvus에서 해당 필드를 노출시키십시오. ` <code translate="no">data_type</code> `를 외부 데이터 소스의 필드와 일치하는 Milvus 데이터 유형으로 설정하십시오. 예를 들어, 매핑된 필드가 배정밀도 값을 저장하는 경우 ` <code translate="no">DataType.DOUBLE</code>`를 사용하십시오.</p>
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
    </button></h3><p>쿼리 결과에 필드를 반환하거나 필터에서 사용하려면 <code translate="no">add_collection_field()</code> 을 사용하여 스칼라 필드를 추가하십시오. 다음 예제에서는 외부 데이터 소스의 <code translate="no">score</code> 필드에 매핑되는 <code translate="no">score</code> 필드를 추가합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>,
    field_name=<span class="hljs-string">&quot;score&quot;</span>,
    data_type=DataType.DOUBLE,
    nullable=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    external_field=<span class="hljs-string">&quot;score&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>이 예제에서 ` <code translate="no">score</code> `은 Milvus 필드 이름이며, ` <code translate="no">external_field=&quot;score&quot;</code> `은 이를 외부 데이터 소스의 ` <code translate="no">score</code> ` 필드에 매핑합니다. 컬렉션이 이미 생성된 후에 필드가 추가되므로 ` <code translate="no">nullable=True</code> `을 설정해야 합니다.</p>
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
    </button></h3><p>외부 데이터 소스에 이미 벡터 값이 포함되어 있는 경우 벡터 필드를 추가할 수도 있습니다. 외부 데이터 소스의 벡터 필드와 일치하도록 벡터 <code translate="no">data_type</code> 및 <code translate="no">dim</code> 을 설정하십시오.</p>
<p>다음 예제에서는 <code translate="no">image_embedding_v2</code> 라는 이름의 밀집 벡터 필드를 추가합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

client.add_collection_field(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>,
    field_name=<span class="hljs-string">&quot;image_embedding_v2&quot;</span>,
    data_type=DataType.FLOAT_VECTOR,
<span class="highlighted-wrapper-line">    dim=<span class="hljs-number">768</span>,</span>
    nullable=<span class="hljs-literal">True</span>,
<span class="highlighted-wrapper-line">    external_field=<span class="hljs-string">&quot;image_embedding_v2&quot;</span>,</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>추가된 벡터 필드에 대해 벡터 검색을 실행할 계획이라면, 외부 컬렉션을 새로 고치기 전에 해당 필드에 대한 인덱스를 생성하십시오.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;image_embedding_v2&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Refresh-the-external-collection" class="common-anchor-header">외부 컬렉션 새로 고침<button data-href="#Refresh-the-external-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>외부 컬렉션 스키마를 수정한 후에는 외부 컬렉션을 새로 고침하여 Milvus가 외부 컬렉션 메타데이터를 업데이트하고, 쿼리, 검색 및 필터 결과에 스키마 변경 사항이 반영되도록 하십시오.</p>
<pre><code translate="no" class="language-python">client.refresh_external_collection(
    collection_name=<span class="hljs-string">&quot;product_embeddings&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
