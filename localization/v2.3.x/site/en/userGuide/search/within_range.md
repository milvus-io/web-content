---
id: within_range.md
label: Range Search
related_key: Within Range
order: 2
group: search.md
summary: Learn how to conduct a range search.
title: Conduct a Range Search
---
<div class="tab-wrapper"><a href="/docs/v2.3.x/search.md" class=''>Vector Similarity Search</a><a href="/docs/v2.3.x/hybridsearch.md" class=''>Hybrid Search</a><a href="/docs/v2.3.x/within_range.md" class='active '>Range Search</a></div>
<h1 id="Conduct-a-Range-Search" class="common-anchor-header">Conduct a Range Search<button data-href="#Conduct-a-Range-Search" class="anchor-icon" translate="no">
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
    </button></h1><p>Understanding how to filter your search results by the proximity of entities is crucial in vector database operations. A range search serves this exact purpose by narrowing down results according to the distance between a query vector and database vectors. This guide will walk you through the process of conducting a range search in Milvus, which consists of a vector similarity search followed by distance-based filtering.</p>
<h2 id="Quick-steps-for-a-range-search" class="common-anchor-header">Quick steps for a range search<button data-href="#Quick-steps-for-a-range-search" class="anchor-icon" translate="no">
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
<li><strong>Load your collection into memory</strong>: Initiate by ensuring your dataset is loaded and ready for search.</li>
<li><strong>Set your search parameters</strong>: Define <code translate="no">radius</code> and <code translate="no">range_filter</code> parameters to control your search precision.</li>
<li><strong>Execute the search</strong>: Perform the range search using the parameters set in step 2. We provide examples for <strong>L2 (Euclidean)</strong> and <strong>IP (Inner Product)</strong> distances.</li>
<li><strong>Review your results</strong>: The vectors returned will be within the range you specified, tailored to the distance metrics you have chosen.</li>
</ol>
<div class="alert note">
Milvus may return fewer results than your set <code translate="no">limit</code> if not enough vectors meet the specified distance criteria after range filtering.
</div>
<h2 id="Step-1-Load-collection" class="common-anchor-header">Step 1: Load collection<button data-href="#Step-1-Load-collection" class="anchor-icon" translate="no">
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
    </button></h2><p>Before anything else, make sure the collection is loaded into memory as Milvus operates in-memory for search and query functions.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#go">GO</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection
collection = Collection(<span class="hljs-string">&quot;book&quot;</span>)      <span class="hljs-comment"># Get an existing collection.</span>
collection.load()
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
<h2 id="Step-2-Configure-range-filtering" class="common-anchor-header">Step 2: Configure range filtering<button data-href="#Step-2-Configure-range-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>With Milvus, a range search is differentiated from a standard <a href="/docs/v2.3.x/search.md">vector search</a> by two key parameters:</p>
<ul>
<li><code translate="no">radius</code>: Determines the threshold of least similarity.</li>
<li><code translate="no">range_filter</code>: Optionally refines the search to vectors within a specific similarity range.</li>
</ul>
<p>These parameters are of the <code translate="no">FLOAT</code> type and are pivotal in balancing accuracy and search efficiency.</p>
<h3 id="Distance-metrics-influence" class="common-anchor-header">Distance metrics influence</h3><ul>
<li><p><strong>L2</strong> distance: Filters vectors less distant than <code translate="no">radius</code>, since smaller L2 distances indicate higher similarity. To exclude the closest vectors from results, set <code translate="no">range_filter</code> less than <code translate="no">radius</code>.</p>
  <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#go">GO</a>
  </div>
<pre><code translate="no" class="language-python">param = {
    <span class="hljs-comment"># use `L2` as the metric to calculate the distance</span>
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-comment"># search for vectors with a distance smaller than 1.0</span>
        <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">1.0</span>,
        <span class="hljs-comment"># filter out vectors with a distance smaller than or equal to 0.8</span>
        <span class="hljs-string">&quot;range_filter&quot;</span> : <span class="hljs-number">0.8</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">fmt.Printf(msgFmt, <span class="hljs-string">&quot;start creating index IVF_FLAT&quot;</span>)
idx, err := entity.NewIndexIvfFlat(entity.L2, <span class="hljs-number">2</span>)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatalf(<span class="hljs-string">&quot;failed to create ivf flat index, err: %v&quot;</span>, err)
}
<span class="hljs-keyword">if</span> err := c.CreateIndex(ctx, collectionName, <span class="hljs-string">&quot;embeddings&quot;</span>, idx, <span class="hljs-literal">false</span>); err != <span class="hljs-literal">nil</span> {
        log.Fatalf(<span class="hljs-string">&quot;failed to create index, err: %v&quot;</span>, err)
}
sp.AddRadius(<span class="hljs-number">1.0</span>)
sp.AddRangeFilter(<span class="hljs-number">0.8</span>)
<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>IP</strong> distance: Filters vectors more distant than <code translate="no">radius</code>, since larger IP distances indicate higher similarity. Here, <code translate="no">range_filter</code> should be greater than <code translate="no">radius</code> to exclude the most similar vectors.</p>
  <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#go">GO</a>
  </div>
<pre><code translate="no" class="language-python">param = {
    <span class="hljs-comment"># use `IP` as the metric to calculate the distance</span>
    <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-string">&quot;params&quot;</span>: {
        <span class="hljs-comment"># search for vectors with a distance greater than 0.8</span>
        <span class="hljs-string">&quot;radius&quot;</span>: <span class="hljs-number">0.8</span>,
        <span class="hljs-comment"># filter out most similar vectors with a distance greater than or equal to 1.0</span>
        <span class="hljs-string">&quot;range_filter&quot;</span> : <span class="hljs-number">1.0</span>
    }
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">fmt.Printf(msgFmt, <span class="hljs-string">&quot;start creating index IVF_FLAT&quot;</span>)
idx, err := entity.NewIndexIvfFlat(entity.IP, <span class="hljs-number">2</span>)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatalf(<span class="hljs-string">&quot;failed to create ivf flat index, err: %v&quot;</span>, err)
}
<span class="hljs-keyword">if</span> err := c.CreateIndex(ctx, collectionName, <span class="hljs-string">&quot;embeddings&quot;</span>, idx, <span class="hljs-literal">false</span>); err != <span class="hljs-literal">nil</span> {
        log.Fatalf(<span class="hljs-string">&quot;failed to create index, err: %v&quot;</span>, err)
}
sp.AddRadius(<span class="hljs-number">0.8</span>)
sp.AddRangeFilter(<span class="hljs-number">1.0</span>)
<button class="copy-code-btn"></button></code></pre></li>
</ul>
<h2 id="Step-3-Execute-the-range-search" class="common-anchor-header">Step 3: Execute the range search<button data-href="#Step-3-Execute-the-range-search" class="anchor-icon" translate="no">
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
    </button></h2><p>For an <strong>L2</strong> distance range search, get vectors within a similarity range of <strong>0.8</strong> to <strong>1.0</strong>:</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#go">GO</a>
</div>
<pre><code translate="no" class="language-python">res = collection.search(
    data=[[<span class="hljs-number">0.3785311281681061</span>,<span class="hljs-number">0.2960498034954071</span>]], <span class="hljs-comment"># query vector</span>
    anns_field=<span class="hljs-string">&#x27;book_intro&#x27;</span>, <span class="hljs-comment"># vector field name</span>
    param=param, <span class="hljs-comment"># search parameters defined in step 2</span>
    limit=<span class="hljs-number">5</span> <span class="hljs-comment"># number of results to return</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [&quot;[&#x27;id: 494, distance: 0.8085046410560608, entity: {}&#x27;, &#x27;id: 108, distance: 0.8211717009544373, entity: {}&#x27;, &#x27;id: 1387, distance: 0.8252214789390564, entity: {}&#x27;]&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">fmt.Printf(msgFmt, <span class="hljs-string">&quot;start searcching based on vector similarity&quot;</span>)
    vec2search := []entity.Vector{
        entity.FloatVector(embeddingList[<span class="hljs-built_in">len</span>(embeddingList)<span class="hljs-number">-2</span>]),
        entity.FloatVector(embeddingList[<span class="hljs-built_in">len</span>(embeddingList)<span class="hljs-number">-1</span>]),
    }
    begin := time.Now()
    sp, _ := entity.NewIndexIvfFlatSearchParam(<span class="hljs-number">16</span>)
    sp.AddRadius(<span class="hljs-number">1.0</span>)
    sp.AddRangeFilter(<span class="hljs-number">0.8</span>)
    sRet, err := c.Search(ctx, collectionName, <span class="hljs-literal">nil</span>, <span class="hljs-string">&quot;&quot;</span>, []<span class="hljs-type">string</span>{randomCol}, vec2search,
        embeddingCol, entity.L2, topK, sp)
    end := time.Now()
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatalf(<span class="hljs-string">&quot;failed to search collection, err: %v&quot;</span>, err)
    }
<button class="copy-code-btn"></button></code></pre>
<p>For an <strong>IP</strong> distance range search, get vectors within a similarity range of <strong>1.0</strong> to <strong>0.8</strong>:</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#go">GO</a>
</div>
<pre><code translate="no" class="language-python">res = collection.search(
    data=[[<span class="hljs-number">0.8280364871025085</span>,<span class="hljs-number">0.957599937915802</span>]], <span class="hljs-comment"># query vector</span>
    anns_field=<span class="hljs-string">&#x27;book_intro&#x27;</span>, <span class="hljs-comment"># vector field name</span>
    param=param, <span class="hljs-comment"># search parameters defined in step 2</span>
    limit=<span class="hljs-number">5</span> <span class="hljs-comment"># number of results to return</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output:</span>
<span class="hljs-comment"># [&quot;[&#x27;id: 455, distance: 0.9997385740280151, entity: {}&#x27;, &#x27;id: 1908, distance: 0.9995749592781067, entity: {}&#x27;, &#x27;id: 262, distance: 0.9994202852249146, entity: {}&#x27;, &#x27;id: 1475, distance: 0.9993369579315186, entity: {}&#x27;, &#x27;id: 1536, distance: 0.999295175075531, entity: {}&#x27;]&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">fmt.Printf(msgFmt, <span class="hljs-string">&quot;start searcching based on vector similarity&quot;</span>)
    vec2search := []entity.Vector{
        entity.FloatVector(embeddingList[<span class="hljs-built_in">len</span>(embeddingList)<span class="hljs-number">-2</span>]),
        entity.FloatVector(embeddingList[<span class="hljs-built_in">len</span>(embeddingList)<span class="hljs-number">-1</span>]),
    }
    begin := time.Now()
    sp, _ := entity.NewIndexIvfFlatSearchParam(<span class="hljs-number">16</span>)
    sp.AddRadius(<span class="hljs-number">0.8</span>)
    sp.AddRangeFilter(<span class="hljs-number">1.0</span>)
    sRet, err := c.Search(ctx, collectionName, <span class="hljs-literal">nil</span>, <span class="hljs-string">&quot;&quot;</span>, []<span class="hljs-type">string</span>{randomCol}, vec2search,
        embeddingCol, entity.IP, topK, sp)
    end := time.Now()
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatalf(<span class="hljs-string">&quot;failed to search collection, err: %v&quot;</span>, err)
    }
<button class="copy-code-btn"></button></code></pre>
<h2 id="Conclusion" class="common-anchor-header">Conclusion<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus returns vectors that fit within the specified range based on your <code translate="no">radius</code> and <code translate="no">range_filter</code> settings. Below is a quick reference table summarizing how different distance metrics affect these settings:</p>
<table>
<thead>
<tr><th>Metric Type</th><th>Configuration</th></tr>
</thead>
<tbody>
<tr><td>L2 and other</td><td><code translate="no">range_filter</code> &lt;= distance &lt; <code translate="no">radius</code></td></tr>
<tr><td>IP and cosine</td><td><code translate="no">radius</code> &lt; distance &lt;= <code translate="no">range_filter</code></td></tr>
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
