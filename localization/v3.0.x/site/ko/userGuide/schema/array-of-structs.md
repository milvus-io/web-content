---
id: array-of-structs.md
title: StructArray 개요
summary: >-
  하나의 엔티티가 구조화된 요소들의 순서 있는 목록을 저장해야 할 때(예: 여러 청크로 구성된 하나의 문서, 여러 시각적 패치로 구성된 하나의
  페이지, 또는 여러 클립으로 구성된 하나의 비디오 등) StructArray를 사용합니다. StructArray는 이러한 요소들을 상위
  엔티티 내에 보관하면서도, 각 요소 내의 필드에 대해 벡터 검색 및 스칼라 필터링을 수행할 수 있도록 합니다.
---
<h1 id="StructArray-Overview" class="common-anchor-header">StructArray 개요<button data-href="#StructArray-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>하나의 엔티티가 구조화된 요소들의 정렬된 목록을 저장해야 할 때(예: 여러 청크로 구성된 하나의 문서, 여러 시각적 패치로 구성된 하나의 페이지, 또는 여러 클립으로 구성된 하나의 비디오) StructArray를 사용합니다. StructArray는 이러한 요소들을 상위 엔티티 내에 보관하면서도 각 요소 내의 필드에 대해 벡터 검색 및 스칼라 필터링을 수행할 수 있도록 합니다.</p>
<h2 id="What-is-StructArray" class="common-anchor-header">StructArray란 무엇인가?<button data-href="#What-is-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>StructArray</strong>(구조체 배열이라고도 함)는 각 엔티티 내에 정렬된 Struct 요소 집합을 저장합니다. 배열 내의 모든 Struct 요소는 동일한 스키마를 따릅니다. Struct 요소는 스칼라 하위 필드, 벡터 하위 필드 또는 둘 다를 포함할 수 있습니다.</p>
<p>예를 들어, 컬렉션은 하나의 기사를 엔티티로 저장하고, 그 청크를 ‘ <code translate="no">chunks</code> ’라는 이름의 StructArray 필드에 저장할 수 있습니다. 각 청크에는 텍스트, 섹션 메타데이터, 품질 점수, 그리고 하나 이상의 벡터 임베딩이 포함될 수 있습니다.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;doc_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Vector search tuning guide&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.10</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.40</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Use HNSW efSearch to trade recall for latency.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.92</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.11</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.21</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.31</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.41</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.12</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.33</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.39</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Range search returns vectors within a distance boundary.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.86</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.18</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.23</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.29</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.36</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.19</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.24</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.37</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>이 예시에서 두 개의 벡터 하위 필드는 두 가지 검색 관점에서 동일한 청크를 나타냅니다. ` <code translate="no">chunks[emb_list_vector]</code> `는 ` <code translate="no">MAX_SIM*</code> ` 메트릭을 사용하는 EmbeddingList 검색을 위한 것이며, ` <code translate="no">chunks[emb]</code> `는 ` <code translate="no">COSINE</code>`, ` <code translate="no">IP</code>` 또는 ` <code translate="no">L2</code>`와 같은 일반 벡터 메트릭을 사용하는 요소 수준 검색을 위한 것입니다.</p>
</div>
<h2 id="When-to-use-StructArray" class="common-anchor-header">StructArray 사용 시점<button data-href="#When-to-use-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>반환하려는 기본 단위가 검색하거나 필터링하려는 기본 단위보다 클 때 StructArray를 사용합니다.</p>
<table>
<thead>
<tr><th>사용 사례</th><th>StructArray가 도움이 되는 이유</th><th>일반적인 StructArray 필드</th></tr>
</thead>
<tbody>
<tr><td>문서 검색</td><td>하나의 문서를 엔티티로 저장하면서 해당 문서의 청크 전체를 검색할 때 사용합니다.</td><td><code translate="no">chunks</code></td></tr>
<tr><td>후기 상호작용 검색</td><td>문서나 페이지를 임베딩 목록으로 저장하고, ` <code translate="no">MAX_SIM*</code>`를 사용하여 점수를 산출합니다.</td><td><code translate="no">chunks[emb_list_vector]</code> 또는 <code translate="no">patches[emb]</code></td></tr>
<tr><td>요소 수준 검색</td><td>가장 관련성이 높은 청크, 클립, 패치 또는 관측값을 배열 오프셋과 함께 반환합니다.</td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>구조화된 필터링</td><td>section, score, page 또는 flags와 같은 Struct 요소 내의 스칼라 하위 필드를 기준으로 필터링합니다.</td><td><code translate="no">chunks[section]</code>, <code translate="no">chunks[quality_score]</code></td></tr>
<tr><td>중복된 상위 결과 줄이기</td><td>각 자식 요소를 별도의 행으로 저장하는 대신, 동일한 부모 엔티티 아래에 자식 요소를 유지합니다.</td><td><code translate="no">chunks</code>, <code translate="no">clips</code>, <code translate="no">patches</code></td></tr>
</tbody>
</table>
<h2 id="Decision-Matrix" class="common-anchor-header">결정 행렬<button data-href="#Decision-Matrix" class="anchor-icon" translate="no">
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
    </button></h2><p>올바른 StructArray 경로를 선택하려면 다음 행렬을 사용하십시오.</p>
<table>
<thead>
<tr><th>목표</th><th>권장 경로</th><th>결과 세분화 수준</th><th>여기서 시작하세요</th></tr>
</thead>
<tbody>
<tr><td>하나의 부모 객체와 여러 개의 구조화된 자식 객체를 모델링합니다.</td><td>StructArray 필드를 생성합니다.</td><td>엔티티에는 순서가 지정된 Struct 요소가 포함됩니다.</td><td><a href="/docs/ko/create-structarray-field.md">StructArray 필드 생성</a></td></tr>
<tr><td>중첩된 자식 데이터가 포함된 부모 레코드를 삽입합니다.</td><td>StructArray 필드가 Struct 객체 목록인 엔티티를 삽입합니다.</td><td>엔티티 수준 삽입.</td><td><a href="/docs/ko/insert-data-into-structarray-fields.md">StructArray 필드에 데이터 삽입</a></td></tr>
<tr><td>ColBERT, ColPali 또는 문서 수준 후기 상호작용 검색을 실행합니다.</td><td><code translate="no">MAX_SIM*</code> 인덱스를 사용하여 EmbeddingList 검색을 수행합니다.</td><td>엔티티 수준.</td><td><a href="/docs/ko/search-with-embedding-lists.md">임베딩 리스트를 사용하여 검색</a></td></tr>
<tr><td>개별 청크, 클립 또는 패치를 검색합니다.</td><td>일반 벡터 메트릭을 사용하여 요소 수준 검색을 수행합니다.</td><td>Struct 요소 수준이며, 가능한 경우 오프셋을 사용합니다.</td><td>StructArray를 사용한 기본 벡터 검색</td></tr>
<tr><td>스칼라 조건에 부합하는 요소로만 요소 수준 벡터 검색을 제한합니다.</td><td><code translate="no">element_filter</code> 를 사용하십시오.</td><td>요소 수준 필터링; 결과 형상은 검색 유형에 따라 다릅니다.</td><td>StructArray를 사용한 필터링 검색</td></tr>
<tr><td>조건을 만족하는 Struct 요소의 수에 따라 엔티티를 선택합니다.</td><td><code translate="no">MATCH_ANY</code>, <code translate="no">MATCH_ALL</code>, <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code> 또는 <code translate="no">MATCH_EXACT</code> 을(를) 사용하십시오.</td><td>엔티티 수준.</td><td><a href="/docs/ko/struct-array-operators.md">StructArray 연산자</a></td></tr>
<tr><td>StructArray 벡터 하위 필드에 점수 또는 거리 경계를 사용합니다.</td><td>요소 수준 범위 검색을 사용합니다.</td><td>Struct 요소 수준.</td><td>StructArray를 사용한 범위 검색</td></tr>
<tr><td>요소 수준 검색 후 부모 엔티티당 최대 하나의 결과를 반환합니다.</td><td>기본 키를 사용한 그룹화 검색을 사용합니다.</td><td>그룹화 후 엔티티 수준.</td><td>StructArray를 사용한 그룹화 검색</td></tr>
<tr><td>StructArray 요소 검색을 다른 벡터 필드와 결합합니다.</td><td>StructArray 벡터 하위 필드를 대상으로 하는 하나의 AnnSearchRequest를 사용하여 하이브리드 검색을 수행합니다.</td><td>요소 수준 하위 검색, 엔티티 수준 재순위 지정.</td><td>StructArray를 활용한 하이브리드 검색</td></tr>
</tbody>
</table>
<h2 id="Understand-the-two-search-models" class="common-anchor-header">두 가지 검색 모델 이해하기<button data-href="#Understand-the-two-search-models" class="anchor-icon" translate="no">
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
<tr><th>### EmbeddingList 검색 EmbeddingList 검색은 StructArray 벡터 하위 필드 내의 벡터들을 상위 엔티티에 대한 하나의 임베딩 목록으로 취급합니다. 쿼리 역시 임베딩 목록입니다. Milvus는 <code translate="no">MAX_SIM*</code> 메트릭을 사용하여 쿼리 임베딩 목록과 저장된 임베딩 목록을 비교하고, 일치하는 엔티티를 반환합니다. - 쿼리 데이터: 임베딩 목록. - 메트릭 계열: <code translate="no">MAX_SIM*</code>. - 결과 세분화 수준: 엔티티 수준. - 최적 용도: 문서 수준 또는 페이지 수준의 후기 상호작용 검색.</th><th>### 요소 수준 검색 요소 수준 검색은 각 Struct 요소를 독립적인 벡터 검색 후보로 취급합니다. 각 검색 결과는 StructArray 필드 내의 일치하는 요소를 나타내며, 그룹화되지 않은 결과에서는 요소 오프셋을 확인할 수 있습니다. - 쿼리 데이터: 일반 벡터. - 메트릭 계열: 일반 벡터 메트릭. - 결과 세분화 수준: Struct 요소 수준. - 최적 용도: 청크 수준, 클립 수준 또는 패치 수준의 검색.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<div class="alert note">
<p>경고</p>
<p>컬렉션에 EmbeddingList 검색과 요소 수준 검색이 모두 필요한 경우, 두 개의 별도 벡터 하위 필드를 사용하십시오. 벡터 필드 또는 벡터 하위 필드는 하나의 인덱스만 허용하며, 두 검색 모드는 서로 다른 메트릭 계열을 필요로 합니다.</p>
</div>
<h2 id="Documentation-map" class="common-anchor-header">문서 지도<button data-href="#Documentation-map" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray 문서는 모델링 페이지와 검색 페이지로 나뉩니다. 모델링 페이지를 사용하여 데이터를 정의하고 준비하십시오. 검색 페이지를 사용하여 적절한 검색 및 필터링 동작을 선택하십시오.</p>
<table>
<thead>
<tr><th>영역</th><th>페이지</th><th>다음 용도로 사용</th></tr>
</thead>
<tbody>
<tr><td>모델링</td><td><a href="/docs/ko/create-structarray-field.md">StructArray 필드 생성</a></td><td>Struct 스키마를 정의하고 StructArray 필드를 추가합니다.</td></tr>
<tr><td>모델링</td><td><a href="/docs/ko/insert-data-into-structarray-fields.md">StructArray 필드에 데이터 삽입</a></td><td>중첩된 StructArray 데이터를 준비하고 삽입합니다.</td></tr>
<tr><td>모델링</td><td><a href="/docs/ko/index-structarray-fields.md">StructArray 필드에 인덱스 지정</a></td><td>StructArray 하위 필드에 벡터 및 스칼라 인덱스를 생성합니다.</td></tr>
<tr><td>참조</td><td><a href="/docs/ko/structarray-limits.md">StructArray 제한 사항</a></td><td>스키마, 데이터 유형, 인덱스, 검색, 필터 및 버전 제한 사항을 확인합니다.</td></tr>
<tr><td>검색</td><td>StructArray를 사용한 기본 벡터 검색</td><td>EmbeddingList 검색과 요소 수준 벡터 검색을 비교합니다.</td></tr>
<tr><td>검색</td><td>StructArray를 사용한 범위 검색</td><td>StructArray 벡터 하위 필드에 범위 제약 조건을 적용합니다.</td></tr>
<tr><td>검색</td><td>StructArray를 사용한 그룹화 검색</td><td>기본 키를 기준으로 요소 수준 검색 결과를 그룹화합니다.</td></tr>
<tr><td>검색</td><td>StructArray를 사용한 하이브리드 검색</td><td>StructArray 요소 수준 검색을 다른 벡터 검색과 결합합니다.</td></tr>
<tr><td>검색</td><td>StructArray를 사용한 필터링 검색</td><td>검색, 쿼리 및 하이브리드 검색에서 StructArray 필터를 사용합니다.</td></tr>
<tr><td>검색</td><td><a href="/docs/ko/search-with-embedding-lists.md">임베딩 목록을 활용한 검색</a></td><td>StructArray를 사용하여 ColBERT 및 ColPali 방식의 검색 시스템을 구축하세요.</td></tr>
<tr><td>필터</td><td><a href="/docs/ko/struct-array-operators.md">StructArray 연산자</a></td><td><code translate="no">element_filter</code> 및 <code translate="no">MATCH_*</code> 연산자에 대한 구문 참조.</td></tr>
</tbody>
</table>
<h2 id="Key-limits-to-check-first" class="common-anchor-header">먼저 확인해야 할 주요 제한 사항<button data-href="#Key-limits-to-check-first" class="anchor-icon" translate="no">
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
<li><p>Struct는 Array 필드의 요소 유형으로 사용할 수 있습니다. 최상위 컬렉션 필드로는 사용되지 않습니다.</p></li>
<li><p>동일한 StructArray 필드 내의 모든 Struct 요소는 하나의 사전 정의된 스키마를 공유합니다.</p></li>
<li><p>벡터 하위 필드에는 인덱스가 필요합니다. EmbeddingList 검색은 <code translate="no">MAX_SIM*</code> 메트릭을 사용하는 반면, 요소 수준 검색은 일반 벡터 메트릭을 사용합니다.</p></li>
<li><p><code translate="no">element_filter</code> <code translate="no">MATCH_*</code> 는 StructArray 필드 내의 스칼라 하위 필드용입니다. 는 해당 연산자 내에서만 사용하십시오. <code translate="no">$[subfield]</code> </p></li>
<li><p>일부 검색 조합은 버전에 따라 제한되거나 특정 모드에 한정됩니다. 범위 검색, 그룹화 검색, 하이브리드 검색, null 허용 필드 또는 동적으로 추가된 필드를 사용하기 전에 <a href="/docs/ko/structarray-limits.md">StructArray 제한 사항을</a> 확인하십시오.</p></li>
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
<li><p>스키마를 설계하려면 <a href="/docs/ko/create-structarray-field.md">'StructArray 필드 만들기'를</a> 참조하십시오.</p></li>
<li><p>데이터를 준비하려면 <a href="/docs/ko/insert-data-into-structarray-fields.md">'StructArray 필드에 데이터 삽입'을</a> 참조하십시오.</p></li>
<li><p>인덱스를 선택하려면 <a href="/docs/ko/index-structarray-fields.md">‘StructArray 필드 인덱싱’을</a> 참조하십시오.</p></li>
<li><p>StructArray 벡터 하위 필드를 검색하려면 'StructArray를 사용한 기본 벡터 검색'부터 시작하십시오.</p></li>
<li><p>StructArray 스칼라 하위 필드를 필터링하려면 <a href="/docs/ko/struct-array-operators.md">‘StructArray 연산자’</a> 및 ‘StructArray를 사용한 필터링 검색’을 참조하십시오.</p></li>
</ol>
