---
id: idempotent-import.md
order: 2
title: 항등성 있는 일괄 가져오기
summary: '재시도되는 일괄 가져오기가 두 번째 작업을 생성하는 대신 원래 작업으로 처리되도록, 항등성 키를 전송하십시오.'
---
<h1 id="Idempotent-Bulk-Import" class="common-anchor-header">항등성 있는 일괄 가져오기<button data-href="#Idempotent-Bulk-Import" class="anchor-icon" translate="no">
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
    </button></h1><p>대량 가져오기 요청은 성공했음에도 응답이 손실될 수 있습니다. 즉, 호출이 시간 초과되거나, 연결이 끊기거나, 반환된 <code translate="no">jobId</code> 를 저장하기 전에 오케스트레이터가 종료될 수 있습니다. “완료되지 않음”과 “완료되었으나 응답 손실”을 구분할 수 없습니다. 재시도하면 두 번째 작업이 시작되어 모든 행이 두 번 처리되며, 재시도하지 않으면 가져오기 작업이 손실될 수 있습니다.</p>
<p>이멱포텐트 키를 사용하면 이러한 선택의 여지가 사라집니다. 요청에 이멱포텐트 키를 태그로 지정하면, 동일한 키를 가진 재시도 요청은 두 번째 작업을 생성하는 대신 원래의 ` <code translate="no">jobId</code> `를 반환합니다.</p>
<p>이멱포텐트 대량 가져오기를 사용하려면 Milvus 3.0.2 이상 또는 2.6 계열의 2.6.24 이상이 필요합니다. 이전 버전의 서버는 헤더를 무시하며, 재시도 여부와 관계없이 모든 요청이 새로운 작업을 시작합니다.</p>
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
```python
from pymilvus.bulk_writer import IDEMPOTENCY_KEY_HEADER, bulk_import
<p>resp = bulk_import(
url="http://localhost:19530",
collection_name="events",
files=[[“events/2026-09-07/part-0.parquet”]],
headers={IDEMPOTENCY_KEY_HEADER: "nightly-2026-09-07-batch-3"},
)
resp.json()[“data”][“jobId”]   # 재시도할 때마다 동일한 ID</p>
<pre><code translate="no">
`IDEMPOTENCY_KEY_HEADER` <span class="hljs-built_in">is</span> `<span class="hljs-string">&quot;Idempotency-Key&quot;</span>`; the raw <span class="hljs-type">string</span> works too. The `headers` parameter requires a recent pymilvus: v3.<span class="hljs-number">0.3</span> <span class="hljs-built_in">or</span> later <span class="hljs-keyword">on</span> the <span class="hljs-number">3</span>.x line, <span class="hljs-built_in">or</span> v2.<span class="hljs-number">6.18</span> <span class="hljs-built_in">or</span> later <span class="hljs-keyword">on</span> the <span class="hljs-number">2.6</span> line. Both were pending release <span class="hljs-keyword">when</span> this page was written. <span class="hljs-keyword">On</span> an older pymilvus, the `import` line above fails <span class="hljs-keyword">with</span> an `ImportError` at the `IDEMPOTENCY_KEY_HEADER` lookup, <span class="hljs-built_in">and</span> what passing `headers` <span class="hljs-keyword">to</span> `bulk_import` does <span class="hljs-built_in">is</span> undefined — the <span class="hljs-keyword">call</span> may <span class="hljs-keyword">error</span>, <span class="hljs-built_in">or</span> the import may be submitted without the <span class="hljs-keyword">key</span>. Check your pymilvus version before relying <span class="hljs-keyword">on</span> the <span class="hljs-keyword">key</span>.

Poll `/v2/vectordb/jobs/import/describe` <span class="hljs-keyword">with</span> the returned `jobId` <span class="hljs-keyword">as</span> usual. A retry that arrives <span class="hljs-keyword">while</span> the original <span class="hljs-built_in">is</span> still being registered waits <span class="hljs-keyword">for</span> it, so a retry never observes a half-registered job.

## Choosing a <span class="hljs-keyword">key</span>

- **One <span class="hljs-keyword">key</span> per logical request.** Name the unit <span class="hljs-keyword">of</span> work, such <span class="hljs-keyword">as</span> `orders-<span class="hljs-number">2026</span>-<span class="hljs-number">09</span>-<span class="hljs-number">07</span>-batch-<span class="hljs-number">3</span>`, <span class="hljs-built_in">or</span> generate a UUID <span class="hljs-built_in">and</span> store it <span class="hljs-keyword">with</span> the work item before you send the request. Include an attempt number <span class="hljs-keyword">if</span> you may need <span class="hljs-keyword">to</span> re-run the same work.
- **Retry <span class="hljs-keyword">with</span> the same <span class="hljs-keyword">key</span>.** Minting a <span class="hljs-built_in">new</span> <span class="hljs-keyword">key</span> <span class="hljs-keyword">on</span> a retry <span class="hljs-built_in">is</span> what duplicates data. The exceptions are listed under [<span class="hljs-keyword">When</span> <span class="hljs-keyword">to</span> send a <span class="hljs-built_in">new</span> <span class="hljs-keyword">key</span>](#<span class="hljs-keyword">when</span>-<span class="hljs-keyword">to</span>-send-a-<span class="hljs-built_in">new</span>-<span class="hljs-keyword">key</span>).
- **Never reuse a <span class="hljs-keyword">key</span> <span class="hljs-keyword">for</span> different files.** Milvus does <span class="hljs-built_in">not</span> <span class="hljs-keyword">compare</span> the two requests. You <span class="hljs-keyword">get</span> the original `jobId` back, <span class="hljs-built_in">and</span> the <span class="hljs-built_in">new</span> files are <span class="hljs-built_in">not</span> imported.
- **Keep it <span class="hljs-type">short</span> <span class="hljs-built_in">and</span> printable.** Printable ASCII, at most <span class="hljs-number">256</span> bytes <span class="hljs-keyword">by</span> <span class="hljs-keyword">default</span> (`streaming.idempotency.maxKeyLength`). Anything <span class="hljs-keyword">else</span> <span class="hljs-built_in">is</span> rejected <span class="hljs-keyword">with</span> <span class="hljs-keyword">error</span> `<span class="hljs-number">1100</span>`.
- **<span class="hljs-keyword">Do</span> <span class="hljs-built_in">not</span> put secrets <span class="hljs-keyword">in</span> it.** The <span class="hljs-keyword">key</span> <span class="hljs-built_in">is</span> stored <span class="hljs-keyword">with</span> your data.

## How <span class="hljs-type">long</span> a <span class="hljs-keyword">key</span> <span class="hljs-built_in">is</span> remembered

The <span class="hljs-keyword">key</span> <span class="hljs-built_in">is</span> scoped <span class="hljs-keyword">to</span> the collection <span class="hljs-keyword">by</span> its internal ID, so renaming the collection does <span class="hljs-built_in">not</span> break a retry, <span class="hljs-keyword">as</span> <span class="hljs-type">long</span> <span class="hljs-keyword">as</span> the retry names the collection <span class="hljs-keyword">by</span> its <span class="hljs-built_in">new</span> name. Dropping <span class="hljs-built_in">and</span> recreating the collection under the same name does break it, <span class="hljs-built_in">and</span> a fresh job <span class="hljs-built_in">is</span> the right answer there.

Milvus remembers an import <span class="hljs-keyword">key</span> <span class="hljs-keyword">for</span> about a day. Treat that <span class="hljs-keyword">as</span> nominal rather than guaranteed: heavy DDL <span class="hljs-built_in">or</span> import traffic shortens it, <span class="hljs-built_in">and</span> a coordinator restart lengthens it. A retry after the <span class="hljs-keyword">key</span> <span class="hljs-built_in">is</span> forgotten starts a fresh job.

## <span class="hljs-keyword">When</span> <span class="hljs-keyword">to</span> send a <span class="hljs-built_in">new</span> <span class="hljs-keyword">key</span>

Two cases, <span class="hljs-built_in">and</span> only two:

- **The original job failed <span class="hljs-built_in">or</span> was aborted.** Describe returns `state: Failed` <span class="hljs-keyword">with</span> a reason. Retrying the <span class="hljs-keyword">key</span> returns that same `jobId` <span class="hljs-keyword">for</span> <span class="hljs-keyword">as</span> <span class="hljs-type">long</span> <span class="hljs-keyword">as</span> the <span class="hljs-keyword">key</span> <span class="hljs-built_in">is</span> remembered. Fix the cause, <span class="hljs-keyword">then</span> send a <span class="hljs-built_in">new</span> <span class="hljs-keyword">key</span>.
- **The original job was cleaned up.** Milvus keeps finished jobs <span class="hljs-keyword">for</span> `dataCoord.import.taskRetention` (<span class="hljs-number">48</span> hours <span class="hljs-keyword">by</span> <span class="hljs-keyword">default</span>). <span class="hljs-keyword">If</span> that expires <span class="hljs-keyword">while</span> the <span class="hljs-keyword">key</span> <span class="hljs-built_in">is</span> still remembered, the retry returns the old `jobId`, <span class="hljs-built_in">and</span> describe answers <span class="hljs-keyword">with</span> the <span class="hljs-keyword">error</span> `import job does <span class="hljs-built_in">not</span> exist` instead <span class="hljs-keyword">of</span> a job state. That job may have succeeded. Confirm the data <span class="hljs-built_in">is</span> missing before you send a <span class="hljs-built_in">new</span> <span class="hljs-keyword">key</span>.

A retry that <span class="hljs-built_in">is</span> rejected, <span class="hljs-keyword">for</span> example because the import job limit <span class="hljs-built_in">is</span> full, <span class="hljs-built_in">is</span> <span class="hljs-built_in">not</span> one <span class="hljs-keyword">of</span> these cases. Retry it later <span class="hljs-keyword">with</span> the same <span class="hljs-keyword">key</span>.

## Configuration

Four parameters bound the behavior <span class="hljs-keyword">on</span> this page. None <span class="hljs-keyword">of</span> them needs changing <span class="hljs-keyword">for</span> the <span class="hljs-keyword">key</span> <span class="hljs-keyword">to</span> work.

| Parameter | <span class="hljs-keyword">Default</span> | What it does |
|---|---|---|
| `streaming.walBroadcaster.tombstone.maxLifetime` | `<span class="hljs-number">24</span>h` | How <span class="hljs-type">long</span> an import <span class="hljs-keyword">key</span> <span class="hljs-built_in">is</span> remembered. <span class="hljs-built_in">Not</span> present <span class="hljs-keyword">in</span> the <span class="hljs-keyword">default</span> `milvus.yaml`; add it explicitly <span class="hljs-keyword">to</span> change it. The same store also rejects duplicate DDL submissions, so <span class="hljs-keyword">do</span> <span class="hljs-built_in">not</span> lower it just <span class="hljs-keyword">to</span> shorten the import window. |
| `streaming.walBroadcaster.tombstone.maxCount` | `<span class="hljs-number">8192</span>` | How many keys <span class="hljs-built_in">and</span> DDL records the same store holds before the oldest are dropped, whatever their age. This <span class="hljs-built_in">is</span> what lets heavy DDL <span class="hljs-built_in">or</span> import traffic forget a <span class="hljs-keyword">key</span> before `maxLifetime`. <span class="hljs-built_in">Not</span> present <span class="hljs-keyword">in</span> the <span class="hljs-keyword">default</span> `milvus.yaml`. |
| `dataCoord.import.taskRetention` | `<span class="hljs-number">172800</span>` (<span class="hljs-number">48</span> hours) since <span class="hljs-number">2.6</span>.<span class="hljs-number">24</span> <span class="hljs-built_in">and</span> <span class="hljs-number">3.0</span>.<span class="hljs-number">2</span>; `<span class="hljs-number">10800</span>` before | How <span class="hljs-type">long</span> a finished import job stays queryable. Keep it at least twice `maxLifetime`. |
| `streaming.idempotency.maxKeyLength` | `<span class="hljs-number">256</span>` | The maximum <span class="hljs-keyword">key</span> length <span class="hljs-keyword">in</span> bytes. A longer <span class="hljs-keyword">key</span> <span class="hljs-built_in">is</span> rejected <span class="hljs-keyword">with</span> <span class="hljs-keyword">error</span> `<span class="hljs-number">1100</span>`. `<span class="hljs-number">0</span>` disables the bound. <span class="hljs-built_in">Not</span> present <span class="hljs-keyword">in</span> the <span class="hljs-keyword">default</span> `milvus.yaml`. |

The `milvus.yaml` shipped before <span class="hljs-number">2.6</span>.<span class="hljs-number">24</span> <span class="hljs-built_in">and</span> <span class="hljs-number">3.0</span>.<span class="hljs-number">2</span> sets `taskRetention: <span class="hljs-number">10800</span>` explicitly, <span class="hljs-built_in">and</span> an upgrade does <span class="hljs-built_in">not</span> override a value <span class="hljs-keyword">in</span> your file. <span class="hljs-keyword">If</span> you upgraded <span class="hljs-keyword">with</span> that file, raise `taskRetention` <span class="hljs-keyword">to</span> at least twice `maxLifetime`. The <span class="hljs-built_in">new</span> value applies only <span class="hljs-keyword">to</span> jobs that finish after the change.
<button class="copy-code-btn"></button></code></pre>
