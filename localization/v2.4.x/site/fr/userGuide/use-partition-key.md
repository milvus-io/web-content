---
id: use-partition-key.md
title: Utiliser la clé de partition
---
<h1 id="Use-Partition-Key" class="common-anchor-header">Utiliser la clé de partition<button data-href="#Use-Partition-Key" class="anchor-icon" translate="no">
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
    </button></h1><p>Ce guide vous explique comment utiliser la clé de partition pour accélérer la récupération des données de votre collection.</p>
<h2 id="Overview" class="common-anchor-header">Vue d'ensemble<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez définir un champ particulier d'une collection comme clé de partition afin que Milvus distribue les entités entrantes dans différentes partitions en fonction de leurs valeurs de partition respectives dans ce champ. Cela permet de regrouper les entités ayant la même valeur clé dans une partition, ce qui accélère les performances de recherche en évitant de devoir parcourir des partitions non pertinentes lors du filtrage par le champ clé. Par rapport aux méthodes de filtrage traditionnelles, la clé de partition peut améliorer considérablement les performances des requêtes.</p>
<p>Vous pouvez utiliser la clé de partition pour mettre en œuvre la multi-location. Pour plus d'informations sur le multi-tenant, lisez <a href="https://milvus.io/docs/multi_tenancy.md">Multi-tenant</a> pour plus d'informations.</p>
<h2 id="Enable-partition-key" class="common-anchor-header">Activer la clé de partition<button data-href="#Enable-partition-key" class="anchor-icon" translate="no">
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
    </button></h2><p>Pour définir un champ comme clé de partition, spécifiez <code translate="no">partition_key_field</code> lors de la création d'un schéma de collection.</p>
<p>Dans l'exemple de code ci-dessous, <code translate="no">num_partitions</code> détermine le nombre de partitions qui seront créées. Par défaut, il est défini sur <code translate="no">64</code>. Nous vous recommandons de conserver la valeur par défaut.</p>
<div class="language-python">
<p>Pour plus d'informations sur les paramètres, voir <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a>, <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md"><code translate="no">create_schema()</code></a>, et <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md"><code translate="no">add_field()</code></a> dans la référence du SDK.</p>
</div>
<div class="language-java">
<p>Pour plus d'informations sur les paramètres, voir <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code translate="no">MilvusClientV2</code></a>, <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createSchema.md"><code translate="no">createSchema()</code></a>, et <a href="https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/addField.md"><code translate="no">addField()</code></a> dans la référence du SDK.</p>
</div>
<div class="language-javascript">
<p>Pour plus d'informations sur les paramètres, voir <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> et <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a> dans la référence du SDK.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> random, time
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> connections, MilvusClient, DataType

SERVER_ADDR = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=SERVER_ADDR
)

<span class="hljs-comment"># 2. Create a collection</span>
schema = MilvusClient.create_schema(
    auto_id=<span class="hljs-literal">False</span>,
    enable_dynamic_field=<span class="hljs-literal">True</span>,
    partition_key_field=<span class="hljs-string">&quot;color&quot;</span>,
    num_partitions=<span class="hljs-number">64</span> <span class="hljs-comment"># Number of partitions. Defaults to 64.</span>
)

schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;vector&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)
schema.add_field(field_name=<span class="hljs-string">&quot;color&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">512</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;
<span class="hljs-keyword">import</span> io.milvus.v2.common.IndexParam;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;

<span class="hljs-type">String</span> <span class="hljs-variable">CLUSTER_ENDPOINT</span> <span class="hljs-operator">=</span> <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;

<span class="hljs-comment">// 1. Connect to Milvus server</span>
<span class="hljs-type">ConnectConfig</span> <span class="hljs-variable">connectConfig</span> <span class="hljs-operator">=</span> ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .build();

<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(connectConfig);

<span class="hljs-comment">// 2. Create a collection in customized setup mode</span>

<span class="hljs-comment">// 2.1 Create schema</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();

<span class="hljs-comment">// 2.2 Add fields to schema</span>
schema.addField(AddFieldReq.builder()
    .fieldName(<span class="hljs-string">&quot;id&quot;</span>)
    .dataType(DataType.Int64)
    .isPrimaryKey(<span class="hljs-literal">true</span>)
    .autoID(<span class="hljs-literal">false</span>)
    .build());

schema.addField(AddFieldReq.builder()
    .fieldName(<span class="hljs-string">&quot;vector&quot;</span>)
    .dataType(DataType.FloatVector)
    .dimension(<span class="hljs-number">5</span>)
    .build());
    
schema.addField(AddFieldReq.builder()
    .fieldName(<span class="hljs-string">&quot;color&quot;</span>)
    .dataType(DataType.VarChar)
    .maxLength(<span class="hljs-number">512</span>)
    .isPartitionKey(<span class="hljs-literal">true</span>)
    .build());
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span>, sleep } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)

<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">main</span>(<span class="hljs-params"></span>) {
<span class="hljs-comment">// 1. Set up a Milvus Client</span>
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address}); 

<span class="hljs-comment">// 2. Create a collection</span>
<span class="hljs-comment">// 2.1 Define fields</span>
<span class="hljs-keyword">const</span> fields = [
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">false</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;vector&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,
        <span class="hljs-attr">dim</span>: <span class="hljs-number">5</span>
    },
    {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;color&quot;</span>,
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,
        <span class="hljs-attr">is_partition_key</span>: <span class="hljs-literal">true</span>
    }
]
<button class="copy-code-btn"></button></code></pre>
<p>Après avoir défini les champs, définissez les paramètres de l'index.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name=<span class="hljs-string">&quot;id&quot;</span>,
    index_type=<span class="hljs-string">&quot;STL_SORT&quot;</span>
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;color&quot;</span>,
    index_type=<span class="hljs-string">&quot;Trie&quot;</span>
)

index_params.add_index(
    field_name=<span class="hljs-string">&quot;vector&quot;</span>,
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    metric_type=<span class="hljs-string">&quot;L2&quot;</span>,
    <span class="hljs-keyword">params</span>={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">1024</span>}
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 2.3 Prepare index parameters</span>
<span class="hljs-title class_">IndexParam</span> indexParamForVectorField = <span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;vector&quot;</span>)
    .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">IVF_FLAT</span>)
    .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">IP</span>)
    .<span class="hljs-title function_">extraParams</span>(<span class="hljs-title class_">Map</span>.<span class="hljs-title function_">of</span>(<span class="hljs-string">&quot;nlist&quot;</span>, <span class="hljs-number">1024</span>))
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();
indexParams.<span class="hljs-title function_">add</span>(indexParamForVectorField);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 2.2 Prepare index parameters</span>
<span class="hljs-keyword">const</span> index_params = [{
    field_name: <span class="hljs-string">&quot;color&quot;</span>,
    index_type: <span class="hljs-string">&quot;Trie&quot;</span>
},{
    field_name: <span class="hljs-string">&quot;id&quot;</span>,
    index_type: <span class="hljs-string">&quot;STL_SORT&quot;</span>
},{
    field_name: <span class="hljs-string">&quot;vector&quot;</span>,
    index_type: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,
    metric_type: <span class="hljs-string">&quot;IP&quot;</span>,
    <span class="hljs-keyword">params</span>: { nlist: <span class="hljs-number">1024</span>}
}]
<button class="copy-code-btn"></button></code></pre>
<p>Enfin, vous pouvez créer une collection.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">client.<span class="hljs-title function_">create_collection</span>(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    schema=schema,
    index_params=index_params
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 2.4 Create a collection with schema and index parameters</span>
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">customizedSetupReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;test_collection&quot;</span>)
    .collectionSchema(schema)
    .indexParams(indexParams)          
    .build();

client.createCollection(customizedSetupReq);
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 2.3 Create a collection with fields and index parameters</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">fields</span>: fields, 
    <span class="hljs-attr">index_params</span>: index_params,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">error_code</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// Success</span>
<span class="hljs-comment">//</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="List-partitions" class="common-anchor-header">Lister les partitions<button data-href="#List-partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois qu'un champ d'une collection est utilisé comme clé de partition, Milvus crée le nombre spécifié de partitions et les gère en votre nom. Par conséquent, vous ne pouvez plus manipuler les partitions de cette collection.</p>
<p>L'extrait suivant montre que 64 partitions d'une collection sont créées lorsque l'un de ses champs est utilisé comme clé de partition.</p>
<h2 id="Insert-data" class="common-anchor-header">Insérer des données<button data-href="#Insert-data" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que la collection est prête, commencez à insérer des données comme suit :</p>
<h3 id="Prepare-data" class="common-anchor-header">Préparer les données</h3><div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. Insert randomly generated vectors </span>
colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>]
data = []

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1000</span>):
    current_color = random.choice(colors)
    current_tag = random.randint(<span class="hljs-number">1000</span>, <span class="hljs-number">9999</span>)
    data.append({
        <span class="hljs-string">&quot;id&quot;</span>: i,
        <span class="hljs-string">&quot;vector&quot;</span>: [ random.uniform(-<span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>) ],
        <span class="hljs-string">&quot;color&quot;</span>: current_color,
        <span class="hljs-string">&quot;tag&quot;</span>: current_tag,
        <span class="hljs-string">&quot;color_tag&quot;</span>: <span class="hljs-string">f&quot;<span class="hljs-subst">{current_color}</span>_<span class="hljs-subst">{<span class="hljs-built_in">str</span>(current_tag)}</span>&quot;</span>
    })

<span class="hljs-built_in">print</span>(data[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 3. Insert randomly generated vectors</span>
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">String</span>&gt; colors = <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>);
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>&gt; data = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();

<span class="hljs-keyword">for</span> (int i=<span class="hljs-number">0</span>; i&lt;<span class="hljs-number">1000</span>; i++) {
    <span class="hljs-title class_">Random</span> rand = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Random</span>();
    <span class="hljs-title class_">String</span> current_color = colors.<span class="hljs-title function_">get</span>(rand.<span class="hljs-title function_">nextInt</span>(colors.<span class="hljs-title function_">size</span>()-<span class="hljs-number">1</span>));
    int current_tag = rand.<span class="hljs-title function_">nextInt</span>(<span class="hljs-number">8999</span>) + <span class="hljs-number">1000</span>;
    <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span> row = <span class="hljs-keyword">new</span> <span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>();
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-title class_">Long</span>.<span class="hljs-title function_">valueOf</span>(i));
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;vector&quot;</span>, <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>(), rand.<span class="hljs-title function_">nextFloat</span>()));
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;color&quot;</span>, current_color);
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;tag&quot;</span>, current_tag);
    row.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;color_tag&quot;</span>, current_color + <span class="hljs-string">&quot;_&quot;</span> + <span class="hljs-title class_">String</span>.<span class="hljs-title function_">valueOf</span>(rand.<span class="hljs-title function_">nextInt</span>(<span class="hljs-number">8999</span>) + <span class="hljs-number">1000</span>));
    data.<span class="hljs-title function_">add</span>(row);
}

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(data.<span class="hljs-title function_">get</span>(<span class="hljs-number">0</span>)));   
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3. Insert randomly generated vectors </span>
<span class="hljs-keyword">const</span> colors = [<span class="hljs-string">&quot;green&quot;</span>, <span class="hljs-string">&quot;blue&quot;</span>, <span class="hljs-string">&quot;yellow&quot;</span>, <span class="hljs-string">&quot;red&quot;</span>, <span class="hljs-string">&quot;black&quot;</span>, <span class="hljs-string">&quot;white&quot;</span>, <span class="hljs-string">&quot;purple&quot;</span>, <span class="hljs-string">&quot;pink&quot;</span>, <span class="hljs-string">&quot;orange&quot;</span>, <span class="hljs-string">&quot;brown&quot;</span>, <span class="hljs-string">&quot;grey&quot;</span>]
<span class="hljs-keyword">var</span> data = []

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1000</span>; i++) {
    <span class="hljs-keyword">const</span> current_color = colors[<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * colors.<span class="hljs-property">length</span>)]
    <span class="hljs-keyword">const</span> current_tag = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">8999</span> + <span class="hljs-number">1000</span>)
    data.<span class="hljs-title function_">push</span>({
        <span class="hljs-attr">id</span>: i,
        <span class="hljs-attr">vector</span>: [<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>(), <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>()],
        <span class="hljs-attr">color</span>: current_color,
        <span class="hljs-attr">tag</span>: current_tag,
        <span class="hljs-attr">color_tag</span>: <span class="hljs-string">`<span class="hljs-subst">${current_color}</span>_<span class="hljs-subst">${current_tag}</span>`</span>
    })
}

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(data[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<p>Vous pouvez visualiser la structure des données générées en vérifiant leur première entrée.</p>
<pre><code translate="no">{
    <span class="hljs-built_in">id</span>: <span class="hljs-number">0</span>,
    vector: [
        <span class="hljs-number">0.1275656405044483</span>,
        <span class="hljs-number">0.47417858592773277</span>,
        <span class="hljs-number">0.13858264437643286</span>,
        <span class="hljs-number">0.2390904907020377</span>,
        <span class="hljs-number">0.8447862593689635</span>
    ],
    color: <span class="hljs-string">&#x27;blue&#x27;</span>,
    tag: <span class="hljs-number">2064</span>,
    color_tag: <span class="hljs-string">&#x27;blue_2064&#x27;</span>
}
<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data" class="common-anchor-header">Insérer des données</h3><div class="language-python">
<p>Utilisez la méthode <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md"><code translate="no">insert()</code></a> pour insérer les données dans la collection.</p>
</div>
<div class="language-java">
<p>Utilisez la méthode <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Vector/insert.md"><code translate="no">insert()</code></a> pour insérer les données dans la collection.</p>
</div>
<div class="language-javascript">
<p>Utiliser la méthode <a href="https://milvus.io/api-reference/node/v2.4.x/Vector/insert.md"><code translate="no">insert()</code></a> pour insérer les données dans la collection.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">res = client.insert(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    data=data
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;insert_count&quot;: 1000,</span>
<span class="hljs-comment">#     &quot;ids&quot;: [</span>
<span class="hljs-comment">#         0,</span>
<span class="hljs-comment">#         1,</span>
<span class="hljs-comment">#         2,</span>
<span class="hljs-comment">#         3,</span>
<span class="hljs-comment">#         4,</span>
<span class="hljs-comment">#         5,</span>
<span class="hljs-comment">#         6,</span>
<span class="hljs-comment">#         7,</span>
<span class="hljs-comment">#         8,</span>
<span class="hljs-comment">#         9,</span>
<span class="hljs-comment">#         &quot;(990 more items hidden)&quot;</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 3.1 Insert data into the collection</span>
<span class="hljs-title class_">InsertReq</span> insertReq = <span class="hljs-title class_">InsertReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;test_collection&quot;</span>)
    .<span class="hljs-title function_">data</span>(data)
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">InsertResp</span> insertResp = client.<span class="hljs-title function_">insert</span>(insertReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(insertResp));

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;insertCnt&quot;: 1000}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">data</span>: data,
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">insert_cnt</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// 1000</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Use-partition-key" class="common-anchor-header">Utiliser la clé de partition<button data-href="#Use-partition-key" class="anchor-icon" translate="no">
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
    </button></h2><p>Une fois que vous avez indexé et chargé la collection et inséré des données, vous pouvez effectuer une recherche de similarité à l'aide de la clé de partition.</p>
<div class="language-python">
<p>Pour plus d'informations sur les paramètres, reportez-vous à <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md"><code translate="no">search()</code></a> dans la référence du SDK.</p>
</div>
<div class="language-java">
<p>Pour plus d'informations sur les paramètres, voir <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Vector/search.md"><code translate="no">search()</code></a> dans la référence du SDK.</p>
</div>
<div class="language-javascript">
<p>Pour plus d'informations sur les paramètres, voir <a href="https://milvus.io/api-reference/node/v2.4.x/Vector/search.md"><code translate="no">search()</code></a> dans la référence du SDK.</p>
</div>
<div class="admonition note">
<p><b>notes</b></p>
<p>Pour effectuer une recherche de similarité à l'aide de la clé de partition, vous devez inclure l'un des éléments suivants dans l'expression booléenne de la requête de recherche :</p>
<ul>
<li><p><code translate="no">expr='&lt;partition_key&gt;=="xxxx"'</code></p></li>
<li><p><code translate="no">expr='&lt;partition_key&gt; in ["xxx", "xxx"]'</code></p></li>
</ul>
<p>Remplacez <code translate="no">&lt;partition_key&gt;</code> par le nom du champ désigné comme clé de partition.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Search with partition key</span>
query_vectors = [[<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]]

res = client.search(
    collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
    data=query_vectors,
    <span class="hljs-built_in">filter</span>=<span class="hljs-string">&quot;color == &#x27;green&#x27;&quot;</span>,
    search_params={<span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;L2&quot;</span>, <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}},
    output_fields=[<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-string">&quot;color_tag&quot;</span>],
    limit=<span class="hljs-number">3</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [</span>
<span class="hljs-comment">#     [</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 970,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.5770174264907837,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {</span>
<span class="hljs-comment">#                 &quot;id&quot;: 970,</span>
<span class="hljs-comment">#                 &quot;color_tag&quot;: &quot;green_9828&quot;</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 115,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.6898155808448792,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {</span>
<span class="hljs-comment">#                 &quot;id&quot;: 115,</span>
<span class="hljs-comment">#                 &quot;color_tag&quot;: &quot;green_4073&quot;</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         },</span>
<span class="hljs-comment">#         {</span>
<span class="hljs-comment">#             &quot;id&quot;: 899,</span>
<span class="hljs-comment">#             &quot;distance&quot;: 0.7028976678848267,</span>
<span class="hljs-comment">#             &quot;entity&quot;: {</span>
<span class="hljs-comment">#                 &quot;id&quot;: 899,</span>
<span class="hljs-comment">#                 &quot;color_tag&quot;: &quot;green_9897&quot;</span>
<span class="hljs-comment">#             }</span>
<span class="hljs-comment">#         }</span>
<span class="hljs-comment">#     ]</span>
<span class="hljs-comment"># ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// 4. Search with partition key</span>
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">Float</span>&gt;&gt; query_vectors = <span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-title class_">Arrays</span>.<span class="hljs-title function_">asList</span>(<span class="hljs-number">0.</span>3580376395471989f, -<span class="hljs-number">0.</span>6023495712049978f, <span class="hljs-number">0.</span>18414012509913835f, -<span class="hljs-number">0.</span>26286205330961354f, <span class="hljs-number">0.</span>9029438446296592f));

<span class="hljs-title class_">SearchReq</span> searchReq = <span class="hljs-title class_">SearchReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;test_collection&quot;</span>)
    .<span class="hljs-title function_">data</span>(query_vectors)
    .<span class="hljs-title function_">filter</span>(<span class="hljs-string">&quot;color == \&quot;green\&quot;&quot;</span>)
    .<span class="hljs-title function_">topK</span>(<span class="hljs-number">3</span>)
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">SearchResp</span> searchResp = client.<span class="hljs-title function_">search</span>(searchReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(<span class="hljs-title class_">JSON</span><span class="hljs-built_in">Object</span>.<span class="hljs-title function_">toJSON</span>(searchResp));   

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// {&quot;searchResults&quot;: [[</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;distance&quot;: 1.0586997,</span>
<span class="hljs-comment">//         &quot;id&quot;: 414,</span>
<span class="hljs-comment">//         &quot;entity&quot;: {}</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;distance&quot;: 0.981384,</span>
<span class="hljs-comment">//         &quot;id&quot;: 293,</span>
<span class="hljs-comment">//         &quot;entity&quot;: {}</span>
<span class="hljs-comment">//     },</span>
<span class="hljs-comment">//     {</span>
<span class="hljs-comment">//         &quot;distance&quot;: 0.9548756,</span>
<span class="hljs-comment">//         &quot;id&quot;: 325,</span>
<span class="hljs-comment">//         &quot;entity&quot;: {}</span>
<span class="hljs-comment">//     }</span>
<span class="hljs-comment">// ]]}</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Search with partition key</span>
<span class="hljs-keyword">const</span> query_vectors = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;test_collection&quot;</span>,
    <span class="hljs-attr">data</span>: query_vectors,
    <span class="hljs-attr">filter</span>: <span class="hljs-string">&quot;color == &#x27;green&#x27;&quot;</span>,
    <span class="hljs-attr">output_fields</span>: [<span class="hljs-string">&quot;color_tag&quot;</span>],
    <span class="hljs-attr">limit</span>: <span class="hljs-number">3</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">results</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   { score: 2.402090549468994, id: &#x27;135&#x27;, color_tag: &#x27;green_2694&#x27; },</span>
<span class="hljs-comment">//   { score: 2.3938629627227783, id: &#x27;326&#x27;, color_tag: &#x27;green_7104&#x27; },</span>
<span class="hljs-comment">//   { score: 2.3235254287719727, id: &#x27;801&#x27;, color_tag: &#x27;green_3162&#x27; }</span>
<span class="hljs-comment">// ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Typical-use-cases" class="common-anchor-header">Cas d'utilisation typiques<button data-href="#Typical-use-cases" class="anchor-icon" translate="no">
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
    </button></h2><p>Vous pouvez utiliser la fonction de clé de partition pour améliorer les performances de recherche et permettre la multi-location. Pour ce faire, vous pouvez attribuer une valeur spécifique au locataire comme champ de clé de partition pour chaque entité. Lors de la recherche ou de l'interrogation de la collection, vous pouvez filtrer les entités en fonction de la valeur spécifique au locataire en incluant le champ de la clé de partition dans l'expression booléenne. Cette approche garantit l'isolation des données par locataire et évite d'analyser des partitions inutiles.</p>
