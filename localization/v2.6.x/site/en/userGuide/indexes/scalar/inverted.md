---
id: inverted.md
title: INVERTED
summary: >-
  The INVERTED index in Milvus is designed to accelerate filter queries on both
  scalar fields and structured JSON fields. By mapping terms to the documents or
  records that contain them, inverted indexes greatly improve query performance
  compared to brute-force searches.
---
<h1 id="INVERTED" class="common-anchor-header">INVERTED<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h1><p>The <code translate="no">INVERTED</code> index in Milvus is designed to accelerate filter queries on both scalar fields and structured JSON fields. By mapping terms to the documents or records that contain them, inverted indexes greatly improve query performance compared to brute-force searches.</p>
<h2 id="Overview" class="common-anchor-header">Overview<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Powered by <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, Milvus implements inverted indexing to accelerate filter queries, especially for textual data. Here’s how it works:</p>
<ol>
<li><p><strong>Tokenize the Data</strong>: Milvus takes your raw data—in this example, two sentences:</p>
<ul>
<li><p><strong>“Milvus is a cloud-native vector database.”</strong></p></li>
<li><p><strong>“Milvus is very good at performance.”</strong></p></li>
</ul>
<p>and breaks them into unique words (e.g., <em>Milvus</em>, <em>is</em>, <em>cloud-native</em>, <em>vector</em>, <em>database</em>, <em>very</em>, <em>good</em>, <em>at</em>, <em>performance</em>).</p></li>
<li><p><strong>Build the Term Dictionary</strong>: These unique words are stored in a sorted list called the <strong>Term Dictionary</strong>. This dictionary lets Milvus quickly check if a word exists and locate its position in the index.</p></li>
<li><p><strong>Create the Inverted List</strong>: For each word in the Term Dictionary, Milvus keeps an <strong>Inverted List</strong> showing which documents contain that word. For instance, <strong>“Milvus”</strong> appears in both sentences, so its inverted list points to both document IDs.</p></li>
</ol>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/inverted.png" alt="Inverted" class="doc-image" id="inverted" />
    <span>Inverted</span>
  </span>
</p>
<p>Because the dictionary is sorted, term-based filtering can be handled efficiently. Instead of scanning all documents, Milvus just looks up the term in the dictionary and retrieves its inverted list—significantly speeding up searches and filters on large datasets.</p>
<h2 id="Index-a-regular-scalar-field" class="common-anchor-header">Index a regular scalar field<button data-href="#Index-a-regular-scalar-field" class="anchor-icon" translate="no">
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
    </button></h2><p>For scalar fields like <strong>BOOL</strong>, <strong>INT8</strong>, <strong>INT16</strong>, <strong>INT32</strong>, <strong>INT64</strong>, <strong>FLOAT</strong>, <strong>DOUBLE</strong>, <strong>VARCHAR</strong>, and <strong>ARRAY</strong>, creating an inverted index is straightforward. Use the <code translate="no">create_index()</code> method with the <code translate="no">index_type</code> parameter set to <code translate="no">&quot;INVERTED&quot;</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
)

index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;scalar_field_1&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>, <span class="hljs-comment"># Type of index to be created</span>
    index_name=<span class="hljs-string">&quot;inverted_index&quot;</span> <span class="hljs-comment"># Name of the index to be created</span>
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-a-JSON-field" class="common-anchor-header">Index a JSON field<button data-href="#Index-a-JSON-field" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus extends its indexing capabilities to JSON fields, allowing you to efficiently filter on nested or structured data stored within a single column. Unlike scalar fields, when indexing a JSON field you must provide two additional parameters:</p>
<ul>
<li><p><code translate="no">json_path</code><strong>:</strong> Specifies the nested key to index.</p></li>
<li><p><code translate="no">json_cast_type</code><strong>:</strong> Defines the data type (e.g., <code translate="no">&quot;varchar&quot;</code>, <code translate="no">&quot;double&quot;</code>, or <code translate="no">&quot;bool&quot;</code>) to which the extracted JSON value will be cast.</p></li>
</ul>
<p>For example, consider a JSON field named <code translate="no">metadata</code> with the following structure:</p>
<pre><code translate="no" class="language-plaintext">{
  &quot;metadata&quot;: {
    &quot;product_info&quot;: {
      &quot;category&quot;: &quot;electronics&quot;,
      &quot;brand&quot;: &quot;BrandA&quot;
    },
    &quot;price&quot;: 99.99,
    &quot;in_stock&quot;: true,
    &quot;tags&quot;: [&quot;summer_sale&quot;, &quot;clearance&quot;]
  }
}
<button class="copy-code-btn"></button></code></pre>
<p>To create inverted indexes on specific JSON paths, you can use the following approach:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

<span class="hljs-comment"># Example 1: Index the &#x27;category&#x27; key inside &#x27;product_info&#x27; as a string.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,         <span class="hljs-comment"># Specify the inverted index type</span>
    index_name=<span class="hljs-string">&quot;json_index_1&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;product_info\&quot;][\&quot;category\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;category&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>   <span class="hljs-comment"># Cast the value as a string</span>
    }
)

<span class="hljs-comment"># Example 2: Index the &#x27;price&#x27; key as a numeric type (double).</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,         <span class="hljs-comment"># JSON field name</span>
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
    index_name=<span class="hljs-string">&quot;json_index_2&quot;</span>,      <span class="hljs-comment"># Custom name for this JSON index</span>
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>,  <span class="hljs-comment"># Path to the &#x27;price&#x27; key</span>
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;double&quot;</span>           <span class="hljs-comment"># Cast the value as a double</span>
    }
)

<button class="copy-code-btn"></button></code></pre>
<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Example Value</p></th>
   </tr>
   <tr>
     <td><p><code translate="no">field_name</code></p></td>
     <td><p>Name of the JSON field in your schema.</p></td>
     <td><p><code translate="no">"metadata"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_type</code></p></td>
     <td><p>Index type to create; currently only <code translate="no">INVERTED</code> is supported for JSON path indexing.</p></td>
     <td><p><code translate="no">"INVERTED"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">index_name</code></p></td>
     <td><p>(Optional) A custom index name. Specify different names if you create multiple indexes on the same JSON field.</p></td>
     <td><p><code translate="no">"json_index_1"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_path</code></p></td>
     <td><p>Specifies which JSON path to index. You can target nested keys, array positions, or both (e.g., <code translate="no">metadata["product_info"]["category"]</code> or <code translate="no">metadata["tags"][0]</code>).
 If the path is missing or the array element does not exist for a particular row, that row is simply skipped during indexing, and no error is thrown.</p></td>
     <td><p><code translate="no">"metadata[\"product_info\"][\"category\"]"</code></p></td>
   </tr>
   <tr>
     <td><p><code translate="no">params.json_cast_type</code></p></td>
     <td><p>Data type that Milvus will cast the extracted JSON values to when building the index. Valid values:</p>
<ul>
<li><p><code translate="no">"bool"</code> or <code translate="no">"BOOL"</code></p></li>
<li><p><code translate="no">"double"</code> or <code translate="no">"DOUBLE"</code></p></li>
<li><p><code translate="no">"varchar"</code> or <code translate="no">"VARCHAR"</code></p>
<p><strong>Note</strong>: For integer values, Milvus internally uses double for the index. Large integers above 2^53 lose precision. If the cast fails (due to type mismatch), no error is thrown, and that row’s value is not indexed.</p></li>
</ul></td>
     <td><p><code translate="no">"varchar"</code></p></td>
   </tr>
</table>
<h2 id="Considerations-on-JSON-indexing" class="common-anchor-header">Considerations on JSON indexing<button data-href="#Considerations-on-JSON-indexing" class="anchor-icon" translate="no">
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
<li><p><strong>Filtering logic</strong>:</p>
<ul>
<li><p>If you <strong>create a double-type index</strong> (<code translate="no">json_cast_type=&quot;double&quot;</code>), only numeric-type filter conditions can use the index. If the filter compares a double index to a non-numeric condition, Milvus falls back to brute force search.</p></li>
<li><p>If you <strong>create a varchar-type index</strong> (<code translate="no">json_cast_type=&quot;varchar&quot;</code>), only string-type filter conditions can use the index. Otherwise, Milvus falls back to brute force.</p></li>
<li><p><strong>Boolean</strong> indexing behaves similarly to varchar-type.</p></li>
</ul></li>
<li><p><strong>Term expressions</strong>:</p>
<ul>
<li>You can use <code translate="no">json[&quot;field&quot;] in [value1, value2, …]</code>. However, the index works only for scalar values stored under that path. If <code translate="no">json[&quot;field&quot;]</code> is an array, the query falls back to brute force (array-type indexing is not yet supported).</li>
</ul></li>
<li><p><strong>Numeric precision</strong>:</p>
<ul>
<li>Internally, Milvus indexes all numeric fields as doubles. If a numeric value exceeds <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mn>53</mn></msup></mrow><annotation encoding="application/x-tex">2^{53}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">53</span></span></span></span></span></span></span></span></span></span></span></span>, it loses precision, and queries on those out-of-range values may not match exactly.</li>
</ul></li>
<li><p><strong>Data integrity</strong>:</p>
<ul>
<li>Milvus does not parse or transform JSON keys beyond your specified casting. If the source data is inconsistent (for example, some rows store a string for key <code translate="no">&quot;k&quot;</code> while others store a number), some rows will not be indexed.</li>
</ul></li>
</ul>
