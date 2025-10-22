---
id: best-practices-for-tiered-storage.md
title: 계층형 스토리지 모범 사례Compatible with Milvus 2.6.4+
summary: >-
  Milvus는 계층형 스토리지를 제공하여 대규모 데이터를 효율적으로 처리하는 동시에 쿼리 지연 시간, 용량 및 리소스 사용량의 균형을 맞출
  수 있도록 지원합니다. 이 가이드에서는 일반적인 워크로드에 대한 권장 구성을 요약하고 각 튜닝 전략에 대한 이유를 설명합니다.
beta: Milvus 2.6.4+
---
<h1 id="Best-Practices-for-Tiered-Storage" class="common-anchor-header">계층형 스토리지 모범 사례<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.4+</span><button data-href="#Best-Practices-for-Tiered-Storage" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 대규모 데이터를 효율적으로 처리하는 동시에 쿼리 지연 시간, 용량 및 리소스 사용량의 균형을 맞출 수 있도록 계층형 스토리지를 제공합니다. 이 가이드에서는 일반적인 워크로드에 대한 권장 구성을 요약하고 각 튜닝 전략의 근거를 설명합니다.</p>
<h2 id="Before-you-start" class="common-anchor-header">시작하기 전에<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>Milvus v2.6.4 이상</p></li>
<li><p>쿼리 노드에는 전용 로컬 리소스(메모리 및 디스크)가 있어야 합니다. 공유 환경에서는 캐시 추정이 왜곡되어 퇴출이 잘못 판단될 수 있습니다.</p></li>
</ul>
<h2 id="Choose-the-right-strategy" class="common-anchor-header">올바른 전략 선택<button data-href="#Choose-the-right-strategy" class="anchor-icon" translate="no">
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
    </button></h2><p>계층형 스토리지는 워크로드에 맞게 조합할 수 있는 유연한 로딩 및 캐싱 전략을 제공합니다.</p>
<table>
   <tr>
     <th><p>목표</p></th>
     <th><p>권장 초점</p></th>
     <th><p>핵심 메커니즘</p></th>
   </tr>
   <tr>
     <td><p>첫 번째 쿼리 지연 시간 최소화</p></td>
     <td><p>중요 필드 미리 로드</p></td>
     <td><p>워밍업</p></td>
   </tr>
   <tr>
     <td><p>대규모 데이터의 효율적인 처리</p></td>
     <td><p>온디맨드 로드</p></td>
     <td><p>지연 로드 + 부분 로드</p></td>
   </tr>
   <tr>
     <td><p>장기적인 안정성 유지</p></td>
     <td><p>캐시 오버플로 방지</p></td>
     <td><p>퇴거</p></td>
   </tr>
   <tr>
     <td><p>성능과 용량 균형 유지</p></td>
     <td><p>사전 로드와 동적 캐싱 결합</p></td>
     <td><p>하이브리드 구성</p></td>
   </tr>
</table>
<h2 id="Scenario-1-real-time-low-latency-retrieval" class="common-anchor-header">시나리오 1: 실시간, 짧은 지연 시간 검색<button data-href="#Scenario-1-real-time-low-latency-retrieval" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>사용 시기</strong></p>
<ul>
<li><p>쿼리 지연 시간이 중요한 경우(예: 실시간 추천 또는 검색 순위)</p></li>
<li><p>핵심 벡터 인덱스와 스칼라 필터에 자주 액세스하는 경우</p></li>
<li><p>시작 속도보다 일관된 성능이 더 중요한 경우</p></li>
</ul>
<p><strong>권장 구성</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># scalar field/index warm-up to eliminate first-time latency</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">sync</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">sync</span>
        <span class="hljs-comment"># warm-up of vector fields is disabled (if the original vector is not required)</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># vector indexes warm-up to elminate first-time latenct</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">sync</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.75</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.8</span>
      <span class="hljs-comment"># no expiration time, which avoids frequent reloading</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">0</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>근거</strong></p>
<ul>
<li><p>워밍업은 빈도가 높은 스칼라 및 벡터 인덱스의 첫 번째 히트 지연을 제거합니다.</p></li>
<li><p>백그라운드 퇴거는 쿼리를 차단하지 않고 캐시 압력을 안정적으로 유지합니다.</p></li>
<li><p>캐시 TTL을 비활성화하면 핫 데이터에 대한 불필요한 재로드를 방지할 수 있습니다.</p></li>
</ul>
<h2 id="Scenario-2-offline-batch-analysis" class="common-anchor-header">시나리오 2: 오프라인, 배치 분석<button data-href="#Scenario-2-offline-batch-analysis" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>사용 시기</strong></p>
<ul>
<li><p>쿼리 지연 시간 허용 오차가 높은 경우</p></li>
<li><p>워크로드에 대규모 데이터 세트 또는 많은 세그먼트가 포함된 경우</p></li>
<li><p>응답성보다 용량 및 처리량이 우선시되는 경우</p></li>
</ul>
<p><strong>권장 구성</strong></p>
<pre><code translate="no" class="language-yaml"><span class="hljs-comment"># milvus.yaml</span>
<span class="hljs-attr">queryNode:</span>
  <span class="hljs-attr">segcore:</span>
    <span class="hljs-attr">tieredStorage:</span>
      <span class="hljs-attr">enabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">warmup:</span>
        <span class="hljs-comment"># disable scalar field/index warm-up to speed up loading</span>
        <span class="hljs-attr">scalarField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">scalarIndex:</span> <span class="hljs-string">disable</span>
        <span class="hljs-comment"># disable vector field/index warm-up to speed up loading</span>
        <span class="hljs-attr">vectorField:</span> <span class="hljs-string">disable</span>
        <span class="hljs-attr">vectorIndex:</span> <span class="hljs-string">disable</span>
      <span class="hljs-comment"># enable cache eviction, and also turn on background asynchronous eviction</span>
      <span class="hljs-comment"># to reduce the triggering of synchronous eviction.</span>
      <span class="hljs-attr">evictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">backgroundEvictionEnabled:</span> <span class="hljs-literal">true</span>
      <span class="hljs-attr">memoryLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">memoryHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-attr">diskLowWatermarkRatio:</span> <span class="hljs-number">0.7</span>
      <span class="hljs-attr">diskHighWatermarkRatio:</span> <span class="hljs-number">0.85</span>
      <span class="hljs-comment"># use 1 day expiration to clean unused cache</span>
      <span class="hljs-attr">cacheTtl:</span> <span class="hljs-number">86400</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>근거</strong></p>
<ul>
<li><p>워밍업을 비활성화하면 많은 세그먼트를 초기화할 때 시작 속도가 빨라집니다.</p></li>
<li><p>워터마크가 높을수록 캐시를 더 조밀하게 사용할 수 있어 총 부하 용량이 향상됩니다.</p></li>
<li><p>캐시 TTL은 사용하지 않는 데이터를 자동으로 정리하여 로컬 공간을 확보합니다.</p></li>
</ul>
<h2 id="Scenario-3-hybrid-deployment-mixed-online-+-offline" class="common-anchor-header">시나리오 3: 하이브리드 배포(온라인+오프라인 혼합)<button data-href="#Scenario-3-hybrid-deployment-mixed-online-+-offline" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>사용 시기</strong></p>
<ul>
<li><p>단일 클러스터가 온라인 및 분석 워크로드를 모두 지원하는 경우</p></li>
<li><p>일부 컬렉션에는 짧은 지연 시간이 필요하고, 다른 컬렉션에는 용량이 우선시되는 경우</p></li>
</ul>
<p><strong>권장 전략</strong></p>
<ul>
<li><p>지연 시간에 민감한 컬렉션에 <strong>실시간 구성</strong> 적용</p></li>
<li><p>분석 또는 아카이브 컬렉션에 <strong>오프라인 구성</strong> 적용</p></li>
<li><p>각 워크로드 유형에 대해 evictableMemoryCacheRatio, cacheTtl 및 워터마크 비율을 독립적으로 조정합니다.</p></li>
</ul>
<p><strong>근거</strong></p>
<p>구성을 결합하면 리소스 할당을 세밀하게 제어할 수 있습니다.</p>
<p>중요 컬렉션은 낮은 지연 시간을 보장하는 반면 보조 컬렉션은 더 많은 세그먼트와 데이터 양을 처리할 수 있습니다.</p>
<h2 id="Additional-tuning-tips" class="common-anchor-header">추가 튜닝 팁<button data-href="#Additional-tuning-tips" class="anchor-icon" translate="no">
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
    </button></h2><table>
   <tr>
     <th><p>측면</p></th>
     <th><p>권장 사항</p></th>
     <th><p>설명</p></th>
   </tr>
   <tr>
     <td><p><strong>워밍업 범위</strong></p></td>
     <td><p>쿼리 빈도가 높은 필드 또는 인덱스만 미리 로드합니다.</p></td>
     <td><p>불필요한 사전 로딩은 로드 시간과 리소스 사용을 증가시킵니다.</p></td>
   </tr>
   <tr>
     <td><p><strong>퇴거 조정</strong></p></td>
     <td><p>기본 워터마크(75~80%)로 시작하여 점진적으로 조정합니다.</p></td>
     <td><p>간격이 작으면 빈번한 퇴거가 발생하고 간격이 크면 리소스 릴리스가 지연됩니다.</p></td>
   </tr>
   <tr>
     <td><p><strong>캐시 TTL</strong></p></td>
     <td><p>안정적인 핫 데이터 세트의 경우 비활성화, 동적 데이터의 경우 활성화(예: 1~3일)합니다.</p></td>
     <td><p>오래된 캐시 축적을 방지하는 동시에 정리 오버헤드의 균형을 맞춥니다.</p></td>
   </tr>
   <tr>
     <td><p><strong>초과 커밋 비율</strong></p></td>
     <td><p>리소스 여유 공간이 크지 않은 한 0.7을 초과하는 값은 피하세요.</p></td>
     <td><p>과도한 오버 커밋은 캐시 쓰래싱과 불안정한 지연 시간을 유발할 수 있습니다.</p></td>
   </tr>
   <tr>
     <td><p><strong>모니터링</strong></p></td>
     <td><p>캐시 적중률, 리소스 사용률, 퇴거 빈도를 추적하세요.</p></td>
     <td><p>콜드 로드가 자주 발생하면 워밍업 또는 워터마크 조정이 필요하다는 의미일 수 있습니다.</p></td>
   </tr>
</table>
