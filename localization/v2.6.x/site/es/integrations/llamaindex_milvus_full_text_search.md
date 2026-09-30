---
id: llamaindex_milvus_full_text_search.md
title: Uso de la búsqueda de texto completo con LlamaIndex y Milvus
related_key: LlamaIndex
summary: >-
  En este tutorial, aprenderás a utilizar LlamaIndex y Milvus para crear un
  sistema RAG mediante la búsqueda de texto completo y la búsqueda híbrida.
  Empezaremos implementando únicamente la búsqueda de texto completo y, a
  continuación, la mejoraremos integrando la búsqueda semántica para obtener
  resultados más completos.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/llamaindex/llamaindex_milvus_full_text_search.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="common-anchor-header">Uso de la búsqueda de texto completo con LlamaIndex y Milvus<button data-href="#Using-Full-Text-Search-with-LlamaIndex-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p><strong>La búsqueda de texto completo</strong> utiliza la coincidencia exacta de palabras clave, a menudo aprovechando algoritmos como el BM25 para clasificar los documentos por relevancia. En los sistemas <strong>de generación aumentada por recuperación (RAG)</strong>, este método recupera texto pertinente para mejorar las respuestas generadas por la IA.</p>
<p>Por su parte, <strong>la búsqueda semántica</strong> interpreta el significado contextual para ofrecer resultados más amplios. La combinación de ambos enfoques da lugar a una <strong>búsqueda híbrida</strong> que mejora la recuperación de información, especialmente en aquellos casos en los que un único método resulta insuficiente.</p>
<p>Con el enfoque Sparse-BM25 <a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">de Milvus 2.5</a>, el texto sin procesar se convierte automáticamente en vectores dispersos. Esto elimina la necesidad de generar manualmente incrustaciones dispersas y permite una estrategia de búsqueda híbrida que equilibra la comprensión semántica con la relevancia de las palabras clave.</p>
<p>En este tutorial, aprenderás a utilizar LlamaIndex y Milvus para crear un sistema RAG mediante la búsqueda de texto completo y la búsqueda híbrida. Comenzaremos implementando únicamente la búsqueda de texto completo y, a continuación, la mejoraremos integrando la búsqueda semántica para obtener resultados más exhaustivos.</p>
<blockquote>
<p>Antes de continuar con este tutorial, asegúrate de estar familiarizado con <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">la búsqueda de texto completo</a> y <a href="https://milvus.io/docs/integrate_with_llamaindex.md">con</a> los <a href="https://milvus.io/docs/integrate_with_llamaindex.md">conceptos básicos del uso de Milvus en LlamaIndex</a>.</p>
</blockquote>
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
    </button></h2><p><strong>Instalar las dependencias</strong></p>
<p>Antes de empezar, asegúrate de tener instaladas las siguientes dependencias:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-vector-stores-milvus</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-embeddings-openai</span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$pip</span> install llama-index-llms-openai</span>
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<blockquote>
<p>Si utilizas Google Colab, es posible que tengas que <strong>reiniciar el entorno de ejecución</strong> (ve al menú «Runtime» en la parte superior de la interfaz y selecciona «Restart session» en el menú desplegable).</p>
</blockquote>
</div>
<p><strong>Configurar cuentas</strong></p>
<p>Este tutorial utiliza OpenAI para las representaciones de texto y la generación de respuestas. Debes preparar la <a href="https://platform.openai.com/api-keys">clave de la API de OpenAI</a>.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> openai

openai.api_key = <span class="hljs-string">&quot;sk-&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p>Para utilizar el almacén de vectores de Milvus, especifica la dirección de tu servidor de Milvus <code translate="no">URI</code> (y, opcionalmente, el <code translate="no">TOKEN</code>). Para poner en marcha un servidor de Milvus, puedes configurarlo siguiendo la <a href="https://milvus.io/docs/install-overview.md">guía de instalación de Milvus</a> o simplemente probando <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud</a> de forma gratuita.</p>
<blockquote>
<p>Actualmente, la búsqueda de texto completo es compatible con Milvus Standalone, Milvus Distributed y Zilliz Cloud, pero aún no con Milvus Lite (se prevé su implementación en el futuro). Ponte en contacto con support@zilliz.com para obtener más información.</p>
</blockquote>
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;http://localhost:19530&quot;</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Descargar datos de ejemplo</strong></p>
<p>Ejecuta los siguientes comandos para descargar documentos de ejemplo en el directorio «data/paul_graham»:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-built_in">mkdir</span> -p <span class="hljs-string">&#x27;data/paul_graham/&#x27;</span></span>
<span class="hljs-meta prompt_">$ </span><span class="language-bash"><span class="hljs-variable">$wget</span> <span class="hljs-string">&#x27;https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt&#x27;</span> -O <span class="hljs-string">&#x27;data/paul_graham/paul_graham_essay.txt&#x27;</span></span>
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">--2025-03-27 07:49:01--  https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt
Resolving raw.githubusercontent.com (raw.githubusercontent.com)... 185.199.108.133, 185.199.109.133, 185.199.110.133, ...
Connecting to raw.githubusercontent.com (raw.githubusercontent.com)|185.199.108.133|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 75042 (73K) [text/plain]
Saving to: ‘data/paul_graham/paul_graham_essay.txt’

data/paul_graham/pa 100%[===================&gt;]  73.28K  --.-KB/s    in 0.07s   

2025-03-27 07:49:01 (1.01 MB/s) - ‘data/paul_graham/paul_graham_essay.txt’ saved [75042/75042]
</code></pre>
<h2 id="RAG-with-Full-Text-Search" class="common-anchor-header">RAG con búsqueda de texto completo<button data-href="#RAG-with-Full-Text-Search" class="anchor-icon" translate="no">
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
    </button></h2><p>La integración de la búsqueda de texto completo en un sistema RAG equilibra la búsqueda semántica con una recuperación precisa y predecible basada en palabras clave. También puede optar por utilizar únicamente la búsqueda de texto completo, aunque se recomienda combinarla con la búsqueda semántica para obtener mejores resultados. A efectos de demostración, mostraremos aquí la búsqueda de texto completo por sí sola y la búsqueda híbrida.</p>
<p>Para empezar, utiliza <code translate="no">SimpleDirectoryReaderLoad</code> para cargar el ensayo «What I Worked On», de Paul Graham:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> SimpleDirectoryReader

documents = SimpleDirectoryReader(<span class="hljs-string">&quot;./data/paul_graham/&quot;</span>).load_data()

<span class="hljs-comment"># Let&#x27;s take a look at the first document</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Example document:\n&quot;</span>, documents[<span class="hljs-number">0</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Example document:
 Doc ID: 16b7942f-bf1a-4197-85e1-f31d51ea25a9
Text: What I Worked On  February 2021  Before college the two main
things I worked on, outside of school, were writing and programming. I
didn't write essays. I wrote what beginning writers were supposed to
write then, and probably still are: short stories. My stories were
awful. They had hardly any plot, just characters with strong feelings,
which I ...
</code></pre>
<h3 id="Full-Text-Search-with-BM25" class="common-anchor-header">Búsqueda de texto completo con BM25<button data-href="#Full-Text-Search-with-BM25" class="anchor-icon" translate="no">
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
    </button></h3><p>La API de LlamaIndex <code translate="no">MilvusVectorStore</code> admite la búsqueda de texto completo, lo que permite una recuperación eficiente basada en palabras clave. Al utilizar una función integrada como <code translate="no">sparse_embedding_function</code>, aplica la puntuación BM25 para clasificar los resultados de la búsqueda.</p>
<p>En esta sección, mostraremos cómo implementar un sistema RAG utilizando BM25 para la búsqueda de texto completo.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> VectorStoreIndex, StorageContext
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.vector_stores.milvus.utils <span class="hljs-keyword">import</span> BM25BuiltInFunction
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> Settings

<span class="hljs-comment"># Skip dense embedding model</span>
Settings.embed_model = <span class="hljs-literal">None</span>

<span class="hljs-comment"># Build Milvus vector store creating a new collection</span>
vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    enable_dense=<span class="hljs-literal">False</span>,
    enable_sparse=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Only enable sparse to demo full text search</span>
    sparse_embedding_function=BM25BuiltInFunction(),
    overwrite=<span class="hljs-literal">True</span>,
)

<span class="hljs-comment"># Store documents in Milvus</span>
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Embeddings have been explicitly disabled. Using MockEmbedding.
</code></pre>
<p>El código anterior inserta documentos de ejemplo en Milvus y crea un índice para habilitar la clasificación BM25 para la búsqueda de texto completo. Desactiva la incrustación densa y utiliza <code translate="no">BM25BuiltInFunction</code> con los parámetros predeterminados.</p>
<p>Puedes especificar los campos de entrada y salida en los parámetros de « <code translate="no">BM25BuiltInFunction</code> »:</p>
<ul>
<li><code translate="no">input_field_names (str)</code>: El campo de texto de entrada (por defecto: «text»). Indica a qué campo de texto se aplica el algoritmo BM25. Modifícalo si utilizas tu propia colección con un nombre de campo de texto diferente.</li>
<li><code translate="no">output_field_names (str)</code>: El campo en el que se almacenan los resultados de esta función BM25 (por defecto: «sparse_embedding»).</li>
</ul>
<p>Una vez configurado el almacén de vectores, puedes realizar consultas de búsqueda de texto completo utilizando Milvus con el modo de consulta «sparse» o «text_search»:</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> textwrap

query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;sparse&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
answer = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(answer), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned several important lessons at Viaweb. They learned about the importance of growth
rate as the ultimate test of a startup, the value of building stores for users to understand retail
and software usability, and the significance of being the &quot;entry level&quot; option in a market.
Additionally, they discovered the accidental success of making Viaweb inexpensive, the challenges of
hiring too many people, and the relief felt when the company was acquired by Yahoo.
</code></pre>
<h4 id="Customize-text-analyzer" class="common-anchor-header">Personalizar el analizador de texto</h4><p>Los analizadores desempeñan un papel fundamental en la búsqueda de texto completo, ya que dividen las frases en tokens y realizan el procesamiento léxico, como la reducción a la raíz y la eliminación de palabras vacías. Suelen ser específicos de cada idioma. Para obtener más detalles, consulta <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">la Guía del analizador de Milvus</a>.</p>
<p>Milvus admite dos tipos de analizadores: <strong>analizadores integrados</strong> y <strong>analizadores personalizados</strong>. De forma predeterminada, el analizador « <code translate="no">BM25BuiltInFunction</code> » utiliza el analizador integrado estándar, que divide el texto en tokens basándose en la puntuación.</p>
<p>Para utilizar un analizador diferente o personalizar el existente, puede pasar un valor al argumento « <code translate="no">analyzer_params</code> »:</p>
<pre><code translate="no" class="language-python">bm25_function = BM25BuiltInFunction(
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
<button class="copy-code-btn"></button></code></pre>
<h3 id="Hybrid-Search-with-Reranker" class="common-anchor-header">Búsqueda híbrida con Reranker<button data-href="#Hybrid-Search-with-Reranker" class="anchor-icon" translate="no">
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
    </button></h3><p>Un sistema de búsqueda híbrida combina la búsqueda semántica y la búsqueda de texto completo, optimizando el rendimiento de la recuperación en un sistema RAG.</p>
<p>El siguiente ejemplo utiliza la incrustación de OpenAI para la búsqueda semántica y BM25 para la búsqueda de texto completo:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Create index over the documnts</span>
vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    <span class="hljs-comment"># enable_dense=True,  # enable_dense defaults to True</span>
    dim=<span class="hljs-number">1536</span>,
    enable_sparse=<span class="hljs-literal">True</span>,
    sparse_embedding_function=BM25BuiltInFunction(),
    overwrite=<span class="hljs-literal">True</span>,
    <span class="hljs-comment"># hybrid_ranker=&quot;RRFRanker&quot;,  # hybrid_ranker defaults to &quot;RRFRanker&quot;</span>
    <span class="hljs-comment"># hybrid_ranker_params={},  # hybrid_ranker_params defaults to {}</span>
)

storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex.from_documents(
    documents,
    storage_context=storage_context,
    embed_model=<span class="hljs-string">&quot;default&quot;</span>,  <span class="hljs-comment"># &quot;default&quot; will use OpenAI embedding</span>
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Cómo funciona</strong></p>
<p>Este enfoque almacena los documentos en una colección de Milvus con ambos campos vectoriales:</p>
<ul>
<li><code translate="no">embedding</code>: Incrustaciones densas generadas por el modelo de incrustación de OpenAI para la búsqueda semántica.</li>
<li><code translate="no">sparse_embedding</code>: Incrustaciones dispersas calculadas mediante BM25BuiltInFunction para la búsqueda de texto completo.</li>
</ul>
<p>Además, hemos aplicado una estrategia de reordenación utilizando «RRFRanker» con sus parámetros predeterminados. Para personalizar el reordenador, puedes configurar <code translate="no">hybrid_ranker</code> y <code translate="no">hybrid_ranker_params</code> siguiendo la <a href="https://milvus.io/docs/weighted-ranker.md">Guía de reordenación de Milvus</a>.</p>
<p>Ahora, probemos el sistema RAG con una consulta de ejemplo:</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># Query</span>
query_engine = index.as_query_engine(
    vector_store_query_mode=<span class="hljs-string">&quot;hybrid&quot;</span>, similarity_top_k=<span class="hljs-number">5</span>
)
answer = query_engine.query(<span class="hljs-string">&quot;What did the author learn at Viaweb?&quot;</span>)
<span class="hljs-built_in">print</span>(textwrap.fill(<span class="hljs-built_in">str</span>(answer), <span class="hljs-number">100</span>))
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The author learned several important lessons at Viaweb. These included the importance of
understanding growth rate as the ultimate test of a startup, the impact of hiring too many people,
the challenges of being at the mercy of investors, and the relief experienced when Yahoo bought the
company. Additionally, the author learned about the significance of user feedback, the value of
building stores for users, and the realization that growth rate is crucial for the long-term success
of a startup.
</code></pre>
<p>Este enfoque híbrido garantiza respuestas más precisas y sensibles al contexto en un sistema RAG, al aprovechar tanto la recuperación semántica como la basada en palabras clave.</p>
