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
    </button></h2><p>The main StructArray limits are:</p>
<table>
<thead>
<tr><th>Area</th><th>Limit</th></tr>
</thead>
<tbody>
<tr><td>Schema shape</td><td>A Struct can be used only as the element type of an Array field. Struct is not supported as a top-level collection field.</td></tr>
<tr><td>Subfield schema</td><td>All Struct elements in the same StructArray field share one predefined Struct schema.</td></tr>
<tr><td>Nested subfields</td><td>Starting in Milvus 3.0.6, a Struct can contain scalar <code translate="no">ARRAY</code> subfields with one nesting level. Nested <code translate="no">Struct</code>, <code translate="no">ArrayOfStruct</code>, and JSON subfields are not supported in any version.</td></tr>
<tr><td>Capacity</td><td><code translate="no">max_capacity</code> is required and limits how many Struct elements one entity can store in the StructArray field.</td></tr>
<tr><td>Subfield changes</td><td>Starting in Milvus 3.0.6, you can add an element-nullable subfield to an existing StructArray field or drop a subfield from it. Earlier versions require dropping and re-adding the whole StructArray field.</td></tr>
<tr><td>Subfield path</td><td>Use <code translate="no">structArray[subfield]</code> paths, such as <code translate="no">chunks[emb]</code>, for indexes, search targets, output fields, and filters. Do not use <code translate="no">chunks.emb</code>.</td></tr>
<tr><td>Insert shape</td><td>Insert a StructArray field as an array of objects. Do not use path syntax inside insert payloads.</td></tr>
<tr><td>Vector indexes</td><td>A vector field or vector subfield accepts only one index. Use separate vector subfields for EmbeddingList search and element-level search.</td></tr>
<tr><td>Functions</td><td>Field functions are not supported for fields or subfields inside a StructArray field.</td></tr>
<tr><td>Nullable fields</td><td>Nullable StructArray fields are version-gated. Row-level null applies to the whole StructArray field. Starting in Milvus 3.0.6, a subfield can additionally allow a null value in an individual Struct element: <code translate="no">nullable=True</code> on a scalar or vector subfield, <code translate="no">element_nullable=True</code> on an array subfield. A Struct element itself cannot be null.</td></tr>
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
    </button></h2><p>StructArray schemas have the following limits:</p>
<table>
<thead>
<tr><th>Limit</th><th>Details</th></tr>
</thead>
<tbody>
<tr><td>Struct is not a top-level field type.</td><td>Create a StructArray field as <code translate="no">datatype=DataType.ARRAY</code> with <code translate="no">element_type=DataType.STRUCT</code> and a <code translate="no">struct_schema</code>.</td></tr>
<tr><td>All elements share one schema.</td><td>Every Struct element in a StructArray field follows the same subfield list and subfield data types.</td></tr>
<tr><td><code translate="no">max_capacity</code> is required.</td><td>The number of Struct elements in one entity must not exceed the <code translate="no">max_capacity</code> configured for the StructArray field.</td></tr>
<tr><td>All subfields share one <code translate="no">max_capacity</code>.</td><td>Every subfield must declare <code translate="no">max_capacity</code>, and all subfields of a StructArray field must declare the same value. The value must be greater than 0 and must not exceed <code translate="no">proxy.maxArrayCapacity</code>, which defaults to 4096.</td></tr>
<tr><td>Subfields can evolve in Milvus 3.0.6 and later.</td><td>Add an element-nullable subfield, or drop a subfield by its path, such as <code translate="no">chunks[lang]</code>. You cannot drop the last subfield of a StructArray field, the last vector field of the collection, or a subfield used by a Function. In earlier versions, drop the StructArray field and add it again with the updated schema.</td></tr>
<tr><td>Nested Struct is not supported.</td><td>A Struct cannot contain nested <code translate="no">Struct</code>, <code translate="no">ArrayOfStruct</code>, or JSON subfields. Starting in Milvus 3.0.6, a Struct can contain scalar <code translate="no">ARRAY</code> subfields with one nesting level. An <code translate="no">ARRAY</code> subfield cannot hold vectors.</td></tr>
<tr><td>Functions are not supported inside StructArray.</td><td>Do not define field functions for StructArray fields or their subfields.</td></tr>
<tr><td>Field properties are limited on StructArray fields.</td><td>Starting in Milvus 3.0.6, <code translate="no">alter_collection_field()</code> on a StructArray field or on a subfield path accepts only <code translate="no">mmap.enabled</code>, <code translate="no">field.description</code>, and <code translate="no">warmup</code>. Other properties, such as <code translate="no">max_capacity</code> and <code translate="no">max_length</code>, are rejected.</td></tr>
<tr><td>Text analysis is not supported on subfields.</td><td><code translate="no">enable_match</code> and <code translate="no">enable_analyzer</code> settings on Struct subfields have no effect because text indexes are built only for top-level fields.</td></tr>
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
    </button></h2><p>StructArray subfields map to physical array-style storage. The following table lists supported and unsupported physical types:</p>
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
<tr><td><code translate="no">Array</code> of <code translate="no">Array</code></td><td>Supported in Milvus 3.0.6 and later</td><td>Define the subfield as <code translate="no">DataType.ARRAY</code> with a scalar <code translate="no">element_type</code> and a <code translate="no">max_capacity</code> for the inner array. Each Struct element then holds one inner array. Set <code translate="no">nullable=True</code> on the subfield to allow a null inner array and <code translate="no">element_nullable=True</code> to allow null values inside it.</td></tr>
<tr><td><code translate="no">Array</code> of <code translate="no">Array</code> of <code translate="no">Array</code>, <code translate="no">Array</code> of vectors, <code translate="no">Struct</code>, or <code translate="no">ArrayOfStruct</code></td><td>Not supported</td><td>Array nesting inside a Struct is limited to one level, the inner array cannot hold vectors, and nested Struct or Array-of-Struct subfields are not supported.</td></tr>
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
    </button></h2><p>The following table describes nullable StructArray behavior and dynamic StructArray field addition, subject to the availability statement below:</p>
<table>
<thead>
<tr><th>Capability</th><th>Limit</th></tr>
</thead>
<tbody>
<tr><td>Nullable StructArray field</td><td>Subject to the availability statement below, set <code translate="no">nullable=True</code> on the StructArray parent; do not configure Struct subfields as nullable independently.</td></tr>
<tr><td>NULL value in Python</td><td>Use <code translate="no">None</code> to insert a null StructArray value in Python. Do not use <code translate="no">Null</code> or <code translate="no">null</code>.</td></tr>
<tr><td>Null scope</td><td>NULL applies to the whole StructArray field. For example, <code translate="no">chunks=None</code> is valid only when <code translate="no">chunks</code> is nullable.</td></tr>
<tr><td>Partially null StructArray value</td><td>When a StructArray field contains a valid array value, do not mix null subfield arrays with valid subfield arrays in the same value.</td></tr>
<tr><td>Element-level null</td><td>Supported in Milvus 3.0.6 and later. A scalar, vector, or <code translate="no">ARRAY</code> subfield can allow a null value in individual Struct elements: <code translate="no">nullable=True</code> on a scalar or vector subfield, <code translate="no">element_nullable=True</code> on an <code translate="no">ARRAY</code> subfield. The row-level <code translate="no">nullable</code> setting still comes from the StructArray parent; setting <code translate="no">nullable=True</code> on a subfield enables element-level null, not row-level null.</td></tr>
<tr><td>Null Struct element</td><td>A Struct element itself cannot be null, such as <code translate="no">[null, {...}]</code>. Set the subfield values of the element to null instead.</td></tr>
<tr><td>Omitted subfields</td><td>Starting in Milvus 3.0.6, you can omit an element-nullable subfield from a Struct element, and Milvus stores null for it. A subfield that is not element-nullable must be present in every Struct element. In earlier versions, every Struct element must provide every subfield.</td></tr>
<tr><td>Dynamic add StructArray field</td><td>Subject to the availability statement below.</td></tr>
<tr><td>Nullable requirement for dynamic add</td><td>A StructArray field added to an existing collection must be nullable because existing entities have no value for the new field.</td></tr>
<tr><td>Existing entities after dynamic add</td><td>Existing entities return <code translate="no">null</code> for the added StructArray field.</td></tr>
<tr><td>Dynamic add subfield</td><td>Supported in Milvus 3.0.6 and later. An added subfield must be created with <code translate="no">nullable=True</code>; an added <code translate="no">ARRAY</code> subfield additionally takes <code translate="no">element_nullable=True</code> for null values inside the inner array. Existing entities return null for the new subfield in each of their Struct elements, and entities whose StructArray field is null stay null.</td></tr>
</tbody>
</table>
<p>Milvus 3.0.0 and later releases support nullable StructArray fields, nullable vector arrays, and dynamic StructArray field addition in both Standalone and Distributed deployments. Earlier Milvus versions do not support these capabilities.</p>
<p>Milvus 3.0.6 and later releases additionally support element-level null values, scalar <code translate="no">ARRAY</code> subfields, and adding or dropping subfields of an existing StructArray field. These capabilities require Storage V2 and are not available in external collections.</p>
<p>In Zilliz Cloud, these capabilities are available on On-Demand Clusters running Milvus 3.0.0 or later. Serving Clusters do not support them.</p>
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
    </button></h2><p>StructArray insert payloads have the following limits:</p>
<table>
<thead>
<tr><th>Limit</th><th>Details</th></tr>
</thead>
<tbody>
<tr><td>Payload shape</td><td>Insert the StructArray field as an array of Struct objects, such as <code translate="no">chunks: [{&quot;text&quot;: &quot;...&quot;, &quot;emb&quot;: [...]}]</code>.</td></tr>
<tr><td>Subfield names</td><td>Inside each Struct object, use subfield names such as <code translate="no">text</code> and <code translate="no">emb</code>, not paths such as <code translate="no">chunks[text]</code>.</td></tr>
<tr><td>Schema alignment</td><td>Each Struct element must match the Struct schema. Starting in Milvus 3.0.6, an element-nullable subfield can be omitted or set to <code translate="no">null</code> in a Struct element.</td></tr>
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
    </button></h2><p>A StructArray vector subfield can be indexed for either EmbeddingList search or element-level search. The same vector subfield cannot use both metric families because each vector field or vector subfield accepts only one index. The search modes use the following metric families:</p>
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
<p>StructArray vector subfields count as vector fields toward the collection-level limit <code translate="no">proxy.maxVectorFieldNum</code>, which defaults to 10. A StructArray field whose vector subfields are the collection’s only vector fields is valid, and dropping such a field is rejected when it would leave the collection without a vector field. Keep the total number of vector fields and vector subfields within the limits of your target version and service tier.</p>
<p>Starting in Milvus 3.0.6, an element-nullable vector subfield supports only element-level search with regular vector metrics. <code translate="no">MAX_SIM*</code> metrics, EmbeddingList indexes, and EmbeddingList search are rejected on element-nullable vector subfields, and <code translate="no">AUTOINDEX</code> does not select a <code translate="no">MAX_SIM*</code> metric for them. Null vectors do not participate in search. Scalar indexes are not supported on element-nullable subfields or on scalar <code translate="no">ARRAY</code> subfields.</p>
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
    </button></h2><p>StructArray search behavior has the following limits:</p>
<table>
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
<li><p>Row-level filter expressions can also reference StructArray paths directly: <code translate="no">chunks[0][section]</code> for one element position, <code translate="no">array_length(chunks)</code> for the element count, <code translate="no">array_contains(chunks[section], ...)</code> for subfield values across elements, and <code translate="no">chunks is null</code> on a nullable StructArray field.</p></li>
<li><p>Use scalar subfields for scalar predicates.</p></li>
<li><p>Do not use vector subfields as <code translate="no">$[...]</code> scalar predicate inputs.</p></li>
<li><p>JSON path syntax, JSON functions, text match functions, Geometry / GIS functions, and Timestamptz expressions are not supported for StructArray element-level predicates. Starting in Milvus 3.0.6, <code translate="no">array_contains</code>, <code translate="no">array_contains_any</code>, <code translate="no">array_contains_all</code>, and <code translate="no">array_length</code> are supported on <code translate="no">$[subfield]</code> for scalar <code translate="no">ARRAY</code> subfields, and <code translate="no">$[subfield] is null</code> / <code translate="no">is not null</code> is supported for every subfield type.</p></li>
<li><p>Starting in Milvus 3.0.6, a null subfield value in a Struct element makes the element predicate unknown rather than false. <code translate="no">element_filter</code> keeps only elements whose predicate is true, and <code translate="no">MATCH_*</code> counts an unknown element as a miss. For details, see <a href="/docs/struct-array-operators.md">StructArray Operators</a>.</p></li>
<li><p>Prefer explicit boolean comparisons such as <code translate="no">$[has_code] == true</code> instead of bare boolean expressions.</p></li>
</ul>
<p><a id="Import-limits"></a></p>
<h2 id="Import-and-storage-limits" class="common-anchor-header">Import and storage limits<button data-href="#Import-and-storage-limits" class="anchor-icon" translate="no">
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
<tr><td>Source file formats</td><td>JSON, JSONL, CSV, and Parquet files can carry StructArray fields. NumPy files hold one file per top-level field and cannot provide StructArray data; use JSON, CSV, or Parquet files for collections that have a StructArray field. For file shapes, see <a href="/docs/prepare-source-data.md#StructArray-fields-in-source-files">Prepare Source Data</a>.</td></tr>
<tr><td>Storage format</td><td>Element-nullable subfields and scalar <code translate="no">ARRAY</code> subfields require Storage V2. Storage V1 cannot be reached for collections that use these subfields: creating the collection and inserting data can appear to succeed, but the data fails at flush, which is not a supported state. Storage V3 with <code translate="no">common.storage.enableGrowingSourceFlush</code> set to <code translate="no">true</code> rejects requests that use element-nullable subfields or scalar <code translate="no">ARRAY</code> subfields.</td></tr>
<tr><td>External collections</td><td>Element-nullable subfields and scalar <code translate="no">ARRAY</code> subfields are not supported in external collections.</td></tr>
<tr><td>Backup and snapshot import</td><td>Binlog import, such as a backup restore, and snapshot-source import are rejected for collections that have element-nullable subfields or scalar <code translate="no">ARRAY</code> subfields.</td></tr>
<tr><td>Downgrade</td><td>Collections that have element-nullable subfields or scalar <code translate="no">ARRAY</code> subfields cannot run on a release earlier than Milvus 3.0.6. Replaying the write-ahead log on the older release panics. Re-upgrading to Milvus 3.0.6 or later recovers the data.</td></tr>
</tbody>
</table>
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
