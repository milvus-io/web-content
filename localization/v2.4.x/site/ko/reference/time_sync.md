---
id: time_sync.md
title: 시간 동기화
summary: Milvus의 시간 동기화 시스템에 대해 알아보세요.
---
<h1 id="Time-Synchronization" class="common-anchor-header">시간 동기화<button data-href="#Time-Synchronization" class="anchor-icon" translate="no">
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
    </button></h1><p>이 주제에서는 Milvus의 시간 동기화 메커니즘에 대해 소개합니다.</p>
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
    </button></h2><p>Milvus의 이벤트는 일반적으로 두 가지 유형으로 분류할 수 있습니다:</p>
<ul>
<li><p>데이터 정의 언어(DDL) 이벤트: 컬렉션 생성/삭제, 파티션 생성/삭제 등.</p></li>
<li><p>데이터 조작 언어(DML) 이벤트: 삽입, 검색 등.</p></li>
</ul>
<p>모든 이벤트에는 DDL 이벤트이든 DML 이벤트이든 관계없이 이 이벤트가 언제 발생했는지 알 수 있는 타임스탬프가 표시되어 있습니다.</p>
<p>다음 표에 표시된 시간 순서대로 Milvus에서 일련의 DML 및 DDL 이벤트를 시작하는 두 명의 사용자가 있다고 가정해 보겠습니다.</p>
<table>
<thead>
<tr><th style="text-align:center">타임스탬프</th><th style="text-align:center">사용자 1</th><th style="text-align:center">사용자 2</th></tr>
</thead>
<tbody>
<tr><td style="text-align:center">t0</td><td style="text-align:center"><code translate="no">C0</code> 라는 이름의 컬렉션을 만들었습니다.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t2</td><td style="text-align:center">/</td><td style="text-align:center">컬렉션에서 검색 수행 <code translate="no">C0</code>.</td></tr>
<tr><td style="text-align:center">t5</td><td style="text-align:center">컬렉션에 데이터 <code translate="no">A1</code> 삽입 <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t7</td><td style="text-align:center">/</td><td style="text-align:center">컬렉션에 대한 검색 수행 <code translate="no">C0</code>.</td></tr>
<tr><td style="text-align:center">t10</td><td style="text-align:center">컬렉션에 데이터 <code translate="no">A2</code> 삽입 <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t12</td><td style="text-align:center">/</td><td style="text-align:center">컬렉션에 대한 검색 수행 <code translate="no">C0</code></td></tr>
<tr><td style="text-align:center">t15</td><td style="text-align:center">컬렉션에서 데이터 <code translate="no">A1</code> 삭제 <code translate="no">C0</code>.</td><td style="text-align:center">/</td></tr>
<tr><td style="text-align:center">t17</td><td style="text-align:center">/</td><td style="text-align:center">컬렉션에서 검색 수행 <code translate="no">C0</code></td></tr>
</tbody>
</table>
<p>이상적으로는 사용자 2가 볼 수 있어야 합니다:</p>
<ul>
<li><p>빈 컬렉션 <code translate="no">C0</code> <code translate="no">t2</code> .</p></li>
<li><p><code translate="no">t7</code> 에서 데이터 <code translate="no">A1</code>.</p></li>
<li><p><code translate="no">t12</code> 에서 <code translate="no">A1</code> 및 <code translate="no">A2</code> 데이터 모두</p></li>
<li><p><code translate="no">t17</code> 의 <code translate="no">A2</code> 데이터만(이 시점 이전에 <code translate="no">A1</code> 데이터가 컬렉션에서 삭제되었으므로).</p></li>
</ul>
<p>이 이상적인 시나리오는 노드가 하나만 있을 때 쉽게 달성할 수 있습니다. 그러나 Milvus는 분산 벡터 데이터베이스이므로 서로 다른 노드에서 모든 DML 및 DDL 작업이 순서대로 유지되도록 하려면 Milvus는 다음 두 가지 문제를 해결해야 합니다:</p>
<ol>
<li><p>위의 예에서 두 사용자가 서로 다른 노드에 있는 경우 시간 시계가 다릅니다. 예를 들어 사용자 2가 사용자 1보다 24시간 늦으면 사용자 1의 모든 작업은 다음 날까지 사용자 2에게 표시되지 않습니다.</p></li>
<li><p>네트워크 지연이 발생할 수 있습니다. 사용자 2가 <code translate="no">t17</code> 에서 컬렉션 <code translate="no">C0</code> 에 대한 검색을 수행하는 경우, Milvus는 <code translate="no">t17</code> 이전의 모든 작업이 성공적으로 처리되고 완료되었음을 보장할 수 있어야 합니다. 네트워크 지연으로 인해 <code translate="no">t15</code> 에서의 삭제 작업이 지연되는 경우, 사용자 2가 <code translate="no">t17</code> 에서 검색을 수행할 때 삭제된 것으로 추정되는 데이터 <code translate="no">A1</code> 를 볼 수 있을 가능성이 매우 높습니다.</p></li>
</ol>
<p>따라서 밀버스는 이 문제를 해결하기 위해 시간 동기화 시스템(타임틱)을 채택하고 있습니다.</p>
<h2 id="Timestamp-oracle-TSO" class="common-anchor-header">타임스탬프 오라클(TSO)<button data-href="#Timestamp-oracle-TSO" class="anchor-icon" translate="no">
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
    </button></h2><p>이전 섹션에서 언급한 첫 번째 문제를 해결하기 위해 Milvus는 다른 분산 시스템과 마찬가지로 타임스탬프 오라클(TSO) 서비스를 제공합니다. 즉, Milvus의 모든 이벤트는 로컬 시계가 아닌 TSO의 타임스탬프를 할당받아야 합니다.</p>
<p>TSO 서비스는 Milvus의 루트 코디네이터가 제공합니다. 클라이언트는 한 번의 타임스탬프 할당 요청으로 하나 이상의 타임스탬프를 할당할 수 있습니다.</p>
<p>TSO 타임스탬프는 물리적 부분과 논리적 부분으로 구성된 <code translate="no">uint64</code> 값의 한 유형입니다. 아래 그림은 타임스탬프의 형식을 보여줍니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/TSO_Timestamp.png" alt="TSO_Timestamp" class="doc-image" id="tso_timestamp" />
   </span> <span class="img-wrapper"> <span>TSO_타임스탬프</span>. </span></p>
<p>그림에서 보듯이 처음의 46비트는 물리적 부분, 즉 UTC 시간(밀리초)입니다. 마지막 18비트는 논리적 부분입니다.</p>
<h2 id="Time-synchronization-system-timetick" class="common-anchor-header">시간 동기화 시스템(타임틱)<button data-href="#Time-synchronization-system-timetick" class="anchor-icon" translate="no">
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
    </button></h2><p>이 섹션에서는 데이터 삽입 작업의 예를 사용하여 Milvus의 시간 동기화 메커니즘을 설명합니다.</p>
<p>프록시는 SDK로부터 데이터 삽입 요청을 받으면 기본 키의 해시값에 따라 삽입 메시지를 여러 개의 메시지 스트림(<code translate="no">MsgStream</code>)으로 나눕니다.</p>
<p>각 삽입 메시지(<code translate="no">InsertMsg</code>)는 <code translate="no">MsgStream</code> 으로 전송되기 전에 타임스탬프가 할당됩니다.</p>
<div class="alert note">
  <code translate="no">MsgStream</code> 는 메시지 대기열의 래퍼로, Milvus 2.0에서는 기본적으로 Pulsar입니다.</div>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/timesync_proxy_insert_msg.png" alt="timesync_proxy_insert_msg" class="doc-image" id="timesync_proxy_insert_msg" />
   </span> <span class="img-wrapper"> <span>timesync_proxy_insert_msg</span> </span></p>
<p>한 가지 일반적인 원칙은 <code translate="no">MsgStream</code> 에서 동일한 프록시에서<code translate="no">InsertMsgs</code> 의 타임스탬프는 증분형이어야 한다는 것입니다. 그러나 다른 프록시의 <code translate="no">InsertMsgs</code> 에는 이러한 규칙이 없습니다.</p>
<p>다음 그림은 <code translate="no">MsgStream</code> 의 <code translate="no">InsertMsgs</code> 의 예입니다. 이 스니펫에는 5개의 <code translate="no">InsertMsgs</code> 이 포함되어 있으며, 이 중 3개는 <code translate="no">Proxy1</code> 에서, 나머지는 <code translate="no">Proxy2</code> 에서 가져온 것입니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/msgstream.png" alt="msgstream" class="doc-image" id="msgstream" />
   </span> <span class="img-wrapper"> <span>msgstream</span> </span></p>
<p><code translate="no">Proxy1</code> 의 <code translate="no">InsertMsgs</code> 세 개의 타임스탬프는 증분형이며 <code translate="no">Proxy2</code> 의 <code translate="no">InsertMsgs</code> 두 개도 마찬가지입니다. 그러나 <code translate="no">Proxy1</code> 와 <code translate="no">Proxy2</code> <code translate="no">InsertMsgs</code> 사이에는 특별한 순서가 없습니다.</p>
<p>한 가지 가능한 시나리오는 <code translate="no">Proxy2</code> 에서 타임스탬프가 <code translate="no">110</code> 인 메시지를 읽을 때 <code translate="no">Proxy1</code> 에서 타임스탬프가 <code translate="no">80</code> 인 메시지가 아직 <code translate="no">MsgStream</code> 에 있는 것을 발견하는 것입니다. 따라서 Milvus는 시간 동기화 시스템인 timetick을 도입하여 <code translate="no">MsgStream</code> 에서 메시지를 읽을 때 타임스탬프 값이 작은 메시지를 모두 소비해야 합니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/time_synchronization.png" alt="time_synchronization" class="doc-image" id="time_synchronization" />
   </span> <span class="img-wrapper"> <span>time_synchronization</span> </span></p>
<p>위 그림과 같이,</p>
<ul>
<li><p>각 프록시는 주기적으로(기본값은 200ms마다) <code translate="no">MsgStream</code>에서 가장 최근의 <code translate="no">InsertMsg</code> 의 가장 큰 타임스탬프 값을 루트 코드로 보고합니다.</p></li>
<li><p>루트 코드는 <code translate="no">InsertMsgs</code> 이 속한 프록시에 관계없이 이 <code translate="no">Msgstream</code> 에서 최소 타임스탬프 값을 식별합니다. 그런 다음 루트 코드는 이 최소 타임스탬프를 <code translate="no">Msgstream</code> 에 삽입합니다. 이 타임스탬프를 타임틱이라고도 합니다.</p></li>
<li><p>소비자 컴포넌트는 루트 코디가 삽입한 타임스탬프를 읽으면 타임스탬프 값이 더 작은 모든 삽입 메시지가 소비되었음을 이해합니다. 따라서 주문을 중단하지 않고 관련 요청을 안전하게 실행할 수 있습니다.</p></li>
</ul>
<p>다음 그림은 타임틱이 삽입된 <code translate="no">Msgstream</code> 의 예시입니다.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.4.x/assets/timetick.png" alt="timetick" class="doc-image" id="timetick" />
   </span> <span class="img-wrapper"> <span>timetick</span> </span></p>
<p><code translate="no">MsgStream</code> 은 타임틱에 따라 메시지를 일괄 처리하여 출력 메시지가 타임스탬프의 요구 사항을 충족하는지 확인합니다.</p>
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
<li><a href="/docs/ko/v2.4.x/timestamp.md">타임스탬프의</a> 개념에 대해 알아보세요.</li>
<li>Milvus의 <a href="/docs/ko/v2.4.x/data_processing.md">데이터 처리 워크플로우에</a> 대해 알아보세요.</li>
</ul>
