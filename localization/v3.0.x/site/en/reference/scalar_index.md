---
id: scalar_index.md
related_key: scalar_index
summary: >-
  Scalar indexes accelerate filtering on non-vector fields. This reference
  explains how Milvus selects scalar indexes, which index types you can specify,
  and the data types each index supports.
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
    </button></h1><p>Scalar indexes accelerate filtering on non-vector fields, such as categories, prices, timestamps, and locations. When a filter expression narrows a search, a scalar index lets Milvus locate matching entities without scanning the field.</p>
<p>If you are unsure which index to choose, use <code translate="no">AUTOINDEX</code>. Specify an index type manually only when you need a particular behavior.</p>
<h2 id="Choosing-a-scalar-index" class="common-anchor-header">Choosing a scalar index<button data-href="#Choosing-a-scalar-index" class="anchor-icon" translate="no">
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
    </button></h2><p>The following table lists the index Milvus selects by default when you use <code translate="no">AUTOINDEX</code>, together with the index types you can specify manually for each data type.</p>
<table>
<thead>
<tr><th>Data type</th><th>AUTOINDEX default</th><th>Manual index types</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code>, <code translate="no">NGRAM</code>, <code translate="no">FMINDEX</code></td></tr>
<tr><td><code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">STL_SORT</code></td><td><code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">GEOMETRY</code></td><td><code translate="no">RTREE</code></td><td><code translate="no">RTREE</code></td></tr>
<tr><td><code translate="no">JSON</code> with a typed scalar or array cast</td><td><code translate="no">HYBRID</code></td><td>Depends on <code translate="no">json_cast_type</code>; see <a href="#JSON-field-indexing">JSON field indexing</a>.</td></tr>
<tr><td><code translate="no">ARRAY&lt;BOOL&gt;</code></td><td><code translate="no">BITMAP</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;INT8&gt;</code> through <code translate="no">ARRAY&lt;INT64&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;FLOAT&gt;</code>, <code translate="no">ARRAY&lt;DOUBLE&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY&lt;VARCHAR&gt;</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">TEXT</code></td><td>Not supported</td><td>None</td></tr>
</tbody>
</table>
<p><code translate="no">HYBRID</code> is an internal strategy, not a type you can specify directly. See <a href="#How-AUTOINDEX-selects">How AUTOINDEX selects</a>.</p>
<p>The following restrictions apply:</p>
<ul>
<li><strong>Primary keys:</strong> <code translate="no">BITMAP</code> is unavailable on primary-key fields.</li>
<li><strong>Arrays:</strong> Recursive arrays and arrays with nullable elements do not support scalar indexing, including <code translate="no">AUTOINDEX</code>. Ordinary arrays support Boolean, integer, floating-point, and VARCHAR elements.</li>
<li><strong>Struct arrays:</strong> Index scalar subfields individually. Their support can differ from ordinary arrays; for example, a Boolean struct subfield does not support explicit <code translate="no">STL_SORT</code>.</li>
<li><strong>TEXT:</strong> User-created scalar indexes, including <code translate="no">AUTOINDEX</code>, are unavailable. Text analysis and BM25 search use separate mechanisms.</li>
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
    </button></h2><table>
<thead>
<tr><th>Index type</th><th>What it’s for</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>General-purpose equality, membership, and range filters.</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Fields with few distinct values; compact bitwise filtering.</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Sorted value lookups and range filtering.</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>String equality and prefix matching.</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>LIKE and regex on strings by narrowing candidates.</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>Exact prefix, suffix, and infix substring matching.</td></tr>
<tr><td><code translate="no">RTREE</code></td><td>Spatial filtering on GEOMETRY fields.</td></tr>
</tbody>
</table>
<p>For creation examples, index parameters, and supported queries, refer to <a href="/docs/bitmap.md">BITMAP</a>, <a href="/docs/inverted.md">INVERTED</a>, <a href="/docs/ngram.md">NGRAM</a>, <a href="/docs/stl-sort.md">STL_SORT</a>, <a href="/docs/trie.md">TRIE</a>, <a href="/docs/fmindex.md">FMINDEX</a>, and <a href="/docs/rtree.md">RTREE</a>.</p>
<h2 id="How-AUTOINDEX-selects" class="common-anchor-header">How AUTOINDEX selects<button data-href="#How-AUTOINDEX-selects" class="anchor-icon" translate="no">
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
    </button></h2><p>With <code translate="no">AUTOINDEX</code>, Milvus selects an index using the field type, server configuration, and, for some fields, the number of distinct values (cardinality). The default selections are listed in <a href="#Choosing-a-scalar-index">Choosing a scalar index</a>.</p>
<p>For most fields, <code translate="no">AUTOINDEX</code> uses an internal <code translate="no">HYBRID</code> strategy that picks an index by cardinality:</p>
<ul>
<li><strong><code translate="no">BITMAP</code></strong> when a build contains fewer than 100 distinct values.</li>
<li><strong><code translate="no">STL_SORT</code></strong> when a build contains 100 or more distinct values.</li>
</ul>
<p>Array indexes use a separate compatibility policy: their high-cardinality branch uses <code translate="no">STL_SORT</code> when the cluster supports it, and <code translate="no">INVERTED</code> otherwise. See <a href="#Version-compatibility">Version compatibility</a>.</p>
<p><code translate="no">HYBRID</code> is internal only — you cannot specify it directly. An internal selection can also use an index that is unavailable as an explicit choice for that field, such as bitmap indexing for floating-point values.</p>
<blockquote>
<p>These selections are defaults. Administrators can change them through <code translate="no">scalarAutoIndex.params.build</code>. The <code translate="no">scalarAutoIndex.enable</code> setting defaults to <code translate="no">false</code>, which still allows explicit <code translate="no">AUTOINDEX</code> and selection when the index type is omitted; setting it to <code translate="no">true</code> also applies automatic selection to otherwise valid manual requests.</p>
</blockquote>
<h2 id="JSON-field-indexing" class="common-anchor-header">JSON field indexing<button data-href="#JSON-field-indexing" class="anchor-icon" translate="no">
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
    </button></h2><p>To index JSON values, specify <code translate="no">json_cast_type</code> to indicate the type of values to index. This parameter is required for both automatic and manual indexing. Use <code translate="no">json_path</code> to identify the path; if omitted, Milvus uses the field name supplied in the request.</p>
<table>
<thead>
<tr><th>json_cast_type</th><th>AUTOINDEX default</th><th>Manual index types</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code></td></tr>
<tr><td><code translate="no">DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, <code translate="no">NGRAM</code></td></tr>
<tr><td><code translate="no">ARRAY_BOOL</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_DOUBLE</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
<tr><td><code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">HYBRID</code></td><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td></tr>
</tbody>
</table>
<p>The optional <code translate="no">json_cast_function=&quot;STRING_TO_DOUBLE&quot;</code> converts string values for a <code translate="no">DOUBLE</code> cast. It cannot be used with other cast types. Neither <code translate="no">TRIE</code> nor <code translate="no">FMINDEX</code> supports JSON fields.</p>
<h2 id="Supported-predicates" class="common-anchor-header">Supported predicates<button data-href="#Supported-predicates" class="anchor-icon" translate="no">
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
    </button></h2><p>The following tables show which predicates each index can help evaluate. <strong>Index support does not guarantee that Milvus will use the index for every query.</strong> Milvus can scan field data when the index is unsuitable for a particular expression or pattern.</p>
<h3 id="Comparisons-and-membership" class="common-anchor-header">Comparisons and membership<button data-href="#Comparisons-and-membership" class="anchor-icon" translate="no">
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
    </button></h3><p>Equality and membership include <code translate="no">==</code>, <code translate="no">!=</code>, <code translate="no">in</code>, and <code translate="no">not in</code>. Range comparisons include <code translate="no">&lt;</code>, <code translate="no">&lt;=</code>, <code translate="no">&gt;</code>, <code translate="no">&gt;=</code>, and expressions such as <code translate="no">10 &lt;= price &lt; 50</code>.</p>
<table>
<thead>
<tr><th>Index type</th><th>Field data types</th><th>Predicates supported by the index</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td><code translate="no">BOOL</code></td><td>Equality and membership</td></tr>
<tr><td><code translate="no">INVERTED</code></td><td>Integers, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">VARCHAR</code></td><td>Equality, membership, and ranges</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td><code translate="no">BOOL</code></td><td>Equality and membership</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Integers, <code translate="no">VARCHAR</code></td><td>Equality, membership, and ranges</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Integers, <code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>, <code translate="no">TIMESTAMPTZ</code>, <code translate="no">VARCHAR</code></td><td>Equality, membership, and ranges</td></tr>
<tr><td><code translate="no">TRIE</code></td><td><code translate="no">VARCHAR</code></td><td>Equality, membership, and ranges; range evaluation may visit multiple indexed strings</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td><code translate="no">VARCHAR</code></td><td>String patterns only; no direct equality, membership, or range lookup</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">VARCHAR</code></td><td>String patterns only; no direct equality, membership, or range lookup</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td>Spatial predicates, listed below</td></tr>
<tr><td><code translate="no">AUTOINDEX</code></td><td>Supported scalar types</td><td>Depends on the selected index. Internal <code translate="no">HYBRID</code> selections use the capabilities of their bitmap, sorted, or inverted index.</td></tr>
</tbody>
</table>
<p>VARCHAR ranges compare string values rather than interpreting them as numbers. The table describes comparisons against literal values only; it does not imply that arithmetic expressions or comparisons between two fields receive the same index acceleration.</p>
<h3 id="String-patterns" class="common-anchor-header">String patterns<button data-href="#String-patterns" class="anchor-icon" translate="no">
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
    </button></h3><p>This table applies to VARCHAR fields. For JSON string paths, use an index and <code translate="no">VARCHAR</code> cast supported by the JSON indexing table; the corresponding string behavior applies.</p>
<ul>
<li><strong>Yes:</strong> The index returns exact matches.</li>
<li><strong>Check indexed values:</strong> Milvus evaluates the pattern against strings stored in the index, which can require visiting many distinct strings.</li>
<li><strong>Candidates:</strong> The index narrows down possible matches, then Milvus checks the original values.</li>
<li><strong>Scan:</strong> The index does not serve the predicate; Milvus uses another eligible path or scans the field.</li>
</ul>
<table>
<thead>
<tr><th>Index type</th><th>Prefix <code translate="no">like &quot;abc%&quot;</code></th><th>Suffix <code translate="no">like &quot;%abc&quot;</code></th><th>Substring <code translate="no">like &quot;%abc%&quot;</code></th><th>General LIKE <code translate="no">like &quot;a%b_c&quot;</code></th><th>Regex <code translate="no">=~ &quot;a.*b&quot;</code></th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code></td><td>Yes</td><td>Scan</td><td>Scan</td><td>Yes</td><td>Scan</td></tr>
<tr><td><code translate="no">BITMAP</code></td><td>Check indexed values</td><td>Check indexed values</td><td>Check indexed values</td><td>Check indexed values</td><td>Check indexed values</td></tr>
<tr><td><code translate="no">STL_SORT</code></td><td>Yes</td><td>Check indexed values</td><td>Check indexed values</td><td>Check indexed values</td><td>Check indexed values</td></tr>
<tr><td><code translate="no">TRIE</code></td><td>Yes</td><td>Check indexed values</td><td>Check indexed values</td><td>Check indexed values</td><td>Check indexed values</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>Candidates</td><td>Candidates</td><td>Candidates; exact for a literal within the configured gram-length range</td><td>Candidates</td><td>Candidates</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td>Yes</td><td>Yes</td><td>Yes</td><td>Candidates</td><td>Candidates</td></tr>
</tbody>
</table>
<p>These entries describe the operator after query planning. Milvus can simplify a literal LIKE pattern to equality, and a simple anchored regex to equality, prefix, or suffix matching; for example, <code translate="no">name =~ &quot;^abc$&quot;</code> becomes an equality test and follows the equality table.</p>
<p><code translate="no">INVERTED</code> treats simple suffix and substring forms as scans even though more complex LIKE patterns can use the index. <code translate="no">NGRAM</code> requires literal text at least <code translate="no">min_gram</code> characters long; general LIKE requires each non-empty literal fragment to meet that minimum, and regex acceleration depends on extracting suitable literals. Otherwise, Milvus scans the data. <code translate="no">FMINDEX</code> can also choose a scan when a pattern provides little useful filtering or is too expensive to resolve through the index.</p>
<p>These are string-value predicates. Token-based functions such as <code translate="no">TEXT_MATCH</code> and <code translate="no">PHRASE_MATCH</code> use text-match indexing configured through field properties; choosing a scalar <code translate="no">INVERTED</code> index does not enable those functions.</p>
<h3 id="Array-JSON-and-spatial-predicates" class="common-anchor-header">Array, JSON, and spatial predicates<button data-href="#Array-JSON-and-spatial-predicates" class="anchor-icon" translate="no">
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
    </button></h3><table>
<thead>
<tr><th>Index type</th><th>Data type or cast</th><th>Predicates that can use the index</th><th>Notes</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, or an eligible <code translate="no">AUTOINDEX</code> selection</td><td>Ordinary arrays with supported element types</td><td><code translate="no">ARRAY_CONTAINS</code>, <code translate="no">ARRAY_CONTAINS_ANY</code>, <code translate="no">ARRAY_CONTAINS_ALL</code></td><td>Matches elements regardless of their position. Index/type restrictions still apply.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code></td><td>Ordinary arrays of Boolean, integer, or VARCHAR values</td><td>Whole-array <code translate="no">==</code> and <code translate="no">!=</code></td><td>Can use index candidates followed by checks of the original arrays. Floating-point arrays fall back to scanning; bitmap indexes do not serve this candidate path.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, or an eligible <code translate="no">AUTOINDEX</code> selection</td><td>JSON paths cast to <code translate="no">BOOL</code>, <code translate="no">DOUBLE</code>, or <code translate="no">VARCHAR</code></td><td>Comparisons and membership appropriate to the cast type</td><td>The indexed path and cast must match the query. String patterns follow the preceding table.</td></tr>
<tr><td><code translate="no">NGRAM</code></td><td>JSON paths cast to <code translate="no">VARCHAR</code></td><td>LIKE and regex patterns</td><td>Uses the same pattern eligibility rules as VARCHAR NGRAM indexes.</td></tr>
<tr><td><code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code>, or an eligible <code translate="no">AUTOINDEX</code> selection</td><td>JSON paths cast to <code translate="no">ARRAY_BOOL</code>, <code translate="no">ARRAY_DOUBLE</code>, or <code translate="no">ARRAY_VARCHAR</code></td><td><code translate="no">JSON_CONTAINS</code>, <code translate="no">JSON_CONTAINS_ANY</code>, <code translate="no">JSON_CONTAINS_ALL</code></td><td>Requires compatible element types. Mixed-type or nested-array operands can fall back to scanning.</td></tr>
<tr><td>JSON path indexes</td><td>Indexed JSON paths</td><td><code translate="no">exists</code></td><td>Tests whether the path exists, which is different from testing its value or whether the whole field is null.</td></tr>
<tr><td><code translate="no">RTREE</code></td><td><code translate="no">GEOMETRY</code></td><td><code translate="no">ST_EQUALS</code>, <code translate="no">ST_INTERSECTS</code>, <code translate="no">ST_CONTAINS</code>, <code translate="no">ST_WITHIN</code>, <code translate="no">ST_TOUCHES</code>, <code translate="no">ST_OVERLAPS</code>, <code translate="no">ST_CROSSES</code>, <code translate="no">ST_DWITHIN</code></td><td>Uses bounding boxes to find candidates, then checks the exact spatial relation. <code translate="no">ST_ISVALID</code> does not use RTREE.</td></tr>
</tbody>
</table>
<p>Array containment support does not imply index lookup for an element at a specific position, such as <code translate="no">values[0]</code>, or for array length. Whole-array equality must also check order and length, which element membership alone cannot establish.</p>
<p><code translate="no">IS NULL</code> and <code translate="no">IS NOT NULL</code> use validity information and do not require a particular scalar index type. You can combine predicates with <code translate="no">and</code>, <code translate="no">or</code>, and <code translate="no">not</code>; each part can use its own eligible execution path.</p>
<h2 id="Version-compatibility" class="common-anchor-header">Version compatibility<button data-href="#Version-compatibility" class="anchor-icon" translate="no">
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
    </button></h2><p>Most scalar indexes — <code translate="no">BITMAP</code>, <code translate="no">INVERTED</code>, <code translate="no">STL_SORT</code>, <code translate="no">TRIE</code>, and <code translate="no">NGRAM</code> on ordinary scalar fields — have no version requirement. The requirements below apply only to the newer combinations: indexes on array fields, JSON-path indexes, and <code translate="no">FMINDEX</code>.</p>
<p>These requirements use scalar index engine version numbers, an internal capability counter that is distinct from Milvus software release numbers.</p>
<table>
<thead>
<tr><th>Capability</th><th>Requirement</th></tr>
</thead>
<tbody>
<tr><td>Explicit <code translate="no">FMINDEX</code></td><td>Scalar index engine version 5 or newer</td></tr>
<tr><td>Explicit <code translate="no">STL_SORT</code> on ordinary arrays</td><td>Scalar index engine version 3 or newer, with array sort support enabled</td></tr>
<tr><td><code translate="no">HYBRID</code> selecting <code translate="no">STL_SORT</code> for ordinary arrays</td><td>Scalar index engine version 5 or newer, with array sort support enabled</td></tr>
<tr><td><code translate="no">BITMAP</code>, <code translate="no">STL_SORT</code>, or <code translate="no">HYBRID</code> on JSON scalar paths</td><td>Scalar index engine version 4 or newer</td></tr>
<tr><td><code translate="no">STL_SORT</code> or <code translate="no">HYBRID</code> on typed JSON array paths</td><td>Scalar index engine version 3 or newer, with array sort support enabled</td></tr>
</tbody>
</table>
<p>If an array or JSON compatibility requirement is not met, affected automatic requests can fall back to <code translate="no">INVERTED</code>, and explicit requests for unsupported combinations fail. For ordinary-array <code translate="no">HYBRID</code>, the high-cardinality branch continues to use <code translate="no">INVERTED</code> until sorted indexing is available.</p>
<h2 id="Performance-considerations" class="common-anchor-header">Performance considerations<button data-href="#Performance-considerations" class="anchor-icon" translate="no">
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
    </button></h2><p>Index performance depends on the data distribution and the filters your application uses. Cardinality, string length, array length, and the number of matching entities can all affect memory usage and query latency. Compare indexes using representative data and filter expressions, and measure memory use, build time, and query latency together.</p>
<h3 id="Estimating-memory-requirements" class="common-anchor-header">Estimating memory requirements<button data-href="#Estimating-memory-requirements" class="anchor-icon" translate="no">
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
    </button></h3><p>The following formulas give a rough idea of the memory needed by a scalar index after loading, with memory mapping disabled. The <code translate="no">STL_SORT</code> formulas assume ordinary scalar fields with no null values.</p>
<ul>
<li><code translate="no">N</code>: number of entities.</li>
<li><code translate="no">D</code>: number of distinct values.</li>
<li><code translate="no">l</code>: average length of distinct strings, in <strong>bytes</strong>.</li>
<li><code translate="no">S</code>: size of the built index before storage compression, in <strong>bytes</strong>.</li>
</ul>
<table>
<thead>
<tr><th>Index type</th><th>Rough memory estimate in bytes</th><th>Intuition</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">STL_SORT</code> on <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, or <code translate="no">FLOAT</code></td><td><code translate="no">12 * N</code></td><td>About 12 bytes per entity.</td></tr>
<tr><td><code translate="no">STL_SORT</code> on <code translate="no">INT64</code>, <code translate="no">DOUBLE</code>, or <code translate="no">TIMESTAMPTZ</code></td><td><code translate="no">20 * N</code></td><td>About 20 bytes per entity for larger values.</td></tr>
<tr><td><code translate="no">STL_SORT</code> on <code translate="no">VARCHAR</code></td><td><code translate="no">8 * N + (l + 16) * D</code></td><td>Repeated strings share storage, so fewer distinct strings usually means less memory.</td></tr>
<tr><td><code translate="no">BITMAP</code>, using dense bitmaps</td><td><code translate="no">(D + 1) * N / 8</code></td><td>Each distinct value needs roughly one bit per entity, plus one bitmap to track valid entities.</td></tr>
<tr><td><code translate="no">INVERTED</code> or <code translate="no">NGRAM</code></td><td><code translate="no">S</code></td><td>Start with approximately the size of the built index.</td></tr>
<tr><td><code translate="no">FMINDEX</code></td><td><code translate="no">2 * S</code></td><td>Allow approximately twice the built index size.</td></tr>
</tbody>
</table>
<p>Divide the result by <code translate="no">1024 * 1024</code> to convert bytes to <strong>MiB</strong>. For example, an <code translate="no">STL_SORT</code> index on one million non-null <code translate="no">INT64</code> values needs roughly <strong>19 MiB</strong> for its main data structures. For VARCHAR fields where every string is unique, the estimate simplifies to <code translate="no">(l + 24) * N</code>; one million unique strings averaging 32 bytes gives roughly <strong>53 MiB</strong>.</p>
<p>The BITMAP formula describes dense bitmap storage; enabling the optional offset cache adds approximately <code translate="no">8 * N</code> bytes on a 64-bit system. For <code translate="no">INVERTED</code>, <code translate="no">NGRAM</code>, and <code translate="no">FMINDEX</code>, build an index on representative data to obtain <code translate="no">S</code> — raw data size is not a substitute for built index size. For <code translate="no">AUTOINDEX</code>, use the formula for the index actually selected, and apply estimates per segment, then add them across loaded segments and replicas.</p>
<p>These are approximate planning figures, not memory limits. They omit temporary memory used during building, loading, and queries, and they are more sensitive to distinct values and data distribution for string and bitmap indexes than for numeric <code translate="no">STL_SORT</code>. No fixed percentage of accuracy is guaranteed. Memory mapping, older index formats, arrays, and JSON fields require separate measurement. Before sizing a deployment, check actual memory use with representative data and queries, and leave headroom for peak usage.</p>
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
<li>For index creation and configuration examples, refer to <a href="/docs/bitmap.md">BITMAP</a>, <a href="/docs/inverted.md">INVERTED</a>, <a href="/docs/ngram.md">NGRAM</a>, <a href="/docs/stl-sort.md">STL_SORT</a>, <a href="/docs/trie.md">TRIE</a>, <a href="/docs/fmindex.md">FMINDEX</a>, and <a href="/docs/rtree.md">RTREE</a>.</li>
<li>For field definitions and collection schemas, refer to <a href="/docs/schema.md">Schema Explained</a>.</li>
</ul>
