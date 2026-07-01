---
id: index-structarray-fields.md
title: Index StructArray Fields
summary: >-
  Create indexes on StructArray subfields before you run vector search or
  accelerate scalar filtering. For a StructArray field, the index target is a
  subfield path, such as chunks[emb_list_vector], chunks[emb], or
  chunks[section].
---
<h1 id="Index-StructArray-Fields" class="common-anchor-header">Index StructArray Fields<button data-href="#Index-StructArray-Fields" class="anchor-icon" translate="no">
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
    </button></h1><p>Create indexes on StructArray subfields before you run vector search or accelerate scalar filtering. For a StructArray field, the index target is a subfield path, such as <code translate="no">chunks[emb_list_vector]</code>, <code translate="no">chunks[emb]</code>, or <code translate="no">chunks[section]</code>.</p>
<p>This page uses the <code translate="no">tech_articles</code> collection from <a href="/docs/create-structarray-field.md">Create a StructArray Field</a>. The <code translate="no">chunks</code> StructArray field contains scalar subfields for filtering and vector subfields for search.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Before you begin<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><p>Make sure the collection schema already contains the <code translate="no">chunks</code> StructArray field and data has been inserted.</p>
<table>
<thead>
<tr><th>Subfield path</th><th>Type</th><th>Index purpose</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">chunks[emb_list_vector]</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>EmbeddingList search with <code translate="no">MAX_SIM*</code> metrics.</td></tr>
<tr><td><code translate="no">chunks[emb]</code></td><td><code translate="no">FLOAT_VECTOR</code></td><td>Element-level search with regular vector metrics.</td></tr>
<tr><td><code translate="no">chunks[section]</code></td><td><code translate="no">VARCHAR</code></td><td>Categorical filtering.</td></tr>
<tr><td><code translate="no">chunks[quality_score]</code></td><td><code translate="no">FLOAT</code></td><td>Numeric filtering and range-style predicates.</td></tr>
<tr><td><code translate="no">chunks[has_code]</code></td><td><code translate="no">BOOL</code></td><td>Boolean filtering.</td></tr>
</tbody>
</table>
<div class="alert note">
<p>A vector field or vector subfield accepts only one index. If you need both EmbeddingList search and element-level search, create two separate vector subfields and index them separately. In this page, <code translate="no">chunks[emb_list_vector]</code> is indexed for EmbeddingList search, and <code translate="no">chunks[emb]</code> is indexed for element-level search.</p>
</div>
<h2 id="Choose-indexes" class="common-anchor-header">Choose indexes<button data-href="#Choose-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Use the search mode to choose the vector metric family.</p>
<table>
<thead>
<tr><th>Search or filter goal</th><th>Target path</th><th>What to choose</th></tr>
</thead>
<tbody>
<tr><td>EmbeddingList search</td><td><code translate="no">chunks[emb_list_vector]</code></td><td>A <code translate="no">MAX_SIM*</code> metric family.</td></tr>
<tr><td>Element-level vector search</td><td><code translate="no">chunks[emb]</code></td><td>A regular vector metric family, such as <code translate="no">COSINE</code>, <code translate="no">IP</code>, or <code translate="no">L2</code>.</td></tr>
<tr><td>Filter by string or category</td><td><code translate="no">chunks[section]</code></td><td>A scalar index supported by your target.</td></tr>
<tr><td>Filter by numeric range</td><td><code translate="no">chunks[quality_score]</code>, <code translate="no">chunks[page]</code></td><td>A scalar index supported by your target.</td></tr>
<tr><td>Filter by boolean value</td><td><code translate="no">chunks[has_code]</code></td><td>A scalar index supported by your target.</td></tr>
</tbody>
</table>
<p>EmbeddingList search treats the vectors in a StructArray vector subfield as an embedding list and returns entity-level results. Element-level search searches each Struct element independently and can return the matched element offset.</p>
<h2 id="Create-vector-indexes" class="common-anchor-header">Create vector indexes<button data-href="#Create-vector-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>The following example creates two vector indexes. The first index uses a <code translate="no">MAX_SIM*</code> metric for EmbeddingList search. The second index uses a regular vector metric for element-level search.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>,
)

index_params = client.prepare_index_params()

<span class="hljs-comment"># Index for EmbeddingList search.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[emb_list_vector]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_list_max_sim&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;MAX_SIM_COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span>,
    },
)

<span class="hljs-comment"># Index for element-level search.</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[emb]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
    index_type=<span class="hljs-string">&quot;HNSW&quot;</span>,
    metric_type=<span class="hljs-string">&quot;COSINE&quot;</span>,
    params={
        <span class="hljs-string">&quot;M&quot;</span>: <span class="hljs-number">16</span>,
        <span class="hljs-string">&quot;efConstruction&quot;</span>: <span class="hljs-number">200</span>,
    },
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Warning
Do not create a <code translate="no">MAX_SIM*</code> index and a regular vector-metric index on the same vector subfield. If both search modes are required, write vectors to two separate vector subfields and create one index on each subfield.</p>
</div>
<h2 id="Create-scalar-indexes" class="common-anchor-header">Create scalar indexes<button data-href="#Create-scalar-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>Create scalar indexes on StructArray scalar subfields when you use them in filters. Use the same <code translate="no">structArray[subfield]</code> path syntax.</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[section]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_section_inverted&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[has_code]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_has_code_inverted&quot;</span>,
    index_type=<span class="hljs-string">&quot;INVERTED&quot;</span>,
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[quality_score]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_quality_score_sort&quot;</span>,
    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;chunks[page]&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_page_sort&quot;</span>,
    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,
)

client.create_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_params=index_params,
)
<button class="copy-code-btn"></button></code></pre>
<p>Scalar indexes are optional but useful when StructArray scalar subfields appear frequently in filters, such as <code translate="no">element_filter(chunks, $[quality_score] &gt; 0.9)</code> or <code translate="no">MATCH_ANY(chunks, $[section] == &quot;index&quot;)</code>.</p>
<h2 id="Index-metric-compatibility" class="common-anchor-header">Index metric compatibility<button data-href="#Index-metric-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>Use the following tables to choose an index type and metric type for a StructArray vector subfield. Start from the target, then choose the metric family by search mode.</p>
<p>Choose a Milvus index type and metric type from the following compatibility tables.</p>
<h3 id="EmbeddingList-search" class="common-anchor-header">EmbeddingList search<button data-href="#EmbeddingList-search" class="anchor-icon" translate="no">
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
    </button></h3><p>EmbeddingList search uses <code translate="no">MAX_SIM*</code> metrics. It treats the vectors in a StructArray vector subfield as an embedding list and returns entity-level results.</p>
<table>
<thead>
<tr><th>Vector subfield data type</th><th>Index type</th><th>Metric type</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">FLOAT_VECTOR</code>, <code translate="no">FLOAT16_VECTOR</code>, <code translate="no">BFLOAT16_VECTOR</code></td><td><code translate="no">IVF_FLAT</code>, <code translate="no">IVF_FLAT_CC</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code>, <code translate="no">DISKANN</code></td><td><code translate="no">MAX_SIM</code>, <code translate="no">MAX_SIM_COSINE</code>, <code translate="no">MAX_SIM_IP</code>, <code translate="no">MAX_SIM_L2</code></td></tr>
<tr><td><code translate="no">INT8_VECTOR</code></td><td><code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code></td><td><code translate="no">MAX_SIM</code>, <code translate="no">MAX_SIM_COSINE</code>, <code translate="no">MAX_SIM_IP</code>, <code translate="no">MAX_SIM_L2</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HNSW</code></td><td><code translate="no">MAX_SIM_HAMMING</code>, <code translate="no">MAX_SIM_JACCARD</code></td></tr>
</tbody>
</table>
<h3 id="Element-level-search" class="common-anchor-header">Element-level search<button data-href="#Element-level-search" class="anchor-icon" translate="no">
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
    </button></h3><p>Element-level search uses regular vector metrics. It searches each Struct element independently and can return the matched element offset.</p>
<table>
<thead>
<tr><th>Vector subfield data type</th><th>Index type</th><th>Metric type</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">FLOAT_VECTOR</code>, <code translate="no">FLOAT16_VECTOR</code>, <code translate="no">BFLOAT16_VECTOR</code></td><td><code translate="no">FLAT</code>, <code translate="no">IVF_FLAT</code>, <code translate="no">IVF_FLAT_CC</code>, <code translate="no">IVF_SQ8</code>, <code translate="no">IVF_SQ_CC</code>, <code translate="no">IVF_PQ</code>, <code translate="no">SCANN</code>, <code translate="no">IVF_RABITQ</code>, <code translate="no">IVF_RABITQ_FASTSCAN</code>, <code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code>, <code translate="no">DISKANN</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td></tr>
<tr><td><code translate="no">INT8_VECTOR</code></td><td><code translate="no">HNSW</code>, <code translate="no">HNSW_SQ</code>, <code translate="no">HNSW_PQ</code>, <code translate="no">HNSW_PRQ</code></td><td><code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">HNSW</code></td><td><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">BIN_FLAT</code></td><td><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code>, <code translate="no">SUBSTRUCTURE</code>, <code translate="no">SUPERSTRUCTURE</code>, <code translate="no">MHJACCARD</code></td></tr>
<tr><td><code translate="no">BINARY_VECTOR</code></td><td><code translate="no">BIN_IVF_FLAT</code></td><td><code translate="no">HAMMING</code>, <code translate="no">JACCARD</code></td></tr>
</tbody>
</table>
<p>For version-specific support and other limits, see <a href="/docs/structarray-limits.md">StructArray Limits</a>.</p>
<h2 id="Verify-indexes" class="common-anchor-header">Verify indexes<button data-href="#Verify-indexes" class="anchor-icon" translate="no">
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
    </button></h2><p>After creating indexes, describe the collection or list indexes to confirm that the expected subfield paths are indexed.</p>
<pre><code translate="no" class="language-python">indexes = client.list_indexes(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
)

<span class="hljs-built_in">print</span>(indexes)
<button class="copy-code-btn"></button></code></pre>
<p>You can also describe a specific index if your SDK version exposes index-description APIs.</p>
<pre><code translate="no" class="language-python">index = client.describe_index(
    collection_name=<span class="hljs-string">&quot;tech_articles&quot;</span>,
    index_name=<span class="hljs-string">&quot;chunks_emb_cosine&quot;</span>,
)

<span class="hljs-built_in">print</span>(index)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Index-rules" class="common-anchor-header">Index rules<button data-href="#Index-rules" class="anchor-icon" translate="no">
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
<tr><th>Rule</th><th>Explanation</th></tr>
</thead>
<tbody>
<tr><td>Use path syntax for subfield indexes.</td><td>Index <code translate="no">chunks[emb]</code>, not <code translate="no">emb</code> or <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>One vector subfield accepts one index.</td><td>Use separate vector subfields if you need different metric families.</td></tr>
<tr><td>Use <code translate="no">MAX_SIM*</code> metrics for EmbeddingList search.</td><td>EmbeddingList query data requires an index built with a <code translate="no">MAX_SIM*</code> metric.</td></tr>
<tr><td>Use regular vector metrics for element-level search.</td><td>Element-level search uses regular vector query data and metrics such as <code translate="no">COSINE</code>, <code translate="no">IP</code>, or <code translate="no">L2</code>.</td></tr>
<tr><td>Index scalar subfields that appear in filters.</td><td>Use scalar index types supported by your target.</td></tr>
<tr><td>Keep vector-field limits in mind.</td><td>The total number of vector fields and vector subfields is limited. See StructArray Limits before adding many vector subfields.</td></tr>
</tbody>
</table>
<h2 id="Common-mistakes" class="common-anchor-header">Common mistakes<button data-href="#Common-mistakes" class="anchor-icon" translate="no">
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
<li><p>Creating an index on <code translate="no">chunks.emb</code> instead of <code translate="no">chunks[emb]</code>.</p></li>
<li><p>Creating only a <code translate="no">MAX_SIM*</code> index and then trying to run element-level search on the same subfield.</p></li>
<li><p>Creating only a regular vector index and then trying to run EmbeddingList search on the same subfield.</p></li>
<li><p>Reusing one vector subfield for both <code translate="no">MAX_SIM*</code> and regular vector metrics.</p></li>
<li><p>Forgetting scalar indexes for heavily used StructArray filters.</p></li>
<li><p>Indexing a StructArray subfield that does not exist in the Struct schema.</p></li>
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
<li><p>To run entity-level EmbeddingList search or element-level vector search, read Basic Vector Search with StructArray.</p></li>
<li><p>To filter StructArray scalar subfields during search, read Filtered Search with StructArray.</p></li>
<li><p>To review index and metric limits, read <a href="/docs/structarray-limits.md">StructArray Limits</a>.</p></li>
</ol>
