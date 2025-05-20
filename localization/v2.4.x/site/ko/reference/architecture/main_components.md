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
    </button></h1><p>Milvus를 실행하는 데는 독립 실행형과 클러스터의 두 가지 모드가 있습니다. 이 두 모드는 동일한 기능을 공유합니다. 데이터 세트 크기, 트래픽 데이터 등에 가장 적합한 모드를 선택할 수 있습니다. 현재로서는 Milvus 스탠드얼론은 Milvus 클러스터로 "온라인" 업그레이드할 수 없습니다.</p>
<h2 id="Milvus-standalone" class="common-anchor-header">Milvus 독립형<button data-href="#Milvus-standalone" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus 스탠드얼론에는 세 가지 구성 요소가 포함되어 있습니다:</p>
<ul>
<li><p><strong>Milvus:</strong> 핵심 기능 구성 요소.</p></li>
<li><p><strong>메타 스토어:</strong> 프록시, 인덱스 노드 등을 포함한 Milvus 내부 구성 요소의 메타데이터에 액세스하고 저장하는 메타데이터 엔진입니다.</p></li>
<li><p><strong>오브젝트 스토리지:</strong> Milvus의 데이터 지속성을 담당하는 스토리지 엔진입니다.</p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/standalone_architecture.jpg" alt="Standalone_architecture" class="doc-image" id="standalone_architecture" />
   </span> <span class="img-wrapper"> <span>독립형_아키텍처</span> </span></p>
<h2 id="Milvus-cluster" class="common-anchor-header">Milvus 클러스터<button data-href="#Milvus-cluster" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Milvus 클러스터에는</strong> 7개의 마이크로서비스 구성 요소와 3개의 서드파티 종속 요소가 포함되어 있습니다. 모든 마이크로서비스는 서로 독립적으로 Kubernetes에 배포할 수 있습니다.</p>
<h3 id="Microservice-components" class="common-anchor-header">마이크로서비스 구성 요소</h3><ul>
<li>루트 조정</li>
<li>프록시</li>
<li>쿼리 조정</li>
<li>쿼리 노드</li>
<li>데이터 조정</li>
<li>인덱스 노드</li>
<li>데이터 노드</li>
</ul>
<h3 id="Third-party-dependencies" class="common-anchor-header">서드파티 종속성</h3><ul>
<li><strong>메타 저장소:</strong> 클러스터의 다양한 컴포넌트에 대한 메타데이터(예: etcd)를 저장합니다.</li>
<li><strong>오브젝트 스토리지:</strong> 인덱스 및 바이너리 로그 파일과 같은 클러스터 내 대용량 파일의 데이터 지속성을 담당합니다(예: S3).</li>
<li><strong>로그 브로커:</strong> 최근 변경 작업의 로그를 관리하고, 스트리밍 로그를 출력하며, 로그 게시-구독 서비스를 제공합니다(예: Pulsar).</li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/distributed_architecture.jpg" alt="Distributed_architecture" class="doc-image" id="distributed_architecture" />
   </span> <span class="img-wrapper"> <span>Distributed_architecture</span> </span></p>
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
<li><a href="/docs/ko/v2.4.x/four_layers.md">컴퓨팅/저장소 분리를</a> 읽고 Milvus의 메커니즘과 설계 원리를 이해하세요.</li>
</ul>
