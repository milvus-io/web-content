---
id: boolean.md
title: Filtering Explained
summary: >-
  Milvus provides powerful filtering capabilities that enable precise querying
  of your data. Filter expressions allow you to target specific scalar fields
  and refine search results with different conditions. This guide explains how
  to use filter expressions in Milvus, with examples focused on query
  operations. You can also apply these filters in search and delete requests.
---
<h1 id="Filtering-Explained" class="common-anchor-header">Filtering Explained<button data-href="#Filtering-Explained" class="anchor-icon" translate="no">
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
    </button></h1><p>Milvus provides powerful filtering capabilities that enable precise querying of your data. Filter expressions allow you to target specific scalar fields and refine search results with different conditions. This guide explains how to use filter expressions in Milvus, with examples focused on query operations. You can also apply these filters in search and delete requests.</p>
<h2 id="Basic-operators" class="common-anchor-header">Basic operators<button data-href="#Basic-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus supports several basic operators for filtering data:</p>
<ul>
<li><p><strong>Comparison Operators</strong>: <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, and <code translate="no">&lt;=</code> allow filtering based on numeric or text fields.</p></li>
<li><p><strong>Range Filters</strong>: <code translate="no">IN</code> and <code translate="no">LIKE</code> help match specific value ranges or sets.</p></li>
<li><p><strong>Arithmetic Operators</strong>: <code translate="no">+</code>, <code translate="no">-</code>, <code translate="no">*</code>, <code translate="no">/</code>, <code translate="no">%</code>, and <code translate="no">**</code> are used for calculations involving numeric fields.</p></li>
<li><p><strong>Logical Operators</strong>: <code translate="no">AND</code>, <code translate="no">OR</code>, and <code translate="no">NOT</code> combine multiple conditions into complex expressions.</p></li>
</ul>
<h3 id="Example-Filtering-by-Color" class="common-anchor-header">Example: Filtering by Color</h3><p>To find entities with primary colors (red, green, or blue) in a scalar field <code translate="no">color</code>, use the following filter expression:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color in [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;]&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-JSON-Fields" class="common-anchor-header">Example: Filtering JSON Fields</h3><p>Milvus allows referencing keys in JSON fields. For instance, if you have a JSON field <code translate="no">product</code> with keys <code translate="no">price</code> and <code translate="no">model</code>, and want to find products with a specific model and price lower than 1,850, use this filter expression:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;product[&quot;model&quot;] == &quot;JSN-087&quot; AND product[&quot;price&quot;] &lt; 1850&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Filtering-Array-Fields" class="common-anchor-header">Example: Filtering Array Fields</h3><p>If you have an array field <code translate="no">history_temperatures</code> containing the records of average temperatures reported by observatories since the year 2000, and want to find observatories where the temperature in 2009 (the 10th recorded ) exceeds 23°C, use this expression:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;history_temperatures[10] &gt; 23&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>For more information on these basic operators, refer to <a href="/docs/v2.6.x/basic-operators.md">Basic Operators</a>.</p>
<h2 id="Filter-expression-templates" class="common-anchor-header">Filter expression templates<button data-href="#Filter-expression-templates" class="anchor-icon" translate="no">
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
    </button></h2><p>When filtering using CJK characters, processing can be more complex due to their larger character sets and encoding differences. This can result in slower performance, especially with the <code translate="no">IN</code> operator.</p>
<p>Milvus introduces filter expression templating to optimize performance when working with CJK characters. By separating dynamic values from the filter expression, the query engine handles parameter insertion more efficiently.</p>
<h3 id="Example" class="common-anchor-header">Example</h3><p>To find individuals over the age of 25 living in either “北京” (Beijing) or “上海” (Shanghai), use the following template expression:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; 25 AND city IN [&#x27;北京&#x27;, &#x27;上海&#x27;]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>To improve performance, use this variation with parameters:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;age &gt; {age} AND city in {city}&quot;</span>,
filter_params = {<span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>, <span class="hljs-string">&quot;city&quot;</span>: [<span class="hljs-string">&quot;北京&quot;</span>, <span class="hljs-string">&quot;上海&quot;</span>]}
<button class="copy-code-btn"></button></code></pre>
<p>This approach reduces parsing overhead and improves query speed. For more information, see <a href="/docs/v2.6.x/filtering-templating.md">Filter Templating</a>.</p>
<h2 id="Data-type-specific-operators" class="common-anchor-header">Data type-specific operators<button data-href="#Data-type-specific-operators" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus provides advanced filtering operators for specific data types, such as JSON, ARRAY, and VARCHAR fields.</p>
<h3 id="JSON-field-specific-operators" class="common-anchor-header">JSON field-specific operators</h3><p>Milvus offers advanced operators for querying JSON fields, enabling precise filtering within complex JSON structures:</p>
<p><code translate="no">JSON_CONTAINS(identifier, jsonExpr)</code>: Checks if a JSON expression exists in the field.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains(tags, &quot;sale&quot;)&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ALL(identifier, jsonExpr)</code>: Ensures all elements of the JSON expression are present.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;, &quot;discount&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_all(tags, [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">JSON_CONTAINS_ANY(identifier, jsonExpr)</code>: Filters for entities where at least one element exists in the JSON expression.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># JSON data: {&quot;tags&quot;: [&quot;electronics&quot;, &quot;sale&quot;, &quot;new&quot;]}</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;json_contains_any(tags, [&quot;electronics&quot;, &quot;new&quot;, &quot;clearance&quot;])&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>For more details on JSON operators, refer to <a href="/docs/v2.6.x/json-operators.md">JSON Operators</a>.</p>
<h3 id="ARRAY-field-specific-operators" class="common-anchor-header">ARRAY field-specific operators</h3><p>Milvus provides advanced filtering operators for array fields, such as <code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ALL</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, and <code translate="no">ARRAY_LENGTH</code>, which allow fine-grained control over array data:</p>
<p><code translate="no">ARRAY_CONTAINS</code>: Filters entities containing a specific element.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS(history_temperatures, 23)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ALL</code>: Filters entities where all elements in a list are present.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ALL(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_CONTAINS_ANY</code>: Filters entities containing any element from the list.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_CONTAINS_ANY(history_temperatures, [23, 24])&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">ARRAY_LENGTH</code>: Filters based on the length of the array.</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;ARRAY_LENGTH(history_temperatures) &lt; 10&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>For more details on array operators, see <a href="/docs/v2.6.x/array-operators.md">ARRAY Operators</a>.</p>
<h3 id="VARCHAR-field-specific-operators" class="common-anchor-header">VARCHAR field-specific operators</h3><p>Milvus provides specialized operators for precise text-based searches on VARCHAR fields:</p>
<h4 id="TEXTMATCH-operator" class="common-anchor-header"><code translate="no">TEXT_MATCH</code> operator</h4><p>The <code translate="no">TEXT_MATCH</code> operator allows precise document retrieval based on specific query terms. It is particularly useful for filtered searches that combine scalar filters with vector similarity searches. Unlike semantic searches, Text Match focuses on exact term occurrences.</p>
<p>Milvus uses Tantivy to support inverted indexing and term-based text search. The process involves:</p>
<ol>
<li><p><strong>Analyzer</strong>: Tokenizes and processes input text.</p></li>
<li><p><strong>Indexing</strong>: Creates an inverted index mapping unique tokens to documents.</p></li>
</ol>
<p>For more details, refer to <a href="/docs/v2.6.x/keyword-match.md">Text Match</a>.</p>
<h4 id="PHRASEMATCH-operator--Milvus-26x" class="common-anchor-header"><code translate="no">PHRASE_MATCH</code> operator<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span></h4><p>The <strong>PHRASE_MATCH</strong> operator enables precise retrieval of documents based on exact phrase matches, considering both the order and adjacency of query terms.</p>
<p>For more details, refer to <a href="/docs/v2.6.x/phrase-match.md">Phrase Match</a>.</p>
<h2 id="Random-sampling-operator--Milvus-26x" class="common-anchor-header">Random sampling operator<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.x</span><button data-href="#Random-sampling-operator--Milvus-26x" class="anchor-icon" translate="no">
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
    </button></h2><p>Random sampling allows you to extract a subset of data samples from a collection at the segment level, making it ideal for exploring and processing massive datasets. This feature is valuable for these use cases:</p>
<ul>
<li><p><strong>Quick data preview</strong>: It returns representative sample data with minimal resource usage, which allows you to quickly grasp the overall structure and content of large vector datasets.</p></li>
<li><p><strong>Combined filtering</strong>: When performing multi-criteria filtering (e.g., selecting documents by attributes), combining it with random sampling enables quick statistical summaries and previews on the filtered results.</p></li>
<li><p><strong>Resource saving in large-scale data processing</strong>: For very large datasets, aggregating and analyzing full data can be resource-intensive. Random sampling reduces the processing load by lowering the amount of data handled.</p></li>
</ul>
<p>Use the following syntax for random sampling:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = RANDOM_SAMPLE(<span class="hljs-built_in">float</span>)
<button class="copy-code-btn"></button></code></pre>
<ul>
<li><code translate="no">float</code><strong>:</strong> A sampling factor in the range (0, 1), excluding the boundaries. For example, <code translate="no">RANDOM_SAMPLE(0.001)</code> selects approximately 0.1% of the results.</li>
</ul>
<div class="alert note">
<p>The <code translate="no">RANDOM_SAMPLE</code> expression is case-insensitive. You can use either <code translate="no">RANDOM_SAMPLE</code> or <code translate="no">random_sample</code>.</p>
</div>
<h3 id="Combine-with-other-filters" class="common-anchor-header">Combine with other filters</h3><p>The random sampling operator must be combined with other filtering expressions using logical <code translate="no">AND</code>. For example:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;color = &#x27;red&#x27; and RANDOM_SAMPLE(0.001)&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Here, Milvus first applies the condition <code translate="no">color = 'red'</code> and then performs random sampling on the result set.</p>
<h3 id="Example-Random-sampling-without-an-additional-filter" class="common-anchor-header">Example: Random sampling without an additional filter</h3><p>In this example, the query samples a random subset (approximately 1%) of the entire data in the specified collection:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;RANDOM_SAMPLE(0.01)&quot;</span>

result = MilvusClient.query(
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>, 
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-Combined-filtering-with-random-sampling" class="common-anchor-header">Example: Combined filtering with random sampling</h3><p>In this example, the query first filters documents based on a specific attribute (in this case, documents where <code translate="no">color</code> equals <code translate="no">'red'</code>). After filtering, the random sampling operator is applied to return roughly 0.1% of the filtered results:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = <span class="hljs-string">&quot;color = &#x27;red&#x27; and RANDOM_SAMPLE(0.001)&quot;</span>

result = MilvusClient.query(
    collection_name=<span class="hljs-string">&quot;YOUR_COLLECTION_NAME&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-built_in">filter</span>, 
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
