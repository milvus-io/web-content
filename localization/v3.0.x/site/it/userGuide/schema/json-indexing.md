---
id: json-indexing.md
title: JSON Indexing
summary: >-
  I campi JSON offrono un modo flessibile per memorizzare metadati strutturati
  in Milvus. Senza indicizzazione, le query sui campi JSON richiedono scansioni
  complete della collezione, che diventano lente man mano che il set di dati
  cresce. L'indicizzazione JSON crea indici su percorsi specifici all'interno
  dei dati JSON, in modo che le query di uguaglianza, intervallo e altri filtri
  su tali percorsi vengano eseguite rapidamente.
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
<p>For complex JSON documents with diverse query patterns, consider <a href="/docs/it/json-shredding.md">JSON Shredding</a> as an alternative.</p>
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
<p>Choose the cast type that matches the values stored at the path. To check whether a cast type works with a specific index type, see <a href="/docs/it/json-indexing.md#Compatibility-reference">Compatibility reference</a>.</p>
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
</tbody>
</table>
<p>If values at the same path have inconsistent types, only values that match the cast type are indexed. For example, if <code translate="no">metadata[&quot;price&quot;]</code> contains both <code translate="no">99.99</code> and <code translate="no">&quot;99.99&quot;</code>, an index of the <code translate="no">DOUBLE</code> cast type includes the numeric value and skips the string value. To convert string values during indexing, use <code translate="no">json_cast_function</code>; see <a href="/docs/it/json-indexing.md#Example-5-Convert-data-type-at-index-time">Example 5: Convert data type at index time</a>.</p>
<div class="alert warning">
<p>Whole-object JSON indexing (<code translate="no">json_cast_type=&quot;JSON&quot;</code>), also known as JSON flat indexing, is deprecated. Index-creation requests for it succeed for compatibility, but Milvus retains only the logical index definition and does not build a physical index. Create JSON path indexes for known query paths, or consider <a href="/docs/it/json-shredding.md">JSON Shredding</a> for broad query acceleration.</p>
</div>
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
<tr><td>Range filters on numbers or sortable strings</td><td><code translate="no">STL_SORT</code> or <code translate="no">AUTOINDEX</code></td><td>Use <code translate="no">DOUBLE</code> or <code translate="no">VARCHAR</code>.</td><td>Use <code translate="no">STL_SORT</code> to force a sorted layout; use <code translate="no">AUTOINDEX</code> when you want automatic selection.</td></tr>
<tr><td>Equality or <code translate="no">IN</code> filters on low-cardinality values</td><td><code translate="no">BITMAP</code> or <code translate="no">AUTOINDEX</code></td><td>Use <code translate="no">BOOL</code> or <code translate="no">VARCHAR</code>.</td><td>Use <code translate="no">BITMAP</code> to force a bitmap layout. For numeric values, use <code translate="no">AUTOINDEX</code> or <code translate="no">STL_SORT</code>.</td></tr>
</tbody>
</table>
<p>When in doubt, start with <code translate="no">AUTOINDEX</code> for scalar paths. Use <code translate="no">INVERTED</code> explicitly for array cast types and text-match queries.</p>
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
</tbody>
</table>
<p>For scalar cast types (<code translate="no">BOOL</code>, <code translate="no">DOUBLE</code>, and <code translate="no">VARCHAR</code>), <code translate="no">AUTOINDEX</code> is the recommended starting point when you want Milvus to choose the internal index layout. During index build, Milvus measures the <strong>cardinality</strong> of the values at the JSON path. Cardinality means the number of distinct values at that path.</p>
<p>Based on cardinality, Milvus chooses one of two internal layouts:</p>
<ul>
<li><p><strong>Low cardinality</strong>: Values repeat often, such as <code translate="no">metadata[&quot;in_stock&quot;]</code> with <code translate="no">true</code> and <code translate="no">false</code>, or <code translate="no">metadata[&quot;status&quot;]</code> with a small set of status strings. Milvus builds a <code translate="no">BITMAP</code> index internally for fast equality and <code translate="no">IN</code> filters.</p></li>
<li><p><strong>High cardinality</strong>: Most values are distinct, such as <code translate="no">metadata[&quot;price&quot;]</code>, <code translate="no">metadata[&quot;created_at&quot;]</code>, or <code translate="no">metadata[&quot;product_id&quot;]</code>. Milvus builds an <code translate="no">STL_SORT</code> index internally for fast range filters such as <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, and <code translate="no">&lt;=</code>.</p></li>
</ul>
<p>The default <code translate="no">BITMAP</code>-vs-<code translate="no">STL_SORT</code> threshold is <strong>100 distinct values</strong>. You can tune this threshold with <code translate="no">bitmap_cardinality_limit</code>; see <a href="/docs/it/json-indexing.md#How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold">How do I tune AUTOINDEX’s BITMAP-vs-STL_SORT threshold?</a>.</p>
<div class="alert note">
<p><strong>Behavior change in Milvus 3.0</strong>. In earlier versions, <code translate="no">AUTOINDEX</code> on JSON paths always built an <code translate="no">INVERTED</code> index. From Milvus 3.0, <code translate="no">AUTOINDEX</code> picks between <code translate="no">BITMAP</code> and <code translate="no">STL_SORT</code> for scalar cast types. For array cast types and text-match queries, specify <code translate="no">INVERTED</code> explicitly.</p>
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
    </button></h3><p><code translate="no">INVERTED</code> is the best fit when you need text-match queries or array indexing.</p>
<p>Specify <code translate="no">INVERTED</code> explicitly when:</p>
<ul>
<li><p>You need to index values inside JSON arrays.</p></li>
<li><p>You want one index type that handles equality, <code translate="no">IN</code>, range, text-match, and array queries.</p></li>
</ul>
<p>For details, refer to <a href="/docs/it/inverted.md">INVERTED</a>.</p>
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
<p><code translate="no">STL_SORT</code> does not support <code translate="no">BOOL</code> or <code translate="no">ARRAY_*</code> cast types. Use <code translate="no">INVERTED</code> for arrays.</p>
<p>For details, refer to <a href="/docs/it/stl-sort.md">STL_SORT</a>.</p>
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
<p><code translate="no">BITMAP</code> does not support <code translate="no">DOUBLE</code> or <code translate="no">ARRAY_*</code> cast types. For numeric values, use <code translate="no">AUTOINDEX</code>, <code translate="no">STL_SORT</code>, or <code translate="no">INVERTED</code> instead.</p>
<p>For details, refer to <a href="/docs/it/bitmap.md">BITMAP</a>.</p>
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
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> DataType, MilvusClient

client = MilvusClient(uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>, token=<span class="hljs-string">&quot;root:Milvus&quot;</span>)

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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;
<span class="hljs-keyword">import</span> com.google.gson.Gson;
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;
<span class="hljs-keyword">import</span> java.util.*;

<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)
        .build();
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// Define a schema with a JSON field</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();
schema.setEnableDynamicField(<span class="hljs-literal">false</span>);
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;pk&quot;</span>).dataType(DataType.Int64).isPrimaryKey(<span class="hljs-literal">true</span>).autoID(<span class="hljs-literal">false</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;vec&quot;</span>).dataType(DataType.FloatVector).dimension(<span class="hljs-number">4</span>).build());
schema.addField(AddFieldReq.builder().fieldName(<span class="hljs-string">&quot;metadata&quot;</span>).dataType(DataType.JSON).isNullable(<span class="hljs-literal">true</span>).build());

<span class="hljs-comment">// Minimal vector index so the collection can be loaded</span>
List&lt;IndexParam&gt; vecIndex = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
vecIndex.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;vec&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.L2)
        .build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
        .collectionSchema(schema)
        .indexParams(vecIndex)
        .build());

<span class="hljs-comment">// Insert one row that matches the sample JSON structure above</span>
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">metadata</span> <span class="hljs-operator">=</span> gson.fromJson(<span class="hljs-string">&quot;{&quot;</span>
        + <span class="hljs-string">&quot;\&quot;category\&quot;: \&quot;electronics\&quot;,&quot;</span>
        + <span class="hljs-string">&quot;\&quot;brand\&quot;: \&quot;BrandA\&quot;,&quot;</span>
        + <span class="hljs-string">&quot;\&quot;in_stock\&quot;: true,&quot;</span>
        + <span class="hljs-string">&quot;\&quot;price\&quot;: 99.99,&quot;</span>
        + <span class="hljs-string">&quot;\&quot;string_price\&quot;: \&quot;99.99\&quot;,&quot;</span>
        + <span class="hljs-string">&quot;\&quot;tags\&quot;: [\&quot;clearance\&quot;, \&quot;summer_sale\&quot;],&quot;</span>
        + <span class="hljs-string">&quot;\&quot;supplier\&quot;: {&quot;</span>
        + <span class="hljs-string">&quot;    \&quot;name\&quot;: \&quot;SupplierX\&quot;,&quot;</span>
        + <span class="hljs-string">&quot;    \&quot;country\&quot;: \&quot;USA\&quot;,&quot;</span>
        + <span class="hljs-string">&quot;    \&quot;contact\&quot;: {&quot;</span>
        + <span class="hljs-string">&quot;        \&quot;email\&quot;: \&quot;support@supplierx.com\&quot;,&quot;</span>
        + <span class="hljs-string">&quot;        \&quot;phone\&quot;: \&quot;+1-800-555-0199\&quot;&quot;</span>
        + <span class="hljs-string">&quot;    }&quot;</span>
        + <span class="hljs-string">&quot;}&quot;</span>
        + <span class="hljs-string">&quot;}&quot;</span>, JsonObject.class);
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();
row.addProperty(<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-number">1L</span>);
row.add(<span class="hljs-string">&quot;vec&quot;</span>, gson.toJsonTree(Arrays.asList(<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>)));
row.add(<span class="hljs-string">&quot;metadata&quot;</span>, metadata);

client.insert(InsertReq.builder()
        .collectionName(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
        .data(Collections.singletonList(row))
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">package</span> main

<span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/entity&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
<span class="hljs-keyword">defer</span> cli.Close(ctx)

<span class="hljs-comment">// Define a schema with a JSON field</span>
schema := entity.NewSchema().WithDynamicFieldEnabled(<span class="hljs-literal">false</span>).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;pk&quot;</span>).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(<span class="hljs-literal">true</span>).WithIsAutoID(<span class="hljs-literal">false</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;vec&quot;</span>).WithDataType(entity.FieldTypeFloatVector).WithDim(<span class="hljs-number">4</span>)).
    WithField(entity.NewField().WithName(<span class="hljs-string">&quot;metadata&quot;</span>).WithDataType(entity.FieldTypeJSON).WithNullable(<span class="hljs-literal">true</span>))

<span class="hljs-comment">// Minimal vector index so the collection can be loaded</span>
vecIndex := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-string">&quot;vec&quot;</span>, index.NewAutoIndex(entity.L2))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(<span class="hljs-string">&quot;your_collection_name&quot;</span>, schema).
    WithIndexOptions(vecIndex))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}

<span class="hljs-comment">// Insert one row that matches the sample JSON structure above</span>
metadata := []<span class="hljs-type">byte</span>(<span class="hljs-string">`{
    &quot;category&quot;: &quot;electronics&quot;,
    &quot;brand&quot;: &quot;BrandA&quot;,
    &quot;in_stock&quot;: true,
    &quot;price&quot;: 99.99,
    &quot;string_price&quot;: &quot;99.99&quot;,
    &quot;tags&quot;: [&quot;clearance&quot;, &quot;summer_sale&quot;],
    &quot;supplier&quot;: {
        &quot;name&quot;: &quot;SupplierX&quot;,
        &quot;country&quot;: &quot;USA&quot;,
        &quot;contact&quot;: {
            &quot;email&quot;: &quot;support@supplierx.com&quot;,
            &quot;phone&quot;: &quot;+1-800-555-0199&quot;
        }
    }
}`</span>)
result, err := cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption(<span class="hljs-string">&quot;your_collection_name&quot;</span>).
    WithInt64Column(<span class="hljs-string">&quot;pk&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">1</span>}).
    WithFloatVectorColumn(<span class="hljs-string">&quot;vec&quot;</span>, <span class="hljs-number">4</span>, [][]<span class="hljs-type">float32</span>{{<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>}}).
    WithColumns(column.NewColumnJSONBytes(<span class="hljs-string">&quot;metadata&quot;</span>, [][]<span class="hljs-type">byte</span>{metadata})))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
log.Printf(<span class="hljs-string">&quot;inserted %d rows&quot;</span>, result.InsertCount)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> serde_json::json;

<span class="hljs-keyword">let</span> <span class="hljs-variable">config</span> = ConnectConfig::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">uri</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>).<span class="hljs-title function_ invoke__">token</span>(<span class="hljs-string">&quot;root:Milvus&quot;</span>);
<span class="hljs-keyword">let</span> <span class="hljs-variable">client</span> = ClientV2::<span class="hljs-title function_ invoke__">new</span>(&amp;config).<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Define a schema with a JSON field</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">schema</span> = CollectionSchema::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;pk&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Int64).<span class="hljs-title function_ invoke__">primary_key</span>(<span class="hljs-literal">true</span>).<span class="hljs-title function_ invoke__">auto_id</span>(<span class="hljs-literal">false</span>))
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;vec&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::FloatVector).<span class="hljs-title function_ invoke__">dimension</span>(<span class="hljs-number">4</span>))
    .<span class="hljs-title function_ invoke__">add_field</span>(FieldSchema::<span class="hljs-title function_ invoke__">new</span>().<span class="hljs-title function_ invoke__">name</span>(<span class="hljs-string">&quot;metadata&quot;</span>).<span class="hljs-title function_ invoke__">data_type</span>(DataType::Json).<span class="hljs-title function_ invoke__">nullable</span>(<span class="hljs-literal">true</span>));

client.<span class="hljs-title function_ invoke__">create_collection</span>(
    CreateCollectionRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
        .<span class="hljs-title function_ invoke__">schema</span>(schema)
        .<span class="hljs-title function_ invoke__">build</span>()?,
)
.<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Minimal vector index so the collection can be loaded</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">vec_index</span> = IndexParam::<span class="hljs-title function_ invoke__">new</span>()
    .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;vec&quot;</span>)
    .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
    .<span class="hljs-title function_ invoke__">metric_type</span>(MetricType::L2);

client.<span class="hljs-title function_ invoke__">create_index</span>(
    CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_params</span>(<span class="hljs-built_in">vec!</span>[vec_index])
        .<span class="hljs-title function_ invoke__">build</span>()?,
)
.<span class="hljs-keyword">await</span>?;

<span class="hljs-comment">// Insert one row that matches the sample JSON structure above</span>
<span class="hljs-keyword">let</span> <span class="hljs-variable">row</span> = json!({
    <span class="hljs-string">&quot;pk&quot;</span>: <span class="hljs-number">1</span>,
    <span class="hljs-string">&quot;vec&quot;</span>: [<span class="hljs-number">0.1f32</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
    <span class="hljs-string">&quot;metadata&quot;</span>: {
        <span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
        <span class="hljs-string">&quot;brand&quot;</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
        <span class="hljs-string">&quot;in_stock&quot;</span>: <span class="hljs-literal">true</span>,
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
});
client.<span class="hljs-title function_ invoke__">insert</span>(
    InsertRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
        .<span class="hljs-title function_ invoke__">rows</span>(<span class="hljs-built_in">vec!</span>[row])
        .<span class="hljs-title function_ invoke__">build</span>()?,
)
.<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-keyword">auto</span> client = milvus::MilvusClientV2::<span class="hljs-built_in">Create</span>();
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Connect</span>(milvus::<span class="hljs-built_in">ConnectParam</span>(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-comment">// Define a schema with a JSON field</span>
<span class="hljs-function">milvus::CollectionSchema <span class="hljs-title">schema</span><span class="hljs-params">(<span class="hljs-string">&quot;your_collection_name&quot;</span>)</span></span>;
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;pk&quot;</span>, milvus::DataType::INT64, <span class="hljs-string">&quot;&quot;</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>));
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;vec&quot;</span>, milvus::DataType::FLOAT_VECTOR, <span class="hljs-string">&quot;&quot;</span>).<span class="hljs-built_in">WithDimension</span>(<span class="hljs-number">4</span>));
schema.<span class="hljs-built_in">AddField</span>(milvus::<span class="hljs-built_in">FieldSchema</span>(<span class="hljs-string">&quot;metadata&quot;</span>, milvus::DataType::JSON, <span class="hljs-string">&quot;&quot;</span>).<span class="hljs-built_in">WithNullable</span>(<span class="hljs-literal">true</span>));

<span class="hljs-comment">// Minimal vector index so the collection can be loaded</span>
<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">vec_index</span><span class="hljs-params">(<span class="hljs-string">&quot;vec&quot;</span>, <span class="hljs-string">&quot;vec_index&quot;</span>, milvus::IndexType::AUTOINDEX, milvus::MetricType::L2)</span></span>;

status = client-&gt;<span class="hljs-built_in">CreateCollection</span>(milvus::<span class="hljs-built_in">CreateCollectionRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
    .<span class="hljs-built_in">WithCollectionSchema</span>(std::<span class="hljs-built_in">make_shared</span>&lt;milvus::CollectionSchema&gt;(schema)));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(milvus::<span class="hljs-built_in">CreateIndexRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
    .<span class="hljs-built_in">WithIndexes</span>({std::<span class="hljs-built_in">move</span>(vec_index)})
    .<span class="hljs-built_in">WithSync</span>(<span class="hljs-literal">true</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}

<span class="hljs-comment">// Insert one row that matches the sample JSON structure above</span>
milvus::InsertRequest insert_req;
insert_req.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;your_collection_name&quot;</span>);
insert_req.<span class="hljs-built_in">AddRowData</span>({{<span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-number">1</span>},
                       {<span class="hljs-string">&quot;vec&quot;</span>, std::vector&lt;<span class="hljs-type">float</span>&gt;{<span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span>}},
                       {<span class="hljs-string">&quot;metadata&quot;</span>, nlohmann::json::<span class="hljs-built_in">parse</span>(<span class="hljs-string">R&quot;({
                            &quot;category&quot;: &quot;electronics&quot;,
                            &quot;brand&quot;: &quot;BrandA&quot;,
                            &quot;in_stock&quot;: true,
                            &quot;price&quot;: 99.99,
                            &quot;string_price&quot;: &quot;99.99&quot;,
                            &quot;tags&quot;: [&quot;clearance&quot;, &quot;summer_sale&quot;],
                            &quot;supplier&quot;: {
                                &quot;name&quot;: &quot;SupplierX&quot;,
                                &quot;country&quot;: &quot;USA&quot;,
                                &quot;contact&quot;: {
                                    &quot;email&quot;: &quot;support@supplierx.com&quot;,
                                    &quot;phone&quot;: &quot;+1-800-555-0199&quot;
                                }
                            }
                        })&quot;</span>)}});
milvus::InsertResponse insert_resp;
status = client-&gt;<span class="hljs-built_in">Insert</span>(insert_req, insert_resp);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({ <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span> });

<span class="hljs-comment">// Define a schema with a JSON field</span>
<span class="hljs-keyword">const</span> fields = [
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;pk&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>, <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">autoID</span>: <span class="hljs-literal">false</span> },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vec&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>, <span class="hljs-attr">type_params</span>: { <span class="hljs-attr">dim</span>: <span class="hljs-string">&quot;4&quot;</span> } },
  { <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">JSON</span>, <span class="hljs-attr">nullable</span>: <span class="hljs-literal">true</span> },
];

<span class="hljs-comment">// Minimal vector index so the collection can be loaded</span>
<span class="hljs-keyword">const</span> indexParams = [
  { <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;vec&quot;</span>, <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;vec_index&quot;</span>, <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>, <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;L2&quot;</span> },
];

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;your_collection_name&quot;</span>,
  fields,
  <span class="hljs-attr">index_params</span>: indexParams,
});

<span class="hljs-comment">// Insert one row that matches the sample JSON structure above</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;your_collection_name&quot;</span>,
  <span class="hljs-attr">data</span>: [
    {
      <span class="hljs-attr">pk</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">vec</span>: [<span class="hljs-number">0.1</span>, <span class="hljs-number">0.2</span>, <span class="hljs-number">0.3</span>, <span class="hljs-number">0.4</span>],
      <span class="hljs-attr">metadata</span>: {
        <span class="hljs-attr">category</span>: <span class="hljs-string">&quot;electronics&quot;</span>,
        <span class="hljs-attr">brand</span>: <span class="hljs-string">&quot;BrandA&quot;</span>,
        <span class="hljs-attr">in_stock</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">price</span>: <span class="hljs-number">99.99</span>,
        <span class="hljs-attr">string_price</span>: <span class="hljs-string">&quot;99.99&quot;</span>,
        <span class="hljs-attr">tags</span>: [<span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span>],
        <span class="hljs-attr">supplier</span>: {
          <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;SupplierX&quot;</span>,
          <span class="hljs-attr">country</span>: <span class="hljs-string">&quot;USA&quot;</span>,
          <span class="hljs-attr">contact</span>: {
            <span class="hljs-attr">email</span>: <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
            <span class="hljs-attr">phone</span>: <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>,
          },
        },
      },
    },
  ],
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Collection;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Dml;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">using</span> <span class="hljs-keyword">var</span> client = <span class="hljs-keyword">new</span> MilvusClientV2(<span class="hljs-keyword">new</span> ConnectConfig { Uri = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>, ApiKey = <span class="hljs-string">&quot;root:Milvus&quot;</span> });
<span class="hljs-keyword">await</span> client.ConnectAsync();

<span class="hljs-comment">// Define a schema with a JSON field</span>
<span class="hljs-keyword">var</span> schema = <span class="hljs-keyword">new</span> CollectionSchema
{
    Fields =
    {
        <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;pk&quot;</span>, DataType.Int64, isPrimaryKey: <span class="hljs-literal">true</span>, autoId: <span class="hljs-literal">false</span>),
        FieldSchema.CreateFloatVector(<span class="hljs-string">&quot;vec&quot;</span>, dimension: <span class="hljs-number">4</span>),
        <span class="hljs-keyword">new</span> FieldSchema(<span class="hljs-string">&quot;metadata&quot;</span>, DataType.Json) { Nullable = <span class="hljs-literal">true</span> }
    }
};

<span class="hljs-comment">// Minimal vector index so the collection can be loaded</span>
<span class="hljs-keyword">await</span> client.CreateCollectionAsync(<span class="hljs-keyword">new</span> CreateCollectionReq
{
    CollectionName = <span class="hljs-string">&quot;your_collection_name&quot;</span>,
    Schema = schema,
    Indexes = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;vec&quot;</span>, <span class="hljs-string">&quot;vec_index&quot;</span>, IndexType.AutoIndex, MetricType.L2)
    }
});

<span class="hljs-comment">// Insert one row that matches the sample JSON structure above</span>
<span class="hljs-keyword">await</span> client.InsertAsync(<span class="hljs-keyword">new</span> InsertReq
{
    CollectionName = <span class="hljs-string">&quot;your_collection_name&quot;</span>,
    RowsData = <span class="hljs-keyword">new</span>[]
    {
        <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
        {
            [<span class="hljs-string">&quot;pk&quot;</span>] = <span class="hljs-number">1L</span>,
            [<span class="hljs-string">&quot;vec&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-number">0.1f</span>, <span class="hljs-number">0.2f</span>, <span class="hljs-number">0.3f</span>, <span class="hljs-number">0.4f</span> },
            [<span class="hljs-string">&quot;metadata&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
            {
                [<span class="hljs-string">&quot;category&quot;</span>] = <span class="hljs-string">&quot;electronics&quot;</span>,
                [<span class="hljs-string">&quot;brand&quot;</span>] = <span class="hljs-string">&quot;BrandA&quot;</span>,
                [<span class="hljs-string">&quot;in_stock&quot;</span>] = <span class="hljs-literal">true</span>,
                [<span class="hljs-string">&quot;price&quot;</span>] = <span class="hljs-number">99.99</span>,
                [<span class="hljs-string">&quot;string_price&quot;</span>] = <span class="hljs-string">&quot;99.99&quot;</span>,
                [<span class="hljs-string">&quot;tags&quot;</span>] = <span class="hljs-keyword">new</span>[] { <span class="hljs-string">&quot;clearance&quot;</span>, <span class="hljs-string">&quot;summer_sale&quot;</span> },
                [<span class="hljs-string">&quot;supplier&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
                {
                    [<span class="hljs-string">&quot;name&quot;</span>] = <span class="hljs-string">&quot;SupplierX&quot;</span>,
                    [<span class="hljs-string">&quot;country&quot;</span>] = <span class="hljs-string">&quot;USA&quot;</span>,
                    [<span class="hljs-string">&quot;contact&quot;</span>] = <span class="hljs-keyword">new</span> Dictionary&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">object</span>?&gt;
                    {
                        [<span class="hljs-string">&quot;email&quot;</span>] = <span class="hljs-string">&quot;support@supplierx.com&quot;</span>,
                        [<span class="hljs-string">&quot;phone&quot;</span>] = <span class="hljs-string">&quot;+1-800-555-0199&quot;</span>
                    }
                }
            }
        }
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>

curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;your_collection_name&quot;,
    &quot;schema&quot;: {
      &quot;autoID&quot;: false,
      &quot;enableDynamicField&quot;: false,
      &quot;fields&quot;: [
        {&quot;fieldName&quot;: &quot;pk&quot;, &quot;dataType&quot;: &quot;Int64&quot;, &quot;isPrimary&quot;: true},
        {&quot;fieldName&quot;: &quot;vec&quot;, &quot;dataType&quot;: &quot;FloatVector&quot;, &quot;elementTypeParams&quot;: {&quot;dim&quot;: 4}},
        {&quot;fieldName&quot;: &quot;metadata&quot;, &quot;dataType&quot;: &quot;JSON&quot;, &quot;nullable&quot;: true}
      ]
    },
    &quot;indexParams&quot;: [
      {&quot;fieldName&quot;: &quot;vec&quot;, &quot;indexName&quot;: &quot;vec_index&quot;, &quot;indexType&quot;: &quot;AUTOINDEX&quot;, &quot;metricType&quot;: &quot;L2&quot;}
    ]
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p></details></p>
<p>Prepare an index-params object to collect the index definitions added in the examples below:</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python">index_params = client.prepare_index_params()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">var</span> indexOpts []milvusclient.CreateIndexOption
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">let</span> <span class="hljs-keyword">mut </span><span class="hljs-variable">index_params</span> = <span class="hljs-type">Vec</span>::<span class="hljs-title function_ invoke__">new</span>();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp">std::vector&lt;milvus::IndexDesc&gt; index_params;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> indexParams = [];
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">var</span> indexParams = <span class="hljs-keyword">new</span> List&lt;IndexParam&gt;();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># REST creates one index per request; collect the definitions below</span>
<span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&quot;[]&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Each example that follows shows one <code translate="no">index_params.add_index(...)</code> call. Pick the ones that match your data and call them on the same <code translate="no">index_params</code> object. Then apply everything in a single <code translate="no">client.create_index(...)</code> call at the end. For details, see <a href="/docs/it/json-indexing.md#Apply-the-index">Apply the index</a>.</p>
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
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>);
extraParams.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;VARCHAR&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;category_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

jsonIndex1 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">`metadata[&quot;category&quot;]`</span>).
    WithIndexName(<span class="hljs-string">&quot;category_index&quot;</span>)
indexOpts = <span class="hljs-built_in">append</span>(indexOpts, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex1).
    WithIndexName(<span class="hljs-string">&quot;category_index&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

index_params.<span class="hljs-title function_ invoke__">push</span>(
    IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;metadata&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;category_index&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
        .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
            (<span class="hljs-string">&quot;json_path&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            (<span class="hljs-string">&quot;json_cast_type&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;VARCHAR&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
        ])),
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">category_index</span><span class="hljs-params">(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;category_index&quot;</span>, milvus::IndexType::AUTOINDEX)</span></span>;
category_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>);
category_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;VARCHAR&quot;</span>);
index_params.<span class="hljs-built_in">push_back</span>(std::<span class="hljs-built_in">move</span>(category_index));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;your_collection_name&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;category_index&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
  <span class="hljs-attr">extra_params</span>: {
    <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,
    <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,
  },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

indexParams.Add(<span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;category_index&quot;</span>, IndexType.AutoIndex)
{
    ExtraParams =
    {
        [<span class="hljs-string">&quot;json_path&quot;</span>] = <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;json_cast_type&quot;</span>] = <span class="hljs-string">&quot;VARCHAR&quot;</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> categoryIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;metadata&quot;,
  &quot;indexName&quot;: &quot;category_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_path&quot;: &quot;metadata[\\\&quot;category\\\&quot;]&quot;,
    &quot;json_cast_type&quot;: &quot;VARCHAR&quot;
  }
}&#x27;</span>
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
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;supplier\&quot;][\&quot;contact\&quot;][\&quot;email\&quot;]&quot;</span>);
extraParams.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;VARCHAR&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;email_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

jsonIndex2 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">`metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]`</span>).
    WithIndexName(<span class="hljs-string">&quot;email_index&quot;</span>)
indexOpts = <span class="hljs-built_in">append</span>(indexOpts, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex2).
    WithIndexName(<span class="hljs-string">&quot;email_index&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

index_params.<span class="hljs-title function_ invoke__">push</span>(
    IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;metadata&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;email_index&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
        .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
            (<span class="hljs-string">&quot;json_path&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;metadata[\&quot;supplier\&quot;][\&quot;contact\&quot;][\&quot;email\&quot;]&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            (<span class="hljs-string">&quot;json_cast_type&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;VARCHAR&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
        ])),
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">email_index</span><span class="hljs-params">(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;email_index&quot;</span>, milvus::IndexType::AUTOINDEX)</span></span>;
email_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;supplier\&quot;][\&quot;contact\&quot;][\&quot;email\&quot;]&quot;</span>);
email_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;VARCHAR&quot;</span>);
index_params.<span class="hljs-built_in">push_back</span>(std::<span class="hljs-built_in">move</span>(email_index));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;your_collection_name&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;email_index&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
  <span class="hljs-attr">extra_params</span>: {
    <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;metadata[&quot;supplier&quot;][&quot;contact&quot;][&quot;email&quot;]&#x27;</span>,
    <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,
  },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

indexParams.Add(<span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;email_index&quot;</span>, IndexType.AutoIndex)
{
    ExtraParams =
    {
        [<span class="hljs-string">&quot;json_path&quot;</span>] = <span class="hljs-string">&quot;metadata[\&quot;supplier\&quot;][\&quot;contact\&quot;][\&quot;email\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;json_cast_type&quot;</span>] = <span class="hljs-string">&quot;VARCHAR&quot;</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> emailIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;metadata&quot;,
  &quot;indexName&quot;: &quot;email_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_path&quot;: &quot;metadata[\\\&quot;supplier\\\&quot;][\\\&quot;contact\\\&quot;][\\\&quot;email\\\&quot;]&quot;,
    &quot;json_cast_type&quot;: &quot;VARCHAR&quot;
  }
}&#x27;</span>
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
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>);
extraParams.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;DOUBLE&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;price_index&quot;</span>)
        .indexType(IndexParam.IndexType.STL_SORT)
        .extraParams(extraParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

jsonIndex3 := index.NewJSONPathIndex(index.Sorted, <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-string">`metadata[&quot;price&quot;]`</span>).
    WithIndexName(<span class="hljs-string">&quot;price_index&quot;</span>)
indexOpts = <span class="hljs-built_in">append</span>(indexOpts, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex3).
    WithIndexName(<span class="hljs-string">&quot;price_index&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

index_params.<span class="hljs-title function_ invoke__">push</span>(
    IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;metadata&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;price_index&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::StlSort)
        .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
            (<span class="hljs-string">&quot;json_path&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            (<span class="hljs-string">&quot;json_cast_type&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;DOUBLE&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
        ])),
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">price_index</span><span class="hljs-params">(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;price_index&quot;</span>, milvus::IndexType::STL_SORT)</span></span>;
price_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>);
price_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;DOUBLE&quot;</span>);
index_params.<span class="hljs-built_in">push_back</span>(std::<span class="hljs-built_in">move</span>(price_index));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;your_collection_name&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;price_index&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;STL_SORT&quot;</span>,
  <span class="hljs-attr">extra_params</span>: {
    <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;metadata[&quot;price&quot;]&#x27;</span>,
    <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
  },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

indexParams.Add(<span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;price_index&quot;</span>, IndexType.StlSort)
{
    ExtraParams =
    {
        [<span class="hljs-string">&quot;json_path&quot;</span>] = <span class="hljs-string">&quot;metadata[\&quot;price\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;json_cast_type&quot;</span>] = <span class="hljs-string">&quot;DOUBLE&quot;</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> priceIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;metadata&quot;,
  &quot;indexName&quot;: &quot;price_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;STL_SORT&quot;,
    &quot;json_path&quot;: &quot;metadata[\\\&quot;price\\\&quot;]&quot;,
    &quot;json_cast_type&quot;: &quot;DOUBLE&quot;
  }
}&#x27;</span>
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
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;in_stock\&quot;]&quot;</span>);
extraParams.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;BOOL&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;in_stock_index&quot;</span>)
        .indexType(IndexParam.IndexType.BITMAP)
        .extraParams(extraParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

jsonIndex4 := index.NewJSONPathIndex(index.BITMAP, <span class="hljs-string">&quot;bool&quot;</span>, <span class="hljs-string">`metadata[&quot;in_stock&quot;]`</span>).
    WithIndexName(<span class="hljs-string">&quot;in_stock_index&quot;</span>)
indexOpts = <span class="hljs-built_in">append</span>(indexOpts, milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex4).
    WithIndexName(<span class="hljs-string">&quot;in_stock_index&quot;</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

index_params.<span class="hljs-title function_ invoke__">push</span>(
    IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;metadata&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;in_stock_index&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::Bitmap)
        .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
            (<span class="hljs-string">&quot;json_path&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;metadata[\&quot;in_stock\&quot;]&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            (<span class="hljs-string">&quot;json_cast_type&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;BOOL&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
        ])),
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">in_stock_index</span><span class="hljs-params">(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;in_stock_index&quot;</span>, milvus::IndexType::BITMAP)</span></span>;
in_stock_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;in_stock\&quot;]&quot;</span>);
in_stock_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;BOOL&quot;</span>);
index_params.<span class="hljs-built_in">push_back</span>(std::<span class="hljs-built_in">move</span>(in_stock_index));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;your_collection_name&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;in_stock_index&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;BITMAP&quot;</span>,
  <span class="hljs-attr">extra_params</span>: {
    <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;metadata[&quot;in_stock&quot;]&#x27;</span>,
    <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;BOOL&quot;</span>,
  },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

indexParams.Add(<span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;in_stock_index&quot;</span>, IndexType.Bitmap)
{
    ExtraParams =
    {
        [<span class="hljs-string">&quot;json_path&quot;</span>] = <span class="hljs-string">&quot;metadata[\&quot;in_stock\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;json_cast_type&quot;</span>] = <span class="hljs-string">&quot;BOOL&quot;</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> inStockIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;metadata&quot;,
  &quot;indexName&quot;: &quot;in_stock_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;BITMAP&quot;,
    &quot;json_path&quot;: &quot;metadata[\\\&quot;in_stock\\\&quot;]&quot;,
    &quot;json_cast_type&quot;: &quot;BOOL&quot;
  }
}&#x27;</span>
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
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;string_price\&quot;]&quot;</span>);
extraParams.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;DOUBLE&quot;</span>);
extraParams.put(<span class="hljs-string">&quot;json_cast_function&quot;</span>, <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;string_to_double_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

jsonIndex5 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;double&quot;</span>, <span class="hljs-string">`metadata[&quot;string_price&quot;]`</span>).
    WithIndexName(<span class="hljs-string">&quot;string_to_double_index&quot;</span>)
opt5 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex5).
    WithIndexName(<span class="hljs-string">&quot;string_to_double_index&quot;</span>)
opt5.WithExtraParam(<span class="hljs-string">&quot;json_cast_function&quot;</span>, <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>)
indexOpts = <span class="hljs-built_in">append</span>(indexOpts, opt5)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

index_params.<span class="hljs-title function_ invoke__">push</span>(
    IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;metadata&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;string_to_double_index&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
        .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
            (<span class="hljs-string">&quot;json_path&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;metadata[\&quot;string_price\&quot;]&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            (<span class="hljs-string">&quot;json_cast_type&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;DOUBLE&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            (<span class="hljs-string">&quot;json_cast_function&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
        ])),
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">string_to_double_index</span><span class="hljs-params">(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;string_to_double_index&quot;</span>, milvus::IndexType::AUTOINDEX)</span></span>;
string_to_double_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;string_price\&quot;]&quot;</span>);
string_to_double_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;DOUBLE&quot;</span>);
string_to_double_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_cast_function&quot;</span>, <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>);
index_params.<span class="hljs-built_in">push_back</span>(std::<span class="hljs-built_in">move</span>(string_to_double_index));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;your_collection_name&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;string_to_double_index&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
  <span class="hljs-attr">extra_params</span>: {
    <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;metadata[&quot;string_price&quot;]&#x27;</span>,
    <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;DOUBLE&quot;</span>,
    <span class="hljs-attr">json_cast_function</span>: <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>,
  },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

indexParams.Add(<span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;string_to_double_index&quot;</span>, IndexType.AutoIndex)
{
    ExtraParams =
    {
        [<span class="hljs-string">&quot;json_path&quot;</span>] = <span class="hljs-string">&quot;metadata[\&quot;string_price\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;json_cast_type&quot;</span>] = <span class="hljs-string">&quot;DOUBLE&quot;</span>,
        [<span class="hljs-string">&quot;json_cast_function&quot;</span>] = <span class="hljs-string">&quot;STRING_TO_DOUBLE&quot;</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> stringToDoubleIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;metadata&quot;,
  &quot;indexName&quot;: &quot;string_to_double_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_path&quot;: &quot;metadata[\\\&quot;string_price\\\&quot;]&quot;,
    &quot;json_cast_type&quot;: &quot;DOUBLE&quot;,
    &quot;json_cast_function&quot;: &quot;STRING_TO_DOUBLE&quot;
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>If conversion fails for a row (for example, a non-numeric string like <code translate="no">&quot;invalid&quot;</code>), that row is skipped during indexing.</p>
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
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python">client.create_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.CreateIndexReq;

client.createIndex(CreateIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
        .indexParams(indexParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;log&quot;</span>

<span class="hljs-keyword">for</span> _, opt := <span class="hljs-keyword">range</span> indexOpts {
    _, err := cli.CreateIndex(ctx, opt)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(err)
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

client.<span class="hljs-title function_ invoke__">create_index</span>(
    CreateIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
        .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_params</span>(index_params)
        .<span class="hljs-title function_ invoke__">build</span>()?,
)
.<span class="hljs-keyword">await</span>?;
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

status = client-&gt;<span class="hljs-built_in">CreateIndex</span>(milvus::<span class="hljs-built_in">CreateIndexRequest</span>()
    .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
    .<span class="hljs-built_in">WithIndexes</span>(std::<span class="hljs-built_in">move</span>(index_params))
    .<span class="hljs-built_in">WithSync</span>(<span class="hljs-literal">true</span>));
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>(indexParams);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;
<span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

<span class="hljs-keyword">await</span> client.CreateIndexAsync(<span class="hljs-keyword">new</span> CreateIndexReq
{
    CollectionName = <span class="hljs-string">&quot;your_collection_name&quot;</span>,
    Indexes = indexParams
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&quot;[
  <span class="hljs-variable">$categoryIndex</span>,
  <span class="hljs-variable">$emailIndex</span>,
  <span class="hljs-variable">$priceIndex</span>,
  <span class="hljs-variable">$inStockIndex</span>,
  <span class="hljs-variable">$stringToDoubleIndex</span>,
  <span class="hljs-variable">$metadataFullIndex</span>,
  <span class="hljs-variable">$supplierIndex</span>
]&quot;</span>
curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/create&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&quot;{
    \&quot;collectionName\&quot;: \&quot;your_collection_name\&quot;,
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>
  }&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Index builds run asynchronously. Use <code translate="no">client.describe_index(...)</code> to check the build state of a specific index. The <code translate="no">state</code> field shows <code translate="no">Finished</code> once the build is done, and <code translate="no">total_rows</code>, <code translate="no">indexed_rows</code>, and <code translate="no">pending_index_rows</code> show progress along the way.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
<pre><code translate="no" class="language-python">client.describe_index(
    collection_name=<span class="hljs-string">&quot;your_collection_name&quot;</span>,
    index_name=<span class="hljs-string">&quot;category_index&quot;</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.index.request.DescribeIndexReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.index.response.DescribeIndexResp;

<span class="hljs-type">DescribeIndexResp</span> <span class="hljs-variable">descResp</span> <span class="hljs-operator">=</span> client.describeIndex(DescribeIndexReq.builder()
        .collectionName(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
        .indexName(<span class="hljs-string">&quot;category_index&quot;</span>)
        .build());
System.out.println(descResp);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;log&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

desc, err := cli.DescribeIndex(ctx, milvusclient.NewDescribeIndexOption(<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-string">&quot;category_index&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(err)
}
log.Printf(<span class="hljs-string">&quot;state=%s totalRows=%d indexedRows=%d&quot;</span>, desc.State, desc.TotalRows, desc.IndexedRows)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;

<span class="hljs-keyword">let</span> <span class="hljs-variable">desc</span> = client
    .<span class="hljs-title function_ invoke__">describe_index</span>(
        DescribeIndexRequest::<span class="hljs-title function_ invoke__">builder</span>()
            .<span class="hljs-title function_ invoke__">collection_name</span>(<span class="hljs-string">&quot;your_collection_name&quot;</span>)
            .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;category_index&quot;</span>)
            .<span class="hljs-title function_ invoke__">build</span>()?,
    )
    .<span class="hljs-keyword">await</span>?;
<span class="hljs-built_in">println!</span>(<span class="hljs-string">&quot;{:?}&quot;</span>, desc);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;iostream&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

milvus::DescribeIndexRequest describe_req;
describe_req.<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;your_collection_name&quot;</span>);
describe_req.<span class="hljs-built_in">WithIndexName</span>(<span class="hljs-string">&quot;category_index&quot;</span>);
milvus::DescribeIndexResponse describe_resp;
status = client-&gt;<span class="hljs-built_in">DescribeIndex</span>(describe_req, describe_resp);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cout &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeIndex</span>({ <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;category_index&quot;</span> });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Requests.Index;

<span class="hljs-keyword">var</span> describeResp = <span class="hljs-keyword">await</span> client.DescribeIndexAsync(<span class="hljs-keyword">new</span> DescribeIndexReq
{
    CollectionName = <span class="hljs-string">&quot;your_collection_name&quot;</span>,
    IndexName = <span class="hljs-string">&quot;category_index&quot;</span>
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash">curl --request POST \
  --url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/indexes/describe&quot;</span> \
  --header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \
  --header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
  --data <span class="hljs-string">&#x27;{
    &quot;collectionName&quot;: &quot;your_collection_name&quot;,
    &quot;indexName&quot;: &quot;category_index&quot;
  }&#x27;</span>
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
<p>For <code translate="no">AUTOINDEX</code> entries, the <code translate="no">index_type</code> field in this response is reported as <code translate="no">AUTOINDEX</code>. Milvus does not expose which underlying layout (<code translate="no">BITMAP</code> or <code translate="no">STL_SORT</code>) was chosen at build time. Treat the choice as an internal optimization: equality, <code translate="no">IN</code>, and range queries against the path will work regardless of which layout was selected.</p>
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
<li><p>You’re indexing array cast types. Use <code translate="no">INVERTED</code> explicitly.</p></li>
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
    </button></h3><p>No. Milvus allows at most one index per <code translate="no">(field, json_path)</code> pair, regardless of cast type or index type. You cannot create both an <code translate="no">INVERTED</code> and a <code translate="no">BITMAP</code> index on the same path, or two indexes on the same path with different cast types.</p>
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
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>
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
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> java.util.HashMap;
<span class="hljs-keyword">import</span> java.util.Map;

Map&lt;String, Object&gt; extraParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();
extraParams.put(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>);
extraParams.put(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;VARCHAR&quot;</span>);
extraParams.put(<span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>, <span class="hljs-number">200</span>);
indexParams.add(IndexParam.builder()
        .fieldName(<span class="hljs-string">&quot;metadata&quot;</span>)
        .indexName(<span class="hljs-string">&quot;category_index&quot;</span>)
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams)
        .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/index&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

jsonIndex8 := index.NewJSONPathIndex(index.AUTOINDEX, <span class="hljs-string">&quot;varchar&quot;</span>, <span class="hljs-string">`metadata[&quot;category&quot;]`</span>).
    WithIndexName(<span class="hljs-string">&quot;category_index&quot;</span>)
opt8 := milvusclient.NewCreateIndexOption(<span class="hljs-string">&quot;your_collection_name&quot;</span>, <span class="hljs-string">&quot;metadata&quot;</span>, jsonIndex8).
    WithIndexName(<span class="hljs-string">&quot;category_index&quot;</span>)
opt8.WithExtraParam(<span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>, <span class="hljs-string">&quot;200&quot;</span>)
indexOpts = <span class="hljs-built_in">append</span>(indexOpts, opt8)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-rust"><span class="hljs-keyword">use</span> milvus::v2::prelude::*;
<span class="hljs-keyword">use</span> std::collections::HashMap;

index_params.<span class="hljs-title function_ invoke__">push</span>(
    IndexParam::<span class="hljs-title function_ invoke__">new</span>()
        .<span class="hljs-title function_ invoke__">field_name</span>(<span class="hljs-string">&quot;metadata&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_name</span>(<span class="hljs-string">&quot;category_index&quot;</span>)
        .<span class="hljs-title function_ invoke__">index_type</span>(IndexType::AutoIndex)
        .<span class="hljs-title function_ invoke__">extra_params</span>(HashMap::<span class="hljs-title function_ invoke__">from</span>([
            (<span class="hljs-string">&quot;json_path&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            (<span class="hljs-string">&quot;json_cast_type&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;VARCHAR&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
            (<span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>(), <span class="hljs-string">&quot;200&quot;</span>.<span class="hljs-title function_ invoke__">to_string</span>()),
        ])),
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&lt;utility&gt;</span></span>
<span class="hljs-meta">#<span class="hljs-keyword">include</span> <span class="hljs-string">&quot;milvus/MilvusClientV2.h&quot;</span></span>

<span class="hljs-function">milvus::IndexDesc <span class="hljs-title">category_limit_index</span><span class="hljs-params">(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;category_index&quot;</span>, milvus::IndexType::AUTOINDEX)</span></span>;
category_limit_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_path&quot;</span>, <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>);
category_limit_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;json_cast_type&quot;</span>, <span class="hljs-string">&quot;VARCHAR&quot;</span>);
category_limit_index.<span class="hljs-built_in">AddExtraParam</span>(<span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>, <span class="hljs-string">&quot;200&quot;</span>);
index_params.<span class="hljs-built_in">push_back</span>(std::<span class="hljs-built_in">move</span>(category_limit_index));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">indexParams.<span class="hljs-title function_">push</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;your_collection_name&quot;</span>,
  <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;metadata&quot;</span>,
  <span class="hljs-attr">index_name</span>: <span class="hljs-string">&quot;category_index&quot;</span>,
  <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;AUTOINDEX&quot;</span>,
  <span class="hljs-attr">extra_params</span>: {
    <span class="hljs-attr">json_path</span>: <span class="hljs-string">&#x27;metadata[&quot;category&quot;]&#x27;</span>,
    <span class="hljs-attr">json_cast_type</span>: <span class="hljs-string">&quot;VARCHAR&quot;</span>,
    <span class="hljs-attr">bitmap_cardinality_limit</span>: <span class="hljs-number">200</span>,
  },
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">using</span> Milvus.Client.V2.Types;

indexParams.Add(<span class="hljs-keyword">new</span> IndexParam(<span class="hljs-string">&quot;metadata&quot;</span>, <span class="hljs-string">&quot;category_index&quot;</span>, IndexType.AutoIndex)
{
    ExtraParams =
    {
        [<span class="hljs-string">&quot;json_path&quot;</span>] = <span class="hljs-string">&quot;metadata[\&quot;category\&quot;]&quot;</span>,
        [<span class="hljs-string">&quot;json_cast_type&quot;</span>] = <span class="hljs-string">&quot;VARCHAR&quot;</span>,
        [<span class="hljs-string">&quot;bitmap_cardinality_limit&quot;</span>] = <span class="hljs-string">&quot;200&quot;</span> <span class="hljs-comment">// use BITMAP up to 200 distinct values</span>
    }
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-built_in">export</span> categoryLimitIndex=<span class="hljs-string">&#x27;{
  &quot;fieldName&quot;: &quot;metadata&quot;,
  &quot;indexName&quot;: &quot;category_index&quot;,
  &quot;params&quot;: {
    &quot;index_type&quot;: &quot;AUTOINDEX&quot;,
    &quot;json_path&quot;: &quot;metadata[\\\&quot;category\\\&quot;]&quot;,
    &quot;json_cast_type&quot;: &quot;VARCHAR&quot;,
    &quot;bitmap_cardinality_limit&quot;: 200
  }
}&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Most users don’t need to tune this. Raise it if you have a moderate-cardinality field you’d prefer bitmapped; lower it to push <code translate="no">AUTOINDEX</code> toward <code translate="no">STL_SORT</code> sooner. The setting is ignored when you specify <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code>, or <code translate="no">BITMAP</code> explicitly.</p>
