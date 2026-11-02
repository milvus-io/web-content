---
id: architecture_overview.md
summary: 'Milvus는 유사도 검색 및 인공지능을 위해 특별히 구축된 빠르고, 신뢰할 수 있으며, 안정적인 벡터 데이터베이스를 제공합니다.'
title: Milvus 아키텍처 개요
---
<h1 id="Milvus-Architecture-Overview" class="common-anchor-header">Milvus 아키텍처 개요<button data-href="#Milvus-Architecture-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus는 방대한 벡터 데이터셋에 대한 고성능 유사도 검색을 위해 설계된 <strong>오픈소스</strong> <strong>클라우드 네이티브</strong> 벡터 데이터베이스입니다. Faiss, HNSW, DiskANN, SCANN 등 널리 사용되는 벡터 검색 라이브러리를 기반으로 구축되어, AI 애플리케이션과 비정형 데이터 검색 시나리오를 지원합니다. 계속 진행하기 전에 임베딩 검색의 <a href="/docs/ko/glossary.md">기본 원리를</a> 숙지하시기 바랍니다.</p>
<h2 id="Architecture-Diagram" class="common-anchor-header">아키텍처 다이어그램<button data-href="#Architecture-Diagram" class="anchor-icon" translate="no">
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
    </button></h2><p>다음 다이어그램은 Milvus의 고수준 아키텍처를 보여 주며, 완전히 분리된 스토리지 및 컴퓨팅 계층을 갖춘 모듈식, 확장 가능한 클라우드 네이티브 설계를 보여줍니다.</p>
<p><span class="img-wrapper">
  
   <img translate="no" src="https://milvus-docs.s3.us-west-2.amazonaws.com/assets/milvus_architecture_2_6.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" /> 
   <span>아키텍처_도식</span>
  
 </span></p>
<h2 id="Architectural-Principles" class="common-anchor-header">아키텍처 원칙<button data-href="#Architectural-Principles" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus는 데이터 플레인과 제어 플레인의 분리 원칙을 따르며, 확장성 및 재해 복구 측면에서 서로 독립적인 네 가지 주요 계층으로 구성됩니다. 스토리지 및 컴퓨팅 계층이 완전히 분리된 이 공유 스토리지 아키텍처는 컴퓨팅 노드의 수평적 확장을 가능하게 하며, Woodpecker를 제로 디스크 WAL 계층으로 구현하여 탄력성을 높이고 운영 오버헤드를 줄입니다.</p>
<p>스트림 처리를 스트리밍 노드로, 배치 처리를 쿼리 노드 및 데이터 노드로 분리함으로써 Milvus는 높은 성능을 달성하는 동시에 실시간 처리 요구 사항도 충족합니다.</p>
<h2 id="Detailed-Layer-Architecture" class="common-anchor-header">상세한 계층 아키텍처<button data-href="#Detailed-Layer-Architecture" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Layer-1-Access-Layer" class="common-anchor-header">계층 1: 액세스 계층<button data-href="#Layer-1-Access-Layer" class="anchor-icon" translate="no">
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
    </button></h3><p>무상태 프록시 그룹으로 구성된 액세스 계층은 시스템의 최전방 계층이자 사용자를 위한 엔드포인트입니다. 이 계층은 클라이언트 요청을 검증하고 반환되는 결과의 수를 줄입니다.</p>
<ul>
<li>프록시 자체는 상태 비저장형입니다. Nginx, Kubernetes Ingress, NodePort, LVS와 같은 부하 분산 구성 요소를 사용하여 통합된 서비스 주소를 제공합니다.</li>
<li>Milvus는 대규모 병렬 처리(MPP) 아키텍처를 채택하고 있으므로, 프록시는 최종 결과를 클라이언트에 반환하기 전에 중간 결과를 집계하고 후처리를 수행합니다.</li>
</ul>
<h3 id="Layer-2-Coordinator" class="common-anchor-header">레이어 2: 코디네이터<button data-href="#Layer-2-Coordinator" class="anchor-icon" translate="no">
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
    </button></h3><p>코디네이터는 Milvus의 두뇌 역할을 합니다. 클러스터 전체에서 언제든지 정확히 하나의 코디네이터만 활성화되어 있으며, 클러스터 토폴로지를 유지하고 모든 작업 유형을 스케줄링하며 클러스터 수준의 일관성을 보장하는 책임을 집니다.</p>
<p>다음은 <strong>코디네이터가</strong> 처리하는 작업 중 일부입니다:</p>
<ul>
<li><strong>DDL/DCL/TSO 관리</strong>: 컬렉션, 파티션 또는 인덱스의 생성이나 삭제와 같은 데이터 정의 언어(DDL) 및 데이터 제어 언어(DCL) 요청을 처리하고, 타임스탬프 오라클(TSO) 및 타임 티커 발급을 관리합니다.</li>
<li><strong>스트리밍 서비스 관리</strong>: WAL(Write-Ahead Log)을 스트리밍 노드와 연결하고, 스트리밍 서비스에 대한 서비스 검색 기능을 제공합니다.</li>
<li><strong>쿼리 관리</strong>: 쿼리 노드의 토폴로지와 부하 분산을 관리하며, 쿼리 라우팅을 안내하기 위해 쿼리 뷰를 제공하고 관리합니다.</li>
<li><strong>이력 데이터 관리</strong>: 압축 및 인덱스 생성과 같은 오프라인 작업을 데이터 노드에 분배하고, 세그먼트 및 데이터 뷰의 토폴로지를 관리합니다.</li>
</ul>
<h3 id="Layer-3-Worker-Nodes" class="common-anchor-header">레이어 3: 워커 노드<button data-href="#Layer-3-Worker-Nodes" class="anchor-icon" translate="no">
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
    </button></h3><p>실행의 주역입니다. 워커 노드는 코디네이터의 지시를 따르는 단순 실행체입니다. 스토리지와 연산이 분리되어 있어 워커 노드는 상태 비저장형이며, 쿠버네티스에 배포될 경우 시스템의 수평 확장 및 재해 복구를 용이하게 합니다. 워커 노드에는 세 가지 유형이 있습니다:</p>
<h3 id="Streaming-node" class="common-anchor-header">스트리밍 노드<button data-href="#Streaming-node" class="anchor-icon" translate="no">
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
    </button></h3><p>스트리밍 노드는 샤드 수준의 “미니 브레인” 역할을 하며, 기반이 되는 WAL 스토리지를 바탕으로 샤드 수준의 일관성을 보장하고 장애 복구를 수행합니다. 한편, 스트리밍 노드는 증가하는 데이터에 대한 쿼리 처리 및 쿼리 계획 생성을 담당합니다. 또한, 증가하는 데이터를 봉인된(역사적) 데이터로 변환하는 작업도 처리합니다.</p>
<h3 id="Query-node" class="common-anchor-header">쿼리 노드<button data-href="#Query-node" class="anchor-icon" translate="no">
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
    </button></h3><p>쿼리 노드는 오브젝트 스토리지에서 이력 데이터를 불러와 이력 데이터 쿼리 기능을 제공합니다.</p>
<h3 id="Data-node" class="common-anchor-header">데이터 노드<button data-href="#Data-node" class="anchor-icon" translate="no">
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
    </button></h3><p>데이터 노드는 압축 및 인덱스 구축과 같은 이력 데이터의 오프라인 처리를 담당합니다.</p>
<h3 id="Layer-4-Storage" class="common-anchor-header">레이어 4: 스토리지<button data-href="#Layer-4-Storage" class="anchor-icon" translate="no">
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
    </button></h3><p>스토리지는 시스템의 근간으로, 데이터 영구 저장을 담당합니다. 메타 스토리지, 로그 브로커, 오브젝트 스토리지로 구성됩니다.</p>
<h3 id="Meta-storage" class="common-anchor-header">메타 스토리지<button data-href="#Meta-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>메타 스토리지에는 컬렉션 스키마, 메시지 소비 체크포인트와 같은 메타데이터의 스냅샷이 저장됩니다. 메타데이터 저장은 매우 높은 가용성, 강력한 일관성, 트랜잭션 지원을 요구하므로, Milvus는 메타 스토리지로 etcd를 선택했습니다. 또한 Milvus는 서비스 등록 및 상태 점검에도 etcd를 사용합니다.</p>
<h3 id="Object-storage" class="common-anchor-header">오브젝트 스토리지<button data-href="#Object-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>오브젝트 스토리지는 데이터와 인덱스 파일을 영구 저장합니다. Milvus는 MinIO, AWS S3, Azure Blob Storage와 같은 오브젝트 스토리지 백엔드를 지원합니다. 쿼리 노드(QueryNodes)는 쿼리 처리에 필요한 데이터와 인덱스를 캐시합니다.</p>
<p>Milvus 2.6.4 이상 버전에서 제공되는 <a href="/docs/ko/tiered-storage-overview.md">계층형 스토리지</a>( <a href="/docs/ko/tiered-storage-overview.md">Tiered Storage</a>)를 사용하면, 쿼리 노드(QueryNodes)는 초기화 시 모든 데이터를 한꺼번에 불러오는 대신, 먼저 세그먼트 메타데이터를 로드하고 필요에 따라 필드 데이터나 인덱스를 가져올 수 있습니다. 원격 오브젝트 스토리지는 여전히 영구적인 소스 역할을 하며, 로컬 캐시 항목을 제거하더라도 저장된 데이터는 삭제되지 않습니다. 캐시에 저장되지 않은 데이터에 액세스하면 스토리지 I/O가 발생하고 쿼리 지연 시간이 늘어날 수 있습니다. 지연 시간에 민감한 필드나 인덱스의 경우 <a href="/docs/ko/warm-up.md">‘Warm Up’을</a> 사용하고, 로딩 전략을 선택하기 전에 콜드 쿼리 및 웜 캐시의 지연 시간을 모두 평가하십시오.</p>
<h3 id="WAL-storage" class="common-anchor-header">WAL 저장소<button data-href="#WAL-storage" class="anchor-icon" translate="no">
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
    </button></h3><p>WAL(Write-Ahead Log) 스토리지는 분산 시스템에서 데이터 내구성과 일관성을 보장하는 기반입니다. 변경 사항이 커밋되기 전에 먼저 로그에 기록되므로, 장애 발생 시 중단된 지점부터 정확하게 복구할 수 있습니다.</p>
<p>일반적인 WAL 구현체로는 Kafka, Pulsar, Woodpecker 등이 있습니다. 기존의 디스크 기반 솔루션과 달리, Woodpecker는 오브젝트 스토리지에 직접 기록하는 클라우드 네이티브 제로 디스크 설계를 채택하고 있습니다. 이 접근 방식은 사용자의 요구에 따라 손쉽게 확장할 수 있을 뿐만 아니라, 로컬 디스크 관리에 따른 오버헤드를 제거하여 운영을 간소화합니다.</p>
<p>모든 쓰기 작업을 사전에 기록함으로써, WAL 계층은 분산 환경이 아무리 복잡해지더라도 신뢰할 수 있는 시스템 전반의 복구 및 일관성 메커니즘을 보장합니다.</p>
<h2 id="Data-Flow-and-API-Categories" class="common-anchor-header">데이터 흐름 및 API 범주<button data-href="#Data-Flow-and-API-Categories" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus API는 기능에 따라 분류되며 아키텍처 내에서 특정 경로를 따릅니다:</p>
<table>
<thead>
<tr><th>API 범주</th><th>작업</th><th>예시 API</th><th>아키텍처 흐름</th></tr>
</thead>
<tbody>
<tr><td><strong>DDL/DCL</strong></td><td>스키마 및 액세스 제어</td><td><code translate="no">createCollection</code>, <code translate="no">dropCollection</code>, <code translate="no">hasCollection</code>, <code translate="no">createPartition</code></td><td>액세스 계층 → 코디네이터</td></tr>
<tr><td><strong>DML</strong></td><td>데이터 조작</td><td><code translate="no">insert</code>, <code translate="no">delete</code>, <code translate="no">upsert</code></td><td>액세스 계층 → 스트리밍 워커 노드</td></tr>
<tr><td><strong>DQL</strong></td><td>데이터 쿼리</td><td><code translate="no">search</code>, <code translate="no">query</code></td><td>액세스 계층 → 배치 워커 노드 (쿼리 노드)</td></tr>
</tbody>
</table>
<h3 id="Example-Data-Flow-Search-Operation" class="common-anchor-header">데이터 흐름 예시: 검색 작업<button data-href="#Example-Data-Flow-Search-Operation" class="anchor-icon" translate="no">
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
<li>클라이언트가 SDK/RESTful API를 통해 검색 요청을 전송합니다</li>
<li>로드 밸런서가 요청을 액세스 계층의 사용 가능한 프록시로 라우팅합니다</li>
<li>프록시는 라우팅 캐시를 사용하여 대상 노드를 결정하며, 캐시를 사용할 수 없는 경우에만 코디네이터에 연락합니다</li>
<li>프록시는 요청을 적절한 스트리밍 노드로 전달하며, 스트리밍 노드는 로컬에서 증가하는 데이터 검색을 실행하는 동시에 쿼리 노드와 협력하여 봉인된 데이터를 검색합니다</li>
<li>쿼리 노드는 필요에 따라 오브젝트 스토리지에서 봉인된 세그먼트를 불러와 세그먼트 수준 검색을 수행합니다</li>
<li>검색 결과는 다단계 축소 과정을 거칩니다. 쿼리 노드는 여러 세그먼트에 걸쳐 결과를 축소하고, 스트리밍 노드는 쿼리 노드에서 받은 결과를 축소하며, 프록시는 모든 스트리밍 노드에서 받은 결과를 축소하여 클라이언트에 반환합니다</li>
</ol>
<h3 id="Example-Data-Flow-Data-Insertion" class="common-anchor-header">데이터 흐름 예시: 데이터 삽입<button data-href="#Example-Data-Flow-Data-Insertion" class="anchor-icon" translate="no">
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
<li>클라이언트가 벡터 데이터가 포함된 삽입 요청을 전송합니다</li>
<li>액세스 계층은 요청을 검증한 후 스트리밍 노드로 전달합니다.</li>
<li>스트리밍 노드는 내구성을 위해 WAL 스토리지에 작업을 기록합니다</li>
<li>데이터는 실시간으로 처리되어 쿼리에 사용할 수 있게 됩니다</li>
<li>세그먼트의 용량이 가득 차면 스트리밍 노드가 씰링된 세그먼트로의 변환을 트리거합니다</li>
<li>데이터 노드는 압축을 처리하고 씰링된 세그먼트 위에 인덱스를 생성하며, 그 결과를 오브젝트 스토리지에 저장합니다</li>
<li>쿼리 노드는 새로 생성된 인덱스를 불러오고, 이에 상응하는 증가 중인 데이터를 대체합니다</li>
</ol>
<h2 id="Whats-Next" class="common-anchor-header">다음 단계<button data-href="#Whats-Next" class="anchor-icon" translate="no">
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
<li>자세한 구현 내용을 확인하려면 <a href="/docs/ko/main_components.md">주요 구성</a> 요소를 살펴보세요</li>
<li><a href="/docs/ko/data_processing.md">데이터 처리</a> 워크플로우 및 최적화 전략에 대해 알아보세요</li>
<li>Milvus의 <a href="/docs/ko/tune_consistency.md">일관성 모델과</a> 트랜잭션 보장을 이해해 보세요</li>
</ul>
