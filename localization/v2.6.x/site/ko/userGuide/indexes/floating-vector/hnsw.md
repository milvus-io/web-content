---
id: hnsw.md
title: HNSW
summary: >-
  HNSW 인덱스는 고차원 부동 벡터를 검색할 때 성능을 향상시킬 수 있는 그래프 기반 인덱싱 알고리즘입니다. 뛰어난 검색 정확도와 짧은 지연
  시간을 제공하는 반면, 계층적 그래프 구조를 유지하기 위해 높은 메모리 오버헤드를 필요로 합니다.
---
<h1 id="HNSW" class="common-anchor-header">HNSW<button data-href="#HNSW" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>HNSW</strong> 인덱스는 고차원 부동 벡터를 검색할 때 성능을 향상시킬 수 있는 <strong>그래프 기반</strong> 인덱싱 알고리즘입니다. <strong>뛰어난</strong> 검색 정확도와 <strong>짧은</strong> 지연 시간을 제공하는 반면, 계층적 그래프 구조를 유지하기 위해 <strong>높은</strong> 메모리 오버헤드를 필요로 합니다.</p>
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
    </button></h2><p>계층적 탐색 가능한 작은 세계(HNSW) 알고리즘은 줌 레벨이 다른 지도와 같은 다층 그래프를 구축합니다. <strong>하단 레이어에는</strong> 모든 데이터 포인트가 포함되며, <strong>상위 레이어는</strong> 하단 레이어에서 샘플링된 데이터 포인트의 하위 집합으로 구성됩니다.</p>
<p>이 계층 구조에서 각 계층은 데이터 포인트를 나타내는 노드를 포함하며, 각 노드는 근접성을 나타내는 가장자리로 연결됩니다. 상위 레이어는 대상에 빠르게 근접할 수 있는 장거리 점프를 제공하고, 하위 레이어는 가장 정확한 결과를 얻기 위한 세분화된 검색을 가능하게 합니다.</p>
<p>작동 방식은 다음과 같습니다:</p>
<ol>
<li><p><strong>진입 지점</strong>: 검색은 그래프에서 미리 결정된 노드인 최상위 레이어의 고정된 진입점에서 시작됩니다.</p></li>
<li><p><strong>탐욕스러운 검색</strong>: 알고리즘은 쿼리 벡터에 더 이상 가까워질 수 없을 때까지 현재 레이어에서 가장 가까운 이웃으로 욕심스럽게 이동합니다. 상위 레이어는 탐색 목적으로 사용되며, 하위 레이어에서 더 세밀한 검색을 위한 잠재적 진입점을 찾기 위한 거친 필터 역할을 합니다.</p></li>
<li><p><strong>레이어 하강</strong>: 현재 레이어에서 <strong>로컬 최소값에</strong> 도달하면 알고리즘은 미리 설정된 연결을 사용하여 하위 레이어로 점프 다운하여 탐욕스러운 검색을 반복합니다.</p></li>
<li><p><strong>최종</strong> <strong>다듬기</strong>: 이 프로세스는 최하위 레이어에 도달할 때까지 계속되며, 최종 세분화 단계에서는 가장 가까운 이웃을 식별합니다.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/hnsw.png" alt="HNSW" class="doc-image" id="hnsw" />
   </span> <span class="img-wrapper"> <span>HNSW</span> </span></p>
<p>HNSW의 성능은 그래프의 구조와 검색 동작을 모두 제어하는 몇 가지 주요 매개변수에 따라 달라집니다. 여기에는 다음이 포함됩니다:</p>
<ul>
<li><p><code translate="no">M</code>: 계층 구조의 각 수준에서 각 노드가 그래프에서 가질 수 있는 최대 에지 또는 연결 수입니다. <code translate="no">M</code> 이 높을수록 그래프가 더 조밀해지고 검색에 탐색할 경로가 많아져 리콜과 정확도가 높아지지만, 추가 연결로 인해 메모리가 더 많이 소모되고 삽입 시간이 느려집니다. 위 이미지에서 볼 수 있듯이 <strong>M = 5는</strong> HNSW 그래프의 각 노드가 최대 5개의 다른 노드에 직접 연결되어 있음을 나타냅니다. 이렇게 하면 노드가 다른 노드에 도달할 수 있는 경로가 여러 개 있는 적당한 밀도의 그래프 구조가 만들어집니다.</p></li>
<li><p><code translate="no">efConstruction</code>: 인덱스 구성 중에 고려되는 후보의 수입니다. <code translate="no">efConstruction</code> 이 높을수록 일반적으로 그래프 품질이 더 좋아지지만 구축하는 데 더 많은 시간이 필요합니다.</p></li>
<li><p><code translate="no">ef</code>: 검색 중에 평가되는 이웃의 수입니다. <code translate="no">ef</code> 을 늘리면 가장 가까운 이웃을 찾을 가능성은 높아지지만 검색 프로세스가 느려집니다.</p></li>
</ul>
<p>필요에 맞게 이러한 설정을 조정하는 방법에 대한 자세한 내용은 <a href="/docs/ko/hnsw.md#Index-params">색인 매개변수를</a> 참조하세요.</p>
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
    </button></h2><p>Milvus의 벡터 필드에 <code translate="no">HNSW</code> 인덱스를 구축하려면 <code translate="no">add_index()</code> 방법을 사용하여 <code translate="no">index_type</code>, <code translate="no">metric_type</code> 및 인덱스에 대한 추가 매개변수를 지정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Maximum number of neighbors each node can connect to in the graph</span>
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate neighbors considered for connection during index construction</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서는</p>
<ul>
<li><p><code translate="no">index_type</code>: 빌드할 인덱스 유형입니다. 이 예에서는 값을 <code translate="no">HNSW</code> 로 설정합니다.</p></li>
<li><p><code translate="no">metric_type</code>: 벡터 간의 거리를 계산하는 데 사용되는 메서드입니다. 지원되는 값은 <code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code> 입니다. 자세한 내용은 <a href="/docs/ko/metric.md">메트릭 유형을</a> 참조하세요.</p></li>
<li><p><code translate="no">params</code>: 인덱스 구축을 위한 추가 구성 옵션입니다.</p>
<ul>
<li><p><code translate="no">M</code>: 각 노드가 연결할 수 있는 최대 이웃 수입니다.</p></li>
<li><p><code translate="no">efConstruction</code>: 인덱스 구축 시 연결을 위해 고려되는 후보 이웃의 수입니다.</p></li>
</ul>
<p><code translate="no">HNSW</code> 인덱스에 사용할 수 있는 더 많은 구축 파라미터에 대해 알아보려면 <a href="/docs/ko/hnsw.md#Index-building-params">인덱스 구축 파라미터를</a> 참조하세요.</p></li>
</ul>
<p>인덱스 파라미터를 구성한 후에는 <code translate="no">create_index()</code> 메서드를 직접 사용하거나 <code translate="no">create_collection</code> 메서드에서 인덱스 파라미터를 전달하여 인덱스를 생성할 수 있습니다. 자세한 내용은 <a href="/docs/ko/create-collection.md">컬렉션 만들기를</a> 참조하세요.</p>
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
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서는</p>
<ul>
<li><p><code translate="no">params</code>: 색인에서 검색을 위한 추가 구성 옵션.</p>
<ul>
<li><code translate="no">ef</code>: 검색 시 고려할 이웃의 수입니다.</li>
</ul>
<p><code translate="no">HNSW</code> 인덱스에 사용할 수 있는 검색 매개변수에 대해 자세히 알아보려면 <a href="/docs/ko/hnsw.md#Index-specific-search-params">인덱스별 검색 매개변수를</a> 참조하세요.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">인덱스 구축 매개변수</h3><p>다음 표에는 <a href="/docs/ko/hnsw.md#Build-index">색인 작성</a> 시 <code translate="no">params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 제안</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">M</code></p></td>
     <td><p>나가는 에지와 들어오는 에지를 모두 포함하여 각 노드가 그래프에서 가질 수 있는 최대 연결(또는 에지) 수입니다. 이 매개변수는 인덱스 구성과 검색 모두에 직접적인 영향을 줍니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [2, 2048]</p><p><strong>기본값</strong>: <code translate="no">30</code> (노드당 최대 30개의 나가는 에지와 30개의 들어오는 에지)</p></td>
     <td><p><code translate="no">M</code> 값이 클수록 일반적으로 <strong>정확도는 높아지지만</strong> <strong>메모리 오버헤드가 증가하고</strong> <strong>인덱스 구축과 검색 속도가 느려집니다</strong>. 차원이 높은 데이터 세트나 높은 리콜이 중요한 경우 <code translate="no">M</code> 값을 늘리는 것을 고려하세요.</p><p>메모리 사용량과 검색 속도가 주요 관심사인 경우 <code translate="no">M</code> 을 낮추는 것이 좋습니다.</p><p>대부분의 경우, 이 범위 내에서 값을 설정하는 것이 좋습니다: [5, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>인덱스 구성 중에 연결을 위해 고려되는 후보 이웃의 수입니다. 새 요소마다 더 많은 후보 풀이 평가되지만 실제로 설정되는 최대 연결 수는 여전히 <code translate="no">M</code> 으로 제한됩니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, <em>int_max</em>]</p><p><strong>기본값입니다</strong>: <code translate="no">360</code></p></td>
     <td><p><code translate="no">efConstruction</code> 이 높을수록 일반적으로 더 많은 잠재적 연결이 탐색되므로 <strong>더 정확한 인덱스가</strong> 생성됩니다. 하지만 <strong>인덱싱 시간이 길어지고</strong> 구성 중에 <strong>메모리 사용량이 증가합니다</strong>. 특히 인덱싱 시간이 덜 중요한 시나리오에서는 정확도를 높이려면 <code translate="no">efConstruction</code> 을 늘리는 것이 좋습니다.</p><p>리소스 제약이 우려되는 경우 인덱스 구축 속도를 높이려면 <code translate="no">efConstruction</code> 을 줄이는 것을 고려하세요.</p><p>대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [50, 500].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">인덱스별 검색 매개변수</h3><p>다음 표에는 <a href="/docs/ko/hnsw.md#Search-on-index">색인에서 검색할</a> 때 <code translate="no">search_params.params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 제안</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>가장 가까운 이웃 검색 중 검색 범위를 제어합니다. 얼마나 많은 노드를 방문하고 잠재적인 가장 가까운 이웃으로 평가할지 결정합니다.  이 매개변수는 검색 프로세스에만 영향을 미치며 그래프의 맨 아래 레이어에만 적용됩니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, <em>int_max</em>]</p><p><strong>기본값</strong>: <em>limit</em> (반환할 가장 가까운 이웃 TopK)</p></td>
     <td><p><code translate="no">ef</code> 이 클수록 일반적으로 더 많은 잠재적 이웃을 고려하므로 <strong>검색 정확도가 높아</strong> 집니다. 하지만 <strong>검색 시간도 늘어</strong>납니다. 높은 회상률을 달성하는 것이 중요하고 검색 속도는 크게 신경 쓰지 않는 경우 <code translate="no">ef</code> 을 늘리는 것을 고려하세요.</p><p>특히 약간의 정확도 감소를 감수할 수 있는 시나리오에서는 <code translate="no">ef</code> 을 줄여 검색 속도를 우선시하는 것이 좋습니다.</p><p>대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [K, 10K].</p></td>
   </tr>
</table>
