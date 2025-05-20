---
id: index-with-gpu.md
order: 3
summary: 이 가이드에서는 Milvus에서 GPU를 지원하는 인덱스를 구축하여 검색 성능을 향상시키는 방법을 설명합니다.
title: GPU를 사용한 색인
---
<h1 id="Index-with-GPU" class="common-anchor-header">GPU를 사용한 색인<button data-href="#Index-with-GPU" class="anchor-icon" translate="no">
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
    </button></h1><p>이 가이드에서는 처리량과 호출 횟수가 많은 시나리오에서 검색 성능을 크게 향상시킬 수 있는 Milvus에서 GPU를 지원하는 인덱스를 구축하는 단계를 간략하게 설명합니다. Milvus에서 지원하는 GPU 인덱스 유형에 대한 자세한 내용은 <a href="/docs/ko/v2.4.x/gpu_index.md">GPU 인덱스를</a> 참조하세요.</p>
<h2 id="Configure-Milvus-settings-for-GPU-memory-control" class="common-anchor-header">GPU 메모리 제어를 위한 Milvus 설정 구성하기<button data-href="#Configure-Milvus-settings-for-GPU-memory-control" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 글로벌 그래픽 메모리 풀을 사용하여 GPU 메모리를 할당합니다.</p>
<p><a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">Milvus 설정 파일에서</a> <code translate="no">initMemSize</code> 및 <code translate="no">maxMemSize</code> 두 개의 파라미터를 지원합니다. 풀 크기는 처음에 <code translate="no">initMemSize</code> 로 설정되며, 이 한도를 초과하면 <code translate="no">maxMemSize</code> 로 자동 확장됩니다.</p>
<p>기본값 <code translate="no">initMemSize</code> 은 Milvus 시작 시 사용 가능한 GPU 메모리의 1/2이며, 기본값 <code translate="no">maxMemSize</code> 은 사용 가능한 모든 GPU 메모리와 동일합니다.</p>
<p>Milvus 2.4.1(2.4.1 버전 포함)까지 Milvus는 통합 GPU 메모리 풀을 사용했습니다. 2.4.1(버전 2.4.1 포함) 이전 버전에서는 두 값을 모두 0으로 설정하는 것이 좋습니다.</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 2.4.1 이후부터는 검색 중 임시 GPU 데이터에만 GPU 메모리 풀이 사용됩니다. 따라서 2048과 4096으로 설정하는 것이 좋습니다.</p>
<pre><code translate="no" class="language-yaml">gpu:
  initMemSize: <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  maxMemSize: <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-an-index" class="common-anchor-header">인덱스 구축<button data-href="#Build-an-index" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 예제는 다양한 유형의 GPU 인덱스를 구축하는 방법을 보여줍니다.</p>
<h3 id="Prepare-index-parameters" class="common-anchor-header">인덱스 매개변수 준비하기</h3><p>GPU 인덱스 파라미터를 설정할 때 <strong>index_type</strong>, <strong>metric_type</strong>, <strong>params를</strong> 정의합니다:</p>
<ul>
<li><p><strong>index_type</strong><em>(문자열</em>): 벡터 검색을 가속화하는 데 사용되는 인덱스 유형입니다. 유효한 옵션으로는 <strong>GPU_CAGRA</strong>, <strong>GPU_IVF_FLAT</strong>, <strong>GPU_IVF_PQ</strong>, <strong>GPU_BRUTE_FORCE가</strong> 있습니다.</p></li>
<li><p><strong>metric_type</strong><em>(문자열</em>): 벡터의 유사성을 측정하는 데 사용되는 메트릭 유형입니다. 유효한 옵션은 <strong>IP와</strong> <strong>L2입니다</strong>.</p></li>
<li><p><strong>params</strong><em>(딕셔너리</em>): 인덱스별 빌딩 매개변수입니다. 이 매개변수에 유효한 옵션은 인덱스 유형에 따라 다릅니다.</p></li>
</ul>
<p>다음은 다양한 인덱스 유형에 대한 구성 예시입니다:</p>
<ul>
<li><p><strong>GPU_CAGRA</strong> 인덱스</p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_CAGRA&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&#x27;intermediate_graph_degree&#x27;</span>: <span class="hljs-number">64</span>,
        <span class="hljs-string">&#x27;graph_degree&#x27;</span>: <span class="hljs-number">32</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>가능한 <strong>매개변수</strong> 옵션은 다음과 같습니다:</p>
<ul>
<li><p><strong>intermediate_graph_degree</strong><em>(int</em>): 가지치기 전 그래프의 정도를 결정하여 리콜 및 빌드 시간에 영향을 줍니다. 권장 값은 <strong>32</strong> 또는 <strong>64입니다</strong>.</p></li>
<li><p><strong>graph_degree</strong><em>(int</em>): 가지치기 후 그래프의 정도를 설정하여 검색 성능과 리콜에 영향을 줍니다. 일반적으로 <strong>intermediate_graph_degree의</strong> 절반입니다. 이 두 도의 차이가 클수록 빌드 시간이 길어집니다. 이 값은 <strong>intermediate_graph_degree의</strong> 값보다 작아야 합니다.</p></li>
<li><p><strong>build_algo</strong><em>(문자열</em>): 가지치기 전 그래프 생성 알고리즘을 선택합니다. 가능한 옵션은 다음과 같습니다:</p>
<ul>
<li><p><strong>IVF_PQ</strong>: 더 높은 품질을 제공하지만 빌드 시간이 느립니다.</p></li>
<li><p><strong>NN_DESCENT</strong>: 더 빠른 빌드를 제공하지만 잠재적으로 더 낮은 리콜을 제공합니다.</p></li>
</ul></li>
<li><p><strong>캐시_데이터셋_온_장치</strong><em>(문자열</em>, <strong>"true"</strong> | <strong>"false")</strong>: 원본 데이터셋을 GPU 메모리에 캐시할지 여부를 결정합니다. 이 값을 <strong>"true"</strong> 로 설정하면 검색 결과를 세분화하여 리콜을 향상시키고, <strong>"false"</strong> 로 설정하면 GPU 메모리를 절약합니다.</p></li>
</ul></li>
<li><p><strong>GPU_IVF_FLAT</strong> 또는 <strong>GPU_IVF_PQ</strong> 인덱스</p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;GPU_IVF_FLAT&quot;</span>, <span class="hljs-comment"># Or GPU_IVF_PQ</span>
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p><strong>매개변수</strong> 옵션은 <strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a></strong> 및 <strong><a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ에서</a></strong> 사용되는 옵션과 동일합니다.</p></li>
<li><p><strong>GPU_BRUTE_FORCE</strong> 인덱스</p>
<pre><code translate="no" class="language-python">index_params = {
    <span class="hljs-string">&#x27;index_type&#x27;</span>: <span class="hljs-string">&#x27;GPU_BRUTE_FORCE&#x27;</span>,
    <span class="hljs-string">&#x27;metric_type&#x27;</span>: <span class="hljs-string">&#x27;L2&#x27;</span>,
    <span class="hljs-string">&#x27;params&#x27;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>추가 <strong>파라미터</strong> 구성이 필요하지 않습니다.</p></li>
</ul>
<h3 id="Build-index" class="common-anchor-header">인덱스 빌드</h3><p><strong>index_params에서</strong> 인덱스 파라미터를 구성한 후, 인덱스를 빌드하기 위해 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/create_index.md"><code translate="no">create_index()</code></a> 메서드를 호출하여 인덱스를 빌드합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Get an existing collection</span>
collection = Collection(<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>)

collection.create_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field on which an index is built</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search" class="common-anchor-header">검색<button data-href="#Search" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU 인덱스를 구축했으면 다음 단계는 검색을 수행하기 전에 검색 매개변수를 준비하는 것입니다.</p>
<h3 id="Prepare-search-parameters" class="common-anchor-header">검색 매개변수 준비하기</h3><p>다음은 다양한 인덱스 유형에 대한 구성 예시입니다:</p>
<ul>
<li><p><strong>GPU_BRUTE_FORCE</strong> 인덱스</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
<p>추가 <strong>파라미터</strong> 구성은 필요하지 않습니다.</p></li>
<li><p><strong>GPU_CAGRA</strong> 인덱스</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;itopk_size&quot;</span>: <span class="hljs-number">128</span>,
        <span class="hljs-string">&quot;search_width&quot;</span>: <span class="hljs-number">4</span>,
        <span class="hljs-string">&quot;min_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;max_iterations&quot;</span>: <span class="hljs-number">0</span>,
        <span class="hljs-string">&quot;team_size&quot;</span>: <span class="hljs-number">0</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<p>주요 검색 매개변수는 다음과 같습니다:</p>
<ul>
<li><p><strong>itopk_size</strong>: 검색 중에 보관되는 중간 결과의 크기를 결정합니다. 값이 클수록 검색 성능이 저하되는 대신 회상률이 향상될 수 있습니다. 이 값은 최소한 최종 상위 k<strong>(한계</strong>) 값과 같아야 하며 일반적으로 2의 거듭제곱입니다(예: 16, 32, 64, 128).</p></li>
<li><p><strong>search_width</strong>: 검색 중 CAGRA 그래프에 들어가는 진입점 수를 지정합니다. 이 값을 높이면 검색 회수율은 향상될 수 있지만 검색 성능에 영향을 줄 수 있습니다.</p></li>
<li><p><strong>MIN_ITERATIONS</strong> / <strong>MAX_ITERATIONS</strong>: 이 매개변수는 검색 반복 프로세스를 제어합니다. 기본적으로 이 값은 <strong>0으로</strong> 설정되어 있으며, CAGRA는 <strong>itopk_size</strong> 및 <strong>search_width에</strong> 따라 반복 횟수를 자동으로 결정합니다. 이 값을 수동으로 조정하면 성능과 정확도의 균형을 맞추는 데 도움이 될 수 있습니다.</p></li>
<li><p><strong>team_size</strong>: GPU에서 메트릭 거리를 계산하는 데 사용되는 CUDA 스레드 수를 지정합니다. 일반적인 값은 2의 거듭제곱에서 최대 32입니다(예: 2, 4, 8, 16, 32). 검색 성능에 약간의 영향을 미칩니다. 기본값은 <strong>0이며</strong>, Milvus는 벡터 차원에 따라 자동으로 <strong>team_size를</strong> 선택합니다.</p></li>
</ul></li>
<li><p><strong>GPU_IVF_FLAT</strong> 또는 <strong>GPU_IVF_PQ</strong> 인덱스</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, 
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}
}
<button class="copy-code-btn"></button></code></pre>
<p>이 두 인덱스 유형에 대한 검색 매개변수는 <strong><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT</a> 및 <a href="https://milvus.io/docs/index.md#IVF_PQ">IVF_PQ에</a></strong> 사용되는 것과 유사합니다. 자세한 내용은 <a href="https://milvus.io/docs/search.md#Prepare-search-parameters">벡터 유사도 검색 수행을</a> 참조하세요.</p></li>
</ul>
<h3 id="Conduct-a-search" class="common-anchor-header">검색 수행</h3><p>벡터 유사도 검색을 수행하려면 <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/search.md"><code translate="no">search()</code></a> 메서드를 사용하여 GPU 인덱스에서 벡터 유사도 검색을 수행합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Load data into memory</span>
collection.load()

collection.search(
    data=[[query_vector]], <span class="hljs-comment"># Your query vector</span>
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-comment"># Name of the vector field</span>
    param=search_params,
    limit=<span class="hljs-number">100</span> <span class="hljs-comment"># Number of the results to return</span>
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Limits" class="common-anchor-header">제한 사항<button data-href="#Limits" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU 인덱스를 사용할 때는 특정 제약 조건에 유의해야 합니다:</p>
<ul>
<li><p><strong>GPU_IVF_FLAT의</strong> 경우, <strong>제한의</strong> 최대값은 1024입니다.</p></li>
<li><p><strong>GPU_IVF_PQ</strong> 및 <strong>GPU_CAGRA의</strong> 경우, <strong>제한의</strong> 최대값은 1024입니다.</p></li>
<li><p><strong>GPU_BRUTE_FORCE에</strong> 대한 <strong>제한은</strong> 설정되어 있지 않지만 잠재적인 성능 문제를 피하기 위해 4096을 초과하지 않는 것이 좋습니다.</p></li>
<li><p>현재 GPU 인덱스는 COSINE 거리를 지원하지 않습니다. COSINE 거리가 필요한 경우 먼저 데이터를 정규화한 다음 내부 곱(IP) 거리를 대체로 사용할 수 있습니다.</p></li>
<li><p>GPU 인덱스에 대한 로드 OOM 보호는 완전히 지원되지 않으며, 너무 많은 데이터는 QueryNode 충돌을 일으킬 수 있습니다.</p></li>
<li><p>GPU 인덱스는 <a href="https://milvus.io/docs/single-vector-search.md#Range-search">범위 검색</a> 및 <a href="https://milvus.io/docs/single-vector-search.md#Grouping-searchh">그룹화 검색과</a> 같은 검색 기능을 지원하지 않습니다.</p></li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><ul>
<li><p><strong>GPU 인덱스는 언제 사용하는 것이 적절하나요?</strong></p>
<p>GPU 인덱스는 특히 높은 처리량이나 높은 리콜이 필요한 상황에서 유용합니다. 예를 들어, 대규모 배치를 처리할 때 GPU 인덱싱의 처리량은 CPU 인덱싱의 처리량을 100배까지 능가할 수 있습니다. 배치 규모가 작은 시나리오에서는 여전히 성능 면에서 GPU 인덱싱이 CPU 인덱싱을 크게 앞섭니다. 또한, 빠른 데이터 삽입이 요구되는 경우, GPU를 통합하면 인덱스 구축 프로세스의 속도를 크게 높일 수 있습니다.</p></li>
<li><p><strong>CAGRA, GPU_IVF_PQ, GPU_IVF_FLAT, GPU_BRUTE_FORCE와 같은 GPU 인덱스는 어떤 시나리오에 가장 적합할까요?</strong></p>
<p>CAGRA 인덱스는 더 많은 메모리를 사용하지만 향상된 성능을 요구하는 시나리오에 이상적입니다. 메모리 보존이 우선시되는 환경에서는 <strong>GPU_IVF_PQ</strong> 인덱스가 스토리지 요구 사항을 최소화하는 데 도움이 될 수 있지만, 정밀도 손실이 더 높습니다. <strong>GPU_IVF_FLAT</strong> 인덱스는 성능과 메모리 사용량 사이의 절충점을 제공하는 균형 잡힌 옵션입니다. 마지막으로 <strong>GPU_BRUTE_FORCE</strong> 인덱스는 철저한 검색 작업을 위해 설계되었으며, 순회 검색을 수행하여 1의 리콜률을 보장합니다.</p></li>
</ul>
