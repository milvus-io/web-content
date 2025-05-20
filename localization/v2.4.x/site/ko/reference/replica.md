---
id: replica.md
summary: Milvus의 인메모리 복제본에 대해 알아보세요.
title: 인메모리 복제본
---
<h1 id="In-Memory-Replica" class="common-anchor-header">인메모리 복제본<button data-href="#In-Memory-Replica" class="anchor-icon" translate="no">
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
    </button></h1><p>이 항목에서는 작업 메모리에서 여러 세그먼트 복제를 활성화하여 성능과 가용성을 향상시키는 Milvus의 인메모리 복제(복제) 메커니즘에 대해 소개합니다.</p>
<p>인메모리 복제본을 구성하는 방법에 대한 자세한 내용은 <a href="/docs/ko/v2.4.x/configure_querynode.md#queryNodereplicas">쿼리 노드 관련 구성을</a> 참조하세요.</p>
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/replica_availability.jpg" alt="Replica_Availiability" class="doc-image" id="replica_availiability" />
   </span> <span class="img-wrapper"> <span>Replica_Availability</span> </span></p>
<p>인메모리 복제본을 사용하면 Milvus는 여러 쿼리 노드에서 동일한 세그먼트를 로드할 수 있습니다. 한 쿼리 노드가 실패했거나 현재 검색 요청으로 사용 중일 때 다른 쿼리 노드가 도착하면 시스템은 동일한 세그먼트의 복제본이 있는 유휴 쿼리 노드로 새 요청을 보낼 수 있습니다.</p>
<h3 id="Performance" class="common-anchor-header">성능</h3><p>인메모리 복제본을 사용하면 추가 CPU 및 메모리 리소스를 활용할 수 있습니다. 데이터 세트가 비교적 작지만 추가 하드웨어 리소스로 읽기 처리량을 늘리고자 하는 경우에 매우 유용합니다. 전반적인 QPS(초당 쿼리 수)와 처리량이 크게 향상될 수 있습니다.</p>
<h3 id="Availability" class="common-anchor-header">가용성</h3><p>인메모리 복제본은 쿼리 노드가 충돌하는 경우 Milvus가 더 빠르게 복구하는 데 도움이 됩니다. 쿼리 노드에 장애가 발생해도 다른 쿼리 노드에서 세그먼트를 다시 로드할 필요가 없습니다. 대신 데이터를 다시 로드할 필요 없이 검색 요청을 즉시 새 쿼리 노드로 재전송할 수 있습니다. 여러 세그먼트 복제본이 동시에 유지되므로 장애가 발생했을 때 시스템의 복원력이 더욱 향상됩니다.</p>
<h2 id="Key-Concepts" class="common-anchor-header">주요 개념<button data-href="#Key-Concepts" class="anchor-icon" translate="no">
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
    </button></h2><p>인메모리 복제본은 복제본 그룹으로 구성됩니다. 각 복제본 그룹에는 <a href="https://milvus.io/docs/v2.1.x/glossary.md#Sharding">샤드</a> 복제본이 포함됩니다. 각 샤드 복제본에는 스트리밍 복제본과 샤드에서 성장 및 봉인된 <a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">세그먼트</a> (즉, DML 채널)에 해당하는 기록 복제본이 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/replica_group.png" alt="An illustration of how in-memory replica works" class="doc-image" id="an-illustration-of-how-in-memory-replica-works" />
   </span> <span class="img-wrapper"> <span>인메모리 복제본의 작동 방식에 대한 그림</span> </span></p>
<h3 id="Replica-group" class="common-anchor-header">복제본 그룹</h3><p>복제본 그룹은 기록 데이터 및 복제본 처리를 담당하는 여러 <a href="https://milvus.io/docs/v2.1.x/four_layers.md#Query-node">쿼리 노드로</a> 구성됩니다.</p>
<h3 id="Shard-replica" class="common-anchor-header">샤드 복제본</h3><p>샤드 복제본은 스트리밍 복제본과 기록 복제본으로 구성되며, 둘 다 동일한 <a href="https://milvus.io/blog/deep-dive-1-milvus-architecture-overview.md#Shard">샤드에</a> 속합니다. 복제본 그룹의 샤드 복제본 수는 지정된 컬렉션의 샤드 수에 따라 결정됩니다.</p>
<h3 id="Streaming-replica" class="common-anchor-header">스트리밍 복제본</h3><p>스트리밍 복제본은 동일한 DML 채널에서 <a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">성장하는</a> 모든 <a href="https://milvus.io/docs/v2.1.x/glossary.md#Segment">세그먼트를</a> 포함합니다. 기술적으로 스트리밍 복제본은 하나의 복제본에서 하나의 쿼리 노드만 제공해야 합니다.</p>
<h3 id="Historical-replica" class="common-anchor-header">기록 복제본</h3><p>기록 복제본에는 동일한 DML 채널의 모든 봉인된 세그먼트가 포함됩니다. 하나의 기록 복제본의 봉인된 세그먼트는 동일한 복제본 그룹 내의 여러 쿼리 노드에 분산될 수 있습니다.</p>
<h3 id="Shard-leader" class="common-anchor-header">샤드 리더</h3><p>샤드 리더는 샤드 복제본에서 스트리밍 복제본을 제공하는 쿼리 노드입니다.</p>
<h2 id="Design-Details" class="common-anchor-header">설계 세부 정보<button data-href="#Design-Details" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Balance" class="common-anchor-header">잔액</h3><p>로드해야 하는 새 세그먼트는 여러 개의 다른 쿼리 노드에 할당됩니다. 하나 이상의 복제본이 성공적으로 로드되면 검색 요청을 처리할 수 있습니다.</p>
<h3 id="Search" class="common-anchor-header">검색</h3><h4 id="Cache" class="common-anchor-header">캐시</h4><p>프록시는 세그먼트를 쿼리 노드에 매핑하는 캐시를 유지 관리하고 주기적으로 업데이트합니다. 프록시는 요청을 받으면 캐시에서 검색해야 하는 모든 봉인된 세그먼트를 가져와서 쿼리 노드에 균등하게 할당하려고 시도합니다.</p>
<p>세그먼트가 증가하는 경우 프록시는 채널-쿼리 노드 간 캐시도 유지하며 해당 쿼리 노드로 요청을 보냅니다.</p>
<h4 id="Failover" class="common-anchor-header">장애 조치</h4><p>프록시의 캐시가 항상 최신 상태인 것은 아닙니다. 요청이 들어올 때 일부 세그먼트나 채널이 다른 쿼리 노드로 이동했을 수 있습니다. 이 경우 프록시는 오류 응답을 수신하고 캐시를 업데이트한 후 다른 쿼리 노드에 할당하려고 시도합니다.</p>
<p>프록시가 캐시를 업데이트한 후에도 세그먼트를 찾을 수 없는 경우 세그먼트는 무시됩니다. 세그먼트가 압축된 경우 이런 일이 발생할 수 있습니다.</p>
<p>캐시가 정확하지 않으면 프록시가 일부 세그먼트를 놓칠 수 있습니다. DML 채널(세그먼트 증가)이 있는 쿼리 노드는 프록시가 캐시를 비교하고 업데이트할 수 있는 신뢰할 수 있는 세그먼트 목록과 함께 검색 응답을 반환합니다.</p>
<h3 id="Enhancement" class="common-anchor-header">개선 사항</h3><p>프록시는 쿼리 노드에 검색 요청을 완전히 균등하게 할당할 수 없으며, 쿼리 노드는 검색 요청을 처리하기 위해 서로 다른 리소스를 보유할 수 있습니다. 리소스의 롱테일 분포를 방지하기 위해 프록시는 다른 쿼리 노드의 활성 세그먼트를 해당 세그먼트가 있는 유휴 쿼리 노드에 할당합니다.</p>
