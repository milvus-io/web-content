---
id: insert_data.md
related_key: insert
summary: Learn how to insert data in Milvus.
title: ''
---
<h1 id="Insert-Data" class="common-anchor-header">Insert Data<button data-href="#Insert-Data" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to insert data in Milvus via client.</p>
<p>You can also migrate data to Milvus with <a href="/docs/v2.0.x/migrate_overview.md">MilvusDM</a>, an open-source tool designed specifically for importing and exporting data with Milvus.</p>
<p>The following example inserts 2,000 rows of randomly generated data as the example data (Milvus CLI example uses a pre-built, remote CSV file containing similar data). Real applications will likely use much higher dimensional vectors than the example. You can prepare your own data to replace the example.</p>
<h2 id="Prepare-data" class="common-anchor-header">Prepare data<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>First, prepare the data to insert.  Data type of the data to insert must match the schema of the collection, otherwise Milvus will raise exception.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> <span class="hljs-type">random</span>
<span class="hljs-variable">data</span> <span class="hljs-operator">=</span> [
  [i <span class="hljs-keyword">for</span> i in <span class="hljs-title function_">range</span><span class="hljs-params">(<span class="hljs-number">2000</span>)</span>],
  [i <span class="hljs-keyword">for</span> i in <span class="hljs-title function_">range</span><span class="hljs-params">(<span class="hljs-number">10000</span>, <span class="hljs-number">12000</span>)</span>],
  [[random.random() <span class="hljs-keyword">for</span> _ in <span class="hljs-title function_">range</span><span class="hljs-params">(<span class="hljs-number">2</span>)</span>] <span class="hljs-keyword">for</span> _ in <span class="hljs-title function_">range</span><span class="hljs-params">(<span class="hljs-number">2000</span>)</span>],
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">2000</span> }, <span class="hljs-function">(<span class="hljs-params">v,k</span>) =&gt;</span> ({
  <span class="hljs-string">&quot;book_id&quot;</span>: k,
  <span class="hljs-string">&quot;word_count&quot;</span>: k+<span class="hljs-number">10000</span>,
  <span class="hljs-string">&quot;book_intro&quot;</span>: <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">2</span> }, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>()),
}));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">bookIDs := <span class="hljs-built_in">make</span>([]<span class="hljs-type">int64</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2000</span>)
wordCounts := <span class="hljs-built_in">make</span>([]<span class="hljs-type">int64</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2000</span>)
bookIntros := <span class="hljs-built_in">make</span>([][]<span class="hljs-type">float32</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2000</span>)
<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">2000</span>; i++ {
    bookIDs = <span class="hljs-built_in">append</span>(bookIDs, <span class="hljs-type">int64</span>(i))
    wordCounts = <span class="hljs-built_in">append</span>(wordCounts, <span class="hljs-type">int64</span>(i+<span class="hljs-number">10000</span>))
    v := <span class="hljs-built_in">make</span>([]<span class="hljs-type">float32</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>)
    <span class="hljs-keyword">for</span> j := <span class="hljs-number">0</span>; j &lt; <span class="hljs-number">2</span>; j++ {
        v = <span class="hljs-built_in">append</span>(v, rand.Float32())
    }
    bookIntros = <span class="hljs-built_in">append</span>(bookIntros, v)
}
idColumn := entity.NewColumnInt64(<span class="hljs-string">&quot;book_id&quot;</span>, bookIDs)
wordColumn := entity.NewColumnInt64(<span class="hljs-string">&quot;word_count&quot;</span>, wordCounts)
introColumn := entity.NewColumnFloatVector(<span class="hljs-string">&quot;book_intro&quot;</span>, <span class="hljs-number">2</span>, bookIntros)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Random ran = <span class="hljs-keyword">new</span> Random();
List&lt;Long&gt; book_id_array = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();
List&lt;Long&gt; word_count_array = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();
List&lt;List&lt;Float&gt;&gt; book_intro_array = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();
<span class="hljs-keyword">for</span> (<span class="hljs-built_in">long</span> i = <span class="hljs-number">0L</span>; i &lt; <span class="hljs-number">2000</span>; ++i) {
    book_id_array.<span class="hljs-keyword">add</span>(i);
    word_count_array.<span class="hljs-keyword">add</span>(i + <span class="hljs-number">10000</span>);
    List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">int</span> k = <span class="hljs-number">0</span>; k &lt; <span class="hljs-number">2</span>; ++k) {
        vector.<span class="hljs-keyword">add</span>(ran.nextFloat());
    }
    book_intro_array.<span class="hljs-keyword">add</span>(vector);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Prepare your data in a CSV file. Milvus CLI only supports importing data from local or remote files.</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data-to-Milvus" class="common-anchor-header">Insert data to Milvus<button data-href="#Insert-data-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Insert the data to the collection.</p>
<p>By specifying <code translate="no">partition_name</code>, you can optionally decide to which partition to insert the data.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection
collection = Collection(<span class="hljs-string">&quot;book&quot;</span>)      <span class="hljs-comment"># Get an existing collection.</span>
mr = collection.insert(data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> mr = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">dataManager</span>.<span class="hljs-title function_">insert</span>({{
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;book&quot;</span>,
  <span class="hljs-attr">fields_data</span>: data,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">_, err = milvusClient.<span class="hljs-title class_">Insert</span>(
    context.<span class="hljs-title class_">Background</span>(), <span class="hljs-comment">// ctx</span>
    <span class="hljs-string">&quot;book&quot;</span>,               <span class="hljs-comment">// CollectionName</span>
    <span class="hljs-string">&quot;&quot;</span>,                   <span class="hljs-comment">// partitionName</span>
    idColumn,             <span class="hljs-comment">// columnarData</span>
    wordColumn,           <span class="hljs-comment">// columnarData</span>
    introColumn,          <span class="hljs-comment">// columnarData</span>
)
<span class="hljs-keyword">if</span> err != nil {
    log.<span class="hljs-title class_">Fatal</span>(<span class="hljs-string">&quot;failed to insert data:&quot;</span>, err.<span class="hljs-title class_">Error</span>())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;InsertParam.Field&gt; fields = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();
fields.<span class="hljs-keyword">add</span>(<span class="hljs-keyword">new</span> InsertParam.Field(<span class="hljs-string">&quot;book_id&quot;</span>, DataType.Int64, book_id_array));
fields.<span class="hljs-keyword">add</span>(<span class="hljs-keyword">new</span> InsertParam.Field(<span class="hljs-string">&quot;word_count&quot;</span>, DataType.Int64, word_count_array));
fields.<span class="hljs-keyword">add</span>(<span class="hljs-keyword">new</span> InsertParam.Field(<span class="hljs-string">&quot;book_intro&quot;</span>, DataType.FloatVector, book_intro_array));

InsertParam insertParam = InsertParam.newBuilder()
  .withCollectionName(<span class="hljs-string">&quot;book&quot;</span>)
  .withPartitionName(<span class="hljs-string">&quot;novel&quot;</span>)
  .withFields(fields)
  .build();
milvusClient.insert(insertParam);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">import</span> -c book <span class="hljs-string">&#x27;https://raw.githubusercontent.com/milvus-io/milvus_cli/main/examples/user_guide/search.csv&#x27;</span>
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
        <td><code translate="no">data</code></td>
        <td>Data to insert into Milvus.</td>
    </tr>
    <tr>
        <td><code translate="no">partition_name</code> (optional)</td>
        <td>Name of the partition to insert data into.</td>
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
        <td>Name of the collection to insert data into.</td>
    </tr>
  <tr>
        <td><code translate="no">partition_name</code> (optional)</td>
        <td>Name of the partition to insert data into.</td>
    </tr>
  <tr>
        <td><code translate="no">fields_data</code></td>
        <td>Data to insert into Milvus.</td>
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
        <td>Name of the collection to insert data in.</td>
    </tr>
    <tr>
        <td><code translate="no">partitionName</code></td>
        <td>Name of the partition to insert data in. Data will be inserted in the default partition if left blank.</td>
    </tr>
    <tr>
        <td><code translate="no">columnarData</code></td>
        <td>Data to insert into each field.</td>
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
        <td><code translate="no">fieldName</code></td>
        <td>Name of the field to insert data in.</td>
    </tr>
    <tr>
        <td><code translate="no">DataType</code></td>
        <td>Data type of the field to insert data in.</td>
    </tr>
    <tr>
        <td><code translate="no">data</code></td>
        <td>Data to insert into each field.</td>
    </tr>
        <tr>
        <td><code translate="no">CollectionName</code></td>
        <td>Name of the collection to insert data into.</td>
    </tr>
    <tr>
        <td><code translate="no">PartitionName</code> (optional)</td>
        <td>Name of the partition to insert data into.</td>
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
            <td>Name of the collection to insert data into.</td>
        </tr>
        <tr>
            <td>-p (Optional)</td>
            <td>Name of the partition to insert data into.</td>
        </tr>
    </tbody>
</table>
<h2 id="Limits" class="common-anchor-header">Limits<button data-href="#Limits" class="anchor-icon" translate="no">
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
<tr><th>Feature</th><th>Maximum limit</th></tr>
</thead>
<tbody>
<tr><td>Dimensions of a vector</td><td>32,768</td></tr>
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
<li><a href="/docs/v2.0.x/build_index.md">Build an index for vectors</a></li>
<li><a href="/docs/v2.0.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.0.x/hybridsearch.md">Conduct a hybrid search</a></li>
</ul></li>
</ul>
