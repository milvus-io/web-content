---
id: four_layers.md
summary: Milvus의 스토리지/컴퓨팅 세분화 구조.
title: 스토리지/컴퓨팅 분리
---
<h1 id="StorageComputing-Disaggregation" class="common-anchor-header">스토리지/컴퓨팅 분리<button data-href="#StorageComputing-Disaggregation" class="anchor-icon" translate="no">
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
    </button></h1><p>데이터 플레인과 제어 플레인 분리 원칙에 따라 Milvus는 확장성 및 재해 복구 측면에서 상호 독립적인 4개의 레이어로 구성됩니다.</p>
<h2 id="Access-layer" class="common-anchor-header">액세스 레이어<button data-href="#Access-layer" class="anchor-icon" translate="no">
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
    </button></h2><p>상태 비저장 프록시 그룹으로 구성된 액세스 레이어는 시스템의 최전방 레이어이자 사용자에 대한 엔드포인트입니다. 클라이언트 요청의 유효성을 검사하고 반환된 결과를 축소합니다:</p>
<ul>
<li>프록시는 그 자체로 상태 비저장 상태입니다. 프록시는 그 자체로 상태 비저장형이며 Nginx, Kubernetes 인그레스, NodePort, LVS와 같은 부하 분산 구성 요소를 사용하여 통합된 서비스 주소를 제공합니다.</li>
<li>Milvus는 대규모 병렬 처리(MPP) 아키텍처를 사용하므로 프록시는 최종 결과를 클라이언트에 반환하기 전에 중간 결과를 집계하고 후처리합니다.</li>
</ul>
<h2 id="Coordinator-service" class="common-anchor-header">코디네이터 서비스<button data-href="#Coordinator-service" class="anchor-icon" translate="no">
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
    </button></h2><p>코디네이터 서비스는 작업자 노드에 작업을 할당하고 시스템의 두뇌 역할을 합니다. 클러스터 토폴로지 관리, 로드 밸런싱, 타임스탬프 생성, 데이터 선언, 데이터 관리 등의 작업을 수행합니다.</p>
<p>코디네이터 유형에는 루트 코디네이터(루트 코디), 데이터 코디네이터(데이터 코디), 쿼리 코디네이터(쿼리 코디)의 세 가지가 있습니다.</p>
<h3 id="Root-coordinator-root-coord" class="common-anchor-header">루트 코디네이터(루트 코디네이터)</h3><p>루트 코디네이터는 컬렉션, 파티션 또는 인덱스의 생성 또는 삭제와 같은 DDL(데이터 정의 언어) 및 DCL(데이터 제어 언어) 요청을 처리하고 TSO(타임스탬프 오라클) 및 시간 티커 발행을 관리합니다.</p>
<h3 id="Query-coordinator-query-coord" class="common-anchor-header">쿼리 코디네이터(쿼리 코디)</h3><p>쿼리 코디네이터는 쿼리 노드의 토폴로지 및 로드 밸런싱을 관리하고, 성장하는 세그먼트에서 봉인된 세그먼트로의 핸드오프를 관리합니다.</p>
<h3 id="Data-coordinator-data-coord" class="common-anchor-header">데이터 코디네이터(데이터 코디)</h3><p>데이터 코디네이터는 데이터 노드와 인덱스 노드의 토폴로지를 관리하고 메타데이터를 유지 관리하며 플러시, 압축, 인덱스 구축 및 기타 백그라운드 데이터 작업을 트리거합니다.</p>
<h2 id="Worker-nodes" class="common-anchor-header">작업자 노드<button data-href="#Worker-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>팔과 다리입니다. 작업자 노드는 코디네이터 서비스의 지시를 따르고 프록시에서 DML(데이터 조작 언어) 명령을 실행하는 덤 실행기입니다. 워커 노드는 스토리지와 컴퓨팅이 분리되어 상태 저장소가 없으며, Kubernetes에 배포될 때 시스템 스케일아웃과 재해 복구를 용이하게 할 수 있습니다. 워커 노드에는 세 가지 유형이 있습니다:</p>
<h3 id="Query-node" class="common-anchor-header">쿼리 노드</h3><p>쿼리 노드는 로그 브로커에 가입하여 증분 로그 데이터를 검색하여 증가하는 세그먼트로 전환하고, 객체 스토리지에서 기록 데이터를 로드하고, 벡터 데이터와 스칼라 데이터 간의 하이브리드 검색을 실행합니다.</p>
<h3 id="Data-node" class="common-anchor-header">데이터 노드</h3><p>데이터 노드는 로그 브로커에 가입하여 증분 로그 데이터를 검색하고, 변경 요청을 처리하며, 로그 데이터를 로그 스냅샷으로 패킹하여 오브젝트 스토리지에 저장합니다.</p>
<h3 id="Index-node" class="common-anchor-header">인덱스 노드</h3><p>인덱스 노드는 인덱스를 구축합니다.  인덱스 노드는 메모리에 상주할 필요가 없으며 서버리스 프레임워크로 구현할 수 있습니다.</p>
<h2 id="Storage" class="common-anchor-header">스토리지<button data-href="#Storage" class="anchor-icon" translate="no">
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
    </button></h2><p>스토리지는 데이터 지속성을 담당하는 시스템의 뼈대입니다. 메타 스토리지, 로그 브로커, 객체 스토리지로 구성됩니다.</p>
<h3 id="Meta-storage" class="common-anchor-header">메타 스토리지</h3><p>메타 스토리지는 수집 스키마, 메시지 소비 체크포인트와 같은 메타데이터의 스냅샷을 저장합니다. 메타데이터를 저장하려면 매우 높은 가용성, 강력한 일관성, 트랜잭션 지원이 필요하기 때문에 Milvus는 메타 저장소로 etcd를 선택했습니다. Milvus는 서비스 등록 및 상태 확인에도 etcd를 사용합니다.</p>
<h3 id="Object-storage" class="common-anchor-header">오브젝트 스토리지</h3><p>객체 저장소는 로그의 스냅샷 파일, 스칼라 및 벡터 데이터의 인덱스 파일, 중간 쿼리 결과를 저장합니다. Milvus는 MinIO를 객체 스토리지로 사용하며, 세계에서 가장 인기 있고 비용 효율적인 두 가지 스토리지 서비스인 AWS S3와 Azure Blob에 쉽게 배포할 수 있습니다. 하지만 오브젝트 스토리지는 액세스 지연 시간이 길고 쿼리 수에 따라 요금이 부과됩니다. 성능을 개선하고 비용을 낮추기 위해 Milvus는 메모리 또는 SSD 기반 캐시 풀에 콜드-핫 데이터 분리를 구현할 계획입니다.</p>
<h3 id="WAL-storage" class="common-anchor-header">WAL 스토리지</h3><p>미리 쓰기 로그(WAL) 스토리지는 분산 시스템에서 데이터 내구성과 일관성의 기반입니다. 변경 사항이 커밋되기 전에 먼저 로그에 기록되므로 장애가 발생할 경우 중단된 지점에서 정확히 복구할 수 있습니다.</p>
<p>일반적인 WAL 구현에는 Kafka, Pulsar, Woodpecker가 있습니다. 기존의 디스크 기반 솔루션과 달리, Woodpecker는 오브젝트 스토리지에 직접 쓰는 클라우드 네이티브 제로 디스크 설계를 채택하고 있습니다. 이 방식은 필요에 따라 손쉽게 확장할 수 있고 로컬 디스크 관리의 오버헤드를 제거하여 운영을 간소화합니다.</p>
<p>WAL 계층은 모든 쓰기 작업을 미리 기록함으로써 분산 환경이 아무리 복잡해지더라도 복구와 일관성을 위한 안정적인 시스템 전반의 메커니즘을 보장합니다.</p>
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
<li>Milvus 아키텍처에 대한 자세한 내용은 <a href="/docs/ko/main_components.md">주요 구성 요소를</a> 읽어보세요.</li>
</ul>
