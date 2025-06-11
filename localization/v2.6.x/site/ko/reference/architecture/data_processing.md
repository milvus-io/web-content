---
id: data_processing.md
summary: Milvus의 데이터 처리 절차에 대해 알아보세요.
title: 데이터 처리
---
<h1 id="Data-Processing" class="common-anchor-header">데이터 처리<button data-href="#Data-Processing" class="anchor-icon" translate="no">
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
    </button></h1><p>이 문서에서는 Milvus에서 데이터 삽입, 인덱스 구축 및 데이터 쿼리를 구현하는 방법에 대해 자세히 설명합니다.</p>
<h2 id="Data-insertion" class="common-anchor-header">데이터 삽입<button data-href="#Data-insertion" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus에서 각 컬렉션에 대해 여러 개의 샤드를 지정할 수 있으며, 각 샤드는 가상 채널<em>(vchannel)</em>에 해당합니다. 다음 그림에서 볼 수 있듯이, Milvus는 로그 브로커의 각 v채널에 물리적 채널<em>(p채널)</em>을 할당합니다. 들어오는 모든 삽입/삭제 요청은 기본 키의 해시값에 따라 샤드로 라우팅됩니다.</p>
<p>Milvus에는 복잡한 트랜잭션이 없기 때문에 DML 요청의 유효성 검사는 프록시로 전달됩니다. 프록시는 루트 코디네이터와 코로케이션하는 타이밍 모듈인 TSO(타임스탬프 오라클)로부터 각 삽입/삭제 요청에 대한 타임스탬프를 요청합니다. 이전 타임스탬프가 최신 타임스탬프로 덮어쓰기 때문에 타임스탬프는 처리 중인 데이터 요청의 순서를 결정하는 데 사용됩니다. 프록시는 엔티티의 세그먼트와 기본 키를 포함한 데이터 코디에서 정보를 일괄적으로 검색하여 전체 처리량을 늘리고 중앙 노드에 과부하가 걸리지 않도록 합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/channels_1.jpg" alt="Channels 1" class="doc-image" id="channels-1" />
   </span> <span class="img-wrapper"> <span>채널 1</span> </span></p>
<p>DML(데이터 조작 언어) 작업과 DDL(데이터 정의 언어) 작업 모두 로그 시퀀스에 기록되지만, DDL 작업은 발생 빈도가 낮기 때문에 하나의 채널만 할당됩니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/channels_2.jpg" alt="Channels 2" class="doc-image" id="channels-2" />
   </span> <span class="img-wrapper"> <span>채널 2</span> </span></p>
<p><em>V채널은</em> 기본 로그 브로커 노드에서 유지 관리됩니다. 각 채널은 물리적으로 분할할 수 없으며 단 하나의 노드에서만 사용할 수 있습니다. 데이터 수집 속도가 병목현상에 도달하면 두 가지를 고려해야 합니다: 로그 브로커 노드에 과부하가 걸려 확장해야 하는지 여부와 각 노드의 부하 균형을 보장할 수 있는 충분한 샤드가 있는지 여부입니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/write_log_sequence.jpg" alt="Write log sequence" class="doc-image" id="write-log-sequence" />
   </span> <span class="img-wrapper"> <span>로그 쓰기 시퀀스</span> </span></p>
<p>위의 다이어그램은 로그 시퀀스 쓰기 프로세스에 관련된 네 가지 구성 요소, 즉 프록시, 로그 브로커, 데이터 노드, 개체 저장소를 요약한 것입니다. 이 프로세스에는 DML 요청의 유효성 검사, 로그 시퀀스의 게시-구독, 스트리밍 로그에서 로그 스냅샷으로의 변환, 로그 스냅샷의 지속성이라는 네 가지 작업이 포함됩니다. 이 네 가지 작업은 서로 분리되어 각 작업이 해당 노드 유형에 의해 처리되도록 합니다. 동일한 유형의 노드는 동일하게 만들어지며 다양한 데이터 부하, 특히 대용량 및 변동이 심한 스트리밍 데이터를 수용하기 위해 탄력적이고 독립적으로 확장할 수 있습니다.</p>
<h2 id="Index-building" class="common-anchor-header">인덱스 구축<button data-href="#Index-building" class="anchor-icon" translate="no">
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
    </button></h2><p>인덱스 구축은 인덱스 노드별로 수행됩니다. 데이터 업데이트를 위한 잦은 인덱스 구축을 피하기 위해 Milvus의 컬렉션은 각각 고유한 인덱스가 있는 세그먼트로 더 세분화됩니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/index_building.jpg" alt="Index building" class="doc-image" id="index-building" />
   </span> <span class="img-wrapper"> <span>인덱스 구축</span> </span></p>
<p>Milvus는 각 벡터 필드, 스칼라 필드 및 기본 필드에 대한 인덱스 구축을 지원합니다. 인덱스 구축의 입력과 출력은 모두 객체 스토리지와 연동됩니다: 인덱스 노드는 인덱싱할 로그 스냅샷을 세그먼트(객체 스토리지에 있는)에서 메모리로 로드하고, 해당 데이터와 메타데이터를 역직렬화하여 인덱스를 구축하고, 인덱스 구축이 완료되면 인덱스를 직렬화하여 객체 스토리지에 다시 씁니다.</p>
<p>인덱스 구축은 주로 벡터와 행렬 연산을 포함하므로 연산과 메모리 집약적입니다. 벡터는 고차원적 특성으로 인해 기존의 트리 기반 인덱스로는 효율적으로 색인할 수 없지만 클러스터 또는 그래프 기반 인덱스와 같이 이 주제에서 더 성숙한 기술을 사용하여 색인할 수 있습니다. 그 유형에 관계없이, 인덱스를 구축하려면 Kmeans나 그래프 트래버스 같은 대규모 벡터에 대한 대규모 반복 계산이 필요합니다.</p>
<p>스칼라 데이터에 대한 인덱싱과 달리, 벡터 인덱스를 구축하려면 SIMD(단일 명령어, 다중 데이터) 가속을 최대한 활용해야 합니다. Milvus는 SSE, AVX2, AVX512와 같은 SIMD 명령어 집합을 기본적으로 지원합니다. 벡터 인덱스 구축의 "딸꾹질"과 리소스 집약적인 특성을 고려할 때, 탄력성은 경제적인 측면에서 Milvus에게 매우 중요합니다. 향후 Milvus 릴리스에서는 이기종 컴퓨팅과 서버리스 컴퓨팅에 대한 추가 탐색을 통해 관련 비용을 절감할 수 있을 것입니다.</p>
<p>또한 Milvus는 스칼라 필터링과 기본 필드 쿼리도 지원합니다. 블룸 필터 인덱스, 해시 인덱스, 트리 기반 인덱스, 반전 인덱스 등 쿼리 효율성을 개선하기 위한 인덱스가 내장되어 있으며, 비트맵 인덱스와 러프 인덱스 등 더 많은 외부 인덱스를 도입할 계획입니다.</p>
<h2 id="Data-query" class="common-anchor-header">데이터 쿼리<button data-href="#Data-query" class="anchor-icon" translate="no">
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
    </button></h2><p>데이터 쿼리는 지정된 컬렉션에서 대상 벡터에 가장 가까운 벡터의 개수 또는 벡터와 지정된 거리 범위 내의 <em>모든</em> 벡터를 검색하는 프로세스를 말합니다. 벡터는 해당 기본 키 및 필드와 함께 반환됩니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" />
   </span> <span class="img-wrapper"> <span>데이터 쿼리</span> </span></p>
<p>Milvus의 컬렉션은 여러 세그먼트로 분할되며, 쿼리 노드는 세그먼트별로 인덱스를 로드합니다. 검색 요청이 도착하면 동시 검색을 위해 모든 쿼리 노드에 브로드캐스트됩니다. 그런 다음 각 노드는 로컬 세그먼트를 정리하고 기준에 맞는 벡터를 검색한 다음 검색 결과를 축소하여 반환합니다.</p>
<p>쿼리 노드는 데이터 쿼리에서 서로 독립적입니다. 각 노드는 두 가지 작업만 담당합니다: 쿼리 코디의 지시에 따라 세그먼트를 로드하거나 해제하고, 로컬 세그먼트 내에서 검색을 수행합니다. 그리고 프록시는 각 쿼리 노드에서 검색 결과를 축소하고 최종 결과를 클라이언트에 반환하는 역할을 담당합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/handoff.jpg" alt="Handoff" class="doc-image" id="handoff" />
   </span> <span class="img-wrapper"> <span>핸드오프</span> </span></p>
<p>세그먼트에는 증가하는 세그먼트(증분 데이터용)와 봉인된 세그먼트(기록 데이터용)의 두 가지 유형이 있습니다. 쿼리 노드는 vchannel을 구독하여 최근 업데이트(증분 데이터)를 증가하는 세그먼트로 수신합니다. 증가하는 세그먼트가 미리 정의된 임계값에 도달하면, 데이터 코드는 세그먼트를 봉인하고 인덱스 구축을 시작합니다. 그런 다음 쿼리 코디에 의해 시작된 <em>핸드오프</em> 작업이 증분 데이터를 과거 데이터로 전환합니다. 쿼리 코드는 메모리 사용량, CPU 오버헤드, 세그먼트 수에 따라 봉인된 세그먼트를 모든 쿼리 노드에 균등하게 분배합니다.</p>
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
<li><a href="https://milvus.io/blog/deep-dive-5-real-time-query.md">실시간 쿼리를 위해 Milvus 벡터 데이터베이스를 사용하는</a> 방법에 대해 알아보세요.</li>
<li><a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">Milvus의 데이터 삽입 및 데이터 지속성에</a> 대해 알아보세요.</li>
<li><a href="https://milvus.io/blog/deep-dive-3-data-processing.md">Milvus에서 데이터가</a> 어떻게 <a href="https://milvus.io/blog/deep-dive-3-data-processing.md">처리되는지</a> 알아보세요.</li>
</ul>
