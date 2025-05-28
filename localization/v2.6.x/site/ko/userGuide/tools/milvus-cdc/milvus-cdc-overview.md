---
id: milvus-cdc-overview.md
order: 1
summary: Milvus-CDC는 Milvus 인스턴스에서 증분 데이터를 캡처하고 동기화할 수 있는 사용자 친화적인 도구입니다.
title: CDC 개요
---
<h1 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus-CDC는 Milvus 인스턴스에서 증분 데이터를 캡처하고 동기화할 수 있는 사용자 친화적인 도구입니다. 소스 인스턴스와 대상 인스턴스 간에 데이터를 원활하게 전송하여 비즈니스 데이터의 안정성을 보장하고 증분 백업 및 재해 복구를 쉽게 수행할 수 있습니다.</p>
<h2 id="Key-capabilities" class="common-anchor-header">주요 기능<button data-href="#Key-capabilities" class="anchor-icon" translate="no">
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
<li><p><strong>순차적 데이터 동기화</strong>: Milvus 인스턴스 간에 데이터 변경 사항을 순차적으로 동기화하여 데이터 무결성 및 일관성을 보장합니다.</p></li>
<li><p><strong>증분 데이터 복제</strong>: 삽입 및 삭제를 포함한 증분 데이터를 소스 Milvus에서 대상 Milvus로 복제하여 영구적인 스토리지를 제공합니다.</p></li>
<li><p><strong>CDC 작업 관리</strong>: CDC 작업 생성, 상태 조회, 삭제 등 OpenAPI 요청을 통해 CDC 작업을 관리할 수 있습니다.</p></li>
</ul>
<p>또한 향후 스트림 처리 시스템과의 통합을 지원하도록 기능을 확장할 계획입니다.</p>
<h2 id="Architecture" class="common-anchor-header">아키텍처<button data-href="#Architecture" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-CDC는 작업과 메타데이터를 관리하는 HTTP 서버와 소스 Milvus 인스턴스에서 데이터를 가져오는 리더와 처리된 데이터를 대상 Milvus 인스턴스로 전송하는 라이터로 작업 실행을 동기화하는 <strong>코어리브의</strong> 두 가지 주요 구성 요소로 구성된 아키텍처를 채택하고 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-cdc-architecture.png" alt="milvus-cdc-architecture" class="doc-image" id="milvus-cdc-architecture" />
   </span> <span class="img-wrapper"> <span>MILVUS-CDC-아키텍처</span> </span></p>
<p>앞의 다이어그램에서</p>
<ul>
<li><p><strong>HTTP 서버</strong>: 사용자 요청을 처리하고, 작업을 실행하고, 메타데이터를 유지 관리합니다. Milvus-CDC 시스템 내에서 작업 오케스트레이션을 위한 컨트롤 플레인 역할을 합니다.</p></li>
<li><p><strong>Corelib</strong>: 작업의 실제 동기화를 담당합니다. 여기에는 소스 Milvus의 etcd 및 메시지 큐(MQ)에서 정보를 검색하는 리더 구성 요소와 MQ의 메시지를 Milvus 시스템의 API 매개변수로 변환하고 이러한 요청을 대상 Milvus로 전송하여 동기화 프로세스를 완료하는 작성자 구성 요소가 포함되어 있습니다.</p></li>
</ul>
<h2 id="Workflow" class="common-anchor-header">워크플로<button data-href="#Workflow" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus-CDC 데이터 처리 흐름에는 다음 단계가 포함됩니다:</p>
<ol>
<li><p><strong>작업 생성</strong>: 사용자가 HTTP 요청을 통해 CDC 작업을 시작합니다.</p></li>
<li><p><strong>메타데이터 검색</strong>: 시스템은 수집에 대한 채널 및 체크포인트 정보를 포함한 수집 관련 메타데이터를 소스 Milvus의 etcd에서 가져옵니다.</p></li>
<li><p><strong>MQ 연결</strong>: 메타데이터가 준비되면 시스템은 MQ에 연결하여 데이터 스트림에 대한 구독을 시작합니다.</p></li>
<li><p><strong>데이터 처리</strong>: MQ의 데이터를 읽고, 구문 분석하여 Go SDK를 사용하여 전달하거나 소스 Milvus에서 수행된 작업을 복제하도록 처리합니다.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/milvus-cdc-workflow.png" alt="milvus-cdc-workflow" class="doc-image" id="milvus-cdc-workflow" />
   </span> <span class="img-wrapper"> <span>MILVUS-CDC-워크플로우</span> </span></p>
<h2 id="Limits" class="common-anchor-header">제한 사항<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p><strong>증분 데이터 동기화</strong>: 현재 Milvus-CDC는 증분 데이터만 동기화하도록 설계되어 있습니다. 비즈니스에 전체 데이터 백업이 필요한 경우 <a href="https://milvus.io/community">당사에</a> 문의하여 도움을 받으시기 바랍니다.</p></li>
<li><p><strong>동기화 범위</strong>: 현재 Milvus-CDC는 클러스터 수준에서 데이터를 동기화할 수 있습니다. 향후 릴리스에서 컬렉션 수준의 데이터 동기화 지원을 추가하기 위해 노력하고 있습니다.</p></li>
<li><p><strong>지원되는 API 요청</strong>: Milvus-CDC는 현재 다음과 같은 API 요청을 지원합니다. 향후 릴리스에서 추가 요청에 대한 지원을 확대할 계획입니다:</p>
<ul>
<li><p>컬렉션 생성/삭제</p></li>
<li><p>삽입/삭제/업로드</p></li>
<li><p>파티션 생성/삭제</p></li>
<li><p>인덱스 생성/삭제</p></li>
<li><p>로드/해제/세척</p></li>
<li><p>파티션 로드/해제</p></li>
<li><p>데이터베이스 생성/삭제</p></li>
</ul></li>
</ul>
