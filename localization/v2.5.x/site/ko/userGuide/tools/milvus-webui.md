---
id: milvus-webui.md
summary: >-
  Milvus 웹 UI는 Milvus를 위한 그래픽 관리 도구입니다. 간단하고 직관적인 인터페이스로 시스템 가시성을 향상시킵니다. 사용자는
  다음을 수행할 수 있습니다.
title: Milvus WebUI
---
<h1 id="Milvus-WebUI" class="common-anchor-header">Milvus WebUI<button data-href="#Milvus-WebUI" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus Web UI는 Milvus를 위한 그래픽 관리 도구입니다. 간단하고 직관적인 인터페이스로 시스템 관찰성을 향상시킵니다. Milvus Web UI를 사용하여 Milvus의 구성 요소 및 종속성에 대한 통계와 메트릭을 관찰하고, 데이터베이스 및 수집 세부 정보를 확인하고, 자세한 Milvus 구성을 나열할 수 있습니다.</p>
<h2 id="Overview" class="common-anchor-header">개요<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Web UI는 간단하고 직관적인 인터페이스로 전반적인 시스템 통합 가시성을 제공하는 기본 제공 도구라는 점에서 Birdwatcher 및 Attu와 다릅니다.</p>
<p>다음 표는 Milvus Web UI와 Birdwatcher/Attu의 기능을 비교한 것입니다:</p>
<table>
<thead>
<tr><th>기능</th><th>Milvus 웹 UI</th><th>Birdwatcher</th><th>Attu</th></tr>
</thead>
<tbody>
<tr><td>작동 형태</td><td>GUI</td><td>CLI</td><td>GUI</td></tr>
<tr><td>대상 사용자</td><td>유지 관리자, 개발자</td><td>유지 관리자</td><td>개발자</td></tr>
<tr><td>설치</td><td>빌트인</td><td>독립 실행형 도구</td><td>독립 실행형 도구</td></tr>
<tr><td>종속성</td><td>Milvus</td><td>Milvus / etcd</td><td>Milvus</td></tr>
<tr><td>주요 기능</td><td>런타임 환경, 데이터베이스/수집 세부 정보, 세그먼트, 채널, 작업 및 느린 쿼리 요청</td><td>메타데이터 검사 및 Milvus API 실행</td><td>데이터베이스 관리 및 운영 작업</td></tr>
</tbody>
</table>
<p>Milvus 웹 UI는 다음 URL을 통해 접속할 수 있습니다:</p>
<pre><code translate="no">http://<span class="hljs-variable">${MILVUS_PROXY_IP}</span>:9091/webui
<button class="copy-code-btn"></button></code></pre>
<h2 id="Features" class="common-anchor-header">기능<button data-href="#Features" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus Web UI는 다음과 같은 기능을 제공합니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/milvus-webui-overview.png" alt="Milvus Web UI overview" class="doc-image" id="milvus-web-ui-overview" />
   </span> <span class="img-wrapper"> <span>Milvus 웹 UI 개요</span> </span></p>
<ul>
<li><p><a href="#Home">홈</a></p>
<p>현재 실행 중인 Milvus 인스턴스, 해당 구성 요소, 연결된 클라이언트 및 종속성에 대한 정보를 확인할 수 있습니다.</p></li>
<li><p><a href="#Collections">컬렉션</a></p>
<p>현재 Milvus에 있는 데이터베이스 및 컬렉션 목록을 보고 세부 정보를 확인할 수 있습니다.</p></li>
<li><p><a href="#Query">쿼리</a></p>
<p>쿼리 노드 및 쿼리 코디네이터의 수집 통계를 세그먼트, 채널, 리플리카, 리소스 그룹별로 확인할 수 있습니다.</p></li>
<li><p><a href="#Data">데이터</a></p>
<p>데이터 노드의 수집 통계를 세그먼트와 채널별로 조회할 수 있습니다.</p></li>
<li><p><a href="#Tasks">작업</a></p>
<p>쿼리 코디네이터 스케줄러 작업, 압축 작업, 인덱스 구축 작업, 가져오기 작업, 데이터 동기화 작업 등 Milvus에서 실행 중인 작업 목록을 확인할 수 있습니다.</p></li>
<li><p><a href="#Slow-requests">느린 요청</a></p>
<p>요청 유형, 요청 기간, 요청 매개변수를 포함하여 Milvus에서 느린 요청 목록을 볼 수 있습니다.</p></li>
<li><p><a href="#Configurations">구성</a></p>
<p>Milvus 구성 목록과 해당 값을 볼 수 있습니다.</p></li>
<li><p><a href="#Tools">도구</a></p>
<p>웹 UI에서 두 가지 기본 제공 도구인 pprof와 Milvus 데이터 시각화 도구에 액세스할 수 있습니다.</p></li>
</ul>
<h2 id="Home" class="common-anchor-header">홈<button data-href="#Home" class="anchor-icon" translate="no">
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
    </button></h2><p>홈 페이지에서는 다음과 같은 정보를 확인할 수 있습니다:</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-home.png" alt="Milvus Web UI Home" class="doc-image" id="milvus-web-ui-home" />
   </span> <span class="img-wrapper"> <span>Milvus 웹 UI 홈</span> </span></p>
<ul>
<li><p><strong>시스템 정보</strong>: 배포 모드, 배포에 사용된 이미지 및 관련 정보를 포함한 시스템 정보를 볼 수 있습니다.</p></li>
<li><p><strong>컴포넌트 정보</strong>: 쿼리 노드, 데이터 노드, 인덱스 노드, 코디네이터, 프록시의 상태 및 메트릭을 포함하여 Milvus의 구성 요소의 상태 및 메트릭을 볼 수 있습니다.</p></li>
<li><p><strong>연결된 클라이언트</strong>: 연결된 클라이언트와 SDK 유형 및 버전, 사용자 이름, 액세스 기록 등의 정보를 볼 수 있습니다.</p></li>
<li><p><strong>시스템 종속성</strong>: 메타 저장소, 메시지 큐 및 개체 저장소의 상태 및 메트릭을 포함하여 Milvus의 종속성 상태 및 메트릭을 봅니다.</p></li>
</ul>
<h2 id="Collections" class="common-anchor-header">컬렉션<button data-href="#Collections" class="anchor-icon" translate="no">
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
    </button></h2><p>컬렉션 페이지에서는 현재 Milvus에 있는 데이터베이스 및 컬렉션 목록을 보고 세부 정보를 확인할 수 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-collections.png" alt="Milvus Web UI Collections" class="doc-image" id="milvus-web-ui-collections" />
   </span> <span class="img-wrapper"> <span>Milvus 웹 UI 컬렉션</span> </span></p>
<ul>
<li><p><strong>데이터베이스</strong>: 현재 Milvus에 있는 데이터베이스 목록과 세부 정보를 확인할 수 있습니다.</p></li>
<li><p><strong>컬렉션</strong>: 각 데이터베이스의 컬렉션 목록과 세부 정보를 확인합니다.</p>
<p>컬렉션을 클릭하면 필드 수, 파티션, 인덱스 및 기타 정보를 포함한 세부 정보를 자세히 볼 수 있습니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-collection-details.png" alt="Milvus Web UI Collection Details" class="doc-image" id="milvus-web-ui-collection-details" />
   </span> <span class="img-wrapper"> <span>Milvus 웹 UI 컬렉션 세부 정보</span> </span></p></li>
</ul>
<h2 id="Query" class="common-anchor-header">쿼리<button data-href="#Query" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-query.png" alt="Milvus Web UI Query Page" class="doc-image" id="milvus-web-ui-query-page" />
   </span> <span class="img-wrapper"> <span>Milvus 웹 UI 쿼리 페이지</span> </span></p>
<ul>
<li><p><strong>세그먼트</strong>: 세그먼트 ID, 해당 컬렉션, 상태, 크기 등 세그먼트 목록과 세부 정보를 볼 수 있습니다.</p></li>
<li><p><strong>채널</strong>: 채널: 채널 목록과 채널 이름, 해당 컬렉션 등 세부 정보를 조회합니다.</p></li>
<li><p><strong>복제본</strong>: 복제본: 복제본 목록과 복제본 ID, 해당 컬렉션 등 세부 정보를 볼 수 있습니다.</p></li>
<li><p><strong>리소스 그룹</strong>: 리소스 그룹 목록과 리소스 그룹 이름, 그룹의 쿼리 노드 수, 구성 등을 포함한 세부 정보를 볼 수 있습니다.</p></li>
</ul>
<h2 id="Data" class="common-anchor-header">데이터<button data-href="#Data" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-data.png" alt="Milvus Web UI Data Page" class="doc-image" id="milvus-web-ui-data-page" />
   </span> <span class="img-wrapper"> <span>Milvus 웹 UI 데이터 페이지</span> </span></p>
<ul>
<li><p><strong>세그먼트</strong>: 데이터 노드/코디네이터의 세그먼트 목록과 세그먼트 ID, 해당 컬렉션, 상태, 크기 등 세부 정보를 볼 수 있습니다.</p></li>
<li><p><strong>채널</strong>: 채널: 데이터 노드/코디네이터의 채널 목록과 채널 이름, 해당 컬렉션 등 세부 정보를 확인합니다.</p></li>
</ul>
<h2 id="Tasks" class="common-anchor-header">작업<button data-href="#Tasks" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-tasks.png" alt="Milvus Web UI Tasks Page" class="doc-image" id="milvus-web-ui-tasks-page" />
   </span> <span class="img-wrapper"> <span>Milvus 웹 UI 작업 페이지</span> </span></p>
<ul>
<li><p><strong>작업</strong>: 작업 유형, 상태 및 작업을 포함하여 Milvus에서 실행 중인 작업 목록을 볼 수 있습니다.</p>
<ul>
<li><p><strong>QueryCoord 작업</strong>: 지난 15분 동안의 밸런서, 인덱스/세그먼트/채널/리더 검사기를 포함한 모든 QueryCoord 스케줄러 작업을 봅니다.</p></li>
<li><p><strong>압축 작업</strong>: 지난 15분 동안 데이터 코디네이터의 모든 압축 작업을 봅니다.</p></li>
<li><p><strong>인덱스 구축 작업</strong>: 지난 30분 동안 데이터 코디네이터가 수행한 모든 인덱스 구축 작업을 볼 수 있습니다.</p></li>
<li><p><strong>가져오기 작업</strong>: 지난 30분 동안 데이터 코디네이터가 수행한 모든 가져오기 작업을 봅니다.</p></li>
<li><p><strong>데이터 동기화 작업</strong>: 지난 15분 동안 데이터 노드에서 발생한 모든 데이터 동기화 작업을 봅니다.</p></li>
</ul></li>
</ul>
<h2 id="Slow-requests" class="common-anchor-header">느린 요청<button data-href="#Slow-requests" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-slow-requests.png" alt="Milvus Web UI Slow Requests Page" class="doc-image" id="milvus-web-ui-slow-requests-page" />
   </span> <span class="img-wrapper"> <span>Milvus 웹 UI 느린 요청 페이지</span> </span></p>
<ul>
<li><strong>느린 요청</strong>: 느린 요청은 설정에 지정된 <code translate="no">proxy.slowQuerySpanInSeconds</code> 값보다 지연 시간이 긴 검색 또는 쿼리입니다. 느린 요청 목록에는 지난 15분 동안의 모든 느린 요청이 표시됩니다.</li>
</ul>
<h2 id="Configurations" class="common-anchor-header">구성<button data-href="#Configurations" class="anchor-icon" translate="no">
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
    </button></h2><p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/webui-configurations.png" alt="Milvus Web UI Configurations Page" class="doc-image" id="milvus-web-ui-configurations-page" />
   </span> <span class="img-wrapper"> <span>Milvus 웹 UI 구성 페이지</span> </span></p>
<ul>
<li><strong>구성</strong>: Milvus 런타임 구성 목록과 해당 값을 볼 수 있습니다.</li>
</ul>
<h2 id="Tools" class="common-anchor-header">도구<button data-href="#Tools" class="anchor-icon" translate="no">
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
<li><p><strong>pprof</strong>: Milvus 프로파일링 및 디버깅을 위한 pprof 도구에 액세스합니다.</p></li>
<li><p><strong>Milvus 데이터 시각화 도구</strong>: Milvus의 데이터를 시각화하기 위한 Milvus 데이터 시각화 도구에 액세스합니다.</p></li>
</ul>
