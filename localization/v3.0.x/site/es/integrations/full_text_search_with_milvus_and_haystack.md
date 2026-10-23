---
id: full_text_search_with_milvus_and_haystack.md
summary: >-
  Este tutorial muestra cómo implementar la búsqueda de texto completo y la
  búsqueda híbrida en tu aplicación utilizando Haystack y Milvus.
title: Búsqueda de texto completo con Milvus y Haystack
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/integration/haystack/full_text_search_with_milvus_and_haystack.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/integration/haystack/full_text_search_with_milvus_and_haystack.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Full-text-search-with-Milvus-and-Haystack" class="common-anchor-header">Búsqueda de texto completo con Milvus y Haystack<button data-href="#Full-text-search-with-Milvus-and-Haystack" class="anchor-icon" translate="no">
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
    </button></h1><p><a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">La búsqueda de texto completo</a> es un método tradicional para recuperar documentos mediante la coincidencia de palabras clave o frases específicas en el texto. Clasifica los resultados en función de puntuaciones de relevancia calculadas a partir de factores como la frecuencia de los términos. Mientras que la búsqueda semántica es más eficaz a la hora de comprender el significado y el contexto, la búsqueda de texto completo destaca por su precisión en la coincidencia de palabras clave, lo que la convierte en un complemento útil para la búsqueda semántica. El algoritmo BM25 se utiliza ampliamente para la clasificación en la búsqueda de texto completo y desempeña un papel clave en la Generación Aumentada por Recuperación (RAG).</p>
<p><a href="https://milvus.io/blog/introduce-milvus-2-5-full-text-search-powerful-metadata-filtering-and-more.md">Milvus 2.5</a> introduce capacidades nativas de búsqueda de texto completo mediante BM25. Este enfoque convierte el texto en vectores dispersos que representan las puntuaciones de BM25. Basta con introducir el texto sin procesar y Milvus generará y almacenará automáticamente los vectores dispersos, sin que sea necesaria la generación manual de incrustaciones dispersas.</p>
<p><a href="https://haystack.deepset.ai/">Haystack</a> ahora es compatible con esta función de Milvus, lo que facilita añadir la búsqueda de texto completo a las aplicaciones RAG. Puedes combinar la búsqueda de texto completo con la búsqueda semántica de vectores densos para obtener un enfoque híbrido que se beneficia tanto de la comprensión semántica como de la precisión en la coincidencia de palabras clave. Esta combinación mejora la precisión de la búsqueda y ofrece mejores resultados a los usuarios.</p>
<p>Este tutorial muestra cómo implementar la búsqueda de texto completo y la búsqueda híbrida en tu aplicación utilizando Haystack y Milvus.</p>
<p>Puede ejecutar este tutorial localmente con Milvus Lite, conectarse a un servidor de Milvus o utilizar <a href="https://docs.zilliz.com/docs/register-with-zilliz-cloud">Zilliz Cloud</a>, el servicio de Milvus totalmente gestionado.</p>
<div class="alert note">
<ul>
<li>Antes de continuar con este tutorial, asegúrate de tener conocimientos básicos sobre <a href="https://milvus.io/docs/full-text-search.md#Full-Text-Search">la búsqueda de texto completo</a> y el <a href="https://github.com/milvus-io/milvus-haystack/blob/main/README.md">uso básico</a> de la integración de Haystack con Milvus.</li>
</ul>
</div>
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
    </button></h2><p>Este tutorial requiere Python 3.10 o una versión posterior. Instala la integración de Haystack para Milvus junto con los paquetes actuales de PyMilvus y Milvus Lite:</p>
<pre><code translate="no" class="language-shell">pip install --upgrade --quiet &quot;milvus-haystack&gt;=0.1.0&quot; &quot;pymilvus&gt;=3.0.2&quot; &quot;milvus-lite&gt;=3.2.2&quot;
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Si utilizas Google Colab, para habilitar las dependencias que acabas de instalar, es posible que tengas que <strong>reiniciar el entorno de ejecución</strong> (haz clic en el menú «Runtime» en la parte superior de la pantalla y selecciona «Restart session» en el menú desplegable).</p>
</div>
<p>Utilizaremos los modelos de OpenAI. Debes configurar la <a href="https://platform.openai.com/docs/quickstart">clave API</a> <code translate="no">OPENAI_API_KEY</code> como variable de entorno.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

os.environ[<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>] = <span class="hljs-string">&quot;sk-***********&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<h3 id="Prepare-the-data" class="common-anchor-header">Prepara los datos<button data-href="#Prepare-the-data" class="anchor-icon" translate="no">
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
    </button></h3><p>Importa los paquetes necesarios en este cuaderno. A continuación, prepara algunos documentos de ejemplo.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">import</span> os

<span class="hljs-keyword">from</span> haystack <span class="hljs-keyword">import</span> Document, Pipeline
<span class="hljs-keyword">from</span> haystack.components.builders <span class="hljs-keyword">import</span> ChatPromptBuilder
<span class="hljs-keyword">from</span> haystack.components.embedders <span class="hljs-keyword">import</span> OpenAIDocumentEmbedder, OpenAITextEmbedder
<span class="hljs-keyword">from</span> haystack.components.generators.chat <span class="hljs-keyword">import</span> OpenAIChatGenerator
<span class="hljs-keyword">from</span> haystack.components.writers <span class="hljs-keyword">import</span> DocumentWriter
<span class="hljs-keyword">from</span> haystack.dataclasses <span class="hljs-keyword">import</span> ChatMessage
<span class="hljs-keyword">from</span> haystack.document_stores.types <span class="hljs-keyword">import</span> DuplicatePolicy
<span class="hljs-keyword">from</span> haystack.utils <span class="hljs-keyword">import</span> Secret

<span class="hljs-keyword">from</span> milvus_haystack <span class="hljs-keyword">import</span> (
    MilvusDocumentStore,
    MilvusHybridRetriever,
    MilvusSparseEmbeddingRetriever,
)
<span class="hljs-keyword">from</span> milvus_haystack.function <span class="hljs-keyword">import</span> BM25BuiltInFunction

documents = [
    Document(content=<span class="hljs-string">&quot;Alice likes this apple&quot;</span>, meta={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;fruit&quot;</span>}),
    Document(content=<span class="hljs-string">&quot;Bob likes swimming&quot;</span>, meta={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;sport&quot;</span>}),
    Document(content=<span class="hljs-string">&quot;Charlie likes white dogs&quot;</span>, meta={<span class="hljs-string">&quot;category&quot;</span>: <span class="hljs-string">&quot;pets&quot;</span>}),
]
<button class="copy-code-btn"></button></code></pre>
<p>La integración de la búsqueda de texto completo en un sistema RAG equilibra la búsqueda semántica con una recuperación precisa y predecible basada en palabras clave. También puedes optar por utilizar únicamente la búsqueda de texto completo, aunque se recomienda combinarla con la búsqueda semántica para obtener mejores resultados. A continuación, a modo de demostración, mostraremos la búsqueda de texto completo por sí sola y la búsqueda híbrida.</p>
<h2 id="BM25-search-without-embedding" class="common-anchor-header">Búsqueda BM25 sin incrustación<button data-href="#BM25-search-without-embedding" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-indexing-Pipeline" class="common-anchor-header">Crear el proceso de indexación<button data-href="#Create-the-indexing-Pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>Para la búsqueda de texto completo, <code translate="no">MilvusDocumentStore</code> admite un parámetro ` <code translate="no">builtin_function</code> `. Pasa una instancia de ` <code translate="no">BM25BuiltInFunction</code> ` para que Milvus genere vectores dispersos BM25 en el lado del servidor. Por ejemplo:</p>
<pre><code translate="no" class="language-python">connection_args = {<span class="hljs-string">&quot;uri&quot;</span>: os.getenv(<span class="hljs-string">&quot;MILVUS_URI&quot;</span>, <span class="hljs-string">&quot;./milvus_full_text.db&quot;</span>)}
<span class="hljs-keyword">if</span> os.getenv(<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>):
    connection_args[<span class="hljs-string">&quot;token&quot;</span>] = Secret.from_env_var(<span class="hljs-string">&quot;MILVUS_TOKEN&quot;</span>)

document_store = MilvusDocumentStore(
    collection_name=<span class="hljs-string">&quot;haystack_bm25_demo&quot;</span>,
    connection_args=connection_args,
    sparse_vector_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,  <span class="hljs-comment"># The sparse vector field.</span>
    text_field=<span class="hljs-string">&quot;text&quot;</span>,
    builtin_function=[
        BM25BuiltInFunction(  <span class="hljs-comment"># The BM25 function converts the text into a sparse vector.</span>
            input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
            output_field_names=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
        )
    ],
    <span class="hljs-comment"># Strong consistency waits for all loads to complete, adding latency with large datasets</span>
    <span class="hljs-comment"># consistency_level=&quot;Strong&quot;,  # Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`).</span>
    drop_old=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<div class="alert note">
<p>Para el parámetro <code translate="no">connection_args</code>:</p>
<ul>
<li>El archivo local predeterminado, <code translate="no">./milvus_full_text.db</code>, utiliza <a href="https://milvus.io/docs/milvus_lite.md">Milvus Lite</a>.</li>
<li>Para un servidor Milvus en <a href="https://milvus.io/docs/quickstart.md">Docker o Kubernetes</a>, configura <code translate="no">MILVUS_URI</code> con la dirección del servidor, como <code translate="no">http://localhost:19530</code>.</li>
<li>Para <a href="https://zilliz.com/cloud">Zilliz Cloud</a>, configura <code translate="no">MILVUS_URI</code> y <code translate="no">MILVUS_TOKEN</code> con el <a href="https://docs.zilliz.com/docs/on-zilliz-cloud-console#free-cluster-details">punto de acceso público y la clave de API</a> que se muestran en la consola.</li>
</ul>
</div>
<p>Crea un canal de indexación para escribir documentos en el almacén de documentos de Milvus.</p>
<pre><code translate="no" class="language-python">writer = DocumentWriter(document_store=document_store, policy=DuplicatePolicy.NONE)

indexing_pipeline = Pipeline()
indexing_pipeline.add_component(<span class="hljs-string">&quot;writer&quot;</span>, writer)
_ = indexing_pipeline.run({<span class="hljs-string">&quot;writer&quot;</span>: {<span class="hljs-string">&quot;documents&quot;</span>: documents}})

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Number of documents:&quot;</span>, document_store.count_documents())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Number of documents: 3
</code></pre>
<h3 id="Create-the-retrieval-pipeline" class="common-anchor-header">Crea el canal de recuperación<button data-href="#Create-the-retrieval-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>Crea un canal de recuperación que recupere documentos del almacén de documentos de Milvus utilizando <code translate="no">MilvusSparseEmbeddingRetriever</code>, que es una envoltura de <code translate="no">document_store</code>.</p>
<pre><code translate="no" class="language-python">retrieval_pipeline = Pipeline()
retrieval_pipeline.add_component(
    <span class="hljs-string">&quot;retriever&quot;</span>, MilvusSparseEmbeddingRetriever(document_store=document_store)
)

question = <span class="hljs-string">&quot;Who likes swimming?&quot;</span>

retrieval_results = retrieval_pipeline.run({<span class="hljs-string">&quot;retriever&quot;</span>: {<span class="hljs-string">&quot;query_text&quot;</span>: question}})

<span class="hljs-built_in">print</span>(retrieval_results[<span class="hljs-string">&quot;retriever&quot;</span>][<span class="hljs-string">&quot;documents&quot;</span>][<span class="hljs-number">0</span>].content)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Bob likes swimming
</code></pre>
<h2 id="Hybrid-Search-with-semantic-search-and-full-text-search" class="common-anchor-header">Búsqueda híbrida con búsqueda semántica y búsqueda de texto completo<button data-href="#Hybrid-Search-with-semantic-search-and-full-text-search" class="anchor-icon" translate="no">
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
    </button></h2><h3 id="Create-the-indexing-Pipeline" class="common-anchor-header">Crear el canal de indexación<button data-href="#Create-the-indexing-Pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>En la búsqueda híbrida, utilizamos la función BM25 para realizar la búsqueda de texto completo y especificamos el campo vectorial denso <code translate="no">vector</code> para realizar la búsqueda semántica. Esta colección también utiliza un analizador personalizado, por lo que podremos examinar su esquema más adelante en el tutorial.</p>
<pre><code translate="no" class="language-python">analyzer_params_custom = {
    <span class="hljs-string">&quot;tokenizer&quot;</span>: <span class="hljs-string">&quot;standard&quot;</span>,
    <span class="hljs-string">&quot;filter&quot;</span>: [
        <span class="hljs-string">&quot;lowercase&quot;</span>,
        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;length&quot;</span>, <span class="hljs-string">&quot;max&quot;</span>: <span class="hljs-number">40</span>},
        {<span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-string">&quot;stop&quot;</span>, <span class="hljs-string">&quot;stop_words&quot;</span>: [<span class="hljs-string">&quot;of&quot;</span>, <span class="hljs-string">&quot;to&quot;</span>]},
    ],
}

document_store = MilvusDocumentStore(
    collection_name=<span class="hljs-string">&quot;haystack_hybrid_demo&quot;</span>,
    connection_args=connection_args,
    vector_field=<span class="hljs-string">&quot;vector&quot;</span>,  <span class="hljs-comment"># The dense vector field.</span>
    sparse_vector_field=<span class="hljs-string">&quot;sparse_vector&quot;</span>,  <span class="hljs-comment"># The sparse vector field.</span>
    text_field=<span class="hljs-string">&quot;text&quot;</span>,
    builtin_function=[
        BM25BuiltInFunction(  <span class="hljs-comment"># The BM25 function converts the text into a sparse vector.</span>
            input_field_names=<span class="hljs-string">&quot;text&quot;</span>,
            output_field_names=<span class="hljs-string">&quot;sparse_vector&quot;</span>,
            analyzer_params=analyzer_params_custom,
            enable_match=<span class="hljs-literal">True</span>,
        )
    ],
    <span class="hljs-comment"># Strong consistency waits for all loads to complete, adding latency with large datasets</span>
    <span class="hljs-comment"># consistency_level=&quot;Strong&quot;,  # Supported values are (`&quot;Strong&quot;`, `&quot;Session&quot;`, `&quot;Bounded&quot;`, `&quot;Eventually&quot;`).</span>
    drop_old=<span class="hljs-literal">True</span>,
)
<button class="copy-code-btn"></button></code></pre>
<p>Crea un proceso de indexación que convierta los documentos en representaciones. A continuación, los documentos se escriben en el almacén de documentos de Milvus.</p>
<pre><code translate="no" class="language-python">writer = DocumentWriter(document_store=document_store, policy=DuplicatePolicy.NONE)

indexing_pipeline = Pipeline()
indexing_pipeline.add_component(<span class="hljs-string">&quot;dense_doc_embedder&quot;</span>, OpenAIDocumentEmbedder())
indexing_pipeline.add_component(<span class="hljs-string">&quot;writer&quot;</span>, writer)
indexing_pipeline.connect(<span class="hljs-string">&quot;dense_doc_embedder&quot;</span>, <span class="hljs-string">&quot;writer&quot;</span>)
indexing_pipeline.run({<span class="hljs-string">&quot;dense_doc_embedder&quot;</span>: {<span class="hljs-string">&quot;documents&quot;</span>: documents}})

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Number of documents:&quot;</span>, document_store.count_documents())
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Number of documents: 3
</code></pre>
<h3 id="Create-the-retrieval-pipeline" class="common-anchor-header">Crear el proceso de recuperación<button data-href="#Create-the-retrieval-pipeline" class="anchor-icon" translate="no">
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
    </button></h3><p>Crea un pipeline de recuperación que recupere documentos del almacén de documentos de Milvus utilizando <code translate="no">MilvusHybridRetriever</code>, que contiene el « <code translate="no">document_store</code> » y recibe parámetros sobre la búsqueda híbrida.</p>
<pre><code translate="no" class="language-python"><span class="hljs-comment"># from pymilvus import WeightedRanker</span>
retrieval_pipeline = Pipeline()
retrieval_pipeline.add_component(<span class="hljs-string">&quot;dense_text_embedder&quot;</span>, OpenAITextEmbedder())
retrieval_pipeline.add_component(
    <span class="hljs-string">&quot;retriever&quot;</span>,
    MilvusHybridRetriever(
        document_store=document_store,
        <span class="hljs-comment"># top_k=3,</span>
        <span class="hljs-comment"># reranker=WeightedRanker(0.5, 0.5),  # Default is RRFRanker()</span>
    ),
)

_ = retrieval_pipeline.connect(
    <span class="hljs-string">&quot;dense_text_embedder.embedding&quot;</span>, <span class="hljs-string">&quot;retriever.query_embedding&quot;</span>
)
<button class="copy-code-btn"></button></code></pre>
<p>Al realizar una búsqueda híbrida mediante <code translate="no">MilvusHybridRetriever</code>, podemos establecer opcionalmente los parámetros topK y reranker. El sistema gestionará automáticamente las representaciones vectoriales y las funciones integradas y, finalmente, utilizará un reranker para refinar los resultados. Los detalles de implementación subyacentes del proceso de búsqueda quedan ocultos al usuario.</p>
<p>Para obtener más información sobre la búsqueda híbrida, puede consultar la <a href="https://milvus.io/docs/multi-vector-search.md#Hybrid-Search">introducción</a> a <a href="https://milvus.io/docs/multi-vector-search.md#Hybrid-Search">la búsqueda híbrida</a>.</p>
<pre><code translate="no" class="language-python">question = <span class="hljs-string">&quot;Who likes swimming?&quot;</span>

retrieval_results = retrieval_pipeline.run(
    {
        <span class="hljs-string">&quot;dense_text_embedder&quot;</span>: {<span class="hljs-string">&quot;text&quot;</span>: question},
        <span class="hljs-string">&quot;retriever&quot;</span>: {<span class="hljs-string">&quot;query_text&quot;</span>: question},
    }
)

<span class="hljs-built_in">print</span>(retrieval_results[<span class="hljs-string">&quot;retriever&quot;</span>][<span class="hljs-string">&quot;documents&quot;</span>][<span class="hljs-number">0</span>].content)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Bob likes swimming
</code></pre>
<h2 id="Customize-analyzer" class="common-anchor-header">Personalizar el analizador<button data-href="#Customize-analyzer" class="anchor-icon" translate="no">
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
    </button></h2><p>Los analizadores son esenciales en la búsqueda de texto completo, ya que dividen la frase en tokens y realizan análisis léxicos como la derivación y la eliminación de palabras vacías. Los analizadores suelen ser específicos de cada idioma. Puede consultar <a href="https://milvus.io/docs/analyzer-overview.md#Analyzer-Overview">esta guía</a> para obtener más información sobre los analizadores en Milvus.</p>
<p>Milvus admite dos tipos de analizadores: <strong>analizadores integrados</strong> y <strong>analizadores personalizados</strong>. Por defecto, el « <code translate="no">BM25BuiltInFunction</code> » utilizará el <a href="https://milvus.io/docs/standard-analyzer.md">analizador integrado estándar</a>, que es el más básico y que divide el texto en tokens conservando la puntuación.</p>
<p>El almacén de documentos híbrido anterior pasa <code translate="no">analyzer_params_custom</code> a <code translate="no">BM25BuiltInFunction</code> y habilita la coincidencia de texto. De este modo, la definición del analizador se mantiene junto a la colección que lo utiliza.</p>
<p>Podemos echar un vistazo al esquema de la colección de Milvus y asegurarnos de que el analizador personalizado está configurado correctamente.</p>
<pre><code translate="no" class="language-python">collection = document_store.client.describe_collection(document_store.collection_name)
text_field = <span class="hljs-built_in">next</span>(field <span class="hljs-keyword">for</span> field <span class="hljs-keyword">in</span> collection[<span class="hljs-string">&quot;fields&quot;</span>] <span class="hljs-keyword">if</span> field[<span class="hljs-string">&quot;name&quot;</span>] == <span class="hljs-string">&quot;text&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Custom analyzer:&quot;</span>, text_field[<span class="hljs-string">&quot;params&quot;</span>][<span class="hljs-string">&quot;analyzer_params&quot;</span>])
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Custom analyzer: {&quot;tokenizer&quot;: &quot;standard&quot;, &quot;filter&quot;: [&quot;lowercase&quot;, {&quot;type&quot;: &quot;length&quot;, &quot;max&quot;: 40}, {&quot;type&quot;: &quot;stop&quot;, &quot;stop_words&quot;: [&quot;of&quot;, &quot;to&quot;]}]}
</code></pre>
<p>Para obtener más detalles sobre los conceptos, por ejemplo, <code translate="no">analyzer</code>, <code translate="no">tokenizer</code>, <code translate="no">filter</code>, <code translate="no">enable_match</code>, <code translate="no">analyzer_params</code>, consulta la <a href="https://milvus.io/docs/analyzer-overview.md">documentación del analizador</a>.</p>
<h2 id="Using-Hybrid-Search-in-RAG-pipeline" class="common-anchor-header">Uso de la búsqueda híbrida en el flujo de trabajo de RAG<button data-href="#Using-Hybrid-Search-in-RAG-pipeline" class="anchor-icon" translate="no">
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
    </button></h2><p>Hemos aprendido a utilizar la función integrada básica BM25 en Haystack y Milvus, y hemos preparado un archivo <code translate="no">document_store</code> ya cargado. Veamos ahora una implementación optimizada de RAG con búsqueda híbrida.</p>
<p>
  <span class="img-wrapper">
    <img translate="no" src="https://github.com/milvus-io/bootcamp/blob/master/pics/advanced_rag/hybrid_and_rerank.png?raw=1" alt="" class="doc-image" id="" />
    <span></span>
  </span>
</p>
<p>Este diagrama muestra el proceso de recuperación y reordenación híbrida, que combina BM25 para la coincidencia de palabras clave y la búsqueda vectorial densa para la recuperación semántica. Los resultados de ambos métodos se fusionan, se reordenan y se envían a un modelo de lenguaje grande (LLM) para generar la respuesta final.</p>
<p>La búsqueda híbrida equilibra la precisión y la comprensión semántica, mejorando la exactitud y la solidez ante consultas diversas. Recupera candidatos mediante la búsqueda de texto completo con BM25 y la búsqueda vectorial, lo que garantiza una recuperación semántica, sensible al contexto y precisa.</p>
<p>Probemos una implementación optimizada de RAG con búsqueda híbrida.</p>
<pre><code translate="no" class="language-python">prompt_template = [
    ChatMessage.from_user(
        <span class="hljs-string">&quot;&quot;&quot;Answer the following query based on the provided context. If the context does
        not include an answer, reply with &#x27;I don&#x27;t know&#x27;.

        Query: {{query}}
        Documents:
        {% for doc in documents %}
            {{ doc.content }}
        {% endfor %}
        Answer:
        &quot;&quot;&quot;</span>
    )
]

rag_pipeline = Pipeline()
rag_pipeline.add_component(<span class="hljs-string">&quot;text_embedder&quot;</span>, OpenAITextEmbedder())
rag_pipeline.add_component(
    <span class="hljs-string">&quot;retriever&quot;</span>, MilvusHybridRetriever(document_store=document_store, top_k=<span class="hljs-number">1</span>)
)
rag_pipeline.add_component(
    <span class="hljs-string">&quot;prompt_builder&quot;</span>, ChatPromptBuilder(template=prompt_template)
)
rag_pipeline.add_component(
    <span class="hljs-string">&quot;generator&quot;</span>,
    OpenAIChatGenerator(
        api_key=Secret.from_env_var(<span class="hljs-string">&quot;OPENAI_API_KEY&quot;</span>),
    ),
)
rag_pipeline.connect(<span class="hljs-string">&quot;text_embedder.embedding&quot;</span>, <span class="hljs-string">&quot;retriever.query_embedding&quot;</span>)
rag_pipeline.connect(<span class="hljs-string">&quot;retriever.documents&quot;</span>, <span class="hljs-string">&quot;prompt_builder.documents&quot;</span>)
rag_pipeline.connect(<span class="hljs-string">&quot;prompt_builder.prompt&quot;</span>, <span class="hljs-string">&quot;generator.messages&quot;</span>)

results = rag_pipeline.run(
    {
        <span class="hljs-string">&quot;text_embedder&quot;</span>: {<span class="hljs-string">&quot;text&quot;</span>: question},
        <span class="hljs-string">&quot;retriever&quot;</span>: {<span class="hljs-string">&quot;query_text&quot;</span>: question},
        <span class="hljs-string">&quot;prompt_builder&quot;</span>: {<span class="hljs-string">&quot;query&quot;</span>: question},
    }
)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;RAG answer:&quot;</span>, results[<span class="hljs-string">&quot;generator&quot;</span>][<span class="hljs-string">&quot;replies&quot;</span>][<span class="hljs-number">0</span>].text)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">RAG answer: Bob
</code></pre>
<h2 id="Conclusion" class="common-anchor-header">Conclusión<button data-href="#Conclusion" class="anchor-icon" translate="no">
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
    </button></h2><p>Has utilizado la búsqueda BM25 nativa de Milvus, la recuperación híbrida y un analizador personalizado en los flujos de trabajo de Haystack. Para conocer más opciones de integración, consulta el <a href="https://github.com/milvus-io/milvus-haystack">repositorio milvus-haystack</a>.</p>
