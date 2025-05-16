---
id: query.md
related_key: query vectors
summary: Learn how to query vectors in Milvus.
title: ''
---
<h1 id="Conduct-a-Vector-Query" class="common-anchor-header">Conduct a Vector Query<button data-href="#Conduct-a-Vector-Query" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to conduct a vector query.</p>
<p>Unlike a vector similarity search, a vector query retrieves vectors via scalar filtering based on <a href="/docs/v2.2.x/boolean.md">boolean expression</a>. Milvus supports many data types in the scalar fields and a variety of boolean expressions. The boolean expression filters on scalar fields or the primary key field, and it retrieves all results that match the filters.</p>
<p>The following example shows how to perform a vector query on a 2000-row dataset of book ID (primary key), word count (scalar field), and book introduction (vector field), simulating the situation where you query for certain books based on their IDs.</p>
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
    </button></h2><p>All search and query operations within Milvus are executed in memory. Load the collection to memory before conducting a vector query.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#csharp">C#</a>
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
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> collection = milvusClient.<span class="hljs-title class_">GetCollection</span>(<span class="hljs-string">&quot;book&quot;</span>).<span class="hljs-title class_">LoadAsync</span>();
<button class="copy-code-btn"></button></code></pre>
<h2 id="Conduct-a-vector-query" class="common-anchor-header">Conduct a vector query<button data-href="#Conduct-a-vector-query" class="anchor-icon" translate="no">
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
    </button></h2><p>The following example filters the vectors with certain <code translate="no">book_id</code> values, and returns the <code translate="no">book_id</code> field and <code translate="no">book_intro</code> of the results.</p>
<p>Milvus supports setting consistency level specifically for a query. The example in this topic sets the consistency level as <code translate="no">Strong</code>. You can also set the consistency level as <code translate="no">Bounded</code>, <code translate="no">Session</code> or <code translate="no">Eventually</code>. See <a href="/docs/v2.2.x/consistency.md">Consistency</a> for more information about the four consistency levels in Milvus.</p>
<p>You can also use dynamic fields in the filter expression and output fields in the query requests. For example, refer to <a href="/docs/v2.2.x/dynamic_schema.md">Dynamic Schema</a>.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#csharp">C#</a>
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python">res = collection.query(
  <span class="hljs-built_in">expr</span> = <span class="hljs-string">&quot;book_id in [2,4,6,8]&quot;</span>,
  offset = 0,
  <span class="hljs-built_in">limit</span> = 10, 
  output_fields = [<span class="hljs-string">&quot;book_id&quot;</span>, <span class="hljs-string">&quot;book_intro&quot;</span>],
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">query</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;book&quot;</span>,
  <span class="hljs-attr">expr</span>: <span class="hljs-string">&quot;book_id in [2,4,6,8]&quot;</span>,
  <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;book_id&quot;</span>, <span class="hljs-string">&quot;book_intro&quot;</span>],
  <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">offset</span>: <span class="hljs-number">0</span>,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">opt := client.SearchQueryOptionFunc(<span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">(option *client.SearchQueryOption)</span></span> {
    option.Limit = <span class="hljs-number">3</span>
    option.Offset = <span class="hljs-number">0</span>
    option.ConsistencyLevel = entity.ClStrong
    option.IgnoreGrowing = <span class="hljs-literal">false</span>
})

queryResult, err := milvusClient.Query(
    context.Background(),                                   <span class="hljs-comment">// ctx</span>
    <span class="hljs-string">&quot;book&quot;</span>,                                                 <span class="hljs-comment">// CollectionName</span>
    <span class="hljs-string">&quot;&quot;</span>,                                                     <span class="hljs-comment">// PartitionName</span>
    entity.NewColumnInt64(<span class="hljs-string">&quot;book_id&quot;</span>, []<span class="hljs-type">int64</span>{<span class="hljs-number">2</span>,<span class="hljs-number">4</span>,<span class="hljs-number">6</span>,<span class="hljs-number">8</span>}),     <span class="hljs-comment">// expr</span>
    []<span class="hljs-type">string</span>{<span class="hljs-string">&quot;book_id&quot;</span>, <span class="hljs-string">&quot;book_intro&quot;</span>},                      <span class="hljs-comment">// OutputFields</span>
    opt,                                                    <span class="hljs-comment">// queryOptions</span>
)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;fail to query collection:&quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">String</span>&gt; query_output_fields = <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;book_id&quot;</span>, <span class="hljs-string">&quot;word_count&quot;</span>);
<span class="hljs-title class_">QueryParam</span> queryParam = <span class="hljs-title class_">QueryParam</span>.<span class="hljs-title function_">newBuilder</span>()
  .<span class="hljs-title function_">withCollectionName</span>(<span class="hljs-string">&quot;book&quot;</span>)
  .<span class="hljs-title function_">withConsistencyLevel</span>(<span class="hljs-title class_">ConsistencyLevelEnum</span>.<span class="hljs-property">STRONG</span>)
  .<span class="hljs-title function_">withExpr</span>(<span class="hljs-string">&quot;book_id in [2,4,6,8]&quot;</span>)
  .<span class="hljs-title function_">withOutFields</span>(query_output_fields)
  .<span class="hljs-title function_">withOffset</span>(0L)
  .<span class="hljs-title function_">withLimit</span>(10L)
  .<span class="hljs-title function_">build</span>();
R&lt;<span class="hljs-title class_">QueryResults</span>&gt; respQuery = milvusClient.<span class="hljs-title function_">query</span>(queryParam);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-csharp"><span class="hljs-keyword">var</span> results = <span class="hljs-keyword">await</span> <span class="hljs-title class_">Client</span>.<span class="hljs-title class_">GetCollection</span>(<span class="hljs-string">&quot;book&quot;</span>).<span class="hljs-title class_">QueryAsync</span>(
    <span class="hljs-attr">expression</span>: <span class="hljs-string">&quot;book_id in [2,4,6,8]&quot;</span>,
    <span class="hljs-keyword">new</span> <span class="hljs-title class_">QueryParameters</span>
    {
        <span class="hljs-title class_">Offset</span> = <span class="hljs-number">0</span>,
        <span class="hljs-title class_">Limit</span> = <span class="hljs-number">10</span>,
        <span class="hljs-title class_">OutputFields</span> = { <span class="hljs-string">&quot;book_id&quot;</span>, <span class="hljs-string">&quot;book_intro&quot;</span> }
    });
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \
     --url <span class="hljs-string">&#x27;${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/query&#x27;</span> \
     --header <span class="hljs-string">&#x27;Authorization: Bearer &lt;TOKEN&gt;&#x27;</span> \
     --header <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
     --header <span class="hljs-string">&#x27;content-type: application/json&#x27;</span>
     -d <span class="hljs-string">&#x27;{
       &quot;collectionName&quot;: &quot;collection1&quot;,
       &quot;outputFields&quot;: [&quot;id&quot;, &quot;name&quot;, &quot;feature&quot;, &quot;distance&quot;],
       &quot;filter&quot;: &quot;id in (1, 2, 3)&quot;,
       &quot;limit&quot;: 100,
       &quot;offset&quot;: 0
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-curl">
Output:
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
    <span class="hljs-string">&quot;data&quot;</span>: {}
}
<button class="copy-code-btn"></button></code></pre>
</div>
<table class="language-python">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">expr</code></td>
        <td>Boolean expression used to filter attribute. Find more expression details in <a href="/docs/v2.2.x/boolean.md">Boolean Expression Rules</a>.</td>
    </tr>
    <tr>
        <td><code translate="no">limit</code></td>
        <td>Number of the most similar results to return. The sum of this value and <code translate="no">offset</code> should be less than 16384.</td>
    </tr>
    <tr>
        <td><code translate="no">offset</code></td>
        <td>Number of results to skip in the returned set. This parameter is available only when <code translate="no">limit</code> is specified, and the sum of this value and <code translate="no">limit</code> should be less than 16384.</td>
    </tr>
    <tr>
        <td><code translate="no">output_fields</code> (optional)</td>
        <td>List of names of the field to return.</td>
    </tr>
    <tr>
        <td><code translate="no">partition_names</code> (optional)</td>
        <td>List of names of the partitions to query on.</td>
    </tr>
    <tr>
        <td><code translate="no">consistency_level</code> (optional)</td>
        <td>Consistency level of the query.</td>
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
        <td>Name of the collection to query.</td>
    </tr>
    <tr>
        <td><code translate="no">expr</code></td>
        <td>Boolean expression used to filter attribute. Find more expression details in <a href="/docs/v2.2.x/boolean.md">Boolean Expression Rules</a>.</td>
    </tr>
    <tr>
        <td><code translate="no">output_fields</code> (optional)</td>
        <td>List of names of the field to return.</td>
    </tr>
    <tr>
        <td><code translate="no">limit</code> (optional)</td>
        <td>Number of the most similar results to return. The sum of this value and <code translate="no">offset</code> should be less than 16384.</td>
    </tr>
    <tr>
        <td><code translate="no">offset</code> (optional)</td>
        <td>Number of results to skip in the returned set. This parameter is available only when <code translate="no">limit</code> is specified, and the sum of this value and <code translate="no">limit</code> should be less than 16384.</td>
    </tr>
    </tbody>
</table>
<table class="language-go">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    <th>Options</th>
    </tr>
    </thead>
    <tbody>
  <tr>
    <td><code translate="no">ctx</code></td>
    <td>Context to control API invocation process.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><code translate="no">CollectionName</code></td>
    <td>Name of the collection to query.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><code translate="no">partitionName</code></td>
    <td>List of names of the partitions to load. All partitions will be queried if it is left empty.</td>
    <td>N/A</td>
  </tr>
  <tr>
        <td><code translate="no">expr</code></td>
        <td>Boolean expression used to filter attribute.</td>
    <td>See <a href="/docs/v2.2.x/boolean.md">Boolean Expression Rules</a> for more information.</td>
    </tr>
    <tr>
        <td><code translate="no">OutputFields</code></td>
        <td>Name of the field to return.</td>
        <td>Vector field is not supported in current release.</td>
    </tr>
    <tr>
        <td><code translate="no">opts</code></td>
        <td>Query options in the form of <code translate="no">entity.SearchQueryOptionFunc</code>.</td>
        <td><ul>
            <li><code translate="no">Limit</code> Indicates the number of entities to return.</li>
            <li><code translate="no">Offset</code> Indicates the number of entities to skip during the search. The sum of this parameter and <code translate="no">Limit</code> should be less than <code translate="no">16384</code>.</li>
            <li><code translate="no">ConsistencyLevel</code> Indicates the consistency level applied during the search.</li>
            <li><code translate="no">Ignore Growing</code> Indicates whether to ignore growing segments during similarity searches. The value defaults to <code translate="no">False</code>, indicating that searches involve growing segments. </li>
        </ul></td>
    </tr>
    </tbody>
</table>
<table class="language-java">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    <th>Options</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td><code translate="no">CollectionName</code></td>
    <td>Name of the collection to load.</td>
    <td>N/A</td>
  </tr>
  <tr>
        <td><code translate="no">OutFields</code></td>
        <td>Name of the field to return.</td>
    <td>Vector field is not supported in current release.</td>
    </tr>
  <tr>
        <td><code translate="no">Expr</code></td>
        <td>Boolean expression used to filter attribute.</td>
    <td>See <a href="/docs/v2.2.x/boolean.md">Boolean Expression Rules</a> for more information.</td>
    </tr>
    <tr>
        <td><code translate="no">Limit</code> (optional)</td>
        <td>Number of the most similar results to return. The sum of this value and <code translate="no">offset</code> in <code translate="no">WithOffset()</code> should be less than 16384.</td>
    </tr>
    <tr>
        <td><code translate="no">Offset</code> (optional)</td>
        <td>Number of results to skip in the returned set. This parameter is available only when <code translate="no">limit</code> is specified, and the sum of this value and <code translate="no">limit</code> in <code translate="no">WithLimit()</code> should be less than 16384.</td>
    </tr>
  <tr>
        <td><code translate="no">ConsistencyLevel</code></td>
        <td>The consistency level used in the query.</td>
      <td><code translate="no">STRONG</code>, <code translate="no">BOUNDED</code>, and<code translate="no">EVENTUALLY</code>.</td>
    </tr>
    </tbody>
</table>
<table class="language-csharp">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>expression</td>
            <td>Boolean expression used to filter attribute. See <a href="/docs/v2.2.x/boolean.md">Boolean Expression Rules</a> for more information.</td>
        </tr>
        <tr>
            <td>parameters</td>
            <td>Query parameters. Possible options are: <ul>
                <li><code translate="no">OutputFields</code>: A dictionary of the fields in the search results.</li>
                <li><code translate="no">Offset</code>: Number of records to skip before return. The sum of this value and <code translate="no">Limit</code> should be less than <code translate="no">16384</code>.</li>
                <li><code translate="no">Limit</code>: Number of records to return. The sum of this value and <code translate="no">Offset</code> should be less than <code translate="no">16384</code>.</li>
            </ul></td>
        </tr>
    </tbody>
</table>
<table class="language-curl">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td><code translate="no">collectionName</code></td>
        <td>(Required) The name of the collection to which this operation applies.</td>
    </tr>
    <tr>
        <td><code translate="no">filter</code></td>
        <td>The filter used to find matches for the search</td>
    </tr>
    <tr>
        <td><code translate="no">limit</code></td>
        <td>The maximum number of entities to return.<br>The sum of this value of that of `offset` should be less than **1024**.<br>The value defaults to <code translate="no">100</code>.<br>The value ranges from <code translate="no">1</code> to <code translate="no">100</code></td>
    </tr>
    <tr>
        <td><code translate="no">offset</code></td>
        <td>The number of entities to skip in the search results.<br>The sum of this value and that of `limit` should not be greater than <code translate="no">1024</code>.<br>The maximum value is <code translate="no">1024</code>.</td>
    </tr>
    <tr>
        <td><code translate="no">outputFields</code></td>
        <td>An array of fields to return along with the search results.</td>
    </tr>
    </tbody>
</table>
<p>Check the returned results.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python">sorted_res = <span class="hljs-built_in">sorted</span>(res, key=<span class="hljs-keyword">lambda</span> k: k[<span class="hljs-string">&#x27;book_id&#x27;</span>])
sorted_res
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(results.<span class="hljs-property">data</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">fmt.Printf(<span class="hljs-string">&quot;%#v\n&quot;</span>, queryResult)
<span class="hljs-keyword">for</span> _, qr := <span class="hljs-keyword">range</span> queryResult {
    fmt.Println(qr.IDs)
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">QueryResultsWrapper wrapperQuery = <span class="hljs-built_in">new</span> QueryResultsWrapper(respQuery.getData());
System.out.<span class="hljs-built_in">println</span>(wrapperQuery.getFieldWrapper(<span class="hljs-string">&quot;book_id&quot;</span>).getFieldData());
System.out.<span class="hljs-built_in">println</span>(wrapperQuery.getFieldWrapper(<span class="hljs-string">&quot;word_count&quot;</span>).getFieldData());
<button class="copy-code-btn"></button></code></pre>
<div style="display:none;">
```shell
# Milvus CLI automatically returns the entities with the pre-defined output fields.
```
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># See the output of the previous step.</span>
<button class="copy-code-btn"></button></code></pre>
</div>
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
<li><p>Learn more basic operations of Milvus:</p>
<ul>
<li><a href="/docs/v2.2.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.2.x/hybridsearch.md">Conduct a hybrid search</a></li>
<li><a href="/docs/v2.2.x/timetravel.md">Search with Time Travel</a></li>
</ul></li>
<li><p>Explore API references for Milvus SDKs:</p>
<ul>
<li><a href="/api-reference/pymilvus/v2.2.x/About.md">PyMilvus API reference</a></li>
<li><a href="/api-reference/node/v2.2.x/About.md">Node.js API reference</a></li>
<li><a href="/api-reference/go/v2.2.x/About.md">Go API reference</a></li>
<li><a href="/api-reference/java/v2.2.x/About.md">Java API reference</a></li>
</ul></li>
</ul>
