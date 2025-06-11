---
id: scalar_index.md
related_key: scalar_index
summary: Scalar index in Milvus.
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
    </button></h1><p>Milvus supports filtered searches combining both scalar and vector fields. To enhance the efficiency of searches involving scalar fields, Milvus introduced scalar field indexing starting from version 2.1.0. This article provides an overview of scalar field indexing in Milvus, helping you understand its significance and implementation.</p>
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
    </button></h2><p>Once conducting vector similarity searches in Milvus, you can use logical operators to organize scalar fields into boolean expressions.</p>
<p>When Milvus receives a search request with such a boolean expression, it parses the boolean expression into an abstract syntax tree (AST) to generate a physical plan for attribute filtering. Milvus then applies the physical plan in each segment to generate a <a href="/docs/bitset.md">bitset</a> as the filtering result and includes the result as a vector search parameter to narrow down the search scope. In this case, the speed of vector searches relies heavily on the speed of attribute filtering.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/scalar_index.png" alt="Attribute filtering in a segment" class="doc-image" id="attribute-filtering-in-a-segment" />
    <span>Attribute filtering in a segment</span>
  </span>
</p>
<p>Scalar field indexing is a way of ensuring the speed of attribute filtering by sorting scalar field values in a particular way to accelerate information retrieval.</p>
<h2 id="Scalar-field-indexing-algorithms" class="common-anchor-header">Scalar field indexing algorithms<button data-href="#Scalar-field-indexing-algorithms" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus aims to achieve low memory usage, high filtering efficiency, and short loading time with its scalar field indexing algorithms. These algorithms are categorized into two main types: <a href="#auto-indexing">auto indexing</a> and <a href="#inverted-indexing">inverted indexing</a>.</p>
<h3 id="Auto-indexing" class="common-anchor-header">Auto indexing</h3><p>Milvus provides the <code translate="no">AUTOINDEX</code> option to free you from having to manually choose an index type. When calling the <code translate="no">create_index</code> method, if the <code translate="no">index_type</code> is not specified, Milvus automatically selects the most suitable index type based on the data type.</p>
<p>The following table lists the data types that Milvus supports and their corresponding auto indexing algorithms.</p>
<table>
<thead>
<tr><th>Data type</th><th>Auto indexing algorithm</th></tr>
</thead>
<tbody>
<tr><td>VARCHAR</td><td>Inverted index</td></tr>
<tr><td>INT8</td><td>Inverted index</td></tr>
<tr><td>INT16</td><td>Inverted index</td></tr>
<tr><td>INT32</td><td>Inverted index</td></tr>
<tr><td>INT64</td><td>Inverted index</td></tr>
<tr><td>FLOAT</td><td>Inverted index</td></tr>
<tr><td>DOUBLE</td><td>Inverted index</td></tr>
</tbody>
</table>
<h3 id="Inverted-indexing" class="common-anchor-header">Inverted indexing</h3><p>Inverted indexing offers a flexible way to create an index for a scalar field by manually specifying index parameters. This method works well for various scenarios, including point queries, pattern match queries, full-text searches, JSON searches, Boolean searches, and even prefix match queries.</p>
<p>The inverted indexes implemented in Milvus are powered by <a href="https://github.com/quickwit-oss/tantivy">Tantivy</a>, a full-text search engine library. Tantivy ensures that inverted indexing in Milvus is both efficient and fast.</p>
<p>An inverted index has two main components: a term dictionary and an inverted list. The term dictionary includes all tokenized words sorted alphabetically, while the inverted list contains the list of documents where each word appears. This setup makes point queries and range queries much faster and more efficient than brute-force searches.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="/docs/v2.6.x/assets/scalar_index_inverted.png" alt="Inverted index diagram" class="doc-image" id="inverted-index-diagram" />
    <span>Inverted index diagram</span>
  </span>
</p>
<p>The advantages of using an inverted index are particularly evident in the following operations:</p>
<ul>
<li><strong>Point query</strong>: For example, when searching for documents containing the word <strong>Milvus</strong>, the process begins by checking if <strong>Milvus</strong> is present in the term dictionary. If it is not found, no documents contain the word. However, if it is found, the inverted list associated with <strong>Milvus</strong> is retrieved, indicating the documents that contain the word. This method is far more efficient than a brute-force search through a million documents, as the sorted term dictionary significantly reduces the time complexity of finding the word <strong>Milvus</strong>.</li>
<li><strong>Range query</strong>: The efficiency of range queries, such as finding documents with words alphabetically greater than <strong>very</strong>, is also enhanced by the sorted term dictionary. This approach is more efficient than a brute-force search, providing quicker and more accurate results.</li>
</ul>
<h3 id="Test-results" class="common-anchor-header">Test results</h3><p>To demonstrate the performance improvements provided by scalar indexes in Milvus, an experiment was conducted comparing the performance of several expressions using inverted indexing and brute-force search on raw data.</p>
<p>The experiment involved testing various expressions under two conditions: with an inverted index and with a brute-force search. To ensure fairness, the same data distribution was maintained across tests, using the same collection each time. Before each test, the collection was released, and the index was dropped and rebuilt. Additionally, a warm query was performed before each test to minimize the impact of cold and hot data, and each query was executed multiple times to ensure accuracy.</p>
<p>For a dataset of <strong>1 million</strong> records, using an <strong>inverted index</strong> can provide up to a <strong>30x</strong> performance improvement for point queries. The performance gains can be even more significant for larger datasets.</p>
<h2 id="Performance-recommandations" class="common-anchor-header">Performance recommandations<button data-href="#Performance-recommandations" class="anchor-icon" translate="no">
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
    </button></h2><p>To take full advantage of Milvus’ capability in scalar field indexing and unleash its power in vector similarity searches, you may need a model to estimate the size of memory required based on the data you have.</p>
<p>The following tables list the estimation functions for all the data types that Milvus supports.</p>
<ul>
<li><p>Numeric fields</p>
<table>
<thead>
<tr><th>Data type</th><th>Memory estimation function (MB)</th></tr>
</thead>
<tbody>
<tr><td>INT8</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT16</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT32</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>INT64</td><td>numOfRows * <strong>24</strong> / 1024 / 1024</td></tr>
<tr><td>FLOAT32</td><td>numOfRows * <strong>12</strong> / 1024 / 1024</td></tr>
<tr><td>DOUBLE</td><td>numOfRows * <strong>24</strong> / 1024 / 1024</td></tr>
</tbody>
</table>
</li>
<li><p>String fields</p>
<table>
<thead>
<tr><th>String length</th><th>Memory estimation function (MB)</th></tr>
</thead>
<tbody>
<tr><td>(0, 8]</td><td>numOfRows * <strong>128</strong> / 1024 / 1024</td></tr>
<tr><td>(8, 16]</td><td>numOfRows * <strong>144</strong> / 1024 / 1024</td></tr>
<tr><td>(16, 32]</td><td>numOfRows * <strong>160</strong> / 1024 / 1024</td></tr>
<tr><td>(32, 64]</td><td>numOfRows * <strong>192</strong> / 1024 / 1024</td></tr>
<tr><td>(64, 128]</td><td>numOfRows * <strong>256</strong> / 1024 / 1024</td></tr>
<tr><td>(128, 65535]</td><td>numOfRows * <strong>strLen * 1.5</strong> / 1024 / 1024</td></tr>
</tbody>
</table>
</li>
</ul>
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
<li><p>To index a scalar field, read <a href="/docs/index-scalar-fields.md">Build an Index on Scalars</a>.</p></li>
<li><p>To learn more about the related terms and rules mentioned above, read</p>
<ul>
<li><a href="/docs/bitset.md">Bitset</a></li>
<li><a href="/docs/multi-vector-search.md">Hybrid search</a></li>
<li><a href="/docs/boolean.md">Boolean expression rules</a></li>
<li><a href="/docs/schema.md#Supported-data-type">Supported data types</a></li>
</ul></li>
</ul>
