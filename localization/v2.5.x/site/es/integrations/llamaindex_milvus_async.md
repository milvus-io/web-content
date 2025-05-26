---
id: llamaindex_milvus_async.md
title: Construir RAG con LlamaIndex y Milvus Async API
related_key: LlamaIndex
summary: >-
  Este tutorial muestra cómo utilizar LlamaIndex con Milvus para construir un
  proceso asíncrono de documentos para RAG. LlamaIndex proporciona una forma de
  procesar documentos y almacenarlos en una base de datos vectorial como Milvus.
  Aprovechando la API asíncrona de LlamaIndex y la biblioteca cliente Milvus
  Python, podemos aumentar el rendimiento de la tubería para procesar e indexar
  de manera eficiente grandes volúmenes de datos.
---
<h1 id="RAG-with-Milvus-and-LlamaIndex-Async-API" class="common-anchor-header">RAG con Milvus y LlamaIndex Async API<button data-href="#RAG-with-Milvus-and-LlamaIndex-Async-API" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_async.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_async.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<p>Este tutorial muestra cómo utilizar <a href="https://www.llamaindex.ai/">LlamaIndex</a> con <a href="https://milvus.io/">Milvus</a> para construir un proceso asíncrono de documentos para RAG. LlamaIndex proporciona una forma de procesar documentos y almacenarlos en una base de datos vectorial como Milvus. Aprovechando la API asíncrona de LlamaIndex y la biblioteca cliente Python de Milvus, podemos aumentar el rendimiento de la tubería para procesar e indexar eficientemente grandes volúmenes de datos.</p>
<p>En este tutorial, primero introduciremos el uso de métodos asíncronos para construir una RAG con LlamaIndex y Milvus desde un alto nivel, y luego introduciremos el uso de métodos de bajo nivel y la comparación de rendimiento entre síncronos y asíncronos.</p>
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
    </button></h2><p>Los fragmentos de código de esta página requieren las dependencias de pymilvus y llamaindex. Puedes instalarlas utilizando los siguientes comandos:</p>
<pre><code translate="no" class="language-bash">$ pip install -U pymilvus llama-index-vector-stores-milvus llama-index nest-asyncio
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si estás utilizando Google Colab, para habilitar las dependencias recién instaladas, es posible que tengas que <strong>reiniciar el tiempo de ejecución</strong> (haz clic en el menú "Tiempo de ejecución" en la parte superior de la pantalla, y selecciona "Reiniciar sesión" en el menú desplegable).</p>
</div>
<p>Utilizaremos los modelos de OpenAI. Debes preparar la <a href="https://platform.openai.com/docs/quickstart">clave api</a> <code translate="no">OPENAI_API_KEY</code> como variable de entorno.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Si estás usando Jupyter Notebook, necesitas ejecutar esta línea de código antes de ejecutar el código asíncrono.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> nest_asyncio

nest_asyncio.apply()
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-data" class="common-anchor-header">Preparar los datos</h3><p>Puedes descargar datos de ejemplo con los siguientes comandos:</p>
<pre><code translate="no" class="language-bash">$ <span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/&#x27;</span>
$ wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham_essay.txt&#x27;</span>
$ wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/10k/uber_2021.pdf&#x27;</span> -O <span class="hljs-string">&#x27;data/uber_2021.pdf&#x27;</span>
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-RAG-with-Asynchronous-Processing" class="common-anchor-header">Construir RAG con procesamiento asíncrono<button data-href="#Build-RAG-with-Asynchronous-Processing" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta sección muestra cómo construir un sistema RAG que pueda procesar documentos de forma asíncrona.</p>
<p>Importe las bibliotecas necesarias y defina Milvus URI y la dimensión de la incrustación.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> asyncio
<span class="hljs-keyword">import</span> random
<span class="hljs-keyword">import</span> time

<span class="hljs-keyword">from</span> llama_index.core.schema <span class="hljs-keyword">import</span> TextNode, NodeRelationship, RelatedNodeInfo
<span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> VectorStoreQuery
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore

URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
DIM = <span class="hljs-number">768</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<ul>
<li>Si tiene una gran escala de datos, puede configurar un servidor Milvus de alto rendimiento en <a href="https://milvus.io/docs/quickstart.md">docker o kubernetes</a>. En esta configuración, utilice la uri del servidor, por ejemplo<code translate="no">http://localhost:19530</code>, como su <code translate="no">uri</code>.</li>
<li>Si desea utilizar <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, el servicio en la nube totalmente gestionado para Milvus, ajuste los <code translate="no">uri</code> y <code translate="no">token</code>, que corresponden al <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">punto final público y a la clave Api</a> en Zilliz Cloud.</li>
<li>En el caso de sistemas complejos (como la comunicación en red), el procesamiento asíncrono puede aportar una mejora del rendimiento en comparación con la sincronización. Así que pensamos que Milvus-Lite no es adecuado para utilizar interfaces asíncronas porque los escenarios utilizados no son adecuados.</li>
</ul>
</div>
<p>Definir una función de inicialización que podamos utilizar de nuevo para reconstruir la colección Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">init_vector_store</span>():
    <span class="hljs-keyword">return</span> MilvusVectorStore(
        uri=URI,
        <span class="hljs-comment"># token=TOKEN,</span>
        dim=DIM,
        collection_name=<span class="hljs-string">&quot;test_collection&quot;</span>,
        embedding_field=<span class="hljs-string">&quot;embedding&quot;</span>,
        id_field=<span class="hljs-string">&quot;id&quot;</span>,
        similarity_metric=<span class="hljs-string">&quot;COSINE&quot;</span>,
        consistency_level=<span class="hljs-string">&quot;Strong&quot;</span>,  <span class="hljs-comment"># Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`). See https://milvus.io/docs/consistency.md#Consistency-Level for more details.</span>
        overwrite=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># To overwrite the collection if it already exists</span>
    )


vector_store = init_vector_store()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-01-24 20:04:39,414 [DEBUG][_create_connection]: Created new connection using: faa8be8753f74288bffc7e6d38942f8a (async_milvus_client.py:600)
</code></pre>
<p>Utilizar SimpleDirectoryReader para envolver un objeto documento LlamaIndex del archivo <code translate="no">paul_graham_essay.txt</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

<span class="hljs-comment"># load documents</span>
documents = SimpleDirectoryReader(
    input_files=[<span class="hljs-string">&quot;./data/paul_graham_essay.txt&quot;</span>]
).load_data()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Document ID:&quot;</span>, documents[<span class="hljs-number">0</span>].doc_id)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Document ID: 41a6f99c-489f-49ff-9821-14e2561140eb
</code></pre>
<p>Instanciar un modelo de incrustación Hugging Face localmente. El uso de un modelo local evita el riesgo de alcanzar los límites de tasa de la API durante la inserción asíncrona de datos, ya que las solicitudes concurrentes de la API pueden sumarse rápidamente y agotar su presupuesto en la API pública. Sin embargo, si tiene un límite de tasa alto, puede optar por utilizar un servicio de modelo remoto en su lugar.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.embeddings.huggingface <span class="hljs-keyword">import</span> HuggingFaceEmbedding


embed_model = HuggingFaceEmbedding(model_name=<span class="hljs-string">&quot;BAAI/bge-base-en-v1.5&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Cree un índice e inserte el documento.</p>
<p>Establecemos <code translate="no">use_async</code> en <code translate="no">True</code> para habilitar el modo de inserción asíncrono.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create an index over the documents</span>
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    documents,
    storage_context=storage_context,
    embed_model=embed_model,
    use_async=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Inicializa el LLM.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.llms.openai <span class="hljs-keyword">import</span> OpenAI

llm = OpenAI(model=<span class="hljs-string">&quot;gpt-3.5-turbo&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<p>Al crear el motor de consulta, también puedes establecer el parámetro <code translate="no">use_async</code> en <code translate="no">True</code> para habilitar la búsqueda asíncrona.</p>
<pre><code translate="no" class="language-python">query_engine = index.as_query_engine(use_async=<span class="hljs-literal">True</span>, llm=llm)
response = <span class="hljs-keyword">await</span> query_engine.aquery(<span class="hljs-string">&quot;What did the author learn?&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-built_in">print</span>(response)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned that the field of artificial intelligence, as practiced at the time, was not as promising as initially believed. The approach of using explicit data structures to represent concepts in AI was not effective in achieving true understanding of natural language. This realization led the author to shift his focus towards Lisp and eventually towards exploring the field of art.
</code></pre>
<h2 id="Explore-the-Async-API" class="common-anchor-header">Explorar la API asíncrona<button data-href="#Explore-the-Async-API" class="anchor-icon" translate="no">
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
    </button></h2><p>En esta sección, presentaremos el uso de la API de bajo nivel y compararemos el rendimiento de las ejecuciones síncronas y asíncronas.</p>
<h3 id="Async-add" class="common-anchor-header">Añadir asíncrono</h3><p>Reinicializar el almacén de vectores.</p>
<pre><code translate="no" class="language-python">vector_store = init_vector_store()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-01-24 20:07:38,727 [DEBUG][_create_connection]: Created new connection using: 5e0d130f3b644555ad7ea6b8df5f1fc2 (async_milvus_client.py:600)
</code></pre>
<p>Definamos una función productora de nodos, que se utilizará para generar un gran número de nodos de prueba para el índice.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">random_id</span>():
    random_num_str = <span class="hljs-string">&quot;&quot;</span>
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">16</span>):
        random_digit = <span class="hljs-built_in">str</span>(random.randint(<span class="hljs-number">0</span>, <span class="hljs-number">9</span>))
        random_num_str += random_digit
    <span class="hljs-keyword">return</span> random_num_str


<span class="hljs-keyword">def</span> <span class="hljs-title function_">produce_nodes</span>(<span class="hljs-params">num_adding</span>):
    node_list = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_adding):
        node = TextNode(
            id_=random_id(),
            text=<span class="hljs-string">f&quot;n<span class="hljs-subst">{i}</span>_text&quot;</span>,
            embedding=[<span class="hljs-number">0.5</span>] * (DIM - <span class="hljs-number">1</span>) + [random.random()],
            relationships={NodeRelationship.SOURCE: RelatedNodeInfo(node_id=<span class="hljs-string">f&quot;n<span class="hljs-subst">{i+<span class="hljs-number">1</span>}</span>&quot;</span>)},
        )
        node_list.append(node)
    <span class="hljs-keyword">return</span> node_list
<button class="copy-code-btn"></button></code></pre>
<p>Definir una función aync para añadir documentos al almacén vectorial. Usamos la función <code translate="no">async_add()</code> en la instancia de Milvus vector store.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">async_add</span>(<span class="hljs-params">num_adding</span>):
    node_list = produce_nodes(num_adding)
    start_time = time.time()
    tasks = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_adding):
        sub_nodes = node_list[i]
        task = vector_store.async_add([sub_nodes])  <span class="hljs-comment"># use async_add()</span>
        tasks.append(task)
    results = <span class="hljs-keyword">await</span> asyncio.gather(*tasks)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">add_counts = [<span class="hljs-number">10</span>, <span class="hljs-number">100</span>, <span class="hljs-number">1000</span>]
<button class="copy-code-btn"></button></code></pre>
<p>Obtener el bucle de eventos.</p>
<pre><code translate="no" class="language-python">loop = asyncio.get_event_loop()
<button class="copy-code-btn"></button></code></pre>
<p>Añadir asíncronamente documentos al almacén de vectores.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> add_counts:

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">measure_async_add</span>():
        async_time = <span class="hljs-keyword">await</span> async_add(count)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Async add for <span class="hljs-subst">{count}</span> took <span class="hljs-subst">{async_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
        <span class="hljs-keyword">return</span> async_time

    loop.run_until_complete(measure_async_add())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Async add for 10 took 0.19 seconds
Async add for 100 took 0.48 seconds
Async add for 1000 took 3.22 seconds
</code></pre>
<pre><code translate="no" class="language-python">vector_store = init_vector_store()
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-01-24 20:07:45,554 [DEBUG][_create_connection]: Created new connection using: b14dde8d6d24489bba26a907593f692d (async_milvus_client.py:600)
</code></pre>
<h4 id="Compare-with-synchronous-add" class="common-anchor-header">Comparar con sync add</h4><p>Defina una función sync add. A continuación, medir el tiempo de ejecución en las mismas condiciones.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sync_add</span>(<span class="hljs-params">num_adding</span>):
    node_list = produce_nodes(num_adding)
    start_time = time.time()
    <span class="hljs-keyword">for</span> node <span class="hljs-keyword">in</span> node_list:
        result = vector_store.add([node])
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> add_counts:
    sync_time = sync_add(count)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sync add for <span class="hljs-subst">{count}</span> took <span class="hljs-subst">{sync_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Sync add for 10 took 0.56 seconds
Sync add for 100 took 5.85 seconds
Sync add for 1000 took 62.91 seconds
</code></pre>
<p>El resultado muestra que el proceso de adición sincrónico es mucho más lento que el asincrónico.</p>
<h3 id="Async-search" class="common-anchor-header">Búsqueda asíncrona</h3><p>Reinicie el almacén vectorial y añada algunos documentos antes de ejecutar la búsqueda.</p>
<pre><code translate="no" class="language-python">vector_store = init_vector_store()
node_list = produce_nodes(num_adding=<span class="hljs-number">1000</span>)
inserted_ids = vector_store.add(node_list)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-01-24 20:08:57,982 [DEBUG][_create_connection]: Created new connection using: 351dc7ea4fb14d4386cfab02621ab7d1 (async_milvus_client.py:600)
</code></pre>
<p>Define una función de búsqueda asíncrona. Utilizamos la función <code translate="no">aquery()</code> en la instancia del almacén vectorial Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">async_search</span>(<span class="hljs-params">num_queries</span>):
    start_time = time.time()
    tasks = []
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_queries):
        query = VectorStoreQuery(
            query_embedding=[<span class="hljs-number">0.5</span>] * (DIM - <span class="hljs-number">1</span>) + [<span class="hljs-number">0.6</span>], similarity_top_k=<span class="hljs-number">3</span>
        )
        task = vector_store.aquery(query=query)  <span class="hljs-comment"># use aquery()</span>
        tasks.append(task)
    results = <span class="hljs-keyword">await</span> asyncio.gather(*tasks)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python">query_counts = [<span class="hljs-number">10</span>, <span class="hljs-number">100</span>, <span class="hljs-number">1000</span>]
<button class="copy-code-btn"></button></code></pre>
<p>Búsqueda asíncrona desde el almacén Milvus.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> query_counts:

    <span class="hljs-keyword">async</span> <span class="hljs-keyword">def</span> <span class="hljs-title function_">measure_async_search</span>():
        async_time = <span class="hljs-keyword">await</span> async_search(count)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Async search for <span class="hljs-subst">{count}</span> queries took <span class="hljs-subst">{async_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
        <span class="hljs-keyword">return</span> async_time

    loop.run_until_complete(measure_async_search())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Async search for 10 queries took 0.55 seconds
Async search for 100 queries took 1.39 seconds
Async search for 1000 queries took 8.81 seconds
</code></pre>
<h4 id="Compare-with-synchronous-search" class="common-anchor-header">Comparar con la búsqueda sincrónica</h4><p>Definir una función de búsqueda sincrónica. A continuación, medir el tiempo de ejecución en las mismas condiciones.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sync_search</span>(<span class="hljs-params">num_queries</span>):
    start_time = time.time()
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(num_queries):
        query = VectorStoreQuery(
            query_embedding=[<span class="hljs-number">0.5</span>] * (DIM - <span class="hljs-number">1</span>) + [<span class="hljs-number">0.6</span>], similarity_top_k=<span class="hljs-number">3</span>
        )
        result = vector_store.query(query=query)
    end_time = time.time()
    <span class="hljs-keyword">return</span> end_time - start_time
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">for</span> count <span class="hljs-keyword">in</span> query_counts:
    sync_time = sync_search(count)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Sync search for <span class="hljs-subst">{count}</span> queries took <span class="hljs-subst">{sync_time:<span class="hljs-number">.2</span>f}</span> seconds&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Sync search for 10 queries took 3.29 seconds
Sync search for 100 queries took 30.80 seconds
Sync search for 1000 queries took 308.80 seconds
</code></pre>
<p>El resultado muestra que el proceso de búsqueda sincrónico es mucho más lento que el asincrónico.</p>
