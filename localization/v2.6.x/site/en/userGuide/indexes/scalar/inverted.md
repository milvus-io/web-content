---
id: inverted.md
title: INVERTED
summary: >-
  When you need to perform frequent filter queries on your data, INVERTED
  indexes can dramatically improve query performance. Instead of scanning
  through all documents, Milvus uses inverted indexes to quickly locate the
  exact records that match your filter conditions.
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
    </button></h1><p>When you need to perform frequent filter queries on your data, <code translate="no">INVERTED</code> indexes can dramatically improve query performance. Instead of scanning through all documents, Milvus uses inverted indexes to quickly locate the exact records that match your filter conditions.</p>
<h2 id="When-to-use-INVERTED-indexes" class="common-anchor-header">When to use INVERTED indexes<button data-href="#When-to-use-INVERTED-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Use INVERTED indexes when you need to:</p>
<ul>
<li><p><strong>Filter by specific values</strong>: Find all records where a field equals a specific value (e.g., <code translate="no">category == &quot;electronics&quot;</code>)</p></li>
<li><p><strong>Filter text content</strong>: Perform efficient searches on <code translate="no">VARCHAR</code> fields</p></li>
<li><p><strong>Query JSON field values</strong>: Filter on specific keys within JSON structures</p></li>
</ul>
<p><strong>Performance benefit</strong>: INVERTED indexes can reduce query time from seconds to milliseconds on large datasets by eliminating the need for full collection scans.</p>
<h2 id="How-INVERTED-indexes-work" class="common-anchor-header">How INVERTED indexes work<button data-href="#How-INVERTED-indexes-work" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus uses <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a> to implement inverted indexing. Here’s the process:</p>
<ol>
<li><p><strong>Tokenization</strong>: Milvus breaks down your data into searchable terms</p></li>
<li><p><strong>Term dictionary</strong>: Creates a sorted list of all unique terms</p></li>
<li><p><strong>Inverted lists</strong>: Maps each term to the documents containing it</p></li>
</ol>
<p>For example, given these two sentences:</p>
<ul>
<li><p><strong>“Milvus is a cloud-native vector database”</strong></p></li>
<li><p><strong>“Milvus is very good at performance”</strong></p></li>
</ul>
<p>The inverted index maps terms like <strong>“Milvus”</strong> → <strong>[Document 0, Document 1]</strong>, <strong>“cloud-native”</strong> → <strong>[Document 0]</strong>, and <strong>“performance”</strong> → <strong>[Document 1]</strong>.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/inverted-index.png" alt="Inverted Index" class="doc-image" id="inverted-index" />
    <span>Inverted Index</span>
  </span>
</p>
<p>When you filter by a term, Milvus looks up the term in the dictionary and instantly retrieves all matching documents.</p>
<p>INVERTED indexes support all scalar field types: <strong>BOOL</strong>, <strong>INT8</strong>, <strong>INT16</strong>, <strong>INT32</strong>, <strong>INT64</strong>, <strong>FLOAT</strong>, <strong>DOUBLE</strong>, <strong>VARCHAR</strong>, <strong>JSON</strong>, and <strong>ARRAY</strong>. However, the index parameters for indexing a JSON field are slightly different from regular scalar fields.</p>
<h2 id="Create-indexes-on-non-JSON-fields" class="common-anchor-header">Create indexes on non-JSON fields<button data-href="#Create-indexes-on-non-JSON-fields" class="anchor-icon" translate="no">
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
    </button></h2><p>To create an index on a non-JSON field, follow these steps:</p>
<ol>
<li><p>Prepare your index parameters:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>) <span class="hljs-comment"># Replace with your server address</span>

<span class="hljs-comment"># Create an empty index parameter object</span>
index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Add the <code translate="no">INVERTED</code> index:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;category&quot;</span>,           <span class="hljs-comment"># Name of the field to index</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,          <span class="hljs-comment"># Specify INVERTED index type</span></span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>     <span class="hljs-comment"># Give your index a name</span>
)
<button class="copy-code-btn"></button></code></pre></li>
<li><p>Create the index:</p>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Replace with your collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h2 id="Create-indexes-on-JSON-fields--Milvus-2511+" class="common-anchor-header">Create indexes on JSON fields<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.5.11+</span><button data-href="#Create-indexes-on-JSON-fields--Milvus-2511+" class="anchor-icon" translate="no">
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
    </button></h2><p>You can also create INVERTED indexes on specific paths within JSON fields. This requires additional parameters to specify the JSON path and data type:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Build index params</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,                    <span class="hljs-comment"># JSON field name</span>
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;metadata_category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>,    <span class="hljs-comment"># Path to the JSON key</span></span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;varchar&quot;</span>              <span class="hljs-comment"># Data type to cast to during indexing</span></span>
<span class="highlighted-comment-line">    }</span>
)

<span class="hljs-comment"># Create index</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Replace with your collection name</span>
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>For detailed information about JSON field indexing, including supported paths, data types, and limitations, refer to <a href="/docs/use-json-fields.md">JSON Field</a>.</p>
<h2 id="Best-practices" class="common-anchor-header">Best practices<button data-href="#Best-practices" class="anchor-icon" translate="no">
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
<li><p><strong>Create indexes after loading data</strong>: Build indexes on collections that already contain data for better performance</p></li>
<li><p><strong>Use descriptive index names</strong>: Choose names that clearly indicate the field and purpose</p></li>
<li><p><strong>Monitor index performance</strong>: Check query performance before and after creating indexes</p></li>
<li><p><strong>Consider your query patterns</strong>: Create indexes on fields you frequently filter by</p></li>
</ul>
<h2 id="Next-steps" class="common-anchor-header">Next steps<button data-href="#Next-steps" class="anchor-icon" translate="no">
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
<li><p>Learn about <a href="/docs/index-explained.md">other index types</a></p></li>
<li><p>See <a href="/docs/use-json-fields.md#Index-values-inside-the-JSON-field">JSON field indexing</a> for advanced JSON indexing scenarios</p></li>
</ul>
