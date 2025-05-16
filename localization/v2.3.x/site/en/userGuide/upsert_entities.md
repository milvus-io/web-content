---
id: upsert_entities.md
related_key: upsert entities
title: Upsert Entities
summary: Learn how to upsert entities in Milvus.
---
<h1 id="Upsert-Entities" class="common-anchor-header">Upsert Entities<button data-href="#Upsert-Entities" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to upsert entities in Milvus.</p>
<p>Upserting is a combination of insert and delete operations. In the context of a Milvus vector database, an upsert is a data-level operation that will overwrite an existing entity if a specified field already exists in a collection, and insert a new entity if the specified value doesn’t already exist.</p>
<p>The following example upserts 3,000 rows of randomly generated data as the example data. When performing upsert operations, it’s important to note that the operation may compromise performance. This is because the operation involves deleting data during execution.</p>
<h2 id="Prepare-data" class="common-anchor-header">Prepare data<button data-href="#Prepare-data" class="anchor-icon" translate="no">
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
    </button></h2><p>First, prepare the data to upsert.  The type of data to upsert must match the schema of the collection, otherwise Milvus will raise an exception.</p>
<p>Milvus supports default values for scalar fields, excluding a primary key field. This indicates that some fields can be left empty during data inserts or upserts. For more information, refer to <a href="/docs/v2.3.x/create_collection.md#prepare-schema">Create a Collection</a>.</p>
<div class="alert note">
<p>When interacting with Milvus using Python code, you have the flexibility to choose between PyMilvus and MilvusClient (new). For more information, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.3.x/About.md">Python SDK</a>.</p>
</div>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#go">GO</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Generate data to upsert</span>
<span class="hljs-keyword">import</span> random
nb = <span class="hljs-number">3000</span>
dim = <span class="hljs-number">8</span>
vectors = [[random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(dim)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)]
data = [
    [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    [<span class="hljs-built_in">str</span>(i) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)],
    [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10000</span>, <span class="hljs-number">10000</span>+nb)],
    vectors,
    [<span class="hljs-built_in">str</span>(<span class="hljs-string">&quot;dy&quot;</span>*i) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(nb)]
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">nEntities:= <span class="hljs-number">3000</span>
dim:= <span class="hljs-number">8</span>
idList:= <span class="hljs-built_in">make</span>([]<span class="hljs-type">int64</span>, <span class="hljs-number">0</span>, nEntities)
randomList:= <span class="hljs-built_in">make</span>([]<span class="hljs-type">float64</span>, <span class="hljs-number">0</span>, nEntities)
embeddingList := <span class="hljs-built_in">make</span>([][]<span class="hljs-type">float32</span>, <span class="hljs-number">0</span>, nEntities)

<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; nEntities; i++ {
    idList = <span class="hljs-built_in">append</span>(idList, <span class="hljs-type">int64</span>(i))
}
    
<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; nEntities; i++ {
    randomList = <span class="hljs-built_in">append</span>(randomList, rand.Float64())
}
  
<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; nEntities; i++ {
    vec := <span class="hljs-built_in">make</span>([]<span class="hljs-type">float32</span>, <span class="hljs-number">0</span>, dim)
<span class="hljs-keyword">for</span> j := <span class="hljs-number">0</span>; j &lt; dim; j++ {
        vec = <span class="hljs-built_in">append</span>(vec, rand.Float32())
    }
    embeddingList = <span class="hljs-built_in">append</span>(embeddingList, vec)
}
idColData := entity.NewColumnInt64(<span class="hljs-string">&quot;ID&quot;</span>, idList)
randomColData := entity.NewColumnDouble(<span class="hljs-string">&quot;random&quot;</span>, randomList)
embeddingColData := entity.NewColumnFloatVector(<span class="hljs-string">&quot;embeddings&quot;</span>, dim, embeddingList)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Upsert-data" class="common-anchor-header">Upsert data<button data-href="#Upsert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Upsert the data to the collection.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#go">GO</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection
collection = Collection(<span class="hljs-string">&quot;book&quot;</span>) <span class="hljs-comment"># Get an existing collection.</span>
mr = collection.upsert(data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-keyword">if</span> _, err := c.Upsert(ctx, collectionName, <span class="hljs-string">&quot;&quot;</span>, idColData, embeddingColData);
err != <span class="hljs-literal">nil</span> {
        log.Fatalf(<span class="hljs-string">&quot;failed to upsert data, err: %v&quot;</span>, err)
}
<button class="copy-code-btn"></button></code></pre>
<table class="language-python">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">data</code></td>
        <td>Data to upsert into Milvus.</td>
    </tr>
    <tr>
        <td><code translate="no">partition_name</code> (optional)</td>
        <td>Name of the partition to upsert data into.</td>
    </tr>
    <tr>
        <td><code translate="no">timeout</code> (optional)</td>
        <td>An optional duration of time in seconds to allow for the RPC. If it is set to None, the client keeps waiting until the server responds or error occurs.</td>
    </tr>
    </tbody>
</table>
<table class="language-go">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">ctx</code></td>
        <td>Context to control API invocation process.</td>
    </tr>
    <tr>
        <td><code translate="no">collectionName</code></td>
        <td>Name of the collection to upsert data into.</td>
    </tr>
    <tr>
        <td><code translate="no">partitionName</code></td>
        <td>Name of the partition to upsert data into. Data will be upserted in the default partition if left blank.</td>
    </tr>
    <tr>
        <td><code translate="no">idColData</code></td>
        <td>Data to upsert into each field.</td>
    </tr>
  </tbody>
</table>
<div class="alert note">
<p>After upserting entities into a collection that has previously been indexed, you do not need to re-index the collection, as Milvus will automatically create an index for the newly upserted data. For more information, refer to <a href="/docs/v2.3.x/product_faq.md#Can-indexes-be-created-after-inserting-vectors">Can indexes be created after inserting vectors?</a></p>
</div>
<h2 id="Flush-data" class="common-anchor-header">Flush data<button data-href="#Flush-data" class="anchor-icon" translate="no">
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
    </button></h2><p>When data is upserted into Milvus it is updated and inserted into segments. Segments have to reach a certain size to be sealed and indexed. Unsealed segments will be searched brute force. In order to avoid this with any remainder data, it is best to call <code translate="no">flush()</code>. The <code translate="no">flush()</code> call will seal any remaining segments and send them for indexing. It is important to only call this method at the end of an upsert session. Calling it too often will cause fragmented data that will need to be cleaned later on.</p>
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
<li>Updating primary key fields is not supported by <code translate="no">upsert()</code>.</li>
<li><code translate="no">upsert()</code> is not applicable and an error can occur if <code translate="no">autoID</code> is set to <code translate="no">True</code> for primary key fields.</li>
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
    </button></h2><p>Learn more basic operations of Milvus:</p>
<ul>
<li><a href="/docs/v2.3.x/build_index.md">Build an index for vectors</a></li>
<li><a href="/docs/v2.3.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.3.x/hybridsearch.md">Conduct a hybrid search</a></li>
</ul>
