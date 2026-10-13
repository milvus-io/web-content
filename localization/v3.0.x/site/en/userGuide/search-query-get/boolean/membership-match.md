---
id: membership-match.md
title: Membership Match
summary: >-
  Filter entities against large member sets using compact Bloom filters or exact
  Roaring bitmaps, with syntax, SDK request patterns, delete semantics, and
  operational limits.
beta: Milvus v3.0.2+
---
<h1 id="Membership-Match" class="common-anchor-header">Membership Match<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus v3.0.2+</span><button data-href="#Membership-Match" class="anchor-icon" translate="no">
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
    </button></h1><h2 id="Overview" class="common-anchor-header">Overview<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Membership-match filters entities by testing whether a scalar field value belongs to a caller-provided set. The client builds a compact binary membership-filter blob and passes it as an expression template value.</p>
<p>It replaces large <code translate="no">IN [...]</code> lists. An <code translate="no">IN</code> filter serializes every member into the request, so sufficiently large member sets can exceed the proxy gRPC receive limit. With <code translate="no">membership_match</code>, the proxy validates the blob and embeds it into the query plan without rebuilding a member list.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v3.0.x/assets/membership-match-workflow.jpg" alt="Membership Match workflow: the client builds a reusable blob, the proxy validates it, and QueryNodes evaluate it." class="doc-image" id="membership-match-workflow:-the-client-builds-a-reusable-blob,-the-proxy-validates-it,-and-querynodes-evaluate-it." />
    <span>Membership Match workflow: the client builds a reusable blob, the proxy validates it, and QueryNodes evaluate it.</span>
  </span>
</p>
<p>The diagram shows the fixed division of labor. The client builds the blob once and reuses it across requests; the proxy validates the envelope and size limits and embeds the blob into the query plan verbatim; and QueryNodes evaluate the plan against raw data or an index.</p>
<p>The operator has two encodings with different correctness guarantees:</p>
<ul>
<li><strong>Bloom</strong> (<code translate="no">type=bloom</code>): Approximate membership. False positives are possible; false negatives are not expected from a valid filter. Typical use: high-volume audience or exclusion filters where occasional false positives are acceptable.</li>
<li><strong>Roaring</strong> (<code translate="no">type=roaring</code>): Exact membership for integer values. Typical use: ACLs, tenant visibility, compliance filters, and delete-by-ID-set operations.</li>
</ul>
<p>Do not use <strong>Bloom</strong> membership for authorization decisions or destructive deletes. A false positive can expose an entity or delete an entity that is not in the intended set.</p>
<h3 id="Operational-checklist" class="common-anchor-header">Operational checklist<button data-href="#Operational-checklist" class="anchor-icon" translate="no">
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
    </button></h3><ul>
<li>Confirm the target field type and build the blob from that same value domain.</li>
<li>Select Bloom only when false positives are acceptable.</li>
<li>Select Roaring for ACL, compliance, tenant isolation, and delete operations.</li>
<li>Build large blobs once and reuse them; do not rebuild them inside every request.</li>
<li>Budget blob size in serialized bytes, not member count.</li>
<li>On a mixed-version cluster, finish the rolling upgrade, proxies first, before enabling <code translate="no">membership_match</code>.</li>
<li>Test the expression against a non-production collection before enabling a destructive workflow.</li>
</ul>
<h2 id="Expression-syntax" class="common-anchor-header">Expression syntax<button data-href="#Expression-syntax" class="anchor-icon" translate="no">
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
    </button></h2><pre><code translate="no" class="language-text">membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
membership_match(&lt;field&gt;, {&lt;template&gt;}, type=roaring)
membership_match(&lt;field&gt;, {&lt;template&gt;})
not membership_match(&lt;field&gt;, {&lt;template&gt;}, type=bloom)
<button class="copy-code-btn"></button></code></pre>
<p>The second argument is a template placeholder. The SDK supplies the placeholder value as protobuf <code translate="no">bytes</code> containing the client-built filter blob. Keep the <code translate="no">type</code> explicit in production expressions so the intended correctness contract is visible in code and logs.</p>
<p>The <code translate="no">type</code> argument is optional. Every blob carries a self-describing magic header, <code translate="no">MBF1</code> for Bloom and <code translate="no">MRB1</code> for Roaring, and the server sniffs the header when <code translate="no">type</code> is omitted. An explicit <code translate="no">type</code> that conflicts with the blob header is rejected as a request error, and unknown or truncated headers result in a fail-closed state.</p>
<h2 id="Choose-the-encoding" class="common-anchor-header">Choose the encoding<button data-href="#Choose-the-encoding" class="anchor-icon" translate="no">
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
    </button></h2><p>Use Bloom when a false positive is acceptable. Bloom accepts signed integer fields (<strong>INT8</strong>/<strong>16</strong>/<strong>32</strong>/<strong>64</strong>), <strong>VARCHAR</strong> fields, and <strong>JSON</strong> paths. A Bloom filter is not an exact allow-list.</p>
<p><code translate="no">fpr</code> (false-positive rate) is the probability that a Bloom filter reports a value as a member when the value was never inserted: <code translate="no">fpr=0.005</code> means roughly one non-member value in 200 is wrongly reported as present. A lower fpr produces a larger blob.</p>
<p>Use <strong>Roaring</strong> when every match must be exact. <strong>Roaring</strong> accepts signed integer fields only; members are sign-extended to <strong>INT64</strong> before serialization, so an INT8 -1 and an INT64 -1 are the same member. Do not use it for UUID or other string fields.</p>
<table>
<thead>
<tr><th>Dimension</th><th>Bloom (type=bloom)</th><th>Roaring (type=roaring)</th></tr>
</thead>
<tbody>
<tr><td>Precision</td><td>Approximate; false positives possible; no false negatives</td><td>Exact; no false positives and no false negatives</td></tr>
<tr><td>Fields</td><td>INT8/16/32/64, VARCHAR, JSON paths</td><td>Signed INT8/16/32/64 only</td></tr>
<tr><td>Blob size</td><td>Member count and FPR; about 11 bits per member at FPR 0.005; power-of-two body</td><td>Value distribution; dense sets compress to far smaller sizes; random 64-bit values hit the 262,144 high-container cap</td></tr>
<tr><td>Delete</td><td>Rejected at parse time</td><td>Allowed</td></tr>
<tr><td>Typical use</td><td>Audience and exclusion filters</td><td>ACL, compliance, tenant isolation, delete by ID set</td></tr>
</tbody>
</table>
<p><strong>JSON</strong> paths are strictly typed, row by row: a <strong>JSON</strong> string is probed as a <strong>VARCHAR</strong> value, a <strong>JSON</strong> integer as an <strong>INT64</strong> value, and a <strong>JSON</strong> double never matches an integer member, unlike the exact <code translate="no">IN</code>, where 5.0 equals 5. If your writers float-encode integers, normalize them on write or use a typed scalar field.</p>
<p>For either encoding, build the member set from the same value domain as the target field. Do not build a Bloom filter from the string <code translate="no">&quot;10086&quot;</code> and apply it to an <code translate="no">INT64</code> field. The blob header records the inserted value domains, and a wrong-domain blob is rejected by the proxy with a parameter error instead of silently matching nothing. Reuse a built blob across requests rather than rebuilding it for each query.</p>
<p>For sets of a few thousand members or fewer, plain <code translate="no">IN</code> remains the simplest option. The server does not choose between <strong>IN</strong>, <strong>Bloom</strong>, and <strong>Roaring</strong>. Selecting the encoding is the caller’s responsibility.</p>
<p>To choose an encoding:</p>
<ol>
<li>Determine whether the workload tolerates false positives. If it does not, <strong>Bloom</strong> is never an option.</li>
<li>For exact membership, use <strong>Roaring</strong> with a signed integer field. Dense or clustered values compress to the smallest blobs.</li>
<li>Check the size limits. Uniformly random 64-bit values may exceed the 262,144 high-container cap or the size limits. If they do, use a traditional <strong>IN</strong> list that fits the request limits.</li>
<li>For exact membership on non-integer fields, use <strong>IN</strong>. There is no exact membership encoding for these fields.</li>
</ol>
<p>Membership-match is not available over the RESTful HTTP API. HTTP expression template parameters accept only bool, number, string, and array values; there is no binary <code translate="no">bytes</code> type for the blob. Use a gRPC-based SDK to pass membership blobs.</p>
<h2 id="SDK-request-patterns" class="common-anchor-header">SDK request patterns<button data-href="#SDK-request-patterns" class="anchor-icon" translate="no">
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
    </button></h2><p>The following snippets focus on building membership blobs and passing them as filter template parameters. They assume that the collections and fields already exist and are loaded, the SDK clients are connected, and query vectors, member lists, and other referenced variables are defined. Collection setup and complete application scaffolding are omitted.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#go">Go</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, build_bloom_filter, build_roaring_bitmap

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
bloom_blob = build_bloom_filter([<span class="hljs-string">&quot;creator-a&quot;</span>, <span class="hljs-string">&quot;creator-b&quot;</span>], fpr=<span class="hljs-number">0.005</span>)
client.search(collection_name=<span class="hljs-string">&quot;posts&quot;</span>, data=[query_vector], anns_field=<span class="hljs-string">&quot;embedding&quot;</span>, limit=<span class="hljs-number">10</span>,
              <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: bloom_blob})

roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.query(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>,
             filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob}, output_fields=[<span class="hljs-string">&quot;user_id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">bloomBlob, err := milvusclient.NewBloomFilterBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>}, fpr)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
search := milvusclient.NewSearchOption(<span class="hljs-string">&quot;posts&quot;</span>, topK, vectors).
    WithFilter(<span class="hljs-string">&quot;membership_match(creator_id, {members}, type=bloom)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)

roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
query := milvusclient.NewQueryOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithFilter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] bloomBlob = BloomFilterUtils.buildBloomFilter(userIds, BloomFilterUtils.DEFAULT_FPR);
<span class="hljs-type">QueryReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> QueryReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(user_id, {members}, type=bloom)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, bloomBlob)).build();
<span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> bloomBlob = <span class="hljs-title function_">buildBloomFilter</span>(userIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">query</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(user_id, {members}, type=bloom)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: bloomBlob } });
<span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-with-Roaring" class="common-anchor-header">Delete with Roaring<button data-href="#Delete-with-Roaring" class="anchor-icon" translate="no">
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
    </button></h2><p>Use an exact <strong>Roaring</strong> blob when deleting entities selected by an external integer-ID set. Review the member set and collection field type before issuing the delete. Do not use Bloom: approximate membership is not a safe delete predicate, and Bloom forms are rejected in Delete expressions at parse time.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#go">Go</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
</div>
<pre><code translate="no" class="language-python">roaring_blob = build_roaring_bitmap([<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>])
client.delete(collection_name=<span class="hljs-string">&quot;docs&quot;</span>, <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>,
              filter_params={<span class="hljs-string">&quot;members&quot;</span>: roaring_blob})
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">roaringBlob, err := milvusclient.NewRoaringBitmapBlob([]<span class="hljs-type">int64</span>{<span class="hljs-number">1001</span>, <span class="hljs-number">1002</span>, <span class="hljs-number">1003</span>})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> { <span class="hljs-keyword">return</span> err }
_, err = client.Delete(ctx, milvusclient.NewDeleteOption(<span class="hljs-string">&quot;docs&quot;</span>).
    WithExpr(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>).
    WithTemplateParam(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">byte</span>[] roaringBlob = RoaringBitmapUtils.buildRoaringBitmap(userIds);
<span class="hljs-type">DeleteReq</span> <span class="hljs-variable">request</span> <span class="hljs-operator">=</span> DeleteReq.builder().collectionName(<span class="hljs-string">&quot;docs&quot;</span>)
    .filter(<span class="hljs-string">&quot;membership_match(id, {members}, type=roaring)&quot;</span>)
    .filterTemplateValues(Collections.singletonMap(<span class="hljs-string">&quot;members&quot;</span>, roaringBlob)).build();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> roaringBlob = <span class="hljs-title function_">buildRoaringBitmap</span>(integerIds);
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">delete</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&#x27;docs&#x27;</span>,
  <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;membership_match(id, {members}, type=roaring)&#x27;</span>,
  <span class="hljs-attr">exprValues</span>: { <span class="hljs-attr">members</span>: roaringBlob } });
<button class="copy-code-btn"></button></code></pre>
<p>Delete semantics follow exact, three-valued matching:</p>
<table>
<thead>
<tr><th>Field value</th><th>membership_match(…)</th><th>not membership_match(…)</th></tr>
</thead>
<tbody>
<tr><td>NULL</td><td>no match (NULL)</td><td>no match (NULL)</td></tr>
<tr><td>in member set</td><td>match</td><td>no match</td></tr>
<tr><td>outside the set</td><td>no match</td><td>match</td></tr>
</tbody>
</table>
<p>The table reads row by row: a Delete with <code translate="no">membership_match</code> removes the in-set entities, a Delete with <code translate="no">not membership_match</code> removes the outside-set entities, and NULL entities survive both polarities.</p>
<ul>
<li>Entities with a NULL field value are never deleted, under either polarity.</li>
<li>An empty bitmap deletes nothing. <code translate="no">not membership_match(&lt;field&gt;, {&lt;empty&gt;}, type=roaring)</code> deletes every entity with a non-NULL field value, the exact complement, which may be a large set by design.</li>
<li><code translate="no">not membership_match</code> is the exact complement of the member set over non-NULL entities, not an approximation.</li>
</ul>
<p>On sealed segments loaded index-only, without raw scalar data, evaluation uses a bounded reverse lookup when the index supports it. When neither raw field data nor a qualifying index is available, the request fails with <code translate="no">FieldNotLoaded</code> instead of returning unfiltered entities.</p>
<h2 id="Operational-limits" class="common-anchor-header">Operational limits<button data-href="#Operational-limits" class="anchor-icon" translate="no">
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
<tr><th>Setting</th><th>Default</th><th>Configurable</th><th>What it bounds</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">proxy.maxMembershipFilterSize</code></td><td>64 MiB</td><td><code translate="no">milvus.yaml</code> proxy</td><td>one blob body</td></tr>
<tr><td><code translate="no">proxy.maxMembershipFilterPlanSize</code></td><td>128 MiB</td><td><code translate="no">milvus.yaml</code> proxy</td><td>per-request aggregate</td></tr>
<tr><td><code translate="no">proxy.grpc.serverMaxRecvSize</code></td><td>128 MiB</td><td><code translate="no">milvus.yaml</code> proxy</td><td>whole request</td></tr>
<tr><td>Roaring high-container cap</td><td>262,144</td><td>fixed in code</td><td>per filter</td></tr>
<tr><td>Roaring decoded-memory estimate</td><td>64 MiB</td><td>fixed in code</td><td>per filter</td></tr>
<tr><td>MBF1 format cap</td><td>128 MiB</td><td>fixed in code</td><td>blob format ceiling</td></tr>
<tr><td>Bloom <code translate="no">fpr</code></td><td>0.005</td><td>client builder</td><td>false-positive target</td></tr>
</tbody>
</table>
<p>The <code translate="no">proxy.*</code> settings are Milvus server configuration: they are set by the cluster operator in <code translate="no">milvus.yaml</code> under the <code translate="no">proxy</code> section and cannot be adjusted per request or per expression at filtering time. The <strong>Roaring</strong> admissions and the MBF1 format cap are fixed in the implementation and cannot be configured anywhere. The <code translate="no">fpr</code> row is the only client-side control: it is chosen when the blob is built, with an accepted range of 0.0001 to 0.05.</p>
<p>The blob body maximum admits about 48.6 million INT64 members at the default fpr, with the fixed 32-byte envelope header allowed on top. The request-wide budget covers the aggregate serialized size of membership-bearing plans plus the aggregate estimated decoded size of Roaring filters, and HybridSearch sub-requests and scorer filters share it. Bloom bodies are powers of two: a member count just past a tier boundary doubles the blob, and a slightly higher fpr often fits the next tier down. When the proxy rejects an oversized Bloom blob, the error suggests an <code translate="no">fpr</code> that fits.</p>
<ul>
<li>Membership expression results are not cached across requests.</li>
<li>Mixed-version clusters fail closed: QueryNodes running older code reject plans that contain membership plan nodes. Upgrade the proxies first, then complete the rolling upgrade before enabling the operator.</li>
<li>Server logs redact blob bytes. The expression text contains only the template name; the binary payload is transmitted out of band in the template values.</li>
</ul>
