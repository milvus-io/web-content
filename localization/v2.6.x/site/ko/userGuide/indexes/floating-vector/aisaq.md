---
id: aisaq.md
title: AISAQCompatible with Milvus 2.6.4+
summary: >-
  AISAQ는 디스크 기반 벡터 인덱스로, RAM 한도를 초과하지 않고 수십억 개 규모의 데이터 세트를 처리할 수 있도록 DISKANN을
  확장한 것입니다. 압축된 벡터를 메모리에 보관하는 DISKANN과 달리 AISAQ는 모든 데이터를 디스크에 저장하며, 성능과 스토리지 비용의
  균형을 맞추기 위해 두 가지 모드를 제공합니다.
beta: Milvus 2.6.4+
---
<h1 id="AISAQ" class="common-anchor-header">AISAQ<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#AISAQ" class="anchor-icon" translate="no">
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
    </button></h1><p>AISAQ는 디스크 기반 벡터 인덱스로, RAM 한도를 초과하지 않고 수십억 개 규모의 데이터 세트를 처리할 수 있도록 <a href="/docs/ko/diskann.md">DISKANN을</a> 확장한 것입니다. 압축된 벡터를 메모리에 보관하는 DISKANN과 달리 AISAQ는 모든 데이터를 디스크에 저장하며, 성능과 저장 비용의 균형을 맞추기 위해 두 가지 모드를 제공합니다.</p>
<p>벡터 데이터 세트가 너무 커서 RAM에 적합하지 않은 경우 또는 일부 쿼리 성능을 메모리 요구 사항 감소와 교환하여 인프라 비용을 최적화해야 하는 경우 AISAQ를 사용하세요.</p>
<h2 id="How-AISAQ-works" class="common-anchor-header">AISAQ 작동 방식<button data-href="#How-AISAQ-works" class="anchor-icon" translate="no">
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
    </button></h2><p>위의 다이어그램은 <strong>DISKANN</strong>, <strong>AISAQ-Performance</strong> 및 <strong>AISAQ-Scale의</strong> 스토리지 레이아웃을 비교하여 데이터(원시 벡터, 에지 목록 및 PQ 코드)가 RAM과 디스크 간에 어떻게 분산되는지 보여줍니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/aisaq-vs-diskann.png" alt="Aisaq Vs Diskann" class="doc-image" id="aisaq-vs-diskann" />
   </span> <span class="img-wrapper"> <span>Aisaq 대 Diskann</span> </span></p>
<h3 id="Foundation-DISKANN-recap" class="common-anchor-header">기초: DISKANN 요약<button data-href="#Foundation-DISKANN-recap" class="anchor-icon" translate="no">
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
    </button></h3><p>DISKANN에서 원시 벡터와 에지 목록은 디스크에 저장되고, PQ 압축 벡터는 메모리(DRAM)에 보관됩니다.</p>
<p>DISKANN이 노드(예: <em>벡터 0</em>)로 이동하는 경우:</p>
<ul>
<li><p>디스크에서 원시 벡터<strong>(raw_vector_0</strong>)와 그 에지 목록<strong>(edgelist_0)</strong>을 로드합니다.</p></li>
<li><p>에지 목록은 다음에 방문할 이웃을 나타냅니다(이 예에서는 노드 2, 3, 5).</p></li>
<li><p>원시 벡터는 순위를 매기기 위한 쿼리 벡터와의 정확한 거리를 계산하는 데 사용됩니다.</p></li>
<li><p>메모리의 PQ 데이터는 대략적인 거리 필터링에 사용되어 다음 탐색을 안내합니다.</p></li>
</ul>
<p>PQ 데이터는 이미 DRAM에 캐시되어 있기 때문에 각 노드 방문에는 하나의 디스크 I/O만 필요하므로 적당한 메모리 사용량으로 빠른 쿼리 속도를 달성할 수 있습니다.</p>
<p>이러한 구성 요소와 매개변수에 대한 자세한 설명은 <a href="/docs/ko/diskann.md">DISKANN을</a> 참조하세요.</p>
<h3 id="AISAQ-modes" class="common-anchor-header">AISAQ 모드<button data-href="#AISAQ-modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQ는 두 가지 디스크 기반 스토리지 전략을 제공합니다. 주요 차이점은 PQ 압축 데이터가 저장되는 방식입니다.</p>
<h4 id="AISAQ-performance" class="common-anchor-header">AISAQ 성능</h4><p><strong>AISAQ-성능은</strong> 데이터 코로케이션 및 중복성을 통해 낮은 IOPS를 유지하면서 PQ 데이터를 메모리에서 디스크로 이동하여 완전한 디스크 기반 스토리지를 달성합니다.</p>
<p>이 모드에서는</p>
<ul>
<li><p>각 노드의 원시 벡터, 엣지 목록, 이웃 노드의 PQ 데이터가 디스크에 함께 저장됩니다.</p></li>
<li><p>이 레이아웃에서는 노드(예: <em>벡터 0</em>)를 방문할 때 여전히 단일 디스크 I/O만 필요합니다.</p></li>
<li><p>하지만 PQ 데이터가 여러 노드 근처에 중복 저장되므로 인덱스 파일 크기가 크게 증가하여 디스크 공간을 더 많이 차지합니다.</p></li>
</ul>
<h4 id="AISAQ-scale" class="common-anchor-header">AISAQ 규모</h4><p><strong>AISAQ-스케일은</strong> 모든 데이터를 디스크에 유지하면서 <em>디스크 공간 사용량을 줄이는</em> 데 중점을 둡니다.</p>
<p>이 모드에서는</p>
<ul>
<li><p>PQ 데이터는 중복 없이 디스크에 별도로 저장됩니다.</p></li>
<li><p>이 설계는 인덱스 크기를 최소화하지만 그래프 탐색 중에 더 많은 I/O 작업을 유발합니다.</p></li>
<li><p>IOPS 오버헤드를 완화하기 위해 AISAQ는 두 가지 최적화를 도입합니다:</p>
<ul>
<li><p>데이터 로컬리티를 개선하기 위해 우선순위에 따라 PQ 벡터를 정렬하는 재배열 전략.</p></li>
<li><p>자주 액세스하는 PQ 데이터를 캐시하는 DRAM의 PQ 캐시(pq_cache_size).</p></li>
</ul></li>
</ul>
<p>결과적으로 AISAQ-스케일은 스토리지 효율성은 더 좋지만 DISKANN 또는 AISAQ-퍼포먼스보다 성능이 낮습니다.</p>
<h2 id="Example-configuration" class="common-anchor-header">구성 예시<button data-href="#Example-configuration" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">AISAQ:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-specific-parameters" class="common-anchor-header">AISAQ 관련 매개변수<button data-href="#AISAQ-specific-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQ는 DISKANN에서 많은 매개변수를 상속합니다. 중복을 피하기 위해 AISAQ 관련 매개변수만 아래에 자세히 설명합니다. <code translate="no">max_degree</code> , <code translate="no">pq_code_budget_gb_ratio</code>, <code translate="no">search_list_size</code>, <code translate="no">beam_width_ratio</code> 과 같은 공유 매개변수에 대한 설명은 <a href="/docs/ko/diskann.md#DISKANN-params">DISKANN을</a> 참조하세요.</p>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>튜닝 제안</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>노드당 인라인으로 저장되는 PQ 벡터의 수입니다. 스토리지 레이아웃을 결정합니다(성능 대 스케일 모드).</p></td>
     <td><p><strong>유형</strong>: 정수</p><p><strong>범위</strong>: [0, <em>최대_각도</em>]</p><p><strong>기본값입니다</strong>: <code translate="no">-1</code></p></td>
     <td><p><code translate="no">inline_pq</code> 에 가까울수록 성능은 좋아지는 경향이 있지만 인덱스 파일 크기는 크게 증가합니다.</p><p><code translate="no">inline_pq</code> 이 0에 가까워지면 성능이 저하되고 인덱스 크기는 DISKANN과 비슷해집니다.</p><p><strong>참고</strong>: 디스크 성능에 따라 크게 달라집니다. 디스크 성능이 좋지 않은 경우 제한된 디스크 대역폭이 병목 현상이 되어 전체 성능이 저하될 수 있으므로 이 옵션을 활성화하지 않는 것이 좋습니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>우선순위에 따라 PQ 벡터 정렬을 활성화하여 I/O 로캘리티를 개선합니다.</p></td>
     <td><p><strong>Type</strong>: 부울</p><p><strong>범위</strong>: [참, 거짓]</p><p><strong>기본값입니다</strong>: <code translate="no">false</code></p></td>
     <td><p>쿼리 I/O를 줄이지만 인덱스 빌드 시간이 늘어납니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>DRAM(바이트) 단위의 PQ 캐시 크기입니다.</p></td>
     <td><p><strong>유형</strong>: 정수</p><p><strong>범위</strong>: [0, 1&lt;&lt;30]</p><p><strong>기본값입니다</strong>: <code translate="no">0</code></p></td>
     <td><p>캐시가 클수록 쿼리 성능이 향상되지만 DRAM 사용량이 증가합니다.</p></td>
   </tr>
</table>
<h2 id="Considerations" class="common-anchor-header">고려 사항<button data-href="#Considerations" class="anchor-icon" translate="no">
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
<li><p>디스크 성능이 중요합니다. AISAQ는 SSD IOPS에 크게 의존하므로 스토리지가 부족하면 QPS가 저하될 수 있습니다.</p></li>
<li><p>AISAQ 성능 모드 ≈ DISKANN 지연 시간이 짧지만 디스크 공간이 몇 배 더 필요할 수 있습니다.</p></li>
<li><p>AISAQ 규모 모드는 QPS가 덜 중요한 오프라인 검색 또는 데이터 아카이브 워크로드에 적합합니다.</p></li>
</ul>
