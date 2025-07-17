---
id: scann.md
title: SCANN
summary: >-
  Google의 ScaNN 라이브러리를 기반으로 하는 Milvus의 SCANN 인덱스는 벡터 유사도 검색의 확장 문제를 해결하도록 설계되어
  대부분의 검색 알고리즘에서 일반적으로 문제가 되는 대규모 데이터 세트에서도 속도와 정확성 사이의 균형을 유지합니다.
---
<h1 id="SCANN" class="common-anchor-header">SCANN<button data-href="#SCANN" class="anchor-icon" translate="no">
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
    </button></h1><p>Google의 <a href="https://github.com/google-research/google-research/blob/master/scann%2FREADME.md">ScaNN</a> 라이브러리를 기반으로 하는 Milvus의 <code translate="no">SCANN</code> 인덱스는 대부분의 검색 알고리즘에서 일반적으로 문제가 되는 대규모 데이터 세트에서도 속도와 정확성 사이의 균형을 유지하면서 벡터 유사도 검색의 확장 문제를 해결하도록 설계되었습니다.</p>
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
    </button></h2><p>ScaNN은 벡터 검색의 가장 큰 과제 중 하나인 데이터 세트가 점점 더 커지고 복잡해지더라도 고차원 공간에서 가장 관련성이 높은 벡터를 효율적으로 찾는 문제를 해결하기 위해 만들어졌습니다. 이 아키텍처는 벡터 검색 프로세스를 여러 단계로 세분화합니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/scann.png" alt="Scann" class="doc-image" id="scann" />
   </span> <span class="img-wrapper"> <span>스캔</span> </span></p>
<ol>
<li><p><strong>파티셔닝</strong>: 데이터 세트를 클러스터로 나눕니다. 이 방법은 전체 데이터 세트를 스캔하는 대신 관련 데이터 하위 집합에만 집중하여 검색 공간을 좁혀 시간과 처리 리소스를 절약합니다. ScaNN은 종종 <a href="https://zilliz.com/blog/k-means-clustering">k-평균과</a> 같은 클러스터링 알고리즘을 사용하여 클러스터를 식별하므로 유사도 검색을 보다 효율적으로 수행할 수 있습니다.</p></li>
<li><p><strong>정량화</strong>: ScaNN은 파티셔닝 후 이방성 <a href="https://arxiv.org/abs/1908.10396">벡터 양자화라는</a> 양자화 프로세스를 적용합니다. 기존의 양자화는 원본과 압축된 벡터 사이의 전체 거리를 최소화하는 데 초점을 맞추기 때문에, 직접 거리가 아닌 벡터의 내적 곱에 의해 유사성이 결정되는 <a href="https://papers.nips.cc/paper/5329-asymmetric-lsh-alsh-for-sublinear-time-maximum-inner-product-search-mips.pdf">최대 내적 곱 검색(MIPS)</a>과 같은 작업에는 적합하지 않습니다. 대신 이방성 양자화는 벡터 사이의 병렬 구성 요소 또는 정확한 내적 곱을 계산하는 데 가장 중요한 부분을 보존하는 데 우선순위를 둡니다. 이 접근 방식은 압축된 벡터를 쿼리에 신중하게 정렬함으로써 높은 MIPS 정확도를 유지하여 더 빠르고 정확한 유사도 검색을 가능하게 합니다.</p></li>
<li><p><strong>재랭크</strong>: 리랭크 단계는 ScaNN이 파티셔닝 및 양자화 단계의 검색 결과를 미세 조정하는 마지막 단계입니다. 이 리랭킹은 상위 후보 벡터에 정밀한 내적 곱 계산을 적용하여 최종 결과의 정확도를 높입니다. 리랭킹은 초기 필터링과 클러스터링이 거친 레이어 역할을 하는 고속 추천 엔진이나 이미지 검색 애플리케이션에서 매우 중요하며, 최종 단계에서는 가장 관련성이 높은 결과만 사용자에게 반환되도록 보장합니다.</p></li>
</ol>
<p><code translate="no">SCANN</code> 의 성능은 속도와 정확도 사이의 균형을 미세 조정할 수 있는 두 가지 주요 매개변수에 의해 제어됩니다:</p>
<ul>
<li><p><code translate="no">with_raw_data</code>: 원본 벡터 데이터를 양자화된 표현과 함께 저장할지 여부를 제어합니다. 이 매개변수를 활성화하면 재랭킹 시 정확도가 향상되지만 저장 공간이 증가합니다.</p></li>
<li><p><code translate="no">reorder_k</code>: 최종 순위 재조정 단계에서 얼마나 많은 후보를 정제할지 결정합니다. 값이 클수록 정확도는 향상되지만 검색 대기 시간이 늘어납니다.</p></li>
</ul>
<p>특정 사용 사례에 맞게 이러한 매개변수를 최적화하는 방법에 대한 자세한 지침은 <a href="/docs/ko/scann.md#Index-params">색인 매개</a>변수를 참조하세요.</p>
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
    </button></h2><p>Milvus의 벡터 필드에 <code translate="no">SCANN</code> 인덱스를 구축하려면 <code translate="no">add_index()</code> 방법을 사용하여 <code translate="no">index_type</code>, <code translate="no">metric_type</code> 및 인덱스에 대한 추가 매개변수를 지정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;SCANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span></span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;with_raw_data&quot;</span>: <span class="hljs-literal">True</span>, <span class="hljs-comment"># Whether to hold raw data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서는</p>
<ul>
<li><p><code translate="no">index_type</code>: 빌드할 인덱스 유형입니다. 이 예에서는 값을 <code translate="no">SCANN</code> 로 설정합니다.</p></li>
<li><p><code translate="no">metric_type</code>: 벡터 간의 거리를 계산하는 데 사용되는 메서드입니다. 지원되는 값은 <code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code> 입니다. 자세한 내용은 <a href="/docs/ko/metric.md">메트릭 유형을</a> 참조하세요.</p></li>
<li><p><code translate="no">params</code>: 인덱스 구축을 위한 추가 구성 옵션입니다.</p>
<ul>
<li><code translate="no">with_raw_data</code>: 양자화된 표현과 함께 원본 벡터 데이터를 저장할지 여부입니다.</li>
</ul>
<p><code translate="no">SCANN</code> 인덱스에 사용할 수 있는 더 많은 구축 매개변수에 대해 알아보려면 <a href="/docs/ko/scann.md#Index-building-params">인덱스 구축</a> 매개변수를 참조하세요.</p></li>
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
        <span class="hljs-string">&quot;reorder_k&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of candidates to refine</span>
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
<li><code translate="no">reorder_k</code>: 순위 재조정 단계에서 구체화할 후보의 수입니다.</li>
</ul>
<p><code translate="no">SCANN</code> 인덱스에 사용할 수 있는 검색 매개변수에 대해 자세히 알아보려면 <a href="/docs/ko/scann.md#Index-specific-search-params">인덱스별 검색 매개변수를</a> 참조하세요.</p></li>
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
    </button></h2><p>이 섹션에서는 인덱스 구축 및 인덱스에서 검색을 수행하는 데 사용되는 매개변수에 대한 개요를 제공합니다.</p>
<h3 id="Index-building-params" class="common-anchor-header">인덱스 구축 매개변수</h3><p>다음 표에는 <a href="/docs/ko/scann.md#Build-index">색인 작성</a> 시 <code translate="no">params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 제안</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">with_raw_data</code></p></td>
     <td><p>양자화된 표현과 함께 원본 벡터 데이터를 저장할지 여부입니다. 활성화하면 양자화된 근사치 대신 원본 벡터를 사용하여 순위 재지정 단계에서 보다 정확한 유사도 계산을 수행할 수 있습니다.</p></td>
     <td><p><strong>유형</strong>: 부울 <strong>범위</strong>: <code translate="no">true</code>, <code translate="no">false</code></p>
<p><strong>기본값입니다</strong>: <code translate="no">true</code></p></td>
     <td><p><strong>검색 정확도를 높이고</strong> 저장 공간이 크게 문제가 되지 않는 경우 <code translate="no">true</code> 로 설정합니다. 원본 벡터 데이터를 사용하면 순위를 재조정하는 동안 보다 정확한 유사도 계산이 가능합니다. <code translate="no">false</code> 으로 설정하면 특히 대규모 데이터 세트의 경우 <strong>스토리지 오버헤드와</strong> 메모리 사용량을 <strong>줄일</strong> 수 있습니다. 그러나 순위 재지정 단계에서 양자화된 벡터를 사용하므로 검색 정확도가 약간 낮아질 수 있습니다.</p>
<p><strong>권장</strong>: 정확도가 중요한 프로덕션 애플리케이션에서는 <code translate="no">true</code> 을 사용하세요.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">색인별 검색 매개변수</h3><p>다음 표에는 <a href="/docs/ko/scann.md#Search-on-index">색인에서 검색할</a> 때 <code translate="no">search_params.params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 제안</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">reorder_k</code></p></td>
     <td><p>순위 재조정 단계에서 정제되는 후보 벡터의 수를 제어합니다. 이 매개변수는 초기 파티셔닝 및 양자화 단계에서 보다 정밀한 유사도 계산을 사용하여 재평가할 상위 후보 벡터의 수를 결정합니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, <em>int_max</em>]</p>
<p><strong>기본값</strong>: None</p></td>
     <td><p><code translate="no">reorder_k</code> 이 클수록 일반적으로 최종 정제 단계에서 더 많은 후보를 고려하므로 <strong>검색 정확도가 높아</strong> 집니다. 그러나 추가 계산으로 인해 <strong>검색 시간도 늘어</strong> 납니다. 높은 리콜률을 달성하는 것이 중요하고 검색 속도가 덜 중요한 경우에는 <code translate="no">reorder_k</code> 을 늘리는 것이 좋습니다. 원하는 <code translate="no">limit</code> (반환할 TopK 결과)의 2~5배가 좋은 시작점입니다.</p>
<p>특히 약간의 정확도 저하를 감수할 수 있는 시나리오에서는 <code translate="no">reorder_k</code> 을 줄여 더 빠른 검색을 우선시하는 것을 고려하세요.</p>
<p>대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다:<em>[제한</em>, <em>제한</em> * 5].</p></td>
   </tr>
</table>
