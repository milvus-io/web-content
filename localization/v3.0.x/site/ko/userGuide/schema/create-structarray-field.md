---
id: create-structarray-field.md
title: StructArray 필드 생성
summary: >-
  하나의 엔티티에 구조화된 요소들의 정렬된 목록을 포함해야 할 경우 StructArray 필드를 생성합니다. StructArray 필드는 요소
  유형이 Struct인 Array 필드입니다. 각 Struct 요소는 동일한 스키마를 따르며, 스칼라 하위 필드, 벡터 하위 필드 또는 둘
  다를 포함할 수 있습니다.
---
<h1 id="Create-a-StructArray-Field" class="common-anchor-header">StructArray 필드 생성<button data-href="#Create-a-StructArray-Field" class="anchor-icon" translate="no">
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
    </button></h1><p>하나의 엔티티에 구조화된 요소들의 정렬된 목록을 포함해야 할 때 StructArray 필드를 생성합니다. StructArray 필드는 요소 유형이 Struct인 Array 필드입니다. 각 Struct 요소는 동일한 스키마를 따르며, 스칼라 하위 필드, 벡터 하위 필드 또는 둘 다를 포함할 수 있습니다.</p>
<p>이 페이지에서는 Struct 스키마를 정의하고, 이를 StructArray 필드로 추가하며, 향후 검색 및 필터링을 위해 하위 필드를 선택하고, 데이터를 삽입하거나 인덱싱하기 전에 적용되는 스키마 규칙을 이해하는 방법을 설명합니다.</p>
<h2 id="Before-you-begin" class="common-anchor-header">시작하기 전에<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>이 페이지에서는 <code translate="no">tech_articles</code> 라는 컬렉션을 사용합니다. 각 엔티티는 하나의 기술 문서를 나타내며, <code translate="no">chunks</code> 필드는 청크 수준 데이터를 Struct 요소로 저장합니다.</p>
<table>
<thead>
<tr><th>필드</th><th>유형</th><th>목적</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">doc_id</code></td><td><code translate="no">INT64</code></td><td>문서의 기본 키입니다.</td></tr>
<tr><td><code translate="no">title</code></td><td><code translate="no">VARCHAR</code></td><td>기사 제목.</td></tr>
<tr><td><code translate="no">category</code></td><td><code translate="no">VARCHAR</code></td><td>기사 수준의 카테고리.</td></tr>
<tr><td><code translate="no">title_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>기사 수준의 벡터 필드로, 이후 하이브리드 검색 예제에서 사용됩니다.</td></tr>
<tr><td><code translate="no">chunks</code></td><td><code translate="no">ARRAY</code></td><td>청크 수준의 텍스트, 메타데이터 및 임베딩을 저장하는 StructArray 필드.</td></tr>
</tbody>
</table>
<p><code translate="no">chunks</code> StructArray 필드에는 다음과 같은 하위 필드가 포함되어 있습니다.</p>
<table>
<thead>
<tr><th>하위 필드</th><th>유형</th><th>용도</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">text</code></td><td><code translate="no">VARCHAR</code></td><td>청크 텍스트.</td></tr>
<tr><td><code translate="no">section</code></td><td><code translate="no">VARCHAR</code></td><td><code translate="no">index</code>, <code translate="no">search</code>, <code translate="no">filter</code> 와 같은 섹션 이름.</td></tr>
<tr><td><code translate="no">page</code></td><td><code translate="no">INT64</code></td><td>청크의 페이지 번호 또는 논리적 위치.</td></tr>
<tr><td><code translate="no">quality_score</code></td><td><code translate="no">FLOAT</code></td><td>스칼라 필터링 및 범위 예제에서 사용되는 청크 수준 점수.</td></tr>
<tr><td><code translate="no">has_code</code></td><td><code translate="no">BOOL</code></td><td>청크에 코드가 포함되어 있는지 여부.</td></tr>
<tr><td><code translate="no">emb_list_vector</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td><code translate="no">MAX_SIM*</code> 메트릭을 사용한 EmbeddingList 검색을 위한 벡터 하위 필드.</td></tr>
<tr><td><code translate="no">emb</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>일반 벡터 메트릭을 사용하는 요소 수준 검색을 위한 벡터 하위 필드.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>벡터 필드 또는 벡터 하위 필드는 하나의 인덱스만 허용합니다. EmbeddingList 검색과 요소 수준 검색이 모두 필요한 경우, 두 개의 별도 벡터 하위 필드를 정의하십시오. 이 예에서 <code translate="no">chunks[emb_list_vector]</code> 는 EmbeddingList 검색용이고, <code translate="no">chunks[emb]</code> 는 요소 수준 검색용입니다.</p>
</div>
<h2 id="Supported-subfield-data-types" class="common-anchor-header">지원되는 서브필드 데이터 유형<button data-href="#Supported-subfield-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 필드는 각 Struct 하위 필드마다 하나의 배열 값을 저장합니다. Struct 스키마를 정의할 때는 지원되는 스칼라 및 벡터 계열에서 하위 필드 유형을 선택하십시오.</p>
<table>
<thead>
<tr><th>Struct 하위 필드의 물리 유형</th><th>지원</th><th>참고</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>지원됨</td><td><code translate="no">DataType.BOOL</code> 형식으로 하위 필드를 정의하십시오.</td></tr>
<tr><td><code translate="no">Array</code></td><td>지원됨</td><td>서브필드를 <code translate="no">DataType.INT8</code>, <code translate="no">DataType.INT16</code>, <code translate="no">DataType.INT32</code> 또는 <code translate="no">DataType.INT64</code> 로 정의합니다.</td></tr>
<tr><td><code translate="no">Array</code></td><td>지원됨</td><td>하위 필드를 <code translate="no">DataType.FLOAT</code> 또는 <code translate="no">DataType.DOUBLE</code> 로 정의합니다.</td></tr>
<tr><td><code translate="no">Array</code></td><td>지원됨서브필드를 xml-ph-0000@deepl.internal 또는 xml-ph-0001@deepl.internal로 정의합니다.</td><td>하위 필드를 <code translate="no">DataType.VARCHAR</code> 로 정의하고 <code translate="no">max_length</code> 를 설정합니다.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>지원됨</td><td>서브 필드를 <code translate="no">DataType.FLOAT_VECTOR</code> 로 정의하고 <code translate="no">dim</code> 를 설정하십시오.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>지원됨</td><td>서브 필드를 <code translate="no">DataType.FLOAT16_VECTOR</code> 로 정의하고 <code translate="no">dim</code> 를 설정하십시오.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>지원됨</td><td>서브 필드를 <code translate="no">DataType.BFLOAT16_VECTOR</code> 로 정의하고 <code translate="no">dim</code> 를 설정하십시오.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>지원됨</td><td>서브 필드를 <code translate="no">DataType.INT8_VECTOR</code> 로 정의하고 <code translate="no">dim</code> 를 설정하십시오.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>지원됨</td><td>서브 필드를 <code translate="no">DataType.BINARY_VECTOR</code> 로 정의하고 <code translate="no">dim</code> 를 설정하십시오.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>지원되지 않음</td><td>StructArray 필드에서는 스파스 벡터 하위 필드가 지원되지 않습니다.</td></tr>
<tr><td><code translate="no">Array</code></td><td>지원되지 않음</td><td><code translate="no">String</code> 대신 <code translate="no">VARCHAR</code> 을 사용하십시오.</td></tr>
<tr><td><code translate="no">Array</code></td><td>지원되지 않음</td><td>StructArray 필드에서는 JSON 하위 필드가 지원되지 않습니다.</td></tr>
<tr><td><code translate="no">Array</code></td><td>지원되지 않음</td><td>StructArray 필드에서는 지오메트리 하위 필드와 GIS 함수가 지원되지 않습니다.</td></tr>
<tr><td><code translate="no">Array</code></td><td>지원되지 않음</td><td>StructArray 필드에서는 텍스트 하위 필드가 지원되지 않습니다.</td></tr>
<tr><td><code translate="no">Array</code></td><td>지원되지 않음</td><td>StructArray 필드에서는 Timestamptz 하위 필드 및 시간 기반 표현식이 지원되지 않습니다.</td></tr>
<tr><td>중첩된 <code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code> 또는 <code translate="no">ArrayOfStruct</code></td><td>지원되지 않음</td><td>StructArray 필드에는 중첩된 배열, 중첩된 벡터 배열, 중첩된 Struct 필드 또는 중첩된 Array-of-Struct 필드를 포함할 수 없습니다.</td></tr>
</tbody>
</table>
<p>버전별 지원, nullable 동작 및 기타 제한 사항에 대해서는 <a href="/docs/ko/structarray-limits.md">StructArray 제한 사항을</a> 참조하십시오.</p>
<h2 id="Create-a-collection-with-a-StructArray-field" class="common-anchor-header">StructArray 필드가 포함된 컬렉션 만들기<button data-href="#Create-a-collection-with-a-StructArray-field" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 필드를 생성하려면 먼저 각 요소에서 사용되는 Struct 스키마를 정의하십시오. 그런 다음 Array 필드를 추가하고 해당 요소 유형을 Struct로 설정하십시오.</p>
<ol>
<li><p>컬렉션 스키마를 생성합니다.</p></li>
<li><p>기본 키 및 기사 수준 필드와 같은 컬렉션 수준 필드를 추가합니다.</p></li>
<li><p>StructArray 필드 내에 저장될 요소에 대한 Struct 스키마를 생성합니다.</p></li>
<li><p>Struct 스키마에 스칼라 및 벡터 하위 필드를 추가합니다.</p></li>
<li><p><code translate="no">element_type=DataType.STRUCT</code> 를 가진 Array 필드를 추가합니다.</p></li>
<li><p><code translate="no">struct_schema</code> 를 Struct 스키마로 설정합니다.</p></li>
<li><p><code translate="no">max_capacity</code> 을 설정하여 각 엔티티가 필드에 저장할 수 있는 Struct 요소의 수를 제한합니다.</p></li>
</ol>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

schema = client.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">False</span>,
)

<span class="hljs-comment"># Collection-level fields.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;doc_id&quot;</span>,
    datatype=DataType.INT64,
    is_primary=<span class="hljs-literal">True</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">512</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
schema.add_field(
    field_name=<span class="hljs-string">&quot;title_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Struct schema used by each element in the StructArray field.</span>
chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)

<span class="hljs-comment"># Vector subfield for EmbeddingList search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Vector subfield for element-level search.</span>
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

<span class="hljs-comment"># Add the StructArray field.</span>
schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    schema=schema,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Understand-StructArray-field-paths" class="common-anchor-header">StructArray 필드 경로 이해<button data-href="#Understand-StructArray-field-paths" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 필드를 생성한 후에는 <code translate="no">structArray[subfield]</code> 경로 구문을 사용하여 해당 하위 필드를 참조하십시오. 인덱스를 생성하거나, 벡터 하위 필드를 검색하거나, 하위 필드를 출력하거나, 스칼라 필터를 구축할 때 이 구문을 사용하십시오.</p>
<table>
<thead>
<tr><th>경로</th><th>의미</th><th>일반적인 사용법</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[text]</code></td><td>각 Struct 요소 내부의 <code translate="no">text</code> 하위 필드.</td><td>출력 필드 또는 스칼라 필터링.</td></tr>
<tr><td><code translate="no">chunks[section]</code></td><td>각 청크에 대한 섹션 레이블.</td><td>스칼라 필터링.</td></tr>
<tr><td><code translate="no">chunks[quality_score]</code></td><td>청크 수준의 품질 점수.</td><td>스칼라 필터링 또는 스칼라 인덱스.</td></tr>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td>임베딩 목록으로 사용되는 벡터 하위 필드.</td><td><code translate="no">MAX_SIM*</code> 를 사용한 EmbeddingList 검색.</td></tr>
<tr><td><code translate="no">chunks[emb]</code></td><td>각 Struct 요소가 독립적으로 사용하는 벡터 하위 필드.</td><td>요소 수준의 벡터 검색.</td></tr>
</tbody>
</table>
<h2 id="Make-a-StructArray-field-nullable" class="common-anchor-header">StructArray 필드를 null 허용 가능하게 만들기<button data-href="#Make-a-StructArray-field-nullable" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus v3.0.x는 nullable StructArray 필드를 지원합니다. nullable StructArray 필드를 사용하면 엔티티가 StructArray 필드 전체에 대해 <code translate="no">null</code> 를 저장할 수 있습니다.</p>
<pre><code translate="no" class="language-python">schema.add_field(
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>경고
Nullable StructArray 필드는 Milvus v3.0.x에서만 사용할 수 있습니다. Nullable StructArray 필드의 경우, 엔티티는 유효한 StructArray 값을 제공하거나 전체 필드를 <code translate="no">null</code> 로 설정할 수 있습니다. 유효한 StructArray 값을 삽입할 때는 모든 하위 필드가 null이거나 유효한 값을 가져야 합니다. 일부 하위 필드는 null로, 다른 하위 필드는 유효한 값으로 설정된 엔티티를 삽입하면 오류가 발생합니다. 자세한 내용은 <a href="/docs/ko/structarray-limits.md">StructArray 제한 사항을</a> 참조하십시오.</p>
</div>
<h2 id="Add-a-StructArray-field-to-an-existing-collection" class="common-anchor-header">기존 컬렉션에 StructArray 필드 추가<button data-href="#Add-a-StructArray-field-to-an-existing-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus v3.0.x는 기존 컬렉션에 StructArray 필드를 추가하는 기능을 지원합니다. 컬렉션에 이미 존재하는 엔티티에는 새 필드의 값이 없으므로, 추가되는 StructArray 필드는 null 허용형이어야 합니다.</p>
<p>기존 컬렉션에 StructArray 필드를 추가하려면 먼저 Struct 스키마를 정의해야 합니다. 그런 다음 ` <code translate="no">add_collection_struct_field()</code> `를 호출하고 ` <code translate="no">nullable=True</code>`를 설정합니다.</p>
<pre><code translate="no" class="language-python">chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;text&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">65535</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;section&quot;</span>,
    datatype=DataType.VARCHAR,
    max_length=<span class="hljs-number">128</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;page&quot;</span>,
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;quality_score&quot;</span>,
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;has_code&quot;</span>,
    datatype=DataType.BOOL,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb_list_vector&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)
chunk_schema.add_field(
    field_name=<span class="hljs-string">&quot;emb&quot;</span>,
    datatype=DataType.FLOAT_VECTOR,
    dim=<span class="hljs-number">4</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>StructArray 필드가 추가된 후, 기존 엔티티는 새 필드의 모든 하위 필드에 대해 ` <code translate="no">null</code> `를 반환합니다.</p>
<p>StructArray 필드가 생성된 후에는 해당 기존 StructArray 필드에 새로운 하위 필드를 추가할 수 없습니다. 나중에 추가 요소 속성이 필요한 경우, ` <code translate="no">drop_collection_field()</code> `를 호출하여 StructArray 필드를 삭제한 다음, 업데이트된 Struct 스키마를 사용하여 새로운 StructArray 필드를 추가하십시오.</p>
<pre><code translate="no" class="language-python">client.drop_collection_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
)

client.add_collection_struct_field(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    field_name=<span class="hljs-string">&quot;chunks&quot;</span>,
    struct_schema=updated_chunk_schema,
    max_capacity=<span class="hljs-number">1000</span>,
    nullable=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Schema-rules" class="common-anchor-header">스키마 규칙<button data-href="#Schema-rules" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>규칙</th><th>설명</th></tr>
</thead>
<tbody>
<tr><td>Struct는 Array 요소 유형으로 사용됩니다.</td><td><code translate="no">element_type=STRUCT</code> 를 사용하여 StructArray 필드를 Array 필드로 생성하십시오. Struct를 최상위 컬렉션 필드로 생성하지 마십시오.</td></tr>
<tr><td>모든 요소는 하나의 스키마를 공유합니다.</td><td>동일한 StructArray 필드 내의 모든 Struct 요소는 해당 필드에 대해 정의된 Struct 스키마를 따릅니다.</td></tr>
<tr><td><code translate="no">max_capacity</code> 는 필수입니다.</td><td>이는 각 엔티티가 StructArray 필드에 저장할 수 있는 Struct 요소의 수를 제한합니다.</td></tr>
<tr><td>지원되는 하위 필드 유형만 사용할 수 있습니다.</td><td>StructArray에서 지원하는 스칼라 및 벡터 하위 필드 유형을 사용하십시오. JSON, Geometry, Text, Timestamptz, SparseFloatVector 또는 중첩된 Struct/Array 하위 필드는 정의하지 마십시오.</td></tr>
<tr><td>벡터 하위 필드는 검색 전에 인덱스가 필요합니다.</td><td>벡터 검색을 실행하기 전에 <code translate="no">chunks[emb_list_vector]</code> 또는 <code translate="no">chunks[emb]</code> 와 같은 경로에 인덱스를 생성하십시오.</td></tr>
<tr><td>벡터 하위 필드 하나당 인덱스는 하나만 있어야 합니다.</td><td>EmbeddingList 검색과 요소 수준 검색이 모두 필요한 경우, 두 개의 별도 벡터 하위 필드를 생성하십시오.</td></tr>
<tr><td>기존 StructArray 하위 필드는 고정되어 있습니다.</td><td>StructArray 필드를 생성한 후에는 동일한 StructArray 필드에 더 이상 하위 필드를 추가할 수 없습니다.</td></tr>
<tr><td>Struct 내부에서는 함수가 지원되지 않습니다.</td><td>StructArray 필드 내의 필드나 하위 필드에 대한 함수를 정의하지 마십시오.</td></tr>
<tr><td>스칼라 하위 필드는 필터 요구 사항과 일치해야 합니다.</td><td><code translate="no">section</code>, <code translate="no">quality_score</code> 또는 <code translate="no">has_code</code> 와 같은 필드는 나중에 필터링, 그룹화 또는 출력이 필요한 경우에만 추가하십시오.</td></tr>
</tbody>
</table>
<h2 id="Common-mistakes" class="common-anchor-header">흔히 저지르는 실수<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p><code translate="no">DataType.STRUCT</code> 를 Array 필드의 요소 유형으로 사용하는 대신 최상위 컬렉션 필드로 생성하는 경우.</p></li>
<li><p>StructArray 필드에 <code translate="no">max_capacity</code> 를 설정하는 것을 잊는 경우.</p></li>
<li><p>JSON, Geometry, Text, Timestamptz, SparseFloatVector, 중첩된 Array, 중첩된 Struct 또는 Array-of-Struct와 같이 지원되지 않는 하위 필드 유형을 정의하는 경우.</p></li>
<li><p><code translate="no">String</code> 를 하위 필드 유형으로 사용하는 경우. <code translate="no">VARCHAR</code> 를 사용하고 <code translate="no">max_length</code> 를 설정하십시오.</p></li>
<li><p>EmbeddingList 검색과 요소 수준 검색 모두에 하나의 벡터 하위 필드를 사용하는 경우.</p></li>
<li><p>벡터 하위 필드만 추가하고, <code translate="no">section</code>, <code translate="no">quality_score</code> 또는 <code translate="no">has_code</code> 와 같이 필터링에 필요한 스칼라 하위 필드를 생략하는 경우.</p></li>
<li><p>벡터 서브필드를 <code translate="no">$[...]</code> 스칼라 술어 입력으로 취급합니다. 벡터 검색에는 벡터 서브필드를 사용하고, 스칼라 술어에는 스칼라 서브필드를 사용합니다.</p></li>
<li><p>필드가 생성된 후에도 기존 StructArray 필드에 새로운 하위 필드를 추가할 수 있다고 가정합니다.</p></li>
<li><p>필수 경로 구문인 <code translate="no">chunks[emb]</code> 또는 <code translate="no">chunks[emb_list_vector]</code> 대신 <code translate="no">chunks.emb</code> 또는 <code translate="no">chunks.emb_list_vector</code> 을 사용합니다.</p></li>
<li><p>Nullable StructArray의 동작을 모든 대상 버전에서 지원되는 것으로 간주합니다.</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">다음 단계<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h2><ol>
<li><p>StructArray 필드에 중첩된 데이터를 삽입하려면 <a href="/docs/ko/insert-data-into-structarray-fields.md">StructArray 필드에 데이터 삽입을</a> 참조하십시오.</p></li>
<li><p>벡터 및 스칼라 인덱스를 생성하려면 <a href="/docs/ko/index-structarray-fields.md">StructArray 필드 인덱싱을</a> 참조하십시오.</p></li>
<li><p>StructArray 벡터 하위 필드를 검색하려면 StructArray를 사용한 기본 벡터 검색을 참조하십시오.</p></li>
<li><p>지원되는 데이터 유형, null 허용 동작 및 버전별 제한 사항을 확인하려면 <a href="/docs/ko/structarray-limits.md">‘StructArray 제한 사항’을</a> 참조하십시오.</p></li>
</ol>
