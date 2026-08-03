---
id: gpu-cagra.md
title: GPU_CAGRA
summary: >-
  GPU_CAGRA 인덱스는 GPU에 최적화된 그래프 기반 인덱스입니다. 고가의 훈련용 GPU를 사용하는 것보다 추론용 GPU를 사용하여
  Milvus GPU 버전을 실행하는 것이 비용 효율적일 수 있습니다.
---
<h1 id="GPUCAGRA" class="common-anchor-header">GPU_CAGRA<button data-href="#GPUCAGRA" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>GPU_CAGRA</strong> 인덱스는 GPU에 최적화된 그래프 기반 인덱스입니다. 고가의 훈련용 GPU를 사용하는 것보다 추론용 GPU를 사용하여 Milvus GPU 버전을 실행하는 것이 비용 효율적일 수 있습니다.</p>
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
    </button></h2><p>Milvus에서 벡터 필드에 대해 ` <code translate="no">GPU_CAGRA</code> ` 인덱스를 구축하려면 ` <code translate="no">add_index()</code> ` 메서드를 사용하여 ` <code translate="no">index_type</code>`, ` <code translate="no">metric_type</code>` 및 인덱스에 대한 추가 매개변수를 지정하십시오.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;GPU_CAGRA&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;intermediate_graph_degree&quot;</span>: <span class="hljs-number">64</span>, <span class="hljs-comment"># Affects recall and build time by determining the graph’s degree before pruning</span>
        <span class="hljs-string">&quot;graph_degree&quot;</span>: <span class="hljs-number">32</span>, <span class="hljs-comment"># Affets search performance and recall by setting the graph’s degree after pruning</span>
        <span class="hljs-string">&quot;build_algo&quot;</span>: <span class="hljs-string">&quot;IVF_PQ&quot;</span>, <span class="hljs-comment"># Selects the graph generation algorithm before pruning</span>
        <span class="hljs-string">&quot;cache_dataset_on_device&quot;</span>: <span class="hljs-string">&quot;true&quot;</span>, <span class="hljs-comment"># Decides whether to cache the original dataset in GPU memory</span>
        <span class="hljs-string">&quot;adapt_for_cpu&quot;</span>: <span class="hljs-string">&quot;false&quot;</span>, <span class="hljs-comment"># Decides whether to use GPU for index-building and CPU for search</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>이 구성에서:</p>
<ul>
<li><p><code translate="no">index_type</code>: 생성할 인덱스의 유형입니다. 이 예제에서는 값을 ` <code translate="no">GPU_CAGRA</code>`로 설정합니다.</p></li>
<li><p><code translate="no">metric_type</code>: 벡터 간의 거리를 계산하는 데 사용되는 방법입니다. 자세한 내용은 <a href="/docs/ko/v2.6.x/metric.md">‘메트릭 유형’을</a> 참조하십시오.</p></li>
<li><p><code translate="no">params</code>: 인덱스 구축을 위한 추가 구성 옵션입니다. ` <code translate="no">GPU_CAGRA</code> ` 인덱스에 사용할 수 있는 구축 매개변수에 대한 자세한 내용은 <a href="/docs/ko/v2.6.x/gpu-cagra.md#Index-building-params">‘인덱스 구축 매개변수’를</a> 참조하십시오.</p></li>
</ul>
<p>인덱스 매개변수 구성이 완료되면, ` <code translate="no">create_index()</code> ` 메서드를 직접 사용하거나 ` <code translate="no">create_collection</code> ` 메서드에 인덱스 매개변수를 전달하여 인덱스를 생성할 수 있습니다. 자세한 내용은 <a href="/docs/ko/v2.6.x/create-collection.md">‘컬렉션 생성’을</a> 참조하십시오.</p>
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
    </button></h2><p>인덱스가 생성되고 엔티티가 삽입되면, 해당 인덱스를 사용하여 유사도 검색을 수행할 수 있습니다.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;itopk_size&quot;</span>: <span class="hljs-number">16</span>, <span class="hljs-comment"># Determines the size of intermediate results kept during the search</span>
        <span class="hljs-string">&quot;search_width&quot;</span>: <span class="hljs-number">8</span>, <span class="hljs-comment"># Specifies the number of entry points into the CAGRA graph during the search</span>
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
<p>이 구성에서는:</p>
<ul>
<li><code translate="no">params</code>: 인덱스 검색을 위한 추가 구성 옵션입니다. <code translate="no">GPU_CAGRA</code> 인덱스에서 사용할 수 있는 검색 매개변수에 대한 자세한 내용은 <a href="/docs/ko/v2.6.x/gpu-cagra.md#Index-specific-search-params">‘인덱스별 검색 매개변수’를</a> 참조하십시오.</li>
</ul>
<h2 id="Enable-CPU-search-at-load-time--Milvus-264+" class="common-anchor-header">로드 시 CPU 검색 활성화<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Enable-CPU-search-at-load-time--Milvus-264+" class="anchor-icon" translate="no">
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
    </button></h2><p>로드 시점에 CPU 검색을 동적으로 활성화하려면, ` <code translate="no">milvus.yaml</code>`의 다음 구성을 편집하십시오:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">GPU_CAGRA:</span>
    <span class="hljs-attr">load:</span> 
      <span class="hljs-attr">adapt_for_cpu:</span> <span class="hljs-literal">true</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>동작</strong></p>
<ul>
<li><p><code translate="no">load.adapt_for_cpu</code> 가 ‘ <code translate="no">true</code> ’로 설정된 경우, Milvus는 로드 과정에서 <strong>GPU_CAGRA</strong> 인덱스를 CPU에서 실행 가능한 형식(HNSW 유사)으로 변환합니다.</p></li>
<li><p>인덱스가 원래 GPU용으로 구축된 경우라도, 이후의 검색 작업은 CPU에서 실행됩니다.</p></li>
<li><p>이 매개변수가 생략되거나 false인 경우, 인덱스는 GPU에 남아 있으며 검색도 GPU에서 실행됩니다.</p></li>
</ul>
<div class="alert note">
<p>인덱스 구축을 위해 GPU 리소스가 할당되어 있지만 검색은 CPU에서 실행되는 하이브리드 또는 비용에 민감한 환경에서 로드 시 CPU 적응 기능을 사용하십시오.</p>
</div>
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
    </button></h2><p>이 섹션에서는 인덱스 구축 및 인덱스 검색에 사용되는 매개 변수에 대한 개요를 제공합니다.</p>
<h3 id="Index-building-params" class="common-anchor-header">인덱스 구축 매개변수<button data-href="#Index-building-params" class="anchor-icon" translate="no">
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
    </button></h3><p>다음 표에는 <a href="/docs/ko/v2.6.x/gpu-cagra.md#Build-index">인덱스 구축</a> 시 <code translate="no">params</code> 에서 구성할 수 있는 매개 변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th><p>매개 변수</p></th>
     <th><p>설명</p></th>
     <th><p>기본값</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">intermediate_graph_degree</code></p></td>
     <td><p>정리(pruning) 전 그래프의 차수(degree)를 결정하여 리콜(recall) 및 생성 시간에 영향을 줍니다. 권장 값은 <code translate="no">32</code> 또는 <code translate="no">64</code> 입니다.</p></td>
     <td><p><code translate="no">128</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">graph_degree</code></p></td>
     <td><p>프루닝 후 그래프의 차수를 설정하여 검색 성능과 리콜에 영향을 줍니다. 이 두 차수 간의 차이가 클수록 생성 시간이 길어집니다. 이 값은 <code translate="no">intermediate_graph_degree</code> 의 값보다 작아야 합니다.</p></td>
     <td><p><code translate="no">64</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">build_algo</code></p></td>
     <td><p>가지치기 전 그래프 생성 알고리즘을 선택합니다. 가능한 값:</p><ul><li><p><code translate="no">IVF_PQ</code>: 품질은 더 높지만 빌드 시간이 더 오래 걸립니다.</p></li><li><p><code translate="no">NN_DESCENT</code>: 더 빠른 생성 시간을 제공하지만, 리콜이 낮아질 수 있습니다.</p></li></ul></td>
     <td><p><code translate="no">IVF_PQ</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">cache_dataset_on_device</code></p></td>
     <td><p>원본 데이터셋을 GPU 메모리에 캐시할지 여부를 결정합니다. 가능한 값:</p><ul><li><p><code translate="no">"true"</code>: 원본 데이터셋을 캐시하여 검색 결과를 정교화함으로써 재현율을 향상시킵니다.</p></li><li><p><code translate="no">"false"</code>: GPU 메모리를 절약하기 위해 원본 데이터셋을 캐시하지 않습니다.</p></li></ul></td>
     <td><p><code translate="no">"false"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">adapt_for_cpu</code></p></td>
     <td><p>인덱스 구축에는 GPU를, 검색에는 CPU를 사용할지 여부를 결정합니다.</p><p>이 매개변수를 ` <code translate="no">"true"</code> `로 설정하려면 검색 요청에 ` <code translate="no">ef</code> ` 매개변수가 포함되어야 합니다.</p></td>
     <td><p><code translate="no">"false"</code></p></td>
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
    </button></h3><p>다음 표에는 <a href="/docs/ko/v2.6.x/gpu-cagra.md#Search-on-index">인덱스에서 검색할</a> 때 ` <code translate="no">search_params.params</code> `에서 구성할 수 있는 매개 변수가 나열되어 있습니다.</p>
<table>
   <tr>
     <th><p>매개변수</p></th>
     <th><p>설명</p></th>
     <th><p>기본값</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">itopk_size</code></p></td>
     <td><p>검색 중에 유지되는 중간 결과의 크기를 결정합니다. 값을 크게 설정하면 검색 성능은 저하되지만 리콜률은 향상될 수 있습니다. 이 값은 최종 top-k(제한) 값 이상이어야 하며, 일반적으로 2의 거듭제곱(예: 16, 32, 64, 128)입니다.</p></td>
     <td><p>비어 있음</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_width</code></p></td>
     <td><p>검색 중 CAGRA 그래프로의 진입점 수를 지정합니다. 이 값을 늘리면 재현율이 향상될 수 있지만, 검색 성능에 영향을 미칠 수 있습니다(예: 1, 2, 4, 8, 16, 32).</p></td>
     <td><p>비어 있음</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">num_random_samplings</code></p></td>
     <td><p>그래프 검색을 위한 초기 진입점을 선택할 때 CAGRA가 수행하는 무작위 샘플링의 정도를 제어합니다. 값이 클수록 CAGRA가 더 나은 지점에서 시작할 기회가 많아져, 검색 지연 시간이 증가하는 대가로 재현율이 향상됩니다. 값은 최소 <code translate="no">1</code> 이어야 합니다. Milvus 2.6.20 이상에서 사용할 수 있습니다.</p></td>
     <td><p><code translate="no">1</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">min_iterations</code> / <code translate="no">max_iterations</code></p></td>
     <td><p>검색 반복 과정을 제어합니다. 기본적으로 이 값들은 <code translate="no">0</code> 로 설정되어 있으며, CAGRA는 <code translate="no">itopk_size</code> 및 <code translate="no">search_width</code> 를 기반으로 반복 횟수를 자동으로 결정합니다. 이 값들을 수동으로 조정하면 성능과 정확도의 균형을 맞추는 데 도움이 될 수 있습니다.</p></td>
     <td><p><code translate="no">0</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">team_size</code></p></td>
     <td><p>GPU에서 메트릭 거리를 계산하는 데 사용되는 CUDA 스레드 수를 지정합니다. 일반적인 값은 32까지의 2의 거듭제곱(예: 2, 4, 8, 16, 32)입니다. 이는 검색 성능에 미미한 영향을 미칩니다. 기본값은 <code translate="no">0</code> 이며, 이 경우 Milvus는 벡터 차원을 기반으로 <code translate="no">team_size</code> 를 자동으로 선택합니다.</p></td>
     <td><p><code translate="no">0</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">ef</code></p></td>
     <td><p>쿼리 시간과 정확도 간의 균형을 지정합니다. ` <code translate="no">ef</code> ` 값이 높을수록 검색 정확도는 높아지지만 속도는 느려집니다.</p><p>인덱스를 생성할 때 ` <code translate="no">adapt_for_cpu</code> `을 ` <code translate="no">true</code> `으로 설정한 경우, 이 매개변수는 필수입니다.</p></td>
     <td><p><code translate="no">[top_k, int_max]</code></p></td>
   </tr>
</table>
