---
id: primary-key-search.md
title: Primary-Key Search
summary: >-
  When conducting similarity searches, you are always asked to provide one or
  more query vectors, even if the query vectors are already present in the
  target collection. To avoid retrieving vectors before the search, you can use
  primary keys instead.
beta: Milvus 2.6.9+
---
<h1 id="Primary-Key-Search" class="common-anchor-header">Primary-Key Search<span class="beta-tag" style="background-color:rgb(0, 179, 255);color:white" translate="no">Compatible with Milvus 2.6.9+</span><button data-href="#Primary-Key-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>When conducting similarity searches, you are always asked to provide one or more query vectors, even if the query vectors are already present in the target collection. To avoid retrieving vectors before the search, you can use primary keys instead.</p>
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
    </button></h2><p>On e-commerce platforms, users can enter a keyword to retrieve products that match it. Once the user views a product detail page, the platform will also display a list of similar products at the bottom of the page for users who want to compare them.</p>
<p>The recommendations are sorted by their similarity to the keyword or the current product. To achieve this, platform developers need to retrieve the vector representation of the keyword or the current product from Milvus before the actual similarity search, which increases the round-trip between the platform and Milvus and results in a large number of high-dimensional floats being transmitted across the network.</p>
<p>To simplify the interaction logic between your applications and Milvus, reduce the number of round-trips, and avoid transmitting large amounts of high-dimensional floating-point values across the network, consider using primary key searches.</p>
<p>In a primary key search, you do not need to provide any query vectors. Instead, you are asked to provide the primary keys (<code translate="no">ids</code>) of the entities that contain the query vectors.</p>
<h2 id="Limits--restrictions" class="common-anchor-header">Limits & restrictions<button data-href="#Limits--restrictions" class="anchor-icon" translate="no">
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
<li><p>Searches using primary keys apply to all vector data types, except sparse vector fields derived from VarChar fields, as in BM25 functions.</p></li>
<li><p>You can use primary keys instead of query vectors in filtered, range, and grouping searches, optionally with pagination enabled. However, this feature does not apply to hybrid searches and search iterators.</p></li>
<li><p>For similarity searches involving embedding lists, you still need to retrieve the query vectors, arrange them into embedding lists, and run the searches.</p></li>
<li><p>You cannot use primary keys instead of query vectors in RESTful APIs.</p></li>
<li><p>For any nonexistent primary keys or those in an incorrect format, Milvus will prompt errors.</p></li>
<li><p>Primary keys and query vectors are mutually exclusive. Providing both also results in errors.</p></li>
</ul>
<h2 id="Examples" class="common-anchor-header">Examples<button data-href="#Examples" class="anchor-icon" translate="no">
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
    </button></h2><p>The following examples assume that all provided Int64 IDs are available in the target collection.</p>
<div class="alert note">
<p>The primary keys are not used for filtering; they are used only for vector retrieval.</p>
</div>
<h3 id="Example-1-Basic-primary-key-search" class="common-anchor-header">Example 1: Basic primary-key search<button data-href="#Example-1-Basic-primary-key-search" class="anchor-icon" translate="no">
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
    </button></h3><p>To conduct a basic primary-key search, simply replace the query vectors with primary keys.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient

client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>
)

res = client.search(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    anns_field=<span class="hljs-string">&quot;vector&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>], <span class="hljs-comment"># a list of primary keys</span></span>
    limit=<span class="hljs-number">3</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>}
)

<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:
        <span class="hljs-built_in">print</span>(hit)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;

<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({
    <span class="hljs-attr">address</span>: <span class="hljs-string">&quot;http://localhost:19530&quot;</span>,
    <span class="hljs-attr">token</span>: <span class="hljs-string">&quot;root:Milvus&quot;</span>,
});

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">anns_field</span>: <span class="hljs-string">&quot;vector&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">ids</span>: [<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>], <span class="hljs-comment">// a list of primary keys</span></span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">import</span> (
    <span class="hljs-string">&quot;context&quot;</span>
    <span class="hljs-string">&quot;fmt&quot;</span>

    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/column&quot;</span>
    <span class="hljs-string">&quot;github.com/milvus-io/milvus/client/v3/milvusclient&quot;</span>
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &amp;milvusclient.ClientConfig{
    Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    APIKey:  <span class="hljs-string">&quot;root:Milvus&quot;</span>,
})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}
<span class="hljs-keyword">defer</span> client.Close(ctx)

<span class="highlighted-comment-line">ids := column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>}) <span class="hljs-comment">// a list of primary keys</span></span>
resultSets, err := client.Search(ctx, milvusclient.NewSearchByIDsOption(
    <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,             <span class="hljs-comment">// limit</span>
    ids,
).WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithSearchParam(<span class="hljs-string">&quot;metric_type&quot;</span>, <span class="hljs-string">&quot;IP&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> searchRequest = milvus::<span class="hljs-built_in">SearchRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
                         .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithIDs</span>({<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>})</span>
                         .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">3</span>)
                         .<span class="hljs-built_in">WithMetricType</span>(milvus::MetricType::IP);

milvus::SearchResponse searchResponse;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(searchRequest, searchResponse);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; <span class="hljs-string">&quot;Search failed: &quot;</span> &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span>;
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; result : searchResponse.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> ids = result.<span class="hljs-built_in">Ids</span>().<span class="hljs-built_in">IntIDArray</span>();
    <span class="hljs-keyword">for</span> (<span class="hljs-type">size_t</span> i = <span class="hljs-number">0</span>; i &lt; result.<span class="hljs-built_in">Scores</span>().<span class="hljs-built_in">size</span>(); ++i) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;id=&quot;</span> &lt;&lt; ids[i] &lt;&lt; <span class="hljs-string">&quot;, score=&quot;</span> &lt;&lt; result.<span class="hljs-built_in">Scores</span>()[i] &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-2-Filtered-search-using-primary-keys" class="common-anchor-header">Example 2: Filtered search using primary keys<button data-href="#Example-2-Filtered-search-using-primary-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>The following example assumes that color and likes are two schema-defined fields in the target collection.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>], <span class="hljs-comment">#</span></span>
<span class="highlighted-comment-line">    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;color like &quot;red%&quot; and likes &gt; 50&#x27;</span>,</span>
<span class="highlighted-comment-line">    output_fields=[<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>],</span>
    limit=<span class="hljs-number">3</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">ids</span>: [<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>],</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">filter</span>: <span class="hljs-string">&#x27;color like &quot;red%&quot; and likes &gt; 50&#x27;</span>,</span>
<span class="highlighted-comment-line">    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>],</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="highlighted-comment-line">ids := column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>})</span>
resultSets, err := client.Search(ctx, milvusclient.NewSearchByIDsOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    ids,
).WithFilter(<span class="hljs-string">`color like &quot;red%&quot; and likes &gt; 50`</span>).
    WithOutputFields(<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;color: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;color&quot;</span>))
    fmt.Println(<span class="hljs-string">&quot;likes: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;likes&quot;</span>))
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> searchRequest = milvus::<span class="hljs-built_in">SearchRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithIDs</span>({<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>})</span>
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithFilter</span>(<span class="hljs-string">R&quot;(color like &quot;red%&quot; and likes &gt; 50)&quot;</span>)</span>
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;color&quot;</span>, <span class="hljs-string">&quot;likes&quot;</span>})</span>
                         .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">3</span>);

milvus::SearchResponse searchResponse;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(searchRequest, searchResponse);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; <span class="hljs-string">&quot;Search failed: &quot;</span> &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span>;
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; result : searchResponse.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> ids = result.<span class="hljs-built_in">Ids</span>().<span class="hljs-built_in">IntIDArray</span>();
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> colors = result.<span class="hljs-built_in">OutputField</span>&lt;milvus::VarCharFieldData&gt;(<span class="hljs-string">&quot;color&quot;</span>);
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> likes = result.<span class="hljs-built_in">OutputField</span>&lt;milvus::Int64FieldData&gt;(<span class="hljs-string">&quot;likes&quot;</span>);
    <span class="hljs-keyword">for</span> (<span class="hljs-type">size_t</span> i = <span class="hljs-number">0</span>; i &lt; result.<span class="hljs-built_in">Scores</span>().<span class="hljs-built_in">size</span>(); ++i) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;id=&quot;</span> &lt;&lt; ids[i]
                  &lt;&lt; <span class="hljs-string">&quot;, score=&quot;</span> &lt;&lt; result.<span class="hljs-built_in">Scores</span>()[i]
                  &lt;&lt; <span class="hljs-string">&quot;, color=&quot;</span> &lt;&lt; colors-&gt;<span class="hljs-built_in">Data</span>()[i]
                  &lt;&lt; <span class="hljs-string">&quot;, likes=&quot;</span> &lt;&lt; likes-&gt;<span class="hljs-built_in">Data</span>()[i] &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-3-Range-search-using-primary-keys" class="common-anchor-header">Example 3: Range search using primary keys<button data-href="#Example-3-Range-search-using-primary-keys" class="anchor-icon" translate="no">
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
    </button></h3><div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>],</span>
    limit=<span class="hljs-number">3</span>,
    search_params={
<span class="highlighted-comment-line">        <span class="hljs-string">&quot;params&quot;</span>: {</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.4</span>,</span>
<span class="highlighted-comment-line">            <span class="hljs-string">&quot;range_filter&quot;</span>: <span class="hljs-number">0.6</span></span>
<span class="highlighted-comment-line">        }</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">ids</span>: [<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>],</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">params</span>: {
<span class="highlighted-comment-line">        <span class="hljs-attr">radius</span>: <span class="hljs-number">0.4</span>,</span>
<span class="highlighted-comment-line">        <span class="hljs-attr">range_filter</span>: <span class="hljs-number">0.6</span>,</span>
    },
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">annParam := index.NewCustomAnnParam()
<span class="highlighted-comment-line">annParam.WithRadius(<span class="hljs-number">0.4</span>)</span>
<span class="highlighted-comment-line">annParam.WithRangeFilter(<span class="hljs-number">0.6</span>)</span>

<span class="highlighted-comment-line">ids := column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>})</span>
resultSets, err := client.Search(ctx, milvusclient.NewSearchByIDsOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    ids,
).WithANNSField(<span class="hljs-string">&quot;vector&quot;</span>).
    WithAnnParam(annParam))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> searchRequest = milvus::<span class="hljs-built_in">SearchRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                         .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithIDs</span>({<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>})</span>
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithRadius</span>(<span class="hljs-number">0.4</span>)</span>
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithRangeFilter</span>(<span class="hljs-number">0.6</span>)</span>
                         .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">3</span>);

milvus::SearchResponse searchResponse;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(searchRequest, searchResponse);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; <span class="hljs-string">&quot;Search failed: &quot;</span> &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span>;
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; result : searchResponse.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> ids = result.<span class="hljs-built_in">Ids</span>().<span class="hljs-built_in">IntIDArray</span>();
    <span class="hljs-keyword">for</span> (<span class="hljs-type">size_t</span> i = <span class="hljs-number">0</span>; i &lt; result.<span class="hljs-built_in">Scores</span>().<span class="hljs-built_in">size</span>(); ++i) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;id=&quot;</span> &lt;&lt; ids[i] &lt;&lt; <span class="hljs-string">&quot;, score=&quot;</span> &lt;&lt; result.<span class="hljs-built_in">Scores</span>()[i] &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Example-4-Grouping-search-using-primary-keys" class="common-anchor-header">Example 4: Grouping search using primary keys<button data-href="#Example-4-Grouping-search-using-primary-keys" class="anchor-icon" translate="no">
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
    </button></h3><p>The following example assumes <code translate="no">docId</code> is a schema-defined fields in the target collection.</p>
<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>
<pre><code translate="no" class="language-python">res = client.search(
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    ids=[<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>],</span>
    limit=<span class="hljs-number">3</span>,
    group_by_field=<span class="hljs-string">&quot;docId&quot;</span>,
    output_fields=[<span class="hljs-string">&quot;docId&quot;</span>]
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// java</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,
<span class="highlighted-comment-line">    <span class="hljs-attr">ids</span>: [<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>],</span>
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">group_by_field</span>: <span class="hljs-string">&quot;docId&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;docId&quot;</span>],
});

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="highlighted-comment-line">ids := column.NewColumnInt64(<span class="hljs-string">&quot;id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>})</span>
resultSets, err := client.Search(ctx, milvusclient.NewSearchByIDsOption(
    <span class="hljs-string">&quot;my_collection&quot;</span>, <span class="hljs-comment">// collectionName</span>
    <span class="hljs-number">3</span>,               <span class="hljs-comment">// limit</span>
    ids,
).WithGroupByField(<span class="hljs-string">&quot;docId&quot;</span>).
    WithOutputFields(<span class="hljs-string">&quot;docId&quot;</span>))
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    fmt.Println(err.Error())
    <span class="hljs-comment">// handle error</span>
}

<span class="hljs-keyword">for</span> _, resultSet := <span class="hljs-keyword">range</span> resultSets {
    fmt.Println(<span class="hljs-string">&quot;IDs: &quot;</span>, resultSet.IDs)
    fmt.Println(<span class="hljs-string">&quot;Scores: &quot;</span>, resultSet.Scores)
    fmt.Println(<span class="hljs-string">&quot;docId: &quot;</span>, resultSet.GetColumn(<span class="hljs-string">&quot;docId&quot;</span>))
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-bash"><span class="hljs-comment"># restful</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-cpp"><span class="hljs-keyword">auto</span> searchRequest = milvus::<span class="hljs-built_in">SearchRequest</span>()
                         .<span class="hljs-built_in">WithCollectionName</span>(<span class="hljs-string">&quot;my_collection&quot;</span>)
                         .<span class="hljs-built_in">WithAnnsField</span>(<span class="hljs-string">&quot;vector&quot;</span>)
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithIDs</span>({<span class="hljs-number">551</span>, <span class="hljs-number">296</span>, <span class="hljs-number">43</span>})</span>
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithGroupByField</span>(<span class="hljs-string">&quot;docId&quot;</span>)</span>
<span class="highlighted-comment-line">                         .<span class="hljs-built_in">WithOutputFields</span>({<span class="hljs-string">&quot;docId&quot;</span>})</span>
                         .<span class="hljs-built_in">WithLimit</span>(<span class="hljs-number">3</span>);

milvus::SearchResponse searchResponse;
<span class="hljs-keyword">auto</span> status = client-&gt;<span class="hljs-built_in">Search</span>(searchRequest, searchResponse);
<span class="hljs-keyword">if</span> (!status.<span class="hljs-built_in">IsOk</span>()) {
    std::cerr &lt;&lt; <span class="hljs-string">&quot;Search failed: &quot;</span> &lt;&lt; status.<span class="hljs-built_in">Message</span>() &lt;&lt; std::endl;
    <span class="hljs-keyword">return</span>;
}

<span class="hljs-keyword">for</span> (<span class="hljs-type">const</span> <span class="hljs-keyword">auto</span>&amp; result : searchResponse.<span class="hljs-built_in">Results</span>().<span class="hljs-built_in">Results</span>()) {
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> ids = result.<span class="hljs-built_in">Ids</span>().<span class="hljs-built_in">IntIDArray</span>();
    <span class="hljs-type">const</span> <span class="hljs-keyword">auto</span> docIds = result.<span class="hljs-built_in">OutputField</span>&lt;milvus::Int64FieldData&gt;(<span class="hljs-string">&quot;docId&quot;</span>);
    <span class="hljs-keyword">for</span> (<span class="hljs-type">size_t</span> i = <span class="hljs-number">0</span>; i &lt; result.<span class="hljs-built_in">Scores</span>().<span class="hljs-built_in">size</span>(); ++i) {
        std::cout &lt;&lt; <span class="hljs-string">&quot;id=&quot;</span> &lt;&lt; ids[i]
                  &lt;&lt; <span class="hljs-string">&quot;, score=&quot;</span> &lt;&lt; result.<span class="hljs-built_in">Scores</span>()[i]
                  &lt;&lt; <span class="hljs-string">&quot;, docId=&quot;</span> &lt;&lt; docIds-&gt;<span class="hljs-built_in">Data</span>()[i] &lt;&lt; std::endl;
    }
}
<button class="copy-code-btn"></button></code></pre>
