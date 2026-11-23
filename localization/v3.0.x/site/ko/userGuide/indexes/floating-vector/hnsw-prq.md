---
id: hnsw-prq.md
title: HNSW_PRQ
summary: >-
  HNSW_PRQ는 계층적 탐색 가능 스몰 월드(HNSW) 그래프와 제품 잔차 양자화(PRQ)를 결합하여, 인덱스 크기와 정확도 간의 균형을
  정밀하게 조정할 수 있는 고급 벡터 인덱싱 방법을 제공합니다. PRQ는 추가 정보를 포착하기 위해 잔차 양자화(RQ) 단계를 도입함으로써
  기존의 제품 양자화(PQ)를 한 단계 발전시킨 것으로, 순수한 PQ 기반 방식에 비해 더 높은 정확도나 더 간결한 인덱스를 제공합니다.
  그러나 이러한 추가 단계로 인해 인덱스 구축 및 검색 시 계산 오버헤드가 증가할 수 있습니다.
---
<h1 id="HNSWPRQ" class="common-anchor-header">HNSW_PRQ<button data-href="#HNSWPRQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_PRQ는</strong> 계층적 탐색 가능 스몰 월드(HNSW) 그래프와 제품 잔차 양자화(PRQ)를 결합하여, 인덱스 크기와 정확도 간의 균형을 정밀하게 조정할 수 있는 고급 벡터 인덱싱 방법을 제공합니다. PRQ는 추가 정보를 포착하기 위해 잔차 양자화(RQ) 단계를 도입함으로써 기존의 제품 양자화(PQ)를 한 단계 발전시킨 것으로, 순수한 PQ 기반 방법에 비해 더 높은 정확도나 더 간결한 인덱스를 제공합니다. 그러나 이러한 추가 단계로 인해 인덱스 구축 및 검색 시 더 높은 계산 오버헤드가 발생할 수 있습니다.</p>
<h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>HNSW_PRQ는 빠른 그래프 기반 탐색을 위한 <strong>HSNW와</strong> 효율적인 벡터 압축을 위한 <strong>PRQ</strong>, 이 두 가지 인덱싱 기법을 결합합니다.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW는 각 노드가 데이터 세트의 벡터 하나에 대응하는 다층 그래프를 구성합니다. 이 그래프에서 노드는 유사성에 따라 연결되어 데이터 공간을 빠르게 탐색할 수 있게 합니다. 계층적 구조를 통해 검색 알고리즘이 후보 인접 노드를 좁힐 수 있어, 고차원 공간에서의 검색 속도가 크게 향상됩니다.</p>
<p>자세한 내용은 <a href="/docs/ko/hnsw.md">HNSW</a>를 참조하십시오.</p>
<h3 id="PRQ" class="common-anchor-header">PRQ<button data-href="#PRQ" class="anchor-icon" translate="no">
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
    </button></h3><p>PRQ는 PQ와 RQ라는 두 가지 상호 보완적인 기법을 결합한 다단계 벡터 압축 방식입니다. 먼저 고차원 벡터를 더 작은 하위 벡터로 분할한 후(PQ를 통해), 남은 차이를 양자화함으로써(RQ를 통해), PRQ는 원본 데이터를 간결하면서도 정확하게 표현합니다.</p>
<p>다음 그림은 그 작동 원리를 보여줍니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw-prq.png" alt="Hnsw Prq" class="doc-image" id="hnsw-prq" /> 
   <span>Hnsw Prq</span>
  
 </span></p>
<ol>
<li><p><strong>제품 양자화(PQ)</strong></p>
<p>이 단계에서는 원본 벡터를 더 작은 부분 벡터로 나누고, 각 부분 벡터를 학습된 코드북 내의 가장 가까운 중심점으로 매핑합니다. 이러한 매핑은 데이터 크기를 크게 줄여주지만, 각 부분 벡터가 단일 중심점으로 근사화되기 때문에 약간의 반올림 오차가 발생합니다. 자세한 내용은 <a href="/docs/ko/ivf-pq.md#PQ">IVF_PQ를</a> 참조하십시오.</p></li>
<li><p><strong>잔차 양자화(RQ)</strong></p>
<p>PQ 단계가 끝나면, RQ는 추가 코드북을 사용하여 잔차(원본 벡터와 PQ 기반 근사값 간의 차이)를 양자화합니다. 이 잔차는 일반적으로 훨씬 작기 때문에, 저장 공간을 크게 늘리지 않고도 더 정밀하게 인코딩할 수 있습니다.</p>
<p>매개변수 ` <code translate="no">nrq</code> `는 이 잔차를 반복적으로 양자화하는 횟수를 결정하며, 이를 통해 압축 효율과 정확도 간의 균형을 미세하게 조정할 수 있습니다.</p></li>
<li><p><strong>최종 압축 표현</strong></p>
<p>RQ가 잔차의 양자화를 완료하면, PQ와 RQ에서 생성된 정수 코드가 하나의 압축된 인덱스로 결합됩니다. RQ는 PQ만으로는 포착하지 못할 수 있는 미세한 세부 정보를 담아냄으로써, 저장 용량을 크게 늘리지 않으면서 정확도를 향상시킵니다. PQ와 RQ 간의 이러한 시너지 효과가 바로 PRQ를 정의하는 핵심입니다.</p></li>
</ol>
<h3 id="HNSW-+-PRQ" class="common-anchor-header">HNSW + PRQ<button data-href="#HNSW-+-PRQ" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW와 PRQ를 결합한 <strong>HNSW_PRQ는</strong> HNSW의 빠른 그래프 기반 검색 기능을 유지하면서 PRQ의 다단계 압축 이점을 활용합니다. 워크플로는 다음과 같습니다:</p>
<ol>
<li><p><strong>데이터 압축:</strong> 각 벡터는 먼저 PQ를 통해 거친 표현으로 변환된 후, RQ를 통해 잔차를 양자화하여 더욱 정교하게 다듬습니다. 그 결과 각 벡터를 나타내는 일련의 간결한 코드가 생성됩니다.</p></li>
<li><p><strong>그래프 구축:</strong> 압축된 벡터(PQ 및 RQ 코드 모두 포함)는 HNSW 그래프를 구축하는 기초가 됩니다. 데이터가 간결한 형태로 저장되므로 그래프에 필요한 메모리 용량이 줄어들고, 그래프 탐색 속도도 빨라집니다.</p></li>
<li><p><strong>후보 검색:</strong> 검색 과정에서 HNSW는 압축된 표현을 사용하여 그래프를 탐색하고 후보 집합을 검색합니다. 이를 통해 고려해야 할 벡터의 수가 획기적으로 줄어듭니다.</p></li>
<li><p><strong>(선택 사항) 결과 정제:</strong> 더 높은 정확도를 위해 다음 매개변수를 기반으로 초기 후보 결과를 정제할 수 있습니다:</p>
<ul>
<li><p><code translate="no">refine</code>: 이 정제 단계의 활성화 여부를 제어합니다. ‘ <code translate="no">true</code> ’로 설정하면 시스템은 더 높은 정밀도 또는 압축되지 않은 표현을 사용하여 거리를 재계산합니다.</p></li>
<li><p><code translate="no">refine_type</code>: 정제 과정에서 사용되는 데이터의 정밀도 수준을 지정합니다(예: SQ6, SQ8, BF16). ‘ <code translate="no">FP32</code> ’과 같은 더 높은 정밀도를 선택하면 더 정확한 결과를 얻을 수 있지만 더 많은 메모리가 필요합니다. 이 값은 원본 압축 데이터 세트의 정밀도보다 ‘ <code translate="no">sq_type</code> ’만큼 높아야 합니다.</p></li>
<li><p><code translate="no">refine_k</code>: 확대 계수 역할을 합니다. 예를 들어, 상위 <em>k가</em> 100이고 <code translate="no">refine_k</code> 가 2인 경우, 시스템은 상위 200개 후보를 재순위 지정하여 가장 우수한 100개를 반환함으로써 전반적인 정확도를 향상시킵니다.</p></li>
</ul></li>
</ol>
<p>매개변수 및 유효 값의 전체 목록은 <a href="/docs/ko/hnsw-prq.md#Index-params">‘Index params</a>’를 참조하십시오.</p>
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
    </button></h2><p>Milvus에서 벡터 필드에 대해 <code translate="no">HNSW_PRQ</code> 인덱스를 구축하려면, <code translate="no">add_index()</code> 메서드를 사용하여 <code translate="no">index_type</code>, <code translate="no">metric_type</code> 및 인덱스에 대한 추가 매개변수를 지정하십시오.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_PRQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">30</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">360</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">384</span>, 
        <span class="hljs-string">&quot;nbits&quot;</span>: <span class="hljs-number">8</span>,
        <span class="hljs-string">&quot;nrq&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서:</p>
<ul>
<li><p><code translate="no">index_type</code>: 생성할 인덱스의 유형입니다. 이 예제에서는 값을 <code translate="no">HNSW_PQ</code> 로 설정합니다.</p></li>
<li><p><code translate="no">metric_type</code>: 벡터 간의 거리를 계산하는 데 사용되는 방법입니다. 지원되는 값으로는 <code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code> 등이 있습니다. 자세한 내용은 <a href="/docs/ko/metric.md">‘메트릭 유형’을</a> 참조하십시오.</p></li>
<li><p><code translate="no">params</code>: 인덱스 구축을 위한 추가 구성 옵션입니다. 자세한 내용은 <a href="/docs/ko/hnsw-prq.md#Index-building-params">‘인덱스 구축 매개변수’를</a> 참조하십시오.</p></li>
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
    </button></h2><p>인덱스가 구축되고 엔티티가 삽입되면, 인덱스를 사용하여 유사도 검색을 수행할 수 있습니다.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Parameter controlling query time/accuracy trade-off</span>
        <span class="hljs-string">&quot;refine_k&quot;</span>: <span class="hljs-number">1</span> <span class="hljs-comment"># The magnification factor</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,  <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서는:</p>
<ul>
<li><code translate="no">params</code>: 인덱스 검색을 위한 추가 구성 옵션입니다. 자세한 내용은 <a href="/docs/ko/hnsw-prq.md#Index-specific-search-params">‘인덱스별 검색 매개변수’를</a> 참조하십시오.</li>
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
    </button></h2><p>이 섹션에서는 인덱스를 구축하고 인덱스를 대상으로 검색을 수행하는 데 사용되는 매개변수에 대한 개요를 제공합니다.</p>
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
    </button></h3><p>다음 표에는 <a href="/docs/ko/hnsw-prq.md#Build-index">인덱스를 생성할</a> 때 <code translate="no">params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th></th>
     <th><p>매개변수</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>튜닝 권장 사항</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>그래프에서 각 노드가 가질 수 있는 최대 연결 수(또는 에지 수)로, 발신 및 수신 에지를 모두 포함합니다.
이 매개변수는 인덱스 구축과 검색 모두에 직접적인 영향을 미칩니다.</p></td>
     <td><p><strong>유형</strong>: 정수
 <strong>범위</strong>: [2, 2048]</p>
<p><strong>기본값</strong>: <code translate="no">30</code> (노드당 최대 30개의 나가는 에지 및 30개의 들어오는 에지)</p></td>
     <td><p><code translate="no">M</code> 값이 클수록 일반적으로 <strong>정확도는 높아지지만</strong>, <strong>메모리 오버헤드가 증가하고</strong> <strong>인덱스 구축 및 검색 속도가 모두 느려집니다</strong>.
차원이 높은 데이터셋의 경우나 높은 리콜률이 중요한 경우에는 <code translate="no">M</code> 값을 늘리는 것을 고려해 보십시오.</p>
<p>메모리 사용량과 검색 속도가 가장 중요한 고려 사항인 경우에는 <code translate="no">M</code> 값을 줄이는 것을 고려해 보십시오.</p>
<p>대부분의 경우, [5, 100] 범위 내의 값을 설정하는 것이 좋습니다.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>인덱스 생성 시 연결 대상으로 고려되는 후보 이웃의 수입니다.
새로운 요소마다 더 많은 후보 풀이 평가되지만, 실제로 설정되는 연결의 최대 개수는 여전히 <code translate="no">M</code> 에 의해 제한됩니다.</p></td>
     <td><p><strong>유형</strong>: 정수
 <strong>범위</strong>: [1, <em>int_max</em>]</p>
<p><strong>기본값</strong>: <code translate="no">360</code></p></td>
     <td><p><code translate="no">efConstruction</code> 값이 높을수록 더 많은 잠재적 연결이 탐색되므로 일반적으로 <strong>더 정확한 인덱스가</strong> 생성됩니다. 그러나 이로 인해 <strong>인덱싱 시간이 길어지고</strong> 인덱스 생성 중 <strong>메모리 사용량이 증가합니다</strong>.
특히 인덱싱 시간이 그리 중요하지 않은 상황에서는 정확도를 높이기 위해 <code translate="no">efConstruction</code> 값을 늘리는 것을 고려해 보십시오.</p>
<p>리소스 제약이 우려되는 경우, 인덱스 생성 속도를 높이기 위해 ` <code translate="no">efConstruction</code> ` 값을 낮추는 것을 고려해 보십시오.</p>
<p>대부분의 경우, [50, 500] 범위 내의 값을 설정하는 것이 좋습니다.</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>양자화 과정에서 각 고차원 벡터를 분할하는 데 사용되는 (양자화에 사용되는) 하위 벡터의 수입니다.</p></td>
     <td><p><strong>유형</strong>: 정수
 <strong>범위</strong>: [1, 65536]</p>
<p><strong>기본값</strong>: 없음</p></td>
     <td><p><code translate="no">m</code> 값이 높을수록 정확도는 향상될 수 있지만, 계산 복잡도와 메모리 사용량도 증가합니다.
올바른 분해를 보장하려면 <code translate="no">m</code> 가 벡터 차원(<em>D</em>)의 약수여야 합니다. 일반적으로 권장되는 값은 <em>m = D/2입니다</em>.</p>
<p>대부분의 경우, [D/8, D] 범위 내의 값을 설정하는 것이 좋습니다.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>압축된 형태에서 각 부분 벡터의 중심점 인덱스를 표현하는 데 사용되는 비트 수입니다. 이는 각 코드북의 크기를 직접 결정합니다.
 각 코드북에는<sup>2n비트의</sup> 중심점이 포함됩니다. 예를 들어, <code translate="no">nbits</code> 가 8로 설정된 경우, 각 부분 벡터는 8비트 중심점 인덱스로 표현됩니다. 이를 통해 해당 부분 벡터에 대한 코드북에는<sup>2⁸</sup> (256)개의 가능한 중심점이 포함될 수 있습니다.</p></td>
     <td><p><strong>유형</strong>: 정수
 <strong>범위</strong>: [1, 24]</p>
<p><strong>기본값</strong>: <code translate="no">8</code></p></td>
     <td><p><code translate="no">nbits</code> 값이 높을수록 더 큰 코드북을 사용할 수 있어, 원본 벡터를 더 정확하게 표현할 가능성이 높아집니다. 그러나 이는 각 인덱스를 저장하는 데 더 많은 비트를 사용하게 되어 압축률이 낮아진다는 것을 의미하기도 합니다.
대부분의 경우, [1, 16] 범위 내의 값을 설정하는 것을 권장합니다.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nrq</code></p></td>
     <td><p>RQ 단계에서 사용되는 잔차 하위 양자화기의 수를 제어합니다. 하위 양자화기가 많을수록 더 높은 압축률을 달성할 수 있지만, 정보 손실이 더 커질 수도 있습니다.</p></td>
     <td><p><strong>유형</strong>: 정수
 <strong>범위</strong>: [1, 16]</p>
<p><strong>기본값</strong>: <code translate="no">2</code></p></td>
     <td><p><code translate="no">nrq</code> 값이 높을수록 잔차 하위 양자화 단계가 추가되어 원본 벡터를 더 정밀하게 재구성할 수 있습니다. 그러나 이는 더 많은 하위 양자화기를 저장하고 계산해야 함을 의미하므로, 인덱스 크기가 커지고 계산 오버헤드가 증가합니다.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>검색 중에 정밀화 단계가 적용될지 여부를 제어하는 부울 플래그입니다. 정밀화 단계에서는 쿼리 벡터와 후보 벡터 간의 정확한 거리를 계산하여 초기 결과의 순위를 재조정합니다.</p></td>
     <td><p><strong>유형</strong>: 부울
 <strong>범위</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p>
<p><strong>기본값</strong>: <code translate="no">false</code></p></td>
     <td><p>높은 정확도가 필수적이며 검색 시간이 약간 느려지는 것은 감수할 수 있는 경우 <code translate="no">true</code> 로 설정하십시오. 속도가 우선이며 정확도에서 약간의 타협이 허용되는 경우 <code translate="no">false</code> 를 사용하십시오.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>정제 과정에서 사용되는 데이터의 정밀도를 결정합니다.
이 정밀도는 압축된 벡터의 정밀도( <code translate="no">m</code> 및 <code translate="no">nbits</code> 매개변수로 설정된 값)보다 높아야 합니다.</p></td>
     <td><p><strong>유형</strong>: 문자열
 <strong>범위</strong>: [ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p>
<p><strong>기본값</strong>: 없음</p></td>
     <td><p>더 높은 메모리 비용을 감수하고 최대 정밀도를 얻으려면 <code translate="no">FP32</code> 을, 더 나은 압축률을 원한다면 <code translate="no">SQ6</code> 또는<code translate="no">SQ8</code> 을 사용하십시오. <code translate="no">BF16</code> 과 <code translate="no">FP16</code> 은 균형 잡힌 대안을 제공합니다.</p></td>
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
    </button></h3><p>다음 표는 <a href="/docs/ko/hnsw-prq.md#Search-on-index">인덱스에서 검색할</a> 때 <code translate="no">search_params.params</code> 에서 구성할 수 있는 매개변수를 나열합니다.</p>
<table>
   <tr>
     <th></th>
     <th><p>매개변수</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 권장 사항</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>가장 가까운 이웃 검색 시 검색 범위를 제어합니다. 이 매개변수는 잠재적인 가장 가까운 이웃으로 방문 및 평가될 노드의 수를 결정합니다. 
 이 매개변수는 검색 과정에만 영향을 미치며, 그래프의 최하위 계층에만 적용됩니다.</p></td>
     <td><p><strong>유형</strong>: 정수
 <strong>범위</strong>: [1, <em>int_max</em>]</p>
<p><strong>기본값</strong>: <em>limit</em> (반환할 상위 K개 가장 가까운 이웃)</p></td>
     <td><p><code translate="no">ef</code> 값이 클수록 더 많은 잠재적 이웃이 고려되므로 일반적으로 <strong>검색 정확도가 높아집니다</strong>. 그러나 이로 인해 <strong>검색 시간도 증가합니다</strong>.
 높은 리콜을 달성하는 것이 중요하고 검색 속도는 크게 신경 쓰지 않아도 되는 경우, <code translate="no">ef</code> 값을 늘리는 것을 고려해 보십시오.</p>
<p>특히 정확도가 약간 낮아져도 괜찮은 상황에서는 더 빠른 검색을 우선시하기 위해 <code translate="no">ef</code> 값을 줄이는 것을 고려해 보십시오.</p>
<p>대부분의 경우, [K, 10K] 범위 내의 값을 설정하는 것이 좋습니다.</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>요청된 상위 K개 결과에 비해, 정제(재순위 지정) 단계에서 검토되는 추가 후보의 수를 제어하는 확대 계수입니다.</p></td>
     <td><p><strong>유형</strong>: 부동 소수점
 <strong>범위</strong>: [1, <em>float_max</em>)</p>
<p><strong>기본값</strong>: 1</p></td>
     <td><p><code translate="no">refine_k</code> 의 값이 높을수록 리콜과 정확도는 향상될 수 있지만, 검색 시간과 리소스 사용량도 증가합니다. 값이 1이면 정제 과정에서 초기 상위 K개 결과만 고려함을 의미합니다.</p></td>
   </tr>
</table>
