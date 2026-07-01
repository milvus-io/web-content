---
id: basic-vector-search-with-structarray.md
title: StructArray를 사용한 기본 벡터 검색
summary: >-
  이 페이지를 사용하여 StructArray 필드 내의 벡터 하위 필드에 대해 벡터 검색을 실행할 수 있습니다. StructArray는 두
  가지 기본 벡터 검색 모드를 지원합니다. 하나는 각 엔티티에 저장된 임베딩 목록에 점수를 매기는 ‘임베딩 목록 검색(EmbeddingList
  search)’이고, 다른 하나는 각 Struct 요소를 개별적으로 검색하는 ‘요소 수준 검색’입니다.
---
<h1 id="Basic-Vector-Search-with-StructArray" class="common-anchor-header">StructArray를 사용한 기본 벡터 검색<button data-href="#Basic-Vector-Search-with-StructArray" class="anchor-icon" translate="no">
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
    </button></h1><p>이 페이지를 사용하여 StructArray 필드 내의 벡터 하위 필드에 대해 벡터 검색을 실행할 수 있습니다. StructArray는 두 가지 기본 벡터 검색 모드를 지원합니다. 하나는 각 엔티티에 저장된 임베딩 목록에 점수를 매기는 EmbeddingList 검색이고, 다른 하나는 각 Struct 요소를 독립적으로 검색하는 요소 수준 검색입니다.</p>
<p>이 페이지에서는 <a href="/docs/ko/create-structarray-field.md">‘StructArray 필드 생성’의</a> <code translate="no">tech_articles</code> 컬렉션을 사용합니다. 이 컬렉션에는 <code translate="no">chunks</code> 라는 StructArray 필드가 있습니다. 각 청크에는 텍스트, 스칼라 메타데이터, EmbeddingList 검색용 인덱스가 포함된 <code translate="no">emb_list_vector</code> 라는 벡터 하위 필드, 그리고 요소 수준 검색용 인덱스가 포함된 <code translate="no">emb</code> 라는 벡터 하위 필드가 포함되어 있습니다.</p>
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
    </button></h2><p>컬렉션 스키마, 데이터 및 인덱스가 이미 준비되어 있는지 확인하십시오.</p>
<table>
<thead>
<tr><th>필수 사항</th><th>준비 위치</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks</code> 과 같은 StructArray 필드를 생성합니다.</td><td><a href="/docs/ko/create-structarray-field.md">StructArray 필드 생성</a></td></tr>
<tr><td><code translate="no">chunks</code> 필드에 Struct 객체가 포함된 엔티티를 삽입합니다.</td><td><a href="/docs/ko/insert-data-into-structarray-fields.md">StructArray 필드에 데이터 삽입</a></td></tr>
<tr><td>EmbeddingList 검색을 위해 <code translate="no">chunks[emb_list_vector]</code> 에 <code translate="no">MAX_SIM*</code> 인덱스를 생성합니다.</td><td><a href="/docs/ko/index-structarray-fields.md">StructArray 필드 색인 생성</a></td></tr>
<tr><td>요소 수준 검색을 위해 ` <code translate="no">chunks[emb]</code> `에 일반 벡터-메트릭 인덱스를 생성합니다.</td><td><a href="/docs/ko/index-structarray-fields.md">StructArray 필드 인덱싱</a></td></tr>
</tbody>
</table>
<div class="alert note">
<p>경고</p>
<p>벡터 필드 또는 벡터 하위 필드는 하나의 인덱스만 허용합니다. EmbeddingList 검색과 요소 수준 검색이 모두 필요한 경우, 두 개의 별도 벡터 하위 필드를 생성하십시오. 이 페이지에서는 <code translate="no">chunks[emb_list_vector]</code> 에 대해 EmbeddingList 검색용 인덱스가 생성되고, <code translate="no">chunks[emb]</code> 에 대해 요소 수준 검색용 인덱스가 생성됩니다.</p>
</div>
<h2 id="Choose-a-search-mode" class="common-anchor-header">검색 모드 선택<button data-href="#Choose-a-search-mode" class="anchor-icon" translate="no">
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
<tr><th>Aspect</th><th>EmbeddingList 검색</th><th>요소 수준 검색</th></tr>
</thead>
<tbody>
<tr><td>대상 하위 필드</td><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>쿼리 데이터</td><td>하나 이상의 벡터를 포함하는 임베딩 리스트.</td><td>일반 벡터.</td></tr>
<tr><td>메트릭 패밀리</td><td><code translate="no">MAX_SIM*</code>(예: <code translate="no">MAX_SIM_COSINE</code>).</td><td><code translate="no">COSINE</code>, <code translate="no">IP</code> 또는 <code translate="no">L2</code> 과 같은 일반 벡터 메트릭.</td></tr>
<tr><td>하나의 검색 결과가 나타내는 것</td><td>StructArray 벡터 하위 필드가 쿼리 임베딩 목록과 유사한, 일치하는 엔티티.</td><td>StructArray 필드 내의 일치하는 Struct 요소.</td></tr>
<tr><td>결과 세분화</td><td>엔티티 수준.</td><td>Struct 요소 수준.</td></tr>
<tr><td>오프셋</td><td>해당 사항 없음.</td><td>반환 시 일치하는 구조체 요소의 0을 기준으로 한 위치를 식별합니다.</td></tr>
<tr><td>일반적인 사용법</td><td>ColBERT, ColPali 및 기타 후기 상호작용 검색 패턴.</td><td>청크 수준, 패시지 수준, 클립 수준, 패치 수준 또는 팩트 수준의 검색.</td></tr>
</tbody>
</table>
<h2 id="Run-EmbeddingList-search" class="common-anchor-header">EmbeddingList 검색 실행<button data-href="#Run-EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h2><p>쿼리 자체에 여러 벡터가 포함되어 있고 대상 StructArray 벡터 하위 필드가 <code translate="no">MAX_SIM*</code> 메트릭으로 인덱싱된 경우 EmbeddingList 검색을 사용합니다. 결과는 엔티티 수준 일치입니다.</p>
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
    limit=<span class="hljs-number">3</span>,
    output_fields=[
        <span class="hljs-string">&quot;doc_id&quot;</span>,
        <span class="hljs-string">&quot;title&quot;</span>,
        <span class="hljs-string">&quot;category&quot;</span>,
        <span class="hljs-string">&quot;chunks[text]&quot;</span>,
        <span class="hljs-string">&quot;chunks[section]&quot;</span>,
    ],
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> results:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit[<span class="hljs-string">&quot;id&quot;</span>], hit[<span class="hljs-string">&quot;distance&quot;</span>], hit[<span class="hljs-string">&quot;entity&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<p>이 검색 모드에서 <code translate="no">limit</code> 는 각 쿼리에 대해 반환되는 엔티티의 수를 제어합니다. 출력에는 StructArray 하위 필드가 포함될 수 있지만, 검색 결과 자체는 특정 Struct 요소가 아닌 일치한 상위 엔티티를 나타냅니다.</p>
<div class="alert note">
<p>ColBERT 또는 ColPali 방식에 대한 자세한 안내는 <a href="/docs/ko/search-with-embedding-lists.md">‘임베딩 목록을 사용한 검색’을</a> 참조하십시오. 이 페이지에서는 기본적인 StructArray 검색 동작만 다룹니다.</p>
</div>
<h2 id="Run-element-level-search" class="common-anchor-header">요소 수준 검색 실행<button data-href="#Run-element-level-search" class="anchor-icon" translate="no">
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
    </button></h2><p>각 Struct 요소가 벡터 검색에 독립적으로 참여해야 할 때는 요소 수준 검색을 사용하십시오. 쿼리는 일반 벡터이며, 대상 벡터 하위 필드는 일반 벡터 메트릭으로 인덱싱되어야 합니다.</p>
<pre><code translate="no" class="language-python">query_vector = [<span class="hljs-number">0.19</span>, <span class="hljs-number">0.24</span>, <span class="hljs-number">0.30</span>, <span class="hljs-number">0.37</span>]

results = client.search(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    data=[query_vector],
    anns_field=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    limit=<span class="hljs-number">5</span>,
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
<p>요소 수준 검색에서 각 검색 결과는 일치하는 Struct 요소를 나타냅니다. ` <code translate="no">offset</code> ` 값은 StructArray 필드 내에서 해당 요소의 0을 기준으로 한 위치입니다. 쿼리와 일치하는 Struct 요소가 두 개 이상인 경우, 동일한 엔티티가 여러 번 나타날 수 있습니다. ` <code translate="no">limit</code> ` 값은 고유한 상위 엔티티가 아닌 요소 검색 결과에 적용됩니다.</p>
<h2 id="Interpret-results" class="common-anchor-header">결과 해석<button data-href="#Interpret-results" class="anchor-icon" translate="no">
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
<tr><th>결과 항목</th><th>EmbeddingList 검색</th><th>요소 수준 검색</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">id</code></td><td>일치하는 엔티티의 기본 키.</td><td>일치하는 Struct 요소를 포함하는 엔티티의 기본 키.</td></tr>
<tr><td><code translate="no">distance</code> 또는 점수</td><td>쿼리 임베딩 목록과 저장된 임베딩 목록 간의 점수 또는 거리.</td><td>쿼리 벡터와 일치하는 Struct 요소 벡터 간의 점수 또는 거리.</td></tr>
<tr><td><code translate="no">offset</code></td><td>해당 사항 없음.</td><td>반환 시 일치하는 Struct 요소의 0을 기준으로 한 위치.</td></tr>
<tr><td>반복되는 기본 키</td><td>결과는 엔티티 수준이므로 단일 쿼리의 경우 중복 기본 키가 발생하지 않을 것으로 예상됩니다.</td><td>동일한 엔티티 내의 여러 Struct 요소가 일치할 수 있으므로 발생할 수 있습니다.</td></tr>
<tr><td>요청된 StructArray 출력 필드</td><td>일치하는 엔티티에서 반환됩니다.</td><td>대상 API 및 SDK에서 지원하는 요소 수준 히트 셰이프와 함께 반환됩니다.</td></tr>
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
<li><p>필수 하위 필드 경로 구문 <code translate="no">chunks[emb]</code> 대신 <code translate="no">chunks.emb</code> 을 사용하는 경우.</p></li>
<li><p>일반 벡터 메트릭으로 인덱싱된 벡터 하위 필드에 대해 EmbeddingList 쿼리를 사용하는 경우.</p></li>
<li><p><code translate="no">MAX_SIM*</code> 메트릭으로 인덱싱된 벡터 하위 필드에 일반 벡터 쿼리를 사용하는 경우.</p></li>
<li><p>요소 수준 검색( <code translate="no">limit</code> )이 그만큼의 고유한 상위 엔티티를 반환할 것이라고 기대하는 경우. 이 검색은 요소 일치 결과를 반환합니다.</p></li>
<li><p>EmbeddingList 검색이 하나의 특정 요소 오프셋을 반환할 것으로 예상하는 경우. 엔티티 수준의 일치 결과를 반환합니다.</p></li>
<li><p>두 검색 모드 모두에 하나의 벡터 하위 필드를 재사용하는 경우. 각 벡터 하위 필드는 하나의 인덱스만 허용하므로 별도의 벡터 하위 필드를 사용해야 합니다.</p></li>
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
<li><p>스칼라 조건으로 요소 수준 검색을 제한하려면 <a href="/docs/ko/filtered-search-with-structarray.md">‘StructArray를 사용한 필터링 검색’을</a> 참조하십시오.</p></li>
<li><p>점수 또는 거리 범위를 기준으로 검색하려면 <a href="/docs/ko/range-search-with-structarray.md">StructArray를 사용한 범위 검색을</a> 참조하십시오.</p></li>
<li><p>요소 수준 검색 후 부모 엔티티당 최대 하나의 결과만 반환하려면, <a href="/docs/ko/grouping-search-with-structarray.md">StructArray를 사용한 그룹화 검색을</a> 참조하십시오.</p></li>
<li><p>StructArray 검색을 다른 벡터 검색과 결합하려면 <a href="/docs/ko/hybrid-search-with-structarray.md">‘StructArray를 사용한 하이브리드 검색’을</a> 참조하십시오.</p></li>
<li><p>지원되는 데이터 유형, 메트릭, 필터 및 버전별 제한 사항을 확인하려면 <a href="/docs/ko/structarray-limits.md">‘StructArray 제한 사항’을</a> 참조하십시오.</p></li>
</ol>
