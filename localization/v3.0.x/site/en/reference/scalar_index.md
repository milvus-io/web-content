---
id: scalar_index.md
related_key: scalar_index
summary: >-
  Compare scalar index types, check field compatibility, and understand
  automatic index selection.
title: Scalar Index
---
<h1 id="Scalar-Index" class="common-anchor-header">Scalar Index<button data-href="#Scalar-Index" class="anchor-icon" translate="no">
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
    </button></h1><p>Scalar indexes can accelerate <a href="/docs/boolean.md">filtering</a> on non-vector fields. Use this overview to choose an index, check field compatibility, and understand automatic selection.</p>
<p>Consider indexing fields used in frequent or slow filters. For each field you include in the index-creation request, choose one of two options:</p>
<ul>
<li><strong>Specify an index type:</strong> Choose one compatible with the field’s data type and your filters.</li>
<li><strong>Use <code translate="no">AUTOINDEX</code>:</strong> Set <code translate="no">index_type</code> to <code translate="no">AUTOINDEX</code> to let Milvus choose a type. See <a href="#AUTOINDEX-behavior">AUTOINDEX behavior</a>.</li>
</ul>
<h2 id="Index-types" class="common-anchor-header">Index types<button data-href="#Index-types" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Supported-predicates"></a>
<a id="Comparisons-and-membership"></a>
<a id="String-patterns"></a></p>
<p>Open an index guide for its supported filters, parameters, and creation steps:</p>
<table>
<thead>
<tr><th>Index type</th><th>Use for</th></tr>
</thead>
<tbody>
<tr><td><a href="/docs/inverted.md">INVERTED</a></td><td>Equality, membership, and range filters.</td></tr>
<tr><td><a href="/docs/bitmap.md">BITMAP</a></td><td>Fields with few distinct values, such as status codes.</td></tr>
<tr><td><a href="/docs/stl-sort.md">STL_SORT</a></td><td>Value lookups and range filters.</td></tr>
<tr><td><a href="/docs/trie.md">TRIE</a></td><td>Exact string lookups and prefix matching on <code translate="no">VARCHAR</code> fields.</td></tr>
<tr><td><a href="/docs/ngram.md">NGRAM</a></td><td>LIKE and eligible regex filters.</td></tr>
<tr><td><a href="/docs/rtree.md">RTREE</a></td><td>Spatial filters on <code translate="no">GEOMETRY</code> fields.</td></tr>
</tbody>
</table>
<p>Check the field compatibility table below and the selected index’s filter support before creating an index.</p>
<p><details id="Filter-execution">
<summary><strong>How filters use indexes</strong></summary></p>
<p>An index serves only eligible expressions; other filters can scan the data. Arithmetic and comparisons between fields do not inherit literal-lookup acceleration. For logical combinations and NULL tests, see <a href="/docs/basic-operators.md">Basic Operators</a>.</p>
<p></details></p>
<p><a id="Choosing-a-scalar-index"></a></p>
<h2 id="Supported-field-types" class="common-anchor-header">Supported field types<button data-href="#Supported-field-types" class="anchor-icon" translate="no">
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
    </button></h2><p><a id="Array-JSON-and-spatial-predicates"></a>
<a id="JSON-field-indexing"></a></p>
<p>Find your field’s data type to see its supported explicit indexes. In array rows, <code translate="no">ARRAY&lt;T&gt;</code> means <code translate="no">ARRAY</code> with <code translate="no">element_type=T</code>:</p>
<table>
<thead>
<tr><th>Field type</th><th>Explicit index types</th><th>Conditions</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>Scalar Boolean fields do not support <code translate="no">STL_SORT</code>.</td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td><td><code translate="no">BITMAP</code> is unavailable on primary-key fields.</td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td><td>Explicit <code translate="no">BITMAP</code> is unavailable.</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code>, <code translate="no">NGRAM</code></td><td><code translate="no">BITMAP</code> is unavailable on primary-key fields. See <a href="#String-pattern-indexes">index selection by filter</a>.</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td>See <a href="/docs/timestamptz-field.md">TIMESTAMPTZ Field</a>.</td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td>See <a href="/docs/rtree.md">RTREE</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>See <a href="/docs/array_data_type.md#Array-index-support">Array index support</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code>, <code translate="no">ARRAY&lt;INT16&gt;</code>, <code translate="no">ARRAY&lt;INT32&gt;</code>, <code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>See <a href="/docs/array_data_type.md#Array-index-support">Array index support</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>, <code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">INVERTED</code></td><td>See <a href="/docs/array_data_type.md#Array-index-support">Array index support</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td><td>See <a href="/docs/array_data_type.md#Array-index-support">Array index support</a>.</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Depends on the indexed path and cast type.</td><td>Check <a href="/docs/json-indexing.md#Understand-cast-types">JSON path compatibility and requirements</a>.</td></tr>
<tr><td>StructArray non-vector subfields</td><td>Depends on the subfield’s data type.</td><td>Index subfields separately; <code translate="no">BOOL</code> subfields cannot use explicit <code translate="no">STL_SORT</code>. See <a href="/docs/index-structarray-fields.md#Create-scalar-indexes">subfield rules</a>.</td></tr>
<tr><td><code translate="no">TEXT</code></td><td>None</td><td>User-created scalar indexes, including <code translate="no">AUTOINDEX</code>, are unavailable.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>Scalar indexes, including <code translate="no">AUTOINDEX</code>, do not support recursive ARRAY fields or arrays with nullable elements. See <a href="/docs/array_data_type.md#Array-index-support">Array index support</a> for ordinary-array filters and <a href="/docs/index-structarray-fields.md#Create-scalar-indexes">Index StructArray Fields</a> for subfield rules.</p>
</blockquote>
</div>
<p><details id="String-pattern-indexes">
<summary><strong>Choose an index for VARCHAR filters</strong></summary></p>
<p>For a <code translate="no">VARCHAR</code> field, compare compatible indexes based on your filters:</p>
<table>
<thead>
<tr><th>Filtering need</th><th>Index guides and conditions</th></tr>
</thead>
<tbody>
<tr><td>Exact string lookups and prefixes</td><td><a href="/docs/trie.md#Queries-accelerated-by-TRIE">TRIE</a>, <a href="/docs/stl-sort.md#Queries-accelerated-by-STLSORT">STL_SORT</a>, or <a href="/docs/inverted.md#Queries-accelerated-by-INVERTED">INVERTED</a>.</td></tr>
<tr><td>Few distinct string values</td><td><a href="/docs/bitmap.md#Queries-accelerated-by-BITMAP">BITMAP</a>; patterns are evaluated against indexed values.</td></tr>
<tr><td>LIKE or regex with suitable fixed literals</td><td><a href="/docs/ngram.md#Queries-accelerated-by-NGRAM">NGRAM</a> on <code translate="no">VARCHAR</code> fields or JSON string paths, subject to gram-length and recheck conditions.</td></tr>
<tr><td>Regex without usable fixed literals</td><td>The query can scan data or evaluate many indexed values; check the selected index’s conditions.</td></tr>
</tbody>
</table>
<p>Ranges on <code translate="no">VARCHAR</code> use string ordering, even when strings contain numbers. Index use depends on query planning, extractable literals, cardinality, and data distribution. See <a href="/docs/pattern-matching.md#Accelerate-pattern-matching-with-indexes">Pattern Matching</a> for planning rules. For JSON string paths, check the path and cast requirements in <a href="/docs/json-indexing.md">JSON Indexing</a>.</p>
<p></details></p>
<p><a id="How-AUTOINDEX-selects"></a></p>
<h2 id="AUTOINDEX-behavior" class="common-anchor-header">AUTOINDEX behavior<button data-href="#AUTOINDEX-behavior" class="anchor-icon" translate="no">
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
    </button></h2><p>Set <code translate="no">index_type</code> to <code translate="no">AUTOINDEX</code> in each selected field’s index definition. Milvus chooses a type using the data type and, where applicable, the number of distinct values in each index build:</p>
<table>
<thead>
<tr><th>Field type</th><th>Default selection</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>, <code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> for fewer than 100 distinct values; otherwise <code translate="no">STL_SORT</code>.</td></tr>
<tr><td><code translate="no">ARRAY</code> with <code translate="no">element_type</code> set to <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, or <code translate="no">VARCHAR</code></td><td><code translate="no">BITMAP</code> for fewer than 100 distinct elements; otherwise <code translate="no">INVERTED</code>.</td></tr>
<tr><td><code translate="no">JSON</code> paths cast to <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code>, or <code translate="no">VARCHAR</code></td><td><code translate="no">INVERTED</code> by default in 3.0. The <a href="/docs/json-indexing.md#Index-requirements">JSON opt-in setup</a> enables the scalar bitmap/sorted strategy above.</td></tr>
<tr><td><code translate="no">JSON</code> paths cast to <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code>, or <code translate="no">ARRAY_VARCHAR</code></td><td>Use explicit <code translate="no">INVERTED</code>; the default 3.0.6 mapping rejects automatic selection for these casts.</td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>Not supported.</td></tr>
</tbody>
</table>
<div class="alert note">
<blockquote>
<p>For a supported scalar field, an index definition that omits <code translate="no">index_type</code> also requests automatic selection. Fields not included in the request are not indexed.</p>
</blockquote>
</div>
<p><a id="Version-compatibility"></a></p>
<p><details>
<summary><strong>Selection details</strong></summary></p>
<ul>
<li><strong>Internal layouts:</strong> <code translate="no">AUTOINDEX</code> can select layouts unavailable as explicit choices, such as bitmap indexing for <code translate="no">FLOAT</code> and <code translate="no">DOUBLE</code>. The cardinality-based strategy is called <code translate="no">HYBRID</code> internally; you cannot specify it directly. The selected index determines which filters can use it.</li>
<li><strong>Cardinality threshold:</strong> <a id="Cardinality-threshold"></a>Set <code translate="no">bitmap_cardinality_limit</code> (range: 1–1000) to override the default threshold. Values below it use bitmap; at or above it, the data type’s high-cardinality layout applies. Explicit <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code>, and <code translate="no">BITMAP</code> builds bypass cardinality-based selection and ignore this threshold.</li>
<li><strong>Administrator overrides:</strong> Change type mappings through <code translate="no">scalarAutoIndex.params.build</code>. <code translate="no">scalarAutoIndex.enable=false</code> (default) still allows explicit <code translate="no">AUTOINDEX</code>; <code translate="no">true</code> also applies automatic selection to valid manual requests.</li>
</ul>
<p></details></p>
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
    </button></h2><p><a id="Performance-considerations"></a>
<a id="Estimating-memory-requirements"></a></p>
<p>Choose a guide for your next task:</p>
<ul>
<li><strong>Create an index:</strong> Use the <a href="#Index-types">index guide</a> for parameters and creation examples.</li>
<li><strong>Plan resources:</strong> See memory guidance for <a href="/docs/stl-sort.md#Memory-considerations">STL_SORT</a>, <a href="/docs/bitmap.md#Memory-considerations">BITMAP</a>, <a href="/docs/inverted.md#Memory-considerations">INVERTED</a>, or <a href="/docs/ngram.md#Memory-considerations">NGRAM</a>. Compare memory use, build time, and query latency with representative data and filters.</li>
<li><strong>Configure text search:</strong> <a href="/docs/keyword-match.md">Text Match</a> and <a href="/docs/full-text-search.md">Full Text Search</a> cover text analysis, BM25, <code translate="no">TEXT_MATCH</code>, and <code translate="no">PHRASE_MATCH</code>. A scalar <code translate="no">INVERTED</code> index does not enable these mechanisms.</li>
</ul>
<p><details id="Drop-index-compatibility">
<summary><strong>Dropping scalar indexes on older Milvus releases</strong></summary></p>
<p>In Milvus v2.6.3 or earlier, release the collection before dropping a scalar index. From v2.6.4 onward, you can drop it without releasing the collection.</p>
<p></details></p>
