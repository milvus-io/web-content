---
id: hnsw-prq.md
title: HNSW_PRQ
summary: >-
  HNSW_PRQ는 계층적 탐색 가능한 작은 세계(HNSW) 그래프와 제품 잔여 정량화(PRQ)를 활용하여 인덱스 크기와 정확도 사이의 균형을
  미세하게 조정할 수 있는 고급 벡터 인덱싱 방법을 제공합니다. PRQ는 추가 정보를 캡처하기 위해 잔여 정량화(RQ) 단계를 도입함으로써
  기존의 제품 정량화(PQ)를 뛰어넘어 순수 PQ 기반 방식에 비해 정확도가 더 높거나 인덱스가 더 콤팩트해집니다. 하지만 추가 단계로 인해
  인덱스 구축 및 검색 시 계산 오버헤드가 높아질 수 있습니다.
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
    </button></h1><p><strong>HNSW_PRQ는</strong> 계층적 탐색 가능한 작은 세계(HNSW) 그래프와 제품 잔여 정량화(PRQ)를 활용하여 인덱스 크기와 정확도 사이의 균형을 미세하게 조정할 수 있는 고급 벡터 인덱싱 방법을 제공합니다. PRQ는 추가 정보를 캡처하기 위해 잔여 정량화(RQ) 단계를 도입함으로써 기존의 제품 정량화(PQ)를 뛰어넘어 순수 PQ 기반 방식에 비해 정확도가 더 높거나 인덱스가 더 콤팩트해집니다. 그러나 추가 단계로 인해 인덱스 구축 및 검색 시 계산 오버헤드가 높아질 수 있습니다.</p>
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
    </button></h2><p>HNSW_PRQ는 두 가지 색인 기술을 결합합니다: 빠른 그래프 기반 탐색을 위한 <strong>HSNW와</strong> 효율적인 벡터 압축을 위한 <strong>PRQ입니다</strong>.</p>
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
    </button></h3><p>HNSW는 각 노드가 데이터 세트의 벡터에 해당하는 다층 그래프를 구성합니다. 이 그래프에서 노드는 유사성에 따라 연결되므로 데이터 공간을 빠르게 탐색할 수 있습니다. 계층적 구조를 통해 검색 알고리즘이 후보 이웃을 좁힐 수 있으므로 고차원 공간에서 검색 프로세스를 크게 가속화할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/hnsw.md">HNSW를</a> 참조하세요.</p>
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
    </button></h3><p>PRQ는 두 가지 상호 보완적인 기술을 결합한 다단계 벡터 압축 방식입니다: PQ와 RQ입니다. 먼저 고차원 벡터를 더 작은 하위 벡터로 분할한 다음(PQ를 통해) 나머지 차이를 정량화(RQ를 통해)함으로써 PRQ는 원본 데이터를 간결하면서도 정확하게 표현합니다.</p>
<p>다음 그림은 그 작동 방식을 보여줍니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hnsw-prq.png" alt="Hnsw Prq" class="doc-image" id="hnsw-prq" />
   </span> <span class="img-wrapper"> <span>Hnsw Prq</span> </span></p>
<ol>
<li><p><strong>제품 정량화(PQ)</strong></p>
<p>이 단계에서는 원본 벡터를 더 작은 하위 벡터로 나누고 각 하위 벡터를 학습된 코드북에서 가장 가까운 중심점에 매핑합니다. 이 매핑은 데이터 크기를 크게 줄이지만 각 하위 벡터가 단일 중심점으로 근사화되기 때문에 약간의 반올림 오류가 발생합니다. 자세한 내용은 <a href="/docs/ko/ivf-pq.md#PQ">IVF_PQ를</a> 참조하세요.</p></li>
<li><p><strong>잔여 정량화(RQ)</strong></p>
<p>PQ 단계 이후, RQ는 추가 코드북을 사용하여 잔차(원본 벡터와 PQ 기반 근사치 사이의 차이)를 정량화합니다. 이 잔차는 일반적으로 훨씬 작기 때문에 저장 공간을 크게 늘리지 않고도 더 정밀하게 인코딩할 수 있습니다.</p>
<p><code translate="no">nrq</code> 매개변수는 이 잔차를 반복적으로 정량화할 횟수를 결정하여 압축 효율과 정확도 간의 균형을 미세 조정할 수 있습니다.</p></li>
<li><p><strong>최종 압축 표현</strong></p>
<p>RQ가 잔차의 정량화를 완료하면 PQ와 RQ의 정수 코드가 하나의 압축된 인덱스로 결합됩니다. RQ는 PQ만으로는 놓칠 수 있는 세밀한 디테일을 캡처함으로써 저장 공간을 크게 늘리지 않고도 정확도를 향상시킵니다. PQ와 RQ 간의 이러한 시너지가 바로 PRQ를 정의합니다.</p></li>
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
    </button></h3><p>HNSW와 PRQ를 결합한 <strong>HNSW_PRQ는</strong> HNSW의 빠른 그래프 기반 검색을 유지하면서 PRQ의 다단계 압축을 활용합니다. 워크플로는 다음과 같습니다:</p>
<ol>
<li><p><strong>데이터 압축:</strong> 각 벡터는 먼저 PQ를 통해 거친 표현으로 변환된 다음, 추가 세분화를 위해 RQ를 통해 잔여값을 정량화합니다. 그 결과 각 벡터를 나타내는 간결한 코드 세트가 생성됩니다.</p></li>
<li><p><strong>그래프 구성:</strong> 압축된 벡터(PQ 및 RQ 코드 모두 포함)는 HNSW 그래프를 구축하기 위한 기초를 형성합니다. 데이터가 압축된 형태로 저장되기 때문에 그래프에 필요한 메모리가 줄어들고 그래프 탐색 속도가 빨라집니다.</p></li>
<li><p><strong>후보 검색:</strong> 검색 중에 HNSW는 압축된 표현을 사용해 그래프를 탐색하고 후보 풀을 검색합니다. 이를 통해 고려해야 할 벡터의 수를 크게 줄일 수 있습니다.</p></li>
<li><p><strong>(선택 사항) 결과 구체화:</strong> 다음 매개변수를 기반으로 초기 후보 결과를 세분화하여 정확도를 높일 수 있습니다:</p>
<ul>
<li><p><code translate="no">refine</code>: 이 세분화 단계의 활성화 여부를 제어합니다. <code translate="no">true</code> 로 설정하면 시스템은 더 정밀한 표현 또는 압축되지 않은 표현을 사용하여 거리를 다시 계산합니다.</p></li>
<li><p><code translate="no">refine_type</code>: 세분화 중에 사용되는 데이터의 정밀도 수준을 지정합니다(예: SQ6, SQ8, BF16). <code translate="no">FP32</code> 와 같이 정밀도가 높을수록 더 정확한 결과를 얻을 수 있지만 더 많은 메모리가 필요합니다. 이는 원본 압축 데이터의 정밀도를 <code translate="no">sq_type</code>.</p></li>
<li><p><code translate="no">refine_k</code>: 배율 인자로 작용합니다. 예를 들어 상위 <em>k가</em> 100이고 <code translate="no">refine_k</code> 이 2인 경우 시스템은 상위 200개 후보의 순위를 다시 매기고 가장 좋은 100개를 반환하여 전반적인 정확도를 높입니다.</p></li>
</ul></li>
</ol>
<p>전체 매개변수 목록과 유효한 값은 <a href="/docs/ko/hnsw-prq.md#Index-params">색인</a> 매개변수를 참조하세요.</p>
<h2 id="Build-index" class="common-anchor-header">색인 만들기<button data-href="#Build-index" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus의 벡터 필드에 <code translate="no">HNSW_PRQ</code> 인덱스를 구축하려면 <code translate="no">add_index()</code> 방법을 사용하여 <code translate="no">index_type</code>, <code translate="no">metric_type</code> 및 인덱스에 대한 추가 매개 변수를 지정합니다.</p>
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
<p>이 구성에서는</p>
<ul>
<li><p><code translate="no">index_type</code>: 빌드할 인덱스 유형입니다. 이 예에서는 값을 <code translate="no">HNSW_PQ</code> 로 설정합니다.</p></li>
<li><p><code translate="no">metric_type</code>: 벡터 간의 거리를 계산하는 데 사용되는 메서드입니다. 지원되는 값은 <code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code> 입니다. 자세한 내용은 <a href="/docs/ko/metric.md">메트릭 유형을</a> 참조하세요.</p></li>
<li><p><code translate="no">params</code>: 인덱스 구축을 위한 추가 구성 옵션입니다. 자세한 내용은 <a href="/docs/ko/hnsw-prq.md#Index-building-params">인덱스 구축 파라미터를</a> 참조하세요.</p></li>
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
<p>이 구성에서는</p>
<ul>
<li><code translate="no">params</code>: 인덱스에서 검색을 위한 추가 구성 옵션입니다. 자세한 내용은 <a href="/docs/ko/hnsw-prq.md#Index-specific-search-params">인덱스별 검색 매개변수를</a> 참조하세요.</li>
</ul>
<h2 id="Index-params" class="common-anchor-header">색인 매개변수<button data-href="#Index-params" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 인덱스를 만들고 인덱스에서 검색을 수행하는 데 사용되는 매개변수에 대한 개요를 제공합니다.</p>
<h3 id="Index-building-params" class="common-anchor-header">색인 작성 매개변수<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 표에는 <a href="/docs/ko/hnsw-prq.md#Build-index">색인 작성</a> 시 <code translate="no">params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th></th>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 제안</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">M</code></p></td>
     <td><p>나가는 에지와 들어오는 에지를 모두 포함하여 그래프에서 각 노드가 가질 수 있는 최대 연결(또는 에지) 수입니다. 이 매개변수는 인덱스 구성과 검색 모두에 직접적인 영향을 줍니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [2, 2048]</p>
<p><strong>기본값</strong>: <code translate="no">30</code> (노드당 최대 30개의 나가는 에지와 30개의 들어오는 에지)</p></td>
     <td><p><code translate="no">M</code> 이 클수록 일반적으로 <strong>정확도는 높아지지만</strong> <strong>메모리 오버헤드가 증가하고</strong> <strong>인덱스 구축과 검색 속도가 모두 느려집니다</strong>. 차원이 높거나 높은 리콜이 중요한 데이터 세트의 경우 <code translate="no">M</code> 을 늘리는 것을 고려하세요.</p>
<p>메모리 사용량과 검색 속도가 주요 관심사인 경우 <code translate="no">M</code> 을 줄이는 것을 고려하세요.</p>
<p>대부분의 경우, 이 범위 내에서 값을 설정하는 것이 좋습니다: [5, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>인덱스 구성 중에 연결을 위해 고려되는 후보 이웃의 수. 새 요소마다 더 많은 후보 풀이 평가되지만 실제로 설정되는 최대 연결 수는 여전히 <code translate="no">M</code> 으로 제한됩니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, <em>int_max</em>]</p>
<p><strong>기본값입니다</strong>: <code translate="no">360</code></p></td>
     <td><p><code translate="no">efConstruction</code> 이 높을수록 일반적으로 더 많은 잠재적 연결이 탐색되므로 <strong>더 정확한 인덱스가</strong> 생성됩니다. 하지만 색인 <strong>시간이 길어지고</strong> 색인 구축 중 <strong>메모리 사용량이 증가</strong> 합니다. 특히 색인 시간이 덜 중요한 시나리오에서는 정확도를 높이려면 <code translate="no">efConstruction</code> 을 늘리는 것이 좋습니다.</p>
<p>리소스 제약이 우려되는 경우 인덱스 구축 속도를 높이려면 <code translate="no">efConstruction</code> 을 줄이는 것을 고려하세요.</p>
<p>대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [50, 500].</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>양자화 프로세스 중에 각 고차원 벡터를 나눌 하위 벡터(양자화에 사용)의 수입니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, 65536]</p>
<p><strong>기본값입니다</strong>: None</p></td>
     <td><p><code translate="no">m</code> 값이 클수록 정확도가 향상될 수 있지만 계산 복잡성과 메모리 사용량이 증가합니다. <code translate="no">m</code> 은 적절한 분해를 보장하기 위해 벡터 차원<em>(D)</em>의 제수여야 합니다. 일반적으로 권장되는 값은 <em>m = D/2입니다</em>.</p>
<p>대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [D/8, D].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>각 하위 벡터의 중심 인덱스를 압축된 형태로 표현하는 데 사용되는 비트 수입니다. 각 코드북의 크기를 직접 결정합니다. 각 코드북에는 <sup>2n비트의</sup> 중심이 포함됩니다. 예를 들어 <code translate="no">nbits</code> 을 8로 설정하면 각 하위 벡터는 8비트 중심 인덱스로 표시됩니다. 따라서 해당 하위 벡터에 대해 코드북에<sup>28개</sup> (256개)의 가능한 중심이 허용됩니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, 24]</p>
<p><strong>기본값입니다</strong>: <code translate="no">8</code></p></td>
     <td><p><code translate="no">nbits</code> 값이 클수록 코드북의 크기가 커져 원본 벡터를 더 정확하게 표현할 수 있습니다. 하지만 각 인덱스를 저장하는 데 더 많은 비트를 사용하므로 압축률이 떨어집니다. 대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">nrq</code></p></td>
     <td><p>RQ 단계에서 사용되는 잔여 서브퀀티저의 수를 제어합니다. 서브퀀타이저가 많을수록 압축률이 높아지지만 정보 손실이 더 많이 발생할 수 있습니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, 16]</p>
<p><strong>기본값입니다</strong>: <code translate="no">2</code></p></td>
     <td><p><code translate="no">nrq</code> 값이 클수록 잔여 하위 양자화 단계가 추가되어 원본 벡터를 더 정밀하게 재구성할 수 있습니다. 하지만 더 많은 서브퀀타이저를 저장하고 계산해야 하므로 인덱스 크기가 커지고 계산 오버헤드가 커집니다.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>검색 중에 세분화 단계를 적용할지 여부를 제어하는 부울 플래그입니다. 세분화에는 쿼리 벡터와 후보 사이의 정확한 거리를 계산하여 초기 결과의 순위를 다시 매기는 작업이 포함됩니다.</p></td>
     <td><p><strong>유형</strong>: 부울 <strong>범위</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p>
<p><strong>기본값입니다</strong>: <code translate="no">false</code></p></td>
     <td><p>높은 정확도가 필수적이며 약간 느린 검색 시간을 용인할 수 있는 경우 <code translate="no">true</code> 로 설정합니다. 속도가 우선이고 약간의 정확도 저하를 감수할 수 있는 경우 <code translate="no">false</code> 을 사용합니다.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>세분화 과정에서 사용되는 데이터의 정밀도를 결정합니다. 이 정밀도는 압축 벡터( <code translate="no">m</code> 및 <code translate="no">nbits</code> 매개변수에 의해 설정된 대로)보다 높아야 합니다.</p></td>
     <td><p><strong>Type</strong>: 문자열 <strong>범위</strong>:[ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]입니다.</p>
<p><strong>기본값</strong>: None</p></td>
     <td><p>더 높은 메모리 비용으로 정밀도를 최대화하려면 <code translate="no">FP32</code>, 더 나은 압축을 위해서는 <code translate="no">SQ6</code>/<code translate="no">SQ8</code> 을 사용하세요. <code translate="no">BF16</code> 과 <code translate="no">FP16</code> 은 균형 잡힌 대안을 제공합니다.</p></td>
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
    </button></h3><p>다음 표에는 <a href="/docs/ko/hnsw-prq.md#Search-on-index">색인에서 검색할</a> 때 <code translate="no">search_params.params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th></th>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 제안</p></th>
   </tr>
   <tr>
     <td><p>HNSW</p></td>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>가장 가까운 이웃을 검색하는 동안 검색 범위를 제어합니다. 얼마나 많은 노드를 방문하고 잠재적인 가장 가까운 이웃으로 평가할지 결정합니다. 
 이 매개변수는 검색 프로세스에만 영향을 미치며 그래프의 맨 아래 레이어에만 적용됩니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, <em>int_max</em>]</p>
<p><strong>기본값</strong>: <em>limit</em> (반환할 가장 가까운 이웃 TopK)</p></td>
     <td><p><code translate="no">ef</code> 이 클수록 일반적으로 더 많은 잠재적 이웃을 고려하므로 <strong>검색 정확도가 높아</strong> 집니다. 그러나 <strong>검색 시간도 증가</strong>합니다. 높은 회상률을 달성하는 것이 중요하고 검색 속도가 덜 중요한 경우에는 <code translate="no">ef</code> 을 늘리는 것이 좋습니다.</p>
<p>특히 약간의 정확도 감소를 감수할 수 있는 시나리오에서는 <code translate="no">ef</code> 을 줄여 검색 속도를 우선시하는 것이 좋습니다.</p>
<p>대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [K, 10K].</p></td>
   </tr>
   <tr>
     <td><p>PRQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>요청된 상위 K 결과와 비교하여 구체화(순위 재조정) 단계에서 추가로 검토할 후보자 수를 제어하는 배율입니다.</p></td>
     <td><p><strong>유형</strong>: 실수 <strong>범위</strong>: [1, <em>float_max</em>)</p>
<p><strong>기본값</strong>: 1</p></td>
     <td><p><code translate="no">refine_k</code> 값이 클수록 검색 회수율과 정확도가 향상되지만 검색 시간과 리소스 사용량도 증가합니다. 값이 1이면 구체화 프로세스에서 초기 상위 K 결과만 고려한다는 의미입니다.</p></td>
   </tr>
</table>
