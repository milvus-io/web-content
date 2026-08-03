---
id: sparse-inverted-index.md
title: SPARSE_INVERTED_INDEX
summary: >-
  SPARSE_INVERTED_INDEX 인덱스는 Milvus에서 스파스 벡터를 효율적으로 저장하고 검색하기 위해 사용하는 인덱스 유형입니다.
  이 인덱스 유형은 역인덱싱의 원리를 활용하여 스파스 데이터를 위한 매우 효율적인 검색 구조를 구축합니다.
---
<h1 id="SPARSEINVERTEDINDEX" class="common-anchor-header">SPARSE_INVERTED_INDEX<button data-href="#SPARSEINVERTEDINDEX" class="anchor-icon" translate="no">
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
    </button></h1><p><code translate="no">SPARSE_INVERTED_INDEX</code> 인덱스는 Milvus에서 스파스 벡터를 효율적으로 저장하고 검색하기 위해 사용하는 인덱스 유형입니다. 이 인덱스는 스파스 벡터의 0이 아닌 차원을 기반으로 역색인 구조를 구축합니다. 이 인덱스는 BM25 전체 텍스트 검색 및 내적 기반의 스파스 임베딩 검색에 사용할 수 있습니다.</p>
<p>스파스 벡터 필드, 메트릭 유형 및 전체 텍스트 검색에 대한 자세한 내용은 <a href="/docs/ko/sparse_vector.md">‘스파스 벡터’</a>, <a href="/docs/ko/metric.md">‘메트릭 유형’</a> 및 <a href="/docs/ko/full-text-search.md">‘전체 텍스트 검색’을</a> 참조하십시오.</p>
<h2 id="Build-index" class="common-anchor-header">인덱스 구축<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 스파스 벡터 필드에 대해 ‘ <code translate="no">SPARSE_INVERTED_INDEX</code> ’ 인덱스를 생성하려면 ` <code translate="no">add_index()</code> ` 메서드를 사용하고 ` <code translate="no">index_type</code>`, ` <code translate="no">metric_type</code>` 및 인덱스 매개변수를 지정하십시오.</p>
<p>BM25 전체 텍스트 검색의 경우, BM25 함수에 의해 생성된 스파스 벡터 필드에 인덱스를 생성합니다. ` <code translate="no">metric_type</code> `을 ` <code translate="no">BM25</code>`으로 설정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_bm25_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;BM25&quot;</span>, <span class="hljs-comment"># Metric type used for full text search</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>스파스 임베딩 검색의 경우, 외부에서 생성된 스파스 벡터를 저장하는 스파스 벡터 필드를 기반으로 인덱스를 구축하십시오. <code translate="no">metric_type</code> 를 <code translate="no">IP</code> 로 설정하십시오.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()
index_params.add_index(
    field_name=<span class="hljs-string">&quot;sparse_vector&quot;</span>, <span class="hljs-comment"># Name of the sparse vector field to index</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_ip_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;SINDI&quot;</span>},
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>앞서 설명한 구성에서:</p>
<ul>
<li><p><code translate="no">index_type</code>: 생성할 인덱스의 유형입니다. 이 값을 <code translate="no">SPARSE_INVERTED_INDEX</code> 로 설정하십시오.</p></li>
<li><p><code translate="no">metric_type</code>: 스파스 벡터 간의 유사도를 계산하는 데 사용되는 메트릭입니다. 유효한 값:</p>
<ul>
<li><p><code translate="no">BM25</code>: 전체 텍스트 검색에 BM25 관련도 점수 산정 방식을 사용합니다.</p></li>
<li><p><code translate="no">IP</code> (내적): 내적을 사용하여 스파스 벡터의 유사도를 측정합니다.</p></li>
</ul>
<p>자세한 내용은 <a href="/docs/ko/metric.md">‘메트릭 유형’</a> 및 <a href="/docs/ko/full-text-search.md">‘전체 텍스트 검색</a>’을 참조하십시오.</p></li>
<li><p><code translate="no">params.inverted_index_algo</code>: 색인 구축 및 쿼리 처리에 사용되는 알고리즘입니다. 유효한 값:</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code>: Document-at-a-Time MaxScore 쿼리 처리. 이는 <code translate="no">BM25</code> 의 기본값입니다. 배경 정보는 <a href="https://dl.acm.org/doi/10.1016/0306-4573%2895%2900020-H">‘쿼리 평가: 전략 및 최적화’를</a> 참조하십시오.</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>: Document-at-a-Time WAND 쿼리 처리. 이 알고리즘은 topK 값이 작거나 쿼리 길이가 짧은 경우에 적합합니다. 배경 정보는 <a href="https://dl.acm.org/doi/10.1145/956863.956944">‘2단계 검색 프로세스를 이용한 효율적인 쿼리 평가’를</a> 참조하십시오.</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: 기본 Term-at-a-Time 쿼리 처리. 이 옵션을 기준선으로 사용하거나, 평균 문서 길이 등 전체 컬렉션 통계에 따라 점수가 동적으로 조정되어야 할 때 사용합니다.</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_MAXSCORE&quot;</code>: 블록 수준 최대 점수 메타데이터를 사용하는 MaxScore 쿼리 처리. 배경 정보는 <a href="https://dl.acm.org/doi/10.1145/2009916.2010048">‘Block-Max 인덱스를 사용한 더 빠른 Top-k 문서 검색’을</a> 참조하십시오.</p></li>
<li><p><code translate="no">&quot;BLOCK_MAX_WAND&quot;</code>: 블록 수준 최대 점수 메타데이터를 사용하는 WAND 쿼리 처리. 배경 정보는 <a href="https://dl.acm.org/doi/10.1145/2009916.2010048">“블록-맥스 인덱스를 사용한 더 빠른 Top-k 문서 검색”을</a> 참조하십시오.</p></li>
<li><p><code translate="no">&quot;SINDI&quot;</code>: 고정된 문서 ID 윈도우를 기반으로 하며, 검색 시 SIMD 가속을 지원하는 스파스 역색인입니다. 이는 ` <code translate="no">IP</code>`의 기본값입니다. 자세한 내용은 <a href="https://arxiv.org/abs/2509.08395">SINDI 논문을</a> 참조하십시오.</p></li>
</ul>
<p><code translate="no">inverted_index_algo</code> 를 지정하지 않으면, Milvus는 <code translate="no">metric_type</code> 에 따라 기본 알고리즘을 선택합니다: <code translate="no">BM25</code> 의 경우 <code translate="no">DAAT_MAXSCORE</code>, <code translate="no">IP</code> 의 경우 <code translate="no">SINDI</code>.</p>
<p><code translate="no">SPARSE_INVERTED_INDEX</code> 인덱스에 사용할 수 있는 인덱스 생성 매개변수에 대한 자세한 내용은 <a href="/docs/ko/sparse-inverted-index.md#Index-building-params">인덱스 생성 매개변수를</a> 참조하십시오.</p></li>
</ul>
<p>인덱스 매개변수 구성이 완료되면, ` <code translate="no">create_index()</code> ` 메서드를 직접 사용하거나 ` <code translate="no">create_collection</code> ` 메서드에 인덱스 매개변수를 전달하여 인덱스를 생성할 수 있습니다. 자세한 내용은 <a href="/docs/ko/create-collection.md">‘컬렉션 생성’을</a> 참조하십시오.</p>
<h2 id="Search-on-index" class="common-anchor-header">인덱스 검색<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>인덱스가 구축되고 엔티티가 삽입되면, 인덱스를 대상으로 유사도 검색을 수행할 수 있습니다.</p>
<p>BM25 전체 텍스트 검색의 경우, 쿼리로 원본 텍스트를 사용합니다. Milvus는 BM25 함수를 통해 쿼리 텍스트를 스파스 벡터로 변환합니다.</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[<span class="hljs-string">&quot;what is information retrieval?&quot;</span>],
    anns_field=<span class="hljs-string">&quot;sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;text&quot;</span>],
    limit=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>스파스 임베딩 검색의 경우, 쿼리 벡터로 스파스 벡터 사전(dictionary)을 사용합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    anns_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
    data=query_vector,
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>},
)
<button class="copy-code-btn"></button></code></pre>
<p>기본적으로 Milvus는 인덱스에 구성된 검색 알고리즘을 사용합니다.</p>
<p><code translate="no">SPARSE_INVERTED_INDEX</code> 인덱스에서 사용할 수 있는 검색 매개변수에 대한 자세한 내용은 <a href="/docs/ko/sparse-inverted-index.md#Index-specific-search-params">인덱스별 검색 매개변수를</a> 참조하십시오.</p>
<h2 id="Index-params" class="common-anchor-header">인덱스 매개변수<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 인덱스를 구축하고 인덱스에서 검색을 수행하는 데 사용되는 매개변수에 대한 개요를 제공합니다.</p>
<h3 id="Index-building-params" class="common-anchor-header">인덱스 생성 매개변수<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 표에는 <a href="/docs/ko/sparse-inverted-index.md#Build-index">인덱스를 생성할</a> 때 <code translate="no">params</code> 에서 구성할 수 있는 매개 변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th><p>매개 변수</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 권장 사항</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>인덱스 생성 및 쿼리에 사용되는 알고리즘입니다. 이 알고리즘은 인덱스가 쿼리를 처리하는 방식을 결정합니다.</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code>, <code translate="no">"DAAT_WAND"</code>, <code translate="no">"TAAT_NAIVE"</code>, <code translate="no">"BLOCK_MAX_MAXSCORE"</code>, <code translate="no">"BLOCK_MAX_WAND"</code>, <code translate="no">"SINDI"</code></p><p>기본값: <code translate="no">BM25</code> 의 경우 <code translate="no">"DAAT_MAXSCORE"</code>, <code translate="no">IP</code> 의 경우 <code translate="no">"SINDI"</code>.</p></td>
     <td><p>k 값이 높거나 검색어 수가 많은 쿼리가 포함된 BM25 전체 텍스트 검색 워크로드의 경우 <code translate="no">"DAAT_MAXSCORE"</code> 를 사용하십시오.</p><p>k 값이 작거나 쿼리가 짧은 BM25 워크로드의 경우 <code translate="no">"DAAT_WAND"</code> 를 사용하십시오.</p><p><code translate="no">"TAAT_NAIVE"</code> 을 기준선으로 사용하거나, 평균 문서 길이 등 전체 컬렉션 통계에 따라 점수가 동적으로 조정되어야 하는 경우 이 알고리즘을 사용하십시오.</p><p><code translate="no">"BLOCK_MAX_MAXSCORE"</code> 또는 <code translate="no">"BLOCK_MAX_WAND"</code> 을 사용하여 쿼리 프루닝에 블록 수준 최대 점수 메타데이터를 활용하십시오.</p><p><code translate="no">IP</code> 와 함께 스파스 임베딩 검색을 수행하려면 <code translate="no">"SINDI"</code> 를 사용하십시오.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_k1</code></p></td>
     <td><p>BM25 스코어링에 대한 용어 빈도 포화도를 제어합니다. 이 매개변수는 <code translate="no">metric_type</code> 가 <code translate="no">BM25</code> 인 경우에만 적용됩니다.</p></td>
     <td><p>권장 범위: [1.2, 2.0]</p><p>기본값: 1.2</p></td>
     <td><p>문서 순위에서 용어 빈도에 더 큰 가중치를 부여하려면 이 값을 늘리십시오.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">bm25_b</code></p></td>
     <td><p>BM25 점수 산출 시 문서 길이 정규화의 강도를 제어합니다. 이 매개 변수는 <code translate="no">metric_type</code> 가 <code translate="no">BM25</code> 인 경우에만 적용됩니다.</p></td>
     <td><p>범위: [0, 1]</p><p>기본값: 0.75</p></td>
     <td><p>더 높은 값을 사용하면 길이 정규화가 더 강력하게 적용됩니다. 더 낮은 값을 사용하면 순위에 미치는 문서 길이의 영향을 줄일 수 있습니다.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">인덱스별 검색 매개변수<button data-href="#Index-specific-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 표에는 <a href="/docs/ko/sparse-inverted-index.md#Search-on-index">인덱스에서 검색할</a> 때 <code translate="no">search_params.params</code> 에서 구성할 수 있는 매개 변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th><p>매개변수</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 권장 사항</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>검색 시 무시할 가장 작은 값의 비율로, 노이즈를 줄이는 데 도움이 됩니다.</p></td>
     <td><p>범위: [0.0, 1.0) (예: 0.2는 가장 작은 값의 20%를 무시함)</p></td>
     <td><p>쿼리 벡터의 희소성과 노이즈 수준에 따라 이 매개변수를 조정하십시오.</p><p>이 매개변수는 검색 과정에서 제외되는 절대값이 작은 값의 비율을 제어합니다. 이 값을 높이면(예: <code translate="no">0.2</code>), 노이즈를 줄이고 더 중요한 구성 요소에 검색을 집중시켜 정밀도와 효율성을 향상시킬 수 있습니다. 그러나 더 많은 값을 제외하면 잠재적으로 관련성이 있는 신호를 배제함으로써 재현율이 낮아질 수도 있습니다. 워크로드에 맞춰 재현율과 정확도의 균형을 맞출 수 있는 값을 선택하십시오.</p></td>
   </tr>
</table>
