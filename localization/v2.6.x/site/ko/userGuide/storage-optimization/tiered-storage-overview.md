---
id: tiered-storage-overview.md
title: 계층형 스토리지 개요Compatible with Milvus 2.6.4+
summary: >-
  기존의 풀로드 모드에서는 각 쿼리 노드가 초기화 시 세그먼트의 모든 데이터 필드와 인덱스를 로드해야 하며, 심지어 액세스하지 않을 수도 있는
  데이터도 로드해야 합니다. 이는 즉각적인 데이터 가용성을 보장하지만, 특히 대규모 데이터 세트를 처리할 때 높은 메모리 사용량, 과도한
  디스크 활동, 상당한 I/O 오버헤드 등 리소스 낭비를 초래하는 경우가 많습니다.
beta: Milvus 2.6.4+
---
<h1 id="Tiered-Storage-Overview" class="common-anchor-header">계층형 스토리지 개요<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Tiered-Storage-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>기존의 <em>풀로드</em> 모드에서는 각 쿼리 노드가 초기화 시 <a href="/docs/ko/glossary.md#Segment">세그먼트의</a> 모든 데이터 필드와 인덱스를 로드해야 하며, 심지어 액세스하지 않을 수도 있는 데이터도 로드해야 합니다. 이는 즉각적인 데이터 가용성을 보장하지만, 특히 대규모 데이터 세트를 처리할 때 높은 메모리 사용량, 디스크 활동량 증가, 상당한 I/O 오버헤드 등 리소스 낭비를 초래하는 경우가 많습니다.</p>
<p><em>계층형 스토리지는</em> 데이터 캐싱과 세그먼트 로딩을 분리하여 이러한 문제를 해결합니다. 밀버스는 모든 데이터를 한 번에 로드하는 대신 핫 데이터(로컬에 캐시)와 콜드 데이터(원격에 저장)를 구분하는 캐싱 계층을 도입합니다. 이제 쿼리 노드는 초기에 가벼운 <em>메타데이터만</em> 로드하고 필요에 따라 필드 데이터를 동적으로 가져오거나 내보냅니다. 이렇게 하면 로드 시간이 크게 단축되고, 로컬 리소스 활용도가 최적화되며, 쿼리 노드가 물리적 메모리나 디스크 용량을 훨씬 초과하는 데이터 세트를 처리할 수 있습니다.</p>
<p>다음과 같은 시나리오에서 계층형 스토리지를 활성화하는 것을 고려하세요:</p>
<ul>
<li><p>단일 쿼리 노드의 사용 가능한 메모리 또는 NVMe 용량을 초과하는 컬렉션</p></li>
<li><p>첫 번째 쿼리 지연 시간보다 빠른 로딩이 더 중요한 분석 또는 배치 워크로드</p></li>
<li><p>액세스 빈도가 낮은 데이터에 대해 가끔씩 캐시가 누락되는 것을 견딜 수 있는 혼합 워크로드</p></li>
</ul>
<div class="alert note">
<ul>
<li><p><em>메타데이터에는</em> 스키마, 인덱스 정의, 청크 맵, 행 수, 원격 개체에 대한 참조가 포함됩니다. 이러한 유형의 데이터는 크기가 작고 항상 캐시되며 절대 제거되지 않습니다.</p></li>
<li><p>세그먼트와 청크에 대한 자세한 내용은 <a href="/docs/ko/glossary.md#Segment">세그먼트를</a> 참조하세요.</p></li>
</ul>
</div>
<h2 id="How-it-works" class="common-anchor-header">작동 방식<button data-href="#How-it-works" class="anchor-icon" translate="no">
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
    </button></h2><p>계층형 저장소는 쿼리노드가 세그먼트 데이터를 관리하는 방식을 변경합니다. 로드 시점에 모든 필드와 인덱스를 캐싱하는 대신, 이제 QueryNode는 메타데이터만 로드하고 캐싱 계층을 사용하여 데이터를 동적으로 가져오고 내보냅니다.</p>
<h3 id="Full-load-mode-vs-Tiered-Storage-mode" class="common-anchor-header">전체 로드 모드와 계층형 스토리지 모드 비교<button data-href="#Full-load-mode-vs-Tiered-Storage-mode" class="anchor-icon" translate="no">
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
    </button></h3><p>풀로드 모드와 계층형 저장소 모드는 모두 동일한 데이터를 처리하지만, QueryNode가 이러한 구성 요소를 캐시하는 <em>시기와</em> <em>방법에서</em> 차이가 있습니다.</p>
<ul>
<li><p><strong>풀로드 모드</strong>: 로드 시 QueryNode는 메타데이터, 필드 데이터, 인덱스를 포함한 전체 컬렉션 데이터를 객체 스토리지에서 캐시합니다.</p></li>
<li><p><strong>계층형 저장소 모드</strong>: 로드 시 QueryNode는 메타데이터만 캐시합니다. 필드 데이터는 청크 단위로 온디맨드 방식으로 가져옵니다. 인덱스 파일은 첫 번째 쿼리에서 필요할 때까지 원격으로 유지되며, 그 다음에는 전체 세그먼트별 인덱스가 가져와 캐시됩니다.</p></li>
</ul>
<p>아래 다이어그램은 이러한 차이점을 보여줍니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/full-load-mode-vs-tiered-storage-mode.png" alt="Full Load Mode Vs Tiered Storage Mode" class="doc-image" id="full-load-mode-vs-tiered-storage-mode" />
   </span> <span class="img-wrapper"> <span>전체 로드 모드와 계층형 저장 모드 비교</span> </span></p>
<h3 id="QueryNode-loading-workflow" class="common-anchor-header">쿼리 노드 로딩 워크플로우<button data-href="#QueryNode-loading-workflow" class="anchor-icon" translate="no">
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
    </button></h3><p>계층형 스토리지의 워크플로에는 다음과 같은 단계가 있습니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/querynode-load-workflow.png" alt="Querynode Load Workflow" class="doc-image" id="querynode-load-workflow" />
   </span> <span class="img-wrapper"> <span>쿼리노드 로드 워크플로</span> </span></p>
<h4 id="Phase-1-Lazy-load" class="common-anchor-header">1단계: 지연 로드</h4><p>초기화 시 Milvus는 지연 로드를 수행하여 스키마 정의, 인덱스 정보, 청크 매핑과 같은 세그먼트 수준의 메타데이터만 캐싱합니다.</p>
<p>이 단계에서는 실제 필드 데이터나 인덱스 파일은 캐시되지 않습니다. 따라서 메모리와 디스크 소비를 최소화하면서 시작 후 거의 즉시 컬렉션을 쿼리할 수 있습니다.</p>
<p>필드 데이터와 인덱스 파일은 처음 액세스할 때까지 원격 저장소에 남아 있기 때문에, <em>첫 번째 쿼리에서는</em> 필요할 때 필요한 데이터를 가져와야 하므로 추가적인 지연 시간이 발생할 수 있습니다. 중요한 필드 또는 인덱스에 대해 이러한 효과를 완화하려면 세그먼트가 쿼리 가능해지기 전에 미리 로드하는 <a href="/docs/ko/tiered-storage-overview.md#Phase-2-Warm-up">워밍업</a> 전략을 사용할 수 있습니다.</p>
<p><strong>구성</strong></p>
<p>계층형 스토리지가 활성화되면 자동으로 적용됩니다. 수동 설정이 필요하지 않습니다.</p>
<h4 id="Phase-2-Warm-up" class="common-anchor-header">2단계: 워밍업</h4><p><a href="/docs/ko/tiered-storage-overview.md#Phase-1-Lazy-load">지연 로드로</a> 인해 발생하는 첫 번째 히트 지연 시간을 줄이기 위해 Milvus는 <em>워밍업</em> 메커니즘을 제공합니다.</p>
<p>세그먼트를 쿼리할 수 있게 되기 전에 Milvus는 오브젝트 스토리지에서 특정 필드 또는 인덱스를 사전에 가져와 캐시하여 첫 번째 쿼리가 온디맨드 로드를 트리거하는 대신 캐시된 데이터에 직접 닿도록 할 수 있습니다.</p>
<p>워밍업 중에 필드는 청크 수준에서 미리 로드되고 인덱스는 세그먼트 수준에서 미리 로드됩니다.</p>
<p><strong>구성</strong></p>
<p>워밍업 설정은 <code translate="no">milvus.yaml</code> 의 계층형 스토리지 섹션에 정의되어 있습니다. 각 필드 또는 인덱스 유형에 대해 사전 로드를 사용하거나 사용하지 않도록 설정하고 선호하는 전략을 지정할 수 있습니다. 자세한 구성은 <a href="/docs/ko/warm-up.md">워밍업을</a> 참조하세요.</p>
<h4 id="Phase-3-Partial-load" class="common-anchor-header">3단계: 부분 로드</h4><p>쿼리 또는 검색이 시작되면, 쿼리 노드는 <em>부분 로드를</em> 수행하여 필요한 데이터 청크 또는 인덱스 파일만 개체 스토리지에서 가져옵니다.</p>
<ul>
<li><p><strong>필드</strong>: <strong>청크 수준에서</strong> 온디맨드 방식으로 로드됩니다. 현재 쿼리 조건과 일치하는 데이터 청크만 가져오기 때문에 I/O 및 메모리 사용을 최소화합니다.</p></li>
<li><p><strong>인덱스</strong>: <strong>세그먼트 수준에서</strong> 온디맨드 방식으로 로드됩니다. 인덱스 파일은 완전한 단위로 가져와야 하며 청크로 분할할 수 없습니다.</p></li>
</ul>
<p><strong>구성</strong></p>
<p>계층형 스토리지가 활성화되면 부분 로드가 자동으로 적용됩니다. 수동 설정이 필요하지 않습니다. 중요한 데이터의 첫 번째 히트 지연 시간을 최소화하려면 <a href="/docs/ko/warm-up.md">워밍업과</a> 결합하세요.</p>
<h4 id="Phase-4-Eviction" class="common-anchor-header">4단계: 퇴거</h4><p>리소스 사용량을 정상적으로 유지하기 위해 Milvus는 특정 임계값에 도달하면 사용하지 않는 캐시 데이터를 자동으로 해제합니다.</p>
<p>퇴거는 <a href="https://en.wikipedia.org/wiki/Cache_replacement_policies">최근 사용량(LRU)</a> 정책에 따라 자주 액세스하지 않는 데이터가 먼저 제거되고 활성 데이터는 캐시에 남아 있도록 합니다.</p>
<p>퇴거는 다음과 같은 구성 가능한 항목의 적용을 받습니다:</p>
<ul>
<li><p><strong>워터마크</strong>: 퇴거를 트리거하고 중지하는 메모리 또는 디스크 임계값을 정의합니다.</p></li>
<li><p><strong>캐시 TTL</strong>: 정의된 비활성 기간이 지나면 오래된 캐시 데이터를 제거합니다.</p></li>
</ul>
<p><strong>구성</strong></p>
<p><strong>milvus.yaml에서</strong> 퇴거 매개변수를 활성화하고 조정합니다. 자세한 구성은 <a href="/docs/ko/eviction.md">퇴거를</a> 참조하세요.</p>
<h2 id="Getting-started" class="common-anchor-header">시작하기<button data-href="#Getting-started" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Prerequisites" class="common-anchor-header">전제 조건<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li><p>Milvus 2.6.4+</p></li>
<li><p>전용 메모리 및 디스크 리소스가 있는 쿼리 노드</p></li>
<li><p>객체 스토리지 백엔드(S3, MinIO 등)</p></li>
</ul>
<div class="alert warning">
<p>쿼리노드 리소스를 다른 워크로드와 공유해서는 안 됩니다. 리소스를 공유하면 계층형 스토리지가 사용 가능한 용량을 잘못 판단하여 충돌을 일으킬 수 있습니다.</p>
</div>
<h3 id="Basic-configuration-template" class="common-anchor-header">기본 구성 템플릿<button data-href="#Basic-configuration-template" class="anchor-icon" translate="no">
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
    </button></h3><p>Milvus 구성 파일(<code translate="no">milvus.yaml</code>)을 편집하여 계층형 스토리지 설정을 구성합니다:</p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-comment"># Warm Up Configuration</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar field data</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload scalar indexes</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>   <span class="hljs-comment"># Don&#x27;t preload vector field data (large)</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>      <span class="hljs-comment"># Preload vector indexes</span>
      
      <span class="hljs-comment"># Eviction Configuration</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      
      <span class="hljs-comment"># Memory Watermarks</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>   <span class="hljs-comment"># Stop evicting at 75%</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>  <span class="hljs-comment"># Start evicting at 80%</span>
      
      <span class="hljs-comment"># Disk Watermarks  </span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.80</span>
      
      <span class="hljs-comment"># Cache TTL (7 days)</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">604800</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Next-steps" class="common-anchor-header">다음 단계<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
    </button></h3><ol>
<li><p><strong>워밍업 구성</strong> - 액세스 패턴에 맞게 사전 로딩을 최적화합니다. <a href="/docs/ko/warm-up.md">워밍업을</a> 참조하세요.</p></li>
<li><p><strong>퇴거 조정</strong> - 리소스 제약 조건에 맞게 적절한 워터마크와 TTL을 설정합니다. <a href="/docs/ko/eviction.md">퇴거를</a> 참조하세요.</p></li>
<li><p><strong>성능 모니터링</strong> - 캐시 적중률, 퇴거 빈도, 쿼리 지연 시간 패턴을 추적합니다.</p></li>
<li><p><strong>구성 반복</strong> - 관찰된 워크로드 특성에 따라 설정을 조정합니다.</p></li>
</ol>
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
    </button></h2><h3 id="Can-I-change-Tiered-Storage-parameters-at-runtime" class="common-anchor-header">런타임에 계층형 스토리지 매개변수를 변경할 수 있나요?<button data-href="#Can-I-change-Tiered-Storage-parameters-at-runtime" class="anchor-icon" translate="no">
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
    </button></h3><p>아니요. 모든 매개변수는 Milvus를 시작하기 전에 <code translate="no">milvus.yaml</code> 에서 설정해야 합니다. 변경 사항을 적용하려면 다시 시작해야 합니다.</p>
<h3 id="Does-Tiered-Storage-affect-data-durability" class="common-anchor-header">계층형 스토리지가 데이터 지속성에 영향을 주나요?<button data-href="#Does-Tiered-Storage-affect-data-durability" class="anchor-icon" translate="no">
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
    </button></h3><p>아니요. 데이터 지속성은 여전히 원격 개체 스토리지에서 처리됩니다. 계층형 스토리지는 쿼리 노드에서만 캐싱을 관리합니다.</p>
<h3 id="Will-queries-always-be-faster-with-Tiered-Storage" class="common-anchor-header">계층형 스토리지를 사용하면 쿼리 속도가 항상 빨라지나요?<button data-href="#Will-queries-always-be-faster-with-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>반드시 그렇지는 않습니다. 계층형 스토리지는 로드 시간과 리소스 사용량을 줄여주지만 캐시되지 않은(콜드) 데이터에 접근하는 쿼리의 경우 지연 시간이 더 길어질 수 있습니다. 지연 시간에 민감한 워크로드의 경우 최대 부하 모드를 사용하는 것이 좋습니다.</p>
<h3 id="Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="common-anchor-header">계층형 저장소가 활성화되어 있어도 쿼리 노드에 리소스가 부족한 이유는 무엇인가요?<button data-href="#Why-does-a-QueryNode-still-run-out-of-resources-even-with-Tiered-Storage-enabled" class="anchor-icon" translate="no">
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
    </button></h3><p>두 가지 일반적인 원인이 있습니다:</p>
<ul>
<li><p>쿼리 노드가 너무 적은 리소스로 구성되었습니다. 워터마크는 사용 가능한 리소스에 상대적이기 때문에 프로비저닝이 부족하면 잘못된 판단이 증폭됩니다.</p></li>
<li><p>쿼리노드 리소스는 다른 워크로드와 공유되므로 계층형 스토리지가 실제 사용 가능한 용량을 올바르게 평가할 수 없습니다.</p></li>
</ul>
<p>이 문제를 해결하려면 쿼리 노드 전용 리소스를 할당하는 것이 좋습니다.</p>
<h3 id="Why-do-some-queries-fail-under-high-concurrency" class="common-anchor-header">일부 쿼리가 높은 동시성에서 실패하는 이유는 무엇인가요?<button data-href="#Why-do-some-queries-fail-under-high-concurrency" class="anchor-icon" translate="no">
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
    </button></h3><p>너무 많은 쿼리가 동시에 핫 데이터에 도달하면 쿼리 노드 리소스 제한을 초과할 수 있습니다. 리소스 예약 시간 초과로 인해 일부 스레드가 실패할 수 있습니다. 부하가 감소한 후 재시도하거나 리소스를 더 할당하면 이 문제를 해결할 수 있습니다.</p>
<h3 id="Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="common-anchor-header">계층형 스토리지를 활성화한 후 검색/쿼리 지연 시간이 증가하는 이유는 무엇인가요?<button data-href="#Why-does-searchquery-latency-increase-after-enabling-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>가능한 원인은 다음과 같습니다:</p>
<ul>
<li><p>스토리지에서 가져와야 하는 콜드 데이터에 대한 잦은 쿼리.</p></li>
<li><p>워터마크가 너무 가깝게 설정되어 동기식 퇴거가 빈번하게 발생하는 경우.</p></li>
</ul>
