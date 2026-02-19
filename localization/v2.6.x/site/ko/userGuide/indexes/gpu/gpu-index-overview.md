---
id: gpu-index-overview.md
title: GPU 인덱스 개요
summary: Milvus에서 GPU를 지원하는 인덱스를 구축하면 처리량이 많고 호출 빈도가 높은 시나리오에서 검색 성능을 크게 향상시킬 수 있습니다.
---
<h1 id="GPU-Index-Overview" class="common-anchor-header">GPU 인덱스 개요<button data-href="#GPU-Index-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus에서 GPU를 지원하는 인덱스를 구축하면 처리량과 호출 횟수가 많은 시나리오에서 검색 성능을 크게 향상시킬 수 있습니다.</p>
<p>다음 그림은 인덱스 구성, 하드웨어 설정, 벡터 데이터 세트(Cohere 및 OpenAI), 검색 배치 크기에서 쿼리 처리량(초당 쿼리 수)을 비교한 것으로, <code translate="no">GPU_CAGRA</code> 이 다른 방법보다 일관되게 우수한 성능을 보여줍니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/gpu-index-performance.png" alt="Gpu Index Performance" class="doc-image" id="gpu-index-performance" />
   </span> <span class="img-wrapper"> <span>GPU 인덱스 성능</span> </span></p>
<h2 id="Configure-GPU-memory-pool-for-Milvus" class="common-anchor-header">Milvus용 GPU 메모리 풀 구성<button data-href="#Configure-GPU-memory-pool-for-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 글로벌 GPU 메모리 풀을 지원하며 <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">Milvus 구성 파일에</a> <code translate="no">initMemSize</code> 및 <code translate="no">maxMemSize</code> 이라는 두 가지 구성 파라미터를 제공합니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># sets the maximum memory usage limit. When the memory usage exceeds initMemSize, Milvus will attempt to expand the memory pool.</span>
<button class="copy-code-btn"></button></code></pre>
<p>기본값 <code translate="no">initMemSize</code> 은 일반적으로 Milvus가 시작될 때 GPU 메모리의 절반이며, <code translate="no">maxMemSize</code> 은 전체 GPU 메모리를 기본값으로 설정합니다. GPU 메모리 풀 크기는 처음에 <code translate="no">initMemSize</code> 로 설정되며 필요에 따라 자동으로 <code translate="no">maxMemSize</code> 로 확장됩니다.</p>
<p>GPU 사용 인덱스가 지정되면 Milvus는 검색 전에 대상 수집 데이터를 GPU 메모리에 로드하므로 <code translate="no">maxMemSize</code> 은 최소 데이터 크기여야 합니다.</p>
<h2 id="Limits" class="common-anchor-header">제한<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p><code translate="no">GPU_IVF_FLAT</code> 의 경우 <code translate="no">limit</code> 의 최대값은 1,024입니다.</p></li>
<li><p><code translate="no">GPU_IVF_PQ</code> 및 <code translate="no">GPU_CAGRA</code> 의 경우 <code translate="no">limit</code> 의 최대값은 1,024입니다.</p></li>
<li><p><code translate="no">GPU_BRUTE_FORCE</code> 의 경우 <code translate="no">limit</code> 는 설정되어 있지 않지만 잠재적인 성능 문제를 방지하기 위해 4,096을 초과하지 않는 것이 좋습니다.</p></li>
<li><p>현재 GPU 인덱스는 <code translate="no">COSINE</code> 거리를 지원하지 않습니다. <code translate="no">COSINE</code> 거리가 필요한 경우 먼저 데이터를 정규화한 다음 내부 곱(IP) 거리를 대체로 사용할 수 있습니다.</p></li>
<li><p>GPU 인덱스에 대한 로드 OOM 보호는 완전히 지원되지 않으며, 너무 많은 데이터는 쿼리 노드 충돌을 일으킬 수 있습니다.</p></li>
<li><p>GPU 인덱스는 <a href="/docs/ko/range-search.md">범위 검색</a> 및 <a href="/docs/ko/grouping-search.md">그룹 검색과</a> 같은 검색 기능을 지원하지 않습니다.</p></li>
</ul>
<h2 id="Supported-GPU-index-types" class="common-anchor-header">지원되는 GPU 인덱스 유형<button data-href="#Supported-GPU-index-types" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 표에는 Milvus에서 지원하는 GPU 인덱스 유형이 나와 있습니다.</p>
<table>
   <tr>
     <th><p>인덱스 유형</p></th>
     <th><p>설명</p></th>
     <th><p>메모리 사용량</p></th>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/gpu-cagra.md">GPU_CAGRA</a></p></td>
     <td><p>GPU_CAGRA는 GPU에 최적화된 그래프 기반 인덱스로, 추론용 GPU를 사용하여 Milvus GPU 버전을 실행하는 것이 고가의 학습용 GPU를 사용하는 것보다 비용 효율적입니다.</p></td>
     <td><p>메모리 사용량은 원본 벡터 데이터의 약 1.8배입니다.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/gpu-ivf-flat.md">GPU_IVF_FLAT</a></p></td>
     <td><p>GPU_IVF_FLAT은 가장 기본적인 IVF 인덱스이며, 각 유닛에 저장된 인코딩된 데이터는 원본 데이터와 일치합니다. 검색을 수행할 때, GPU_IVF_FLAT 인덱싱된 컬렉션에 대한 검색에 대해 최대 256까지 top-k (<code translate="no">limit</code>)를 설정할 수 있다는 점에 유의하세요.</p></td>
     <td><p>원본 데이터의 크기와 동일한 메모리가 필요합니다.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/gpu-ivf-pq.md">GPU_IVF_PQ</a></p></td>
     <td><p>GPU_IVF_PQ는 벡터의 곱을 정량화하기 전에 IVF 인덱스 클러스터링을 수행합니다. 검색을 수행할 때, GPU_IVF_FLAT 인덱싱된 컬렉션에 대한 모든 검색에 대해 최대 8,192까지 top-k (<code translate="no">limit</code>)를 설정할 수 있다는 점에 유의하세요.</p></td>
     <td><p>압축 매개변수 설정에 따라 더 작은 메모리 공간을 사용합니다.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/ko/gpu-brute-force.md">GPU_BRUTE_FORCE</a></p></td>
     <td><p>GPU_BRUTE_FORCE는 각 쿼리를 데이터 세트의 모든 벡터와 비교하여 1의 리콜을 보장함으로써 매우 높은 리콜이 중요한 경우에 맞게 조정됩니다. 인덱스 구축 및 검색 매개변수로 메트릭 유형(<code translate="no">metric_type</code>)과 top-k(<code translate="no">limit</code>)만 필요합니다.</p></td>
     <td><p>원본 데이터의 크기와 동일한 메모리가 필요합니다.</p></td>
   </tr>
</table>
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
    </button></h2><p>Milvus는 글로벌 그래픽 메모리 풀을 사용하여 GPU 메모리를 할당합니다. <a href="https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml#L767-L769">Milvus 설정 파일에서</a> <code translate="no">initMemSize</code> 및 <code translate="no">maxMemSize</code> 두 개의 파라미터를 지원합니다. 풀 크기는 처음에 <code translate="no">initMemSize</code> 로 설정되며, 이 한도를 초과하면 <code translate="no">maxMemSize</code> 로 자동 확장됩니다.</p>
<p>기본값 <code translate="no">initMemSize</code> 은 Milvus 시작 시 사용 가능한 GPU 메모리의 1/2이며, 기본값 <code translate="no">maxMemSize</code> 은 사용 가능한 모든 GPU 메모리와 동일합니다.</p>
<p>Milvus 2.4.1까지 Milvus는 통합 GPU 메모리 풀을 사용합니다. 2.4.1 이전 버전에서는 두 값을 모두 0으로 설정하는 것이 좋습니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">0</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>Milvus 2.4.1 이후 버전부터는 GPU 메모리 풀이 검색 중 임시 GPU 데이터에만 사용됩니다. 따라서 2048 및 4096으로 설정하는 것이 좋습니다.</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">gpu:</span>
  <span class="hljs-attr">initMemSize:</span> <span class="hljs-number">2048</span> <span class="hljs-comment">#set the initial memory pool size.</span>
  <span class="hljs-attr">maxMemSize:</span> <span class="hljs-number">4096</span> <span class="hljs-comment">#maxMemSize sets the maximum memory usage limit. When the memory usage exceed initMemSize, Milvus will attempt to expand the memory pool. </span>
<button class="copy-code-btn"></button></code></pre>
<p>GPU 인덱스 구축 방법을 알아보려면 각 인덱스 유형에 대한 구체적인 가이드를 참조하세요.</p>
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
<p>GPU 인덱스는 높은 처리량이나 높은 리콜이 필요한 상황에서 특히 유용합니다. 예를 들어, 대규모 배치를 처리할 때 GPU 인덱싱의 처리량은 CPU 인덱싱의 처리량을 100배까지 능가할 수 있습니다. 배치 규모가 작은 시나리오에서는 여전히 성능 면에서 GPU 인덱싱이 CPU 인덱싱을 크게 앞섭니다. 또한, 빠른 데이터 삽입이 요구되는 경우, GPU를 통합하면 인덱스 구축 프로세스의 속도를 크게 높일 수 있습니다.</p></li>
<li><p><strong>GPU_CAGRA, GPU_IVF_PQ, GPU_IVF_FLAT, GPU_BRUTE_FORCE와 같은 GPU 인덱스는 어떤 시나리오에 가장 적합할까요?</strong></p>
<p><code translate="no">GPU_CAGRA</code> 인덱스는 더 많은 메모리를 사용하지만 향상된 성능을 요구하는 시나리오에 이상적입니다. 메모리 절약이 우선 순위인 환경에서는 <code translate="no">GPU_IVF_PQ</code> 인덱스를 사용하면 스토리지 요구 사항을 최소화할 수 있지만 정밀도 손실이 더 큽니다. <code translate="no">GPU_IVF_FLAT</code> 인덱스는 성능과 메모리 사용량 사이에서 절충점을 제공하는 균형 잡힌 옵션입니다. 마지막으로 <code translate="no">GPU_BRUTE_FORCE</code> 인덱스는 철저한 검색 작업을 위해 설계되어 순회 검색을 수행하여 1의 검색 회수율을 보장합니다.</p></li>
</ul>
