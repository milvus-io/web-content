---
id: calculate_distance.md
related_key: calculate distance
summary: Learn how to calculate distance between vectors with Milvus.
title: ''
---
<h1 id="Calculate-Distance-Between-Vectors" class="common-anchor-header">Calculate Distance Between Vectors<button data-href="#Calculate-Distance-Between-Vectors" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to calculate distance between vectors with Milvus.</p>
<p>Milvus searches most similar vectors based on the distance calculation of vectors. Vice versa, you can use Milvus to calculate the distance between vectors using distance metrics that suit specific scenario. See <a href="/docs/v2.0.x/metric.md">Similarity Metrics</a> for more information.</p>
<p>The following example simulates the scenarios when you want to calculate the distance between vectors in the collection and some other vectors.</p>
<h2 id="Prepare-vectors" class="common-anchor-header">Prepare vectors<button data-href="#Prepare-vectors" class="anchor-icon" translate="no">
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
    </button></h2><p>Prepare the vectors used for calculation.</p>
<div class="alert note">
Vectors to be calculated must agree in vector type and dimension.
</div>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>
<pre><code translate="no" class="language-python">vectors_left = {
    <span class="hljs-string">&quot;ids&quot;</span>: [<span class="hljs-number">0</span>, <span class="hljs-number">1</span>], 
    <span class="hljs-string">&quot;collection&quot;</span>: <span class="hljs-string">&quot;book&quot;</span>, 
    <span class="hljs-string">&quot;partition&quot;</span>: <span class="hljs-string">&quot;_default&quot;</span>, 
    <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;book_intro&quot;</span>
}
<span class="hljs-keyword">import</span> <span class="hljs-type">random</span>
<span class="hljs-variable">external_vectors</span> <span class="hljs-operator">=</span> [[random.random() <span class="hljs-keyword">for</span> _ in <span class="hljs-title function_">range</span><span class="hljs-params">(<span class="hljs-number">2</span>)</span>] <span class="hljs-keyword">for</span> _ in <span class="hljs-title function_">range</span><span class="hljs-params">(<span class="hljs-number">4</span>)</span>]
vectors_right = {<span class="hljs-string">&quot;float_vectors&quot;</span>: external_vectors}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Node User Guide will be ready soon.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// GO User Guide will be ready soon.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java User Guide will be ready soon.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-comment">// CLI User Guide will be ready soon.</span>
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
        <td><code translate="no">vectors_left</code> and <code translate="no">vectors_right</code></td>
        <td>Vectors on the left and right side of the operator. Dict type that can be represented as <code translate="no">{"ids": [primary_key_1, primary_key_2, ... primary_key_n], "collection": "collection_name", "partition": "partition_name", "field": "vector_field_name"}</code>, <code translate="no">{"float_vectors": [[1.0, 2.0], [3.0, 4.0], ... [9.0, 10.0]]}</code>, or <code translate="no">{"bin_vectors": [b'', b'N', ... b'Ê']}</code>.</td>
    </tr>
    <tr>
        <td><code translate="no">ids</code></td>
        <td>List of primary key of entities that in the collection.</td>
    </tr>
    <tr>
        <td><code translate="no">collection</code></td>
        <td>Name of the collection that holds the entities.</td>
    </tr>
    <tr>
        <td><code translate="no">partition</code></td>
        <td>Name of the partition that holds the entities.</td>
    </tr>
    <tr>
        <td><code translate="no">field</code></td>
        <td>Name of the vector field in the collection.</td>
    </tr>
    <tr>
        <td><code translate="no">float_vectors</code> or <code translate="no">bin_vectors</code></td>
        <td>Type of the vectors.</td>
    </tr>
    </tbody>
</table>
<h2 id="Prepare-calculation-parameters" class="common-anchor-header">Prepare calculation parameters<button data-href="#Prepare-calculation-parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>Specify the parameters used for the calculation.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">params</span> = {
    <span class="hljs-string">&quot;metric&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, 
    <span class="hljs-string">&quot;dim&quot;</span>: <span class="hljs-number">2</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Node User Guide will be ready soon.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// GO User Guide will be ready soon.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java User Guide will be ready soon.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-comment">// CLI User Guide will be ready soon.</span>
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">params</code></td>
            <td>Calculation parameters.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">metric</code></td>
            <td>Metric types used for calculation.</td>
            <td>For floating point vectors:
                <ul>
                    <li><code translate="no">L2</code> (Euclidean distance)</li>
                    <li><code translate="no">IP</code> (Inner product)</li>
                </ul>
                For binary vectors:
                <ul>
                    <li><code translate="no">JACCARD</code> (Jaccard distance)</li>
                    <li><code translate="no">TANIMOTO</code> (Tanimoto distance)</li>
                    <li><code translate="no">HAMMING</code> (Hamming distance)</li>
                    <li><code translate="no">SUPERSTRUCTURE</code> (Superstructure)</li>
                    <li><code translate="no">SUBSTRUCTURE</code> (Substructure)</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><code translate="no">dim</code></td>
            <td>Dimension of the vector.</td>
            <td>N/A</td>
        </tr>
    </tbody>
</table>
<h2 id="Optional-Load-collection" class="common-anchor-header">(Optional) Load collection<button data-href="#Optional-Load-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>If you calculate with the vectors in a collection in Milvus, you must load the collection to memory first.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection
collection = Collection(<span class="hljs-string">&quot;book&quot;</span>)      <span class="hljs-comment"># Get an existing collection.</span>
collection.load()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">collectionManager</span>.<span class="hljs-title function_">loadCollection</span>({
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
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">milvusClient.<span class="hljs-title function_">loadCollection</span>(
  <span class="hljs-title class_">LoadCollectionParam</span>.<span class="hljs-title function_">newBuilder</span>()
    .<span class="hljs-title function_">withCollectionName</span>(<span class="hljs-string">&quot;book&quot;</span>)
    .<span class="hljs-title function_">build</span>()
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">load -c book
<button class="copy-code-btn"></button></code></pre>
<h2 id="Calculate-vector-distance" class="common-anchor-header">Calculate vector distance<button data-href="#Calculate-vector-distance" class="anchor-icon" translate="no">
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
    </button></h2><p>Calculate the distance between vectors based on the vectors and parameters provided.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> utility
results = utility.calc_distance(
    vectors_left=vectors_left, 
    vectors_right=vectors_right, 
    params=params
)
<span class="hljs-built_in">print</span>(results)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Node User Guide will be ready soon.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// GO User Guide will be ready soon.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Java User Guide will be ready soon.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-comment">// CLI User Guide will be ready soon.</span>
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
<li><a href="/docs/v2.0.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.0.x/hybridsearch.md">Conduct a hybrid search</a></li>
<li><a href="/docs/v2.0.x/timetravel.md">Search with Time Travel</a></li>
</ul></li>
</ul>
