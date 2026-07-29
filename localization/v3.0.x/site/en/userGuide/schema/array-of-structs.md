---
id: array-of-structs.md
title: StructArray Overview
summary: >-
  Use StructArray when one entity needs to store an ordered list of structured
  elements, such as one document with many chunks, one page with many visual
  patches, or one video with many clips. StructArray keeps these elements inside
  the parent entity while still allowing vector search and scalar filtering on
  fields inside each element.
---
<h1 id="StructArray-Overview" class="common-anchor-header">StructArray Overview<button data-href="#StructArray-Overview" class="anchor-icon" translate="no">
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
    </button></h1><p>Use StructArray when one entity needs to store an ordered list of structured elements, such as one document with many chunks, one page with many visual patches, or one video with many clips. StructArray keeps these elements inside the parent entity while still allowing vector search and scalar filtering on fields inside each element.</p>
<h2 id="What-is-StructArray" class="common-anchor-header">What is StructArray?<button data-href="#What-is-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>A <strong>StructArray</strong>, also known as an array of structs, stores an ordered set of Struct elements in each entity. Every Struct element in the array follows the same schema. A Struct element can contain scalar subfields, vector subfields, or both.</p>
<p>For example, a collection can store one article as an entity and store its chunks in a StructArray field named <code translate="no">chunks</code>. Each chunk can include text, section metadata, quality scores, and one or more vector embeddings.</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;doc_id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Vector search tuning guide&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;title_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.10</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.40</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;chunks&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Use HNSW efSearch to trade recall for latency.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;index&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.92</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.11</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.21</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.31</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.41</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.12</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.20</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.33</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.39</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;text&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Range search returns vectors within a distance boundary.&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;section&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;search&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;page&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;quality_score&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0.86</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;has_code&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb_list_vector&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.18</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.23</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.29</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.36</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;emb&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-number">0.19</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.24</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.30</span><span class="hljs-punctuation">,</span> <span class="hljs-number">0.37</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>The two vector subfields in this example represent the same chunk from two search perspectives. <code translate="no">chunks[emb_list_vector]</code> is intended for EmbeddingList search with <code translate="no">MAX_SIM*</code> metrics, while <code translate="no">chunks[emb]</code> is intended for element-level search with regular vector metrics such as <code translate="no">COSINE</code>, <code translate="no">IP</code>, or <code translate="no">L2</code>.</p>
</div>
<h2 id="When-to-use-StructArray" class="common-anchor-header">When to use StructArray<button data-href="#When-to-use-StructArray" class="anchor-icon" translate="no">
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
    </button></h2><p>Use StructArray when the natural unit you want to return is larger than the natural unit you want to search or filter.</p>
<table>
<thead>
<tr><th>Use case</th><th>Why StructArray helps</th><th>Typical StructArray field</th></tr>
</thead>
<tbody>
<tr><td>Document retrieval</td><td>Store one document as an entity while searching across its chunks.</td><td><code translate="no">chunks</code></td></tr>
<tr><td>Late-interaction retrieval</td><td>Store a document or page as an embedding list and score it with <code translate="no">MAX_SIM*</code>.</td><td><code translate="no">chunks[emb_list_vector]</code> or <code translate="no">patches[emb]</code></td></tr>
<tr><td>Element-level retrieval</td><td>Return the most relevant chunk, clip, patch, or observation, including its array offset.</td><td><code translate="no">chunks[emb]</code></td></tr>
<tr><td>Structured filtering</td><td>Filter by scalar subfields inside Struct elements, such as section, score, page, or flags.</td><td><code translate="no">chunks[section]</code>, <code translate="no">chunks[quality_score]</code></td></tr>
<tr><td>Reducing duplicate parent results</td><td>Keep child elements under the same parent entity instead of storing each child as a separate row.</td><td><code translate="no">chunks</code>, <code translate="no">clips</code>, <code translate="no">patches</code></td></tr>
</tbody>
</table>
<h2 id="Decision-Matrix" class="common-anchor-header">Decision Matrix<button data-href="#Decision-Matrix" class="anchor-icon" translate="no">
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
    </button></h2><p>Use the following matrix to choose the right StructArray path.</p>
<table>
<thead>
<tr><th>Goal</th><th>Recommended path</th><th>Result granularity</th><th>Start here</th></tr>
</thead>
<tbody>
<tr><td>Model one parent object with many structured children.</td><td>Create a StructArray field.</td><td>Entity contains ordered Struct elements.</td><td><a href="/docs/create-structarray-field.md">Create a StructArray Field</a></td></tr>
<tr><td>Insert parent records with nested child data.</td><td>Insert entities whose StructArray field is a list of Struct objects.</td><td>Entity-level insert.</td><td><a href="/docs/insert-data-into-structarray-fields.md">Insert Data into StructArray Fields</a></td></tr>
<tr><td>Run ColBERT, ColPali, or document-level late-interaction retrieval.</td><td>Use EmbeddingList search with a <code translate="no">MAX_SIM*</code> index.</td><td>Entity level.</td><td><a href="/docs/search-with-embedding-lists.md">Search with Embedding Lists</a></td></tr>
<tr><td>Search individual chunks, clips, or patches.</td><td>Use element-level search with a regular vector metric.</td><td>Struct element level, with offset when available.</td><td>Basic Vector Search with StructArray</td></tr>
<tr><td>Restrict element-level vector search to elements that match scalar conditions.</td><td>Use <code translate="no">element_filter</code>.</td><td>Element-level filtering; result shape depends on the search type.</td><td>Filtered Search with StructArray</td></tr>
<tr><td>Select entities by how many Struct elements satisfy a condition.</td><td>Use <code translate="no">MATCH_ANY</code>, <code translate="no">MATCH_ALL</code>, <code translate="no">MATCH_LEAST</code>, <code translate="no">MATCH_MOST</code>, or <code translate="no">MATCH_EXACT</code>.</td><td>Entity level.</td><td><a href="/docs/struct-array-operators.md">StructArray Operators</a></td></tr>
<tr><td>Use score or distance boundaries on StructArray vector subfields.</td><td>Use element-level range search.</td><td>Struct element level.</td><td>Range Search with StructArray</td></tr>
<tr><td>Return at most one result per parent entity after element-level search.</td><td>Use grouping search by primary key.</td><td>Entity level after grouping.</td><td>Grouping Search with StructArray</td></tr>
<tr><td>Combine StructArray element search with another vector field.</td><td>Use hybrid search with one AnnSearchRequest targeting a StructArray vector subfield.</td><td>Element-level sub-search, entity-level reranking.</td><td>Hybrid Search with StructArray</td></tr>
</tbody>
</table>
<h2 id="Understand-the-two-search-models" class="common-anchor-header">Understand the two search models<button data-href="#Understand-the-two-search-models" class="anchor-icon" translate="no">
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
<tr><th>### EmbeddingList search EmbeddingList search treats the vectors inside a StructArray vector subfield as one embedding list for the parent entity. The query is also an embedding list. Milvus compares the query embedding list with the stored embedding list by using a <code translate="no">MAX_SIM*</code> metric and returns matching entities. - Query data: embedding list. - Metric family: <code translate="no">MAX_SIM*</code>. - Result granularity: entity level. - Best for: document-level or page-level late-interaction retrieval.</th><th>### Element-level search Element-level search treats each Struct element as an independent vector-search candidate. Each hit represents a matched element inside the StructArray field, and ungrouped results can expose the element offset. - Query data: regular vector. - Metric family: regular vector metrics. - Result granularity: Struct element level. - Best for: chunk-level, clip-level, or patch-level retrieval.</th></tr>
</thead>
<tbody>
</tbody>
</table>
<div class="alert note">
<p>Warning</p>
<p>If your collection needs both EmbeddingList search and element-level search, use two separate vector subfields. A vector field or vector subfield accepts only one index, and the two search modes require different metric families.</p>
</div>
<h2 id="Documentation-map" class="common-anchor-header">Documentation map<button data-href="#Documentation-map" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray documentation is split into modeling pages and search pages. Use the modeling pages to define and prepare data. Use the search pages to choose the right retrieval and filtering behavior.</p>
<table>
<thead>
<tr><th>Area</th><th>Page</th><th>Use it for</th></tr>
</thead>
<tbody>
<tr><td>Modeling</td><td><a href="/docs/create-structarray-field.md">Create a StructArray Field</a></td><td>Define Struct schema and add a StructArray field.</td></tr>
<tr><td>Modeling</td><td><a href="/docs/insert-data-into-structarray-fields.md">Insert Data into StructArray Fields</a></td><td>Prepare and insert nested StructArray data.</td></tr>
<tr><td>Modeling</td><td><a href="/docs/index-structarray-fields.md">Index StructArray Fields</a></td><td>Create vector and scalar indexes on StructArray subfields.</td></tr>
<tr><td>Reference</td><td><a href="/docs/structarray-limits.md">StructArray Limits</a></td><td>Check schema, data type, index, search, filter, and version limits.</td></tr>
<tr><td>Search</td><td>Basic Vector Search with StructArray</td><td>Compare EmbeddingList search and element-level vector search.</td></tr>
<tr><td>Search</td><td>Range Search with StructArray</td><td>Use range constraints with StructArray vector subfields.</td></tr>
<tr><td>Search</td><td>Grouping Search with StructArray</td><td>Group element-level search results by primary key.</td></tr>
<tr><td>Search</td><td>Hybrid Search with StructArray</td><td>Combine StructArray element-level search with other vector searches.</td></tr>
<tr><td>Search</td><td>Filtered Search with StructArray</td><td>Use StructArray filters in search, query, and hybrid search.</td></tr>
<tr><td>Search</td><td><a href="/docs/search-with-embedding-lists.md">Search with Embedding Lists</a></td><td>Build ColBERT and ColPali-style retrieval systems with StructArray.</td></tr>
<tr><td>Filter</td><td><a href="/docs/struct-array-operators.md">StructArray Operators</a></td><td>Reference syntax for <code translate="no">element_filter</code> and <code translate="no">MATCH_*</code> operators.</td></tr>
</tbody>
</table>
<h2 id="Key-limits-to-check-first" class="common-anchor-header">Key limits to check first<button data-href="#Key-limits-to-check-first" class="anchor-icon" translate="no">
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
<li><p>Struct can be used as the element type of an Array field. It is not used as a top-level collection field.</p></li>
<li><p>All Struct elements in the same StructArray field share one predefined schema.</p></li>
<li><p>Vector subfields require indexes. EmbeddingList search uses <code translate="no">MAX_SIM*</code> metrics, while element-level search uses regular vector metrics.</p></li>
<li><p><code translate="no">element_filter</code> and <code translate="no">MATCH_*</code> are for scalar subfields inside StructArray fields. Use <code translate="no">$[subfield]</code> only inside these operators.</p></li>
<li><p>Some search combinations are version-gated or mode-specific. Check <a href="/docs/structarray-limits.md">StructArray Limits</a> before relying on range search, grouping search, hybrid search, nullable fields, or dynamically added fields.</p></li>
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
    </button></h2><ol>
<li><p>To design a schema, read <a href="/docs/create-structarray-field.md">Create a StructArray Field</a>.</p></li>
<li><p>To prepare data, read <a href="/docs/insert-data-into-structarray-fields.md">Insert Data into StructArray Fields</a>.</p></li>
<li><p>To choose indexes, read <a href="/docs/index-structarray-fields.md">Index StructArray Fields</a>.</p></li>
<li><p>To search StructArray vector subfields, start with Basic Vector Search with StructArray.</p></li>
<li><p>To filter StructArray scalar subfields, read <a href="/docs/struct-array-operators.md">StructArray Operators</a> and Filtered Search with StructArray.</p></li>
</ol>
