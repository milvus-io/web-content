---
id: load_collection.md
related_key: load collection
summary: Learn how to load a collection into memory for CRUD operations in Milvus.
title: ''
---
<h1 id="Load-a-Collection" class="common-anchor-header">Load a Collection<button data-href="#Load-a-Collection" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to load the collection to memory before a search or a query. All search and query operations within Milvus are executed in memory.</p>
<p>Milvus allows users to load a collection as multiple replicas to utilize the CPU and memory resources of extra query nodes. This feature boosts the overall QPS and throughput without extra hardware. Before loading a collection, ensure that you have already indexed it.</p>
<div class="alert warning">
<ul>
<li>In current release, volume of the data to load must be under 90% of the total memory resources of all query nodes to reserve memory resources for execution engine.</li>
<li>In current release, all on-line query nodes will be divided into multiple replica groups according to the replica number specified by user. All replica groups shall have minimal memory resources to load one replica of the provided collection. Otherwise, an error will be returned.</li>
</ul>
</div>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#csharp">C#</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection, utility

<span class="hljs-comment"># Get an existing collection.</span>
collection = Collection(<span class="hljs-string">&quot;book&quot;</span>)      
collection.load(replica_number=<span class="hljs-number">2</span>)

<span class="hljs-comment"># Check the loading progress and loading status</span>
utility.load_state(<span class="hljs-string">&quot;book&quot;</span>)
<span class="hljs-comment"># Output: &lt;LoadState: Loaded&gt;</span>

utility.loading_progress(<span class="hljs-string">&quot;book&quot;</span>)
<span class="hljs-comment"># Output: {&#x27;loading_progress&#x27;: 100%}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">loadCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;book&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err := milvusClient.LoadCollection(
  context.Background(),   <span class="hljs-comment">// ctx</span>
  <span class="hljs-string">&quot;book&quot;</span>,                 <span class="hljs-comment">// CollectionName</span>
  <span class="hljs-literal">false</span>                   <span class="hljs-comment">// async</span>
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
  log.Fatal(<span class="hljs-string">&quot;failed to load collection:&quot;</span>, err.Error())
}

<span class="hljs-comment">// To get the load status</span>
loadStatus, err := milvusClient.GetLoadState(
  context.Background(),             <span class="hljs-comment">// ctx</span>
  <span class="hljs-string">&quot;book&quot;</span>,                           <span class="hljs-comment">// CollectionName</span>
  []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Default partition&quot;</span>}     <span class="hljs-comment">// List of partitions</span>
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to get the load state&quot;</span>, err.Error())
}

<span class="hljs-comment">// To get the loading progress</span>
percentage, err := milvusClient.GetLoadingProgress(
    context.Background(),           <span class="hljs-comment">// ctx</span>
    <span class="hljs-string">&quot;book&quot;</span>,                         <span class="hljs-comment">// CollectionName</span>
    []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;Default partition&quot;</span>}   <span class="hljs-comment">// List of partitions</span>
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to get the loading progress&quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">milvusClient.loadCollection(
  LoadCollectionParam.newBuilder()
    .withCollectionName(<span class="hljs-string">&quot;book&quot;</span>)
    .build()
);

<span class="hljs-comment">// You can check the loading status </span>

GetLoadStateParam param = GetLoadStateParam.newBuilder()
        .withCollectionName(collectionName)
        .build();
R&lt;GetLoadStateResponse&gt; response = client.getLoadState(param);
<span class="hljs-keyword">if</span> (response.getStatus() != R.Status.Success.getCode()) {
    System.out.<span class="hljs-built_in">println</span>(response.getMessage());
}
System.out.<span class="hljs-built_in">println</span>(response.getState());

<span class="hljs-comment">// and loading progress as well</span>

GetLoadingProgressParam param = GetLoadingProgressParam.newBuilder()
        .withCollectionName(collectionName)
        .build();
R&lt;GetLoadingProgressResponse&gt; response = client.getLoadingProgress(param);
<span class="hljs-keyword">if</span> (response.getStatus() != R.Status.Success.getCode()) {
    System.out.<span class="hljs-built_in">println</span>(response.getMessage());
}
System.out.<span class="hljs-built_in">println</span>(response.getProgress());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> collection = <span class="hljs-title class_">Client</span>.<span class="hljs-title class_">GetCollection</span>(<span class="hljs-string">&quot;book&quot;</span>)
<span class="hljs-keyword">await</span> collection.<span class="hljs-title class_">LoadAsync</span>();

<span class="hljs-comment">// You can check the loading progress</span>

<span class="hljs-keyword">var</span> progress = <span class="hljs-keyword">await</span> collection.<span class="hljs-title class_">GetLoadingProgressAysnc</span>();
<span class="hljs-title class_">Console</span>.<span class="hljs-title class_">WriteLine</span>(progress);
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
        <td><code translate="no">partition_name</code> (optional)</td>
        <td>Name of the partition to load.</td>
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
        <td>Name of the collection to load.</td>
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
            <td>Name of the collection to load.</td>
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
            <td>Name of the collection to load.</td>
        </tr>
    </tbody>
</table>
<table class="language-csharp">
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>(Optional) replicaNumber</td>
            <td>The name of the partition to load.</td>
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
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection
collection = Collection(<span class="hljs-string">&quot;book&quot;</span>)      <span class="hljs-comment"># Get an existing collection.</span>
collection.load(replica_number=<span class="hljs-number">2</span>)    <span class="hljs-comment"># Load collection as 2 replicas</span>
result = collection.get_replicas()
<span class="hljs-built_in">print</span>(result)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">GetReplicasParam</span> <span class="hljs-variable">getReplicasParam</span> <span class="hljs-operator">=</span> GetReplicasParam.newBuilder()
    .withCollectionName(<span class="hljs-string">&quot;book&quot;</span>)
    .build();

client.getReplicas(getReplicasParam);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">replicas, err = client.<span class="hljs-title class_">GetReplicas</span>(context.<span class="hljs-title class_">Background</span>(), <span class="hljs-string">&quot;book&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">let</span> res = client.<span class="hljs-title function_">getReplicas</span>({
    <span class="hljs-attr">collectionID</span>: <span class="hljs-string">&#x27;436777253933154305&#x27;</span> <span class="hljs-comment">// should be a collection id returned by a compact task.</span>
})
<button class="copy-code-btn"></button></code></pre>
<p>Below is an example of the output.</p>
<pre><code translate="no">Replica <span class="hljs-built_in">groups</span>:
- Group: &lt;group_id:435309823872729305&gt;, &lt;group_nodes:(21, 20)&gt;, &lt;shards:[Shard: &lt;channel_name:milvus-zong-rootcoord-dml_27_435367661874184193v0&gt;, &lt;shard_leader:21&gt;, &lt;shard_nodes:[21]&gt;, Shard: &lt;channel_name:milvus-zong-rootcoord-dml_28_435367661874184193v1&gt;, &lt;shard_leader:20&gt;, &lt;shard_nodes:[20, 21]&gt;]&gt;
- Group: &lt;group_id:435309823872729304&gt;, &lt;group_nodes:(25,)&gt;, &lt;shards:[Shard: &lt;channel_name:milvus-zong-rootcoord-dml_28_435367661874184193v1&gt;, &lt;shard_leader:25&gt;, &lt;shard_nodes:[25]&gt;, Shard: &lt;channel_name:milvus-zong-rootcoord-dml_27_435367661874184193v0&gt;, &lt;shard_leader:25&gt;, &lt;shard_nodes:[25]&gt;]&gt;
<button class="copy-code-btn"></button></code></pre>
<h2 id="Constraints" class="common-anchor-header">Constraints<button data-href="#Constraints" class="anchor-icon" translate="no">
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
<li>Error will be returned at the attempt to load partition(s) when the parent collection is already loaded. Future releases will support releasing partitions from a loaded collection, and (if needed) then loading some other partition(s).</li>
<li>“Load successfully” will be returned at the attempt to load the collection that is already loaded.</li>
<li>Error will be returned at the attempt to load the collection when the child partition(s) is/are already loaded. Future releases will support loading the collection when some of its partitions are already loaded.</li>
<li>Loading different partitions in a same collection via separate RPCs is not allowed.</li>
</ul>
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
<li><a href="/docs/v2.2.x/insert_data.md">Insert data into Milvus</a></li>
<li><a href="/docs/v2.2.x/create_partition.md">Create a partition</a></li>
<li><a href="/docs/v2.2.x/build_index.md">Build an index for vectors</a></li>
<li><a href="/docs/v2.2.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.2.x/hybridsearch.md">Conduct a hybrid search</a></li>
</ul></li>
</ul>
