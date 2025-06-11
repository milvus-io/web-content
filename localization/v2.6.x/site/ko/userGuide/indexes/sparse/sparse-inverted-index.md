---
id: sparse-inverted-index.md
title: SPARSE_INVERTED_INDEX
summary: >-
  SPARSE_INVERTED_INDEX 인덱스는 밀버스에서 스파스 벡터를 효율적으로 저장하고 검색하기 위해 사용하는 인덱스 유형입니다. 이
  인덱스 유형은 반전 인덱싱의 원리를 활용하여 희소 데이터를 위한 매우 효율적인 검색 구조를 만듭니다. 자세한 내용은 INVERTED를
  참조하세요.
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
    </button></h1><p><code translate="no">SPARSE_INVERTED_INDEX</code> 인덱스는 밀버스에서 스파스 벡터를 효율적으로 저장하고 검색하기 위해 사용하는 인덱스 유형입니다. 이 인덱스 유형은 반전 인덱싱의 원리를 활용하여 희소 데이터에 대한 매우 효율적인 검색 구조를 만듭니다. 자세한 내용은 <a href="/docs/ko/inverted.md">INVERTED를</a> 참조하세요.</p>
<h2 id="Build-index" class="common-anchor-header">색인 구축<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus의 스파스 벡터 필드에 <code translate="no">SPARSE_INVERTED_INDEX</code> 인덱스를 구축하려면 <code translate="no">add_index()</code> 방법을 사용하여 <code translate="no">index_type</code>, <code translate="no">metric_type</code> 및 인덱스에 대한 추가 매개변수를 지정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_sparse_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;sparse_inverted_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={<span class="hljs-string">&quot;inverted_index_algo&quot;</span>: <span class="hljs-string">&quot;DAAT_MAXSCORE&quot;</span>}, <span class="hljs-comment"># Algorithm used for building and querying the index</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서는</p>
<ul>
<li><p><code translate="no">index_type</code>: 구축할 인덱스 유형입니다. 이 예에서는 값을 <code translate="no">SPARSE_INVERTED_INDEX</code> 로 설정합니다.</p></li>
<li><p><code translate="no">metric_type</code>: 스파스 벡터 간의 유사성을 계산하는 데 사용되는 메트릭입니다. 유효한 값:</p>
<ul>
<li><p><code translate="no">IP</code> (내적 곱): 도트 곱을 사용하여 유사도를 측정합니다.</p></li>
<li><p><code translate="no">BM25</code>: 일반적으로 텍스트 유사성에 초점을 맞춘 전체 텍스트 검색에 사용됩니다.</p>
<p>자세한 내용은 <a href="/docs/ko/metric.md">메트릭 유형</a> 및 <a href="/docs/ko/full-text-search.md">전체 텍스트 검색을</a> 참조하세요.</p></li>
</ul></li>
<li><p><code translate="no">params.inverted_index_algo</code>: 인덱스 구축 및 쿼리에 사용되는 알고리즘입니다. 유효한 값입니다:</p>
<ul>
<li><p><code translate="no">&quot;DAAT_MAXSCORE&quot;</code> (기본값): MaxScore 알고리즘을 사용하여 DAAT(Document-at-a-Time) 쿼리 처리를 최적화합니다. MaxScore는 영향이 미미할 것 같은 용어와 문서를 건너뛰는 방식으로 높은 <em>k</em> 값이나 많은 용어가 포함된 쿼리에 대해 더 나은 성능을 제공합니다. 최대 영향력 점수를 기준으로 용어를 필수 및 비필수 그룹으로 분류하여 상위 k 결과에 기여할 수 있는 용어에 집중함으로써 이를 달성합니다.</p></li>
<li><p><code translate="no">&quot;DAAT_WAND&quot;</code>: WAND 알고리즘을 사용하여 최적화된 DAAT 쿼리 처리. WAND는 최대 영향력 점수를 활용하여 비경쟁 문서를 건너뛰기 때문에 히트 문서를 더 적게 평가하지만, 히트당 오버헤드가 더 높습니다. 따라서 건너뛰기가 더 용이한 작은 <em>k</em> 값의 쿼리나 짧은 쿼리에는 WAND가 더 효율적입니다.</p></li>
<li><p><code translate="no">&quot;TAAT_NAIVE&quot;</code>: 기본 TAAT(Term-at-a-Time) 쿼리 처리. <code translate="no">DAAT_MAXSCORE</code> 및 <code translate="no">DAAT_WAND</code> 에 비해 느리지만 <code translate="no">TAAT_NAIVE</code> 은 고유한 이점을 제공합니다. 전역 수집 매개변수(avgdl)의 변경에 관계없이 정적으로 유지되는 캐시된 최대 영향 점수를 사용하는 DAAT 알고리즘과 달리 <code translate="no">TAAT_NAIVE</code> 은 이러한 변경에 동적으로 적응합니다.</p></li>
</ul>
<p><code translate="no">SPARSE_INVERTED_INDEX</code> 인덱스에 사용할 수 있는 구축 매개변수에 대해 자세히 알아보려면 <a href="/docs/ko/sparse-inverted-index.md#Index-building-params">인덱스 구축</a> 매개변수를 참조하세요.</p></li>
</ul>
<p>인덱스 파라미터가 구성되면 <code translate="no">create_index()</code> 메서드를 직접 사용하거나 <code translate="no">create_collection</code> 메서드에서 인덱스 파라미터를 전달하여 인덱스를 만들 수 있습니다. 자세한 내용은 <a href="/docs/ko/create-collection.md">컬렉션 만들기를</a> 참조하세요.</p>
<h2 id="Search-on-index" class="common-anchor-header">인덱스에서 검색<button data-href="#Search-on-index" class="anchor-icon" translate="no">
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
    </button></h2><p>인덱스가 구축되고 엔티티가 삽입되면 인덱스에서 유사도 검색을 수행할 수 있습니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Prepare search parameters</span>
search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>},  <span class="hljs-comment"># Additional optional search parameters</span>
}

<span class="hljs-comment"># Prepare the query vector</span>
query_vector = [{<span class="hljs-number">1</span>: <span class="hljs-number">0.2</span>, <span class="hljs-number">50</span>: <span class="hljs-number">0.4</span>, <span class="hljs-number">1000</span>: <span class="hljs-number">0.7</span>}]

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=query_vector,  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서는</p>
<ul>
<li><p><code translate="no">params</code>: 색인에서 검색을 위한 추가 구성 옵션.</p>
<ul>
<li><code translate="no">drop_ratio_search</code>: 검색 과정에서 무시할 작은 벡터 값의 비율을 지정하여 검색 성능을 미세 조정할 수 있습니다. 예를 들어 <code translate="no">{&quot;drop_ratio_search&quot;: 0.2}</code> 을 사용하면 검색 중에 쿼리 벡터에서 가장 작은 20%의 값이 무시됩니다.</li>
</ul>
<p><code translate="no">SPARSE_INVERTED_INDEX</code> 인덱스에 사용할 수 있는 검색 매개변수에 대해 자세히 알아보려면 <a href="/docs/ko/ivf-flat.md#share-KDWodFEx6oCm2yxgEUAcXaUDnwg">인덱스별 검색 매개변수를</a> 참조하세요.</p></li>
</ul>
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
    </button></h2><p>이 섹션에서는 인덱스를 작성하고 인덱스에서 검색을 수행하는 데 사용되는 매개변수에 대한 개요를 제공합니다.</p>
<h3 id="Index-building-params" class="common-anchor-header">인덱스 구축 매개변수</h3><p>다음 표에는 <a href="/docs/ko/sparse-inverted-index.md#Build-index">색인 작성</a> 시 <code translate="no">params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 제안</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inverted_index_algo</code></p></td>
     <td><p>인덱스 구축 및 쿼리에 사용되는 알고리즘입니다. 인덱스가 쿼리를 처리하는 방법을 결정합니다.</p></td>
     <td><p><code translate="no">"DAAT_MAXSCORE"</code> (기본값), <code translate="no">"DAAT_WAND"</code>, <code translate="no">"TAAT_NAIVE"</code></p></td>
     <td><p>k 값이 크거나 용어가 많은 쿼리의 경우 <code translate="no">"DAAT_MAXSCORE"</code> 를 사용하여 비경쟁 문서를 건너뛰면 이점을 얻을 수 있습니다. 
 k 값이 작거나 쿼리가 짧은 경우 보다 효율적인 건너뛰기를 활용하려면 <code translate="no">"DAAT_WAND"</code> 을 선택하세요.</p>
<p>컬렉션 변경 사항(예: 평균값)에 대한 동적 조정이 필요한 경우 <code translate="no">"TAAT_NAIVE"</code> 을 사용하세요.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">인덱스별 검색 매개변수</h3><p>다음 표에는 <a href="/docs/ko/sparse-inverted-index.md#Search-on-index">색인에서 검색할</a> 때 <code translate="no">search_params.params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th><p>매개변수</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 제안</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">drop_ratio_search</code></p></td>
     <td><p>검색 시 무시할 가장 작은 값의 비율로, 노이즈를 줄이는 데 도움이 됩니다.</p></td>
     <td><p>0.0에서 1.0 사이의 분수(예: 0.2는 가장 작은 20%의 값을 무시합니다.)</p></td>
     <td><p>쿼리 벡터의 희소성과 노이즈 수준에 따라 이 매개변수를 조정합니다. 예를 들어 0.2로 설정하면 검색 중에 더 중요한 값에 집중할 수 있어 정확도가 향상될 수 있습니다.</p></td>
   </tr>
</table>
