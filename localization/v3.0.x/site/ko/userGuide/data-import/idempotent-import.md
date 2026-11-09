---
id: idempotent-import.md
order: 2
title: 항등적 대량 가져오기
summary: '재시도되는 일괄 가져오기가 두 번째 작업을 생성하는 대신 원래 작업으로 처리되도록, 항등성 키를 전송하십시오.'
---
<h1 id="Idempotent-Bulk-Import" class="common-anchor-header">항등적 대량 가져오기<button data-href="#Idempotent-Bulk-Import" class="anchor-icon" translate="no">
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
    </button></h1><p>대량 가져오기 요청은 성공했음에도 응답이 손실될 수 있습니다. 즉, 호출이 타임아웃되거나, 연결이 끊기거나, 반환된 <code translate="no">jobId</code> 를 저장하기 전에 오케스트레이터가 종료될 수 있습니다. “완료되지 않음”과 “완료되었으나 응답 손실”을 구분할 수 없습니다. 재시도하면 두 번째 작업이 시작되어 모든 행이 두 번 처리되며, 재시도하지 않으면 가져오기 작업이 손실될 수 있습니다.</p>
<p>항등성 키를 사용하면 이러한 선택의 여지가 사라집니다. 요청에 항등성 키를 태그로 지정하면, 동일한 키를 가진 재시도 요청은 두 번째 작업을 생성하는 대신 원래의 ` <code translate="no">jobId</code> `를 반환합니다.</p>
<p>이멱포텐트 일괄 가져오기를 사용하려면 Milvus 3.0.2 이상 또는 2.6 계열의 2.6.24 이상이 필요합니다. 이전 버전의 서버는 헤더를 무시하며, 재시도 여부와 관계없이 모든 요청이 새로운 작업을 시작합니다.</p>
<h2 id="Sending-the-key" class="common-anchor-header">키 전송<button data-href="#Sending-the-key" class="anchor-icon" translate="no">
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
    </button></h2><p>키는 요청 본문이 아닌 <code translate="no">Idempotency-Key</code> HTTP 헤더로 전송됩니다.</p>
<pre><code translate="no" class="language-bash">curl -X POST <span class="hljs-string">&quot;http://localhost:19530/v2/vectordb/jobs/import/create&quot;</span> \
  -H <span class="hljs-string">&quot;Authorization: Bearer root:Milvus&quot;</span> \
  -H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  -H <span class="hljs-string">&quot;Idempotency-Key: nightly-2026-09-07-batch-3&quot;</span> \
  -d <span class="hljs-string">&#x27;{&quot;collectionName&quot;: &quot;events&quot;, &quot;files&quot;: [[&quot;events/2026-09-07/part-0.parquet&quot;]]}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<!-- TODO: the `headers` parameter and `IDEMPOTENCY_KEY_HEADER` are merged but not released: milvus-io/pymilvus#3784 (master), milvus-io/pymilvus#3807 (3.0), milvus-io/pymilvus#3808 (2.6). They are expected in pymilvus v3.0.3 and v2.6.18. After those tags exist, verify this example against the released API. -->
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus.bulk_writer <span class="hljs-keyword">import</span> IDEMPOTENCY_KEY_HEADER, bulk_import

resp = bulk_import(
    url=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    collection_name=<span class="hljs-string">&quot;events&quot;</span>,
    files=[[<span class="hljs-string">&quot;events/2026-09-07/part-0.parquet&quot;</span>]],
    headers={IDEMPOTENCY_KEY_HEADER: <span class="hljs-string">&quot;nightly-2026-09-07-batch-3&quot;</span>},
)
resp.json()[<span class="hljs-string">&quot;data&quot;</span>][<span class="hljs-string">&quot;jobId&quot;</span>]   <span class="hljs-comment"># the same id on every retry</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">IDEMPOTENCY_KEY_HEADER</code> <code translate="no">&quot;Idempotency-Key&quot;</code> 이며, 원시 문자열도 작동합니다. 매개변수와 는 3.x 계열의 경우 pymilvus v3.0.3 이상, 2.6 계열의 경우 v2.6.18 이상이 필요합니다. 구버전 pymilvus에서는 위의 줄이 조회 시 ‘ ’ 오류로 실패하며, 를 에 전달할 경우 정의되지 않은 동작이 발생합니다. 즉, 호출 시 오류가 발생하거나 키가 누락된 상태로 임포트가 수행될 수 있습니다. <code translate="no">headers</code> <code translate="no">IDEMPOTENCY_KEY_HEADER</code> <code translate="no">import</code> <code translate="no">IDEMPOTENCY_KEY_HEADER</code> <code translate="no">ImportError</code> <code translate="no">headers</code> <code translate="no">bulk_import</code> </p>
<p>평소와 같이 반환된 <code translate="no">jobId</code> 을 사용하여 <code translate="no">/v2/vectordb/jobs/import/describe</code> 을 폴링합니다. 원래 작업이 아직 등록 중인 상태에서 재시도 요청이 도착하면 해당 요청을 기다리므로, 재시도 요청은 절대로 부분적으로만 등록된 작업을 감지하지 않습니다.</p>
<h2 id="Choosing-a-key" class="common-anchor-header">키 선택<button data-href="#Choosing-a-key" class="anchor-icon" translate="no">
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
<li><strong>논리적 요청당 하나의 키를 사용합니다.</strong> <code translate="no">orders-2026-09-07-batch-3</code> 과 같이 작업 단위의 이름을 지정하거나, 요청을 보내기 전에 UUID를 생성하여 작업 항목과 함께 저장하십시오. 동일한 작업을 다시 실행해야 할 경우를 대비하여 시도 번호를 포함시키십시오.</li>
<li><strong>동일한 키로 재시도하십시오.</strong> 재시도 시 새로운 키를 생성하면 데이터가 중복됩니다. 예외 사항은 <a href="#when-to-send-a-new-key">‘새로운 키를 보내야 하는 경우’</a> 항목에 나열되어 있습니다.</li>
<li><strong>다른 파일에 대해 동일한 키를 절대 재사용하지 마십시오.</strong> Milvus는 두 요청을 비교하지 않습니다. 원래의 <code translate="no">jobId</code> 파일이 반환되며, 새로운 파일은 가져오지 않습니다.</li>
<li><strong>키를 짧고 인쇄 가능한 형식으로 유지하십시오.</strong> 기본적으로 인쇄 가능한 ASCII 문자열로, 최대 256바이트입니다(<code translate="no">streaming.idempotency.maxKeyLength</code>). 이 외의 형식은 오류 <code translate="no">1100</code> 와 함께 거부됩니다.</li>
<li><strong>비밀 정보를 포함하지 마십시오.</strong> 키는 데이터와 함께 저장됩니다.</li>
</ul>
<h2 id="How-long-a-key-is-remembered" class="common-anchor-header">키가 기억되는 기간<button data-href="#How-long-a-key-is-remembered" class="anchor-icon" translate="no">
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
    </button></h2><p>키의 범위는 내부 ID를 통해 컬렉션에 한정되므로, 재시도 시 컬렉션을 새 이름으로 지정하는 한 컬렉션 이름을 변경해도 재시도가 중단되지 않습니다. 그러나 동일한 이름으로 컬렉션을 삭제하고 다시 생성하면 재시도가 중단되며, 이 경우 새로운 작업을 시작하는 것이 올바른 해결책입니다.</p>
<p>Milvus는 임포트 키를 약 하루 동안 기억합니다. 이는 보장된 기간이라기보다는 대략적인 기준으로 간주하십시오. DDL 작업이나 임포트 트래픽이 많으면 이 기간이 단축되고, 코디네이터를 재시작하면 기간이 연장됩니다. 키가 잊혀진 후 재시도하면 새로운 작업이 시작됩니다.</p>
<h2 id="When-to-send-a-new-key" class="common-anchor-header">새로운 키를 전송해야 하는 경우<button data-href="#When-to-send-a-new-key" class="anchor-icon" translate="no">
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
    </button></h2><p>두 가지 경우, 오직 두 가지뿐입니다:</p>
<ul>
<li><strong>원래 작업이 실패했거나 중단된 경우입니다.</strong> `Describe` 명령어는 이유를 포함한 ` <code translate="no">state: Failed</code> `를 반환합니다. 키가 기억되는 동안 해당 키로 재시도하면 동일한 ` <code translate="no">jobId</code> `가 반환됩니다. 원인을 해결한 후 새 키를 전송하십시오.</li>
<li><strong>원본 작업이 정리된 경우.</strong> Milvus는 완료된 작업을 <code translate="no">dataCoord.import.taskRetention</code> (기본값 48시간) 동안 보관합니다. 키가 여전히 기억되는 동안 이 기간이 만료되면, 재시도 시 이전의 <code translate="no">jobId</code> 가 반환되며, describe 명령어는 작업 상태 대신 <code translate="no">import job does not exist</code> 오류를 반환합니다. 해당 작업은 성공했을 수도 있습니다. 새 키를 전송하기 전에 데이터가 누락되었는지 확인하십시오.</li>
</ul>
<p>예를 들어, 가져오기 작업 한도에 도달하여 재시도가 거부된 경우는 이러한 경우에 해당하지 않습니다. 나중에 동일한 키를 사용하여 다시 시도하십시오.</p>
<h2 id="Configuration" class="common-anchor-header">구성<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>이 페이지의 동작은 네 가지 매개변수에 의해 결정됩니다. 키가 작동하기 위해 이 중 어느 것도 변경할 필요가 없습니다.</p>
<table>
<thead>
<tr><th>매개변수</th><th>기본값</th><th>기능</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxLifetime</code></td><td><code translate="no">24h</code></td><td>가져오기 키가 기억되는 기간입니다. 기본값인 ` <code translate="no">milvus.yaml</code>`에는 포함되어 있지 않으므로, 변경하려면 명시적으로 추가해야 합니다. 해당 스토어는 중복 DDL 제출도 거부하므로, 단순히 가져오기 기간을 단축하기 위해 이 값을 낮추지 마십시오.</td></tr>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxCount</code></td><td><code translate="no">8192</code></td><td>동일한 저장소가 가장 오래된 키를 삭제하기 전에 보유할 수 있는 키 및 DDL 레코드의 수입니다(레코드의 생성 시점과 무관함). 이 설정 덕분에 DDL 또는 가져오기 트래픽이 많은 경우에도 <code translate="no">maxLifetime</code> 이전에 키가 잊혀지게 됩니다. 기본값인 <code translate="no">milvus.yaml</code> 에는 이 매개변수가 포함되어 있지 않습니다.</td></tr>
<tr><td><code translate="no">dataCoord.import.taskRetention</code></td><td><code translate="no">172800</code> (48시간) 2.6.24 및 3.0.2 버전부터; <code translate="no">10800</code> 이전</td><td>완료된 가져오기 작업이 쿼리 가능한 상태로 유지되는 기간입니다. 이 값은 <code translate="no">maxLifetime</code> 값의 최소 두 배로 설정해야 합니다.</td></tr>
<tr><td><code translate="no">streaming.idempotency.maxKeyLength</code></td><td><code translate="no">256</code></td><td>바이트 단위의 최대 키 길이입니다. 이보다 긴 키는 오류 <code translate="no">1100</code> 와 함께 거부됩니다. <code translate="no">0</code> 는 이 제한을 비활성화합니다. 기본값인 <code translate="no">milvus.yaml</code> 에는 포함되어 있지 않습니다.</td></tr>
</tbody>
</table>
<p>2.6.24 및 3.0.2 이전에 배포된 <code translate="no">milvus.yaml</code> 파일은 <code translate="no">taskRetention: 10800</code> 를 명시적으로 설정하며, 업그레이드 시 해당 파일의 값은 덮어쓰지 않습니다. 해당 파일을 사용하여 업그레이드한 경우, <code translate="no">taskRetention</code> 를 최소 2배 이상 <code translate="no">maxLifetime</code> 로 늘리십시오. 새로운 값은 변경 후 완료되는 작업에만 적용됩니다.</p>
