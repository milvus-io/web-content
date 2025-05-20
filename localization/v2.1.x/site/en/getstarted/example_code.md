---
id: example_code.md
related_key: pymilvus
label: Python
order: 0
group: example_code.md
summary: Get started with Milvus faster using this Python example code.
title: ''
---
<div class="tab-wrapper"><a href="/docs/v2.1.x/example_code.md" class='active '>Python</a><a href="/docs/v2.1.x/example_code_node.md" class=''>Node.js</a></div>
<h1 id="Run-Milvus-using-Python" class="common-anchor-header">Run Milvus using Python<button data-href="#Run-Milvus-using-Python" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to run Milvus using Python.</p>
<p>Through running the example code we provided, you will have a primary understanding of what Milvus is capable of.</p>
<h2 id="Preparations" class="common-anchor-header">Preparations<button data-href="#Preparations" class="anchor-icon" translate="no">
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
<li><a href="/docs/v2.1.x/install_standalone-docker.md">Milvus 2.1.3</a></li>
<li>Python 3 (3.71 or later)</li>
<li><a href="/docs/v2.1.x/install-pymilvus.md">PyMilvus 2.1.3</a></li>
</ul>
<h2 id="Download-example-code" class="common-anchor-header">Download example code<button data-href="#Download-example-code" class="anchor-icon" translate="no">
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
    </button></h2><p><a href="https://raw.githubusercontent.com/milvus-io/pymilvus/v2.1.x/examples/hello_milvus.py">Download</a> <code translate="no">hello_milvus.py</code> directly or with the following command.</p>
<pre><code translate="no" class="language-bash">$ wget https://raw.githubusercontent.com/milvus-io/pymilvus/v2.1.x/examples/hello_milvus.py
<button class="copy-code-btn"></button></code></pre>
<h2 id="Scan-the-example-code" class="common-anchor-header">Scan the example code<button data-href="#Scan-the-example-code" class="anchor-icon" translate="no">
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
    </button></h2><p>The example code performs the following steps.</p>
<ul>
<li>Imports a PyMilvus package:</li>
</ul>
<pre><code translate="no" class="language-Python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (
    connections,
    utility,
    <span class="hljs-title class_">FieldSchema</span>,
    <span class="hljs-title class_">CollectionSchema</span>,
    <span class="hljs-title class_">DataType</span>,
    <span class="hljs-title class_">Collection</span>,
)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Connects to a server:</li>
</ul>
<pre><code translate="no" class="language-Python">connections.<span class="hljs-title function_">connect</span>(<span class="hljs-string">&quot;default&quot;</span>, host=<span class="hljs-string">&quot;localhost&quot;</span>, port=<span class="hljs-string">&quot;19530&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Creates a collection:</li>
</ul>
<pre><code translate="no" class="language-Python">fields = [
    FieldSchema(name=<span class="hljs-string">&quot;pk&quot;</span>, dtype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>),
    FieldSchema(name=<span class="hljs-string">&quot;random&quot;</span>, dtype=DataType.DOUBLE),
    FieldSchema(name=<span class="hljs-string">&quot;embeddings&quot;</span>, dtype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">8</span>)
]
schema = CollectionSchema(fields, <span class="hljs-string">&quot;hello_milvus is the simplest demo to introduce the APIs&quot;</span>)
hello_milvus = Collection(<span class="hljs-string">&quot;hello_milvus&quot;</span>, schema)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Inserts vectors in the collection:</li>
</ul>
<pre><code translate="no" class="language-Python"><span class="hljs-keyword">import</span> random
entities = [
    [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)],  <span class="hljs-comment"># field pk</span>
    [<span class="hljs-built_in">float</span>(random.randrange(-<span class="hljs-number">20</span>, -<span class="hljs-number">10</span>)) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)],  <span class="hljs-comment"># field random</span>
    [[random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">8</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">3000</span>)],  <span class="hljs-comment"># field embeddings</span>
]
insert_result = hello_milvus.insert(entities)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Builds indexes on the entities:</li>
</ul>
<pre><code translate="no" class="language-Python">index = {
    <span class="hljs-string">&quot;index_type&quot;</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},
}
hello_milvus.<span class="hljs-title function_">create_index</span>(<span class="hljs-string">&quot;embeddings&quot;</span>, index)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Loads the collection to memory and performs a vector similarity search:</li>
</ul>
<pre><code translate="no" class="language-Python">hello_milvus.load()
vectors_to_search = entities[-1][-2:]
search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: 10},
}
result = hello_milvus.search(vectors_to_search, <span class="hljs-string">&quot;embeddings&quot;</span>, search_params, <span class="hljs-built_in">limit</span>=3, output_fields=[<span class="hljs-string">&quot;random&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Performs a vector query:</li>
</ul>
<pre><code translate="no" class="language-Python">result = hello_milvus.query(<span class="hljs-built_in">expr</span>=<span class="hljs-string">&quot;random &gt; -14&quot;</span>, output_fields=[<span class="hljs-string">&quot;random&quot;</span>, <span class="hljs-string">&quot;embeddings&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Performs a hybrid search:</li>
</ul>
<pre><code translate="no" class="language-Python">result = hello_milvus.search(vectors_to_search, <span class="hljs-string">&quot;embeddings&quot;</span>, search_params, <span class="hljs-built_in">limit</span>=3, <span class="hljs-built_in">expr</span>=<span class="hljs-string">&quot;random &gt; -12&quot;</span>, output_fields=[<span class="hljs-string">&quot;random&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Deletes entities by their primary keys:</li>
</ul>
<pre><code translate="no" class="language-Python">expr = <span class="hljs-string">f&quot;pk in [<span class="hljs-subst">{ids[<span class="hljs-number">0</span>]}</span>, <span class="hljs-subst">{ids[<span class="hljs-number">1</span>]}</span>]&quot;</span>
hello_milvus.delete(expr)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li>Drops the collection:</li>
</ul>
<pre><code translate="no" class="language-Python">utility.<span class="hljs-title function_">drop_collection</span>(<span class="hljs-string">&quot;hello_milvus&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Run-the-example-code" class="common-anchor-header">Run the example code<button data-href="#Run-the-example-code" class="anchor-icon" translate="no">
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
    </button></h2><p>Execute the following command to run the example code.</p>
<pre><code translate="no" class="language-Python">$ python3 hello_milvus.py
<button class="copy-code-btn"></button></code></pre>
<p><em>The returned results and query latency are shown as follows:</em></p>
<pre><code translate="no">=== start connecting to <span class="hljs-title class_">Milvus</span>     ===

<span class="hljs-title class_">Does</span> collection hello_milvus exist <span class="hljs-keyword">in</span> <span class="hljs-title class_">Milvus</span>: <span class="hljs-title class_">False</span>

=== <span class="hljs-title class_">Create</span> collection <span class="hljs-string">`hello_milvus`</span> ===


=== <span class="hljs-title class_">Start</span> inserting entities       ===

<span class="hljs-title class_">Number</span> <span class="hljs-keyword">of</span> entities <span class="hljs-keyword">in</span> <span class="hljs-title class_">Milvus</span>: <span class="hljs-number">3000</span>

=== <span class="hljs-title class_">Start</span> <span class="hljs-title class_">Creating</span> index <span class="hljs-variable constant_">IVF_FLAT</span>  ===


=== <span class="hljs-title class_">Start</span> loading                  ===


=== <span class="hljs-title class_">Start</span> searching based on vector similarity ===

<span class="hljs-attr">hit</span>: (<span class="hljs-attr">distance</span>: <span class="hljs-number">0.0</span>, <span class="hljs-attr">id</span>: <span class="hljs-number">2998</span>), random <span class="hljs-attr">field</span>: -<span class="hljs-number">11.0</span>
<span class="hljs-attr">hit</span>: (<span class="hljs-attr">distance</span>: <span class="hljs-number">0.11455299705266953</span>, <span class="hljs-attr">id</span>: <span class="hljs-number">1581</span>), random <span class="hljs-attr">field</span>: -<span class="hljs-number">18.0</span>
<span class="hljs-attr">hit</span>: (<span class="hljs-attr">distance</span>: <span class="hljs-number">0.1232629269361496</span>, <span class="hljs-attr">id</span>: <span class="hljs-number">2647</span>), random <span class="hljs-attr">field</span>: -<span class="hljs-number">13.0</span>
<span class="hljs-attr">hit</span>: (<span class="hljs-attr">distance</span>: <span class="hljs-number">0.0</span>, <span class="hljs-attr">id</span>: <span class="hljs-number">2999</span>), random <span class="hljs-attr">field</span>: -<span class="hljs-number">11.0</span>
<span class="hljs-attr">hit</span>: (<span class="hljs-attr">distance</span>: <span class="hljs-number">0.10560893267393112</span>, <span class="hljs-attr">id</span>: <span class="hljs-number">2430</span>), random <span class="hljs-attr">field</span>: -<span class="hljs-number">18.0</span>
<span class="hljs-attr">hit</span>: (<span class="hljs-attr">distance</span>: <span class="hljs-number">0.13938161730766296</span>, <span class="hljs-attr">id</span>: <span class="hljs-number">377</span>), random <span class="hljs-attr">field</span>: -<span class="hljs-number">14.0</span>
search latency = <span class="hljs-number">0.</span>2796s

=== <span class="hljs-title class_">Start</span> querying <span class="hljs-keyword">with</span> <span class="hljs-string">`random &gt; -14`</span> ===

query <span class="hljs-attr">result</span>:
-{<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-number">9</span>, <span class="hljs-string">&#x27;random&#x27;</span>: -<span class="hljs-number">13.0</span>, <span class="hljs-string">&#x27;embeddings&#x27;</span>: [<span class="hljs-number">0.298433</span>, <span class="hljs-number">0.931987</span>, <span class="hljs-number">0.949756</span>, <span class="hljs-number">0.598713</span>, <span class="hljs-number">0.290125</span>, <span class="hljs-number">0.094323</span>, <span class="hljs-number">0.064444</span>, <span class="hljs-number">0.306993</span>]}
search latency = <span class="hljs-number">0.</span>2970s

=== <span class="hljs-title class_">Start</span> hybrid searching <span class="hljs-keyword">with</span> <span class="hljs-string">`random &gt; -12`</span> ===

<span class="hljs-attr">hit</span>: (<span class="hljs-attr">distance</span>: <span class="hljs-number">0.0</span>, <span class="hljs-attr">id</span>: <span class="hljs-number">2998</span>), random <span class="hljs-attr">field</span>: -<span class="hljs-number">11.0</span>
<span class="hljs-attr">hit</span>: (<span class="hljs-attr">distance</span>: <span class="hljs-number">0.15773043036460876</span>, <span class="hljs-attr">id</span>: <span class="hljs-number">472</span>), random <span class="hljs-attr">field</span>: -<span class="hljs-number">11.0</span>
<span class="hljs-attr">hit</span>: (<span class="hljs-attr">distance</span>: <span class="hljs-number">0.3273330628871918</span>, <span class="hljs-attr">id</span>: <span class="hljs-number">2146</span>), random <span class="hljs-attr">field</span>: -<span class="hljs-number">11.0</span>
<span class="hljs-attr">hit</span>: (<span class="hljs-attr">distance</span>: <span class="hljs-number">0.0</span>, <span class="hljs-attr">id</span>: <span class="hljs-number">2999</span>), random <span class="hljs-attr">field</span>: -<span class="hljs-number">11.0</span>
<span class="hljs-attr">hit</span>: (<span class="hljs-attr">distance</span>: <span class="hljs-number">0.15844076871871948</span>, <span class="hljs-attr">id</span>: <span class="hljs-number">2218</span>), random <span class="hljs-attr">field</span>: -<span class="hljs-number">11.0</span>
<span class="hljs-attr">hit</span>: (<span class="hljs-attr">distance</span>: <span class="hljs-number">0.1622171700000763</span>, <span class="hljs-attr">id</span>: <span class="hljs-number">1403</span>), random <span class="hljs-attr">field</span>: -<span class="hljs-number">11.0</span>
search latency = <span class="hljs-number">0.</span>3028s

=== <span class="hljs-title class_">Start</span> deleting <span class="hljs-keyword">with</span> expr <span class="hljs-string">`pk in [0, 1]`</span> ===

query before <span class="hljs-keyword">delete</span> by expr=<span class="hljs-string">`pk in [0, 1]`</span> -&gt; <span class="hljs-attr">result</span>: 
-{<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&#x27;random&#x27;</span>: -<span class="hljs-number">18.0</span>, <span class="hljs-string">&#x27;embeddings&#x27;</span>: [<span class="hljs-number">0.142279</span>, <span class="hljs-number">0.414248</span>, <span class="hljs-number">0.378628</span>, <span class="hljs-number">0.971863</span>, <span class="hljs-number">0.535941</span>, <span class="hljs-number">0.107011</span>, <span class="hljs-number">0.207052</span>, <span class="hljs-number">0.98182</span>]}
-{<span class="hljs-string">&#x27;pk&#x27;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&#x27;random&#x27;</span>: -<span class="hljs-number">15.0</span>, <span class="hljs-string">&#x27;embeddings&#x27;</span>: [<span class="hljs-number">0.57512</span>, <span class="hljs-number">0.358512</span>, <span class="hljs-number">0.439131</span>, <span class="hljs-number">0.862369</span>, <span class="hljs-number">0.083284</span>, <span class="hljs-number">0.294493</span>, <span class="hljs-number">0.004961</span>, <span class="hljs-number">0.180082</span>]}

query after <span class="hljs-keyword">delete</span> by expr=<span class="hljs-string">`pk in [0, 1]`</span> -&gt; <span class="hljs-attr">result</span>: []


=== <span class="hljs-title class_">Drop</span> collection <span class="hljs-string">`hello_milvus`</span> ===
<button class="copy-code-btn"></button></code></pre>
<p><br/></p>
<p><em>Congratulations! You have started Milvus standalone and performed your first vector similarity search.</em></p>
