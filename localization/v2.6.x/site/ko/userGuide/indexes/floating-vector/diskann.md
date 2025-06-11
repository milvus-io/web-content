---
id: diskann.md
title: DISKANN
summary: >-
  데이터 세트에 수십억 또는 수조 개의 벡터가 포함될 수 있는 대규모 시나리오에서는 표준 인메모리 인덱싱 방법(예: HNSW,
  IVF_FLAT)이 메모리 제한으로 인해 속도를 따라잡지 못하는 경우가 많습니다. DISKANN은 데이터 세트 크기가 사용 가능한 RAM을
  초과할 때 높은 검색 정확도와 속도를 유지함으로써 이러한 문제를 해결하는 디스크 기반 접근 방식을 제공합니다.
---
<h1 id="DISKANN" class="common-anchor-header">DISKANN<button data-href="#DISKANN" class="anchor-icon" translate="no">
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
    </button></h1><p>데이터 세트에 수십억 또는 수조 개의 벡터가 포함될 수 있는 대규모 시나리오에서는 메모리 제한으로 인해 표준 인메모리 색인 방법(예: <a href="/docs/ko/hnsw.md">HNSW</a>, <a href="/docs/ko/ivf-flat.md">IVF_FLAT</a>)이 속도를 따라잡지 못하는 경우가 많습니다. <strong>DISKANN은</strong> 데이터 세트 크기가 사용 가능한 RAM을 초과할 때 높은 검색 정확도와 속도를 유지함으로써 이러한 문제를 해결하는 디스크 기반 접근 방식을 제공합니다.</p>
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
    </button></h2><p><strong>DISKANN은</strong> 효율적인 벡터 검색을 위해 두 가지 핵심 기술을 결합합니다:</p>
<ul>
<li><p><strong>바마나 그래프</strong> - 검색 중 효율적인 탐색을 위해 데이터 포인트(또는 벡터)를 연결하는 <strong>디스크 기반의</strong> <strong>그래프 기반</strong> 인덱스입니다.</p></li>
<li><p><strong>제품 양자화(PQ)</strong> - 벡터의 크기를 줄여 벡터 간의 대략적인 거리를 빠르게 계산할 수 있게 해주는 <strong>인메모리</strong> 압축 방식입니다.</p></li>
</ul>
<h3 id="Index-construction" class="common-anchor-header">색인 구성</h3><h4 id="Vamana-graph" class="common-anchor-header">바마나 그래프</h4><p>Vamana 그래프는 디스크앤의 디스크 기반 전략의 핵심입니다. 구성 중이나 구성 후에 메모리에 완전히 상주할 필요가 없기 때문에 매우 큰 데이터 세트를 처리할 수 있습니다.</p>
<p>다음 그림은 Vamana 그래프가 어떻게 구성되는지 보여줍니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann.png" alt="Diskann" class="doc-image" id="diskann" />
   </span> <span class="img-wrapper"> <span>디스크</span> </span></p>
<ol>
<li><p><strong>초기 무작위 연결:</strong> 각 데이터 포인트(벡터)는 그래프에서 하나의 노드로 표시됩니다. 이러한 노드는 처음에 무작위로 연결되어 밀도가 높은 네트워크를 형성합니다. 일반적으로 노드는 광범위한 연결을 위해 약 500개의 에지(또는 연결)로 시작합니다.</p></li>
<li><p><strong>효율성을 위한 정제:</strong> 초기 무작위 그래프는 검색 효율을 높이기 위해 최적화 과정을 거칩니다. 여기에는 두 가지 주요 단계가 포함됩니다:</p>
<ul>
<li><p><strong>중복 에지 정리:</strong> 알고리즘은 노드 간의 거리를 기준으로 불필요한 연결을 삭제합니다. 이 단계에서는 더 높은 품질의 에지를 우선시합니다.</p>
<p><code translate="no">max_degree</code> 매개변수는 노드당 최대 에지 수를 제한합니다. <code translate="no">max_degree</code> 값이 높을수록 그래프가 더 조밀해져 관련성이 높은 이웃을 더 많이 찾을 수 있지만(리콜률이 높음), 메모리 사용량과 검색 시간이 늘어납니다.</p></li>
<li><p><strong>전략적 단축키 추가:</strong> Vamana는 벡터 공간에서 멀리 떨어져 있는 데이터 포인트를 연결하는 장거리 에지를 도입했습니다. 이러한 단축키를 사용하면 그래프에서 중간 노드를 우회하여 검색을 빠르게 이동하고 탐색 속도를 크게 높일 수 있습니다.</p>
<p><code translate="no">search_list_size</code> 매개변수는 그래프 세분화 프로세스의 폭을 결정합니다. <code translate="no">search_list_size</code> 값이 높을수록 구성 중 이웃 검색이 확장되어 최종 정확도가 향상되지만 인덱스 구축 시간이 늘어납니다.</p></li>
</ul></li>
</ol>
<p>매개변수 조정에 대해 자세히 알아보려면 <a href="/docs/ko/diskann.md#diskann-params">DISKANN 매개변수를</a> 참조하세요.</p>
<h4 id="PQ" class="common-anchor-header">PQ</h4><p>DISKANN은 <strong>PQ를</strong> 사용하여 고차원 벡터를 더 작은 표현<strong>(PQ 코드)</strong>으로 압축하고, 이를 메모리에 저장하여 대략적인 거리를 빠르게 계산합니다.</p>
<p><code translate="no">pq_code_budget_gb_ratio</code> 매개변수는 이러한 PQ 코드를 저장하는 전용 메모리 공간을 관리합니다. 이 값은 벡터의 총 크기(기가바이트)와 PQ 코드 저장을 위해 할당된 공간 사이의 비율을 나타냅니다. 다음 공식을 사용하여 실제 PQ 코드 예산(기가바이트)을 계산할 수 있습니다:</p>
<pre><code translate="no" class="language-plaintext">PQ Code Budget (GB) = vec_field_size_gb * pq_code_budget_gb_ratio
<button class="copy-code-btn"></button></code></pre>
<p>여기서</p>
<ul>
<li><p><code translate="no">vec_field_size_gb</code> 는 벡터의 총 크기(기가바이트)입니다.</p></li>
<li><p><code translate="no">pq_code_budget_gb_ratio</code> 는 사용자가 정의한 비율로, 전체 데이터 크기 중 PQ 코드용으로 예약된 비율을 나타냅니다. 이 매개변수를 사용하면 검색 정확도와 메모리 리소스 간의 균형을 맞출 수 있습니다. 매개변수 조정에 대한 자세한 내용은 <a href="/docs/ko/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">DISKANN 구성을</a> 참조하세요.</p></li>
</ul>
<p>기본 PQ 방법에 대한 기술적 세부 사항은 <a href="/docs/ko/ivf-pq.md#share-MA6SdYG0io3EASxoSpyc7JW3nvc">IVF_PQ를</a> 참조하세요.</p>
<h3 id="Search-process" class="common-anchor-header">검색 프로세스</h3><p>인덱스(디스크의 Vamana 그래프와 메모리의 PQ 코드)가 구축되면 DISKANN은 다음과 같이 ANN 검색을 수행합니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/diskann-2.png" alt="Diskann 2" class="doc-image" id="diskann-2" />
   </span> <span class="img-wrapper"> <span>Diskann 2</span> </span></p>
<ol>
<li><p><strong>쿼리 및 진입점:</strong> 가장 가까운 이웃을 찾기 위한 쿼리 벡터가 제공됩니다. DISKANN은 Vamana 그래프에서 선택한 진입점(대개 데이터 세트의 글로벌 중심점 근처의 노드)에서 시작합니다. 글로벌 중심은 모든 벡터의 평균을 나타내므로 그래프를 통과하는 거리를 최소화하여 원하는 이웃을 찾는 데 도움이 됩니다.</p></li>
<li><p><strong>이웃 탐색:</strong> 이 알고리즘은 현재 노드의 가장자리에서 잠재적인 후보 이웃(그림의 빨간색 원)을 수집하고, 인메모리 PQ 코드를 활용하여 이러한 후보와 쿼리 벡터 사이의 거리를 근사화합니다. 이러한 잠재적 후보 이웃은 Vamana 그래프에서 에지를 통해 선택한 진입점에 직접 연결된 노드입니다.</p></li>
<li><p><strong>정확한 거리 계산을 위해 노드를 선택합니다:</strong> 대략적인 결과에서 가장 유망한 이웃의 하위 집합(그림에서 녹색 원)은 원래의 압축되지 않은 벡터를 사용하여 정확한 거리 평가를 위해 선택됩니다. 이를 위해서는 디스크에서 데이터를 읽어야 하므로 시간이 많이 소요될 수 있습니다. DISKANN은 정확도와 속도 사이의 미묘한 균형을 제어하기 위해 두 가지 매개변수를 사용합니다:</p>
<ul>
<li><p><code translate="no">beam_width_ratio</code>: 검색의 폭을 제어하는 배율로, 이웃을 탐색하기 위해 얼마나 많은 후보 이웃을 병렬로 선택할지 결정합니다. <code translate="no">beam_width_ratio</code> 이 클수록 탐색 범위가 넓어져 정확도는 높아지지만 계산 비용과 디스크 I/O가 증가합니다. 빔 폭 또는 선택된 노드 수는 다음 공식을 사용하여 결정됩니다: <code translate="no">Beam width = Number of CPU cores * beam_width_ratio</code>.</p></li>
<li><p><code translate="no">search_cache_budget_gb_ratio</code>: 자주 액세스하는 디스크 데이터를 캐싱하기 위해 할당된 메모리 비율입니다. 이 캐싱은 디스크 I/O를 최소화하는 데 도움이 되며, 데이터가 이미 메모리에 있으므로 반복 검색을 더 빠르게 수행할 수 있습니다.</p></li>
</ul>
<p>매개변수 조정에 대해 자세히 알아보려면 <a href="/docs/ko/diskann.md#share-CEVtdKUBuou0g7xHU1uc1rmYnsd">DISKANN 구성을</a> 참조하세요.</p></li>
<li><p><strong>반복 탐색:</strong> 검색은 충분한 수의 이웃을 찾을 때까지 대략적인 평가(PQ 사용)와 정밀 검사(디스크의 원본 벡터 사용)를 반복적으로 수행하여 후보 집합을 반복적으로 구체화합니다.</p></li>
</ol>
<h2 id="Enable-DISKANN-in-Milvus" class="common-anchor-header">Milvus에서 DISKANN 활성화하기<button data-href="#Enable-DISKANN-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>기본적으로 Milvus에서는 RAM에 잘 맞는 데이터 세트에 대한 인메모리 인덱스의 속도를 우선순위로 지정하기 위해 <strong>DISKANN이</strong> 비활성화되어 있습니다. 그러나 대규모 데이터 세트로 작업하거나 <strong>DISKANN의</strong> 확장성 및 SSD 최적화를 활용하려는 경우 쉽게 활성화할 수 있습니다.</p>
<p>Milvus에서 DISKANN을 활성화하는 방법은 다음과 같습니다:</p>
<ol>
<li><p><strong>Milvus 구성 파일 업데이트</strong></p>
<ol>
<li><p>Milvus 구성 파일을 찾습니다<strong>.</strong> (이 파일을 찾는 방법에 대한 자세한 내용은 Milvus 구성 설명서를 참조하세요.)</p></li>
<li><p><code translate="no">queryNode.enableDisk</code> 파라미터를 찾아 값을 <code translate="no">true</code> 으로 설정합니다:</p>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">queryNode:</span>
     <span class="hljs-attr">enableDisk:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># Enables query nodes to load and search using the on-disk index</span>
<button class="copy-code-btn"></button></code></pre></li>
</ol></li>
<li><p><strong>DISKANN용 스토리지 최적화</strong></p></li>
</ol>
<p>DISKANN에서 최상의 성능을 보장하려면 Milvus 데이터를 빠른 NVMe SSD에 저장하는 것이 좋습니다. Milvus 독립형 및 클러스터 배포 모두에 대해 이 작업을 수행하는 방법은 다음과 같습니다:</p>
<ul>
<li><p><strong>Milvus 독립형</strong></p>
<ul>
<li><p>Milvus 데이터 디렉토리를 Milvus 컨테이너 내의 NVMe SSD에 마운트합니다. <code translate="no">docker-compose.yml</code> 파일 또는 다른 컨테이너 관리 도구를 사용하여 이 작업을 수행할 수 있습니다.</p></li>
<li><p>예를 들어, NVMe SSD가 <code translate="no">/mnt/nvme</code> 에 마운트되어 있는 경우 <code translate="no">docker-compose.yml</code> 의 <code translate="no">volumes</code>섹션을 다음과 같이 업데이트합니다:</p></li>
</ul>
<pre><code translate="no" class="language-yaml"> <span class="hljs-attr">volumes:</span>
      <span class="hljs-bullet">-</span> <span class="hljs-string">/mnt/nvme/volumes/milvus:/var/lib/milvus</span>
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Milvus 클러스터</strong></p>
<ul>
<li><p>Milvus 데이터 디렉터리를 QueryNode 및 IndexNode 컨테이너 모두의 NVMe SSD에 마운트합니다. 컨테이너 오케스트레이션 설정을 통해 이 작업을 수행할 수 있습니다.</p></li>
<li><p>두 노드 유형 모두에서 NVMe SSD에 데이터를 마운트하면 검색과 인덱싱 작업 모두에서 빠른 읽기 및 쓰기 속도를 보장할 수 있습니다.</p></li>
</ul></li>
</ul>
<p>이러한 변경을 완료한 후에는 Milvus 인스턴스를 다시 시작하여 설정을 적용하세요. 이제 Milvus는 대규모 데이터 세트를 처리하기 위해 DISKANN의 기능을 활용하여 효율적이고 확장 가능한 벡터 검색을 제공할 것입니다.</p>
<h2 id="Configure-DISKANN" class="common-anchor-header">DISKANN 구성<button data-href="#Configure-DISKANN" class="anchor-icon" translate="no">
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
    </button></h2><p>DISKANN 매개변수는 두 가지 주요 방법을 사용해 구성할 수 있습니다:</p>
<ul>
<li><p>Milvus 구성<strong>파일:</strong> Milvus 구성 파일을 통해 DISKANN 매개변수를 조정합니다. 이 방법은 Milvus 인스턴스에 대한 일반적인 구성 옵션을 설정하는 데 적합합니다.</p></li>
<li><p><strong>Milvus SDK:</strong> 인덱스 생성 또는 검색 작업 중에 Milvus SDK를 사용하여 DISKANN 매개변수를 미세 조정합니다. 이를 통해 특정 사용 사례에 따라 보다 세분화된 제어와 동적 매개변수 조정이 가능합니다.</p></li>
</ul>
<div class="alert note">
<p>SDK로 설정한 구성은 구성 파일에 정의된 모든 설정을 재정의하여 특정 애플리케이션과 데이터 세트에 대한 유연성과 제어 기능을 제공합니다.</p>
</div>
<h3 id="Milvus-configuration-file" class="common-anchor-header">Milvus 구성 파일</h3><p>다음은 <code translate="no">milvus.yaml</code> 파일 내에서 DISKANN 매개변수를 설정하는 방법의 예시입니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-attr">knowhere:</span>
  <span class="hljs-attr">enable:</span> <span class="hljs-literal">true</span> <span class="hljs-comment"># When enable this configuration, the index parameters defined following will be automatically populated as index parameters, without requiring user input.</span>
  <span class="hljs-attr">DISKANN:</span>
    <span class="hljs-attr">build:</span>
      <span class="hljs-attr">max_degree:</span> <span class="hljs-number">56</span> <span class="hljs-comment"># Maximum degree of the Vamana graph</span>
      <span class="hljs-attr">pq_code_budget_gb_ratio:</span> <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size limit on the PQ code (compared with raw data)</span>
      <span class="hljs-attr">search_cache_budget_gb_ratio:</span> <span class="hljs-number">0.1</span> <span class="hljs-comment"># Ratio of cached node numbers to raw data</span>
      <span class="hljs-attr">search_list_size:</span> <span class="hljs-number">100</span> <span class="hljs-comment"># Size of the candidate list during building graph</span>
    <span class="hljs-attr">search:</span>
      <span class="hljs-attr">beam_width_ratio:</span> <span class="hljs-number">4</span> <span class="hljs-comment"># Ratio between the maximum number of IO requests per search iteration and CPU number</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="SDK-configuration" class="common-anchor-header">SDK 구성</h3><p>다음은 Milvus SDK를 사용하여 DISKANN 매개변수를 설정하는 방법의 예시입니다.</p>
<h4 id="Build" class="common-anchor-header">빌드</h4><p>Milvus의 벡터 필드에 <code translate="no">IVF_FLAT</code> 인덱스를 구축하려면 <code translate="no">add_index()</code> 방법을 사용하여 <code translate="no">index_type</code>, <code translate="no">metric_type</code> 및 인덱스에 대한 추가 파라미터를 지정합니다.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

<span class="hljs-comment"># Prepare index building params</span>
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;your_vector_field_name&quot;</span>, <span class="hljs-comment"># Name of the vector field to be indexed</span>
    index_type=<span class="hljs-string">&quot;DISKANN&quot;</span>, <span class="hljs-comment"># Type of the index to create</span>
    index_name=<span class="hljs-string">&quot;vector_index&quot;</span>, <span class="hljs-comment"># Name of the index to create</span>
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-comment"># Metric type used to measure similarity</span>
    params={
        <span class="hljs-string">&quot;max_degree&quot;</span>: <span class="hljs-number">56</span>, <span class="hljs-comment"># Maximum number of connections (edges) each data point can have</span>
        <span class="hljs-string">&quot;search_list_size&quot;</span>: <span class="hljs-number">100</span>,
        <span class="hljs-string">&quot;search_cache_budget_gb_ratio&quot;</span>: <span class="hljs-number">0.10</span>, <span class="hljs-comment"># Amount of memory allocated for caching frequently accessed parts of the graph</span>
        <span class="hljs-string">&quot;pq_code_budget_gb_ratio&quot;</span>: <span class="hljs-number">0.125</span> <span class="hljs-comment"># Size of the PQ codes (compressed representations of data points) compared to the size of the uncompressed data</span>
    } <span class="hljs-comment"># Index building params</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>인덱스 파라미터가 구성되면 <code translate="no">create_index()</code> 메서드를 직접 사용하거나 <code translate="no">create_collection</code> 메서드에서 인덱스 파라미터를 전달하여 인덱스를 생성할 수 있습니다. 자세한 내용은 <a href="/docs/ko/create-collection.md">컬렉션 만들기를</a> 참조하세요.</p>
<h4 id="Search" class="common-anchor-header">검색</h4><p>인덱스가 생성되고 엔티티가 삽입되면 인덱스에서 유사도 검색을 수행할 수 있습니다.</p>
<pre><code translate="no" class="language-python">search_params = {
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-string">&quot;beam_width_ratio&quot;</span>: <span class="hljs-number">4.0</span>, <span class="hljs-comment"># degree of parallelism during search by determining the maximum number of parallel disk I/O requests relative to the number of available CPU cores.</span>
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
<h2 id="DISKANN-params" class="common-anchor-header">DISKANN 매개변수<button data-href="#DISKANN-params" class="anchor-icon" translate="no">
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
    </button></h2><p>DISKANN의 매개변수를 미세 조정하면 특정 데이터 세트와 검색 워크로드에 맞게 동작을 조정하여 속도, 정확도, 메모리 사용량 간에 적절한 균형을 맞출 수 있습니다.</p>
<h3 id="Index-building-params" class="common-anchor-header">색인 구축 매개변수</h3><p>이러한 매개변수는 DISKANN 인덱스가 구성되는 방식에 영향을 줍니다. 이 매개변수를 조정하면 인덱스 크기, 구축 시간, 검색 품질에 영향을 줄 수 있습니다.</p>
<table>
   <tr>
     <th></th>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 제안</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code translate="no">max_degree</code></p></td>
     <td><p>Vamana 그래프에서 각 데이터 포인트가 가질 수 있는 최대 연결 수(에지)를 제어합니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, 512]</p>
<p><strong>기본값입니다</strong>: <code translate="no">56</code></p></td>
     <td><p>값이 클수록 그래프가 더 조밀하게 생성되어 리콜(관련성 높은 결과 찾기)이 향상되지만 메모리 사용량과 빌드 시간이 늘어납니다. 
 대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [10, 100].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_list_size</code></p></td>
     <td><p>그래프를 작성하는 동안 각 데이터 포인트에 대해 고려할 후보 이웃의 수를 결정합니다.</p></td>
     <td><p><strong>유형</strong>: 정수 <strong>범위</strong>: [1, <em>int_max</em>]</p>
<p><strong>기본값입니다</strong>: <code translate="no">100</code></p></td>
     <td><p>값이 클수록 더 포괄적인 그래프가 생성되어 검색 품질이 향상될 수 있지만 작성 시간도 늘어납니다. 
 대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [K, 10K].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code translate="no">search_cache_budget_gb_ratio</code></p></td>
     <td><p>인덱스 구성 중에 그래프에서 자주 액세스하는 부분을 캐싱하기 위해 할당되는 메모리 양을 제어합니다.</p></td>
     <td><p><strong>유형</strong>: 실수 <strong>범위</strong>: [0.0, 0.3)</p>
<p><strong>기본값입니다</strong>: <code translate="no">0.10</code></p></td>
     <td><p>값이 클수록 캐싱에 더 많은 메모리를 할당하여 디스크 I/O를 크게 줄이지만 시스템 메모리를 더 많이 사용합니다. 값이 낮을수록 캐싱에 사용되는 메모리가 적어져 디스크 액세스 필요성이 증가할 수 있습니다. 대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [0.0, 0.3).</p></td>
   </tr>
   <tr>
     <td><p>PQ</p></td>
     <td><p><code translate="no">pq_code_budget_gb_ratio</code></p></td>
     <td><p>압축되지 않은 데이터의 크기와 비교하여 PQ 코드(데이터 포인트의 압축된 표현)의 크기를 제어합니다.</p></td>
     <td><p><strong>유형</strong>: 실수 <strong>범위</strong>: (0.0, 0.25]</p>
<p><strong>기본값입니다</strong>: <code translate="no">0.125</code></p></td>
     <td><p>비율이 높을수록 PQ 코드에 더 많은 메모리를 할당하여 원본 벡터에 대한 더 많은 정보를 효과적으로 저장함으로써 더 정확한 검색 결과를 얻을 수 있습니다. 하지만 더 많은 메모리가 필요하므로 대규모 데이터 세트를 처리할 수 있는 용량이 제한됩니다. 비율이 낮으면 메모리 사용량이 줄어들지만, 더 작은 PQ 코드가 더 적은 정보를 보유하므로 정확도가 떨어질 수 있습니다. 이 접근 방식은 메모리 제약이 우려되는 시나리오에 적합하며 잠재적으로 더 큰 데이터 세트의 색인화를 가능하게 합니다.</p>
<p>대부분의 경우 다음 범위 내에서 값을 설정하는 것이 좋습니다: [0.0625, 0.25].</p></td>
   </tr>
</table>
<h3 id="Index-specific-search-params" class="common-anchor-header">색인별 검색 매개변수</h3><p>이러한 매개변수는 DISKANN이 검색을 수행하는 방식에 영향을 줍니다. 이 매개변수를 조정하면 검색 속도, 지연 시간 및 리소스 사용량에 영향을 줄 수 있습니다.</p>
<table>
   <tr>
     <th></th>
     <th><p>파라미터</p></th>
     <th><p>설명</p></th>
     <th><p>값 범위</p></th>
     <th><p>조정 제안</p></th>
   </tr>
   <tr>
     <td><p>Vamana</p></td>
     <td><p><code translate="no">beam_width_ratio</code></p></td>
     <td><p>사용 가능한 CPU 코어 수에 비례하여 병렬 디스크 I/O 요청의 최대 수를 결정하여 검색 중 병렬 처리 정도를 제어합니다.</p></td>
     <td><p><strong>유형</strong>: 실수 <strong>범위</strong>: [1, 최대(128 / CPU 수, 16)]]</p>
<p><strong>기본값입니다</strong>: <code translate="no">4.0</code></p></td>
     <td><p>값이 높을수록 병렬 처리가 증가하여 강력한 CPU 및 SSD를 사용하는 시스템에서 검색 속도가 빨라질 수 있습니다. 그러나 너무 높게 설정하면 과도한 리소스 경합이 발생할 수 있습니다. 대부분의 경우 이 범위 내에서 값을 설정하는 것이 좋습니다: [1.0, 4.0].</p></td>
   </tr>
</table>
