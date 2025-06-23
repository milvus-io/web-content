---
id: bitmap.md
title: BITMAP​
related_key: bitmap
summary: >-
  Bitmap indexing is an efficient indexing technique designed to improve query
  performance on low-cardinality scalar fields.
---
<h1 id="BITMAP​" class="common-anchor-header">BITMAP​<button data-href="#BITMAP​" class="anchor-icon" translate="no">
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
    </button></h1><p>Bitmap indexing is an efficient indexing technique designed to improve query performance on low-cardinality scalar fields. Cardinality refers to the number of distinct values in a field. Fields with fewer distinct elements are considered low-cardinality.​</p>
<p>This index type helps reduce the retrieval time of scalar queries by representing field values in a compact binary format and performing efficient bitwise operations on them. Compared to other types of indexes, bitmap indexes typically have higher space efficiency and faster query speeds when dealing with low-cardinality fields.​</p>
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
    </button></h2><p>The term Bitmap combines two words: <strong>Bit</strong> and <strong>Map</strong>. A bit represents the smallest unit of data in a computer, which can only hold a value of either <strong>0</strong> or <strong>1</strong>. A map, in this context, refers to the process of transforming and organizing data according to what value should be assigned to 0 and 1.​</p>
<p>A bitmap index consists of two main components: bitmaps and keys. Keys represent the unique values in the indexed field. For each unique value, there is a corresponding bitmap. The length of these bitmaps is equal to the number of records in the collection. Each bit in the bitmap corresponds to a record in the collection. If the value of the indexed field in a record matches the key, the corresponding bit is set to <strong>1</strong>; otherwise, it is set to <strong>0</strong>.​</p>
<p>Consider a collection of documents with fields <strong>Category</strong> and <strong>Public</strong>. We want to retrieve documents that fall into the <strong>Tech</strong> category and are open to the <strong>Public</strong>. In this case, the keys for our bitmap indexes are <strong>Tech</strong> and <strong>Public</strong>.​</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.5.x/assets/bitmap.png" alt="Bitmap indexing" class="doc-image" id="bitmap-indexing" />
    <span>Bitmap indexing</span>
  </span>
</p>
<p>As shown in the figure, the bitmap indexes for <strong>Category</strong> and <strong>Public</strong> are:​</p>
<ul>
<li><p><strong>Tech</strong>: [1, 0, 1, 0, 0], which shows that only the 1st and 3rd documents fall into the <strong>Tech</strong> category.​</p></li>
<li><p><strong>Public</strong>: [1, 0, 0, 1, 0], which shows that only the 1st and 4th documents are open to the <strong>Public</strong>.​</p></li>
</ul>
<p>To find the documents that match both criteria, we perform a bitwise AND operation on these two bitmaps:​</p>
<ul>
<li><strong>Tech</strong> AND <strong>Public</strong>: [1, 0, 0, 0, 0]​</li>
</ul>
<p>The resulting bitmap [1, 0, 0, 0, 0] indicates that only the first document (<strong>ID</strong> <strong>1</strong>) satisfies both criteria. By using bitmap indexes and efficient bitwise operations, we can quickly narrow down the search scope, eliminating the need to scan the entire dataset.​</p>
<h2 id="Create-a-bitmap-index" class="common-anchor-header">Create a bitmap index<button data-href="#Create-a-bitmap-index" class="anchor-icon" translate="no">
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
    </button></h2><p>To create a bitmap index in Milvus, use the <code translate="no">create_index()</code> method and set the <code translate="no">index_type</code> parameter to <code translate="no">&quot;BITMAP&quot;</code>.​</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
index_params = client.create_index_params() <span class="hljs-comment"># Prepare an empty IndexParams object, without having to specify any index parameters​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;category&quot;</span>, <span class="hljs-comment"># Name of the scalar field to be indexed​</span>
    index_type=<span class="hljs-string">&quot;BITMAP&quot;</span>, <span class="hljs-comment"># Type of index to be created​</span>
    index_name=<span class="hljs-string">&quot;category_bitmap_index&quot;</span> <span class="hljs-comment"># Name of the index to be created​</span>
)​
​
client.create_index(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment"># Specify the collection name​</span>
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<p>In this example, we create a bitmap index on the <code translate="no">category</code> field of the <code translate="no">my_collection</code> collection. The <code translate="no">add_index()</code> method is used to specify the field name, index type, and index name.​</p>
<p>Once the bitmap index is created, you can use the <code translate="no">filter</code> parameter in query operations to perform scalar filtering based on the indexed field. This allows you to efficiently narrow down the search results using the bitmap index. For more information, refer to <a href="/docs/boolean.md">Metadata Filtering</a>.​</p>
<h2 id="Limits" class="common-anchor-header">Limits<button data-href="#Limits" class="anchor-icon" translate="no">
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
<li><p>Bitmap indexes are supported only for scalar fields that are not primary keys.​</p></li>
<li><p>The data type of the field must be one of the following:​</p>
<ul>
<li><p><code translate="no">BOOL</code>, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">VARCHAR</code>​</p></li>
<li><p><code translate="no">ARRAY</code> (elements must be one of: <code translate="no">BOOL</code>, <code translate="no">INT8</code>, <code translate="no">INT16</code>, <code translate="no">INT32</code>, <code translate="no">INT64</code>, <code translate="no">VARCHAR</code>)​</p></li>
</ul></li>
<li><p>Bitmap indexes do not support the following data types:​</p>
<ul>
<li><p><code translate="no">FLOAT</code>, <code translate="no">DOUBLE</code>: Floating-point types are not compatible with the binary nature of bitmap indexes.​</p></li>
<li><p><code translate="no">JSON</code>: JSON data types have a complex structure that cannot be efficiently represented using bitmap indexes.​</p></li>
</ul></li>
<li><p>Bitmap indexes are not suitable for fields with high cardinality (i.e., fields with a large number of distinct values).​</p>
<ul>
<li><p>As a general guideline, bitmap indexes are most effective when the cardinality of a field is less than 500.​</p></li>
<li><p>When the cardinality increases beyond this threshold, the performance benefits of bitmap indexes diminish, and the storage overhead becomes significant.​</p></li>
<li><p>For high-cardinality fields, consider using alternative indexing techniques such as inverted indexes, depending on your specific use case and query requirements.​</p></li>
</ul></li>
</ul>
