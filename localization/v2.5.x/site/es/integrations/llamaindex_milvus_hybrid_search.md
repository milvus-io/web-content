---
id: llamaindex_milvus_hybrid_search.md
title: RAG utiliza la búsqueda híbrida con Milvus y LlamaIndex
related_key: LlamaIndex
summary: >-
  Este cuaderno demuestra cómo utilizar Milvus para la búsqueda híbrida en
  [LlamaIndex](https://www.llamaindex.ai/) RAG pipelines. Comenzaremos con la
  búsqueda híbrida recomendada por defecto (semántica + BM25) y luego
  exploraremos otros métodos alternativos de incrustación dispersa y la
  personalización del reranker híbrido.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_hybrid_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_hybrid_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="RAG-using-Hybrid-Search-with-Milvus-and-LlamaIndex" class="common-anchor-header">RAG utiliza la búsqueda híbrida con Milvus y LlamaIndex<button data-href="#RAG-using-Hybrid-Search-with-Milvus-and-LlamaIndex" class="anchor-icon" translate="no">
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
    </button></h1><p>La búsqueda híbrida aprovecha los puntos fuertes tanto de la recuperación semántica como de la concordancia de palabras clave para ofrecer resultados más precisos y contextualmente relevantes. Al combinar las ventajas de la búsqueda semántica y la concordancia de palabras clave, la búsqueda híbrida es especialmente eficaz en tareas complejas de recuperación de información.</p>
<p>Este cuaderno muestra cómo utilizar Milvus para la búsqueda híbrida en las cadenas RAG <a href="https://www.llamaindex.ai/">de LlamaIndex</a>. Comenzaremos con la búsqueda híbrida predeterminada recomendada (semántica + BM25) y luego exploraremos otros métodos alternativos de incrustación dispersa y la personalización del reranker híbrido.</p>
<h2 id="Prerequisites" class="common-anchor-header">Requisitos previos<button data-href="#Prerequisites" class="anchor-icon" translate="no">
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
    </button></h2><p><strong>Instalar dependencias</strong></p>
<p>Antes de empezar, asegúrate de tener instaladas las siguientes dependencias:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si utilizas Google Colab, es posible que tengas que <strong>reiniciar el tiempo de ejecución</strong> (accede al menú "Tiempo de ejecución" situado en la parte superior de la interfaz y selecciona "Reiniciar sesión" en el menú desplegable).</p>
</div>
<p><strong>Configurar cuentas</strong></p>
<p>Este tutorial utiliza OpenAI para la incrustación de texto y la generación de respuestas. Es necesario preparar la <a href="https://platform.openai.com/api-keys">clave API de OpenAI</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para utilizar el almacén vectorial Milvus, especifique su servidor Milvus <code translate="no">URI</code> (y opcionalmente con el <code translate="no">TOKEN</code>). Para iniciar un servidor Milvus, puede configurar un servidor Milvus siguiendo la <a href="https://milvus.io/docs/install-overview.md">guía de instalación de Milvus</a> o simplemente probando <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud</a> de forma gratuita.</p>
<blockquote>
<p>La búsqueda de texto completo está actualmente soportada en Milvus Standalone, Milvus Distributed y Zilliz Cloud, pero todavía no en Milvus Lite (prevista para una futura implementación). Póngase en contacto con support@zilliz.com para obtener más información.</p>
</blockquote>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Cargar datos de ejemplo</strong></p>
<p>Ejecute los siguientes comandos para descargar documentos de ejemplo en el directorio "data/paul_graham":</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/paul_graham/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash">wget <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham/paul_graham_essay.txt&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, utilice <code translate="no">SimpleDirectoryReaderLoad</code> para cargar el ensayo "What I Worked On" de Paul Graham:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

documents = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/paul_graham/&quot;</span>).load_data()

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Example document:\n&quot;</span>, documents[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Example document:
 Doc ID: f9cece8c-9022-46d8-9d0e-f29d70e1dbbe
Text: What I Worked On  February 2021  Before college the two main
things I worked on, outside of school, were writing and programming. I
didn't write essays. I wrote what beginning writers were supposed to
write then, and probably still are: short stories. My stories were
awful. They had hardly any plot, just characters with strong feelings,
which I ...
</code></pre>
<h2 id="Hybrid-Search-with-BM25" class="common-anchor-header">Búsqueda híbrida con BM25<button data-href="#Hybrid-Search-with-BM25" class="anchor-icon" translate="no">
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
    </button></h2><p>Esta sección muestra cómo realizar una búsqueda híbrida utilizando BM25. Para empezar, inicializaremos <code translate="no">MilvusVectorStore</code> y crearemos un índice para los documentos de ejemplo. La configuración por defecto utiliza</p>
<ul>
<li>Incrustaciones densas del modelo de incrustación por defecto (OpenAI's <code translate="no">text-embedding-ada-002</code>)</li>
<li>BM25 para la búsqueda de texto completo si enable_sparse es True</li>
<li>RRFRanker con k=60 para combinar resultados si la búsqueda híbrida está activada.</li>
</ul>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create an index over the documnts</span>
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> StorageContext, VectorStoreIndex


vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,  <span class="hljs-comment"># vector dimension depends on the embedding model</span>
    enable_sparse=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># enable the default full-text search using BM25</span>
    overwrite=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># drop the collection if it already exists</span>
)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-17 03:38:16,645 [DEBUG][_create_connection]: Created new connection using: cf0f4df74b18418bb89ec512063c1244 (async_milvus_client.py:547)
Sparse embedding function is not provided, using default.
Default sparse embedding function: BM25BuiltInFunction(input_field_names='text', output_field_names='sparse_embedding').
</code></pre>
<p>Aquí hay más información sobre los argumentos para configurar campos densos y dispersos en <code translate="no">MilvusVectorStore</code>:</p>
<p><strong>campo denso</strong></p>
<ul>
<li><code translate="no">enable_dense (bool)</code>: Un indicador booleano para activar o desactivar la incrustación densa. Por defecto es True.</li>
<li><code translate="no">dim (int, optional)</code>: La dimensión de los vectores de incrustación para la colección.</li>
<li><code translate="no">embedding_field (str, optional)</code>: El nombre del campo de incrustación densa para la colección, por defecto DEFAULT_EMBEDDING_KEY.</li>
<li><code translate="no">index_config (dict, optional)</code>: La configuración utilizada para construir el índice de incrustación densa. Por defecto es None.</li>
<li><code translate="no">search_config (dict, optional)</code>: La configuración utilizada para buscar en el índice denso de Milvus. Tenga en cuenta que debe ser compatible con el tipo de índice especificado por <code translate="no">index_config</code>. Por defecto None.</li>
<li><code translate="no">similarity_metric (str, optional)</code>: La métrica de similitud a utilizar para la incrustación densa, actualmente soporta IP, COSINE y L2.</li>
</ul>
<p><strong>campo disperso</strong></p>
<ul>
<li><code translate="no">enable_sparse (bool)</code>: Un indicador booleano para activar o desactivar la incrustación dispersa. Por defecto es False.</li>
<li><code translate="no">sparse_embedding_field (str)</code>: El nombre del campo de incrustación dispersa, por defecto DEFAULT_SPARSE_EMBEDDING_KEY.</li>
<li><code translate="no">sparse_embedding_function (Union[BaseSparseEmbeddingFunction, BaseMilvusBuiltInFunction], optional)</code>: Si enable_sparse es True, este objeto debe proporcionarse para convertir el texto a una incrustación dispersa. Si None, se utilizará la función de incrustación dispersa por defecto (BM25BuiltInFunction), o se utilizará BGEM3SparseEmbedding dada la colección existente sin funciones incorporadas.</li>
<li><code translate="no">sparse_index_config (dict, optional)</code>: La configuración utilizada para construir el índice de incrustación dispersa. Por defecto es Ninguno.</li>
</ul>
<p>Para activar la búsqueda híbrida durante la fase de consulta, establezca <code translate="no">vector_store_query_mode</code> en "hybrid". Esto combinará y clasificará los resultados de la búsqueda semántica y de la búsqueda de texto completo. Hagamos una prueba con una consulta de ejemplo: "¿Qué aprendió el autor en Viaweb?":</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> textwrap

query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned about retail, the importance of user feedback, and the significance of growth
rate as the ultimate test of a startup at Viaweb.
</code></pre>
<h3 id="Customize-text-analyzer" class="common-anchor-header">Personalizar el analizador de texto</h3><p>Los analizadores desempeñan un papel fundamental en la búsqueda de texto completo, ya que descomponen las frases en tokens y llevan a cabo el procesamiento léxico, como la eliminación de palabras vacías y de palabras clave. Suelen ser específicos de cada idioma. Para más detalles, consulte la <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">Guía de analizadores</a> de Milvus.</p>
<p>Milvus admite dos tipos de analizadores: <strong>Analizadores incorporados</strong> y <strong>Analizadores personalizados</strong>. Por defecto, si <code translate="no">enable_sparse</code> está configurado como True, <code translate="no">MilvusVectorStore</code> utiliza <code translate="no">BM25BuiltInFunction</code> con las configuraciones por defecto, empleando el analizador incorporado estándar que tokeniza el texto basándose en la puntuación.</p>
<p>Para utilizar un analizador diferente o personalizar el existente, puede proporcionar valores al argumento <code translate="no">analyzer_params</code> cuando construya <code translate="no">BM25BuiltInFunction</code>. A continuación, establezca esta función como <code translate="no">sparse_embedding_function</code> en <code translate="no">MilvusVectorStore</code>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BM25BuiltInFunction

bm25_function = BM25BuiltInFunction(
    analyzer_params={
        <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
        <span class="hljs-string">&quot;filter&quot;</span>: [
            <span class="hljs-string">&quot;lowercase&quot;</span>,  <span class="hljs-comment"># Built-in filter</span>
            {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>},  <span class="hljs-comment"># Custom cap size of a single token</span>
            {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]},  <span class="hljs-comment"># Custom stopwords</span>
        ],
    },
    enable_match=<span class="hljs-literal">True</span>,
)

vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=bm25_function,  <span class="hljs-comment"># BM25 with custom analyzer</span>
    overwrite=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-17 03:38:48,085 [DEBUG][_create_connection]: Created new connection using: 61afd81600cb46ee89f887f16bcbfe55 (async_milvus_client.py:547)
</code></pre>
<h2 id="Hybrid-Search-with-Other-Sparse-Embedding" class="common-anchor-header">Búsqueda híbrida con otras incrustaciones dispersas<button data-href="#Hybrid-Search-with-Other-Sparse-Embedding" class="anchor-icon" translate="no">
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
    </button></h2><p>Además de combinar la búsqueda semántica con BM25, Milvus también admite la búsqueda híbrida utilizando una función de incrustación dispersa como <a href="https://arxiv.org/abs/2402.03216">BGE-M3</a>. El siguiente ejemplo utiliza la función <code translate="no">BGEM3SparseEmbeddingFunction</code> para generar incrustaciones dispersas.</p>
<p>En primer lugar, necesitamos instalar el paquete <code translate="no">FlagEmbedding</code>:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install -q FlagEmbedding</span>
<button class="copy-code-btn"></button></code></pre>
<p>A continuación, vamos a construir el almacén de vectores y el índice utilizando el modelo por defecto OpenAI para densen incrustación y la incorporada BGE-M3 para incrustación dispersa:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BGEM3SparseEmbeddingFunction

vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=BGEM3SparseEmbeddingFunction(),
    overwrite=<span class="hljs-literal">True</span>,
)

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Fetching 30 files: 100%|██████████| 30/30 [00:00&lt;00:00, 68871.99it/s]
2025-04-17 03:39:02,074 [DEBUG][_create_connection]: Created new connection using: ff4886e2f8da44e08304b748d9ac9b51 (async_milvus_client.py:547)
Chunks: 100%|██████████| 1/1 [00:00&lt;00:00,  1.07it/s]
</code></pre>
<p>Ahora vamos a realizar una consulta de búsqueda híbrida con una pregunta de ejemplo:</p>
<pre><code translate="no" class="language-python">query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb??&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Chunks: 100%|██████████| 1/1 [00:00&lt;00:00, 17.29it/s]


The author learned about retail, the importance of user feedback, the value of growth rate in a
startup, the significance of pricing strategy, the benefits of working on things that weren't
prestigious, and the challenges and rewards of running a startup.
</code></pre>
<h3 id="Customize-Sparse-Embedding-Function" class="common-anchor-header">Personalizar la función de incrustación dispersa</h3><p>También puedes personalizar la función de incrustación dispersa siempre que herede de <code translate="no">BaseSparseEmbeddingFunction</code>, incluyendo los siguientes métodos:</p>
<ul>
<li><code translate="no">encode_queries</code>: Este método convierte los textos en una lista de incrustaciones dispersas para las consultas.</li>
<li><code translate="no">encode_documents</code>: Este método convierte textos en listas de incrustaciones dispersas para documentos.</li>
</ul>
<p>La salida de cada método debe seguir el formato de la incrustación dispersa, que es una lista de diccionarios. Cada diccionario debe tener una clave (un entero) que represente la dimensión, y un valor correspondiente (un flotante) que represente la magnitud de la incrustación en esa dimensión (por ejemplo, {1: 0,5, 2: 0,3}).</p>
<p>Por ejemplo, aquí se muestra la implementación de una función de incrustación dispersa personalizada utilizando BGE-M3:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> FlagEmbedding <span class="hljs-keyword">import</span> BGEM3FlagModel
<span class="hljs-keyword">from</span> typing <span class="hljs-keyword">import</span> <span class="hljs-type">List</span>
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BaseSparseEmbeddingFunction


<span class="hljs-keyword">class</span> <span class="hljs-title class_">ExampleEmbeddingFunction</span>(<span class="hljs-title class_ inherited__">BaseSparseEmbeddingFunction</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.model = BGEM3FlagModel(<span class="hljs-string">&quot;BAAI/bge-m3&quot;</span>, use_fp16=<span class="hljs-literal">False</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_queries</span>(<span class="hljs-params">self, queries: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>):
        outputs = <span class="hljs-variable language_">self</span>.model.encode(
            queries,
            return_dense=<span class="hljs-literal">False</span>,
            return_sparse=<span class="hljs-literal">True</span>,
            return_colbert_vecs=<span class="hljs-literal">False</span>,
        )[<span class="hljs-string">&quot;lexical_weights&quot;</span>]
        <span class="hljs-keyword">return</span> [<span class="hljs-variable language_">self</span>._to_standard_dict(output) <span class="hljs-keyword">for</span> output <span class="hljs-keyword">in</span> outputs]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">encode_documents</span>(<span class="hljs-params">self, documents: <span class="hljs-type">List</span>[<span class="hljs-built_in">str</span>]</span>):
        outputs = <span class="hljs-variable language_">self</span>.model.encode(
            documents,
            return_dense=<span class="hljs-literal">False</span>,
            return_sparse=<span class="hljs-literal">True</span>,
            return_colbert_vecs=<span class="hljs-literal">False</span>,
        )[<span class="hljs-string">&quot;lexical_weights&quot;</span>]
        <span class="hljs-keyword">return</span> [<span class="hljs-variable language_">self</span>._to_standard_dict(output) <span class="hljs-keyword">for</span> output <span class="hljs-keyword">in</span> outputs]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">_to_standard_dict</span>(<span class="hljs-params">self, raw_output</span>):
        result = {}
        <span class="hljs-keyword">for</span> k <span class="hljs-keyword">in</span> raw_output:
            result[<span class="hljs-built_in">int</span>(k)] = raw_output[k]
        <span class="hljs-keyword">return</span> result
<button class="copy-code-btn"></button></code></pre>
<h2 id="Customize-hybrid-reranker" class="common-anchor-header">Personalizar el reranker híbrido<button data-href="#Customize-hybrid-reranker" class="anchor-icon" translate="no">
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
    </button></h2><p>Milvus admite dos tipos de <a href="https://milvus.io/docs/reranking.md">estrategias de reordenación</a>: Reciprocal Rank Fusion (RRF) y Weighted Scoring. El ranker por defecto en <code translate="no">MilvusVectorStore</code> hybrid search es RRF con k=60. Para personalizar el ranker híbrido, modifique los siguientes parámetros:</p>
<ul>
<li><code translate="no">hybrid_ranker (str)</code>: Especifica el tipo de clasificador utilizado en las consultas de búsqueda híbrida. Actualmente sólo admite ["RRFRanker", "WeightedRanker"]. Por defecto es "RRFRanker".</li>
<li><code translate="no">hybrid_ranker_params (dict, optional)</code>: Parámetros de configuración del clasificador híbrido. La estructura de este diccionario depende del clasificador específico que se utilice:<ul>
<li>Para "RRFRanker", debe incluir:<ul>
<li>"k" (int): Parámetro utilizado en la fusión de rangos recíprocos (RRF). Este valor se utiliza para calcular las puntuaciones de clasificación como parte del algoritmo RRF, que combina múltiples estrategias de clasificación en una única puntuación para mejorar la relevancia de la búsqueda. El valor por defecto es 60 si no se especifica.</li>
</ul></li>
<li>Para "WeightedRanker", se espera<ul>
<li>"pesos" (lista de float): Una lista de exactamente dos pesos:<ol>
<li>El peso para el componente de incrustación densa.</li>
<li>Estas ponderaciones se utilizan para equilibrar la importancia de los componentes densos y dispersos de las incrustaciones en el proceso de recuperación híbrido. Los pesos por defecto son [1.0, 1.0] si no se especifican.</li>
</ol></li>
</ul></li>
</ul></li>
</ul>
<pre><code translate="no" class="language-python">vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    dim=<span class="hljs-number">1536</span>,
    overwrite=<span class="hljs-literal">False</span>,  <span class="hljs-comment"># Use the existing collection created in the previous example</span>
    enable_sparse=<span class="hljs-literal">True</span>,
    hybrid_ranker=<span class="hljs-string">&quot;WeightedRanker&quot;</span>,
    hybrid_ranker_params={<span class="hljs-string">&quot;weights&quot;</span>: [<span class="hljs-number">1.0</span>, <span class="hljs-number">0.5</span>]},
)
index = VectorStoreIndex.from_vector_store(vector_store)
query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
response = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(response), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-17 03:44:00,419 [DEBUG][_create_connection]: Created new connection using: 09c051fb18c04f97a80f07958856587b (async_milvus_client.py:547)
Sparse embedding function is not provided, using default.
No built-in function detected, using BGEM3SparseEmbeddingFunction().
Fetching 30 files: 100%|██████████| 30/30 [00:00&lt;00:00, 136622.28it/s]
Chunks: 100%|██████████| 1/1 [00:00&lt;00:00,  1.07it/s]


The author learned several valuable lessons at Viaweb, including the importance of understanding
growth rate as the ultimate test of a startup, the significance of user feedback in shaping the
software, and the realization that web applications were the future of software development.
Additionally, the experience at Viaweb taught the author about the challenges and rewards of running
a startup, the value of simplicity in software design, and the impact of pricing strategies on
attracting customers.
</code></pre>
