---
id: with_iterators.md
label: Conduct a Query with Iterators
related_key: With Iterators
order: 1
group: query.md
summary: Learn how to search and query data with iterators.
title: Conduct a Query With Iterators
---
<div class="tab-wrapper"><a href="/docs/v2.3.x/query.md" class=''>Conduct a Query</a><a href="/docs/v2.3.x/with_iterators.md" class='active '>Conduct a Query with Iterators</a></div>
<h1 id="Conduct-a-Query-With-Iterators" class="common-anchor-header">Conduct a Query With Iterators<button data-href="#Conduct-a-Query-With-Iterators" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to search and query data with iterators.</p>
<p>Before an iterator is introduced, one common way of querying or searching a large dataset in Milvus is to use <code translate="no">offset</code> and <code translate="no">limit</code> parameters in combination, which specify the starting position and the maximum number of items to return respectively. However, this method may lead to performance issues as the offset and limit continuously increase, potentially imposing a substantial memory burden on Milvus servers. For more information about <code translate="no">offset</code> and <code translate="no">limit</code>, see <a href="/docs/v2.3.x/search.md#prepare-search-parameters">Conduct a Vector Similarity Search</a>.</p>
<p>For that to happen the database will need to perform an inefficient full scan every time you request a pagination. This means that if there are 100,000,000 search results and you request an <code translate="no">offset</code> of 50,000,000, the system will need to fetch all those records (which will not even be needed), cache them in memory, sort according to vector similarity and primary key and afterwards only retrieve the 20 results specified in <code translate="no">limit</code>.</p>
<p>To address the performance issue, an alternative is to use an iterator, which is an object that allows you to use <code translate="no">expr</code> to filter scalar fields and then iterate over a sequence of search or query results. Using an iterator has some advantages:</p>
<ul>
<li>It simplifies the code and eliminates the need for manual configuration of <code translate="no">offset</code> and <code translate="no">limit</code>.</li>
<li>It’s more efficient and consistent, as it filters fields by Boolean expressions first and fetches data on demand.</li>
</ul>
<p>Milvus provides two types of iterators, query iterator and search iterator, for vector query and similarity search, respectively. The following examples show how to search and query data with iterators.</p>
<h2 id="Load-collection" class="common-anchor-header">Load collection<button data-href="#Load-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>All search and query operations within Milvus are executed in memory. Load the collection to memory before conducting a vector similarity search.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection
collection = Collection(<span class="hljs-string">&quot;book&quot;</span>)      <span class="hljs-comment"># Get an existing collection.</span>
collection.load()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">loadCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;book&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">err := milvusClient.LoadCollection(
  context.Background(),   <span class="hljs-comment">// ctx</span>
  <span class="hljs-string">&quot;book&quot;</span>,                 <span class="hljs-comment">// CollectionName</span>
  <span class="hljs-literal">false</span>                   <span class="hljs-comment">// async</span>
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
  log.Fatal(<span class="hljs-string">&quot;failed to load collection:&quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">milvusClient.<span class="hljs-title function_">loadCollection</span>(
  <span class="hljs-title class_">LoadCollectionParam</span>.<span class="hljs-title function_">newBuilder</span>()
          .<span class="hljs-title function_">withCollectionName</span>(<span class="hljs-string">&quot;book&quot;</span>)
          .<span class="hljs-title function_">build</span>()
);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">load -c book
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;http://localhost:9091/api/v1/collection/load&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
    &quot;collection_name&quot;: &quot;book&quot;
  }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Query-with-iterator" class="common-anchor-header">Query with iterator<button data-href="#Query-with-iterator" class="anchor-icon" translate="no">
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
    </button></h2><p>The following example uses <code translate="no">expr</code> to define a Boolean expression that looks for results where the number of pages in a book is between 600 and 700 inclusive, and then creates a query iterator along with output fields for the book ID and authors. The <code translate="no">batch_size</code> parameter is set to 10, meaning that every page returned will consist of 10 entities. And the <code translate="no">limit</code> parameter is set to <strong>100</strong>, which means that the query will return a maximum of 100 results totally. Note that iterator guarantees that no repeated results will be returned so if there are not enough entities matched input expr, the iterator will return empty page and the whole iteration should terminate.</p>
<p>In the code, the query iterator’s <code translate="no">next()</code> method is called repeatedly to retrieve each page of results. If the length of the returned results is zero, it means that there are no more pages to retrieve, so the loop is exited and the iterator is closed by using <code translate="no">close()</code>. Otherwise, the results are printed to the console, with each result showing the book ID and authors.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># filter books with the number of pages ranging from 600 to 700</span>
expr = <span class="hljs-string">&quot;600 &lt;= num_pages &lt;= 700&quot;</span>

<span class="hljs-comment"># return `bookID` and `authors`</span>
output_fields=[bookID, authors]

<span class="hljs-comment"># return 10 results per page and 100 results totally</span>
batch_size = <span class="hljs-number">10</span>
limit = <span class="hljs-number">100</span>

<span class="hljs-comment"># create a query iterator</span>
query_iterator = collection.query_iterator(batch_size, limit, expr, output_fields)

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-comment"># turn to the next page</span>
    res = query_iterator.<span class="hljs-built_in">next</span>()
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(res) == <span class="hljs-number">0</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;query iteration finished, close&quot;</span>)
        <span class="hljs-comment"># close the iterator</span>
        query_iterator.close()
        <span class="hljs-keyword">break</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(res)):
        <span class="hljs-built_in">print</span>(res[i])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Search-with-iterator" class="common-anchor-header">Search with iterator<button data-href="#Search-with-iterator" class="anchor-icon" translate="no">
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
    </button></h2><p>The following example creates a search iterator using the generated vectors, search parameters, and output fields for the book ID and authors.
The <code translate="no">batch_size</code> parameter is also set to 10, which means that the search will return exact 5 entities per page, except for the final page.
And the parameter <code translate="no">limit</code> is set to 100, meaning that the iterator will return 100 entities in total at most.
Note that iterator guarantees that no repeated results will be returned so if there are not enough entities, the iterator will return empty page and the whole iteration should terminate.</p>
<p>Regarding the <code translate="no">radius</code> and <code translate="no">range_filter</code> parameters, search_iterators will ensure the returned entities are restricted
in the range defined by these two parameters. More information is available in <a href="/docs/v2.3.x/within_range.md#configure-a-range-for-vector-filtering">Within Range</a>.</p>
<pre><code translate="no" class="language-python">vectors_to_search = rng.random((SEARCH_NQ, DIM))

search_params = {
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>, <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">1.0</span>, <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.7</span>},
}

<span class="hljs-comment"># create a search iterator</span>
search_iterator = collection.search_iterator(
    data=vectors_to_search,
    anns_field=<span class="hljs-string">&quot;vector_field&quot;</span>,
    param=search_params,
    batch_size=<span class="hljs-number">10</span>,
    limit=<span class="hljs-number">100</span>,
    expr=<span class="hljs-string">&quot;600 &lt;= num_pages &lt;= 700&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;bookID&quot;</span>, <span class="hljs-string">&quot;authors&quot;</span>]
)
                                             
<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-comment"># turn to the next page</span>
    res = search_iterator.<span class="hljs-built_in">next</span>()
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(res[<span class="hljs-number">0</span>]) == <span class="hljs-number">0</span>:
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;search iteration finished, close&quot;</span>)
        <span class="hljs-comment"># close the iterator</span>
        search_iterator.close()
        <span class="hljs-keyword">break</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(res[<span class="hljs-number">0</span>])):
        <span class="hljs-built_in">print</span>(res[<span class="hljs-number">0</span>][i])
<button class="copy-code-btn"></button></code></pre>
<h2 id="Parameters" class="common-anchor-header">Parameters<button data-href="#Parameters" class="anchor-icon" translate="no">
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
    </button></h2><p>The following table describes the parameters for searching or querying data with iterators.</p>
<table>
<thead>
<tr><th>Parameter</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td><code translate="no">expr</code></td><td>Boolean expression used to filter attributes. Find more expression details in <a href="/docs/v2.3.x/boolean.md">Boolean Expression Rules</a>.</td></tr>
<tr><td><code translate="no">data</code></td><td>The list of vectors to search with.</td></tr>
<tr><td><code translate="no">anns_field</code></td><td>Name of the vector field.</td></tr>
<tr><td><code translate="no">param</code></td><td>Search parameters specific to the index. Find more expression details in <a href="/docs/v2.3.x/search.md#prepare-search-parameters">Conduct a Vector Similarity Search</a>.</td></tr>
<tr><td><code translate="no">batch_size</code></td><td>Number of entities to return per page.</td></tr>
<tr><td><code translate="no">limit</code></td><td>Number of results to return totally in this iteration process.</td></tr>
<tr><td><code translate="no">radius</code></td><td>Angle where the vector with the least similarity resides. Find more expression details in <a href="/docs/v2.3.x/within_range.md#configure-a-range-for-vector-filtering">Within Range</a>.</td></tr>
<tr><td><code translate="no">range_filter</code></td><td>The filter used to filter a part of entities. Find more expression details in <a href="/docs/v2.3.x/within_range.md#configure-a-range-for-vector-filtering">Within Range</a>.</td></tr>
<tr><td><code translate="no">output_fields</code></td><td>Name of the field to return. Milvus supports returning the vector field.</td></tr>
</tbody>
</table>
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
<li><p>Explore API references for Milvus SDKs:</p>
<ul>
<li><a href="/api-reference/pymilvus/v2.3.x/About.md">PyMilvus API reference</a></li>
<li><a href="/api-reference/node/v2.3.x/About.md">Node.js API reference</a></li>
<li><a href="/api-reference/go/v2.3.x/About.md">Go API reference</a></li>
<li><a href="/api-reference/java/v2.3.x/About.md">Java API reference</a></li>
</ul></li>
</ul>
