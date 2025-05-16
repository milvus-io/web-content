---
id: load_partition.md
related_key: load partition
summary: Learn how to load a partition into memory for search or query in Milvus.
title: Load a Partition
---
<h1 id="Load-a-Partition" class="common-anchor-header">Load a Partition<button data-href="#Load-a-Partition" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to load a partition to memory. Loading partitions instead of the whole collection to memory can significantly reduce the memory usage. All search and query operations within Milvus are executed in memory.</p>
<p>Since version 2.3.0, Milvus has enhanced its partition operations and now supports cascading load and release operations. This means that you can perform any combination of the following operations:</p>
<ul>
<li>Load a collection that has already been loaded.</li>
<li>Load a collection, and then load a specific partition in the collection.</li>
<li>Load a partition, and then load the collection to which it belongs.</li>
<li>Load a partition, and reload it before release.</li>
</ul>
<p>Milvus allows users to load a partition as multiple replicas to utilize the CPU and memory resources of extra query nodes. This feature boosts the overall QPS and throughput with extra hardware. It is supported on PyMilvus in current release.</p>
<div class="alert warning">
<ul>
<li>In current release, volume of the data to load must be under 90% of the total memory resources of all query nodes to reserve memory resources for execution engine.</li>
<li>In current release, all on-line query nodes will be divided into multiple replica groups according to the replica number specified by user. All replica groups shall have minimal memory resources to load one replica of the provided collection. Otherwise, an error will be returned.</li>
</ul>
</div>
<div class="alert note">
<p>When interacting with Milvus using Python code, you have the flexibility to choose between PyMilvus and MilvusClient (new). For more information, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.3.x/About.md">Python SDK</a>.</p>
</div>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection
collection = Collection(<span class="hljs-string">&quot;book&quot;</span>)      <span class="hljs-comment"># Get an existing collection.</span>
collection.load([<span class="hljs-string">&quot;novel&quot;</span>], replica_number=<span class="hljs-number">2</span>)

<span class="hljs-comment"># Or you can load a partition with the partition as an object</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Partition
partition = Partition(<span class="hljs-string">&quot;novel&quot;</span>)       <span class="hljs-comment"># Get an existing partition.</span>
partition.load(replica_number=<span class="hljs-number">2</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">loadPartitions</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;book&quot;</span>,
  <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;novel&quot;</span>],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err := milvusClient.LoadPartitions(
  context.Background(),   <span class="hljs-comment">// ctx</span>
  <span class="hljs-string">&quot;book&quot;</span>,                 <span class="hljs-comment">// CollectionName</span>
  []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;novel&quot;</span>},      <span class="hljs-comment">// partitionNames</span>
  <span class="hljs-literal">false</span>,                  <span class="hljs-comment">// async</span>
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
  log.Fatal(<span class="hljs-string">&quot;failed to load partitions:&quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">milvusClient.<span class="hljs-title function_">loadPartitions</span>(
  <span class="hljs-title class_">LoadPartitionsParam</span>.<span class="hljs-title function_">newBuilder</span>()
          .<span class="hljs-title function_">withCollectionName</span>(<span class="hljs-string">&quot;book&quot;</span>)
          .<span class="hljs-title function_">withPartitionNames</span>([<span class="hljs-string">&quot;novel&quot;</span>])
          .<span class="hljs-title function_">build</span>()
);
<button class="copy-code-btn"></button></code></pre>
<div style="display: none">
<pre><code translate="no" class="language-shell">load -c book -p novel
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;http://localhost:9091/api/v1/partitions/load&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collection_name&quot;: &quot;book&quot;,
    &quot;partition_names&quot;: [&quot;novel&quot;],
    &quot;replica_number&quot;: 1
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
</div>
<table class="language-python">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">partition_name</code></td>
        <td>Name of the partition.</td>
    </tr>
    <tr>
        <td><code translate="no">replica_number</code> (optional)</td>
        <td>Number of the replica to load.</td>
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
        <td><code translate="no">collection_name</code></td>
        <td>Name of the collection to load partitions from.</td>
    </tr>
    <tr>
        <td><code translate="no">partition_names</code></td>
        <td>List of names of the partitions to load.</td>
    </tr>
    </tbody>
</table>
<table class="language-go">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">ctx</code></td>
            <td>Context to control API invocation process.</td>
        </tr>
        <tr>
            <td><code translate="no">CollectionName</code></td>
            <td>Name of the collection to load partitions from.</td>
        </tr>
        <tr>
            <td><code translate="no">partitionNames</code></td>
            <td>List of names of the partitions to load.</td>
        </tr>
        <tr>
            <td><code translate="no">async</code></td>
            <td>Switch to control sync/async behavior. The deadline of context is not applied in sync load.</td>
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
            <td>Name of the collection to load partitions from.</td>
        </tr>
        <tr>
            <td><code translate="no">PartitionNames</code></td>
            <td>List of names of the partitions to load.</td>
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
            <td>Name of the collection to load partitions from.</td>
        </tr>
        <tr>
            <td>-p (Multiple)</td>
            <td>The name of the partition to load.</td>
        </tr>
    </tbody>
</table>
<table class="language-curl" style="display: none">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">collection_name</code></td>
        <td>Name of the collection to load partitions from.</td>
    </tr>
    <tr>
        <td><code translate="no">partition_names</code></td>
        <td>List of names of the partitions to load.</td>
    </tr>
    <tr>
        <td><code translate="no">replica_number</code> (optional)</td>
        <td>Number of the replica to load.</td>
    </tr>
    </tbody>
</table>
<h2 id="Get-replica-information" class="common-anchor-header">Get replica information<button data-href="#Get-replica-information" class="anchor-icon" translate="no">
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
    </button></h2><p>You can check the information of the loaded replicas.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Partition
partition = Partition(<span class="hljs-string">&quot;novel&quot;</span>)       <span class="hljs-comment"># Get an existing partition.</span>
partition.load(replica_number=<span class="hljs-number">2</span>)     <span class="hljs-comment"># Load partition as 2 replicas</span>
result = partition.get_replicas()
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
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
<li><a href="/docs/v2.3.x/build_index.md">Build an index for vectors</a></li>
<li><a href="/docs/v2.3.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.3.x/hybridsearch.md">Conduct a hybrid search</a></li>
</ul></li>
</ul>
