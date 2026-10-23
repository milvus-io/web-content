---
id: hnsw-sq.md
title: HNSW_SQ
summary: >-
  HNSW_SQ는 계층적 탐색 가능 스몰 월드(HNSW) 그래프와 스칼라 양자화(SQ)를 결합하여, 크기와 정확도 간의 균형을 조절할 수 있는
  고급 벡터 인덱싱 기법을 구현합니다. 표준 HNSW와 비교했을 때, 이 인덱스 유형은 인덱스 생성 시간이 약간 증가하는 대신 높은 쿼리 처리
  속도를 유지합니다.
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
    </button></h1><p><strong>HNSW_SQ는</strong> 계층적 탐색 가능 스몰 월드(HNSW) 그래프와 스칼라 양자화(SQ)를 결합하여, 크기와 정확도 간의 균형을 조절할 수 있는 고급 벡터 인덱싱 방법을 제공합니다. 표준 <a href="/docs/ko/hnsw.md">HNSW와</a> 비교할 때, 이 인덱스 유형은 인덱스 생성 시간이 약간 증가하는 대신 높은 쿼리 처리 속도를 유지합니다.</p>
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
    </button></h2><p>HNSW_SQ는 빠른 그래프 기반 탐색을 위한 <strong>HNSW와</strong> 효율적인 벡터 압축을 위한 <strong>SQ라는</strong> 두 가지 인덱싱 기법을 결합합니다.</p>
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
    </button></h3><p>HNSW는 각 노드가 데이터 세트의 벡터에 대응하는 다층 그래프를 구축합니다. 이 그래프에서 노드는 유사성을 기반으로 연결되어 데이터 공간을 빠르게 탐색할 수 있습니다. 계층적 구조를 통해 검색 알고리즘이 후보 인접 노드를 좁힐 수 있어, 고차원 공간에서 검색 프로세스의 속도가 크게 빨라집니다.</p>
<p>자세한 내용은 <a href="/docs/ko/hnsw.md">HNSW</a>를 참조하십시오.</p>
<h3 id="SQ" class="common-anchor-header">SQ<button data-href="#SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>SQ는 벡터를 더 적은 비트로 표현하여 압축하는 방법입니다. 예를 들어:</p>
<ul>
<li><p><strong>SQ8은</strong> 8비트를 사용하여 값을 256단계로 매핑합니다. 자세한 내용은 <a href="/docs/ko/ivf-sq8.md#SQ8">IVF_SQ8을</a> 참조하십시오.</p></li>
<li><p><strong>SQ6는</strong> 각 부동소수점 값을 6비트로 표현하여 64개의 이산 레벨을 생성합니다.</p></li>
</ul>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/hnsw-sq.png" alt="Hnsw Sq" class="doc-image" id="hnsw-sq" /> 
   <span>Hnsw Sq</span>
  
 </span></p>
<p>이러한 정밀도 감소는 데이터의 핵심 구조를 유지하면서 메모리 사용량을 획기적으로 줄이고 계산 속도를 높여줍니다.</p>
<h3 id="SQ4U" class="common-anchor-header">SQ4U<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.8+</span><button data-href="#SQ4U" class="anchor-icon" translate="no">
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
    </button></h3><p>극도의 쿼리 속도와 최소한의 메모리 사용이 요구되는 시나리오를 위해 Milvus는 4비트 균일 스칼라 양자화( <code translate="no">SQ4U</code> )를 도입했습니다. 이는 각 차원의 부동 소수점 값을 <strong>4비트</strong> 부호 없는 정수로 압축하는 공격적인 형태의 스칼라 양자화입니다.</p>
<p>SQ4U의 “U”는 Uniform(균일)을 의미합니다. 일반적으로 각 차원별로 최소값과 최대값을 독립적으로 계산하는 비균일 스칼라 양자화(차원별 양자화)와 달리, SQ4U는 <strong>전역 균일 양자화</strong> 전략을 적용합니다.</p>
<ol>
<li><p><strong>전역 통계</strong>: 시스템은 벡터(또는 전체 벡터 세그먼트)의 <strong>모든 차원에</strong> 적용되는 <strong>단일</strong> 최소값 <code translate="no">vmin</code> 과 <strong>단일</strong> 값 범위 <code translate="no">vdiff</code> 를 계산합니다.</p></li>
<li><p><strong>균일 매핑</strong>: 전역 값 범위는 16개의 동일한 구간으로 나뉩니다. 벡터 내의 모든 부동 소수점 값은 속한 차원에 관계없이 이러한 공유 매개변수를 사용하여 4비트 정수(0–15)로 매핑됩니다.</p></li>
</ol>
<p><strong>성능상의 이점:</strong></p>
<ul>
<li><p><strong>8배 압축률:</strong> <code translate="no">FP32</code> 에 비해 크기를 8배, <code translate="no">SQ8</code> 에 비해 2배 줄여, 벡터 검색에서 흔히 병목 현상이 되는 메모리 대역폭 부담을 크게 완화합니다.</p></li>
<li><p><strong>SIMD 최적화:</strong> 간결한 구조 덕분에 최신 CPU(AVX2/AVX-512)가 사이클당 더 많은 차원을 처리할 수 있습니다. 무엇보다도 전역 매개변수를 사용함으로써 거리 계산 중에 다양한 스케일/오프셋 값을 불러올 필요가 없어져, 명령어 파이프라인을 완전히 포화 상태로 유지할 수 있습니다.</p></li>
<li><p><strong>캐시 효율성:</strong> 벡터 크기가 작을수록 CPU 캐시에 더 많은 데이터가 들어갈 수 있어, 메모리 액세스로 인한 지연 시간을 줄여줍니다.</p></li>
</ul>
<div class="alert note">
<p>SQ4U는 전역 매개변수 공유 방식 덕분에 정규화된 데이터나 차원 전반에 걸쳐 일관된 값 분포를 보이는 데이터셋에서 최고의 성능을 발휘합니다.</p>
</div>
<h3 id="HNSW-+-SQ" class="common-anchor-header">HNSW + SQ<button data-href="#HNSW-+-SQ" class="anchor-icon" translate="no">
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
    </button></h3><p>HNSW_SQ는 HNSW와 SQ의 장점을 결합하여 효율적인 근사 최인접 이웃 검색을 가능하게 합니다. 그 작동 방식은 다음과 같습니다:</p>
<ol>
<li><p><strong>데이터 압축:</strong> SQ는 <code translate="no">sq_type</code> (예: SQ6 또는 SQ8)를 사용하여 벡터를 압축함으로써 메모리 사용량을 줄입니다. 이 압축으로 인해 정밀도가 다소 낮아질 수 있지만, 시스템이 더 큰 데이터셋을 처리할 수 있게 해줍니다.</p></li>
<li><p><strong>그래프 구축:</strong> 압축된 벡터를 사용하여 HNSW 그래프를 구축합니다. 데이터가 압축되어 있으므로 결과 그래프의 크기가 작아지고 검색 속도가 빨라집니다.</p></li>
<li><p><strong>후보 검색:</strong> 쿼리 벡터가 제공되면, 알고리즘은 압축된 데이터를 사용하여 HNSW 그래프에서 후보 이웃 집합을 신속하게 식별합니다.</p></li>
<li><p><strong>(선택 사항) 결과 정제:</strong> 다음 매개변수를 기반으로 초기 후보 결과를 정제하여 정확도를 높일 수 있습니다:</p>
<ul>
<li><p><code translate="no">refine</code>: 이 정제 단계의 활성화 여부를 제어합니다. ‘ <code translate="no">true</code> ’로 설정하면 시스템은 더 높은 정밀도 또는 압축되지 않은 표현을 사용하여 거리를 재계산합니다.</p></li>
<li><p><code translate="no">refine_type</code>: 정제 과정에서 사용되는 데이터의 정밀도 수준을 지정합니다(예: SQ6, SQ8, BF16). ‘ <code translate="no">FP32</code> ’과 같은 더 높은 정밀도를 선택하면 더 정확한 결과를 얻을 수 있지만 더 많은 메모리가 필요합니다. 이 값은 원본 압축 데이터 세트의 정밀도보다 ‘ <code translate="no">sq_type</code> ’만큼 높아야 합니다.</p></li>
<li><p><code translate="no">refine_k</code>: 확대 계수 역할을 합니다. 예를 들어, 상위 <em>k가</em> 100이고 <code translate="no">refine_k</code> 가 2인 경우, 시스템은 상위 200개 후보를 재순위 지정하여 가장 우수한 100개를 반환함으로써 전반적인 정확도를 향상시킵니다.</p></li>
</ul></li>
</ol>
<p>매개변수 및 유효 값의 전체 목록은 <a href="/docs/ko/hnsw-sq.md#Index-params">‘Index params</a>’를 참조하십시오.</p>
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
    </button></h2><p>Milvus에서 벡터 필드에 대해 <code translate="no">HNSW_SQ</code> 인덱스를 생성하려면, <code translate="no">add_index()</code> 메서드를 사용하여 <code translate="no">index_type</code>, <code translate="no">metric_type</code> 및 인덱스에 대한 추가 매개변수를 지정하십시오.</p>
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
<p>이 구성에서:</p>
<ul>
<li><p><code translate="no">index_type</code>: 생성할 인덱스의 유형입니다. 이 예제에서는 값을 <code translate="no">HNSW_SQ</code> 로 설정합니다.</p></li>
<li><p><code translate="no">metric_type</code>: 벡터 간의 거리를 계산하는 데 사용되는 방법입니다. 지원되는 값으로는 <code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code> 등이 있습니다. 자세한 내용은 <a href="/docs/ko/metric.md">메트릭 유형을</a> 참조하십시오.</p></li>
<li><p><code translate="no">params</code>: 인덱스 구축을 위한 추가 구성 옵션입니다. 자세한 내용은 <a href="/docs/ko/hnsw-sq.md#Index-building-params">‘인덱스 구축 매개변수’를</a> 참조하십시오.</p></li>
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
<li><code translate="no">params</code>: 인덱스 검색을 위한 추가 구성 옵션입니다. 자세한 내용은 <a href="/docs/ko/hnsw-sq.md#Index-specific-search-params">‘인덱스별 검색 매개변수’를</a> 참조하십시오.</li>
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
    </button></h3><p>다음 표에는 <a href="/docs/ko/hnsw-sq.md#share-PRYPd4xBJonkoZxPpNWcdnebnNh">인덱스를 생성할</a> 때 ‘ <code translate="no">params</code> ’에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
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
     <td><p>그래프에서 각 노드가 가질 수 있는 최대 연결 수(또는 에지 수)로, 나가는 에지와 들어오는 에지를 모두 포함합니다.</p><p>이 매개 변수는 인덱스 구축과 검색 모두에 직접적인 영향을 미칩니다.</p></td>
     <td><p><strong>유형</strong>: 정수</p><p><strong>범위</strong>: [2, 2048]</p><p><strong>기본값</strong>: <code translate="no">30</code> (노드당 최대 30개의 나가는 에지 및 30개의 들어오는 에지)</p></td>
     <td><p><code translate="no">M</code> 값이 클수록 일반적으로 <strong>정확도는 높아지지만</strong>, <strong>메모리 오버헤드가 증가하고</strong> <strong>인덱스 구축 및 검색 속도가 느려집니다</strong>.</p><p>차원이 높은 데이터 세트나 높은 리콜이 중요한 경우에는 <code translate="no">M</code> 값을 늘리는 것을 고려해 보십시오.</p><p>메모리 사용량과 검색 속도가 가장 중요한 고려 사항인 경우에는 <code translate="no">M</code> 를 줄이는 것을 고려해 보십시오.</p><p>대부분의 경우, [5, 100] 범위 내의 값을 설정하는 것이 좋습니다.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">efConstruction</code></p></td>
     <td><p>인덱스 구축 시 연결 대상으로 고려되는 후보 이웃의 수입니다.</p><p>새로운 요소마다 더 많은 후보 풀이 평가되지만, 실제로 설정되는 연결의 최대 개수는 여전히 <code translate="no">M</code> 에 의해 제한됩니다.</p></td>
     <td><p><strong>유형</strong>: 정수</p><p><strong>범위</strong>: [1, <em>int_max</em>]</p><p><strong>기본값</strong>: <code translate="no">360</code></p></td>
     <td><p><code translate="no">efConstruction</code> 값이 높을수록 더 많은 잠재적 연결이 탐색되므로 일반적으로 <strong>더 정확한 인덱스가</strong> 생성됩니다. 그러나 이로 인해 <strong>인덱싱 시간이 길어지고</strong> 인덱스 생성 중 <strong>메모리 사용량이 증가합니다</strong>.</p><p>특히 인덱싱 시간이 그리 중요하지 않은 상황에서는 정확도를 높이기 위해 ` <code translate="no">efConstruction</code> ` 값을 늘리는 것을 고려해 보십시오.</p><p>리소스 제약이 우려되는 경우, 인덱스 생성 속도를 높이기 위해 ` <code translate="no">efConstruction</code> ` 값을 낮추는 것을 고려해 보십시오.</p><p>대부분의 경우, [50, 500] 범위 내의 값을 설정하는 것이 좋습니다.</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">sq_type</code></p></td>
     <td><p>벡터를 압축하기 위한 스칼라 양자화 방법을 지정합니다. 각 옵션은 압축률과 정확도 간의 균형이 서로 다릅니다:</p><ul><li><p><code translate="no">SQ4U</code>: 4비트 균일 양자화를 사용하여 벡터를 인코딩합니다. 이 모드는 가장 빠른 속도와 가장 높은 압축률을 제공합니다.</p></li><li><p><code translate="no">SQ6</code>: 6비트 정수를 사용하여 벡터를 인코딩합니다.</p></li><li><p><code translate="no">SQ8</code>: 8비트 정수를 사용하여 벡터를 인코딩합니다.</p></li><li><p><code translate="no">BF16</code>: Bfloat16 형식을 사용합니다.</p></li><li><p><code translate="no">FP16</code>: 표준 16비트 부동소수점 형식을 사용합니다.</p></li></ul></td>
     <td><p><strong>유형</strong>: 문자열</p><p><strong>범위</strong>: [ <code translate="no">SQ4U</code>, <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code> ]</p><p><strong>기본값</strong>: <code translate="no">SQ8</code></p></td>
     <td><p><code translate="no">sq_type</code> 의 선택은 특정 애플리케이션의 요구 사항에 따라 달라집니다. <code translate="no">SQ4U</code> 는 최대 속도와 메모리 효율성을 위해 선택됩니다. <code translate="no">SQ6</code> 또는 <code translate="no">SQ8</code> 는 균형 잡힌 성능에 적합할 수 있습니다. 반면, 정확도가 가장 중요하다면 <code translate="no">BF16</code> 또는 <code translate="no">FP16</code> 를 선호할 수 있습니다.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine</code></p></td>
     <td><p>검색 중에 정밀화 단계가 적용될지 여부를 제어하는 부울 플래그입니다. 정밀화란 쿼리 벡터와 후보들 간의 정확한 거리를 계산하여 초기 결과의 순위를 재조정하는 과정을 말합니다.</p></td>
     <td><p><strong>유형</strong>: 부울</p><p><strong>범위</strong>: [<code translate="no">true</code>, <code translate="no">false</code>]</p><p><strong>기본값</strong>: <code translate="no">false</code></p></td>
     <td><p>높은 정확도가 필수적이며 검색 시간이 약간 느려지는 것은 감수할 수 있는 경우 <code translate="no">true</code> 로 설정하십시오. 속도가 우선이며 정확도에서 약간의 타협이 허용되는 경우 <code translate="no">false</code> 를 사용하십시오.</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">refine_type</code></p></td>
     <td><p>정밀화 작업에 사용되는 데이터의 정밀도를 결정합니다.</p><p>이 정밀도는 압축된 벡터의 정밀도( <code translate="no">sq_type</code> 로 설정된 값)보다 높아야 하며, 재순위가 매겨진 벡터의 정확도와 메모리 사용량 모두에 영향을 미칩니다.</p></td>
     <td><p><strong>유형</strong>: 문자열</p><p><strong>범위</strong>: [ <code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code> ]</p><p><strong>기본값</strong>: 없음</p></td>
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
    </button></h3><p>다음 표에는 <a href="/docs/ko/hnsw-sq.md#Search-on-index">인덱스에서 검색할</a> 때 <code translate="no">search_params.params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다. 생략한 매개변수의 경우 서버 설정이 기본값을 재정의할 수 있습니다.</p>
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
     <td><p>가장 가까운 이웃 검색 시 검색 범위를 제어합니다. 이 매개변수는 잠재적인 가장 가까운 이웃으로 방문 및 평가될 노드의 수를 결정합니다. </p><p>이 매개변수는 검색 과정에만 영향을 미치며, 그래프의 최하위 계층에만 적용됩니다.</p></td>
     <td><p><strong>유형</strong>: 정수</p><p><strong>범위</strong>: [1, <em>int_max</em>]</p><p><strong>기본값</strong>: 일반 kNN 검색의 경우 <code translate="no">max(limit, 16)</code>, 범위 검색의 경우 <code translate="no">512</code>.</p><p>일반 kNN 검색의 경우, 명시적인 <code translate="no">ef</code> 은 <code translate="no">limit</code> (반환할 가장 가까운 이웃의 수)보다 크거나 같아야 합니다.</p></td>
     <td><p><code translate="no">ef</code> 값이 클수록 더 많은 잠재적 이웃이 고려되므로 일반적으로 <strong>검색 정확도가 높아집니다</strong>. 그러나 이로 인해 <strong>검색 시간도 늘어납니다</strong>.</p><p>높은 리콜을 달성하는 것이 중요하고 검색 속도는 그다지 문제가 되지 않는 경우, <code translate="no">ef</code> 를 늘리는 것을 고려해 보십시오.</p><p>특히 정확도가 약간 낮아져도 괜찮은 상황에서는 더 빠른 검색을 우선시하기 위해 <code translate="no">ef</code> 값을 줄이는 것을 고려해 보십시오.</p><p>대부분의 경우, [K, 10K] 범위 내의 값을 설정하는 것이 좋습니다.</p></td>
   </tr>
   <tr>
     <td><p>SQ</p></td>
     <td><p><code translate="no">refine_k</code></p></td>
     <td><p>요청된 상위 K개 결과에 비해, 정제 단계에서 검토되는 추가 후보의 수를 제어하는 확대 계수입니다.</p></td>
     <td><p><strong>유형</strong>: 부동 소수점</p><p><strong>범위</strong>: [1, <em>float_max</em>)</p><p><strong>기본값</strong>: 1</p></td>
     <td><p><code translate="no">refine_k</code> 의 값이 높을수록 재현율과 정확도는 향상될 수 있지만, 검색 시간과 리소스 사용량도 증가합니다. 값이 1인 경우, 정제 과정에서는 초기 상위 K개 결과만 고려합니다.</p></td>
   </tr>
</table>
