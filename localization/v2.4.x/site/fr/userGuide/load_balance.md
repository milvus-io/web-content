---
id: load_balance.md
related_key: Load balance
summary: Learn how to balance query load in Milvus.
title: Balance Query Load
deprecate: true
---

<h1 id="Balance-Query-Load" class="common-anchor-header">Balance Query Load<button data-href="#Balance-Query-Load" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to balance query load in Milvus.</p>
<p>Milvus supports automatic load balance by default. You can <a href="/docs/fr/v2.4.x/configure-docker.md">configure</a> your Milvus to enable or disable <a href="/docs/fr/v2.4.x/configure_querycoord.md#queryCoordautoBalance">automatic load balance</a>. By specifying <a href="/docs/fr/v2.4.x/configure_querycoord.md#queryCoordbalanceIntervalSeconds"><code translate="no">queryCoord.balanceIntervalSeconds</code></a>, <a href="/docs/fr/v2.4.x/configure_querycoord.md#queryCoordoverloadedMemoryThresholdPercentage"><code translate="no">queryCoord.overloadedMemoryThresholdPercentage</code></a>, and <a href="/docs/fr/v2.4.x/configure_querycoord.md#queryCoordmemoryUsageMaxDifferencePercentage"><code translate="no">queryCoord.memoryUsageMaxDifferencePercentage</code></a>, you can change the thresholds that trigger the automatic load balance.</p>
<p>If automatic load balance is disabled, you can still balance the load manually.</p>
<h2 id="Check-segment-information" class="common-anchor-header">Check segment information<button data-href="#Check-segment-information" class="anchor-icon" translate="no">
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
    </button></h2><p>Get the <code translate="no">segmentID</code> of the sealed segment that you expect to transfer and the <code translate="no">nodeID</code> of the query node that you expect to transfer the segment to.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> utility
utility.<span class="hljs-title function_">get_query_segment_info</span>(<span class="hljs-string">&quot;book&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// This function is under active development on the GO client.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">milvusClient.<span class="hljs-title function_">getQuerySegmentInfo</span>(
  <span class="hljs-title class_">GetQuerySegmentInfoParam</span>.<span class="hljs-title function_">newBuilder</span>()
    .<span class="hljs-title function_">withCollectionName</span>(<span class="hljs-string">&quot;book&quot;</span>)
    .<span class="hljs-title function_">build</span>()
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> <span class="hljs-title function_">getQuerySegmentInfo</span>({
    <span class="hljs-attr">collectionName</span>: <span class="hljs-string">&quot;book&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">show query_segment -c book
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">collection_name</code></td>
        <td>Name of the collection to check the segment information.</td>
    </tr>
    </tbody>
</table>
<table class="language-javascript">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">collectionName</code></td>
        <td>Name of the collection to check the segment information.</td>
    </tr>
    </tbody>
</table>
<table class="language-java">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">CollectionName</code></td>
        <td>Name of the collection to check the segment information.</td>
    </tr>
    </tbody>
</table>
<table class="language-shell">
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c</td>
            <td>Name of the collection to check the segment information.</td>
        </tr>
    </tbody>
</table>
<h2 id="Transfer-segment" class="common-anchor-header">Transfer segment<button data-href="#Transfer-segment" class="anchor-icon" translate="no">
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
    </button></h2><p>Transfer the sealed segment(s) with the <code translate="no">segmentID</code> and the <code translate="no">nodeID</code> of the current query node and new query node(s).</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python">utility.load_balance(
  src_node_id=3, 
  dst_node_ids=[4], 
  sealed_segment_ids=[431067441441538050]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// This function is under active development on the GO client.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">milvusClient.loadBalance(
  LoadBalanceParam.newBuilder()
    .withSourceNodeID(3L)
    .addDestinationNodeID(4L)
    .addSegmentID(431067441441538050L)
    .build()
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> <span class="hljs-title function_">loadBalance</span>({
  <span class="hljs-attr">src_nodeID</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">dst_nodeIDs</span>: [<span class="hljs-number">4</span>],
  <span class="hljs-attr">sealed_segmentIDs</span>: [<span class="hljs-number">431067441441538050</span>]
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">load_balance -s 3 -d 4 -ss 431067441441538050
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">src_node_id</code></td>
        <td>ID of the query node you want to transfer segment(s) from.</td>
    </tr>
    <tr>
        <td><code translate="no">dst_node_ids</code> (Optional)</td>
        <td>ID(s) of the query node(s) you want to transfer segment(s) to. Milvus transfers segment(s) to other query nodes automatically if this parameter is left blank.</td>
    </tr>
    <tr>
        <td><code translate="no">sealed_segment_ids</code> (Optional)</td>
        <td>ID(s) of the segment(s) you want to transfer. Milvus transfers all sealed segment(s) in the source query node to other query nodes automatically if this parameter is left blank.</td>
    </tr>
    </tbody>
</table>
<table class="language-javascript">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">src_nodeID</code></td>
        <td>ID of the query node you want to transfer segment(s) from.</td>
    </tr>
    <tr>
        <td><code translate="no">dst_nodeIDs</code> (Optional)</td>
        <td>ID(s) of the query node(s) you want to transfer segment(s) to. Milvus transfers segment(s) to other query nodes automatically if this parameter is left blank.</td>
    </tr>
    <tr>
        <td><code translate="no">sealed_segmentIDs</code> (Optional)</td>
        <td>ID(s) of the segment(s) you want to transfer. Milvus transfers all sealed segment(s) in the source query node to other query nodes automatically if this parameter is left blank.</td>
    </tr>
    </tbody>
</table>
<table class="language-java">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">SourceNodeID</code></td>
        <td>ID of the query node you want to transfer segment(s) from.</td>
    </tr>
    <tr>
        <td><code translate="no">DestinationNodeID</code> (Optional)</td>
        <td>ID(s) of the query node(s) you want to transfer segment(s) to. Milvus transfers segment(s) to other query nodes automatically if this parameter is left blank.</td>
    </tr>
    <tr>
        <td><code translate="no">SegmentID</code> (Optional)</td>
        <td>ID(s) of the segment(s) you want to transfer. Milvus transfers all sealed segment(s) in the source query node to other query nodes automatically if this parameter is left blank.</td>
    </tr>
    </tbody>
</table>
<table class="language-shell">
    <thead>
    <tr>
        <th>Option</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">-s</code></td>
        <td>ID of the query node you want to transfer segment(s) from.</td>
    </tr>
    <tr>
        <td><code translate="no">-d</code> (Multiple)</td>
        <td>ID(s) of the query node(s) you want to transfer segment(s) to.</td>
    </tr>
    <tr>
        <td><code translate="no">-ss</code> (Multiple)</td>
        <td>ID(s) of the segment(s) you want to transfer.</td>
    </tr>
    </tbody>
</table>
<h2 id="Whats-next" class="common-anchor-header">What’s next<button data-href="#Whats-next" class="anchor-icon" translate="no">
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
<li>Learn more basic operations of Milvus:
<ul>
<li><a href="/docs/fr/v2.4.x/insert-update-delete.md">Insert, Upsert &amp; Delete</a></li>
<li><a href="/docs/fr/v2.4.x/manage-partitions.md">Manage Partitions</a></li>
<li><a href="/docs/fr/v2.4.x/index-vector-fields.md">Index Vector Fields</a></li>
<li><a href="/docs/fr/v2.4.x/index-scalar-fields.md">Index Scalar Fields</a></li>
<li><a href="/docs/fr/v2.4.x/single-vector-search.md">Single-vector search</a></li>
<li><a href="/docs/fr/v2.4.x/multi-vector-search.md">Hybrid search</a></li>
</ul></li>
</ul>
