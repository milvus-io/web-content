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
    </button></h1><p>이 항목에서는 Milvus가 지원하는 다양한 유형의 인메모리 인덱스, 각 인덱스가 가장 적합한 시나리오, 사용자가 더 나은 검색 성능을 달성하기 위해 구성할 수 있는 매개변수에 대해 설명합니다. 온디스크 인덱스에 대해서는 <strong><a href="/docs/ko/v2.4.x/disk_index.md">온디스크 인덱스를</a></strong> 참조하세요.</p>
<p>인덱싱은 데이터를 효율적으로 정리하는 과정으로, 대규모 데이터 세트에서 시간이 오래 걸리는 쿼리를 획기적으로 가속화하여 유사성 검색을 유용하게 만드는 데 중요한 역할을 합니다.</p>
<p>쿼리 성능을 향상시키기 위해 각 벡터 필드에 <a href="/docs/ko/v2.4.x/index-vector-fields.md">인덱스 유형을 지정할</a> 수 있습니다.</p>
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
<p>구현 방법에 따라 ANNS 벡터 인덱스는 네 가지 유형으로 분류할 수 있습니다: 트리 기반, 그래프 기반, 해시 기반, 정량화 기반입니다.</p>
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
<h3 id="Indexes-for-floating-point-embeddings" class="common-anchor-header">부동 소수점 임베딩의 인덱스</h3><p>128차원 부동 소수점 임베딩(벡터)의 경우, 임베딩이 차지하는 저장 공간은 128*플로트 크기 = 512바이트입니다. 그리고 부동 소수점 임베딩에 사용되는 <a href="/docs/ko/v2.4.x/metric.md">거리 메트릭은</a> 유클리드 거리(<code translate="no">L2</code>)와 내적 곱(<code translate="no">IP</code>)입니다.</p>
<p>이러한 유형의 인덱스에는 <code translate="no">FLAT</code>, <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_PQ</code>, <code translate="no">IVF_SQ8</code>, <code translate="no">HNSW</code>, <code translate="no">SCANN</code> 등이 있습니다.</p>
</div>
<div class="filter-binary">
<h3 id="Indexes-for-binary-embeddings" class="common-anchor-header">이진 임베딩용 인덱스</h3><p>128차원 바이너리 임베딩의 경우, 임베딩이 차지하는 저장 공간은 128/8 = 16바이트입니다. 그리고 이진 임베딩에 사용되는 거리 메트릭은 <code translate="no">JACCARD</code> 와 <code translate="no">HAMMING</code> 입니다.</p>
<p>이 유형의 인덱스에는 <code translate="no">BIN_FLAT</code> 와 <code translate="no">BIN_IVF_FLAT</code> 이 있습니다.</p>
</div>
<div class="filter-sparse">
<h3 id="Indexes-for-sparse-embeddings" class="common-anchor-header">스파스 임베딩용 인덱스</h3><p>스파스 임베딩에 지원되는 거리 메트릭은 <code translate="no">IP</code> 입니다.</p>
<p>인덱스 유형에는 <code translate="no">SPARSE_INVERTED_INDEX</code> 및 <code translate="no">SPARSE_WAND</code> 이 포함됩니다.</p>
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
    <td>정량화 기반 인덱스</td>
    <td>
      <ul>
        <li>고속 쿼리</li>
        <li>가능한 한 높은 리콜률 필요</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_SQ8</td>
    <td>양자화 기반 인덱스</td>
    <td>
      <ul>
        <li>고속 쿼리</li>
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
        <li>매우 빠른 쿼리</li>
        <li>제한된 메모리 리소스</li>
        <li>리콜률에서 상당한 타협 허용</li>
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
    <td>SCANN</td>
    <td>정량화 기반 인덱스</td>
    <td>
      <ul>
        <li>매우 빠른 쿼리</li>
        <li>가능한 한 높은 리콜률이 필요함</li>
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
  <tr>
    <td>SPARSE_WAND</td>
    <td>반전 인덱스</td>
    <td><ul>
      <li><a href="https://dl.acm.org/doi/10.1145/956863.956944">약-앤드</a> 알고리즘 가속</li>
      <li>소량의 리콜만 희생하면서 상당한 속도 향상을 얻을 수 있습니다.</li>
    </ul></td>
  </tr>
</tbody>
</table>
</div>
<div class="filter-floating">
<h3 id="FLAT" class="common-anchor-header">FLAT</h3><p>완벽한 정확도가 필요하고 비교적 작은(백만 개 규모) 데이터 세트에 의존하는 벡터 유사도 검색 애플리케이션의 경우, FLAT 인덱스가 좋은 선택입니다. FLAT은 벡터를 압축하지 않으며, 정확한 검색 결과를 보장할 수 있는 유일한 인덱스입니다. 또한 FLAT의 결과는 다른 인덱스에서 생성된 결과의 비교 지점으로도 사용할 수 있습니다.</p>
<p>FLAT은 각 쿼리마다 데이터 세트의 모든 벡터 세트와 대상 입력을 비교하는 철저한 검색 방식을 취하기 때문에 정확도가 높습니다. 따라서 FLAT은 목록에서 가장 느린 인덱스이며, 대규모 벡터 데이터를 쿼리하는 데는 적합하지 않습니다. Milvus의 FLAT 인덱스에는 파라미터가 필요하지 않으며, 이를 사용하는 데 데이터 학습이 필요하지 않습니다.</p>
<ul>
<li><p>검색 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[선택 사항] 선택한 거리 메트릭입니다.</td><td><a href="/docs/ko/v2.4.x/metric.md">지원되는 메트릭을</a> 참조하십시오.</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="IVFFLAT" class="common-anchor-header">IVF_FLAT</h3><p>IVF_FLAT은 벡터 데이터를 <code translate="no">nlist</code> 클러스터 단위로 나눈 다음 대상 입력 벡터와 각 클러스터의 중심 사이의 거리를 비교합니다. 시스템이 쿼리하도록 설정된 클러스터 수에 따라(<code translate="no">nprobe</code>), 목표 입력과 가장 유사한 클러스터에 있는 벡터 간의 비교를 기반으로 유사도 검색 결과가 반환되므로 쿼리 시간이 대폭 단축됩니다.</p>
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
<p>디스크, CPU 또는 GPU 메모리 리소스가 제한되어 있는 경우 IVF_SQ8이 IVF_FLAT보다 더 나은 옵션입니다. 이 인덱스 유형은 스칼라 양자화(SQ)를 수행하여 각 FLOAT(4바이트)를 UINT8(1바이트)로 변환할 수 있습니다. 이렇게 하면 디스크, CPU, GPU 메모리 소비가 70~75% 감소합니다. 1B SIFT 데이터 세트의 경우, IVF_SQ8 인덱스 파일은 140GB의 스토리지만 필요합니다.</p>
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
<tr><td><code translate="no">max_empty_result_buckets</code></td><td>검색 결과를 반환하지 않는 최대 버킷 수.<br/>이 값은 범위 검색 매개변수이며 연속된 빈 버킷 수가 지정된 값에 도달하는 동안 검색 프로세스를 종료합니다.<br/>이 값을 늘리면 검색 시간이 증가하는 대신 리콜률을 향상시킬 수 있습니다.</td><td>[1, 65535]</td><td>2</td></tr>
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
<tr><th>파라미터</th><th>설명</th><th>범위</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">M</code></td><td>M은 그래프에서 최대 발신 연결 수를 정의합니다. M이 높을수록 고정된 ef/efConstruction에서 정확도/런타임이 높아집니다.</td><td>[2, 2048]</td></tr>
<tr><td><code translate="no">efConstruction</code></td><td>ef_construction은 인덱스 검색 속도/구축 속도 트레이드오프를 제어합니다. efConstruction 파라미터를 높이면 인덱스 품질이 향상될 수 있지만 인덱싱 시간이 길어지는 경향이 있습니다.</td><td>[1, int_max]</td></tr>
</tbody>
</table>
</li>
<li><p>검색 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">ef</code></td><td>쿼리 시간/정확도 절충을 제어하는 매개변수입니다. <code translate="no">ef</code> 이 높을수록 검색 정확도는 높아지지만 검색 속도는 느려집니다.</td><td>[<code translate="no">top_k</code>, int_max]</td></tr>
</tbody>
</table>
</li>
</ul>
</div>
<div class="filter-binary">
<h3 id="BINFLAT" class="common-anchor-header">BIN_FLAT</h3><p>이 인덱스는 이진 임베딩에만 사용할 수 있다는 점을 제외하면 FLAT과 완전히 동일합니다.</p>
<p>완벽한 정확도가 필요하고 비교적 작은(백만 개 규모) 데이터 세트에 의존하는 벡터 유사도 검색 애플리케이션의 경우, BIN_FLAT 인덱스가 좋은 선택입니다. BIN_FLAT은 벡터를 압축하지 않으며, 정확한 검색 결과를 보장할 수 있는 유일한 인덱스입니다. BIN_FLAT의 결과는 다른 인덱스에서 생성된 결과의 비교 지점으로도 사용할 수 있습니다.</p>
<p>BIN_FLAT은 각 쿼리마다 대상 입력이 데이터 세트의 벡터와 비교되는 철저한 검색 방식을 취하기 때문에 정확도가 높습니다. 따라서 BIN_FLAT은 목록에서 가장 느린 인덱스이며, 대규모 벡터 데이터를 쿼리하는 데는 적합하지 않습니다. Milvus에는 BIN_FLAT 인덱스에 대한 파라미터가 없으며, 이를 사용해도 데이터 학습이나 추가 저장 공간이 필요하지 않습니다.</p>
<ul>
<li><p>검색 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">metric_type</code></td><td>[선택 사항] 선택한 거리 메트릭입니다.</td><td><a href="/docs/ko/v2.4.x/metric.md">지원되는 메트릭을</a> 참조하십시오.</td></tr>
</tbody>
</table>
</li>
</ul>
<h3 id="BINIVFFLAT" class="common-anchor-header">BIN_IVF_FLAT</h3><p>이 인덱스는 이진 임베딩에만 사용할 수 있다는 점을 제외하면 IVF_FLAT과 완전히 동일합니다.</p>
<p>BIN_IVF_FLAT은 벡터 데이터를 <code translate="no">nlist</code> 클러스터 단위로 나눈 다음, 대상 입력 벡터와 각 클러스터의 중심 사이의 거리를 비교합니다. 시스템이 쿼리하도록 설정된 클러스터 수에 따라(<code translate="no">nprobe</code>), 유사도 검색 결과는 대상 입력과 가장 유사한 클러스터의 벡터 간의 비교만을 기반으로 반환되므로 쿼리 시간이 대폭 단축됩니다.</p>
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
<tr><td><code translate="no">drop_ratio_build</code></td><td>인덱싱 프로세스 중에 제외되는 작은 벡터 값의 비율입니다. 이 옵션을 사용하면 인덱싱 프로세스를 미세 조정하여 인덱스를 구축할 때 작은 값을 무시함으로써 효율성과 정확성 간의 균형을 맞출 수 있습니다.</td><td>[0, 1]</td></tr>
</tbody>
</table>
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
<h3 id="SPARSEWAND" class="common-anchor-header">SPARSE_WAND</h3><p>이 인덱스는 <code translate="no">SPARSE_INVERTED_INDEX</code> 과 유사하지만, 검색 과정에서 전체 IP 거리 평가 횟수를 더 줄이기 위해 <a href="https://dl.acm.org/doi/10.1145/956863.956944">Weak-AND</a> 알고리즘을 활용합니다.</p>
<p>테스트 결과, <code translate="no">SPARSE_WAND</code> 은 일반적으로 속도 면에서 다른 방법보다 우수한 성능을 보였습니다. 그러나 벡터의 밀도가 증가함에 따라 성능이 급격히 저하될 수 있습니다. 이 문제를 해결하기 위해 0이 아닌 <code translate="no">drop_ratio_search</code> 을 도입하면 정확도 손실은 최소화하면서 성능을 크게 향상시킬 수 있습니다. 자세한 내용은 <a href="/docs/ko/v2.4.x/sparse_vector.md">스파스 벡터를</a> 참조하세요.</p>
<ul>
<li><p>인덱스 구축 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_build</code></td><td>인덱싱 프로세스 중에 제외되는 작은 벡터 값의 비율입니다. 이 옵션을 사용하면 인덱싱 프로세스를 미세 조정하여 인덱스를 구축할 때 작은 값을 무시함으로써 효율성과 정확성 간의 균형을 맞출 수 있습니다.</td><td>[0, 1]</td></tr>
</tbody>
</table>
</li>
<li><p>검색 매개변수</p>
<table>
<thead>
<tr><th>파라미터</th><th>설명</th><th>범위</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">drop_ratio_search</code></td><td>검색 과정에서 제외되는 작은 벡터 값의 비율입니다. 이 옵션을 사용하면 쿼리 벡터에서 무시할 가장 작은 값의 비율을 지정하여 검색 프로세스를 미세 조정할 수 있습니다. 검색 정확도와 성능의 균형을 맞추는 데 도움이 됩니다. <code translate="no">drop_ratio_search</code> 에 설정된 값이 작을수록 최종 점수에 기여하는 작은 값이 줄어듭니다. 일부 작은 값을 무시하면 정확도에 미치는 영향을 최소화하면서 검색 성능을 향상시킬 수 있습니다.</td><td>[0, 1]</td></tr>
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
<li>Milvus에서 지원되는 <a href="/docs/ko/v2.4.x/metric.md">유사성 지표에</a> 대해 자세히 알아보세요.</li>
</ul>
