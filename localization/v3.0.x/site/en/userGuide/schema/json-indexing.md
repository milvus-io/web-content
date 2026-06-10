---
id: json-indexing.md
title: JSON Indexing
summary: >-
  JSON fields provide a flexible way to store structured metadata in Milvus.
  Without indexing, queries on JSON fields require full collection scans, which
  become slow as your dataset grows. JSON indexing creates indexes on specific
  paths within your JSON data so equality, range, and other filter queries on
  those paths run fast.
---
<h1 id="JSON-Indexing" class="common-anchor-header">JSON Indexing<button data-href="#JSON-Indexing" class="anchor-icon" translate="no">
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
    </button></h1><p>JSON fields provide a flexible way to store structured metadata in Milvus. Without indexing, queries on JSON fields require full collection scans, which become slow as your dataset grows. JSON indexing creates an index on a specific path within your JSON data so equality, range, and other filter queries on that path run fast.</p>
<p>JSON indexing is ideal for:</p>
<ul>
<li><p>Structured schemas with consistent, known keys</p></li>
<li><p>Equality, <code translate="no">IN</code>, range, and text-match queries on specific JSON paths</p></li>
<li><p>Scenarios where you need precise control over which keys are indexed</p></li>
</ul>
<p>For complex JSON documents with diverse query patterns, consider <a href="/docs/json-shredding.md">JSON Shredding</a> as an alternative.</p>
<h2 id="Index-type-overview" class="common-anchor-header">Index type overview<button data-href="#Index-type-overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus offers four index types for JSON paths. Each is suited to a different query pattern.</p>
<p>Before choosing an index type, identify the <strong>cast type</strong> for the JSON path. The cast type determines how Milvus interprets the value at that path and which index types are available.</p>
<h3 id="Understand-cast-types" class="common-anchor-header">Understand cast types<button data-href="#Understand-cast-types" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">json_cast_type</code> is the data type used to interpret and index the value at <code translate="no">json_path</code>. It is different from the field schema type: the field is still a <code translate="no">JSON</code> field, but each indexed path is treated as a specific scalar, array, or JSON object type.</p>
<p>Choose the cast type that matches the values stored at the path. To check whether a cast type works with a specific index type, see <a href="/docs/json-indexing.md#compatibility-reference">Compatibility reference</a>.</p>
<table>
<thead>
<tr><th>Cast type</th><th>Use when the path value is…</th><th>Example value</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>A Boolean value</td><td><code translate="no">true</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>A numeric value</td><td><code translate="no">99.99</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>A string value</td><td><code translate="no">&quot;electronics&quot;</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>An array of Boolean values</td><td><code translate="no">[true, false]</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>An array of numeric values</td><td><code translate="no">[1.2, 3.14]</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>An array of string values</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td></tr>
<tr><td><code translate="no">JSON</code></td><td>An entire JSON object or sub-object</td><td><code translate="no">{&quot;supplier&quot;: {&quot;country&quot;: &quot;USA&quot;}}</code></td></tr>
</tbody>
</table>
<p>If values at the same path have inconsistent types, only values that match the cast type are indexed. For example, if <code translate="no">metadata[&quot;price&quot;]</code> contains both <code translate="no">99.99</code> and <code translate="no">&quot;99.99&quot;</code>, an index of the <code translate="no">DOUBLE</code> cast type includes the numeric value and skips the string value. To convert string values during indexing, use <code translate="no">json_cast_function</code>; see <a href="/docs/json-indexing.md#example-5-convert-data-type-at-index-time">Example 5: Convert data type at index time</a>.</p>
<h3 id="Choose-an-index-type" class="common-anchor-header">Choose an index type<button data-href="#Choose-an-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>After you choose a cast type, choose the index type according to your query pattern.</p>
<table>
<thead>
<tr><th>Query pattern</th><th>Recommended index type</th><th>Cast type requirement</th><th>Notes</th></tr>
</thead>
<tbody>
<tr><td>Mixed equality and range filters on scalar values</td><td><code translate="no">AUTOINDEX</code></td><td>Use <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code>, or <code translate="no">VARCHAR</code>.</td><td>Lets Milvus choose the internal index layout based on value cardinality.</td></tr>
<tr><td>Filters on values inside JSON arrays</td><td><code translate="no">INVERTED</code></td><td>Use <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code>, or <code translate="no">ARRAY_VARCHAR</code>.</td><td>Required for all array cast types.</td></tr>
<tr><td>Whole-object or sub-object indexing</td><td><code translate="no">INVERTED</code> or <code translate="no">AUTOINDEX</code></td><td>Use <code translate="no">JSON</code>.</td><td><code translate="no">AUTOINDEX</code> uses <code translate="no">INVERTED</code> instead of cardinality-based selection for <code translate="no">JSON</code> cast type.</td></tr>
<tr><td>Range filters on numbers or sortable strings</td><td><code translate="no">STL_SORT</code> or <code translate="no">AUTOINDEX</code></td><td>Use <code translate="no">DOUBLE</code> or <code translate="no">VARCHAR</code>.</td><td>Use <code translate="no">STL_SORT</code> to force a sorted layout; use <code translate="no">AUTOINDEX</code> when you want automatic selection.</td></tr>
<tr><td>Equality or <code translate="no">IN</code> filters on low-cardinality values</td><td><code translate="no">BITMAP</code> or <code translate="no">AUTOINDEX</code></td><td>Use <code translate="no">BOOL</code> or <code translate="no">VARCHAR</code>.</td><td>Use <code translate="no">BITMAP</code> to force a bitmap layout. For numeric values, use <code translate="no">AUTOINDEX</code> or <code translate="no">STL_SORT</code>.</td></tr>
</tbody>
</table>
<p>When in doubt, start with <code translate="no">AUTOINDEX</code> for scalar paths. Use <code translate="no">INVERTED</code> explicitly for array cast types and text-match queries. For whole-object JSON indexing, use either <code translate="no">INVERTED</code> or <code translate="no">AUTOINDEX</code>.</p>
<h3 id="AUTOINDEX" class="common-anchor-header">AUTOINDEX<button data-href="#AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">AUTOINDEX</code> behavior depends on the <code translate="no">json_cast_type</code> you specify. In Milvus 3.0, <code translate="no">AUTOINDEX</code> no longer always resolves to <code translate="no">INVERTED</code> for JSON path indexes.</p>
<table>
<thead>
<tr><th>Cast type</th><th><code translate="no">AUTOINDEX</code> behavior</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td>Chooses between <code translate="no">BITMAP</code> and <code translate="no">STL_SORT</code> based on value cardinality.</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code>, <code translate="no">ARRAY_VARCHAR</code></td><td>Not supported. Use <code translate="no">INVERTED</code> explicitly as the index type.</td></tr>
<tr><td><code translate="no">JSON</code></td><td>Uses <code translate="no">INVERTED</code> for whole-object or sub-object indexing.</td></tr>
</tbody>
</table>
<p>For scalar cast types (<code translate="no">BOOL</code>, <code translate="no">DOUBLE</code>, and <code translate="no">VARCHAR</code>), <code translate="no">AUTOINDEX</code> is the recommended starting point when you want Milvus to choose the internal index layout. During index build, Milvus measures the <strong>cardinality</strong> of the values at the JSON path. Cardinality means the number of distinct values at that path.</p>
<p>Based on cardinality, Milvus chooses one of two internal layouts:</p>
<ul>
<li><p><strong>Low cardinality</strong>: Values repeat often, such as <code translate="no">metadata[&quot;in_stock&quot;]</code> with <code translate="no">true</code> and <code translate="no">false</code>, or <code translate="no">metadata[&quot;status&quot;]</code> with a small set of status strings. Milvus builds a <code translate="no">BITMAP</code> index internally for fast equality and <code translate="no">IN</code> filters.</p></li>
<li><p><strong>High cardinality</strong>: Most values are distinct, such as <code translate="no">metadata[&quot;price&quot;]</code>, <code translate="no">metadata[&quot;created_at&quot;]</code>, or <code translate="no">metadata[&quot;product_id&quot;]</code>. Milvus builds an <code translate="no">STL_SORT</code> index internally for fast range filters such as <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, and <code translate="no">&lt;=</code>.</p></li>
</ul>
<p>The default <code translate="no">BITMAP</code>-vs-<code translate="no">STL_SORT</code> threshold is <strong>100 distinct values</strong>. You can tune this threshold with <code translate="no">bitmap_cardinality_limit</code>; see <a href="/docs/json-indexing.md#how-do-i-tune-autoindexs-bitmap-vs-stl-sort-threshold">How do I tune AUTOINDEX’s BITMAP-vs-STL_SORT threshold?</a>.</p>
<div class="alert note">
<p><strong>Behavior change in Milvus 3.0</strong>. In earlier versions, <code translate="no">AUTOINDEX</code> on JSON paths always built an <code translate="no">INVERTED</code> index. From Milvus 3.0, <code translate="no">AUTOINDEX</code> picks between <code translate="no">BITMAP</code> and <code translate="no">STL_SORT</code> for scalar cast types. For <code translate="no">JSON</code>, <code translate="no">AUTOINDEX</code> still uses <code translate="no">INVERTED</code>. For array cast types and text-match queries, specify <code translate="no">INVERTED</code> explicitly.</p>
</div>
<h3 id="INVERTED" class="common-anchor-header">INVERTED<button data-href="#INVERTED" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">INVERTED</code> is the best fit when you need text-match queries, array indexing, or whole-object JSON indexing.</p>
<p>Specify <code translate="no">INVERTED</code> explicitly when:</p>
<ul>
<li><p>You need to index values inside JSON arrays.</p></li>
<li><p>You need to index an entire JSON object or sub-object and want to make the <code translate="no">INVERTED</code> behavior explicit.</p></li>
<li><p>You want one index type that handles equality, <code translate="no">IN</code>, range, text-match, array, and object-level queries, at the cost of a larger index size.</p></li>
</ul>
<p>For entire JSON objects (<code translate="no">json_cast_type=&quot;JSON&quot;</code>), you can use either <code translate="no">INVERTED</code> or <code translate="no">AUTOINDEX</code>. <code translate="no">AUTOINDEX</code> uses <code translate="no">INVERTED</code> for this cast type.</p>
<p>For details, refer to <a href="/docs/inverted.md">INVERTED</a>.</p>
<h3 id="STLSORT" class="common-anchor-header">STL_SORT<button data-href="#STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">STL_SORT</code> stores values from a JSON path in sorted order. It is optimized for range filters on numeric values or sortable string values.</p>
<p><code translate="no">STL_SORT</code> supports only <code translate="no">DOUBLE</code> and <code translate="no">VARCHAR</code> cast types. Use it when:</p>
<ul>
<li><p>Your filters compare values with <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, or <code translate="no">&lt;=</code>.</p></li>
<li><p>The indexed values have high cardinality, such as prices, timestamps, IDs, or sortable codes.</p></li>
<li><p>You want to force a sorted layout instead of letting <code translate="no">AUTOINDEX</code> choose.</p></li>
</ul>
<p><code translate="no">STL_SORT</code> does not support <code translate="no">BOOL</code>, <code translate="no">ARRAY_*</code>, or <code translate="no">JSON</code> cast types. Use <code translate="no">INVERTED</code> for arrays or whole-object indexing.</p>
<p>For details, refer to <a href="/docs/stl-sort.md">STL_SORT</a>.</p>
<h3 id="BITMAP" class="common-anchor-header">BITMAP<button data-href="#BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p><code translate="no">BITMAP</code> creates a compact bitmap for each distinct value at a JSON path. It is optimized for equality and <code translate="no">IN</code> filters on values that repeat often.</p>
<p><code translate="no">BITMAP</code> supports only <code translate="no">BOOL</code> and <code translate="no">VARCHAR</code> cast types. Use it when:</p>
<ul>
<li><p>Your filters use <code translate="no">==</code> or <code translate="no">IN</code>.</p></li>
<li><p>The indexed values have low cardinality, such as booleans, status values, or a small set of categories.</p></li>
<li><p>You want to force a bitmap layout instead of letting <code translate="no">AUTOINDEX</code> choose.</p></li>
</ul>
<p><code translate="no">BITMAP</code> does not support <code translate="no">DOUBLE</code>, <code translate="no">ARRAY_*</code>, or <code translate="no">JSON</code> cast types. For numeric values, use <code translate="no">AUTOINDEX</code>, <code translate="no">STL_SORT</code>, or <code translate="no">INVERTED</code> instead.</p>
<p>For details, refer to <a href="/docs/bitmap.md">BITMAP</a>.</p>
<h3 id="Compatibility-reference" class="common-anchor-header">Compatibility reference<button data-href="#Compatibility-reference" class="anchor-icon" translate="no">
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
    </button></h3><p>Use the following matrix as a quick reference for supported <code translate="no">(cast type, index type)</code> combinations.</p>
<table>
<thead>
<tr><th>Cast type</th><th>Description</th><th>Example value</th><th>AUTOINDEX</th><th>INVERTED</th><th>STL_SORT</th><th>BITMAP</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td>Boolean values (<code translate="no">true</code>/<code translate="no">false</code>).</td><td><code translate="no">true</code></td><td>Yes</td><td>Yes</td><td>No</td><td>Yes</td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td>Numeric values (integers or floats).</td><td><code translate="no">99.99</code></td><td>Yes</td><td>Yes</td><td>Yes</td><td>No</td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td>String values.</td><td><code translate="no">&quot;electronics&quot;</code></td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td>Array of booleans.</td><td><code translate="no">[true, false]</code></td><td>No</td><td>Yes</td><td>No</td><td>No</td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td>Array of numbers.</td><td><code translate="no">[1.2, 3.14]</code></td><td>No</td><td>Yes</td><td>No</td><td>No</td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td>Array of strings.</td><td><code translate="no">[&quot;tag1&quot;, &quot;tag2&quot;]</code></td><td>No</td><td>Yes</td><td>No</td><td>No</td></tr>
<tr><td><code translate="no">JSON</code></td><td>An entire JSON object or sub-object with automatic type inference and flattening.</td><td>any nested object</td><td>Yes</td><td>Yes</td><td>No</td><td>No</td></tr>
</tbody>
</table>
<p>For cells marked <code translate="no">No</code>, Milvus rejects the request at index-creation time. For array cast types, use <code translate="no">INVERTED</code> explicitly (<code translate="no">AUTOINDEX</code> does not cover arrays).</p>
<h2 id="Create-a-JSON-index" class="common-anchor-header">Create a JSON index<button data-href="#Create-a-JSON-index" class="anchor-icon" translate="no">
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
    </button></h2><p>This section walks through indexing different shapes of JSON data. All examples use the sample structure below and assume you already have a collection that includes a <code translate="no">JSON</code> field named <code translate="no">metadata</code>.</p>
<h3 id="Sample-JSON-structure" class="common-anchor-header">Sample JSON structure<button data-href="#Sample-JSON-structure" class="anchor-icon" translate="no">
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
    </button></h3><pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;metadata&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;category&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;electronics&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;brand&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;BrandA&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;in_stock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">99.99</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;string_price&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;99.99&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;tags&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;clearance&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;summer_sale&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;supplier&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;SupplierX&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;country&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;USA&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;contact&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;email&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;support@supplierx.com&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;phone&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Basic-setup" class="common-anchor-header">Basic setup<button data-href="#Basic-setup" class="anchor-icon" translate="no">
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
    </button></h3><p>The examples below assume you have a <code translate="no">MilvusClient</code> named <code translate="no">client</code> connected to your Milvus deployment, and a collection that already includes a <code translate="no">JSON</code> field named <code translate="no">metadata</code>. If you need to set those up from scratch, expand the block below.</p>
<p><details></p>
<p><summary>Connect and create a sample collection</summary></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)

<span class="hljs-comment"># Define a schema with a JSON field</span>
schema = client.create_schema(enable_dynamic_field=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;pk&quot;</span>, DataType.INT64, is_primary=<span class="hljs-literal">True</span>, auto_id=<span class="hljs-literal">False</span>)
schema.add_field(<span class="hljs-string">&quot;vec&quot;</span>, DataType.FLOAT_VECTOR, dim=<span class="hljs-number">4</span>)
schema.add_field(<span class="hljs-string">&quot;metadata&quot;</span>, DataType.JSON, nullable=<span class="hljs-literal">True</span>)

<span class="hljs-comment"># Minimal vector index so the collection can be loaded</span>
vec_index = client.prepare_index_params()
vec_index.add_index(field_name=<span class="hljs-string">&quot;vec&quot;</span>, index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>, metric_type=<span class="hljs-string">&quot;L2&quot;</span>)

client.create_collection(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    schema=schema,
    index_params=vec_index,
)

<span class="hljs-comment"># Insert one row that matches the sample JSON structure above</span>
client.insert(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    data=[{
        <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
        <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
        <span class="hljs-string">&quot;metadata&quot;</span>: {
            <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
            <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
            <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">True</span>,
            <span class="hljs-string">&quot;price&quot;</span>: <span class="hljs-number">99.99</span>,
            <span class="hljs-string">&quot;string_price&quot;</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
            <span class="hljs-string">&quot;tags&quot;</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
            <span class="hljs-string">&quot;supplier&quot;</span>: {
                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
                <span class="hljs-string">&quot;country&quot;</span>: <span class="hljs-string">&quot;USA&quot;</span>,
                <span class="hljs-string">&quot;contact&quot;</span>: {
                    <span class="hljs-string">&quot;email&quot;</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                    <span class="hljs-string">&quot;phone&quot;</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                }
            }
        }
    }],
)
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Prepare an index-params object to collect the index definitions added in the examples below:</p>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre>
<p>Each example that follows shows one <code translate="no">index_params.add_index(...)</code> call. Pick the ones that match your data and call them on the same <code translate="no">index_params</code> object. Then apply everything in a single <code translate="no">client.create_index(...)</code> call at the end. For details, see <a href="/docs/json-indexing.md#apply-the-index">Apply the index</a>.</p>
<h3 id="Example-1-Index-a-top-level-key-with-AUTOINDEX" class="common-anchor-header">Example 1: Index a top-level key with AUTOINDEX<button data-href="#Example-1-Index-a-top-level-key-with-AUTOINDEX" class="anchor-icon" translate="no">
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
    </button></h3><p>Index the <code translate="no">category</code> field for fast filtering by product category. With <code translate="no">AUTOINDEX</code>, Milvus picks <code translate="no">BITMAP</code> or <code translate="no">STL_SORT</code> based on how many distinct categories exist in your data.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Index-a-nested-key" class="common-anchor-header">Example 2: Index a nested key<button data-href="#Example-2-Index-a-nested-key" class="anchor-icon" translate="no">
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
    </button></h3><p>Index the deeply nested <code translate="no">email</code> field for supplier contact lookups. The <code translate="no">json_path</code> parameter accepts any depth of bracket notation.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;email_index&quot;</span>,
<span class="highlighted-comment-line">    params={</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,</span>
<span class="highlighted-comment-line">    }</span>
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Range-queries-with-STLSORT" class="common-anchor-header">Example 3: Range queries with STL_SORT<button data-href="#Example-3-Range-queries-with-STLSORT" class="anchor-icon" translate="no">
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
    </button></h3><p>When you know your queries on a path will be dominated by range comparisons (<code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, <code translate="no">&lt;=</code>), pick <code translate="no">STL_SORT</code> directly. This bypasses cardinality measurement and builds the sorted layout immediately.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;price_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>After indexing, range queries like <code translate="no">metadata[&quot;price&quot;] &gt; 50 AND metadata[&quot;price&quot;] &lt; 100</code> use binary search instead of a full scan.</p>
<h3 id="Example-4-Equality-queries-with-BITMAP" class="common-anchor-header">Example 4: Equality queries with BITMAP<button data-href="#Example-4-Equality-queries-with-BITMAP" class="anchor-icon" translate="no">
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
    </button></h3><p>For low-cardinality keys, such as status codes, booleans, or enum-like strings, pick <code translate="no">BITMAP</code> directly. Equality and <code translate="no">IN</code> queries become bitmap operations.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;in_stock_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;in_stock&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;BOOL&quot;</span>,
    }
)
<button class="copy-code-btn"></button></code></pre>
<p><code translate="no">BITMAP</code> is also a strong fit for fields like a <code translate="no">status</code> column with a handful of distinct string values.</p>
<h3 id="Example-5-Convert-data-type-at-index-time" class="common-anchor-header">Example 5: Convert data type at index time<button data-href="#Example-5-Convert-data-type-at-index-time" class="anchor-icon" translate="no">
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
    </button></h3><p>When numeric data is mistakenly stored as strings, use <code translate="no">STRING_TO_DOUBLE</code> to convert the value to a number during index build.</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;string_to_double_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;json_cast_function&quot;</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>If conversion fails for a row (for example, a non-numeric string like <code translate="no">&quot;invalid&quot;</code>), that row is skipped during indexing.</p>
<h3 id="Example-6-Index-entire-JSON-objects" class="common-anchor-header">Example 6: Index entire JSON objects<button data-href="#Example-6-Index-entire-JSON-objects" class="anchor-icon" translate="no">
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
    </button></h3><p>Setting <code translate="no">json_cast_type=&quot;JSON&quot;</code> indexes the full structure at the given path. Milvus flattens nested objects into paths and automatically infers each value’s type. All keys under the path become searchable.</p>
<p><code translate="no">AUTOINDEX</code> transparently uses <code translate="no">INVERTED</code> for <code translate="no">JSON</code> cast type, since flattening and type inference are inverted-index capabilities.</p>
<p>Index the entire <code translate="no">metadata</code> object:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;metadata_full_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&quot;metadata&quot;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Or index a sub-object, such as all <code translate="no">supplier</code> information:</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
<span class="highlighted-wrapper-line">    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,</span>
    index_name=<span class="hljs-string">&quot;supplier_index&quot;</span>,
    params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;]&#x27;</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;JSON&quot;</span>,</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Indexing entire objects increases index size. For deeply nested documents with diverse query patterns, consider <a href="/docs/json-shredding.md">JSON Shredding</a>.</p>
<h3 id="Apply-the-index" class="common-anchor-header">Apply the index<button data-href="#Apply-the-index" class="anchor-icon" translate="no">
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
    </button></h3><p>After adding all your index parameters, apply them to your collection:</p>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<p>Index builds run asynchronously. Use <code translate="no">client.describe_index(...)</code> to check the build state of a specific index. The <code translate="no">state</code> field shows <code translate="no">Finished</code> once the build is done, and <code translate="no">total_rows</code>, <code translate="no">indexed_rows</code>, and <code translate="no">pending_index_rows</code> show progress along the way.</p>
<pre><code translate="no" class="language-python">client.describe_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Sample response:</p>
<pre><code translate="no" class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;json_path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;json_cast_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;VARCHAR&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;AUTOINDEX&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;field_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;metadata&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;index_name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;category_index&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;total_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;indexed_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">20</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;pending_index_rows&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;state&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Finished&quot;</span>
<span class="hljs-punctuation">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>Once <code translate="no">state</code> reports <code translate="no">Finished</code>, queries against the indexed path use the new index automatically.</p>
<p>For <code translate="no">AUTOINDEX</code> entries, the <code translate="no">index_type</code> field in this response is reported as <code translate="no">AUTOINDEX</code>. Milvus does not currently expose which underlying layout (<code translate="no">BITMAP</code> or <code translate="no">STL_SORT</code>) was chosen at build time. Treat the choice as an internal optimization: equality, <code translate="no">IN</code>, and range queries against the path will work regardless of which layout was selected.</p>
<h2 id="FAQ" class="common-anchor-header">FAQ<button data-href="#FAQ" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="common-anchor-header">How do I choose between AUTOINDEX and an explicit index type?<button data-href="#How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type" class="anchor-icon" translate="no">
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
    </button></h3><p>Start with <code translate="no">AUTOINDEX</code>. It picks the right layout from your data’s cardinality, and it covers most equality, <code translate="no">IN</code>, and range queries on JSON paths. Pick an explicit type when:</p>
<ul>
<li><p>You know your query pattern (for example, always range queries use <code translate="no">STL_SORT</code>, and always equality queries on low-cardinality values use <code translate="no">BITMAP</code>) and want to skip cardinality measurement.</p></li>
<li><p>You need text-match or substring queries. Use <code translate="no">INVERTED</code>.</p></li>
<li><p>You’re indexing array cast types or an entire JSON object. Use <code translate="no">INVERTED</code> for array cast types, and use either <code translate="no">INVERTED</code> or <code translate="no">AUTOINDEX</code> for entire JSON objects.</p></li>
</ul>
<h3 id="What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="common-anchor-header">What happens if a query’s filter expression uses a different type than the indexed cast type?<button data-href="#What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type" class="anchor-icon" translate="no">
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
    </button></h3><p>If your filter expression uses a different type than the index’s <code translate="no">json_cast_type</code>, Milvus does not use the index and may fall back to a slower brute-force scan if the data allows. For best performance, always align your filter expression with the cast type of the index. For example, if a numeric index is created with <code translate="no">json_cast_type=&quot;DOUBLE&quot;</code>, only numeric filter conditions will leverage the index.</p>
<h3 id="What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="common-anchor-header">What if a JSON key has inconsistent data types across different entities?<button data-href="#What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities" class="anchor-icon" translate="no">
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
    </button></h3><p>Inconsistent types can lead to <strong>partial indexing</strong>. For example, if <code translate="no">metadata[&quot;price&quot;]</code> is stored as both a number (<code translate="no">99.99</code>) and a string (<code translate="no">&quot;99.99&quot;</code>) and you create an index with <code translate="no">json_cast_type=&quot;DOUBLE&quot;</code>, only the numeric values are indexed. String-form entries are skipped and won’t appear in filter results. Use <code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> to coerce strings to numbers at index time, or fix the source data so all entries share one type.</p>
<h3 id="Can-I-create-multiple-indexes-on-the-same-JSON-key" class="common-anchor-header">Can I create multiple indexes on the same JSON key?<button data-href="#Can-I-create-multiple-indexes-on-the-same-JSON-key" class="anchor-icon" translate="no">
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
    </button></h3><p>No. Milvus allows at most one index per <code translate="no">(field, json_path)</code> pair, regardless of cast type or index type. You cannot create both an <code translate="no">INVERTED</code> and a <code translate="no">BITMAP</code> index on the same path, or two indexes on the same path with different cast types. You can, however, create an index on the entire JSON object and a separate index on a nested key within that object because those are different paths.</p>
<h3 id="How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="common-anchor-header">How do I tune AUTOINDEX’s BITMAP-vs-STL_SORT threshold?<button data-href="#How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold" class="anchor-icon" translate="no">
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
    </button></h3><p>By default, <code translate="no">AUTOINDEX</code> picks <code translate="no">BITMAP</code> when the indexed values have <strong>100 or fewer distinct values</strong> and <code translate="no">STL_SORT</code> otherwise. You can override this threshold by adding <code translate="no">&quot;bitmap_cardinality_limit&quot;</code> to your index parameters (range: 1-1000):</p>
<pre><code translate="no" class="language-python">index_params.add_index(
    field_name=<span class="hljs-string">&quot;metadata&quot;</span>,
    index_type=<span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
    params={
        <span class="hljs-string">&quot;json_path&quot;</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,
        <span class="hljs-string">&quot;json_cast_type&quot;</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,
<span class="highlighted-wrapper-line">        <span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>: <span class="hljs-number">200</span>,  <span class="hljs-comment"># use BITMAP up to 200 distinct values</span></span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>Most users don’t need to tune this. Raise it if you have a moderate-cardinality field you’d prefer bitmapped; lower it to push <code translate="no">AUTOINDEX</code> toward <code translate="no">STL_SORT</code> sooner. The setting is ignored when you specify <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code>, or <code translate="no">BITMAP</code> explicitly.</p>
