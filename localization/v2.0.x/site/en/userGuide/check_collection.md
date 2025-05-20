---
id: check_collection.md
related_key: collection
summary: Learn how to check collection information in Milvus.
title: ''
---
<h1 id="Check-Collection-Information" class="common-anchor-header">Check Collection Information<button data-href="#Check-Collection-Information" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to check the information of the collection in Milvus.</p>
<h2 id="Check-if-a-collection-exists" class="common-anchor-header">Check if a collection exists<button data-href="#Check-if-a-collection-exists" class="anchor-icon" translate="no">
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
    </button></h2><p>Verify if a collection exists in Milvus.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> utility
utility.<span class="hljs-title function_">has_collection</span>(<span class="hljs-string">&quot;book&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">collectionManager</span>.<span class="hljs-title function_">hasCollection</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;book&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">hasColl, err := milvusClient.HasCollection(
  context.Background(), <span class="hljs-comment">// ctx</span>
  collectionName,       <span class="hljs-comment">// CollectionName</span>
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
  log.Fatal(<span class="hljs-string">&quot;failed to check whether collection exists:&quot;</span>, err.Error())
}
log.Println(hasColl)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">R&lt;<span class="hljs-title class_">Boolean</span>&gt; respHasCollection = milvusClient.<span class="hljs-title function_">hasCollection</span>(
  <span class="hljs-title class_">HasCollectionParam</span>.<span class="hljs-title function_">newBuilder</span>()
    .<span class="hljs-title function_">withCollectionName</span>(<span class="hljs-string">&quot;book&quot;</span>)
    .<span class="hljs-title function_">build</span>()
);
<span class="hljs-keyword">if</span> (respHasCollection.<span class="hljs-title function_">getData</span>() == <span class="hljs-title class_">Boolean</span>.<span class="hljs-property">TRUE</span>) {
  <span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-string">&quot;Collection exists.&quot;</span>);
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">describe collection -c book
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
            <td><code translate="no">collection_name</code></td>
            <td>Name of the collection to check.</td>
        </tr>
    </tbody>
</table>
<table class="language-javascript">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">collection_name</code></td>
            <td>Name of the collection to check.</td>
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
            <td><code translate="no">CollectionName</code></td>
            <td>Name of the collection to check.</td>
        </tr>
    </tbody>
</table>
<table class="language-java">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">CollectionName</code></td>
            <td>Name of the collection to check.</td>
        </tr>
    </tbody>
</table>
<table class="language-shell">
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c</td>
            <td>Name of the collection to check.</td>
        </tr>
    </tbody>
</table>
<h2 id="Check-collection-details" class="common-anchor-header">Check collection details<button data-href="#Check-collection-details" class="anchor-icon" translate="no">
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
    </button></h2><p>Check the details of a collection.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection
collection = Collection(<span class="hljs-string">&quot;book&quot;</span>)  <span class="hljs-comment"># Get an existing collection.</span>

collection.schema                <span class="hljs-comment"># Return the schema.CollectionSchema of the collection.</span>
collection.description           <span class="hljs-comment"># Return the description of the collection.</span>
collection.name                  <span class="hljs-comment"># Return the name of the collection.</span>
collection.is_empty              <span class="hljs-comment"># Return the boolean value that indicates if the collection is empty.</span>
collection.num_entities          <span class="hljs-comment"># Return the number of entities in the collection.</span>
collection.primary_field         <span class="hljs-comment"># Return the schema.FieldSchema of the primary key field.</span>
collection.partitions            <span class="hljs-comment"># Return the list[Partition] object.</span>
collection.indexes               <span class="hljs-comment"># Return the list[Index] object.</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">collectionManager</span>.<span class="hljs-title function_">describeCollection</span>({          <span class="hljs-comment">// Return the name and schema of the collection.</span>
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;book&quot;</span>,
});

<span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">collectionManager</span>.<span class="hljs-title function_">getCollectionStatistics</span>({     <span class="hljs-comment">// Return the statistics information of the collection.</span>
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;book&quot;</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">collDesc, err := milvusClient.DescribeCollection(               <span class="hljs-comment">// Return the name and schema of the collection.</span>
  context.Background(),   <span class="hljs-comment">// ctx</span>
  <span class="hljs-string">&quot;book&quot;</span>,                 <span class="hljs-comment">// CollectionName</span>
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
  log.Fatal(<span class="hljs-string">&quot;failed to check collection schema:&quot;</span>, err.Error())
}
log.Printf(<span class="hljs-string">&quot;%v\n&quot;</span>, collDesc)

collStat, err := milvusClient.GetCollectionStatistics(          <span class="hljs-comment">// Return the statistics information of the collection.</span>
  context.Background(),   <span class="hljs-comment">// ctx</span>
  <span class="hljs-string">&quot;book&quot;</span>,                 <span class="hljs-comment">// CollectionName</span>
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
  log.Fatal(<span class="hljs-string">&quot;failed to check collection statistics:&quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">R&lt;DescribeCollectionResponse&gt; respDescribeCollection = milvusClient.describeCollection(
  <span class="hljs-comment">// Return the name and schema of the collection.</span>
  DescribeCollectionParam.newBuilder()
    .withCollectionName(<span class="hljs-string">&quot;book&quot;</span>)
    .build()
);
<span class="hljs-type">DescCollResponseWrapper</span> <span class="hljs-variable">wrapperDescribeCollection</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">DescCollResponseWrapper</span>(respDescribeCollection.getData());
System.out.println(wrapperDescribeCollection);

R&lt;GetCollectionStatisticsResponse&gt; respCollectionStatistics = milvusClient.getCollectionStatistics(
  <span class="hljs-comment">// Return the statistics information of the collection.</span>
  GetCollectionStatisticsParam.newBuilder()
    .withCollectionName(<span class="hljs-string">&quot;book&quot;</span>)
    .build()
  );
<span class="hljs-type">GetCollStatResponseWrapper</span> <span class="hljs-variable">wrapperCollectionStatistics</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">GetCollStatResponseWrapper</span>(respCollectionStatistics.getData());
System.out.println(<span class="hljs-string">&quot;Collection row count: &quot;</span> + wrapperCollectionStatistics.getRowCount());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">describe collection -c book
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
            <td>schema</td>
            <td>The schema of the collection.</td>
        </tr>
        <tr>
            <td>description</td>
            <td>The description of the collection.</td>
        </tr>
        <tr>
            <td>name</td>
            <td>The name of the collection.</td>
        </tr>
        <tr>
            <td>is_empty</td>
            <td>A boolean value that indicates whether the collection is empty.</td>
        </tr>
        <tr>
            <td>num_entities</td>
            <td>The number of entities in the collection.</td>
        </tr>
        <tr>
            <td>primary_field</td>
            <td>The primary field of the collection.</td>
        </tr>
    </tbody>
</table>
<table class="language-javascript">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">collection_name</code></td>
            <td>Name of the collection to check.</td>
        </tr>
    </tbody>
</table>
<table class="language-go">
    <thead>
        <tr>
            <th>Parameter</th>
        <th>Description</th>
    </tr>
    <tr>
            <td><code translate="no">ctx</code></td>
            <td>Context to control API invocation process.</td>
        </tr>
        <tr>
            <td><code translate="no">CollectionName</code></td>
            <td>Name of the collection to check.</td>
        </tr>
    </tbody>
</table>
<table class="language-java">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">CollectionName</code></td>
            <td>Name of the collection to check.</td>
        </tr>
    </tbody>
</table>
<table class="language-shell">
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c</td>
            <td>Name of the collection to check.</td>
        </tr>
    </tbody>
</table>
<h2 id="List-all-collections" class="common-anchor-header">List all collections<button data-href="#List-all-collections" class="anchor-icon" translate="no">
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
    </button></h2><p>List all collections in this Milvus Instance.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> utility
utility.<span class="hljs-title function_">list_collections</span>()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> milvusClient.<span class="hljs-property">collectionManager</span>.<span class="hljs-title function_">showCollections</span>();
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">listColl, err := milvusClient.ListCollections(
  context.Background(),   <span class="hljs-comment">// ctx</span>
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
  log.Fatal(<span class="hljs-string">&quot;failed to list all collections:&quot;</span>, err.Error())
}
log.Println(listColl)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">R&lt;ShowCollectionsResponse&gt; respShowCollections = milvusClient.showCollections(
    ShowCollectionsParam.newBuilder().build()
  );
System.out.<span class="hljs-built_in">println</span>(respShowCollections);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">list collections
<button class="copy-code-btn"></button></code></pre>
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
<li>Learn more basic operations of Milvus:
<ul>
<li><a href="/docs/v2.0.x/insert_data.md">Insert data into Milvus</a></li>
<li><a href="/docs/v2.0.x/create_partition.md">Create a partition</a></li>
<li><a href="/docs/v2.0.x/build_index.md">Build an index for vectors</a></li>
<li><a href="/docs/v2.0.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.0.x/hybridsearch.md">Conduct a hybrid search</a></li>
</ul></li>
</ul>
