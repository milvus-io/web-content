---
id: multi-vector-search.md
order: 2
summary: >-
  Esta guía muestra cómo realizar una búsqueda híbrida en Milvus y comprender la
  reordenación de los resultados.
title: Búsqueda híbrida
---
<h1 id="Hybrid-Search​" class="common-anchor-header">Búsqueda híbrida<button data-href="#Hybrid-Search​" class="anchor-icon" translate="no">
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
    </button></h1><p>La búsqueda híbrida es un método de búsqueda que realiza varias búsquedas RNA simultáneamente, reordena varios conjuntos de resultados de estas búsquedas RNA y, en última instancia, devuelve un único conjunto de resultados. El uso de la búsqueda híbrida puede mejorar la precisión de la búsqueda. Zilliz permite realizar búsquedas híbridas en una colección con varios campos vectoriales. </p>
<p>La búsqueda híbrida se utiliza con mayor frecuencia en escenarios que incluyen búsquedas de vectores dispersos y densos y búsquedas multimodales. Esta guía mostrará cómo realizar una Búsqueda Híbrida en Zilliz con un ejemplo específico.</p>
<h2 id="Scenarios​" class="common-anchor-header">Escenarios<button data-href="#Scenarios​" class="anchor-icon" translate="no">
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
    </button></h2><p>La búsqueda híbrida es adecuada para los dos escenarios siguientes.</p>
<h3 id="Sparse-Dense-Vector-Search​" class="common-anchor-header">Búsqueda de vectores dispersos-densos</h3><p>Diferentes tipos de vectores pueden representar información diferente, y el uso de varios modelos de incrustación puede representar de forma más exhaustiva diferentes características y aspectos de los datos. Por ejemplo, el uso de distintos modelos de incrustación para la misma frase puede generar un vector denso que represente el significado semántico y un vector disperso que represente la frecuencia de palabras en la frase.</p>
<ul>
<li><p><strong>Vectores dispersos:</strong> Los vectores dispersos se caracterizan por su elevada dimensionalidad y la presencia de pocos valores distintos de cero. Esta estructura los hace especialmente adecuados para las aplicaciones tradicionales de recuperación de información. En la mayoría de los casos, el número de dimensiones utilizadas en los vectores dispersos corresponde a diferentes tokens de una o varias lenguas. A cada dimensión se le asigna un valor que indica la importancia relativa de ese token dentro del documento. Esta disposición resulta ventajosa para tareas que implican la concordancia de palabras clave.</p></li>
<li><p><strong>Vectores densos:</strong> Los vectores densos son incrustaciones derivadas de las redes neuronales. Cuando se disponen en una matriz ordenada, estos vectores capturan la esencia semántica del texto de entrada. Tenga en cuenta que los vectores densos no se limitan al tratamiento de textos, sino que también se utilizan mucho en visión por ordenador para representar la semántica de los datos visuales. Estos vectores densos, normalmente generados por modelos de incrustación de texto, se caracterizan porque la mayoría o todos los elementos son distintos de cero. Así, los vectores densos son especialmente eficaces para las aplicaciones de búsqueda semántica, ya que pueden devolver los resultados más parecidos basándose en la distancia vectorial incluso en ausencia de coincidencias exactas de palabras clave. Esta capacidad permite obtener resultados de búsqueda más matizados y sensibles al contexto, que a menudo captan relaciones entre conceptos que podrían pasar desapercibidas con enfoques basados en palabras clave.</p></li>
</ul>
<p>Para más información, consulte <a href="/docs/es/sparse_vector.md">Vector disperso</a> y <a href="/docs/es/dense-vector.md">Vector denso</a>.</p>
<h3 id="Multimodal-Search​" class="common-anchor-header">Búsqueda multimodal</h3><p>La búsqueda multimodal se refiere a la búsqueda por similitud de datos no estructurados en múltiples modalidades (como imágenes, vídeos, audio, texto, etc.). Por ejemplo, una persona puede representarse utilizando varias modalidades de datos, como huellas dactilares, huellas vocales y rasgos faciales. La búsqueda híbrida permite realizar varias búsquedas simultáneamente. Por ejemplo, la búsqueda de una persona con huellas dactilares y vocales similares.</p>
<h2 id="Workflow​" class="common-anchor-header">Flujo de trabajo<button data-href="#Workflow​" class="anchor-icon" translate="no">
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
    </button></h2><p>El flujo de trabajo principal para realizar una búsqueda híbrida es el siguiente.</p>
<ol>
<li><p>Generar vectores densos mediante modelos de incrustación como <a href="https://zilliz.com/learn/explore-colbert-token-level-embedding-and-ranking-model-for-similarity-search#A-Quick-Recap-of-BERT">BERT</a> y <a href="https://zilliz.com/learn/NLP-essentials-understanding-transformers-in-AI">Transformers</a>.</p></li>
<li><p>Generar vectores dispersos mediante modelos de incrustación como <a href="https://zilliz.com/learn/mastering-bm25-a-deep-dive-into-the-algorithm-and-application-in-milvus">BM25</a>, <a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings#BGE-M3">BGE-M3</a>, <a href="https://zilliz.com/learn/bge-m3-and-splade-two-machine-learning-models-for-generating-sparse-embeddings#SPLADE">SPLADE</a>, etc.</p></li>
<li><p>Crear una colección en Zilliz y definir el esquema de la colección que incluya campos vectoriales densos y dispersos.</p></li>
<li><p>Inserte los vectores dispersos-densos en la colección creada en el paso anterior.</p></li>
<li><p>Realice una búsqueda híbrida: La búsqueda RNA en vectores densos devolverá un conjunto de los K resultados más similares, y la coincidencia de texto en vectores dispersos también devolverá un conjunto de los K resultados más similares.</p></li>
<li><p>Normalización: Normalice las puntuaciones de los dos conjuntos de resultados top-K, convirtiendo las puntuaciones a un rango entre [0,1].</p></li>
<li><p>Elegir una estrategia de reordenación adecuada para combinar y reordenar los dos conjuntos de resultados top-K y, en última instancia, obtener un conjunto final de resultados top-K.</p></li>
</ol>
<p>
  
   <span class="img-wrapper"> <img translate="no" src="/docs/v2.5.x/assets/hybrid-search.png" alt="Hybrid Search Workflow" class="doc-image" id="hybrid-search-workflow" />
   </span> <span class="img-wrapper"> <span>Flujo de trabajo de búsqueda híbrida</span> </span></p>
<h2 id="Examples​" class="common-anchor-header">Ejemplos<button data-href="#Examples​" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta sección utilizará un ejemplo específico para ilustrar cómo realizar una búsqueda híbrida en vectores poco densos para mejorar la precisión de las búsquedas de texto.</p>
<h3 id="Create-a-collection-with-multiple-vector-fields​" class="common-anchor-header">Crear una colección con varios campos vectoriales</h3><p>El proceso de creación de una colección incluye tres partes: definir el esquema de la colección, configurar los parámetros del índice y crear la colección.</p>
<h4 id="Define-schema​" class="common-anchor-header">Definir el esquema</h4><p>En este ejemplo, es necesario definir varios campos vectoriales en el esquema de la colección. Actualmente, cada colección puede incluir hasta 4 campos vectoriales por defecto. Pero también se puede modificar el valor de  <a href="https://milvus.io/docs/configure_proxy.md#proxymaxVectorFieldNum"><code translate="no">proxy.maxVectorFieldNum</code></a>  para incluir hasta 10 campos vectoriales en una colección según sea necesario.</p>
<p>El siguiente ejemplo define un esquema de colección, donde <code translate="no">dense</code> y <code translate="no">sparse</code> son los dos campos vectoriales.</p>
<ul>
<li><p><code translate="no">id</code>: Este campo sirve como clave primaria para almacenar los ID de texto. El tipo de datos de este campo es INT64.</p></li>
<li><p><code translate="no">text</code>: Este campo se utiliza para almacenar contenido textual. El tipo de datos de este campo es VARCHAR, con una longitud máxima de 1000 caracteres.</p></li>
<li><p><code translate="no">dense</code>: Este campo se utiliza para almacenar los vectores densos de los textos. El tipo de datos de este campo es FLOAT_VECTOR, con una dimensión vectorial de 768.</p></li>
<li><p><code translate="no">sparse</code>: Este campo se utiliza para almacenar los vectores dispersos de los textos. El tipo de datos de este campo es SPARSE_FLOAT_VECTOR.</p></li>
</ul>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create a collection in customized setup mode​</span>
<span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> (​
    MilvusClient, DataType​
)​
​
client = MilvusClient(​
    uri=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>,​
    token=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
)​
​
<span class="hljs-comment"># Create schema​</span>
schema = MilvusClient.create_schema(​
    auto_id=<span class="hljs-literal">False</span>,​
    enable_dynamic_field=<span class="hljs-literal">True</span>,​
)​
<span class="hljs-comment"># Add fields to schema​</span>
schema.add_field(field_name=<span class="hljs-string">&quot;id&quot;</span>, datatype=DataType.INT64, is_primary=<span class="hljs-literal">True</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;text&quot;</span>, datatype=DataType.VARCHAR, max_length=<span class="hljs-number">1000</span>)​
schema.add_field(field_name=<span class="hljs-string">&quot;sparse&quot;</span>, datatype=DataType.SPARSE_FLOAT_VECTOR)​
schema.add_field(field_name=<span class="hljs-string">&quot;dense&quot;</span>, datatype=DataType.FLOAT_VECTOR, dim=<span class="hljs-number">5</span>)​

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
CreateCollectionReq.<span class="hljs-type">CollectionSchema</span> <span class="hljs-variable">schema</span> <span class="hljs-operator">=</span> client.createSchema();​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;id&quot;</span>)​
        .dataType(DataType.Int64)​
        .isPrimaryKey(<span class="hljs-literal">true</span>)​
        .autoID(<span class="hljs-literal">false</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;text&quot;</span>)​
        .dataType(DataType.VarChar)​
        .maxLength(<span class="hljs-number">1000</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;dense&quot;</span>)​
        .dataType(DataType.FloatVector)​
        .dimension(<span class="hljs-number">768</span>)​
        .build());​
​
schema.addField(AddFieldReq.builder()​
        .fieldName(<span class="hljs-string">&quot;sparse&quot;</span>)​
        .dataType(DataType.SparseFloatVector)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-go"><span class="hljs-comment">// WIP​</span>

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> address = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>;​
<span class="hljs-keyword">const</span> token = <span class="hljs-string">&quot;root:Milvus&quot;</span>;​
<span class="hljs-keyword">const</span> client = <span class="hljs-keyword">new</span> <span class="hljs-title class_">MilvusClient</span>({address, token});​
​
<span class="hljs-comment">// Create a collection in customized setup mode​</span>
<span class="hljs-comment">// Define fields​</span>
<span class="hljs-keyword">const</span> fields = [​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;id&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">Int64</span>,​
        <span class="hljs-attr">is_primary_key</span>: <span class="hljs-literal">true</span>,​
        <span class="hljs-attr">auto_id</span>: <span class="hljs-literal">false</span>​
    },​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;text&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">VarChar</span>,​
        <span class="hljs-attr">max_length</span>: <span class="hljs-number">1000</span>​
    },​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">SPARSE_FLOAT_VECTOR</span>​
    },​
    {​
        <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;dense&quot;</span>,​
        <span class="hljs-attr">data_type</span>: <span class="hljs-title class_">DataType</span>.<span class="hljs-property">FloatVector</span>,​
        <span class="hljs-attr">dim</span>: <span class="hljs-number">768</span>​
    }​
]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> schema=<span class="hljs-string">&#x27;{​
        &quot;autoId&quot;: false,​
        &quot;enabledDynamicField&quot;: true,​
        &quot;fields&quot;: [​
            {​
                &quot;fieldName&quot;: &quot;id&quot;,​
                &quot;dataType&quot;: &quot;Int64&quot;,​
                &quot;isPrimary&quot;: true​
            },​
            {​
                &quot;fieldName&quot;: &quot;text&quot;,​
                &quot;dataType&quot;: &quot;VarChar&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;max_length&quot;: 1000​
                }​
            },​
            {​
                &quot;fieldName&quot;: &quot;sparse&quot;,​
                &quot;dataType&quot;: &quot;SparseFloatVector&quot;​
            },​
            {​
                &quot;fieldName&quot;: &quot;dense&quot;,​
                &quot;dataType&quot;: &quot;FloatVector&quot;,​
                &quot;elementTypeParams&quot;: {​
                    &quot;dim&quot;: &quot;768&quot;​
                }​
            }​
        ]​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Durante las búsquedas de vectores dispersos, puede simplificar el proceso de generación de vectores dispersos de incrustación aprovechando las funciones de búsqueda de texto completo. Para obtener más información, consulte <a href="/docs/es/full-text-search.md">Búsqueda de texto completo</a>.</p>
<h4 id="Create-index​" class="common-anchor-header">Crear índice</h4><p>Tras definir el esquema de la colección, es necesario configurar los índices vectoriales y las métricas de similitud. En este ejemplo, se crea un índice IVF_FLAT para el campo vectorial denso <code translate="no">dense</code>, y un SPARSE_INVERTED_INDEX para el campo vectorial disperso <code translate="no">sparse</code>. Para saber más sobre los tipos de índices soportados, consulta <a href="https://milvus.io/docs/index.md?tab=floating">Index Explained</a>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
<span class="hljs-comment"># Prepare index parameters​</span>
index_params = client.prepare_index_params()​
​
<span class="hljs-comment"># Add indexes​</span>
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;dense&quot;</span>,​
    index_name=<span class="hljs-string">&quot;dense_index&quot;</span>,​
    index_type=<span class="hljs-string">&quot;IVF_FLAT&quot;</span>,​
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,​
    params={<span class="hljs-string">&quot;nlist&quot;</span>: <span class="hljs-number">128</span>},​
)​
​
index_params.add_index(​
    field_name=<span class="hljs-string">&quot;sparse&quot;</span>,​
    index_name=<span class="hljs-string">&quot;sparse_index&quot;</span>,​
    index_type=<span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,  <span class="hljs-comment"># Index type for sparse vectors​</span>
    metric_type=<span class="hljs-string">&quot;IP&quot;</span>,  <span class="hljs-comment"># Currently, only IP (Inner Product) is supported for sparse vectors​</span>
    params={<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>},  <span class="hljs-comment"># The ratio of small vector values to be dropped during indexing​</span>
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.<span class="hljs-property">milvus</span>.<span class="hljs-property">v2</span>.<span class="hljs-property">common</span>.<span class="hljs-property">IndexParam</span>;​
<span class="hljs-keyword">import</span> java.<span class="hljs-property">util</span>.*;​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; denseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
denseParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;nlist&quot;</span>, <span class="hljs-number">128</span>);​
<span class="hljs-title class_">IndexParam</span> indexParamForDenseField = <span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;dense&quot;</span>)​
        .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;dense_index&quot;</span>)​
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">IVF_FLAT</span>)​
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">IP</span>)​
        .<span class="hljs-title function_">extraParams</span>(denseParams)​
        .<span class="hljs-title function_">build</span>();​
​
<span class="hljs-title class_">Map</span>&lt;<span class="hljs-title class_">String</span>, <span class="hljs-title class_">Object</span>&gt; sparseParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">HashMap</span>&lt;&gt;();​
sparseParams.<span class="hljs-title function_">put</span>(<span class="hljs-string">&quot;drop_ratio_build&quot;</span>, <span class="hljs-number">0.2</span>);​
<span class="hljs-title class_">IndexParam</span> indexParamForSparseField = <span class="hljs-title class_">IndexParam</span>.<span class="hljs-title function_">builder</span>()​
        .<span class="hljs-title function_">fieldName</span>(<span class="hljs-string">&quot;sparse&quot;</span>)​
        .<span class="hljs-title function_">indexName</span>(<span class="hljs-string">&quot;sparse_index&quot;</span>)​
        .<span class="hljs-title function_">indexType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">IndexType</span>.<span class="hljs-property">SPARSE_INVERTED_INDEX</span>)​
        .<span class="hljs-title function_">metricType</span>(<span class="hljs-title class_">IndexParam</span>.<span class="hljs-property">MetricType</span>.<span class="hljs-property">IP</span>)​
        .<span class="hljs-title function_">extraParams</span>(sparseParams)​
        .<span class="hljs-title function_">build</span>();​
​
<span class="hljs-title class_">List</span>&lt;<span class="hljs-title class_">IndexParam</span>&gt; indexParams = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ArrayList</span>&lt;&gt;();​
indexParams.<span class="hljs-title function_">add</span>(indexParamForDenseField);​
indexParams.<span class="hljs-title function_">add</span>(indexParamForSparseField);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> index_params = [{​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;dense&quot;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;IVF_FLAT&quot;</span>,​
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>​
},{​
    <span class="hljs-attr">field_name</span>: <span class="hljs-string">&quot;sparse&quot;</span>,​
    <span class="hljs-attr">index_type</span>: <span class="hljs-string">&quot;SPARSE_INVERTED_INDEX&quot;</span>,​
    <span class="hljs-attr">metric_type</span>: <span class="hljs-string">&quot;IP&quot;</span>​
}]​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> indexParams=<span class="hljs-string">&#x27;[​
        {​
            &quot;fieldName&quot;: &quot;dense&quot;,​
            &quot;metricType&quot;: &quot;IP&quot;,​
            &quot;indexName&quot;: &quot;dense_index&quot;,​
            &quot;indexType&quot;:&quot;IVF_FLAT&quot;,​
            &quot;params&quot;:{&quot;nlist&quot;:128}​
        },​
        {​
            &quot;fieldName&quot;: &quot;sparse&quot;,​
            &quot;metricType&quot;: &quot;IP&quot;,​
            &quot;indexName&quot;: &quot;sparse_index&quot;,​
            &quot;indexType&quot;: &quot;SPARSE_INVERTED_INDEX&quot;​
        }​
    ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h4 id="Create-collection​" class="common-anchor-header">Crear colección</h4><p>Crea una colección llamada <code translate="no">demo</code> con el esquema de colección y los índices configurados en los dos pasos anteriores.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
client.<span class="hljs-title function_">create_collection</span>(​
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    schema=schema,​
    index_params=index_params​
)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-type">CreateCollectionReq</span> <span class="hljs-variable">createCollectionReq</span> <span class="hljs-operator">=</span> CreateCollectionReq.builder()​
        .collectionName(<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>)​
        .collectionSchema(schema)​
        .indexParams(indexParams)​
        .build();​
client.createCollection(createCollectionReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript">res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">createCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    <span class="hljs-attr">fields</span>: fields,​
    <span class="hljs-attr">index_params</span>: index_params,​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> CLUSTER_ENDPOINT=<span class="hljs-string">&quot;http://localhost:19530&quot;</span>​
<span class="hljs-built_in">export</span> TOKEN=<span class="hljs-string">&quot;root:Milvus&quot;</span>​
​
curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/collections/create&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;hybrid_search_collection\&quot;,​
    \&quot;schema\&quot;: <span class="hljs-variable">$schema</span>,​
    \&quot;indexParams\&quot;: <span class="hljs-variable">$indexParams</span>​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Insert-data​" class="common-anchor-header">Insertar datos</h3><p>Inserta los vectores dispersos-densos en la colección <code translate="no">demo</code>.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">MilvusClient</span>​
​
data=[​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>:{<span class="hljs-number">9637</span>: <span class="hljs-number">0.30856525997853057</span>, <span class="hljs-number">4399</span>: <span class="hljs-number">0.19771651149001523</span>, ...}, <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, ...]},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>:{<span class="hljs-number">6959</span>: <span class="hljs-number">0.31025067641541815</span>, <span class="hljs-number">1729</span>: <span class="hljs-number">0.8265339135915016</span>, ...}, <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, ...]},​
    {<span class="hljs-string">&quot;id&quot;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&quot;text&quot;</span>: <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>, <span class="hljs-string">&quot;sparse&quot;</span>:{<span class="hljs-number">1220</span>: <span class="hljs-number">0.15303302147479103</span>, <span class="hljs-number">7335</span>: <span class="hljs-number">0.9436728846033107</span>, ...}, <span class="hljs-string">&quot;dense&quot;</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, ...]}​
​
res = client.<span class="hljs-title function_">insert</span>(​
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    data=data​
)​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> com.google.gson.Gson;​
<span class="hljs-keyword">import</span> com.google.gson.JsonObject;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.InsertReq;​
​
<span class="hljs-type">Gson</span> <span class="hljs-variable">gson</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Gson</span>();​
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row1</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();​
row1.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">1</span>);​
row1.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>);​
row1.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense1));​
row1.add(<span class="hljs-string">&quot;sparse&quot;</span>, gson.toJsonTree(sparse1));​
​
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row2</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();​
row2.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">2</span>);​
row2.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>);​
row2.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense2));​
row2.add(<span class="hljs-string">&quot;sparse&quot;</span>, gson.toJsonTree(sparse2));​
​
<span class="hljs-type">JsonObject</span> <span class="hljs-variable">row3</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">JsonObject</span>();​
row3.addProperty(<span class="hljs-string">&quot;id&quot;</span>, <span class="hljs-number">3</span>);​
row3.addProperty(<span class="hljs-string">&quot;text&quot;</span>, <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span>);​
row3.add(<span class="hljs-string">&quot;dense&quot;</span>, gson.toJsonTree(dense3));​
row3.add(<span class="hljs-string">&quot;sparse&quot;</span>, gson.toJsonTree(sparse3));​
​
List&lt;JsonObject&gt; data = Arrays.asList(row1, row2, row3);​
<span class="hljs-type">InsertReq</span> <span class="hljs-variable">insertReq</span> <span class="hljs-operator">=</span> InsertReq.builder()​
        .collectionName(<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>)​
        .data(data)​
        .build();​
​
<span class="hljs-type">InsertResp</span> <span class="hljs-variable">insertResp</span> <span class="hljs-operator">=</span> client.insert(insertReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
<span class="hljs-keyword">var</span> data = [​
    {<span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;</span>, <span class="hljs-attr">sparse</span>:[<span class="hljs-number">9637</span>: <span class="hljs-number">0.30856525997853057</span>, <span class="hljs-number">4399</span>: <span class="hljs-number">0.19771651149001523</span>, ...] , <span class="hljs-attr">dense</span>: [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]},​
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Alan Turing was the first person to conduct substantial research in AI.&quot;</span>, <span class="hljs-attr">sparse</span>:[<span class="hljs-number">6959</span>: <span class="hljs-number">0.31025067641541815</span>, <span class="hljs-number">1729</span>: <span class="hljs-number">0.8265339135915016</span>, ...] , <span class="hljs-attr">dense</span>: [<span class="hljs-number">0.19886812562848388</span>, <span class="hljs-number">0.06023560599112088</span>, <span class="hljs-number">0.6976963061752597</span>, <span class="hljs-number">0.2614474506242501</span>, <span class="hljs-number">0.838729485096104</span>]},​
    {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;</span> , <span class="hljs-attr">sparse</span>:[<span class="hljs-number">1220</span>: <span class="hljs-number">0.15303302147479103</span>, <span class="hljs-number">7335</span>: <span class="hljs-number">0.9436728846033107</span>, ...] , <span class="hljs-attr">dense</span>: [<span class="hljs-number">0.43742130801983836</span>, -<span class="hljs-number">0.5597502546264526</span>, <span class="hljs-number">0.6457887650909682</span>, <span class="hljs-number">0.7894058910881185</span>, <span class="hljs-number">0.20785793220625592</span>]}       ​
]​
​
<span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">insert</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    <span class="hljs-attr">data</span>: data,​
})​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/insert&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&#x27;{​
    &quot;data&quot;: [​
        {&quot;id&quot;: 0, &quot;text&quot;: &quot;Artificial intelligence was founded as an academic discipline in 1956.&quot;, &quot;sparse&quot;:{&quot;9637&quot;: 0.30856525997853057, &quot;4399&quot;: 0.19771651149001523}, &quot;dense&quot;: [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, ...]},​
        {&quot;id&quot;: 1, &quot;text&quot;: &quot;Alan Turing was the first person to conduct substantial research in AI.&quot;, &quot;sparse&quot;:{&quot;6959&quot;: 0.31025067641541815, &quot;1729&quot;: 0.8265339135915016}, &quot;dense&quot;: [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, ...]},​
        {&quot;id&quot;: 2, &quot;text&quot;: &quot;Born in Maida Vale, London, Turing was raised in southern England.&quot;, &quot;sparse&quot;:{&quot;1220&quot;: 0.15303302147479103, &quot;7335&quot;: 0.9436728846033107}, &quot;dense&quot;: [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, ...]}​
    ],​
    &quot;collectionName&quot;: &quot;hybrid_search_collection&quot;​
}&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<h3 id="Create-multiple-AnnSearchRequest-instances​" class="common-anchor-header">Crear múltiples instancias AnnSearchRequest</h3><p>La Búsqueda Híbrida se implementa creando múltiples <code translate="no">AnnSearchRequest</code> en la función <code translate="no">hybrid_search()</code>, donde cada <code translate="no">AnnSearchRequest</code> representa una petición de búsqueda ANN básica para un campo vectorial específico. Por lo tanto, antes de realizar una Búsqueda Híbrida, es necesario crear un <code translate="no">AnnSearchRequest</code> para cada campo vectorial.</p>
<div class="alert note">
<p>En la búsqueda híbrida, cada <code translate="no">AnnSearchRequest</code> sólo admite un vector de consulta.</p>
</div>
<p>Supongamos que el texto de consulta "¿Quién inició la investigación sobre IA?" ya se ha convertido en vectores dispersos y densos. En base a esto, se crean dos peticiones de búsqueda <code translate="no">AnnSearchRequest</code> para los campos vectoriales <code translate="no">sparse</code> y <code translate="no">dense</code> respectivamente, como se muestra en el siguiente ejemplo.</p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">AnnSearchRequest</span>​
​
query_dense_vector = [<span class="hljs-number">0.3580376395471989</span>, -<span class="hljs-number">0.6023495712049978</span>, <span class="hljs-number">0.18414012509913835</span>, -<span class="hljs-number">0.26286205330961354</span>, <span class="hljs-number">0.9029438446296592</span>]​
​
search_param_1 = {​
    <span class="hljs-string">&quot;data&quot;</span>: [query_dense_vector],​
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;dense&quot;</span>,​
    <span class="hljs-string">&quot;param&quot;</span>: {​
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,​
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}​
    },​
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>​
}​
request_1 = <span class="hljs-title class_">AnnSearchRequest</span>(**search_param_1)​
​
query_sparse_vector = {<span class="hljs-number">3573</span>: <span class="hljs-number">0.34701499565746674</span>}, {<span class="hljs-number">5263</span>: <span class="hljs-number">0.2639375518635271</span>}​
search_param_2 = {​
    <span class="hljs-string">&quot;data&quot;</span>: [query_sparse_vector],​
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;sparse&quot;</span>,​
    <span class="hljs-string">&quot;param&quot;</span>: {​
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>,​
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>}​
    },​
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span>​
}​
request_2 = <span class="hljs-title class_">AnnSearchRequest</span>(**search_param_2)​
​
reqs = [request_1, request_2]​
​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java">import io.milvus.v2.service.vector.request.AnnSearchReq;​
import io.milvus.v2.service.vector.request.data.BaseVector;​
import io.milvus.v2.service.vector.request.data.FloatVec;​
import io.milvus.v2.service.vector.request.data.SparseFloatVec;​
​
<span class="hljs-built_in">float</span>[] dense = <span class="hljs-keyword">new</span> <span class="hljs-built_in">float</span>[]{<span class="hljs-number">-0.0475336798f</span>,  <span class="hljs-number">0.0521207601f</span>,  <span class="hljs-number">0.0904406682f</span>, ...};​
SortedMap&lt;Long, Float&gt; sparse = <span class="hljs-keyword">new</span> TreeMap&lt;Long, Float&gt;() {{​
    put(<span class="hljs-number">3573L</span>, <span class="hljs-number">0.34701499f</span>);​
    put(<span class="hljs-number">5263L</span>, <span class="hljs-number">0.263937551f</span>);​
    ...​
}};​
​
​
List&lt;BaseVector&gt; queryDenseVectors = Collections.singletonList(<span class="hljs-keyword">new</span> FloatVec(dense));​
List&lt;BaseVector&gt; querySparseVectors = Collections.singletonList(<span class="hljs-keyword">new</span> SparseFloatVec(sparse));​
​
List&lt;AnnSearchReq&gt; searchRequests = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();​
searchRequests.<span class="hljs-keyword">add</span>(AnnSearchReq.builder()​
        .vectorFieldName(<span class="hljs-string">&quot;dense&quot;</span>)​
        .vectors(queryDenseVectors)​
        .metricType(IndexParam.MetricType.IP)​
        .<span class="hljs-keyword">params</span>(<span class="hljs-string">&quot;{\&quot;nprobe\&quot;: 10}&quot;</span>)​
        .topK(<span class="hljs-number">2</span>)​
        .build());​
searchRequests.<span class="hljs-keyword">add</span>(AnnSearchReq.builder()​
        .vectorFieldName(<span class="hljs-string">&quot;sparse&quot;</span>)​
        .vectors(querySparseVectors)​
        .metricType(IndexParam.MetricType.IP)​
        .<span class="hljs-keyword">params</span>(<span class="hljs-string">&quot;{\&quot;drop_ratio_build\&quot;: 0.2}&quot;</span>)​
        .topK(<span class="hljs-number">2</span>)​
        .build());​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> search_param_1 = {​
    <span class="hljs-string">&quot;data&quot;</span>: query_vector, ​
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;dense&quot;</span>, ​
    <span class="hljs-string">&quot;param&quot;</span>: {​
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment">// 参数值需要与 Collection Schema 中定义的保持一致​</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;nprobe&quot;</span>: <span class="hljs-number">10</span>}​
    },​
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment">// AnnSearchRequest 返还的搜索结果数量​</span>
}​
​
<span class="hljs-keyword">const</span> search_param_2 = {​
    <span class="hljs-string">&quot;data&quot;</span>: query_sparse_vector, ​
    <span class="hljs-string">&quot;anns_field&quot;</span>: <span class="hljs-string">&quot;sparse&quot;</span>, ​
    <span class="hljs-string">&quot;param&quot;</span>: {​
        <span class="hljs-string">&quot;metric_type&quot;</span>: <span class="hljs-string">&quot;IP&quot;</span>, <span class="hljs-comment">// 参数值需要与 Collection Schema 中定义的保持一致​</span>
        <span class="hljs-string">&quot;params&quot;</span>: {<span class="hljs-string">&quot;drop_ratio_build&quot;</span>: <span class="hljs-number">0.2</span>}​
    },​
    <span class="hljs-string">&quot;limit&quot;</span>: <span class="hljs-number">2</span> <span class="hljs-comment">// AnnSearchRequest 返还的搜索结果数量​</span>
}​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> req=<span class="hljs-string">&#x27;[​
    {​
        &quot;data&quot;: [[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592,....]],​
        &quot;annsField&quot;: &quot;dense&quot;,​
        &quot;params&quot;: {​
            &quot;params&quot;: {​
                &quot;nprobe&quot;: 10​
             }​
        },​
        &quot;limit&quot;: 2​
    },​
    {​
        &quot;data&quot;: [{&quot;3573&quot;: 0.34701499565746674}, {&quot;5263&quot;: 0.2639375518635271}],​
        &quot;annsField&quot;: &quot;sparse&quot;,​
        &quot;params&quot;: {​
            &quot;params&quot;: {​
                &quot;drop_ratio_build&quot;: 0.2​
             }​
        },​
        &quot;limit&quot;: 2​
    }​
 ]&#x27;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>Dado que el parámetro <code translate="no">limit</code> se establece en 2, cada <code translate="no">AnnSearchRequest</code> devuelve 2 resultados de búsqueda. En este ejemplo, se crean 2 <code translate="no">AnnSearchRequest</code>, por lo que se devolverá un total de 4 resultados de búsqueda.</p>
<h3 id="Configure-a-reranking-strategy​" class="common-anchor-header">Configurar una estrategia de reordenación</h3><p>Para combinar y jerarquizar los dos conjuntos de resultados de búsqueda de RNA, es necesario seleccionar una estrategia de jerarquización adecuada. Zilliz admite dos tipos de estrategia de reordenación: <strong>WeightedRanker</strong> y <strong>RRFRanker</strong>. A la hora de elegir una estrategia de reordenación, hay que tener en cuenta si se hace hincapié en una o varias búsquedas básicas de RNA en los campos vectoriales.</p>
<ul>
<li><p><strong>WeightedRanker</strong>: Esta estrategia se recomienda si necesita que los resultados hagan hincapié en un campo vectorial concreto. El WeightedRanker permite asignar pesos más altos a determinados campos vectoriales, enfatizándolos más. Por ejemplo, en las búsquedas multimodales, las descripciones textuales de una imagen podrían considerarse más importantes que los colores de esta imagen.</p></li>
<li><p><strong>RRFRanker (Reciprocal Rank Fusion Ranker)</strong>: Esta estrategia se recomienda cuando no hay un énfasis específico. El RRF puede equilibrar eficazmente la importancia de cada campo vectorial.</p></li>
</ul>
<p>Para más detalles sobre los mecanismos de estas dos estrategias de reordenación, consulte <a href="/docs/es/reranking.md">Reordenación</a>.</p>
<p>Los dos ejemplos siguientes muestran cómo utilizar las estrategias de reordenación WeightedRanker y RRFRanker.</p>
<ol>
<li><p><strong>Ejemplo 1: Uso de WeightedRanker</strong></p>
<p>Al utilizar la estrategia WeightedRanker, debe introducir valores de ponderación en la función <code translate="no">WeightedRanker</code>. El número de búsquedas básicas de RNA en una búsqueda híbrida corresponde al número de valores que hay que introducir. Los valores de entrada deben estar en el rango [0,1], con valores más cercanos a 1 indicando mayor importancia.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">WeightedRanker</span>​
​
rerank= <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>) ​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BaseRanker;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.WeightedRanker;​
​
<span class="hljs-type">BaseRanker</span> <span class="hljs-variable">reranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">WeightedRanker</span>(Arrays.asList(<span class="hljs-number">0.8f</span>, <span class="hljs-number">0.3f</span>));​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> rerank = <span class="hljs-title class_">WeightedRanker</span>(<span class="hljs-number">0.8</span>, <span class="hljs-number">0.3</span>);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{​
        &quot;strategy&quot;: &quot;ws&quot;,​
        &quot;params&quot;: {&quot;weights&quot;: [0.8,0.3]}​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre></li>
<li><p><strong>Ejemplo 2: Uso de RRFRanker</strong></p>
<p>Cuando se utiliza la estrategia RRFRanker, es necesario introducir el valor del parámetro <code translate="no">k</code> en el RRFRanker. El valor predeterminado de <code translate="no">k</code> es 60. Este parámetro ayuda a determinar cómo se combinan los rangos de diferentes búsquedas de RNA, con el objetivo de equilibrar y mezclar la importancia entre todas las búsquedas.</p>
<p><div class="multipleCode">
<a href="#python">Python </a><a href="#java">Java</a><a href="#javascript">Node.js</a><a href="#curl">cURL</a></div></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> <span class="hljs-title class_">RRFRanker</span>​
​
ranker = <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.BaseRanker;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.ranker.RRFRanker;​
​
<span class="hljs-type">BaseRanker</span> <span class="hljs-variable">reranker</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>;​
​
<span class="hljs-keyword">const</span> rerank = <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-string">&quot;100&quot;</span>);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl"><span class="hljs-built_in">export</span> rerank=<span class="hljs-string">&#x27;{​
        &quot;strategy&quot;: &quot;rrf&quot;,​
        &quot;params&quot;: { &quot;k&quot;: 100}​
    }&#x27;</span>​

<button class="copy-code-btn"></button></code></pre></li>
</ol>
<h3 id="Perform-a-Hybrid-Search​" class="common-anchor-header">Realizar una búsqueda híbrida</h3><p>Antes de realizar una búsqueda híbrida, es necesario cargar la colección en memoria. Si algún campo vectorial de la colección no tiene un índice o no está cargado, se producirá un error al llamar al método de Búsqueda Híbrida. </p>
<div class="multipleCode">
   <a href="#python">Python </a> <a href="#java">Java</a> <a href="#javascript">Node.js</a> <a href="#curl">cURL</a></div>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> pymilvus <span class="hljs-keyword">import</span> MilvusClient​
​
res = client.hybrid_search(​
    collection_name=<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
    reqs=reqs,​
    ranker=ranker,​
    limit=<span class="hljs-number">2</span>​
)​
<span class="hljs-keyword">for</span> hits <span class="hljs-keyword">in</span> res:​
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TopK results:&quot;</span>)​
    <span class="hljs-keyword">for</span> hit <span class="hljs-keyword">in</span> hits:​
        <span class="hljs-built_in">print</span>(hit)​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-java"><span class="hljs-keyword">import</span> io.milvus.v2.common.ConsistencyLevel;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.request.HybridSearchReq;​
<span class="hljs-keyword">import</span> io.milvus.v2.service.vector.response.SearchResp;​
​
<span class="hljs-type">HybridSearchReq</span> <span class="hljs-variable">hybridSearchReq</span> <span class="hljs-operator">=</span> HybridSearchReq.builder()​
        .collectionName(<span class="hljs-string">&quot;hybrid_search_collection&quot;</span>)​
        .searchRequests(searchRequests)​
        .ranker(reranker)​
        .topK(<span class="hljs-number">2</span>)​
        .consistencyLevel(ConsistencyLevel.BOUNDED)​
        .build();​
​
<span class="hljs-type">SearchResp</span> <span class="hljs-variable">searchResp</span> <span class="hljs-operator">=</span> client.hybridSearch(hybridSearchReq);​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-javascript"><span class="hljs-keyword">const</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">DataType</span> } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;@zilliz/milvus2-sdk-node&quot;</span>)​
​
res = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">loadCollection</span>({​
    <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>​
})​
​
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">MilvusClient</span>, <span class="hljs-title class_">RRFRanker</span>, <span class="hljs-title class_">WeightedRanker</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@zilliz/milvus2-sdk-node&#x27;</span>;​
​
<span class="hljs-keyword">const</span> search = <span class="hljs-keyword">await</span> client.<span class="hljs-title function_">search</span>({​
  <span class="hljs-attr">collection_name</span>: <span class="hljs-string">&quot;hybrid_search_collection&quot;</span>,​
  <span class="hljs-attr">data</span>: [search_param_1, search_param_2],​
  <span class="hljs-attr">limit</span>: <span class="hljs-number">2</span>,​
  <span class="hljs-attr">rerank</span>: <span class="hljs-title class_">RRFRanker</span>(<span class="hljs-number">100</span>)​
});​

<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-curl">curl --request POST \​
--url <span class="hljs-string">&quot;<span class="hljs-variable">${CLUSTER_ENDPOINT}</span>/v2/vectordb/entities/advanced_search&quot;</span> \​
--header <span class="hljs-string">&quot;Authorization: Bearer <span class="hljs-variable">${TOKEN}</span>&quot;</span> \​
--header <span class="hljs-string">&quot;Content-Type: application/json&quot;</span> \​
-d <span class="hljs-string">&quot;{​
    \&quot;collectionName\&quot;: \&quot;hybrid_search_collection\&quot;,​
    \&quot;search\&quot;: <span class="hljs-variable">${req}</span>,​
    \&quot;rerank\&quot;: {​
        \&quot;strategy\&quot;:\&quot;rrf\&quot;,​
        \&quot;params\&quot;: {​
            \&quot;k\&quot;: 10​
        }​
    },​
    \&quot;limit\&quot;: 3,​
    \&quot;outputFields\&quot;: [​
        \&quot;user_id\&quot;,​
        \&quot;word_count\&quot;,​
        \&quot;book_describe\&quot;​
    ]​
}&quot;</span>​

<button class="copy-code-btn"></button></code></pre>
<p>A continuación se muestra la salida.</p>
<pre><code translate="no" class="language-json">[<span class="hljs-string">&quot;[&#x27;id: 844, distance: 0.006047376897186041, entity: {}&#x27;, &#x27;id: 876, distance: 0.006422005593776703, entity: {}&#x27;]&quot;</span>]​

<button class="copy-code-btn"></button></code></pre>
<p>Dado que <code translate="no">limit=2</code> se especifica en la Búsqueda Híbrida, Zilliz reordenará los cuatro resultados de búsqueda del paso 3 y finalmente devolverá sólo los 2 resultados de búsqueda más similares. </p>
