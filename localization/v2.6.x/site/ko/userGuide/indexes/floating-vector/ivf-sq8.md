---
id: ivf-sq8.md
title: IVF_SQ8
summary: >-
  IVF_SQ8 인덱스는 대규모 유사도 검색 문제를 해결하기 위해 고안된 양자화 기반 인덱싱 알고리즘입니다. 이 인덱스 유형은 전수 검색
  방식에 비해 훨씬 적은 메모리 사용량으로 더 빠른 검색을 달성합니다.
---
<h1 id="IVFSQ8" class="common-anchor-header">IVF_SQ8<button data-href="#IVFSQ8" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>IVF_SQ8</strong> 인덱스는 대규모 유사도 검색 문제를 해결하기 위해 고안된 <strong>양자화 기반</strong> 인덱싱 알고리즘입니다. 이 인덱스 유형은 전수 검색 방식에 비해 훨씬 적은 메모리 사용량으로 더 빠른 검색을 달성합니다.</p>
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
    </button></h2><p>IVF_SQ8 인덱스는 두 가지 주요 구성 요소를 기반으로 합니다:</p>
<ul>
<li><p><strong>반전 파일(IVF)</strong>: 데이터를 클러스터로 구성하여 검색 알고리즘이 가장 관련성이 높은 벡터의 하위 집합에만 집중할 수 있도록 합니다.</p></li>
<li><p><strong>스칼라 양자화(SQ8</strong>): 벡터를 보다 컴팩트한 형태로 압축하여 메모리 사용량을 대폭 줄이면서도 빠른 유사도 계산을 위한 충분한 정밀도를 유지합니다.</p></li>
</ul>
<h3 id="IVF" class="common-anchor-header">IVF</h3><p>IVF는 책에서 색인을 만드는 것과 같습니다. 모든 페이지(이 경우에는 모든 벡터)를 스캔하는 대신 색인에서 특정 키워드(클러스터)를 조회하여 관련 페이지(벡터)를 빠르게 찾습니다. 이 시나리오에서는 벡터가 클러스터로 그룹화되고 알고리즘이 쿼리 벡터에 가까운 몇 개의 클러스터 내에서 검색합니다.</p>
<p>작동 방식은 다음과 같습니다:</p>
<ol>
<li><p><strong>클러스터링:</strong> 벡터 데이터 세트는 k-평균과 같은 클러스터링 알고리즘을 사용하여 지정된 수의 클러스터로 나뉩니다. 각 클러스터에는 중심(클러스터의 대표 벡터)이 있습니다.</p></li>
<li><p><strong>할당:</strong> 각 벡터는 중심이 가장 가까운 클러스터에 할당됩니다.</p></li>
<li><p><strong>반전 인덱스:</strong> 각 클러스터 중심을 해당 클러스터에 할당된 벡터 목록에 매핑하는 인덱스가 생성됩니다.</p></li>
<li><p><strong>검색:</strong> 가장 가까운 이웃을 검색할 때 검색 알고리즘은 쿼리 벡터와 클러스터 중심을 비교하여 가장 가능성이 높은 클러스터를 선택합니다. 그런 다음 선택한 클러스터 내의 벡터로 검색 범위가 좁혀집니다.</p></li>
</ol>
<p>기술적 세부 사항에 대해 자세히 알아보려면 <a href="/docs/ko/ivf-flat.md">IVF_FLAT을</a> 참조하세요.</p>
<h3 id="SQ8" class="common-anchor-header">SQ8</h3><p>스칼라 양자화(SQ)는 고차원 벡터의 값을 더 작고 간결한 표현으로 대체하여 크기를 줄이는 데 사용되는 기술입니다. <strong>SQ8</strong> 변형은 벡터의 각 차원 값을 저장할 때 일반적인 32비트 부동 소수점 숫자 대신 8비트 정수를 사용합니다. 따라서 데이터를 저장하는 데 필요한 메모리 양이 크게 줄어듭니다.</p>
<p>SQ8의 작동 방식은 다음과 같습니다:</p>
<ol>
<li><p><strong>범위 식별:</strong> 먼저 벡터 내의 최소값과 최대값을 식별합니다. 이 범위는 양자화의 범위를 정의합니다.</p></li>
<li><p><strong>정규화:</strong> 정규화: 공식을 사용하여 벡터 값을 0과 1 사이의 범위로 정규화합니다:</p>
<p><span class="katex-display" translate="no"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mtext>normalized_value</mtext><mo>=</mo><mfrac><mrow><mtext>value</mtext><mo>−</mo><mtext>min</mtext></mrow><mrow><mtext>max</mtext><mo>−</mo><mtext>min</mtext></mrow></mfrac></mrow><annotation encoding="application/x-tex">\text{normalized\_value} = \frac{\text{value} - \text{min}}{\text{max} - \text{min}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0044em;vertical-align:-0.31em;"></span><span class="mord text"><span class="mord">normalized_value</span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1408em;vertical-align:-0.7693em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3714em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">max</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord text"><span class="mord">value</span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord text"><span class="mord">min</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.7693em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>이렇게 하면 모든 값이 표준화된 범위 내에서 비례적으로 매핑되어 압축을 준비할 수 있습니다.</p></li>
<li><p><strong>8비트 압축:</strong> 정규화된 값에 255(8비트 정수의 최대값)를 곱하고 결과를 가장 가까운 정수로 반올림합니다. 이렇게 하면 각 값이 8비트 표현으로 효과적으로 압축됩니다.</p></li>
</ol>
<p>차원 값이 1.2이고 최소값이 -1.7, 최대값이 2.3이라고 가정합니다. 다음 그림은 SQ8을 적용하여 float32 값을 int8 정수로 변환하는 방법을 보여줍니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/ivf-sq8.png" alt="Ivf Sq8" class="doc-image" id="ivf-sq8" />
   </span> <span class="img-wrapper"> <span>IVF Sq8</span> </span></p>
<h3 id="IVF-+-SQ8" class="common-anchor-header">IVF + SQ8</h3><p>IVF_SQ8 인덱스는 IVF와 SQ8을 결합하여 유사도 검색을 효율적으로 수행합니다:</p>
<ol>
<li><p><strong>IVF는 검색 범위를 좁힙니다</strong>: 데이터 세트는 클러스터로 나뉘며, 쿼리가 실행되면 IVF는 먼저 쿼리를 클러스터 중심과 비교하여 가장 관련성이 높은 클러스터를 선택합니다.</p></li>
<li><p><strong>SQ8은 거리 계산 속도를 높입니다</strong>: 선택한 클러스터 내에서 SQ8은 벡터를 8비트 정수로 압축하여 메모리 사용량을 줄이고 거리 계산을 가속화합니다.</p></li>
</ol>
<p>IVF를 사용해 검색에 집중하고 SQ8을 사용해 계산 속도를 높임으로써 IVF_SQ8은 빠른 검색 시간과 메모리 효율성을 모두 달성합니다.</p>
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
    </button></h2><p>Milvus의 벡터 필드에 <code translate="no">IVF_SQ8</code> 인덱스를 구축하려면 <code translate="no">add_index()</code> 방법을 사용하여 <code translate="no">index_type</code>, <code translate="no">metric_type</code> 및 인덱스에 대한 추가 매개변수를 지정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_SQ8&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Number of clusters to create using the k-means algorithm during index building</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서는</p>
<ul>
<li><p><code translate="no">index_type</code>: 빌드할 인덱스 유형입니다. 이 예에서는 값을 <code translate="no">IVF_SQ8</code> 로 설정합니다.</p></li>
<li><p><code translate="no">metric_type</code>: 벡터 간의 거리를 계산하는 데 사용되는 메서드입니다. 지원되는 값은 <code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code> 입니다. 자세한 내용은 <a href="/docs/ko/metric.md">메트릭 유형을</a> 참조하세요.</p></li>
<li><p><code translate="no">params</code>: 인덱스 구축을 위한 추가 구성 옵션입니다.</p>
<ul>
<li><code translate="no">nlist</code>: 인덱스 구축 중에 k-평균 알고리즘을 사용하여 생성할 클러스터 수입니다.</li>
</ul>
<p><code translate="no">IVF_SQ8</code> 인덱스에 사용할 수 있는 구축 파라미터에 대해 자세히 알아보려면 <a href="/docs/ko/ivf-sq8.md#share-BwprdWFCjoMBtMxorO0cWrUPnjb">인덱스 구축 파라미터를</a> 참조하세요.</p></li>
</ul>
<p>인덱스 파라미터가 구성되면 <code translate="no">create_index()</code> 메서드를 직접 사용하거나 <code translate="no">create_collection</code> 메서드에서 인덱스 파라미터를 전달하여 인덱스를 생성할 수 있습니다. 자세한 내용은 <a href="/docs/ko/create-collection.md">컬렉션 만들기를</a> 참조하세요.</p>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-comment"># Number of clusters to search for candidates</span>
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
<li><code translate="no">nprobe</code>: 후보를 검색할 클러스터 수입니다.</li>
</ul>
<p><code translate="no">IVF_SQ8</code> 인덱스에 사용할 수 있는 검색 매개변수에 대해 자세히 알아보려면 <a href="/docs/ko/ivf-sq8.md#share-PJhqdqNaNodKiexm6F1cD2IInbe">인덱스별 검색 매개변수를</a> 참조하세요.</p></li>
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
    </button></h2><p>이 섹션에서는 인덱스를 구축하고 인덱스에서 검색을 수행하는 데 사용되는 매개변수에 대한 개요를 제공합니다.</p>
<h3 id="Index-building-params" class="common-anchor-header">인덱스 구축 매개변수</h3><p>다음 표에는 <a href="/docs/ko/ivf-sq8.md#share-X9Y9dTuhDohRRBxSvzBcXmIEnu4">색인 작성</a> 시 <code translate="no">params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th></th>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 제안</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nlist</code></p></td>
     <td><p>인덱스 구축 중에 k-평균 알고리즘을 사용하여 생성할 클러스터의 수입니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, 65536]</p>
<p><strong>기본값입니다</strong>: <code translate="no">128</code></p></td>
     <td><p><code translate="no">nlist</code> 값이 클수록 더 세분화된 클러스터를 생성하여 정확도가 향상되지만 인덱스 구축 시간이 늘어납니다. 데이터 세트 크기와 사용 가능한 리소스에 따라 최적화합니다. 대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [32, 4096].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">인덱스별 검색 매개변수</h3><p>다음 표에는 <a href="/docs/ko/ivf-sq8.md#share-TI73dmWBOoEnocxQ8H7clSYUnLg">인덱스에서 검색할</a> 때 <code translate="no">search_params.params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th></th>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 제안</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code translate="no">nprobe</code></p></td>
     <td><p>후보를 검색할 클러스터 수입니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, <em>nlist</em>]</p>
<p><strong>기본값입니다</strong>: <code translate="no">8</code></p></td>
     <td><p>값이 클수록 더 많은 클러스터를 검색할 수 있으므로 검색 범위가 확장되어 검색 회수율이 향상되지만 쿼리 대기 시간이 늘어납니다. 속도와 정확도의 균형을 맞추려면 <code translate="no">nlist</code> 에 비례하여 <code translate="no">nprobe</code> 를 설정합니다.</p>
<p>대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [1, nlist].</p></td>
   </tr>
</table>
