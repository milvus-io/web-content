---
id: index.md
related_key: index
summary: Milvus의 인덱스 메커니즘.
title: 인메모리 인덱스
---
<h1 id="In-memory-Index" class="common-anchor-header">인메모리 인덱스<button data-href="#In-memory-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목에서는 Milvus가 지원하는 다양한 유형의 인메모리 인덱스, 각 인덱스가 가장 적합한 시나리오, 사용자가 더 나은 검색 성능을 달성하기 위해 구성할 수 있는 매개변수에 대해 설명합니다. 온디스크 인덱스에 대해서는 <strong><a href="/docs/ko/disk_index.md">온디스크 인덱스를</a></strong> 참조하세요.</p>
<p>인덱싱은 데이터를 효율적으로 정리하는 과정으로, 대규모 데이터 세트에서 시간이 오래 걸리는 쿼리를 획기적으로 가속화하여 유사성 검색을 유용하게 만드는 데 중요한 역할을 합니다.</p>
<p>쿼리 성능을 향상시키기 위해 각 벡터 필드에 <a href="/docs/ko/index-vector-fields.md">인덱스 유형을 지정할</a> 수 있습니다.</p>
<div class="alert note">
현재 벡터 필드는 하나의 인덱스 유형만 지원합니다. 밀버스는 인덱스 유형을 전환할 때 이전 인덱스를 자동으로 삭제합니다.</div>
<h2 id="ANNS-vector-indexes" class="common-anchor-header">ANNS 벡터 인덱스<button data-href="#ANNS-vector-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 지원하는 대부분의 벡터 인덱스 유형은 근사 근접 이웃 검색(ANNS) 알고리즘을 사용합니다. 일반적으로 시간이 많이 소요되는 정확한 검색과 비교했을 때, ANNS의 핵심 아이디어는 더 이상 가장 정확한 결과를 반환하는 데 국한되지 않고 대상의 이웃만 검색하는 것입니다. ANNS는 허용 가능한 범위 내에서 정확도를 희생하여 검색 효율성을 향상시킵니다.</p>
<p>구현 방식에 따라 ANNS 벡터 인덱스는 네 가지 유형으로 분류할 수 있습니다: 트리 기반, 그래프 기반, 해시 기반, 정량화 기반입니다.</p>
<h2 id="Indexes-supported-in-Milvus" class="common-anchor-header">Milvus에서 지원하는 인덱스<button data-href="#Indexes-supported-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 처리하는 벡터 임베딩 유형에 따라 <strong>부동</strong> 소수점 임베딩(부동 소수점 벡터 또는 고밀도 벡터라고도 함), <strong>이진 임베딩</strong> (이진 벡터라고도 함), <strong>스파스 임베딩</strong> (스파스 벡터라고도 함)으로 분류되는 다양한 인덱스 유형을 지원합니다.</p>
<div class="filter">
 <a href="#floating">부동 소수점 임베딩</a> <a href="#binary">이진 임베딩</a> <a href="#sparse">스파스 임베딩</a></div>
<div class="filter-floating">
<h3 id="Indexes-for-floating-point-embeddings" class="common-anchor-header">부동 소수점 임베딩의 인덱스</h3><p>128차원 부동 소수점 임베딩(벡터)의 경우, 임베딩이 차지하는 저장 공간은 128*플로트 크기 = 512바이트입니다. 그리고 부동 소수점 임베딩에 사용되는 <a href="/docs/ko/metric.md">거리 메트릭은</a> 유클리드 거리(<code translate="no">L2</code>)와 내적 곱(<code translate="no">IP</code>)입니다.</p>
<p>이러한 유형의 인덱스에는 <code translate="no">FLAT</code>, <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_PQ</code>, <code translate="no">IVF_SQ8</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code>, <code translate="no">SCANN</code> 이 포함됩니다.</p>
</div>
<div class="filter-binary">
<h3 id="Indexes-for-binary-embeddings" class="common-anchor-header">바이너리 임베딩용 인덱스</h3><p>128차원 바이너리 임베딩의 경우, 임베딩이 차지하는 저장 공간은 128 / 8 = 16바이트입니다. 그리고 이진 임베딩에 사용되는 거리 메트릭은 <code translate="no">JACCARD</code> 와 <code translate="no">HAMMING</code> 입니다.</p>
<p>이 유형의 인덱스에는 <code translate="no">BIN_FLAT</code> 와 <code translate="no">BIN_IVF_FLAT</code> 이 있습니다.</p>
</div>
<div class="filter-sparse">
<h3 id="Indexes-for-sparse-embeddings" class="common-anchor-header">스파스 임베딩용 인덱스</h3><p>스파스 임베딩용 인덱스는 <code translate="no">IP</code> 및 <code translate="no">BM25</code> (전체 텍스트 검색용) 메트릭만 지원합니다.</p>
<p>스파스 임베딩에 지원되는 인덱스 유형: <code translate="no">SPARSE_INVERTED_INDEX</code>.</p>
<div class="alert note">
<p>Milvus 2.5.4부터 <code translate="no">SPARSE_WAND</code> 은 더 이상 사용되지 않습니다. 대신, 호환성을 유지하면서 동등성을 위해 <code translate="no">&quot;inverted_index_algo&quot;: &quot;DAAT_WAND&quot;</code> 을 사용하는 것이 좋습니다. 자세한 내용은 <a href="/docs/ko/sparse_vector.md#Set-index-params-for-vector-field">스파스 벡터를</a> 참조하세요.</p>
</div>
</div>
<div class="filter-floating table-wrapper">
<table id="floating">
<thead>
  <tr>
    <th>지원되는 인덱스</th>
    <th>분류</th>
    <th>시나리오</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>FLAT</td>
    <td>N/A</td>
    <td>
      <ul>
        <li>상대적으로 작은 데이터 세트</li>
        <li>100% 리콜률 필요</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_FLAT</td>
    <td>N/A</td>
    <td>
      <ul>
        <li>고속 쿼리</li>
        <li>가능한 한 높은 리콜률 필요</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_SQ8</td>
    <td>정량화 기반 인덱스</td>
    <td>
      <ul>
        <li>매우 빠른 쿼리</li>
        <li>제한된 메모리 리소스</li>
        <li>리콜률에서 약간의 타협 허용</li>
      </ul>
    </td>
  </tr>  
  <tr>
    <td>IVF_PQ</td>
    <td>양자화 기반 인덱스</td>
    <td>
      <ul>
        <li>고속 쿼리</li>
        <li>제한된 메모리 리소스</li>
        <li>리콜률에서 약간의 성능 저하 허용</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW</td>
    <td>그래프 기반 인덱스</td>
    <td>
      <ul>
        <li>매우 빠른 쿼리</li>
        <li>가능한 한 높은 리콜률 필요</li>
        <li>대용량 메모리 리소스</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW_SQ</td>
    <td>정량화 기반 인덱스</td>
    <td>
      <ul>
        <li>매우 빠른 쿼리</li>
        <li>제한된 메모리 리소스</li>
        <li>리콜률에서 약간의 성능 저하 허용</li>
      </ul>
    </td>
  </tr>
    <tr>
    <td>HNSW_PQ</td>
    <td>양자화 기반 인덱스</td>
    <td>
      <ul>
        <li>중간 속도 쿼리</li>
        <li>매우 제한된 메모리 리소스</li>
        <li>리콜률에서 약간의 성능 저하 허용</li>
      </ul>
    </td>
  </tr>
    </tr>
    <tr>
    <td>HNSW_PRQ</td>
    <td>양자화 기반 인덱스</td>
    <td>
      <ul>
        <li>중간 속도 쿼리</li>
        <li>매우 제한된 메모리 리소스</li>
        <li>리콜률에서 약간의 성능 저하 허용</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SCANN</td>
    <td>양자화 기반 인덱스</td>
    <td>
      <ul>
        <li>매우 빠른 쿼리</li>
        <li>가능한 한 높은 리콜률 필요</li>
        <li>대용량 메모리 리소스</li>
      </ul>
    </td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-binary table-wrapper">
<table id="binary">
<thead>
  <tr>
    <th>지원되는 인덱스</th>
    <th>분류</th>
    <th>시나리오</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>BIN_FLAT</td>
    <td>정량화 기반 인덱스</td>
    <td><ul>
      <li>비교적 작은 데이터 세트에 따라 다릅니다.</li>
      <li>완벽한 정확도가 필요합니다.</li>
      <li>압축이 적용되지 않습니다.</li>
      <li>정확한 검색 결과를 보장합니다.</li>
    </ul></td>
  </tr>
  <tr>
    <td>BIN_IVF_FLAT</td>
    <td>정량화 기반 인덱스</td>
    <td><ul>
      <li>고속 쿼리</li>
      <li>가능한 한 높은 리콜률 필요</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-sparse table-wrapper">
<table id="sparse">
<thead>
  <tr>
    <th>지원되는 인덱스</th>
    <th>분류</th>
    <th>시나리오</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>SPARSE_INVERTED_INDEX</td>
    <td>반전 인덱스</td>
    <td><ul>
      <li>비교적 작은 데이터 세트에 따라 다릅니다.</li>
      <li>100%의 리콜률이 필요합니다.</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-floating">
<h3 id="FLAT" class="common-anchor-header">FLAT</h3><p>완벽한 정확도가 필요하고 비교적 작은(백만 개 규모) 데이터 세트에 의존하는 벡터 유사도 검색 애플리케이션의 경우, FLAT 인덱스가 좋습니다. FLAT은 벡터를 압축하지 않으며, 정확한 검색 결과를 보장할 수 있는 유일한 인덱스입니다. 또한 FLAT의 결과는 다른 인덱스에서 생성된 결과의 비교 기준으로도 사용할 수 있습니다.</p>
<p>FLAT은 각 쿼리마다 데이터 세트의 모든 벡터 세트와 대상 입력을 비교하는 철저한 검색 방식을 취하기 때문에 정확도가 높습니다. 따라서 FLAT은 목록에서 가장 느린 인덱스이며, 대규모 벡터 데이터를 쿼리하는 데는 적합하지 않습니다. Milvus의 FLAT 인덱스에는 파라미터가 필요하지 않으며, 이를 사용하면 별도의 인덱스 빌드 작업이 필요하지 않습니다.</p>
<ul>
<li><p>검색 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[선택 사항] 선택한 거리 메트릭입니다.</td><td><a href="/docs/ko/metric.md">지원되는 메트릭을</a> 참조하십시오.</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="IVFFLAT" class="common-anchor-header">IVF_FLAT</h3><p>IVF_FLAT은 벡터 데이터를 <code translate="no">nlist</code> 클러스터 단위로 나눈 다음, 대상 입력 벡터와 각 클러스터의 중심 사이의 거리를 비교합니다. 시스템이 쿼리하도록 설정된 클러스터 수에 따라(<code translate="no">nprobe</code>), 목표 입력과 가장 유사한 클러스터에 있는 벡터 간의 비교를 기반으로 유사도 검색 결과가 반환되므로 쿼리 시간이 대폭 단축됩니다.</p>
<p><code translate="no">nprobe</code> 을 조정하면 주어진 시나리오에서 정확도와 속도 사이의 이상적인 균형을 찾을 수 있습니다. <a href="https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing">IVF_FLAT 성능 테스트</a> 결과는 대상 입력 벡터의 수(<code translate="no">nq</code>)와 검색할 클러스터의 수(<code translate="no">nprobe</code>)가 모두 증가함에 따라 쿼리 시간이 급격히 증가한다는 것을 보여줍니다.</p>
<p>IVF_FLAT은 가장 기본적인 IVF 인덱스이며, 각 유닛에 저장된 인코딩된 데이터는 원본 데이터와 일치합니다.</p>
<ul>
<li><p>인덱스 구축 파라미터</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>클러스터 단위 수</td><td>[1, 65536]</td><td>128</td></tr>
</tbody>
</table>
</li>
<li><p>검색 매개변수</p>
<ul>
<li><p>공통 검색</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>쿼리할 단위 수</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>범위 검색</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>검색 결과를 반환하지 않는 최대 버킷 수.<br/>이 값은 범위 검색 매개변수이며 연속된 빈 버킷 수가 지정된 값에 도달하는 동안 검색 프로세스를 종료합니다.<br/>이 값을 늘리면 검색 시간이 증가하는 대신 리콜률을 향상시킬 수 있습니다.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFSQ8" class="common-anchor-header">IVF_SQ8</h3><p>IVF_FLAT은 압축을 수행하지 않으므로 생성되는 인덱스 파일은 인덱싱되지 않은 원본 원시 벡터 데이터와 거의 같은 크기입니다. 예를 들어, 원본 1B SIFT 데이터 세트가 476GB인 경우, IVF_FLAT 인덱스 파일은 이보다 약간 더 작아집니다(~470GB). 모든 인덱스 파일을 메모리에 로드하면 470GB의 스토리지가 소모됩니다.</p>
<p>디스크, CPU 또는 GPU 메모리 리소스가 제한되어 있는 경우 IVF_SQ8이 IVF_FLAT보다 더 나은 옵션입니다. 이 인덱스 유형은 스칼라 양자화(SQ)를 수행하여 각 FLOAT(4바이트)를 UINT8(1바이트)로 변환할 수 있습니다. 이렇게 하면 디스크, CPU, GPU 메모리 소비가 70~75%까지 줄어듭니다. 1B SIFT 데이터 세트의 경우, IVF_SQ8 인덱스 파일은 140GB의 스토리지만 필요합니다.</p>
<ul>
<li><p>인덱스 구축 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>클러스터 단위 수</td><td>[1, 65536]</td></tr>
</tbody>
</table>
</li>
<li><p>검색 매개변수</p>
<ul>
<li><p>공통 검색</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>쿼리할 단위 수</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>범위 검색</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>검색 결과를 반환하지 않는 최대 버킷 수.<br/>이 값은 범위 검색 매개변수이며 연속된 빈 버킷 수가 지정된 값에 도달하는 동안 검색 프로세스를 종료합니다.<br/>이 값을 늘리면 검색 시간이 증가하는 대신 리콜률을 향상시킬 수 있습니다.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="IVFPQ" class="common-anchor-header">IVF_PQ</h3><p><code translate="no">PQ</code> (제품 양자화)는 원래의 고차원 벡터 공간을 <code translate="no">m</code> 저차원 벡터 공간의 데카르트 곱으로 균일하게 분해한 다음, 분해된 저차원 벡터 공간을 양자화합니다. 곱 양자화는 목표 벡터와 모든 단위의 중심 사이의 거리를 계산하는 대신 목표 벡터와 각 저차원 공간의 클러스터링 중심 사이의 거리만 계산할 수 있어 알고리즘의 시간 복잡성과 공간 복잡성을 크게 줄여줍니다.</p>
<p>IVF_PQ는 벡터의 곱을 정량화하기 전에 IVF 인덱스 클러스터링을 수행합니다. 이 인덱스 파일은 IVF_SQ8보다 훨씬 작지만 벡터를 검색하는 동안 정확도가 떨어집니다.</p>
<div class="alert note">
<p>인덱스 구축 파라미터와 검색 파라미터는 Milvus 분포에 따라 다릅니다. 먼저 Milvus 배포를 선택하세요.</p>
</div>
<ul>
<li><p>인덱스 구축 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>클러스터 단위 수</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">m</code></td><td>제품 양자화 요소의 수</td><td><code translate="no">dim mod m == 0</code></td></tr>
<tr><td><code translate="no">nbits</code></td><td>[선택 사항] 각 저차원 벡터가 저장되는 비트 수입니다.</td><td>[1, 64](기본값 8)</td></tr>
</tbody>
</table>
</li>
<li><p>검색 매개변수</p>
<ul>
<li><p>공통 검색</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>쿼리할 단위 수</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>범위 검색</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>검색 결과를 반환하지 않는 최대 버킷 수.<br/>이 값은 범위 검색 매개변수이며 연속된 빈 버킷 수가 지정된 값에 도달하는 동안 검색 프로세스를 종료합니다.<br/>이 값을 늘리면 검색 시간이 증가하는 대신 리콜률을 향상시킬 수 있습니다.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="SCANN" class="common-anchor-header">SCANN</h3><p>ScaNN(확장 가능한 최인접 이웃)은 벡터 클러스터링 및 제품 정량화 측면에서 IVF_PQ와 유사합니다. 차이점은 제품 양자화의 구현 세부 사항과 효율적인 계산을 위해 SIMD(단일 명령어/다중 데이터)를 사용한다는 점입니다.</p>
<ul>
<li><p>인덱스 구축 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>클러스터 단위 수</td><td>[1, 65536]</td></tr>
<tr><td><code translate="no">with_raw_data</code></td><td>인덱스에 원시 데이터를 포함할지</td><td><code translate="no">True</code> 또는 <code translate="no">False</code>. 기본값은 <code translate="no">True</code> 입니다.</td></tr>
</tbody>
</table>
  <div class="alert note">
<p>IVF_PQ와 달리 기본값은 최적화된 성능을 위해 <code translate="no">m</code> 및 <code translate="no">nbits</code> 에 적용됩니다.</p>
  </div>
</li>
<li><p>검색 매개변수</p>
<ul>
<li><p>일반 검색</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>쿼리할 단위 수</td><td>[1, nlist]</td><td></td></tr>
<tr><td><code translate="no">reorder_k</code></td><td>쿼리할 후보 단위 수</td><td>[<code translate="no">top_k</code>, ∞]</td><td><code translate="no">top_k</code></td></tr>
</tbody>
</table>
</li>
<li><p>범위 검색</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>검색 결과를 반환하지 않는 최대 버킷 수.<br/>이 값은 범위 검색 매개변수이며 연속된 빈 버킷 수가 지정된 값에 도달하는 동안 검색 프로세스를 종료합니다.<br/>이 값을 늘리면 검색 시간이 증가하는 대신 회수율이 향상될 수 있습니다.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
<h3 id="HNSW" class="common-anchor-header">HNSW</h3><p>HNSW(계층적 탐색 가능한 작은 세계 그래프)는 그래프 기반 인덱싱 알고리즘입니다. 특정 규칙에 따라 이미지에 대한 다층 탐색 구조를 구축합니다. 이 구조에서 상위 레이어는 더 희박하고 노드 간의 거리가 멀고, 하위 레이어는 더 조밀하고 노드 간의 거리가 가까워집니다. 검색은 맨 위 레이어에서 시작하여 이 레이어에서 대상에 가장 가까운 노드를 찾은 다음 다음 레이어로 이동하여 또 다른 검색을 시작합니다. 여러 번 반복하면 목표 위치에 빠르게 접근할 수 있습니다.</p>
<p>성능 향상을 위해 HNSW는 그래프의 각 계층에서 노드의 최대 정도를 <code translate="no">M</code> 로 제한합니다. 또한 <code translate="no">efConstruction</code> (인덱스 구축 시) 또는 <code translate="no">ef</code> (타겟 검색 시)를 사용하여 검색 범위를 지정할 수 있습니다.</p>
<ul>
<li><p>색인 구축 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M은 그래프에서 나가는 연결의 최대 수를 정의합니다. M이 높을수록 고정된 ef/efConstruction에서 정확도/런타임이 높아집니다.</td><td>[2, 2048]</td><td>None</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction은 인덱스 검색 속도/구축 속도 트레이드오프를 제어합니다. efConstruction 파라미터를 높이면 인덱스 품질이 향상될 수 있지만, 인덱싱 시간이 길어지는 경향이 있습니다.</td><td>[1, int_max]</td><td>None</td></tr>
</tbody>
</table>
</li>
<li><p>검색 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>쿼리 시간/정확도 절충을 제어하는 매개변수입니다. <code translate="no">ef</code> 이 높을수록 검색 정확도는 높아지지만 검색 속도는 느려집니다.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>None</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWSQ" class="common-anchor-header">HNSW_SQ</h3><p>스칼라 양자화(SQ)는 부동소수점 데이터를 크기에 따라 유한한 값 집합으로 이산화하는 데 사용되는 기법입니다. 예를 들어, <strong>SQ6은</strong> (2^6 = 64)의 이산 값으로 양자화하여 각 부동 소수점 숫자가 6비트를 사용하여 인코딩되는 것을 나타냅니다. 마찬가지로 <strong>SQ8은</strong> 데이터를 (2^8 = 256)의 이산 값으로 양자화하며, 각 부동 소수점 숫자는 8비트로 표시됩니다. 이러한 양자화는 효율적인 처리를 위해 데이터의 필수 구조를 보존하면서 메모리 공간을 줄여줍니다.</p>
<p>SQ와 결합된 HNSW_SQ는 높은 초당 쿼리 처리량(QPS) 성능을 유지하면서 인덱스 크기와 정확도 간에 제어 가능한 절충점을 제공합니다. 표준 HNSW에 비해 인덱스 구축 시간이 약간 증가합니다.</p>
<ul>
<li><p>인덱스 구축 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M은 그래프에서 나가는 연결의 최대 수를 정의합니다. M이 높을수록 고정된 ef/efConstruction에서 정확도/런타임이 높아집니다.</td><td>[2, 2048]</td><td>None</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction은 인덱스 검색 속도/구축 속도 트레이드오프를 제어합니다. efConstruction 파라미터를 높이면 인덱스 품질이 향상될 수 있지만, 인덱싱 시간이 길어지는 경향이 있습니다.</td><td>[1, int_max]</td><td>None</td></tr>
<tr><td><code translate="no">sq_type</code></td><td>스칼라 양자화기 유형.</td><td><code translate="no">SQ6</code>,<code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code></td><td><code translate="no">SQ8</code></td></tr>
<tr><td><code translate="no">refine</code></td><td>인덱스 구축 중에 정제된 데이터를 예약할지 여부.</td><td><code translate="no">true</code>, <code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>정제 인덱스의 데이터 유형.</td><td><code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code></td><td>None</td></tr>
</tbody>
</table>
</li>
<li><p>검색 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>쿼리 시간/정확도 절충을 제어하는 매개변수입니다. <code translate="no">ef</code> 이 높을수록 검색 정확도는 높아지지만 검색 속도는 느려집니다.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>None</td></tr>
<tr><td><code translate="no">refine_k</code></td><td><em>k와</em> 비교한 refine의 배율입니다.</td><td>[1, <em>float_max</em>)</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWPQ" class="common-anchor-header">HNSW_PQ</h3><p>PQ의 기본 개념은 벡터를 <code translate="no">m</code> 하위 벡터로 분할하는 것으로, 각 하위 벡터는 kmeans에 따라 <em>2^{n비트}개의</em> 중심을 찾고 각 하위 벡터는 가장 가까운 중심을 대략적인 하위 벡터로 선택합니다. 그런 다음 모든 중심을 기록하므로 각 서브벡터는 <code translate="no">nbits</code> 로 인코딩할 수 있고, 길이 <code translate="no">dim</code> 의 부동 벡터는 <em>m ⋅ n비트</em> 비트로 인코딩할 수 있습니다.</p>
<p>PQ와 결합된 HNSW_PQ는 인덱스 크기와 정확도 간에 제어 가능한 절충점을 제공하지만, 동일한 압축률에서 HNSW_SQ보다 QPS 값은 낮고 리콜률은 높습니다. HNSW_SQ에 비해 인덱스를 구축하는 데 시간이 더 오래 걸립니다.</p>
<ul>
<li><p>인덱스 구축 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M은 그래프에서 나가는 연결의 최대 수를 정의합니다. M이 높을수록 고정된 ef/efConstruction에서 정확도/런타임이 높아집니다.</td><td>[2, 2048]</td><td>None</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction은 인덱스 검색 속도/구축 속도 트레이드오프를 제어합니다. efConstruction 파라미터를 높이면 인덱스 품질이 향상될 수 있지만, 인덱싱 시간이 길어지는 경향이 있습니다.</td><td>[1, int_max]</td><td>None</td></tr>
<tr><td><code translate="no">m</code></td><td>벡터를 분할할 하위 벡터 그룹의 수입니다.</td><td>[1, 65536]</td><td>32</td></tr>
<tr><td><code translate="no">nbits</code></td><td>각 서브 벡터 그룹이 양자화되는 비트 수입니다.</td><td>[1, 24]</td><td>8</td></tr>
<tr><td><code translate="no">refine</code></td><td>인덱스 구축 중에 정제된 데이터를 예약할지 여부.</td><td><code translate="no">true</code>, <code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>정제 인덱스의 데이터 유형입니다.</td><td><code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code></td><td>None</td></tr>
</tbody>
</table>
</li>
<li><p>검색 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>쿼리 시간/정확도 절충을 제어하는 매개변수입니다. <code translate="no">ef</code> 이 높을수록 검색 정확도는 높아지지만 검색 속도는 느려집니다.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>None</td></tr>
<tr><td><code translate="no">refine_k</code></td><td><em>k와</em> 비교한 refine의 배율입니다.</td><td>[1, <em>float_max</em>)</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="HNSWPRQ" class="common-anchor-header">HNSW_PRQ</h3><p>PRQ는 PQ와 유사하며 벡터를 <code translate="no">m</code> 그룹으로 나눕니다. 각 하위 벡터는 <code translate="no">nbits</code> 로 인코딩됩니다. pq 양자화를 완료한 후, 벡터와 pq 양자화된 벡터 사이의 잔차를 계산하고 잔차 벡터에 pq 양자화를 적용합니다. 총 <code translate="no">nrq</code> 개의 완전한 pq 양자화가 수행되므로 길이 <code translate="no">dim</code> 의 부동 벡터는 <em>m ⋅ n비트 ⋅ nrq</em> 비트로 인코딩됩니다.</p>
<p>제품 잔여 양자화기(PRQ)와 결합된 HNSW_PRQ는 인덱스 크기와 정확도 사이에서 훨씬 더 높은 제어 가능한 트레이드오프를 제공합니다. 동일한 압축률에서 HNSW_PQ보다 거의 동등한 QPS 값과 더 높은 리콜률을 제공합니다. HNSW_PQ에 비해 인덱스 구축 시간이 몇 배 증가할 수 있습니다.</p>
<ul>
<li><p>인덱스 구축 파라미터</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M은 그래프에서 나가는 연결의 최대 수를 정의합니다. M이 높을수록 고정된 ef/efConstruction에서 정확도/런타임이 높아집니다.</td><td>[2, 2048]</td><td>None</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction은 인덱스 검색 속도/구축 속도 트레이드오프를 제어합니다. efConstruction 파라미터를 높이면 인덱스 품질이 향상될 수 있지만, 인덱싱 시간이 길어지는 경향이 있습니다.</td><td>[1, int_max]</td><td>None</td></tr>
<tr><td><code translate="no">m</code></td><td>벡터를 분할할 하위 벡터 그룹의 수입니다.</td><td>[1, 65536]</td><td>32</td></tr>
<tr><td><code translate="no">nbits</code></td><td>각 서브 벡터 그룹이 양자화되는 비트 수입니다.</td><td>[1, 24]</td><td>8</td></tr>
<tr><td><code translate="no">nrq</code></td><td>잔여 서브 양자화자의 수입니다.</td><td>[1, 16]</td><td>2</td></tr>
<tr><td><code translate="no">refine</code></td><td>인덱스 구축 중에 정제된 데이터를 예약할지 여부.</td><td><code translate="no">true</code>, <code translate="no">false</code></td><td><code translate="no">false</code></td></tr>
<tr><td><code translate="no">refine_type</code></td><td>정제 인덱스의 데이터 유형.</td><td><code translate="no">SQ6</code>, <code translate="no">SQ8</code>, <code translate="no">BF16</code>, <code translate="no">FP16</code>, <code translate="no">FP32</code></td><td>None</td></tr>
</tbody>
</table>
</li>
<li><p>검색 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>쿼리 시간/정확도 절충을 제어하는 매개변수입니다. <code translate="no">ef</code> 이 높을수록 검색 정확도는 높아지지만 검색 속도는 느려집니다.</td><td>[<code translate="no">top_k</code>, int_max]</td><td>None</td></tr>
<tr><td><code translate="no">refine_k</code></td><td><em>k와</em> 비교한 refine의 배율입니다.</td><td>[1, <em>float_max</em>)</td><td><code translate="no">1</code></td></tr>
</tbody>
</table>
</li>
</ul>
</div>
<div class="filter-binary">
<h3 id="BINFLAT" class="common-anchor-header">BIN_FLAT</h3><p>이 인덱스는 이진 임베딩에만 사용할 수 있다는 점을 제외하면 FLAT과 완전히 동일합니다.</p>
<p>완벽한 정확도가 필요하고 비교적 작은(백만 개 규모) 데이터 세트에 의존하는 벡터 유사도 검색 애플리케이션의 경우 BIN_FLAT 인덱스가 좋은 선택입니다. BIN_FLAT은 벡터를 압축하지 않으며, 정확한 검색 결과를 보장할 수 있는 유일한 인덱스입니다. BIN_FLAT의 결과는 다른 인덱스에서 생성된 결과의 비교 지점으로도 사용할 수 있습니다.</p>
<p>BIN_FLAT은 각 쿼리마다 대상 입력이 데이터 세트의 벡터와 비교되는 철저한 검색 방식을 취하기 때문에 정확도가 높습니다. 따라서 BIN_FLAT은 목록에서 가장 느린 인덱스이며, 대규모 벡터 데이터를 쿼리하는 데는 적합하지 않습니다. Milvus에는 BIN_FLAT 인덱스에 대한 파라미터가 없으며, 이를 사용해도 데이터 학습이나 추가 저장 공간이 필요하지 않습니다.</p>
<ul>
<li><p>검색 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[선택 사항] 선택한 거리 메트릭입니다.</td><td><a href="/docs/ko/metric.md">지원되는 메트릭을</a> 참조하십시오.</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="BINIVFFLAT" class="common-anchor-header">BIN_IVF_FLAT</h3><p>이 인덱스는 이진 임베딩에만 사용할 수 있다는 점을 제외하면 IVF_FLAT과 완전히 동일합니다.</p>
<p>BIN_IVF_FLAT은 벡터 데이터를 <code translate="no">nlist</code> 클러스터 단위로 나눈 다음, 대상 입력 벡터와 각 클러스터의 중심 사이의 거리를 비교합니다. 시스템이 쿼리하도록 설정된 클러스터 수에 따라(<code translate="no">nprobe</code>), 유사도 검색 결과는 대상 입력과 가장 유사한 클러스터에 있는 벡터 간의 비교만을 기반으로 반환되므로 쿼리 시간이 대폭 단축됩니다.</p>
<p><code translate="no">nprobe</code> 을 조정하면 주어진 시나리오에서 정확도와 속도 사이의 이상적인 균형을 찾을 수 있습니다. 쿼리 시간은 대상 입력 벡터의 수(<code translate="no">nq</code>)와 검색할 클러스터의 수(<code translate="no">nprobe</code>)가 모두 증가함에 따라 급격히 증가합니다.</p>
<p>BIN_IVF_FLAT은 가장 기본적인 BIN_IVF 인덱스이며, 각 유닛에 저장된 인코딩된 데이터는 원본 데이터와 일치합니다.</p>
<ul>
<li><p>인덱스 구축 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nlist</code></td><td>클러스터 단위 수</td><td>[1, 65536]</td></tr>
</tbody>
</table>
</li>
<li><p>검색 매개변수</p>
<ul>
<li><p>공통 검색</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">nprobe</code></td><td>쿼리할 단위 수</td><td>[1, nlist]</td><td>8</td></tr>
</tbody>
</table>
</li>
<li><p>범위 검색</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th><th>기본값</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>검색 결과를 반환하지 않는 최대 버킷 수.<br/>이 값은 범위 검색 매개변수이며 연속된 빈 버킷 수가 지정된 값에 도달하는 동안 검색 프로세스를 종료합니다.<br/>이 값을 늘리면 검색 시간이 증가하는 대신 리콜률을 향상시킬 수 있습니다.</td><td>[1, 65535]</td><td>2</td></tr>
</tbody>
</table>
</li>
</ul></li>
</ul>
</div>
<div class="filter-sparse">
<h3 id="SPARSEINVERTEDINDEX" class="common-anchor-header">SPARSE_INVERTED_INDEX</h3><p>각 차원은 해당 차원에서 0이 아닌 값을 갖는 벡터의 목록을 유지합니다. 검색 중에 Milvus는 쿼리 벡터의 각 차원을 반복하여 해당 차원에서 0이 아닌 값을 갖는 벡터에 대한 점수를 계산합니다.</p>
<ul>
<li><p>인덱스 구축 매개변수</p>
<table>
<thead>
<tr><th>매개변수</th><th>설명</th><th>범위</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">inverted_index_algo</code></td><td>인덱스 구축 및 쿼리에 사용되는 알고리즘입니다. 자세한 내용은 <a href="/docs/ko/sparse_vector.md#Set-index-params-for-vector-field">스파스 벡터를</a> 참조하세요.</td><td><code translate="no">DAAT_MAXSCORE</code> (기본값), <code translate="no">DAAT_WAND</code>, <code translate="no">TAAT_NAIVE</code></td></tr>
<tr><td><code translate="no">bm25_k1</code></td><td>용어 빈도 포화도를 제어합니다. 값이 클수록 문서 순위에서 용어 빈도의 중요도가 높아집니다.</td><td>[1.2, 2.0]</td></tr>
<tr><td><code translate="no">bm25_b</code></td><td>문서 길이가 정규화되는 정도를 제어합니다. 기본값은 0.75입니다.</td><td>[0, 1]</td></tr>
</tbody>
</table>
  <div class="alert note">
<p><code translate="no">drop_ratio_build</code> 매개변수는 Milvus v2.5.4부터 더 이상 사용되지 않으며, 인덱스 구축 중에 계속 허용될 수 있지만 더 이상 인덱스에 실제 영향을 미치지 않습니다.</p>
  </div>
</li>
<li><p>검색 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_search</code></td><td>검색 과정에서 제외되는 작은 벡터 값의 비율입니다. 이 옵션을 사용하면 쿼리 벡터에서 무시할 가장 작은 값의 비율을 지정하여 검색 프로세스를 미세 조정할 수 있습니다. 검색 정확도와 성능의 균형을 맞추는 데 도움이 됩니다. <code translate="no">drop_ratio_search</code> 에 설정된 값이 작을수록 최종 점수에 기여하는 작은 값이 줄어듭니다. 일부 작은 값을 무시하면 정확도에 미치는 영향을 최소화하면서 검색 성능을 개선할 수 있습니다.</td><td>[0, 1]</td></tr>
</tbody>
</table>
</li>
</ul>
</div>
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
    </button></h2><p><details>
<summary><font color="#4fc4f9">FLAT 인덱스와 IVF_FLAT 인덱스의 차이점은 무엇인가요?</font></summary></p>
<p>IVF_FLAT 인덱스는 벡터 공간을 <code translate="no">nlist</code> 클러스터로 나눕니다. 기본값 <code translate="no">nlist</code> 을 16384로 유지하면 Milvus는 대상 벡터와 모든 16384개 클러스터의 중심 사이의 거리를 비교하여 <code translate="no">nprobe</code> 가장 가까운 클러스터를 구합니다. 그런 다음 Milvus는 대상 벡터와 선택한 클러스터의 벡터 사이의 거리를 비교하여 가장 가까운 벡터를 구합니다. IVF_FLAT과 달리 FLAT은 대상 벡터와 모든 벡터 사이의 거리를 직접 비교합니다.</p>
<p>
따라서 벡터의 총 개수가 대략 <code translate="no">nlist</code> 와 같을 때 IVF_FLAT과 FLAT은 필요한 계산 방식과 검색 성능에서 거의 차이가 없습니다. 그러나 벡터의 수가 <code translate="no">nlist</code> 의 2배, 3배 또는 n배로 증가하면 IVF_FLAT 인덱스가 점점 더 큰 이점을 보이기 시작합니다.</p>
<p>
자세한 내용은 <a href="https://medium.com/unstructured-data-service/how-to-choose-an-index-in-milvus-4f3d15259212">Milvus에서 인덱스를 선택하는 방법을</a> 참조하세요.</p>
</details>
<h2 id="Whats-next" class="common-anchor-header">다음 단계<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Milvus에서 지원되는 <a href="/docs/ko/metric.md">유사성 지표에</a> 대해 자세히 알아보세요.</li>
</ul>
