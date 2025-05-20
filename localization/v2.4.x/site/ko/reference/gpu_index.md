---
id: gpu_index.md
related_key: gpu_index
summary: Milvus의 GPU 인덱스 메커니즘.
title: GPU 인덱스
---
<h1 id="GPU-Index" class="common-anchor-header">GPU 인덱스<button data-href="#GPU-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 특히 처리량이 많고 호출 횟수가 많은 시나리오에서 검색 성능과 효율성을 가속화하기 위해 다양한 GPU 인덱스 유형을 지원합니다. 이 항목에서는 Milvus에서 지원하는 GPU 인덱스 유형, 적합한 사용 사례 및 성능 특성에 대한 개요를 제공합니다. GPU를 사용한 인덱스 구축에 대한 자세한 내용은 <a href="/docs/ko/v2.4.x/index-with-gpu.md">GPU를 사용한 인덱스를</a> 참조하세요.</p>
<p>GPU 인덱스를 사용한다고 해서 CPU 인덱스를 사용하는 것보다 지연 시간이 반드시 단축되는 것은 아니라는 점에 유의하세요. 처리량을 완전히 최대화하려면 요청 압력이 매우 높거나 쿼리 벡터의 수가 많아야 합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/gpu_index.png" alt="performance" class="doc-image" id="performance" />
   </span> <span class="img-wrapper"> <span>성능</span> </span></p>
<p>Milvus의 GPU 지원은 Nvidia <a href="https://rapids.ai/">RAPIDS</a> 팀에 의해 제공되고 있습니다. 현재 Milvus에서 지원하는 GPU 인덱스 유형은 다음과 같습니다.</p>
<h2 id="GPUCAGRA" class="common-anchor-header">GPU_CAGRA<button data-href="#GPUCAGRA" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_CAGRA는 GPU에 최적화된 그래프 기반 인덱스로, 추론용 GPU를 사용하여 Milvus GPU 버전을 실행하면 고가의 훈련용 GPU를 사용하는 것보다 비용 효율이 높을 수 있습니다.</p>
<ul>
<li><p>인덱스 구축 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">intermediate_graph_degree</code></td><td>가지치기 전 그래프의 정도를 결정하여 리콜 및 구축 시간에 영향을 줍니다. 권장 값은 <code translate="no">32</code> 또는 <code translate="no">64</code> 입니다.</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">graph_degree</code></td><td>가지치기 후 그래프의 차수를 설정하여 검색 성능과 리콜에 영향을 줍니다. 이 두 도의 차이가 클수록 빌드 시간이 길어집니다. 이 값은 <strong>intermediate_graph_degree의</strong> 값보다 작아야 합니다.</td><td><code translate="no">64</code></td></tr>
<tr><td><code translate="no">build_algo</code></td><td>가지치기 전 그래프 생성 알고리즘을 선택합니다. 가능한 값</br><code translate="no">IVF_PQ</code>: 더 높은 품질을 제공하지만 빌드 시간이 느립니다.</br> <code translate="no">NN_DESCENT</code> 더 빠른 빌드를 제공하지만 잠재적으로 더 낮은 리콜을 제공합니다.</td><td><code translate="no">IVF_PQ</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>원본 데이터 세트를 GPU 메모리에 캐시할지 여부를 결정합니다. 가능한 값</br><code translate="no">“true”</code>: 원본 데이터 세트를 캐시하여 검색 결과를 구체화하여 리콜을 향상시킵니다.</br> <code translate="no">“false”</code> GPU 메모리를 절약하기 위해 원본 데이터셋을 캐시하지 않습니다.</td><td><code translate="no">“false”</code></td></tr>
</tbody>
</table>
</li>
<li><p>검색 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">itopk_size</code></td><td>검색 중에 유지되는 중간 결과의 크기를 결정합니다. 값이 클수록 검색 성능이 저하되는 대신 검색 회수율이 향상될 수 있습니다. 이 값은 최소한 최종 상위 k(한계) 값과 같아야 하며 일반적으로 2의 거듭제곱입니다(예: 16, 32, 64, 128).</td><td>Empty</td></tr>
<tr><td><code translate="no">search_width</code></td><td>검색 중에 CAGRA 그래프에 포함할 진입점 수를 지정합니다. 이 값을 늘리면 기억력이 향상될 수 있지만 검색 성능에 영향을 줄 수 있습니다(예: 1, 2, 4, 8, 16, 32).</td><td>Empty</td></tr>
<tr><td><code translate="no">min_iterations</code> / <code translate="no">max_iterations</code></td><td>검색 반복 프로세스를 제어합니다. 기본적으로 <code translate="no">0</code> 로 설정되어 있으며, CAGRA는 <code translate="no">itopk_size</code> 및 <code translate="no">search_width</code> 에 따라 반복 횟수를 자동으로 결정합니다. 이 값을 수동으로 조정하면 성능과 정확도의 균형을 맞추는 데 도움이 될 수 있습니다.</td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">team_size</code></td><td>GPU에서 메트릭 거리를 계산하는 데 사용되는 CUDA 스레드 수를 지정합니다. 일반적인 값은 2의 거듭제곱에서 최대 32입니다(예: 2, 4, 8, 16, 32). 검색 성능에 약간의 영향을 미칩니다. 기본값은 <code translate="no">0</code> 이며, Milvus는 벡터 차원에 따라 <code translate="no">team_size</code> 을 자동으로 선택합니다.</td><td><code translate="no">0</code></td></tr>
</tbody>
</table>
</li>
</ul>
<ul>
<li><p>검색 제한</p>
<table>
<thead>
<tr><th>매개변수</th><th>범위</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (상위-K)</td><td>&lt;= 1024</td></tr>
<tr><td><code translate="no">limit</code> (top-K)</td><td>&lt;=max((<code translate="no">itopk_size</code> + 31)// 32, <code translate="no">search_width</code>) * 32</td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFFLAT" class="common-anchor-header">GPU_IVF_FLAT<button data-href="#GPUIVFFLAT" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://milvus.io/docs/index.md#IVF_FLAT">IVF_FLAT과</a> 마찬가지로 GPU_IVF_FLAT도 벡터 데이터를 <code translate="no">nlist</code> 클러스터 단위로 나눈 다음 대상 입력 벡터와 각 클러스터의 중심 사이의 거리를 비교합니다. 시스템이 쿼리하도록 설정된 클러스터 수에 따라(<code translate="no">nprobe</code>), 유사도 검색 결과는 대상 입력과 가장 유사한 클러스터의 벡터 간의 비교만을 기반으로 반환되므로 쿼리 시간이 크게 단축됩니다.</p>
<p><code translate="no">nprobe</code> 을 조정하면 주어진 시나리오에서 정확도와 속도 사이의 이상적인 균형을 찾을 수 있습니다. <a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">IVF_FLAT 성능 테스트의</a> 결과는 대상 입력 벡터의 수(<code translate="no">nq</code>)와 검색할 클러스터의 수(<code translate="no">nprobe</code>)가 모두 증가함에 따라 쿼리 시간이 급격히 증가한다는 것을 보여줍니다.</p>
<p>GPU_IVF_FLAT은 가장 기본적인 IVF 인덱스이며, 각 유닛에 저장된 인코딩된 데이터는 원본 데이터와 일치합니다.</p>
<p>검색을 수행할 때, GPU_IVF_FLAT 인덱싱된 컬렉션에 대한 모든 검색에 대해 최대 256까지 top-K를 설정할 수 있다는 점에 유의하세요.</p>
<ul>
<li><p>인덱스 구축 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>클러스터 단위 수</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>원본 데이터 세트를 GPU 메모리에 캐시할지 여부를 결정합니다. 가능한 값은 다음과 같습니다:</br><code translate="no">“true”</code>: 원본 데이터 세트를 캐시하여 검색 결과를 세분화하여 리콜을 향상시킵니다.</br> <code translate="no">“false”</code> GPU 메모리를 절약하기 위해 원본 데이터 세트를 캐시하지 않습니다.</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;flase&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>검색 매개변수</p>
<ul>
<li><p>일반 검색</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>쿼리할 단위 수</td><td>[1, nlist]</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>검색 제한</p>
<table>
<thead>
<tr><th>파라미터</th><th>범위</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (상위-K)</td><td>&lt;= <code translate="no">2048</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUIVFPQ" class="common-anchor-header">GPU_IVF_PQ<button data-href="#GPUIVFPQ" class="anchor-icon" translate="no">
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
    </button></h2><p><code translate="no">PQ</code> (곱 양자화)는 원래의 고차원 벡터 공간을 <code translate="no">m</code> 저차원 벡터 공간의 데카르트 곱으로 균일하게 분해한 다음 분해된 저차원 벡터 공간을 정량화합니다. 곱 양자화는 목표 벡터와 모든 단위의 중심 사이의 거리를 계산하는 대신 목표 벡터와 각 저차원 공간의 클러스터링 중심 사이의 거리를 계산할 수 있어 알고리즘의 시간 복잡도와 공간 복잡도를 크게 줄여줍니다.</p>
<p>IVF_PQ는 벡터의 곱을 정량화하기 전에 IVF 인덱스 클러스터링을 수행합니다. 이 인덱스 파일은 IVF_SQ8보다 훨씬 작지만 벡터를 검색하는 동안 정확도가 떨어집니다.</p>
<div class="alert note">
<p>인덱스 구축 파라미터와 검색 파라미터는 Milvus 분포에 따라 다릅니다. 먼저 Milvus 배포를 선택하세요.</p>
<p>검색을 수행할 때, GPU_IVF_FLAT 인덱싱된 컬렉션에 대한 모든 검색에 대해 상위-K를 최대 8192까지 설정할 수 있다는 점에 유의하세요.</p>
</div>
<ul>
<li><p>인덱스 구축 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>클러스터 단위 수</td><td>[1, 65536]</td><td><code translate="no">128</code></td></tr>
<tr><td><code translate="no">m</code></td><td>제품 양자화 요소의 수입니다,</td><td><code translate="no">dim mod m or = 0</code></td><td><code translate="no">0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[선택 사항] 각 저차원 벡터가 저장되는 비트 수입니다.</td><td>[1, 16]</td><td><code translate="no">8</code></td></tr>
<tr><td><code translate="no">cache_dataset_on_device</code></td><td>원본 데이터 세트를 GPU 메모리에 캐시할지 여부를 결정합니다. 가능한 값</br><code translate="no">“true”</code>: 원본 데이터 세트를 캐시하여 검색 결과를 세분화하여 리콜을 향상시킵니다.</br> <code translate="no">“false”</code> GPU 메모리를 절약하기 위해 원본 데이터 세트를 캐시하지 않습니다.</td><td><code translate="no">&quot;true&quot;</code> <code translate="no">&quot;false&quot;</code></td><td><code translate="no">&quot;false&quot;</code></td></tr>
</tbody>
</table>
</li>
<li><p>검색 매개변수</p>
<ul>
<li><p>일반 검색</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>쿼리할 단위 수</td><td>[1, nlist]</td><td><code translate="no">8</code></td></tr>
</tbody>
</table>
</li>
</ul></li>
<li><p>검색 제한</p>
<table>
<thead>
<tr><th>파라미터</th><th>범위</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">limit</code> (상위-K)</td><td>&lt;= <code translate="no">1024</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h2 id="GPUBRUTEFORCE" class="common-anchor-header">GPU_BRUTE_FORCE<button data-href="#GPUBRUTEFORCE" class="anchor-icon" translate="no">
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
    </button></h2><p>GPU_BRUTE_FORCE는 각 쿼리를 데이터 세트의 모든 벡터와 비교하여 1의 재현율을 보장함으로써 매우 높은 재현율이 중요한 경우에 맞게 조정됩니다. 인덱스 구축 및 검색 파라미터로 메트릭 유형(<code translate="no">metric_type</code>)과 top-k(<code translate="no">limit</code>)만 필요합니다.</p>
<p>GPU_BRUTE_FORCE의 경우, 추가 인덱스 구축 파라미터나 검색 파라미터가 필요하지 않습니다.</p>
<h2 id="Conclusion" class="common-anchor-header">결론<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>현재 Milvus는 효율적인 검색 작업을 위해 모든 인덱스를 GPU 메모리에 로드합니다. 로드할 수 있는 데이터의 양은 GPU 메모리의 크기에 따라 달라집니다:</p>
<ul>
<li><strong>GPU_CAGRA</strong>: 메모리 사용량은 원본 벡터 데이터의 약 1.8배입니다.</li>
<li><strong>GPU_IVF_FLAT</strong> 및 <strong>GPU_BRUTE_FORCE</strong>: 원본 데이터 크기와 동일한 메모리가 필요합니다.</li>
<li><strong>GPU_IVF_PQ</strong>: 압축 파라미터 설정에 따라 더 작은 메모리 공간을 사용합니다.</li>
</ul>
