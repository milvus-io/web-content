---
id: grouping-search-with-structarray.md
title: StructArray를 사용한 검색 결과 그룹화
summary: >-
  이 페이지를 사용하여 StructArray의 요소 수준 검색 결과를 상위 엔티티별로 그룹화할 수 있습니다. 여러 Struct 요소가 쿼리와
  일치할 경우, 요소 수준 검색에서는 동일한 엔티티에서 여러 개의 검색 결과가 반환될 수 있습니다. 그룹화 기능을 사용하면 이러한 요소 검색
  결과가 통합되어 각 상위 엔티티가 최대 한 번만 표시됩니다.
---
<h1 id="Grouping-Search-with-StructArray" class="common-anchor-header">StructArray를 사용한 검색 결과 그룹화<button data-href="#Grouping-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지를 사용하여 StructArray 요소 수준 검색 결과를 상위 엔티티별로 그룹화할 수 있습니다. 여러 Struct 요소가 쿼리와 일치할 경우, 요소 수준 검색에서는 동일한 엔티티에서 여러 개의 검색 결과가 반환될 수 있습니다. 그룹화 기능을 사용하면 이러한 요소 검색 결과를 통합하여 각 상위 엔티티가 최대 한 번만 표시되도록 합니다.</p>
<p>이 페이지에서는 <a href="/docs/ko/create-structarray-field.md">‘StructArray 필드 생성’의</a> <code translate="no">tech_articles</code> 컬렉션을 사용합니다. 이 컬렉션에는 <code translate="no">chunks</code> 라는 StructArray 필드가 있습니다. <code translate="no">chunks[emb]</code> 벡터 하위 필드는 일반 벡터 메트릭을 사용하여 요소 수준 검색이 가능하도록 인덱싱되어 있습니다.</p>
<h2 id="How-grouping-applies-to-StructArray" class="common-anchor-header">StructArray에 그룹화가 적용되는 방식<button data-href="#How-grouping-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th>검색 모드</th><th>그룹화 동작</th><th>결과 동작</th></tr>
</thead>
<tbody>
<tr><td>EmbeddingList 검색</td><td>지원되지 않음.</td><td>해당 사항 없음.</td></tr>
<tr><td>요소 수준 검색</td><td>기본 키를 기준으로 그룹화할 경우 지원됩니다.</td><td>상위 엔티티당 최대 하나의 결과를 반환합니다. 요소 수준 메타데이터는 보존되므로, API 또는 SDK를 통해 노출될 때 선택된 요소 인덱스 또는 오프셋을 반환할 수 있습니다.</td></tr>
<tr><td>하이브리드 검색</td><td>모든 하위 검색이 동일한 StructArray 필드 아래의 요소 수준 벡터 필드를 대상으로 하는 경우에만 지원됩니다.</td><td>요소 수준 하위 검색은 최종 결과 처리 전에 기본 키를 기준으로 그룹화됩니다.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>그룹화되지 않은 요소 수준 검색에서 중복된 상위 엔티티가 너무 많이 반환되는 경우 그룹화를 사용하십시오. 일치하는 모든 Struct 요소를 개별 히트로 반환하려면 ` <code translate="no">group_by_field</code>`를 사용하지 않고 <a href="/docs/ko/basic-vector-search-with-structarray.md">StructArray와 함께 기본 벡터 검색을</a> 사용하십시오.</p>
</div>
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
    </button></h2><p>그룹화 검색을 실행하기 전에 컬렉션, 데이터 및 인덱스를 준비하십시오.</p>
<table>
<thead>
<tr><th>요구 사항</th><th>세부 정보</th></tr>
</thead>
<tbody>
<tr><td>요소 수준 벡터 하위 필드</td><td><code translate="no">chunks[emb]</code> 와 같은 StructArray 벡터 하위 필드를 사용하고, 일반 벡터 메트릭으로 인덱싱하십시오.</td></tr>
<tr><td>일반 벡터 쿼리</td><td><code translate="no">EmbeddingList</code> 가 아닌 일반 벡터 쿼리를 사용하십시오.</td></tr>
<tr><td>기본 키 그룹화</td><td>컬렉션의 기본 키를 <code translate="no">group_by_field</code> 형태로 사용하십시오(예: <code translate="no">doc_id</code>).</td></tr>
<tr><td>범위 매개변수 미사용</td><td><code translate="no">radius</code> 또는 <code translate="no">range_filter</code> 와 같은 범위 검색 매개변수와 그룹화 검색을 함께 사용하지 마십시오.</td></tr>
</tbody>
</table>
<p>인덱스 설정에 대해서는 <a href="/docs/ko/index-structarray-fields.md">StructArray 필드 인덱스를</a> 참조하십시오.</p>
<h2 id="Run-grouped-element-level-search" class="common-anchor-header">그룹화된 요소 수준 검색 실행<button data-href="#Run-grouped-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 예제는 먼저 개별 청크를 검색한 다음, 부모 엔티티의 기본 키를 기준으로 요소 검색 결과를 그룹화합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(
            <span class="hljs-string">&quot;doc_id:&quot;</span>, hit[<span class="hljs-string">&quot;id&quot;</span>],
            <span class="hljs-string">&quot;distance:&quot;</span>, hit[<span class="hljs-string">&quot;distance&quot;</span>],
            <span class="hljs-string">&quot;offset:&quot;</span>, hit.get(<span class="hljs-string">&quot;offset&quot;</span>),
            <span class="hljs-string">&quot;entity:&quot;</span>, hit[<span class="hljs-string">&quot;entity&quot;</span>],
        )
<button class="copy-code-btn"></button></code></pre>
<p>그룹화를 하지 않으면, 여러 청크가 쿼리와 일치하는 경우 동일한 <code translate="no">doc_id</code> 가 여러 번 나타날 수 있습니다. <code translate="no">group_by_field=&quot;doc_id&quot;</code> 를 사용하면 각 부모 엔티티가 최대 한 번만 나타납니다. 그룹화는 요소 수준 메타데이터를 보존하므로, API 또는 SDK가 이를 노출하는 경우 그룹화된 결과에도 선택한 Struct 요소 인덱스나 오프셋이 포함될 수 있습니다.</p>
<h2 id="Add-scalar-filters" class="common-anchor-header">스칼라 필터 추가<button data-href="#Add-scalar-filters" class="anchor-icon" translate="no">
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
    </button></h2><p>그룹화 검색을 StructArray 스칼라 필터링과 결합할 수 있습니다. 스칼라 조건이 요소 수준 벡터 검색에 참여할 Struct 요소를 제한해야 할 때는 ` <code translate="no">element_filter</code> `를 사용하십시오.</p>
<pre><code translate="no" class="language-python">filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;element_filter(chunks, &#x27;</span>
    <span class="hljs-string">&#x27;$[section] == &quot;index&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>최상위 술어는 후보 엔티티를 선택합니다. ` <code translate="no">element_filter</code> ` 술어는 요소 수준 벡터 검색을 일치하는 Struct 요소로 제한합니다. 그런 다음 그룹화는 일차 키를 기준으로 일치하는 요소 검색 결과를 통합합니다.</p>
<h2 id="Use-grouping-in-hybrid-search" class="common-anchor-header">하이브리드 검색에서 그룹화 사용<button data-href="#Use-grouping-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray를 사용한 하이브리드 그룹화는 요소 수준 기능입니다. 이 기능은 모든 하위 검색이 동일한 StructArray 필드 하위의 요소 수준 벡터 필드를 대상으로 할 때만 지원됩니다. 그룹화된 StructArray 하이브리드 검색에서는 EmbeddingList 수준 요청을 사용하지 마십시오.</p>
<p>다음 예제는 <code translate="no">chunks</code> StructArray 필드에 <code translate="no">chunks[emb]</code> 및 <code translate="no">chunks[code_emb]</code> 라는 두 개의 요소 수준 벡터 하위 필드가 있으며, 둘 다 일반 벡터 메트릭으로 인덱싱되어 있다고 가정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    group_by_field=<span class="hljs-string">&quot;doc_id&quot;</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>이 예제에서 두 하위 요청 모두 동일한 StructArray 필드인 <code translate="no">chunks</code> 하위의 요소 수준 벡터 필드를 대상으로 합니다. 하이브리드 검색은 일반 벡터 필드, 서로 다른 StructArray 필드 또는 EmbeddingList 수준 요청이 혼합된 경우 요소 수준 그룹화를 지원하지 않습니다.</p>
<h2 id="Interpret-grouped-results" class="common-anchor-header">그룹화된 결과 해석<button data-href="#Interpret-grouped-results" class="anchor-icon" translate="no">
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
<tr><th>결과 항목</th><th>의미</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>그룹화된 상위 엔터티의 기본 키입니다.</td></tr>
<tr><td><code translate="no">distance</code> 또는 점수</td><td>해당 상위 엔티티에 대해 선택된 Struct 요소의 점수 또는 거리.</td></tr>
<tr><td><code translate="no">offset</code></td><td>반환 시 선택된 Struct 요소의 0을 기준으로 한 위치.</td></tr>
<tr><td>반복되는 기본 키</td><td>주키를 기준으로 그룹화할 때는 발생하지 않습니다.</td></tr>
<tr><td><code translate="no">limit</code></td><td>그룹화된 상위 엔티티 결과에 적용됩니다.</td></tr>
</tbody>
</table>
<h2 id="Limitations" class="common-anchor-header">제한 사항<button data-href="#Limitations" class="anchor-icon" translate="no">
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
<li><p>그룹화 검색은 요소 수준 StructArray 벡터 검색에만 적용됩니다. EmbeddingList 검색 및 EmbeddingList 수준 하이브리드 검색은 그룹화 기능을 지원하지 않습니다.</p></li>
<li><p>주키를 ` <code translate="no">group_by_field</code>` 형식으로 사용하십시오. StructArray 요소 수준 그룹화는 임의의 스칼라 필드에 대한 범용 그룹화 기능이 아닙니다.</p></li>
<li><p>그룹화 검색을 범위 검색과 결합하지 마십시오.</p></li>
<li><p>그룹화 검색에는 ` <code translate="no">EmbeddingList</code> ` 쿼리나 ` <code translate="no">MAX_SIM*</code> ` 메트릭을 사용하지 마십시오.</p></li>
<li><p>하이브리드 그룹화는 모든 하위 검색이 동일한 StructArray 필드 아래의 요소 수준 벡터 필드를 대상으로 하는 경우에만 지원됩니다.</p></li>
<li><p>하이브리드 검색이 일반 벡터 필드, 다른 StructArray 필드 또는 EmbeddingList 수준 요청을 혼합하는 경우 하이브리드 그룹화는 지원되지 않습니다.</p></li>
</ul>
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
<li><p><code translate="no">chunks[emb_list_vector]</code> 와 함께 그룹화를 사용하는 경우. 이 기능은 EmbeddingList 검색용으로 설계되었습니다.</p></li>
<li><p>주 키가 아닌 스칼라 필드를 기준으로 그룹화하는 경우.</p></li>
<li><p>여러 필드를 기준으로 그룹화하는 경우. 요소 수준 StructArray 그룹화는 기본 키 그룹화만 지원합니다.</p></li>
<li><p>그룹화된 결과가 일치하는 모든 Struct 요소를 나타낼 것이라고 기대하는 경우. 그룹화는 부모 엔티티당 최대 하나의 결과만 반환합니다.</p></li>
<li><p>그룹화된 요소 수준 검색이 EmbeddingList 스타일의 <code translate="no">MAX_SIM*</code> 점수를 재계산한다고 가정하는 경우. 그룹화는 요소 수준의 일치 결과를 통합할 뿐, 점수 산정 모델을 변경하지 않습니다.</p></li>
<li><p><code translate="no">group_by_field</code> 를 <code translate="no">radius</code> 또는 <code translate="no">range_filter</code> 와 결합하는 경우.</p></li>
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
<li><p>먼저 그룹화되지 않은 요소 수준 검색에 대해 알아보려면 <a href="/docs/ko/basic-vector-search-with-structarray.md">‘StructArray를 사용한 기본 벡터 검색’을</a> 읽어보세요.</p></li>
<li><p>그룹화된 검색에 스칼라 필터를 추가하려면 <a href="/docs/ko/filtered-search-with-structarray.md">‘StructArray를 사용한 필터링 검색’을</a> 참조하십시오.</p></li>
<li><p>그룹화 대신 점수 또는 거리 경계를 사용하려면 <a href="/docs/ko/range-search-with-structarray.md">StructArray를 사용한 범위 검색을</a> 읽어보세요.</p></li>
<li><p>StructArray 검색 제한 사항을 확인하려면 <a href="/docs/ko/structarray-limits.md">‘StructArray 제한 사항’을</a> 참조하십시오.</p></li>
</ol>
