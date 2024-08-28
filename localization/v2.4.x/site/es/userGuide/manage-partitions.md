---
id: manage-partitions.md
title: Gestionar particiones
summary: ''
---
<h1 id="Manage-Partitions" class="common-anchor-header">Gestionar particiones<button data-href="#Manage-Partitions" class="anchor-icon" translate="no">
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
    </button></h1><p>Esta guía le explica cómo crear y gestionar particiones en una colección.</p>
<h2 id="Overview" class="common-anchor-header">Visión general<button data-href="#Overview" class="anchor-icon" translate="no">
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
    </button></h2><p>Una partición en Milvus representa una subdivisión de una colección. Esta funcionalidad permite dividir el almacenamiento físico de una colección en múltiples partes, lo que contribuye a mejorar el rendimiento de las consultas al limitar el enfoque a un subconjunto más pequeño de datos en lugar de a toda la colección.</p>
<p>Al crear una colección, se crea automáticamente al menos una partición por defecto denominada <strong>_default</strong>. Puede crear un máximo de 1.024 particiones dentro de una colección.</p>
<div class="admonition note">
<p><b>notas</b></p>
<p>Milvus introduce una característica llamada <strong>Partition Key</strong>, que aprovecha las particiones subyacentes para almacenar entidades basadas en los valores hash de un campo específico. Esta característica facilita la implementación de multi-tenancy, mejorando el rendimiento de la búsqueda. Para más detalles, lea <a href="https://milvus.io/docs/use-partition-key.md">Utilizar clave de partición</a>.</p>
<p>Si la función <strong>Partition</strong> Key está activada en una colección, Milvus se encarga de gestionar todas las particiones, liberándole a usted de esta responsabilidad.</p>
</div>
<h2 id="Preparations" class="common-anchor-header">Preparativos<button data-href="#Preparations" class="anchor-icon" translate="no">
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
    </button></h2><p>El fragmento de código a continuación reutiliza el código existente para establecer una conexión con Milvus y crear una colección en un modo de preparación rápida, indicando que la colección se carga al crearse.</p>
<div class="language-python">
<p>Para los preparativos, utilice <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> para conectarse a Milvus y <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md"><code translate="no">create_collection()</code></a> para crear una colección en modo de configuración rápida.</p>
</div>
<div class="language-java">
<p>Para las preparaciones, utilice <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md"><code translate="no">MilvusClientV2</code></a> para conectarse a Milvus y <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md"><code translate="no">createCollection()</code></a> para crear una colección en modo de configuración rápida.</p>
</div>
<div class="language-javascript">
<p>Para las preparaciones, utilice <a href="https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md"><code translate="no">MilvusClient</code></a> para conectarse a Milvus y <a href="https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md"><code translate="no">createCollection()</code></a> para crear una colección en modo de configuración rápida.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient, DataType

<span class="hljs-comment"># 1. Set up a Milvus client</span>
client = MilvusClient(
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>
)

<span class="hljs-comment"># 2. Create a collection</span>
client.create_collection(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    dimension=<span class="hljs-number">5</span>,
)

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.client.ConnectConfig;
<span class="hljs-keyword">import</span> io.milvus.v2.client.MilvusClientV2;
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
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>

<span class="hljs-comment">// 1. Set up a Milvus Client</span>
client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address});

<span class="hljs-comment">// 2. Create a collection in quick setup mode</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">dimension</span>: <span class="hljs-number">5</span>,
});  
<button class="copy-code-btn"></button></code></pre>
<div class="admonition note">
<p><b>notas</b></p>
<p>En el fragmento de código anterior, el índice de la colección se ha creado junto con la colección, lo que indica que la colección se carga en el momento de la creación.</p>
</div>
<h2 id="List-Partitions" class="common-anchor-header">Listar particiones<button data-href="#List-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez que la colección está lista, puedes listar sus particiones.</p>
<div class="language-python">
<p>Para listar particiones, utilice <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/list_partitions.md"><code translate="no">list_partitions()</code></a>.</p>
</div>
<div class="language-java">
<p>Para listar particiones, utilice <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/listPartitions.md"><code translate="no">listPartitions()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Para listar particiones, utilice <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/listPartitions.md"><code translate="no">listPartitions()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 3. List partitions</span>
res = client.list_partitions(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [&quot;_default&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">service</span>.<span class="hljs-property">partition</span>.<span class="hljs-property">request</span>.<span class="hljs-property">ListPartitionsReq</span>;

<span class="hljs-comment">// 3. List all partitions in the collection</span>
<span class="hljs-title class_">ListPartitionsReq</span> listPartitionsReq = <span class="hljs-title class_">ListPartitionsReq</span>.<span class="hljs-title function_">builder</span>()
    .<span class="hljs-title function_">collectionName</span>(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .<span class="hljs-title function_">build</span>();

<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">String</span>&gt; partitionNames = client.<span class="hljs-title function_">listPartitions</span>(listPartitionsReq);

<span class="hljs-title class_">System</span>.<span class="hljs-property">out</span>.<span class="hljs-title function_">println</span>(partitionNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [&quot;_default&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 3. List partitions</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">partition_names</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;_default&#x27; ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>La salida del fragmento de código anterior incluye los nombres de las particiones dentro de la colección especificada.</p>
<div class="admonition note">
<p><b>notas</b></p>
<p>Si ha establecido un campo como clave de partición en una colección, Milvus crea al menos <strong>64</strong> particiones junto con la colección. Al listar las particiones, los resultados pueden diferir de la salida de los fragmentos de código anteriores.</p>
<p>Para más detalles, consulte <a href="https://milvus.io/docs/use-partition-key.md">Utilizar clave de partición</a>.</p>
</div>
<h2 id="Create-Partitions" class="common-anchor-header">Crear particiones<button data-href="#Create-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>Puede añadir más particiones a la colección. Una colección puede tener hasta 1.024 particiones.</p>
<div class="language-python">
<p>Para crear particiones, utilice <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/create_partition.md"><code translate="no">create_partition()</code></a>.</p>
</div>
<div class="language-java">
<p>Para crear particiones, utilice <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/createPartition.md"><code translate="no">createPartition()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Para crear particiones, utilice <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/createPartition.md"><code translate="no">createPartition()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 4. Create more partitions</span>
client.create_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

client.create_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionB&quot;</span>
)

res = client.list_partitions(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [&quot;_default&quot;, &quot;partitionA&quot;, &quot;partitionB&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.CreatePartitionReq;

<span class="hljs-comment">// 4. Create more partitions</span>
<span class="hljs-type">CreatePartitionReq</span> <span class="hljs-variable">createPartitionReq</span> <span class="hljs-operator">=</span> CreatePartitionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

client.createPartition(createPartitionReq);

createPartitionReq = CreatePartitionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionB&quot;</span>)
    .build();

client.createPartition(createPartitionReq);

listPartitionsReq = ListPartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

partitionNames = client.listPartitions(listPartitionsReq);

System.out.println(partitionNames);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//     &quot;_default&quot;,</span>
<span class="hljs-comment">//     &quot;partitionA&quot;,</span>
<span class="hljs-comment">//     &quot;partitionB&quot;</span>
<span class="hljs-comment">// ]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 4. Create more partitions</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionB&quot;</span>
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">listPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">partition_names</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// [ &#x27;_default&#x27;, &#x27;partitionA&#x27;, &#x27;partitionB&#x27; ]</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>El fragmento de código anterior crea una partición en una colección y lista las particiones de la colección.</p>
<div class="admonition note">
<p><b>notas</b></p>
<p>Si ha establecido un campo como clave de partición en una colección, Milvus se encarga de gestionar las particiones de la colección. Por lo tanto, es posible que se produzcan errores al intentar crear particiones.</p>
<p>Para más detalles, consulte <a href="https://milvus.io/docs/use-partition-key.md">Utilizar clave de partición</a>.</p>
</div>
<h2 id="Check-for-a-Specific-Partition" class="common-anchor-header">Comprobar la existencia de una partición específica<button data-href="#Check-for-a-Specific-Partition" class="anchor-icon" translate="no">
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
    </button></h2><p>También puede comprobar la existencia de una partición específica.</p>
<div class="language-python">
<p>Para comprobar la existencia de una partición específica, utilice <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/has_partition.md"><code translate="no">has_partition()</code></a>.</p>
</div>
<div class="language-java">
<p>Para buscar una partición específica, utilice <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/hasPartition.md"><code translate="no">hasPartition()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Para buscar una partición específica, utilice <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/hasPartition.md"><code translate="no">hasPartition()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 5. Check whether a partition exists</span>
res = client.has_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># True</span>

res = client.has_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionC&quot;</span>
)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># False</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.HasPartitionReq;

<span class="hljs-comment">// 5. Check whether a partition exists</span>
<span class="hljs-type">HasPartitionReq</span> <span class="hljs-variable">hasPartitionReq</span> <span class="hljs-operator">=</span> HasPartitionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

<span class="hljs-type">boolean</span> <span class="hljs-variable">exists</span> <span class="hljs-operator">=</span> client.hasPartition(hasPartitionReq);

System.out.println(exists);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>

hasPartitionReq = HasPartitionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionC&quot;</span>)
    .build();

exists = client.hasPartition(hasPartitionReq);

System.out.println(exists);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 5. Check whether a partition exists</span>
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">hasPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">value</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// true</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">hasPartition</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionC&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">value</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// false</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>El fragmento de código anterior comprueba si la colección tiene una partición llamada <code translate="no">partitionA</code> y <code translate="no">partitionC</code>.</p>
<h2 id="Load--Release-Partitions" class="common-anchor-header">Cargar y liberar particiones<button data-href="#Load--Release-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>Puedes cargar y liberar particiones específicas para hacerlas disponibles o no para búsquedas y consultas.</p>
<h3 id="Get-Load-Status" class="common-anchor-header">Obtener el estado de carga</h3><div class="language-python">
<p>Para comprobar el estado de carga de una colección y sus particiones, utilice <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md"><code translate="no">get_load_state()</code></a>.</p>
</div>
<div class="language-java">
<p>Para comprobar el estado de carga de una colección y sus particiones, utilice <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/getLoadState.md"><code translate="no">getLoadState()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Para comprobar el estado de carga de una colección y sus particiones, utilice <a href="https://milvus.io/api-reference/node/v2.4.x/Management/getLoadState.md"><code translate="no">getLoadState()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Release the collection</span>
client.release_collection(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)

<span class="hljs-comment"># Check the load status</span>
res = client.get_load_state(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>, 
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>, 
    partition_name=<span class="hljs-string">&quot;partitionB&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.GetLoadStateReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.collection.request.ReleaseCollectionReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.LoadPartitionsReq;
<span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ReleasePartitionsReq;

<span class="hljs-comment">// 6. Load a partition independantly</span>
<span class="hljs-comment">// 6.1 Release the collection</span>
<span class="hljs-type">ReleaseCollectionReq</span> <span class="hljs-variable">releaseCollectionReq</span> <span class="hljs-operator">=</span> ReleaseCollectionReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

client.releaseCollection(releaseCollectionReq);

<span class="hljs-comment">// 6.2 Load partitionA</span>
<span class="hljs-type">LoadPartitionsReq</span> <span class="hljs-variable">loadPartitionsReq</span> <span class="hljs-operator">=</span> LoadPartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionNames(List.of(<span class="hljs-string">&quot;partitionA&quot;</span>))
    .build();

client.loadPartitions(loadPartitionsReq);

Thread.sleep(<span class="hljs-number">3000</span>);

<span class="hljs-comment">// 6.3 Check the load status of the collection and its partitions</span>
<span class="hljs-type">GetLoadStateReq</span> <span class="hljs-variable">getLoadStateReq</span> <span class="hljs-operator">=</span> GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

<span class="hljs-type">boolean</span> <span class="hljs-variable">state</span> <span class="hljs-operator">=</span> client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionB&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 6. Load a partition indenpendantly</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releaseCollection</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">// </span>

<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]
})

<span class="hljs-keyword">await</span> <span class="hljs-title function_">sleep</span>(<span class="hljs-number">3000</span>)

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionB&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>Los posibles estados de carga pueden ser</p>
<ul>
<li><p><strong>Cargada</strong></p>
<p>Una colección se marca como <code translate="no">Loaded</code> si al menos una de sus particiones se ha cargado.</p></li>
<li><p><strong>NoCargado</strong></p>
<p>Una colección se marca como <code translate="no">NotLoad</code> si no se ha cargado ninguna de sus particiones.</p></li>
<li><p><strong>Cargando</strong></p>
<p>Una colección se marca como Cargando si al menos una de sus particiones está en proceso de carga.</p></li>
</ul>
<h3 id="Load-Partitions" class="common-anchor-header">Cargar particiones</h3><div class="language-python">
<p>Para cargar todas las particiones de una colección, basta con llamar al comando <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/load_collection.md"><code translate="no">load_collection()</code></a>. Para cargar particiones específicas de una colección, utilice <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/load_partitions.md"><code translate="no">load_partitions()</code></a>.</p>
</div>
<div class="language-java">
<p>Para cargar todas las particiones de una colección, basta con llamar a <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/loadCollection.md"><code translate="no">loadCollection()</code></a>. Para cargar particiones específicas de una colección, utilice <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/loadPartitions.md"><code translate="no">loadPartitions()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Para cargar todas las particiones de una colección, basta con llamar a <a href="https://milvus.io/api-reference/node/v2.4.x/Management/loadCollection.md"><code translate="no">loadCollection()</code></a>. Para cargar particiones específicas de una colección, utilice <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/loadPartitions.md"><code translate="no">loadPartitions()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">client.load_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>]
)

res = client.get_load_state(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">LoadPartitionsReq</span> <span class="hljs-variable">loadPartitionsReq</span> <span class="hljs-operator">=</span> LoadPartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionNames(List.of(<span class="hljs-string">&quot;partitionA&quot;</span>))
    .build();

client.loadPartitions(loadPartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">//</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para cargar múltiples particiones a la vez, haz lo siguiente:</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python">client.load_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>]
)

res = client.get_load_status(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>

res = client.get_load_status(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionB&quot;</span>
)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: Loaded&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">LoadPartitionsReq loadPartitionsReq = LoadPartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionNames(List.of(<span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>))
    .build();

client.loadPartitions(loadPartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.<span class="hljs-built_in">println</span>(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionB&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.<span class="hljs-built_in">println</span>(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// true</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadPartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>]
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionA&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_name</span>: <span class="hljs-string">&quot;partitionB&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateLoaded</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Release-Partitions" class="common-anchor-header">Liberar particiones</h3><div class="language-python">
<p>Para liberar todas las particiones de una colección, basta con llamar a <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/release_collection.md"><code translate="no">release_collection()</code></a>. Para liberar particiones específicas de una colección, utiliza <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/release_partitions.md"><code translate="no">release_partitions()</code></a>.</p>
</div>
<div class="language-java">
<p>Para liberar todas las particiones de una colección, basta con llamar a <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Management/releaseCollection.md"><code translate="no">releaseCollection()</code></a>. Para liberar particiones específicas de una colección, utilice <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/releasePartitions.md"><code translate="no">releasePartitions()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Para liberar todas las particiones de una colección, basta con llamar a <a href="https://milvus.io/api-reference/node/v2.4.x/Management/releaseCollection.md"><code translate="no">releaseCollection()</code></a>. Para liberar particiones específicas de una colección, utilice <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/releasePartitions.md"><code translate="no">releasePartitions()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 7. Release a partition</span>
client.release_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;partitionA&quot;</span>]
)

res = client.get_load_state(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>, 
    partition_name=<span class="hljs-string">&quot;partitionA&quot;</span>
)

<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ReleasePartitionsReq;

<span class="hljs-comment">// 7. Release a partition</span>
<span class="hljs-type">ReleasePartitionsReq</span> <span class="hljs-variable">releasePartitionsReq</span> <span class="hljs-operator">=</span> ReleasePartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionNames(List.of(<span class="hljs-string">&quot;partitionA&quot;</span>))
    .build();

client.releasePartitions(releasePartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionName(<span class="hljs-string">&quot;partitionA&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-comment">// 7. Release a partition</span>
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releasePartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;partitionA&quot;</span>]
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res.<span class="hljs-property">state</span>)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// LoadStateNotLoad</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<p>Para liberar múltiples particiones a la vez, haz lo siguiente:</p>
<pre><code translate="no" class="language-python">client.release_partitions(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_names=[<span class="hljs-string">&quot;_default&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>]
)

res = client.get_load_status(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># {</span>
<span class="hljs-comment">#     &quot;state&quot;: &quot;&lt;LoadState: NotLoad&gt;&quot;</span>
<span class="hljs-comment"># }</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Drop-Partitions" class="common-anchor-header">Liberar particiones<button data-href="#Drop-Partitions" class="anchor-icon" translate="no">
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
    </button></h2><p>Una vez liberada una partición, puede eliminarla si ya no la necesita.</p>
<div class="language-python">
<p>Para eliminar una partición, utilice <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Partitions/drop_partition.md"><code translate="no">drop_partition()</code></a>.</p>
</div>
<div class="language-java">
<p>Para soltar una partición, utilice <a href="https://milvus.io/api-reference/java/v2.4.x/v2/Partitions/dropPartition.md"><code translate="no">dropPartition()</code></a>.</p>
</div>
<div class="language-javascript">
<p>Para soltar una partición, utilice <a href="https://milvus.io/api-reference/node/v2.4.x/Partitions/dropPartition.md"><code translate="no">dropPartition()</code></a>.</p>
</div>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># 8. Drop a partition</span>
client.drop_partition(
    collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>,
    partition_name=<span class="hljs-string">&quot;partitionB&quot;</span>
)

res = client.list_partitions(collection_name=<span class="hljs-string">&quot;quick_setup&quot;</span>)
<span class="hljs-built_in">print</span>(res)

<span class="hljs-comment"># Output</span>
<span class="hljs-comment">#</span>
<span class="hljs-comment"># [&quot;_default&quot;, &quot;partitionA&quot;]</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.partition.request.ReleasePartitionsReq;

<span class="hljs-type">ReleasePartitionsReq</span> <span class="hljs-variable">releasePartitionsReq</span> <span class="hljs-operator">=</span> ReleasePartitionsReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .partitionNames(List.of(<span class="hljs-string">&quot;_default&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>))
    .build();

client.releasePartitions(releasePartitionsReq);

getLoadStateReq = GetLoadStateReq.builder()
    .collectionName(<span class="hljs-string">&quot;quick_setup&quot;</span>)
    .build();

state = client.getLoadState(getLoadStateReq);

System.out.println(state);

<span class="hljs-comment">// Output:</span>
<span class="hljs-comment">// false</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">
<span class="hljs-keyword">await</span> client.<span class="hljs-title function_">releasePartitions</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>,
    <span class="hljs-attr">partition_names</span>: [<span class="hljs-string">&quot;_default&quot;</span>, <span class="hljs-string">&quot;partitionA&quot;</span>, <span class="hljs-string">&quot;partitionB&quot;</span>]
})

res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">getLoadState</span>({
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;quick_setup&quot;</span>
})

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res)

<span class="hljs-comment">// Output</span>
<span class="hljs-comment">// </span>
<span class="hljs-comment">// {</span>
<span class="hljs-comment">//   status: {</span>
<span class="hljs-comment">//     error_code: &#x27;Success&#x27;,</span>
<span class="hljs-comment">//     reason: &#x27;&#x27;,</span>
<span class="hljs-comment">//     code: 0,</span>
<span class="hljs-comment">//     retriable: false,</span>
<span class="hljs-comment">//     detail: &#x27;&#x27;</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   state: &#x27;LoadStateNotLoad&#x27;</span>
<span class="hljs-comment">// }</span>
<span class="hljs-comment">// </span>
<button class="copy-code-btn"></button></code></pre>
<div class="admonition note">
<p><b>notas</b></p>
<p>Antes de eliminar una partición, debes liberarla de la memoria.</p>
</div>
<h2 id="FAQ" class="common-anchor-header">PREGUNTAS FRECUENTES<button data-href="#FAQ" class="anchor-icon" translate="no">
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
<li><p><strong>¿Cuántos datos se pueden almacenar en una partición?</strong></p>
<p>Se recomienda almacenar menos de 1B de datos en una partición.</p></li>
<li><p><strong>¿Cuál es el número máximo de particiones que se pueden crear?</strong></p>
<p>Por defecto, Milvus permite crear un máximo de 4.096 particiones. Puede ajustar el número máximo de particiones configurando <code translate="no">rootCoord.maxPartitionNum</code>. Para más detalles, consulte <a href="https://milvus.io/docs/configure_rootcoord.md#rootCoordmaxPartitionNum">Configuraciones del sistema</a>.</p></li>
<li><p><strong>¿Cómo puedo diferenciar entre particiones y claves de partición?</strong></p>
<p>Las particiones son unidades físicas de almacenamiento, mientras que las claves de partición son conceptos lógicos que asignan automáticamente datos a particiones específicas basándose en una columna designada.</p>
<p>Por ejemplo, en Milvus, si tiene una colección con una clave de partición definida como el campo <code translate="no">color</code>, el sistema asigna automáticamente los datos a las particiones basándose en los valores hash del campo <code translate="no">color</code> para cada entidad. Este proceso automatizado libera al usuario de la responsabilidad de especificar manualmente la partición al insertar o buscar datos.</p>
<p>Por otro lado, cuando se crean particiones manualmente, es necesario asignar datos a cada partición basándose en los criterios de la clave de partición. Si tiene una colección con un campo <code translate="no">color</code>, asignaría manualmente las entidades con un valor <code translate="no">color</code> de <code translate="no">red</code> a <code translate="no">partition A</code>, y las entidades con un valor <code translate="no">color</code> de <code translate="no">blue</code> a <code translate="no">partition B</code>. Esta gestión manual requiere más esfuerzo.</p>
<p>En resumen, tanto las particiones como las claves de partición se utilizan para optimizar el cálculo de datos y mejorar la eficiencia de las consultas. Es esencial reconocer que habilitar una clave de partición significa renunciar al control sobre la gestión manual de la inserción y carga de datos de partición, ya que estos procesos están totalmente automatizados y son gestionados por Milvus.</p></li>
</ul>
