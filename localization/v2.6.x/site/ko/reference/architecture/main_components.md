---
id: main_components.md
summary: Milvus 스탠드얼론 및 클러스터의 주요 구성 요소에 대해 알아보세요.
title: 주요 구성 요소
---
<h1 id="Main-Components" class="common-anchor-header">주요 구성 요소<button data-href="#Main-Components" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus 클러스터는 5개의 핵심 구성 요소와 3개의 서드파티 종속 요소로 구성됩니다. 각 구성 요소는 쿠버네티스에 독립적으로 배포할 수 있습니다:</p>
<h2 id="Milvus-components" class="common-anchor-header">Milvus 구성 요소<button data-href="#Milvus-components" class="anchor-icon" translate="no">
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
<li>코디네이터: 고가용성을 제공하기 위해 마스터-슬레이브 모드를 활성화할 수 있습니다.</li>
<li>프록시: 클러스터당 하나 이상</li>
<li>스트리밍 노드: 클러스터당 하나 이상</li>
<li>쿼리 노드: 클러스터당 하나 이상</li>
<li>데이터 노드: 클러스터당 하나 이상</li>
</ul>
<h2 id="Third-party-dependencies" class="common-anchor-header">타사 종속성<button data-href="#Third-party-dependencies" class="anchor-icon" translate="no">
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
<li><strong>메타 스토어:</strong> 밀버스의 다양한 구성 요소에 대한 메타데이터를 저장합니다(예: etcd).</li>
<li><strong>오브젝트 스토리지:</strong> 인덱스 및 바이너리 로그 파일과 같은 밀버스 내 대용량 파일의 데이터 지속성을 담당합니다(예: S3).</li>
<li><strong>WAL 스토리지:</strong> 밀버스(예: 딱따구리)를 위한 WAL(Write-Ahead Log) 서비스를 제공합니다.<ul>
<li>딱따구리 제로 디스크 모드에서 <strong>WAL은</strong> 다른 배포 없이 개체 스토리지와 메타 스토리지를 직접 사용하므로 타사 종속성을 줄일 수 있습니다.</li>
</ul></li>
</ul>
<h2 id="Milvus-deployment-modes" class="common-anchor-header">Milvus 배포 모드<button data-href="#Milvus-deployment-modes" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus를 실행하는 데는 두 가지 모드가 있습니다:</p>
<h3 id="Standalone" class="common-anchor-header">독립형</h3><p>하나의 프로세스에서 모든 구성 요소를 실행하는 Milvus의 단일 인스턴스로, 작은 데이터 세트와 낮은 워크로드에 적합합니다. 또한 독립형 모드에서는 타사 WAL 스토리지 종속성에 대한 요구 사항을 없애기 위해 woodpecker 및 rocksmq와 같은 더 간단한 WAL 구현을 선택할 수 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/standalone_architecture.png" alt="Standalone_architecture" class="doc-image" id="standalone_architecture" />
   </span> <span class="img-wrapper"> <span>독립형_아키텍처</span> </span></p>
<p>현재 WAL 스토리지 백엔드가 클러스터 모드를 지원하더라도 독립형 Milvus 인스턴스에서 Milvus 클러스터로 온라인 업그레이드를 수행할 수 없습니다.</p>
<h3 id="Cluster" class="common-anchor-header">클러스터</h3><p>각 구성 요소가 독립적으로 실행되고 탄력적으로 확장할 수 있는 Milvus의 분산 배포 모드입니다. 이 설정은 대규모 데이터 세트와 고부하 시나리오에 적합합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/distributed_architecture.png" alt="Distributed_architecture" class="doc-image" id="distributed_architecture" />
   </span> <span class="img-wrapper"> <span>분산_아키텍처</span> </span></p>
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
<li><a href="/docs/ko/four_layers.md">컴퓨팅/스토리지 분리를</a> 읽고 Milvus의 메커니즘과 설계 원리를 이해하세요.</li>
</ul>
