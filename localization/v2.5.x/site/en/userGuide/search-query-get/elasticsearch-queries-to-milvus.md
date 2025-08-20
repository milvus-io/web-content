---
id: elasticsearch-queries-to-milvus.md
title: Elasticsearch Queries to Milvus
summary: >-
  Elasticsearch, built on Apache Lucene, is a leading open-source search engine.
  However, it faces challenges in modern AI applications, including high update
  costs, poor real-time performance, inefficient shard management, a
  non-cloud-native design, and excessive resource demands. As a cloud-native
  vector database, Milvus overcomes these issues with decoupled storage and
  computing, efficient indexing for high-dimensional data, and seamless
  integration with modern infrastructures. It offers superior performance and
  scalability for AI workloads.
---
<h1 id="Elasticsearch-Queries-to-Milvus" class="common-anchor-header">Elasticsearch Queries to Milvus<button data-href="#Elasticsearch-Queries-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Elasticsearch, built on Apache Lucene, is a leading open-source search engine. However, it faces challenges in modern AI applications, including high update costs, poor real-time performance, inefficient shard management, a non-cloud-native design, and excessive resource demands. As a cloud-native vector database, Milvus overcomes these issues with decoupled storage and computing, efficient indexing for high-dimensional data, and seamless integration with modern infrastructures. It offers superior performance and scalability for AI workloads.</p>
<p>This article aims to facilitate the migration of your code base from Elasticsearch to Milvus, providing various examples of converting queries in between.</p>
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
    </button></h2><p>In Elasticsearch, operations in the query context generate relevance scores, while those in the filter context do not. Similarly, Milvus searches produce similarity scores, whereas its filter-like queries do not. When migrating your code base from Elasticsearch to Milvus, the key principle is converting fields used in Elasticsearch’s query context into vector fields to enable similarity score generation.</p>
<p>The table below outlines some Elasticsearch query patterns and their corresponding equivalents in Milvus.</p>
<table>
   <tr>
     <th><p>Elasticsearch Queries</p></th>
     <th><p>Milvus Equivalents</p></th>
     <th><p>Remarks</p></th>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Full-text queries</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/v2.5.x/elasticsearch-queries-to-milvus.md#Match-query">Match query</a></p></td>
     <td><p>Full-text search</p></td>
     <td><p>Both provide similar sets of capabilities.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Term-level queries</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/v2.5.x/elasticsearch-queries-to-milvus.md#IDs">IDs</a></p></td>
     <td><p><code translate="no">in</code> operator</p></td>
     <td rowspan="6"><p>Both provide the same or similar set of capabilities when these Elasticsearch queries are used in the filter context.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/v2.5.x/elasticsearch-queries-to-milvus.md#Prefix-query">Prefix query</a></p></td>
     <td><p><code translate="no">like</code> operator</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/v2.5.x/elasticsearch-queries-to-milvus.md#Range-query">Range query</a></p></td>
     <td><p>Comparison operators like <code translate="no">&gt;</code>, <code translate="no">&lt;</code>, <code translate="no">&gt;=</code>, and <code translate="no">&lt;=</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/v2.5.x/elasticsearch-queries-to-milvus.md#Term-query">Term query</a></p></td>
     <td><p>Comparison operators like <code translate="no">==</code></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/v2.5.x/elasticsearch-queries-to-milvus.md#Terms-query">Terms query</a></p></td>
     <td><p><code translate="no">in</code> operator</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/v2.5.x/elasticsearch-queries-to-milvus.md#Wildcard-query">Wildcard query</a></p></td>
     <td><p><code translate="no">like</code> operator</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/v2.5.x/elasticsearch-queries-to-milvus.md#Boolean-query">Boolean query</a></p></td>
     <td><p>Logical operators like <code translate="no">AND</code></p></td>
     <td><p>Both provide similar sets of capabilities when used in the filter context.</p></td>
   </tr>
   <tr>
     <td colspan="3"><p><strong>Vector queries</strong></p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/v2.5.x/elasticsearch-queries-to-milvus.md#Knn-query">kNN query</a></p></td>
     <td><p>Search</p></td>
     <td><p>Milvus provides more advanced vector search capabilities.</p></td>
   </tr>
   <tr>
     <td><p><a href="/docs/v2.5.x/elasticsearch-queries-to-milvus.md#Reciprocal-rank-fusion">Reciprocal rank fusion</a></p></td>
     <td><p>Hybrid Search</p></td>
     <td><p>Milvus supports multiple reranking strategies.</p></td>
   </tr>
</table>
<h2 id="Full-text-queries" class="common-anchor-header">Full-text queries<button data-href="#Full-text-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>In Elasticsearch, the full text queries enable you to search analyzed text fields such as the body of an email. The query string is processed using the same analyzer that was applied to the field during indexing.</p>
<h3 id="Match-query" class="common-anchor-header">Match query<button data-href="#Match-query" class="anchor-icon" translate="no">
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
    </button></h3><p>In Elasticsearch, a match query returns documents that match a provided text, number, date, or boolean value. The provided text is analyzed before matching.</p>
<p>The following is an example Elasticsearch search request with a match query.</p>
<pre><code translate="no" class="language-bash">resp = client.search(
    query={
        <span class="hljs-string">&quot;match&quot;</span>: {
            <span class="hljs-string">&quot;message&quot;</span>: {
                <span class="hljs-string">&quot;query&quot;</span>: <span class="hljs-string">&quot;this is a test&quot;</span>
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus provides the same capability through the full-text search feature. You can convert the above Elasticsearch query into Milvus as follows:</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    data=[<span class="hljs-string">&#x27;How is the weather in Jamaica?&#x27;</span>],
    anns_field=<span class="hljs-string">&quot;message_sparse&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;message&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>In the example above, <code translate="no">message_sparse</code> is a sparse vector field derived from a VarChar field named <code translate="no">message</code>. Milvus uses the BM25 embedding model to convert the values in the <code translate="no">message</code> field into sparse vector embeddings and stores them in the <code translate="no">message_sparse</code> field. Upon receiving the search request, Milvus embeds the plain text query payload using the same BM25 model and performs a sparse vector search and returns the <code translate="no">id</code> and <code translate="no">message</code> fields specified in the <code translate="no">output_fields</code> parameter along with the corresponding similarity scores.</p>
<p>To use this functionality, you must enable the analyzer on the <code translate="no">message</code> field and define a function to derive the <code translate="no">message_sparse</code> field from it. For detailed instructions on enabling the analyzer and creating the derivative function in Milvus, refer to <a href="/docs/v2.5.x/full-text-search.md">Full Text Search</a>.</p>
<h2 id="Term-level-queries" class="common-anchor-header">Term-level queries<button data-href="#Term-level-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>In Elasticsearch, term-level queries are used to find documents based on exact values in structured data, such as date ranges, IP addresses, prices, or product IDs. This section outlines the possible equivalents of some Elasticsearch term-level queries in Milvus. All examples in this section are adapted to operate within the filter context to align with Milvus’s capabilities.</p>
<h3 id="IDs" class="common-anchor-header">IDs<button data-href="#IDs" class="anchor-icon" translate="no">
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
    </button></h3><p>In Elasticsearch, you can find documents based on their IDs in the filter context as follows:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;ids&quot;</span>: {
                    <span class="hljs-string">&quot;values&quot;</span>: [
                        <span class="hljs-string">&quot;1&quot;</span>,
                        <span class="hljs-string">&quot;4&quot;</span>,
                        <span class="hljs-string">&quot;100&quot;</span>
                    ]
                }            
            }
        }
    },
)
<button class="copy-code-btn"></button></code></pre>
<p>In Milvus, you can also find entities based on their IDs as follows:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Use the filter parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;id in [1, 4, 100]&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)

<span class="hljs-comment"># Use the ids parameter</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    ids=[<span class="hljs-number">1</span>, <span class="hljs-number">4</span>, <span class="hljs-number">100</span>],
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;title&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>You can find the Elasticsearch example on <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-ids-query.html">this page</a>. For details on query and get requests as well as the filter expressions in Milvus, refer to <a href="/docs/v2.5.x/get-and-scalar-query.md">Query</a> and <a href="/docs/v2.5.x/filtering">Filtering</a>.</p>
<h3 id="Prefix-query" class="common-anchor-header">Prefix query<button data-href="#Prefix-query" class="anchor-icon" translate="no">
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
    </button></h3><p>In Elasticsearch, you can find documents that contain a specific prefix in a provided field in the filter context as follows:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                 <span class="hljs-string">&quot;prefix&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki&quot;</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>In Milvus, you can find the entities whose values start with the specified prefix as follows:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>You can find the Elasticsearch example on <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-prefix-query.html">this page</a>. For details on the <code translate="no">like</code> operator in Milvus, refer to <a href="/docs/v2.5.x/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching">Using </a><code translate="no">LIKE</code><a href="/docs/v2.5.x/basic-operators.md#Example-2-Using-LIKE-for-Pattern-Matching"> for Pattern Matching</a>.</p>
<h3 id="Range-query" class="common-anchor-header">Range query<button data-href="#Range-query" class="anchor-icon" translate="no">
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
    </button></h3><p>In Elasticsearch, you can find documents that contain terms within a provided range as follows:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;range&quot;</span>: {
                    <span class="hljs-string">&quot;age&quot;</span>: {
                        <span class="hljs-string">&quot;gte&quot;</span>: <span class="hljs-number">10</span>,
                        <span class="hljs-string">&quot;lte&quot;</span>: <span class="hljs-number">20</span>
                    }
                }           
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>In Milvus, you can find the entities whose values in a specific field are within a provided range as follows:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;10 &lt;= age &lt;= 20&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>You can find the Elasticsearch example on <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html">this page</a>. For details on comparison operators in Milvus, see <a href="/docs/v2.5.x/basic-operators.md#Comparison-operators">Comparison operators</a>.</p>
<h3 id="Term-query" class="common-anchor-header">Term query<button data-href="#Term-query" class="anchor-icon" translate="no">
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
    </button></h3><p>In Elasticsearch, you can find documents that contain an <strong>exact</strong> term in a provided field as follows:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;status&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;retired&quot;</span>
                    }
                }            
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>In Milvus, you can find the entities whose values in the specified field are exactly the specified term as follows:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use ==</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;status==&quot;retired&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(status, &quot;retired&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;status&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>You can find the Elasticsearch example on <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html">this page</a>. For details on comparison operators in Milvus, see <a href="/docs/v2.5.x/basic-operators.md#Comparison-operators">Comparison operators</a>.</p>
<h3 id="Terms-query" class="common-anchor-header">Terms query<button data-href="#Terms-query" class="anchor-icon" translate="no">
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
    </button></h3><p>In Elasticsearch, you can find documents that contain one or more <strong>exact</strong> terms in a provided field as follows:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;terms&quot;</span>: {
                    <span class="hljs-string">&quot;degree&quot;</span>: [
                        <span class="hljs-string">&quot;graduate&quot;</span>,
                        <span class="hljs-string">&quot;post-graduate&quot;</span>
                    ]
                }        
            }
        }
    }
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus does not have a complete equivalence of this one. However, you can find the entities whose values in the specified field are one of the specified terms as follows:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># use in</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;degree in [&quot;graduate&quot;, &quot;post-graduate&quot;]&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)

<span class="hljs-comment"># use TEXT_MATCH</span>
res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;TEXT_MATCH(degree, &quot;graduate post-graduate&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;degree&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>You can find the Elasticsearch example on <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-terms-query.html">this page</a>. For details on range operators in Milvus, refer to <a href="/docs/v2.5.x/basic-operators.md#Range-operators">Range operators</a>.</p>
<h3 id="Wildcard-query" class="common-anchor-header">Wildcard query<button data-href="#Wildcard-query" class="anchor-icon" translate="no">
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
    </button></h3><p>In Elasticsearch, you can find documents that contain terms matching a wildcard pattern as follows:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;wildcard&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: {
                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;ki*y&quot;</span>
                    }
                }          
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus does not support wildcard in its filtering conditions. However, you can use the <code translate="no">like</code> operator to achieve the similar effect as follows:</p>
<pre><code translate="no" class="language-python">res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;ki%&quot; AND user like &quot;%y&quot;&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>You can find the Elasticsearch example on <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wildcard-query.html">this page</a>. For details on the range operators in Milvus, refer to <a href="/docs/v2.5.x/basic-operators.md#Range-operators">Range operators</a>.</p>
<h2 id="Boolean-query" class="common-anchor-header">Boolean query<button data-href="#Boolean-query" class="anchor-icon" translate="no">
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
    </button></h2><p>In Elasticsearch, a boolean query is a query that matches documents matching boolean combinations of other queries.</p>
<p>The following example is adapted from an example in Elasticsearch documentation on <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html">this page</a>. The query will return users with <code translate="no">kimchy</code> in their names with a <code translate="no">production</code> tag.</p>
<pre><code translate="no" class="language-python">resp = client.search(
    query={
        <span class="hljs-string">&quot;bool&quot;</span>: {
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;user&quot;</span>: <span class="hljs-string">&quot;kimchy&quot;</span>
                }
            },
            <span class="hljs-string">&quot;filter&quot;</span>: {
                <span class="hljs-string">&quot;term&quot;</span>: {
                    <span class="hljs-string">&quot;tags&quot;</span>: <span class="hljs-string">&quot;production&quot;</span>
                }
            }
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>In Milvus, you can do the similar thing as follows:</p>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">filter</span> = 

res = client.query(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;user like &quot;%kimchy%&quot; AND ARRAY_CONTAINS(tags, &quot;production&quot;)&#x27;</span>,
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;user&quot;</span>, <span class="hljs-string">&quot;age&quot;</span>, <span class="hljs-string">&quot;tags&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<p>The above example assumes that you have a <code translate="no">user</code> field of the <strong>VarChar</strong> type and a <code translate="no">tags</code> field of the <strong>Array</strong> type, in the target collection. The query will return users with <code translate="no">kimchy</code> in their names with a <code translate="no">production</code> tag.</p>
<h2 id="Vector-queries" class="common-anchor-header">Vector queries<button data-href="#Vector-queries" class="anchor-icon" translate="no">
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
    </button></h2><p>In Elasticsearch, vector queries are specialized queries that work on vector fields to efficiently perform semantic search.</p>
<h3 id="Knn-query" class="common-anchor-header">Knn query<button data-href="#Knn-query" class="anchor-icon" translate="no">
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
    </button></h3><p>Elasticsearch supports both approximate kNN queries and exact, brute-force kNN queries. You can find the <em>k</em> nearest vectors to a query vector in either way, as measured by a similarity metric, as follows:</p>
<pre><code translate="no" class="language-python">resp = client.search(
    index=<span class="hljs-string">&quot;my-image-index&quot;</span>,
    size=<span class="hljs-number">3</span>,
    query={
        <span class="hljs-string">&quot;knn&quot;</span>: {
            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;image-vector&quot;</span>,
            <span class="hljs-string">&quot;query_vector&quot;</span>: [
                -<span class="hljs-number">5</span>,
                <span class="hljs-number">9</span>,
                -<span class="hljs-number">12</span>
            ],
            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">10</span>
        }
    },
)

<button class="copy-code-btn"></button></code></pre>
<p>Milvus, as a specialized vector database, uses index types to optimize vector searches. Typically, it prioritizes approximate nearest neighbor (ANN) search for high-dimensional vector data. While brute-force kNN search with the FLAT index type delivers precise results, it is both time-consuming and resource-intensive. In contrast, ANN search using AUTOINDEX or other index types balances speed and accuracy, offering significantly faster and more resource-efficient performance than kNN.</p>
<p>A similar equivalence to the above vector query in Mlivus goes like this:</p>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    anns_field=<span class="hljs-string">&quot;image-vector&quot;</span>
    data=[[-<span class="hljs-number">5</span>, <span class="hljs-number">9</span>, -<span class="hljs-number">12</span>]],
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>You can find the Elasticsearch example on <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-knn-query.html">this page</a>. For details on ANN searches in Milvus, read <a href="/docs/v2.5.x/single-vector-search.md">Basic ANN Search</a>.</p>
<h3 id="Reciprocal-Rank-Fusion" class="common-anchor-header">Reciprocal Rank Fusion<button data-href="#Reciprocal-Rank-Fusion" class="anchor-icon" translate="no">
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
    </button></h3><p>Elasticsearch provides Reciprocal Rank Fusion (RRF) to combine multiple result sets with different relevance indicators into a single ranked result set.</p>
<p>The following example demonstrates combining a traditional term-based search with a k-nearest neighbors (kNN) vector search to improve search relevance:</p>
<pre><code translate="no" class="language-python">client.search(
    index=<span class="hljs-string">&quot;my_index&quot;</span>,
    size=<span class="hljs-number">10</span>,
    query={
        <span class="hljs-string">&quot;retriever&quot;</span>: {
            <span class="hljs-string">&quot;rrf&quot;</span>: {
                <span class="hljs-string">&quot;retrievers&quot;</span>: [
                    {
                        <span class="hljs-string">&quot;standard&quot;</span>: {
                            <span class="hljs-string">&quot;query&quot;</span>: {
                                <span class="hljs-string">&quot;term&quot;</span>: {
                                    <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;shoes&quot;</span>
                                }
                            }
                        }
                    },
                    {
                        <span class="hljs-string">&quot;knn&quot;</span>: {
                            <span class="hljs-string">&quot;field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
                            <span class="hljs-string">&quot;query_vector&quot;</span>: [<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>],  <span class="hljs-comment"># Example vector; replace with your actual query vector</span>
                            <span class="hljs-string">&quot;k&quot;</span>: <span class="hljs-number">50</span>,
                            <span class="hljs-string">&quot;num_candidates&quot;</span>: <span class="hljs-number">100</span>
                        }
                    }
                ],
                <span class="hljs-string">&quot;rank_window_size&quot;</span>: <span class="hljs-number">50</span>,
                <span class="hljs-string">&quot;rank_constant&quot;</span>: <span class="hljs-number">20</span>
            }
        }
    }
)
<button class="copy-code-btn"></button></code></pre>
<p>In this example, RRF combines results from two retrievers:</p>
<ul>
<li><p>A standard term-based search for documents containing the term <code translate="no">&quot;shoes&quot;</code> in the <code translate="no">text</code> field.</p></li>
<li><p>A kNN search on the <code translate="no">vector</code> field using the provided query vector.</p></li>
</ul>
<p>Each retriever contributes up to 50 top matches, which are reranked by RRF, and the final top 10 results are returned.</p>
<p>In Milvus, you can achieve a similar hybrid search by combining searches across multiple vector fields, applying a reranking strategy, and retrieving the top-K results from the combined list. Milvus supports both RRF and weighted reranker strategies. For more details, refer to <a href="/docs/v2.5.x/reranking.md">Reranking</a>.</p>
<p>The following is a non-strict equivalence of the above Elasticsearch example in Milvus.</p>
<pre><code translate="no" class="language-python">search_params_dense = {
    <span class="hljs-string">&quot;data&quot;</span>: [[<span class="hljs-number">1.25</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3.5</span>]],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}, 
    },
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">100</span>
}

req_dense = ANNSearchRequest(**search_params_dense)

search_params_sparse = {
    <span class="hljs-string">&quot;data&quot;</span>: [<span class="hljs-string">&quot;shoes&quot;</span>],
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;text_sparse&quot;</span>,
    <span class="hljs-string">&quot;param&quot;</span>: {
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;BM25&quot;</span>,
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_search&quot;</span>: <span class="hljs-number">0.2</span>}
    }
}

req_sparse = ANNSearchRequest(**search_params_sparse)

res = client.hybrid_search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
    reqs=[req_dense, req_sparse],
    reranker=RRFRanker(),
    limit=<span class="hljs-number">10</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>This example demonstrates a hybrid search in Milvus that combines:</p>
<ol>
<li><p><strong>Dense vector search</strong>: Using the inner product (IP) metric with <code translate="no">nprobe</code> set to 10 for approximate nearest neighbor (ANN) search on the <code translate="no">vector</code> field.</p></li>
<li><p><strong>Sparse vector search</strong>: Using the BM25 similarity metric with a <code translate="no">drop_ratio_search</code> parameter of 0.2 on the <code translate="no">text_sparse</code> field.</p></li>
</ol>
<p>The results from these searches are executed separately, combined, and reranked using the Reciprocal Rank Fusion (RRF) ranker. The hybrid search returns the top 10 entities from the reranked list.</p>
<p>Unlike Elasticsearch’s RRF ranking, which merges results from standard text-based queries and kNN searches, Milvus combines results from sparse and dense vector searches, providing a unique hybrid search capability optimized for multimodal data.</p>
<h2 id="Recap" class="common-anchor-header">Recap<button data-href="#Recap" class="anchor-icon" translate="no">
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
    </button></h2><p>In this article, we covered the conversions of typical Elasticsearch queries to their Milvus equivalents, including term-level queries, boolean queries, full-text queries, and vector queries. If you have further questions about converting other Elasticsearch queries, feel free to reach out to us.</p>
