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
    </button></h1><p>AISAQ는 디스크 기반 벡터 인덱스로, 최소한의 DRAM 공간으로 수십억 규모의 데이터 세트를 처리할 수 있도록 <a href="/docs/ko/diskann.md">DISKANN을</a> 확장한 것입니다.</p>
<p>압축된 벡터를 메모리에 보관하는 DISKANN과 달리, AISAQ는 모든 데이터 구조를 SSD에 보관하는 '제로에 가까운 DRAM 아키텍처'로 설계되었습니다.</p>
<p>AISAQ는 성능과 스토리지 비용의 균형을 맞추는 운영 모드를 제공하면서 표준 서버를 사용해 초대형 데이터베이스를 실행할 수 있습니다.</p>
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
    </button></h2><p>위의 다이어그램은 <strong>디스크앤</strong>, <strong>AISAQ-성능</strong>, <strong>AISAQ-규모의</strong> 스토리지 레이아웃을 비교하여 데이터(원시 벡터, 에지 목록, PQ 코드)가 RAM과 디스크 간에 어떻게 분산되는지 보여줍니다.</p>
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
<h3 id="AISAQ-Operation-Modes" class="common-anchor-header">AISAQ 작동 모드<button data-href="#AISAQ-Operation-Modes" class="anchor-icon" translate="no">
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
    </button></h3><p>AISAQ는 두 가지 사용 사례를 해결하기 위해 두 가지 작동 모드를 제공합니다:</p>
<p>성능 모드: 온라인 시맨틱 검색과 같이 낮은 지연 시간과 대규모의 높은 처리량이 필요한 애플리케이션에 최적화되어 있습니다.</p>
<p>확장 모드: RAG 및 오프라인 시맨틱 검색과 같이 보다 완화된 지연 시간 제약이 있는 애플리케이션에 최적화되어 있으며, 데이터 세트를 비용 효율적으로 초대형 규모로 확장할 수 있습니다.</p>
<h4 id="AISAQ-performance-mode" class="common-anchor-header">AISAQ 성능 모드</h4><p><strong>AISAQ-성능은</strong> 데이터 코로케이션과 리던던시를 통해 낮은 IOPS를 유지하면서 PQ 데이터를 메모리에서 디스크로 이동하여 '제로에 가까운 DRAM 풋프린트'를 달성합니다.</p>
<ul>
<li><p>각 노드의 원시 벡터, 엣지 목록, 이웃 노드의 PQ 데이터는 디스크에 함께 저장됩니다.</p></li>
<li><p>이 레이아웃은 노드(예: 벡터 0)를 방문해도 여전히 단일 디스크 I/O만 필요하도록 보장합니다.</p></li>
<li><p>PQ 데이터가 여러 노드 근처에 중복 저장되므로 인덱스 파일 크기가 크게 증가하여 디스크 공간이 더 많이 소모됩니다.</p></li>
</ul>
<h4 id="AISAQ-scale-mode" class="common-anchor-header">AISAQ 규모 모드</h4><p><strong>AISAQ-스케일은</strong> 대상 애플리케이션의 성능 요구 사항을 충족하면서 디스크 공간 사용량을 줄이는 데 중점을 둡니다.</p>
<p>이 모드에서는</p>
<ul>
<li><p>PQ 데이터는 중복 없이 디스크에 별도로 저장됩니다.</p></li>
<li><p>이 설계는 인덱스 크기를 최소화하지만 그래프 탐색 중에 더 많은 I/O 작업을 유발합니다.</p></li>
<li><p>IOPS 오버헤드를 완화하기 위해 AISAQ는 두 가지 최적화를 도입합니다:</p>
<ul>
<li><p>데이터 로컬리티를 개선하기 위해 우선순위에 따라 PQ 벡터를 정렬하는 재배열 알고리즘.</p></li>
<li><p>자주 액세스하는 PQ 데이터를 캐시하는 DRAM의 PQ 캐시(pq_read_page_cache_size).</p></li>
</ul></li>
</ul>
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
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Controls the maximum number of connections (edges) each data point can have in the Vamana graph</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># During index construction, this parameter defines the size of the candidate pool used when searching for the nearest neighbors for each node. For every node being added to the graph, the algorithm maintains a list of the search_list_size best candidates found so far. The search for neighbors stops when this list can no longer be improved. From this final candidate pool, the top max_degree nodes are selected to form the final edges</span>
      <span class="hljs-attr">inline_pq:</span> <span class="hljs-number">-1</span> <span class="hljs-comment"># Number of PQ vectors stored inline per Index node (read when node is accessed, to reduce IO)</span>
      <span class="hljs-attr">rearrange:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Re-arrange the PQ vectors data structure to improve data locality and reduce disk accesses during search (ignored in performance mode)</span>
      <span class="hljs-attr">num_entry_points:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Number of candidate entry points to optimize search entry-point selection</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Controls the size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
      <span class="hljs-attr">disk_pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.25</span> <span class="hljs-comment"># Controls the size of the PQ codes of the high precision vectors stored in the index (used for re-ranking), compared to the size of the uncompressed data</span>
      <span class="hljs-attr">pq_cache_size:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># PQ vectors cache size in DRAM (bytes). The PQ vectors cache is loaded during Index load and used during search to reduce IOs (ignored in performance mode)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0</span> <span class="hljs-comment"># Controls the amount of DRAM to be used for caching frequently accessed index nodes. This cache is loaded during index load and used during search to reduce IOs</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">search_list:</span> <span class="hljs-number">16</span> <span class="hljs-comment"># During a search operation, this parameter determines the size of the candidate pool that the algorithm maintains as it traverses the graph. A larger value increases the chances of finding the true nearest neighbors (higher recall) but also increases search latency</span>
      <span class="hljs-attr">beamwidth:</span> <span class="hljs-number">8</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read the index nodes</span>
      <span class="hljs-attr">vectors_beamwidth:</span> <span class="hljs-number">1</span> <span class="hljs-comment"># Controls the degree of parallelism during search by determining the maximum number of parallel disk I/O requests to read groups of neighboring PQ vectors (ignored in performance mode)</span>
      <span class="hljs-attr">pq_read_page_cache_size:</span> <span class="hljs-number">5242880</span> <span class="hljs-string">(5MiB)</span> <span class="hljs-comment"># PQ read cache size in DRAM per search thread (bytes). It caches frequently accessed data pages containing PQ vectors (ignored in performance mode and applicable only when rearrange is true). The PQ read cache memory is reused across all AISAQ segments</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="AISAQ-parameters" class="common-anchor-header">AISAQ 매개변수<button data-href="#AISAQ-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>AISAQ는 DISKANN( <code translate="no">max_degree</code>, <code translate="no">search_list_size</code>, <code translate="no">pq_code_budget_gb_ratio</code>)에서 일부 파라미터를 상속합니다.</p>
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
    </button></h3><p>이러한 매개변수는 AISAQ 인덱스가 구성되는 방식에 영향을 줍니다. 이를 조정하면 인덱스 크기, 구축 시간 및 검색 품질에 영향을 줄 수 있습니다.</p>
<table>
   <tr>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 제안</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>Vamana 그래프에서 각 데이터 포인트가 가질 수 있는 최대 연결 수(에지)를 제어합니다.</p></td>
     <td><p><strong>유형</strong>: 정수</p><p><strong>범위</strong>: [1, 512]</p><p><strong>기본값입니다</strong>: <code translate="no">56</code></p></td>
     <td><p>값이 클수록 그래프가 더 조밀해져 리콜(관련성 높은 결과 찾기) 가능성이 높아지지만 메모리 사용량과 빌드 시간도 늘어납니다. 대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [10, 100].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>인덱스 구성 중에 이 파라미터는 각 노드에 대해 가장 가까운 이웃을 검색할 때 사용되는 후보 풀의 크기를 정의합니다. 그래프에 추가되는 모든 노드에 대해 알고리즘은 지금까지 발견된 search_list_size의 최적 후보 목록을 유지합니다. 이 목록을 더 이상 개선할 수 없는 경우 이웃 검색이 중지됩니다. 이 최종 후보 풀에서 최상위 max_degree 노드가 선택되어 최종 에지를 형성합니다.</p></td>
     <td><p><strong>유형</strong>: 정수</p><p><strong>범위</strong>: [1, 512]</p><p><strong>기본값입니다</strong>: <code translate="no">100</code></p></td>
     <td><p>search_list_size가 클수록 각 노드에 대해 실제 가장 가까운 이웃을 찾을 가능성이 높아져 그래프 품질이 높아지고 검색 성능(리콜)이 향상될 수 있습니다. 하지만 인덱스 빌드 시간이 상당히 길어지는 대가가 따릅니다. 이 값은 항상 max_degree보다 크거나 같은 값으로 설정해야 합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">inline_pq</code></p></td>
     <td><p>인덱스 노드당 인라인으로 저장되는 PQ 벡터의 수(노드 액세스 시 읽음, IO 감소)</p></td>
     <td><p><strong>유형</strong>: 정수</p><p><strong>범위</strong>: [0, <em>max_degree</em>]</p><p><strong>기본값입니다</strong>: <code translate="no">-1</code></p></td>
     <td><p><code translate="no">inline_pq</code> 값이 클수록 성능이 향상되지만 디스크 공간이 증가합니다.</p><p>스케일 모드에서 AISAQ의 경우 <code translate="no">inline_pq</code>=0으로 설정합니다.</p><p><code translate="no">inline_pq</code>=-1로 설정하면 인덱스의 사용되지 않는 공간을 PQ 벡터로 자동으로 채워 스케일 모드에서 AISAQ를 더욱 최적화할 수 있습니다.</p><p>성능 모드에서 AISAQ에 대해 <code translate="no">inline_pq</code><em>=max_degree를</em> 설정합니다.</p><p><code translate="no">inline_pq</code> <em>0~최대_도</em> 사이로 설정하면 성능과 디스크 공간 소비 사이의 균형을 조정할 수 있습니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">rearrange</code></p></td>
     <td><p>PQ 벡터 데이터 구조를 재정렬하여 데이터 로컬리티를 개선하고 검색 중 디스크 액세스를 줄입니다(성능 모드에서는 무시됨).</p></td>
     <td><p><strong>유형</strong>: 부울</p><p><strong>범위</strong>: [참, 거짓]</p><p><strong>기본값입니다</strong>: <code translate="no">true</code></p></td>
     <td><p>true이면 검색 중 메모리와 인덱스 빌드 시간이 약간만 증가하면서 IO를 줄입니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">num_entry_points</code></p></td>
     <td><p>검색 진입점 선택을 최적화하기 위한 후보 진입점 수입니다.</p></td>
     <td><p><strong>유형</strong>: 정수</p><p><strong>범위</strong>: [0, 1000]</p><p><strong>기본값입니다</strong>: <code translate="no">100</code></p></td>
     <td><p>값이 크면 더 가까운 진입점에서 검색을 시작하여 검색 시간이 단축될 수 있습니다.</p><p>세그먼트가 큰 경우 더 높은 값을 설정합니다(예: 10M 벡터 이상의 경우 1000 값 사용).</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>압축되지 않은 데이터의 크기와 비교하여 PQ 코드(데이터 포인트의 압축된 표현)의 크기를 제어합니다.</p></td>
     <td><p><strong>유형</strong>: Float</p><p><strong>범위</strong>: (0.0, 0.25]]</p><p><strong>기본값입니다</strong>: <code translate="no">0.125</code></p></td>
     <td><p>비율이 높을수록 검색 결과가 더 정확해져 원본 벡터에 대한 더 많은 정보를 효과적으로 저장할 수 있지만 검색 시 계산 복잡성이 증가합니다.</p><p>대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: (0.0417, 0.25].</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">disk_pq_code_budget_gb_ratio</code></p></td>
     <td><p>압축되지 않은 데이터의 크기와 비교하여 인덱스에 저장된 고정밀 벡터(재랭크에 사용)의 PQ 코드 크기를 제어합니다.</p></td>
     <td><p><strong>유형</strong>: Float</p><p><strong>범위</strong>: [0, 0.25]</p><p><strong>기본값입니다</strong>: <code translate="no">0.25</code></p></td>
     <td><p>기본값 0.25를 사용하면 벡터가 원래 크기의 25%(4배 압축)로 정량화되어 정확도에 미치는 영향을 상대적으로 최소화하면서 디스크 공간을 줄일 수 있습니다.</p><p>값을 0으로 설정하면 전체 정밀도 벡터를 디스크 인덱스에 저장하여 다시 순위를 매깁니다. 값이 클수록 재검색률이 높아지지만 디스크 사용량이 증가합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_cache_size</code></p></td>
     <td><p>PQ 벡터 캐시 크기(바이트). PQ 벡터 캐시는 인덱스를 로드하는 동안 로드되고 검색 중에 사용되어 IO를 줄입니다(성능 모드에서는 무시됨).</p></td>
     <td><p><strong>유형</strong>: 정수</p><p><strong>범위</strong>: [0, 1073741824]</p><p><strong>기본값입니다</strong>: <code translate="no">0</code></p></td>
     <td><p>캐시가 클수록 쿼리 성능은 향상되지만 DRAM 사용량이 증가합니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>자주 액세스하는 인덱스 노드를 캐싱하는 데 사용할 DRAM의 양을 제어합니다.</p><p>이 캐시는 인덱스로드 중에 로드되고 검색 중에 사용되어 IO를 줄입니다.</p></td>
     <td><p><strong>유형</strong>: Float</p><p><strong>범위</strong>: [0.0, 0.3)</p><p><strong>기본값입니다</strong>: <code translate="no">0</code></p></td>
     <td><p>값이 클수록 캐싱에 더 많은 메모리를 할당하여 디스크 IO를 줄이지만 시스템 메모리를 더 많이 사용합니다. 값이 낮을수록 캐싱에 더 적은 메모리를 사용하므로 디스크 액세스 필요성이 증가할 수 있습니다.</p></td>
   </tr>
</table>
<h3 id="Index-search-params" class="common-anchor-header">인덱스 검색 매개변수<button data-href="#Index-search-params" class="anchor-icon" translate="no">
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
    </button></h3><p>이러한 매개변수는 AISAQ가 검색을 수행하는 방식에 영향을 줍니다. 이를 조정하면 검색 속도, 지연 시간 및 리소스 사용량에 영향을 줄 수 있습니다.</p>
<table>
   <tr>
     <th><p>매개변수</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 제안</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">search_list</code></p></td>
     <td><p>검색 작업 중에 이 매개변수는 알고리즘이 그래프를 탐색할 때 유지하는 후보 풀의 크기를 결정합니다. 값이 클수록 실제 가장 가까운 이웃을 찾을 확률이 높아지지만(리콜률이 높아짐) 검색 지연 시간도 증가합니다.</p></td>
     <td><p><strong>유형</strong>: 유형: 정수</p><p><strong>범위</strong>: [TOPK, INT32_MAX]</p><p><strong>기본값입니다</strong>: <code translate="no">16</code></p></td>
     <td><p>성능과 정확도 사이의 적절한 균형을 위해 이 값을 검색하려는 결과 수(top_k)와 같거나 약간 더 크게 설정하는 것이 좋습니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">beamwidth</code></p></td>
     <td><p>인덱스 노드를 읽기 위한 최대 병렬 디스크 I/O 요청 수를 결정하여 검색 중 병렬 처리 정도를 제어합니다.</p></td>
     <td><p><strong>유형</strong>: 정수</p><p><strong>범위</strong>: [1, 16]</p><p><strong>기본값입니다</strong>: <code translate="no">8</code></p></td>
     <td><p>값이 클수록 병렬 처리가 증가하여 강력한 CPU 및 SSD를 사용하는 시스템에서 검색 속도가 빨라질 수 있습니다. 그러나 너무 높게 설정하면 과도한 리소스 경합이 발생할 수 있습니다.</p><p>대부분의 경우 2로 설정하는 것이 좋습니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">vectors_beamwidth</code></p></td>
     <td><p>인접한 PQ 벡터 그룹을 읽기 위한 병렬 디스크 I/O 요청의 최대 수를 결정하여 검색 중 병렬 처리 정도를 제어합니다(성능 모드에서는 무시됨).</p></td>
     <td><p><strong>유형</strong>: 정수</p><p><strong>범위</strong>: [1, 4]는 &lt;= <em>빔폭이어야</em> 합니다.</p><p><strong>기본값입니다</strong>: <code translate="no">1</code></p></td>
     <td><p>값이 클수록 병렬 처리가 증가하여 강력한 CPU 및 SSD를 사용하는 시스템에서 검색 속도가 빨라질 수 있습니다. 그러나 너무 높게 설정하면 인접한 각 PQ 벡터 그룹에 최대 최대_도 벡터가 포함될 수 있으므로 과도한 리소스 경합이 발생할 수 있습니다.</p><p>대부분의 경우 1로 설정하는 것이 좋습니다.</p></td>
   </tr>
   <tr>
     <td><p><code translate="no">pq_read_page_cache_size</code></p></td>
     <td><p>검색 스레드당 DRAM의 PQ 읽기 캐시 크기(바이트). PQ 벡터가 포함된 자주 액세스하는 데이터 페이지를 캐시합니다(성능 모드에서는 무시되며 재정렬이 true인 경우에만 적용 가능).</p><p>PQ 읽기 캐시 메모리는 모든 AISAQ 세그먼트에서 재사용됩니다.</p></td>
     <td><p><strong>유형</strong>: 정수</p><p><strong>범위</strong>: [0, 33554432]</p><p><strong>기본값입니다</strong>: <code translate="no">5242880 (5MiB)</code></p></td>
     <td><p>캐시가 클수록 쿼리 성능이 향상되지만 DRAM 사용량이 증가합니다.</p><p>권장 값은 소형 세그먼트(1M 벡터)의 경우 2MiB, 중형 세그먼트(50M 벡터)의 경우 5MiB, 대형 세그먼트(250M 벡터)의 경우 10MiB입니다.</p></td>
   </tr>
</table>
