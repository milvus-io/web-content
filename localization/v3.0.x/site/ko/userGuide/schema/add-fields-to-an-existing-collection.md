---
id: add-fields-to-an-existing-collection.md
title: 컬렉션 스키마 변경
summary: 사용자 정의 필드 또는 함수와 이에 따라 생성된 벡터 필드를 추가하거나 삭제하여 기존 컬렉션 스키마를 수정합니다.
---
<h1 id="Alter-Collection-Schema" class="common-anchor-header">컬렉션 스키마 변경<button data-href="#Alter-Collection-Schema" class="anchor-icon" translate="no">
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
    </button></h1><p>컬렉션이 개발 환경에서 운영 환경으로 이동함에 따라 스키마가 변경되는 경우가 많습니다. 필터링 및 애플리케이션 로직을 위해 ` <code translate="no">source_uri</code> `이나 ` <code translate="no">review_status</code> `과 같은 스칼라 필드를 추가하거나, 애플리케이션에서 생성된 임베딩을 위한 새로운 벡터 필드를 추가하거나, 기존 텍스트에 대한 어휘 검색을 위해 BM25 함수와 이에 의해 생성된 스파스 벡터 필드를 추가하거나, 더 이상 사용되지 않는 필드와 함수를 제거할 수 있습니다. '컬렉션 스키마 변경(Alter Collection Schema)'을 사용하면 컬렉션을 다시 생성하지 않고도 지원되는 필드 및 함수 변경을 그 자리에서 수행할 수 있습니다.</p>
<div class="alert note">
<p>이 가이드에서는 관리형 컬렉션에서 사용자 정의 필드 및 해당 필드가 생성한 벡터 필드를 가진 함수에 대한 스키마 변경 사항을 다룹니다. 외부 컬렉션에 필드를 추가하려면 <a href="/docs/ko/alter-external-collection-schema.md">‘Alter External Collection Schema’를</a> 참조하십시오. <code translate="no">VARCHAR</code> 필드의 ‘ <code translate="no">max_length</code> ’ 변경이나 <code translate="no">ARRAY</code> 필드의 ‘ <code translate="no">max_capacity</code> ’ 변경과 같은 필드 속성 변경에 대해서는 <a href="/docs/ko/alter-collection-field.md">‘Alter Collection Field’를</a> 참조하십시오. 동적 필드 동작에 대해서는 <a href="/docs/ko/enable-dynamic-field.md">‘동적 필드(Dynamic Field</a> )’ 및 <a href="/docs/ko/modify-collection.md">‘컬렉션 수정(Modify Collection</a>)’을 참조하십시오.</p>
</div>
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
    </button></h2><p><strong>사용자 정의 필드 추가</strong></p>
<ul>
<li><p>추가된 사용자 정의 필드는 null이 허용되어야 합니다. <code translate="no">add_collection_field()</code> 를 호출할 때 <code translate="no">nullable=True</code> 를 설정하십시오. 기존 엔티티의 경우, <code translate="no">default_value</code> 를 사용하여 스칼라 필드를 추가하지 않는 한 추가된 필드는 <code translate="no">NULL</code> 가 됩니다.</p></li>
<li><p>사용자 정의 스칼라 필드 추가는 Milvus 2.6.x 이상에서 지원됩니다. 사용자 정의 벡터 필드 추가는 Milvus 2.6.18 이상에서 지원됩니다.</p></li>
<li><p>StructArray 필드 추가는 Milvus 3.0.0 이상에서 지원됩니다. 추가된 StructArray 필드는 null 허용형이어야 합니다.</p></li>
<li><p>필드 이름은 컬렉션 내의 다른 필드와 중복되지 않아야 합니다.</p></li>
</ul>
<p><strong>함수 및 해당 함수에 의해 생성된 벡터 필드 추가</strong></p>
<ul>
<li><p>스키마 업데이트 시에는 함수 하나와 생성된 벡터 필드 하나만 추가할 수 있습니다.</p></li>
<li><p>지원되는 함수에 따라 생성되는 벡터 필드 유형이 결정됩니다. 즉, ` <code translate="no">BM25</code> `는 ` <code translate="no">SPARSE_FLOAT_VECTOR</code> ` 필드를 생성하고, ` <code translate="no">MINHASH</code> `는 ` <code translate="no">BINARY_VECTOR</code> ` 필드를 생성합니다.</p></li>
<li><p>생성된 벡터 필드는 반드시 새로운 필드여야 합니다. 컬렉션 스키마에 이미 존재하는 필드를 가리킬 수는 없습니다.</p></li>
<li><p>생성된 벡터 필드는 null 허용 필드일 수 없습니다.</p></li>
<li><p>함수에서 사용하는 입력 필드는 컬렉션에 이미 존재해야 합니다.</p></li>
<li><p>기존 컬렉션에 BM25 또는 MinHash 함수를 추가할 때, 함수 입력은 <code translate="no">VARCHAR</code> 필드여야 합니다. Milvus는 해당 입력 유형을 사용하여 기존 엔티티에 대해 생성된 출력을 백필할 수 없기 때문에, 이 워크플로우에서는 <code translate="no">TEXT</code> 입력을 지원하지 않습니다.</p></li>
</ul>
<p><strong>사용자 정의 필드 삭제</strong></p>
<ul>
<li><p>컬렉션의 기본 키 필드, 파티션 키 필드, 클러스터링 키 필드 또는 마지막 벡터 필드는 삭제할 수 없습니다.</p></li>
<li><p><code translate="no">ARRAY&lt;STRUCT&gt;</code> 필드 전체는 삭제할 수 있지만, <code translate="no">ARRAY&lt;STRUCT&gt;</code> 필드 내의 개별 하위 필드는 삭제할 수 없습니다.</p></li>
<li><p>함수 입력 필드로 사용되거나 함수 출력 필드로 생성된 필드는 직접 삭제할 수 없습니다. 함수 출력 필드를 제거하려면 해당 필드를 생성하는 함수를 삭제하십시오.</p></li>
</ul>
<p><strong>함수 및 해당 함수가 생성한 벡터 필드 삭제</strong></p>
<ul>
<li><p>이 스키마 변경 워크플로에서 함수를 삭제하면 해당 함수, 생성된 벡터 필드 및 관련 인덱스가 제거됩니다. 함수 입력 필드는 컬렉션 스키마에 그대로 유지됩니다.</p></li>
<li><p>생성된 벡터 필드를 제거하면 컬렉션에 벡터 필드가 하나도 남지 않게 되는 경우, 함수 삭제는 거부됩니다.</p></li>
</ul>
<div class="alert note">
<p>지원되는 추가 및 삭제 작업 범위를 벗어난 스키마 변경의 경우, 컬렉션을 다시 생성하거나 마이그레이션하십시오.</p>
</div>
<p><a id="add-fields-to-an-existing-collection"></a></p>
<h2 id="Add-fields-and-Functions-to-an-existing-collection" class="common-anchor-header">기존 컬렉션에 필드 및 함수 추가<button data-href="#Add-fields-and-Functions-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>사용자 정의 필드를 추가하는지, 아니면 벡터 필드를 생성하는 함수를 추가하는지에 따라 워크플로를 선택하십시오:</p>
<ul>
<li><p>필터링, 쿼리 출력 또는 애플리케이션 로직을 위한 새로운 메타데이터가 필요한 경우<a href="#add-user-defined-scalar-fields--milvus-26x">사용자 정의 스칼라 필드를 추가하십시오</a>.</p></li>
<li><p>요소들이 동일한 Struct 스키마를 공유하는 배열 필드가 필요한 경우<a href="#add-structarray-fields--milvus-300">StructArray 필드를 추가하십시오</a>.</p></li>
<li><p>애플리케이션에서 임베딩을 생성하고 벡터 값을 Milvus에 기록하는 경우<a href="#add-user-defined-vector-fields--milvus-2618">사용자 정의 벡터 필드를 추가하십시오</a>.</p></li>
<li><p>Milvus가 기존 필드(예: 텍스트의 BM25 스파스 벡터 또는 MinHash 시그니처)로부터 벡터 값을 생성해야 하는 경우,<a href="#add-a-function-and-its-generated-vector-field--milvus-30x">함수와 해당 함수가 생성하는 벡터 필드를 추가하십시오</a>.</p></li>
</ul>
<p>모든 경우에 있어, 새 필드 이름은 컬렉션 내에 이미 존재해서는 안 되며, 필드의 총 개수는 Milvus의 필드 수 제한을 초과할 수 없습니다. 자세한 내용은 <a href="/docs/ko/limitations.md#number-of-resources-in-a-collection">Milvus 제한 사항을</a> 참조하십시오.</p>
<h3 id="Add-user-defined-scalar-fields--Milvus-26x" class="common-anchor-header">사용자 정의 스칼라 필드 추가<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Add-user-defined-scalar-fields--Milvus-26x" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">add_collection_field()</code> 를 사용하여 기존 컬렉션에 사용자 정의 스칼라 필드를 추가할 수 있습니다.</p>
<p>이는 동적 필드에 임의의 키를 저장하는 것과는 다릅니다. 스키마 업데이트가 적용된 후에는 새로운 스칼라 필드가 컬렉션 스키마의 정식 구성 요소가 됩니다. 이 필드에 값을 삽입하거나 업서트(upsert)할 수 있으며, 지원되는 경우 인덱스를 생성하고, 쿼리 및 검색 필터에서 사용할 수 있으며, 쿼리 또는 검색 결과로 반환할 수 있습니다.</p>
<p>기존 엔티티는 새 필드가 생성되기 전에 삽입되었기 때문에, 추가되는 모든 사용자 정의 스칼라 필드는 null 허용 가능해야 합니다:</p>
<ul>
<li><p><code translate="no">nullable=True</code> 를 사용하고 <code translate="no">default_value</code> 를 지정하지 않은 채 스칼라 필드를 추가하면, 기존 엔티티는 새 필드에 대해 <code translate="no">NULL</code> 를 반환합니다.</p></li>
<li><p><code translate="no">nullable=True</code> 를 지정하고 <code translate="no">default_value</code> 를 함께 사용하여 스칼라 필드를 추가하면, 기존 엔티티는 새 필드에 대해 <code translate="no">NULL</code> 를 반환합니다.</p></li>
</ul>
<p>스칼라 필터 표현식은 <code translate="no">NULL</code> 스칼라 값과 일치하지 않습니다. 자세한 내용은 <a href="/docs/ko/nullable-and-default.md">'Nullable Fields'를</a> 참조하십시오.</p>
<p><strong>예: null 허용 스칼라 필드 추가</strong></p>
<p>다음 예제는 <code translate="no">product_catalog</code> 라는 기존 컬렉션에 null이 허용되는 <code translate="no">source</code> 필드를 추가합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;source&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">128</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>필드가 추가된 후, 컬렉션에 이미 존재하던 엔티티는 <code translate="no">source</code> 에 대해 <code translate="no">NULL</code> 을 반환합니다. 새 엔티티는 삽입(insert) 또는 업데이트(upsert) 시 <code translate="no">source</code> 을 설정할 수 있습니다.</p>
<p><strong>예: 기본값이 있는 스칼라 필드 추가</strong></p>
<p>기존 엔티티가 ` <code translate="no">NULL</code>` 대신 구체적인 값을 반환해야 하는 경우, 스칼라 필드를 추가할 때 ` <code translate="no">default_value</code> `을 지정하십시오. 다음 예제는 ` <code translate="no">review_status</code> ` 필드를 추가하고 ` <code translate="no">&quot;unreviewed&quot;</code> `을 기본값으로 사용합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;review_status&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.VARCHAR,</span>
<span class="highlighted-comment-line">    max_length=<span class="hljs-number">32</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">    default_value=<span class="hljs-string">&quot;unreviewed&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>필드가 추가된 후, 컬렉션에 이미 존재하던 엔티티는 ` <code translate="no">review_status</code>`에 대해 ` <code translate="no">&quot;unreviewed&quot;</code> `을 반환합니다. 새로 생성된 엔티티는 다른 값을 설정하거나, 값이 제공되지 않을 경우 기본값을 사용할 수 있습니다.</p>
<h3 id="Add-StructArray-fields--Milvus-300" class="common-anchor-header">StructArray 필드 추가<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.0</span><button data-href="#Add-StructArray-fields--Milvus-300" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">add_collection_struct_field()</code> 를 사용하여 Struct 요소의 배열을 허용하는 StructArray 필드를 추가할 수 있습니다. StructArray 필드를 추가하려면 다음 절차를 따르십시오.</p>
<ol>
<li><p>지원되는 데이터 유형의 필수 하위 필드를 포함하는 Struct 스키마를 생성합니다. 적용 가능한 데이터 유형에 대해서는 <a href="/docs/ko/structarray-limits.md#Supported-subfield-data-types">StructArray 제한 사항을</a> 참조하십시오.</p></li>
<li><p>위에서 생성한 Struct 스키마를 참조하고, ` <code translate="no">add_collection_struct_field()</code>`에서 필드의 최대 용량을 설정합니다.</p></li>
<li><p>요청에서 ` <code translate="no">nullable=True</code> `을 설정합니다.</p></li>
</ol>
<p><strong>예: null 허용 StructArray 필드 추가</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Create a Struct schema.</span>
struct_schema = client.create_struct_field_schema()

<span class="hljs-comment"># Add scalar fields to the Struct.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">65535</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter&quot;</span>, DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)

<span class="hljs-comment"># Add vector fields to the Struct with mmap enabled.</span>
struct_schema.add_field(<span class="hljs-string">&quot;text_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)
struct_schema.add_field(<span class="hljs-string">&quot;chapter_vector&quot;</span>, DataType.FLOAT_VECTOR, mmap_enabled=<span class="hljs-literal">True</span>, dim=<span class="hljs-number">5</span>)

<span class="highlighted-comment-line">client.add_collection_struct_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;books&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">    struct_schema=struct_schema,</span>
<span class="highlighted-comment-line">    max_capacity=<span class="hljs-number">1024</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>StructArray 필드가 추가된 후, 컬렉션에 이미 존재하는 엔티티는 모든 하위 필드에 대해 ` <code translate="no">chunks</code> `에 대해 ` <code translate="no">NULL</code> `을 반환합니다. 새 엔티티를 삽입할 때는 모든 하위 필드가 ` <code translate="no">NULL</code> `이거나 유효한 값을 갖도록 해야 합니다. 일부 하위 필드는 ` <code translate="no">NULL</code> `으로 설정하고 다른 필드는 유효한 값으로 설정한 엔티티를 삽입하면 오류가 발생합니다.</p>
<h3 id="Add-user-defined-vector-fields--Milvus-2618+" class="common-anchor-header">사용자 정의 벡터 필드 추가<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.18+</span><button data-href="#Add-user-defined-vector-fields--Milvus-2618+" class="anchor-icon" translate="no">
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
    </button></h3><p>애플리케이션에서 임베딩을 생성하고 벡터 값을 Milvus에 기록할 때, ` <code translate="no">add_collection_field()</code> `를 사용하여 사용자 정의 벡터 필드를 추가하십시오.</p>
<p>추가된 모든 사용자 정의 벡터 필드는 nullable이어야 합니다. 기존 엔티티의 경우, upsert 또는 백필(backfill) 워크플로를 통해 벡터 값을 기록할 때까지 새 벡터 필드에 대해 <code translate="no">NULL</code> 가 적용됩니다. 새 엔티티는 삽입 시 해당 벡터 필드를 포함할 수 있습니다. 벡터 검색은 벡터 값이 <code translate="no">NULL</code> 인 엔티티를 건너뜁니다. 자세한 내용은 <a href="/docs/ko/nullable-and-default.md">'Nullable Fields'를</a> 참조하십시오.</p>
<p><strong>예: null 허용 벡터 필드 추가</strong></p>
<p>다음 예제는 <code translate="no">embedding_v2</code> 이라는 이름의 nullable dense 벡터 필드를 기존 컬렉션에 추가합니다. <code translate="no">dim</code> 을 애플리케이션에서 생성한 임베딩의 차원으로 설정하십시오.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.add_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,</span>
<span class="highlighted-comment-line">    data_type=DataType.FLOAT_VECTOR,</span>
<span class="highlighted-comment-line">    dim=<span class="hljs-number">768</span>,</span>
<span class="highlighted-comment-line">    nullable=<span class="hljs-literal">True</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>필드가 추가된 후, 검색을 수행하기 전에 새 벡터 필드에 대한 인덱스를 생성하십시오:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;embedding_v2&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>기존 엔티티는 <code translate="no">embedding_v2</code> 에 대해 <code translate="no">NULL</code> 값을 가지며, 이 필드로 검색할 때 건너뜁니다. 기존 엔티티를 <code translate="no">embedding_v2</code> 를 통해 검색 가능하게 하려면, 업서트(upsert) 또는 백필(backfill) 워크플로를 통해 NULL이 아닌 벡터 값을 기록하십시오. 새 엔티티는 삽입 시 <code translate="no">embedding_v2</code> 를 포함할 수 있습니다.</p>
<p><a id="add-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Add-a-Function-and-its-generated-vector-field--Milvus-30x" class="common-anchor-header">함수 및 해당 함수가 생성한 벡터 필드 추가<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Add-a-Function-and-its-generated-vector-field--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus가 기존 컬렉션에 이미 저장된 데이터로부터 새로운 벡터 필드를 생성해야 할 때 이 워크플로를 사용합니다. 이 작업은 세 가지 관련 스키마 요소를 추가합니다:</p>
<ul>
<li><p>하나 이상의 기존 입력 필드에서 데이터를 읽어오는 함수 정의.</p></li>
<li><p>함수 출력을 저장하는 새로운 벡터 필드.</p></li>
<li><p>새로운 벡터 필드에 바인딩된 인덱스 정의.</p></li>
</ul>
<p>예를 들어, BM25 함수는 기존 ‘ <code translate="no">VARCHAR</code> ’ 필드를 읽어들이고, 어휘 검색을 위한 ‘ <code translate="no">SPARSE_FLOAT_VECTOR</code> ’ 필드를 생성합니다. MinHash 함수는 유사 중복 감지를 위한 ‘ <code translate="no">BINARY_VECTOR</code> ’ 필드를 생성합니다. 이 워크플로는 함수의 입력 필드를 추가하거나 대체하지 않습니다.</p>
<div class="alert note">
<p>이 기능을 사용하려면 Storage V3가 필요합니다. 활성화 방법 및 호환성 고려 사항에 대해서는 <a href="/docs/ko/storage-v3.md">Storage V3를</a> 참조하십시오.</p>
</div>
<p>기존 컬렉션에 함수와 해당 함수가 생성한 벡터 필드를 추가하려면 스키마 버전 압축 및 스토리지 버전 압축도 필요합니다. 두 설정 중 하나라도 비활성화된 경우 Milvus는 요청을 거부합니다. 이러한 추가 전제 조건은 기존 컬렉션을 수정할 때만 적용되며, 초기 컬렉션 스키마에서 함수를 정의하는 경우에는 이 기존 데이터 백필 워크플로가 사용되지 않습니다.</p>
<p>지원되는 Function에 따라 생성되는 벡터 필드의 유형이 결정됩니다:</p>
<table>
<thead>
<tr><th>함수</th><th>생성된 벡터 필드 유형</th><th>일반적인 입력 필드</th><th>일반적인 사용 사례</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BM25</code></td><td><code translate="no">SPARSE_FLOAT_VECTOR</code></td><td>분석기가 활성화된 <code translate="no">VARCHAR</code> 장</td><td>어휘 검색 및 키워드 관련성</td></tr>
<tr><td><code translate="no">MINHASH</code></td><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">VARCHAR</code> 필드</td><td>준중복 감지</td></tr>
</tbody>
</table>
<p>각 함수의 작동 방식에 대한 자세한 내용은 <a href="/docs/ko/bm25-function.md">BM25 함수</a> 및 <a href="/docs/ko/minhash-function.md">MinHash 함수를</a> 참조하십시오.</p>
<p>생성된 벡터 필드는 컬렉션에 이미 존재해서는 안 되며, null 허용 필드일 수 없습니다. 함수 입력 필드는 이미 존재해야 합니다.</p>
<p><strong>예: BM25 함수 및 해당 함수에 의해 생성된 스파스 벡터 필드 추가</strong></p>
<p>다음 예제는 <code translate="no">text_bm25</code> 이라는 이름의 BM25 함수와 <code translate="no">text_sparse</code> 이라는 이름의 생성된 스파스 벡터 필드를 기존 컬렉션에 추가합니다. 컬렉션에는 이미 분석기가 활성화된 <code translate="no">text</code> 이라는 이름의 <code translate="no">VARCHAR</code> 필드가 존재해야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

sparse_field = client.create_field_schema(
    name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    data_type=DataType.SPARSE_FLOAT_VECTOR,
    desc=<span class="hljs-string">&quot;BM25-generated sparse vector field&quot;</span>,
)

bm25_function = Function(
    name=<span class="hljs-string">&quot;text_bm25&quot;</span>,
    input_field_names=[<span class="hljs-string">&quot;text&quot;</span>],
    output_field_names=[<span class="hljs-string">&quot;text_sparse&quot;</span>],
    function_type=FunctionType.BM25,
)

index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;text_sparse&quot;</span>,
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>,
    params={
        <span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>,
        <span class="hljs-string">&quot;bm25_k1&quot;</span>: <span class="hljs-number">1.2</span>,
        <span class="hljs-string">&quot;bm25_b&quot;</span>: <span class="hljs-number">0.75</span>,
    },
)

<span class="highlighted-comment-line">client.add_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_schema=sparse_field,</span>
<span class="highlighted-comment-line">    func=bm25_function,</span>
<span class="highlighted-comment-line">    index_params=index_params,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">index_params</code> 객체에는 새 함수 출력 필드에 대한 인덱스 정의가 정확히 하나만 포함되어 있어야 합니다. Milvus는 함수, 생성된 벡터 필드 및 바운드 인덱스 정의를 동일한 스키마 변경 사항에 추가합니다. <code translate="no">add_function_field()</code> 명령어 실행 후 <code translate="no">create_index()</code> 명령어를 별도로 호출하지 마십시오.</p>
<p>개념적으로, 이 작업은 다음의 Function, 생성된 출력 필드 및 바인딩된 인덱스 정의를 추가합니다:</p>
<pre><code translate="no" class="language-plaintext">New Function:
  name: &quot;text_bm25&quot;
  type: BM25
  input_field_names: [&quot;text&quot;]
  output_field_names: [&quot;text_sparse&quot;]

New generated output field:
  name: &quot;text_sparse&quot;
  data_type: SPARSE_FLOAT_VECTOR
  nullable: false

Bound index:
  field_name: &quot;text_sparse&quot;
  index_type: SPARSE_INVERTED_INDEX
  metric_type: BM25
<button class="copy-code-btn"></button></code></pre>
<p>요청이 성공하면, ` <code translate="no">describe_collection()</code> `는 컬렉션 스키마 내에서 새로운 ` <code translate="no">text_bm25</code> ` 함수와 이에 의해 생성된 ` <code translate="no">text_sparse</code> ` 벡터 필드를 모두 반환합니다. Milvus는 새로운 엔티티가 기록될 때마다 해당 함수 출력을 생성합니다. 기존 엔티티의 경우, Milvus는 백그라운드 압축을 통해 생성된 벡터 필드를 비동기적으로 채웁니다. 스키마 가시성은 스키마 업데이트가 성공했음을 확인해 주지만, 모든 기존 엔티티에 대한 백필이 완료되었음을 나타내지는 않습니다. 전체 BM25 검색 워크플로에 대해서는 <a href="/docs/ko/full-text-search.md">‘전체 텍스트 검색(Full Text Search</a>)’을 참조하십시오.</p>
<p>Milvus는 또한 근사 중복 탐지를 위한 MinHash 함수와 이에 의해 생성된 이진 벡터 필드를 지원합니다. MinHash 함수는 <code translate="no">FunctionType.MINHASH</code> 를 사용하며, 새로운 <code translate="no">BINARY_VECTOR</code> 출력 필드에 데이터를 기록합니다. 구성에 대한 자세한 내용은 <a href="/docs/ko/minhash-function.md">MinHash 함수를</a> 참조하십시오.</p>
<p><a id="drop-fields-from-an-existing-collection"></a></p>
<h2 id="Drop-fields-and-Functions-from-an-existing-collection" class="common-anchor-header">기존 컬렉션에서 필드 및 함수 삭제<button data-href="#Drop-fields-and-Functions-from-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>사용자 정의 필드가 더 이상 컬렉션 모델의 일부가 아닌 경우, 해당 필드를 직접 제거할 수 있습니다. 함수와 생성된 벡터 필드를 제거하려면 함수를 삭제하십시오. Milvus는 동일한 스키마 변경 과정에서 생성된 필드와 해당 인덱스를 제거합니다.</p>
<h3 id="Drop-user-defined-fields--Milvus-30x" class="common-anchor-header">사용자 정의 필드 삭제<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-user-defined-fields--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">drop_collection_field()</code> 를 사용하여 더 이상 컬렉션 모델의 일부가 아닌 사용자 정의 스칼라, 벡터 또는 StructArray 필드를 제거할 수 있습니다.</p>
<p>필드를 삭제하면 먼저 컬렉션 스키마와 필드 가시성이 변경됩니다:</p>
<ul>
<li><p><code translate="no">drop_collection_field()</code> 이 성공적으로 완료되면 컬렉션 스키마가 업데이트됩니다. <code translate="no">describe_collection()</code> 는 더 이상 삭제된 필드를 반환하지 않으며, <code translate="no">output_fields</code> 에서 쿼리나 검색을 통해 해당 필드를 반환하거나 표현식에서 사용할 수 없게 됩니다.</p></li>
<li><p>삭제된 필드를 기반으로 생성된 인덱스는 스키마 업데이트의 일환으로 정리됩니다.</p></li>
</ul>
<p>저장소 정리는 스키마 정리와 별도로 처리됩니다. 자세한 내용은 <a href="#when-is-storage-space-reclaimed-after-dropping-a-field">‘필드를 삭제한 후 저장 공간은 언제 회수되나요?</a>’를 참조하십시오.</p>
<p><strong>예: 사용자 정의 스칼라 필드 삭제</strong></p>
<p>다음 예제는 <code translate="no">experiment_tag</code> 가 <code translate="no">product_catalog</code> 에 있는 사용자 정의 스칼라 필드라고 가정하고, 이 필드를 컬렉션에서 삭제합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;experiment_tag&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>필드를 삭제한 후, ` <code translate="no">describe_collection()</code> `를 호출하여 해당 필드가 더 이상 스키마의 일부가 아닌지 확인할 수 있습니다.</p>
<p><strong>예: StructArray 필드 삭제</strong></p>
<p>다음 예제는 <code translate="no">chunks</code> 가 <code translate="no">my_collection</code> 에 있는 StructArray 필드라고 가정하고, 이 필드를 컬렉션에서 삭제합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>예: 사용자 정의 벡터 필드 삭제</strong></p>
<p><code translate="no">drop_collection_field()</code> 메서드를 사용하여 벡터 필드를 삭제할 수 있지만, 삭제 후에도 컬렉션에는 최소한 하나의 벡터 필드가 남아 있어야 합니다. 이는 일시적으로 여러 벡터 표현을 포함하다가 나중에 그중 하나로 표준화하는 컬렉션에 유용합니다.</p>
<p>다음 예제는 ` <code translate="no">image_vector</code> `가 ` <code translate="no">hybrid_catalog</code>`에 있는 사용자 정의 벡터 필드이며, 컬렉션에 ` <code translate="no">text_vector</code>`와 같은 다른 벡터 필드가 여전히 남아 있다고 가정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_collection_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;hybrid_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    field_name=<span class="hljs-string">&quot;image_vector&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">image_vector</code> 가 컬렉션의 마지막 벡터 필드인 경우, 삭제 작업은 거부됩니다.</p>
<p><a id="drop-vector-fields-generated-by-functions--milvus-30x"></a></p>
<h3 id="Drop-a-Function-and-its-generated-vector-field--Milvus-30x" class="common-anchor-header">함수 및 해당 함수가 생성한 벡터 필드 삭제<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 3.0.x</span><button data-href="#Drop-a-Function-and-its-generated-vector-field--Milvus-30x" class="anchor-icon" translate="no">
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
    </button></h3><p>BM25 함수 및 해당 함수가 생성한 스파스 벡터 필드와 같이, 더 이상 함수나 해당 함수가 생성한 벡터 필드가 필요하지 않을 때 이 작업을 사용합니다.</p>
<p><code translate="no">drop_function_field()</code> 를 호출할 때 함수 이름을 지정하십시오. Milvus는 함수 입력 필드는 보존한 채로 함수, 생성된 벡터 필드 및 관련 인덱스를 제거합니다.</p>
<p><strong>예: BM25 함수 및 생성된 스파스 벡터 필드 삭제</strong></p>
<p>다음 예제는 ` <code translate="no">text_bm25</code> `가 ` <code translate="no">product_catalog</code> `에 있는 BM25 함수이며, ` <code translate="no">text_sparse</code>`라는 이름의 스파스 벡터 출력 필드를 생성한다고 가정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="highlighted-comment-line">client.drop_function_field(</span>
<span class="highlighted-comment-line">    collection_name=<span class="hljs-string">&quot;product_catalog&quot;</span>,</span>
<span class="highlighted-comment-line">    function_name=<span class="hljs-string">&quot;text_bm25&quot;</span>,</span>
<span class="highlighted-comment-line">)</span>
<button class="copy-code-btn"></button></code></pre>
<p>작업이 성공적으로 완료된 후, ` <code translate="no">describe_collection()</code> `은 삭제된 함수나 해당 함수가 생성한 벡터 필드를 더 이상 반환하지 않습니다. 함수 입력 필드는 스키마에 그대로 유지됩니다.</p>
<p>함수 출력 필드를 제거하면 컬렉션에 벡터 필드가 하나도 남지 않게 되는 경우, 해당 작업은 거부됩니다.</p>
<h2 id="FAQ" class="common-anchor-header">자주 묻는 질문<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Which-method-should-I-use-to-add-a-field-or-Function" class="common-anchor-header">필드나 함수를 추가하려면 어떤 메서드를 사용해야 합니까?<button data-href="#Which-method-should-I-use-to-add-a-field-or-Function" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">add_collection_field()</code> 을 사용하여 사용자 정의 스칼라 또는 벡터 필드를 추가하십시오.</p>
<p>요소들이 동일한 Struct 스키마를 공유하는 배열 필드가 필요한 경우, ` <code translate="no">add_collection_struct_field()</code> `를 사용하여 StructArray 필드를 추가하십시오.</p>
<p><code translate="no">add_function_field()</code> 를 사용하여 함수, 생성된 벡터 필드 및 바인딩된 인덱스 정의를 동일한 스키마 변경 사항에 추가하십시오.</p>
<h3 id="Why-must-added-user-defined-fields-be-nullable" class="common-anchor-header">추가된 사용자 정의 필드는 왜 null 허용이어야 합니까?<button data-href="#Why-must-added-user-defined-fields-be-nullable" class="anchor-icon" translate="no">
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
    </button></h3><p>기존 엔티티는 새 필드가 생성되기 전에 삽입되었으므로 해당 필드에 대한 값이 없습니다. ` <code translate="no">nullable=True</code> `를 설정하면, 애플리케이션이 값을 기록하거나(스칼라 필드의 경우 기본값이 적용될 때까지) Milvus가 누락된 값을 ` <code translate="no">NULL</code> `로 표현할 수 있습니다.</p>
<p>이 규칙은 ` <code translate="no">add_collection_field()</code>`로 추가된 사용자 정의 스칼라 필드 및 사용자 정의 벡터 필드와, ` <code translate="no">add_collection_struct_field()</code>`로 추가된 StructArray 필드에 적용됩니다. 이 규칙은 nullable로 설정될 수 없는 함수(Function)의 생성된 벡터 필드에는 적용되지 않습니다.</p>
<h3 id="What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="common-anchor-header">사용자 정의 필드를 추가한 후 기존 엔티티에는 어떤 변화가 발생합니까?<button data-href="#What-happens-to-existing-entities-after-I-add-a-user-defined-field" class="anchor-icon" translate="no">
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
    </button></h3><p>사용자 정의 스칼라 필드의 경우, <code translate="no">default_value</code> 를 설정하지 않는 한 기존 엔티티는 <code translate="no">NULL</code> 를 반환합니다. <code translate="no">default_value</code> 를 설정하면 기존 엔티티는 해당 기본값을 반환합니다.</p>
<p>사용자 정의 벡터 필드의 경우, 기존 엔티티는 새로운 벡터 필드에 대해 ` <code translate="no">NULL</code> ` 값을 갖습니다. 추가된 필드에 대한 벡터 검색은 벡터 값이 ` <code translate="no">NULL</code>`인 엔티티를 건너뜁니다. 기존 엔티티가 새로운 벡터 필드를 통해 검색 가능하도록 하려면, upsert 또는 백필(backfill) 워크플로를 통해 NULL이 아닌 벡터 값을 기록해야 합니다. 새 엔티티는 삽입 시 새로운 벡터 필드를 포함할 수 있습니다.</p>
<p>StructArray 필드의 경우, 기존 엔티티는 해당 StructArray 필드의 모든 하위 필드에 대해 <code translate="no">NULL</code> 를 반환합니다. 새 엔티티는 모든 하위 필드에 대해 <code translate="no">NULL</code> 를 제공하거나, 모든 하위 필드에 유효한 값을 제공해야 합니다.</p>
<h3 id="Can-I-add-BM25-lexical-search-to-an-existing-collection" class="common-anchor-header">기존 컬렉션에 BM25 어휘 검색을 추가할 수 있나요?<button data-href="#Can-I-add-BM25-lexical-search-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h3><p>예. 컬렉션에 이미 분석기가 활성화된 <code translate="no">VARCHAR</code> 필드가 있는 경우, 어휘 검색을 위해 BM25 함수와 해당 함수가 생성한 스파스 벡터 필드를 추가할 수 있습니다. 이 워크플로우에서 Milvus는 함수, 새로운 <code translate="no">SPARSE_FLOAT_VECTOR</code> 출력 필드 및 바운드 인덱스 정의를 동일한 스키마 변경 사항에 추가합니다. 이 스키마 변경 워크플로우에서는 기존 <code translate="no">TEXT</code> 필드를 BM25 입력으로 사용할 수 없습니다. <code translate="no">TEXT</code> 입력을 사용하려면 컬렉션을 생성할 때 해당 필드와 BM25 함수를 정의해야 합니다.</p>
<p><code translate="no">add_function_field()</code> 를 호출할 때는, 새로운 출력 필드에 대한 <code translate="no">metric_type=&quot;BM25&quot;</code> 가 포함된 <code translate="no">SPARSE_INVERTED_INDEX</code> 인덱스 하나를 가진 <code translate="no">index_params</code> 객체를 제공해야 합니다. Milvus는 동일한 스키마 변경의 일환으로 인덱스 정의를 생성된 필드에 바인딩합니다.</p>
<h3 id="How-do-I-drop-a-Function-and-its-generated-vector-field" class="common-anchor-header">함수와 생성된 벡터 필드를 삭제하려면 어떻게 해야 합니까?<button data-href="#How-do-I-drop-a-Function-and-its-generated-vector-field" class="anchor-icon" translate="no">
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
    </button></h3><p>Function 이름을 지정하여 ` <code translate="no">drop_function_field()</code> `를 호출하십시오. 이 스키마 변경 워크플로우에서 Milvus는 Function의 입력 필드는 유지한 채, 해당 Function과 생성된 벡터 필드, 그리고 관련 인덱스를 함께 제거합니다.</p>
<h3 id="Do-I-need-to-wait-after-altering-a-collection-schema" class="common-anchor-header">컬렉션 스키마를 변경한 후 기다려야 하나요?<button data-href="#Do-I-need-to-wait-after-altering-a-collection-schema" class="anchor-icon" translate="no">
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
    </button></h3><p>일반적으로 수동으로 기다릴 필요는 없습니다. 다음 작업이 업데이트된 스키마에 의존하는 경우, 먼저 ` <code translate="no">describe_collection()</code> `를 호출하여 Milvus가 현재 반환하는 스키마를 확인할 수 있습니다.</p>
<p>분산 배포 환경에서는 Milvus 구성 요소가 컬렉션 메타데이터를 새로 고치는 동안 짧은 전파 시간이 발생할 수 있습니다. 스키마 변경 직후 수행하는 작업이 스키마 관련 오류로 실패하는 경우, 스키마를 새로 고친 후 작업을 다시 시도하십시오.</p>
<h3 id="When-is-storage-space-reclaimed-after-dropping-a-field" class="common-anchor-header">필드를 삭제한 후 저장 공간은 언제 회수되나요?<button data-href="#When-is-storage-space-reclaimed-after-dropping-a-field" class="anchor-icon" translate="no">
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
    </button></h3><p>필드를 삭제하면 해당 필드가 현재 스키마 및 일반 쿼리/검색 범위에서 제거되지만, 해당 필드의 과거 데이터는 오브젝트 스토리지에서 즉시 물리적으로 삭제되지는 않습니다.</p>
<p>저장 공간은 나중에 압축 과정에서 회수될 수 있습니다. 압축은 기존 데이터 파일을 더 간결한 새 파일로 재구성하는 백그라운드 프로세스입니다. 필드가 삭제된 후, 새로 압축된 파일은 현재 스키마를 따르며 삭제된 필드는 제외됩니다. Milvus는 필드 삭제 후 저장 공간의 즉각적이거나 정해진 시점의 감소를 보장하지 않습니다.</p>
<h3 id="What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="common-anchor-header">동적 필드 키와 이름이 동일한 스칼라 필드를 추가하면 어떻게 되나요?<button data-href="#What-happens-if-I-add-a-scalar-field-with-the-same-name-as-a-dynamic-field-key" class="anchor-icon" translate="no">
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
    </button></h3><p>동적 필드가 활성화된 경우, 기존 동적 필드 키와 동일한 이름을 가진 스칼라 필드를 추가할 수 있습니다. 새로운 스칼라 필드는 일반 쿼리 출력에서 동적 필드 키를 가립니다만, 원본 동적 데이터는 <code translate="no">$meta</code> 에 보존됩니다.</p>
<p>예를 들어, 기존 엔티티에 <code translate="no">source</code> 라는 동적 키가 저장되어 있고, 나중에 <code translate="no">source</code> 라는 스칼라 필드를 추가하는 경우, <code translate="no">source</code> 에 대한 일반 출력에서는 스칼라 필드를 참조합니다. 원래의 동적 값에 액세스하려면 <code translate="no">$meta[&quot;source&quot;]</code> 와 같이 <code translate="no">$meta</code> 경로 구문을 사용하십시오.</p>
