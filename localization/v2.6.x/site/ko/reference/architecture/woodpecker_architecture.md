---
id: woodpecker_architecture.md
title: 딱따구리
summary: >-
  딱따구리는 Milvus 2.6의 클라우드 네이티브 WAL 시스템입니다. 제로 디스크 아키텍처와 두 가지 배포 모드를 통해 높은 처리량, 낮은
  운영 오버헤드, 오브젝트 스토리지의 원활한 확장성을 제공합니다.
---
<h1 id="Woodpecker" class="common-anchor-header">딱따구리<button data-href="#Woodpecker" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 2.6에서, 우드페커는 Kafka와 Pulsar를 특수 목적의 클라우드 네이티브 WAL(Write-Ahead Log) 시스템으로 대체합니다. 개체 스토리지용으로 설계된 Woodpecker는 운영을 간소화하고, 처리량을 극대화하며, 손쉽게 확장할 수 있습니다.</p>
<p>우드페커의 설계 목표</p>
<ul>
<li><p>클라우드 환경에서 최고의 처리량</p></li>
<li><p>안정적인 복구를 위한 내구성 있는 추가 전용 로깅</p></li>
<li><p>로컬 디스크나 외부 브로커 없이 운영 오버헤드 최소화</p></li>
</ul>
<h2 id="Zero-disk-architecture" class="common-anchor-header">제로 디스크 아키텍처<button data-href="#Zero-disk-architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>우드페커의 핵심 혁신은 제로 디스크 아키텍처입니다:</p>
<ul>
<li>모든 로그 데이터는 클라우드 오브젝트 스토리지(예: Amazon S3, Google Cloud Storage, Alibaba OS)에 저장됩니다.</li>
<li><strong>etcd와</strong> 같은 분산 키-값 저장소를 통해 관리되는 메타데이터</li>
<li>핵심 작업에 대한 로컬 디스크 종속성 없음</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_layers.png" alt="woodpecker layers" class="doc-image" id="woodpecker-layers" />
   </span> <span class="img-wrapper"> <span>딱따구리 계층</span> </span></p>
<h2 id="Architecture-components" class="common-anchor-header">아키텍처 구성 요소<button data-href="#Architecture-components" class="anchor-icon" translate="no">
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
    </button></h2><p>표준 Woodpecker 배포에는 다음과 같은 구성 요소가 포함됩니다:</p>
<ul>
<li><strong>클라이언트</strong>: 읽기 및 쓰기 요청을 발행하기 위한 인터페이스 계층</li>
<li><strong>LogStore</strong>: 고속 쓰기 버퍼링, 스토리지에 대한 비동기 업로드, 로그 압축을 관리합니다.</li>
<li><strong>스토리지 백엔드</strong>: S3, GCS, EFS와 같은 파일 시스템과 같은 확장 가능하고 저렴한 스토리지 서비스 지원</li>
<li><strong>Etcd</strong>: 메타데이터를 저장하고 분산된 노드에서 로그 상태를 조정합니다.</li>
</ul>
<h2 id="Deployment-modes" class="common-anchor-header">배포 모드<button data-href="#Deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>딱따구리는 사용자의 특정 요구 사항에 맞는 두 가지 배포 모드를 제공합니다:</p>
<h3 id="MemoryBuffer---Lightweight-and-maintenance-free" class="common-anchor-header">MemoryBuffer - 가볍고 유지보수가 필요 없음</h3><p>MemoryBuffer 모드는 간단하고 가벼운 배포 옵션으로, Woodpecker의 임베디드 클라이언트가 메모리에 들어오는 쓰기를 일시적으로 버퍼링하고 주기적으로 클라우드 객체 스토리지 서비스로 플러시하는 방식입니다. 이 모드에서는 메모리 버퍼가 클라이언트에 직접 내장되어 있어 S3로 플러시하기 전에 효율적으로 일괄 처리할 수 있습니다. 메타데이터는 일관성과 조정을 보장하기 위해 <strong>etcd를</strong> 사용하여 관리됩니다. 이 모드는 성능보다 단순성을 우선시하는 소규모 배포 또는 프로덕션 환경의 배치 작업량이 많은 워크로드에 가장 적합하며, 특히 짧은 쓰기 지연 시간이 중요하지 않은 경우에 적합합니다. 이 모드의 쓰기 지연 시간은 일반적으로 200-500밀리초입니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
   </span> <span class="img-wrapper"> <span>딱따구리 메모리 모드 배포</span> </span></p>
<h3 id="QuorumBuffer---Optimized-for-low-latency-high-durability" class="common-anchor-header">쿼럼버퍼 - 짧은 지연 시간, 높은 내구성을 위해 최적화됨</h3><p>쿼럼버퍼 모드는 실시간 응답성과 강력한 내결함성이 모두 필요한 지연 시간에 민감하고 빈도가 높은 읽기/쓰기 워크로드를 위해 설계되었습니다. 이 모드에서는 우드페커의 클라이언트가 3개의 복제 쿼럼 시스템과 상호 작용하여 고속 쓰기 버퍼링을 제공함으로써 분산 합의를 통해 강력한 일관성과 고가용성을 보장합니다.</p>
<p>클라이언트가 쿼럼 노드 3개 중 2개 이상에 데이터를 성공적으로 복제하면 쓰기가 성공한 것으로 간주되며, 일반적으로 한 자릿수 밀리초 이내에 완료되고 그 후에는 장기적인 내구성을 위해 데이터가 비동기식으로 클라우드 오브젝트 스토리지에 플러시됩니다. 이 아키텍처는 온노드 상태를 최소화하고, 대용량 로컬 디스크 볼륨이 필요하지 않으며, 기존 쿼럼 기반 시스템에서 종종 필요한 복잡한 엔트로피 복구 작업을 피할 수 있습니다.</p>
<p>그 결과 일관성, 가용성, 빠른 복구가 필수적인 미션 크리티컬 프로덕션 환경에 이상적인 간소화되고 강력한 WAL 계층을 구축할 수 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_quorumbuffer_mode_deployment.png" alt="woodpecker quorum mode deployment" class="doc-image" id="woodpecker-quorum-mode-deployment" />
   </span> <span class="img-wrapper"> <span>딱따구리 쿼럼 모드 배포</span> </span></p>
<h2 id="Performance-benchmarks" class="common-anchor-header">성능 벤치마크<button data-href="#Performance-benchmarks" class="anchor-icon" translate="no">
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
    </button></h2><p>포괄적인 벤치마크를 실행하여 단일 노드, 단일 클라이언트, 단일 로그 스트림 설정에서 Woodpecker의 성능을 평가했습니다. 그 결과는 Kafka 및 Pulsar와 비교했을 때 인상적이었습니다:</p>
<table>
<thead>
<tr><th>시스템</th><th>Kafka</th><th>Pulsar</th><th>WP Minio</th><th>WP 로컬</th><th>WP S3</th></tr>
</thead>
<tbody>
<tr><td>처리량</td><td>129.96MB/s</td><td>107MB/s</td><td>71MB/s</td><td>450MB/s</td><td>750MB/s</td></tr>
<tr><td>지연 시간</td><td>58ms</td><td>35ms</td><td>184ms</td><td>1.8ms</td><td>166ms</td></tr>
</tbody>
</table>
<p>테스트 머신에서 다양한 스토리지 백엔드의 이론적 처리량 한계를 측정했습니다:</p>
<ul>
<li>MinIO: ~110MB/s</li>
<li>로컬 파일 시스템: 600-750MB/s</li>
<li>Amazon S3(단일 EC2 인스턴스): 최대 1.1GB/s</li>
</ul>
<p>놀랍게도 각 백엔드에서 가능한 최대 처리량의 60~80%를 지속적으로 달성했으며, 이는 미들웨어로서는 탁월한 효율성 수준입니다.</p>
<h3 id="Key-performance-insights" class="common-anchor-header">주요 성능 인사이트</h3><ul>
<li>로컬 파일 시스템 모드: 우드펙커는 450MB/s(카프카보다 3.5배, 펄사보다 4.2배 빠른 속도)를 달성했으며 지연 시간은 1.8ms에 불과해 고성능 단일 노드 배포에 이상적입니다.</li>
<li>클라우드 스토리지 모드(S3): S3에 직접 기록할 때 Woodpecker는 750MB/s(S3의 이론적 한계치의 약 68%)에 도달하여 Kafka보다 5.8배, Pulsar보다 7배 더 높았습니다. 지연 시간은 더 높지만(166밀리초), 이 설정은 배치 지향 워크로드에 탁월한 처리량을 제공합니다.</li>
<li>객체 스토리지 모드(MinIO): MinIO를 사용하더라도 Woodpecker는 MinIO 용량의 약 65%인 71MB/s를 달성했습니다. 이 성능은 Kafka 및 Pulsar와 비슷하지만 리소스 요구 사항이 훨씬 낮습니다.</li>
</ul>
<p>우드페커는 특히 질서 유지가 중요한 동시 대용량 쓰기에 최적화되어 있습니다. 그리고 이러한 결과는 개발 초기 단계에 불과하며, I/O 병합, 지능형 버퍼링 및 프리페칭의 지속적인 최적화를 통해 성능이 이론적 한계에 더욱 가까워질 것으로 예상됩니다.</p>
<h2 id="Operational-benefits" class="common-anchor-header">운영상의 이점<button data-href="#Operational-benefits" class="anchor-icon" translate="no">
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
    </button></h2><p>우드페커의 클라우드 네이티브 아키텍처는 상당한 운영상의 이점을 제공합니다:</p>
<ul>
<li><strong>로컬 스토리지 관리가 필요</strong> 없습니다: 디스크 볼륨 관리, RAID 구성, 하드웨어 장애 제거</li>
<li><strong>자동 확장</strong>: 용량 계획 없이 클라우드 오브젝트 스토리지로 스토리지 확장 가능</li>
<li><strong>비용 효율성</strong>: 자동 계층화 및 압축 기능을 갖춘 종량제 스토리지</li>
<li><strong>고가용성</strong>: 빠른 복구와 함께 클라우드 제공업체의 11-9 내구성을 활용합니다.</li>
<li><strong>간소화된 배포</strong>: 다양한 운영 요구사항에 맞는 두 가지 배포 모드(메모리버퍼/쿼럼버퍼)를 제공합니다.</li>
<li><strong>개발자 친화적</strong>: 빠른 환경 설정과 모든 환경에서 일관된 아키텍처 제공</li>
</ul>
<p>이러한 장점은 성능만큼이나 운영 간소화가 중요한 미션 크리티컬 RAG, AI 에이전트, 저지연 검색 워크로드에 특히 유용합니다.</p>
