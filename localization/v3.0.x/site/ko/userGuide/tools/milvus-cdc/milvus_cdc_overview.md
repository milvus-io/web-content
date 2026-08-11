---
id: milvus_cdc_overview.md
summary: Milvus CDC는 주-대기 방식의 재해 복구를 위해 한 Milvus 클러스터에서 다른 클러스터로 데이터 변경 사항을 복제합니다.
title: Milvus CDC
---
<h1 id="Milvus-CDC" class="common-anchor-header">Milvus CDC<button data-href="#Milvus-CDC" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus CDC(Change Data Capture)는 한 Milvus 클러스터에서 다른 클러스터로 데이터 변경 사항을 복제합니다. CDC를 사용하여 Milvus용 주-대기 재해 복구 토폴로지를 구축할 수 있습니다.</p>
<p>주-대기 토폴로지에서는 하나의 클러스터가 주 클러스터 역할을 수행하며 쓰기 작업을 처리합니다. 하나 이상의 대기 클러스터는 주 클러스터로부터 변경 사항을 지속적으로 수신하며 읽기 트래픽을 처리할 수 있습니다. 주 클러스터를 사용할 수 없거나 유지보수가 필요한 경우, 서비스 트래픽을 대기 클러스터로 전환할 수 있습니다.</p>
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
    </button></h2><p>일반적인 토폴로지는 다음과 같이 구성됩니다.</p>
<ul>
<li><strong>주 클러스터</strong>: 복제를 위한 소스 클러스터입니다. 읽기 및 쓰기 요청을 처리합니다.</li>
<li><strong>스탠바이 클러스터</strong>: 복제를 위한 대상 클러스터입니다. 프라이머리로부터 변경 사항을 수신하며, 스탠바이 상태로 유지되는 동안 읽기 전용입니다.</li>
<li><strong>CDC 노드</strong>: 현재 주 클러스터의 WAL 변경 사항을 대기 클러스터로 전달하는 Milvus 구성 요소입니다. 스위치오버 또는 장애 조치 후 주 클러스터가 될 가능성이 있는 각 클러스터에 CDC를 배포해야 합니다.</li>
<li><strong>복제 토폴로지</strong>: 클러스터-a → 클러스터-b와 같이 구성된 소스-대상 간 관계입니다.
다음은 해당 토폴로지를 보여주는 그림입니다. <span class="img-wrapper">

  
   <img translate="no" src="/docs/v3.0.x/assets/cdc-overview.png" alt="CDC workflow" class="doc-image" id="cdc-workflow" /> 
 <span>   CDC 워크플로우</span>
  
 </span></li>
</ul>
<h3 id="Supported-Topologies" class="common-anchor-header">지원되는 토폴로지<button data-href="#Supported-Topologies" class="anchor-icon" translate="no">
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
    </button></h3><p>가장 일반적인 CDC 배포 방식은 프라이머리 1개와 스탠바이 1개로 구성됩니다:</p>
<pre><code translate="no" class="language-text">Application writes
      |
      v
Primary cluster A  -- CDC replication --&gt;  Standby cluster B
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CDC는 또한 단일 프라이머리, 다중 스탠바이 토폴로지도 지원합니다:</p>
<pre><code translate="no" class="language-text">Primary cluster A  -- CDC replication --&gt;  Standby cluster B
                  \-- CDC replication --&gt;  Standby cluster C
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CDC는 두 개 이상의 클러스터가 동시에 쓰기 트래픽을 수신하는 다중 프라이머리 또는 액티브-액티브 배포를 지원하지 않습니다.</p>
<h2 id="Primary-and-Standby-Behavior" class="common-anchor-header">주 클러스터 및 대기 클러스터의 동작<button data-href="#Primary-and-Standby-Behavior" class="anchor-icon" translate="no">
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
    </button></h2><table>
<thead>
<tr><th>역할</th><th>읽기</th><th>쓰기</th><th>복제 동작</th></tr>
</thead>
<tbody>
<tr><td>주 노드</td><td>예</td><td>예</td><td>변경 사항을 스탠바이 클러스터로 전송</td></tr>
<tr><td>스탠바이</td><td>예</td><td>아니요</td><td>주 클러스터로부터 복제된 변경 사항을 수신합니다</td></tr>
</tbody>
</table>
<p>대기 클러스터는 직접 쓰기 요청을 거부합니다. 이를 통해 스플릿 브레인 현상을 방지하고 복제 토폴로지의 일관성을 유지합니다.</p>
<h2 id="Planned-Switchover-vs-Failover" class="common-anchor-header">계획된 전환(Switchover) 대 장애 조치(Failover)<button data-href="#Planned-Switchover-vs-Failover" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CDC는 서비스 트래픽을 현재 프라이머리에서 스탠바이 클러스터로 이동시키는 두 가지 방법을 제공합니다.</p>
<table>
<thead>
<tr><th>작업</th><th>다음과 같은 경우에 사용합니다</th><th>데이터 손실</th><th>예상 동작</th></tr>
</thead>
<tbody>
<tr><td><strong><a href="/docs/ko/cdc_switchover.md">스위치오버</a></strong></td><td>현재 주 서버에 여전히 접속할 수 있거나, 계획된 유지보수를 수행 중인 경우</td><td>RPO = 0</td><td>역할이 변경되기 전에 나머지 복제 데이터가 완료될 때까지 대기</td></tr>
<tr><td><strong><a href="/docs/ko/cdc_failover.md">페일오버</a></strong></td><td>현재 주 서버를 사용할 수 없으며 신속하게 복구할 수 없는 경우</td><td>가능</td><td>쓰기 작업이 재개될 수 있도록 스탠바이 노드를 즉시 승격시킵니다</td></tr>
</tbody>
</table>
<p>현재 프라이머리가 여전히 응답할 수 있는 경우에는 스위치오버를 사용합니다. 원래 프라이머리를 기다리는 것보다 가용성 복원이 더 중요한 경우에만 페일오버를 사용합니다.</p>
<h2 id="CDC-Lag-and-Why-It-Matters" class="common-anchor-header">CDC 지연 및 그 중요성<button data-href="#CDC-Lag-and-Why-It-Matters" class="anchor-icon" translate="no">
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
    </button></h2><p>CDC 지연이란 프라이머리 클러스터에 기록되었으나 아직 스탠바이 클러스터에 적용되지 않은 데이터의 양을 말합니다.</p>
<p>CDC 지연은 다음 두 가지 복구 옵션 모두에 영향을 미칩니다:</p>
<ul>
<li>스위치오버 중 CDC 지연이 적을수록 일반적으로 작업이 더 빨리 완료됩니다.</li>
<li>페일오버 시, CDC 지연은 원래의 주 클러스터를 사용할 수 없게 될 경우 손실될 수 있는 데이터 범위를 나타냅니다.</li>
</ul>
<p>CDC 지연을 지속적으로 모니터링하고 가능한 한 낮게 유지해야 합니다. <a href="/docs/ko/set_up_cdc_replication.md">‘CDC 복제 설정’</a> 페이지에는 CDC 지연을 추정하는 PromQL 예제가 포함되어 있습니다.</p>
<h2 id="Bulk-Import-in-CDC-Replication" class="common-anchor-header">CDC 복제에서의 대량 가져오기<button data-href="#Bulk-Import-in-CDC-Replication" class="anchor-icon" translate="no">
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
    </button></h2><p>CDC 복제 토폴로지에서 대량 가져오기는 ` <code translate="no">auto_commit=false</code>`와 함께 2단계 커밋(2PC) 모드를 사용해야 합니다. 가져오기 및 커밋 작업을 프라이머리 클러스터에서만 실행하고, 가져오기 파일이 프라이머리 및 스탠바이 클러스터 모두에서 사용 가능하도록 해야 합니다. 자세한 내용은 <a href="/docs/ko/bulk-import-in-cdc-replication.md">CDC 복제에서의 대량 가져오기를</a> 참조하십시오.</p>
<h2 id="Limitations" class="common-anchor-header">제한 사항<button data-href="#Limitations" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CDC에는 현재 다음과 같은 제한 사항이 있습니다.</p>
<ul>
<li><strong>단일 프라이머리</strong> 토폴로지만 지원합니다.</li>
<li>액티브-액티브(active-active) 또는 다중 프라이머리(multi-primary) 쓰기 기능은 <strong>지원하지</strong> 않습니다.</li>
<li>스탠바이 클러스터는 읽기 트래픽을 처리할 수 있지만, 스탠바이 상태로 유지되는 동안 직접 쓰기 요청은 거부합니다.</li>
<li>페일오버 시, 기존 주 클러스터에 기록되었으나 아직 대기 클러스터로 복제되지 않은 데이터가 손실될 수 있습니다.</li>
<li>구성된 채널 레이아웃( <code translate="no">pchannels</code> )은 각 클러스터의 실제 채널 레이아웃과 일치해야 합니다.</li>
</ul>
<h2 id="FAQ" class="common-anchor-header">자주 묻는 질문<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Can-a-standby-cluster-serve-queries" class="common-anchor-header">스탠바이 클러스터에서 쿼리를 처리할 수 있습니까?<button data-href="#Can-a-standby-cluster-serve-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>예. 스탠바이 클러스터는 읽기 트래픽을 처리할 수 있습니다. 그러나 프라이머리가 되기 전까지는 쓰기 요청을 수락할 수 없습니다.</p>
<h3 id="Does-Milvus-CDC-support-active-active-writes" class="common-anchor-header">Milvus CDC는 액티브-액티브 쓰기를 지원합니까?<button data-href="#Does-Milvus-CDC-support-active-active-writes" class="anchor-icon" translate="no">
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
    </button></h3><p>아니요. Milvus CDC는 단일 프라이머리 토폴로지를 위해 설계되었습니다. 여러 클러스터에 동시에 쓰기를 수행하면 스플릿 브레인 및 데이터 불일치가 발생할 수 있습니다.</p>
<h3 id="Does-switchover-lose-data" class="common-anchor-header">스위치오버 시 데이터가 손실되나요?<button data-href="#Does-switchover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>아니요. 스위치오버는 스탠바이 클러스터가 프라이머리 클러스터가 되기 전에 나머지 데이터가 복제되기를 기다립니다.</p>
<h3 id="Does-failover-lose-data" class="common-anchor-header">페일오버 시 데이터가 손실되나요?<button data-href="#Does-failover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>발생할 수 있습니다. 기존 프라이머리에 기록되었으나 아직 스탠바이로 복제되지 않은 데이터는 손실될 수 있습니다.</p>
<h3 id="How-much-data-can-be-lost-during-failover" class="common-anchor-header">페일오버 중에 얼마나 많은 데이터가 손실될 수 있나요?<button data-href="#How-much-data-can-be-lost-during-failover" class="anchor-icon" translate="no">
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
    </button></h3><p>잠재적인 데이터 손실량은 프라이머리가 사용 불가능해진 시점의 CDC 지연 시간 범위 내에서 발생합니다.</p>
