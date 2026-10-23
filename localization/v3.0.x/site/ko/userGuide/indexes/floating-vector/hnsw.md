---
id: hnsw.md
title: HNSW
summary: >-
  HNSW 인덱스는 고차원 부동소수점 벡터를 검색할 때 성능을 향상시킬 수 있는 그래프 기반 인덱싱 알고리즘입니다. 이 알고리즘은 뛰어난 검색
  정확도와 낮은 지연 시간을 제공하지만, 계층적 그래프 구조를 유지하기 위해 많은 메모리 오버헤드가 필요합니다.
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
    </button></h1><p><strong>HNSW</strong> 인덱스는 고차원 부동소수점 벡터를 검색할 때 성능을 향상시킬 수 있는 <strong>그래프 기반</strong> 인덱싱 알고리즘입니다. 이 알고리즘은 <strong>뛰어난</strong> 검색 정확도와 <strong>낮은</strong> 지연 시간을 제공하지만, 계층적 그래프 구조를 유지하기 위해 <strong>많은 메모리</strong> 오버헤드가 필요합니다.</p>
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
    </button></h2><p>계층적 탐색 가능 소세계(HNSW) 알고리즘은 다양한 확대/축소 수준을 가진 지도와 유사한 다층 그래프를 구축합니다. <strong>최하위 계층에는</strong> 모든 데이터 포인트가 포함되며, <strong>상위 계층은</strong> 하위 계층에서 샘플링된 데이터 포인트의 부분 집합으로 구성됩니다.</p>
<p>이 계층 구조에서 각 계층은 데이터 포인트를 나타내는 노드로 구성되며, 노드 간에는 근접성을 나타내는 에지로 연결됩니다. 상위 계층은 대상에 빠르게 접근할 수 있도록 장거리 이동을 제공하는 반면, 하위 계층은 가장 정확한 결과를 얻기 위한 세밀한 검색을 가능하게 합니다.</p>
<p>작동 원리는 다음과 같습니다.</p>
<ol>
<li><p><strong>시작점</strong>: 검색은 최상위 계층의 고정된 시작점, 즉 그래프 내에서 미리 정해진 노드에서 시작됩니다.</p></li>
<li><p><strong>탐욕적 탐색</strong>: 알고리즘은 쿼리 벡터에 더 이상 가까워질 수 없을 때까지 현재 계층에서 가장 가까운 이웃으로 탐욕적으로 이동합니다. 상위 계층은 탐색 기능을 수행하며, 하위 계층에서 이루어질 정밀한 탐색을 위한 잠재적 진입점을 찾아내는 거친 필터 역할을 합니다.</p></li>
<li><p><strong>계층 하강</strong>: 현재 계층에서 <strong>국소 최소값에</strong> 도달하면, 알고리즘은 미리 설정된 연결을 사용하여 하위 계층으로 이동한 후 탐욕적 검색을 반복합니다.</p></li>
<li><p><strong>최종</strong> <strong>정제</strong>: 이 과정은 최하위 계층에 도달할 때까지 계속되며, 최하위 계층에서는 최종 정제 단계를 통해 가장 가까운 이웃을 식별합니다.</p></li>
</ol>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw.png" alt="HNSW" class="doc-image" id="hnsw" /> 
   <span>HNSW</span>
  
 </span></p>
<p>HNSW의 성능은 그래프의 구조와 탐색 동작을 모두 제어하는 몇 가지 핵심 매개변수에 따라 달라집니다. 여기에는 다음이 포함됩니다:</p>
<ul>
<li><p><code translate="no">M</code>: 계층 구조의 각 레벨에서 그래프 내 각 노드가 가질 수 있는 가장 많은 가장자리 또는 연결 수입니다. 최대 연결 수( <code translate="no">M</code> )가 높을수록 그래프가 더 조밀해지며, 탐색할 경로가 늘어나 리콜과 정확도가 향상됩니다. 다만 추가적인 연결로 인해 메모리 소비가 증가하고 삽입 시간이 느려집니다. 위 그림에서 볼 수 있듯이, <strong>M = 5는</strong> HNSW 그래프의 각 노드가 최대 5개의 다른 노드와 직접 연결되어 있음을 나타냅니다. 이는 노드들이 다른 노드에 도달할 수 있는 여러 경로를 갖는 적당히 조밀한 그래프 구조를 형성합니다.</p></li>
<li><p><code translate="no">efConstruction</code>: 인덱스 구축 시 고려되는 후보 노드의 수입니다. <code translate="no">efConstruction</code> 값이 높을수록 일반적으로 더 높은 품질의 그래프가 생성되지만, 구축에 더 많은 시간이 소요됩니다.</p></li>
<li><p><code translate="no">ef</code>: 검색 중에 평가되는 이웃 노드의 수입니다. <code translate="no">ef</code> 값을 높이면 가장 가까운 이웃을 찾을 확률은 높아지지만, 검색 속도는 느려집니다.</p></li>
</ul>
<p>사용자의 필요에 맞게 이러한 설정을 조정하는 방법에 대한 자세한 내용은 <a href="/docs/ko/hnsw.md#Index-params">‘인덱스 매개변수</a>(Index params)’를 참조하십시오.</p>
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
    </button></h2><p>이 예제에서는 ‘ <code translate="no">client</code> ’라는 이름의 연결된 클라이언트와 ‘ <code translate="no">your_collection_name</code> ’라는 이름의 기존 컬렉션을 사용합니다. 이 컬렉션에는 ‘ <code translate="no">your_vector_field_name</code> ’라는 5차원 벡터 필드가 있습니다.</p>
<p><code translate="no">add_index()</code> 를 사용하여 인덱스 매개 변수를 정의한 다음, <code translate="no">create_index()</code> 를 사용하여 인덱스를 생성합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = client.prepare_index_params()

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

client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서:</p>
<ul>
<li><p><code translate="no">index_type</code>: 생성할 인덱스의 유형입니다. 이 예제에서는 값을 <code translate="no">HNSW</code> 로 설정합니다.</p></li>
<li><p><code translate="no">metric_type</code>: 벡터 간의 거리를 계산하는 데 사용되는 방법입니다. 지원되는 값으로는 <code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code> 등이 있습니다. 자세한 내용은 <a href="/docs/ko/metric.md">‘메트릭 유형’을</a> 참조하십시오.</p></li>
<li><p><code translate="no">params</code>: 인덱스 생성을 위한 추가 구성 옵션입니다.</p>
<ul>
<li><p><code translate="no">M</code>: 각 노드가 연결할 수 있는 이웃의 최대 수입니다.</p></li>
<li><p><code translate="no">efConstruction</code>: 인덱스 구축 시 연결 대상으로 고려되는 후보 이웃의 수입니다.</p></li>
</ul>
<p>이 예제에서는 <code translate="no">M=64</code> 및 <code translate="no">efConstruction=100</code> 를 튜닝 오버라이드로 설정합니다. 기본값 및 허용 범위에 대해서는 <a href="/docs/ko/hnsw.md#Index-building-params">‘인덱스 생성 매개변수’를</a> 참조하십시오.</p></li>
</ul>
<p>컬렉션과 해당 인덱스를 함께 생성하려면 인덱스 매개변수를 <code translate="no">create_collection()</code> 에 전달하십시오. 자세한 내용은 <a href="/docs/ko/create-collection.md">‘컬렉션 생성’을</a> 참조하십시오.</p>
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
    </button></h2><p>인덱스를 구축하고 엔티티를 삽입한 후, 컬렉션을 불러와 벡터 필드를 검색합니다. 일반적인 kNN 검색의 경우, ` <code translate="no">ef</code> `을 최소한 ` <code translate="no">limit</code>`으로 설정하십시오.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;ef&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of neighbors to consider during the search</span>
    }
}

client.load_collection(collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>)

res = client.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">10</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서:</p>
<ul>
<li><p><code translate="no">params</code>: 인덱스 검색을 위한 추가 구성 옵션.</p>
<ul>
<li><code translate="no">ef</code>: 검색 시 고려할 이웃의 수.</li>
</ul>
<p><code translate="no">HNSW</code> 인덱스에서 사용할 수 있는 검색 매개변수에 대한 자세한 내용은 <a href="/docs/ko/hnsw.md#Index-specific-search-params">‘인덱스별 검색 매개변수’를</a> 참조하십시오.</p></li>
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
    </button></h2><p>아래 표에는 인덱스 구축 및 검색에 사용되는 매개변수가 나열되어 있습니다. 생략한 매개변수의 경우 서버 설정을 통해 기본값을 재정의할 수 있습니다.</p>
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
    </button></h3><p>다음 표에는 <a href="/docs/ko/hnsw.md#Build-index">인덱스를 생성할</a> 때 <code translate="no">params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th><p>매개변수</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 권장 사항</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">M</code></p></td>
     <td><p>그래프에서 각 노드가 가질 수 있는 최대 연결 수(또는 에지 수)로, 발신 및 수신 에지를 모두 포함합니다. 이 매개변수는 인덱스 구축과 검색 모두에 직접적인 영향을 미칩니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [2, 2048]</p><p><strong>기본값</strong>: <code translate="no">30</code> (노드당 최대 30개의 나가는 에지 및 30개의 들어오는 에지)</p></td>
     <td><p><code translate="no">M</code> 값이 클수록 일반적으로 <strong>정확도는 높아지지만</strong>, <strong>메모리 오버헤드가 증가하고</strong> <strong>인덱스 구축 및 검색 속</strong>도가 <strong>모두 느려집니다</strong>. 고차원 데이터셋을 처리하거나 높은 리콜률이 중요한 경우에는 <code translate="no">M</code> 값을 늘리는 것을 고려하십시오.</p><p>메모리 사용량과 검색 속도가 가장 중요한 고려 사항인 경우에는 <code translate="no">M</code> 값을 줄이는 것을 고려해 보십시오.</p><p>대부분의 경우, [5, 100] 범위 내의 값을 설정하는 것이 좋습니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>인덱스 생성 시 연결 대상으로 고려되는 후보 이웃의 수입니다. 새로운 요소마다 더 많은 후보 풀이 평가되지만, 실제로 설정되는 연결의 최대 개수는 여전히 <code translate="no">M</code> 에 의해 제한됩니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, <em>int_max</em>]</p><p><strong>기본값</strong>: <code translate="no">360</code></p></td>
     <td><p><code translate="no">efConstruction</code> 값이 높을수록 더 많은 잠재적 연결이 탐색되므로 일반적으로 <strong>더 정확한 인덱스가</strong> 생성됩니다. 그러나 이는 <strong>인덱싱 시간이 길어지고</strong> 인덱스 생성 중 <strong>메모리 사용량이 증가하는 결과로</strong> 이어집니다. 특히 인덱싱 시간이 그리 중요하지 않은 상황에서는 정확도를 높이기 위해 <code translate="no">efConstruction</code> 값을 늘리는 것을 고려해 보십시오.</p><p>리소스 제약이 우려되는 경우, 인덱스 생성 속도를 높이기 위해 ` <code translate="no">efConstruction</code> ` 값을 낮추는 것을 고려해 보십시오.</p><p>대부분의 경우, [50, 500] 범위 내의 값을 설정하는 것이 좋습니다.</p></td>
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
    </button></h3><p>다음 표에는 <a href="/docs/ko/hnsw.md#Search-on-index">인덱스에서 검색할</a> 때 <code translate="no">search_params.params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th><p>매개 변수</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 권장 사항</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>가장 가까운 이웃 검색 시 검색 범위를 제어합니다. 이 매개변수는 잠재적인 가장 가까운 이웃으로 방문 및 평가될 노드의 수를 결정합니다. 이 매개변수는 검색 프로세스에만 영향을 미치며 그래프의 최하위 계층에만 적용됩니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, <em>int_max</em>]</p><p><strong>기본값</strong>: 일반 kNN 검색의 경우 <code translate="no">max(limit, 16)</code>, 범위 검색의 경우 <code translate="no">512</code>.</p><p>일반 kNN 검색의 경우, 명시적으로 지정된 <code translate="no">ef</code> 값은 <code translate="no">limit</code> (반환할 가장 가까운 이웃의 수)보다 크거나 같아야 합니다.</p></td>
     <td><p><code translate="no">ef</code> 값이 클수록 더 많은 잠재적 이웃이 고려되므로 일반적으로 <strong>검색 정확도가 높아집니다</strong>. 그러나 이로 인해 <strong>검색 시간도 증가합니다</strong>. 높은 리콜률을 달성하는 것이 중요하고 검색 속도는 크게 신경 쓰지 않아도 되는 경우에는 <code translate="no">ef</code> 값을 늘리는 것을 고려해 보십시오.</p><p>특히 정확도가 약간 낮아져도 괜찮은 상황에서는 더 빠른 검색을 우선시하기 위해 <code translate="no">ef</code> 값을 줄이는 것을 고려해 보십시오.</p><p>대부분의 경우, [K, 10K] 범위 내의 값을 설정하는 것을 권장합니다.</p></td>
   </tr>
</table>
