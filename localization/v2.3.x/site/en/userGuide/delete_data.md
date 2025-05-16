---
id: delete_data.md
related_key: delete
summary: Learn how to delete data in Milvus.
title: Delete Entities
---
<h1 id="Delete-Entities" class="common-anchor-header">Delete Entities<button data-href="#Delete-Entities" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to delete entities in Milvus.</p>
<p>Milvus supports deleting entities by primary key or complex boolean expressions. Deleting entities by primary key is much faster and lighter than deleting them by complex boolean expressions. This is because Milvus executes queries first when deleting data by complex boolean expressions.</p>
<div class="alert caution">
    <ul>
          <li>Deleted entities can still be retrieved immediately after the deletion if the consistency level is set lower than <code translate="no">Strong</code>.</li>
          <li>Entities deleted beyond the pre-specified span of time for Time Travel cannot be retrieved again.</li>
          <li>Frequent deletion operations will impact the system performance.</li>
          <li>Before deleting entities by comlpex boolean expressions, make sure the collection has been loaded.</li>
          <li>Deleting entities by complex boolean expressions is not an atomic operation. Therefore, if it fails halfway through, some data may still be deleted.</li>
          <li>Deleting entities by complex boolean expressions is supported only when the consistency is set to <b>Bounded</b>. For details, see <a href="/docs/v2.3.x/consistency.md#Consistency-levels">Consistency</a>.</li>
    </ul>
</div>
<div class="alert note">
<p>When interacting with Milvus using Python code, you have the flexibility to choose between PyMilvus and MilvusClient (new). For more information, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.3.x/About.md">Python SDK</a>.</p>
</div>
<h2 id="Prepare-boolean-expression" class="common-anchor-header">Prepare boolean expression<button data-href="#Prepare-boolean-expression" class="anchor-icon" translate="no">
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
    </button></h2><p>Prepare the boolean expression that filters the entities to delete.</p>
<p>Milvus supports deleting entities by primary key or complex boolean expressions. For more information on expression rules and supported operators, see <a href="/docs/v2.3.x/boolean.md">Boolean Expression Rules</a>.</p>
<h3 id="Simple-boolean-expression" class="common-anchor-header">Simple boolean expression</h3><p>Use a simple expression to filter data with primary key values of <code translate="no">0</code> and <code translate="no">1</code>:</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;book_id in [0,1]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> expr = <span class="hljs-string">&quot;book_id in [0,1]&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-built_in">expr</span> := <span class="hljs-string">&quot;book_id in [0,1]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> <span class="hljs-type">String</span> <span class="hljs-variable">DELETE_EXPR</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;book_id in [0,1]&quot;</span>;
<button class="copy-code-btn"></button></code></pre>
<div style="display: none">
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">delete</span> entities -c book
<span class="hljs-title class_">The</span> expression to specify entities to be deleted： book_id <span class="hljs-keyword">in</span> [<span class="hljs-number">0</span>,<span class="hljs-number">1</span>]
<button class="copy-code-btn"></button></code></pre>
</div>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># See the following section.</span>
<button class="copy-code-btn"></button></code></pre>
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
            <td>The name of the collection.</td>
        </tr>
        <tr>
            <td>-p (Optional)</td>
            <td>The name of the partition that the entities belong to.</td>
        </tr>
    </tbody>
</table>
<h3 id="Complex-boolean-expression" class="common-anchor-header">Complex boolean expression</h3><p>To filter entities that meet specific conditions, define complex boolean expressions.</p>
<p>Filter entities whose <code translate="no">word_count</code> is greater than or equal to <code translate="no">11000</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;word_count &gt;= 11000&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-built_in">expr</span> := <span class="hljs-string">&quot;word_count &gt;= 11000&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Filter entities whose <code translate="no">book_name</code> is not <code translate="no">Unknown</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;book_name != Unknown&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-built_in">expr</span> := <span class="hljs-string">&quot;book_name != Unknown&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Filter entities whose primary key values are greater than <code translate="no">5</code> and <code translate="no">word_count</code> is smaller than or equal to <code translate="no">9999</code>:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;book_id &gt; 5 &amp;&amp; word_count &lt;= 9999&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-built_in">expr</span> := <span class="hljs-string">&quot;book_id &gt; 5 &amp;&amp; word_count &lt;= 9999&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Delete-entities" class="common-anchor-header">Delete entities<button data-href="#Delete-entities" class="anchor-icon" translate="no">
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
    </button></h2><p>Delete the entities with the boolean expression you created. Milvus returns the ID list of the deleted entities.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection
collection = Collection(<span class="hljs-string">&quot;book&quot;</span>)      <span class="hljs-comment"># Get an existing collection.</span>
collection.delete(expr)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">await milvusClient.deleteEntities({
  collection_name: <span class="hljs-string">&quot;book&quot;</span>,
  <span class="hljs-built_in">expr</span>: <span class="hljs-built_in">expr</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err = milvusClient.<span class="hljs-title class_">Delete</span>(
    context.<span class="hljs-title class_">Background</span>(), <span class="hljs-comment">// ctx</span>
    <span class="hljs-string">&quot;book&quot;</span>,               <span class="hljs-comment">// collection name</span>
    <span class="hljs-string">&quot;&quot;</span>,                   <span class="hljs-comment">// partition name</span>
    expr,                 <span class="hljs-comment">// expr</span>
)
<span class="hljs-keyword">if</span> err != nil {
    log.<span class="hljs-title class_">Fatal</span>(<span class="hljs-string">&quot;failed to delete:&quot;</span>, err.<span class="hljs-title class_">Error</span>())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">milvusClient.<span class="hljs-built_in">delete</span>(
  DeleteParam.newBuilder()
    .withCollectionName(<span class="hljs-string">&quot;book&quot;</span>)
    .withExpr(DELETE_EXPR)
    .build()
);
<button class="copy-code-btn"></button></code></pre>
<div style="display: none">
<pre><code translate="no" class="language-shell"><span class="hljs-title class_">You</span> are trying to <span class="hljs-keyword">delete</span> the entities <span class="hljs-keyword">of</span> collection. <span class="hljs-title class_">This</span> action cannot be undone!
<span class="hljs-title class_">Do</span> you want to <span class="hljs-keyword">continue</span>? [y/N]: y
<button class="copy-code-btn"></button></code></pre>
</div>
<pre><code translate="no" class="language-curl">curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/delete&#x27;</span> \
  -H <span class="hljs-string">&#x27;Authorization: Bearer ${TOKEN}&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
       &quot;collectionName&quot;: &quot;collection1&quot;,
       &quot;id&quot;: 1
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-curl">
Output:
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
    <span class="hljs-string">&quot;data&quot;</span>: {}
}
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
        <td><code translate="no">expr</code></td>
        <td>Boolean expression that specifies the entities to delete.</td>
    </tr>
  <tr>
        <td><code translate="no">partition_name</code> (optional)</td>
        <td>Name of the partition to delete entities from.</td>
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
        <td>Name of the collection to delete entities from.</td>
    </tr>
    <tr>
        <td><code translate="no">expr</code></td>
        <td>Boolean expression that specifies the entities to delete.</td>
    </tr>
    <tr>
        <td><code translate="no">partition_name</code> (optional)</td>
        <td>Name of the partition to delete entities from.</td>
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
        <td>Name of the collection to delete entities from.</td>
    </tr>
    <tr>
        <td><code translate="no">expr</code></td>
        <td>Boolean expression that specifies the entities to delete.</td>
    </tr>
    <tr>
        <td><code translate="no">PartitionName</code> (optional)</td>
        <td>Name of the partition to delete entities from.</td>
    </tr>
    </tbody>
</table>
<table class="language-curl">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">collectionName</code></td>
        <td>The name of the collection to which this operation applies.</td>
    </tr>
    <tr>
        <td><code translate="no">id</code></td>
        <td>The ID of the entity to drop.</td>
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
<li><a href="/docs/v2.3.x/build_index.md">Build an index for vectors</a></li>
<li><a href="/docs/v2.3.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.3.x/hybridsearch.md">Conduct a hybrid search</a></li>
</ul></li>
</ul>
