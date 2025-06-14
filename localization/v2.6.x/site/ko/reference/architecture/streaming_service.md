---
id: streaming_service.md
title: 스트리밍 서비스
summary: >-
  스트리밍 서비스는 다양한 스트리밍 관련 기능을 지원하기 위해 WAL(Write-Ahead Log)을 중심으로 구축된 Milvus 내부
  스트리밍 시스템 모듈의 개념입니다.
---
<h1 id="Streaming-Service" class="common-anchor-header">스트리밍 서비스<button data-href="#Streaming-Service" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>스트리밍 서비스는</strong> 다양한 스트리밍 관련 기능을 지원하기 위해 WAL(Write-Ahead Log)을 중심으로 구축된 Milvus 내부 스트리밍 시스템 모듈의 개념입니다. 여기에는 스트리밍 데이터 수집/구독, 클러스터 상태의 장애 복구, 스트리밍 데이터를 히스토리 데이터로 변환, 데이터 쿼리 증가 등이 포함됩니다. 구조적으로 스트리밍 서비스는 세 가지 주요 구성 요소로 이루어져 있습니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_distributed_arch.png" alt="Streaming Distributed Arc" class="doc-image" id="streaming-distributed-arc" />
   </span> <span class="img-wrapper"> <span>스트리밍 분산 아크</span> </span></p>
<ul>
<li><p><strong>스트리밍 코디네이터</strong>: 코디네이터 노드의 논리적 구성 요소입니다. 서비스 검색을 위해 Etcd를 사용하여 사용 가능한 스트리밍 노드를 찾고, 해당 스트리밍 노드에 WAL을 바인딩하는 역할을 담당합니다. 또한 서비스를 등록하여 WAL 배포 토폴로지를 노출함으로써 스트리밍 클라이언트가 주어진 WAL에 적합한 스트리밍 노드를 알 수 있도록 합니다.</p></li>
<li><p><strong>스트리밍 노드 클러스터</strong>: WAL 추가, 상태 복구, 데이터 쿼리 증가 등 모든 스트리밍 처리 작업을 담당하는 스트리밍 워커 노드의 클러스터입니다.</p></li>
<li><p><strong>스트리밍 클라이언트</strong>: 서비스 검색 및 준비 상태 확인과 같은 기본 기능을 캡슐화하는 내부적으로 개발된 Milvus 클라이언트입니다. 메시지 작성 및 구독과 같은 작업을 시작하는 데 사용됩니다.</p></li>
</ul>
<h2 id="Message" class="common-anchor-header">메시지<button data-href="#Message" class="anchor-icon" translate="no">
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
    </button></h2><p>스트리밍 서비스는 로그 기반 스트리밍 시스템이므로 Milvus의 모든 쓰기 작업(예: DML 및 DDL)은 <strong>메시지로</strong> 추상화됩니다.</p>
<ul>
<li><p>모든 메시지에는 스트리밍 서비스에서 <strong>TSO(타임스탬프 오라클)</strong> 필드가 할당되며, 이는 WAL에서 메시지의 순서를 나타냅니다. 메시지의 순서에 따라 Milvus에서 쓰기 작업의 순서가 결정됩니다. 따라서 로그에서 최신 클러스터 상태를 재구성할 수 있습니다.</p></li>
<li><p>각 메시지는 특정 <strong>V채널</strong> (가상 채널)에 속하며, 작업 일관성을 보장하기 위해 해당 채널 내에서 특정 불변 속성을 유지합니다. 예를 들어, 삽입 작업은 항상 같은 채널에서 드롭컬렉션 작업 전에 수행되어야 합니다.</p></li>
</ul>
<p>Milvus의 메시지 순서는 다음과 비슷할 수 있습니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/message_order.png" alt="Message Order" class="doc-image" id="message-order" />
   </span> <span class="img-wrapper"> <span>메시지 순서</span> </span></p>
<h2 id="WAL-Component" class="common-anchor-header">WAL 컴포넌트<button data-href="#WAL-Component" class="anchor-icon" translate="no">
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
    </button></h2><p>대규모 수평적 확장성을 지원하기 위해 Milvus의 WAL은 단일 로그 파일이 아니라 여러 로그의 복합체입니다. 각 로그는 여러 V채널에 대한 스트리밍 기능을 독립적으로 지원할 수 있습니다. 주어진 시간에 WAL 구성 요소는 <strong>정확히 하나의 스트리밍 노드에서만</strong> 작동하도록 허용되며, 이러한 제약은 기본 월 스토리지의 펜싱 메커니즘과 스트리밍 코디네이터에 의해 약속됩니다.</p>
<p>WAL 컴포넌트의 추가 기능은 다음과 같습니다:</p>
<ul>
<li><p><strong>세그먼트 수명 주기 관리</strong>: 메모리 조건/ 세그먼트 크기/ 세그먼트 유휴 시간 등의 정책에 따라 WAL은 모든 세그먼트의 수명 주기를 관리합니다.</p></li>
<li><p><strong>기본 트랜잭션 지원</strong>: 각 메시지에는 크기 제한이 있기 때문에, WAL 구성 요소는 단순한 트랜잭션 수준에서 VChannel 수준에서 원자 쓰기를 약속하는 것을 지원합니다.</p></li>
<li><p><strong>대용량 원격 로그 쓰기</strong>: Milvus는 타사 원격 메시지 큐를 WAL 스토리지로 지원합니다. 스트리밍 노드와 원격 WAL 스토리지 간의 왕복 지연 시간(RTT)을 완화하여 쓰기 처리량을 개선하기 위해 스트리밍 서비스는 동시 로그 쓰기를 지원합니다. TSO와 TSO 동기화를 통해 메시지 순서를 유지하며, WAL의 메시지는 TSO 순서대로 읽습니다.</p></li>
<li><p><strong>미리 쓰기 버퍼</strong>: WAL에 메시지가 쓰여진 후에는 Write-Ahead Buffer에 임시로 저장됩니다. 이를 통해 원격 WAL 스토리지에서 메시지를 가져오지 않고도 로그를 꼬리 읽기할 수 있습니다.</p></li>
<li><p><strong>다중 WAL 스토리지 지원</strong>: 우드페커, 펄서, 카프카. 제로 디스크 모드에서 딱따구리를 사용하면 원격 WAL 스토리지 종속성을 제거할 수 있습니다.</p></li>
</ul>
<h2 id="Recovery-Storage" class="common-anchor-header">복구 스토리지<button data-href="#Recovery-Storage" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>복구 스토리지</strong> 구성 요소는 항상 해당 WAL 구성 요소가 위치한 스트리밍 노드에서 실행됩니다.</p>
<ul>
<li><p>스트리밍 데이터를 영구 기록 데이터로 변환하여 오브젝트 스토리지에 저장하는 역할을 담당합니다.</p></li>
<li><p>또한 스트리밍 노드에서 WAL 컴포넌트의 인메모리 상태 복구도 처리합니다.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/recovery_storage.png" alt="Recovery Storage" class="doc-image" id="recovery-storage" />
   </span> <span class="img-wrapper"> <span>복구 스토리지</span> </span></p>
<h2 id="Query-Delegator" class="common-anchor-header">쿼리 위임자<button data-href="#Query-Delegator" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>쿼리</strong> 위임자는 각 스트리밍 노드에서 실행되며 단일 샤드에서 <strong>증분 쿼리를</strong> 실행하는 역할을 담당합니다. 쿼리 계획을 생성하여 관련 쿼리 노드에 전달하고 결과를 집계합니다.</p>
<p>또한 쿼리 위임자는 다른 쿼리 노드에 <strong>삭제 작업을</strong> 브로드캐스트하는 역할을 담당합니다.</p>
<p>쿼리 위임자는 항상 동일한 스트리밍 노드에서 WAL 컴포넌트와 공존합니다. 그러나 컬렉션이 멀티 복제본으로 구성된 경우에는 다른 스트리밍 노드에 <strong>N-1</strong> 델리게이터가 배포됩니다.</p>
<h2 id="WAL-Lifetime-and-Wait-for-Ready" class="common-anchor-header">WAL 수명 및 준비 대기<button data-href="#WAL-Lifetime-and-Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>컴퓨팅 노드와 스토리지를 분리함으로써 Milvus는 한 스트리밍 노드에서 다른 스트리밍 노드로 WAL을 쉽게 전송하여 스트리밍 서비스에서 고가용성을 달성할 수 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/wal_lifetime.png" alt="wal lifetime" class="doc-image" id="wal-lifetime" />
   </span> <span class="img-wrapper"> <span>WAL 수명</span> </span></p>
<h2 id="Wait-for-Ready" class="common-anchor-header">준비 대기<button data-href="#Wait-for-Ready" class="anchor-icon" translate="no">
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
    </button></h2><p>WAL이 새로운 스트리밍 노드로 이동할 때 클라이언트는 이전 스트리밍 노드가 일부 요청을 거부하는 것을 발견하게 됩니다. 한편, 새 스트리밍 노드에서 지갑이 복구되면 클라이언트는 새 스트리밍 노드에서 지갑이 서비스할 준비가 될 때까지 기다립니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/streaming_wait_for_ready.png" alt="wait for ready" class="doc-image" id="wait-for-ready" />
   </span> <span class="img-wrapper"> <span>준비 대기</span> </span></p>
