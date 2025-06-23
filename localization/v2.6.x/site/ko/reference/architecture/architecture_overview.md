---
id: architecture_overview.md
summary: Milvus는 유사도 검색과 인공 지능을 위해 특별히 구축된 빠르고 안정적이며 안정적인 벡터 데이터베이스를 제공합니다.
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
    </button></h1><p>Milvus는 대규모 벡터 데이터 세트에 대한 고성능 유사도 검색을 위해 설계된 <strong>오픈 소스</strong> <strong>클라우드 네이티브</strong> 벡터 데이터베이스입니다. Faiss, HNSW, DiskANN, SCANN 등 널리 사용되는 벡터 검색 라이브러리를 기반으로 구축되어 AI 애플리케이션과 비정형 데이터 검색 시나리오를 강화합니다. 계속 진행하기 전에 임베딩 검색의 <a href="/docs/ko/v2.6.x/glossary.md">기본 원칙을</a> 숙지하세요.</p>
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
    </button></h2><p>다음 다이어그램은 Milvus의 높은 수준의 아키텍처를 보여주며, 완전히 분리된 스토리지 및 컴퓨팅 계층을 갖춘 모듈식, 확장형, 클라우드 네이티브 설계를 보여줍니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus_architecture_2_6.png" alt="Architecture_diagram" class="doc-image" id="architecture_diagram" />
   </span> <span class="img-wrapper"> <span>아키텍처_도표</span> </span></p>
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
    </button></h2><p>Milvus는 데이터 플레인과 제어 플레인 분리 원칙을 따르며, 확장성과 재해 복구 측면에서 상호 독립적인 4개의 주요 계층으로 구성되어 있습니다. 완전히 분리된 스토리지 및 컴퓨팅 계층을 갖춘 이 공유 스토리지 아키텍처는 컴퓨팅 노드의 수평적 확장을 가능하게 하는 동시에, 탄력성을 높이고 운영 오버헤드를 줄이기 위해 우드페커를 제로 디스크 WAL 계층으로 구현합니다.</p>
<p>스트림 처리를 스트리밍 노드로, 배치 처리를 쿼리 노드와 데이터 노드로 분리함으로써 Milvus는 실시간 처리 요구 사항을 동시에 충족하는 동시에 고성능을 달성합니다.</p>
<h2 id="Detailed-Layer-Architecture" class="common-anchor-header">세부 레이어 아키텍처<button data-href="#Detailed-Layer-Architecture" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Layer-1-Access-Layer" class="common-anchor-header">레이어 1: 액세스 레이어</h3><p>상태 비저장 프록시 그룹으로 구성된 액세스 레이어는 시스템의 최전방 레이어이자 사용자에 대한 엔드포인트입니다. 클라이언트 요청의 유효성을 검사하고 반환된 결과를 축소합니다:</p>
<ul>
<li>프록시는 그 자체로 상태 비저장 상태입니다. 프록시는 그 자체로 상태 비저장형이며 Nginx, Kubernetes 인그레스, NodePort, LVS와 같은 부하 분산 구성 요소를 사용하여 통합된 서비스 주소를 제공합니다.</li>
<li>Milvus는 대규모 병렬 처리(MPP) 아키텍처를 사용하므로 프록시는 최종 결과를 클라이언트에 반환하기 전에 중간 결과를 집계하고 후처리합니다.</li>
</ul>
<h3 id="Layer-2-Coordinator" class="common-anchor-header">레이어 2: 코디네이터</h3><p>코디네이터는 Milvus의 두뇌 역할을 합니다. 클러스터 토폴로지를 유지하고, 모든 작업 유형을 스케줄링하며, 클러스터 수준의 일관성을 유지하는 역할을 담당하는 코디네이터는 항상 전체 클러스터에서 정확히 한 명만 활성화되어 있습니다.</p>
<p>다음은 <strong>코디네이터가</strong> 처리하는 작업 중 일부입니다:</p>
<ul>
<li><strong>DDL/DCL/TSO 관리</strong>: 컬렉션, 파티션 또는 인덱스의 생성 또는 삭제와 같은 DDL(데이터 정의 언어) 및 DCL(데이터 제어 언어) 요청을 처리하고 TSO(타임스탬프 오라클) 및 시간 티커 발행을 관리합니다.</li>
<li><strong>스트리밍 서비스 관리</strong>: WAL(Write-Ahead Log)을 스트리밍 노드와 바인딩하고 스트리밍 서비스에 대한 서비스 검색을 제공합니다.</li>
<li><strong>쿼리 관리</strong>: 쿼리 노드의 토폴로지 및 로드 밸런싱을 관리하고, 쿼리 라우팅을 안내하기 위해 서빙 쿼리 뷰를 제공하고 관리합니다.</li>
<li><strong>기록 데이터 관리</strong>: 압축, 인덱스 구축과 같은 오프라인 작업을 데이터 노드에 분산하고 세그먼트와 데이터 뷰의 토폴로지를 관리합니다.</li>
</ul>
<h3 id="Layer-3-Worker-Nodes" class="common-anchor-header">레이어 3: 작업자 노드</h3><p>팔과 다리 역할을 합니다. 워커 노드는 코디네이터의 지시를 따르는 덤 실행자입니다. 워커 노드는 스토리지와 컴퓨팅이 분리되어 상태 저장소가 없으며, Kubernetes에 배포될 때 시스템 스케일아웃과 재해 복구를 용이하게 할 수 있습니다. 워커 노드에는 세 가지 유형이 있습니다:</p>
<h3 id="Streaming-node" class="common-anchor-header">스트리밍 노드</h3><p>스트리밍 노드는 샤드 수준의 "미니 브레인" 역할을 하며, 기본 WAL 스토리지를 기반으로 샤드 수준의 일관성 보장 및 장애 복구를 제공합니다. 한편, 스트리밍 노드는 데이터 쿼리 증가와 쿼리 계획 생성도 담당합니다. 또한, 증가하는 데이터를 봉인된(과거) 데이터로 변환하는 작업도 처리합니다.</p>
<h3 id="Query-node" class="common-anchor-header">쿼리 노드</h3><p>쿼리 노드는 오브젝트 스토리지에서 히스토리 데이터를 로드하고 히스토리 데이터 쿼리를 제공합니다.</p>
<h3 id="Data-node" class="common-anchor-header">데이터 노드</h3><p>데이터 노드는 압축, 인덱스 구축 등 히스토리 데이터의 오프라인 처리를 담당합니다.</p>
<h3 id="Layer-4-Storage" class="common-anchor-header">레이어 4: 스토리지</h3><p>스토리지는 데이터 지속성을 담당하는 시스템의 뼈대입니다. 메타 스토리지, 로그 브로커, 객체 스토리지로 구성됩니다.</p>
<h3 id="Meta-storage" class="common-anchor-header">메타 스토리지</h3><p>메타 스토리지는 수집 스키마, 메시지 소비 체크포인트와 같은 메타데이터의 스냅샷을 저장합니다. 메타데이터를 저장하려면 매우 높은 가용성, 강력한 일관성, 트랜잭션 지원이 필요하기 때문에 Milvus는 메타 저장소로 etcd를 선택했습니다. Milvus는 서비스 등록 및 상태 확인에도 etcd를 사용합니다.</p>
<h3 id="Object-storage" class="common-anchor-header">오브젝트 스토리지</h3><p>객체 저장소는 로그의 스냅샷 파일, 스칼라 및 벡터 데이터의 인덱스 파일, 중간 쿼리 결과를 저장합니다. Milvus는 MinIO를 객체 스토리지로 사용하며, 세계에서 가장 인기 있고 비용 효율적인 두 가지 스토리지 서비스인 AWS S3와 Azure Blob에 쉽게 배포할 수 있습니다. 하지만 오브젝트 스토리지는 액세스 지연 시간이 길고 쿼리 수에 따라 요금이 부과됩니다. 성능을 개선하고 비용을 낮추기 위해 Milvus는 메모리 또는 SSD 기반 캐시 풀에 콜드-핫 데이터 분리를 구현할 계획입니다.</p>
<h3 id="WAL-storage" class="common-anchor-header">WAL 스토리지</h3><p>WAL(Write-Ahead Log) 스토리지는 분산 시스템에서 데이터 내구성과 일관성의 기반입니다. 변경 사항이 커밋되기 전에 먼저 로그에 기록되므로 장애가 발생할 경우 중단된 지점에서 정확히 복구할 수 있습니다.</p>
<p>일반적인 WAL 구현에는 Kafka, Pulsar, Woodpecker 등이 있습니다. 기존의 디스크 기반 솔루션과 달리, Woodpecker는 오브젝트 스토리지에 직접 쓰는 클라우드 네이티브 제로 디스크 설계를 채택하고 있습니다. 이 방식은 필요에 따라 손쉽게 확장할 수 있고 로컬 디스크 관리의 오버헤드를 제거하여 운영을 간소화합니다.</p>
<p>WAL 계층은 모든 쓰기 작업을 미리 기록함으로써 분산 환경이 아무리 복잡해지더라도 복구와 일관성을 위한 안정적인 시스템 전반의 메커니즘을 보장합니다.</p>
<h2 id="Data-Flow-and-API-Categories" class="common-anchor-header">데이터 흐름 및 API 카테고리<button data-href="#Data-Flow-and-API-Categories" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus API는 기능에 따라 분류되며 아키텍처를 통해 특정 경로를 따릅니다:</p>
<table>
<thead>
<tr><th>API 카테고리</th><th>운영</th><th>API 예시</th><th>아키텍처 흐름</th></tr>
</thead>
<tbody>
<tr><td><strong>DDL/DCL</strong></td><td>스키마 및 접근 제어</td><td><code translate="no">createCollection</code>, <code translate="no">dropCollection</code>, <code translate="no">hasCollection</code>, <code translate="no">createPartition</code></td><td>액세스 레이어 → 코디네이터</td></tr>
<tr><td><strong>DML</strong></td><td>데이터 조작</td><td><code translate="no">insert</code>, <code translate="no">delete</code>, <code translate="no">upsert</code></td><td>액세스 레이어 → 스트리밍 워커 노드</td></tr>
<tr><td><strong>DQL</strong></td><td>데이터 쿼리</td><td><code translate="no">search</code>, <code translate="no">query</code></td><td>액세스 레이어 → 배치 워커 노드(쿼리 노드)</td></tr>
</tbody>
</table>
<h3 id="Example-Data-Flow-Search-Operation" class="common-anchor-header">데이터 흐름 예시: 검색 작업</h3><ol>
<li>클라이언트가 SDK/RESTful API를 통해 검색 요청을 전송합니다.</li>
<li>로드밸런서는 액세스 레이어에서 사용 가능한 프록시로 요청을 라우팅합니다.</li>
<li>프록시는 라우팅 캐시를 사용하여 대상 노드를 결정하고, 캐시를 사용할 수 없는 경우에만 코디네이터에게 연락합니다.</li>
<li>프록시는 요청을 적절한 스트리밍 노드로 전달하고, 스트리밍 노드는 로컬에서 증가하는 데이터 검색을 실행하면서 봉인된 데이터 검색을 위해 쿼리 노드와 조율합니다.</li>
<li>쿼리 노드는 필요에 따라 오브젝트 스토리지에서 봉인된 세그먼트를 로드하고 세그먼트 수준 검색을 수행합니다.</li>
<li>검색 결과는 다단계 축소를 거칩니다: 쿼리 노드는 여러 세그먼트에서 결과를 축소하고, 스트리밍 노드는 쿼리 노드의 결과를 축소하며, 프록시는 모든 스트리밍 노드의 결과를 축소한 후 클라이언트로 반환합니다.</li>
</ol>
<h3 id="Example-Data-Flow-Data-Insertion" class="common-anchor-header">데이터 흐름 예시: 데이터 삽입</h3><ol>
<li>클라이언트가 벡터 데이터와 함께 삽입 요청을 전송합니다.</li>
<li>액세스 레이어는 요청의 유효성을 검사하고 스트리밍 노드로 전달합니다.</li>
<li>스트리밍 노드는 내구성을 위해 작업을 WAL 스토리지에 기록합니다.</li>
<li>데이터는 실시간으로 처리되어 쿼리에 사용 가능합니다.</li>
<li>세그먼트가 용량에 도달하면 스트리밍 노드가 봉인된 세그먼트로의 변환을 트리거합니다.</li>
<li>데이터 노드가 압축을 처리하고 봉인된 세그먼트 위에 인덱스를 구축하여 오브젝트 스토리지에 결과를 저장합니다.</li>
<li>쿼리 노드는 새로 구축된 인덱스를 로드하고 그에 따라 증가하는 데이터를 대체합니다.</li>
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
<li><a href="/docs/ko/v2.6.x/main_components.md">주요 구성 요소에서</a> 자세한 구현 세부 사항을 살펴보세요.</li>
<li><a href="/docs/ko/v2.6.x/data_processing.md">데이터 처리</a> 워크플로우 및 최적화 전략에 대해 알아보기</li>
<li>Milvus의 <a href="/docs/ko/v2.6.x/consistency.md">일관성 모델과</a> 트랜잭션 보장에 대한 이해</li>
</ul>
