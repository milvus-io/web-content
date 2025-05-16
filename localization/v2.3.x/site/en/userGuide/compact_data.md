---
id: compact_data.md
related_key: compact data
summary: Learn how to compact data in Milvus.
title: Compact Data
---
<h1 id="Compact-Data" class="common-anchor-header">Compact Data<button data-href="#Compact-Data" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to compact data in Milvus.</p>
<p>Milvus supports automatic data compaction by default. You can <a href="/docs/v2.3.x/configure-docker.md">configure</a> your Milvus to enable or disable <a href="/docs/v2.3.x/configure_datacoord.md#dataCoordenableCompaction">compaction</a> and <a href="/docs/v2.3.x/configure_datacoord.md#dataCoordcompactionenableAutoCompaction">automatic compaction</a>.</p>
<p>If automatic compaction is disabled, you can still compact data manually.</p>
<div class="alert note">
<ul>
<li><p>To ensure accuracy of searches with Time Travel, Milvus retains the data operation log within the span specified in <a href="/docs/v2.3.x/configure_common.md#common.retentionDuration"><code translate="no">common.retentionDuration</code></a>. Therefore, data operated within this period will not be compacted.</p></li>
<li><p>When interacting with Milvus using Python code, you have the flexibility to choose between PyMilvus and MilvusClient (new). For more information, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.3.x/About.md">Python SDK</a>.</p></li>
</ul>
</div>
<h2 id="Compact-data-manually" class="common-anchor-header">Compact data manually<button data-href="#Compact-data-manually" class="anchor-icon" translate="no">
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
    </button></h2><p>Compaction requests are processed asynchronously because they are usually time-consuming.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection
collection = Collection(<span class="hljs-string">&quot;book&quot;</span>)      <span class="hljs-comment"># Get an existing collection.</span>
collection.compact()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">compact</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;book&quot;</span>,
});
<span class="hljs-keyword">const</span> compactionID = res.<span class="hljs-property">compactionID</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">compactionID, err := milvusClient.ManualCompaction(
    context.Background(), <span class="hljs-comment">// ctx</span>
    <span class="hljs-string">&quot;book&quot;</span>,               <span class="hljs-comment">// collection name</span>
    <span class="hljs-number">0</span>,                    <span class="hljs-comment">// tolerance duration</span>
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to manual compaction:&quot;</span>, err.Error())
}

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">R&lt;ManualCompactionResponse&gt; response = milvusClient.manualCompaction(
  ManualCompactionParam.newBuilder()
    .withCollectionName(<span class="hljs-string">&quot;book&quot;</span>)
    .build()
);
<span class="hljs-type">long</span> <span class="hljs-variable">compactionID</span> <span class="hljs-operator">=</span> response.getData().getCompactionID();
<button class="copy-code-btn"></button></code></pre>
<div style="display: none">
<pre><code translate="no" class="language-shell">compact -c book
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;http://localhost:9091/api/v1/compaction&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collectionID&quot;: 434262071120432449
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-curl">
Output:
<pre><code translate="no" class="language-json">{<span class="hljs-string">&quot;status&quot;</span>:{},<span class="hljs-string">&quot;compactionID&quot;</span>:<span class="hljs-number">434262132129005569</span>}
<button class="copy-code-btn"></button></code></pre>
</div>
</div>
<table class="language-javascript">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">collection_name</code></td>
        <td>Name of the collection to compact data.</td>
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
            <td>Name of the collection to compact data.</td>
        </tr>
    </tbody>
</table>
<table class="language-shell" style="display: none">
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c</td>
            <td>Name of the collection to compact data.</td>
        </tr>
    </tbody>
</table>
<h2 id="Check-compaction-status" class="common-anchor-header">Check compaction status<button data-href="#Check-compaction-status" class="anchor-icon" translate="no">
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
    </button></h2><p>You can check the compaction status with the compaction ID returned when the manual compaction is triggered.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
</div>
<pre><code translate="no" class="language-python">collection.get_compaction_state()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> state = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">getCompactionState</span>({
    compactionID
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">compactionState, err := milvusClient.GetCompactionState(
    context.Background(), <span class="hljs-comment">// ctx</span>
    compactionID,         <span class="hljs-comment">// compaction id</span>
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to get compaction state:&quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">milvusClient.getCompactionState(GetCompactionStateParam.newBuilder()
  .withCompactionID(compactionID)
  .build()
);
<button class="copy-code-btn"></button></code></pre>
<div style="display: none">
<pre><code translate="no" class="language-shell">show compaction_state -c book
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl -X <span class="hljs-string">&#x27;GET&#x27;</span> \
  <span class="hljs-string">&#x27;http://localhost:9091/api/v1/compaction/state&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;compactionID&quot;: 434262132129005569
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-curl">
Output:
<pre><code translate="no" class="language-json">{<span class="hljs-string">&quot;status&quot;</span>:{},<span class="hljs-string">&quot;state&quot;</span>:<span class="hljs-number">2</span>}
<button class="copy-code-btn"></button></code></pre>
</div>
</div>
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
<li><a href="/docs/v2.3.x/insert_data.md">Insert data into Milvus</a></li>
<li><a href="/docs/v2.3.x/create_partition.md">Create a partition</a></li>
<li><a href="/docs/v2.3.x/build_index.md">Build an index for vectors</a></li>
<li><a href="/docs/v2.3.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.3.x/hybridsearch.md">Conduct a hybrid search</a></li>
</ul></li>
</ul>
