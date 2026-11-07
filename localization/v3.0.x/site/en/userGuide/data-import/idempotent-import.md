---
id: idempotent-import.md
order: 2
title: Idempotent Bulk Import
summary: >-
  Send an idempotency key so that a retried bulk import resolves to the original
  job instead of creating a second one.
---
<h1 id="Idempotent-Bulk-Import" class="common-anchor-header">Idempotent Bulk Import<button data-href="#Idempotent-Bulk-Import" class="anchor-icon" translate="no">
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
    </button></h1><p>A bulk import request can succeed while its response is lost: the call times out, the connection drops, or your orchestrator dies before it saves the returned <code translate="no">jobId</code>. You cannot tell “not done” from "done, reply lost". Retrying starts a second job and every row lands twice; not retrying may lose the import.</p>
<p>An idempotency key removes the choice. Tag the request with one, and a retry carrying the same key returns the original <code translate="no">jobId</code> instead of creating a second job.</p>
<p>Idempotent bulk import requires Milvus 3.0.2 or later, or 2.6.24 or later on the 2.6 line. An older server ignores the header and every request, retry or not, starts a new job.</p>
<h2 id="Sending-the-key" class="common-anchor-header">Sending the key<button data-href="#Sending-the-key" class="anchor-icon" translate="no">
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
    </button></h2><p>The key travels as the <code translate="no">Idempotency-Key</code> HTTP header, not in the request body.</p>
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
<p><code translate="no">IDEMPOTENCY_KEY_HEADER</code> is <code translate="no">&quot;Idempotency-Key&quot;</code>; the raw string works too. The <code translate="no">headers</code> parameter and <code translate="no">IDEMPOTENCY_KEY_HEADER</code> require pymilvus v3.0.3 or later on the 3.x line, or v2.6.18 or later on the 2.6 line. On an older pymilvus, the <code translate="no">import</code> line above fails with an <code translate="no">ImportError</code> at the <code translate="no">IDEMPOTENCY_KEY_HEADER</code> lookup, and passing <code translate="no">headers</code> to <code translate="no">bulk_import</code> has undefined behavior — the call may error, or the import may be submitted without the key.</p>
<p>Poll <code translate="no">/v2/vectordb/jobs/import/describe</code> with the returned <code translate="no">jobId</code> as usual. A retry that arrives while the original is still being registered waits for it, so a retry never observes a half-registered job.</p>
<h2 id="Choosing-a-key" class="common-anchor-header">Choosing a key<button data-href="#Choosing-a-key" class="anchor-icon" translate="no">
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
<li><strong>One key per logical request.</strong> Name the unit of work, such as <code translate="no">orders-2026-09-07-batch-3</code>, or generate a UUID and store it with the work item before you send the request. Include an attempt number if you may need to re-run the same work.</li>
<li><strong>Retry with the same key.</strong> Minting a new key on a retry is what duplicates data. The exceptions are listed under <a href="#when-to-send-a-new-key">When to send a new key</a>.</li>
<li><strong>Never reuse a key for different files.</strong> Milvus does not compare the two requests. You get the original <code translate="no">jobId</code> back, and the new files are not imported.</li>
<li><strong>Keep it short and printable.</strong> Printable ASCII, at most 256 bytes by default (<code translate="no">streaming.idempotency.maxKeyLength</code>). Anything else is rejected with error <code translate="no">1100</code>.</li>
<li><strong>Do not put secrets in it.</strong> The key is stored with your data.</li>
</ul>
<h2 id="How-long-a-key-is-remembered" class="common-anchor-header">How long a key is remembered<button data-href="#How-long-a-key-is-remembered" class="anchor-icon" translate="no">
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
    </button></h2><p>The key is scoped to the collection by its internal ID, so renaming the collection does not break a retry, as long as the retry names the collection by its new name. Dropping and recreating the collection under the same name does break it, and a fresh job is the right answer there.</p>
<p>Milvus remembers an import key for about a day. Treat that as nominal rather than guaranteed: heavy DDL or import traffic shortens it, and a coordinator restart lengthens it. A retry after the key is forgotten starts a fresh job.</p>
<h2 id="When-to-send-a-new-key" class="common-anchor-header">When to send a new key<button data-href="#When-to-send-a-new-key" class="anchor-icon" translate="no">
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
    </button></h2><p>Two cases, and only two:</p>
<ul>
<li><strong>The original job failed or was aborted.</strong> Describe returns <code translate="no">state: Failed</code> with a reason. Retrying the key returns that same <code translate="no">jobId</code> for as long as the key is remembered. Fix the cause, then send a new key.</li>
<li><strong>The original job was cleaned up.</strong> Milvus keeps finished jobs for <code translate="no">dataCoord.import.taskRetention</code> (48 hours by default). If that expires while the key is still remembered, the retry returns the old <code translate="no">jobId</code>, and describe answers with the error <code translate="no">import job does not exist</code> instead of a job state. That job may have succeeded. Confirm the data is missing before you send a new key.</li>
</ul>
<p>A retry that is rejected, for example because the import job limit is full, is not one of these cases. Retry it later with the same key.</p>
<h2 id="Configuration" class="common-anchor-header">Configuration<button data-href="#Configuration" class="anchor-icon" translate="no">
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
    </button></h2><p>Four parameters bound the behavior on this page. None of them needs changing for the key to work.</p>
<table>
<thead>
<tr><th>Parameter</th><th>Default</th><th>What it does</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxLifetime</code></td><td><code translate="no">24h</code></td><td>How long an import key is remembered. Not present in the default <code translate="no">milvus.yaml</code>; add it explicitly to change it. The same store also rejects duplicate DDL submissions, so do not lower it just to shorten the import window.</td></tr>
<tr><td><code translate="no">streaming.walBroadcaster.tombstone.maxCount</code></td><td><code translate="no">8192</code></td><td>How many keys and DDL records the same store holds before the oldest are dropped, whatever their age. This is what lets heavy DDL or import traffic forget a key before <code translate="no">maxLifetime</code>. Not present in the default <code translate="no">milvus.yaml</code>.</td></tr>
<tr><td><code translate="no">dataCoord.import.taskRetention</code></td><td><code translate="no">172800</code> (48 hours) since 2.6.24 and 3.0.2; <code translate="no">10800</code> before</td><td>How long a finished import job stays queryable. Keep it at least twice <code translate="no">maxLifetime</code>.</td></tr>
<tr><td><code translate="no">streaming.idempotency.maxKeyLength</code></td><td><code translate="no">256</code></td><td>The maximum key length in bytes. A longer key is rejected with error <code translate="no">1100</code>. <code translate="no">0</code> disables the bound. Not present in the default <code translate="no">milvus.yaml</code>.</td></tr>
</tbody>
</table>
<p>The <code translate="no">milvus.yaml</code> shipped before 2.6.24 and 3.0.2 sets <code translate="no">taskRetention: 10800</code> explicitly, and an upgrade does not override a value in your file. If you upgraded with that file, raise <code translate="no">taskRetention</code> to at least twice <code translate="no">maxLifetime</code>. The new value applies only to jobs that finish after the change.</p>
