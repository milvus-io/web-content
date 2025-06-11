---
id: gpu-ivf-pq.md
title: GPU_IVF_PQ
summary: >-
  GPU_IVF_PQ 인덱스는 고차원 벡터를 더 작은 하위 공간으로 분해하고 효율적인 유사성 검색을 위해 이를 정량화하는 제품 정량화(PQ)와
  역파일 클러스터링을 결합해 IVF_PQ 개념을 기반으로 합니다. GPU 환경 전용으로 설계된 GPU_IVF_PQ는 병렬 처리를 활용해 계산을
  가속화하고 대규모 벡터 데이터를 효과적으로 처리합니다. 기본 개념에 대한 자세한 내용은 IVF_PQ를 참조하세요.
---
<h1 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>GPU_IVF_PQ</strong> 인덱스는 고차원 벡터를 더 작은 하위 공간으로 분해하고 효율적인 유사도 검색을 위해 이를 정량화하는 역 파일 클러스터링과 제품 정량화(PQ)를 결합하여 <strong>IVF_PQ</strong> 개념을 기반으로 합니다. GPU 환경 전용으로 설계된 GPU_IVF_PQ는 병렬 처리를 활용해 계산을 가속화하고 대규모 벡터 데이터를 효과적으로 처리합니다. 기본 개념에 대한 자세한 내용은 <a href="/docs/ko/ivf-pq.md">IVF_PQ를</a> 참조하세요.</p>
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
    </button></h2><p>Milvus에서 벡터 필드에 <code translate="no">GPU_IVF_PQ</code> 인덱스를 구축하려면 <code translate="no">add_index()</code> 방법을 사용하여 <code translate="no">index_type</code>, <code translate="no">metric_type</code> 및 인덱스에 대한 추가 매개 변수를 지정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_IVF_PQ&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;m&quot;</span>: <span class="hljs-number">4</span>, <span class="hljs-comment"># Number of sub-vectors to split eahc vector into</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서는</p>
<ul>
<li><p><code translate="no">index_type</code>: 빌드할 인덱스 유형입니다. 이 예에서는 값을 <code translate="no">GPU_IVF_PQ</code> 로 설정합니다.</p></li>
<li><p><code translate="no">metric_type</code>: 벡터 간의 거리를 계산하는 데 사용되는 메서드입니다. 지원되는 값은 <code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code> 입니다. 자세한 내용은 <a href="/docs/ko/metric.md">메트릭 유형을</a> 참조하세요.</p></li>
<li><p><code translate="no">params</code>: 인덱스 구축을 위한 추가 구성 옵션입니다.</p>
<ul>
<li><code translate="no">m</code>: 벡터를 분할할 하위 벡터의 수입니다.</li>
</ul>
<p><code translate="no">GPU_IVF_PQ</code> 인덱스에 사용할 수 있는 구축 매개변수에 대해 자세히 알아보려면 <a href="/docs/ko/gpu-ivf-pq.md#Index-building-params">인덱스 구축</a> 매개변수를 참조하세요.</p></li>
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
<p><code translate="no">GPU_IVF_PQ</code> 인덱스에 사용할 수 있는 검색 매개변수에 대해 자세히 알아보려면 <a href="/docs/ko/gpu-ivf-pq.md#Index-specific-search-params">인덱스별 검색 매개변수를</a> 참조하세요.</p></li>
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
<h3 id="Index-building-params" class="common-anchor-header">인덱스 구축 매개변수</h3><p>다음 표에는 <a href="/docs/ko/gpu-ivf-pq.md#Build-index">색인 작성</a> 시 <code translate="no">params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
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
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code translate="no">m</code></p></td>
     <td><p>양자화 프로세스 중에 각 고차원 벡터를 나눌 하위 벡터(양자화에 사용)의 수입니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, 65536]</p>
<p><strong>기본값입니다</strong>: None</p></td>
     <td><p><code translate="no">m</code> 값이 클수록 정확도가 향상될 수 있지만 계산 복잡성과 메모리 사용량이 증가합니다. <code translate="no">m</code> 은 적절한 분해를 보장하기 위해 벡터 차원<em>(D)</em>의 제수여야 합니다. 일반적으로 권장되는 값은 <em>m = D/2입니다</em>.</p>
<p>대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [D/8, D].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">nbits</code></p></td>
     <td><p>각 하위 벡터의 중심 인덱스를 압축된 형태로 표현하는 데 사용되는 비트 수입니다. 이는 각 코드북의 크기를 직접 결정합니다. 각 코드북에는 $2^{\textit{nbits}}$의 중심이 포함됩니다. 예를 들어 <code translate="no">nbits</code> 을 8로 설정하면 각 하위 벡터는 8비트 중심 인덱스로 표현됩니다. 따라서 해당 하위 벡터의 코드북에는 $2^8$(256)개의 가능한 중심이 있습니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, 64]</p>
<p><strong>기본값입니다</strong>: <code translate="no">8</code></p></td>
     <td><p><code translate="no">nbits</code> 값이 클수록 코드북이 커져 원본 벡터를 더 정확하게 표현할 수 있습니다. 하지만 각 인덱스를 저장하는 데 더 많은 비트를 사용하므로 압축률이 떨어집니다. 대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">cache_dataset_on_device</code></p></td>
     <td><p>원본 데이터 세트를 GPU 메모리에 캐시할지 여부를 결정합니다. 가능한 값</p>
<ul>
<li><p><code translate="no">"true"</code>: 원본 데이터 세트를 캐시하여 검색 결과를 세분화하여 리콜을 향상시킵니다.</p></li>
<li><p><code translate="no">"false"</code>: GPU 메모리를 절약하기 위해 원본 데이터 집합을 캐시하지 않습니다.</p></li>
</ul></td>
     <td><p><strong>유형</strong>: 문자열 <strong>범위</strong>: [<code translate="no">"true"</code>, <code translate="no">"false"</code>]</p>
<p><strong>기본값입니다</strong>: <code translate="no">"false"</code></p></td>
     <td><p><code translate="no">"true"</code> 로 설정하면 검색 결과를 세분화하여 불러오기가 향상되지만 GPU 메모리를 더 많이 사용합니다. <code translate="no">"false"</code> 로 설정하면 GPU 메모리를 절약할 수 있습니다.</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">색인별 검색 매개변수</h3><p>다음 표에는 <a href="/docs/ko/gpu-ivf-pq.md#Search-on-index">색인에서 검색할</a> 때 <code translate="no">search_params.params</code> 에서 구성할 수 있는 매개변수가 나열되어 있습니다.</p>
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
