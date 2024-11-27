---
id: use-partition-key.md
title: Utilizar clave de partición
---
<h1 id="Use-Partition-Key​" class="common-anchor-header">Utilizar Partition Key<button data-href="#Use-Partition-Key​" class="anchor-icon" translate="no">
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
    </button></h1><p>La clave de partición es una solución de optimización de la búsqueda basada en particiones. Al designar un campo escalar específico como Clave de Partición y especificar condiciones de filtrado basadas en la Clave de Partición durante la búsqueda, el ámbito de búsqueda puede reducirse a varias particiones, mejorando así la eficiencia de la búsqueda. Este artículo presenta cómo utilizar la Clave de Partición y las consideraciones relacionadas.</p>
<h2 id="Overview​" class="common-anchor-header">Visión general<button data-href="#Overview​" class="anchor-icon" translate="no">
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
    </button></h2><p>En Milvus, puede utilizar particiones para implementar la segregación de datos y mejorar el rendimiento de la búsqueda restringiendo el alcance de la búsqueda a particiones específicas. Si elige gestionar las particiones manualmente, puede crear un máximo de 1.024 particiones en una colección, e insertar entidades en estas particiones basándose en una regla específica para que pueda limitar el alcance de la búsqueda restringiendo las búsquedas dentro de un número específico de particiones.</p>
<p>Milvus introduce la Clave de partición para que pueda reutilizar particiones en la segregación de datos para superar el límite en el número de particiones que puede crear en una colección. Al crear una colección, puede utilizar un campo escalar como clave de partición. Una vez que la colección está lista, Milvus crea el número especificado de particiones dentro de la colección con cada partición correspondiente a un rango de los valores en la Clave de Partición. Al recibir las entidades insertadas, Milvus las almacena en diferentes particiones basándose en sus valores de Clave de Partición.</p>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/partition-vs-partition-key.png" alt="Partition v.s. Partition Key" class="doc-image" id="partition-v.s.-partition-key" />
   </span> <span class="img-wrapper"> <span>Partición v.s. Clave de Partición</span> </span></p>
<p>La siguiente figura ilustra cómo Milvus procesa las peticiones de búsqueda en una colección con o sin la función Partition Key activada. </p>
<ul>
<li><p>Si la Clave de partición está desactivada, Milvus busca las entidades más similares al vector de consulta dentro de la colección. Puede limitar el alcance de la búsqueda si sabe qué partición contiene los resultados más relevantes. </p></li>
<li><p>Si la Clave de Partición está activada, Milvus determina el ámbito de búsqueda basándose en el valor de la Clave de Partición especificado en un filtro de búsqueda y explora sólo las entidades dentro de las particiones que coinciden. </p></li>
</ul>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/with-and-without-partition-key.png" alt="With or Without Partition Key" class="doc-image" id="with-or-without-partition-key" />
   </span> <span class="img-wrapper"> <span>Con o Sin Clave de Partición</span> </span></p>
<h2 id="Use-Partition-Key​" class="common-anchor-header">Usar Clave de Partición<button data-href="#Use-Partition-Key​" class="anchor-icon" translate="no">
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
    </button></h2><p>Para utilizar la Clave de Partición, debe</p>
<ul>
<li><p>Establecer la Clave de Partición.</p></li>
<li><p>Establecer el número de particiones a crear (Opcional), y</p></li>
<li><p>Crear una condición de filtrado basada en la Clave de Partición.</p></li>
</ul>
<h3 id="Set-Partition-Key​" class="common-anchor-header">Establecer la Clave de Partición</h3><p>Para designar un campo escalar como la Clave de Partición, necesitas establecer su atributo <code translate="no">is_partition_key</code> a <code translate="no">true</code> cuando añadas el campo escalar.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (​
    MilvusClient, DataType​
)​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
schema = client.create_schema()​
​
<span class="hljs-comment"># Add the partition key​</span>
schema.add_field(​
    field_name=<span class="hljs-string">&quot;my_varchar&quot;</span>, ​
    datatype=DataType.VARCHAR, ​
    max_length=<span class="hljs-number">512</span>,​
    <span class="hljs-comment"># highlight-next-line​</span>
    is_partition_key=<span class="hljs-literal">True</span>,​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;​
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;​
<span class="hljs-keyword">import</span> io.milvus.v2.common.DataType;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.AddFieldReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">MilvusClientV2</span> <span class="hljs-variable">client</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClientV2</span>(ConnectConfig.builder()​
        .uri(<span class="hljs-string">&quot;http://localhost:19530&quot;</span>)​
        .token(<span class="hljs-string">&quot;root:Milvus&quot;</span>)​
        .build());​
​
<span class="hljs-comment">// Create schema​</span>
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
​
<span class="hljs-comment">// Add the partition key​</span>
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;my_varchar&quot;</span>)​
        .dataType(DataType.VarChar)​
        .maxLength(<span class="hljs-number">512</span>)​
        <span class="hljs-comment">// highlight-next-line​</span>
        .isPartitionKey(<span class="hljs-literal">true</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-comment">// 3. Create a collection in customized setup mode​</span>
<span class="hljs-comment">// 3.1 Define fields​</span>
<span class="hljs-keyword">const</span> fields = [​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;my_varchar&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">512</span>,​
        <span class="hljs-comment">// highlight-next-line​</span>
        <span class="hljs-attr">is_partition_key</span>: <span class="hljs-literal">true</span>​
    }​
]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
        &quot;autoId&quot;: true,​
        &quot;enabledDynamicField&quot;: false,​
        &quot;fields&quot;: [​
            {​
                &quot;fieldName&quot;: &quot;my_id&quot;,​
                &quot;dataType&quot;: &quot;Int64&quot;,​
                &quot;isPrimary&quot;: true​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_vector&quot;,​
                &quot;dataType&quot;: &quot;FloatVector&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;dim&quot;: &quot;5&quot;​
                }​
            },​
            {​
                &quot;fieldName&quot;: &quot;my_varchar&quot;,​
                &quot;dataType&quot;: &quot;VarChar&quot;,​
                &quot;isPartitionKey&quot;: true,​
                &quot;elementTypeParams&quot;: {​
                    &quot;max_length&quot;: 512​
                }​
            }​
        ]​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Set-Partition-Numbers​" class="common-anchor-header">Establecer números de partición</h3><p>Cuando designa un campo escalar en una colección como Clave de Partición, Milvus crea automáticamente 16 particiones en la colección. Al recibir una entidad, Milvus elige una partición basándose en el valor de la Clave de Partición de esta entidad y almacena la entidad en la partición, dando como resultado que algunas o todas las particiones contengan entidades con diferentes valores de Clave de Partición. </p>
<p>También puede determinar el número de particiones a crear junto con la colección. Esto sólo es válido si tienes un campo escalar designado como Clave de Partición.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python">client.create_collection(​
    collection_name=<span class="hljs-string">&quot;my_collection&quot;</span>,​
    schema=schema,​
    <span class="hljs-meta"># highlight-next-<span class="hljs-keyword">line</span>​</span>
    num_partitions=<span class="hljs-number">1024</span>​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
<span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
                .collectionName(<span class="hljs-string">&quot;my_collection&quot;</span>)​
                .collectionSchema(schema)​
                .numPartitions(<span class="hljs-number">1024</span>)​
                .build();​
        client.createCollection(createCollectionReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">create_collection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;my_collection&quot;</span>,​
    <span class="hljs-attr">schema</span>: schema,​
    <span class="hljs-attr">num_partitions</span>: <span class="hljs-number">1024</span>​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> params=<span class="hljs-string">&#x27;{​
    &quot;partitionsNum&quot;: 1024​
}&#x27;</span>​
​
<span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;myCollection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;params\&quot;: <span class="hljs-variable">$params</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-Filtering-Condition​" class="common-anchor-header">Crear condición de filtrado</h3><p>Al realizar búsquedas RNA en una colección con la función Clave de partición activada, debe incluir una expresión de filtrado que incluya la Clave de partición en la solicitud de búsqueda. En la expresión de filtrado, puede restringir el valor de la Clave de Partición dentro de un rango específico para que Milvus restrinja el ámbito de búsqueda dentro de las particiones correspondientes.</p>
<p>Los siguientes ejemplos demuestran el filtrado basado en Clave de Partición basado en un valor específico de Clave de Partición y un conjunto de valores de Clave de Partición.</p>
<div class="multipleCode">
 <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#go">Go</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Filter based on a single partition key value, or​</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>​
​
<span class="hljs-comment"># Filter based on multiple partition key values​</span>
<span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-comment">// Filter based on a single partition key value, or​</span>
<span class="hljs-title class_">String</span> filter = <span class="hljs-string">&quot;partition_key == &#x27;x&#x27; &amp;&amp; &lt;other conditions&gt;&quot;</span>;​
​
<span class="hljs-comment">// Filter based on multiple partition key values​</span>
<span class="hljs-title class_">String</span> filter = <span class="hljs-string">&quot;partition_key in [&#x27;x&#x27;, &#x27;y&#x27;, &#x27;z&#x27;] &amp;&amp; &lt;other conditions&gt;&quot;</span>;​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// Filter based on a single partition key value, or​</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>​
​
<span class="hljs-comment">// Filter based on multiple partition key values​</span>
<span class="hljs-keyword">const</span> filter = <span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-comment"># Filter based on a single partition key value, or​</span>
export <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key == &quot;x&quot; &amp;&amp; &lt;other conditions&gt;&#x27;</span>​
​
<span class="hljs-comment"># Filter based on multiple partition key values​</span>
export <span class="hljs-built_in">filter</span>=<span class="hljs-string">&#x27;partition_key in [&quot;x&quot;, &quot;y&quot;, &quot;z&quot;] &amp;&amp; &lt;other conditions&gt;&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
