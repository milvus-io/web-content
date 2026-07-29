---
id: structarray-limits.md
title: StructArray Limits
summary: >-
  StructArray support spans schema definition, insert payloads, indexing, search
  modes, and StructArray-specific filters. Use this page as the limits reference
  before you rely on StructArray behavior in production.
---
<h1 id="StructArray-Limits" class="common-anchor-header">StructArray Limits<button data-href="#StructArray-Limits" class="anchor-icon" translate="no">
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
    </button></h1><p>StructArray support spans schema definition, insert payloads, indexing, search modes, and StructArray-specific filters. Use this page as the limits reference before you rely on StructArray behavior in production.</p>
<p>Most StructArray limits come from one of three places: the StructArray schema model, the search mode you choose for vector subfields, and the Milvus version that your collection runs on.</p>
<h2 id="Limits-at-a-glance" class="common-anchor-header">Limits at a glance<button data-href="#Limits-at-a-glance" class="anchor-icon" translate="no">
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
<tr><th>Area</th><th>Limit</th></tr>
</thead>
<tbody>
<tr><td>Schema shape</td><td>A Struct can be used only as the element type of an Array field. Struct is not supported as a top-level collection field.</td></tr>
<tr><td>Subfield schema</td><td>All Struct elements in the same StructArray field share one predefined Struct schema.</td></tr>
<tr><td>Capacity</td><td><code translate="no">max_capacity</code> is required and limits how many Struct elements one entity can store in the StructArray field.</td></tr>
<tr><td>Subfield changes</td><td>After a StructArray field is created, you cannot add subfields to that existing StructArray field.</td></tr>
<tr><td>Subfield path</td><td>Use <code translate="no">structArray[subfield]</code> paths, such as <code translate="no">chunks[emb]</code>, for indexes, search targets, output fields, and filters. Do not use <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>Insert shape</td><td>Insert a StructArray field as an array of objects. Do not use path syntax inside insert payloads.</td></tr>
<tr><td>Vector indexes</td><td>A vector field or vector subfield accepts only one index. Use separate vector subfields for EmbeddingList search and element-level search.</td></tr>
<tr><td>Functions</td><td>Field functions are not supported for fields or subfields inside a StructArray field.</td></tr>
<tr><td>Nullable fields</td><td>Nullable StructArray fields are version-gated. When supported, null applies to the whole StructArray field, not to an individual Struct element independently.</td></tr>
<tr><td>Dynamic add field</td><td>Adding a StructArray field to an existing collection is version-gated and requires the added field to be nullable.</td></tr>
</tbody>
</table>
<h2 id="Schema-limits" class="common-anchor-header">Schema limits<button data-href="#Schema-limits" class="anchor-icon" translate="no">
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
<tr><th>Limit</th><th>Details</th></tr>
</thead>
<tbody>
<tr><td>Struct is not a top-level field type.</td><td>Create a StructArray field as <code translate="no">datatype=DataType.ARRAY</code> with <code translate="no">element_type=DataType.STRUCT</code> and a <code translate="no">struct_schema</code>.</td></tr>
<tr><td>All elements share one schema.</td><td>Every Struct element in a StructArray field follows the same subfield list and subfield data types.</td></tr>
<tr><td><code translate="no">max_capacity</code> is required.</td><td>The number of Struct elements in one entity must not exceed the <code translate="no">max_capacity</code> configured for the StructArray field.</td></tr>
<tr><td>Existing subfields are fixed.</td><td>You cannot append new subfields to an existing StructArray field. To change the subfield schema, drop the StructArray field and add it again with the updated schema.</td></tr>
<tr><td>Nested StructArray is not supported.</td><td>A StructArray field cannot contain nested <code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code>, or <code translate="no">ArrayOfStruct</code> subfields.</td></tr>
<tr><td>Functions are not supported inside StructArray.</td><td>Do not define field functions for StructArray fields or their subfields.</td></tr>
</tbody>
</table>
<p>For schema creation examples, see <a href="/docs/create-structarray-field.md">Create a StructArray Field</a>.</p>
<h2 id="Supported-subfield-data-types" class="common-anchor-header">Supported subfield data types<button data-href="#Supported-subfield-data-types" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray subfields map to physical array-style storage. The following table lists supported and unsupported physical types.</p>
<table>
<thead>
<tr><th>Struct subfield physical type</th><th>Support</th><th>Notes</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">Array</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.BOOL</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.INT8</code>, <code translate="no">DataType.INT16</code>, <code translate="no">DataType.INT32</code>, or <code translate="no">DataType.INT64</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.FLOAT</code> or <code translate="no">DataType.DOUBLE</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.VARCHAR</code> and set <code translate="no">max_length</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.FLOAT_VECTOR</code> and set <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.FLOAT16_VECTOR</code> and set <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.BFLOAT16_VECTOR</code> and set <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.INT8_VECTOR</code> and set <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Supported</td><td>Define the subfield as <code translate="no">DataType.BINARY_VECTOR</code> and set <code translate="no">dim</code>.</td></tr>
<tr><td><code translate="no">ArrayOfVector</code></td><td>Not supported</td><td>Sparse vector subfields are not supported in StructArray fields.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Not supported</td><td>Use <code translate="no">VARCHAR</code>, not <code translate="no">String</code>.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Not supported</td><td>JSON subfields are not supported in StructArray fields.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Not supported</td><td>Geometry subfields and GIS functions are not supported in StructArray fields.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Not supported</td><td>Text subfields are not supported in StructArray fields.</td></tr>
<tr><td><code translate="no">Array</code></td><td>Not supported</td><td>Timestamptz subfields and time-specific expressions are not supported in StructArray fields.</td></tr>
<tr><td>Nested <code translate="no">Array</code>, <code translate="no">ArrayOfVector</code>, <code translate="no">Struct</code>, or <code translate="no">ArrayOfStruct</code></td><td>Not supported</td><td>StructArray fields do not support nested array, vector-array, Struct, or Array-of-Struct subfields.</td></tr>
</tbody>
</table>
<h2 id="Nullable-and-dynamic-schema-limits" class="common-anchor-header">Nullable and dynamic schema limits<button data-href="#Nullable-and-dynamic-schema-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>Nullable StructArray behavior and dynamic StructArray field addition are version-gated.</p>
<table>
<thead>
<tr><th>Capability</th><th>Limit</th></tr>
</thead>
<tbody>
<tr><td>Nullable StructArray field</td><td>Supported only in versions that include nullable StructArray and nullable vector-array support.</td></tr>
<tr><td>Null value in Python</td><td>Use <code translate="no">None</code> to insert a null StructArray value in Python. Do not use <code translate="no">Null</code> or <code translate="no">null</code>.</td></tr>
<tr><td>Null scope</td><td>Null applies to the whole StructArray field. For example, <code translate="no">chunks=None</code> is valid only when <code translate="no">chunks</code> is nullable.</td></tr>
<tr><td>Partially null StructArray value</td><td>When a StructArray field contains a valid array value, do not mix null subfield arrays with valid subfield arrays in the same value.</td></tr>
<tr><td>Dynamic add StructArray field</td><td>Adding a StructArray field to an existing collection is supported only in versions that include dynamic StructArray field support.</td></tr>
<tr><td>Nullable requirement for dynamic add</td><td>A StructArray field added to an existing collection must be nullable because existing entities have no value for the new field.</td></tr>
<tr><td>Existing entities after dynamic add</td><td>Existing entities return <code translate="no">null</code> for the added StructArray field across its subfields.</td></tr>
</tbody>
</table>
<p>In Milvus v3.0.x, nullable StructArray fields, nullable vector arrays, and dynamic StructArray field addition are available.</p>
<p>For insert examples with nullable StructArray fields, see <a href="/docs/insert-data-into-structarray-fields.md">Insert Data into StructArray Fields</a>.</p>
<h2 id="Insert-limits" class="common-anchor-header">Insert limits<button data-href="#Insert-limits" class="anchor-icon" translate="no">
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
<tr><th>Limit</th><th>Details</th></tr>
</thead>
<tbody>
<tr><td>Payload shape</td><td>Insert the StructArray field as an array of Struct objects, such as <code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code>.</td></tr>
<tr><td>Subfield names</td><td>Inside each Struct object, use subfield names such as <code translate="no">text</code> and <code translate="no">emb</code>, not paths such as <code translate="no">chunks[text]</code>.</td></tr>
<tr><td>Schema alignment</td><td>Each Struct element must match the Struct schema.</td></tr>
<tr><td>Capacity</td><td>The number of Struct elements in one entity must not exceed <code translate="no">max_capacity</code>.</td></tr>
<tr><td>Vector dimensions</td><td>Vector values must match the <code translate="no">dim</code> configured for their vector subfields.</td></tr>
<tr><td>Search-mode duplication</td><td>If you need both EmbeddingList search and element-level search, write vectors to two separate vector subfields.</td></tr>
</tbody>
</table>
<h2 id="Index-and-metric-limits" class="common-anchor-header">Index and metric limits<button data-href="#Index-and-metric-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>A StructArray vector subfield can be indexed for either EmbeddingList search or element-level search. The same vector subfield cannot use both metric families because each vector field or vector subfield accepts only one index.</p>
<table>
<thead>
<tr><th>Search mode</th><th>Metric family</th><th>Result level</th></tr>
</thead>
<tbody>
<tr><td>EmbeddingList search</td><td><code translate="no">MAX_SIM</code>, <code translate="no">MAX_SIM_COSINE</code>, <code translate="no">MAX_SIM_IP</code>, <code translate="no">MAX_SIM_L2</code>, or binary <code translate="no">MAX_SIM_*</code> metrics</td><td>Entity-level results.</td></tr>
<tr><td>Element-level search</td><td>Regular vector metrics such as <code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">COSINE</code>, <code translate="no">HAMMING</code>, or <code translate="no">JACCARD</code></td><td>Element-level results that can include the matched element offset.</td></tr>
</tbody>
</table>
<p>Use separate vector subfields when both modes are required. For example, use <code translate="no">chunks[emb_list_vector]</code> for EmbeddingList search and <code translate="no">chunks[emb]</code> for element-level search.</p>
<p>StructArray vector subfields count as vector subfields when you plan your collection schema. Keep the total number of vector fields and vector subfields within the limits of your target version and service tier.</p>
<p>For the supported index-type and metric-type matrix, see <a href="/docs/index-structarray-fields.md">Index StructArray Fields</a>.</p>
<h2 id="Search-limits" class="common-anchor-header">Search limits<button data-href="#Search-limits" class="anchor-icon" translate="no">
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
<tr><th>Search behavior</th><th>Support and limits</th></tr>
</thead>
<tbody>
<tr><td>Basic EmbeddingList search</td><td>Supported on StructArray vector subfields indexed with <code translate="no">MAX_SIM*</code> metrics. Returns entity-level results.</td></tr>
<tr><td>Basic element-level search</td><td>Supported on StructArray vector subfields indexed with regular vector metrics. Can return matched element offsets.</td></tr>
<tr><td>Range search</td><td>Supported according to the search mode and index/metric support of the target version. For hybrid search range behavior on element-level StructArray requests, check your target version.</td></tr>
<tr><td>Grouping search</td><td>Element-level grouping search can return offsets. Hybrid search group-by behavior for element-level StructArray requests is version-gated.</td></tr>
<tr><td>Hybrid search</td><td>A hybrid search request can include StructArray vector subfield requests only where the target version supports that search combination. Each request still follows the metric family of the indexed vector subfield.</td></tr>
<tr><td>Offset output</td><td>Offset is available for element-level search results. EmbeddingList search returns entity-level results and does not use element offsets as the primary result unit.</td></tr>
</tbody>
</table>
<h2 id="Filter-and-operator-limits" class="common-anchor-header">Filter and operator limits<button data-href="#Filter-and-operator-limits" class="anchor-icon" translate="no">
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
    </button></h2><p>StructArray scalar filtering is handled by StructArray operators, such as <code translate="no">element_filter</code> and the <code translate="no">MATCH_*</code> family. The detailed predicate support matrix belongs in <a href="/docs/struct-array-operators.md">StructArray Operators</a>.</p>
<p>At a high level:</p>
<ul>
<li><p>Use <code translate="no">$[subfield]</code> only inside StructArray operators.</p></li>
<li><p>Use scalar subfields for scalar predicates.</p></li>
<li><p>Do not use vector subfields as <code translate="no">$[...]</code> scalar predicate inputs.</p></li>
<li><p>JSON path syntax, JSON functions, array container functions, text match functions, Geometry / GIS functions, and Timestamptz expressions are not supported for StructArray element-level predicates.</p></li>
<li><p>Prefer explicit boolean comparisons such as <code translate="no">$[has_code] == true</code> instead of bare boolean expressions.</p></li>
</ul>
<h2 id="Related-pages" class="common-anchor-header">Related pages<button data-href="#Related-pages" class="anchor-icon" translate="no">
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
<li><p>To create a StructArray field, read <a href="/docs/create-structarray-field.md">Create a StructArray Field</a>.</p></li>
<li><p>To insert data, read <a href="/docs/insert-data-into-structarray-fields.md">Insert Data into StructArray Fields</a>.</p></li>
<li><p>To create vector and scalar indexes, read <a href="/docs/index-structarray-fields.md">Index StructArray Fields</a>.</p></li>
<li><p>To review StructArray filter syntax, read <a href="/docs/struct-array-operators.md">StructArray Operators</a>.</p></li>
</ol>
