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
<h2 id="Worker-nodes" class="common-anchor-header">워커 노드<button data-href="#Worker-nodes" class="anchor-icon" translate="no">
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
    </button></h2><p>작업자 노드는 코디네이터 서비스의 지시를 따르고 프록시에서 DML(데이터 조작 언어) 명령을 실행하는 "덤" 실행기입니다. 워커 노드는 스토리지와 컴퓨팅이 분리되어 상태 저장소가 없으며, 쿠버네티스에 배포하면 시스템 스케일아웃과 재해 복구를 용이하게 할 수 있습니다. 워커 노드에는 세 가지 유형이 있습니다:</p>
<h3 id="Query-node" class="common-anchor-header">쿼리 노드</h3><p>쿼리 노드는 로그 브로커에 가입하여 증분 로그 데이터를 검색하여 증가하는 세그먼트로 변환하고, 객체 스토리지에서 기록 데이터를 로드하고, 벡터 데이터와 스칼라 데이터 간의 하이브리드 검색을 실행합니다.</p>
<h3 id="Data-node" class="common-anchor-header">데이터 노드</h3><p>데이터 노드는 로그 브로커에 가입하여 증분 로그 데이터를 검색하고, 변경 요청을 처리하며, 로그 데이터를 로그 스냅샷으로 패킹하여 객체 스토리지에 저장합니다.</p>
<h3 id="Index-node" class="common-anchor-header">인덱스 노드</h3><p>인덱스 노드는 인덱스를 구축합니다. 메모리에 상주할 필요는 없으며 서버리스 프레임워크로 구현할 수 있습니다.</p>
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
<h3 id="Meta-storage" class="common-anchor-header">메타 스토리지</h3><p>메타 스토리지는 수집 스키마, 메시지 소비 체크포인트와 같은 메타데이터의 스냅샷을 저장합니다. 메타데이터를 저장하려면 매우 높은 가용성, 강력한 일관성, 트랜잭션 지원이 필요하기 때문에 Milvus는 이를 위해 etcd를 선택했습니다. Milvus는 서비스 등록 및 상태 확인에도 etcd를 사용합니다.</p>
<h3 id="Object-storage" class="common-anchor-header">오브젝트 스토리지</h3><p>객체 저장소는 로그의 스냅샷 파일, 스칼라 및 벡터 데이터의 인덱스 파일, 중간 쿼리 결과를 저장합니다. Milvus는 MinIO를 객체 스토리지로 사용하며, 세계에서 가장 인기 있고 비용 효율적인 두 가지 스토리지 서비스인 AWS S3와 Azure Blob에 쉽게 배포할 수 있습니다. 하지만 오브젝트 스토리지는 액세스 지연 시간이 길고 쿼리 수에 따라 요금이 부과됩니다. 성능을 개선하고 비용을 낮추기 위해 Milvus는 메모리 또는 SSD 기반 캐시 풀에 콜드-핫 데이터 분리를 구현할 계획입니다.</p>
<h3 id="Log-broker" class="common-anchor-header">로그 브로커</h3><p>로그 브로커는 재생을 지원하는 퍼브-서브 시스템입니다. 스트리밍 데이터 지속성 및 이벤트 알림을 담당합니다. 또한 워커 노드가 시스템 장애로부터 복구될 때 증분 데이터의 무결성을 보장합니다. Milvus Distributed는 Pulsar를 로그 브로커로 사용하며, Milvus Standalone은 RocksDB를 사용합니다. 로그 브로커는 Kafka와 같은 스트리밍 데이터 저장 플랫폼으로 쉽게 대체할 수 있습니다.</p>
<p>Milvus는 "데이터로서의 로그" 원칙을 따르기 때문에 물리적 테이블을 유지하지 않고 로깅 지속성 및 스냅샷 로그를 통해 데이터 안정성을 보장합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/log_mechanism.png" alt="Log_mechanism" class="doc-image" id="log_mechanism" />
   </span> <span class="img-wrapper"> <span>Log_mechanism</span> </span></p>
<p>로그 브로커는 Milvus의 백본입니다. 고유한 게시-서브 메커니즘을 통해 데이터 지속성과 읽기-쓰기 분리를 담당합니다. 위의 그림은 시스템이 로그 브로커(로그 시퀀스 유지)와 로그 구독자의 두 가지 역할로 나뉘는 메커니즘을 단순화한 그림입니다. 전자는 수집 상태를 변경하는 모든 작업을 기록하고, 후자는 로그 시퀀스에 가입하여 로컬 데이터를 업데이트하고 읽기 전용 사본 형태로 서비스를 제공합니다. 게시-구독 메커니즘은 또한 변경 데이터 캡처(CDC) 및 전 세계에 분산된 배포 측면에서 시스템 확장성을 위한 공간을 제공합니다.</p>
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
<li>Milvus 아키텍처에 대한 자세한 내용은 <a href="/docs/ko/v2.4.x/main_components.md">주요 구성 요소를</a> 참조하세요.</li>
</ul>
