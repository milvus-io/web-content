---
id: range-search-with-structarray.md
title: StructArray를 사용한 범위 검색
summary: >-
  이 페이지를 사용하여 StructArray 벡터 하위 필드에 대해 범위 검색을 실행할 수 있습니다. 범위 검색은 점수나 거리가 지정된 범위
  내에 속하는 벡터 검색 결과를 반환합니다. StructArray 필드의 경우, 각 Struct 요소를 독립적으로 검색하는 요소 수준 벡터
  검색과 함께 범위 검색을 사용하십시오.
---
<h1 id="Range-Search-with-StructArray" class="common-anchor-header">StructArray를 사용한 범위 검색<button data-href="#Range-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지를 사용하여 StructArray 벡터 하위 필드에 대해 범위 검색을 실행할 수 있습니다. 범위 검색은 점수 또는 거리가 지정된 범위 내에 속하는 벡터 일치 결과를 반환합니다. StructArray 필드의 경우, 각 Struct 요소를 독립적으로 검색하는 요소 수준 벡터 검색과 함께 범위 검색을 사용하십시오.</p>
<p>이 페이지에서는 <a href="/docs/ko/create-structarray-field.md">‘StructArray 필드 생성’의</a> <code translate="no">tech_articles</code> 컬렉션을 사용합니다. 이 컬렉션에는 <code translate="no">chunks</code> 라는 StructArray 필드가 있습니다. <code translate="no">chunks[emb]</code> 벡터 하위 필드는 <code translate="no">COSINE</code>, <code translate="no">IP</code> 또는 <code translate="no">L2</code> 와 같은 일반 벡터 메트릭을 사용하여 요소 수준 검색이 가능하도록 인덱싱되어 있습니다.</p>
<h2 id="How-range-search-applies-to-StructArray" class="common-anchor-header">StructArray에 범위 검색이 적용되는 방식<button data-href="#How-range-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th>검색 모드</th><th>범위 검색 동작</th><th>결과 세분화 수준</th></tr>
</thead>
<tbody>
<tr><td>EmbeddingList 검색</td><td>지원되지 않습니다.</td><td>해당 사항 없음.</td></tr>
<tr><td>요소 수준 검색</td><td><code translate="no">radius</code> 및 선택적으로 <code translate="no">range_filter</code> 을 사용하여 일반 벡터 쿼리를 사용하십시오.</td><td>구조체 요소 수준.</td></tr>
<tr><td>하이브리드 검색</td><td>StructArray 요청이 요소 수준 벡터 필드를 대상으로 할 때 지원됩니다. EmbeddingList 수준 요청은 범위 검색을 지원하지 않습니다.</td><td>요소 수준 하위 검색 후 하이브리드 재순위 지정.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>가장 가까운 Struct 요소만 필요한 경우, <a href="/docs/ko/basic-vector-search-with-structarray.md">StructArray를 사용한 기본 벡터 검색으로</a> 시작하십시오. 결과가 상위 K개 순위뿐만 아니라 점수 또는 거리 기준을 충족해야 하는 경우 범위 검색을 사용하십시오.</p>
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
    </button></h2><p>범위 검색을 실행하기 전에 컬렉션, 데이터 및 인덱스를 준비하십시오.</p>
<table>
<thead>
<tr><th>요구 사항</th><th>세부 정보</th></tr>
</thead>
<tbody>
<tr><td>StructArray 필드</td><td>컬렉션에는 <code translate="no">chunks</code> 와 같은 StructArray 필드가 포함되어 있습니다.</td></tr>
<tr><td>요소 수준 벡터 하위 필드</td><td>대상 벡터 하위 필드는 <code translate="no">chunks[emb_list_vector]</code> 가 아니라 <code translate="no">chunks[emb]</code> 입니다.</td></tr>
<tr><td>인덱스 메트릭</td><td>벡터 하위 필드는 <code translate="no">COSINE</code>, <code translate="no">IP</code> 또는 <code translate="no">L2</code> 과 같은 일반 벡터 메트릭으로 인덱싱됩니다.</td></tr>
<tr><td>쿼리 데이터</td><td>쿼리는 <code translate="no">EmbeddingList</code> 가 아닌 일반 벡터입니다.</td></tr>
</tbody>
</table>
<p>인덱스 설정에 대해서는 <a href="/docs/ko/index-structarray-fields.md">StructArray 필드 인덱싱을</a> 참조하십시오.</p>
<h2 id="Use-radius-and-rangefilter" class="common-anchor-header">radius 및 range_filter 사용<button data-href="#Use-radius-and-rangefilter" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">radius</code> 을 설정하여 검색 경계를 정의합니다. 내부 경계도 필요한 경우 <code translate="no">range_filter</code> 을 설정하십시오. 방향은 더 작은 거리가 더 좋은지, 아니면 더 큰 유사도 점수가 더 좋은지에 따라 달라집니다.</p>
<table>
<thead>
<tr><th>메트릭 유형</th><th>점수가 높을수록 좋은가요?</th><th><code translate="no">range_filter</code> 를 사용할 때의 범위 조건</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">L2</code></td><td>아니요. 거리가 더 짧을수록 좋습니다.</td><td><code translate="no">range_filter &lt;= distance &lt; radius</code></td></tr>
<tr><td><code translate="no">IP</code>, <code translate="no">COSINE</code></td><td>네. 점수가 클수록 좋습니다.</td><td><code translate="no">radius &lt; distance &lt;= range_filter</code></td></tr>
</tbody>
</table>
<p><code translate="no">radius</code> 만 설정된 경우, 범위 검색은 해당 메트릭의 외부 경계를 충족하는 히트를 반환합니다. 임베딩의 점수 또는 거리 척도에 따라 값을 선택하십시오.</p>
<h2 id="Run-element-level-range-search" class="common-anchor-header">요소 수준 범위 검색 실행<button data-href="#Run-element-level-range-search" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 예제는 <code translate="no">chunks[emb]</code> 벡터가 쿼리 벡터와 충분히 유사한 개별 청크를 검색합니다. 각 검색 결과는 일치하는 Struct 요소를 나타냅니다.</p>
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
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
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
<p>이 예제에서 <code translate="no">COSINE</code> 는 유사도 방식의 메트릭이므로, 결과 범위는 <code translate="no">radius</code> 보다 크고 <code translate="no">range_filter</code> 이하입니다. <code translate="no">offset</code> 값은 결과가 반환될 때 <code translate="no">chunks</code> 배열 내에서 일치하는 Struct 요소를 식별합니다.</p>
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
    </button></h2><p>요소 수준 범위 검색을 StructArray 스칼라 필터링과 결합할 수 있습니다. 상위 엔티티 필드에는 최상위 술어를 사용하고, <code translate="no">element_filter</code> 를 사용하여 벡터 범위 검색에 포함될 Struct 요소를 제한합니다.</p>
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
    search_params={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    <span class="hljs-built_in">filter</span>=filter_expr,
    limit=<span class="hljs-number">10</span>,
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
<p>최상위 술어는 후보 엔티티를 선택합니다. ` <code translate="no">element_filter</code> ` 술어는 벡터 범위 검색을 일치하는 Struct 요소로만 제한합니다. 더 많은 필터링 예제는 <a href="/docs/ko/filtered-search-with-structarray.md">‘StructArray를 사용한 필터링 검색’을</a> 참조하십시오.</p>
<h2 id="Use-range-search-in-hybrid-search" class="common-anchor-header">하이브리드 검색에서 범위 검색 사용<button data-href="#Use-range-search-in-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 요소 수준 벡터 필드는 하이브리드 검색에서 범위 검색을 지원합니다. StructArray 요소 수준 벡터 필드를 대상으로 하는 <code translate="no">AnnSearchRequest</code> 에 ` <code translate="no">radius</code> ` 및 선택적으로 ` <code translate="no">range_filter</code> `를 추가하십시오.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> AnnSearchRequest, RRFRanker

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=<span class="hljs-number">10</span>,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.80</span>,
            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.95</span>,
        },
    },
    limit=<span class="hljs-number">10</span>,
    expr=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    limit=<span class="hljs-number">5</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
        <span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>이 예제에서는 <code translate="no">chunks[emb]</code> 하위 요청만 범위 검색 매개변수를 사용합니다. StructArray 요청은 여전히 요소 수준 의미론을 따릅니다. 즉, 범위 경계는 하이브리드 검색이 결과를 결합하고 재순위를 매기기 전에 Struct 요소 일치 항목에 적용됩니다.</p>
<h2 id="Interpret-range-results" class="common-anchor-header">범위 결과 해석<button data-href="#Interpret-range-results" class="anchor-icon" translate="no">
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
<tr><td><code translate="no">id</code></td><td>일치하는 Struct 요소를 포함하는 엔티티의 기본 키입니다.</td></tr>
<tr><td><code translate="no">distance</code> 또는 점수</td><td>쿼리 벡터와 일치하는 Struct 요소 벡터 간의 점수 또는 거리입니다.</td></tr>
<tr><td><code translate="no">offset</code></td><td>반환 시 StructArray 필드에서 일치하는 Struct 요소의 0을 기준으로 한 위치.</td></tr>
<tr><td>중복된 기본 키</td><td>가능합니다. 동일한 엔티티 내의 두 개 이상의 Struct 요소가 지정된 범위에 포함될 수 있습니다.</td></tr>
<tr><td><code translate="no">limit</code></td><td>이는 고유한 상위 엔티티가 아닌 요소 일치에 적용됩니다.</td></tr>
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
<li><p>StructArray 벡터 하위 필드에 대한 범위 검색에는 <code translate="no">EmbeddingList</code> 쿼리나 <code translate="no">MAX_SIM*</code> 메트릭을 사용하지 마십시오. EmbeddingList 수준 검색은 범위 검색을 지원하지 않습니다.</p></li>
<li><p>범위 검색을 그룹화 검색과 결합하지 마십시오. 부모 엔티티당 하나의 결과가 필요한 경우, 범위 매개변수 없이 요소 수준 검색을 실행하고 지원되는 경우 그룹화를 사용하십시오.</p></li>
<li><p>StructArray 요소 수준 벡터 필드에 대해서는 하이브리드 범위 검색이 지원됩니다. EmbeddingList 수준 StructArray 요청의 경우 지원되지 않습니다.</p></li>
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
<li><p><code translate="no">chunks[emb_list_vector]</code> 에 대해 범위 검색을 실행하는 경우. 이 메트릭은 EmbeddingList 검색용으로 설계되었습니다.</p></li>
<li><p>요소 수준 범위 검색에 <code translate="no">COSINE</code> 와 같은 일반 메트릭 대신 <code translate="no">MAX_SIM_COSINE</code> 를 사용하는 경우.</p></li>
<li><p>일반 벡터 쿼리 대신 <code translate="no">EmbeddingList</code> 쿼리를 사용하는 경우.</p></li>
<li><p>범위 검색 결과가 부모 엔티티별로 고유할 것이라고 가정하는 경우. 범위 검색은 일치하는 Struct 요소 히트를 반환합니다.</p></li>
<li><p>필수 하위 필드 경로 구문인 <code translate="no">chunks[emb]</code> 대신 <code translate="no">chunks.emb</code> 을 사용하는 경우.</p></li>
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
<li><p>두 가지 기본 StructArray 벡터 검색 모드를 알아보려면 <a href="/docs/ko/basic-vector-search-with-structarray.md">‘StructArray를 사용한 기본 벡터 검색’을</a> 참조하십시오.</p></li>
<li><p>범위 검색에 스칼라 필터를 추가하려면 <a href="/docs/ko/filtered-search-with-structarray.md">‘StructArray를 사용한 필터링 검색’을</a> 참조하십시오.</p></li>
<li><p>지원되는 경우 상위 엔티티당 최대 하나의 결과만 반환하려면 <a href="/docs/ko/grouping-search-with-structarray.md">StructArray를 사용한 그룹화 검색을</a> 참조하십시오.</p></li>
<li><p>버전별 검색 제한 사항을 확인하려면 <a href="/docs/ko/structarray-limits.md">StructArray 제한 사항을</a> 참조하십시오.</p></li>
</ol>
