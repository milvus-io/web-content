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
    </button></h1><p>이 문서에서는 Milvus에서 데이터 삽입, 인덱스 생성 및 데이터 쿼리 구현에 대해 자세히 설명합니다.</p>
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
    </button></h2><p>Milvus에서 컬렉션이 사용할 샤드 수를 선택할 수 있으며, 각 샤드는 가상 채널(<em>vchannel</em>)에 매핑됩니다. 아래 그림에서 볼 수 있듯이, Milvus는 모든 <em>vchannel을</em> 물리적 채널(<em>pchannel</em>)에 할당하며, 각 <em>pchannel은</em> 특정 스트리밍 노드에 바인딩됩니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="/docs/v3.0.x/assets/pvchannel_wal.png" alt="VChannel, PChannel, and Streaming Node" class="doc-image" id="vchannel,-pchannel,-and-streaming-node" /> 
   <span>VChannel, PChannel 및 스트리밍 노드</span>
  
 </span></p>
<p>데이터 검증 후, 프록시는 지정된 샤드 라우팅 규칙에 따라 기록된 메시지를 여러 샤드의 데이터 패키지로 분할합니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/channels_1.png" alt="Channels 1" class="doc-image" id="channels-1" /> 
   <span>채널 1</span>
  
 </span></p>
<p>그런 다음 하나의 샤드(<em>vchannel</em>)에 대한 기록된 데이터는 <em>pchannel의</em> 해당 스트리밍 노드로 전송됩니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/written_data_flow.png" alt="write flow" class="doc-image" id="write-flow" /> 
   <span>쓰기 흐름</span>
  
 </span></p>
<p>스트리밍 노드는 각 데이터 패킷에 타임스탬프 오라클(TSO)을 할당하여 작업의 전체 순서를 정립합니다. 또한 페이로드에 대한 일관성 검사를 수행한 후, 이를 기본 쓰기 선행 로그(WAL)에 기록합니다. 데이터가 WAL에 영구적으로 커밋되면 데이터가 손실되지 않는 것이 보장됩니다. 심지어 크래시가 발생하더라도 스트리밍 노드는 WAL을 재실행하여 모든 보류 중인 작업을 완전히 복구할 수 있습니다.</p>
<p>한편, 스트리밍 노드는 커밋된 WAL 항목을 비동기적으로 개별 세그먼트로 분할합니다. 세그먼트에는 두 가지 유형이 있습니다.</p>
<ul>
<li><strong>증가형 세그먼트(Growing segment</strong>): 오브젝트 스토리지에 아직 영구 저장되지 않은 모든 데이터.</li>
<li><strong>봉인된 세그먼트</strong>: 모든 데이터가 오브젝트 스토리지에 영구 저장된 것으로, 봉인된 세그먼트의 데이터는 변경 불가능합니다.</li>
</ul>
<p>성장 중인 세그먼트가 봉인된 세그먼트로 전환되는 과정을 플러시(flush)라고 합니다. 스트리밍 노드는 해당 세그먼트에 대한 사용 가능한 모든 WAL 항목을 수집하고 기록한 즉시, 즉 기본 쓰기 선행 로그(WAL)에 더 이상 보류 중인 레코드가 없을 때 플러시를 트리거하며, 이 시점에서 세그먼트는 최종 확정되어 읽기 최적화 상태가 됩니다.</p>
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
    </button></h2><p>인덱스 생성은 데이터 노드에서 수행됩니다. 데이터 업데이트로 인한 빈번한 인덱스 생성을 방지하기 위해, Milvus의 컬렉션은 세그먼트로 더 세분화되며, 각 세그먼트는 고유한 인덱스를 갖습니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/index_building.png" alt="Index building" class="doc-image" id="index-building" /> 
   <span>인덱스 생성</span>
  
 </span></p>
<p>Milvus는 각 벡터 필드, 스칼라 필드 및 기본 필드에 대한 인덱스 생성을 지원합니다. 인덱스 구축의 입력과 출력 모두 오브젝트 스토리지와 연동됩니다. 데이터 노드는 인덱싱할 로그 스냅샷을 (오브젝트 스토리지에 있는) 세그먼트에서 메모리로 불러오고, 해당 데이터와 메타데이터를 역직렬화하여 인덱스를 구축한 뒤, 인덱스 구축이 완료되면 인덱스를 직렬화하여 오브젝트 스토리지에 다시 기록합니다.</p>
<p>인덱스 생성은 주로 벡터 및 행렬 연산을 포함하므로 계산 및 메모리 집약적입니다. 벡터는 고차원적 특성으로 인해 기존의 트리 기반 인덱스로는 효율적으로 인덱싱할 수 없지만, 클러스터 기반 또는 그래프 기반 인덱스와 같이 이 분야에서 더 성숙한 기술을 사용하여 인덱싱할 수 있습니다. 유형에 관계없이, 인덱스 구축에는 K-means나 그래프 탐색과 같은 대규모 벡터에 대한 방대한 반복 계산이 수반됩니다.</p>
<p>스칼라 데이터 인덱싱과 달리, 벡터 인덱스 구축은 SIMD(단일 명령어, 다중 데이터) 가속화를 최대한 활용해야 합니다. Milvus는 SSE, AVX2, AVX512와 같은 SIMD 명령어 세트를 기본적으로 지원합니다. 벡터 인덱스 구축의 “지연”과 자원 집약적인 특성을 고려할 때, 경제적인 측면에서 탄력성은 Milvus에 있어 매우 중요합니다. 향후 Milvus 릴리스에서는 관련 비용을 절감하기 위해 이기종 컴퓨팅 및 서버리스 컴퓨팅에 대한 연구를 더욱 심화할 예정입니다.</p>
<p>또한 Milvus는 스칼라 필터링 및 기본 필드 쿼리도 지원합니다. 쿼리 효율성을 높이기 위해 블룸 필터 인덱스, 해시 인덱스, 트리 기반 인덱스, 역인덱스 등의 내장 인덱스를 갖추고 있으며, 비트맵 인덱스 및 러프 인덱스와 같은 외부 인덱스를 추가로 도입할 계획입니다.</p>
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
    </button></h2><p>데이터 쿼리란 지정된 컬렉션에서 대상 벡터에 가장 가까운 <em>k개의</em> 벡터나, 해당 벡터로부터 지정된 거리 범위 내에 있는 <em>모든</em> 벡터를 검색하는 과정을 의미합니다. 벡터는 해당 주키 및 필드와 함께 반환됩니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/data_query.jpg" alt="Data query" class="doc-image" id="data-query" /> 
   <span>데이터 쿼리</span>
  
 </span></p>
<p>Milvus의 컬렉션은 여러 세그먼트로 분할됩니다. 스트리밍 노드는 성장 중인 세그먼트를 로드하여 실시간 데이터를 유지하는 반면, 쿼리 노드는 봉인된 세그먼트를 로드합니다.</p>
<p>쿼리/검색 요청이 도착하면 프록시는 관련 샤드를 담당하는 모든 스트리밍 노드에 요청을 브로드캐스트하여 동시 검색을 수행합니다.</p>
<p>쿼리 요청이 도착하면 프록시는 해당 샤드를 보유한 스트리밍 노드에 검색을 실행하도록 동시 요청을 보냅니다.</p>
<p>각 스트리밍 노드는 쿼리 계획을 생성하고, 로컬의 증가 중인 데이터를 검색하며, 동시에 원격 쿼리 노드에 연락하여 과거 결과를 가져온 다음, 이를 단일 샤드 결과로 집계합니다.</p>
<p>마지막으로, 프록시는 모든 샤드 결과를 수집하여 최종 결과로 병합한 후 클라이언트에 반환합니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/handoff.png" alt="Handoff" class="doc-image" id="handoff" /> 
   <span>핸드오프</span>
  
 </span></p>
<p>스트리밍 노드의 성장 중인 세그먼트가 봉인된 세그먼트로 플러시되거나, 데이터 노드가 압축을 완료하면 코디네이터는 해당 성장 중인 데이터를 과거 데이터로 변환하기 위한 핸드오프 작업을 시작합니다. 그런 다음 코디네이터는 메모리 사용량, CPU 오버헤드 및 세그먼트 수를 균형 있게 조정하여 봉인된 세그먼트를 모든 쿼리 노드에 고르게 분배하고, 중복된 세그먼트를 해제합니다.</p>
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
<li><a href="https://milvus.io/blog/deep-dive-4-data-insertion-and-data-persistence.md">Milvus의 데이터 삽입 및 데이터 영구 저장에</a> 대해 알아보세요.</li>
<li><a href="https://milvus.io/blog/deep-dive-3-data-processing.md">Milvus에서 데이터가</a> 어떻게 <a href="https://milvus.io/blog/deep-dive-3-data-processing.md">처리되는지</a> 알아보세요.</li>
</ul>
