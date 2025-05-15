---
id: manage-collections.md
title: Manage Collections
---
<h1 id="Manage-Collections" class="common-anchor-header">Manage Collections<button data-href="#Manage-Collections" class="anchor-icon" translate="no">
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
    </button></h1><p>This guide walks you through creating and managing collections using the SDK of your choice.</p>
<h2 id="Before-you-start" class="common-anchor-header">Before you start<button data-href="#Before-you-start" class="anchor-icon" translate="no">
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
<li><p>You have installed <a href="https://milvus.io/docs/install_standalone-docker.md">Milvus standalone</a> or <a href="https://milvus.io/docs/install_cluster-milvusoperator.md">Milvus cluster</a>.</p></li>
<li><p>You have installed preferred SDKs. You can choose among various languages, including <a href="https://milvus.io/docs/install-pymilvus.md">Python</a>, <a href="https://milvus.io/docs/install-java.md">Java</a>, <a href="https://milvus.io/docs/install-go.md">Go</a>, and <a href="https://milvus.io/docs/install-node.md">Node.js</a>.</p></li>
</ul>
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
    </button></h2><p>In Milvus, you store your vector embeddings in collections. All vector embeddings within a collection share the same dimensionality and distance metric for measuring similarity.</p>
<p>Milvus collections support dynamic fields (i.e., fields not pre-defined in the schema) and automatic incrementation of primary keys.</p>
<p>To accommodate different preferences, Milvus offers two methods for creating a collection. One provides a quick setup, while the other allows for detailed customization of the collection schema and index parameters.</p>
<p>Additionally, you can view, load, release, and drop a collection when necessary.</p>
<h2 id="Create-Collection" class="common-anchor-header">Create Collection<button data-href="#Create-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>You can create a collection in either of the following manners:</p>
<ul>
<li><p><strong>Quick setup</strong></p>
<p>In this manner, you can create a collection by simply giving it a name and specifying the number of dimensions of the vector embeddings to be stored in this collection. For details, refer to <a href="/docs/v2.4.x/manage-collections.md">Quick setup</a>.</p></li>
<li><p><strong>Customized setup</strong></p>
<p>Instead of letting In Milvus decide almost everything for your collection, you can determine the <strong>schema</strong> and <strong>index parameters</strong> of the collection on your own. For details, refer to <a href="/docs/v2.4.x/manage-collections.md">Customized setup</a>.</p></li>
</ul>
<h3 id="Quick-setup" class="common-anchor-header">Quick setup</h3><p>Against the backdrop of the great leap in the AI industry, most developers just need a simple yet dynamic collection to start with. Milvus allows a quick setup of such a collection with just three arguments:</p>
<ul>
<li><p>Name of the collection to create,</p></li>
<li><p>Dimension of the vector embeddings to insert, and</p></li>
<li><p>Metric type used to measure similarities between vector embeddings.</p></li>
</ul>
<div class="language-python">
<p>For quick setup, use the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a> method of the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> class to create a collection with the specified name and dimension.</p>
</div>
<div class="language-java">
<p>For quick setup, use the <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md"><code translate="no">createCollection()</code></a> method of the <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code translate="no">MilvusClientV2</code></a> class to create a collection with the specified name and dimension.</p>
</div>
<div class="language-javascript">
<p>For quick setup, use the <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a> method of the <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> class to create a collection with the specified name and dimension.</p>
</div>
<div class="language-go">
<p>For quick setup, use the <a href="https://milvus.io/api-reference/go/v2.4.x/Collection/CreateCollection.md"><code translate="no">CreateCollection()</code></a> on an instance of the <code translate="no">Client</code> interface using <a href="https://milvus.io/api-reference/go/v2.4.x/Connections/NewClient.md"><code translate="no">NewClient()</code></a> method, to create a collection with the specified name and dimension.</p>
</div>
<div class="language-shell">
<p>For quick setup, use the <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Create.md"><code translate="no">POST /v2/vectordb/collections/create</code></a> API endpoint to create a collection with the specified name and dimension.</p>
</div>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#shell">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

<span class="hljs-comment"># 2. Create a collection in quick setup mode</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    dimension=<span class="hljs-number">5</span>
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">quickSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .dimension(<span class="hljs-number">5</span>)
    .build();

client.createCollection(quickSetupReq);

<span class="hljs-comment">// Thread.sleep(5000);</span>

<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">quickSetupLoadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

<span class="hljs-type">Boolean</span> <span class="hljs-variable">res</span> <span class="hljs-operator">=</span> client.getLoadState(quickSetupLoadStateReq);

System.out.println(res);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment">// 1. Set up a Milvus Client</span>
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address});

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-keyword">let</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">dimension</span>: <span class="hljs-number">5</span>,
});  

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-Go"><span class="hljs-keyword">import</span> (
  <span class="hljs-string">&quot;context&quot;</span>
  <span class="hljs-string">&quot;fmt&quot;</span>
  <span class="hljs-string">&quot;log&quot;</span>
  <span class="hljs-string">&quot;time&quot;</span>

  milvusClient <span class="hljs-string">&quot;github.com/milvus-io/milvus-sdk-go/v2/client&quot;</span> <span class="hljs-comment">// milvusClient is an alias for milvus client package</span>
  <span class="hljs-string">&quot;github.com/milvus-io/milvus-sdk-go/v2/entity&quot;</span>
)

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">main</span><span class="hljs-params">()</span></span> {
    ctx := context.Background()
    ctx, cancel := context.WithTimeout(ctx, <span class="hljs-number">2</span>*time.Second)
    <span class="hljs-keyword">defer</span> cancel()
    <span class="hljs-comment">// 1. Set up a Milvus client</span>
    client, err := milvusClient.NewClient(ctx, milvusClient.Config{
        Address: <span class="hljs-string">&quot;localhost:19530&quot;</span>,
    })
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to connect to milvus:&quot;</span>, err.Error())
    }
    <span class="hljs-keyword">defer</span> client.Close()
    
    <span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
    err = client.NewCollection(ctx, <span class="hljs-string">&quot;quick_setup&quot;</span>, <span class="hljs-number">5</span>)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to create collection:&quot;</span>, err.Error())
    }
    
    stateLoad, err := client.GetLoadState(context.Background(), <span class="hljs-string">&quot;quick_setup&quot;</span>, []<span class="hljs-type">string</span>{})
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        log.Fatal(<span class="hljs-string">&quot;failed to get load state:&quot;</span>, err.Error())
    }
    fmt.Println(stateLoad)
    <span class="hljs-comment">// Output</span>
    <span class="hljs-comment">// 3</span>
    
    <span class="hljs-comment">// LoadStateNotExist -&gt; LoadState = 0</span>
    <span class="hljs-comment">// LoadStateNotLoad  -&gt; LoadState = 1</span>
    <span class="hljs-comment">// LoadStateLoading  -&gt; LoadState = 2</span>
    <span class="hljs-comment">// LoadStateLoaded   -&gt; LoadState = 3</span>
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">export</span> MILVUS_URI=<span class="hljs-string">&quot;localhost:19530&quot;</span></span>
<span class="hljs-meta prompt_">
$ </span><span class="language-bash">curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{</span></span>
  &quot;collectionName&quot;: &quot;quick_setup&quot;,
  &quot;dimension&quot;: 5
}&#x27;
<span class="hljs-meta prompt_">
# </span><span class="language-bash"><span class="hljs-string">Output</span></span>
<span class="hljs-meta prompt_">#</span><span class="language-bash"><span class="hljs-string">
# {</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;code&quot;: 0,</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;data&quot;: {},</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">}</span></span>
<span class="hljs-meta prompt_">
$ </span><span class="language-bash"><span class="hljs-string">curl -X POST &quot;http://${MILVUS_URI}/v2/vectordb/collections/get_load_state&quot; \
-H &quot;Content-Type: application/json&quot; \
-d &#x27;</span>{</span>
  &quot;collectionName&quot;: &quot;quick_setup&quot;
}&#x27;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">{</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;code&quot;</span>: 0,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;data&quot;</span>: {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;loadProgress&quot;</span>: 100,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;loadState&quot;</span>: <span class="hljs-string">&quot;LoadStateLoaded&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    }</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>The collection generated in the above code contains only two fields: <code translate="no">id</code> (as the primary key) and <code translate="no">vector</code> (as the vector field), with <code translate="no">auto_id</code> and <code translate="no">enable_dynamic_field</code> settings enabled by default.</p>
<ul>
<li><p><code translate="no">auto_id</code></p>
<p>Enabling this setting ensures that the primary key increments automatically. There’s no need for manual provision of primary keys during data insertion.</p></li>
<li><p><code translate="no">enable_dynamic_field</code></p>
<p>When enabled, all fields, excluding <code translate="no">id</code> and <code translate="no">vector</code> in the data to be inserted, are treated as dynamic fields. These additional fields are saved as key-value pairs within a special field named <code translate="no">$meta</code>. This feature allows the inclusion of extra fields during data insertion.</p></li>
</ul>
<p>The automatically indexed and loaded collection from the provided code is ready for immediate data insertions.</p>
<h3 id="Customized-setup" class="common-anchor-header">Customized setup</h3><p>Instead of letting Milvus decide almost everything for your collection, you can determine the <strong>schema</strong> and <strong>index parameters</strong> of the collection on your own.</p>
<h4 id="Step-1-Set-up-schema" class="common-anchor-header">Step 1: Set up schema</h4><p>A schema defines the structure of a collection. Within the schema, you have the option to enable or disable <code translate="no">enable_dynamic_field</code>, add pre-defined fields, and set attributes for each field. For a detailed explanation of the concept and available data types, refer to <a href="/docs/v2.4.x/schema.md">Schema Explained</a>.</p>
<div class="language-python">
<p>To set up a schema, use <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a> to create a schema object and <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a> to add fields to the schema.</p>
</div>
<div class="language-java">
<p>To set up a schema, use <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createSchema.md"><code translate="no">createSchema()</code></a> to create a schema object and <a href="https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/addField.md"><code translate="no">addField()</code></a> to add fields to the schema.</p>
</div>
<div class="language-javascript">
<p>To set up a schema, use <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a>.</p>
</div>
</div>
<div class="language-go">
<p>To set up a schema, use <code translate="no">entity.NewSchema()</code> to create a schema object and <code translate="no">schema.WithField()</code> to add fields to the schema.</p>
</div>
<div class="language-shell">
<p>To set up a schema, you need to define a JSON object that follows the schema format as displayed on the <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Create.md"><code translate="no">POST /v2/vectordb/collections/create</code></a> API endpoint reference page.</p>
</div>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#shell">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Create a collection in customized setup mode</span>

<span class="hljs-comment"># 3.1. Create schema</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># 3.2. Add fields to schema</span>
schema.add_field(field_name=<span class="hljs-string">&quot;my_id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;my_vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-comment">// 3. Create a collection in customized setup mode</span>

<span class="hljs-comment">// 3.1 Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

<span class="hljs-comment">// 3.2 Add fields to schema</span>
schema.addField(AddFieldReq.builder()
    .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)
    .dataType(DataType.Int64)
    .isPrimaryKey(<span class="hljs-literal">true</span>)
    .autoID(<span class="hljs-literal">false</span>)
    .build());

schema.addField(AddFieldReq.builder()
    .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)
    .dataType(DataType.FloatVector)
    .dimension(<span class="hljs-number">5</span>)
    .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3. Create a collection in customized setup mode</span>
<span class="hljs-comment">// 3.1 Define fields</span>
<span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">false</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>
    },
]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 3. Create a collection in customized setup mode</span>

<span class="hljs-comment">// 3.1 Create schema</span>
schema := entity.NewSchema()

<span class="hljs-comment">// 3.2. Add fields to schema</span>
schema.WithField(
    entity.NewField().
        WithName(<span class="hljs-string">&quot;my_id&quot;</span>).
        WithDataType(entity.FieldTypeInt64).
        WithIsPrimaryKey(<span class="hljs-literal">false</span>).
        WithIsAutoID(<span class="hljs-literal">true</span>)).
    WithField(
        entity.NewField().
            WithName(<span class="hljs-string">&quot;my_vector&quot;</span>).
            WithDataType(entity.FieldTypeFloatVector).
            WithDim(<span class="hljs-number">5</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">export fields=&#x27;[{ \
    &quot;fieldName&quot;: &quot;my_id&quot;, \
    &quot;dataType&quot;: &quot;Int64&quot;, \
    &quot;isPrimary&quot;: true \
}, \
{ \
    &quot;fieldName&quot;: &quot;my_vector&quot;, \
    &quot;dataType&quot;: &quot;FloatVector&quot;, \
    &quot;elementTypeParams&quot;: { \
        &quot;dim&quot;: 5 \
    } \
}]&#x27;
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
      <td><code translate="no">auto_id</code></td>
      <td>Determines if the primary field automatically increments.<br/>Setting this to <strong>True</strong> makes the primary field automatically increment. In this case, the primary field should not be included in the data to insert to avoid errors. The auto-generated IDs have a fixed length and cannot be altered.</td>
    </tr>
    <tr>
      <td><code translate="no">enable_dynamic_field</code></td>
      <td>Determines if Milvus saves the values of undefined fields in a dynamic field if the data being inserted into the target collection includes fields that are not defined in the collection's schema.<br/>When you set this to <strong>True</strong>, Milvus will create a field called <strong>$meta</strong> to store any undefined fields and their values from the data that is inserted.</td>
    </tr>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>The name of the field.</td>
    </tr>
    <tr>
      <td><code translate="no">datatype</code></td>
      <td>The data type of the field. For a list of available data types, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/DataType.md">DataType</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">is_primary</code></td>
      <td>Whether the current field is the primary field in a collection.<br/>Each collection has only one primary field. A primary field should be of either the <strong>DataType.INT64</strong> type or the <strong>DataType.VARCHAR</strong> type.</td>
    </tr>
    <tr>
      <td><code translate="no">dim</code></td>
      <td>The dimension of the vector embeddings.<br/>This is mandatory for a field of the <strong>DataType.FLOAT_VECTOR</strong>, <strong>DataType.BINARY_VECTOR</strong>, <strong>DataType.FLOAT16_VECTOR</strong>, or <strong>DataType.BFLOAT16_VECTOR</strong> type. If you use <strong>DataType.SPARSE_FLOAT_VECTOR</strong>, omit this parameter.</td>
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
      <td>The name of the field.</td>
    </tr>
    <tr>
      <td><code translate="no">dataType</code></td>
      <td>The data type of the field. For a list of available data types, refer to <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/DataType.md">DataType</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">isPrimaryKey</code></td>
      <td>Whether the current field is the primary field in a collection.<br/>Each collection has only one primary field. A primary field should be of either the <strong>DataType.Int64</strong> type or the <strong>DataType.VarChar</strong> type.</td>
    </tr>
    <tr>
      <td><code translate="no">autoID</code></td>
      <td>Whether allows the primary field to automatically increment.<br/>Setting this to <strong>true</strong> makes the primary field automatically increment. In this case, the primary field should not be included in the data to insert to avoid errors.</td>
    </tr>
    <tr>
      <td><code translate="no">dimension</code></td>
      <td>The dimension of the vector embeddings.<br/>This is mandatory for a field of the <strong>DataType.FloatVector</strong>, <strong>DataType.BinaryVector</strong>, <strong>DataType.Float16Vector</strong>, or <strong>DataType.BFloat16Vector</strong> type.</td>
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
      <td><code translate="no">name</code></td>
      <td>The name of the field.</td>
    </tr>
    <tr>
      <td><code translate="no">data_type</code></td>
      <td>The data type of the field. For an enumeration of all available data types, refer to <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/DataType.md">DataType</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">is_primary_key</code></td>
      <td>Whether the current field is the primary field in a collection.<br/>Each collection has only one primary field. A primary field should be of either the <strong>DataType.INT64</strong> type or the <strong>DataType.VARCHAR</strong> type.</td>
    </tr>
    <tr>
      <td><code translate="no">auto_id</code></td>
      <td>Whether the primary field automatically increments upon data insertions into this collection.<br/>The value defaults to <strong>False</strong>. Setting this to <strong>True</strong> makes the primary field automatically increment. Skip this parameter if you need to set up a collection with a customized schema.</td>
    </tr>
    <tr>
      <td><code translate="no">dim</code></td>
      <td>The dimensionality of the collection field that holds vector embeddings.<br/>The value should be an integer greater than 1 and is usually determined by the model you use to generate vector embeddings.</td>
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
      <td><code translate="no">WithName()</code></td>
      <td>The name of the field.</td>
    </tr>
    <tr>
      <td><code translate="no">WithDataType()</code></td>
      <td>The data type of the field.</td>
    </tr>
    <tr>
      <td><code translate="no">WithIsPrimaryKey()</code></td>
      <td>Whether the current field is the primary field in a collection.<br/>Each collection has only one primary field. A primary field should be of either the <strong>entity.FieldTypeInt64</strong> type or the <strong>entity.FieldTypeVarChar</strong> type.</td>
    </tr>
    <tr>
      <td><code translate="no">WithIsAutoID()</code></td>
      <td>Whether the primary field automatically increments upon data insertions into this collection.<br/>The value defaults to <strong>false</strong>. Setting this to <strong>true</strong> makes the primary field automatically increment. Skip this parameter if you need to set up a collection with a customized schema.</td>
    </tr>
    <tr>
      <td><code translate="no">WithDim()</code></td>
      <td>The dimensionality of the collection field that holds vector embeddings.<br/>The value should be an integer greater than 1 and is usually determined by the model you use to generate vector embeddings.</td>
    </tr>
  </tbody>
</table>
<table class="language-shell">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>The name of the field to create in the target collection.</td>
    </tr>
    <tr>
      <td><code translate="no">dataType</code></td>
      <td>The data type of the field values.</td>
    </tr>
    <tr>
      <td><code translate="no">isPrimary</code></td>
      <td>Whether the current field is the primary field. Setting this to <code translate="no">True</code> makes the current field the primary field.</td>
    </tr>
    <tr>
      <td><code translate="no">elementTypeParams</code></td>
      <td>Extra field parameters.</td>
    </tr>
    <tr>
      <td><code translate="no">dim</code></td>
      <td>An optional parameter for FloatVector or BinaryVector fields that determines the vector dimension.</td>
    </tr>
  </tbody>
</table>
<h4 id="Step-2-Set-up-index-parameters" class="common-anchor-header">Step 2: Set up index parameters</h4><p>Index parameters dictate how Milvus organizes your data within a collection. You can tailor the indexing process for specific fields by adjusting their <code translate="no">metric_type</code> and <code translate="no">index_type</code>. For the vector field, you have the flexibility to select <code translate="no">COSINE</code>, <code translate="no">L2</code>, <code translate="no">IP</code>, <code translate="no">HAMMING</code>, or <code translate="no">JACCARD</code> as the <code translate="no">metric_type</code>, depending on the type of vectors you are working with. For more information, refer to <a href="/docs/v2.4.x/metric.md">Similarity Metrics</a>.</p>
<div class="language-python">
<p>To set up index parameters, use <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/prepare_index_params.md"><code translate="no">prepare_index_params()</code></a> to prepare index parameters and <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md"><code translate="no">add_index()</code></a> to add the index.</p>
</div>
<div class="language-java">
<p>To set up index parameters, use <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md">IndexParam</a>.</p>
</div>
<div class="language-javascript">
<p>To set up index parameters, use <a href="https://milvus.io/api-reference/node/v2.4.x/Management/createIndex.md"><code translate="no">createIndex()</code></a>.</p>
</div>
<div class="language-go">
<p>To set up index parameters, use <a href="https://milvus.io/api-reference/go/v2.4.x/Index/CreateIndex.md"><code translate="no">CreateIndex()</code></a>.</p>
</div>
<div class="language-shell">
<p>To set up index parameters, you need to define a JSON object that follows the index parameters format as displayed on the <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Create.md"><code translate="no">POST /v2/vectordb/collections/create</code></a> API endpoint reference page.</p>
</div>
<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#shell">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3.3. Prepare index parameters</span>
index_params = client.prepare_index_params()

<span class="hljs-comment"># 3.4. Add indexes</span>
index_params.add_index(
    field_name=<span class="hljs-string">&quot;my_id&quot;</span>,
    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;my_vector&quot;</span>, 
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,
    params={ <span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span> }
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;

<span class="hljs-comment">// 3.3 Prepare index parameters</span>
<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForIdField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;my_id&quot;</span>)
    .indexType(IndexParam.IndexType.STL_SORT)
    .build();

<span class="hljs-type">IndexParam</span> <span class="hljs-variable">indexParamForVectorField</span> <span class="hljs-operator">=</span> IndexParam.builder()
    .fieldName(<span class="hljs-string">&quot;my_vector&quot;</span>)
    .indexType(IndexParam.IndexType.IVF_FLAT)
    .metricType(IndexParam.MetricType.L2)
    .extraParams(Map.of(<span class="hljs-string">&quot;nlist&quot;</span>, <span class="hljs-number">1024</span>))
    .build();

List&lt;IndexParam&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.add(indexParamForIdField);
indexParams.add(indexParamForVectorField);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.2 Prepare index parameters</span>
<span class="hljs-keyword">const</span> index_params = [{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;my_id&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;STL_SORT&quot;</span>
},{
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">nlist</span>: <span class="hljs-number">1024</span>}
}]
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 3.3 Prepare index parameters</span>
idxID := entity.NewScalarIndexWithType(entity.Sorted)

idxVector, err := entity.NewIndexIvfFlat(entity.IP, <span class="hljs-number">1024</span>)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
  log.Fatal(<span class="hljs-string">&quot;failed to new index:&quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">export indexParams=&#x27;[{ \
    &quot;fieldName&quot;: &quot;my_id&quot;, \
    &quot;indexName&quot;: &quot;my_id&quot;, \
    &quot;params&quot;: { \
        &quot;index_type&quot;: &quot;SLT_SORT&quot; \
  } \
}, { \
    &quot;fieldName&quot;: &quot;my_vector&quot;, \
    &quot;metricType&quot;: &quot;COSINE&quot;, \
    &quot;indexName&quot;: &quot;my_vector&quot;, \
    &quot;params&quot;: { \
        &quot;index_type&quot;: &quot;IVF_FLAT&quot;, \
        &quot;nlist&quot;: 1024 \
  } \
}]&#x27;
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
      <td><code translate="no">field_name</code></td>
      <td>The name of the target file to apply this object applies.</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>The name of the algorithm used to arrange data in the specific field. For applicable algorithms, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a> and <a href="https://milvus.io/docs/disk_index.md">On-disk Index</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>The algorithm that is used to measure similarity between vectors. Possible values are <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>. This is available only when the specified field is a vector field. For more information, refer to <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Indexes supported in Milvus</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>The fine-tuning parameters for the specified index type. For details on possible keys and value ranges, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a>.</td>
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
      <td>The name of the target field to apply this IndexParam object applies.</td>
    </tr>
    <tr>
      <td><code translate="no">indexType</code></td>
      <td>The name of the algorithm used to arrange data in the specific field. For applicable algorithms, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a> and <a href="https://milvus.io/docs/disk_index.md">On-disk Index</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">metricType</code></td>
      <td>The distance metric to use for the index. Possible values are <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>.</td>
    </tr>
    <tr>
      <td><code translate="no">extraParams</code></td>
      <td>Extra index parameters. For details, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a> and <a href="https://milvus.io/docs/disk_index.md">On-disk Index</a>.</td>
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
      <td><code translate="no">field_name</code></td>
      <td>The name of the target field on which an index is to be created.</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>The name of the algorithm used to arrange data in the specific field. For applicable algorithms, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a> and <a href="https://milvus.io/docs/disk_index.md">On-disk Index</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>The algorithm that is used to measure similarity between vectors. Possible values are <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>. This is available only when the specified field is a vector field. For more information, refer to <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Indexes supported in Milvus</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>The fine-tuning parameters for the specified index type. For details on possible keys and value ranges, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a>.</td>
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
      <td><code translate="no">index_type</code></td>
      <td>The name of the algorithm used to arrange data in the specific field. For applicable algorithms, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a> and <a href="https://milvus.io/docs/disk_index.md">On-disk Index</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>The algorithm that is used to measure similarity between vectors. Possible values are <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>. This is available only when the specified field is a vector field. For more information, refer to <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Indexes supported in Milvus</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">nlist</code></td>
      <td>Number of cluster units. Cluster units are used in IVF (Inverted File) based indexes in Milvus. For IVF_FLAT, the index divides vector data into `nlist` cluster units, and then compares distances between the target input vector and the center of each cluster1. Must be between 1 and 65536.</td>
    </tr>
  </tbody>
</table>
<table class="language-shell">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>The name of the target field on which an index is to be created.</td>
    </tr>
    <tr>
      <td><code translate="no">indexName</code></td>
      <td>The name of the index to create. The value defaults to the target field name.</td>
    </tr>
    <tr>
      <td><code translate="no">metricType</code></td>
      <td>The algorithm that is used to measure similarity between vectors. Possible values are <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>. This is available only when the specified field is a vector field. For more information, refer to <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Indexes supported in Milvus</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>The index type and related settings. For details, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">params.index_type</code></td>
      <td>The type of the index to create.</td>
    </tr>
    <tr>
      <td><code translate="no">params.nlist</code></td>
      <td>The number of cluster units. This applies to IVF-related index types.</td>
    </tr>
  </tbody>
</table>
<p>The code snippet above demonstrates how to set up index parameters for the vector field and a scalar field, respectively. For the vector field, set both the metric type and the index type. For a scalar field, set only the index type. It is recommended to create an index for the vector field and any scalar fields that are frequently used for filtering.</p>
<h4 id="Step-3-Create-the-collection" class="common-anchor-header">Step 3: Create the collection</h4><p>You have the option to create a collection and an index file separately or to create a collection with the index loaded simultaneously upon creation.</p>
<div class="language-python">
<p>Use <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md">create_collection()</a> to create a collection with the specified schema and index parameters and <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md">get_load_state()</a> to check the load state of the collection.</p>
</div>
<div class="language-java">
<p>Use <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md">createCollection()</a> to create a collection with the specified schema and index parameters and <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/getLoadState.md">getLoadState()</a> to check the load state of the collection.</p>
</div>
<div class="language-javascript">
<p>Use <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md">createCollection()</a> to create a collection with the specified schema and index parameters and <a href="https://milvus.io/api-reference/node/v2.4.x/Management/getLoadState.md">getLoadState()</a> to check the load state of the collection.</p>
</div>
<ul>
<li><p><strong>Create a collection with the index loaded simultaneously upon creation.</strong></p>
<p><div class="multipleCode">
<a href="#python">Python </a>
<a href="#java">Java</a>
<a href="#javascript">Node.js</a>
<a href="#shell">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3.5. Create a collection with the index loaded simultaneously</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>,
    schema=schema,
    index_params=index_params
)

time.sleep(<span class="hljs-number">5</span>)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;

<span class="hljs-comment">// 3.4 Create a collection with schema and index parameters</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq1</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
    .collectionSchema(schema)
    .indexParams(indexParams)
    .build();

client.createCollection(customizedSetupReq1);

<span class="hljs-comment">// Thread.sleep(5000);</span>

<span class="hljs-comment">// 3.5 Get load state of the collection</span>
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">customSetupLoadStateReq1</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
    .build();

res = client.getLoadState(customSetupLoadStateReq1);

System.out.println(res);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.3 Create a collection with fields and index parameters</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
    <span class="hljs-attr">index_params</span>: index_params,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)  

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">//   </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{</span></span>
    &quot;collectionName&quot;: &quot;customized_setup_1&quot;,
    &quot;schema&quot;: {
        &quot;autoId&quot;: false,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;my_id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;my_vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            }
        ]
    },
    &quot;indexParams&quot;: [
        {
            &quot;fieldName&quot;: &quot;my_vector&quot;,
            &quot;metricType&quot;: &quot;COSINE&quot;,
            &quot;indexName&quot;: &quot;my_vector&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;IVF_FLAT&quot;,
                &quot;nlist&quot;: &quot;1024&quot;
            }
        },
        {
            &quot;fieldName&quot;: &quot;my_id&quot;,
            &quot;indexName&quot;: &quot;my_id&quot;,
            &quot;params&quot;: {
                &quot;index_type&quot;: &quot;STL_SORT&quot;
            }            
        }
    ]
}&#x27;
<span class="hljs-meta prompt_">
# </span><span class="language-bash"><span class="hljs-string">Output</span></span>
<span class="hljs-meta prompt_">#</span><span class="language-bash"><span class="hljs-string">
# {</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;code&quot;: 0,</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;data&quot;: {},</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">}</span></span>
<span class="hljs-meta prompt_">
$ </span><span class="language-bash"><span class="hljs-string">curl -X POST &quot;http://${MILVUS_URI}/v2/vectordb/collections/get_load_state&quot; \
-H &quot;Content-Type: application/json&quot; \
-d &#x27;</span>{</span>
    &quot;collectionName&quot;: &quot;customized_setup_1&quot;
}&#x27;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">{</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;code&quot;</span>: 0,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;data&quot;</span>: {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;loadProgress&quot;</span>: 100,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;loadState&quot;</span>: <span class="hljs-string">&quot;LoadStateLoaded&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    }</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>The collection created above is loaded automatically. To learn more about loading and releasing a collection, refer to <a href="/docs/v2.4.x/manage-collections.md#Load--Release-Collection">Load & Release Collection</a>.</p></li>
<li><p><strong>Create a collection and an index file separately.</strong></p>
<p><div class="multipleCode">
<a href="#python">Python </a>
<a href="#java">Java</a>
<a href="#javascript">Node.js</a>
<a href="#go">Go</a>
<a href="#shell">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3.6. Create a collection and index it separately</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    schema=schema,
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 3.6 Create a collection and index it separately</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq2</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .collectionSchema(schema)
    .build();

client.createCollection(customizedSetupReq2);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.4 Create a collection and index it seperately</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">fields</span>: fields,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 3.4 Create a collection and index it seperately</span>
schema.CollectionName = <span class="hljs-string">&quot;customized_setup_2&quot;</span>
client.CreateCollection(ctx, schema, entity.DefaultShardNumber)

stateLoad, err := client.GetLoadState(context.Background(), <span class="hljs-string">&quot;customized_setup_2&quot;</span>, []<span class="hljs-type">string</span>{})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to get load state:&quot;</span>, err.Error())
}
fmt.Println(stateLoad)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// 1</span>

<span class="hljs-comment">// LoadStateNotExist -&gt; LoadState = 0</span>
<span class="hljs-comment">// LoadStateNotLoad  -&gt; LoadState = 1</span>
<span class="hljs-comment">// LoadStateLoading  -&gt; LoadState = 2</span>
<span class="hljs-comment">// LoadStateLoaded   -&gt; LoadState = 3</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{</span></span>
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;,
    &quot;schema&quot;: {
        &quot;autoId&quot;: false,
        &quot;enabledDynamicField&quot;: false,
        &quot;fields&quot;: [
            {
                &quot;fieldName&quot;: &quot;my_id&quot;,
                &quot;dataType&quot;: &quot;Int64&quot;,
                &quot;isPrimary&quot;: true
            },
            {
                &quot;fieldName&quot;: &quot;my_vector&quot;,
                &quot;dataType&quot;: &quot;FloatVector&quot;,
                &quot;elementTypeParams&quot;: {
                    &quot;dim&quot;: &quot;5&quot;
                }
            }
        ]
        
    }
}&#x27;
<span class="hljs-meta prompt_">
# </span><span class="language-bash"><span class="hljs-string">Output</span></span>
<span class="hljs-meta prompt_">#</span><span class="language-bash"><span class="hljs-string">
# {</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;code&quot;: 0,</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;data&quot;: {},</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">}</span></span>
<span class="hljs-meta prompt_">
$ </span><span class="language-bash"><span class="hljs-string">curl -X POST &quot;http://${MILVUS_URI}/v2/vectordb/collections/get_load_state&quot; \
-H &quot;Content-Type: application/json&quot; \
-d &#x27;</span>{</span>
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">{</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;code&quot;</span>: 0,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;data&quot;</span>: {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;loadState&quot;</span>: <span class="hljs-string">&quot;LoadStateNotLoaded&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    }</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>The collection created above is not loaded automatically. You can create an index for the collection as follows. Creating an index for the collection in a separate manner does not automatically load the collection. For details, refer to <a href="/docs/v2.4.x/manage-collections.md#Load--Release-Collection">Load & Release Collection</a>.</p>
<p><table class="language-python">
<thead>
<tr>
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code translate="no">collection_name</code></td>
<td>The name of the collection.</td>
</tr>
<tr>
<td><code translate="no">schema</code></td>
<td>The schema of this collection.<br/>Setting this to <strong>None</strong> indicates this collection will be created with default settings.<br/>To set up a collection with a customized schema, you need to create a <strong>CollectionSchema</strong> object and reference it here. In this case, Milvus ignores all other schema-related settings carried in the request.</td>
</tr>
<tr>
<td><code translate="no">index_params</code></td>
<td>The parameters for building the index on the vector field in this collection. To set up a collection with a customized schema and automatically load the collection to memory, you need to create an IndexParams object and reference it here.<br/>You should at least add an index for the vector field in this collection. You can also skip this parameter if you prefer to set up the index parameters later on.</td>
</tr>
</tbody>
</table></p>
<p><table class="language-java">
<thead>
<tr>
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code translate="no">collectionName</code></td>
<td>The name of the collection.</td>
</tr>
<tr>
<td><code translate="no">collectionSchema</code></td>
<td>The schema of this collection.<br/>Leaving it empty indicates this collection will be created with default settings. To set up a collection with a customized schema, you need to create a <strong>CollectionSchema</strong> object and reference it here.</td>
</tr>
<tr>
<td><code translate="no">indexParams</code></td>
<td>The parameters for building the index on the vector field in this collection. To set up a collection with a customized schema and automatically load the collection to memory, create an <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md">IndexParams</a> object with a list of IndexParam objects and reference it here.</td>
</tr>
</tbody>
</table></p>
<p><table class="language-javascript">
<thead>
<tr>
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code translate="no">collection_name</code></td>
<td>The name of the collection.</td>
</tr>
<tr>
<td><code translate="no">fields</code></td>
<td>The fields in the collection.</td>
</tr>
<tr>
<td><code translate="no">index_params</code></td>
<td>The index parameters for the collection to create.</td>
</tr>
</tbody>
</table></p>
<p><table class="language-go">
<thead>
<tr>
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code translate="no">schema.CollectionName</code></td>
<td>The name of the collection.</td>
</tr>
<tr>
<td><code translate="no">schema</code></td>
<td>The schema of this collection.</td>
</tr>
<tr>
<td><code translate="no">index_params</code></td>
<td>The index parameters for the collection to create.</td>
</tr>
</tbody>
</table></p>
<p><table class="language-shell">
<thead>
<tr>
<th>Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code translate="no">collectionName</code></td>
<td>The name of the collection.</td>
</tr>
<tr>
<td><code translate="no">schema</code></td>
<td>The schema is responsible for organizing data in the target collection. A valid schema should have multiple fields, which must include a primary key, a vector field, and several scalar fields.</td>
</tr>
<tr>
<td><code translate="no">schema.autoID</code></td>
<td>Whether allows the primary field to automatically increment. Setting this to True makes the primary field automatically increment. In this case, the primary field should not be included in the data to insert to avoid errors. Set this parameter in the field with is_primary set to True.</td>
</tr>
<tr>
<td><code translate="no">schema.enableDynamicField</code></td>
<td>Whether allows to use the reserved $meta field to hold non-schema-defined fields in key-value pairs.</td>
</tr>
<tr>
<td><code translate="no">fields</code></td>
<td>A list of field objects.</td>
</tr>
<tr>
<td><code translate="no">fields.fieldName</code></td>
<td>The name of the field to create in the target collection.</td>
</tr>
<tr>
<td><code translate="no">fields.dataType</code></td>
<td>The data type of the field values.</td>
</tr>
<tr>
<td><code translate="no">fields.isPrimary</code></td>
<td>Whether the current field is the primary field. Setting this to True makes the current field the primary field.</td>
</tr>
<tr>
<td><code translate="no">fields.elementTypeParams</code></td>
<td>Extra field parameters.</td>
</tr>
<tr>
<td><code translate="no">fields.elementTypeParams.dim</code></td>
<td>An optional parameter for FloatVector or BinaryVector fields that determines the vector dimension.</td>
</tr>
</tbody>
</table></p>
<p>The collection created above is not loaded automatically. You can create an index for the collection as follows. Creating an index for the collection in a separate manner does not automatically load the collection. For details, refer to <a href="/docs/v2.4.x/manage-collections.md">Load & Release Collection</a>.</p>
<p><div class="multipleCode">
<a href="#python">Python </a>
<a href="#java">Java</a>
<a href="#javascript">Node.js</a>
<a href="#go">Go</a>
<a href="#shell">cURL</a>
</div></p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3.6 Create index</span>
client.create_index(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    index_params=index_params
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateIndexReq</span>  <span class="hljs-variable">createIndexReq</span> <span class="hljs-operator">=</span> CreateIndexReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .indexParams(indexParams)
    .build();

client.createIndex(createIndexReq);

<span class="hljs-comment">// Thread.sleep(1000);</span>

<span class="hljs-comment">// 3.7 Get load state of the collection</span>
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">customSetupLoadStateReq2</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

res = client.getLoadState(customSetupLoadStateReq2);

System.out.println(res);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3.5 Create index</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createIndex</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;my_vector&quot;</span>,
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-attr">params</span>: { <span class="hljs-attr">nlist</span>: <span class="hljs-number">1024</span>}
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">//</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 3.5 Create index</span>
client.CreateIndex(ctx, <span class="hljs-string">&quot;customized_setup_2&quot;</span>, <span class="hljs-string">&quot;my_id&quot;</span>, idxID, <span class="hljs-literal">false</span>)
client.CreateIndex(ctx, <span class="hljs-string">&quot;customized_setup_2&quot;</span>, <span class="hljs-string">&quot;my_vector&quot;</span>, idxVector, <span class="hljs-literal">false</span>)

stateLoad, err = client.GetLoadState(context.Background(), <span class="hljs-string">&quot;customized_setup_2&quot;</span>, []<span class="hljs-type">string</span>{})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to get load state:&quot;</span>, err.Error())
}
fmt.Println(stateLoad)
<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// 1</span>

<span class="hljs-comment">// LoadStateNotExist -&gt; LoadState = 0</span>
<span class="hljs-comment">// LoadStateNotLoad  -&gt; LoadState = 1</span>
<span class="hljs-comment">// LoadStateLoading  -&gt; LoadState = 2</span>
<span class="hljs-comment">// LoadStateLoaded   -&gt; LoadState = 3</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/indexes/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{</span></span>
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;,
    &quot;indexParams&quot;: [
        {
            &quot;metricType&quot;: &quot;L2&quot;,
            &quot;fieldName&quot;: &quot;my_vector&quot;,
            &quot;indexName&quot;: &quot;my_vector&quot;,
            &quot;indexConfig&quot;: {
                &quot;index_type&quot;: &quot;IVF_FLAT&quot;,
                &quot;nlist&quot;: &quot;1024&quot;
            }
        }
    ]
}&#x27;
<span class="hljs-meta prompt_">
# </span><span class="language-bash"><span class="hljs-string">Output</span></span>
<span class="hljs-meta prompt_">#</span><span class="language-bash"><span class="hljs-string">
# {</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;code&quot;: 0,</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;data&quot;: {},</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">}</span></span>
<span class="hljs-meta prompt_">
$ </span><span class="language-bash"><span class="hljs-string">curl -X POST &quot;http://${MILVUS_URI}/v2/vectordb/collections/get_load_state&quot; \
-H &quot;Content-Type: application/json&quot; \
-d &#x27;</span>{</span>
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">{</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;code&quot;</span>: 0,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;data&quot;</span>: {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;loadState&quot;</span>: <span class="hljs-string">&quot;LoadStateNotLoaded&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    }</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">}</span>
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
      <td>The name of the collection.</td>
    </tr>
    <tr>
      <td><code translate="no">index_params</code></td>
      <td>An <strong>IndexParams</strong> object containing a list of <strong>IndexParam</strong> objects.</td>
    </tr>
  </tbody>
</table>
</li>
</ul>
<table class="language-java">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collectionName</code></td>
      <td>The name of the collection.</td>
    </tr>
    <tr>
      <td><code translate="no">indexParams</code></td>
      <td>A list of <strong>IndexParam</strong> objects.</td>
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
      <td>The name of the collection.</td>
    </tr>
    <tr>
      <td><code translate="no">field_name</code></td>
      <td>The name of the field in which to create an index.</td>
    </tr>
    <tr>
      <td><code translate="no">index_type</code></td>
      <td>The name of the algorithm used to arrange data in the specific field. For applicable algorithms, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a> and <a href="https://milvus.io/docs/disk_index.md">On-disk Index</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">metric_type</code></td>
      <td>The algorithm that is used to measure similarity between vectors. Possible values are <strong>IP</strong>, <strong>L2</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>. This is available only when the specified field is a vector field. For more information, refer to <a href="https://milvus.io/docs/index.md#Indexes-supported-in-Milvus">Indexes supported in Milvus</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">params</code></td>
      <td>The fine-tuning parameters for the specified index type. For details on possible keys and value ranges, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a>.</td>
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
      <td><code translate="no">collName</code></td>
      <td>The name of the collection.</td>
    </tr>
    <tr>
      <td><code translate="no">fieldName</code></td>
      <td>The name of the field in which to create an index.</td>
    </tr>
    <tr>
      <td><code translate="no">idx</code></td>
      <td>The name of the algorithm used to arrange data in the specific field. For applicable algorithms, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a> and <a href="https://milvus.io/docs/disk_index.md">On-disk Index</a>.</td>
    </tr>
    <tr>
      <td><code translate="no">async</code></td>
      <td>Whether this operation is asynchronous.</td>
    </tr>
    <tr>
      <td><code translate="no">opts</code></td>
      <td>The fine-tuning parameters for the specified index type. You can include multiple `entity.IndexOption` in this request. For details on possible keys and value ranges, refer to <a href="https://milvus.io/docs/index.md">In-memory Index</a>.</td>
    </tr>
  </tbody>
</table>
<table class="language-shell">
    <thead>
        <tr>
        <th>Parameter</th>
        <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td><code translate="no">collectionName</code></td>
        <td>The name of the collection.</td>
        </tr>
        <tr>
        <td><code translate="no">indexParams</code></td>
        <td>The index parameters for the collection to create.</td>
        </tr>
        <tr>
        <td><code translate="no">indexParams.metricType</code></td>
        <td>The similarity metric type used to build the index. The value defaults to COSINE.</td>
        </tr>
        <tr>
        <td><code translate="no">indexParams.fieldName</code></td>
        <td>The name of the target field on which an index is to be created.</td>
        </tr>
        <tr>
        <td><code translate="no">indexParams.indexName</code></td>
        <td>The name of the index to create, the value defaults to the target field name.</td>
        </tr>
        <tr>
        <td><code translate="no">indexParams.indexConfig.index_type</code></td>
        <td>The type of the index to create.</td>
        </tr>
        <tr.>
        <td><code translate="no">indexParams.indexConfig.nlist</code></td>
        <td>The number of cluster units. This applies to IVF-related index types.</td>
        </tr>
    </tbody>
</table>
<h2 id="View-Collections" class="common-anchor-header">View Collections<button data-href="#View-Collections" class="anchor-icon" translate="no">
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
    </button></h2><div class="language-python">
<p>To check the details of an existing collection, use <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/describe_collection.md">describe_collection()</a>.</p>
</div>
<div class="language-java">
<p>To check the details of an existing collection, use <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/describeCollection.md">describeCollection()</a>.</p>
</div>
<div class="language-javascript">
<p>To check the details of an existing collection, use <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/describeCollection.md">describeCollection()</a>.</p>
</div>
<div class="language-go">
<p>To check the details of an existing collection, use <a href="https://milvus.io/api-reference/go/v2.4.x/Collection/DescribeCollection.md">DescribeCollection()</a>.</p>
</div>
<div class="language-shell">
<p>To view the definition of a collection, you can use the <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Describe.md"><code translate="no">POST /v2/vectordb/collections/describe</code></a> and the <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/List.md"><code translate="no">POST /v2/vectordb/collections/list</code></a> API endpoints.</p>
</div>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#go">Go</a>
    <a href="#shell">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 5. View Collections</span>
res = client.describe_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">#     &quot;auto_id&quot;: false,</span>
<span class="hljs-comment">#     &quot;num_shards&quot;: 1,</span>
<span class="hljs-comment">#     &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">#     &quot;fields&quot;: [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;field_id&quot;: 100,</span>
<span class="hljs-comment">#             &quot;name&quot;: &quot;my_id&quot;,</span>
<span class="hljs-comment">#             &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">#             &quot;type&quot;: 5,</span>
<span class="hljs-comment">#             &quot;params&quot;: {},</span>
<span class="hljs-comment">#             &quot;element_type&quot;: 0,</span>
<span class="hljs-comment">#             &quot;is_primary&quot;: true</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;field_id&quot;: 101,</span>
<span class="hljs-comment">#             &quot;name&quot;: &quot;my_vector&quot;,</span>
<span class="hljs-comment">#             &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">#             &quot;type&quot;: 101,</span>
<span class="hljs-comment">#             &quot;params&quot;: {</span>
<span class="hljs-comment">#                 &quot;dim&quot;: 5</span>
<span class="hljs-comment">#             },</span>
<span class="hljs-comment">#             &quot;element_type&quot;: 0</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [],</span>
<span class="hljs-comment">#     &quot;collection_id&quot;: 448143479230158446,</span>
<span class="hljs-comment">#     &quot;consistency_level&quot;: 2,</span>
<span class="hljs-comment">#     &quot;properties&quot;: {},</span>
<span class="hljs-comment">#     &quot;num_partitions&quot;: 1,</span>
<span class="hljs-comment">#     &quot;enable_dynamic_field&quot;: true</span>
<span class="hljs-comment"># }</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DescribeCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.response.DescribeCollectionResp;

<span class="hljs-comment">// 4. View collections</span>
<span class="hljs-type">DescribeCollectionReq</span> <span class="hljs-variable">describeCollectionReq</span> <span class="hljs-operator">=</span> DescribeCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

<span class="hljs-type">DescribeCollectionResp</span> <span class="hljs-variable">describeCollectionRes</span> <span class="hljs-operator">=</span> client.describeCollection(describeCollectionReq);

System.out.println(JSONObject.toJSON(describeCollectionRes));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//     &quot;createTime&quot;: 449005822816026627,</span>
<span class="hljs-comment">//     &quot;collectionSchema&quot;: {&quot;fieldSchemaList&quot;: [</span>
<span class="hljs-comment">//         {</span>
<span class="hljs-comment">//             &quot;autoID&quot;: false,</span>
<span class="hljs-comment">//             &quot;dataType&quot;: &quot;Int64&quot;,</span>
<span class="hljs-comment">//             &quot;name&quot;: &quot;my_id&quot;,</span>
<span class="hljs-comment">//             &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">//             &quot;isPrimaryKey&quot;: true,</span>
<span class="hljs-comment">//             &quot;maxLength&quot;: 65535,</span>
<span class="hljs-comment">//             &quot;isPartitionKey&quot;: false</span>
<span class="hljs-comment">//         },</span>
<span class="hljs-comment">//         {</span>
<span class="hljs-comment">//             &quot;autoID&quot;: false,</span>
<span class="hljs-comment">//             &quot;dataType&quot;: &quot;FloatVector&quot;,</span>
<span class="hljs-comment">//             &quot;name&quot;: &quot;my_vector&quot;,</span>
<span class="hljs-comment">//             &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">//             &quot;isPrimaryKey&quot;: false,</span>
<span class="hljs-comment">//             &quot;dimension&quot;: 5,</span>
<span class="hljs-comment">//             &quot;maxLength&quot;: 65535,</span>
<span class="hljs-comment">//             &quot;isPartitionKey&quot;: false</span>
<span class="hljs-comment">//         }</span>
<span class="hljs-comment">//     ]},</span>
<span class="hljs-comment">//     &quot;vectorFieldName&quot;: [&quot;my_vector&quot;],</span>
<span class="hljs-comment">//     &quot;autoID&quot;: false,</span>
<span class="hljs-comment">//     &quot;fieldNames&quot;: [</span>
<span class="hljs-comment">//         &quot;my_id&quot;,</span>
<span class="hljs-comment">//         &quot;my_vector&quot;</span>
<span class="hljs-comment">//     ],</span>
<span class="hljs-comment">//     &quot;description&quot;: &quot;&quot;,</span>
<span class="hljs-comment">//     &quot;numOfPartitions&quot;: 1,</span>
<span class="hljs-comment">//     &quot;primaryFieldName&quot;: &quot;my_id&quot;,</span>
<span class="hljs-comment">//     &quot;enableDynamicField&quot;: true,</span>
<span class="hljs-comment">//     &quot;collectionName&quot;: &quot;customized_setup_2&quot;</span>
<span class="hljs-comment">// }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. View Collections</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   virtual_channel_names: [ &#x27;by-dev-rootcoord-dml_13_449007919953017716v0&#x27; ],</span>
<span class="hljs-comment">//   physical_channel_names: [ &#x27;by-dev-rootcoord-dml_13&#x27; ],</span>
<span class="hljs-comment">//   aliases: [],</span>
<span class="hljs-comment">//   start_positions: [],</span>
<span class="hljs-comment">//   properties: [],</span>
<span class="hljs-comment">//   status: {</span>
<span class="hljs-comment">//     extra_info: {},</span>
<span class="hljs-comment">//     error_code: &#x27;Success&#x27;,</span>
<span class="hljs-comment">//     reason: &#x27;&#x27;,</span>
<span class="hljs-comment">//     code: 0,</span>
<span class="hljs-comment">//     retriable: false,</span>
<span class="hljs-comment">//     detail: &#x27;&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   schema: {</span>
<span class="hljs-comment">//     fields: [ [Object], [Object] ],</span>
<span class="hljs-comment">//     properties: [],</span>
<span class="hljs-comment">//     name: &#x27;customized_setup_2&#x27;,</span>
<span class="hljs-comment">//     description: &#x27;&#x27;,</span>
<span class="hljs-comment">//     autoID: false,</span>
<span class="hljs-comment">//     enable_dynamic_field: false</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   collectionID: &#x27;449007919953017716&#x27;,</span>
<span class="hljs-comment">//   created_timestamp: &#x27;449024569603784707&#x27;,</span>
<span class="hljs-comment">//   created_utc_timestamp: &#x27;1712892797866&#x27;,</span>
<span class="hljs-comment">//   shards_num: 1,</span>
<span class="hljs-comment">//   consistency_level: &#x27;Bounded&#x27;,</span>
<span class="hljs-comment">//   collection_name: &#x27;customized_setup_2&#x27;,</span>
<span class="hljs-comment">//   db_name: &#x27;default&#x27;,</span>
<span class="hljs-comment">//   num_partitions: &#x27;1&#x27;</span>
<span class="hljs-comment">// }</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-Go"><span class="hljs-comment">// 4. View collections</span>

res, err := client.DescribeCollection(ctx, <span class="hljs-string">&quot;customized_setup_2&quot;</span>)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to describe collection:&quot;</span>, err.Error())
}
fmt.Printf(<span class="hljs-string">&quot;ConsistencyLevel: %v\nID: %v\nLoaded: %v\nName: %v\nPhysicalChannels: %v\nProperties: %v\nSchemaField1: %v\nSchemaField2: %v\nShardNum: %v\nVirtualChannels: %v\nSchemaAutoID: %v\nSchemaCollectionName: %v\nSchemaDescription: %v&quot;</span>,
    res.ConsistencyLevel, res.ID, res.Loaded, res.Name, res.PhysicalChannels,
    res.Properties, res.Schema.Fields[<span class="hljs-number">0</span>], res.Schema.Fields[<span class="hljs-number">1</span>], res.ShardNum,
    res.VirtualChannels, res.Schema.AutoID, res.Schema.CollectionName, res.Schema.Description)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// ConsistencyLevel: 2</span>
<span class="hljs-comment">// ID: 453858520413977280</span>
<span class="hljs-comment">// Loaded: false</span>
<span class="hljs-comment">// Name: customized_setup_2</span>
<span class="hljs-comment">// PhysicalChannels: [by-dev-rootcoord-dml_14]</span>
<span class="hljs-comment">// Properties: map[]</span>
<span class="hljs-comment">// SchemaField1: &amp;{100 my_id true false  int64 map[] map[] false false false undefined}</span>
<span class="hljs-comment">// SchemaField2: &amp;{101 my_vector false false  []float32 map[dim:5] map[] false false false undefined}</span>
<span class="hljs-comment">// ShardNum: 1</span>
<span class="hljs-comment">// VirtualChannels: [by-dev-rootcoord-dml_14_453858520413977280v0]</span>
<span class="hljs-comment">// SchemaAutoID: false</span>
<span class="hljs-comment">// SchemaCollectionName: customized_setup_2</span>
<span class="hljs-comment">// SchemaDescription: 2024/11/12 14:06:53 my_rag_collection</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell">curl -X POST &quot;http://${MILVUS_URI}/v2/vectordb/collections/describe&quot; \
-H &quot;Content-Type: application/json&quot; \
-d &#x27;{
    &quot;dbName&quot;: &quot;default&quot;,
    &quot;collectionName&quot;: &quot;test_collection&quot;
}&#x27;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">{</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;code&quot;</span>: 0,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;data&quot;</span>: {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;aliases&quot;</span>: [],</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;autoId&quot;</span>: <span class="hljs-literal">false</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;collectionID&quot;</span>: 448707763883002014,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;collectionName&quot;</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;consistencyLevel&quot;</span>: <span class="hljs-string">&quot;Bounded&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;description&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;enableDynamicField&quot;</span>: <span class="hljs-literal">true</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;fields&quot;</span>: [</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;autoId&quot;</span>: <span class="hljs-literal">false</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;description&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;id&quot;</span>: 100,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;id&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;partitionKey&quot;</span>: <span class="hljs-literal">false</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;primaryKey&quot;</span>: <span class="hljs-literal">true</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;Int64&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            },</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;autoId&quot;</span>: <span class="hljs-literal">false</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;description&quot;</span>: <span class="hljs-string">&quot;&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;id&quot;</span>: 101,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;params&quot;</span>: [</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                    {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                        <span class="hljs-string">&quot;key&quot;</span>: <span class="hljs-string">&quot;dim&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                        <span class="hljs-string">&quot;value&quot;</span>: <span class="hljs-string">&quot;5&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                    }</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                ],</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;partitionKey&quot;</span>: <span class="hljs-literal">false</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;primaryKey&quot;</span>: <span class="hljs-literal">false</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;FloatVector&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            }</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        ],</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;indexes&quot;</span>: [</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;fieldName&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;indexName&quot;</span>: <span class="hljs-string">&quot;vector&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">                <span class="hljs-string">&quot;metricType&quot;</span>: <span class="hljs-string">&quot;COSINE&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">            }</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        ],</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;load&quot;</span>: <span class="hljs-string">&quot;LoadStateLoaded&quot;</span>,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;partitionsNum&quot;</span>: 1,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;properties&quot;</span>: [],</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;shardsNum&quot;</span>: 1</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    }</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">}</span>
<button class="copy-code-btn"></button></code></pre>
<p>To list all existing collections, you can do as follows:</p>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#go">Go</a>
    <a href="#shell">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 6. List all collection names</span>
res = client.list_collections()

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">#     &quot;quick_setup&quot;,</span>
<span class="hljs-comment">#     &quot;customized_setup_1&quot;</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.response.ListCollectionsResp;

<span class="hljs-comment">// 5. List all collection names</span>
<span class="hljs-type">ListCollectionsResp</span> <span class="hljs-variable">listCollectionsRes</span> <span class="hljs-operator">=</span> client.listCollections();

System.out.println(listCollectionsRes.getCollectionNames());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">//     &quot;quick_setup&quot;,</span>
<span class="hljs-comment">//     &quot;customized_setup_1&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. List all collection names</span>
<span class="hljs-title class_">ListCollectionsResp</span> listCollectionsRes = client.<span class="hljs-title function_">listCollections</span>();

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(listCollectionsRes.<span class="hljs-title function_">getCollectionNames</span>());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;customized_setup_1&quot;,</span>
<span class="hljs-comment">//     &quot;quick_setup&quot;,</span>
<span class="hljs-comment">//     &quot;customized_setup_2&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-Go"><span class="hljs-comment">// 5. List all collection names</span>
collections, err := client.ListCollections(ctx)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to list collection:&quot;</span>, err.Error())
}
<span class="hljs-keyword">for</span> _, c := <span class="hljs-keyword">range</span> collections {
    log.Println(c.Name)
}

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// customized_setup_2</span>
<span class="hljs-comment">// quick_setup</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/list&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{</span></span>
    &quot;dbName&quot;: &quot;default&quot;
}&#x27;
<span class="hljs-meta prompt_">
# </span><span class="language-bash"><span class="hljs-string">{</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">  &quot;code&quot;: 0,</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">  &quot;data&quot;: [</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;quick_setup&quot;,</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;customized_setup_1&quot;,</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;customized_setup_2&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">  ]</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">}</span></span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Load--Release-Collection" class="common-anchor-header">Load & Release Collection<button data-href="#Load--Release-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>During the loading process of a collection, Milvus loads the collection’s index file into memory. Conversely, when releasing a collection, Milvus unloads the index file from memory. Before conducting searches in a collection, ensure that the collection is loaded.</p>
<h3 id="Load-a-collection" class="common-anchor-header">Load a collection</h3><div class="language-python">
<p>To load a collection, use the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/load_collection.md"><code translate="no">load_collection()</code></a> method, specifying the collection name. You can also set <code translate="no">replica_number</code> to determine how many in-memory replicas of data segments to create on query nodes when the collection is loaded.</p>
<ul>
<li>Milvus Standalone: The maximum allowed value for <code translate="no">replica_number</code> is 1.</li>
<li>Milvus Cluster: The maximum value should not exceed the <code translate="no">queryNode.replicas</code> set in your Milvus configurations. For additional details, refer to <a href="https://milvus.io/docs/configure_querynode.md#Query-Node-related-Configurations">Query Node-related Configurations</a>.</li>
</ul>
</div>
<div class="language-java">
<p>To load a collection, use the <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/loadCollection.md"><code translate="no">loadCollection()</code></a> method, specifying the collection name.</p>
</div>
<div class="language-javascript">
<p>To load a collection, use the <a href="https://milvus.io/api-reference/node/v2.4.x/Management/loadCollection.md"><code translate="no">loadCollection()</code></a> method, specifying the collection name.</p>
</div>
<div class="language-go">
<p>To load a collection, use the <a href="https://milvus.io/api-reference/go/v2.4.x/Collection/LoadCollection.md"><code translate="no">LoadCollection()</code></a> method, specifying the collection name.</p>
</div>
<div class="language-shell">
<p>To load a collection, you can use the <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Load.md"><code translate="no">POST /v2/vectordb/collections/load</code></a> and the <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/GetLoadState.md"><code translate="no">POST /v2/vectordb/collections/get_load_state</code></a> API endpoints.</p>
</div>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#go">Go</a>
    <a href="#shell">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 7. Load the collection</span>
client.load_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    replica_number=<span class="hljs-number">1</span> <span class="hljs-comment"># Number of replicas to create on query nodes. Max value is 1 for Milvus Standalone, and no greater than `queryNode.replicas` for Milvus Cluster.</span>
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.LoadCollectionReq;

<span class="hljs-comment">// 6. Load the collection</span>
<span class="hljs-type">LoadCollectionReq</span> <span class="hljs-variable">loadCollectionReq</span> <span class="hljs-operator">=</span> LoadCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

client.loadCollection(loadCollectionReq);

<span class="hljs-comment">// Thread.sleep(5000);</span>

<span class="hljs-comment">// 7. Get load state of the collection</span>
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">loadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

res = client.getLoadState(loadStateReq);

System.out.println(res);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 7. Load the collection</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

<span class="hljs-keyword">await</span> <span class="hljs-title function_">sleep</span>(<span class="hljs-number">3000</span>)

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 6. Load the collection</span>

err = client.LoadCollection(ctx, <span class="hljs-string">&quot;customized_setup_2&quot;</span>, <span class="hljs-literal">false</span>)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to laod collection:&quot;</span>, err.Error())
}

<span class="hljs-comment">// 7. Get load state of the collection</span>
stateLoad, err := client.GetLoadState(context.Background(), <span class="hljs-string">&quot;customized_setup_2&quot;</span>, []<span class="hljs-type">string</span>{})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to get load state:&quot;</span>, err.Error())
}
fmt.Println(stateLoad)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// 3</span>

<span class="hljs-comment">// LoadStateNotExist -&gt; LoadState = 0</span>
<span class="hljs-comment">// LoadStateNotLoad  -&gt; LoadState = 1</span>
<span class="hljs-comment">// LoadStateLoading  -&gt; LoadState = 2</span>
<span class="hljs-comment">// LoadStateLoaded   -&gt; LoadState = 3</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/load&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{</span></span>
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;
<span class="hljs-meta prompt_">
# </span><span class="language-bash"><span class="hljs-string">Output</span></span>
<span class="hljs-meta prompt_">#</span><span class="language-bash"><span class="hljs-string">
# {</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;code&quot;: 0,</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;data&quot;: {},</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">}</span></span>
<span class="hljs-meta prompt_">
$ </span><span class="language-bash"><span class="hljs-string">curl -X POST &quot;http://${MILVUS_URI}/v2/vectordb/collections/get_load_state&quot; \
-H &quot;Content-Type: application/json&quot; \
-d &#x27;</span>{</span>
  &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">{</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;code&quot;</span>: 0,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;data&quot;</span>: {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;loadProgress&quot;</span>: 100,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;loadState&quot;</span>: <span class="hljs-string">&quot;LoadStateLoaded&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    }</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">}</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Load-a-collection-partially-Public-Preview" class="common-anchor-header">Load a collection partially (Public Preview)</h3><div class="alert note">
<p>This feature is currently in public preview. The API and functionality may change in the future.</p>
</div>
<p>Upon receiving your load request, Milvus loads all vector field indexes and all scalar field data into memory. If some fields are not to be involved in searches and queries, you can exclude them from loading to reduce memory usage, improving search performance.</p>
<div class="language-python">
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 7. Load the collection</span>
client.load_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    load_fields=[<span class="hljs-string">&quot;my_id&quot;</span>, <span class="hljs-string">&quot;my_vector&quot;</span>], <span class="hljs-comment"># Load only the specified fields</span>
    skip_load_dynamic_field=<span class="hljs-literal">True</span> <span class="hljs-comment"># Skip loading the dynamic field</span>
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<p>Note that only the fields listed in <code translate="no">load_fields</code> can be used as filtering conditions and output fields in searches and queries. You should always include the primary key in the list. The field names excluded from loading will not be available for filtering or output.</p>
<p>You can use <code translate="no">skip_load_dynamic_field=True</code> to skip loading the dynamic field. Milvus treats the dynamic field as a single field, so all the keys in the dynamic field will be included or excluded together.</p>
</div>
<h3 id="Release-a-collection" class="common-anchor-header">Release a collection</h3><div class="language-python">
<p>To release a collection, use the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/release_collection.md"><code translate="no">release_collection()</code></a> method, specifying the collection name.</p>
</div>
<div class="language-java">
<p>To release a collection, use the <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/releaseCollection.md"><code translate="no">releaseCollection()</code></a> method, specifying the collection name.</p>
</div>
<div class="language-javascript">
<p>To release a collection, use the <a href="https://milvus.io/api-reference/node/v2.4.x/Management/releaseCollection.md"><code translate="no">releaseCollection()</code></a> method, specifying the collection name.</p>
</div>
<div class="language-go">
<p>To release a collection, use the <a href="https://milvus.io/api-reference/go/v2.4.x/Collection/ReleaseCollection.md"><code translate="no">ReleaseCollection()</code></a> method, specifying the collection name.</p>
</div>
<div class="language-shell">
<p>To release a collection, you can use the <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Release.md"><code translate="no">POST /v2/vectordb/collections/release</code></a> and the <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/GetLoadState.md"><code translate="no">POST /v2/vectordb/collections/get_load_state</code></a> API endpoints.</p>
</div>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#go">Go</a>
    <a href="#shell">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 8. Release the collection</span>
client.release_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.ReleaseCollectionReq;

<span class="hljs-comment">// 8. Release the collection</span>
<span class="hljs-type">ReleaseCollectionReq</span> <span class="hljs-variable">releaseCollectionReq</span> <span class="hljs-operator">=</span> ReleaseCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

client.releaseCollection(releaseCollectionReq);

<span class="hljs-comment">// Thread.sleep(1000);</span>

res = client.getLoadState(loadStateReq);

System.out.println(res);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 8. Release the collection</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releaseCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 8. Release the collection</span>
errRelease := client.ReleaseCollection(context.Background(), <span class="hljs-string">&quot;customized_setup_2&quot;</span>)
<span class="hljs-keyword">if</span> errRelease != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to release collection:&quot;</span>, errRelease.Error())
}
fmt.Println(errRelease)
stateLoad, err = client.GetLoadState(context.Background(), <span class="hljs-string">&quot;customized_setup_2&quot;</span>, []<span class="hljs-type">string</span>{})
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to get load state:&quot;</span>, err.Error())
}
fmt.Println(stateLoad)

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// 1</span>

<span class="hljs-comment">// meaning not loaded</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/release&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{</span></span>
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;
<span class="hljs-meta prompt_">
# </span><span class="language-bash"><span class="hljs-string">Output</span></span>
<span class="hljs-meta prompt_">#</span><span class="language-bash"><span class="hljs-string">
# {</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;code&quot;: 0,</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;data&quot;: {},</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">}</span></span>
<span class="hljs-meta prompt_">

$ </span><span class="language-bash"><span class="hljs-string">curl -X POST &quot;http://${MILVUS_URI}/v2/vectordb/collections/get_load_state&quot; \
-H &quot;Content-Type: application/json&quot; \
-d &#x27;</span>{</span>
  &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;
<span class="hljs-meta prompt_">

# </span><span class="language-bash">{</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;code&quot;</span>: 0,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;data&quot;</span>: {</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;loadState&quot;</span>: <span class="hljs-string">&quot;LoadStateNotLoad&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    }</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-up-aliases" class="common-anchor-header">Set up aliases<button data-href="#Set-up-aliases" class="anchor-icon" translate="no">
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
    </button></h2><p>You can assign aliases for collections to make them more meaningful in a specific context. You can assign multiple aliases for a collection, but multiple collections cannot share an alias.</p>
<h3 id="Create-aliases" class="common-anchor-header">Create aliases</h3><div class="language-python">
<p>To create aliases, use the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_alias.md"><code translate="no">create_alias()</code></a> method, specifying the collection name and the alias.</p>
</div>
<div class="language-java">
<p>To create aliases, use the <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createAlias.md"><code translate="no">createAlias()</code></a> method, specifying the collection name and the alias.</p>
</div>
<div class="language-javascript">
<p>To create aliases, use the <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createAlias.md"><code translate="no">createAlias()</code></a> method, specifying the collection name and the alias.</p>
</div>
<div class="language-shell">
<p>To create aliases for a collection, you can use the <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/Create.md"><code translate="no">POST /v2/vectordb/aliases/create</code></a> API endpoint.</p>
</div>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#shell">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.1. Create aliases</span>
client.create_alias(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    alias=<span class="hljs-string">&quot;bob&quot;</span>
)

client.create_alias(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    alias=<span class="hljs-string">&quot;alice&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.CreateAliasReq;

<span class="hljs-comment">// 9. Manage aliases</span>

<span class="hljs-comment">// 9.1 Create alias</span>
<span class="hljs-type">CreateAliasReq</span> <span class="hljs-variable">createAliasReq</span> <span class="hljs-operator">=</span> CreateAliasReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .alias(<span class="hljs-string">&quot;bob&quot;</span>)
    .build();

client.createAlias(createAliasReq);

createAliasReq = CreateAliasReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .alias(<span class="hljs-string">&quot;alice&quot;</span>)
    .build();

client.createAlias(createAliasReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9. Manage aliases</span>
<span class="hljs-comment">// 9.1 Create aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;bob&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;alice&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/create&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{</span></span>
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;,
    &quot;aliasName&quot;: &quot;bob&quot;
}&#x27;
<span class="hljs-meta prompt_">
# </span><span class="language-bash"><span class="hljs-string">Output</span></span>
<span class="hljs-meta prompt_">#</span><span class="language-bash"><span class="hljs-string">
# {</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;code&quot;: 0,</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;data&quot;: {}</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">}</span></span>
<span class="hljs-meta prompt_">
$ </span><span class="language-bash"><span class="hljs-string">curl -X POST &quot;http://${MILVUS_URI}/v2/vectordb/aliases/create&quot; \
-H &quot;Content-Type: application/json&quot; \
-d &#x27;</span>{</span>
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;,
    &quot;aliasName&quot;: &quot;alice&quot;
}&#x27;
<span class="hljs-meta prompt_">
# </span><span class="language-bash">Output</span>
<span class="hljs-meta prompt_">#</span><span class="language-bash">
<span class="hljs-comment"># {</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;code&quot;</span>: 0,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;data&quot;</span>: {}</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">}</span>
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
      <td>The name of the collection to create an alias for.</td>
    </tr>
    <tr>
      <td><code translate="no">alias</code></td>
      <td>The alias of the collection. Before this operation, ensure that the alias does not already exist. If it does, exceptions will occur.</td>
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
      <td><code translate="no">collectionName</code></td>
      <td>The name of the collection to create an alias for.</td>
    </tr>
    <tr>
      <td><code translate="no">alias</code></td>
      <td>The alias of the collection. Before this operation, ensure that the alias does not already exist. If it does, exceptions will occur.</td>
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
      <td>The name of the collection to create an alias for.</td>
    </tr>
    <tr>
      <td><code translate="no">alias</code></td>
      <td>The alias of the collection. Before this operation, ensure that the alias does not already exist. If it does, exceptions will occur.</td>
    </tr>
  </tbody>
</table>
<table class="language-shell">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code translate="no">collectionName</code></td>
      <td>The name of the collection to create an alias for.</td>
    </tr>
    <tr>
      <td><code translate="no">aliasName</code></td>
      <td>The alias of the collection. Before this operation, ensure that the alias does not already exist. If it does, exceptions will occur.</td>
    </tr>
  </tbody>
</table>
<h3 id="List-aliases" class="common-anchor-header">List aliases</h3><div class="language-python">
<p>To list aliases, use the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/list_aliases.md"><code translate="no">list_aliases()</code></a> method, specifying the collection name.</p>
</div>
<div class="language-java">
<p>To list aliases, use the <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/listAliases.md"><code translate="no">listAliases()</code></a> method, specifying the collection name.</p>
</div>
<div class="language-javascript">
<p>To list aliases, use the <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/listAliases.md"><code translate="no">listAliases()</code></a> method, specifying the collection name.</p>
</div>
<div class="language-shell">
<p>To list aliases for a collection, you can use the <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/List.md"><code translate="no">POST /v2/vectordb/aliases/list</code></a> API endpoint.</p>
</div>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#shell">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.2. List aliases</span>
res = client.list_aliases(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [</span>
<span class="hljs-comment">#         &quot;bob&quot;,</span>
<span class="hljs-comment">#         &quot;alice&quot;</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.ListAliasesReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.ListAliasResp;

<span class="hljs-comment">// 9.2 List alises</span>
<span class="hljs-type">ListAliasesReq</span> <span class="hljs-variable">listAliasesReq</span> <span class="hljs-operator">=</span> ListAliasesReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

<span class="hljs-type">ListAliasResp</span> <span class="hljs-variable">listAliasRes</span> <span class="hljs-operator">=</span> client.listAliases(listAliasesReq);

System.out.println(listAliasRes.getAlias());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;bob&quot;,</span>
<span class="hljs-comment">//     &quot;alice&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.2 List aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listAliases</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">aliases</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;bob&#x27;, &#x27;alice&#x27; ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/list&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{</span></span>
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;
<span class="hljs-meta prompt_">
# </span><span class="language-bash"><span class="hljs-string">{</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;code&quot;: 0,</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;data&quot;: [</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">        &quot;bob&quot;,</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">        &quot;alice&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    ]</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">}</span></span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Describe-aliases" class="common-anchor-header">Describe aliases</h3><div class="language-python">
<p>To describe aliases, use the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/describe_alias.md"><code translate="no">describe_alias()</code></a> method, specifying the alias.</p>
</div>
<div class="language-java">
<p>To describe aliases, use the <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/describeAlias.md"><code translate="no">describeAlias()</code></a> method, specifying the alias.</p>
</div>
<div class="language-javascript">
<p>To describe aliases, use the <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/describeAlias.md"><code translate="no">describeAlias()</code></a> method, specifying the alias.</p>
</div>
<div class="language-shell">
<p>To describe aliases for a collection, you can use the <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/Describe.md"><code translate="no">POST /v2/vectordb/aliases/describe</code></a> API endpoint.</p>
</div>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#shell">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.3. Describe aliases</span>
res = client.describe_alias(
    alias=<span class="hljs-string">&quot;bob&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;alias&quot;: &quot;bob&quot;,</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.DescribeAliasReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.utility.response.DescribeAliasResp;

<span class="hljs-comment">// 9.3 Describe alias</span>
<span class="hljs-type">DescribeAliasReq</span> <span class="hljs-variable">describeAliasReq</span> <span class="hljs-operator">=</span> DescribeAliasReq.builder()
    .alias(<span class="hljs-string">&quot;bob&quot;</span>)
    .build();

<span class="hljs-type">DescribeAliasResp</span> <span class="hljs-variable">describeAliasRes</span> <span class="hljs-operator">=</span> client.describeAlias(describeAliasReq);

System.out.println(JSONObject.toJSON(describeAliasRes));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//     &quot;alias&quot;: &quot;bob&quot;,</span>
<span class="hljs-comment">//     &quot;collectionName&quot;: &quot;customized_setup_2&quot;</span>
<span class="hljs-comment">// }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.3 Describe aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">describeAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;bob&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   status: {</span>
<span class="hljs-comment">//     extra_info: {},</span>
<span class="hljs-comment">//     error_code: &#x27;Success&#x27;,</span>
<span class="hljs-comment">//     reason: &#x27;&#x27;,</span>
<span class="hljs-comment">//     code: 0,</span>
<span class="hljs-comment">//     retriable: false,</span>
<span class="hljs-comment">//     detail: &#x27;&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   db_name: &#x27;default&#x27;,</span>
<span class="hljs-comment">//   alias: &#x27;bob&#x27;,</span>
<span class="hljs-comment">//   collection: &#x27;customized_setup_2&#x27;</span>
<span class="hljs-comment">// }</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/describe&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{</span></span>
    &quot;aliasName&quot;: &quot;bob&quot;
}&#x27;
<span class="hljs-meta prompt_">
# </span><span class="language-bash"><span class="hljs-string">{</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;code&quot;: 0,</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;data&quot;: {</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">        &quot;aliasName&quot;: &quot;bob&quot;,</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">        &quot;collectionName&quot;: &quot;quick_setup&quot;,</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">        &quot;dbName&quot;: &quot;default&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    }</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">}</span></span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Reassign-aliases" class="common-anchor-header">Reassign aliases</h3><div class="language-python">
<p>To reassign aliases to other collections, use the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/alter_alias.md"><code translate="no">alter_alias()</code></a> method, specifying the collection name and the alias.</p>
</div>
<div class="language-java">
<p>To reassign aliases to other collections, use the <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/alterAlias.md"><code translate="no">alterAlias()</code></a> method, specifying the collection name and the alias.</p>
</div>
<div class="language-javascript">
<p>To reassign aliases to other collections, use the <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/alterAlias.md"><code translate="no">alterAlias()</code></a> method, specifying the collection name and the alias.</p>
</div>
<div class="language-shell">
<p>To reassign aliases to other collections, you can use the <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/Alter.md"><code translate="no">POST /v2/vectordb/aliases/alter</code></a> API endpoint.</p>
</div>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#shell">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.4 Reassign aliases to other collections</span>
client.alter_alias(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>,
    alias=<span class="hljs-string">&quot;alice&quot;</span>
)

res = client.list_aliases(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [</span>
<span class="hljs-comment">#         &quot;alice&quot;</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;customized_setup_1&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>

res = client.list_aliases(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;aliases&quot;: [</span>
<span class="hljs-comment">#         &quot;bob&quot;</span>
<span class="hljs-comment">#     ],</span>
<span class="hljs-comment">#     &quot;collection_name&quot;: &quot;customized_setup_2&quot;,</span>
<span class="hljs-comment">#     &quot;db_name&quot;: &quot;default&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.AlterAliasReq;

<span class="hljs-comment">// 9.4 Reassign alias to other collections</span>
<span class="hljs-type">AlterAliasReq</span> <span class="hljs-variable">alterAliasReq</span> <span class="hljs-operator">=</span> AlterAliasReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
    .alias(<span class="hljs-string">&quot;alice&quot;</span>)
    .build();

client.alterAlias(alterAliasReq);

listAliasesReq = ListAliasesReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
    .build();

listAliasRes = client.listAliases(listAliasesReq);

System.out.println(listAliasRes.getAlias());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [&quot;alice&quot;]</span>

listAliasesReq = ListAliasesReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

listAliasRes = client.listAliases(listAliasesReq);

System.out.println(listAliasRes.getAlias());

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [&quot;bob&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.4 Reassign aliases to other collections</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">alterAlias</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>,
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;alice&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listAliases</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">aliases</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;alice&#x27; ]</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listAliases</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">aliases</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;bob&#x27; ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/alter&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{</span></span>
     &quot;collectionName&quot;: &quot;customized_setup_1&quot;,
     &quot;aliasName&quot;: &quot;alice&quot;
}&#x27;
<span class="hljs-meta prompt_">
# </span><span class="language-bash"><span class="hljs-string">{</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;code&quot;: 0,</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;data&quot;: {}</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">}</span></span>
<span class="hljs-meta prompt_">

$ </span><span class="language-bash"><span class="hljs-string">curl -X POST &quot;http://${MILVUS_URI}/v2/vectordb/aliases/list&quot; \
-H &quot;Content-Type: application/json&quot; \
-d &#x27;</span>{</span>
    &quot;collectionName&quot;: &quot;customized_setup_1&quot;
}&#x27;
<span class="hljs-meta prompt_">

# </span><span class="language-bash">{</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;code&quot;</span>: 0,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;data&quot;</span>: [</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">        <span class="hljs-string">&quot;alice&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    ]</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">}</span>
<span class="hljs-meta prompt_">

$ </span><span class="language-bash">curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/list&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{</span></span>
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;
<span class="hljs-meta prompt_">

# </span><span class="language-bash"><span class="hljs-string">{</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;code&quot;: 0,</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;data&quot;: [</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">        &quot;bob&quot;</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    ]</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">}</span></span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Drop-aliases" class="common-anchor-header">Drop aliases</h3><div class="language-python">
<p>To drop aliases, use the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/drop_alias.md"><code translate="no">drop_alias()</code></a> method, specifying the alias.</p>
</div>
<div class="language-java">
<p>To drop aliases, use the <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/dropAlias.md"><code translate="no">dropAlias()</code></a> method, specifying the alias.</p>
</div>
<div class="language-javascript">
<p>To drop aliases, use the <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/dropAlias.md"><code translate="no">dropAlias()</code></a> method, specifying the alias.</p>
</div>
<div class="language-shell">
<p>To drop aliases for a collection, you can use the <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Alias%20(v2)/Drop.md"><code translate="no">POST /v2/vectordb/aliases/drop</code></a> API endpoint.</p>
</div>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 9.5 Drop aliases</span>
client.drop_alias(
    alias=<span class="hljs-string">&quot;bob&quot;</span>
)

client.drop_alias(
    alias=<span class="hljs-string">&quot;alice&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.utility.request.DropAliasReq;

<span class="hljs-comment">// 9.5 Drop alias</span>
<span class="hljs-type">DropAliasReq</span> <span class="hljs-variable">dropAliasReq</span> <span class="hljs-operator">=</span> DropAliasReq.builder()
    .alias(<span class="hljs-string">&quot;bob&quot;</span>)
    .build();

client.dropAlias(dropAliasReq);

dropAliasReq = DropAliasReq.builder()
    .alias(<span class="hljs-string">&quot;alice&quot;</span>)
    .build();

client.dropAlias(dropAliasReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 9.5 Drop aliases</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropAlias</span>({
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;bob&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropAlias</span>({
    <span class="hljs-attr">alias</span>: <span class="hljs-string">&quot;alice&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/aliases/drop&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{</span></span>
    &quot;aliasName&quot;: &quot;bob&quot;
}&#x27;
<span class="hljs-meta prompt_">
# </span><span class="language-bash"><span class="hljs-string">{</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;code&quot;: 0,</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;data&quot;: {}</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">}</span></span>
<span class="hljs-meta prompt_">

$ </span><span class="language-bash"><span class="hljs-string">curl -X POST &quot;http://${MILVUS_URI}/v2/vectordb/aliases/drop&quot; \
-H &quot;Content-Type: application/json&quot; \
-d &#x27;</span>{</span>
    &quot;aliasName&quot;: &quot;alice&quot;
}&#x27;
<span class="hljs-meta prompt_">

# </span><span class="language-bash">{</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;code&quot;</span>: 0,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;data&quot;</span>: {}</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">}</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Set-Properties" class="common-anchor-header">Set Properties<button data-href="#Set-Properties" class="anchor-icon" translate="no">
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
    </button></h2><p>You can set properties for a collection, such as <code translate="no">ttl.seconds</code> and <code translate="no">mmap.enabled</code>. For more information, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/set_properties.md">set_properties()</a>.</p>
<div class="alert note">
<p>The code snippets in this section use the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Connections/connect.md">PyMilvus ORM module</a> to interact with Milvus. Code snippets with the new <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient SDK</a> will be available soon.</p>
</div>
<h3 id="Set-TTL" class="common-anchor-header">Set TTL</h3><p>Set the Time-To-Live (TTL) for the data in the collection, which specifies how long the data should be retained before it is automatically deleted.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection, connections

<span class="hljs-comment"># Connect to Milvus server</span>
connections.connect(host=<span class="hljs-string">&quot;localhost&quot;</span>, port=<span class="hljs-string">&quot;19530&quot;</span>) <span class="hljs-comment"># Change to your Milvus server IP and port</span>

<span class="hljs-comment"># Get existing collection</span>
collection = Collection(<span class="hljs-string">&quot;quick_setup&quot;</span>)

<span class="hljs-comment"># Set the TTL for the data in the collection</span>
collection.set_properties(
    properties={
        <span class="hljs-string">&quot;collection.ttl.seconds&quot;</span>: <span class="hljs-number">60</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-MMAP" class="common-anchor-header">Set MMAP</h3><p>Configure the memory mapping (MMAP) property for the collection, which determines whether data is mapped into memory to improve query performance. For more information, refer to <a href="https://milvus.io/docs/mmap.md#Configure-memory-mapping">Configure memory mapping
</a>.</p>
<div class="alert note">
<p>Before setting the MMAP property, release the collection first. Otherwise, an error will occur.</p>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> Collection, connections

<span class="hljs-comment"># Connect to Milvus server</span>
connections.connect(host=<span class="hljs-string">&quot;localhost&quot;</span>, port=<span class="hljs-string">&quot;19530&quot;</span>) <span class="hljs-comment"># Change to your Milvus server IP and port</span>

<span class="hljs-comment"># Get existing collection</span>
collection = Collection(<span class="hljs-string">&quot;quick_setup&quot;</span>)

<span class="hljs-comment"># Before setting memory mapping property, we need to release the collection first.</span>
collection.release()

<span class="hljs-comment"># Set memory mapping property to True or Flase</span>
collection.set_properties(
    properties={
        <span class="hljs-string">&quot;mmap.enabled&quot;</span>: <span class="hljs-literal">True</span>
    }
)
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-a-Collection" class="common-anchor-header">Drop a Collection<button data-href="#Drop-a-Collection" class="anchor-icon" translate="no">
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
    </button></h2><p>If a collection is no longer needed, you can drop the collection.</p>
<div class="language-python">
<p>To drop a collection, use the <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/drop_collection.md"><code translate="no">drop_collection()</code></a> method, specifying the collection name.</p>
</div>
<div class="language-java">
<p>To drop a collection, use the <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/dropCollection.md"><code translate="no">dropCollection()</code></a> method, specifying the collection name.</p>
</div>
<div class="language-javascript">
<p>To drop a collection, use the <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/dropCollection.md"><code translate="no">dropCollection()</code></a> method, specifying the collection name.</p>
</div>
<div class="language-go">
<p>To drop a collection, use the <a href="https://milvus.io/api-reference/go/v2.4.x/Collection/DropCollection.md"><code translate="no">DropCollection()</code></a> method, specifying the collection name.</p>
</div>
<div class="language-shell">
<p>To drop a collection, you can use the <a href="https://milvus.io/api-reference/restful/v2.4.x/v2/Collection%20(v2)/Drop.md"><code translate="no">POST /v2/vectordb/collections/drop</code></a> API endpoint.</p>
</div>
<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    <a href="#go">Go</a>
    <a href="#shell">cURL</a>
</div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 10. Drop the collections</span>
client.drop_collection(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>
)

client.drop_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_1&quot;</span>
)

client.drop_collection(
    collection_name=<span class="hljs-string">&quot;customized_setup_2&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.DropCollectionReq;

<span class="hljs-comment">// 10. Drop collections</span>

<span class="hljs-type">DropCollectionReq</span> <span class="hljs-variable">dropQuickSetupParam</span> <span class="hljs-operator">=</span> DropCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

client.dropCollection(dropQuickSetupParam);

<span class="hljs-type">DropCollectionReq</span> <span class="hljs-variable">dropCustomizedSetupParam</span> <span class="hljs-operator">=</span> DropCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_1&quot;</span>)
    .build();

client.dropCollection(dropCustomizedSetupParam);

dropCustomizedSetupParam = DropCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;customized_setup_2&quot;</span>)
    .build();

client.dropCollection(dropCustomizedSetupParam);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 10. Drop the collection</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_2&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;customized_setup_1&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">dropCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// 10. Drop collections</span>

err = client.DropCollection(ctx, <span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop collection:&quot;</span>, err.Error())
}
err = client.DropCollection(ctx, <span class="hljs-string">&quot;customized_setup_2&quot;</span>)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    log.Fatal(<span class="hljs-string">&quot;failed to drop collection:&quot;</span>, err.Error())
}
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/drop&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{</span></span>
    &quot;collectionName&quot;: &quot;quick_setup&quot;
}&#x27;
<span class="hljs-meta prompt_">
# </span><span class="language-bash"><span class="hljs-string">{</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;code&quot;: 0,</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;data&quot;: {}</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">}</span></span>
<span class="hljs-meta prompt_">

$ </span><span class="language-bash"><span class="hljs-string">curl -X POST &quot;http://${MILVUS_URI}/v2/vectordb/collections/drop&quot; \
-H &quot;Content-Type: application/json&quot; \
-d &#x27;</span>{</span>
    &quot;collectionName&quot;: &quot;customized_setup_1&quot;
}&#x27;
<span class="hljs-meta prompt_">

# </span><span class="language-bash">{</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;code&quot;</span>: 0,</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">    <span class="hljs-string">&quot;data&quot;</span>: {}</span>
<span class="hljs-meta prompt_"># </span><span class="language-bash">}</span>
<span class="hljs-meta prompt_">

$ </span><span class="language-bash">curl -X POST <span class="hljs-string">&quot;http://<span class="hljs-variable">${MILVUS_URI}</span>/v2/vectordb/collections/drop&quot;</span> \
-H <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \
-d <span class="hljs-string">&#x27;{</span></span>
    &quot;collectionName&quot;: &quot;customized_setup_2&quot;
}&#x27;
<span class="hljs-meta prompt_">

# </span><span class="language-bash"><span class="hljs-string">{</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;code&quot;: 0,</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">    &quot;data&quot;: {}</span></span>
<span class="hljs-meta prompt_"># </span><span class="language-bash"><span class="hljs-string">}</span></span>
<button class="copy-code-btn"></button></code></pre>
