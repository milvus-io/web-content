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
<h3 id="MemoryBuffer---Lightweight-and-maintenance-free" class="common-anchor-header">MemoryBuffer - 가볍고 유지보수가 필요 없음</h3><p>MemoryBuffer 모드는 간단하고 가벼운 배포 옵션으로, 들어오는 쓰기를 메모리에 일시적으로 버퍼링하고 주기적으로 클라우드 객체 스토리지 서비스로 플러시합니다. 메타데이터는 일관성과 조정을 보장하기 위해 <strong>etcd를</strong> 사용하여 관리됩니다. 이 모드는 성능보다 단순성을 우선시하는 소규모 배포 또는 프로덕션 환경의 배치 작업량이 많은 워크로드에 가장 적합하며, 특히 쓰기 지연 시간이 중요하지 않은 경우에 적합합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
   </span> <span class="img-wrapper"> <span>딱따구리 메모리 모드 배포</span> </span></p>
<h3 id="QuorumBuffer---Optimized-for-low-latency-high-durability" class="common-anchor-header">쿼럼버퍼 - 짧은 지연 시간, 높은 내구성을 위해 최적화됨</h3><p>쿼럼버퍼 모드는 실시간 응답성과 강력한 내결함성이 모두 필요한 지연 시간에 민감하고 빈도가 높은 읽기/쓰기 워크로드를 위해 설계되었습니다. 이 모드에서 딱따구리는 3복제 쿼럼 쓰기를 통해 고속 쓰기 버퍼로 작동하여 강력한 일관성과 고가용성을 보장합니다.</p>
<p>쓰기 작업은 3개 노드 중 2개 이상에 복제되면 성공한 것으로 간주되며, 일반적으로 한 자릿수 밀리초 이내에 완료되고 그 후에는 장기적인 내구성을 위해 데이터가 클라우드 오브젝트 스토리지에 비동기적으로 플러시됩니다. 이 아키텍처는 온노드 상태를 최소화하고, 대용량 로컬 디스크 볼륨이 필요하지 않으며, 기존 쿼럼 기반 시스템에서 종종 필요한 복잡한 엔트로피 방지 복구 작업을 피할 수 있습니다.</p>
<p>그 결과 일관성, 가용성, 빠른 복구가 필수적인 미션 크리티컬 프로덕션 환경에 이상적인 간소화되고 강력한 WAL 계층을 구축할 수 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/woodpecker_memorybuffer_mode_deployment.png" alt="woodpecker memory mode deployment" class="doc-image" id="woodpecker-memory-mode-deployment" />
   </span> <span class="img-wrapper"> <span>딱따구리 메모리 모드 배포</span> </span></p>
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
    </button></h2><p>우드페커의 클라우드 네이티브 아키텍처는 배포를 간소화하고 유지보수를 줄이며 안정성을 향상시킵니다.</p>
<h3 id="Simplified-infrastructure-management" class="common-anchor-header">간소화된 인프라 관리</h3><ul>
<li><strong>로컬 스토리지 관리가 필요 없습니다:</strong> 디스크 볼륨, RAID 또는 디스크 장애를 관리할 필요가 없습니다.</li>
<li><strong>하드웨어 종속성 감소:</strong> 하드웨어 구성 및 모니터링이 필요 없으며, 내구성과 가용성은 클라우드 오브젝트 스토리지에서 처리합니다.</li>
<li><strong>간소화된 용량 계획:</strong> 클라우드 오브젝트 스토리지를 통해 스토리지가 자동으로 확장되므로 수동으로 예측할 필요가 없습니다.</li>
</ul>
<h3 id="Simplified-deployment" class="common-anchor-header">간소화된 배포</h3><ul>
<li><strong>메모리버퍼 모드:</strong> 최소한의 리소스를 사용하며 클라우드 스토리지와 통합되어 개발 및 소규모 프로덕션에 이상적입니다.</li>
<li><strong>쿼럼버퍼 모드:</strong> 기존 분산 스토리지의 복잡성 없이 엔터프라이즈급 안정성을 제공합니다.</li>
</ul>
<h2 id="Cost-efficiency-and-resource-optimization" class="common-anchor-header">비용 효율성 및 리소스 최적화<button data-href="#Cost-efficiency-and-resource-optimization" class="anchor-icon" translate="no">
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
<li><strong>메모리 사용량 감소:</strong> 효율적인 버퍼링으로 기존 브로커에 비해 메모리 요구량이 줄어듭니다.</li>
<li><strong>탄력적인 확장:</strong> 종량제 클라우드 스토리지는 과잉 프로비저닝을 제거합니다.</li>
<li><strong>인프라 오버헤드 감소:</strong> 구성 요소가 적을수록 배포 및 유지 관리 비용이 절감됩니다.</li>
</ul>
<h3 id="Storage-cost-advantages" class="common-anchor-header">스토리지 비용 이점</h3><ul>
<li><strong>계층형 스토리지:</strong> 장기 보존을 위해 데이터를 비용 효율적인 클라우드 스토리지 계층으로 자동 마이그레이션합니다.</li>
<li><strong>압축 및 중복 제거:</strong> 기본 제공 기능으로 별도의 운영 노력 없이도 스토리지 비용을 절감할 수 있습니다.</li>
<li><strong>복제 오버헤드 없음:</strong> 클라우드 스토리지에서 내구성을 관리하므로 수동 복제본 관리가 필요 없습니다.</li>
</ul>
<h2 id="High-availability-and-disaster-recovery" class="common-anchor-header">고가용성 및 재해 복구<button data-href="#High-availability-and-disaster-recovery" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Simplified-fault-tolerance" class="common-anchor-header">간소화된 내결함성</h3><ul>
<li><strong>클라우드 네이티브 내구성:</strong> 클라우드 제공업체의 99.9(99.999999999%) 내구성 보장을 활용합니다.</li>
<li><strong>빠른 복구:</strong> 최소한의 로컬 상태로 신속한 노드 교체 및 클러스터 복구가 가능합니다.</li>
<li><strong>지역 간 복원력:</strong> 클라우드 스토리지 기능을 사용하여 지역 간 복제를 지원합니다.</li>
</ul>
<h3 id="Operational-resilience" class="common-anchor-header">운영 복원력</h3><ul>
<li><strong>단일 장애 지점 감소:</strong> 구성 요소 수가 줄어들어 장애 위험이 낮아집니다.</li>
<li><strong>자동 페일오버:</strong> 클라우드 스토리지 이중화로 장애 조치를 간소화합니다.</li>
<li><strong>간소화된 백업:</strong> 통합 클라우드 스토리지는 자동 백업 및 버전 관리를 제공합니다.</li>
</ul>
<h2 id="Development-and-operational-experience" class="common-anchor-header">개발 및 운영 환경<button data-href="#Development-and-operational-experience" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Improved-development-workflow" class="common-anchor-header">향상된 개발 워크플로</h3><ul>
<li><strong>더 빠른 환경 설정:</strong> 종속성을 최소화하여 개발 및 테스트 속도를 높입니다.</li>
<li><strong>일관된 아키텍처:</strong> 개발, 스테이징 및 프로덕션 전반에 걸쳐 일관된 디자인.</li>
<li><strong>클라우드 네이티브 통합:</strong> 클라우드 서비스 및 컨테이너 오케스트레이션과의 원활한 호환성.</li>
</ul>
<h3 id="Enhanced-production-operations" class="common-anchor-header">향상된 프로덕션 운영</h3><ul>
<li><strong>예측 가능한 성능:</strong> 배포 규모와 구성에 관계없이 일관된 결과를 제공합니다.</li>
<li><strong>간소화된 업그레이드:</strong> 상태 비저장형 설계로 다운타임을 최소화하는 롤링 업데이트가 가능합니다.</li>
<li><strong>리소스 예측 가능성:</strong> 기존 메시지 브로커에 비해 더 안정적인 리소스 사용.</li>
</ul>
<p>미션 크리티컬 RAG, AI 에이전트, 저지연 검색 워크로드를 지원하는 벡터 데이터베이스의 경우 이러한 운영상의 이점은 혁신적입니다. 복잡한 메시지 브로커 스택에서 우드페커의 간소화된 아키텍처로 전환하면 성능이 향상될 뿐만 아니라 개발 및 인프라 팀의 운영 부담도 크게 줄어듭니다.</p>
<p>클라우드 인프라가 S3 Express One Zone과 같은 혁신으로 계속 발전하고 있는 가운데, Woodpecker의 아키텍처를 통해 조직은 대대적인 운영 변경이나 시스템 재설계 없이도 이러한 발전의 이점을 자동으로 누릴 수 있습니다.</p>
