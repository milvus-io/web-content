---
id: filtered-search-with-structarray.md
title: StructArray를 사용한 필터링 검색
summary: >-
  이 페이지를 사용하여 StructArray 필드에 대한 벡터 검색에 스칼라 필터링을 추가할 수 있습니다. StructArray 필터링에는 두
  가지 수준이 있습니다. 행 수준 필터는 상위 엔티티를 선택하고, 요소 수준 필터는 요소 수준 벡터 검색에 포함될 Struct 요소를
  제한합니다.
---
<h1 id="Filtered-Search-with-StructArray" class="common-anchor-header">StructArray를 사용한 필터링 검색<button data-href="#Filtered-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지를 사용하여 StructArray 필드에 대한 벡터 검색에 스칼라 필터링을 추가할 수 있습니다. StructArray 필터링에는 두 가지 수준이 있습니다. 행 수준 필터는 상위 엔티티를 선택하고, 요소 수준 필터는 요소 수준 벡터 검색에 포함될 Struct 요소를 제한합니다.</p>
<p>이 페이지에서는 <a href="/docs/ko/create-structarray-field.md">‘StructArray 필드 생성’의</a> <code translate="no">tech_articles</code> 컬렉션을 사용합니다. 이 컬렉션에는 <code translate="no">chunks</code> 라는 StructArray 필드가 있으며, <code translate="no">section</code>, <code translate="no">page</code>, <code translate="no">quality_score</code>, <code translate="no">has_code</code> 와 같은 스칼라 하위 필드와 검색용 벡터 하위 필드가 포함되어 있습니다.</p>
<h2 id="Choose-a-filter-type" class="common-anchor-header">필터 유형 선택<button data-href="#Choose-a-filter-type" class="anchor-icon" translate="no">
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
<tr><th>목표</th><th>사용</th><th>결과 동작</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">category</code> 와 같은 최상위 스칼라 필드를 기준으로 필터링합니다.</td><td>일반 필터 표현식.</td><td>검색 전이나 검색 중에 상위 엔티티를 선택합니다.</td></tr>
<tr><td>요소 수준 벡터 검색을 스칼라 조건에 일치하는 Struct 요소로 제한합니다.</td><td><code translate="no">element_filter</code>.</td><td>일치하는 Struct 요소만 검색하며, 일치하는 요소의 오프셋을 반환할 수 있습니다.</td></tr>
<tr><td>Struct 요소 중 일부, 전체 또는 특정 개수가 술어와 일치하는지 여부에 따라 엔티티를 선택합니다.</td><td><code translate="no">MATCH_ANY</code>, <code translate="no">MATCH_ALL</code>, <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> 또는 <code translate="no">MATCH_EXACT</code>.</td><td>행 수준 필터링. 이 연산자들은 자체적으로 오프셋을 반환하지 않습니다.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>이 페이지에서는 검색 워크플로우에서 StructArray 필터를 사용하는 방법을 설명합니다. 전체 구문 규칙, 지원되는 술어 유형 및 지원되지 않는 술어 행렬에 대해서는 <a href="/docs/ko/struct-array-operators.md">StructArray 연산자를</a> 참조하십시오.</p>
</div>
<h2 id="Filter-by-top-level-fields" class="common-anchor-header">최상위 필드별 필터링<button data-href="#Filter-by-top-level-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>조건이 개별 Struct 요소가 아닌 상위 엔티티에 속하는 경우 일반 필터 표현식을 사용합니다. 이는 EmbeddingList 검색과 요소 수준 검색 모두에서 작동합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient
<span class="hljs-keyword">from</span> pymilvus.client.embedding_list <span class="hljs-keyword">import</span> EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query = EmbeddingList()
query.add([<span class="hljs-number">0.12</span>, <span class="hljs-number">0.21</span>, <span class="hljs-number">0.32</span>, <span class="hljs-number">0.44</span>])
query.add([<span class="hljs-number">0.18</span>, <span class="hljs-number">0.23</span>, <span class="hljs-number">0.29</span>, <span class="hljs-number">0.36</span>])

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>위의 필터는 최상위 ` <code translate="no">category</code> ` 필드가 ` <code translate="no">&quot;search&quot;</code>`인 엔티티만 선택합니다. 이 필터는 일치하는 단일 Struct 요소를 식별하지 않습니다.</p>
<h2 id="Filter-element-level-vector-search" class="common-anchor-header">요소 수준 벡터 검색 필터링<button data-href="#Filter-element-level-vector-search" class="anchor-icon" translate="no">
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
    </button></h2><p>스칼라 조건이 요소 수준 벡터 검색에 참여하는 동일한 Struct 요소에 적용되어야 할 때는 ` <code translate="no">element_filter(structArrayField, predicate)</code> `를 사용하십시오. 술어 내부에서는 ` <code translate="no">$[subfield]</code> `를 사용하여 현재 Struct 요소의 스칼라 하위 필드를 참조하십시오.</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;element_filter(chunks, &#x27;</span>
    <span class="hljs-string">&#x27;$[section] == &quot;index&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[quality_score] &gt; 0.9 &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;$[has_code] == true)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[page]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
        <span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
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
<p>이 예제에서 최상위 술어 <code translate="no">category == &quot;search&quot;</code> 는 후보 엔티티를 선택하고, <code translate="no">element_filter</code> 는 <code translate="no">section</code>, <code translate="no">quality_score</code> 및 <code translate="no">has_code</code> 가 모두 동일한 Struct 요소 내에서 일치하는 청크로 요소 수준 벡터 검색을 제한합니다.</p>
<div class="alert note">
<p>경고</p>
<p>최상위 술어와 <code translate="no">element_filter</code> 를 결합할 때는 <code translate="no">element_filter</code> 를 식의 맨 끝에 배치해야 합니다. 필터 식에는 <code translate="no">element_filter</code> 가 하나만 포함될 수 있으며, <code translate="no">element_filter</code> 나 <code translate="no">MATCH_*</code> 를 다른 StructArray 연산자 안에 중첩할 수 없습니다.</p>
</div>
<h2 id="Filter-entities-with-MATCH-operators" class="common-anchor-header">MATCH 연산자를 사용한 엔티티 필터링<button data-href="#Filter-entities-with-MATCH-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>필터가 부모 엔티티가 Struct 요소를 기준으로 자격 요건을 충족하는지 여부를 결정해야 할 때는 <code translate="no">MATCH_*</code> 연산자를 사용합니다. 이 연산자들은 행 수준 필터로, 엔티티를 선택하지만 자체적으로는 요소 오프셋을 반환하지 않습니다.</p>
<table>
<thead>
<tr><th>연산자</th><th>다음과 같은 경우에 사용합니다</th><th>예시</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">MATCH_ANY</code></td><td>적어도 하나의 Struct 요소가 술어를 만족해야 합니다.</td><td><code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code></td></tr>
<tr><td><code translate="no">MATCH_ALL</code></td><td>모든 Struct 요소가 술어를 만족해야 합니다.</td><td><code translate="no">MATCH_ALL(chunks, $[quality_score] &gt; 0.5)</code></td></tr>
<tr><td><code translate="no">MATCH_LEAST</code></td><td><code translate="no">N</code> 개 이상의 Struct 요소가 술어를 만족해야 합니다.</td><td><code translate="no">MATCH_LEAST(chunks, $[has_code] == true, threshold=2)</code></td></tr>
<tr><td><code translate="no">MATCH_MOST</code></td><td><code translate="no">N</code> 개 이하의 Struct 요소가 술어를 만족해야 합니다.</td><td><code translate="no">MATCH_MOST(chunks, $[section] == &quot;appendix&quot;, threshold=1)</code></td></tr>
<tr><td><code translate="no">MATCH_EXACT</code></td><td>정확히 <code translate="no">N</code> 개의 Struct 요소가 술어를 만족해야 합니다.</td><td><code translate="no">MATCH_EXACT(chunks, $[section] == &quot;summary&quot;, threshold=1)</code></td></tr>
</tbody>
</table>
<pre><code translate="no" class="language-python">filter_expr = (
    <span class="hljs-string">&#x27;category == &quot;search&quot; &amp;&amp; &#x27;</span>
    <span class="hljs-string">&#x27;MATCH_ANY(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>
)

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">3</span>,
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
<p>EmbeddingList 검색 결과는 엔티티 수준이므로 여기에서는 ` <code translate="no">MATCH_ANY</code> `를 사용합니다. 이 필터는 엔티티 내의 청크 중 적어도 하나가 고품질의 ` <code translate="no">&quot;index&quot;</code> ` 청크여야 하지만, 검색 결과 자체는 여전히 상위 엔티티를 나타냅니다.</p>
<h2 id="Use-filters-in-hybrid-search" class="common-anchor-header">하이브리드 검색에서 필터 사용<button data-href="#Use-filters-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>하이브리드 검색에서는 조건이 적용되어야 하는 위치에 StructArray 필터를 적용하십시오. 최상위 필터는 전체 하이브리드 검색에서 공유될 수 있습니다. <code translate="no">element_filter</code> 는 요소 수준 제약 조건이 필요한 StructArray 요소 수준 요청에 첨부되어야 합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot; &amp;&amp; $[quality_score] &gt; 0.9)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;category == &quot;search&quot;&#x27;</span>,
    limit=<span class="hljs-number">5</span>,
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
<p><code translate="no">filter</code> 인수는 최상위 엔티티 조건을 적용하는 반면, <code translate="no">chunk_req</code> 에 대한 <code translate="no">expr</code> 는 StructArray 요소 수준 벡터 요청에만 제약 조건을 적용합니다. 지원되는 하이브리드 검색 조합 및 버전별 제한 사항에 대해서는 <a href="/docs/ko/hybrid-search-with-structarray.md">‘StructArray를 사용한 하이브리드 검색’</a> 및 <a href="/docs/ko/structarray-limits.md">‘StructArray 제한 사항’을</a> 참조하십시오.</p>
<h2 id="Predicate-support-summary" class="common-anchor-header">술어 지원 요약<button data-href="#Predicate-support-summary" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 술어에서 스칼라 하위 필드를 사용하십시오. 벡터 하위 필드는 스칼라 술어 입력으로 사용할 수 없습니다.</p>
<table>
<thead>
<tr><th>서브필드 유형</th><th>일반적인 술어 예시</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">$[has_code] == true</code>, <code translate="no">!($[has_code] == true)</code></td></tr>
<tr><td>정수형</td><td><code translate="no">$[page] &gt;= 2</code>, <code translate="no">$[page] in [1, 2, 3]</code></td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">$[quality_score] &gt; 0.9</code>, <code translate="no">0.7 &lt; $[quality_score] &lt; 0.95</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">$[section] == &quot;index&quot;</code>, <code translate="no">$[text] like &quot;range%&quot;</code></td></tr>
<tr><td>벡터 하위 필드</td><td><code translate="no">$[...]</code> 의 스칼라 술어 입력으로는 지원되지 않습니다. 대신 벡터 검색을 통해 벡터 하위 필드를 사용하십시오.</td></tr>
</tbody>
</table>
<p>JSON 경로, 배열 컨테이너 함수, 텍스트 일치 함수, ` <code translate="no">$[...]</code>`에 대한 null 술어, 기하 함수, `Timestamptz` 표현식 및 제네릭 함수 호출과 같이 지원되지 않는 사례에 대해서는 <a href="/docs/ko/struct-array-operators.md">StructArray 연산자를</a> 참조하십시오.</p>
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
<li><p><code translate="no">element_filter</code> 나 <code translate="no">MATCH_*</code> 외부에서 <code translate="no">$[subfield]</code> 를 사용하는 경우.</p></li>
<li><p><code translate="no">element_filter(chunks, $[section] == &quot;index&quot;)</code> 와 같은 StructArray 연산자 구문 대신 <code translate="no">chunks.section</code> 를 사용하는 경우.</p></li>
<li><p>행 수준 필터링만 필요한 경우 <code translate="no">element_filter</code> 를 사용하는 경우. 엔티티를 선택하기만 하면 되는 경우에는 대신 <code translate="no">MATCH_ANY</code> 를 사용하십시오.</p></li>
<li><p><code translate="no">MATCH_*</code> 가 요소 오프셋을 반환할 것이라고 기대하지 마십시오. 이 연산자들은 엔티티를 선택할 뿐, 그 자체로는 일치하는 단일 요소를 식별하지 않습니다.</p></li>
<li><p><code translate="no">$[has_code]</code> 와 같은 단순한 부울 술어를 작성하는 경우. <code translate="no">$[has_code] == true</code> 와 같은 명시적인 비교 연산자를 사용하십시오.</p></li>
<li><p>동일한 필터 표현식 내에서 최상위 술어 앞에 <code translate="no">element_filter</code> 를 배치하는 경우.</p></li>
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
<li><p>StructArray 필터 구문의 전체 내용을 확인하려면 <a href="/docs/ko/struct-array-operators.md">StructArray 연산자를</a> 참조하십시오.</p></li>
<li><p>먼저 필터링되지 않은 벡터 검색을 실행하려면 <a href="/docs/ko/basic-vector-search-with-structarray.md">StructArray를 사용한 기본 벡터 검색을</a> 참조하십시오.</p></li>
<li><p>자주 사용하는 StructArray 필터에 대한 스칼라 인덱스를 생성하려면 <a href="/docs/ko/index-structarray-fields.md">StructArray 필드 인덱싱을</a> 참조하십시오.</p></li>
<li><p>버전별 필터 및 검색 제한 사항을 확인하려면 <a href="/docs/ko/structarray-limits.md">‘StructArray 제한 사항’을</a> 참조하십시오.</p></li>
</ol>
