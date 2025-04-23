---
id: llamaindex_milvus_metadata_filter.md
title: Filtrado de metadatos con LlamaIndex y Milvus
related_key: LlamaIndex
summary: >-
  Este cuaderno ilustra el uso del almacén vectorial Milvus en LlamaIndex,
  centrándose en las capacidades de filtrado de metadatos. Aprenderá a indexar
  documentos con metadatos, a realizar búsquedas vectoriales con los filtros de
  metadatos integrados de LlamaIndex y a aplicar las expresiones de filtrado
  nativas de Milvus al almacén vectorial.
---
<p><a href="https://colab.research.google.com/github/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/llamaindex/llamaindex_milvus_metadata_filter.ipynb" target="_parent">
<img translate="no" src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>
<a href="https://github.com/milvus-io/bootcamp/blob/master/bootcamp/tutorials/integration/llamaindex/llamaindex_milvus_metadata_filter.ipynb" target="_blank">
<img translate="no" src="https://img.shields.io/badge/View%20on%20GitHub-555555?style=flat&logo=github&logoColor=white" alt="GitHub Repository"/>
</a></p>
<h1 id="Metadata-Filtering-with-LlamaIndex-and-Milvus" class="common-anchor-header">Filtrado de metadatos con LlamaIndex y Milvus<button data-href="#Metadata-Filtering-with-LlamaIndex-and-Milvus" class="anchor-icon" translate="no">
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
    </button></h1><p>Este cuaderno ilustra el uso del almacén vectorial Milvus en LlamaIndex, centrándose en las capacidades de filtrado de metadatos. Aprenderá a indexar documentos con metadatos, a realizar búsquedas vectoriales con los filtros de metadatos incorporados de LlamaIndex y a aplicar las expresiones de filtrado nativas de Milvus al almacén vectorial.</p>
<p>Al final de este cuaderno, comprenderá cómo utilizar las funciones de filtrado de Milvus para limitar los resultados de la búsqueda basándose en los metadatos del documento.</p>
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
<p>Antes de comenzar, asegúrese de tener instaladas las siguientes dependencias:</p>
<pre><code translate="no" class="language-shell"><span class="hljs-meta prompt_">$ </span><span class="language-bash">pip install llama-index-vector-stores-milvus llama-index</span>
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
<pre><code translate="no" class="language-python">URI = <span class="hljs-string">&quot;./milvus_filter_demo.db&quot;</span>  <span class="hljs-comment"># Use Milvus-Lite for demo purpose</span>
<span class="hljs-comment"># TOKEN = &quot;&quot;</span>
<button class="copy-code-btn"></button></code></pre>
<p><strong>Preparar los datos</strong></p>
<p>Para este ejemplo, utilizaremos algunos libros con títulos similares o idénticos pero metadatos diferentes (autor, género y año de publicación) como datos de muestra. Esto ayudará a demostrar cómo Milvus puede filtrar y recuperar documentos basándose tanto en la similitud vectorial como en los atributos de metadatos.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.schema <span class="hljs-keyword">import</span> TextNode

nodes = [
    TextNode(
        text=<span class="hljs-string">&quot;Life: A User&#x27;s Manual&quot;</span>,
        metadata={
            <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;Georges Perec&quot;</span>,
            <span class="hljs-string">&quot;genre&quot;</span>: <span class="hljs-string">&quot;Postmodern Fiction&quot;</span>,
            <span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">1978</span>,
        },
    ),
    TextNode(
        text=<span class="hljs-string">&quot;Life and Fate&quot;</span>,
        metadata={
            <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;Vasily Grossman&quot;</span>,
            <span class="hljs-string">&quot;genre&quot;</span>: <span class="hljs-string">&quot;Historical Fiction&quot;</span>,
            <span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">1980</span>,
        },
    ),
    TextNode(
        text=<span class="hljs-string">&quot;Life&quot;</span>,
        metadata={
            <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;Keith Richards&quot;</span>,
            <span class="hljs-string">&quot;genre&quot;</span>: <span class="hljs-string">&quot;Memoir&quot;</span>,
            <span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">2010</span>,
        },
    ),
    TextNode(
        text=<span class="hljs-string">&quot;The Life&quot;</span>,
        metadata={
            <span class="hljs-string">&quot;author&quot;</span>: <span class="hljs-string">&quot;Malcolm Knox&quot;</span>,
            <span class="hljs-string">&quot;genre&quot;</span>: <span class="hljs-string">&quot;Literary Fiction&quot;</span>,
            <span class="hljs-string">&quot;year&quot;</span>: <span class="hljs-number">2011</span>,
        },
    ),
]
<button class="copy-code-btn"></button></code></pre>
<h2 id="Build-Index" class="common-anchor-header">Construir el índice<button data-href="#Build-Index" class="anchor-icon" translate="no">
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
    </button></h2><p>En esta sección, almacenaremos los datos de muestra en Milvus utilizando el modelo de incrustación por defecto (OpenAI's <code translate="no">text-embedding-ada-002</code>). Los títulos se convertirán en incrustaciones de texto y se almacenarán en un campo de incrustación densa, mientras que todos los metadatos se almacenarán en campos escalares.</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.vector_stores.milvus <span class="hljs-keyword">import</span> MilvusVectorStore
<span class="hljs-keyword">from</span> llama_index.core <span class="hljs-keyword">import</span> StorageContext, VectorStoreIndex


vector_store = MilvusVectorStore(
    uri=URI,
    <span class="hljs-comment"># token=TOKEN,</span>
    collection_name=<span class="hljs-string">&quot;test_filter_collection&quot;</span>,  <span class="hljs-comment"># Change collection name here</span>
    dim=<span class="hljs-number">1536</span>,  <span class="hljs-comment"># Vector dimension depends on the embedding model</span>
    overwrite=<span class="hljs-literal">True</span>,  <span class="hljs-comment"># Drop collection if exists</span>
)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
index = VectorStoreIndex(nodes, storage_context=storage_context)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">2025-04-22 08:31:09,871 [DEBUG][_create_connection]: Created new connection using: 19675caa8f894772b3db175b65d0063a (async_milvus_client.py:547)
</code></pre>
<h2 id="Metadata-Filters" class="common-anchor-header">Filtros de metadatos<button data-href="#Metadata-Filters" class="anchor-icon" translate="no">
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
    </button></h2><p>En esta sección, aplicaremos los filtros de metadatos y condiciones incorporados de LlamaIndex a la búsqueda Milvus.</p>
<p><strong>Definir filtros de metadatos</strong></p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> (
    MetadataFilter,
    MetadataFilters,
    FilterOperator,
)

filters = MetadataFilters(
    filters=[
        MetadataFilter(
            key=<span class="hljs-string">&quot;year&quot;</span>, value=<span class="hljs-number">2000</span>, operator=FilterOperator.GT
        )  <span class="hljs-comment"># year &gt; 2000</span>
    ]
)
<button class="copy-code-btn"></button></code></pre>
<p><strong>Recuperar del almacén vectorial con filtros</strong></p>
<pre><code translate="no" class="language-python">retriever = index.as_retriever(filters=filters, similarity_top_k=<span class="hljs-number">5</span>)
result_nodes = retriever.retrieve(<span class="hljs-string">&quot;Books about life&quot;</span>)
<span class="hljs-keyword">for</span> node <span class="hljs-keyword">in</span> result_nodes:
    <span class="hljs-built_in">print</span>(node.text)
    <span class="hljs-built_in">print</span>(node.metadata)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The Life
{'author': 'Malcolm Knox', 'genre': 'Literary Fiction', 'year': 2011}


Life
{'author': 'Keith Richards', 'genre': 'Memoir', 'year': 2010}
</code></pre>
<h3 id="Multiple-Metdata-Filters" class="common-anchor-header">Múltiples filtros de metadatos</h3><p>También puede combinar varios filtros de metadatos para crear consultas más complejas. LlamaIndex admite las condiciones <code translate="no">AND</code> y <code translate="no">OR</code> para combinar filtros. Esto permite una recuperación más precisa y flexible de los documentos en función de sus atributos de metadatos.</p>
<p><strong>Condición <code translate="no">AND</code></strong></p>
<p>Pruebe un ejemplo de filtrado de libros publicados entre 1979 y 2010 (en concreto, donde 1979 &lt; año ≤ 2010):</p>
<pre><code translate="no" class="language-python"><span class="hljs-keyword">from</span> llama_index.core.vector_stores <span class="hljs-keyword">import</span> FilterCondition

filters = MetadataFilters(
    filters=[
        MetadataFilter(
            key=<span class="hljs-string">&quot;year&quot;</span>, value=<span class="hljs-number">1979</span>, operator=FilterOperator.GT
        ),  <span class="hljs-comment"># year &gt; 1979</span>
        MetadataFilter(
            key=<span class="hljs-string">&quot;year&quot;</span>, value=<span class="hljs-number">2010</span>, operator=FilterOperator.LTE
        ),  <span class="hljs-comment"># year &lt;= 2010</span>
    ],
    condition=FilterCondition.AND,
)

retriever = index.as_retriever(filters=filters, similarity_top_k=<span class="hljs-number">5</span>)
result_nodes = retriever.retrieve(<span class="hljs-string">&quot;Books about life&quot;</span>)
<span class="hljs-keyword">for</span> node <span class="hljs-keyword">in</span> result_nodes:
    <span class="hljs-built_in">print</span>(node.text)
    <span class="hljs-built_in">print</span>(node.metadata)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Life and Fate
{'author': 'Vasily Grossman', 'genre': 'Historical Fiction', 'year': 1980}


Life
{'author': 'Keith Richards', 'genre': 'Memoir', 'year': 2010}
</code></pre>
<p><strong>Condición <code translate="no">OR</code></strong></p>
<p>Pruebe otro ejemplo que filtre libros escritos por Georges Perec o Keith Richards:</p>
<pre><code translate="no" class="language-python">filters = MetadataFilters(
    filters=[
        MetadataFilter(
            key=<span class="hljs-string">&quot;author&quot;</span>, value=<span class="hljs-string">&quot;Georges Perec&quot;</span>, operator=FilterOperator.EQ
        ),  <span class="hljs-comment"># author is Georges Perec</span>
        MetadataFilter(
            key=<span class="hljs-string">&quot;author&quot;</span>, value=<span class="hljs-string">&quot;Keith Richards&quot;</span>, operator=FilterOperator.EQ
        ),  <span class="hljs-comment"># author is Keith Richards</span>
    ],
    condition=FilterCondition.OR,
)

retriever = index.as_retriever(filters=filters, similarity_top_k=<span class="hljs-number">5</span>)
result_nodes = retriever.retrieve(<span class="hljs-string">&quot;Books about life&quot;</span>)
<span class="hljs-keyword">for</span> node <span class="hljs-keyword">in</span> result_nodes:
    <span class="hljs-built_in">print</span>(node.text)
    <span class="hljs-built_in">print</span>(node.metadata)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">Life
{'author': 'Keith Richards', 'genre': 'Memoir', 'year': 2010}


Life: A User's Manual
{'author': 'Georges Perec', 'genre': 'Postmodern Fiction', 'year': 1978}
</code></pre>
<h2 id="Use-Milvuss-Keyword-Arguments" class="common-anchor-header">Utilice los argumentos de palabras clave de Milvus<button data-href="#Use-Milvuss-Keyword-Arguments" class="anchor-icon" translate="no">
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
    </button></h2><p>Además de las capacidades de filtrado incorporadas, puede utilizar las expresiones de filtrado nativas de Milvus mediante el argumento de palabra clave <code translate="no">string_expr</code>. Esto le permite pasar expresiones de filtrado específicas directamente a Milvus durante las operaciones de búsqueda, extendiéndose más allá del filtrado estándar de metadatos para acceder a las capacidades avanzadas de filtrado de Milvus.</p>
<p>Milvus proporciona opciones de filtrado potentes y flexibles que permiten una consulta precisa de sus datos vectoriales:</p>
<ul>
<li>Operadores básicos: Operadores de comparación, filtros de rango, operadores aritméticos y operadores lógicos.</li>
<li>Plantillas de expresiones de filtrado: Patrones predefinidos para escenarios de filtrado comunes</li>
<li>Operadores especializados: Operadores específicos de tipos de datos para campos JSON o matrices</li>
</ul>
<p>Para una documentación completa y ejemplos de expresiones de filtrado Milvus, consulte la documentación oficial de <a href="https://milvus.io/docs/boolean.md">Milvus Filtering</a>.</p>
<pre><code translate="no" class="language-python">retriever = index.as_retriever(
    vector_store_kwargs={
        <span class="hljs-string">&quot;string_expr&quot;</span>: <span class="hljs-string">&quot;genre like &#x27;%Fiction&#x27;&quot;</span>,
    },
    similarity_top_k=<span class="hljs-number">5</span>,
)
result_nodes = retriever.retrieve(<span class="hljs-string">&quot;Books about life&quot;</span>)
<span class="hljs-keyword">for</span> node <span class="hljs-keyword">in</span> result_nodes:
    <span class="hljs-built_in">print</span>(node.text)
    <span class="hljs-built_in">print</span>(node.metadata)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;\n&quot;</span>)
<button class="copy-code-btn"></button></code></pre>
<pre><code translate="no">The Life
{'author': 'Malcolm Knox', 'genre': 'Literary Fiction', 'year': 2011}


Life and Fate
{'author': 'Vasily Grossman', 'genre': 'Historical Fiction', 'year': 1980}


Life: A User's Manual
{'author': 'Georges Perec', 'genre': 'Postmodern Fiction', 'year': 1978}
</code></pre>
