---
id: hnsw-sq.md
title: HNSW_SQ
summary: >-
  HNSW_SQ는 계층 탐색이 가능한 작은 세계(HNSW) 그래프와 스칼라 양자화(SQ)를 결합하여 크기와 정확도 간의 균형을 제어할 수 있는
  고급 벡터 인덱싱 방법을 생성합니다. 이 인덱스 유형은 표준 HNSW에 비해 쿼리 처리 속도가 빠른 반면 인덱스 구축 시간이 약간
  증가합니다.
---
<h1 id="HNSWSQ" class="common-anchor-header">HNSW_SQ<button data-href="#HNSWSQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW_SQ는</strong> 계층적 탐색 가능한 작은 세계(HNSW) 그래프와 스칼라 양자화(SQ)를 결합하여 크기와 정확도 간의 균형을 제어할 수 있는 고급 벡터 인덱싱 방법을 생성합니다. 이 인덱스 유형은 표준 <a href="/docs/ko/hnsw.md">HNSW에</a> 비해 쿼리 처리 속도가 빠른 반면 인덱스 구축 시간이 약간 증가합니다.</p>
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
    </button></h2><p>HNSW_SQ는 두 가지 인덱싱 기술을 결합합니다: 빠른 그래프 기반 탐색을 위한 <strong>HNSW와</strong> 효율적인 벡터 압축을 위한 <strong>SQ입니다</strong>.</p>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>HNSW는 각 노드가 데이터 세트의 벡터에 해당하는 다층 그래프를 구성합니다. 이 그래프에서 노드는 유사성에 따라 연결되므로 데이터 공간을 빠르게 탐색할 수 있습니다. 계층적 구조를 통해 검색 알고리즘이 후보 이웃을 좁힐 수 있으므로 고차원 공간에서 검색 프로세스를 크게 가속화할 수 있습니다.</p>
<p>자세한 내용은 <a href="/docs/ko/hnsw.md">HNSW를</a> 참조하세요.</p>
<h3 id="SQ" class="common-anchor-header">SQ</h3><p>SQ는 벡터를 더 적은 비트로 표현하여 압축하는 방법입니다. 예를 들어:</p>
<ul>
<li><p><strong>SQ8은</strong> 8비트를 사용하여 값을 256레벨로 매핑합니다.  자세한 내용은 <a href="/docs/ko/ivf-sq8.md#SQ8">IVF_SQ8을</a> 참조하세요.</p></li>
<li><p><strong>SQ6은</strong> 6비트를 사용하여 각 부동소수점 값을 나타내므로 64개의 개별 레벨이 생성됩니다.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hnsw-sq.png" alt="Hnsw Sq" class="doc-image" id="hnsw-sq" />
   </span> <span class="img-wrapper"> <span>Hnsw Sq</span> </span></p>
<p>이 정밀도 감소는 데이터의 필수 구조를 유지하면서 메모리 사용량을 크게 줄이고 계산 속도를 높입니다.</p>
<h3 id="HNSW-+-SQ" class="common-anchor-header">HNSW + SQ</h3><p>HNSW_SQ는 HNSW와 SQ의 강점을 결합하여 효율적인 근사 근사 이웃 검색을 가능하게 합니다. 프로세스는 다음과 같이 작동합니다:</p>
<ol>
<li><p><strong>데이터 압축:</strong> SQ는 <code translate="no">sq_type</code> (예: SQ6 또는 SQ8)를 사용하여 벡터를 압축하여 메모리 사용량을 줄입니다. 이 압축은 정밀도를 낮출 수 있지만 시스템에서 더 큰 데이터 세트를 처리할 수 있게 해줍니다.</p></li>
<li><p><strong>그래프 구성:</strong> 압축된 벡터는 HNSW 그래프를 구축하는 데 사용됩니다. 데이터가 압축되기 때문에 결과 그래프의 크기가 작아지고 검색 속도가 빨라집니다.</p></li>
<li><p><strong>후보 검색:</strong> 쿼리 벡터가 제공되면 알고리즘은 압축된 데이터를 사용하여 HNSW 그래프에서 후보 이웃 풀을 빠르게 식별합니다.</p></li>
<li><p><strong>(선택 사항) 결과 구체화:</strong> 다음 매개변수를 기반으로 초기 후보 결과를 세분화하여 정확도를 높일 수 있습니다:</p>
<ul>
<li><p><code translate="no">refine</code>: 이 세분화 단계의 활성화 여부를 제어합니다. <code translate="no">true</code> 로 설정하면 시스템은 더 정밀한 표현 또는 압축되지 않은 표현을 사용하여 거리를 다시 계산합니다.</p></li>
<li><p><code translate="no">refine_type</code>: 세분화 중에 사용되는 데이터의 정밀도 수준을 지정합니다(예: SQ6, SQ8, BF16). <code translate="no">FP32</code> 와 같이 정밀도가 높을수록 더 정확한 결과를 얻을 수 있지만 더 많은 메모리가 필요합니다. 이는 원본 압축 데이터의 정밀도를 <code translate="no">sq_type</code>.</p></li>
<li><p><code translate="no">refine_k</code>: 배율 인자로 작용합니다. 예를 들어 상위 <em>k가</em> 100이고 <code translate="no">refine_k</code> 이 2인 경우 시스템은 상위 200개 후보의 순위를 다시 매기고 가장 좋은 100개를 반환하여 전반적인 정확도를 높입니다.</p></li>
</ul></li>
</ol>
<p>전체 매개변수 목록과 유효한 값은 <a href="/docs/ko/hnsw-sq.md#Index-params">색인</a> 매개변수를 참조하세요.</p>
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
    </button></h2><p>Milvus의 벡터 필드에 <code translate="no">HNSW_SQ</code> 인덱스를 구축하려면 <code translate="no">add_index()</code> 방법을 사용하여 <code translate="no">index_type</code>, <code translate="no">metric_type</code> 및 인덱스에 대한 추가 매개 변수를 지정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW_SQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span>, <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
        <span class="hljs-string">&quot;sq_type&quot;</span>: <span class="hljs-string">&quot;SQ6&quot;</span>, <span class="hljs-comment"># Scalar quantizer type</span>
        <span class="hljs-string">&quot;refine&quot;</span>: true, <span class="hljs-comment"># Whether to enable the refinement step</span>
        <span class="hljs-string">&quot;refine_type&quot;</span>: <span class="hljs-string">&quot;SQ8&quot;</span> <span class="hljs-comment"># Precision level of data used for refinement</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서는</p>
<ul>
<li><p><code translate="no">index_type</code>: 빌드할 인덱스 유형입니다. 이 예에서는 값을 <code translate="no">HNSW_SQ</code> 로 설정합니다.</p></li>
<li><p><code translate="no">metric_type</code>: 벡터 간의 거리를 계산하는 데 사용되는 메서드입니다. 지원되는 값은 <code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code> 입니다. 자세한 내용은 <a href="/docs/ko/metric.md">메트릭 유형을</a> 참조하세요.</p></li>
<li><p><code translate="no">params</code>: 인덱스 구축을 위한 추가 구성 옵션입니다. 자세한 내용은 <a href="/docs/ko/hnsw-sq.md#Index-building-params">인덱스 구축 파라미터를</a> 참조하세요.</p></li>
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
<li><code translate="no">params</code>: 인덱스에서 검색을 위한 추가 구성 옵션입니다. 자세한 내용은 <a href="/docs/ko/hnsw-sq.md#Index-specific-search-params">인덱스별 검색 매개변수를</a> 참조하세요.</li>
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
<h3 id="Index-building-params" class="common-anchor-header">색인 작성 매개변수</h3><p>다음 표에는 <a href="/docs/ko/hnsw-sq.md#share-PRYPd4xBJonkoZxPpNWcdnebnNh">색인 작성</a> 시 <code translate="no">params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
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
     <td><p><code translate="no">M</code> 이 클수록 일반적으로 <strong>정확도는 높아지지만</strong> <strong>메모리 오버헤드가 증가하고</strong> <strong>인덱스 구축과 검색 속도가 모두 느려집니다</strong>. 차원이 높은 데이터 세트나 높은 리콜이 중요한 경우 <code translate="no">M</code> 을 늘리는 것을 고려하세요.</p>
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
     <td><p>SQ</p></td>
     <td><p><code translate="no">sq_type</code></p></td>
     <td><p>벡터 압축을 위한 스칼라 양자화 방법을 지정합니다. 각 옵션은 압축과 정확도 간에 서로 다른 균형을 제공합니다:</p>
<ul>
<li><p><code translate="no">SQ6</code>: 6비트 정수를 사용하여 벡터를 인코딩합니다.</p></li>
<li><p><code translate="no">SQ8</code>: 8비트 정수를 사용하여 벡터를 인코딩합니다.</p></li>
<li><p><code translate="no">BF16</code>: Bfloat16 형식을 사용합니다.</p></li>
<li><p><code translate="no">FP16</code>: 표준 16비트 부동 소수점 형식을 사용합니다.</p></li>
</ul></td>
     <td><p><strong>유형</strong>: 문자열 <strong>범위</strong>: [ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code> ]</p>
<p><strong>기본값입니다</strong>: <code translate="no">SQ8</code></p></td>
     <td><p><code translate="no">sq_type</code> 선택은 특정 애플리케이션의 요구 사항에 따라 달라집니다. 메모리 효율성이 주요 관심사인 경우 <code translate="no">SQ6</code> 또는 <code translate="no">SQ8</code> 이 적합할 수 있습니다. 반면 정확성이 가장 중요한 경우 <code translate="no">BF16</code> 또는 <code translate="no">FP16</code> 을 선호할 수 있습니다.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>검색 중에 세분화 단계를 적용할지 여부를 제어하는 부울 플래그입니다. 구체화에는 쿼리 벡터와 후보 간의 정확한 거리를 계산하여 초기 결과의 순위를 재조정하는 작업이 포함됩니다.</p></td>
     <td><p><strong>유형</strong>: 부울 <strong>범위</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p>
<p><strong>기본값입니다</strong>: <code translate="no">false</code></p></td>
     <td><p>높은 정확도가 필수적이며 약간 느린 검색 시간을 용인할 수 있는 경우 <code translate="no">true</code> 로 설정합니다. 속도가 우선이고 약간의 정확도 저하를 감수할 수 있는 경우 <code translate="no">false</code> 을 사용합니다.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>세분화에 사용되는 데이터의 정밀도를 결정합니다. 이 정밀도는 압축된 벡터( <code translate="no">sq_type</code>)에 설정된 것보다 높아야 하며, 재랭크된 벡터의 정확도와 메모리 사용량에 영향을 미칩니다.</p></td>
     <td><p><strong>유형</strong>: 문자열 <strong>범위</strong>:[ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]입니다.</p>
<p><strong>기본값입니다</strong>: None</p></td>
     <td><p>더 높은 메모리 비용으로 정확도를 극대화하려면 <code translate="no">FP32</code>, 더 나은 압축을 원한다면 <code translate="no">SQ6</code>/<code translate="no">SQ8</code> 를 사용하세요. <code translate="no">BF16</code> 와 <code translate="no">FP16</code> 는 균형 잡힌 대안을 제공합니다.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">인덱스별 검색 매개변수</h3><p>다음 표에는 <a href="/docs/ko/hnsw-sq.md#share-DeFldzMQQoc2W4x2YiIcYUbqnne">색인에서 검색할</a> 때 <code translate="no">search_params.params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
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
     <td><p>SQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>요청된 상위 K 결과와 비교하여 정제 단계에서 얼마나 많은 추가 후보를 검토할지를 제어하는 배율 계수입니다.</p></td>
     <td><p><strong>유형</strong>: 실수 <strong>범위</strong>: [1, <em>float_max</em>)</p>
<p><strong>기본값</strong>: 1</p></td>
     <td><p><code translate="no">refine_k</code> 값이 클수록 검색 회수율과 정확도가 향상되지만 검색 시간과 리소스 사용량도 증가합니다. 값이 1이면 구체화 프로세스에서 초기 상위 K 결과만 고려한다는 의미입니다.</p></td>
   </tr>
</table>
