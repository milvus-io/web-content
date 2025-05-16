---
id: insert_data.md
related_key: insert
summary: Learn how to insert data in Milvus.
title: Insert Entities
---
<h1 id="Insert-Entities" class="common-anchor-header">Insert Entities<button data-href="#Insert-Entities" class="anchor-icon" translate="no">
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
    </button></h1><p>This topic describes how to insert data in Milvus via client.</p>
<p>You can also migrate data to Milvus with <a href="/docs/v2.3.x/migrate_overview.md">MilvusDM</a>, an open-source tool designed specifically for importing and exporting data with Milvus.</p>
<p>Milvus 2.1 supports the <code translate="no">VARCHAR</code> data type on scalar fields. When building indexes for VARCHAR-type scalar fields, the default index type is dictionary tree.</p>
<p>The following example inserts 2,000 rows of randomly generated data as the example data (Milvus CLI example uses a pre-built, remote CSV file containing similar data). Real applications will likely use much higher dimensional vectors than the example. You can prepare your own data to replace the example.</p>
<div class="alert note">
<p>When interacting with Milvus using Python code, you have the flexibility to choose between PyMilvus and MilvusClient (new). For more information, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.3.x/About.md">Python SDK</a>.</p>
</div>
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
    </button></h2><p>First, prepare the data to insert.  Data type of the data to insert must match the schema of the collection, otherwise Milvus will raise an exception.</p>
<p>Milvus supports default values for scalar fields, excluding a primary key field. This indicates that some fields can be left empty during data inserts or upserts. For more information, refer to <a href="/docs/v2.3.x/create_collection.md#prepare-schema">Create a Collection</a>.</p>
<p>Once you enable dynamic schema, you can append dynamic fields in the data. For details, refer to <a href="/docs/v2.3.x/dynamic_schema.md">Dynamic Schema</a>.</p>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">Curl</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random
data = [
  [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">2000</span>)],
  [<span class="hljs-built_in">str</span>(i) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">2000</span>)],
  [i <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10000</span>, <span class="hljs-number">12000</span>)],
  [[random.random() <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">2</span>)] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">2000</span>)],
  <span class="hljs-comment"># use `default_value` for a field</span>
  [], 
  <span class="hljs-comment"># or</span>
  <span class="hljs-literal">None</span>,
  <span class="hljs-comment"># or just omit the field</span>
]

<span class="hljs-comment">## Once your collection is enabled with dynamic schema,</span>
<span class="hljs-comment">## you can add non-existing field values.</span>
data.append([<span class="hljs-built_in">str</span>(<span class="hljs-string">&quot;dy&quot;</span>*i) <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">2000</span>)])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> data = <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">2000</span> }, <span class="hljs-function">(<span class="hljs-params">v,k</span>) =&gt;</span> ({
  <span class="hljs-string">&quot;book_id&quot;</span>: k,
  <span class="hljs-string">&quot;word_count&quot;</span>: k+<span class="hljs-number">10000</span>,
  <span class="hljs-string">&quot;book_intro&quot;</span>: <span class="hljs-title class_">Array</span>.<span class="hljs-title function_">from</span>({ <span class="hljs-attr">length</span>: <span class="hljs-number">2</span> }, <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>()),
}));
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">bookIDs := <span class="hljs-built_in">make</span>([]<span class="hljs-type">int64</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2000</span>)
wordCounts := <span class="hljs-built_in">make</span>([]<span class="hljs-type">int64</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2000</span>)
bookIntros := <span class="hljs-built_in">make</span>([][]<span class="hljs-type">float32</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2000</span>)
<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">2000</span>; i++ {
    bookIDs = <span class="hljs-built_in">append</span>(bookIDs, <span class="hljs-type">int64</span>(i))
    wordCounts = <span class="hljs-built_in">append</span>(wordCounts, <span class="hljs-type">int64</span>(i+<span class="hljs-number">10000</span>))
    v := <span class="hljs-built_in">make</span>([]<span class="hljs-type">float32</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>)
    <span class="hljs-keyword">for</span> j := <span class="hljs-number">0</span>; j &lt; <span class="hljs-number">2</span>; j++ {
        v = <span class="hljs-built_in">append</span>(v, rand.Float32())
    }
    bookIntros = <span class="hljs-built_in">append</span>(bookIntros, v)
}
idColumn := entity.NewColumnInt64(<span class="hljs-string">&quot;book_id&quot;</span>, bookIDs)
wordColumn := entity.NewColumnInt64(<span class="hljs-string">&quot;word_count&quot;</span>, wordCounts)
introColumn := entity.NewColumnFloatVector(<span class="hljs-string">&quot;book_intro&quot;</span>, <span class="hljs-number">2</span>, bookIntros)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">Random ran = <span class="hljs-keyword">new</span> Random();
List&lt;Long&gt; book_id_array = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();
List&lt;Long&gt; word_count_array = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();
List&lt;List&lt;Float&gt;&gt; book_intro_array = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();
<span class="hljs-keyword">for</span> (<span class="hljs-built_in">long</span> i = <span class="hljs-number">0L</span>; i &lt; <span class="hljs-number">2000</span>; ++i) {
    book_id_array.<span class="hljs-keyword">add</span>(i);
    word_count_array.<span class="hljs-keyword">add</span>(i + <span class="hljs-number">10000</span>);
    List&lt;Float&gt; vector = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();
    <span class="hljs-keyword">for</span> (<span class="hljs-built_in">int</span> k = <span class="hljs-number">0</span>; k &lt; <span class="hljs-number">2</span>; ++k) {
        vector.<span class="hljs-keyword">add</span>(ran.nextFloat());
    }
    book_intro_array.<span class="hljs-keyword">add</span>(vector);
}
<button class="copy-code-btn"></button></code></pre>
<div style="display: none">
<pre><code translate="no" class="language-shell"><span class="hljs-comment"># Prepare your data in a CSV file. Milvus CLI only supports importing data from local or remote files.</span>
<button class="copy-code-btn"></button></code></pre>
</div>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># See the following step.</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Insert-data-to-Milvus" class="common-anchor-header">Insert data to Milvus<button data-href="#Insert-data-to-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>Insert the data to the collection.</p>
<p>By specifying <code translate="no">partition_name</code>, you can optionally decide to which partition to insert the data.</p>
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
mr = collection.insert(data)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> mr = <span class="hljs-keyword">await</span> milvusClient.<span class="hljs-title function_">insert</span>({
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;book&quot;</span>,
  <span class="hljs-attr">fields_data</span>: data,
});
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go">_, err = milvusClient.<span class="hljs-title class_">Insert</span>(
    context.<span class="hljs-title class_">Background</span>(), <span class="hljs-comment">// ctx</span>
    <span class="hljs-string">&quot;book&quot;</span>,               <span class="hljs-comment">// CollectionName</span>
    <span class="hljs-string">&quot;&quot;</span>,                   <span class="hljs-comment">// partitionName</span>
    idColumn,             <span class="hljs-comment">// columnarData</span>
    wordColumn,           <span class="hljs-comment">// columnarData</span>
    introColumn,          <span class="hljs-comment">// columnarData</span>
)
<span class="hljs-keyword">if</span> err != nil {
    log.<span class="hljs-title class_">Fatal</span>(<span class="hljs-string">&quot;failed to insert data:&quot;</span>, err.<span class="hljs-title class_">Error</span>())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">List&lt;InsertParam.Field&gt; fields = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();
fields.<span class="hljs-keyword">add</span>(<span class="hljs-keyword">new</span> InsertParam.Field(<span class="hljs-string">&quot;book_id&quot;</span>, book_id_array));
fields.<span class="hljs-keyword">add</span>(<span class="hljs-keyword">new</span> InsertParam.Field(<span class="hljs-string">&quot;word_count&quot;</span>, word_count_array));
fields.<span class="hljs-keyword">add</span>(<span class="hljs-keyword">new</span> InsertParam.Field(<span class="hljs-string">&quot;book_intro&quot;</span>, book_intro_array));

InsertParam insertParam = InsertParam.newBuilder()
  .withCollectionName(<span class="hljs-string">&quot;book&quot;</span>)
  .withPartitionName(<span class="hljs-string">&quot;novel&quot;</span>)
  .withFields(fields)
  .build();
milvusClient.insert(insertParam);
<button class="copy-code-btn"></button></code></pre>
<div style="display: none">
<pre><code translate="no" class="language-shell"><span class="hljs-keyword">import</span> -c book <span class="hljs-string">&#x27;https://raw.githubusercontent.com/milvus-io/milvus_cli/main/examples/user_guide/search.csv&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
</div>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># insert an entity to a collection</span>
curl -X <span class="hljs-string">&#x27;POST&#x27;</span> \
  <span class="hljs-string">&#x27;${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/insert&#x27;</span>  \
  -H <span class="hljs-string">&#x27;Authorization: Bearer ${TOKEN}&#x27;</span> \
  -H <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
  -H <span class="hljs-string">&#x27;Content-Type: application/json&#x27;</span> \
  -d <span class="hljs-string">&#x27;{
         &quot;collectionName&quot;: &quot;collection1&quot;,
         &quot;data&quot;: {
             &quot;vector&quot;: [0.1, 0.2, 0.3],
             &quot;name&quot;: &quot;tom&quot;,
             &quot;email&quot;: &quot;tom@zilliz.com&quot;,
             &quot;date&quot;: &quot;2023-04-13&quot;
          }
     }&#x27;</span>

<span class="hljs-comment"># insert multiple entities</span>
curl --request POST \
     --url <span class="hljs-string">&#x27;${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/insert&#x27;</span> \
     --header <span class="hljs-string">&#x27;Authorization: Bearer &lt;TOKEN&gt;&#x27;</span> \
     --header <span class="hljs-string">&#x27;accept: application/json&#x27;</span> \
     --header <span class="hljs-string">&#x27;content-type: application/json&#x27;</span> \
     -d <span class="hljs-string">&#x27;{
         &quot;collectionName&quot;: &quot;collection1&quot;,
         &quot;data&quot;: [
             {
                &quot;vector&quot;: [0.1, 0.2, 0.3],
                &quot;name&quot;: &quot;bob&quot;,
                &quot;email&quot;: &quot;bob@zilliz.com&quot;,
                &quot;date&quot;: &quot;2023-04-13&quot;
             },{
                &quot;vector&quot;: [0.1, 0.2, 0.3],
                &quot;name&quot;: &quot;ally&quot;,
                &quot;email&quot;: &quot;ally@zilliz.com&quot;,
                &quot;date&quot;: &quot;2023-04-11&quot;
             }
         ]
     }&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<div class="language-curl">
Output:
<pre><code translate="no" class="language-json">{
    <span class="hljs-string">&quot;code&quot;</span>: <span class="hljs-number">200</span>,
    <span class="hljs-string">&quot;data&quot;</span>: {
        <span class="hljs-string">&quot;insertCount&quot;</span>: <span class="hljs-string">&quot;integer&quot;</span>
    }
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
        <td><code translate="no">data</code></td>
        <td>Data to insert into Milvus.</td>
    </tr>
    <tr>
        <td><code translate="no">partition_name</code> (optional)</td>
        <td>Name of the partition to insert data into.</td>
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
        <td>Name of the collection to insert data into.</td>
    </tr>
  <tr>
        <td><code translate="no">partition_name</code> (optional)</td>
        <td>Name of the partition to insert data into.</td>
    </tr>
  <tr>
        <td><code translate="no">fields_data</code></td>
        <td>Data to insert into Milvus.</td>
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
        <td>Name of the collection to insert data into.</td>
    </tr>
    <tr>
        <td><code translate="no">partitionName</code></td>
        <td>Name of the partition to insert data into. Data will be inserted in the default partition if left blank.</td>
    </tr>
    <tr>
        <td><code translate="no">columnarData</code></td>
        <td>Data to insert into each field.</td>
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
        <td><code translate="no">fieldName</code></td>
        <td>Name of the field to insert data into.</td>
    </tr>
    <tr>
        <td><code translate="no">DataType</code></td>
        <td>Data type of the field to insert data into.</td>
    </tr>
    <tr>
        <td><code translate="no">data</code></td>
        <td>Data to insert into each field.</td>
    </tr>
        <tr>
        <td><code translate="no">CollectionName</code></td>
        <td>Name of the collection to insert data into.</td>
    </tr>
    <tr>
        <td><code translate="no">PartitionName</code> (optional)</td>
        <td>Name of the partition to insert data into.</td>
    </tr>
    </tbody>
</table>
<table class="language-shell" style="display: none">
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c</td>
            <td>Name of the collection to insert data into.</td>
        </tr>
        <tr>
            <td>-p (Optional)</td>
            <td>Name of the partition to insert data into.</td>
        </tr>
    </tbody>
</table>
<table class="language-curl">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code translate="no">collectionName</code></td>
            <td>The name of the collection to which entities will be inserted.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">data</code></td>
            <td>Data to insert into Milvus.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code translate="no">field_name</code></td>
            <td>An entity object. Note that the keys in the entity should match the collection schema.</td>
            <td>N/A</td>
        </tr>
    </tbody>
</table>
<div class="alert note">
<p>After inserting entities into a collection that has previously been indexed, you do not need to re-index the collection, as Milvus will automatically create an index for the newly inserted data. For more information, refer to <a href="/docs/v2.3.x/product_faq.md#Can-indexes-be-created-after-inserting-vectors">Can indexes be created after inserting vectors?</a></p>
</div>
<h2 id="Flush-the-Data-in-Milvus" class="common-anchor-header">Flush the Data in Milvus<button data-href="#Flush-the-Data-in-Milvus" class="anchor-icon" translate="no">
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
    </button></h2><p>When data is inserted into Milvus, it is stored in segments. Segments have to reach a certain size before they can be sealed and indexed. Unsealed segments are searched using brute force. If you need to search the data immediately after insertion, you can call the <code translate="no">flush()</code> method once the data is inserted. This method seals any remaining segments and sends them for indexing. It is important to only call this method at the end of an insert session. Calling it too frequently will result in fragmented data that will require cleaning later on.</p>
<div class="alert note">
<p>Milvus automatically triggers the <code translate="no">flush()</code> operation. In most cases, manual calls to this operation are not necessary.</p>
</div>
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
    </button></h2><table>
<thead>
<tr><th>Feature</th><th>Maximum limit</th></tr>
</thead>
<tbody>
<tr><td>Dimensions of a vector</td><td>32,768</td></tr>
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
<li><a href="/docs/v2.3.x/build_index.md">Build an index for vectors</a></li>
<li><a href="/docs/v2.3.x/search.md">Conduct a vector search</a></li>
<li><a href="/docs/v2.3.x/hybridsearch.md">Conduct a hybrid search</a></li>
</ul></li>
</ul>
