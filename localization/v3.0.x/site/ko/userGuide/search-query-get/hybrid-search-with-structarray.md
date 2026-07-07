---
id: hybrid-search-with-structarray.md
title: StructArray를 활용한 하이브리드 검색
summary: >-
  이 페이지를 사용하여 StructArray 벡터 검색을 다른 벡터 검색과 결합하여 하나의 하이브리드 검색 요청으로 수행할 수 있습니다.
  StructArray 하이브리드 검색은 결합하는 AnnSearchRequest 객체에 따라 엔티티 수준 결과 또는 요소 수준 결과를 반환할
  수 있습니다.
---
<h1 id="Hybrid-Search-with-StructArray" class="common-anchor-header">StructArray를 활용한 하이브리드 검색<button data-href="#Hybrid-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지를 사용하여 StructArray 벡터 검색을 다른 벡터 검색과 결합하여 하나의 하이브리드 검색 요청으로 수행할 수 있습니다. StructArray 하이브리드 검색은 결합하는 <code translate="no">AnnSearchRequest</code> 객체에 따라 엔티티 수준 결과 또는 요소 수준 결과를 반환할 수 있습니다.</p>
<p>이 페이지에서는 <a href="/docs/ko/create-structarray-field.md">‘StructArray 필드 생성’의</a> <code translate="no">tech_articles</code> 컬렉션을 사용합니다. 이 컬렉션에는 <code translate="no">title_vector</code> 라는 최상위 벡터 필드와 <code translate="no">chunks</code> 라는 StructArray 필드가 있습니다. <code translate="no">chunks[emb_list_vector]</code> 하위 필드는 EmbeddingList 검색을 위해 색인화되어 있으며, <code translate="no">chunks[emb]</code> 는 요소 수준 검색을 위해 색인화되어 있습니다.</p>
<h2 id="How-hybrid-search-applies-to-StructArray" class="common-anchor-header">StructArray에 하이브리드 검색이 적용되는 방식<button data-href="#How-hybrid-search-applies-to-StructArray" class="anchor-icon" translate="no">
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
<tr><th><code translate="no">AnnSearchRequest</code> 조합</th><th>최종 후보 범위</th><th>결과 동작</th><th><code translate="no">element_scope</code></th></tr>
</thead>
<tbody>
<tr><td>컬렉션 수준 벡터 필드 + StructArray EmbeddingList 하위 필드</td><td>엔티티 수준</td><td>최종 후보는 기본 키를 기준으로 정렬됩니다.</td><td>사용하지 마십시오.</td></tr>
<tr><td>컬렉션 수준 벡터 필드 + StructArray 요소 수준 하위 필드</td><td>엔티티 수준</td><td>요소 수준 일치 항목은 하이브리드 재순위 지정 전에 엔티티 수준 후보로 통합됩니다.</td><td>StructArray 요소 수준 <code translate="no">AnnSearchRequest</code> 의 선택적 축소 구성.</td></tr>
<tr><td>동일한 StructArray 필드 아래에 있는 여러 요소 수준 하위 필드</td><td>요소 수준</td><td>최종 후보는 기본 키와 Struct 요소 오프셋을 조합하여 키로 지정됩니다.</td><td>사용하지 마십시오.</td></tr>
<tr><td>서로 다른 StructArray 필드 아래에 있는 요소 수준 하위 필드</td><td>엔티티 수준</td><td>요소 오프셋은 식별자를 공유하지 않으므로, 재순위 지정 전에 각 StructArray 요소 수준 <code translate="no">AnnSearchRequest</code> 이 접힙니다.</td><td>각 StructArray 요소 수준 <code translate="no">AnnSearchRequest</code> 에 대한 선택적 축소 구성.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>경고</p>
<p><code translate="no">element_scope</code> 는 동일한 구조가 아닌 요소 수준 하이브리드 검색에서 StructArray 요소 수준 <code translate="no">AnnSearchRequest</code> 객체에 대한 축소 구성을 설정할 때만 사용하십시오. EmbeddingList 요청, 컬렉션 수준 벡터 요청 또는 동일한 StructArray 요소 수준 하이브리드 검색에는 사용하지 마십시오.</p>
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
    </button></h2><p>하이브리드 검색을 실행하기 전에 컬렉션, 데이터 및 인덱스를 준비하십시오.</p>
<table>
<thead>
<tr><th>필수 조건</th><th>세부 정보</th></tr>
</thead>
<tbody>
<tr><td>StructArray 필드</td><td>컬렉션에 <code translate="no">chunks</code> 와 같은 StructArray 필드가 포함되어 있습니다.</td></tr>
<tr><td>벡터 하위 필드</td><td>EmbeddingList 검색과 요소 수준 검색에는 별도의 벡터 하위 필드를 사용하십시오.</td></tr>
<tr><td>인덱스</td><td><code translate="no">chunks[emb_list_vector]</code> <code translate="no">MAX_SIM*</code> 메트릭을 사용합니다. 는 , 또는 와 같은 일반 벡터 메트릭을 사용합니다. <code translate="no">chunks[emb]</code> <code translate="no">COSINE</code> <code translate="no">IP</code> <code translate="no">L2</code></td></tr>
<tr><td>재순위 지정기</td><td><code translate="no">RRFRanker</code> 와 같은 하이브리드 재순위 지정기나 애플리케이션에서 지원하는 다른 재순위 지정기를 선택하십시오.</td></tr>
</tbody>
</table>
<p>인덱스 설정에 대해서는 <a href="/docs/ko/index-structarray-fields.md">인덱스 StructArray 필드를</a> 참조하십시오.</p>
<h2 id="Run-hybrid-search-with-an-EmbeddingList-request" class="common-anchor-header">EmbeddingList 요청을 사용하여 하이브리드 검색 실행<button data-href="#Run-hybrid-search-with-an-EmbeddingList-request" class="anchor-icon" translate="no">
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
    </button></h2><p>하이브리드 검색에서 StructArray 벡터 하위 필드에 대한 EmbeddingList 검색은 엔티티 수준입니다. 이 검색은 엔티티 수준 벡터 검색 요청과 유사하게 작동하며, 일치하는 단일 Struct 요소 오프셋을 반환하지 않습니다.</p>
<pre><code translate="no">from pymilvus import AnnSearchRequest, MilvusClient, RRFRanker
from pymilvus.client.embedding_list import EmbeddingList

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

query_vector = [0.19, 0.24, 0.30, 0.37]

query_list = EmbeddingList()
query_list.add([0.12, 0.21, 0.32, 0.44])
query_list.add([0.18, 0.23, 0.29, 0.36])

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    limit=10,
)

chunk_list_req = AnnSearchRequest(
    data=[query_list],
    anns_field=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    limit=10,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_list_req],
    ranker=RRFRanker(),
    limit=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)
<button class="copy-code-btn"></button></code></pre>
<p>이 예제에서 두 <code translate="no">AnnSearchRequest</code> 객체 모두 엔티티 수준 후보를 생성합니다. 최종 결과는 상위 엔티티의 기본 키를 키로 사용합니다. EmbeddingList 요청에 <code translate="no">element_scope</code> 를 추가하지 마십시오.</p>
<h2 id="Run-same-StructArray-element-level-hybrid-search" class="common-anchor-header">동일한 StructArray에 대한 요소 수준 하이브리드 검색 실행<button data-href="#Run-same-StructArray-element-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>모든 <code translate="no">AnnSearchRequest</code> 객체가 동일한 StructArray 필드 하위의 요소 수준 벡터 하위 필드를 대상으로 하는 경우, 하이브리드 검색은 재순위를 통해 요소 수준 후보를 유지할 수 있습니다. 이는 최종 결과가 요소 수준으로 유지되는 유일한 StructArray 하이브리드 모드입니다.</p>
<p>다음 예제는 <code translate="no">chunks</code> StructArray 필드에 <code translate="no">chunks[emb]</code> 와 <code translate="no">chunks[code_emb]</code> 라는 두 개의 요소 수준 벡터 하위 필드가 있으며, 둘 다 일반 벡터 메트릭을 사용한다고 가정합니다.</p>
<pre><code translate="no">index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[section] == &quot;index&quot;)&#x27;</span>,
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[code_emb]&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[has_code] == true)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
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
<p>두 <code translate="no">AnnSearchRequest</code> 객체 모두 <code translate="no">chunks</code> 아래의 벡터 하위 필드를 검색합니다. 동일한 0을 기준으로 하는 오프셋은 동일한 Struct 요소를 가리키므로, 하이브리드 재순위 지정기는 요소 후보를 직접 순위 지정할 수 있습니다. 이 모드에서는 엔티티 수준 병합이 수행되지 않으므로 <code translate="no">element_scope</code> 을 설정하지 마십시오.</p>
<h2 id="Collapse-element-level-hits-for-entity-level-hybrid-search" class="common-anchor-header">엔티티 수준 하이브리드 검색을 위한 요소 수준 일치 결과 통합<button data-href="#Collapse-element-level-hits-for-entity-level-hybrid-search" class="anchor-icon" translate="no">
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
    </button></h2><p>하이브리드 검색에서 StructArray 요소 수준의 <code translate="no">AnnSearchRequest</code> 가 컬렉션 수준의 벡터 요청, EmbeddingList 요청 또는 다른 StructArray 필드 하위의 요소 수준 요청과 혼합되는 경우, 최종 후보 범위는 엔티티 수준이 됩니다. 이 경우, 각 StructArray 요소 수준의 <code translate="no">AnnSearchRequest</code> 는 하이브리드 재순위 지정 전에 엔티티 수준 후보로 통합됩니다.</p>
<p>동일한 엔티티에서 일치된 여러 요소가 어떻게 병합되는지 제어해야 할 때는 StructArray 요소 수준 <code translate="no">AnnSearchRequest</code> 의 <code translate="no">params</code> 내부에서 <code translate="no">element_scope</code> 를 사용하십시오.</p>
<pre><code translate="no">title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;title_vector&quot;</span>,
    <span class="hljs-built_in">limit</span>=10,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    param={
        <span class="hljs-string">&quot;params&quot;</span>: {
            <span class="hljs-string">&quot;element_scope&quot;</span>: {
                <span class="hljs-string">&quot;collapse&quot;</span>: {
                    <span class="hljs-string">&quot;strategy&quot;</span>: <span class="hljs-string">&quot;topk_sum&quot;</span>,
                    <span class="hljs-string">&quot;topk&quot;</span>: 3,
                },
            },
        },
    },
    <span class="hljs-built_in">limit</span>=30,
    <span class="hljs-built_in">expr</span>=<span class="hljs-string">&#x27;element_filter(chunks, $[quality_score] &gt; 0.8)&#x27;</span>,
)

results = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    <span class="hljs-built_in">limit</span>=5,
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
<p>이 예제에서 ` <code translate="no">title_req</code> `는 엔티티 수준이므로, 최종 하이브리드 결과도 엔티티 수준이 됩니다. ` <code translate="no">chunk_req</code> ` 요청은 먼저 ` <code translate="no">chunks[emb]</code>`에서 요소 히트를 반환한 다음, 동일한 엔티티에서 반환된 요소들을 합산하여 상위 3개 요소 점수를 구함으로써 해당 요소들을 통합합니다. 엔티티 수준 통합이 필요한 경우 ` <code translate="no">element_scope</code> `를 생략하면, 통합 전략은 기본적으로 ` <code translate="no">max</code>`로 설정됩니다.</p>
<h2 id="Choose-a-collapse-strategy" class="common-anchor-header">합치기 전략 선택<button data-href="#Choose-a-collapse-strategy" class="anchor-icon" translate="no">
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
<tr><th>전략</th><th>동작</th><th><code translate="no">topk</code></th><th>지표 요구 사항</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max</code></td><td>엔티티에 대해 반환된 요소 중 가장 높은 점수를 유지합니다.</td><td>허용되지 않음.</td><td>지원되는 모든 정규 벡터 메트릭.</td></tr>
<tr><td><code translate="no">sum</code></td><td>엔티티에 대해 반환된 모든 요소 점수를 합산합니다.</td><td>허용되지 않음.</td><td><code translate="no">IP</code> 이나 <code translate="no">COSINE</code> 과 같이 양의 상관관계를 갖는 메트릭만 허용됩니다.</td></tr>
<tr><td><code translate="no">avg</code></td><td>엔티티에 대해 반환된 모든 요소 점수의 평균을 구합니다.</td><td>허용되지 않습니다.</td><td>지원되는 모든 정규 벡터 메트릭.</td></tr>
<tr><td><code translate="no">topk_sum</code></td><td>엔티티에 대해 반환된 요소 점수 중 가장 높은 <code translate="no">K</code> 점수들을 합산합니다.</td><td>필수이며, 양수여야 합니다.</td><td><code translate="no">IP</code> 이나 <code translate="no">COSINE</code> 과 같이 양의 상관관계를 갖는 메트릭만 사용할 수 있습니다.</td></tr>
<tr><td><code translate="no">topk_avg</code></td><td>엔티티에 대해 반환된 요소 점수 중 가장 높은 점수 <code translate="no">K</code> 의 평균을 구합니다.</td><td>필수이며 양수여야 합니다.</td><td>지원되는 모든 정규 벡터 메트릭.</td></tr>
</tbody>
</table>
<p>Collapse는 해당 StructArray 요소 수준 <code translate="no">AnnSearchRequest</code> 에 의해 반환된 요소 히트만 사용합니다. ANN 검색 후 엔티티의 모든 Struct 요소를 스캔하지는 않습니다. Collapse에 사용할 요소를 확보할 수 있도록 요청 <code translate="no">limit</code> 를 충분히 높게 설정하십시오.</p>
<h2 id="Add-filters-range-search-and-grouping" class="common-anchor-header">필터, 범위 검색 및 그룹화 추가<button data-href="#Add-filters-range-search-and-grouping" class="anchor-icon" translate="no">
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
    </button></h2><p>벡터 검색에 참여하는 동일한 Struct 요소에 스칼라 조건이 적용되어야 하는 경우, StructArray 요소 수준 <code translate="no">AnnSearchRequest</code> 에 <code translate="no">element_filter</code> 를 연결할 수 있습니다. 또한 상위 엔티티 조건의 경우 <code translate="no">hybrid_search()</code> 에 최상위 <code translate="no">filter</code> 를 사용할 수도 있습니다.</p>
<p>StructArray 요소 수준 벡터 필드는 하이브리드 검색에서 범위 검색을 지원합니다. 요소 수준 <code translate="no">AnnSearchRequest</code> 에 <code translate="no">radius</code> 및 선택적으로 <code translate="no">range_filter</code> 를 추가하십시오. EmbeddingList 수준 StructArray 요청은 범위 검색을 지원하지 않습니다.</p>
<p>요소 수준 하이브리드 그룹화는 모든 <code translate="no">AnnSearchRequest</code> 객체가 동일한 StructArray 필드 하위의 요소 수준 벡터 필드를 대상으로 할 때만 지원되며, <code translate="no">group_by_field</code> 는 기본 키여야 합니다. 요청에 컬렉션 수준 벡터 필드, 서로 다른 StructArray 필드 또는 EmbeddingList 수준 요청이 혼합된 경우에는 하이브리드 그룹화가 지원되지 않습니다. 범위 검색과 그룹화를 함께 사용하지 마십시오.</p>
<h2 id="Interpret-hybrid-results" class="common-anchor-header">하이브리드 결과 해석<button data-href="#Interpret-hybrid-results" class="anchor-icon" translate="no">
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
<tr><th>최종 후보 범위</th><th>결과 키</th><th>오프셋 동작</th><th>발생 시점</th></tr>
</thead>
<tbody>
<tr><td>엔티티 수준</td><td>기본 키.</td><td>최종 결과에 요소 오프셋이 없습니다.</td><td>하이브리드 요청에는 컬렉션 수준의 벡터 필드, EmbeddingList 요청 또는 서로 다른 StructArray 필드 아래의 요소 수준 요청이 포함됩니다.</td></tr>
<tr><td>요소 수준</td><td>기본 키와 상위 StructArray 필드, 그리고 요소 오프셋.</td><td>선택된 요소 오프셋은 API 또는 SDK를 통해 노출될 때 반환될 수 있습니다.</td><td>모든 <code translate="no">AnnSearchRequest</code> 객체는 요소 수준이며 동일한 StructArray 필드 아래에 있습니다.</td></tr>
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
<li><p><code translate="no">element_scope</code> 는 하이브리드 검색에서 엔티티 수준 후보로 축소되어야 하는 StructArray 요소 수준 <code translate="no">AnnSearchRequest</code> 객체에만 사용하십시오.</p></li>
<li><p>EmbeddingList 요청, 컬렉션 수준 벡터 요청 또는 동일한 StructArray 요소 수준의 하이브리드 검색에는 <code translate="no">element_scope</code> 를 사용하지 마십시오.</p></li>
<li><p><code translate="no">sum</code> <code translate="no">topk_sum</code> 축소 전략은 또는 과 같은 양의 상관 관계 메트릭을 필요로 합니다. 와 함께 사용해서는 안 됩니다. <code translate="no">IP</code> <code translate="no">COSINE</code> <code translate="no">L2</code></p></li>
<li><p><code translate="no">topk_sum</code> 또한 <code translate="no">topk_avg</code> 는 양의 <code translate="no">topk</code> 값을 요구합니다. 다른 축소 전략에는 <code translate="no">topk</code> 를 포함해서는 안 됩니다.</p></li>
<li><p>EmbeddingList 수준 StructArray 요청은 범위 검색이나 그룹화를 지원하지 않습니다.</p></li>
<li><p>하이브리드 그룹화는 동일한 StructArray 요소 수준의 하이브리드 검색에서만 지원되며, 기본 키에 의해서만 가능합니다.</p></li>
<li><p>범위 검색과 그룹화를 함께 사용해서는 안 됩니다.</p></li>
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
<li><p>동일한 StructArray 요소 수준 하이브리드 요청에 <code translate="no">element_scope</code> 를 추가하는 경우. 해당 요청은 요소 수준으로 유지되며 엔티티 수준 축소(collapse)를 수행하지 않습니다.</p></li>
<li><p><code translate="no">chunks[emb_list_vector]</code> 에 <code translate="no">element_scope</code> 를 추가하는 경우. EmbeddingList 검색은 이미 엔티티 수준입니다.</p></li>
<li><p>두 개의 StructArray 필드가 요소 오프셋을 공유한다고 가정하는 경우. <code translate="no">chunks</code> 의 오프셋 <code translate="no">3</code> 과 다른 StructArray 필드의 오프셋 <code translate="no">3</code> 은 서로 다른 요소이므로, 하이브리드 요청은 엔티티 수준이 됩니다.</p></li>
<li><p><code translate="no">topk_sum</code> 을 <code translate="no">L2</code> 과 함께 사용합니다. 음수 거리 메트릭의 경우 <code translate="no">max</code>, <code translate="no">avg</code> 또는 <code translate="no">topk_avg</code> 을 사용하십시오.</p></li>
<li><p>축약 후 엔티티 수준 하이브리드 결과에 선택된 Struct 요소 오프셋이 포함될 것으로 예상됩니다.</p></li>
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
<li><p>두 가지 기본 StructArray 벡터 검색 모드에 대해 알아보려면 <a href="/docs/ko/basic-vector-search-with-structarray.md">‘StructArray를 사용한 기본 벡터 검색’을</a> 참조하십시오.</p></li>
<li><p>하이브리드 검색에 스칼라 필터를 추가하려면 <a href="/docs/ko/filtered-search-with-structarray.md">‘StructArray를 사용한 필터링 검색’을</a> 참조하십시오.</p></li>
<li><p>하이브리드 검색에서 점수 또는 거리 경계를 사용하려면 <a href="/docs/ko/range-search-with-structarray.md">StructArray를 사용한 범위 검색을</a> 참조하십시오.</p></li>
<li><p>요소 수준 하이브리드 결과를 상위 엔티티별로 그룹화하려면 <a href="/docs/ko/grouping-search-with-structarray.md">StructArray를 사용한 그룹화 검색을</a> 참조하십시오.</p></li>
<li><p>StructArray 검색 제한 사항을 확인하려면 <a href="/docs/ko/structarray-limits.md">‘StructArray 제한 사항’을</a> 참조하십시오.</p></li>
</ol>
