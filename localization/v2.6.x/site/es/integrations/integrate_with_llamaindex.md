---
id: integrate_with_llamaindex.md
summary: >-
  Esta guía muestra cómo construir un sistema de Generación Aumentada por
  Recuperación (RAG) utilizando LlamaIndex y Milvus.
title: Retrieval-Augmented Generation (RAG) con Milvus y LlamaIndex
---
<h1 id="Retrieval-Augmented-Generation-RAG-with-Milvus-and-LlamaIndex" class="common-anchor-header">Retrieval-Augmented Generation (RAG) con Milvus y LlamaIndex<button data-href="#Retrieval-Augmented-Generation-RAG-with-Milvus-and-LlamaIndex" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_llamaindex.ipynb" target="_parent"><img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/rag_with_milvus_and_llamaindex.ipynb" target="_blank"><img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/></a></p>
<p>Esta guía muestra cómo construir un sistema de Generación Aumentada por Recuperación (RAG) utilizando LlamaIndex y Milvus.</p>
<p>El sistema RAG combina un sistema de recuperación con un modelo generativo para generar texto nuevo basado en una petición dada. En primer lugar, el sistema recupera documentos relevantes de un corpus utilizando Milvus y, a continuación, utiliza un modelo generativo para generar un nuevo texto basado en los documentos recuperados.</p>
<p><a href="https://www.llamaindex.ai/">LlamaIndex</a> es un marco de datos sencillo y flexible para conectar fuentes de datos personalizadas a grandes modelos lingüísticos (LLM). <a href="https://milvus.io/">Milvus</a> es la base de datos vectorial de código abierto más avanzada del mundo, creada para potenciar la búsqueda de similitudes incrustadas y las aplicaciones de IA.</p>
<p>En este cuaderno vamos a mostrar una demostración rápida del uso de MilvusVectorStore.</p>
<h2 id="Before-you-begin" class="common-anchor-header">Antes de empezar<button data-href="#Before-you-begin" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Install-dependencies" class="common-anchor-header">Instale las dependencias</h3><p>Los fragmentos de código de esta página requieren las dependencias pymilvus y llamaindex. Puede instalarlas utilizando los siguientes comandos:</p>
<pre><code translate="no" class="language-python">$ pip install pymilvus&gt;=<span class="hljs-number">2.4</span><span class="hljs-number">.2</span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">$ pip install llama-index-vector-stores-milvus
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">$ pip install llama-index
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si utilizas Google Colab, para activar las dependencias que acabas de instalar, es posible que tengas que <strong>reiniciar el tiempo de ejecución</strong>. (Haga clic en el menú "Runtime" en la parte superior de la pantalla, y seleccione "Reiniciar sesión" en el menú desplegable).</p>
</div>
<h3 id="Setup-OpenAI" class="common-anchor-header">Configuración de OpenAI</h3><p>Empecemos por añadir la clave api openai. Esto nos permitirá acceder a chatgpt.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-data" class="common-anchor-header">Preparar los datos</h3><p>Puedes descargar datos de muestra con los siguientes comandos:</p>
<pre><code translate="no" class="language-python">! mkdir -p <span class="hljs-string">&#x27;data/&#x27;</span>
! wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham_essay.txt&#x27;</span>
! wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/uber_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/uber_2021.pdf&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Getting-Started" class="common-anchor-header">Primeros pasos<button data-href="#Getting-Started" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Generate-our-data" class="common-anchor-header">Generar nuestros datos</h3><p>Como primer ejemplo, vamos a generar un documento a partir del archivo <code translate="no">paul_graham_essay.txt</code>. Se trata de un único ensayo de Paul Graham titulado <code translate="no">What I Worked On</code>. Para generar los documentos utilizaremos el SimpleDirectoryReader.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

<span class="hljs-comment"># load documents</span>
documents = SimpleDirectoryReader(
    input_files=[<span class="hljs-string">&quot;./data/paul_graham_essay.txt&quot;</span>]
).load_data()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Document ID:&quot;</span>, documents[<span class="hljs-number">0</span>].doc_id)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document ID: 95f25e4d-f270-4650-87ce-006d69d82033
</code></pre>
<h3 id="Create-an-index-across-the-data" class="common-anchor-header">Crear un índice a través de los datos</h3><p>Ahora que tenemos un documento, podemos crear un índice e insertar el documento. Para el índice utilizaremos un MilvusVectorStore. MilvusVectorStore toma algunos argumentos:</p>
<h4 id="basic-args" class="common-anchor-header">argumentos básicos</h4><ul>
<li><code translate="no">uri (str, optional)</code>: El URI al que conectarse, viene en forma de "https://address:port" para Milvus o Zilliz Cloud service, o "path/to/local/milvus.db" para el Milvus local lite. Por defecto es "./milvus_llamaindex.db".</li>
<li><code translate="no">token (str, optional)</code>: El token para iniciar sesión. Vacío si no se utiliza rbac, si se utiliza rbac lo más probable es que sea "username:password".</li>
<li><code translate="no">collection_name (str, optional)</code>: El nombre de la colección donde se almacenarán los datos. Por defecto es "llamalection".</li>
<li><code translate="no">overwrite (bool, optional)</code>: Si se sobrescribirá la colección existente con el mismo nombre. Por defecto es False.</li>
</ul>
<h4 id="scalar-fields-including-doc-id--text" class="common-anchor-header">campos escalares incluyendo doc id &amp; text</h4><ul>
<li><code translate="no">doc_id_field (str, optional)</code>: El nombre del campo doc_id para la colección. Por defecto es DEFAULT_DOC_ID_KEY.</li>
<li><code translate="no">text_key (str, optional)</code>: En qué texto clave se almacena en la colección pasada. Se utiliza cuando se trae una colección propia. Por defecto es DEFAULT_TEXT_KEY.</li>
<li><code translate="no">scalar_field_names (list, optional)</code>: Los nombres de los campos escalares extra a incluir en el esquema de la colección.</li>
<li><code translate="no">scalar_field_types (list, optional)</code>: Los tipos de los campos escalares adicionales.</li>
</ul>
<h4 id="dense-field" class="common-anchor-header">campo denso</h4><ul>
<li><code translate="no">enable_dense (bool)</code>: Un indicador booleano para activar o desactivar la incrustación densa. Por defecto es True.</li>
<li><code translate="no">dim (int, optional)</code>: La dimensión de los vectores de incrustación para la colección. Requerido cuando se crea una nueva colección con enable_sparse es False.</li>
<li><code translate="no">embedding_field (str, optional)</code>: El nombre del campo de incrustación densa para la colección, por defecto DEFAULT_EMBEDDING_KEY.</li>
<li><code translate="no">index_config (dict, optional)</code>: La configuración utilizada para construir el índice de incrustación densa. Por defecto es None.</li>
<li><code translate="no">search_config (dict, optional)</code>: La configuración utilizada para buscar en el índice denso de Milvus. Tenga en cuenta que debe ser compatible con el tipo de índice especificado por <code translate="no">index_config</code>. Por defecto None.</li>
<li><code translate="no">similarity_metric (str, optional)</code>: La métrica de similitud a utilizar para la incrustación densa, actualmente soporta IP, COSINE y L2.</li>
</ul>
<h4 id="sparse-field" class="common-anchor-header">campo disperso</h4><ul>
<li><code translate="no">enable_sparse (bool)</code>: Un indicador booleano para activar o desactivar la incrustación dispersa. Por defecto es False.</li>
<li><code translate="no">sparse_embedding_field (str)</code>: El nombre del campo de incrustación dispersa, por defecto DEFAULT_SPARSE_EMBEDDING_KEY.</li>
<li><code translate="no">sparse_embedding_function (Union[BaseSparseEmbeddingFunction, BaseMilvusBuiltInFunction], optional)</code>: Si enable_sparse es True, este objeto debe proporcionarse para convertir el texto a una incrustación dispersa. Si es None, se utilizará la función de incrustación dispersa por defecto (BGEM3SparseEmbeddingFunction).</li>
<li><code translate="no">sparse_index_config (dict, optional)</code>: La configuración utilizada para construir el índice de incrustación dispersa. Por defecto es None.</li>
</ul>
<h4 id="hybrid-ranker" class="common-anchor-header">clasificador híbrido</h4><ul>
<li><p><code translate="no">hybrid_ranker (str)</code>: Especifica el tipo de clasificador utilizado en las consultas de búsqueda híbrida. Actualmente sólo admite ["RRFRanker", "WeightedRanker"]. Por defecto es "RRFRanker".</p></li>
<li><p><code translate="no">hybrid_ranker_params (dict, optional)</code>: Parámetros de configuración del clasificador híbrido. La estructura de este diccionario depende del clasificador específico que se utilice:</p>
<ul>
<li>Para "RRFRanker", debe incluir:<ul>
<li>"k" (int): Parámetro utilizado en la fusión de rangos recíprocos (RRF). Este valor se utiliza para calcular las puntuaciones de clasificación como parte del algoritmo RRF, que combina múltiples estrategias de clasificación en una única puntuación para mejorar la relevancia de la búsqueda.</li>
</ul></li>
<li>Para "WeightedRanker", se espera<ul>
<li>"pesos" (lista de float): Una lista de exactamente dos pesos:<ol>
<li>El peso del componente de incrustación densa.</li>
<li>Estas ponderaciones se utilizan para ajustar la importancia de los componentes denso y disperso de las incrustaciones en el proceso de recuperación híbrido. Por defecto, el diccionario está vacío, lo que implica que el clasificador funcionará con su configuración predeterminada.</li>
</ol></li>
</ul></li>
</ul></li>
</ul>
<h4 id="others" class="common-anchor-header">otros</h4><ul>
<li><code translate="no">collection_properties (dict, optional)</code>: Las propiedades de la colección, como TTL (Time-To-Live) y MMAP (memory mapping). Por defecto es Ninguno. Puede incluir:<ul>
<li>"colección.ttl.segundos" (int): Una vez establecida esta propiedad, los datos de la colección actual caducan en el tiempo especificado. Los datos caducados de la colección se limpiarán y no participarán en las búsquedas o consultas.</li>
<li>"mmap.enabled" (bool): Si se habilita el almacenamiento en mapa de memoria a nivel de colección.</li>
</ul></li>
<li><code translate="no">index_management (IndexManagement)</code>: Especifica la estrategia de gestión de índices a utilizar. Por defecto es "create_if_not_exists".</li>
<li><code translate="no">batch_size (int)</code>: Configura el número de documentos procesados en un lote al insertar datos en Milvus. Por defecto es DEFAULT_BATCH_SIZE.</li>
<li><code translate="no">consistency_level (str, optional)</code>: Qué nivel de consistencia utilizar para una colección recién creada. Por defecto es "Sesión".</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create an index over the documents</span>
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore


vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Para los parámetros de <code translate="no">MilvusVectorStore</code>:</p>
<ul>
<li>Establecer el <code translate="no">uri</code> como un archivo local, por ejemplo<code translate="no">./milvus.db</code>, es el método más conveniente, ya que utiliza automáticamente <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a> para almacenar todos los datos en este archivo.</li>
<li>Si tiene una gran escala de datos, puede configurar un servidor Milvus más eficiente en <a href="https://milvus.io/docs/quickstart.md">docker o kubernetes</a>. En esta configuración, por favor utilice la uri del servidor, por ejemplo<code translate="no">http://localhost:19530</code>, como su <code translate="no">uri</code>.</li>
<li>Si desea utilizar <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, el servicio en la nube totalmente gestionado para Milvus, ajuste <code translate="no">uri</code> y <code translate="no">token</code>, que corresponden al <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">punto final público y a la clave Api</a> en Zilliz Cloud.</li>
</ul>
</div>
<h3 id="Query-the-data" class="common-anchor-header">Consultar los datos</h3><p>Ahora que tenemos nuestro documento almacenado en el índice, podemos hacer preguntas contra el índice. El índice utilizará los datos almacenados en sí mismo como base de conocimiento para chatgpt.</p>
<pre><code translate="no" class="language-python">query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;What did the author learn?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned that philosophy courses in college were boring to him, leading him to switch his focus to studying AI.
</code></pre>
<pre><code translate="no" class="language-python">res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges for the author as it affected his mother's health, leading to a stroke caused by colon cancer. This resulted in her losing her balance and needing to be placed in a nursing home. The author and his sister were determined to help their mother get out of the nursing home and back to her house.
</code></pre>
<p>La siguiente prueba muestra que al sobrescribir se eliminan los datos anteriores.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Document


vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    [Document(text=<span class="hljs-string">&quot;The number that is being searched for is ten.&quot;</span>)],
    storage_context,
)
query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;Who is the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author is the individual who created the context information.
</code></pre>
<p>La siguiente prueba muestra la adición de datos adicionales a un índice ya existente.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">del</span> index, vector_store, storage_context, query_engine

vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, overwrite=<span class="hljs-literal">False</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
query_engine = index.as_query_engine()
res = query_engine.query(<span class="hljs-string">&quot;What is the number?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The number is ten.
</code></pre>
<pre><code translate="no" class="language-python">res = query_engine.query(<span class="hljs-string">&quot;Who is the author?&quot;</span>)
<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Paul Graham
</code></pre>
<h2 id="Metadata-filtering" class="common-anchor-header">Filtrado de metadatos<button data-href="#Metadata-filtering" class="anchor-icon" translate="no">
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
    </button></h2><p>Podemos generar resultados filtrando fuentes específicas. El siguiente ejemplo ilustra la carga de todos los documentos del directorio y su posterior filtrado en función de los metadatos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> ExactMatchFilter, MetadataFilters

<span class="hljs-comment"># Load all the two documents loaded before</span>
documents_all = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/&quot;</span>).load_data()

vector_store = MilvusVectorStore(uri=<span class="hljs-string">&quot;./milvus_demo.db&quot;</span>, dim=<span class="hljs-number">1536</span>, overwrite=<span class="hljs-literal">True</span>)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents_all, storage_context)
<button class="copy-code-btn"></button></code></pre>
<p>Queremos recuperar únicamente documentos del archivo <code translate="no">uber_2021.pdf</code>.</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;uber_2021.pdf&quot;</span>)]
)
query_engine = index.as_query_engine(filters=filters)
res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges related to the adverse impact on the business and operations, including reduced demand for Mobility offerings globally, affecting travel behavior and demand. Additionally, the pandemic led to driver supply constraints, impacted by concerns regarding COVID-19, with uncertainties about when supply levels would return to normal. The rise of the Omicron variant further affected travel, resulting in advisories and restrictions that could adversely impact both driver supply and consumer demand for Mobility offerings.
</code></pre>
<p>Esta vez obtenemos un resultado diferente cuando recuperamos del archivo <code translate="no">paul_graham_essay.txt</code>.</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[ExactMatchFilter(key=<span class="hljs-string">&quot;file_name&quot;</span>, value=<span class="hljs-string">&quot;paul_graham_essay.txt&quot;</span>)]
)
query_engine = index.as_query_engine(filters=filters)
res = query_engine.query(<span class="hljs-string">&quot;What challenges did the disease pose for the author?&quot;</span>)

<span class="hljs-built_in">print</span>(res)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The disease posed challenges for the author as it affected his mother's health, leading to a stroke caused by colon cancer. This resulted in his mother losing her balance and needing to be placed in a nursing home. The author and his sister were determined to help their mother get out of the nursing home and back to her house.
</code></pre>
