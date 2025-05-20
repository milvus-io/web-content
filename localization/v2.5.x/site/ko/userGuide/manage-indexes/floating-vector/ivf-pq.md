---
id: ivf-pq.md
title: IVF_PQ
summary: >-
  IVF_PQ 인덱스는 고차원 공간에서 대략적인 최접근 이웃 검색을 위한 양자화 기반 인덱싱 알고리즘입니다. 일부 그래프 기반 방법만큼
  빠르지는 않지만 IVF_PQ는 메모리를 훨씬 적게 필요로 하므로 대규모 데이터 세트에 실용적인 선택입니다.
---
<h1 id="IVFPQ" class="common-anchor-header">IVF_PQ<button data-href="#IVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>IVF_PQ</strong> 인덱스는 고차원 공간에서 대략적인 최접근 이웃 검색을 위한 <strong>양자화 기반</strong> 인덱싱 알고리즘입니다. 일부 그래프 기반 방법만큼 빠르지는 않지만 <strong>IVF_PQ는</strong> 메모리를 훨씬 적게 필요로 하므로 대규모 데이터 세트에 실용적인 선택입니다.</p>
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
    </button></h2><p><strong>IVF_PQ는</strong> 효율적인 벡터 검색과 검색을 위해 인덱싱과 압축을 결합한 하이브리드 접근 방식인 <strong>역파일과 제품 정량화의</strong> 약자입니다. 이 방식은 두 가지 핵심 구성 요소를 활용합니다: <strong>반전 파일(IVF)</strong> 과 <strong>제품 정량화(PQ)</strong>입니다.</p>
<h3 id="IVF" class="common-anchor-header">IVF</h3><p>IVF는 책에서 색인을 만드는 것과 같습니다. 모든 페이지(이 경우에는 모든 벡터)를 스캔하는 대신 색인에서 특정 키워드(클러스터)를 조회하여 관련 페이지(벡터)를 빠르게 찾습니다. 이 시나리오에서는 벡터가 클러스터로 그룹화되고 알고리즘이 쿼리 벡터에 가까운 몇 개의 클러스터 내에서 검색합니다.</p>
<p>작동 방식은 다음과 같습니다:</p>
<ol>
<li><p><strong>클러스터링:</strong> 벡터 데이터 세트는 k-평균과 같은 클러스터링 알고리즘을 사용하여 지정된 수의 클러스터로 나뉩니다. 각 클러스터에는 중심(클러스터의 대표 벡터)이 있습니다.</p></li>
<li><p><strong>할당:</strong> 각 벡터는 중심이 가장 가까운 클러스터에 할당됩니다.</p></li>
<li><p><strong>반전 인덱스:</strong> 각 클러스터 중심을 해당 클러스터에 할당된 벡터 목록에 매핑하는 인덱스가 생성됩니다.</p></li>
<li><p><strong>검색:</strong> 가장 가까운 이웃을 검색할 때 검색 알고리즘은 쿼리 벡터와 클러스터 중심을 비교하여 가장 가능성이 높은 클러스터를 선택합니다. 그런 다음 선택한 클러스터 내의 벡터로 검색 범위가 좁혀집니다.</p></li>
</ol>
<p>기술적 세부 사항에 대해 자세히 알아보려면 <a href="/docs/ko/ivf-flat.md">IVF_FLAT을</a> 참조하세요.</p>
<h3 id="PQ" class="common-anchor-header">PQ</h3><p><strong>제품 정량화(PQ)</strong> 는 고차원 벡터를 위한 압축 방법으로, 유사도 검색 작업을 빠르게 수행하면서 스토리지 요구 사항을 크게 줄여줍니다.</p>
<p>PQ 프로세스에는 다음과 같은 주요 단계가 포함됩니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-1.png" alt="Ivf Pq 1" class="doc-image" id="ivf-pq-1" />
   </span> <span class="img-wrapper"> <span>Ivf Pq 1</span> </span></p>
<ol>
<li><p><strong>차원 분해</strong>: 이 알고리즘은 각 고차원 벡터를 <code translate="no">m</code> 동일한 크기의 하위 벡터로 분해하는 것으로 시작됩니다. 이 분해는 원래의 D 차원 공간을 <code translate="no">m</code> 분리된 하위 공간으로 변환하며, 각 하위 공간은 <em>D/m</em> 차원을 포함합니다. <code translate="no">m</code> 매개변수는 분해의 세분성을 제어하며 압축률에 직접적인 영향을 미칩니다.</p></li>
<li><p><strong>서브스페이스 코드북 생성</strong>: 각 하위 공간 내에서 알고리즘은 <a href="https://en.wikipedia.org/wiki/K-means_clustering">K-평균 클러스터링을</a> 적용하여 대표 벡터(중심) 집합을 학습합니다. 이러한 중심은 집합적으로 해당 하위 공간에 대한 코드북을 형성합니다. 각 코드북의 중심 수는 매개변수 <code translate="no">nbits</code> 에 의해 결정되며, 여기서 각 코드북에는 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits 중심이 포함됩니다. 예를 들어</span></span></span></span></span></span></span></span></span> <code translate="no">nbits = 8</code> 인 경우 각 코드북에는 256개의 중심이 포함됩니다. 각 중심에는 <code translate="no">nbits</code> 비트의 고유 인덱스가 할당됩니다.</p></li>
<li><p><strong>벡터</strong> <strong>양자화</strong>: 원본 벡터의 각 하위 벡터에 대해 PQ는 특정 메트릭 유형을 사용하여 해당 하위 공간 내에서 가장 가까운 중심을 식별합니다. 이 프로세스는 각 하위 벡터를 코드북에서 가장 가까운 대표 벡터에 효과적으로 매핑합니다. 전체 하위 벡터 좌표를 저장하는 대신 일치하는 중심점의 인덱스만 유지됩니다.</p></li>
<li><p><strong>압축 표현</strong>: 최종 압축 표현은 각 하위 공간에서 하나씩, 총칭하여 <strong>PQ 코드라고</strong> 하는 <code translate="no">m</code> 인덱스로 구성됩니다. 이 인코딩은 저장 요구 사항을 <em>D × 32비트</em> (32비트 부동소수점 숫자 가정)에서 <em>m</em> × <em>n비트</em> 비트로 줄여 벡터 거리를 근사화하는 기능을 유지하면서 상당한 압축을 달성합니다.</p></li>
</ol>
<p>매개변수 조정 및 최적화에 대한 자세한 내용은 <a href="/docs/ko/ivf-pq.md#Index-params">인덱스 매개변수를</a> 참조하세요.</p>
<div class="alert note">
<p>32비트 부동 소수점 숫자를 사용하는 <em>D = 128</em> 차원의 벡터를 예로 들어 보겠습니다. PQ 매개변수 <em>m = 64</em> (하위 벡터), <em>n비트 = 8</em> (따라서 <em>k =</em> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">282^8</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> 8</span></span></span></span></span></span></span></span></span> <em>=</em> 하위 공간당 <em> 256개의</em> 중심)을 사용하면 저장 공간 요구 사항을 비교할 수 있습니다:</p>
<ul>
<li><p>원본 벡터: 128 차원 × 32비트 = 4,096비트</p></li>
<li><p>PQ 압축 벡터: 64개의 서브 벡터 × 8비트 = 512비트</p></li>
</ul>
<p>이는 스토리지 요구 사항이 8배 감소했음을 나타냅니다.</p>
</div>
<p><strong>PQ를 사용한 거리 계산</strong></p>
<p>쿼리 벡터로 유사도 검색을 수행할 때 PQ는 다음 단계를 통해 효율적인 거리 계산을 가능하게 합니다:</p>
<ol>
<li><p><strong>쿼리 전처리</strong></p>
<ul>
<li><p>쿼리 벡터는 원래의 PQ 분해 구조와 일치하는 <code translate="no">m</code> 하위 벡터로 분해됩니다.</p></li>
<li><p>각 쿼리 하위 벡터와 해당 코드북( <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits 중심 포함)에 대해 모든 중심까지의 거리를 계산하고 저장합니다.</span></span></span></span></span></span></span></span></span> </p></li>
<li><p>이렇게 하면 <code translate="no">m</code> 룩업 테이블이 생성되며, 각 테이블에는 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><annotation encoding="application/x-tex">2nbits2^{\textit{nbits}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span></span></span></span> 2 <span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="mord"><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span> nbits 거리가 포함됩니다.</span></span></span></span></span></span></span></span></span> </p></li>
</ul></li>
<li><p><strong>거리 근사치</strong></p>
<p>PQ 코드로 표현되는 모든 데이터베이스 벡터의 경우 쿼리 벡터와의 대략적인 거리는 다음과 같이 계산됩니다:</p>
<ul>
<li><p>각 <code translate="no">m</code> 하위 벡터에 대해 저장된 중심 인덱스를 사용하여 해당 조회 테이블에서 미리 계산된 거리를 검색합니다.</p></li>
<li><p>이러한 <code translate="no">m</code> 거리를 합산하여 특정 메트릭 유형(예: 유클리드 거리)에 따른 대략적인 거리를 구합니다.</p></li>
</ul></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/ivf-pq-2.png" alt="Ivf Pq 2" class="doc-image" id="ivf-pq-2" />
   </span> <span class="img-wrapper"> <span>IVF Pq 2</span> </span></p>
<h3 id="IVF-+-PQ" class="common-anchor-header">IVF + PQ</h3><p><strong>IVF_PQ</strong> 인덱스는 <strong>IVF와</strong> <strong>PQ의</strong> 강점을 결합하여 검색 속도를 높입니다. 이 프로세스는 두 단계로 진행됩니다:</p>
<ol>
<li><p>IVF를<strong>사용한 거친 필터링</strong>: IVF는 벡터 공간을 클러스터로 분할하여 검색 범위를 줄입니다. 이 알고리즘은 전체 데이터 세트를 평가하는 대신 쿼리 벡터에 가장 가까운 클러스터에만 집중합니다.</p></li>
<li><p><strong>PQ와의 세분화된 비교</strong>: 선택한 클러스터 내에서 PQ는 압축 및 양자화된 벡터 표현을 사용해 대략적인 거리를 빠르게 계산합니다.</p></li>
</ol>
<p><strong>IVF_PQ</strong> 인덱스의 성능은 IVF와 PQ 알고리즘을 모두 제어하는 매개변수에 의해 크게 영향을 받습니다. 주어진 데이터 세트와 애플리케이션에 대해 최적의 결과를 얻으려면 이러한 매개변수를 조정하는 것이 중요합니다. 이러한 매개변수에 대한 자세한 정보와 조정 방법은 <a href="/docs/ko/ivf-pq.md#Index-params">인덱스</a> 매개변수에서 확인할 수 있습니다.</p>
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
    </button></h2><p>Milvus의 벡터 필드에 <code translate="no">IVF_PQ</code> 인덱스를 구축하려면 <code translate="no">add_index()</code> 방법을 사용하여 <code translate="no">index_type</code>, <code translate="no">metric_type</code> 및 인덱스에 대한 추가 매개 변수를 지정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서는</p>
<ul>
<li><p><code translate="no">index_type</code>: 빌드할 인덱스 유형입니다. 이 예에서는 값을 <code translate="no">IVF_PQ</code> 로 설정합니다.</p></li>
<li><p><code translate="no">metric_type</code>: 벡터 간의 거리를 계산하는 데 사용되는 메서드입니다. 지원되는 값은 <code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code> 입니다. 자세한 내용은 <a href="/docs/ko/metric.md">메트릭 유형을</a> 참조하세요.</p></li>
<li><p><code translate="no">params</code>: 인덱스 구축을 위한 추가 구성 옵션입니다.</p>
<ul>
<li><code translate="no">m</code>: 벡터를 분할할 하위 벡터의 수입니다.</li>
</ul>
<p><code translate="no">IVF_PQ</code> 인덱스에 사용할 수 있는 구축 매개변수에 대해 자세히 알아보려면 <a href="/docs/ko/ivf-pq.md#Index-building-params">인덱스 구축</a> 매개변수를 참조하세요.</p></li>
</ul>
<p>인덱스 파라미터를 구성한 후에는 <code translate="no">create_index()</code> 메서드를 직접 사용하거나 <code translate="no">create_collection</code> 메서드에서 인덱스 파라미터를 전달하여 인덱스를 만들 수 있습니다. 자세한 내용은 <a href="/docs/ko/create-collection.md">컬렉션 만들기를</a> 참조하세요.</p>
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
        <span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-comment"># Number of clusters to search</span>
    }
}

res = MilvusClient.search(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-comment"># Collection name</span>
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>, <span class="hljs-comment"># Vector field name</span>
    data=[[<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>, <span class="hljs-number">0.5</span>]],  <span class="hljs-comment"># Query vector</span>
    limit=<span class="hljs-number">3</span>,  <span class="hljs-comment"># TopK results to return</span>
    search_params=search_params
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서는</p>
<ul>
<li><p><code translate="no">params</code>: 색인에서 검색을 위한 추가 구성 옵션.</p>
<ul>
<li><code translate="no">nprobe</code>: 검색할 클러스터 수입니다.</li>
</ul>
<p><code translate="no">IVF_PQ</code> 인덱스에 사용할 수 있는 검색 매개변수에 대해 자세히 알아보려면 <a href="/docs/ko/ivf-pq.md#Index-specific-search-params">인덱스별 검색 매개변수를</a> 참조하세요.</p></li>
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
    </button></h2><p>이 섹션에서는 인덱스를 만들고 인덱스에서 검색을 수행하는 데 사용되는 매개변수에 대한 개요를 제공합니다.</p>
<h3 id="Index-building-params" class="common-anchor-header">인덱스 구축 매개변수</h3><p>다음 표에는 <a href="/docs/ko/ivf-pq.md#Build-index">색인 작성</a> 시 <code translate="no">params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
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
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, 65536]</p><p><strong>기본값입니다</strong>: <code translate="no">128</code></p></td>
     <td><p><code translate="no">nlist</code> 값이 클수록 더 세분화된 클러스터를 생성하여 정확도가 향상되지만 인덱스 구축 시간이 늘어납니다. 데이터 세트 크기와 사용 가능한 리소스에 따라 최적화하세요. 대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>양자화 프로세스 중에 각 고차원 벡터를 나눌 하위 벡터(양자화에 사용)의 수입니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, 65536]</p><p><strong>기본값입니다</strong>: None</p></td>
     <td><p><code translate="no">m</code> 값이 클수록 정확도가 향상될 수 있지만 계산 복잡성과 메모리 사용량이 증가합니다. <code translate="no">m</code> 은 적절한 분해를 보장하기 위해 벡터 차원<em>(D)</em>의 제수여야 합니다. 일반적으로 권장되는 값은 <em>m = D/2입니다</em>.</p><p>대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [D/8, D].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>각 하위 벡터의 중심 인덱스를 압축된 형태로 표현하는 데 사용되는 비트 수입니다. 각 코드북의 크기를 직접 결정합니다. 각 코드북에는 $2^{\textit{nbits}}$의 중심이 포함됩니다. 예를 들어 <code translate="no">nbits</code> 을 8로 설정하면 각 하위 벡터는 8비트 중심 인덱스로 표현됩니다. 따라서 해당 하위 벡터의 코드북에는 $2^8$(256)개의 가능한 중심이 있습니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, 64]</p><p><strong>기본값입니다</strong>: <code translate="no">8</code></p></td>
     <td><p><code translate="no">nbits</code> 값이 클수록 코드북이 커져 원본 벡터를 더 정확하게 표현할 수 있습니다. 하지만 각 인덱스를 저장하는 데 더 많은 비트를 사용하므로 압축률이 떨어집니다. 대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [1, 16].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">인덱스별 검색 매개변수</h3><p>다음 표에는 <a href="/docs/ko/ivf-pq.md#Search-on-index">인덱스에서 검색할</a> 때 <code translate="no">search_params.params</code> 에서 구성할 수 있는 파라미터가 나와 있습니다.</p>
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
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, <em>nlist</em>]</p><p><strong>기본값입니다</strong>: <code translate="no">8</code></p></td>
     <td><p>값이 클수록 더 많은 클러스터를 검색할 수 있으므로 검색 범위가 확장되어 검색 회수율이 향상되지만 쿼리 대기 시간이 늘어납니다. 속도와 정확도의 균형을 맞추려면 <code translate="no">nprobe</code> 을 <code translate="no">nlist</code> 에 비례하여 설정합니다.</p><p>대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [1, nlist].</p></td>
   </tr>
</table>
