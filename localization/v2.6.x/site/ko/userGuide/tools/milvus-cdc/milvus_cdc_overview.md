---
id: milvus_cdc_overview.md
summary: Milvus CDC는 기본 대기 상태의 재해 복구를 위해 Milvus 클러스터 간에 데이터 변경 사항을 복제합니다.
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
    </button></h1><p>Milvus CDC(변경 데이터 캡처)는 Milvus 클러스터 간에 데이터 변경 사항을 복제합니다. CDC를 사용하여 Milvus의 기본-대기 재해 복구 토폴로지를 구축할 수 있습니다.</p>
<p>기본-대기 토폴로지에서는 하나의 클러스터가 기본 역할을 하며 쓰기를 수락합니다. 하나 이상의 대기 클러스터는 기본 클러스터로부터 지속적으로 변경 사항을 수신하고 읽기 트래픽을 처리할 수 있습니다. 기본 클러스터를 사용할 수 없게 되거나 유지보수가 필요한 경우, 서비스 트래픽을 대기 클러스터로 전환할 수 있습니다.</p>
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
    </button></h2><p>일반적인 토폴로지는 다음과 같습니다:</p>
<ul>
<li><strong>기본 클러스터</strong>: 복제를 위한 소스 클러스터입니다. 읽기 및 쓰기를 허용합니다.</li>
<li><strong>대기 클러스터</strong>: 복제를 위한 대상 클러스터입니다. 주 클러스터로부터 변경 내용을 수신하며 대기 상태인 동안에는 읽기 전용입니다.</li>
<li><strong>CDC 노드</strong>: 현재 기본 클러스터에서 대기 클러스터로 WAL 변경 사항을 전달하는 Milvus 구성 요소입니다. 전환 또는 장애 조치 후 기본 클러스터가 될 수 있는 각 클러스터에 CDC를 배포합니다.</li>
<li><strong>복제 토폴로지</strong>: 클러스터-a -&gt; 클러스터-b와 같이 구성된 소스-대상 관계. 다음은 토폴로지에 대한 그림입니다. <span class="img-wrapper"> <img translate="no" src="/docs/v2.6.x/assets/cdc-overview.png" alt="CDC workflow" class="doc-image" id="cdc-workflow" /><span>CDC 워크플로우</span> </span></li>
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
    </button></h3><p>가장 일반적인 CDC 배포는 기본 1개와 대기 1개입니다:</p>
<pre><code translate="no" class="language-text">Application writes
      |
      v
Primary cluster A  -- CDC replication --&gt;  Standby cluster B
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CDC는 단일 프라이머리, 다중 대기 토폴로지도 지원합니다:</p>
<pre><code translate="no" class="language-text">Primary cluster A  -- CDC replication --&gt;  Standby cluster B
                  \-- CDC replication --&gt;  Standby cluster C
<button class="copy-code-btn"></button></code></pre>
<p>Milvus CDC는 두 개 이상의 클러스터가 동시에 쓰기 트래픽을 허용하는 멀티 프라이머리 또는 액티브-액티브 배포를 지원하지 않습니다.</p>
<h2 id="Primary-and-Standby-Behavior" class="common-anchor-header">기본 및 대기 동작<button data-href="#Primary-and-Standby-Behavior" class="anchor-icon" translate="no">
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
<tr><th>역할</th><th>Reads</th><th>쓰기</th><th>복제 동작</th></tr>
</thead>
<tbody>
<tr><td>기본</td><td>예</td><td>예</td><td>대기 클러스터에 변경 사항을 전송합니다.</td></tr>
<tr><td>대기</td><td>예</td><td>아니요</td><td>기본 클러스터에서 복제된 변경 내용을 수신합니다.</td></tr>
</tbody>
</table>
<p>대기 클러스터는 직접 쓰기 요청을 거부합니다. 이렇게 하면 브레인 분할을 방지하고 복제 토폴로지를 일관되게 유지할 수 있습니다.</p>
<h2 id="Planned-Switchover-vs-Failover" class="common-anchor-header">계획된 전환 대 페일오버<button data-href="#Planned-Switchover-vs-Failover" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus CDC는 현재 기본 클러스터에서 대기 클러스터로 서비스 트래픽을 이동하는 두 가지 방법을 제공합니다.</p>
<table>
<thead>
<tr><th>운영</th><th>다음 경우에 사용</th><th>데이터 손실</th><th>예상되는 동작</th></tr>
</thead>
<tbody>
<tr><td><strong><a href="/docs/ko/v2.6.x/cdc_switchover.md">전환</a></strong></td><td>현재 주 서버에 여전히 연결할 수 있거나 계획된 유지 관리를 수행 중입니다.</td><td>RPO = 0</td><td>역할이 변경되기 전에 나머지 복제된 데이터를 기다립니다.</td></tr>
<tr><td><strong><a href="/docs/ko/v2.6.x/cdc_failover.md">페일오버</a></strong></td><td>현재 프라이머리를 사용할 수 없으며 신속하게 복구할 수 없습니다.</td><td>가능</td><td>쓰기가 재개될 수 있도록 즉시 대기 상태로 전환합니다.</td></tr>
</tbody>
</table>
<p>현재 프라이머리가 여전히 응답할 수 있을 때마다 전환을 사용합니다. 원래 기본값을 기다리는 것보다 가용성을 복원하는 것이 더 중요한 경우에만 장애 조치를 사용합니다.</p>
<h2 id="CDC-Lag-and-Why-It-Matters" class="common-anchor-header">CDC 지연과 이것이 중요한 이유<button data-href="#CDC-Lag-and-Why-It-Matters" class="anchor-icon" translate="no">
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
    </button></h2><p>CDC 지연은 기본 클러스터에 기록되었지만 아직 대기 클러스터에 적용되지 않은 데이터의 양을 말합니다.</p>
<p>CDC 지연은 두 복구 옵션 모두에 영향을 줍니다:</p>
<ul>
<li>전환 중에는 일반적으로 CDC 지연이 낮을수록 작업이 더 빨리 완료됩니다.</li>
<li>장애 조치 중에 CDC 지연은 원래 기본 클러스터를 사용할 수 없는 경우 손실될 수 있는 데이터 창을 나타냅니다.</li>
</ul>
<p>CDC 지연을 지속적으로 모니터링하고 가능한 한 낮게 유지해야 합니다. CDC <a href="/docs/ko/v2.6.x/set_up_cdc_replication.md">복제 설정</a> 페이지에는 CDC 지연을 추정하기 위한 PromQL 예제가 포함되어 있습니다.</p>
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
    </button></h2><p>Milvus CDC에는 현재 다음과 같은 제한 사항이 있습니다:</p>
<ul>
<li><strong>단일 프라이머리</strong> 토폴로지만 지원합니다.</li>
<li>액티브-액티브 또는 멀티 프라이머리 쓰기는 지원하지 <strong>않습니다</strong>.</li>
<li>대기 클러스터는 읽기 트래픽을 처리할 수 있지만 대기 상태에서는 직접 쓰기를 거부합니다.</li>
<li>장애 조치로 인해 이전 프라이머리에 기록되었지만 아직 스탠바이에 복제되지 않은 데이터가 손실될 수 있습니다.</li>
<li>구성된 <code translate="no">pchannels</code> 은 각 클러스터의 실제 채널 레이아웃과 일치해야 합니다.</li>
</ul>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Can-a-standby-cluster-serve-queries" class="common-anchor-header">대기 클러스터에서 쿼리를 처리할 수 있나요?<button data-href="#Can-a-standby-cluster-serve-queries" class="anchor-icon" translate="no">
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
    </button></h3><p>예. 대기 클러스터는 읽기 트래픽을 처리할 수 있습니다. 기본 클러스터가 되기 전까지는 쓰기를 허용할 수 없습니다.</p>
<h3 id="Does-Milvus-CDC-support-active-active-writes" class="common-anchor-header">Milvus CDC는 액티브-액티브 쓰기를 지원하나요?<button data-href="#Does-Milvus-CDC-support-active-active-writes" class="anchor-icon" translate="no">
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
    </button></h3><p>아니요. Milvus CDC는 단일 프라이머리 토폴로지를 위해 설계되었습니다. 여러 클러스터에 동시에 쓰면 두뇌와 데이터가 분산될 수 있습니다.</p>
<h3 id="Does-switchover-lose-data" class="common-anchor-header">전환 시 데이터가 손실되나요?<button data-href="#Does-switchover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>아니요. 전환은 대기 상태가 기본 상태가 되기 전에 나머지 데이터가 복제될 때까지 기다립니다.</p>
<h3 id="Does-failover-lose-data" class="common-anchor-header">장애 조치로 인해 데이터가 손실되나요?<button data-href="#Does-failover-lose-data" class="anchor-icon" translate="no">
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
    </button></h3><p>손실될 수 있습니다. 이전 기본 데이터에 기록되었지만 아직 대기 데이터로 복제되지 않은 모든 데이터가 손실될 수 있습니다.</p>
<h3 id="How-much-data-can-be-lost-during-failover" class="common-anchor-header">장애 조치 중에 얼마나 많은 데이터가 손실될 수 있나요?<button data-href="#How-much-data-can-be-lost-during-failover" class="anchor-icon" translate="no">
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
    </button></h3><p>잠재적인 데이터 손실은 기본 계정을 사용할 수 없게 된 시점의 CDC 지연에 의해 제한됩니다.</p>
